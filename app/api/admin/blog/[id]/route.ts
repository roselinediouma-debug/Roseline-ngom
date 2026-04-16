import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Article introuvable' }, { status: 404 })

    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()
    const body = await request.json()

    const { title, slug, excerpt, content, cover_image, tags, status, published_at } = body

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title,
        slug,
        excerpt,
        content,
        cover_image,
        tags,
        status,
        published_at,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
