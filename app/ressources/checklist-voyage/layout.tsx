import { buildMetadata } from '@/lib/seo/metadata'

// Page retirée du scope public (plan SEO Phase 0.3)
export const metadata = buildMetadata({
  title: 'Checklist voyage Sénégal',
  description: 'Checklist de préparation pour votre voyage au Sénégal.',
  path: '/ressources/checklist-voyage',
  noindex: true,
})

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return children
}
