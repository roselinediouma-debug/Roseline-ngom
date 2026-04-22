import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata = buildMetadata({
  title: 'Consulting digital & IA, tourisme',
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
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Consulting digital et IA tourisme',
            description:
              "Audit, stratégie digitale et IA appliquée au tourisme. Accompagnement d'hôtels, agences et institutions.",
            slug: '/digital-ia',
            serviceType: 'Digital consulting for travel and hospitality',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Digital & IA', path: '/digital-ia' },
          ]),
        ]}
      />
      {children}
    </>
  )
}
