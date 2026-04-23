import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import PostsClient from './PostsClient'

export const metadata = buildMetadata({
  title: 'Générateur de posts IA pour hôtels — SEO local Sénégal',
  description:
    "Génère en 15 secondes un post Google Business Profile, Instagram et LinkedIn optimisés SEO local pour ton hôtel. Mots-clés géographiques, hashtags ciblés, CTA. 100 % gratuit, propulsé par une IA générative de pointe.",
  path: '/outils/generer-posts',
})

const BRAND = '#560E13'
const GOLD = '#F6C961'
const BG = '#F8F5F0'
const GBP_BLUE = '#1a73e8'
const IG_PINK = '#E4405F'
const LI_BLUE = '#0A66C2'

const BEFORE_AFTER = [
  {
    label: 'AVANT (post classique hôtelier)',
    content:
      "Venez découvrir notre magnifique hôtel au cœur de Dakar ! Réservez dès maintenant pour profiter de nos chambres confortables et de notre cuisine délicieuse. Nous vous attendons nombreux 😊",
    problems: [
      'Aucun mot-clé SEO local',
      'Superlatifs creux ("magnifique", "délicieuse")',
      'Aucun hashtag, aucune structure',
      'CTA faible',
    ],
  },
  {
    label: 'APRÈS (post IA SEO-first)',
    content:
      "Un petit-déjeuner au lit avec vue sur Dakar, ça vous dit ? 💕\n\nNous venons de lancer notre package week-end romantique : 65 000 FCFA pour deux, petit-déjeuner en chambre, bouteille de vin, check-out à 14h.\n\nDisponible mai-juin (hors jours fériés). Parfait pour une escapade amoureuse dans un cadre authentiquement dakarois. 🌹",
    wins: [
      '"séjour romantique Dakar" → SEO local',
      'Hook en 1ère ligne, storytelling',
      '15 hashtags mix local / niche / large',
      'Détails concrets, pas de blabla',
    ],
  },
]

const USE_CASES = [
  {
    icon: '🏨',
    title: 'Hôtel 15-30 chambres',
    desc: 'Publie 1 post GBP + 1 Instagram par semaine. En 3 mois, ton hôtel remonte sur «\u00a0hôtel [ta ville]\u00a0» face aux chaînes.',
  },
  {
    icon: '🏝️',
    title: 'Lodge en région',
    desc: 'Capitalise sur ton coin méconnu. Les requêtes «\u00a0que faire [ville]\u00a0» te ramènent une clientèle qualifiée.',
  },
  {
    icon: '🍽️',
    title: 'Hôtel-restaurant',
    desc: 'Un post par nouveau plat signature = signal de fraîcheur pour Google + engagement social + attraction clientèle locale.',
  },
]

const SEO_BULLETS = [
  {
    icon: '📍',
    title: 'Post Google Business Profile',
    desc: "Indexé par Google. Chaque post renforce ton référencement local sur «\u00a0hôtel [ta ville]\u00a0». C'est le post le plus important, et personne ne le publie.",
  },
  {
    icon: '#',
    title: 'Hashtags structurés',
    desc: "15 hashtags répartis : 3-4 hyper-locaux + 5-6 niche tourisme + 4-5 plus larges. Pas de spam, un vrai ciblage.",
  },
  {
    icon: '🌍',
    title: 'Mots-clés géographiques naturels',
    desc: "L'IA place les variantes (hôtel, séjour, hébergement, week-end + ta ville) sans bourrer. Google adore, tes lecteurs aussi.",
  },
  {
    icon: '🎯',
    title: '3 formats en une génération',
    desc: "Google Business + Instagram/Facebook + LinkedIn (pro / MICE). Copie-colle, publie, laisse le SEO travailler.",
  },
]

export default function GenererPostsPage() {
  return (
    <>
      <Nav variant="solid" />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Outils', path: '/outils' },
          { name: 'Générateur de posts IA', path: '/outils/generer-posts' },
        ])}
      />

      <main style={{ backgroundColor: '#FEFCF9' }}>
        {/* HERO */}
        <section
          style={{
            paddingTop: '7rem',
            paddingBottom: '3rem',
            background: `linear-gradient(180deg, #FEFCF9 0%, ${BG} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '5%',
              right: '-12%',
              width: 420,
              height: 420,
              background: `radial-gradient(circle, rgba(246,201,97,0.22) 0%, transparent 70%)`,
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-10%',
              width: 360,
              height: 360,
              background: `radial-gradient(circle, rgba(86,14,19,0.1) 0%, transparent 70%)`,
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <div className="max-w-6xl mx-auto px-5 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Colonne texte */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{
                    border: `1px solid rgba(86, 14, 19, 0.15)`,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#15803D',
                      animation: 'posts-pulse 2s ease-in-out infinite',
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: BRAND, letterSpacing: '0.04em' }}
                  >
                    SEO local first · IA générative
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    color: BRAND,
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                    lineHeight: 1.1,
                    marginBottom: '1.25rem',
                    fontWeight: 500,
                  }}
                >
                  Des posts qui ramènent
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
                    des clients depuis Google
                  </span>
                </h1>

                <p className="text-lg opacity-80 leading-relaxed mb-6">
                  Remplis 4 infos sur ton hôtel. En 15 secondes, l&apos;IA te livre
                  3 posts prêts à copier-coller : <strong>Google Business Profile</strong> (le plus
                  important pour ton SEO local), Instagram/Facebook et LinkedIn.
                </p>

                <div className="flex flex-wrap gap-3 items-center text-sm">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#fff', border: `1px solid rgba(86,14,19,0.1)` }}
                  >
                    <span style={{ color: '#15803D' }}>✓</span>
                    <span style={{ color: BRAND }}>100 % gratuit</span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#fff', border: `1px solid rgba(86,14,19,0.1)` }}
                  >
                    <span style={{ color: '#15803D' }}>✓</span>
                    <span style={{ color: BRAND }}>Sans compte</span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#fff', border: `1px solid rgba(86,14,19,0.1)` }}
                  >
                    <span style={{ color: '#15803D' }}>✓</span>
                    <span style={{ color: BRAND }}>~15 secondes</span>
                  </div>
                </div>
              </div>

              {/* Colonne mockup 3 posts empilés */}
              <div className="relative" style={{ minHeight: 420 }}>
                {/* Carte GBP */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '88%',
                    backgroundColor: '#fff',
                    borderRadius: '0.75rem',
                    borderLeft: `4px solid ${GBP_BLUE}`,
                    padding: '1rem',
                    boxShadow: '0 8px 24px rgba(86,14,19,0.08)',
                    transform: 'rotate(-1.5deg)',
                    zIndex: 3,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium mb-2" style={{ color: GBP_BLUE }}>
                    <span>📍</span> Google Business Profile
                  </div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', color: BRAND, fontSize: '1rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Week-end romantique à Dakar — 65 000 FCFA
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
                    Évadez-vous en amoureux dans notre hôtel au cœur de Dakar. Package petit-déjeuner en chambre, bouteille de vin, check-out tardif…
                  </p>
                  <div className="inline-block mt-2 px-2 py-1 rounded-full text-[10px] font-medium" style={{ backgroundColor: BRAND, color: GOLD }}>
                    Réserver
                  </div>
                </div>

                {/* Carte Instagram */}
                <div
                  style={{
                    position: 'absolute',
                    top: 140,
                    left: 0,
                    width: '82%',
                    backgroundColor: '#fff',
                    borderRadius: '0.75rem',
                    borderLeft: `4px solid ${IG_PINK}`,
                    padding: '1rem',
                    boxShadow: '0 8px 24px rgba(86,14,19,0.08)',
                    transform: 'rotate(1.5deg)',
                    zIndex: 2,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium mb-2" style={{ color: IG_PINK }}>
                    <span>📸</span> Instagram / Facebook
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: '#2d2d2d' }}>
                    Un petit-déjeuner au lit avec vue sur Dakar, ça vous dit&nbsp;? 💕 On vient de lancer notre package week-end romantique…
                  </p>
                  <div className="text-[10px]" style={{ color: BRAND, opacity: 0.7 }}>
                    #dakar #hoteldakar #senegal #weekendromantique #teranga +11
                  </div>
                </div>

                {/* Carte LinkedIn */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 20,
                    width: '80%',
                    backgroundColor: '#fff',
                    borderRadius: '0.75rem',
                    borderLeft: `4px solid ${LI_BLUE}`,
                    padding: '1rem',
                    boxShadow: '0 8px 24px rgba(86,14,19,0.08)',
                    transform: 'rotate(-1deg)',
                    zIndex: 1,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium mb-2" style={{ color: LI_BLUE }}>
                    <span>💼</span> LinkedIn
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
                    Comment segmenter sa clientèle dans l&apos;hôtellerie africaine&nbsp;? Notre approche au Djoloff…
                  </p>
                  <div className="text-[10px] mt-2" style={{ color: BRAND, opacity: 0.7 }}>
                    #TourismeSénégal #HôtellerieAfrique
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes posts-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(0.85); }
            }
          `}</style>
        </section>

        {/* WIZARD */}
        <section className="pb-16 px-5 pt-8">
          <div className="max-w-2xl mx-auto">
            <PostsClient />
          </div>
        </section>

        {/* AVANT / APRÈS */}
        <section className="py-16 px-5" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: BRAND, letterSpacing: '0.15em' }}
              >
                La différence
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: BRAND,
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                }}
              >
                Un post «&nbsp;au feeling&nbsp;» vs un post optimisé SEO
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AVANT */}
              <div
                style={{
                  padding: '1.5rem',
                  border: `1px solid rgba(220, 38, 38, 0.25)`,
                  borderRadius: '1rem',
                  backgroundColor: '#FEF7F7',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: '#991B1B' }}
                >
                  {BEFORE_AFTER[0].label}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    fontStyle: 'italic',
                    color: '#2d2d2d',
                    padding: '0.75rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(220, 38, 38, 0.15)',
                  }}
                >
                  “{BEFORE_AFTER[0].content}”
                </p>
                <ul className="space-y-1.5 text-xs" style={{ color: '#991B1B' }}>
                  {BEFORE_AFTER[0].problems?.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span>✗</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* APRÈS */}
              <div
                style={{
                  padding: '1.5rem',
                  border: `1.5px solid ${BRAND}`,
                  borderRadius: '1rem',
                  backgroundColor: BG,
                  position: 'relative',
                }}
              >
                <div
                  className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: BRAND, color: GOLD }}
                >
                  Généré par IA
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: BRAND }}
                >
                  {BEFORE_AFTER[1].label}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    whiteSpace: 'pre-wrap',
                    color: '#2d2d2d',
                    padding: '0.75rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    border: `1px solid rgba(86, 14, 19, 0.15)`,
                  }}
                >
                  {BEFORE_AFTER[1].content}
                </p>
                <ul className="space-y-1.5 text-xs" style={{ color: BRAND }}>
                  {BEFORE_AFTER[1].wins?.map((w) => (
                    <li key={w} className="flex items-start gap-2">
                      <span style={{ color: '#15803D' }}>✓</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BÉNÉFICES SEO */}
        <section className="py-16 px-5" style={{ backgroundColor: BG }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: BRAND, letterSpacing: '0.15em' }}
              >
                Le vrai levier
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: BRAND,
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  marginBottom: '1rem',
                }}
              >
                Publier, c&apos;est bien. Être trouvé, c&apos;est mieux.
              </h2>
              <p className="max-w-2xl mx-auto opacity-80 text-base leading-relaxed">
                La plupart des hôteliers postent au hasard. Nous, on écrit pour Google
                d&apos;abord, pour tes followers ensuite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SEO_BULLETS.map((b) => (
                <div
                  key={b.title}
                  style={{
                    padding: '1.5rem',
                    border: `1px solid rgba(86, 14, 19, 0.1)`,
                    borderRadius: '1rem',
                    backgroundColor: '#fff',
                    display: 'flex',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.8rem',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        color: BRAND,
                        fontSize: '1.3rem',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-sm opacity-75 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAS D'USAGE */}
        <section className="py-16 px-5" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: BRAND, letterSpacing: '0.15em' }}
              >
                Pour qui
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: BRAND,
                  fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                }}
              >
                Pensé pour l&apos;hôtelier indépendant
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {USE_CASES.map((u) => (
                <div
                  key={u.title}
                  style={{
                    padding: '1.5rem',
                    border: `1px solid rgba(86, 14, 19, 0.1)`,
                    borderRadius: '1rem',
                    backgroundColor: BG,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{u.icon}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      color: BRAND,
                      fontSize: '1.3rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {u.title}
                  </h3>
                  <p className="text-sm opacity-75 leading-relaxed">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CADENCE */}
        <section className="py-16 px-5" style={{ backgroundColor: BG }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-xs font-medium uppercase tracking-widest mb-3"
                style={{ color: BRAND, letterSpacing: '0.15em' }}
              >
                La cadence qui paye
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: BRAND,
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                }}
              >
                1 post GBP par semaine = ranking garanti
              </h2>
            </div>
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '1rem',
                padding: '2rem',
                border: `1px solid rgba(86, 14, 19, 0.08)`,
              }}
            >
              <p className="opacity-80 leading-relaxed mb-4">
                Google Business Profile privilégie les fiches actives. Un hôtel qui publie
                un post GBP par semaine remonte mécaniquement sur «&nbsp;hôtel [ville]&nbsp;»,
                au-dessus de concurrents qui n&apos;ont rien posté depuis 2 ans.
              </p>
              <p className="opacity-80 leading-relaxed mb-4">
                Notre outil te sort 3 formats en une fois. <strong>Tu peux préparer toute
                une semaine de contenu en 10 minutes</strong>, le lundi matin avec ton café.
                Ensuite tu publies à la main, ou tu programmes via Meta Business Suite et
                l&apos;application Google Business.
              </p>
              <p className="text-sm opacity-60 italic">
                — Roseline Ngom, consultante digitale
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
