import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const CREAM = '#FEFCF9'

export const metadata: Metadata = {
  title: 'L’Idée — Roseline Ngom',
  description: 'La thèse de Roseline Ngom : la désirabilité des nations comme actif économique mesurable et souverain.',
}

export default function IdeePage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, minHeight: '100vh', padding: 'clamp(7rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) 6rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: BRAND, opacity: 0.65, marginBottom: 24 }}>
            / 01 — Idée
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: BRAND, fontWeight: 500, lineHeight: 1.08, marginBottom: 28 }}>
            La désirabilité des nations,
            <br />
            <em style={{ fontStyle: 'italic', color: '#b8860b' }}>un actif économique mesurable.</em>
          </h1>

          <blockquote
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
              lineHeight: 1.35,
              color: BRAND,
              borderLeft: `2px solid ${BRAND}`,
              paddingLeft: 24,
              margin: '36px 0 40px',
              maxWidth: 620,
            }}
          >
            « L’Afrique n’a pas un problème d’image.
            <br />
            Elle a un problème de propriétaire d’image. »
          </blockquote>

          <p style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', color: 'rgba(10,10,10,0.7)', lineHeight: 1.55, marginBottom: 48 }}>
            Le manifeste-thèse complet est en cours d’écriture. 3 000 mots, à la première personne, lecture mai 2026.
          </p>
          <div style={{ padding: '2rem', background: '#fff', border: '1px solid rgba(86,14,19,0.1)', borderRadius: 4, fontSize: 14, lineHeight: 1.7, color: 'rgba(10,10,10,0.75)' }}>
            <p style={{ marginBottom: 16 }}>
              Trois questions structurantes que je me pose en ce moment :
            </p>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>Pourquoi je consacre ma vie à ça ?</li>
              <li style={{ marginBottom: 8 }}>Quelle conviction je porte que personne d’autre n’ose dire ?</li>
              <li>À qui je parle vraiment, au-delà des clients ?</li>
            </ol>
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
