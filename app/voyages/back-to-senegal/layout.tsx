import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata = buildMetadata({
  title: 'Back to Senegal : programme diaspora, bientôt disponible',
  description:
    "Back to Senegal, le programme d'accélération pour porteurs de projet de la diaspora qui veulent s'installer ou investir au Sénégal. Inscrivez-vous pour être informé·e de l'ouverture des candidatures.",
  path: '/voyages/back-to-senegal',
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
