'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/* ─── Hook : Intersection Observer pour animations au scroll ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ─── Hook : Count-up animation ─── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

/* ─── Données ─── */
const VOYAGES = [
  {
    title: 'Retour aux Sources',
    subtitle: 'Voyage identitaire',
    description: 'Reconnectez-vous avec vos racines. Un séjour immersif au coeur du Sénégal, pensé pour la diaspora.',
    image: '/images/senegal/gallery-3.jpg',
    href: '/voyages/retour-aux-sources',
    price: 'Dès 2 200 €',
  },
  {
    title: 'Voyage Signature',
    subtitle: 'Expérience premium',
    description: 'Itinéraire sur mesure, hébergements d\'exception, guide privé. Le Sénégal comme vous ne l\'avez jamais vu.',
    image: '/images/senegal/goree.jpg',
    href: '/voyages/voyage-signature',
    price: 'Sur mesure',
  },
  {
    title: 'Back to Senegal',
    subtitle: 'Aventure en groupe',
    description: 'L\'Afrique entre aventure et partage. Des expériences collectives qui marquent une vie.',
    image: '/images/senegal/gallery-1.jpg',
    href: '/voyages/back-to-senegal',
    price: 'Dès 2 200 €',
  },
]

const EXPERTISE = [
  {
    title: 'Voyages immersifs',
    description: 'Séjours authentiques au Sénégal et en Afrique de l\'Ouest, loin du tourisme de masse.',
    href: '/voyages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      </svg>
    ),
  },
  {
    title: 'Guides de voyage',
    description: 'Guides PDF détaillés écrits par une locale. Préparez votre séjour en toute autonomie.',
    href: '/guides',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: 'Consulting stratégique',
    description: 'Accompagnement sur mesure pour vos projets en Afrique de l\'Ouest.',
    href: '/consulting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Digital & IA',
    description: 'Transformation digitale, IA appliquée et formations pour accélérer votre croissance.',
    href: '/digital-ia',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
]

const SOCIAL_PROOF = [
  { value: '2 000+', label: 'voyageurs accompagnés' },
  { value: '10 ans', label: 'de terrain en Afrique' },
  { value: '4', label: 'verticales d\'expertise' },
]

const TRUST_LOGOS = [
  'TripAfro', 'Consulting', 'Digital & IA', 'Guides',
]

/* ─── Composant Slider Voyages ─── */
function VoyagesSlider() {
  const [active, setActive] = useState(0)
  const reveal = useReveal()

  const next = useCallback(() => setActive(i => (i + 1) % VOYAGES.length), [])
  const prev = useCallback(() => setActive(i => (i - 1 + VOYAGES.length) % VOYAGES.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const v = VOYAGES[active]

  return (
    <div ref={reveal.ref} className={`transition-all duration-700 ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex flex-col md:flex-row gap-0 rounded-[4px] overflow-hidden" style={{ minHeight: '520px' }}>
        <div className="relative md:w-3/5 overflow-hidden" style={{ minHeight: '320px' }}>
          {VOYAGES.map((voyage, i) => (
            <div
              key={voyage.href}
              className="absolute inset-0 transition-all duration-1000"
              style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1)' : 'scale(1.1)' }}
            >
              <Image src={voyage.image} alt={voyage.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(86,14,19,0.4) 0%, transparent 60%)' }} />
          <div className="absolute bottom-6 left-6 flex gap-3 z-10">
            <button onClick={prev} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(246,201,97,0.3)', color: '#F6C961' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={next} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(246,201,97,0.3)', color: '#F6C961' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          <div className="absolute bottom-6 right-6 flex gap-2 z-10">
            {VOYAGES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="h-0.5 rounded-full transition-all duration-500" style={{ width: i === active ? '32px' : '16px', backgroundColor: i === active ? '#F6C961' : 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        </div>
        <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center" style={{ backgroundColor: '#560E13' }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4 font-dm-sans" style={{ color: '#F6C961' }}>{v.subtitle}</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 font-cormorant text-white transition-all duration-500" key={`title-${active}`} style={{ animation: 'fadeUp 0.6s ease-out' }}>{v.title}</h3>
          <p className="text-sm leading-relaxed mb-8 font-dm-sans" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 0.6s ease-out 0.1s both' }} key={`desc-${active}`}>{v.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold font-cormorant" style={{ color: '#F6C961' }}>{v.price}</span>
            <Link href={v.href} className="text-xs font-bold uppercase tracking-wider font-dm-sans text-white hover:text-[#F6C961] transition-colors">Découvrir →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Composant Hero Email Capture ─── */
function HeroEmailCapture() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, source: 'homepage-hero' }),
      })
      if (res.ok) setSuccess(true)
    } catch { /* ignore */ }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(246,201,97,0.15)', border: '1px solid rgba(246,201,97,0.3)' }}>
        <p className="text-sm font-bold font-dm-sans text-white">Bienvenue dans la communauté !</p>
        <p className="text-xs font-dm-sans" style={{ color: 'rgba(255,255,255,0.7)' }}>Vérifiez votre boîte mail.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
      <input
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        className="flex-1 px-4 py-3 rounded-[4px] text-sm font-dm-sans outline-none placeholder:text-white/40"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', minWidth: 0 }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 rounded-[4px] text-sm font-dm-sans outline-none placeholder:text-white/40"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', minWidth: 0 }}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-[4px] text-sm font-bold font-dm-sans uppercase tracking-wider transition-all duration-300 hover:brightness-110 whitespace-nowrap"
        style={{ backgroundColor: '#F6C961', color: '#560E13' }}
      >
        {loading ? '...' : 'Rejoindre'}
      </button>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE PRINCIPALE — PERSONAL BRANDING
   ═══════════════════════════════════════════════════════ */
export default function HomePage() {
  const manifeste = useReveal()
  const stats = useReveal()
  const expertise = useReveal()
  const roseline = useReveal()
  const guideCta = useReveal()

  const statsCount = useCountUp(2000, 2500, stats.visible)
  const yearsCount = useCountUp(10, 1500, stats.visible)

  return (
    <main className="overflow-x-hidden">
      <Nav />

      {/* ═══ HERO — PERSONAL BRANDING ═══ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', backgroundColor: '#0A0A0A' }}>
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #F6C961 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Decorative gold line */}
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(246,201,97,0.3) 50%, transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center min-h-screen pt-28 pb-16 lg:pb-0 gap-8 lg:gap-4">

            {/* LEFT — Texte + Capture */}
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">

              {/* Eyebrow */}
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-6" style={{ animation: 'fadeUp 0.8s ease-out 0.2s both' }}>
                <div className="h-[1px] w-8" style={{ backgroundColor: '#F6C961' }} />
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] font-dm-sans" style={{ color: '#F6C961' }}>
                  Voyages · Consulting · Digital
                </p>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.05] mb-6 font-cormorant text-white"
                style={{ animation: 'fadeUp 0.8s ease-out 0.4s both' }}
              >
                J&apos;aide la diaspora à
                <br />
                <span style={{ color: '#F6C961' }}>se reconnecter</span>
                <br />
                avec l&apos;Afrique
              </h1>

              {/* Subtitle */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-dm-sans"
                style={{ color: 'rgba(255,255,255,0.6)', animation: 'fadeUp 0.8s ease-out 0.6s both' }}
              >
                Experte Sénégal & Afrique de l&apos;Ouest — voyages immersifs,
                consulting stratégique et transformation digitale.
              </p>

              {/* Email capture */}
              <div style={{ animation: 'fadeUp 0.8s ease-out 0.8s both' }}>
                <HeroEmailCapture />
                <p className="text-[11px] mt-2.5 font-dm-sans" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Rejoignez 2 000+ abonnés · Guide offert à l&apos;inscription
                </p>
              </div>

              {/* Social proof pills */}
              <div className="flex flex-wrap items-center gap-3 mt-10 justify-center lg:justify-start" style={{ animation: 'fadeUp 0.8s ease-out 1s both' }}>
                {SOCIAL_PROOF.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-dm-sans"
                    style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="font-bold" style={{ color: '#F6C961' }}>{value}</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Quick CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 justify-center lg:justify-start" style={{ animation: 'fadeUp 0.8s ease-out 1.1s both' }}>
                <a
                  href="https://calendly.com/roselinengom/decouverte-15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider font-dm-sans transition-all duration-300 hover:gap-3 flex items-center gap-2"
                  style={{ color: '#F6C961' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Réserver un appel
                </a>
                <span className="hidden sm:block text-white/20">|</span>
                <a
                  href="https://wa.me/33650329808?text=Bonjour%20Roseline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider font-dm-sans transition-all duration-300 hover:gap-3 flex items-center gap-2"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.108-1.132l-.288-.173-2.98.78.793-2.897-.19-.3A8 8 0 1112 20z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* RIGHT — Photo de Roseline */}
            <div className="flex-shrink-0 order-1 lg:order-2 relative" style={{ animation: 'fadeUp 0.8s ease-out 0.5s both' }}>
              {/* Photo container — format naturel, sans cercle */}
              <div className="relative w-72 sm:w-80 lg:w-[440px]">
                {/* Gold accent line behind */}
                <div className="absolute -left-3 top-8 bottom-8 w-[3px] rounded-full" style={{ backgroundColor: '#F6C961', opacity: 0.4 }} />

                {/* Main photo */}
                <div className="relative overflow-hidden rounded-[8px]" style={{ aspectRatio: '3/4', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                  <Image
                    src="/images/roseline-conference.png"
                    alt="Roseline Ngom — Conférence, experte Afrique de l'Ouest"
                    fill
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 440px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Gradient blend into dark bg at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }} />
                  {/* Subtle gold border */}
                  <div className="absolute inset-0 rounded-[8px]" style={{ border: '1px solid rgba(246,201,97,0.15)' }} />
                </div>

                {/* Floating badge */}
                <div
                  className="absolute -bottom-3 left-6 px-5 py-2.5 rounded-full text-xs font-bold font-dm-sans uppercase tracking-wider animate-pulse-badge z-10"
                  style={{ backgroundColor: '#F6C961', color: '#560E13', boxShadow: '0 8px 24px rgba(246,201,97,0.4)' }}
                >
                  10 ans d&apos;expertise
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ animation: 'bounce 2s ease-in-out infinite' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(246,201,97,0.5)" strokeWidth="1.5" className="w-7 h-7">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ═══ SECTION 2 — BANDE DE CONFIANCE (blanc) ═══ */}
      <section className="py-6 md:py-8" style={{ backgroundColor: '#FEFCF9', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {TRUST_LOGOS.map((name) => (
              <span
                key={name}
                className="text-xs font-bold uppercase tracking-[0.2em] font-dm-sans"
                style={{ color: '#8A7E74', opacity: 0.5 }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — MANIFESTE / PROMESSE (crème) ═══ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div ref={manifeste.ref} className={`transition-all duration-1000 ${manifeste.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="w-16 h-0.5 mx-auto mb-10 transition-all duration-1000 delay-300" style={{ backgroundColor: '#F6C961', transform: manifeste.visible ? 'scaleX(1)' : 'scaleX(0)' }} />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight font-cormorant" style={{ color: '#560E13' }}>
              L&apos;Afrique ne se visite pas.
              <br />
              <em style={{ color: '#F6C961' }}>Elle se vit.</em>
            </h2>
            <p className="mt-8 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.65 }}>
              En une décennie, j&apos;ai construit un pont entre la diaspora et l&apos;Afrique de l&apos;Ouest.
              Voyages, business, digital — je vous accompagne à chaque étape
              de votre reconnexion avec le continent.
            </p>
          </div>

          {/* Compteurs animés */}
          <div ref={stats.ref} className={`flex justify-center gap-12 md:gap-24 mt-16 transition-all duration-700 delay-500 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold font-cormorant" style={{ color: '#560E13' }}>{statsCount.toLocaleString()}+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] mt-2 font-dm-sans" style={{ color: '#8A7E74' }}>voyageurs accompagnés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold font-cormorant" style={{ color: '#560E13' }}>{yearsCount} ans</div>
              <div className="text-[10px] uppercase tracking-[0.2em] mt-2 font-dm-sans" style={{ color: '#8A7E74' }}>de terrain</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — EXPERTISE (bordeaux) ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#560E13' }}>
        <div className="hex-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div ref={expertise.ref} className="text-center mb-16">
            <p className={`text-xs font-bold uppercase tracking-[0.25em] mb-4 font-dm-sans transition-all duration-700 ${expertise.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: '#F6C961' }}>
              L&apos;écosystème Roseline Ngom
            </p>
            <h2 className={`text-3xl md:text-5xl font-bold leading-tight font-cormorant text-white transition-all duration-700 delay-100 ${expertise.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Une expertise,
              <br />
              quatre dimensions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERTISE.map(({ title, description, href, icon }, i) => (
              <Link
                key={href}
                href={href}
                className={`block group transition-all duration-700 ${expertise.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div
                  className="h-full rounded-[4px] p-8 md:p-10 transition-all duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
                >
                  <div className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ color: '#F6C961' }}>{icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 font-cormorant text-white">{title}</h3>
                  <p className="text-sm leading-relaxed font-dm-sans" style={{ color: 'rgba(255,255,255,0.6)' }}>{description}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-dm-sans transition-all duration-300 group-hover:gap-4" style={{ color: '#F6C961' }}>
                    <span>Découvrir</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — VOYAGES SLIDER (blanc) ═══ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4 font-dm-sans" style={{ color: '#F6C961' }}>Voyages sur mesure</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight font-cormorant" style={{ color: '#560E13' }}>
              Trois façons de voyager
            </h2>
          </div>
          <VoyagesSlider />
          <div className="text-center mt-12">
            <Link href="/voyages" className="btn-bordeaux">Explorer tous les voyages</Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — À PROPOS / ROSELINE (crème) ═══ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div ref={roseline.ref} className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 transition-all duration-1000 ${roseline.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Portrait */}
            <div className="relative flex-shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <Image src="/images/roseline.jpg" alt="Roseline Ngom" fill sizes="288px" className="object-cover object-top rounded-full" />
              </div>
              <div className="absolute inset-0 rounded-full" style={{ border: '2px solid #F6C961', transform: 'translate(8px, 8px)' }} />
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 font-dm-sans" style={{ color: '#F6C961' }}>Fondatrice TripAfro</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-2 font-cormorant" style={{ color: '#560E13' }}>Roseline Ngom</h2>
              <p className="text-sm mb-6 font-dm-sans" style={{ color: '#8A7E74' }}>Casamançaise de coeur · Entre Paris et Dakar</p>
              <p className="text-base leading-relaxed font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.7 }}>
                Sénégalaise passionnée, j&apos;ai fondé TripAfro pour révéler la vraie richesse
                de l&apos;Afrique de l&apos;Ouest. Mon parcours mêle tourisme immersif, consulting
                stratégique et transformation digitale — toujours au service de projets à impact.
              </p>
              <blockquote className="mt-6 pl-5 text-lg leading-relaxed font-cormorant italic" style={{ borderLeft: '3px solid #F6C961', color: '#560E13' }}>
                &laquo; Dix ans de terrain, 2 000 voyageurs accompagnés.
                Le Sénégal m&apos;a tout appris. &raquo;
              </blockquote>
              <div className="mt-8">
                <Link href="/a-propos" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider font-dm-sans" style={{ color: '#560E13' }}>
                  <span className="relative">
                    Découvrir mon parcours
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F6C961' }} />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7 — GUIDE GRATUIT CTA (bordeaux) ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#560E13' }}>
        <div className="hex-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div ref={guideCta.ref} className={`transition-all duration-700 delay-200 ${guideCta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              {/* Texte + lien */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4 font-dm-sans" style={{ color: '#F6C961' }}>
                  Ressource gratuite · 33 pages
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 font-cormorant text-white">
                  15 expériences secrètes
                  <br />
                  <em style={{ color: '#F6C961' }}>au Sénégal</em>
                </h2>
                <p className="text-base leading-relaxed mb-8 font-dm-sans" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Lieux cachés, contacts locaux, conseils pratiques.
                  Le guide que seule une locale peut vous offrir — directement dans votre boîte mail.
                </p>
                <Link href="/guide" className="btn-gold">
                  Télécharger le guide gratuit
                </Link>
              </div>

              {/* Mockup PDF */}
              <div className="relative w-56 md:w-72 flex-shrink-0" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <div className="relative rounded-[4px] overflow-hidden" style={{ aspectRatio: '3/4', transform: 'rotate(2deg)', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
                  <Image src="/images/senegal/gallery-1.jpg" alt="Guide 15 expériences secrètes au Sénégal" fill sizes="288px" className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(86,14,19,0.85) 0%, rgba(86,14,19,0.6) 100%)' }} />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="w-10 h-0.5 mb-5" style={{ backgroundColor: '#F6C961' }} />
                      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 font-dm-sans" style={{ color: '#F6C961' }}>Guide offert · 2026</p>
                      <h3 className="text-xl md:text-2xl font-bold font-cormorant text-white leading-tight">15 expériences secrètes au Sénégal</h3>
                      <p className="text-xs mt-2 font-dm-sans" style={{ color: '#F6C961' }}>Le guide que seule une locale peut vous offrir</p>
                    </div>
                    <div>
                      <p className="text-sm font-cormorant text-white">Roseline Ngom</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-dm-sans" style={{ color: '#F6C961' }}>Fondatrice TripAfro</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 px-4 py-1.5 rounded-full text-xs font-bold font-dm-sans uppercase tracking-wider z-10" style={{ backgroundColor: '#F6C961', color: '#560E13', boxShadow: '0 4px 12px rgba(246,201,97,0.4)' }}>
                  100% Gratuit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8 — CTA FINAL (noir + parallax) ═══ */}
      <section className="relative py-28 md:py-36 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'url(/images/senegal/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.15 }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-cormorant text-white">
            Prêt à vous
            <br />
            <em style={{ color: '#F6C961' }}>reconnecter</em> ?
          </h2>
          <p className="text-base md:text-lg mb-10 font-dm-sans" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Que vous souhaitiez voyager, entreprendre ou vous reconnecter
            <br className="hidden md:block" />
            avec vos racines — je suis là pour vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/roselinengom/decouverte-15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Réserver un appel gratuit
            </a>
            <a
              href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20veux%20en%20savoir%20plus."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ─── CSS Animations ─── */}
      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { transform: rotate(2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-12px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </main>
  )
}
