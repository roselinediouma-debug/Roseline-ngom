import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { touristTripSchema, breadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata = buildMetadata({
  title: 'Retour aux Sources : voyage diaspora au Sénégal (14 jours)',
  description:
    "Voyage immersif en groupe (8-15) de 14 jours pour la diaspora sénégalaise. Dakar, Gorée, Saint-Louis, Sine Saloum, Casamance. Accompagnement Roseline Ngom dès 2 200 €.",
  path: '/voyages/retour-aux-sources',
  ogImage: '/images/og/retour-aux-sources.jpg',
  keywords: [
    'voyage diaspora Sénégal',
    'retour au pays Sénégal',
    'voyage racines Sénégal',
    'Retour aux Sources',
    'voyage groupe Sénégal',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          ...touristTripSchema({
            name: 'Retour aux Sources, voyage diaspora au Sénégal (14 jours)',
            description:
              "Voyage immersif en groupe (8-15) de 14 jours pour la diaspora sénégalaise. Dakar, Gorée, Saint-Louis, Sine Saloum, Casamance.",
            slug: '/voyages/retour-aux-sources',
            image: '/images/og/retour-aux-sources.jpg',
            priceFrom: 2200,
            durationDays: 14,
            itineraryPlaces: ['Dakar', 'Île de Gorée', 'Saint-Louis', 'Sine Saloum', 'Casamance'],
            aggregateRating: { ratingValue: 4.9, reviewCount: 47 },
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Voyages', path: '/voyages' },
            { name: 'Retour aux Sources', path: '/voyages/retour-aux-sources' },
          ]),
        ]}
      />
      {children}
    </>
  )
}
