'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const COUNTRIES = [
  { flag: '🇧🇯', name: 'Bénin', insight: 'Stratégie de marque pays fondée sur l’histoire et la culture vaudou. Résultats sur le tourisme culturel et la diaspora.' },
  { flag: '🇲🇦', name: 'Maroc', insight: 'Vision 2020 puis 2030 : infrastructures, open sky, formation. Un modèle de planification long-terme assumée.' },
  { flag: '🇷🇼', name: 'Rwanda', insight: 'Positionnement premium ciblé (gorilles, MICE, sécurité). Monétisation forte par visiteur avec une base touristique modeste.' },
]

export default function BenchmarkInstitutionnelPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
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
        body: JSON.stringify({
          prenom,
          email,
          source: 'benchmark-institutionnel',
          organisation,
        }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/merci/benchmark-institutionnel')
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
          alt="Politique touristique africaine comparée"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(86,14,19,0.6) 0%, rgba(86,14,19,0.55) 40%, rgba(86,14,19,0.92) 100%)',
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
            ÉTUDE INSTITUTIONNELLE · PDF · GRATUIT
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#FEFCF9',
              textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}
          >
            Bénin, Maroc, Rwanda :{' '}
            <span style={{ color: '#F6C961', fontStyle: 'italic' }}>
              ce que le Sénégal peut apprendre
            </span>
          </h1>

          <p
            className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(254,252,249,0.9)' }}
          >
            Benchmark des politiques touristiques africaines qui ont fonctionné.
            Pour décideurs publics, directions ministérielles, agences de promotion et opérateurs institutionnels.
          </p>

          <button
            onClick={() =>
              document.getElementById('bench-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{
              backgroundColor: '#F6C961',
              color: '#560E13',
              boxShadow: '0 12px 40px rgba(246,201,97,0.4)',
            }}
          >
            Recevoir le benchmark
          </button>
        </div>
      </section>

      {/* 3 Countries */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              3 pays, 3 stratégies, 3 leçons
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {COUNTRIES.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl p-7"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <div className="text-5xl mb-4">{c.flag}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
                >
                  {c.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
                  {c.insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capture Form */}
      <section id="bench-form" className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg" style={{ border: '1px solid #e0d8d0' }}>
            <div className="text-center mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Recevez le benchmark
              </h2>
              <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
                Ce rapport est réservé aux décideurs tourisme. Merci d’indiquer votre organisation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Prénom & Nom
                </span>
                <input
                  type="text"
                  placeholder="Ex : Aminata Diop"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                  style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Organisation
                </span>
                <input
                  type="text"
                  placeholder="Ministère, agence, hôtel, institution..."
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                  style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Email professionnel *
                </span>
                <input
                  type="email"
                  placeholder="vous@organisation.com"
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
                {loading ? 'Envoi en cours...' : 'Recevoir le rapport'}
              </button>
            </form>

            <div
              className="flex flex-wrap items-center justify-center gap-3 mt-5 text-[10px] uppercase tracking-wider"
              style={{ color: '#0A0A0A', opacity: 0.45 }}
            >
              <span>RGPD</span>
              <span>·</span>
              <span>Données confidentielles</span>
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
