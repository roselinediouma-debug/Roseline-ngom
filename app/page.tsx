import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Roseline Ngom — Désirabilité des nations francophones',
  description:
    "Je répare les récits nationaux des pays francophones et mesure leur désirabilité auprès du monde.",
  openGraph: {
    title: 'Roseline Ngom — Désirabilité des nations francophones',
    description:
      "Je répare les récits nationaux des pays francophones et mesure leur désirabilité auprès du monde.",
  },
}

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'
const INK = '#0A0A0A'

const PORTES = [
  {
    n: '01',
    label: 'Idée',
    title: 'La thèse',
    desc: "La désirabilité des nations, un actif économique mesurable et souverain.",
    href: '/idee',
  },
  {
    n: '02',
    label: 'Indice',
    title: 'L’Indice',
    desc: "L’Indice de Désirabilité des Nations Africaines. Premier numéro pilote, déjà publié.",
    href: '/indice',
  },
  {
    n: '03',
    label: 'Advisory',
    title: 'Collaborer',
    desc: "Trois portes pour travailler ensemble : mandats, advisory annuel, souveraineté algorithmique.",
    href: '/advisory',
  },
]

export default function HomePage() {
  return (
    <>
      <Nav variant="solid" />

      <main
        style={{
          backgroundColor: CREAM,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* glow doré décoratif très subtil */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: 700,
            height: 700,
            background: `radial-gradient(circle, rgba(246,201,97,0.14) 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '-10%',
            width: 520,
            height: 520,
            background: `radial-gradient(circle, rgba(86,14,19,0.08) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        {/* dot grid filigrane */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(86,14,19,0.05) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />

        {/* HERO — phrase signature géante */}
        <section
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(7rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 5vw, 4rem)',
            maxWidth: 1240,
            margin: '0 auto',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* label monospace haut */}
          <div
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: BRAND,
              opacity: 0.65,
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: BRAND,
                opacity: 0.4,
                display: 'inline-block',
              }}
            />
            Roseline Ngom · Désirabilité des nations francophones
          </div>

          {/* Phrase signature — accroche polarisante */}
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 500,
              color: BRAND,
              fontSize: 'clamp(2.6rem, 7.2vw, 6.4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              marginBottom: 36,
              maxWidth: 1100,
            }}
          >
            Une nation qui ne possède plus son récit
            <br />
            <em
              style={{
                fontStyle: 'italic',
                background: `linear-gradient(90deg, ${BRAND} 0%, #8a2530 60%, #b8860b 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              perd plus que son image. Elle perd sa désirabilité.
            </em>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)',
              color: 'rgba(10,10,10,0.7)',
              lineHeight: 1.55,
              maxWidth: 720,
              marginBottom: 24,
            }}
          >
            Je répare les récits nationaux des pays francophones
            <br />
            et mesure leur désirabilité auprès du monde.
          </p>

          <p
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 12,
              letterSpacing: '0.08em',
              color: 'rgba(10,10,10,0.5)',
              lineHeight: 1.7,
              maxWidth: 720,
              marginTop: 8,
            }}
          >
            Stratège en attractivité des territoires, IA et récit des nations.
          </p>
        </section>

        {/* SECTION 3 PORTES */}
        <section
          style={{
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 4rem) clamp(5rem, 8vw, 7rem)',
            maxWidth: 1240,
            margin: '0 auto',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* séparateur or fin */}
          <div
            aria-hidden
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)`,
              opacity: 0.4,
              marginBottom: 56,
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 28,
            }}
          >
            {PORTES.map((p) => (
              <Link
                key={p.n}
                href={p.href}
                className="v3-porte"
                style={{
                  textDecoration: 'none',
                  color: INK,
                  display: 'block',
                  padding: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid rgba(86,14,19,0.12)`,
                  borderRadius: 4,
                  transition: 'transform .35s ease, border-color .35s ease, background .35s ease, box-shadow .35s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: BRAND,
                      opacity: 0.7,
                    }}
                  >
                    / {p.n} — {p.label}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                    color: BRAND,
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'rgba(10,10,10,0.7)',
                    marginBottom: 24,
                  }}
                >
                  {p.desc}
                </p>
                <span
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: BRAND,
                    fontWeight: 600,
                  }}
                >
                  Entrer →
                </span>
              </Link>
            ))}
          </div>

          {/* mention bas — bureau */}
          <div
            style={{
              marginTop: 56,
              paddingTop: 28,
              borderTop: `1px solid rgba(86,14,19,0.08)`,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            <span>bureau@roselinengom.com · Paris · Dakar</span>
            <a
              href="https://tripafro.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(10,10,10,0.55)',
                textDecoration: 'none',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(10,10,10,0.2)',
                paddingBottom: 2,
              }}
            >
              Laboratoire terrain depuis 2016
            </a>
          </div>
        </section>

        <style>{`
          .v3-porte:hover {
            transform: translateY(-4px);
            border-color: rgba(86,14,19,0.35) !important;
            background: rgba(255,255,255,0.85) !important;
            box-shadow: 0 12px 32px rgba(86,14,19,0.08);
          }
          @media (prefers-reduced-motion: reduce) {
            .v3-porte { transition: none !important; }
          }
        `}</style>
      </main>

      <Footer />
    </>
  )
}
