import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Conseil Afrique de l\'Ouest, audit projet et accompagnement',
  description:
    'Audit de projet, feuille de route, accompagnement stratégique sur mesure pour entreprendre ou investir en Afrique de l\'Ouest. Séances avec Roseline Ngom.',
  path: '/conseil',
  keywords: ['conseil Afrique de l\'Ouest', 'audit projet Sénégal', 'accompagnement entrepreneuriat Afrique'],
})

export default function ConseilLayout({ children }: { children: React.ReactNode }) {
  return children
}
