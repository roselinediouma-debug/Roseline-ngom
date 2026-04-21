import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Roseline Ngom, Fondatrice TripAfro, experte voyage Sénégal',
  description:
    "Franco-sénégalaise, 10 ans d'expérience terrain, 2 000+ voyageurs accompagnés. Fondatrice TripAfro, experte voyage Sénégal et consulting digital tourisme.",
  path: '/a-propos',
  ogImage: '/images/og/a-propos.jpg',
  ogType: 'profile',
  keywords: [
    'Roseline Ngom',
    'fondatrice TripAfro',
    'experte Sénégal',
    'consultante tourisme Afrique',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
