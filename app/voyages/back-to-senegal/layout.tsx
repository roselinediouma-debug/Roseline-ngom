import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Back to Senegal : accompagnement entrepreneurs diaspora',
  description:
    "Programme d'accompagnement pour entrepreneurs et porteurs de projet de la diaspora qui veulent s'installer ou investir au Sénégal. Immersion, réseau, stratégie.",
  path: '/voyages/back-to-senegal',
  ogImage: '/images/og/back-to-senegal.jpg',
  keywords: [
    'entreprendre Sénégal diaspora',
    's’installer au Sénégal',
    'investir au Sénégal',
    'Back to Senegal',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
