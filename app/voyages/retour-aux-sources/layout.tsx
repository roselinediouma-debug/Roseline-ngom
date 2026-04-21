import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { touristTripSchema, breadcrumbSchema, faqSchema } from '@/lib/seo/jsonld'

const FAQ_ITEMS = [
  {
    question: 'À qui s\'adresse le voyage Retour aux Sources ?',
    answer: "Ce voyage est conçu pour la diaspora sénégalaise et africaine francophone (France, Belgique, Canada) qui souhaite (re)découvrir le Sénégal en profondeur, avec ou sans enfants, en couple, en solo ou en famille. Il convient aussi aux voyageurs curieux sensibles au tourisme culturel et à la mémoire des origines."
  },
  {
    question: 'Quelle est la durée et le prix du voyage ?',
    answer: "Le voyage dure 14 jours et les tarifs commencent à 2 200 € par personne, tout compris sur place (hébergement, transport interne, accompagnement, repas listés au programme). Le vol international n'est pas inclus."
  },
  {
    question: 'Quelles régions du Sénégal sont couvertes ?',
    answer: "L'itinéraire traverse Dakar, l'île de Gorée, Saint-Louis du Sénégal, le Sine Saloum et la Casamance. C'est une immersion complète nord-sud qui combine histoire, nature et rencontres humaines."
  },
  {
    question: 'Faut-il un visa pour voyager au Sénégal depuis la France ?',
    answer: "Non, les ressortissants français, belges et canadiens n'ont pas besoin de visa pour un séjour touristique de moins de 90 jours. Un passeport valide 6 mois après la date de retour est requis."
  },
  {
    question: 'Comment se passe l\'accompagnement sur place ?',
    answer: "Roseline Ngom accompagne personnellement chaque groupe, avec une équipe locale de confiance (chauffeurs, guides, hôteliers). Le groupe compte 8 à 15 voyageurs maximum pour préserver l'intimité et la qualité des échanges."
  },
  {
    question: 'Quand partent les prochains départs ?',
    answer: "Les départs sont organisés plusieurs fois par an, généralement en saison sèche (novembre à mai). Contactez-nous pour connaître les dates ouvertes et réserver votre place."
  }
]

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
          faqSchema(FAQ_ITEMS),
        ]}
      />
      {children}
    </>
  )
}
