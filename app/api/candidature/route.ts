import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { createBrevoContact } from '@/lib/brevo'
import { notifyAdmin } from '@/lib/notifications'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nom, email, telephone, nationalite, lieuResidence, descriptionProjet, motivation, linkedinUrl } = body

    if (!email || !nom) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 })
    }

    // Insert dans Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()
        await supabase.from('candidatures').insert({
          nom,
          email,
          telephone,
          nationalite,
          lieu_residence: lieuResidence,
          description_projet: descriptionProjet,
          motivation,
          linkedin_url: linkedinUrl,
          status: 'nouveau',
        })
      } catch (err) {
        console.error('Supabase insert error:', err)
      }
    }

    // Ajouter le contact à la liste Brevo candidatures
    if (process.env.BREVO_API_KEY && process.env.BREVO_CANDIDATURE_LIST_ID) {
      try {
        await createBrevoContact({
          email,
          attributes: { NOM: nom, TELEPHONE: telephone || '' },
          listIds: [parseInt(process.env.BREVO_CANDIDATURE_LIST_ID)],
        })
      } catch (err) {
        console.error('Brevo contact error:', err)
      }
    }

    // Notification Roseline (email + WhatsApp)
    await notifyAdmin({
      subject: `Candidature Back to Senegal, ${nom}`,
      message: [
        `Nom : ${nom}`,
        `Email : ${email}`,
        `Téléphone : ${telephone || '-'}`,
        `Nationalité : ${nationalite || '-'}`,
        `Résidence : ${lieuResidence || '-'}`,
        `LinkedIn : ${linkedinUrl || '-'}`,
        '',
        `Projet : ${descriptionProjet || '-'}`,
        '',
        `Motivation : ${motivation || '-'}`,
      ].join('\n'),
      priority: 'high',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Candidature API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
