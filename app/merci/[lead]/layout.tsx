import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Merci, confirmation de votre demande',
  description: 'Confirmation de votre demande. Vous allez recevoir un email dans quelques minutes.',
  noindex: true,
})

export default function MerciLayout({ children }: { children: React.ReactNode }) {
  return children
}
