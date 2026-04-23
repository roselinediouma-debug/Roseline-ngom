import { NextRequest, NextResponse } from 'next/server'
import { getClaudeClient, CLAUDE_MODEL_DEFAULT, estimateCostEur } from '@/lib/claude/client'
import { checkRateLimit, getClientIp } from '@/lib/tools/rateLimit'
import { trackUsage } from '@/lib/tools/trackUsage'
import { hasBudgetRemaining, recordCost } from '@/lib/tools/budgetGuard'
import { analyzeSite, type SiteAnalysis } from '@/lib/tools/auditSite'

export const runtime = 'nodejs'

type AuditInput = {
  hotelName: string
  city: string
  rooms: string
  email?: string
  hasWebsite: 'yes' | 'no'
  websiteUrl?: string
  googleBusiness: 'complete' | 'incomplete' | 'none' | 'unsure'
  googleReviewsCount: '0' | '1-10' | '11-50' | '50+'
  googleReviewsRating?: string
  otaPresence: 'booking+tripadvisor' | 'booking-only' | 'tripadvisor-only' | 'none'
  otaRating?: string
  reviewsReplyHabit: 'systematic' | 'sometimes' | 'never'
  socialActivity: 'active' | 'sporadic' | 'inactive' | 'none'
  bookingChannels: 'all-ota' | 'mix' | 'all-direct'
  biggestPainPoint?: string
}

type PrimaryOutlet = 'create_website' | 'seo_consulting' | 'reviews_tool' | 'social_tool'

type AuditReport = {
  score: number // 0-100
  headline: string // phrase punchy qui résume
  strengths: string[] // 1-3 items
  weaknesses: Array<{ title: string; description: string; severity: 'high' | 'medium' }>
  actionPlan: Array<{ priority: number; action: string; horizon: 'now' | '30d' | '90d' }>
  primaryOutlet: PrimaryOutlet
  primaryOutletReason: string
}

function buildPrompt(input: AuditInput, site: SiteAnalysis | null): string {
  const siteBlock = site
    ? `Analyse automatique du site :
- URL : ${site.url}
- Accessible : ${site.reachable ? 'oui' : 'non (' + (site.errors.join(', ') || 'erreur') + ')'}
- HTTPS : ${site.https ? 'oui' : 'NON'}
- Title : ${site.title ? `"${site.title}" (${site.titleLength} car.)` : 'absent'}
- Meta description : ${site.metaDescription ? `"${site.metaDescription}" (${site.metaDescriptionLength} car.)` : 'ABSENTE'}
- H1 : ${site.h1Count} trouvé(s)${site.firstH1 ? ` — "${site.firstH1}"` : ''}
- Viewport mobile : ${site.hasViewport ? 'oui' : 'NON'}
- Poids page : ${site.pageSize ?? '?'} KB
- Score PageSpeed mobile : ${site.pageSpeedMobile !== null ? site.pageSpeedMobile + '/100' : 'non mesuré'}
- LCP : ${site.lcpMs !== null ? site.lcpMs + ' ms' : 'non mesuré'}
- CLS : ${site.clsScore !== null ? site.clsScore : 'non mesuré'}
`
    : `Pas de site web.`

  return `Tu es Roseline Ngom, consultante franco-sénégalaise spécialisée en transformation digitale et IA pour hôtels indépendants africains. Tu audites un hôtel.

Ton ton : direct, chaleureux, honnête, tutoie, français. Pas de jargon pompeux. Donne des chiffres et des actions concrètes. Jamais de généralités creuses. Tu parles à un hôtelier qui a souvent 15-60 chambres, qui sait qu'il perd du revenu mais qui n'a pas de roadmap.

Profil hôtel :
- Nom : ${input.hotelName}
- Ville : ${input.city}
- Chambres : ${input.rooms}
- Problème ressenti : ${input.biggestPainPoint || 'non précisé'}

${siteBlock}

Présence en ligne déclarée :
- Fiche Google Business : ${input.googleBusiness}
- Avis Google : ${input.googleReviewsCount}${input.googleReviewsRating ? ` (note ${input.googleReviewsRating})` : ''}
- OTA (Booking/TripAdvisor) : ${input.otaPresence}${input.otaRating ? ` (note ${input.otaRating})` : ''}
- Réponse aux avis : ${input.reviewsReplyHabit}
- Activité réseaux sociaux : ${input.socialActivity}
- Origine des réservations : ${input.bookingChannels}

Règles de scoring (tu appliques strictement) :
- Pas de site → -25 points (fatal)
- Site sans HTTPS → -10
- Pas de meta description ou title vide → -5 chacun
- PageSpeed mobile < 50 → -10 ; < 30 → -15
- Google Business non créée → -15 ; incomplète → -8
- Avis Google 0 → -15 ; 1-10 → -8 ; 11-50 → -3
- Ne répond jamais aux avis → -10
- Social inactif ou absent → -8
- 100 % OTA pour les réservations → -15

Tu pars de 100 et tu soustrais. Score final entre 0 et 100.

Choix du débouché prioritaire (un seul) :
- "create_website" si pas de site du tout (c'est TOUJOURS le 1er problème à régler)
- "seo_consulting" si site présent mais score PageSpeed faible OU Google Business mal géré OU 100% OTA
- "reviews_tool" si avis peu nombreux OU jamais de réponse (et site+GB OK)
- "social_tool" si social inactif (et tout le reste OK)

Tu réponds UNIQUEMENT avec un JSON valide, sans balise markdown, sans commentaire, au format EXACT :

{
  "score": <number 0-100>,
  "headline": "<une phrase percutante de 80-120 caractères qui résume ce qui cloche le plus>",
  "strengths": ["<point fort 1>", "<point fort 2>"],
  "weaknesses": [
    {"title": "<titre court>", "description": "<explication 1-2 phrases, tutoiement>", "severity": "high" | "medium"},
    ...
  ],
  "actionPlan": [
    {"priority": 1, "action": "<action concrète courte>", "horizon": "now" | "30d" | "90d"},
    ...
  ],
  "primaryOutlet": "create_website" | "seo_consulting" | "reviews_tool" | "social_tool",
  "primaryOutletReason": "<1 phrase qui justifie pourquoi ce débouché d'abord>"
}

Contraintes :
- 1 à 3 strengths (zéro si vraiment rien de positif)
- 2 à 4 weaknesses, classées par gravité
- 4 à 6 actions dans actionPlan, numérotées par priorité, chacune en horizon now / 30d / 90d
- Tutoie partout
- JSON strict, pas de trailing comma`
}

function tryParseJson(text: string): AuditReport | null {
  // Claude retourne parfois du JSON dans un bloc markdown — on tolère
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()
  try {
    const obj = JSON.parse(cleaned)
    if (
      typeof obj.score === 'number' &&
      typeof obj.headline === 'string' &&
      Array.isArray(obj.weaknesses) &&
      Array.isArray(obj.actionPlan) &&
      typeof obj.primaryOutlet === 'string'
    ) {
      return obj as AuditReport
    }
  } catch {
    /* noop */
  }
  return null
}

export async function POST(req: NextRequest) {
  let body: AuditInput
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  // Validation minimale
  if (!body.hotelName || !body.city || !body.rooms || !body.hasWebsite) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  }

  const ip = getClientIp(req.headers)
  const demoKey =
    req.cookies.get('tools_demo_key')?.value ??
    new URL(req.url).searchParams.get('demo_key')

  // Rate limit
  const rl = await checkRateLimit(
    ip,
    { toolName: 'audit_presence', perHour: 10, perDay: 30 },
    { demoKey }
  )
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error:
          "Tu as déjà fait plusieurs audits. Réessaye dans 1 heure ou écris-nous sur WhatsApp.",
        retryAfterSeconds: rl.retryAfterSeconds,
      },
      { status: 429 }
    )
  }

  // Budget
  const budget = await hasBudgetRemaining()
  if (!budget.ok) {
    return NextResponse.json(
      {
        error:
          "L'outil est temporairement indisponible (budget mensuel atteint). Contacte Roseline directement.",
      },
      { status: 503 }
    )
  }

  // Analyse du site si URL fournie
  let siteAnalysis: SiteAnalysis | null = null
  if (body.hasWebsite === 'yes' && body.websiteUrl) {
    siteAnalysis = await analyzeSite(body.websiteUrl)
  }

  // Appel Claude
  const prompt = buildPrompt(body, siteAnalysis)
  const client = getClaudeClient()

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL_DEFAULT,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const raw = textBlock && 'text' in textBlock ? textBlock.text : ''
    const report = tryParseJson(raw)

    if (!report) {
      console.error('[audit] Claude JSON parse failed:', raw.slice(0, 500))
      return NextResponse.json(
        { error: "L'analyse IA a produit un résultat inattendu. Réessaye dans un instant." },
        { status: 502 }
      )
    }

    const tokensIn = response.usage.input_tokens
    const tokensOut = response.usage.output_tokens
    const costEur = estimateCostEur(CLAUDE_MODEL_DEFAULT, tokensIn, tokensOut)

    // Enregistre le coût dans le compteur mensuel (non bloquant)
    recordCost(CLAUDE_MODEL_DEFAULT, tokensIn, tokensOut)

    // Log usage (non bloquant)
    trackUsage({
      toolName: 'audit_presence',
      userIp: ip,
      userEmail: body.email || null,
      inputData: { ...body, siteAnalysis },
      resultSummary: `Score ${report.score} / Outlet ${report.primaryOutlet}`,
      tokensInput: tokensIn,
      tokensOutput: tokensOut,
      segment: 'hotelier',
    })

    return NextResponse.json({
      report,
      siteAnalysis,
      meta: {
        tokensInput: tokensIn,
        tokensOutput: tokensOut,
        costEur,
        remainingHour: rl.remainingHour,
        remainingDay: rl.remainingDay,
      },
    })
  } catch (err) {
    console.error('[audit] Claude call failed:', err)
    return NextResponse.json(
      { error: 'Erreur IA temporaire. Réessaye dans un instant.' },
      { status: 502 }
    )
  }
}
