'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// ─── Previews des 10 expériences (synchronisé avec le PDF) ─────────────────────
const EXPERIENCES_PREVIEW = [
  { n: '01', icon: '🌅', title: 'Lac Rose au coucher', teaser: 'Quand la salinité magnétise l\'eau en magenta' },
  { n: '02', icon: '🐟', title: 'Marché aux pirogues de Mbour', teaser: 'Le ballet des pêcheurs à l\'aube' },
  { n: '03', icon: '🛶', title: 'Île de Carabane en bolong', teaser: 'Casamance profonde, ni voiture ni touristes' },
  { n: '04', icon: '⛓️', title: 'Gorée avec un historien local', teaser: 'Un choc émotionnel différent du tour classique' },
  { n: '05', icon: '🏕️', title: 'Pays Bassari en immersion', teaser: 'Rituels d\'initiation et masques sacrés' },
  { n: '06', icon: '🌿', title: 'Delta du Saloum en pirogue', teaser: 'Mangroves, bolongs, îles sérères' },
  { n: '07', icon: '🌙', title: 'Saint-Louis de nuit à Guet Ndar', teaser: 'L\'âme de la ville quand les touristes dorment' },
  { n: '08', icon: '🦁', title: 'Safari Niokolo-Koba', teaser: 'Lions et chimpanzés — oui, au Sénégal' },
  { n: '09', icon: '🥊', title: 'Lutte sénégalaise à Pikine', teaser: 'Le sport national dans sa version la plus intense' },
  { n: '10', icon: '🐪', title: 'Bivouac au désert de Lompoul', teaser: 'Un Sahara miniature à 2h30 de Dakar' },
]

const TESTIMONIALS = [
  {
    name: 'Amina D.',
    country: 'Paris, France',
    initial: 'A',
    text: 'Ce guide m\'a ouvert des portes que je n\'aurais jamais trouvées seule. Le conseil sur Carabane vaut déjà les 10 minutes pour le télécharger.',
  },
  {
    name: 'Marcus T.',
    country: 'New York, USA',
    initial: 'M',
    text: 'Indispensable pour vivre le vrai Sénégal — pas le Sénégal des resorts. J\'ai suivi l\'itinéraire Bassari à la lettre.',
  },
  {
    name: 'Sophie K.',
    country: 'Bruxelles, Belgique',
    initial: 'S',
    text: 'J\'ai partagé ce guide à toute ma famille avant notre voyage. Les 10 expériences sont validées par les locaux.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Je reçois le guide quand exactement ?',
    a: 'Instantanément dans votre boîte mail. Si vous ne le voyez pas dans 2 minutes, vérifiez vos spams ou onglet Promotions (Gmail).',
  },
  {
    q: 'Quel est le format du fichier ?',
    a: 'Un PDF de 15 pages, optimisé pour la lecture mobile et l\'impression. Ouvrable partout, sans inscription à une plateforme.',
  },
  {
    q: 'Pourquoi c\'est gratuit ?',
    a: 'Parce que je veux que vous vous lanciez vraiment. Si mon travail résonne avec vous, vous déciderez peut-être d\'aller plus loin avec un guide payant ou un voyage TripAfro.',
  },
  {
    q: 'Vous allez spammer mon email ?',
    a: 'Jamais. Vous recevrez le guide, puis occasionnellement une newsletter (1 à 2/mois max). Désinscription en 1 clic si ça ne vous parle pas.',
  },
]

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: '#F6C961', color: '#560E13' }}
      >
        ✓
      </span>
      <span className="text-sm" style={{ color: '#0A0A0A' }}>{text}</span>
    </li>
  )
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: '#e0d8d0' }}>
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left transition-colors hover:opacity-70"
      >
        <span className="font-semibold text-sm pr-6" style={{ color: '#560E13' }}>{q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-transform"
          style={{
            backgroundColor: open ? '#560E13' : '#F8F5F0',
            color: open ? '#F6C961' : '#560E13',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: '#0A0A0A', opacity: 0.75 }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function GuidePage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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

  const scrollToForm = () => {
    document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFCF9', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      {/* ═══════════════════════════════════════════════
           HERO — 2 colonnes : form à gauche, mockup droite
         ═══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-14 pb-20 px-4"
        style={{ background: 'linear-gradient(180deg, #FEFCF9 0%, #F8F5F0 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
            {/* GAUCHE — Proposition + form */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{
                  backgroundColor: 'rgba(246,201,97,0.2)',
                  color: '#b8860b',
                  border: '1px solid rgba(246,201,97,0.5)',
                }}
              >
                <span>📖</span>
                <span>PDF gratuit · 15 pages</span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
                style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', color: '#560E13' }}
              >
                Découvrez le Sénégal<br />
                <span style={{ color: '#b8860b' }}>comme une locale</span>
              </h1>

              <p className="text-base mb-7 leading-relaxed" style={{ color: '#0A0A0A', opacity: 0.75 }}>
                10 expériences que vous ne trouverez dans aucun Lonely Planet.
                Des adresses validées sur le terrain par Roseline, fondatrice de TripAfro.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                <CheckItem text="Du Lac Rose à la Casamance — 10 pépites hors des sentiers battus" />
                <CheckItem text="Pour chaque lieu : comment y aller, quand, combien, le conseil de Roseline" />
                <CheckItem text="Préparation complète : visa, santé, budget, transport, sécurité" />
                <CheckItem text="Téléchargement immédiat — 100% gratuit, 0% spam" />
              </ul>

              <form
                id="guide-form"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 shadow-lg"
                style={{ border: '1px solid #e0d8d0' }}
              >
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Votre prénom (optionnel)"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                    style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                  />
                  <input
                    type="email"
                    placeholder="Votre adresse email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                    style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                  />
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                    style={{
                      backgroundColor: '#560E13',
                      color: '#FEFCF9',
                      boxShadow: '0 8px 24px rgba(86,14,19,0.25)',
                    }}
                  >
                    {loading ? 'Envoi en cours...' : '📥 Recevoir mon guide'}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-[10px] uppercase tracking-wider" style={{ color: '#0A0A0A', opacity: 0.45 }}>
                  <span>🔒 RGPD</span>
                  <span>·</span>
                  <span>0 spam</span>
                  <span>·</span>
                  <span>1 clic pour se désinscrire</span>
                </div>
              </form>
            </div>

            {/* DROITE — Mockup du PDF (effet livre posé) */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Badge flottant */}
                <div
                  className="absolute -top-4 -right-4 z-20 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest rotate-[6deg]"
                  style={{
                    backgroundColor: '#F6C961',
                    color: '#560E13',
                    boxShadow: '0 6px 20px rgba(246,201,97,0.5)',
                  }}
                >
                  100% gratuit
                </div>

                {/* Ombre portée */}
                <div
                  className="absolute -bottom-6 -right-6 w-full h-full rounded-lg"
                  style={{
                    backgroundColor: 'rgba(86,14,19,0.15)',
                    transform: 'rotate(3deg)',
                  }}
                />

                {/* Faux PDF — représentation stylisée de la cover */}
                <div
                  className="relative w-[320px] h-[440px] rounded-lg overflow-hidden"
                  style={{
                    boxShadow: '0 30px 60px -15px rgba(86,14,19,0.4), 0 0 0 1px rgba(86,14,19,0.1)',
                    transform: 'rotate(-2deg)',
                  }}
                >
                  {/* Fond bordeaux */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(155deg, #560E13 0%, #3d0a0e 100%)' }}
                  />
                  {/* Motif hexagonal décoratif */}
                  <div className="absolute inset-0 opacity-[0.08]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="hexPDF" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
                          <polygon points="25,2 47,14 47,30 25,42 3,30 3,14" fill="none" stroke="#F6C961" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hexPDF)" />
                    </svg>
                  </div>

                  {/* Contenu cover */}
                  <div className="relative h-full flex flex-col justify-between p-8 text-white">
                    {/* Haut : pill or */}
                    <div>
                      <span
                        className="inline-block px-3 py-1 text-[9px] font-bold tracking-[0.2em]"
                        style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                      >
                        GUIDE OFFERT · 2026
                      </span>
                    </div>

                    {/* Milieu : titre + sous-titre */}
                    <div>
                      <div className="w-12 h-[3px] mb-4" style={{ backgroundColor: '#F6C961' }} />
                      <h3
                        className="text-3xl font-bold leading-[1.1] mb-4"
                        style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif' }}
                      >
                        10 expériences secrètes au Sénégal
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#F6C961' }}>
                        Le guide que seule une locale peut vous offrir
                      </p>
                    </div>

                    {/* Bas : auteur */}
                    <div>
                      <div className="font-bold text-base" style={{ fontFamily: 'var(--font-playfair)' }}>
                        Roseline Ngom
                      </div>
                      <div className="text-[9px] tracking-[0.2em] uppercase mt-0.5" style={{ color: '#F6C961' }}>
                        Fondatrice TripAfro
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           SECTION — 10 EXPÉRIENCES (preview teasers)
         ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#b8860b' }}>
              À l&apos;intérieur du guide
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Les 10 expériences qui vont transformer votre voyage
            </h2>
            <p className="text-sm opacity-60 max-w-xl mx-auto">
              Chaque expérience est détaillée sur une page dédiée avec photo, conseils pratiques et l&apos;astuce insider de Roseline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {EXPERIENCES_PREVIEW.map((exp) => (
              <div
                key={exp.n}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 transition-transform hover:scale-[1.02]"
                style={{ border: '1px solid #e0d8d0' }}
              >
                <div className="flex-shrink-0 flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}
                  >
                    {exp.icon}
                  </div>
                  <div
                    className="font-bold text-xs tracking-[0.15em]"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#b8860b' }}
                  >
                    {exp.n}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm mb-1" style={{ color: '#560E13' }}>{exp.title}</div>
                  <div className="text-xs opacity-60 leading-snug">{exp.teaser}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                backgroundColor: '#560E13',
                color: '#FEFCF9',
                boxShadow: '0 6px 20px rgba(86,14,19,0.25)',
              }}
            >
              📥 Télécharger le guide <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           SECTION — QUI EST ROSELINE ?
         ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
            <div className="flex justify-center">
              <div
                className="relative w-48 h-48 rounded-full overflow-hidden"
                style={{
                  boxShadow: '0 12px 40px rgba(86,14,19,0.25)',
                  border: '4px solid #FEFCF9',
                  outline: '3px solid rgba(246,201,97,0.4)',
                }}
              >
                <Image
                  src="/images/roseline.jpg"
                  alt="Roseline Ngom"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#b8860b' }}>
                L&apos;auteure
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
                Bonjour, je suis Roseline
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#0A0A0A', opacity: 0.8 }}>
                Fondatrice de TripAfro, je partage l&apos;Afrique de l&apos;Ouest autrement depuis plus de 10 ans.
                Ce guide rassemble les expériences que j&apos;offre à mes amis quand ils viennent me voir —
                celles qui transforment un séjour en voyage intime.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4" style={{ borderTop: '1px solid #e0d8d0' }}>
                {[
                  { num: '500+', label: 'voyageurs' },
                  { num: '12+', label: 'destinations' },
                  { num: '10 ans', label: 'de terrain' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
                      {num}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider opacity-55 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           SECTION — TÉMOIGNAGES
         ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="text-4xl font-bold" style={{ color: '#560E13', fontFamily: 'var(--font-playfair)' }}>500+</div>
              <div className="text-left text-xs opacity-60 leading-tight">
                voyageurs<br />nous font confiance
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Ce que disent ceux qui l&apos;ont lu
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white p-6 rounded-2xl shadow-sm flex flex-col"
                style={{ border: '1px solid #e0d8d0' }}
              >
                <div className="text-2xl mb-3" style={{ color: '#F6C961' }}>&ldquo;</div>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#0A0A0A', opacity: 0.8 }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid #e0d8d0' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: '#560E13', color: '#F6C961', fontFamily: 'var(--font-playfair)' }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#560E13' }}>{t.name}</div>
                    <div className="text-xs opacity-50">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           SECTION — FAQ
         ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#b8860b' }}>
              Questions fréquentes
            </div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Tout ce que vous vous demandez
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
           CTA FINAL
         ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ backgroundColor: '#560E13' }}>
        <div className="max-w-2xl mx-auto text-center" style={{ color: '#FEFCF9' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Prêt à recevoir votre guide ?
          </h2>
          <p className="text-sm opacity-75 mb-8 leading-relaxed">
            Il arrive dans votre boîte mail en moins de 2 minutes. Gratuit, sans spam, 1 clic pour se désinscrire.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: '#F6C961',
              color: '#560E13',
              boxShadow: '0 10px 30px rgba(246,201,97,0.4)',
            }}
          >
            📥 Recevoir mon guide maintenant <span>→</span>
          </button>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center text-xs opacity-40" style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}>
        © {new Date().getFullYear()} Roseline Ngom — TripAfro ·{' '}
        <a href="/" className="underline hover:opacity-70">Retour à l&apos;accueil</a>
      </footer>
    </div>
  )
}
