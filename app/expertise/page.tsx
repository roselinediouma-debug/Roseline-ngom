import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'
const BG = '#F8F5F0'

export const metadata: Metadata = {
  title: 'Expertise — Conseil stratégique & Digital IA pour le tourisme africain | Roseline Ngom',
  description:
    "Conseil stratégique, audit, accompagnement, digital et IA pour hôteliers, opérateurs touristiques et institutions en Afrique de l'Ouest. Une seule expertise, deux leviers complémentaires.",
}

const PILLARS = [
  {
    mk: '/PILIER.01',
    title: 'Conseil stratégique',
    tag: 'STRATÉGIE',
    desc: "Diagnostic, positionnement, roadmap. On décide avant d'investir. On exécute sans se planter.",
    points: [
      'Audit stratégique 360° en 3 semaines',
      'Accompagnement co-pilote 3 à 12 mois',
      'Conseil institutionnel (ministères, agences, ONG)',
      'Business plan, pricing, acquisition',
    ],
    href: '/consulting',
    cta: 'Voir les formules conseil',
    dark: false,
  },
  {
    mk: '/PILIER.02',
    title: 'Digital & IA',
    tag: 'EXÉCUTION',
    desc: "Sites, automatisations, chatbots IA, CRM. On transforme la stratégie en système qui tourne 24/7.",
    points: [
      'Présence digitale pilotée (1 500 € / mois)',
      'Transformation digitale complète (3 mois)',
      'IA appliquée sur mesure (chatbots, agents)',
      'Formations IA pour équipes terrain',
    ],
    href: '/digital-ia',
    cta: 'Voir les formules digital & IA',
    dark: true,
  },
]

const OFFRES = [
  {
    mk: '/OFFRE.01',
    pillar: 'CONSEIL',
    title: 'Audit stratégique',
    price: '1 800 €',
    priceSub: '3 SEMAINES · LIVRABLE PDF',
    desc: "Diagnostic complet + roadmap 6 mois. Livré en 3 semaines avec restitution 1h30.",
    href: '/consulting/audit-strategique',
  },
  {
    mk: '/OFFRE.02',
    pillar: 'CONSEIL',
    title: 'Accompagnement',
    price: 'Dès 3 500 €',
    priceSub: '3 À 12 MOIS · CO-PILOTE',
    desc: 'Co-pilotage, visios mensuelles, support WhatsApp, mise en relation réseau.',
    href: '/consulting/accompagnement',
    featured: true,
  },
  {
    mk: '/OFFRE.03',
    pillar: 'CONSEIL',
    title: 'Conseil institutionnel',
    price: '1 200 € / jour',
    priceSub: 'FORFAIT ÉTUDE 5K – 15K',
    desc: 'Ministères, agences, ONG, fondations. Études, cadrages, missions ponctuelles.',
    href: '/consulting/institutionnel',
  },
  {
    mk: '/OFFRE.04',
    pillar: 'DIGITAL & IA',
    title: 'Présence digitale',
    price: '1 500 € / mois',
    priceSub: 'ENGAGEMENT.6MOIS',
    desc: 'Stratégie éditoriale, visuels, community management, reporting mensuel.',
    href: '/digital-ia/presence-digitale',
  },
  {
    mk: '/OFFRE.05',
    pillar: 'DIGITAL & IA',
    title: 'Transformation digitale',
    price: '8 500 – 15 000 €',
    priceSub: 'PROJET.3MOIS · COMPLET',
    desc: 'Site web, réservation en ligne, CRM, automations email — tout en 3 mois.',
    href: '/digital-ia/transformation',
  },
  {
    mk: '/OFFRE.06',
    pillar: 'DIGITAL & IA',
    title: 'IA appliquée',
    price: 'Dès 3 500 €',
    priceSub: 'SUR-MESURE · CHATBOTS · AGENTS',
    desc: 'Chatbot IA qualifié, agent de réponse, automatisations sur mesure.',
    href: '/digital-ia/ia-appliquee',
  },
]

const PROCESS = [
  {
    n: '/01',
    title: 'Audit flash gratuit',
    duration: 'T+30MIN · SANS.ENGAGEMENT',
    desc: "On analyse votre situation ensemble. Je vous identifie 2-3 leviers concrets.",
  },
  {
    n: '/02',
    title: 'Proposition sur-mesure',
    duration: 'T+5J · LIVRÉ EN PDF',
    desc: 'Vous recevez une proposition personnalisée : objectifs, méthode, livrables, prix.',
  },
  {
    n: '/03',
    title: 'Kick-off & exécution',
    duration: '3SEM – 12MOIS · ACOMPTE.40%',
    desc: 'On démarre. Calendrier défini, livrables chiffrés, reporting régulier.',
  },
  {
    n: '/04',
    title: 'Suivi & optimisation',
    duration: '30J.SUPPORT · KPI.SUIVIS',
    desc: 'On mesure, on ajuste, on optimise. Vous repartez autonome.',
  },
]

const PROOFS = [
  { mk: '[ 01 ]', n: '10+', l: "ans d'expertise terrain" },
  { mk: '[ 02 ]', n: '24K+', l: 'voyageurs dans la communauté' },
  { mk: '[ 03 ]', n: '100%', l: "projets en Afrique de l'Ouest" },
  { mk: '[ 04 ]', n: '5', l: 'accompagnements max / trimestre' },
]

export default function ExpertisePage() {
  return (
    <div style={{ backgroundColor: CREAM }}>
      <Nav variant="solid" />

      {/* HERO */}
      <section
        style={{
          paddingTop: '8rem',
          paddingBottom: '5rem',
          background: `linear-gradient(180deg, ${CREAM} 0%, ${BG} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, rgba(246,201,97,0.18) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(86,14,19,0.05) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 14px',
              borderRadius: 999,
              border: `1px solid rgba(86,14,19,0.15)`,
              backgroundColor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(6px)',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#15803D',
                boxShadow: '0 0 8px #15803D',
                animation: 'exp-pulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: BRAND,
              }}
            >
              / EXPERTISE — CONSEIL & DIGITAL IA
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.08,
              color: BRAND,
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            Une seule expertise.
            <br />
            <em
              style={{
                fontStyle: 'italic',
                background: `linear-gradient(90deg, ${BRAND} 0%, #9a2530 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Deux leviers complémentaires.
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: 'rgba(10,10,10,0.75)',
              maxWidth: 680,
              margin: '0 auto 32px',
            }}
          >
            Conseil stratégique pour décider juste. Digital & IA pour exécuter efficacement.
            Pour les hôtels, opérateurs touristiques, DMO et institutions en Afrique de l&apos;Ouest.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            <a
              href="https://calendly.com/roselinengom"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 28px',
                background: BRAND,
                color: GOLD,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
                display: 'inline-block',
              }}
            >
              Audit flash gratuit →
            </a>
            <Link
              href="#offres"
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: BRAND,
                border: `1px solid ${BRAND}`,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
              }}
            >
              Voir les formules
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
            {PROOFS.map((p) => (
              <div key={p.mk} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    color: BRAND,
                    opacity: 0.55,
                    marginBottom: 6,
                  }}
                >
                  {p.mk}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 32,
                    fontWeight: 600,
                    color: BRAND,
                    lineHeight: 1,
                  }}
                >
                  {p.n}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.6)', marginTop: 4 }}>{p.l}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes exp-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="exp-pulse"] { animation: none !important; }
          }
        `}</style>
      </section>

      {/* 2 PILIERS */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: BRAND,
                marginBottom: 14,
              }}
            >
              ◆ DEUX.PILIERS
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: BRAND,
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              La stratégie seule ne suffit pas.
              <br />
              <em style={{ fontStyle: 'italic', color: '#b8860b' }}>L&apos;exécution seule non plus.</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 24,
              maxWidth: 1100,
              margin: '0 auto',
            }}
          >
            {PILLARS.map((p) => (
              <Link
                key={p.mk}
                href={p.href}
                style={{
                  textDecoration: 'none',
                  padding: '36px 32px',
                  background: p.dark
                    ? 'linear-gradient(135deg, #560E13 0%, #3d090e 100%)'
                    : '#fff',
                  border: p.dark
                    ? '1px solid rgba(246,201,97,0.2)'
                    : '1px solid rgba(86,14,19,0.1)',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  color: p.dark ? CREAM : BRAND,
                  transition: 'transform .3s, box-shadow .3s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 10,
                      letterSpacing: '0.3em',
                      color: p.dark ? GOLD : BRAND,
                      opacity: 0.7,
                    }}
                  >
                    {p.mk}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '5px 10px',
                      background: p.dark ? GOLD : BRAND,
                      color: p.dark ? BRAND : GOLD,
                      borderRadius: 2,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 32,
                    fontWeight: 600,
                    marginBottom: 14,
                    color: p.dark ? CREAM : BRAND,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    marginBottom: 22,
                    color: p.dark ? 'rgba(254,252,249,0.75)' : 'rgba(10,10,10,0.7)',
                  }}
                >
                  {p.desc}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 26px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      style={{
                        display: 'flex',
                        gap: 10,
                        fontSize: 13.5,
                        color: p.dark ? 'rgba(254,252,249,0.85)' : 'rgba(10,10,10,0.75)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: GOLD, fontWeight: 700 }}>→</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 20,
                    borderTop: p.dark
                      ? '1px solid rgba(246,201,97,0.2)'
                      : '1px solid rgba(86,14,19,0.08)',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: p.dark ? GOLD : BRAND,
                  }}
                >
                  {p.cta} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES CHIFFRÉES */}
      <section id="offres" style={{ padding: '80px 20px', backgroundColor: BG, position: 'relative' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(86,14,19,0.05) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: BRAND,
                marginBottom: 14,
              }}
            >
              ◆ OFFRES.CHIFFRÉES
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: BRAND,
                fontWeight: 500,
                lineHeight: 1.15,
                marginBottom: 12,
              }}
            >
              Six formules. <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Un seul objectif.</em>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(10,10,10,0.65)', maxWidth: 620, margin: '0 auto' }}>
              Tous les tarifs sont publics. Pas de surprise, pas de négociation obscure.
              Choisissez la formule qui correspond à votre étape.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {OFFRES.map((o) => (
              <Link
                key={o.mk}
                href={o.href}
                style={{
                  textDecoration: 'none',
                  padding: '28px 24px',
                  background: o.featured
                    ? 'linear-gradient(135deg, #560E13 0%, #3d090e 100%)'
                    : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                  border: o.featured
                    ? '1px solid rgba(246,201,97,0.25)'
                    : '1px solid rgba(86,14,19,0.1)',
                  borderRadius: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  color: o.featured ? CREAM : BRAND,
                  position: 'relative',
                  transition: 'transform .3s, box-shadow .3s',
                }}
              >
                {o.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '4px 8px',
                      background: GOLD,
                      color: BRAND,
                      borderRadius: 2,
                    }}
                  >
                    Le + demandé
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 9,
                      letterSpacing: '0.3em',
                      color: o.featured ? GOLD : BRAND,
                      opacity: 0.7,
                    }}
                  >
                    {o.mk}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      background: o.featured ? 'rgba(246,201,97,0.15)' : 'rgba(86,14,19,0.08)',
                      color: o.featured ? GOLD : BRAND,
                      borderRadius: 2,
                    }}
                  >
                    {o.pillar}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 22,
                    fontWeight: 600,
                    marginBottom: 10,
                    color: o.featured ? CREAM : BRAND,
                  }}
                >
                  {o.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    marginBottom: 18,
                    color: o.featured ? 'rgba(254,252,249,0.75)' : 'rgba(10,10,10,0.7)',
                    flex: 1,
                  }}
                >
                  {o.desc}
                </p>
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: o.featured
                      ? '1px solid rgba(246,201,97,0.2)'
                      : '1px solid rgba(86,14,19,0.08)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 22,
                      fontWeight: 700,
                      color: o.featured ? GOLD : BRAND,
                      lineHeight: 1.1,
                    }}
                  >
                    {o.price}
                  </div>
                  <div
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 9,
                      letterSpacing: '0.15em',
                      color: o.featured ? 'rgba(246,201,97,0.7)' : 'rgba(86,14,19,0.6)',
                      marginTop: 4,
                    }}
                  >
                    {o.priceSub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS UNIFIÉ */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: BRAND,
                marginBottom: 14,
              }}
            >
              ◆ PROCESSUS.UNIFIÉ
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: BRAND,
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              Quatre étapes claires.
              <br />
              <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Zéro jargon, zéro blabla.</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
            }}
          >
            {PROCESS.map((p) => (
              <div
                key={p.n}
                style={{
                  padding: '28px 22px',
                  background: BG,
                  border: '1px solid rgba(86,14,19,0.08)',
                  borderRadius: 6,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: '#0A0A0A',
                    color: GOLD,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    marginBottom: 16,
                    border: '1px solid rgba(246,201,97,0.3)',
                  }}
                >
                  {p.n}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: BRAND,
                    marginBottom: 8,
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.65)',
                    marginBottom: 12,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    color: BRAND,
                    opacity: 0.6,
                    paddingTop: 10,
                    borderTop: '1px dashed rgba(86,14,19,0.15)',
                  }}
                >
                  {p.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        style={{
          padding: '80px 20px',
          background: `linear-gradient(135deg, ${BRAND} 0%, #3d090e 100%)`,
          color: CREAM,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(246,201,97,0.06) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: GOLD,
                boxShadow: `0 0 8px ${GOLD}`,
                animation: 'exp-pulse 2s ease-in-out infinite',
              }}
            />
            / SESSIONS.OUVERTES — 5 PLACES / TRIMESTRE
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            On échange 30 minutes.
            <br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>Gratuit, sans engagement.</em>
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              opacity: 0.8,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            Je vous écoute, je challenge honnêtement votre projet, et je vous dis si je peux vous aider.
            Pas de pitch commercial. Pas de pression.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://calendly.com/roselinengom"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 28px',
                background: GOLD,
                color: BRAND,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
              }}
            >
              Réserver mon créneau →
            </a>
            <a
              href="https://wa.me/33650329808"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: CREAM,
                border: `1px solid ${CREAM}`,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
              }}
            >
              WhatsApp
            </a>
          </div>
          <div
            style={{
              marginTop: 30,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 10,
              letterSpacing: '0.15em',
              color: 'rgba(246,201,97,0.6)',
            }}
          >
            RÉPONSE.24H · +33 6 50 32 98 08 · ROSELINEDIOUMA@GMAIL.COM
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
