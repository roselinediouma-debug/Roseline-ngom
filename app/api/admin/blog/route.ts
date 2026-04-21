import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    // Supabase not configured, return empty array
    if (message.includes('non configuré')) {
      return NextResponse.json([])
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServiceClient()
    const body = await request.json()

    const { title, slug, excerpt, content, cover_image, tags, status, published_at } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Titre et slug requis' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        cover_image: cover_image || null,
        tags: tags || [],
        status: status || 'draft',
        published_at: published_at || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    if (message.includes('non configuré')) {
      return NextResponse.json({ error: 'Supabase non configuré' }, { status: 503 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
