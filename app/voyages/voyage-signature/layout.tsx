import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { touristTripSchema, breadcrumbSchema } from '@/lib/seo/jsonld'

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
  return (
    <>
      <JsonLd
        data={[
          ...touristTripSchema({
            name: 'Voyage Signature, Sénégal sur-mesure',
            description:
              "Voyage privé sur-mesure au Sénégal : itinéraire unique, hébergements d'exception, rencontres authentiques. Conçu avec Roseline Ngom.",
            slug: '/voyages/voyage-signature',
            image: '/images/og/voyage-signature.jpg',
            priceFrom: 3500,
            durationDays: 10,
            itineraryPlaces: ['Dakar', 'Lac Rose', 'Sine Saloum', 'Saint-Louis', 'Lompoul', 'Casamance'],
            aggregateRating: { ratingValue: 4.9, reviewCount: 32 },
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Voyages', path: '/voyages' },
            { name: 'Voyage Signature', path: '/voyages/voyage-signature' },
          ]),
        ]}
      />
      {children}
    </>
  )
}
