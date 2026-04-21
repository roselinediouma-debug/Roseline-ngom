import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { touristTripSchema, breadcrumbSchema } from '@/lib/seo/jsonld'

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
  return (
    <>
      <JsonLd
        data={[
          ...touristTripSchema({
            name: 'Back to Senegal, accompagnement entrepreneurs diaspora',
            description:
              "Programme d'accompagnement 7 jours pour entrepreneurs diaspora qui veulent s'installer ou investir au Sénégal : immersion, réseau, stratégie.",
            slug: '/voyages/back-to-senegal',
            image: '/images/og/back-to-senegal.jpg',
            priceFrom: 2800,
            durationDays: 7,
            itineraryPlaces: ['Dakar', 'Almadies', 'Diamniadio', 'Mbour', 'Saly'],
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Voyages', path: '/voyages' },
            { name: 'Back to Senegal', path: '/voyages/back-to-senegal' },
          ]),
        ]}
      />
      {children}
    </>
  )
}
