import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Consulting tourisme Afrique, audit stratégique et accompagnement',
  description:
    'Consulting pour acteurs du tourisme et décideurs institutionnels en Afrique : audit stratégique, accompagnement, expertise institutionnelle. Roseline Ngom, 10 ans d\'expertise.',
  path: '/consulting',
  keywords: ['consulting tourisme Afrique', 'audit stratégique tourisme', 'conseil institutionnel tourisme'],
})

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return children
}
