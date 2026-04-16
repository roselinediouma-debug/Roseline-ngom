'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const BENEFITS = [
  {
    icon: '🛂',
    title: 'Visa & formalites',
    items: ['Quels pays ont besoin d\'un visa', 'Documents a preparer', 'Delais et demarches en ligne'],
  },
  {
    icon: '💉',
    title: 'Sante & vaccins',
    items: ['Vaccins obligatoires vs recommandes', 'Trousse de pharmacie ideale', 'Assurance voyage : laquelle choisir'],
  },
  {
    icon: '💰',
    title: 'Budget & change',
    items: ['Budget moyen par jour', 'Ou changer ses euros', 'Pieges a eviter sur le taux de change'],
  },
]

export default function ChecklistVoyagePage() {
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
        body: JSON.stringify({ prenom, email, source: 'checklist-voyage' }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/merci/checklist')
      } else {
        setError('Une erreur est survenue. Reessayez.')
      }
    } catch {
      setError('Une erreur est survenue. Reessayez.')
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
          alt="Voyage au Senegal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(86,14,19,0.6) 0%, rgba(86,14,19,0.5) 40%, rgba(86,14,19,0.92) 100%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-5 py-24">
          <div
            className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(246,201,97,0.18)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.5)' }}
          >
            CHECKLIST GRATUITE · 10 PAGES
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#FEFCF9',
              textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}
          >
            Un voyage au Senegal mal prepare,{' '}
            <span style={{ color: '#F6C961', fontStyle: 'italic' }}>c&apos;est un voyage rate</span>
          </h1>

          <p
            className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(254,252,249,0.9)' }}
          >
            Visa. Vaccins. Budget. Change. Valise. Tout est dans cette checklist.
            10 pages pour partir l&apos;esprit libre.
          </p>

          <button
            onClick={() => document.getElementById('checklist-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{
              backgroundColor: '#F6C961',
              color: '#560E13',
              boxShadow: '0 12px 40px rgba(246,201,97,0.4)',
            }}
          >
            Recevoir ma checklist
          </button>
        </div>
      </section>

      {/* Mockup Section */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          {/* CSS-based mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -bottom-5 -right-5 w-full h-full rounded-lg"
                style={{ backgroundColor: 'rgba(86,14,19,0.12)', transform: 'rotate(3deg)' }}
              />
              <div
                className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(86,14,19,0.45)',
                  transform: 'rotate(-2deg)',
                }}
              >
                <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #560E13 0%, #3d0a0e 100%)' }} />
                <div className="absolute inset-0 opacity-[0.08]">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="hexChecklist" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
                        <polygon points="25,2 47,14 47,30 25,42 3,30 3,14" fill="none" stroke="#F6C961" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexChecklist)" />
                  </svg>
                </div>
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <span
                    className="inline-block self-start px-3 py-1 text-[9px] font-bold tracking-[0.2em]"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    CHECKLIST · 2026
                  </span>
                  <div>
                    <div className="w-12 h-[3px] mb-4" style={{ backgroundColor: '#F6C961' }} />
                    <h3 className="text-2xl font-bold leading-[1.15] mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
                      Checklist voyage Senegal
                    </h3>
                    <div className="space-y-1.5 text-xs" style={{ color: '#F6C961' }}>
                      <div className="flex items-center gap-2"><span>✓</span> Visa & formalites</div>
                      <div className="flex items-center gap-2"><span>✓</span> Sante & vaccins</div>
                      <div className="flex items-center gap-2"><span>✓</span> Budget & change</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Roseline Ngom</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase mt-0.5" style={{ color: '#F6C961' }}>
                      Fondatrice TripAfro
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#b8860b' }}>
              10 pages essentielles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
              Partez prepare. Pas stresse.
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#0A0A0A', opacity: 0.75 }}>
              J&apos;ai vu trop de voyageurs arriver au Senegal sans les bons papiers, sans vaccin,
              avec trop ou pas assez de cash. Cette checklist regle le probleme en 10 minutes de lecture.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-5" style={{ borderTop: '2px solid rgba(246,201,97,0.3)' }}>
              {[
                { num: '10', label: 'pages' },
                { num: '3', label: 'categories' },
                { num: '0 €', label: 'gratuit' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>{num}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-50 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 Benefits Columns */}
      <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              Ce que vous trouverez dedans
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl p-7 text-center"
                style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.06)' }}
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#560E13' }}>{b.title}</h3>
                <ul className="space-y-2 text-sm text-left" style={{ color: 'rgba(10,10,10,0.65)' }}>
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: '#F6C961', flexShrink: 0 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capture Form */}
      <section id="checklist-form" className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg" style={{ border: '1px solid #e0d8d0' }}>
            <div className="text-center mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Recevez votre checklist
              </h2>
              <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
                Entrez votre email. La checklist arrive en 2 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Prenom (optionnel)
                </span>
                <input
                  type="text"
                  placeholder="Ex : Sophie"
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
                {loading ? 'Envoi en cours...' : 'Envoyer ma checklist'}
              </button>
            </form>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-[10px] uppercase tracking-wider" style={{ color: '#0A0A0A', opacity: 0.45 }}>
              <span>RGPD</span>
              <span>·</span>
              <span>Pas de spam</span>
              <span>·</span>
              <span>Desinscription 1 clic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mini bio Roseline */}
      <section className="py-16 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4" style={{ border: '3px solid #F6C961' }}>
            <Image
              src="/images/roseline.jpg"
              alt="Roseline Ngom"
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
          >
            Roseline Ngom
          </h3>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#b8860b' }}>
            Fondatrice TripAfro
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
            Depuis plus de 10 ans, j&apos;accompagne les voyageurs qui veulent decouvrir l&apos;Afrique de l&apos;Ouest autrement.
            Cette checklist, c&apos;est celle que j&apos;envoie a mes propres amis avant leur depart.
          </p>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center text-xs opacity-40" style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}>
        &copy; {new Date().getFullYear()} Roseline Ngom — TripAfro &middot;{' '}
        <a href="/" className="underline hover:opacity-70">Retour a l&apos;accueil</a>
      </footer>
    </div>
  )
}
