import { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase'
import { SITE_URL } from '@/lib/seo/metadata'

/**
 * Sitemap dynamique : routes statiques + articles de blog publiés (Supabase).
 * Exposé à /sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL

  const pillarPages = [
    '/voyages',
    '/guides',
    '/consulting',
    '/digital-ia',
    '/ressources',
  ]

  const lowPriorityPages = [
    '/blog',
    '/a-propos',
    '/ressources/newsletter',
    '/mentions-legales',
    '/politique-confidentialite',
  ]

  const routes: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    // Main pages
    { path: '/guide', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/offres', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    // Outils IA
    { path: '/outils', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/outils/calculateur-commission-booking', priority: 0.9, changeFrequency: 'monthly' },
    // Pillar pages
    ...pillarPages.map((p) => ({
      path: p,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
    // Voyages sub-pages
    { path: '/voyages/retour-aux-sources', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/voyages/voyage-signature', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/voyages/back-to-senegal', priority: 0.8, changeFrequency: 'monthly' },
    // Guides sub-pages
    { path: '/guides/guide-casamance', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guides/guide-senegal-7jours', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guides/bundle-decouverte', priority: 0.8, changeFrequency: 'monthly' },
    // Consulting sub-pages
    { path: '/consulting/audit-strategique', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/consulting/accompagnement', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/consulting/institutionnel', priority: 0.8, changeFrequency: 'monthly' },
    // Digital & IA sub-pages
    { path: '/digital-ia/presence-digitale', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/digital-ia/transformation', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/digital-ia/ia-appliquee', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/digital-ia/formations', priority: 0.8, changeFrequency: 'monthly' },
    // Ressources gratuites publiques (lead magnets diaspora + institutionnel)
    { path: '/ressources/le-bled-autrement', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ressources/benchmark-institutionnel', priority: 0.9, changeFrequency: 'monthly' },
    // Low priority pages
    ...lowPriorityPages.map((p) => ({
      path: p,
      priority: 0.5,
      changeFrequency: 'yearly' as unknown as 'monthly',
    })),
  ]

  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  )

  // Articles de blog publiés (lecture Supabase)
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createServiceClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (!error && data) {
        blogEntries = data.map((post) => ({
          url: `${base}/blog/${post.slug}`,
          lastModified: post.updated_at
            ? new Date(post.updated_at)
            : post.published_at
              ? new Date(post.published_at)
              : now,
          changeFrequency: 'monthly',
          priority: 0.8,
        }))
      }
    }
  } catch (err) {
    console.error('Sitemap: blog_posts fetch failed', err)
  }

  return [...staticEntries, ...blogEntries]
}
