import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTransactionalEmail } from '@/lib/brevo'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nom, email, telephone, typeVoyage, nbVoyageurs, dates, budget, message } = body

    if (!email || !nom) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 })
    }

    // Insert dans Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()
        await supabase.from('contacts').insert({
          nom, email, telephone, type_voyage: typeVoyage,
          nb_voyageurs: nbVoyageurs ? parseInt(nbVoyageurs) : null,
          dates, budget, message, status: 'nouveau',
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
          subject: `🌍 Nouvelle demande de devis — ${nom}`,
          htmlContent: `
            <h2>Nouvelle demande de devis voyage</h2>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
            <p><strong>Type de voyage :</strong> ${typeVoyage}</p>
            <p><strong>Voyageurs :</strong> ${nbVoyageurs}</p>
            <p><strong>Dates :</strong> ${dates || 'Non précisées'}</p>
            <p><strong>Budget :</strong> ${budget}</p>
            <p><strong>Message :</strong><br>${message || '—'}</p>
          `,
        })
      } catch (err) {
        console.error('Brevo notification error:', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Devis API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
