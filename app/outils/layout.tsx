import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Outils IA gratuits',
  description:
    'Outils IA gratuits pour hôteliers et voyageurs : calculateur commission OTA, chatbot TripAfro, et plus à venir.',
  path: '/outils',
})

export default function OutilsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
