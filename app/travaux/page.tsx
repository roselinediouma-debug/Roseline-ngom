import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const CREAM = '#FEFCF9'

export const metadata: Metadata = {
  title: 'Travaux — Roseline Ngom',
  description: "Notes, thèses, dossiers et conversations sur l'attractivité des nations africaines et l'IA appliquée au récit des territoires.",
}

const SECTIONS = [
  {
    n: '01',
    label: 'Notes',
    desc: "Observations courtes, prises de position, marginalia. Format essai bref.",
  },
  {
    n: '02',
    label: 'Thèses',
    desc: "Articles longs argumentés sur la désirabilité, le récit national et la transformation par l'IA.",
  },
  {
    n: '03',
    label: 'Dossiers',
    desc: "Études approfondies, benchmarks, baromètres. Publiés sous l'Observatoire.",
  },
  {
    n: '04',
    label: 'Conversations',
    desc: "Entretiens longs avec décideurs, chercheurs, opérateurs. Format podcast et transcription.",
  },
]

export default function TravauxPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, minHeight: '100vh', padding: 'clamp(7rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) 6rem' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: BRAND, opacity: 0.65, marginBottom: 24 }}>
            / Travaux
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: BRAND, fontWeight: 500, lineHeight: 1.08, marginBottom: 28 }}>
            Notes, thèses, dossiers
            <br />
            <em style={{ fontStyle: 'italic', color: '#b8860b' }}>et conversations.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', color: 'rgba(10,10,10,0.7)', lineHeight: 1.55, marginBottom: 48 }}>
            Quatre formats. Une seule voix. Le journal d&apos;une maison de pensée en construction.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECTIONS.map((s) => (
              <div
                key={s.n}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  background: '#fff',
                  border: '1px solid rgba(86,14,19,0.1)',
                  borderRadius: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: BRAND, opacity: 0.65 }}>
                    / {s.n}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', color: BRAND, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>
                    {s.label}
                  </h2>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(10,10,10,0.72)', margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, padding: '1.5rem 2rem', background: 'rgba(86,14,19,0.04)', borderRadius: 4, fontSize: 14, lineHeight: 1.65, color: 'rgba(10,10,10,0.65)', fontStyle: 'italic', textAlign: 'center' }}>
            La cadence éditoriale démarre au printemps 2026. Les premiers travaux paraîtront dans les semaines suivantes.
          </div>

          <Link href="/" style={{ display: 'inline-block', marginTop: 40, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRAND, textDecoration: 'none', borderBottom: `1px solid ${BRAND}` }}>
            ← Accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
