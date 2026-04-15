import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { createBrevoContact, sendTransactionalEmail } from '@/lib/brevo'
import { guideDeliveryEmail } from '@/lib/emails/guideDelivery'

export async function POST(req: Request) {
  try {
    const { prenom = '', email, source = 'guide-pdf' } = await req.json()

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()

    // 1. Insert dans Supabase (si configuré)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()
        const { error: dbError } = await supabase.from('leads').upsert(
          {
            email: emailLower,
            prenom: prenom.trim(),
            source,
            tags: ['lead-magnet'],
          },
          { onConflict: 'email' }
        )
        if (dbError) console.error('Supabase error:', dbError)
      } catch (err) {
        console.error('Supabase insert failed:', err)
      }
    }

    // 2. Créer contact Brevo + ajouter à la liste "Guide PDF"
    if (process.env.BREVO_API_KEY) {
      const listId = process.env.BREVO_GUIDE_LIST_ID
        ? parseInt(process.env.BREVO_GUIDE_LIST_ID)
        : undefined

      try {
        await createBrevoContact({
          email: emailLower,
          attributes: {
            PRENOM: prenom.trim() || 'Voyageur',
            SOURCE: source,
          },
          listIds: listId ? [listId] : [],
        })
      } catch (err) {
        console.error('Brevo contact creation failed:', err)
        // On continue même si Brevo échoue
      }

      // 3. Envoyer l'email de livraison du guide
      try {
        const { subject, htmlContent } = guideDeliveryEmail({ prenom: prenom.trim() })
        await sendTransactionalEmail({
          to: emailLower,
          subject,
          htmlContent,
        })
      } catch (err) {
        console.error('Brevo email delivery failed:', err)
        // Le fallback /guide/merci affiche un lien de téléchargement direct
      }
    }

    return NextResponse.json({ success: true, redirect: '/guide/merci' })
  } catch (err) {
    console.error('Capture API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
