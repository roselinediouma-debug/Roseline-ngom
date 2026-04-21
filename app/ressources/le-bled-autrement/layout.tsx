import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Le Bled Autrement : guide gratuit diaspora Sénégal (PDF)',
  description:
    "Le guide pour la diaspora qui veut vivre le Sénégal autrement qu'en touriste. 14 pages : 3 types de retour, blocages silencieux, transmettre aux enfants.",
  path: '/ressources/le-bled-autrement',
  ogImage: '/images/og/le-bled-autrement.jpg',
  keywords: [
    'diaspora Sénégal',
    'retour au pays diaspora',
    'Le Bled Autrement',
    'voyage racines',
    'transmettre origines enfants',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
