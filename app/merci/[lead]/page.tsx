'use client'

import { useParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const CONTENT: Record<string, { title: string; message: string; cta: { label: string; href: string } }> = {
  guide: {
    title: 'Votre guide est en route',
    message:
      'Consultez votre boite email (et vos spams, au cas ou). Vous allez recevoir votre guide PDF gratuit dans les prochaines minutes.',
    cta: { label: 'Decouvrir nos guides signatures', href: '/guides' },
  },
  checklist: {
    title: 'Checklist envoyee',
    message:
      'Consultez votre boite email pour telecharger votre checklist. Pensez a verifier vos spams si vous ne la voyez pas.',
    cta: { label: 'Telecharger le guide gratuit', href: '/guide' },
  },
  newsletter: {
    title: 'Bienvenue dans La Teranga',
    message:
      'Vous etes inscrit(e) a la newsletter. Votre premier email arrive bientot avec du contenu exclusif sur le Senegal et l\'Afrique de l\'Ouest.',
    cta: { label: 'Telecharger le guide gratuit', href: '/guide' },
  },
  'guide-casamance': {
    title: 'Merci pour votre achat',
    message:
      'Votre Guide Casamance arrive dans votre boite email dans les prochaines minutes. Pensez a verifier vos spams.',
    cta: { label: 'Decouvrir Le Senegal en 7 jours', href: '/guides/guide-senegal-7jours' },
  },
  'guide-senegal-7j': {
    title: 'Merci pour votre achat',
    message:
      'Votre guide Le Senegal en 7 jours arrive dans votre boite email dans les prochaines minutes. Pensez a verifier vos spams.',
    cta: { label: 'Decouvrir le Guide Casamance', href: '/guides/guide-casamance' },
  },
  bundle: {
    title: 'Merci pour votre achat',
    message:
      'Vos deux guides arrivent dans votre boite email dans les prochaines minutes. Pensez a verifier vos spams.',
    cta: { label: 'Decouvrir nos voyages', href: '/voyages' },
  },
  'le-bled-autrement': {
    title: 'Votre guide Le Bled Autrement arrive',
    message:
      'Regardez votre boite email dans les prochaines minutes (pensez aux spams). Le PDF 14 pages est prêt. Si vous êtes concerné par un vrai retour, découvrez notre voyage Retour aux Sources.',
    cta: { label: 'Découvrir Retour aux Sources', href: '/voyages/retour-aux-sources' },
  },
  'benchmark-institutionnel': {
    title: 'Votre benchmark est en route',
    message:
      "Merci pour votre intérêt. Le rapport arrive par email dans les prochaines minutes. Si vous représentez une institution et souhaitez échanger sur votre stratégie touristique, je vous réponds personnellement sous 48h.",
    cta: { label: 'Voir l’offre consulting institutionnel', href: '/consulting/institutionnel' },
  },
}

const DEFAULT_CONTENT = {
  title: 'Merci',
  message: 'Votre demande a bien ete prise en compte. Nous revenons vers vous rapidement.',
  cta: { label: 'Retour a l\'accueil', href: '/' },
}

export default function MerciPage() {
  const params = useParams()
  const lead = params.lead as string
  const { title, message, cta } = CONTENT[lead] || DEFAULT_CONTENT

  return (
    <>
      <Nav />
      <main
        className="min-h-screen flex items-center justify-center px-4 py-20"
        style={{ backgroundColor: '#F8F5F0' }}
      >
        <div
          className="w-full max-w-lg rounded-2xl p-10 text-center"
          style={{ backgroundColor: '#FEFCF9', boxShadow: '0 8px 40px rgba(86,14,19,0.08)' }}
        >
          {/* Gold checkmark */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F6C961"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#0A0A0A',
            }}
          >
            {title}
          </h1>

          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(10,10,10,0.65)' }}>
            {message}
          </p>

          <Link
            href={cta.href}
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}
          >
            {cta.label}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
