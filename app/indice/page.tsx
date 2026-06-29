import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'

export const metadata: Metadata = {
  title: 'L’Indice de Désirabilité des Nations Francophones — Roseline Ngom',
  description: 'Le programme éditorial trimestriel qui mesure la désirabilité des nations francophones. Premier numéro pilote : benchmark Bénin · Maroc · Rwanda.',
}

export default function IndicePage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, minHeight: '100vh', padding: 'clamp(7rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) 6rem' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: BRAND, opacity: 0.65, marginBottom: 24 }}>
            / 02 — Indice
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: BRAND, fontWeight: 500, lineHeight: 1.08, marginBottom: 28 }}>
            L’Indice de Désirabilité
            <br />
            <em style={{ fontStyle: 'italic', color: '#b8860b' }}>des Nations Francophones.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', color: 'rgba(10,10,10,0.7)', lineHeight: 1.55, marginBottom: 48 }}>
            Un programme éditorial trimestriel. Méthodologie publique. Comité scientifique en constitution.
            <br />
            Premier numéro pilote déjà publié.
          </p>

          <div
            style={{
              padding: '2.5rem',
              background: `linear-gradient(135deg, ${BRAND} 0%, #3d090e 100%)`,
              color: CREAM,
              borderRadius: 6,
              marginBottom: 32,
            }}
          >
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.3em', color: GOLD, marginBottom: 14 }}>
              / NUMÉRO PILOTE — 2026
            </div>
            <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 500, marginBottom: 12, lineHeight: 1.15 }}>
              Ce que le Bénin, le Maroc et le Rwanda
              <br />
              <em style={{ fontStyle: 'italic', color: GOLD }}>enseignent au reste du continent.</em>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.85, marginBottom: 20, maxWidth: 600 }}>
              31 pages. Trois modèles d’attractivité comparés. Dix leçons transférables.
            </p>
            <Link href="/ressources/benchmark-institutionnel" style={{ display: 'inline-block', padding: '12px 24px', background: GOLD, color: BRAND, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
              Lire le benchmark
            </Link>
          </div>

          <div style={{ padding: '1.5rem 2rem', background: '#fff', border: '1px solid rgba(86,14,19,0.1)', borderRadius: 4, fontSize: 14, lineHeight: 1.7, color: 'rgba(10,10,10,0.75)' }}>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.3em', color: BRAND, opacity: 0.6, marginBottom: 10 }}>/ CALENDRIER PRÉVISIONNEL</div>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>Numéro 2 — Attractivité diaspora (Q3 2026)</li>
              <li>Numéro 3 — IA et tourisme africain (Q4 2026)</li>
              <li>Numéro 4 — Soft power culturel africain (Q1 2027)</li>
            </ul>
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
