'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#F6C961', color: '#560E13' }}>✓</span>
      <span className="text-sm opacity-80">{text}</span>
    </li>
  )
}

const testimonials = [
  { name: 'Amina D.', country: 'France 🇫🇷', text: "Ce guide m'a ouvert des portes que je n'aurais jamais trouvées seule." },
  { name: 'Marcus T.', country: 'États-Unis 🇺🇸', text: "Indispensable pour vivre le vrai Sénégal, pas le Sénégal des touristes." },
  { name: 'Sophie K.', country: 'Belgique 🇧🇪', text: "J'ai partagé ce guide à toute ma famille avant notre voyage." },
]

export default function GuidePage() {
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
        body: JSON.stringify({ prenom, email, source: 'guide-pdf' }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/guide/merci?prenom=${encodeURIComponent(prenom)}`)
      } else {
        setError('Une erreur est survenue. Réessayez.')
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>

      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #560E13 0%, #3d0a0e 60%, #1a0508 100%)' }}
      >
        {/* Motif filigrane */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.05 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hex2" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#F6C961" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex2)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Texte hero */}
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ backgroundColor: 'rgba(246,201,97,0.2)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.3)' }}>
                Guide PDF gratuit
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif' }}>
                Découvrir le Sénégal autrement
              </h1>
              <p className="text-lg mb-6" style={{ color: '#F6C961' }}>
                Les 10 expériences que même les Sénégalais ne connaissent pas
              </p>

              {/* Bénéfices rapides */}
              <ul className="flex flex-col gap-3 text-white">
                <CheckItem text="10 lieux secrets avec adresses, horaires et conseils pratiques" />
                <CheckItem text="Des adresses que même les locaux ignorent" />
                <CheckItem text="Par une experte terrain — 10+ ans d'expérience au Sénégal" />
                <CheckItem text="Téléchargement immédiat, 100% gratuit" />
              </ul>
            </div>

            {/* Mockup guide PDF */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Ombre */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl" style={{ backgroundColor: 'rgba(246,201,97,0.3)' }} />
                {/* Guide mockup */}
                <div
                  className="relative w-56 h-72 rounded-2xl flex flex-col items-center justify-center shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #F6C961 0%, #e0a830 100%)' }}
                >
                  <div className="text-6xl mb-3">🗺️</div>
                  <div className="text-center px-4">
                    <div className="font-bold text-sm" style={{ color: '#560E13', fontFamily: 'var(--font-playfair)' }}>Guide Sénégal</div>
                    <div className="text-xs mt-1" style={{ color: '#560E13', opacity: 0.8 }}>10 expériences secrètes</div>
                  </div>
                  <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#560E13', color: '#F6C961' }}>
                    GRATUIT
                  </div>
                  <div className="mt-4 text-xs font-semibold" style={{ color: '#560E13' }}>Par Roseline Ngom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION BÉNÉFICES 3 COLONNES */}
      <section className="py-14 px-4" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
            Ce que vous allez découvrir
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔑', title: '10 expériences secrètes', desc: 'Lieux, horaires, conseils pratiques et contacts directs pour chaque expérience.' },
              { icon: '📍', title: 'Adresses exclusives', desc: 'Des spots que même les Sénégalais ne connaissent pas — validés sur le terrain.' },
              { icon: '🌟', title: 'Expertise terrain', desc: 'Fondatrice TripAfro, 10+ ans d\'expérience. Chaque conseil vient du terrain.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-white shadow-sm">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold mb-2" style={{ color: '#560E13' }}>{title}</h3>
                <p className="text-sm opacity-65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION FORMULAIRE */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-3xl mb-3">✉️</div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
            Recevez votre guide gratuit maintenant
          </h2>
          <p className="text-sm opacity-60 mb-8">Entrez votre email et recevez le guide instantanément.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Votre prénom (optionnel)"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
              style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
            />
            <input
              type="email"
              placeholder="Votre adresse email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
              style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: '#F6C961', color: '#560E13', boxShadow: '0 4px 20px rgba(246,201,97,0.4)' }}
            >
              {loading ? 'Envoi en cours...' : '📥 Télécharger le guide gratuitement'}
            </button>
          </form>

          <p className="text-xs opacity-40 mt-4">Gratuit, sans spam. Vos données restent confidentielles. Désinscription en 1 clic.</p>
        </div>
      </section>

      {/* PREUVE SOCIALE */}
      <section className="py-14 px-4" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-3xl font-bold mb-1" style={{ color: '#560E13', fontFamily: 'var(--font-playfair)' }}>500+</div>
            <div className="text-sm opacity-60">voyageurs nous font confiance</div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, country, text }) => (
              <div key={name} className="bg-white p-5 rounded-2xl shadow-sm">
                <p className="text-sm italic mb-3 opacity-75">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#560E13', color: '#F6C961' }}>
                    {name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{name}</div>
                    <div className="text-xs opacity-50">{country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-6 px-4 text-center text-xs opacity-40" style={{ borderTop: '1px solid #e0d8d0' }}>
        © {new Date().getFullYear()} Roseline Ngom — TripAfro ·{' '}
        <a href="/" className="underline hover:opacity-70">Retour à l'accueil</a>
      </footer>
    </div>
  )
}
