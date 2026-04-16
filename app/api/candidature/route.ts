import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTransactionalEmail, createBrevoContact } from '@/lib/brevo'

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

    // Email de notification à Roseline
    if (process.env.BREVO_API_KEY) {
      try {
        await sendTransactionalEmail({
          to: process.env.ADMIN_EMAIL || 'roselinediouma@gmail.com',
          subject: `Nouvelle candidature Back to Senegal — ${nom}`,
          htmlContent: `
            <h2>Nouvelle candidature Back to Senegal</h2>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Telephone :</strong> ${telephone || 'Non renseigne'}</p>
            <p><strong>Nationalite :</strong> ${nationalite || 'Non renseignee'}</p>
            <p><strong>Lieu de residence :</strong> ${lieuResidence || 'Non renseigne'}</p>
            <p><strong>Projet :</strong><br>${descriptionProjet || '—'}</p>
            <p><strong>Motivation :</strong><br>${motivation || '—'}</p>
            <p><strong>LinkedIn :</strong> ${linkedinUrl || 'Non renseigne'}</p>
          `,
        })
      } catch (err) {
        console.error('Brevo notification error:', err)
      }

      // Ajouter le contact à la liste Brevo candidatures
      const listId = process.env.BREVO_CANDIDATURE_LIST_ID
      if (listId) {
        try {
          await createBrevoContact({
            email,
            attributes: { NOM: nom, TELEPHONE: telephone || '' },
            listIds: [parseInt(listId)],
          })
        } catch (err) {
          console.error('Brevo contact error:', err)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Candidature API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
