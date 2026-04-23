import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { createBrevoContact, sendTransactionalEmail } from '@/lib/brevo'
import { guideDeliveryEmail } from '@/lib/emails/guideDelivery'
import { bledAutrementDeliveryEmail } from '@/lib/emails/bledAutrementDelivery'
import { benchmarkInstitutionnelDeliveryEmail } from '@/lib/emails/benchmarkInstitutionnelDelivery'
import { notifyAdmin } from '@/lib/notifications'

type LeadMagnet = {
  label: string
  listIdEnv: string
  tag: string
  buildEmail: (args: { prenom: string; organisation?: string }) => {
    subject: string
    htmlContent: string
  }
}

/** Mapping source → lead magnet (Brevo list, tag, email de livraison). */
const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'guide-pdf': {
    label: 'Guide 15 expériences',
    listIdEnv: 'BREVO_GUIDE_LIST_ID',
    tag: 'lead-guide',
    buildEmail: ({ prenom }) => guideDeliveryEmail({ prenom }),
  },
  'le-bled-autrement': {
    label: 'Le Bled Autrement (diaspora)',
    listIdEnv: 'BREVO_BLED_LIST_ID',
    tag: 'lead-bled-autrement',
    buildEmail: ({ prenom }) => bledAutrementDeliveryEmail({ prenom }),
  },
  'benchmark-institutionnel': {
    label: 'Benchmark institutionnel',
    listIdEnv: 'BREVO_INSTITUTIONNEL_LIST_ID',
    tag: 'lead-institutionnel',
    buildEmail: ({ prenom, organisation }) =>
      benchmarkInstitutionnelDeliveryEmail({ prenom, organisation }),
  },
}

export async function POST(req: Request) {
  try {
    const {
      prenom = '',
      email,
      source = 'guide-pdf',
      organisation = '',
    } = await req.json()

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()
    const prenomClean = prenom.trim()
    const organisationClean = organisation.trim()
    const magnet = LEAD_MAGNETS[source] || LEAD_MAGNETS['guide-pdf']

    // 1. Insert dans Supabase (si configuré)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()
        const { error: dbError } = await supabase.from('leads').upsert(
          {
            email: emailLower,
            prenom: organisationClean
              ? `${prenomClean || 'Pro'} · ${organisationClean}`
              : prenomClean,
            source,
            tags: ['lead-magnet', magnet.tag],
          },
          { onConflict: 'email' }
        )
        if (dbError) console.error('Supabase error:', dbError)
      } catch (err) {
        console.error('Supabase insert failed:', err)
      }
    }

    // 2. Créer contact Brevo + ajouter à la liste correspondant à la source
    if (process.env.BREVO_API_KEY) {
      const rawListId = process.env[magnet.listIdEnv]
      const listId = rawListId ? parseInt(rawListId) : undefined

      try {
        await createBrevoContact({
          email: emailLower,
          attributes: {
            PRENOM: prenomClean || 'Voyageur',
            SOURCE: source,
            ...(organisationClean ? { ORGANISATION: organisationClean } : {}),
          },
          listIds: listId ? [listId] : [],
        })
      } catch (err) {
        console.error('Brevo contact creation failed:', err)
      }

      // 3. Envoyer l'email de livraison adapté à la source
      try {
        const { subject, htmlContent } = magnet.buildEmail({
          prenom: prenomClean,
          organisation: organisationClean,
        })
        await sendTransactionalEmail({
          to: emailLower,
          subject,
          htmlContent,
        })
      } catch (err) {
        console.error('Brevo email delivery failed:', err)
      }
    }

    // 4. Notification Roseline
    await notifyAdmin({
      subject: `Nouveau lead, ${magnet.label}`,
      message: `${prenomClean || 'Visiteur'} (${emailLower}) vient de télécharger ${magnet.label}.${
        organisationClean ? `\nOrganisation : ${organisationClean}` : ''
      }\nSource : ${source}`,
      priority: 'normal',
    })

    return NextResponse.json({ success: true, redirect: `/merci/${source}` })
  } catch (err) {
    console.error('Capture API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
