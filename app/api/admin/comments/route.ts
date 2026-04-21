import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

/**
 * GET /api/admin/comments?status=pending|approved|rejected|all
 * Liste tous les commentaires pour la modération.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const supabase = createServiceClient()
    let query = supabase
      .from('blog_comments')
      .select('*')
      .order('created_at', { ascending: false })
    if (status !== 'all') query = query.eq('status', status)
    const { data, error } = await query
    if (error) throw error
    return NextResponse.json(data || [])
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    if (message.includes('non configuré')) return NextResponse.json([])
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/comments
 * Body : { id, action: 'approve'|'reject' }
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, action } = body as { id?: string; action?: 'approve' | 'reject' }
    if (!id || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'id + action requis' }, { status: 400 })
    }
    const supabase = createServiceClient()
    const { error } = await supabase
      .from('blog_comments')
      .update({
        status: action === 'approve' ? 'approved' : 'rejected',
        approved_at: action === 'approve' ? new Date().toISOString() : null,
        approved_by: action === 'approve' ? 'admin' : null,
      })
      .eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/comments?id=<uuid>
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })
    const supabase = createServiceClient()
    const { error } = await supabase.from('blog_comments').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
