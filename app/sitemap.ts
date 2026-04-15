import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://roselinengom.com'
  const routes = ['', '/guide', '/offres', '/voyages', '/conseil', '/contact']

  return routes.map(route => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
