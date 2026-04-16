import Link from 'next/link'

interface SalesPageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  badges?: string[]
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  backgroundImage?: string
  dark?: boolean
}

export default function SalesPageHero({
  eyebrow,
  title,
  subtitle,
  badges,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  dark = true,
}: SalesPageHeroProps) {
  const textColor = dark ? '#FEFCF9' : '#0A0A0A'
  const mutedColor = dark ? 'rgba(254,252,249,0.8)' : 'rgba(10,10,10,0.65)'

  return (
    <section
      className="relative w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        background: backgroundImage
          ? undefined
          : 'linear-gradient(135deg, #560E13 0%, #3d0a0e 50%, #560E13 100%)',
      }}
    >
      {/* Background image + overlay */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.65), rgba(86,14,19,0.8))' }}
          />
        </>
      )}

      {/* Hexagon SVG pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-hex" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke={dark ? '#F6C961' : '#560E13'}
                strokeWidth="0.8"
              />
              <path
                d="M28 0L56 16L56 50L28 66L0 50L0 16Z"
                fill="none"
                stroke={dark ? '#F6C961' : '#560E13'}
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-hex)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        {eyebrow && (
          <p
            className="text-sm uppercase tracking-widest mb-4 font-semibold"
            style={{ color: '#F6C961' }}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            color: textColor,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: mutedColor }}>
            {subtitle}
          </p>
        )}

        {badges && badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {badges.map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: 'rgba(246,201,97,0.15)',
                  color: '#F6C961',
                  border: '1px solid rgba(246,201,97,0.3)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {ctaPrimary && (
            <Link
              href={ctaPrimary.href}
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: '#F6C961',
                color: '#560E13',
              }}
            >
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: 'transparent',
                color: dark ? '#FEFCF9' : '#560E13',
                border: `2px solid ${dark ? 'rgba(254,252,249,0.4)' : '#560E13'}`,
              }}
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
