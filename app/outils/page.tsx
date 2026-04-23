import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: "Outils IA gratuits pour hôteliers et voyageurs — Roseline Ngom",
  description:
    "Audit de présence en ligne, générateur de posts SEO, chatbot voyageurs : 3 outils IA propulsés par modèle de langage, gratuits, sans compte. Testez en 3 minutes.",
  path: '/outils',
})

const BRAND = '#560E13'
const GOLD = '#F6C961'
const BG = '#F8F5F0'
const CREAM = '#FEFCF9'

type Tool = {
  number: string
  href: string
  segment: string
  title: string
  pitch: string
  deliverable: string
  duration: string
  cta: string
  featured?: boolean
}

const LIVE_TOOLS: Tool[] = [
  {
    number: '01',
    href: '/outils/audit-presence-en-ligne',
    segment: 'Hôteliers',
    title: 'Audit IA de présence en ligne',
    pitch:
      "Site web, fiche Google, avis, réseaux sociaux : un diagnostic complet de ce qui te fait perdre des réservations.",
    deliverable: 'Score /100 + 3 faiblesses priorisées + plan d’action 90 jours',
    duration: '3 minutes',
    cta: 'Auditer mon hôtel',
    featured: true,
  },
  {
    number: '02',
    href: '/outils/generer-posts',
    segment: 'SEO local',
    title: 'Générateur de posts IA',
    pitch:
      "3 posts prêts à publier — Google Business Profile indexé par Google, Instagram/Facebook, LinkedIn — optimisés pour ton SEO local.",
    deliverable: 'Titre, corps, hashtags, mots-clés locaux, 1er commentaire',
    duration: '15 secondes',
    cta: 'Générer mes posts',
  },
  {
    number: '03',
    href: '#chatbot',
    segment: 'Voyageurs 24/7',
    title: 'Assistant TripAfro — chatbot IA',
    pitch:
      "Un agent IA entraîné sur le Sénégal, la diaspora, les visas, les prix. Il qualifie les prospects et redirige vers Calendly ou WhatsApp.",
    deliverable: 'Réponses 24/7, détection d’intention, handoff humain',
    duration: 'Toujours actif',
    cta: '↘ Essayez en bas à droite',
  },
]

const ROADMAP = [
  {
    title: 'Générateur de réponses aux avis',
    desc: 'Colle un avis TripAdvisor ou Booking, reçois une réponse empathique et professionnelle. Pour les lundis matin.',
    eta: 'Q2 2026',
  },
  {
    title: 'Simulateur ROI site web hôtelier',
    desc: 'Combien rapporte un vrai site de réservation vs ta situation actuelle. Calculs transparents, pas de magie.',
    eta: 'Q2 2026',
  },
  {
    title: 'Audit flash Google Business',
    desc: 'Scan ultra-rapide de ta fiche Google : photos, catégories, attributs, complétude. Checklist actionnable.',
    eta: 'Q3 2026',
  },
]

export default function OutilsHubPage() {
  return (
    <>
      <Nav variant="solid" />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Outils', path: '/outils' },
        ])}
      />

      <main style={{ backgroundColor: CREAM }}>
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
          {/* Glow doré */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '15%',
              right: '-10%',
              width: 500,
              height: 500,
              background: `radial-gradient(circle, rgba(246,201,97,0.15) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-5%',
              left: '-10%',
              width: 400,
              height: 400,
              background: `radial-gradient(circle, rgba(86,14,19,0.08) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="max-w-5xl mx-auto px-5"
            style={{ position: 'relative', zIndex: 1 }}
          >
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
                }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: BRAND, letterSpacing: '0.04em' }}
              >
                3 outils en production · Gratuits · Sans compte
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                color: BRAND,
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                lineHeight: 1.05,
                fontWeight: 500,
                marginBottom: '1.5rem',
                maxWidth: 900,
              }}
            >
              Des outils IA qui te donnent
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
                de vraies réponses business
              </span>
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ maxWidth: 680, opacity: 0.8 }}
            >
              Pas des gadgets. Des démonstrations live de ce que Roseline Ngom peut installer
              chez toi : audit automatique, génération de contenu SEO, chatbot qualifié. Tu
              testes ici, tu commandes quand tu es convaincu.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 items-center">
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '2.2rem',
                    color: BRAND,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  3 min
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: BRAND, opacity: 0.7, letterSpacing: '0.12em' }}
                >
                  Pour un audit complet
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: 'rgba(86,14,19,0.15)',
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '2.2rem',
                    color: BRAND,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  15 s
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: BRAND, opacity: 0.7, letterSpacing: '0.12em' }}
                >
                  Pour 3 posts optimisés SEO
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: 'rgba(86,14,19,0.15)',
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '2.2rem',
                    color: BRAND,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  24/7
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: BRAND, opacity: 0.7, letterSpacing: '0.12em' }}
                >
                  Réponses chatbot voyageurs
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTILS LIVE */}
        <section className="py-20 px-5" style={{ backgroundColor: CREAM }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-2"
                  style={{ color: BRAND, letterSpacing: '0.15em' }}
                >
                  En ligne · Testables maintenant
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: BRAND,
                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  3 outils, 3 usages concrets
                </h2>
              </div>
              <p
                className="text-sm"
                style={{ color: BRAND, opacity: 0.65, maxWidth: 320 }}
              >
                Chaque outil répond à un problème mesurable. Zéro démo qui ne sert à rien.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {LIVE_TOOLS.map((tool) => {
                const isExternal = !tool.href.startsWith('/')
                const isChatbot = tool.href === '#chatbot'
                const CardWrap = ({ children }: { children: React.ReactNode }) =>
                  isExternal ? (
                    <div>{children}</div>
                  ) : (
                    <Link
                      href={tool.href}
                      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                      {children}
                    </Link>
                  )

                const bg = isChatbot
                  ? `linear-gradient(135deg, ${BRAND} 0%, #3d090e 100%)`
                  : '#fff'
                const textColor = isChatbot ? CREAM : BRAND
                const subColor = isChatbot ? 'rgba(254,252,249,0.75)' : BRAND
                const border = isChatbot
                  ? '1px solid rgba(246,201,97,0.2)'
                  : '1px solid rgba(86,14,19,0.1)'

                return (
                  <CardWrap key={tool.number}>
                    <article
                      style={{
                        padding: '2rem',
                        background: bg,
                        border,
                        borderRadius: 8,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform .3s ease, box-shadow .3s ease',
                        boxShadow: tool.featured
                          ? '0 10px 40px rgba(86, 14, 19, 0.08)'
                          : '0 2px 12px rgba(86, 14, 19, 0.04)',
                      }}
                    >
                      {/* Header : numéro + segment */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          marginBottom: 24,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-cormorant), serif',
                            fontSize: 32,
                            fontWeight: 600,
                            color: GOLD,
                            lineHeight: 1,
                          }}
                        >
                          {tool.number}
                        </span>
                        <span
                          style={{
                            flex: 1,
                            height: 1,
                            background: isChatbot
                              ? 'rgba(246,201,97,0.25)'
                              : 'rgba(86,14,19,0.15)',
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            padding: '5px 10px',
                            background: isChatbot ? GOLD : BRAND,
                            color: isChatbot ? BRAND : GOLD,
                            borderRadius: 2,
                          }}
                        >
                          {tool.segment}
                        </span>
                      </div>

                      {/* Titre */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: '1.7rem',
                          color: textColor,
                          fontWeight: 500,
                          lineHeight: 1.15,
                          marginBottom: 12,
                          margin: 0,
                        }}
                      >
                        {tool.title}
                      </h3>

                      {/* Pitch */}
                      <p
                        style={{
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          color: subColor,
                          opacity: isChatbot ? 1 : 0.8,
                          margin: '12px 0 20px',
                        }}
                      >
                        {tool.pitch}
                      </p>

                      {/* Livrable */}
                      <div
                        style={{
                          padding: '12px 14px',
                          background: isChatbot
                            ? 'rgba(254,252,249,0.08)'
                            : 'rgba(86,14,19,0.04)',
                          borderLeft: `2px solid ${GOLD}`,
                          borderRadius: 2,
                          marginBottom: 20,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 11,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: subColor,
                            opacity: 0.6,
                            margin: 0,
                            marginBottom: 4,
                          }}
                        >
                          Ce que tu obtiens
                        </p>
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: textColor,
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {tool.deliverable}
                        </p>
                      </div>

                      {/* Footer : durée + CTA */}
                      <div
                        style={{
                          marginTop: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: 16,
                          borderTop: isChatbot
                            ? '1px solid rgba(246,201,97,0.15)'
                            : '1px solid rgba(86,14,19,0.08)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: subColor,
                            opacity: 0.55,
                          }}
                        >
                          {tool.duration}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: isChatbot ? GOLD : BRAND,
                          }}
                        >
                          {tool.cta} {!isChatbot && '→'}
                        </span>
                      </div>
                    </article>
                  </CardWrap>
                )
              })}
            </div>
          </div>
        </section>

        {/* POURQUOI — ligne éditoriale */}
        <section
          className="py-20 px-5"
          style={{ backgroundColor: BG }}
        >
          <div className="max-w-5xl mx-auto">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: 60,
                alignItems: 'center',
              }}
              className="outils-two-col"
            >
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: BRAND, letterSpacing: '0.15em' }}
                >
                  Ligne éditoriale
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    color: BRAND,
                    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                    lineHeight: 1.15,
                    fontWeight: 500,
                    marginBottom: '1.25rem',
                  }}
                >
                  Un outil n’est pas un gadget.
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: BRAND,
                    opacity: 0.85,
                  }}
                >
                  Soit il te fait gagner un client, soit il te fait gagner du temps, soit il
                  prouve ce que je peux installer chez toi. Sinon, je ne le construis pas.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 16,
                }}
              >
                {[
                  {
                    n: '→',
                    t: 'Machine à leads qualifiés',
                    d: 'L’outil capture un email + un segment. Tu reçois le lead dans ta boîte Brevo, pas une notification anonyme.',
                  },
                  {
                    n: '→',
                    t: 'Arme de démo en rendez-vous',
                    d: 'Tu montres l’outil à ton prospect. Il comprend en 30 secondes ce qu’il peut installer. Zéro slide PowerPoint.',
                  },
                  {
                    n: '→',
                    t: 'Rien qui cannibalise le consulting',
                    d: 'L’outil donne un diagnostic. Il ne remplace pas la stratégie. Il la rend visible.',
                  },
                ].map((item) => (
                  <div
                    key={item.t}
                    style={{
                      display: 'flex',
                      gap: 16,
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(86,14,19,0.1)',
                    }}
                  >
                    <span
                      style={{
                        color: GOLD,
                        fontWeight: 600,
                        fontSize: '1.4rem',
                        lineHeight: 1,
                        fontFamily: 'var(--font-cormorant), serif',
                      }}
                    >
                      {item.n}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: BRAND,
                          margin: 0,
                          marginBottom: 4,
                        }}
                      >
                        {item.t}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: BRAND,
                          opacity: 0.75,
                          margin: 0,
                          lineHeight: 1.55,
                        }}
                      >
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .outils-two-col {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
            }
          `}</style>
        </section>

        {/* ROADMAP */}
        <section className="py-20 px-5" style={{ backgroundColor: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-2"
                  style={{ color: BRAND, letterSpacing: '0.15em' }}
                >
                  Roadmap publique
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    color: BRAND,
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  3 outils en préparation
                </h2>
              </div>
              <p
                className="text-sm"
                style={{ color: BRAND, opacity: 0.65, maxWidth: 320 }}
              >
                Déployés selon les retours terrain des hôteliers en rendez-vous.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              {ROADMAP.map((r) => (
                <article
                  key={r.title}
                  style={{
                    padding: '1.5rem',
                    background: 'transparent',
                    border: '1px dashed rgba(86,14,19,0.25)',
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        padding: '4px 9px',
                        background: 'rgba(86,14,19,0.06)',
                        color: BRAND,
                        borderRadius: 2,
                      }}
                    >
                      {r.eta}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '1.3rem',
                      color: BRAND,
                      fontWeight: 500,
                      marginBottom: 8,
                      margin: 0,
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: BRAND,
                      opacity: 0.7,
                      margin: '8px 0 0',
                    }}
                  >
                    {r.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA CONSULTING */}
        <section
          className="py-24 px-5"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, #3d090e 100%)`,
            color: CREAM,
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: GOLD, letterSpacing: '0.2em' }}
            >
              Et après ?
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 500,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              Tout ce que tu testes ici,{' '}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>
                je peux l’installer chez toi
              </em>
              .
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                opacity: 0.85,
                maxWidth: 620,
                margin: '0 auto 2rem',
              }}
            >
              Audit, génération de contenu, chatbot : ces outils sont des démonstrations
              live. Si tu veux la version privée pour ton hôtel, ton lodge ou ton agence,
              on en parle en 30 minutes — gratuit, sans engagement.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="https://calendly.com/roselinengom"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  background: GOLD,
                  color: BRAND,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: 3,
                  textDecoration: 'none',
                }}
              >
                Réserver un audit flash →
              </a>
              <Link
                href="/digital-ia"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  background: 'transparent',
                  color: CREAM,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: 3,
                  textDecoration: 'none',
                  border: `1.5px solid rgba(254,252,249,0.3)`,
                }}
              >
                Voir les offres digital
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
