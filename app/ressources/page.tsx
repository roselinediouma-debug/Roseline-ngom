import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Ressources gratuites — Sénégal, diaspora, tourisme',
  description:
    'Guides PDF gratuits pour préparer votre Sénégal : 15 expériences secrètes, guide diaspora, benchmark tourisme, newsletter La Teranga.',
  path: '/ressources',
})

/* ==================================================================
   /ressources — page éditoriale
   Hero + pourquoi + 4 ressources (2 featured avec mockup) + CTA
   ================================================================== */

export default function RessourcesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: '#FEFCF9', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#560E13' }}>
          <Image
            src="/images/senegal/hero.jpg"
            alt="Sénégal, voyage authentique"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(86,14,19,0.85) 0%, rgba(86,14,19,0.92) 100%)',
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-5 pt-28 md:pt-36 pb-20 md:pb-28 text-center">
            <div
              className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(246,201,97,0.15)',
                color: '#F6C961',
                border: '1px solid rgba(246,201,97,0.45)',
              }}
            >
              Ressources gratuites
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
                textShadow: '0 3px 20px rgba(0,0,0,0.4)',
              }}
            >
              Dix ans de terrain,
              <br />
              <span style={{ color: '#F6C961', fontStyle: 'italic' }}>
                condensés en 4 PDF.
              </span>
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ color: 'rgba(254,252,249,0.88)' }}
            >
              Avant de voyager avec moi, lis ce que j’écris pour mes lecteurs.
              Quatre ressources conçues pour la diaspora, les voyageurs curieux
              et les professionnels du tourisme.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-xs" style={{ color: 'rgba(254,252,249,0.75)' }}>
              <div>
                <div className="text-3xl font-bold font-[var(--font-cormorant)]" style={{ color: '#F6C961' }}>4</div>
                <div className="uppercase tracking-[0.2em] mt-1">ressources</div>
              </div>
              <div className="w-px h-10" style={{ backgroundColor: 'rgba(246,201,97,0.3)' }} />
              <div>
                <div className="text-3xl font-bold font-[var(--font-cormorant)]" style={{ color: '#F6C961' }}>100%</div>
                <div className="uppercase tracking-[0.2em] mt-1">gratuit</div>
              </div>
              <div className="w-px h-10" style={{ backgroundColor: 'rgba(246,201,97,0.3)' }} />
              <div>
                <div className="text-3xl font-bold font-[var(--font-cormorant)]" style={{ color: '#F6C961' }}>0</div>
                <div className="uppercase tracking-[0.2em] mt-1">spam</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ INTRO ÉDITORIALE ============ */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#b8860b' }}>
              Pourquoi ces ressources
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              Je préfère qu’on travaille ensemble
              <br />
              <span style={{ fontStyle: 'italic', color: '#b8860b' }}>
                sur des bases solides.
              </span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
              Ces guides, c’est ce que je donne à mes proches avant leur premier voyage.
              Ce que j’envoie à un hôtelier avant un audit. Ce que je lis moi-même
              quand je prépare une mission institutionnelle. Pas des leads magnets
              de façade — de vrais outils, écrits pour servir.
            </p>
          </div>
        </section>

        {/* ============ RESSOURCE #1 : GUIDE 15 EXPÉRIENCES (featured) ============ */}
        <FeaturedResource
          eyebrow="Le plus téléchargé"
          title="15 expériences secrètes au Sénégal"
          subtitle="PDF 33 pages · Pour les voyageurs curieux"
          description="Mon carnet d’adresses personnel. 15 lieux, contacts directs, astuces locales. Le guide que je donne à mes amis avant leur premier voyage au Sénégal."
          bullets={[
            'Lac Rose, Lompoul, Carabane, Saint-Louis, Sine Saloum…',
            'Contacts WhatsApp vérifiés de chauffeurs et piroguiers',
            'Itinéraires selon la durée de ton séjour',
            '10 ans de terrain condensés en 33 pages',
          ]}
          href="/ressources/guide-15-experiences"
          cta="Recevoir le guide"
          cover={{
            eyebrow: 'Guide voyageur',
            titleMain: '15',
            titleSub: 'expériences',
            tagline: 'secrètes au Sénégal',
            meta: '33 pages · PDF',
          }}
          bg="#F8F5F0"
        />

        {/* ============ RESSOURCE #2 : LE BLED AUTREMENT (featured) ============ */}
        <FeaturedResource
          eyebrow="Nouveau · diaspora"
          title="Le Bled Autrement"
          subtitle="PDF 14 pages · Pour la diaspora"
          description="Pour celles et ceux qui rentrent chaque été — ou qui ne sont jamais rentrés. Un guide doux, concret, pour vivre le Sénégal autrement qu’en touriste, sans culpabilité ni nostalgie forcée."
          bullets={[
            'Les 5 blocages silencieux de la diaspora',
            'Les 3 types de retour : familial, vacances, racines',
            'Transmettre aux enfants (et au conjoint)',
            'Méthode en 6 étapes pour un vrai retour',
          ]}
          href="/ressources/le-bled-autrement"
          cta="Recevoir le guide"
          cover={{
            eyebrow: 'Guide diaspora',
            titleMain: 'Bled',
            titleSub: 'Autrement',
            tagline: 'Rentrer autrement, avec méthode.',
            meta: '14 pages · PDF',
          }}
          bg="#FEFCF9"
          reverse
        />

        {/* ============ RESSOURCES SECONDAIRES ============ */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
                Plus spécialisé
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Pour les pros et les curieux
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Benchmark institutionnel */}
              <SecondaryCard
                badge="Institutionnel"
                icon={<IconChart />}
                title="Benchmark Bénin · Maroc · Rwanda"
                format="PDF · Tourisme africain"
                description="Politique touristique comparée. Ce que le Sénégal peut apprendre de 3 pays africains qui ont réussi leur transformation. Pour décideurs tourisme, institutions, consultants."
                href="/ressources/benchmark-institutionnel"
                cta="Télécharger"
              />

              {/* Newsletter */}
              <SecondaryCard
                badge="Email"
                icon={<IconMail />}
                title="La Teranga"
                format="Newsletter · 1 à 2 fois par mois"
                description="Ce que je garde pour mes lecteurs les plus fidèles. Coulisses d’un voyage, découverte d’une région, recommandation d’un artisan, réflexion personnelle. Jamais promotionnel."
                href="/ressources/newsletter"
                cta="S’inscrire"
              />
            </div>
          </div>
        </section>

        {/* ============ POUR QUI ? ============ */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
                Quelle ressource pour toi ?
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                En 30 secondes
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              <ProfileCard
                emoji="✈️"
                title="Tu prépares un premier voyage"
                recommend="Guide 15 expériences"
                href="/ressources/guide-15-experiences"
              />
              <ProfileCard
                emoji="🏡"
                title="Tu es de la diaspora"
                recommend="Le Bled Autrement"
                href="/ressources/le-bled-autrement"
              />
              <ProfileCard
                emoji="🏛️"
                title="Tu travailles sur les politiques tourisme"
                recommend="Benchmark institutionnel"
                href="/ressources/benchmark-institutionnel"
              />
              <ProfileCard
                emoji="💌"
                title="Tu veux juste suivre"
                recommend="Newsletter La Teranga"
                href="/ressources/newsletter"
              />
            </div>
          </div>
        </section>

        {/* ============ CTA FINAL ============ */}
        <section className="py-24 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>
              Tu veux aller plus loin ?
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}
            >
              Les guides gratuits donnent le cap.
              <br />
              <span style={{ color: '#F6C961', fontStyle: 'italic' }}>
                Les guides signatures t’y emmènent.
              </span>
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: 'rgba(254,252,249,0.8)' }}>
              Des guides payants ultra-détaillés sur la Casamance et le Sénégal 7 jours,
              avec contacts directs, prix, itinéraires testés et support email.
            </p>
            <Link
              href="/guides"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                backgroundColor: '#F6C961',
                color: '#560E13',
                boxShadow: '0 12px 40px rgba(246,201,97,0.3)',
              }}
            >
              Voir les guides signatures →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* ==================================================================
   FEATURED RESOURCE — mockup cover + copy long
   ================================================================== */
type CoverSpec = {
  eyebrow: string
  titleMain: string
  titleSub: string
  tagline: string
  meta: string
}

function FeaturedResource({
  eyebrow,
  title,
  subtitle,
  description,
  bullets,
  href,
  cta,
  cover,
  bg,
  reverse = false,
}: {
  eyebrow: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  href: string
  cta: string
  cover: CoverSpec
  bg: string
  reverse?: boolean
}) {
  return (
    <section className="py-20 md:py-28 px-5" style={{ backgroundColor: bg }}>
      <div className="max-w-6xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
          {/* Mockup cover */}
          <div className="flex justify-center">
            <MiniGuideMockup {...cover} />
          </div>

          {/* Copy */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              {eyebrow}
            </div>
            <h3
              className="text-3xl md:text-4xl font-bold leading-tight mb-3"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              {title}
            </h3>
            <p className="text-sm font-semibold mb-5 uppercase tracking-wider" style={{ color: '#b8860b' }}>
              {subtitle}
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(10,10,10,0.78)' }}>
              {description}
            </p>
            <ul className="space-y-2.5 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="flex-shrink-0 mt-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    ✓
                  </span>
                  <span style={{ color: 'rgba(10,10,10,0.75)' }}>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                backgroundColor: '#560E13',
                color: '#F6C961',
                boxShadow: '0 12px 30px rgba(86,14,19,0.25)',
              }}
            >
              {cta} · Gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   MINI GUIDE MOCKUP — cover CSS 3D (version compacte)
   ================================================================== */
function MiniGuideMockup({ eyebrow, titleMain, titleSub, tagline, meta }: CoverSpec) {
  return (
    <div className="relative" style={{ width: '280px', height: '390px', perspective: '1300px' }}>
      {/* Ombres de pages derrière */}
      <div
        className="absolute"
        style={{
          top: '16px',
          left: '12px',
          width: '100%',
          height: '100%',
          backgroundColor: '#f5eee2',
          borderRadius: '6px',
          transform: 'rotate(3deg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '8px',
          left: '6px',
          width: '100%',
          height: '100%',
          backgroundColor: '#faf4e8',
          borderRadius: '6px',
          transform: 'rotate(1.5deg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
        }}
      />

      {/* Cover principale */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #560E13 0%, #7a1a22 55%, #2d0609 100%)',
          transform: 'rotateY(-14deg) rotateX(3deg)',
          transformStyle: 'preserve-3d',
          boxShadow:
            '0 40px 80px rgba(0,0,0,0.45), 0 20px 30px rgba(86,14,19,0.3), inset -2px 0 6px rgba(0,0,0,0.25), inset 2px 0 6px rgba(255,255,255,0.05)',
        }}
      >
        {/* Dos du livre */}
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: '10px',
            background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
          }}
        />

        {/* Pattern doré discret */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(246,201,97,0.6), transparent 35%), radial-gradient(circle at 80% 75%, rgba(246,201,97,0.45), transparent 40%)',
          }}
        />

        <div className="relative h-full flex flex-col justify-between p-6 text-left">
          {/* Top */}
          <div>
            <div
              className="text-[9px] font-bold uppercase tracking-[0.35em]"
              style={{ color: 'rgba(246,201,97,0.75)' }}
            >
              Roseline Ngom
            </div>
            <div
              className="mt-2 inline-block text-[8px] font-bold uppercase tracking-[0.25em] px-2 py-1 rounded"
              style={{
                backgroundColor: 'rgba(246,201,97,0.15)',
                color: '#F6C961',
                border: '1px solid rgba(246,201,97,0.35)',
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* Milieu : titre */}
          <div>
            <div
              className="leading-[0.95] mb-1"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
                fontSize: '44px',
                fontWeight: 700,
              }}
            >
              {titleMain}
            </div>
            <div
              className="leading-[0.95]"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#F6C961',
                fontSize: '30px',
                fontWeight: 700,
                fontStyle: 'italic',
              }}
            >
              {titleSub}
            </div>
            <div
              className="mt-4 text-[10px] leading-relaxed max-w-[85%]"
              style={{ color: 'rgba(254,252,249,0.7)' }}
            >
              {tagline}
            </div>
          </div>

          {/* Bas */}
          <div>
            <div className="w-10 h-[2px] mb-3" style={{ backgroundColor: '#F6C961' }} />
            <div className="flex items-center justify-between">
              <div className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(254,252,249,0.55)' }}>
                {meta}
              </div>
              <div
                className="text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-1 rounded"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Gratuit
              </div>
            </div>
          </div>
        </div>

        {/* Reflet */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      </div>
    </div>
  )
}

/* ==================================================================
   SECONDARY CARD — ressources moins centrales
   ================================================================== */
function SecondaryCard({
  badge,
  icon,
  title,
  format,
  description,
  href,
  cta,
}: {
  badge: string
  icon: React.ReactNode
  title: string
  format: string
  description: string
  href: string
  cta: string
}) {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col transition-transform hover:-translate-y-1"
      style={{
        backgroundColor: '#FEFCF9',
        border: '1px solid rgba(86,14,19,0.08)',
        boxShadow: '0 6px 24px rgba(86,14,19,0.05)',
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: '#560E13', color: '#F6C961' }}
        >
          {icon}
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(246,201,97,0.2)', color: '#b8860b' }}
        >
          {badge}
        </span>
      </div>

      <h3
        className="text-xl md:text-2xl font-bold leading-tight mb-2"
        style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
      >
        {title}
      </h3>
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#b8860b' }}>
        {format}
      </p>
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(10,10,10,0.7)' }}>
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] self-start transition-opacity hover:opacity-70"
        style={{ color: '#560E13' }}
      >
        {cta} <span style={{ color: '#F6C961' }}>→</span>
      </Link>
    </div>
  )
}

function ProfileCard({
  emoji,
  title,
  recommend,
  href,
}: {
  emoji: string
  title: string
  recommend: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: '#F8F5F0',
        border: '1px solid rgba(86,14,19,0.08)',
      }}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <p className="text-sm font-semibold mb-3 leading-snug" style={{ color: 'rgba(10,10,10,0.8)' }}>
        {title}
      </p>
      <div
        className="text-xs font-bold uppercase tracking-[0.15em] pt-3"
        style={{ color: '#560E13', borderTop: '1px solid rgba(86,14,19,0.1)' }}
      >
        → {recommend}
      </div>
    </Link>
  )
}

/* ==================================================================
   Icônes SVG inline (pas d'emoji)
   ================================================================== */
function IconChart() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  )
}
