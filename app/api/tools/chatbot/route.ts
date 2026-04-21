import { NextResponse } from 'next/server'
import { getClaudeClient, CLAUDE_MODEL_DEFAULT } from '@/lib/claude/client'
import { checkRateLimit, getClientIp } from '@/lib/tools/rateLimit'
import { trackUsage, type Segment, type ChatbotCategory } from '@/lib/tools/trackUsage'
import { hasBudgetRemaining, recordCost } from '@/lib/tools/budgetGuard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Chatbot TripAfro : Claude Sonnet 4 avec system prompt anti-cannibalisation.
 * - Rate limit : 30/h, 150/jour par IP
 * - Mode démo : cookie tools_demo_key ou ?demo=1 + key
 * - Budget guard : coupure auto si > 28 € ce mois
 */

const SYSTEM_PROMPT = `Tu es l'assistant conversationnel du site roselinengom.com / TripAfro, incarnation digitale de Roseline Ngom, experte du tourisme au Sénégal (10 ans d'expertise terrain).

TON ET STYLE
- Tutoie, chaleureux mais professionnel.
- Réponds en français, en 50-150 mots maximum.
- Signe chaque réponse par "— L'équipe TripAfro" uniquement si c'est la fin d'une conversation (question finale traitée), pas à chaque message.
- Jamais de jargon. Exemples concrets. Ton de guide local.
- N'UTILISE PAS de markdown (pas de **gras**, pas de ##titres, pas de [liens](url)). Écris en texte simple. Les tirets "- " pour les listes sont OK.

MISSION
1. Répondre aux questions sur le Sénégal (voyage, visa, saisons, culture, sécurité, diaspora).
2. Orienter vers les offres Roseline quand c'est pertinent (consulting, voyages, guides).
3. Détecter le segment du visiteur (voyageur curieux, diaspora, hôtelier, entrepreneur, consulting).

RÈGLES ANTI-CANNIBALISATION (STRICTES)
- NE DONNE JAMAIS un itinéraire complet de plus de 2-3 jours. Au-delà, dis : "Pour un itinéraire complet sur mesure, réserve un appel avec Roseline sur https://calendly.com/roseline-ngom".
- NE DONNE JAMAIS de prix exact hors grille publique (Retour aux Sources 2200€, Voyage Signature 3500€, Guides 29€, Guide gratuit 15 expériences).
- Si demande de devis → "Pour un devis personnalisé, contacte Roseline : https://calendly.com/roseline-ngom ou WhatsApp +33 6 50 32 98 08".

DÉTECTION D'INTENTION (importante)
À la fin de chaque réponse, retourne UNIQUEMENT ce bloc JSON sur une nouvelle ligne, précédé de trois backticks et du mot "meta" :
\`\`\`meta
{"segment": "<voyageur|diaspora|hotelier|entrepreneur|consulting|null>", "category": "<DEMANDE_DEVIS|INFO_VOYAGE|CONSULTING|DIASPORA|AUTRE>", "cta": "<calendly|guide|voyage_rs|voyage_signature|bled_autrement|consulting|null>"}
\`\`\`

OFFRES DISPONIBLES À MENTIONNER
- Voyage "Retour aux Sources" : 14 jours pour la diaspora, 2200€ → /voyages/retour-aux-sources
- Voyage Signature sur mesure : à partir de 3500€ → /voyages/voyage-signature
- Guides PDF : 29€ (Casamance, Sénégal 7 jours) → /guides
- Guide gratuit 15 expériences → /guide
- Consulting digital hôtels/agences → /consulting
- Le Bled Autrement (diaspora) → /liens

SI QUESTION HORS SCOPE (politique, météo précise dans 10j, etc.) : redirige gentiment vers la mission, ou dis honnêtement "Je ne suis pas le mieux placé pour ça".`

const FALLBACK_BUDGET_MSG =
  "Je prends une petite pause ce mois-ci 😅 Pour une réponse rapide, écris directement à Roseline sur WhatsApp (+33 6 50 32 98 08) ou réserve un appel : https://calendly.com/roseline-ngom"

const FALLBACK_RATE_MSG =
  "Tu as beaucoup de questions ! Pour aller plus vite, écris-nous sur WhatsApp (+33 6 50 32 98 08) ou réserve un appel gratuit avec Roseline : https://calendly.com/roseline-ngom 📱"

type ChatMessage = { role: 'user' | 'assistant'; content: string }

/** Extrait le bloc ```meta {...}``` et renvoie reply nettoyée + meta parsée. */
function splitReplyAndMeta(raw: string): {
  reply: string
  segment: Segment
  category: ChatbotCategory
  cta: string | null
} {
  const re = /```meta\s*([\s\S]*?)```/i
  const m = raw.match(re)
  let segment: Segment = null
  let category: ChatbotCategory = null
  let cta: string | null = null
  let reply = raw
  if (m) {
    try {
      const parsed = JSON.parse(m[1].trim())
      const seg = parsed?.segment
      const cat = parsed?.category
      if (['hotelier', 'voyageur', 'diaspora', 'entrepreneur', 'consulting'].includes(seg)) {
        segment = seg as Segment
      }
      if (['DEMANDE_DEVIS', 'INFO_VOYAGE', 'CONSULTING', 'DIASPORA', 'AUTRE'].includes(cat)) {
        category = cat as ChatbotCategory
      }
      cta = typeof parsed?.cta === 'string' && parsed.cta !== 'null' ? parsed.cta : null
    } catch {
      /* ignore */
    }
    reply = raw.replace(re, '').trim()
  }
  return { reply, segment, category, cta }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req.headers)
    const url = new URL(req.url)
    const demoKeyParam = url.searchParams.get('key')
    const demoKeyCookie = req.headers
      .get('cookie')
      ?.split(';')
      .find((c) => c.trim().startsWith('tools_demo_key='))
      ?.split('=')[1]

    const body = await req.json()
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : []
    const sessionId: string | null = body?.sessionId ?? null

    if (!messages.length) {
      return NextResponse.json({ error: 'messages vide' }, { status: 400 })
    }
    // Safety : limiter à 20 derniers messages envoyés au modèle
    const trimmed = messages.slice(-20)

    // 1. Rate limit (skipped en mode démo)
    const rl = await checkRateLimit(
      ip,
      { toolName: 'chatbot', perHour: 30, perDay: 150 },
      { demoKey: demoKeyParam || demoKeyCookie || null }
    )
    if (!rl.allowed) {
      return NextResponse.json({
        reply: FALLBACK_RATE_MSG,
        rateLimited: true,
        retryAfterSeconds: rl.retryAfterSeconds,
      })
    }

    // 2. Budget guard mensuel
    const budget = await hasBudgetRemaining()
    if (!budget.ok) {
      return NextResponse.json({
        reply: FALLBACK_BUDGET_MSG,
        budgetCapped: true,
      })
    }

    // 3. Appel Claude
    const claude = getClaudeClient()
    const resp = await claude.messages.create({
      model: CLAUDE_MODEL_DEFAULT,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: trimmed.map((m) => ({ role: m.role, content: m.content })),
    })

    const rawText = resp.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('\n')

    const { reply, segment, category, cta } = splitReplyAndMeta(rawText)

    const tokensIn = resp.usage?.input_tokens ?? 0
    const tokensOut = resp.usage?.output_tokens ?? 0

    // 4. Record cost + usage (best-effort, never throw)
    await Promise.all([
      recordCost(CLAUDE_MODEL_DEFAULT, tokensIn, tokensOut),
      trackUsage({
        toolName: 'chatbot',
        userIp: ip,
        segment,
        category,
        sessionId,
        tokensInput: tokensIn,
        tokensOutput: tokensOut,
        inputData: { lastUserMsg: trimmed[trimmed.length - 1]?.content?.slice(0, 500) },
        resultSummary: reply.slice(0, 500),
      }),
    ])

    return NextResponse.json({
      reply,
      segment,
      category,
      cta,
      usage: { tokensIn, tokensOut },
    })
  } catch (err) {
    console.error('[chatbot] error:', err)
    return NextResponse.json(
      {
        reply:
          "Désolé, petit souci technique. Réessaie dans un instant ou écris sur WhatsApp : +33 6 50 32 98 08.",
        error: 'internal',
      },
      { status: 200 }
    )
  }
}
