import { buildMetadata } from '@/lib/seo/metadata'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const BRAND = '#560E13'
const GOLD = '#F6C961'
const CREAM = '#FEFCF9'
const BG = '#F8F5F0'
const INK = '#0A0A0A'

export const metadata = buildMetadata({
  title: 'Le Sénégal en 7 jours, le guide éditorial de Roseline Ngom',
  description:
    "Le carnet de route premium pour passer 7 jours au Sénégal sans tomber dans les pièges des premiers voyageurs. Itinéraire optimisé, contacts testés, 3 budgets. 29 €.",
  path: '/guides/guide-senegal-7jours',
})

const PROBLEMES = [
  {
    mk: '/PIÈGE.01',
    title: 'Trop de kilomètres',
    desc: "Vous tentez de tout voir et finissez épuisés dans la voiture. Le Sénégal ne se traverse pas. Il se savoure.",
  },
  {
    mk: '/PIÈGE.02',
    title: 'Les mauvais contacts',
    desc: "Chauffeur trop cher, hôtel mal situé, guide qui récite Wikipédia. Une seule recommandation foireuse plombe toute la semaine.",
  },
  {
    mk: '/PIÈGE.03',
    title: 'Le budget qui explose',
    desc: "Vous ne savez pas ce qui se négocie, ce qui ne se négocie pas, ni à quel prix. Vous payez systématiquement 30 à 50 % trop cher.",
  },
  {
    mk: '/PIÈGE.04',
    title: 'Le timing raté',
    desc: "Vous arrivez au mauvais moment. Marché fermé. Marée basse. Trafic Dakar à 17 h. Chaque erreur coûte une demi-journée perdue.",
  },
]

const THEMATIQUES = [
  {
    mk: '/CH.01',
    pages: '12 pages',
    title: 'Le rythme',
    desc: "L'art de combiner ville, océan, brousse et îles en 7 jours sans courir. Les transitions optimisées, les jours-respiration, les moments forts à ne pas rater.",
  },
  {
    mk: '/CH.02',
    pages: '14 pages',
    title: "L'argent",
    desc: "3 budgets détaillés (économique, confort, premium). Ce qui se négocie, ce qui ne se négocie pas. Les vrais prix locaux, les arnaques à éviter, le pourboire qui passe.",
  },
  {
    mk: '/CH.03',
    pages: '11 pages',
    title: 'Les rencontres',
    desc: "Mes contacts directs : chauffeurs testés, guides culturels, artisans, restaurateurs. Noms, WhatsApp, tarifs négociés à mon nom. La différence entre touriste et invité.",
  },
  {
    mk: '/CH.04',
    pages: '9 pages',
    title: 'Les pièges',
    desc: "10 erreurs classiques des primo-voyageurs. Comment les éviter, comment réagir si vous y tombez, qui appeler en cas de pépin. Mon réseau d'urgence inclus.",
  },
  {
    mk: '/CH.05',
    pages: '8 pages',
    title: 'Les détours',
    desc: "Les expériences que les agences ne vendent pas : un atelier de couture à Sandaga, un dîner familial à Yoff, une nuit chez l'habitant en Sine Saloum. Les vraies adresses.",
  },
  {
    mk: '/CH.06',
    pages: '6 pages',
    title: 'La logistique',
    desc: "Vols, visas, vaccins, eSIM, change, conduite, sécurité. Le mémo pratique imprimable que je donne à toutes mes amies avant qu'elles partent.",
  },
]

const ANTI_PROMISES = [
  { x: false, t: "Un PDF copié-collé d'internet" },
  { x: false, t: "Une liste générique d'hôtels Booking" },
  { x: false, t: "Des contacts WhatsApp qui ne répondent jamais" },
  { x: false, t: "Un itinéraire écrit derrière un bureau parisien" },
]
const PROMISES = [
  { c: true, t: "60 pages éditoriales, écrites depuis Dakar" },
  { c: true, t: "Mes contacts personnels, testés sur 10 ans de terrain" },
  { c: true, t: "Des tarifs négociés à mon nom — vous les payez" },
  { c: true, t: "Un mémo pratique imprimable + carte Google Maps" },
]

const FAQ = [
  {
    q: 'Pourquoi ne pas tout révéler sur cette page ?',
    a: "Parce que la valeur du guide tient à la curation et au timing exact. Si je publie l'itinéraire complet ici, vous l'organisez seul, mal, sans mes contacts et sans mes tarifs négociés. Vous paierez 30 % plus cher pour une expérience 50 % moins riche. Le guide n'est pas une liste : c'est une méthode.",
  },
  {
    q: 'En quoi c\'est différent d\'un Lonely Planet ?',
    a: "Lonely Planet est écrit pour 100 000 lecteurs. Ce guide est écrit comme si vous étiez ma meilleure amie. Vous avez mes contacts directs (pas une centrale de réservation), mes prix négociés (pas des fourchettes vagues), et mon avis tranché (pas une encyclopédie neutre).",
  },
  {
    q: 'Format et livraison ?',
    a: "PDF premium (60 pages, mise en page éditoriale) + carte Google Maps interactive. Livré par email dans les 5 minutes après paiement. Lisible sur téléphone, tablette, ordinateur. Imprimable en A4.",
  },
  {
    q: 'Si je n\'aime pas, je peux être remboursée ?',
    a: "Oui. 14 jours sans condition. Vous m'écrivez, je rembourse. Aucune question, aucun formulaire. Je préfère mille fois rembourser que vendre un guide qui ne sert pas.",
  },
  {
    q: 'Le guide est-il à jour ?',
    a: "Mise à jour majeure tous les 12 mois (nouveau prix, nouveaux contacts, nouvelles adresses). Les acheteurs reçoivent la nouvelle version gratuitement pendant 12 mois.",
  },
  {
    q: 'Et si je voyage plus de 7 jours ?',
    a: "Le guide est calibré pour 7 jours optimisés, mais il vous donne la base solide pour étirer à 10 ou 14 jours sans difficulté. Pour un voyage de 14 jours pensé pour la diaspora, regardez plutôt /voyages/retour-aux-sources (voyage accompagné en groupe).",
  },
]

export default function GuideSenegal7JoursPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, color: INK }}>

        {/* HERO */}
        <section
          style={{
            paddingTop: '7rem',
            paddingBottom: '5rem',
            background: `linear-gradient(180deg, ${CREAM} 0%, ${BG} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* glow doré décoratif */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '5%',
              right: '-10%',
              width: 520,
              height: 520,
              background: `radial-gradient(circle, rgba(246,201,97,0.22) 0%, transparent 70%)`,
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

          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 56,
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Texte */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: `1px solid rgba(86,14,19,0.15)`,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(6px)',
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#15803D',
                    boxShadow: '0 0 8px #15803D',
                    animation: 'g7-pulse 2s ease-in-out infinite',
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
                  / GUIDE ÉDITORIAL · ÉDITION 2026
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  lineHeight: 1.05,
                  color: BRAND,
                  fontWeight: 500,
                  marginBottom: 20,
                }}
              >
                Sept jours au Sénégal,
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
                  écrits comme un carnet de famille.
                </em>
              </h1>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: 'rgba(10,10,10,0.75)',
                  maxWidth: 520,
                  marginBottom: 28,
                }}
              >
                Pas un guide. Une méthode. Le carnet de route que je tends à mes meilleures amies
                quand elles me disent : <em>« Roseline, je pars sept jours. Tu m&apos;organises ça ? »</em>
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
                <a
                  href="#acheter"
                  style={{
                    padding: '15px 30px',
                    background: BRAND,
                    color: GOLD,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 2,
                  }}
                >
                  Acheter le guide — 29 €
                </a>
                <Link
                  href="#sommaire"
                  style={{
                    padding: '15px 30px',
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
                  Voir le sommaire
                </Link>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  flexWrap: 'wrap',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  color: 'rgba(86,14,19,0.65)',
                  textTransform: 'uppercase',
                }}
              >
                <span>~60 PAGES</span>
                <span>· 3 BUDGETS</span>
                <span>· CARTE INCLUSE</span>
                <span>· MAJ.12MOIS</span>
              </div>
            </div>

            {/* Mockup PDF flouté */}
            <div style={{ position: 'relative', minHeight: 460 }}>
              {/* fond pages floutées en stack */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  right: 24,
                  height: 420,
                  background: '#fff',
                  border: '1px solid rgba(86,14,19,0.08)',
                  boxShadow: '0 6px 24px rgba(86,14,19,0.06)',
                  borderRadius: 4,
                  transform: 'rotate(-3deg)',
                  filter: 'blur(2px) brightness(1.05)',
                  opacity: 0.55,
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  right: 14,
                  height: 420,
                  background: '#fff',
                  border: '1px solid rgba(86,14,19,0.08)',
                  boxShadow: '0 8px 28px rgba(86,14,19,0.08)',
                  borderRadius: 4,
                  transform: 'rotate(-1.5deg)',
                  filter: 'blur(1px) brightness(1.03)',
                  opacity: 0.7,
                }}
              />
              {/* cover principale */}
              <div
                style={{
                  position: 'relative',
                  height: 460,
                  background: `linear-gradient(160deg, ${BRAND} 0%, #3d090e 100%)`,
                  border: '1px solid rgba(246,201,97,0.25)',
                  borderRadius: 6,
                  padding: '40px 32px',
                  color: CREAM,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 24px 60px rgba(86,14,19,0.25)',
                  overflow: 'hidden',
                }}
              >
                {/* image hero floue en bg */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.18,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src="/images/senegal/hero.jpg"
                    alt=""
                    fill
                    style={{ objectFit: 'cover', filter: 'blur(4px) brightness(0.6)' }}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 10,
                      letterSpacing: '0.3em',
                      color: GOLD,
                      textTransform: 'uppercase',
                      marginBottom: 18,
                    }}
                  >
                    / ÉDITION 2026 · N°01
                  </div>
                  <div style={{ height: 1, background: 'rgba(246,201,97,0.3)', marginBottom: 18 }} />
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 14,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      opacity: 0.7,
                      marginBottom: 8,
                    }}
                  >
                    Le carnet de route
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                      lineHeight: 1,
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    Sept Jours
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                      lineHeight: 1,
                      color: GOLD,
                      fontWeight: 400,
                    }}
                  >
                    au Sénégal
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ height: 1, background: 'rgba(246,201,97,0.3)', marginBottom: 18 }} />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      gap: 16,
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 9,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(254,252,249,0.7)',
                    }}
                  >
                    <div>
                      <div style={{ opacity: 0.5, marginBottom: 4 }}>AUTEUR</div>
                      <div style={{ color: CREAM, fontWeight: 600, letterSpacing: '0.15em' }}>
                        Roseline Ngom
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ opacity: 0.5, marginBottom: 4 }}>PAGES</div>
                      <div style={{ color: GOLD, fontWeight: 600, letterSpacing: '0.15em' }}>60</div>
                    </div>
                  </div>
                </div>

                {/* sceau or coin */}
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    width: 60,
                    height: 60,
                    border: `1px solid ${GOLD}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    color: GOLD,
                    textAlign: 'center',
                    lineHeight: 1.1,
                  }}
                >
                  RN<br />2026
                </div>
              </div>

              {/* badge prix flottant */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -16,
                  right: -8,
                  padding: '10px 18px',
                  background: GOLD,
                  color: BRAND,
                  borderRadius: 2,
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  boxShadow: '0 8px 20px rgba(246,201,97,0.4)',
                  transform: 'rotate(3deg)',
                }}
              >
                29 €
              </div>
            </div>
          </div>

          <style>{`
            @keyframes g7-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.55; transform: scale(0.85); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="g7-pulse"] { animation: none !important; }
            }
          `}</style>
        </section>

        {/* PROBLÈMES — les 4 pièges */}
        <section style={{ padding: '90px 24px', background: '#fff', position: 'relative' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: BRAND,
                  marginBottom: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    boxShadow: '0 0 8px #EF4444',
                    animation: 'g7-pulse 2s ease-in-out infinite',
                  }}
                />
                ◆ POURQUOI.CE.GUIDE
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                  color: BRAND,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: 14,
                }}
              >
                Sept jours, c&apos;est court.
                <br />
                <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Et terriblement piégeux.</em>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'rgba(10,10,10,0.7)',
                  maxWidth: 600,
                  margin: '0 auto',
                }}
              >
                Quatre erreurs gâchent neuf voyages d&apos;une semaine sur dix.
                Et personne ne vous les dit avant que vous y soyez.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 20,
              }}
            >
              {PROBLEMES.map((p) => (
                <div
                  key={p.mk}
                  style={{
                    padding: '28px 24px',
                    background: 'rgba(239,68,68,0.03)',
                    border: '1px solid rgba(239,68,68,0.15)',
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: 9,
                        letterSpacing: '0.3em',
                        color: '#EF4444',
                        fontWeight: 600,
                      }}
                    >
                      {p.mk}
                    </span>
                    <span style={{ flex: 1, height: 1, background: 'rgba(239,68,68,0.15)' }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 22,
                      fontWeight: 600,
                      color: BRAND,
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(10,10,10,0.7)' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOMMAIRE THÉMATIQUE */}
        <section id="sommaire" style={{ padding: '90px 24px', backgroundColor: BG, position: 'relative' }}>
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
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
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
                ◆ SOMMAIRE.ÉDITORIAL
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                  color: BRAND,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: 14,
                }}
              >
                Six chapitres. <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Une méthode.</em>
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(10,10,10,0.6)',
                  maxWidth: 580,
                  margin: '0 auto',
                  fontStyle: 'italic',
                }}
              >
                Volontairement pensé par thématique, pas jour par jour.
                L&apos;ordre exact de votre semaine reste réservé aux acheteurs.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              {THEMATIQUES.map((t) => (
                <div
                  key={t.mk}
                  style={{
                    padding: '28px 26px',
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(86,14,19,0.1)',
                    borderRadius: 6,
                    transition: 'transform .3s, box-shadow .3s',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: 9,
                        letterSpacing: '0.3em',
                        color: BRAND,
                        opacity: 0.7,
                      }}
                    >
                      {t.mk}
                    </span>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: 9,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        background: 'rgba(86,14,19,0.08)',
                        color: BRAND,
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      {t.pages}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 26,
                      fontWeight: 600,
                      color: BRAND,
                      marginBottom: 10,
                      lineHeight: 1.15,
                    }}
                  >
                    {t.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'rgba(10,10,10,0.7)' }}>
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CE QUE CE GUIDE EST / N'EST PAS */}
        <section style={{ padding: '90px 24px', background: '#fff' }}>
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
                ◆ LE.CONTRAT
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                  color: BRAND,
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
              >
                Ce que ce guide n&apos;est pas.
                <br />
                <em style={{ fontStyle: 'italic', color: '#b8860b' }}>Et ce qu&apos;il est vraiment.</em>
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 24,
              }}
            >
              <div
                style={{
                  padding: '28px 28px',
                  border: '1px solid rgba(239,68,68,0.18)',
                  borderRadius: 6,
                  background: 'rgba(239,68,68,0.02)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    color: '#EF4444',
                    marginBottom: 18,
                  }}
                >
                  / N&apos;EST PAS
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {ANTI_PROMISES.map((a) => (
                    <li
                      key={a.t}
                      style={{
                        display: 'flex',
                        gap: 12,
                        fontSize: 14.5,
                        color: 'rgba(10,10,10,0.7)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: '#EF4444', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>×</span>
                      <span>{a.t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: '28px 28px',
                  border: `1px solid rgba(86,14,19,0.18)`,
                  borderRadius: 6,
                  background: `linear-gradient(180deg, ${CREAM} 0%, ${BG} 100%)`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    color: BRAND,
                    marginBottom: 18,
                  }}
                >
                  / EST VRAIMENT
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {PROMISES.map((p) => (
                    <li
                      key={p.t}
                      style={{
                        display: 'flex',
                        gap: 12,
                        fontSize: 14.5,
                        color: INK,
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: GOLD, fontWeight: 700, fontSize: 18, lineHeight: 1 }}>→</span>
                      <span>{p.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES ÉDITORIAUX */}
        <section style={{ padding: '90px 24px', backgroundColor: BG }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
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
                ◆ ELLES.L&apos;ONT.SUIVI
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                  color: BRAND,
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
              >
                Trois voyages,
                <br />
                <em style={{ fontStyle: 'italic', color: '#b8860b' }}>trois transformations.</em>
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 24,
              }}
            >
              {[
                {
                  initials: 'JM',
                  name: 'Julie M.',
                  loc: 'Bordeaux',
                  context: 'Première fois au Sénégal · Voyage en couple · Juin 2025',
                  quote:
                    "On avait peur de gâcher notre semaine. On a suivi le guide à la lettre les trois premiers jours, puis on a improvisé avec ses contacts. Résultat : zéro stress, zéro regret. On a dépensé exactement le budget prévu.",
                },
                {
                  initials: 'ID',
                  name: 'Ibrahima D.',
                  loc: 'Genève',
                  context: 'Diaspora · Voyage solo · Septembre 2025',
                  quote:
                    "Je n'étais pas retourné au Sénégal depuis quinze ans. Ce guide m'a donné les codes que j'avais perdus : combien donner, comment négocier, où aller sans avoir l'air d'un touriste suisse. Précieux.",
                },
                {
                  initials: 'CV',
                  name: 'Claire V.',
                  loc: 'Toulouse',
                  context: 'Voyage famille · 2 enfants · Octobre 2025',
                  quote:
                    "Les chauffeurs recommandés ont changé notre voyage. Mamadou nous a accompagnés pendant six jours, il connaissait chaque hôtel, chaque restaurant du guide. Les enfants l'appelaient « tonton ».",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  style={{
                    padding: '32px 28px',
                    background: '#fff',
                    border: '1px solid rgba(86,14,19,0.08)',
                    borderRadius: 6,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      marginBottom: 20,
                      paddingBottom: 18,
                      borderBottom: '1px solid rgba(86,14,19,0.08)',
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        background: BRAND,
                        color: GOLD,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: 18,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: BRAND }}>{t.name}</div>
                      <div
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          fontSize: 10,
                          letterSpacing: '0.15em',
                          color: 'rgba(10,10,10,0.5)',
                          textTransform: 'uppercase',
                          marginTop: 2,
                        }}
                      >
                        {t.loc}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 9,
                      letterSpacing: '0.15em',
                      color: 'rgba(86,14,19,0.55)',
                      textTransform: 'uppercase',
                      marginBottom: 14,
                    }}
                  >
                    {t.context}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 17,
                      lineHeight: 1.55,
                      color: INK,
                      fontStyle: 'italic',
                      flex: 1,
                    }}
                  >
                    « {t.quote} »
                  </p>
                  <div style={{ marginTop: 18, color: GOLD, fontSize: 14, letterSpacing: 2 }}>
                    ★ ★ ★ ★ ★
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOC VALEUR — comparaison agence */}
        <section style={{ padding: '90px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #3d090e 100%)`,
                borderRadius: 6,
                padding: 'clamp(36px, 5vw, 56px)',
                color: CREAM,
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
                  backgroundSize: '28px 28px',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: GOLD,
                    marginBottom: 16,
                  }}
                >
                  ◆ FAITES.LE.CALCUL
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                    fontWeight: 500,
                    lineHeight: 1.15,
                    marginBottom: 36,
                  }}
                >
                  Le même voyage,
                  <br />
                  <em style={{ fontStyle: 'italic', color: GOLD }}>trois manières de l&apos;acheter.</em>
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 18,
                    marginBottom: 28,
                  }}
                >
                  {[
                    { mk: '/AGENCE', label: 'Agence Dakar 7j', price: '~1 800 €', sub: 'Tour générique, marges OTA' },
                    { mk: '/SEUL', label: 'Vous, en mode bricolage', price: '~1 500 €', sub: '30–50 % de pertes invisibles' },
                    { mk: '/GUIDE', label: 'Ce guide + vous', price: '29 €', sub: 'Mes contacts, mes tarifs négociés', featured: true },
                  ].map((c) => (
                    <div
                      key={c.mk}
                      style={{
                        padding: '24px 20px',
                        background: c.featured ? GOLD : 'rgba(254,252,249,0.05)',
                        border: c.featured ? `1px solid ${GOLD}` : '1px solid rgba(246,201,97,0.15)',
                        borderRadius: 4,
                        color: c.featured ? BRAND : CREAM,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          fontSize: 9,
                          letterSpacing: '0.3em',
                          color: c.featured ? BRAND : GOLD,
                          opacity: c.featured ? 0.8 : 1,
                          marginBottom: 10,
                        }}
                      >
                        {c.mk}
                      </div>
                      <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 12 }}>{c.label}</div>
                      <div
                        style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontSize: 32,
                          fontWeight: 700,
                          lineHeight: 1,
                          marginBottom: 8,
                        }}
                      >
                        {c.price}
                      </div>
                      <div style={{ fontSize: 11.5, opacity: 0.7, lineHeight: 1.5 }}>{c.sub}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, opacity: 0.7, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
                  Le guide coûte moins cher qu&apos;une heure de chauffeur mal négocié.
                  Et il rentabilise sa lecture dès le premier jour.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA ACHETER */}
        <section
          id="acheter"
          style={{
            padding: '90px 24px',
            background: `linear-gradient(180deg, ${BG} 0%, ${CREAM} 100%)`,
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              textAlign: 'center',
              background: '#fff',
              border: `1px solid rgba(86,14,19,0.1)`,
              borderRadius: 6,
              padding: 'clamp(40px, 6vw, 64px) clamp(28px, 5vw, 56px)',
              boxShadow: '0 20px 60px rgba(86,14,19,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: BRAND,
                marginBottom: 14,
              }}
            >
              / COMMANDER · LIVRAISON IMMÉDIATE
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: BRAND,
                fontWeight: 500,
                lineHeight: 1.1,
                marginBottom: 18,
              }}
            >
              Le guide qui rentabilise
              <br />
              <em style={{ fontStyle: 'italic', color: '#b8860b' }}>son premier café au Sénégal.</em>
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 56,
                fontWeight: 700,
                color: BRAND,
                lineHeight: 1,
                marginTop: 30,
              }}
            >
              29 €
            </div>
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(86,14,19,0.6)',
                textTransform: 'uppercase',
                marginTop: 8,
                marginBottom: 28,
              }}
            >
              PAIEMENT UNIQUE · ~19 000 FCFA
            </div>
            <a
              href="/api/checkout?product=guide_senegal_7j"
              style={{
                display: 'inline-block',
                padding: '18px 40px',
                background: BRAND,
                color: GOLD,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 2,
              }}
            >
              Recevoir le guide maintenant →
            </a>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 28,
                flexWrap: 'wrap',
                marginTop: 30,
                paddingTop: 24,
                borderTop: '1px solid rgba(86,14,19,0.08)',
              }}
            >
              {[
                { mk: '/01', t: 'Satisfait ou remboursé', s: '14 jours, sans condition' },
                { mk: '/02', t: 'Mises à jour', s: 'Édition 2027 incluse' },
                { mk: '/03', t: 'Livraison', s: 'PDF par email en < 5 min' },
              ].map((g) => (
                <div key={g.mk} style={{ textAlign: 'left', minWidth: 160 }}>
                  <div
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 9,
                      letterSpacing: '0.3em',
                      color: BRAND,
                      opacity: 0.6,
                      marginBottom: 4,
                    }}
                  >
                    {g.mk}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BRAND }}>{g.t}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(10,10,10,0.6)', marginTop: 2 }}>{g.s}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 28,
                paddingTop: 22,
                borderTop: '1px solid rgba(86,14,19,0.08)',
                fontSize: 13,
                color: 'rgba(10,10,10,0.65)',
              }}
            >
              Vous prenez aussi la Casamance ?{' '}
              <Link
                href="/guides/bundle-decouverte"
                style={{ color: BRAND, fontWeight: 600, textDecoration: 'underline' }}
              >
                Bundle 2 guides à 49 € →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '90px 24px', background: '#fff' }}>
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
                  lineHeight: 1.15,
                }}
              >
                Tout ce que vous voulez savoir.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FAQ.map((f, i) => (
                <details
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(86,14,19,0.1)',
                    padding: '20px 4px',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 19,
                      fontWeight: 600,
                      color: BRAND,
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                    }}
                  >
                    <span>{f.q}</span>
                    <span style={{ color: GOLD, fontSize: 20, flexShrink: 0 }}>+</span>
                  </summary>
                  <p
                    style={{
                      marginTop: 14,
                      fontSize: 14.5,
                      lineHeight: 1.7,
                      color: 'rgba(10,10,10,0.7)',
                    }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
