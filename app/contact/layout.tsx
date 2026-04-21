import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Contact, Roseline Ngom',
  description:
    'Prendre rendez-vous avec Roseline Ngom pour un voyage sur-mesure au Sénégal, un accompagnement diaspora ou une mission consulting digital tourisme.',
  path: '/contact',
  ogImage: '/images/og/contact.jpg',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
