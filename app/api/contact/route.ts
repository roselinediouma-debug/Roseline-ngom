import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { notifyAdmin } from '@/lib/notifications'

export async function POST(req: Request) {
  try {
    const { nom, email, objet, message } = await req.json()
    if (!email || !message) return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createServiceClient()
      await supabase.from('contacts').insert({ nom, email, objet, message, status: 'nouveau' })
    }

    await notifyAdmin({
      subject: `Nouveau message — ${objet || 'sans objet'}`,
      message: `De : ${nom || 'anonyme'} (${email})\n\nObjet : ${objet || '—'}\n\n${message}`,
      priority: 'normal',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
