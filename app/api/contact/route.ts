import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTransactionalEmail } from '@/lib/brevo'

export async function POST(req: Request) {
  try {
    const { nom, email, objet, message } = await req.json()
    if (!email || !message) return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createServiceClient()
      await supabase.from('contacts').insert({ nom, email, objet, message, status: 'nouveau' })
    }

    if (process.env.BREVO_API_KEY) {
      await sendTransactionalEmail({
        to: process.env.ADMIN_EMAIL || 'roselinediouma@gmail.com',
        subject: `✉️ Nouveau message — ${objet} — ${nom}`,
        htmlContent: `<p><strong>De :</strong> ${nom} (${email})</p><p><strong>Objet :</strong> ${objet}</p><p>${message}</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
