import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Voyages TripAfro au Sénégal — Retour aux Sources, Voyage Signature, Back to Senegal',
  description:
    "Voyages immersifs au Sénégal et en Afrique de l'Ouest, organisés par Roseline Ngom. Retour aux Sources (diaspora), Voyage Signature (sur-mesure), Back to Senegal (entrepreneurs). Groupes limités, accompagnement personnel.",
  openGraph: {
    title: 'Voyages TripAfro au Sénégal',
    description: "Voyages immersifs au Sénégal et en Afrique de l'Ouest, accompagnés par Roseline Ngom.",
  },
}

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'
const BG = '#F8F5F0'

const VOYAGES = [
  {
    mk: '/VOYAGE.01',
    kind: 'DIASPORA · FAMILLE',
    title: 'Retour aux Sources',
    duration: '14 jours',
    price: 'Dès 2 200 €',
    priceSub: '~1,44M FCFA · TOUT-INCLUS TERRE',
    tagline: 'Se reconnecter à ses racines, avec ses enfants.',
    desc: "14 jours d'immersion familiale : Dakar, Gorée, Saint-Louis, Lac Rose, Casamance. Pensé pour la diaspora qui veut transmettre.",
    href: '/voyages/retour-aux-sources',
    image: '/images/senegal/hero.jpg',
    dark: false,
  },
  {
    mk: '/VOYAGE.02',
    kind: 'SUR-MESURE · PRIVÉ',
    title: 'Voyage Signature',
    duration: 'Sur mesure',
    price: 'Sur devis',
    priceSub: 'DURÉE · RYTHME · BUDGET SUR-MESURE',
    tagline: 'Votre Sénégal. Votre rythme. Votre histoire.',
    desc: 'Construisez le voyage qui vous ressemble. Dates, étapes, confort, activités — tout sur-mesure. Roseline vous guide.',
    href: '/voyages/voyage-signature',
    image: '/images/senegal/WhatsApp Image 2024-01-04 at 14.25.34.jpeg',
    dark: true,
    featured: true,
  },
  {
    mk: '/VOYAGE.03',
    kind: 'ENTREPRENEUR · PROJET',
    title: 'Back to Senegal',
    duration: '7 jours',
    price: 'Dès 1 795 €',
    priceSub: 'EARLY-BIRD · ~1,18M FCFA',
    tagline: "Passer de l'idée au projet concret.",
    desc: "Une semaine conçue pour ceux qui veulent entreprendre ou investir au Sénégal. Rencontres institutionnelles, visites terrain, network.",
    href: '/voyages/back-to-senegal',
    image: '/images/senegal/WhatsApp Image 2024-01-04 at 14.21.31.jpeg',
    dark: false,
  },
]

const PROOFS = [
  { mk: '[ 01 ]', n: '10+', l: 'ans de terrain' },
  { mk: '[ 02 ]', n: '24K+', l: 'voyageurs dans la communauté' },
  { mk: '[ 03 ]', n: '100%', l: 'départs accompagnés par Roseline' },
  { mk: '[ 04 ]', n: '4★', l: 'hébergements minimum garantis' },
]

const POURQUOI = [
  {
    mk: '/RAISON.01',
    title: '10 ans de terrain',
    desc: "Plus de 10 ans à organiser des voyages au Sénégal. Chaque partenaire, chaque hébergement, chaque guide a été testé personnellement.",
  },
  {
    mk: '/RAISON.02',
    title: 'Roseline sur chaque départ',
    desc: "Ce n'est pas un catalogue. C'est une expérience humaine. Roseline accompagne chaque groupe, du premier jour au dernier.",
  },
  {
    mk: '/RAISON.03',
    title: 'Partenariats institutionnels',
    desc: 'APIX, DER/FJ, FAISE, MONCAP Diaspora : des partenaires officiels pour des voyages qui ont du poids et de la crédibilité.',
  },
  {
    mk: '/RAISON.04',
    title: 'Communauté 24 000+',
    desc: "Rejoignez une communauté active de voyageurs qui partagent leurs expériences, leurs conseils et leurs coups de cœur.",
  },
]

const PROCESS = [
  {
    n: '/01',
    title: 'Premier contact',
    duration: 'T+0 · GRATUIT',
    desc: 'WhatsApp, visio ou formulaire. On parle de votre projet, vos attentes, vos dates.',
  },
  {
    n: '/02',
    title: 'Proposition détaillée',
    duration: 'T+3J · PDF PERSONNALISÉ',
    desc: 'Vous recevez un programme jour par jour, hébergements, activités, tarifs clairs.',
  },
  {
    n: '/03',
    title: 'Réservation & acompte',
    duration: 'ACOMPTE.30% · PLACE.CONFIRMÉE',
    desc: "Acompte de 30% pour confirmer votre place. Solde dû 30 jours avant le départ.",
  },
  {
    n: '/04',
    title: 'Briefing départ',
    duration: 'J-15 · MÉMO.VOYAGEUR',
    desc: 'Mémo complet : bagages, météo, santé, culture, conseils pratiques, contacts utiles.',
  },
  {
    n: '/05',
    title: 'Le voyage',
    duration: 'ROSELINE.PRÉSENTE · 24/7',
    desc: "Roseline vous accompagne du début à la fin. Support WhatsApp continu, zéro stress.",
  },
]

const FAQ = [
  {
    q: 'Faut-il un visa pour le Sénégal ?',
    a: "Pour les ressortissants français, aucun visa n'est nécessaire pour un séjour de moins de 90 jours. Un passeport valide 6 mois après la date de retour suffit. Nous vous envoyons un mémo complet à la réservation.",
  },
  {
    q: 'Les vols sont-ils inclus dans le prix ?',
    a: 'Non, les vols internationaux ne sont pas inclus. Cela vous permet de choisir votre compagnie, vos dates exactes et vos options de confort. Nous vous conseillons sur les meilleurs vols.',
  },
  {
    q: 'Les voyages sont-ils adaptés aux enfants ?',
    a: 'Oui. Le voyage Retour aux Sources est spécialement conçu pour les familles. Les activités sont pensées pour tous les âges, et des tarifs réduits s\'appliquent pour les enfants.',
  },
  {
    q: 'Quel est le niveau de confort ?',
    a: 'Nous sélectionnons des hébergements de qualité : hôtels 3 à 4 étoiles, lodges de charme, résidences privées. Immersion ne veut pas dire inconfort.',
  },
  {
    q: 'Comment réserver ?',
    a: 'Contactez Roseline par WhatsApp ou via le formulaire de la page du voyage qui vous intéresse. Un acompte de 30% confirme votre place. Le solde est dû 30 jours avant le départ.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details
      style={{
        borderBottom: '1px solid rgba(86,14,19,0.1)',
        padding: '20px 0',
      }}
    >
      <summary
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          listStyle: 'none',
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 18,
          fontWeight: 600,
          color: BRAND,
        }}
      >
        <span>{q}</span>
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 18,
            color: GOLD,
            marginLeft: 14,
          }}
        >
          +
        </span>
      </summary>
      <p
        style={{
          marginTop: 14,
          fontSize: 14,
          lineHeight: 1.65,
          color: 'rgba(10,10,10,0.7)',
        }}
      >
        {a}
      </p>
    </details>
  )
}

export default function VoyagesPage() {
  return (
    <div style={{ backgroundColor: CREAM }}>
      <Nav />

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/senegal/hero.jpg"
            alt="Sénégal — voyages TripAfro"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(86,14,19,0.55) 0%, rgba(86,14,19,0.75) 60%, rgba(10,10,10,0.85) 100%)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 960,
            margin: '0 auto',
            padding: '8rem 20px 5rem',
            textAlign: 'center',
            color: CREAM,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 14px',
              borderRadius: 999,
              border: `1px solid rgba(246,201,97,0.3)`,
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: GOLD,
                boxShadow: `0 0 8px ${GOLD}`,
                animation: 'voy-pulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: GOLD,
              }}
            >
              / VOYAGES — SÉNÉGAL & AFRIQUE DE L&apos;OUEST
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              marginBottom: 22,
            }}
          >
            Le Sénégal
            <br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>
              qu&apos;on ne vous a jamais raconté.
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              opacity: 0.85,
              maxWidth: 640,
              margin: '0 auto 36px',
            }}
          >
            Voyages immersifs pour la diaspora, les voyageurs curieux,
            et ceux qui veulent entreprendre en Afrique de l&apos;Ouest.
            Accompagnés personnellement par Roseline.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 50 }}>
            <a
              href="#voyages"
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
              Découvrir les 3 voyages →
            </a>
            <a
              href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20voyages."
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

          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {PROOFS.map((p) => (
              <div key={p.mk} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    color: GOLD,
                    opacity: 0.7,
                    marginBottom: 6,
                  }}
                >
                  {p.mk}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 34,
                    fontWeight: 600,
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  {p.n}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(254,252,249,0.7)', marginTop: 4 }}>{p.l}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes voy-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="voy-pulse"] { animation: none !important; }
          }
        `}</style>
      </section>

      {/* 3 VOYAGES */}
      <section id="voyages" style={{ padding: '80px 20px', backgroundColor: CREAM, position: 'relative' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(86,14,19,0.05) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
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
              ◆ TROIS.VOYAGES
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
              Trois façons de vivre le Sénégal.
              <br />
              <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Laquelle est la vôtre ?</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {VOYAGES.map((v) => (
              <Link
                key={v.mk}
                href={v.href}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: v.dark
                    ? 'linear-gradient(135deg, #560E13 0%, #3d090e 100%)'
                    : '#fff',
                  border: v.dark
                    ? '1px solid rgba(246,201,97,0.2)'
                    : '1px solid rgba(86,14,19,0.1)',
                  borderRadius: 6,
                  overflow: 'hidden',
                  color: v.dark ? CREAM : BRAND,
                  position: 'relative',
                  transition: 'transform .3s, box-shadow .3s',
                }}
              >
                {v.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '5px 10px',
                      background: GOLD,
                      color: BRAND,
                      borderRadius: 2,
                      zIndex: 2,
                    }}
                  >
                    Le + demandé
                  </div>
                )}
                <div
                  style={{
                    position: 'relative',
                    height: 200,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 14,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '5px 10px',
                      background: 'rgba(255,255,255,0.9)',
                      color: BRAND,
                      borderRadius: 2,
                    }}
                  >
                    {v.kind}
                  </div>
                </div>

                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: 9,
                        letterSpacing: '0.3em',
                        color: v.dark ? GOLD : BRAND,
                        opacity: 0.7,
                      }}
                    >
                      {v.mk}
                    </span>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: 10,
                        letterSpacing: '0.15em',
                        color: v.dark ? GOLD : '#b8860b',
                      }}
                    >
                      {v.duration.toUpperCase()}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 26,
                      fontWeight: 600,
                      marginBottom: 10,
                      lineHeight: 1.15,
                      color: v.dark ? CREAM : BRAND,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                      marginBottom: 12,
                      color: v.dark ? GOLD : '#b8860b',
                    }}
                  >
                    &laquo; {v.tagline} &raquo;
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginBottom: 20,
                      color: v.dark ? 'rgba(254,252,249,0.75)' : 'rgba(10,10,10,0.7)',
                      flex: 1,
                    }}
                  >
                    {v.desc}
                  </p>

                  <div
                    style={{
                      paddingTop: 16,
                      borderTop: v.dark
                        ? '1px solid rgba(246,201,97,0.2)'
                        : '1px solid rgba(86,14,19,0.08)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-cormorant), serif',
                            fontSize: 22,
                            fontWeight: 700,
                            color: v.dark ? GOLD : BRAND,
                            lineHeight: 1.1,
                          }}
                        >
                          {v.price}
                        </div>
                        <div
                          style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                            fontSize: 9,
                            letterSpacing: '0.15em',
                            color: v.dark ? 'rgba(246,201,97,0.6)' : 'rgba(86,14,19,0.55)',
                            marginTop: 4,
                          }}
                        >
                          {v.priceSub}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: v.dark ? GOLD : BRAND,
                        }}
                      >
                        Découvrir →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section style={{ padding: '80px 20px', backgroundColor: BG }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
              ◆ POURQUOI.TRIPAFRO
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
              On ne vend pas un catalogue.
              <br />
              <em style={{ fontStyle: 'italic', color: '#b8860b' }}>On vit le Sénégal.</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {POURQUOI.map((p) => (
              <div
                key={p.mk}
                style={{
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(86,14,19,0.08)',
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    color: BRAND,
                    opacity: 0.7,
                    marginBottom: 16,
                  }}
                >
                  {p.mk}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 20,
                    fontWeight: 600,
                    color: BRAND,
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(10,10,10,0.7)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
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
              ◆ PROCESSUS.RÉSERVATION
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
              Cinq étapes.
              <br />
              <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Zéro surprise.</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 18,
            }}
          >
            {PROCESS.map((p) => (
              <div
                key={p.n}
                style={{
                  padding: '24px 20px',
                  background: BG,
                  border: '1px solid rgba(86,14,19,0.08)',
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 8,
                    background: '#0A0A0A',
                    color: GOLD,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 14,
                    border: '1px solid rgba(246,201,97,0.3)',
                  }}
                >
                  {p.n}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 18,
                    fontWeight: 600,
                    color: BRAND,
                    marginBottom: 8,
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'rgba(10,10,10,0.65)', marginBottom: 12 }}>
                  {p.desc}
                </p>
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    color: BRAND,
                    opacity: 0.55,
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

      {/* FAQ */}
      <section style={{ padding: '80px 20px', backgroundColor: BG }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
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
              ◆ QUESTIONS.FRÉQUENTES
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                color: BRAND,
                fontWeight: 500,
              }}
            >
              Ce qu&apos;on vous dit rarement.
            </h2>
          </div>
          {FAQ.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
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
                animation: 'voy-pulse 2s ease-in-out infinite',
              }}
            />
            / DÉPARTS.OUVERTS — GROUPES LIMITÉS
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
            Prêt à vivre le Sénégal autrement ?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.8, maxWidth: 560, margin: '0 auto 32px' }}>
            Parlez directement à Roseline. Elle répond personnellement à chaque message.
            Pas de standard, pas de formulaire automatique.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20voyages."
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
              Parler à Roseline →
            </a>
            <a
              href="https://calendly.com/roselinengom"
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
              Réserver visio 15 min
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
