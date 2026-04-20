import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTransactionalEmail } from '@/lib/brevo'
import { getWelcomeEmail } from '@/lib/emails/welcomeSequence'

/**
 * Cron Vercel — séquence de bienvenue (5 emails).
 *
 * Déclenchement : quotidien via vercel.json (cf. "crons" field).
 * Protection : header `Authorization: Bearer ${CRON_SECRET}` (Vercel l'ajoute auto).
 *
 * Planning :
 *   J+0  : guideDelivery (envoyé immédiatement depuis /api/capture)
 *   J+1  : step1 — Bienvenue + Instagram
 *   J+3  : step2 — 3 erreurs à éviter
 *   J+7  : step3 — Guide 7 jours
 *   J+14 : step4 — Casamance
 *   J+21 : step5 — Bundle
 *
 * Logique : pour chaque lead non-unsubscribed,
 *   on calcule `daysSinceSignup` et on envoie le plus haut step
 *   dont le jour est atteint ET qui n'a pas encore été envoyé (welcome_step < step).
 *   On n'envoie qu'un seul email par lead par exécution (cohérent avec 1 run/jour).
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const SCHEDULE: { step: 1 | 2 | 3 | 4 | 5; day: number }[] = [
  { step: 1, day: 1 },
  { step: 2, day: 3 },
  { step: 3, day: 7 },
  { step: 4, day: 14 },
  { step: 5, day: 21 },
]

function daysBetween(from: Date, to: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor((to.getTime() - from.getTime()) / msPerDay)
}

export async function GET(req: Request) {
  // Auth — Vercel cron envoie le header Authorization: Bearer $CRON_SECRET
  const authHeader = req.headers.get('authorization')
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
  }
  if (!process.env.BREVO_API_KEY) {
    return NextResponse.json({ error: 'Brevo non configuré' }, { status: 500 })
  }

  const supabase = createServiceClient()

  // On récupère les leads venant du guide, pas désabonnés, créés dans les 25 derniers jours
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - 25)

  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, email, prenom, created_at, welcome_step, unsubscribed')
    .eq('source', 'guide-pdf')
    .gte('created_at', minDate.toISOString())
    .or('unsubscribed.is.null,unsubscribed.eq.false')
    .lt('welcome_step', 5)

  if (error) {
    console.error('Cron leads query error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const now = new Date()
  const results: { email: string; step: number; status: string; error?: string }[] = []

  for (const lead of leads ?? []) {
    const createdAt = new Date(lead.created_at)
    const days = daysBetween(createdAt, now)
    const currentStep = lead.welcome_step ?? 0

    // Trouver le plus haut step éligible
    const eligible = SCHEDULE.filter(
      (s) => s.day <= days && s.step > currentStep
    )
    if (eligible.length === 0) continue

    // On prend le plus petit step non envoyé (envoi ordonné, pas de skip)
    const next = eligible[0]
    const prenom = (lead.prenom?.trim() || 'Voyageur') as string

    try {
      const { subject, htmlContent } = getWelcomeEmail(next.step, prenom)
      await sendTransactionalEmail({ to: lead.email, subject, htmlContent })

      await supabase
        .from('leads')
        .update({ welcome_step: next.step, welcome_last_sent_at: now.toISOString() })
        .eq('id', lead.id)

      results.push({ email: lead.email, step: next.step, status: 'sent' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`Cron send failed for ${lead.email}:`, msg)
      results.push({ email: lead.email, step: next.step, status: 'failed', error: msg })
    }
  }

  return NextResponse.json({
    ok: true,
    processed: results.length,
    total_leads_checked: leads?.length ?? 0,
    results,
  })
}
