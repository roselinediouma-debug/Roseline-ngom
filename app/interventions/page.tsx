import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'

export const metadata: Metadata = {
  title: 'Interventions — Roseline Ngom',
  description: "Conférences, médias, podcasts. Là où la voix de Roseline Ngom est invitée.",
}

const SECTIONS = [
  {
    n: '01',
    label: 'Keynotes',
    desc: "Conférences en français et en anglais sur la désirabilité des nations, l'attractivité touristique et l'IA appliquée aux récits territoriaux.",
  },
  {
    n: '02',
    label: 'Médias',
    desc: "Tribunes, entretiens, prises de parole dans la presse écrite et audiovisuelle.",
  },
  {
    n: '03',
    label: 'Panels & rencontres',
    desc: "Participation à des panels institutionnels, dîners d'influence, formats off-the-record.",
  },
]

export default function InterventionsPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, minHeight: '100vh', padding: 'clamp(7rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) 6rem' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: BRAND, opacity: 0.65, marginBottom: 24 }}>
            / Interventions
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: BRAND, fontWeight: 500, lineHeight: 1.08, marginBottom: 28 }}>
            Là où la voix
            <br />
            <em style={{ fontStyle: 'italic', color: '#b8860b' }}>est invitée.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', color: 'rgba(10,10,10,0.7)', lineHeight: 1.55, marginBottom: 48 }}>
            Keynotes, médias, panels. Trois formats pour porter le récit
            <br />
            de la désirabilité africaine dans le débat public.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
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

          <div
            style={{
              padding: '2rem 2.25rem',
              background: `linear-gradient(135deg, ${BRAND} 0%, #3d090e 100%)`,
              color: CREAM,
              borderRadius: 4,
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.3em', color: GOLD, marginBottom: 14 }}>
              / INVITER
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', lineHeight: 1.5, marginBottom: 22 }}>
              Pour une conférence, une tribune
              <br />
              ou un format presse, écrivez-moi.
            </p>
            <a
              href="mailto:bureau@roselinengom.com?subject=Demande%20d%27intervention"
              style={{ display: 'inline-block', padding: '13px 26px', background: GOLD, color: BRAND, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}
            >
              bureau@roselinengom.com
            </a>
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
