import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase'
import { createBrevoContact } from '@/lib/brevo'
import { notifyAdmin } from '@/lib/notifications'

/**
 * Candidature Back to Senegal, page /voyages/back-to-senegal.
 * 1. Insert dans public.candidatures_bts
 * 2. Scoring IA avec Claude Haiku (score 0-100 + résumé)
 * 3. Sync Brevo + notification admin avec le score
 */

interface ScoringResult {
  score: number
  resume: string
}

async function scoreWithClaude(payload: {
  typeProjet: string
  maturite: string
  budget: string
  description: string
  cohorte: string
  ville: string
}): Promise<ScoringResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  try {
    const anthropic = new Anthropic({ apiKey })
    const prompt = `Tu es l'assistant de Roseline Ngom, qui accompagne des entrepreneurs de la diaspora africaine à lancer un projet au Sénégal ("Back to Senegal"). Évalue la candidature suivante et produis UN SEUL objet JSON valide.

Critères de scoring (0-100) :
- Clarté et maturité du projet (0-30)
- Cohérence budget / projet (0-20)
- Réalisme de la démarche (0-20)
- Capacité à bénéficier de l'accompagnement (0-15)
- Motivation et engagement (0-15)

Candidature :
- Type de projet : ${payload.typeProjet}
- Maturité : ${payload.maturite}
- Budget : ${payload.budget || 'non précisé'}
- Ville souhaitée : ${payload.ville || 'non précisée'}
- Cohorte demandée : ${payload.cohorte}
- Description :
${payload.description}

Réponds UNIQUEMENT avec ce JSON, sans texte autour :
{"score": <entier 0-100>, "resume": "<résumé 2-3 phrases en français, ton factuel, mets en avant forces et points de vigilance>"}`

    const resp = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = resp.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('\n')
      .trim()

    // Extraire le JSON même si le modèle a ajouté du texte
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    const parsed = JSON.parse(match[0]) as ScoringResult
    if (typeof parsed.score !== 'number' || typeof parsed.resume !== 'string') return null
    parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)))
    return parsed
  } catch (err) {
    console.error('Claude scoring error:', err)
    return null
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      prenom,
      nom,
      email,
      whatsapp,
      ville,
      cohorte,
      typeProjet,
      maturite,
      budget,
      description,
    } = body

    if (!email || !prenom || !nom || !typeProjet || !maturite || !cohorte || !description) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Scoring IA (non bloquant)
    const scoring = await scoreWithClaude({
      typeProjet,
      maturite,
      budget: budget || '',
      description,
      cohorte,
      ville: ville || '',
    })

    // Insert dans Supabase
    let candidatureId: string | null = null
    let leadId: string | null = null
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()

        const { data: lead } = await supabase
          .from('leads')
          .upsert(
            {
              email,
              nom: `${prenom} ${nom}`.trim(),
              whatsapp: whatsapp || null,
              ville: ville || null,
              offre_interet: 'back_to_senegal',
              source: 'candidature_bts',
              statut: 'nouveau',
              score: scoring?.score ?? null,
            },
            { onConflict: 'email' }
          )
          .select('id')
          .single()
        leadId = lead?.id || null

        const { data: cand } = await supabase
          .from('candidatures_bts')
          .insert({
            lead_id: leadId,
            prenom,
            nom,
            email,
            whatsapp: whatsapp || null,
            ville: ville || null,
            cohorte,
            type_projet: typeProjet,
            maturite,
            budget_projet: budget || null,
            description,
            score_ia: scoring?.score ?? null,
            resume_ia: scoring?.resume ?? null,
            statut: 'nouvelle',
          })
          .select('id')
          .single()
        candidatureId = cand?.id || null
      } catch (err) {
        console.error('Supabase candidature_bts insert error:', err)
      }
    }

    // Sync Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        const listIds = process.env.BREVO_CANDIDATURE_LIST_ID
          ? [parseInt(process.env.BREVO_CANDIDATURE_LIST_ID)]
          : undefined
        await createBrevoContact({
          email,
          attributes: {
            PRENOM: prenom,
            NOM: nom,
            WHATSAPP: whatsapp || '',
            TYPE_PROJET: typeProjet,
            SCORE_IA: scoring?.score != null ? String(scoring.score) : '',
          },
          listIds,
        })
      } catch (err) {
        console.error('Brevo contact error:', err)
      }
    }

    // Notification admin avec score
    const scoreLabel = scoring ? `${scoring.score}/100` : 'non scoré'
    const priority: 'high' | 'normal' = !scoring || scoring.score >= 60 ? 'high' : 'normal'
    await notifyAdmin({
      subject: `Candidature BTS [${scoreLabel}], ${prenom} ${nom}`,
      message: [
        `Score IA : ${scoreLabel}`,
        scoring ? `Résumé IA : ${scoring.resume}` : null,
        '',
        `Contact : ${prenom} ${nom} · ${email} · ${whatsapp || 'pas de WhatsApp'}`,
        `Ville : ${ville || '-'}`,
        `Cohorte : ${cohorte}`,
        `Type projet : ${typeProjet}`,
        `Maturité : ${maturite}`,
        `Budget projet : ${budget || '-'}`,
        '',
        `Description :`,
        description,
      ]
        .filter(Boolean)
        .join('\n'),
      priority,
    })

    return NextResponse.json({
      success: true,
      candidatureId,
      leadId,
      score: scoring?.score ?? null,
    })
  } catch (err) {
    console.error('Candidature BTS API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
