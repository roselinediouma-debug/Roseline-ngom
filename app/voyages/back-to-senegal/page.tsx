import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'

const BORDEAUX = '#560E13'
const OR = '#F6C961'
const IVOIRE = '#FEFCF9'
const CREME = '#F8F5F0'
const NOIR = '#0A0A0A'

const CONCEPT = [
  {
    title: 'Pourquoi',
    text:
      "Chaque année, la diaspora africaine envoie des milliards d'euros au pays. Très peu deviennent des projets productifs. Pas par manque d'argent : par manque de réseau, d'information et de méthode.",
  },
  {
    title: 'Pour qui',
    text:
      "Les porteurs de projet de la diaspora qui envisagent de s'installer, d'investir ou de lancer une activité au Sénégal : hôtellerie, restauration, agence réceptive, projet culturel, immobilier, tech, agro-alimentaire.",
  },
  {
    title: 'La promesse',
    text:
      "7 jours sur le terrain pour passer de l'idée au plan d'action. Rencontres institutionnelles, entrepreneurs locaux, experts foncier, prestataires vérifiés, atelier business plan. Vous repartez avec une roadmap, pas un rêve.",
  },
]

const PILIERS = [
  {
    title: 'Institutions & dispositifs',
    text:
      "APIX, DER/FJ, FAISE, ADEPME, banques de la diaspora. En face à face, pas en visio. Les bons interlocuteurs, rencontrés au bon moment.",
  },
  {
    title: 'Entrepreneurs locaux',
    text:
      "Ceux qui ont déjà fait le chemin. Retour d'expérience brut, sans filtre. Ce qui fonctionne, ce qui casse, ce qu'ils auraient aimé savoir avant.",
  },
  {
    title: 'Terrain & foncier',
    text:
      "Visites ciblées, expert foncier, notaire, prestataires locaux (architecte, artisan, fournisseur) vérifiés au préalable. Plus de recherche Google à l'aveugle.",
  },
  {
    title: 'Business plan & pitch',
    text:
      "Atelier intensif pour confronter votre projet au terrain. Chiffrage, séquençage, scénarios. Pitch final devant un jury d'experts et d'investisseurs.",
  },
  {
    title: 'Communauté alumni',
    text:
      "12 porteurs de projets par cohorte. Groupe privé à vie. Entraide, partage de contacts, investissements croisés. On avance à plusieurs, on tient dans la durée.",
  },
  {
    title: 'Suivi post-programme',
    text:
      "Le programme ne s'arrête pas au retour. Plusieurs visios de suivi avec moi dans les mois qui suivent, pour débloquer ce qui coince une fois rentré·e.",
  },
]

export default function BackToSenegalPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: IVOIRE }}>
        {/* HERO — Coming Soon */}
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
              Back to Senegal{' '}
              <em style={{ fontStyle: 'italic', color: BORDEAUX }}>arrive.</em>
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
              style={{ color: 'rgba(10,10,10,0.7)' }}
            >
              Le programme d&rsquo;accélération sur 7 jours pour les porteurs de projet
              de la diaspora qui veulent passer de l&rsquo;idée à l&rsquo;action au Sénégal.
            </p>

            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: 'rgba(10,10,10,0.55)' }}
            >
              Je finalise la première cohorte. Les candidatures ouvriront bientôt.
            </p>
          </div>
        </section>

        {/* CONCEPT */}
        <section className="px-5 py-20 md:py-24" style={{ backgroundColor: CREME }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-[0.25em] mb-4" style={{ color: OR }}>
                LE CONCEPT
              </div>
              <h2
                className="text-3xl md:text-5xl leading-tight"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Dix ans de terrain,{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>
                  condensés en 7 jours.
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {CONCEPT.map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-8"
                  style={{
                    backgroundColor: IVOIRE,
                    border: '1px solid rgba(86,14,19,0.08)',
                  }}
                >
                  <div
                    className="mb-5 flex items-center gap-3"
                    style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                  >
                    <span style={{ fontSize: 22, fontWeight: 600, color: OR, lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ flex: 1, height: 1, backgroundColor: 'rgba(86,14,19,0.15)' }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: BORDEAUX,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.7)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LETTRE — Pourquoi */}
        <section className="px-5 py-20 md:py-28" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-[2fr_3fr] gap-10 items-center">
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5', position: 'relative' }}>
              <Image
                src="/images/roseline-portrait-1.jpg"
                alt="Roseline Ngom"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.25em] mb-4" style={{ color: OR }}>
                POURQUOI J&rsquo;AI CRÉÉ CE PROGRAMME
              </div>
              <h2
                className="text-3xl md:text-4xl leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Pas par manque d&rsquo;argent.{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>
                  Par manque de méthode.
                </em>
              </h2>
              <div className="space-y-4 text-[15px] md:text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
                <p>
                  Depuis dix ans, je reçois le même message :{' '}
                  <em>« Roseline, j&rsquo;ai un projet au Sénégal. Mais je ne sais pas par où commencer. »</em>
                </p>
                <p>
                  J&rsquo;ai vu des dizaines de projets s&rsquo;essouffler dans les emails sans réponse,
                  les notaires opaques, les business plans jamais confrontés au terrain. Le capital
                  n&rsquo;était jamais le vrai problème.
                </p>
                <p>
                  Back to Senegal, c&rsquo;est sept jours pour transmettre ce que j&rsquo;ai mis dix ans
                  à construire : un carnet d&rsquo;adresses, une méthode, et la conviction que votre projet
                  est faisable, si on l&rsquo;attaque bien.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontStyle: 'italic',
                    color: BORDEAUX,
                    marginTop: 20,
                  }}
                >
                  — Roseline
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PILIERS */}
        <section className="px-5 py-20 md:py-24" style={{ backgroundColor: CREME }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-[0.25em] mb-4" style={{ color: OR }}>
                CE QUE CONTIENT LE PROGRAMME
              </div>
              <h2
                className="text-3xl md:text-4xl leading-tight"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: NOIR,
                  fontWeight: 500,
                }}
              >
                Six piliers. Une{' '}
                <em style={{ fontStyle: 'italic', color: BORDEAUX }}>transformation.</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {PILIERS.map((item, i) => (
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
                    style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                  >
                    <span style={{ fontSize: 22, fontWeight: 600, color: OR, lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ flex: 1, height: 1, backgroundColor: 'rgba(86,14,19,0.15)' }} />
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

        {/* WAITLIST */}
        <section className="px-5 py-24 md:py-28" style={{ backgroundColor: BORDEAUX }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold tracking-[0.25em] mb-5" style={{ color: OR }}>
              LISTE D&rsquo;ATTENTE
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
              <em style={{ fontStyle: 'italic', color: OR }}>à l&rsquo;ouverture.</em>
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'rgba(254,252,249,0.8)' }}
            >
              Douze places par cohorte. Les candidatures seront d&rsquo;abord ouvertes à la liste
              d&rsquo;attente, avec un tarif préférentiel pour les premiers inscrits.
              Laissez votre email, je vous écris dès que tout est prêt.
            </p>

            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>

            <p className="text-xs mt-6" style={{ color: 'rgba(254,252,249,0.5)' }}>
              Pas de spam. Désinscription en 1 clic. Vous serez informé·e en priorité.
            </p>
          </div>
        </section>

        {/* EN ATTENDANT */}
        <section className="px-5 py-20 md:py-24" style={{ backgroundColor: IVOIRE }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs font-bold tracking-[0.25em] mb-4" style={{ color: OR }}>
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
              Explorez le reste du travail
            </h2>
            <p
              className="text-base leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ color: 'rgba(10,10,10,0.65)' }}
            >
              Si votre projet est déjà avancé, je propose aussi un accompagnement stratégique
              individuel. Sinon, le blog et les ressources gratuites sont un bon point de départ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consulting/accompagnement"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: BORDEAUX, color: OR }}
              >
                Voir l&rsquo;accompagnement individuel
              </a>
              <a
                href="/blog"
                className="px-7 py-3.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                style={{ border: `1px solid ${BORDEAUX}`, color: BORDEAUX }}
              >
                Lire le blog
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
