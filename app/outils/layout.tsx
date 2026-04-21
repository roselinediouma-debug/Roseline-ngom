import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/metadata'

export const metadata: Metadata = {
  title: {
    default: 'Outils IA gratuits pour hôteliers et voyageurs',
    template: '%s | Outils Roseline Ngom',
  },
  description:
    "Outils IA gratuits créés par Roseline Ngom pour les hôteliers sénégalais et les voyageurs : calculateur commission OTA, chatbot TripAfro, et plus à venir.",
  alternates: { canonical: `${SITE_URL}/outils` },
  openGraph: {
    title: 'Outils IA gratuits | Roseline Ngom',
    description:
      'Calculateur commission Booking, assistant voyage IA, et plus. Outils gratuits pour décider plus vite et mieux.',
    url: `${SITE_URL}/outils`,
    type: 'website',
  },
}

export default function OutilsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
