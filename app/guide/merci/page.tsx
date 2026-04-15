'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function MerciContent() {
  const searchParams = useSearchParams()
  const prenom = searchParams.get('prenom') || ''

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center" style={{ backgroundColor: '#F8F5F0' }}>
      {/* Icône succès */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg"
        style={{ backgroundColor: '#560E13' }}
      >
        ✉️
      </div>

      <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
        Merci{prenom ? `, ${prenom}` : ''} !
      </h1>

      <p className="text-lg mb-2 opacity-75">Votre guide est en route.</p>
      <p className="text-sm opacity-55 mb-8 max-w-xs">
        Vérifiez votre boîte email (et le dossier spam). Vous devriez le recevoir dans les prochaines minutes.
      </p>

      {/* Lien téléchargement direct (backup) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 max-w-sm w-full">
        <p className="text-sm font-semibold mb-3" style={{ color: '#560E13' }}>Téléchargement direct (backup)</p>
        <a
          href="/guide-senegal-gratuit.pdf"
          className="block w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#F6C961', color: '#560E13' }}
        >
          📥 Télécharger le PDF
        </a>
        <p className="text-xs opacity-40 mt-2">Si vous ne recevez pas l'email sous 5 min</p>
      </div>

      {/* CTAs secondaires */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Link
          href="/voyages"
          className="block w-full py-4 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90"
          style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
        >
          🌍 Découvrir nos voyages immersifs
        </Link>
        <a
          href="https://instagram.com/tripafro"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 rounded-xl text-sm font-semibold text-center border transition-all hover:opacity-80"
          style={{ borderColor: '#e0d8d0', color: '#0A0A0A' }}
        >
          📸 Rejoindre @tripafro sur Instagram
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
