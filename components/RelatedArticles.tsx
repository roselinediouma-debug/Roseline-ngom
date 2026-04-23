import Image from 'next/image'
import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase'

type RelatedPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  tags: string[] | null
  published_at: string | null
}

/**
 * Récupère jusqu'à `limit` articles liés.
 * 1. Priorité : articles qui partagent un tag avec la source
 * 2. Fallback : articles les plus récents (évite une section "À lire aussi" vide)
 */
export async function fetchRelatedArticles({
  currentSlug,
  tags,
  limit = 3,
}: {
  currentSlug?: string
  tags?: string[] | null
  limit?: number
}): Promise<RelatedPost[]> {
  try {
    const supabase = createServiceClient()

    // 1. Tentative par tag
    if (tags && tags.length > 0) {
      const q = supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image, tags, published_at')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .overlaps('tags', tags)
        .order('published_at', { ascending: false })
        .limit(limit)
      if (currentSlug) q.neq('slug', currentSlug)
      const { data } = await q
      if (data && data.length >= limit) return data as RelatedPost[]

      // 2. Compléter avec posts récents si pas assez
      const have = new Set((data || []).map((p) => p.slug))
      have.add(currentSlug || '')
      const missing = limit - (data?.length || 0)
      const recentQ = supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image, tags, published_at')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(limit + 3)
      const { data: recent } = await recentQ
      const fill = (recent || []).filter((p) => !have.has(p.slug)).slice(0, missing)
      return [...(data || []), ...fill] as RelatedPost[]
    }

    // Pas de tags → juste les plus récents
    const q = supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image, tags, published_at')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(limit + 1)
    if (currentSlug) q.neq('slug', currentSlug)
    const { data } = await q
    return ((data as RelatedPost[]) || []).slice(0, limit)
  } catch {
    return []
  }
}

/** Section "À lire aussi" avec jusqu'à 3 articles. Rend null si aucun article. */
export default async function RelatedArticles({
  currentSlug,
  tags,
  limit = 3,
  title = 'À lire aussi',
}: {
  currentSlug?: string
  tags?: string[] | null
  limit?: number
  title?: string
}) {
  const related = await fetchRelatedArticles({ currentSlug, tags, limit })
  if (related.length === 0) return null

  return (
    <section className="mt-16">
      <h3
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily:
            "var(--font-cormorant), 'Cormorant Garamond', serif",
          color: '#560E13',
        }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((r) => (
          <Link
            key={r.id}
            href={`/blog/${r.slug}`}
            className="block group rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#F8F5F0',
              border: '1px solid rgba(86,14,19,0.06)',
            }}
          >
            {r.cover_image && (
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={r.cover_image}
                  alt={r.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h4
                className="text-lg font-bold mb-1 line-clamp-2"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#0A0A0A',
                }}
              >
                {r.title}
              </h4>
              {r.excerpt && (
                <p
                  className="text-xs line-clamp-2"
                  style={{ color: 'rgba(10,10,10,0.6)' }}
                >
                  {r.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
