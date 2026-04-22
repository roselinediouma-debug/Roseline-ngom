import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Merci, votre guide est en route',
  description: 'Votre guide gratuit Sénégal vous est envoyé par email.',
  path: '/ressources/guide-15-experiences/merci',
  noindex: true,
})

export default function GuideMerciLayout({ children }: { children: React.ReactNode }) {
  return children
}
