import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Benchmark Bénin · Maroc · Rwanda : politique touristique (PDF)',
  description:
    "Benchmark institutionnel gratuit : ce que le Sénégal peut apprendre du Bénin, du Maroc et du Rwanda en matière de stratégie touristique. Pour décideurs tourisme.",
  path: '/ressources/benchmark-institutionnel',
  ogImage: '/images/og/benchmark.jpg',
  keywords: [
    'politique touristique Sénégal',
    'benchmark tourisme Afrique',
    'stratégie tourisme',
    'ministère du tourisme',
    'développement touristique',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
