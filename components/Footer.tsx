import Link from 'next/link'

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'

const NAV = [
  { href: '/idee', label: 'Idée' },
  { href: '/indice', label: 'Observatoire' },
  { href: '/travaux', label: 'Travaux' },
  { href: '/interventions', label: 'Interventions' },
  { href: '/advisory', label: 'Advisory' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/roseline-queval/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/roseline_ng/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Roseline_ngom',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ backgroundColor: BRAND, color: CREAM }}>
      {/* fine gold rule */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)`, opacity: 0.5 }} />

      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
        }}
      >
        {/* signature mark + tagline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 36,
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.8rem, 2.6vw, 2.4rem)',
                fontWeight: 600,
                color: CREAM,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                lineHeight: 1,
                display: 'inline-block',
                marginBottom: 14,
              }}
            >
              Roseline Ngom
            </Link>
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: GOLD,
                opacity: 0.85,
              }}
            >
              Strategist · Speaker · Author · Advisor
            </div>
            <p
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                lineHeight: 1.5,
                color: 'rgba(254,252,249,0.75)',
                marginTop: 18,
                maxWidth: 420,
              }}
            >
              Désirabilité des nations francophones, attractivité des territoires, transformation par l’intelligence artificielle.
            </p>
          </div>

          {/* social */}
          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(246,201,97,0.12)',
                  border: '1px solid rgba(246,201,97,0.25)',
                  color: GOLD,
                  textDecoration: 'none',
                  transition: 'background .3s, color .3s',
                }}
                className="footer-social"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* nav inline */}
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(16px, 2.5vw, 28px)',
            paddingTop: 28,
            borderTop: '1px solid rgba(246,201,97,0.2)',
            marginBottom: 36,
          }}
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(254,252,249,0.7)',
                textDecoration: 'none',
                transition: 'color .25s',
              }}
              className="footer-nav-link"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 20,
            borderTop: '1px solid rgba(246,201,97,0.12)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(254,252,249,0.55)',
          }}
        >
          <span>© {year} Roseline Ngom · Paris · Dakar</span>
          <span style={{ display: 'inline-flex', gap: 18, flexWrap: 'wrap' }}>
            <a
              href="mailto:bureau@roselinengom.com"
              style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(254,252,249,0.25)', paddingBottom: 2 }}
            >
              bureau@roselinengom.com
            </a>
            <a
              href="https://tripafro.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid rgba(254,252,249,0.25)', paddingBottom: 2 }}
            >
              Laboratoire terrain depuis 2016
            </a>
            <Link
              href="/mentions-legales"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Mentions
            </Link>
          </span>
        </div>
      </div>

      <style>{`
        .footer-social:hover { background: rgba(246,201,97,0.25) !important; color: #fff !important; }
        .footer-nav-link:hover { color: #F6C961 !important; }
      `}</style>
    </footer>
  )
}
