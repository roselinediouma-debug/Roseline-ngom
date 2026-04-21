import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Tous mes liens, Roseline Ngom',
  description:
    'Retrouvez tous les liens utiles : voyages Sénégal, guide gratuit, consulting digital, réseaux sociaux. Roseline Ngom, fondatrice TripAfro.',
  path: '/liens',
})

export default function LiensLayout({ children }: { children: React.ReactNode }) {
  return children
}
