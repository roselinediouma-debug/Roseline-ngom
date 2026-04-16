import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  try {
    const sb = createServiceClient()
    const { data, error } = await sb
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('API newsletter GET error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}
