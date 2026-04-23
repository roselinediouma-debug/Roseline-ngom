import { NextRequest, NextResponse } from 'next/server'
import { getClaudeClient, CLAUDE_MODEL_DEFAULT, estimateCostEur } from '@/lib/claude/client'
import { checkRateLimit, getClientIp } from '@/lib/tools/rateLimit'
import { trackUsage } from '@/lib/tools/trackUsage'
import { hasBudgetRemaining, recordCost } from '@/lib/tools/budgetGuard'

export const runtime = 'nodejs'

type PostTopic =
  | 'offre_promo'
  | 'evenement_local'
  | 'coin_secret'
  | 'gastronomie'
  | 'temoignage_client'
  | 'saison_voyage'

type PostInput = {
  hotelName: string
  city: string
  country?: string
  topic: PostTopic
  keyInfo: string // description libre de l'info à mettre en avant
  tone?: 'chaleureux' | 'premium' | 'jeune'
  email?: string
}

type GeneratedPost = {
  // Post Google Business Profile — indexé par Google, clé du SEO local
  gbpPost: {
    title: string // 58 car max
    body: string // 100-250 car idéal
    ctaLabel: 'RESERVER' | 'EN_SAVOIR_PLUS' | 'APPELER' | 'OBTENIR_OFFRE'
    seoKeywords: string[] // mots-clés locaux ciblés
  }
  // Post Instagram/Facebook long-form
  instagramPost: {
    caption: string // 150-300 mots, emojis, hooks, avec line breaks
    hashtags: string[] // 12-15 hashtags mix niche + local + large
    firstComment: string // pour mettre les hashtags secondaires et booster la portée
  }
  // Post LinkedIn (B2B, MICE, voyage d'affaires)
  linkedinPost: {
    body: string // 100-200 mots, pro, storytelling
    hashtags: string[] // 3-5 hashtags pro
  }
  // Conseils de publication (best practice SEO/reach)
  publishingTips: {
    bestTime: string // ex: "Jeudi 19h-21h (heure Dakar)"
    frequencyAdvice: string
    seoAdvice: string // pourquoi ce post aide le SEO local
  }
}

const TOPIC_LABELS: Record<PostTopic, string> = {
  offre_promo: 'Offre promotionnelle / packages',
  evenement_local: 'Événement ou actualité locale',
  coin_secret: 'Coin secret ou expérience insolite',
  gastronomie: 'Gastronomie, cuisine locale, restaurant',
  temoignage_client: 'Témoignage client / retour d&apos;expérience',
  saison_voyage: 'Saison touristique (haute/basse)',
}

function buildPrompt(input: PostInput): string {
  const city = input.city
  const country = input.country || 'Sénégal'
  const tone = input.tone || 'chaleureux'

  return `Tu es Roseline Ngom, consultante franco-sénégalaise experte en marketing digital et SEO pour l'hôtellerie indépendante africaine. Tu rédiges des posts pour un hôtel qui doit booster sa présence en ligne.

CONTEXTE HÔTEL :
- Nom : ${input.hotelName}
- Ville : ${city}, ${country}
- Thème du post : ${TOPIC_LABELS[input.topic]}
- Info à mettre en avant : ${input.keyInfo}
- Ton souhaité : ${tone}

OBJECTIF PRINCIPAL : SEO LOCAL
Ces posts doivent aider l'hôtel à être trouvé sur Google quand quelqu'un cherche "hôtel ${city}", "où dormir ${city}", "séjour ${city} ${country}", etc. Tu dois donc :
- Intégrer naturellement les mots-clés géographiques (ville + pays + quartier/zone touristique si pertinent)
- Utiliser des variantes lexicales ("hôtel", "hébergement", "séjour", "week-end", "voyage")
- Le post Google Business Profile est CRUCIAL : Google l'indexe directement, c'est un signal SEO local majeur

TON ET STYLE :
- Français chaleureux, pas de jargon marketing pompeux
- Évite les superlatifs creux ("incroyable", "magique", "unique")
- Parle vrai : un vrai coin, un vrai plat, une vraie personne
- Emojis avec parcimonie (2-4 max par post)

Tu produis UNIQUEMENT du JSON valide, sans balise markdown, au format EXACT :

{
  "gbpPost": {
    "title": "<58 caractères max, punchy, avec mot-clé SEO local>",
    "body": "<150-250 caractères, phrase d'accroche + bénéfice + CTA implicite, mots-clés locaux naturels>",
    "ctaLabel": "RESERVER" | "EN_SAVOIR_PLUS" | "APPELER" | "OBTENIR_OFFRE",
    "seoKeywords": ["<mot-clé 1>", "<mot-clé 2>", "<mot-clé 3>"]
  },
  "instagramPost": {
    "caption": "<150-300 mots avec sauts de ligne \\n\\n, hook fort en 1ère ligne, storytelling, CTA final, 2-4 emojis>",
    "hashtags": ["<15 hashtags : mix local #${city.toLowerCase().replace(/\s/g, '')} #hotel${city.toLowerCase().replace(/\s/g, '')} + niche + large>"],
    "firstComment": "<2-3 lignes + 5-8 hashtags secondaires pour boost reach>"
  },
  "linkedinPost": {
    "body": "<100-200 mots, angle pro/MICE/voyage d'affaires, storytelling, pas d'emojis ou 1 seul>",
    "hashtags": ["<3 à 5 hashtags pros : #Tourisme${country} #HospitalitéAfrique etc>"]
  },
  "publishingTips": {
    "bestTime": "<Jour + heure optimale pour ${country}>",
    "frequencyAdvice": "<1 phrase sur la fréquence recommandée pour ce type de post>",
    "seoAdvice": "<1-2 phrases expliquant comment ce post renforce le SEO local de l'hôtel>"
  }
}

CONTRAINTES STRICTES :
- JSON valide uniquement, pas de commentaire ni markdown
- Aucun mensonge : n'invente pas d'infos que l'hôtelier n'a pas fournies
- Le GBP body DOIT contenir au moins 2 mots-clés locaux naturellement intégrés
- Hashtags Instagram : mélange obligatoire (3-4 hyper-locaux + 5-6 niche tourisme + 4-5 plus larges)`
}

function tryParseJson(text: string): GeneratedPost | null {
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()
  try {
    const obj = JSON.parse(cleaned)
    if (
      obj.gbpPost?.title &&
      obj.gbpPost?.body &&
      obj.instagramPost?.caption &&
      Array.isArray(obj.instagramPost?.hashtags) &&
      obj.linkedinPost?.body &&
      obj.publishingTips?.seoAdvice
    ) {
      return obj as GeneratedPost
    }
  } catch {
    /* noop */
  }
  return null
}

export async function POST(req: NextRequest) {
  let body: PostInput
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  if (!body.hotelName || !body.city || !body.topic || !body.keyInfo) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  }

  if (body.keyInfo.length > 800) {
    return NextResponse.json(
      { error: "L'info à mettre en avant est trop longue (max 800 caractères)." },
      { status: 400 }
    )
  }

  const ip = getClientIp(req.headers)
  const demoKey =
    req.cookies.get('tools_demo_key')?.value ??
    new URL(req.url).searchParams.get('demo_key')

  const rl = await checkRateLimit(
    ip,
    { toolName: 'generate_posts', perHour: 15, perDay: 40 },
    { demoKey }
  )
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error:
          "Tu as généré beaucoup de posts aujourd'hui. Réessaye dans 1 heure ou contacte Roseline directement.",
        retryAfterSeconds: rl.retryAfterSeconds,
      },
      { status: 429 }
    )
  }

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

  const prompt = buildPrompt(body)
  const client = getClaudeClient()

  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL_DEFAULT,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const raw = textBlock && 'text' in textBlock ? textBlock.text : ''
    const posts = tryParseJson(raw)

    if (!posts) {
      console.error('[generate-posts] JSON parse failed:', raw.slice(0, 500))
      return NextResponse.json(
        { error: "L'IA a produit un résultat inattendu. Réessaye dans un instant." },
        { status: 502 }
      )
    }

    const tokensIn = response.usage.input_tokens
    const tokensOut = response.usage.output_tokens
    const costEur = estimateCostEur(CLAUDE_MODEL_DEFAULT, tokensIn, tokensOut)

    recordCost(CLAUDE_MODEL_DEFAULT, tokensIn, tokensOut)

    trackUsage({
      toolName: 'generate_posts',
      userIp: ip,
      userEmail: body.email || null,
      inputData: body,
      resultSummary: `Topic ${body.topic} / ${body.city}`,
      tokensInput: tokensIn,
      tokensOutput: tokensOut,
      segment: 'hotelier',
    })

    return NextResponse.json({
      posts,
      meta: {
        tokensInput: tokensIn,
        tokensOutput: tokensOut,
        costEur,
        remainingHour: rl.remainingHour,
        remainingDay: rl.remainingDay,
      },
    })
  } catch (err) {
    console.error('[generate-posts] Claude call failed:', err)
    return NextResponse.json(
      { error: 'Erreur IA temporaire. Réessaye dans un instant.' },
      { status: 502 }
    )
  }
}
