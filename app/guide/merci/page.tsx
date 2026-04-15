'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function MerciContent() {
  const searchParams = useSearchParams()
  const prenom = searchParams.get('prenom') || ''

  // Auto-trigger téléchargement après 1.2s
  useEffect(() => {
    const timer = setTimeout(() => {
      const a = document.createElement('a')
      a.href = '/guide-senegal-gratuit.pdf'
      a.download = 'guide-senegal-roseline-ngom.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center" style={{ backgroundColor: '#F8F5F0' }}>
      {/* Bannière téléchargement en cours */}
      <div
        className="mb-8 px-5 py-3 rounded-full text-sm font-semibold shadow-sm"
        style={{ backgroundColor: '#F6C961', color: '#560E13' }}
      >
        Votre téléchargement démarre…
      </div>

      {/* Icône succès */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg"
        style={{ backgroundColor: '#560E13' }}
      >
        <span style={{ color: '#F6C961' }}>✓</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
        Merci{prenom ? `, ${prenom}` : ''} !
      </h1>

      <p className="text-lg mb-2 opacity-75 max-w-md">Votre guide Sénégal est en route.</p>
      <p className="text-sm opacity-55 mb-8 max-w-md">
        Je vous ai envoyé le PDF par email. Vérifiez votre boîte de réception (et le dossier spam, au cas où).
        Le téléchargement démarre aussi automatiquement dans quelques secondes.
      </p>

      {/* Lien téléchargement direct (backup) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 max-w-sm w-full">
        <p className="text-xs uppercase tracking-widest font-bold mb-3 opacity-60" style={{ color: '#560E13' }}>
          Téléchargement manuel
        </p>
        <a
          href="/guide-senegal-gratuit.pdf"
          download
          className="block w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#F6C961', color: '#560E13' }}
        >
          Télécharger le PDF
        </a>
        <p className="text-xs opacity-40 mt-3">Si le téléchargement ne démarre pas automatiquement</p>
      </div>

      {/* CTA Calendly — l'étape suivante */}
      <div
        className="rounded-2xl p-6 mb-4 max-w-sm w-full text-left"
        style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
      >
        <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#F6C961' }}>
          L'étape suivante
        </div>
        <div className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          Envie d'en discuter ?
        </div>
        <p className="text-sm opacity-80 mb-4 leading-relaxed">
          Si vous préparez un vrai voyage, réservez 15 min avec moi — on valide votre projet ensemble.
          C'est gratuit, sans engagement.
        </p>
        <a
          href="https://calendly.com/roselinengom/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl text-sm font-bold text-center transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#F6C961', color: '#560E13' }}
        >
          Réserver 15 min avec Roseline
        </a>
      </div>

      {/* CTA Instagram */}
      <div className="max-w-sm w-full">
        <a
          href="https://instagram.com/tripafro"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 rounded-xl text-sm font-semibold text-center border transition-all hover:opacity-80"
          style={{ borderColor: '#e0d8d0', color: '#0A0A0A', backgroundColor: '#FEFCF9' }}
        >
          Suivre @tripafro sur Instagram
        </a>
      </div>

      <Link href="/" className="mt-8 text-xs opacity-40 underline hover:opacity-60">
        Retour à l'accueil
      </Link>
    </div>
  )
}

export default function MerciPage() {
  return (
    <Suspense>
      <MerciContent />
    </Suspense>
  )
}
