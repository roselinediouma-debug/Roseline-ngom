import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { notifyAdmin } from '@/lib/notifications'

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

    await notifyAdmin({
      subject: `Demande de devis — ${nom}`,
      message: [
        `Type : ${typeVoyage || '—'}`,
        `Voyageurs : ${nbVoyageurs || '—'}`,
        `Dates : ${dates || '—'}`,
        `Budget : ${budget || '—'}`,
        '',
        `Contact : ${nom} · ${email} · ${telephone || 'pas de tél'}`,
        '',
        `Message : ${message || '—'}`,
      ].join('\n'),
      priority: 'high',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Devis API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
