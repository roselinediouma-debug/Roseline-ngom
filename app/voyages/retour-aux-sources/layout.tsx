import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { touristTripSchema, breadcrumbSchema, faqSchema } from '@/lib/seo/jsonld'

const FAQ_ITEMS = [
  {
    question: 'À qui s\'adresse le voyage Retour aux Sources ?',
    answer: "Ce voyage est conçu pour la diaspora sénégalaise et africaine francophone (France, Belgique, Canada) qui souhaite (re)découvrir le Sénégal en profondeur, avec ou sans enfants, en couple, en solo ou en famille. Il convient aussi aux voyageurs curieux sensibles au tourisme culturel et à la mémoire des origines."
  },
  {
    question: 'Quels sont les formats et les tarifs ?',
    answer: "Deux formats : 7 jours (Nord : Dakar, Gorée, Lac Rose, Lompoul, Saint-Louis, Djoudj) à partir de 1 795 € Early Bird, ou 14 jours (Nord + Sud avec Sine Saloum, Saly, Somone, Bandia) à partir de 2 450 € Early Bird. Le départ de décembre (20 déc. - 2 janv.) applique un supplément de +45% pour la haute saison des fêtes."
  },
  {
    question: 'Quelles régions du Sénégal sont couvertes ?',
    answer: "Le 7 jours couvre Dakar, l'île de Gorée, le Lac Rose, le désert de Lompoul, la Langue de Barbarie, Saint-Louis du Sénégal et le Parc du Djoudj. Le 14 jours ajoute Kaolack, le Sine Saloum (Ndangane), Saly, la Somone et la réserve de Bandia."
  },
  {
    question: 'Faut-il un visa pour voyager au Sénégal depuis la France ?',
    answer: "Non, les ressortissants français, belges et canadiens n'ont pas besoin de visa pour un séjour touristique de moins de 90 jours. Un passeport valide 6 mois après la date de retour est requis."
  },
  {
    question: 'Comment se passe l\'accompagnement sur place ?',
    answer: "Roseline Ngom accompagne personnellement chaque groupe, avec une équipe locale de confiance (chauffeurs, guides, hôteliers). Le groupe est limité à 15 voyageurs maximum pour préserver l'intimité et la qualité des échanges."
  },
  {
    question: 'Quand partent les prochains départs ?',
    answer: "Trois départs programmés en 2026 : juillet, août et décembre. Le départ de décembre applique un supplément de +45% haute saison. Demandez le programme détaillé pour connaître les dates précises et réserver votre place."
  }
]

export const metadata = buildMetadata({
  title: 'Retour aux Sources : voyage diaspora Sénégal 7 ou 14 j',
  description:
    "Voyage immersif en groupe (15 max) au Sénégal pour la diaspora. Format 7 j (Nord) dès 1 795 € ou 14 j (Nord + Sud) dès 2 450 €. Avec Roseline Ngom. Départs juillet, août et décembre 2026.",
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
            name: 'Retour aux Sources, voyage diaspora au Sénégal',
            description:
              "Voyage immersif en groupe (15 max) au Sénégal pour la diaspora sénégalaise. Deux formats au choix : 7 jours (Nord) ou 14 jours (Nord + Sud).",
            slug: '/voyages/retour-aux-sources',
            image: '/images/og/retour-aux-sources.jpg',
            priceFrom: 1795,
            durationDays: 7,
            itineraryPlaces: ['Dakar', 'Île de Gorée', 'Lac Rose', 'Lompoul', 'Saint-Louis', 'Djoudj', 'Sine Saloum'],
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
