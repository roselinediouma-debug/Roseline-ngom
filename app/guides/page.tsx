import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guides Signatures Sénégal (PDF)',
  description:
    "Guides PDF pour organiser ton voyage au Sénégal toi-même. Contacts vérifiés, itinéraires heure par heure, 200+ adresses testées.",
  openGraph: {
    title: 'Guides Signatures Sénégal (PDF)',
    description:
      "Guides PDF pour organiser ton voyage au Sénégal toi-même. Contacts vérifiés, itinéraires heure par heure, 200+ adresses testées.",
  },
}

const BORDEAUX = '#560E13'
const OR = '#F6C961'
const IVOIRE = '#FEFCF9'
const CREME = '#F8F5F0'
const NOIR = '#0A0A0A'

const FAQ_ITEMS = [
  {
    q: 'Dans quel format est livré le guide ?',
    a: "PDF haute qualité, lisible sur téléphone, tablette et ordinateur. Tu le reçois par email dans les minutes qui suivent l'achat.",
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "Paiement sécurisé par carte bancaire via Stripe. Tu reçois une facture automatiquement.",
  },
  {
    q: 'Les informations sont-elles à jour ?',
    a: 'Oui. Chaque guide est mis à jour tous les trimestres. Tu reçois les mises à jour gratuitement pendant 12 mois.',
  },
  {
    q: 'Puis-je me faire rembourser ?',
    a: 'Oui, satisfait ou remboursé pendant 14 jours, sans condition. Un simple email suffit.',
  },
  {
    q: 'Puis-je partager le guide ?',
    a: "Le guide est réservé à un usage personnel. Merci de ne pas le redistribuer. Si des amis le veulent, partage-leur le lien : c'est le meilleur soutien.",
  },
  {
    q: 'Quelle différence avec le guide gratuit ?',
    a: "Le guide gratuit présente 15 expériences avec des conseils généraux. Les Guides Signatures contiennent les contacts directs, les prix négociés, les itinéraires heure par heure, et 200+ adresses vérifiées.",
  },
]

export default function GuidesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: IVOIRE }}>
        {/* HERO split */}
        <section className="px-5 pt-24 pb-20 md:pt-32 md:pb-28" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div
                className="text-xs font-bold tracking-[0.2em] mb-5"
                style={{ color: OR }}
              >
                GUIDES SIGNATURES
              </div>
              <h1
                className="text-5xl md:text-6xl leading-[1.05] mb-7"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Organise ton voyage{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>
                  toi-même.
                </em>
                <br />
                Comme une locale.
              </h1>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: 'rgba(10,10,10,0.7)' }}
              >
                Pas une agence. Pas un tour opérateur. Juste mon carnet d'adresses, après 10 ans à sillonner le Sénégal.
                Les contacts WhatsApp directs. Les prix négociés. Les itinéraires testés. Ce que personne ne te dira ailleurs.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['200+ adresses', 'Contacts WhatsApp directs', 'Mis à jour 4×/an'].map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: CREME, color: BORDEAUX }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#guides"
                  className="inline-block px-8 py-4 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: OR, color: BORDEAUX }}
                >
                  Voir les guides
                </Link>
                <Link
                  href="#comparer"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-sm transition-opacity hover:opacity-70"
                  style={{ color: BORDEAUX, textDecoration: 'underline', textUnderlineOffset: 6 }}
                >
                  Gratuit, blog ou Signature ?
                </Link>
              </div>
            </div>

            {/* Stack de 2 mockups */}
            <div className="flex justify-center items-center">
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
                    meta="50-70 pages · PDF"
                    accent={OR}
                    scale={0.85}
                  />
                </div>
                <div
                  style={{
                    transform: 'rotateY(-12deg) rotateX(3deg) rotateZ(4deg)',
                    marginLeft: 80,
                    marginTop: 30,
                  }}
                >
                  <BookMockup
                    title="Sénégal"
                    subtitle="en 7 jours"
                    meta="50-60 pages · PDF"
                    accent={OR}
                    scale={0.9}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Éditorial */}
        <section className="px-5 py-20 md:py-28" style={{ backgroundColor: CREME }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold tracking-[0.2em] mb-5" style={{ color: BORDEAUX }}>
              POURQUOI CES GUIDES EXISTENT
            </div>
            <blockquote
              className="text-3xl md:text-4xl leading-snug mb-8"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: NOIR,
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              «&nbsp;J'en ai eu marre de voir mes amis se faire arnaquer par des taxis, payer 80&nbsp;€ une chambre qui
              devrait en coûter 25, et rentrer déçus parce qu'ils sont passés à côté du vrai Sénégal.&nbsp;»
            </blockquote>
            <div
              className="inline-block w-12 h-[2px] mb-5"
              style={{ backgroundColor: OR }}
            />
            <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Roseline Ngom · fondatrice TripAfro
            </p>
          </div>
        </section>

        {/* Comparaison */}
        <section id="comparer" className="px-5 py-20 md:py-28" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: OR }}>
                CE QUI CHANGE TOUT
              </div>
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Blog, guide gratuit, ou{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>Guide Signature</em>&nbsp;?
              </h2>
            </div>

            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: `1px solid rgba(86,14,19,0.12)`, backgroundColor: IVOIRE }}
            >
              <div className="grid grid-cols-4 text-xs md:text-sm font-bold" style={{ backgroundColor: CREME }}>
                <div className="p-4 md:p-5" style={{ color: BORDEAUX }}></div>
                <div className="p-4 md:p-5 text-center" style={{ color: 'rgba(10,10,10,0.5)' }}>Blog internet</div>
                <div className="p-4 md:p-5 text-center" style={{ color: 'rgba(10,10,10,0.7)' }}>Guide gratuit</div>
                <div className="p-4 md:p-5 text-center" style={{ backgroundColor: BORDEAUX, color: OR }}>
                  Guide Signature
                </div>
              </div>
              {[
                { f: 'Contacts WhatsApp directs', v: [false, false, true] },
                { f: 'Itinéraire heure par heure', v: [false, false, true] },
                { f: 'Prix négociés hébergements', v: [false, false, true] },
                { f: 'Mises à jour 12 mois', v: [false, false, true] },
                { f: 'Adresses secrètes', v: ['—', 'Quelques-unes', '200+'] },
                { f: 'Chauffeurs recommandés', v: [false, false, true] },
                { f: 'Budget par profil', v: [false, false, true] },
                { f: 'Carte QR code interactive', v: [false, false, true] },
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 text-xs md:text-sm items-center"
                  style={{ borderTop: '1px solid rgba(86,14,19,0.08)' }}
                >
                  <div className="p-4 md:p-5 font-semibold" style={{ color: NOIR }}>
                    {row.f}
                  </div>
                  {row.v.map((val, j) => (
                    <div
                      key={j}
                      className="p-4 md:p-5 text-center"
                      style={{
                        backgroundColor: j === 2 ? 'rgba(86,14,19,0.04)' : 'transparent',
                        color: j === 2 ? BORDEAUX : 'rgba(10,10,10,0.55)',
                        fontWeight: j === 2 ? 700 : 500,
                      }}
                    >
                      {val === true ? '✓' : val === false ? '—' : val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Les guides */}
        <section id="guides" className="px-5 py-20 md:py-28" style={{ backgroundColor: CREME }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: OR }}>
                LES 2 GUIDES
              </div>
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Choisis ta destination
              </h2>
            </div>

            {/* Guide 1 - Casamance */}
            <GuideFeatured
              reverse={false}
              title="Guide Casamance"
              tagline="Le sud sauvage, hors des sentiers battus"
              description="Ziguinchor, Cap Skirring, Carabane, Oussouye. 50-70 pages de carnets intimes, d'adresses testées, et de chauffeurs qui deviennent des amis. Pour ceux qui veulent sortir de l'axe Dakar-Saint-Louis."
              pages="50-70 pages"
              price="29 €"
              href="/guides/guide-casamance"
              bullets={[
                'Itinéraires 7, 10 et 14 jours',
                '80+ adresses (hébergements, restaurants, artisans)',
                'Contacts chauffeurs + piroguiers vérifiés',
                'Carte interactive des lieux secrets',
              ]}
              mockupTitle="Casamance"
              mockupSubtitle="carnet intime"
            />

            <div className="h-12 md:h-20" />

            {/* Guide 2 - Sénégal 7j */}
            <GuideFeatured
              reverse={true}
              title="Le Sénégal en 7 jours"
              tagline="L'itinéraire optimisé, heure par heure"
              description="Dakar, Saint-Louis, Lac Rose, Île de Gorée, Lompoul. Ce que voient les voyageurs pressés, mais fait comme un local. 50-60 pages pour maximiser chaque heure, sans courir."
              pages="50-60 pages"
              price="29 €"
              href="/guides/guide-senegal-7jours"
              bullets={[
                'Planning jour par jour, heure par heure',
                '120+ adresses (Dakar, Saint-Louis, îles)',
                'Budget 3 profils (sac à dos / confort / luxe)',
                'Astuces taxi, wolof de survie, sécurité',
              ]}
              mockupTitle="Sénégal"
              mockupSubtitle="en 7 jours"
            />

            {/* Bundle */}
            <div className="mt-16">
              <Link href="/guides/bundle-decouverte" className="block group">
                <div
                  className="rounded-3xl p-10 md:p-14 text-center transition-transform duration-300 group-hover:scale-[1.01] relative overflow-hidden"
                  style={{
                    backgroundColor: BORDEAUX,
                    backgroundImage:
                      'radial-gradient(circle at 20% 0%, rgba(246,201,97,0.2), transparent 60%)',
                  }}
                >
                  <span
                    className="inline-block px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest"
                    style={{ backgroundColor: OR, color: BORDEAUX }}
                  >
                    BUNDLE · ÉCONOMIE 9 €
                  </span>
                  <h3
                    className="text-4xl md:text-5xl mb-4"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: IVOIRE,
                      fontWeight: 500,
                    }}
                  >
                    Les 2 guides,{' '}
                    <em style={{ fontStyle: 'italic', color: OR }}>ensemble.</em>
                  </h3>
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <span className="text-2xl font-bold" style={{ color: OR }}>49 €</span>
                    <span
                      className="text-lg line-through"
                      style={{ color: 'rgba(254,252,249,0.5)' }}
                    >
                      58 €
                    </span>
                  </div>
                  <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(254,252,249,0.75)' }}>
                    120 pages · 200+ adresses · 50+ contacts vérifiés. Du nord au sud, tout ce qu'il te faut pour organiser ton voyage.
                  </p>
                  <div
                    className="inline-block mt-7 px-6 py-3 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: OR, color: BORDEAUX }}
                  >
                    Découvrir le bundle →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Garantie */}
        <section className="px-5 py-20" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-3xl p-10 md:p-14 text-center"
              style={{ border: `1px solid ${OR}`, backgroundColor: CREME }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: 'rgba(246,201,97,0.2)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={OR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3
                className="text-3xl md:text-4xl mb-4"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Satisfait ou remboursé{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>14 jours.</em>
              </h3>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(10,10,10,0.65)' }}>
                Si le guide ne correspond pas à tes attentes, un simple email et tu es remboursé. Sans condition, sans question.
                Tu bénéficies aussi de 12 mois de mises à jour gratuites : contacts, prix, nouvelles adresses.
              </p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="px-5 py-20 md:py-28" style={{ backgroundColor: CREME }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: OR }}>
                ILS ONT ACHETÉ
              </div>
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Ce que disent les lecteurs
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Fatou D.',
                  city: 'Paris',
                  quote:
                    "Ce guide m'a fait économiser des heures de recherche. Les contacts sont vraiment à jour, j'ai pu appeler les chauffeurs directement.",
                },
                {
                  name: 'Marc L.',
                  city: 'Bruxelles',
                  quote:
                    "Premier voyage au Sénégal organisé entièrement avec ce guide. Tout était parfait, les adresses, les prix, les conseils.",
                },
                {
                  name: 'Aminata S.',
                  city: 'Montréal',
                  quote:
                    "J'ai offert le bundle à mes parents qui partaient pour la première fois. Ils m'ont dit que c'était le meilleur cadeau.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl p-8"
                  style={{ backgroundColor: IVOIRE, boxShadow: '0 4px 24px rgba(86,14,19,0.06)' }}
                >
                  <div className="mb-4" style={{ color: OR, fontSize: 18, letterSpacing: 2 }}>
                    ★★★★★
                  </div>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      color: NOIR,
                      fontSize: 18,
                    }}
                  >
                    «&nbsp;{t.quote}&nbsp;»
                  </p>
                  <div className="pt-4" style={{ borderTop: '1px solid rgba(86,14,19,0.1)' }}>
                    <div className="font-bold text-sm" style={{ color: BORDEAUX }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(10,10,10,0.55)' }}>
                      {t.city}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-20 md:py-28" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: OR }}>
                FAQ
              </div>
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Questions fréquentes
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl overflow-hidden"
                  style={{ border: '1px solid rgba(86,14,19,0.12)', backgroundColor: IVOIRE }}
                >
                  <summary
                    className="cursor-pointer list-none p-6 flex items-center justify-between gap-4"
                    style={{ color: NOIR }}
                  >
                    <span className="font-semibold text-base">{item.q}</span>
                    <span
                      className="text-2xl font-light flex-shrink-0 transition-transform group-open:rotate-45"
                      style={{ color: BORDEAUX }}
                    >
                      +
                    </span>
                  </summary>
                  <div
                    className="px-6 pb-6 text-sm leading-relaxed"
                    style={{ color: 'rgba(10,10,10,0.7)' }}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="px-5 py-20 md:py-28" style={{ backgroundColor: BORDEAUX }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold tracking-[0.2em] mb-5" style={{ color: OR }}>
              PRÊT ?
            </div>
            <h2
              className="text-4xl md:text-6xl mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: IVOIRE,
                fontWeight: 500,
              }}
            >
              Ton voyage,{' '}
              <em style={{ fontStyle: 'italic', color: OR }}>ta façon.</em>
            </h2>
            <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Choisis ton guide et pars l'esprit tranquille. Remboursé sous 14 jours si tu n'aimes pas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides/bundle-decouverte"
                className="px-8 py-4 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: OR, color: BORDEAUX }}
              >
                Bundle Découverte · 49 €
              </Link>
              <Link
                href="/guides/guide-casamance"
                className="px-8 py-4 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                style={{ border: `1px solid ${OR}`, color: OR }}
              >
                Guide Casamance · 29 €
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* --------- Guide featured split --------- */
function GuideFeatured({
  reverse,
  title,
  tagline,
  description,
  pages,
  price,
  href,
  bullets,
  mockupTitle,
  mockupSubtitle,
}: {
  reverse: boolean
  title: string
  tagline: string
  description: string
  pages: string
  price: string
  href: string
  bullets: string[]
  mockupTitle: string
  mockupSubtitle: string
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: OR, color: BORDEAUX }}>
            {pages}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: BORDEAUX, color: OR }}>
            {price}
          </span>
        </div>
        <h3
          className="text-4xl md:text-5xl mb-3 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            color: NOIR,
            fontWeight: 500,
          }}
        >
          {title}
        </h3>
        <p
          className="text-lg mb-5 italic"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            color: BORDEAUX,
          }}
        >
          {tagline}
        </p>
        <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(10,10,10,0.7)' }}>
          {description}
        </p>
        <ul className="space-y-2.5 mb-8">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: NOIR }}>
              <span className="flex-shrink-0 mt-1" style={{ color: OR }}>
                ✓
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="inline-block px-7 py-3.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: BORDEAUX, color: OR }}
        >
          Découvrir le guide →
        </Link>
      </div>

      <div className="flex justify-center">
        <div style={{ perspective: '1400px' }}>
          <div
            style={{
              transform: reverse
                ? 'rotateY(16deg) rotateX(3deg)'
                : 'rotateY(-14deg) rotateX(3deg)',
            }}
          >
            <BookMockup
              title={mockupTitle}
              subtitle={mockupSubtitle}
              meta={`${pages} · PDF`}
              accent={OR}
              scale={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* --------- 3D book mockup --------- */
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
      {/* pages stack behind */}
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
      {/* cover */}
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
        {/* hex pattern */}
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

        {/* reflet */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* spine */}
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
