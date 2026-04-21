import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Voyage sur-mesure au Sénégal, Voyage Signature',
  description:
    "Voyage privé sur-mesure au Sénégal, conçu avec vous : itinéraire unique, hébergements d'exception, rencontres authentiques. 10 ans d'expertise terrain Roseline Ngom.",
  path: '/voyages/voyage-signature',
  ogImage: '/images/og/voyage-signature.jpg',
  keywords: [
    'voyage sur mesure Sénégal',
    'voyage privé Sénégal',
    'voyage haut de gamme Sénégal',
    'voyage luxe Sénégal',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
