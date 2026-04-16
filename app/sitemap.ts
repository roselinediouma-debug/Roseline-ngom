import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://roselinengom.com'

  const pillarPages = ['/voyages', '/guides', '/consulting', '/digital-ia', '/ressources']

  const lowPriorityPages = ['/blog', '/a-propos', '/ressources/newsletter']

  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1.0 },
    // Main pages
    { path: '/guide', priority: 0.8 },
    { path: '/offres', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    // Pillar pages
    ...pillarPages.map(p => ({ path: p, priority: 0.9 })),
    // Voyages sub-pages
    { path: '/voyages/retour-aux-sources', priority: 0.8 },
    { path: '/voyages/voyage-signature', priority: 0.8 },
    { path: '/voyages/back-to-senegal', priority: 0.8 },
    // Guides sub-pages
    { path: '/guides/guide-casamance', priority: 0.8 },
    { path: '/guides/guide-senegal-7jours', priority: 0.8 },
    { path: '/guides/bundle-decouverte', priority: 0.8 },
    // Consulting sub-pages
    { path: '/consulting/audit-strategique', priority: 0.8 },
    { path: '/consulting/accompagnement', priority: 0.8 },
    { path: '/consulting/institutionnel', priority: 0.8 },
    // Digital & IA sub-pages
    { path: '/digital-ia/presence-digitale', priority: 0.8 },
    { path: '/digital-ia/transformation', priority: 0.8 },
    { path: '/digital-ia/ia-appliquee', priority: 0.8 },
    { path: '/digital-ia/formations', priority: 0.8 },
    // Ressources sub-pages
    { path: '/ressources/checklist-voyage', priority: 0.8 },
    // Low priority pages
    ...lowPriorityPages.map(p => ({ path: p, priority: 0.7 })),
  ]

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))
}
