'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const CHAPTERS = [
  { icon: '🪞', title: 'Ce schéma qu’on connaît tous', excerpt: 'Pourquoi la diaspora revient toujours au même endroit, au même moment, avec les mêmes sensations.' },
  { icon: '🔄', title: 'Les 3 types de retour', excerpt: 'Familial, vacances, racines : savoir ce que vous cherchez vraiment avant de partir.' },
  { icon: '🤫', title: 'Les 5 blocages silencieux', excerpt: 'Ce que personne ne dit mais que tous les enfants de la diaspora ressentent en rentrant.' },
  { icon: '👨‍👩‍👧', title: 'Transmettre aux enfants', excerpt: 'Préparer vos enfants (et votre conjoint) à découvrir le pays autrement.' },
  { icon: '🗺️', title: 'Régions, hospitalité, cuisine', excerpt: 'Au-delà de Dakar : Casamance, Sine Saloum, Saint-Louis, et les vraies rencontres.' },
  { icon: '🧭', title: 'S’organiser sans faire le touriste', excerpt: 'Une méthode concrète pour un retour qui change quelque chose en vous.' },
]

export default function LeBledAutrementPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer un email valide.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email, source: 'le-bled-autrement' }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/merci/le-bled-autrement')
      } else {
        setError('Une erreur est survenue. Ressayez.')
      }
    } catch {
      setError('Une erreur est survenue. Ressayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#FEFCF9', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
        <Image
          src="/images/senegal/hero.jpg"
          alt="Retour au Sénégal, diaspora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(86,14,19,0.55) 0%, rgba(86,14,19,0.5) 40%, rgba(86,14,19,0.92) 100%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-5 py-24">
          <div
            className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(246,201,97,0.18)',
              color: '#F6C961',
              border: '1px solid rgba(246,201,97,0.5)',
            }}
          >
            GUIDE DIASPORA · PDF 14 PAGES · GRATUIT
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#FEFCF9',
              textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}
          >
            Tu rentres chaque été.{' '}
            <span style={{ color: '#F6C961', fontStyle: 'italic' }}>
              Ou tu n’es jamais rentré.
            </span>{' '}
            Les deux se comprennent.
          </h1>

          <p
            className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(254,252,249,0.9)' }}
          >
            Le guide pour la diaspora qui veut vivre le Sénégal autrement qu’en touriste.
            Sans culpabilité, sans nostalgie forcée. Avec méthode.
          </p>

          <button
            onClick={() =>
              document
                .getElementById('bled-form')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{
              backgroundColor: '#F6C961',
              color: '#560E13',
              boxShadow: '0 12px 40px rgba(246,201,97,0.4)',
            }}
          >
            Recevoir le guide
          </button>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Ce que vous allez lire
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              6 chapitres pour un vrai retour
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTERS.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#560E13' }}>
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
                  {c.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capture Form */}
      <section id="bled-form" className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg" style={{ border: '1px solid #e0d8d0' }}>
            <div className="text-center mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Recevez Le Bled Autrement
              </h2>
              <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
                Entrez votre email. Le PDF arrive en 2 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Prénom (optionnel)
                </span>
                <input
                  type="text"
                  placeholder="Ex : Awa"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                  style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Votre email *
                </span>
                <input
                  type="email"
                  placeholder="vous@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                  style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                />
              </label>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 mt-2"
                style={{
                  backgroundColor: '#560E13',
                  color: '#FEFCF9',
                  boxShadow: '0 10px 30px rgba(86,14,19,0.3)',
                }}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer mon guide'}
              </button>
            </form>

            <div
              className="flex flex-wrap items-center justify-center gap-3 mt-5 text-[10px] uppercase tracking-wider"
              style={{ color: '#0A0A0A', opacity: 0.45 }}
            >
              <span>RGPD</span>
              <span>·</span>
              <span>Pas de spam</span>
              <span>·</span>
              <span>Désinscription 1 clic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center text-xs opacity-40" style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}>
        &copy; {new Date().getFullYear()} Roseline Ngom, TripAfro &middot;{' '}
        <a href="/" className="underline hover:opacity-70">Retour à l&apos;accueil</a>
      </footer>
    </div>
  )
}
