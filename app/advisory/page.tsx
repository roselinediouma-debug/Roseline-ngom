import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'
const INK = '#0A0A0A'

export const metadata: Metadata = {
  title: 'Advisory — Roseline Ngom',
  description: 'Trois portes pour collaborer : mandats Désirabilité, advisory annuel, souveraineté algorithmique des nations.',
}

const OFFRES = [
  {
    n: '01',
    label: 'Mandat Désirabilité',
    desc: "Refonte complète de la stratégie d’attractivité d’une nation, d’une région ou d’une destination. 12 à 18 mois. Trois mandats par an au maximum.",
  },
  {
    n: '02',
    label: 'Advisory annuel',
    desc: "Présence stratégique récurrente auprès d’un dirigeant, d’un comité de direction ou d’un ministre. Forfait annuel. Cinq advisory en parallèle au maximum.",
  },
  {
    n: '03',
    label: 'LLM Sovereignty Audit',
    desc: "Diagnostic complet de la représentation d’une nation dans les grands modèles génératifs (ChatGPT, Gemini, Claude, Perplexity). Plan correctif, plan d’injection de contenu, mesure trimestrielle.",
  },
]

export default function BureauPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, minHeight: '100vh', padding: 'clamp(7rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) 6rem' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: BRAND, opacity: 0.65, marginBottom: 24 }}>
            / 03 — Advisory
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: BRAND, fontWeight: 500, lineHeight: 1.08, marginBottom: 28 }}>
            Trois portes
            <br />
            <em style={{ fontStyle: 'italic', color: '#b8860b' }}>pour collaborer.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', color: 'rgba(10,10,10,0.7)', lineHeight: 1.55, marginBottom: 56 }}>
            Pas de prix affichés. Pas de catalogue. Chaque mission est cadrée individuellement
            <br />
            avec l’organisation cliente, sur une enveloppe de référence partagée en privé.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
            {OFFRES.map((o) => (
              <div
                key={o.n}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  background: '#fff',
                  border: '1px solid rgba(86,14,19,0.1)',
                  borderRadius: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: BRAND, opacity: 0.65 }}>
                    / {o.n}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', color: BRAND, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>
                    {o.label}
                  </h3>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(10,10,10,0.72)', margin: 0 }}>
                  {o.desc}
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
              / DEMANDER UN ENTRETIEN
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', lineHeight: 1.5, marginBottom: 22 }}>
              Je réponds personnellement à toute organisation
              <br />
              qui m’écrit en présentant son contexte.
            </p>
            <a
              href="mailto:bureau@roselinengom.com?subject=Demande%20d%27entretien"
              style={{ display: 'inline-block', padding: '13px 26px', background: GOLD, color: BRAND, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}
            >
              bureau@roselinengom.com
            </a>
          </div>

          <Link href="/" style={{ display: 'inline-block', marginTop: 40, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRAND, textDecoration: 'none', borderBottom: `1px solid ${BRAND}` }}>
            ← Retour
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
