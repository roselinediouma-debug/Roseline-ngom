import { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase'
import { SITE_URL } from '@/lib/seo/metadata'

/**
 * Sitemap dynamique V3 — Roseline Ngom, maison de pensée francophone.
 * Architecture : Idée · Indice · Travaux · Interventions · Advisory · À propos.
 * Les routes legacy (/voyages, /guides, /consulting, /digital-ia, /outils, /expertise)
 * ont été redirigées via 301 vers tripafro.com et supprimées du site.
 * Exposé à /sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL

  const routes: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },

    // Architecture V3 — pages cœur
    { path: '/idee', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/indice', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/advisory', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/travaux', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/interventions', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/a-propos', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },

    // Ressources institutionnelles conservées (benchmark + newsletter)
    { path: '/ressources', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/ressources/benchmark-institutionnel', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ressources/newsletter', priority: 0.6, changeFrequency: 'monthly' },

    // Blog (Journal) — sera renommé /journal dans une session ultérieure
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },

    // Low priority
    { path: '/liens', priority: 0.4, changeFrequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
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
  // Filtre uniquement les articles taggés target_domain = 'roseline-perso'
  // (les articles 'tripafro' migrent vers tripafro.com/fr/articles/[slug])
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createServiceClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at, target_domain')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

      if (!error && data) {
        blogEntries = data
          .filter((post) => !post.target_domain || post.target_domain === 'roseline-perso')
          .map((post) => ({
            url: `${base}/blog/${post.slug}`,
            lastModified: post.updated_at
              ? new Date(post.updated_at)
              : post.published_at
                ? new Date(post.published_at)
                : now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          }))
      }
    }
  } catch (err) {
    console.error('Sitemap: blog_posts fetch failed', err)
  }

  return [...staticEntries, ...blogEntries]
}
