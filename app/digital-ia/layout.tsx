import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Consulting digital & IA pour hôtels et agences de tourisme',
  description:
    "Audit, stratégie digitale et IA appliquée au tourisme. Accompagnement d'hôtels, agences et institutions pour accélérer leur transformation numérique.",
  path: '/digital-ia',
  ogImage: '/images/og/digital-ia.jpg',
  keywords: [
    'consulting digital hôtel',
    'audit digital hôtelier',
    'IA tourisme',
    'transformation digitale tourisme',
    'stratégie digitale agence voyage',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
