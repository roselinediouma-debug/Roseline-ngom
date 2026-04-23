import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import AuditClient from './AuditClient'

export const metadata = buildMetadata({
  title: 'Audit IA de présence en ligne pour hôtels indépendants',
  description:
    "Audit gratuit par intelligence artificielle : site web, Google Business, avis, réseaux sociaux. Rapport en 3 minutes avec score sur 100, faiblesses priorisées et plan d'action pour hôteliers africains.",
  path: '/outils/audit-presence-en-ligne',
})

const BRAND = '#560E13'
const GOLD = '#F6C961'
const BG = '#F8F5F0'

const STEPS = [
  {
    n: '01',
    title: 'Ton hôtel',
    desc: "Nom, ville, nombre de chambres, URL de ton site (ou non). 30 secondes.",
  },
  {
    n: '02',
    title: 'Ta présence',
    desc: "7 questions sur ta fiche Google, tes avis, tes OTA, tes réseaux. 2 minutes.",
  },
  {
    n: '03',
    title: 'Rapport IA',
    desc: "L'IA analyse tout, produit ton score, tes faiblesses prioritaires et ton plan d'action.",
  },
]

const SIGNALS = [
  {
    label: 'IA générative',
    desc: 'Modèle de langage dernière génération',
  },
  {
    label: 'PageSpeed Google',
    desc: 'Analyse technique de ton site en temps réel',
  },
  {
    label: '100 % gratuit',
    desc: "Sans compte, sans carte, sans spam",
  },
]

export default function AuditPage() {
  return (
    <>
      <Nav variant="solid" />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Outils', path: '/outils' },
          { name: 'Audit de présence en ligne', path: '/outils/audit-presence-en-ligne' },
        ])}
      />

      <main style={{ backgroundColor: '#FEFCF9' }}>
        {/* HERO */}
        <section
          style={{
            paddingTop: '8rem',
            paddingBottom: '4rem',
            background: `linear-gradient(180deg, #FEFCF9 0%, ${BG} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow doré décoratif */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '10%',
              right: '-15%',
              width: 420,
              height: 420,
              background: `radial-gradient(circle, rgba(246,201,97,0.18) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '-10%',
              width: 360,
              height: 360,
              background: `radial-gradient(circle, rgba(86,14,19,0.08) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <div className="max-w-4xl mx-auto px-5 text-center relative">
            {/* Badge "Propulsé par IA" */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                border: `1px solid rgba(86, 14, 19, 0.15)`,
                backgroundColor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#15803D',
                  animation: 'audit-pulse 2s ease-in-out infinite',
                }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: BRAND, letterSpacing: '0.04em' }}
              >
                Propulsé par IA · Analyse en direct
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                color: BRAND,
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                fontWeight: 500,
              }}
            >
              L&apos;audit IA qui dit à ton hôtel
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${BRAND} 0%, #9a2530 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontStyle: 'italic',
                }}
              >
                où il perd ses réservations
              </span>
            </h1>

            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
              En 3 minutes, une intelligence artificielle analyse ton site, ta fiche Google,
              tes avis et ta présence sociale. Elle te rend un rapport actionnable avec
              score sur 100, faiblesses priorisées et plan d&apos;action sur 90 jours.
            </p>

            <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
              {SIGNALS.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={BRAND}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div className="text-xs" style={{ color: BRAND }}>
                    <div style={{ fontWeight: 600 }}>{s.label}</div>
                    <div style={{ opacity: 0.65 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes audit-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(0.85); }
            }
          `}</style>
        </section>

        {/* WIZARD */}
        <section className="pb-16 px-5 -mt-8">
          <div className="max-w-2xl mx-auto">
            <AuditClient />
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="py-16 px-5" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: BRAND, letterSpacing: '0.15em' }}
              >
                Comment ça marche
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: BRAND,
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                }}
              >
                3 étapes, 3 minutes, 0 compte
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  style={{
                    padding: '2rem',
                    border: `1px solid rgba(86, 14, 19, 0.1)`,
                    borderRadius: '1rem',
                    backgroundColor: BG,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: GOLD,
                      lineHeight: 1,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {s.n}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      color: BRAND,
                      fontSize: '1.4rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm opacity-75 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CE QUE L'IA ANALYSE */}
        <section className="py-16 px-5" style={{ backgroundColor: BG }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: BRAND, letterSpacing: '0.15em' }}
                >
                  Technologie
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: BRAND,
                    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                    marginBottom: '1rem',
                  }}
                >
                  Pas un questionnaire déguisé. Une vraie analyse IA.
                </h2>
                <p className="text-base opacity-80 leading-relaxed mb-4">
                  Quand tu donnes ton URL, on va crawler ton site en direct : on mesure ta
                  vitesse mobile via PageSpeed Insights de Google, on extrait tes balises
                  SEO, on regarde si tu as un HTTPS, combien de H1, si ta meta description
                  existe.
                </p>
                <p className="text-base opacity-80 leading-relaxed">
                  Ensuite, une IA générative de dernière génération reçoit ces données
                  techniques + tes réponses au questionnaire et rédige un rapport
                  personnalisé — pas un template, une vraie analyse contextuelle pour{' '}
                  <em>ton</em> hôtel.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: `1px solid rgba(86, 14, 19, 0.08)`,
                  boxShadow: '0 4px 20px rgba(86, 14, 19, 0.06)',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '0.75rem',
                  color: '#3d3d3d',
                }}
              >
                <div style={{ color: BRAND, marginBottom: '0.5rem', fontWeight: 600 }}>
                  // Données analysées par l&apos;IA
                </div>
                <div>✓ PageSpeed mobile</div>
                <div>✓ Balise {'<title>'} et meta description</div>
                <div>✓ Structure H1 / H2</div>
                <div>✓ HTTPS &amp; mobile viewport</div>
                <div>✓ LCP / CLS (Core Web Vitals)</div>
                <div>✓ Statut fiche Google Business</div>
                <div>✓ Volume et gestion des avis</div>
                <div>✓ Activité réseaux sociaux</div>
                <div>✓ Distribution des canaux de résa</div>
                <div style={{ marginTop: '0.75rem', color: BRAND, fontWeight: 600 }}>
                  → Rapport structuré en 15-30s
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POURQUOI */}
        <section className="py-16 px-5" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: BRAND, letterSpacing: '0.15em' }}
            >
              Pourquoi cet outil existe
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: BRAND,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                marginBottom: '1.5rem',
              }}
            >
              Un diagnostic honnête, pas un argumentaire commercial
            </h2>
            <p className="opacity-80 text-base leading-relaxed">
              Je vois trop d&apos;hôteliers africains indépendants payer 20 % de commission
              aux OTA sans savoir qu&apos;avec une fiche Google complète, 30 avis et un
              site propre, ils reprendraient 30 à 40 % de leurs réservations en direct.
              L&apos;audit dit la vérité. Ensuite, libre à toi d&apos;agir seul ou de
              m&apos;appeler.
            </p>
            <p className="mt-6 text-sm opacity-60">
              — Roseline Ngom, consultante digitale &amp; IA pour le tourisme africain
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
