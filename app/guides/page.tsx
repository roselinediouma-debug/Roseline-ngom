import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Guides Signatures Sénégal, bientôt disponibles',
  description:
    "Les Guides Signatures de Roseline Ngom arrivent. Inscrivez-vous pour être prévenu·e dès la sortie des guides Casamance et Sénégal.",
  path: '/guides',
})

const BORDEAUX = '#560E13'
const OR = '#F6C961'
const IVOIRE = '#FEFCF9'
const CREME = '#F8F5F0'
const NOIR = '#0A0A0A'

export default function GuidesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: IVOIRE }}>
        {/* HERO - Coming Soon */}
        <section
          className="px-5 pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden"
          style={{ backgroundColor: IVOIRE }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div
              className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-[0.25em] mb-8"
              style={{ backgroundColor: CREME, color: BORDEAUX, border: `1px solid ${OR}` }}
            >
              BIENTÔT DISPONIBLE
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-7"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: NOIR,
                fontWeight: 500,
              }}
            >
              Les Guides Signatures{' '}
              <em style={{ fontStyle: 'italic', color: BORDEAUX }}>arrivent.</em>
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: 'rgba(10,10,10,0.7)' }}
            >
              Deux guides PDF pour organiser ton voyage au Sénégal toi-même, avec les bonnes adresses,
              les itinéraires testés et le contact d’un guide local partenaire.
              Je finalise leur rédaction.
            </p>

            {/* Mockups stack */}
            <div className="flex justify-center items-center mb-6">
              <div style={{ perspective: '1600px' }} className="relative">
                <div
                  className="absolute"
                  style={{
                    top: 30,
                    left: -30,
                    transform: 'rotateY(-16deg) rotateX(4deg) rotateZ(-6deg)',
                  }}
                >
                  <BookMockup
                    title="Casamance"
                    subtitle="carnet intime"
                    meta="À VENIR"
                    accent={OR}
                    scale={0.7}
                  />
                </div>
                <div
                  style={{
                    transform: 'rotateY(-12deg) rotateX(3deg) rotateZ(4deg)',
                    marginLeft: 60,
                    marginTop: 30,
                  }}
                >
                  <BookMockup
                    title="Sénégal"
                    subtitle="en 7 jours"
                    meta="À VENIR"
                    accent={OR}
                    scale={0.75}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaser contenu */}
        <section className="px-5 py-20 md:py-24" style={{ backgroundColor: CREME }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: OR }}>
                CE QUE CONTIENDRONT LES GUIDES
              </div>
              <h2
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Pensés pour voyager{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>en autonomie.</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Itinéraires 5, 7 et 14 jours',
                  text:
                    'Des circuits testés sur le terrain, avec les durées réelles de trajet et les étapes logiques.',
                },
                {
                  title: 'Hôtels & campements',
                  text:
                    'Une sélection par gamme et par budget, avec tarifs indicatifs en FCFA.',
                },
                {
                  title: 'Transport : avion, bateau, bus',
                  text:
                    'Le comparatif complet pour rejoindre la Casamance depuis Dakar, avec tarifs et durées.',
                },
                {
                  title: 'Guide local partenaire',
                  text:
                    'Le contact direct d’un guide de confiance sur place, rencontré et testé.',
                },
                {
                  title: 'Circuits combinés',
                  text:
                    'Casamance + Sine Saloum pour les voyages longs, pensés pour enchaîner les régions sans perte de temps.',
                },
                {
                  title: 'Conseils pratiques',
                  text:
                    'Codes culturels diolas, santé, argent, connexion, lexique, checklist bagage.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-7"
                  style={{
                    backgroundColor: IVOIRE,
                    border: '1px solid rgba(86,14,19,0.08)',
                  }}
                >
                  <div
                    className="mb-4 flex items-center gap-3"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: OR,
                        lineHeight: 1,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: 'rgba(86,14,19,0.15)',
                      }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: BORDEAUX,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist newsletter */}
        <section className="px-5 py-24 md:py-28" style={{ backgroundColor: BORDEAUX }}>
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="text-xs font-bold tracking-[0.25em] mb-5"
              style={{ color: OR }}
            >
              RESTER INFORMÉ·E
            </div>
            <h2
              className="text-3xl md:text-5xl leading-tight mb-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: IVOIRE,
                fontWeight: 500,
              }}
            >
              Soyez prévenu·e{' '}
              <em style={{ fontStyle: 'italic', color: OR }}>dès la sortie.</em>
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'rgba(254,252,249,0.8)' }}
            >
              Laissez votre email : vous serez les premiers informés lorsque chaque guide sera disponible,
              avec un tarif de lancement réservé à la liste d’attente.
            </p>

            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>

            <p className="text-xs mt-6" style={{ color: 'rgba(254,252,249,0.5)' }}>
              Pas de spam. Désinscription en 1 clic. 2 emails par mois maximum.
            </p>
          </div>
        </section>

        {/* En attendant */}
        <section className="px-5 py-20 md:py-24" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: OR }}>
              EN ATTENDANT
            </div>
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: NOIR,
                fontWeight: 500,
              }}
            >
              Commencez à explorer
            </h2>
            <p className="text-base leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(10,10,10,0.65)' }}>
              Le blog rassemble des guides gratuits et des récits de terrain. Les ressources téléchargeables
              offrent déjà une première mise en bouche du travail éditorial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blog"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: BORDEAUX, color: OR }}
              >
                Voir le blog
              </a>
              <a
                href="/ressources"
                className="px-7 py-3.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                style={{ border: `1px solid ${BORDEAUX}`, color: BORDEAUX }}
              >
                Ressources gratuites
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* --------- 3D book mockup (kept from previous version) --------- */
function BookMockup({
  title,
  subtitle,
  meta,
  accent,
  scale = 1,
}: {
  title: string
  subtitle: string
  meta: string
  accent: string
  scale?: number
}) {
  return (
    <div
      style={{
        width: 280 * scale,
        height: 380 * scale,
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 4,
          left: 6,
          width: '100%',
          height: '100%',
          backgroundColor: '#f2ede6',
          borderRadius: 4,
          transform: 'translateZ(-8px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 2,
          left: 3,
          width: '100%',
          height: '100%',
          backgroundColor: '#f7f2eb',
          borderRadius: 4,
          transform: 'translateZ(-4px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: BORDEAUX,
          borderRadius: 4,
          boxShadow:
            '0 30px 60px rgba(86,14,19,0.35), 0 0 0 1px rgba(0,0,0,0.05) inset',
          overflow: 'hidden',
          padding: 28 * scale,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.12 }}
        >
          <defs>
            <pattern id={`hex-${title}`} x="0" y="0" width="30" height="34" patternUnits="userSpaceOnUse">
              <polygon
                points="15,2 28,10 28,24 15,32 2,24 2,10"
                fill="none"
                stroke={accent}
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hex-${title})`} />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 6,
            height: '100%',
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.05))',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: 10 * scale,
              fontWeight: 700,
              letterSpacing: 3,
              color: accent,
              marginBottom: 6,
            }}
          >
            ROSELINE NGOM
          </div>
          <div
            style={{
              width: 30 * scale,
              height: 2,
              backgroundColor: accent,
            }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
          <div
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: 54 * scale,
              lineHeight: 0.95,
              color: IVOIRE,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: 22 * scale,
              color: accent,
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              fontSize: 9 * scale,
              letterSpacing: 2,
              color: 'rgba(254,252,249,0.6)',
              fontWeight: 600,
            }}
          >
            {meta.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}
