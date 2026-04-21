import { buildMetadata } from '@/lib/seo/metadata'

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
  return children
}
