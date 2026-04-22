import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/seo/jsonld'

export const metadata = buildMetadata({
  title: 'Guide gratuit : 15 expériences secrètes au Sénégal',
  description:
    "Mon carnet d'adresses personnel. 15 lieux, contacts directs, astuces locales pour un voyage authentique au Sénégal. PDF 33 pages à télécharger gratuitement.",
  path: '/ressources/guide-15-experiences',
  ogImage: '/images/og/guide.jpg',
  keywords: [
    'guide Sénégal gratuit',
    'que visiter au Sénégal',
    'Sénégal authentique',
    'conseils voyage Sénégal',
  ],
})

const FAQ_ITEMS = [
  {
    question: 'Le guide est-il vraiment gratuit ?',
    answer: "Oui, le guide « 15 expériences secrètes au Sénégal » est 100 % gratuit. Vous recevez le PDF (33 pages) par email après avoir renseigné votre prénom et votre adresse email."
  },
  {
    question: 'Quel est le contenu du guide ?',
    answer: "Le guide rassemble 15 expériences authentiques sélectionnées par Roseline Ngom après 10 ans de terrain au Sénégal : lieux, rencontres, adresses, contacts directs à Dakar, en Casamance, dans le Sine Saloum, à Saint-Louis et dans le désert de Lompoul."
  },
  {
    question: 'À qui s\'adresse ce guide ?',
    answer: "Il est pensé pour les voyageurs curieux qui préparent un premier voyage au Sénégal ou qui veulent sortir des circuits classiques, ainsi que pour la diaspora qui souhaite redécouvrir le pays autrement."
  },
  {
    question: 'Quand partir au Sénégal ?',
    answer: "La meilleure période est la saison sèche, de novembre à mai, avec des températures agréables (25-30°C) et peu d'humidité. La saison des pluies (juillet-octobre) offre en revanche une nature luxuriante et moins de touristes."
  },
  {
    question: 'Faut-il un visa pour le Sénégal ?',
    answer: "Non, les Français, Belges et Canadiens n'ont pas besoin de visa pour un séjour touristique de moins de 90 jours. Seul un passeport valide 6 mois après le retour est exigé."
  },
  {
    question: 'Peut-on être accompagné par Roseline après avoir lu le guide ?',
    answer: "Oui, après avoir téléchargé le guide, vous pouvez demander un voyage sur-mesure (Voyage Signature) ou rejoindre un départ en groupe Retour aux Sources. Chaque voyage est accompagné personnellement par Roseline et son équipe locale."
  }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Ressources', path: '/ressources' },
            { name: 'Guide gratuit 15 expériences', path: '/ressources/guide-15-experiences' },
          ]),
          faqSchema(FAQ_ITEMS),
        ]}
      />
      {children}
    </>
  )
}
