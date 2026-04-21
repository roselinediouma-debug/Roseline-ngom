import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { notifyAdmin } from '@/lib/notifications'

// Rate-limit simple en mémoire : max 3 commentaires / IP / heure.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 3
const ipHits = new Map<string, number[]>()

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) return false
  hits.push(now)
  ipHits.set(ip, hits)
  return true
}

/**
 * GET /api/comments?slug=<slug>
 * Retourne uniquement les commentaires approuvés pour un article.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    if (!slug) {
      return NextResponse.json({ error: 'slug requis' }, { status: 400 })
    }
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_comments')
      .select('id, author_name, content, created_at, parent_id')
      .eq('post_slug', slug)
      .eq('status', 'approved')
      .order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json(data || [])
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    if (message.includes('non configuré')) return NextResponse.json([])
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * POST /api/comments
 * Crée un commentaire en statut "pending" + notifie l'admin.
 * Body : { slug, author_name, author_email, content, parent_id?, website? (honeypot) }
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de commentaires envoyés. Réessayez dans une heure.' },
        { status: 429 },
      )
    }

    const body = await request.json()
    const { slug, author_name, author_email, content, parent_id, website } = body as {
      slug?: string
      author_name?: string
      author_email?: string
      content?: string
      parent_id?: string
      website?: string
    }

    // Honeypot : si "website" est rempli, c'est un bot. On silencieusement ignore.
    if (website && website.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    if (!slug || !author_name || !author_email || !content) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }
    if (content.length < 20 || content.length > 2000) {
      return NextResponse.json(
        { error: 'Le commentaire doit faire entre 20 et 2000 caractères' },
        { status: 400 },
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author_email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        post_slug: slug,
        author_name: author_name.slice(0, 80),
        author_email: author_email.slice(0, 150),
        content: content.slice(0, 2000),
        parent_id: parent_id || null,
        status: 'pending',
        user_ip: ip,
        user_agent: request.headers.get('user-agent')?.slice(0, 250) || null,
      })
      .select('id')
      .single()

    if (error) throw error

    // Notif admin (ne bloque pas si échoue)
    notifyAdmin({
      subject: `Nouveau commentaire à modérer, ${slug}`,
      message: [
        `Article : /blog/${slug}`,
        `Auteur : ${author_name} <${author_email}>`,
        ``,
        content.slice(0, 500) + (content.length > 500 ? '...' : ''),
        ``,
        `Valider : ${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.roselinengom.com'}/admin/comments`,
      ].join('\n'),
      priority: 'normal',
    }).catch(() => {})

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    if (message.includes('non configuré')) {
      return NextResponse.json({ error: 'Service indisponible' }, { status: 503 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
