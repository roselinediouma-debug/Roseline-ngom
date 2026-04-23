'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function AnimatedGuideButton() {
  const [shaking, setShaking] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShaking(true)
      setTimeout(() => setShaking(false), 700)
    }, 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <Link href="/ressources/guide-15-experiences" className="block">
      <div
        className="relative w-full rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
        style={{
          background: 'white',
          border: '1.5px solid rgba(246,201,97,0.8)',
          animation: shaking ? 'shake 0.6s ease-in-out' : undefined,
          boxShadow: '0 4px 20px rgba(246,201,97,0.2)',
        }}
      >
        <span
          className="absolute -top-2.5 -right-2.5 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: '#F6C961',
            color: '#560E13',
            animation: 'pulse-badge 2s ease-in-out infinite',
          }}
        >
          GRATUIT
        </span>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}
        >
          🎁
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-tight" style={{ color: '#560E13' }}>
            Guide : 10 expériences secrètes au Sénégal
          </div>
          <div className="text-xs mt-0.5 opacity-65" style={{ color: '#560E13' }}>
            PDF immédiat, 100% gratuit
          </div>
        </div>
        <span style={{ color: '#F6C961', animation: 'bounce-arrow 1s ease-in-out infinite' }}>→</span>
      </div>
    </Link>
  )
}

function LinkButton({
  href,
  icon,
  label,
  sublabel,
  price,
  external,
}: {
  href: string
  icon: string
  label: string
  sublabel: string
  price?: string
  external?: boolean
}) {
  const inner = (
    <div
      className="w-full rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01] bg-white"
      style={{ border: '1px solid #e0d8d0' }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: '#F8F5F0' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm" style={{ color: '#0A0A0A' }}>{label}</div>
        <div className="text-xs mt-0.5 opacity-55">{sublabel}</div>
      </div>
      {price && (
        <div className="text-sm font-bold flex-shrink-0" style={{ color: '#560E13' }}>{price}</div>
      )}
      {!price && <span className="opacity-25 text-sm">→</span>}
    </div>
  )

  if (external) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  return <Link href={href}>{inner}</Link>
}

function ComingSoonButton({
  icon,
  label,
  sublabel,
}: {
  icon: string
  label: string
  sublabel: string
}) {
  return (
    <div
      className="relative w-full rounded-2xl p-4 flex items-center gap-4 bg-white"
      style={{ border: '1px solid #e0d8d0', opacity: 0.7, cursor: 'not-allowed' }}
    >
      <span
        className="absolute -top-2.5 -right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
        style={{ backgroundColor: '#560E13', color: '#F6C961' }}
      >
        Bientôt
      </span>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 grayscale"
        style={{ backgroundColor: '#F8F5F0' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm" style={{ color: '#0A0A0A' }}>{label}</div>
        <div className="text-xs mt-0.5 opacity-55">{sublabel}</div>
      </div>
      <span className="text-xs font-semibold flex-shrink-0" style={{ color: '#560E13', opacity: 0.6 }}>
        En préparation
      </span>
    </div>
  )
}

function ServiceCard({
  href,
  icon,
  title,
  description,
  price,
  dark = false,
}: {
  href: string
  icon: string
  title: string
  description: string
  price: string
  dark?: boolean
}) {
  return (
    <Link href={href} className="block flex-1">
      <div
        className="h-full rounded-2xl p-5 flex flex-col gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        style={
          dark
            ? { backgroundColor: '#560E13', color: '#FEFCF9' }
            : { backgroundColor: 'white', border: '1px solid #e0d8d0', color: '#0A0A0A' }
        }
      >
        <div className="text-3xl">{icon}</div>
        <div className="font-bold text-sm leading-snug" style={{ fontFamily: 'var(--font-cormorant)' }}>
          {title}
        </div>
        <div className="text-xs opacity-65 leading-relaxed flex-1">{description}</div>
        <div
          className="text-sm font-bold mt-1"
          style={{ color: dark ? '#F6C961' : '#560E13' }}
        >
          {price}
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{ background: 'linear-gradient(180deg, #FEFCF9 0%, #F8F5F0 100%)' }}
    >
      <div className="w-full max-w-[480px]">

        {/* ─── PROFIL ─── */}
        <div className="flex flex-col items-center text-center mb-10">

          {/* Avatar Roseline */}
          <div className="relative mb-5">
            <div
              className="w-28 h-28 rounded-full overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(86,14,19,0.25)',
                border: '4px solid #FEFCF9',
                outline: '3px solid rgba(246,201,97,0.35)',
              }}
            >
              <Image
                src="/images/roseline.jpg"
                alt="Roseline Ngom"
                width={112}
                height={112}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            {/* Badge vérifié */}
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: '#F6C961', border: '2px solid #FEFCF9', color: '#560E13' }}
            >
              ✓
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: '#0A0A0A' }}>
            Roseline Ngom
          </h1>
          <p className="text-sm font-semibold mb-4" style={{ color: '#560E13' }}>
            Fondatrice TripAfro · Experte voyage Sénégal & Afrique de l&apos;Ouest
          </p>

          {/* Proposition de valeur */}
          <div
            className="rounded-2xl px-5 py-4 mb-5 w-full text-center"
            style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
          >
            <p className="text-base font-semibold leading-snug" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Je vous emmène découvrir l&apos;Afrique de l&apos;Ouest autrement
            </p>
            <p className="text-xs opacity-65 mt-1">
              Voyages immersifs · Formations · Accompagnement stratégique
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex gap-3">
            {[
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/roseline_ng/',
                color: '#E1306C',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
              },
              {
                label: 'TikTok',
                href: 'https://www.tiktok.com/@roseline_ngom',
                color: '#000000',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                  </svg>
                ),
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@Roseline_ngom',
                color: '#FF0000',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/roseline-queval/',
                color: '#0A66C2',
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: 'Site web',
                href: '/',
                color: '#560E13',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
              },
            ].map(({ label, href, color, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform bg-white"
                style={{ border: '1px solid #e0d8d0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color }}
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ─── BLOC 1, Ressource gratuite ─── */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 px-1 flex items-center gap-2" style={{ color: '#16a34a' }}>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}
            >
              ↓
            </span>
            Ressource gratuite
          </div>
          <AnimatedGuideButton />
        </div>

        {/* ─── BLOC 2, Guides signatures ─── */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 px-1 flex items-center gap-2" style={{ color: '#b8860b' }}>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: 'rgba(246,201,97,0.25)', color: '#b8860b' }}
            >
              📚
            </span>
            Guides signatures
          </div>
          <div className="flex flex-col gap-3">
            <ComingSoonButton
              icon="📖"
              label="Guide Casamance"
              sublabel="Le guide PDF complet pour un séjour unique"
            />
            <ComingSoonButton
              icon="🗓️"
              label="Le Sénégal en une semaine"
              sublabel="Itinéraire clé en main pour un séjour de 7 jours"
            />
          </div>
        </div>

        {/* ─── BLOC 3, Mes services ─── */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 px-1 flex items-center gap-2" style={{ color: '#560E13' }}>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: 'rgba(86,14,19,0.1)', color: '#560E13' }}
            >
              ✦
            </span>
            Mes services
          </div>

          {/* 2 cartes côte à côte */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <ServiceCard
              href="/voyages"
              icon="🌍"
              title="Voyages TripAfro"
              description="Séjours immersifs et authentiques, de Dakar à la Casamance"
              price="Dès 1 795 €"
              dark={true}
            />
            <ServiceCard
              href="/consulting"
              icon="🎯"
              title="Conseil stratégique"
              description="Accompagnement pour vos projets en Afrique de l'Ouest"
              price="Dès 1 800 €"
            />
          </div>

          {/* Session découverte */}
          <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className="block">
            <div
              className="w-full rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ border: '1.5px dashed #560E13', backgroundColor: 'rgba(86,14,19,0.04)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: 'rgba(86,14,19,0.08)' }}
              >
                📅
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm" style={{ color: '#560E13' }}>
                  Session découverte, 15 min
                </div>
                <div className="text-xs mt-0.5 opacity-55">Gratuite · RDV Calendly immédiat</div>
              </div>
              <span style={{ color: '#560E13', opacity: 0.4 }}>→</span>
            </div>
          </a>

          {/* Digital & IA */}
          <div className="mt-3">
            <LinkButton
              href="/digital-ia"
              icon="🤖"
              label="Digital & IA"
              sublabel="Automatisation, stratégie digitale & intelligence artificielle"
              price="Dès 1 500 €/mois"
            />
          </div>
        </div>

        {/* ─── WhatsApp CTA ─── */}
        <a
          href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20veux%20en%20savoir%20plus."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-sm text-white mb-8 transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
        >
          <span className="text-xl">💬</span>
          Discuter sur WhatsApp
          <span className="text-xs opacity-75 hidden sm:inline">· +33 6 50 32 98 08</span>
        </a>

        <div className="text-center pb-4">
          <p className="text-xs opacity-30" style={{ color: '#0A0A0A' }}>
            © {new Date().getFullYear()} Roseline Ngom · TripAfro
          </p>
        </div>
      </div>
    </div>
  )
}
