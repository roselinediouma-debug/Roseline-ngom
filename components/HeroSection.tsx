'use client'

import Image from 'next/image'

interface HeroSectionProps {
  imageSrc: string
  imageAlt: string
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaOnClick?: () => void
  ctaSubtext?: string
  ctaSecondary?: { label: string; href: string }
  showChevron?: boolean
  badge?: string
}

export default function HeroSection({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaOnClick,
  ctaSubtext,
  ctaSecondary,
  showChevron,
  badge,
}: HeroSectionProps) {
  const handleClick = () => {
    if (ctaOnClick) {
      ctaOnClick()
    } else if (ctaHref?.startsWith('#')) {
      document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>
      {/* Photo plein écran */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay bordeaux dégradé */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(86,14,19,0.55) 0%, rgba(86,14,19,0.45) 35%, rgba(86,14,19,0.9) 100%)',
        }}
      />

      {/* Hex pattern */}
      <div className="hex-overlay" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 py-20" style={{ minHeight: '600px' }}>
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          {eyebrow && (
            <div
              className="inline-block mb-6 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[3px]"
              style={{
                backgroundColor: 'rgba(246,201,97,0.15)',
                color: '#F6C961',
                border: '1px solid rgba(246,201,97,0.3)',
                fontFamily: 'var(--font-poppins)',
              }}
            >
              {eyebrow}
            </div>
          )}

          {/* Titre */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{
              color: '#FEFCF9',
              fontFamily: 'var(--font-cormorant)',
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }}
          >
            {title}
          </h1>

          {/* Sous-titre */}
          {subtitle && (
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{
                color: 'rgba(254,252,249,0.75)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {ctaLabel && (
              ctaHref && !ctaHref.startsWith('#') ? (
                <a href={ctaHref} className="btn-gold">{ctaLabel}</a>
              ) : (
                <button onClick={handleClick} className="btn-gold">{ctaLabel}</button>
              )
            )}
            {ctaSecondary && (
              <a href={ctaSecondary.href} className="btn-outline-gold">{ctaSecondary.label}</a>
            )}
          </div>

          {/* Sous-texte CTA */}
          {ctaSubtext && (
            <p className="mt-4 text-xs tracking-wider" style={{ color: 'rgba(254,252,249,0.45)' }}>
              {ctaSubtext}
            </p>
          )}

          {/* Badge */}
          {badge && (
            <div
              className="mt-8 inline-block px-4 py-2 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(246,201,97,0.1)',
                color: '#F6C961',
                border: '1px solid rgba(246,201,97,0.2)',
              }}
            >
              {badge}
            </div>
          )}
        </div>
      </div>

      {/* Chevron animé */}
      {showChevron && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F6C961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}
    </section>
  )
}
