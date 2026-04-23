import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Outils IA gratuits',
  description:
    "Outils IA gratuits pour hôteliers africains indépendants et voyageurs : audit de présence en ligne, chatbot TripAfro, et plus à venir.",
  path: '/outils',
})

export default function OutilsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
