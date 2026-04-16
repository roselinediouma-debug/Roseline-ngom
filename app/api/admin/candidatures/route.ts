import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  try {
    const sb = createServiceClient()
    const { data, error } = await sb
      .from('candidatures')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('API candidatures GET error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, statut } = await request.json()

    if (!id || !statut) {
      return NextResponse.json(
        { error: 'id et statut sont requis' },
        { status: 400 }
      )
    }

    const sb = createServiceClient()
    const { error } = await sb
      .from('candidatures')
      .update({ statut })
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API candidatures PUT error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}
