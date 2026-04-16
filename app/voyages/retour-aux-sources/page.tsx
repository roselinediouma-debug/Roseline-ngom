import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import TimelineSection from '@/components/TimelineSection'
import FeatureGrid from '@/components/FeatureGrid'
import PricingTable from '@/components/PricingTable'
import TestimonialCard from '@/components/TestimonialCard'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Retour aux Sources | Voyage diaspora Sénégal',
  description: '14 jours pour reconnecter avec vos racines au Sénégal. Voyage immersif pour la diaspora, à partir de 2 200 €.',
  openGraph: {
    title: 'Retour aux Sources | Voyage diaspora Sénégal',
    description: '14 jours pour reconnecter avec vos racines au Sénégal. Voyage immersif pour la diaspora, à partir de 2 200 €.',
  },
}

const timelineDays = [
  {
    day: 'Jour 1-3',
    title: 'La capitale, entre tradition et modernite',
    location: 'Dakar',
    highlights: [
      'Ile de Goree : marcher sur les traces de l\'histoire',
      'Marche Sandaga : les couleurs, les odeurs, la vie',
      'Ngor et les Almadies : le Dakar moderne',
      'Soiree de bienvenue : thieboudienne et teranga',
    ],
  },
  {
    day: 'Jour 4-6',
    title: 'Les plages, la faune, les rencontres',
    location: 'Saly & Petite Cote',
    highlights: [
      'Reserve de Bandia : girafes, rhinoceros, singes',
      'Plage de Saly : repos et baignade',
      'Lagune de la Somone : oiseaux et pirogue',
      'Marche aux poissons de Mbour : spectacle garanti',
    ],
  },
  {
    day: 'Jour 7-9',
    title: 'Les bolongs, les mangroves, le silence',
    location: 'Sine Saloum',
    highlights: [
      'Pirogue dans les bolongs : glisser sur l\'eau',
      'Fadiouth, l\'ile aux coquillages : un lieu unique au monde',
      'Peche traditionnelle avec les villageois',
      'Nuit en lodge, bruit des oiseaux et des vagues',
    ],
  },
  {
    day: 'Jour 10-12',
    title: 'L\'histoire, le fleuve, le desert',
    location: 'Saint-Louis & Nord',
    highlights: [
      'Saint-Louis en caleche : architecture coloniale et jazz',
      'Quartier des pecheurs de Guet Ndar',
      'Desert de Lompoul sous les etoiles',
      'Bivouac, feu de camp, silence du Sahel',
    ],
  },
  {
    day: 'Jour 13-14',
    title: 'Les adieux, les promesses',
    location: 'Retour Dakar',
    highlights: [
      'Derniers achats : tissus, bijoux, souvenirs',
      'Diner de cloture en groupe',
      'Ceremonie de depart : bilan, emotions, promesses',
    ],
  },
]

const pourQuiFeatures = [
  {
    icon: '1',
    title: 'Diaspora en quete de racines',
    description: 'Vous etes ne ou grandi en France, en Europe, aux Etats-Unis, et vous avez des racines senegalaises.',
  },
  {
    icon: '2',
    title: 'Parents transmetteurs',
    description: 'Vos enfants n\'ont jamais vraiment vu le Senegal. Vous voulez leur montrer d\'ou ils viennent.',
  },
  {
    icon: '3',
    title: 'Voyageurs rassures',
    description: 'Vous voulez un voyage rassurant, bien organise, avec du sens. Pas un tour operator classique.',
  },
  {
    icon: '4',
    title: 'Immersion avec confort',
    description: 'Vous cherchez l\'immersion sans sacrifier le confort. Hotels de charme, transport prive, guide dedie.',
  },
]

const testimonials = [
  {
    name: 'Aminata D.',
    location: 'Paris, France',
    quote: 'J\'avais toujours voulu montrer le Senegal a mes enfants. Pas juste les vacances chez la famille. Un vrai voyage. Retour aux Sources a ete ce moment. Mes filles en parlent encore tous les jours.',
  },
  {
    name: 'Mamadou K.',
    location: 'Bruxelles, Belgique',
    quote: 'Je suis ne a Bruxelles. Mes parents sont senegalais. A 35 ans, j\'ai fait ce voyage. J\'ai pleure a Goree. J\'ai ri au marche de Mbour. J\'ai compris des choses que mes parents n\'avaient jamais su me dire avec des mots.',
  },
  {
    name: 'Fatou S.',
    location: 'Montreal, Canada',
    quote: 'L\'organisation etait impeccable. Roseline pense a tout. Du confort, de l\'authenticite, et surtout du coeur. Mon fils de 8 ans a appris a pecher avec des pecheurs de Saloum. Inoubliable.',
  },
]

const inclus = [
  'Hebergement 13 nuits (hotels 3-4 etoiles et lodges de charme)',
  'Pension complete : petits-dejeuners, dejeuners et diners',
  'Tous les transferts et transports internes',
  'Guide culturel francophone dedie au groupe',
  'Toutes les entrees, visites et activites du programme',
  'Assurance locale',
  'Support WhatsApp 24/7',
  'Ceremonie de bienvenue et diner de cloture',
]

const nonInclus = [
  'Vols internationaux (aller-retour)',
  'Assurance voyage internationale',
  'Depenses personnelles et pourboires',
  'Excursions optionnelles hors programme',
  'Visa (non requis pour les ressortissants francais)',
]

const pricingTiers = [
  {
    name: 'Early Bird',
    price: '2 200 EUR',
    period: '/ personne',
    features: [
      'Reservation 3+ mois avant le depart',
      'Programme complet 14 jours',
      'Hebergement et pension complete',
      'Guide et transports inclus',
      'Support WhatsApp 24/7',
      'Economisez 400 EUR',
    ],
    highlighted: true,
    ctaLabel: 'Reserver en Early Bird',
    ctaHref: 'https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20reserver%20le%20Retour%20aux%20Sources%20en%20Early%20Bird.',
  },
  {
    name: 'Tarif Normal',
    price: '2 600 EUR',
    period: '/ personne',
    features: [
      'Programme complet 14 jours',
      'Hebergement et pension complete',
      'Guide et transports inclus',
      'Support WhatsApp 24/7',
      'Places limitees a 15 personnes',
    ],
    highlighted: false,
    ctaLabel: 'Reserver ma place',
    ctaHref: 'https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20reserver%20le%20Retour%20aux%20Sources.',
  },
  {
    name: 'Tarif Enfants',
    price: '-25%',
    period: 'enfant 6-12 ans',
    features: [
      'Enfant 6-12 ans : -25% sur le tarif adulte',
      'Enfant de moins de 6 ans : -50%',
      'Meme programme, meme confort',
      'Activites adaptees a chaque age',
      'Encadrement renforce',
    ],
    highlighted: false,
    ctaLabel: 'Demander un devis famille',
    ctaHref: 'https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20un%20devis%20famille%20pour%20le%20Retour%20aux%20Sources.',
  },
]

const faqItems = [
  {
    q: 'Faut-il un visa pour le Senegal ?',
    a: 'Pour les ressortissants francais, aucun visa n\'est necessaire pour un sejour de moins de 90 jours. Un passeport valide 6 mois apres la date de retour suffit. Pour les autres nationalites, nous vous guidons dans les demarches.',
  },
  {
    q: 'Les vols sont-ils inclus ?',
    a: 'Non, les vols internationaux ne sont pas inclus. Cela vous permet de choisir votre compagnie, vos dates et vos options. Nous vous recommandons les meilleurs vols et horaires.',
  },
  {
    q: 'Qu\'en est-il de l\'assurance ?',
    a: 'Une assurance locale est incluse. Nous recommandons fortement de souscrire une assurance voyage internationale couvrant l\'annulation et le rapatriement. Nous pouvons vous conseiller.',
  },
  {
    q: 'A partir de quel age peut-on emmener des enfants ?',
    a: 'Le voyage est adapte des 3 ans. Les activites sont modulees selon les ages. Les enfants adorent les animaux de Bandia, les pirogues du Saloum et les plages de Saly.',
  },
  {
    q: 'Quel type d\'hebergement ?',
    a: 'Hotels 3 a 4 etoiles en ville, lodges de charme en brousse, residences privees en bord de mer. Toujours propre, confortable, avec climatisation et eau chaude.',
  },
  {
    q: 'Le confort est-il garanti ?',
    a: 'Oui. Immersion ne veut pas dire inconfort. Transport prive climatise, hebergements selectionnes, repas de qualite. Vous vivez l\'authenticite sans rien sacrifier.',
  },
  {
    q: 'Comment se fait le transport sur place ?',
    a: 'Minibus prive climatise avec chauffeur dedie. Pour certaines etapes (Sine Saloum, Lompoul), des vehicules 4x4 ou pirogues sont prevus.',
  },
  {
    q: 'Y a-t-il du temps libre ?',
    a: 'Oui. Chaque journee alterne entre activites de groupe et moments libres. Vous n\'etes jamais enferme dans un programme rigide.',
  },
  {
    q: 'Quelle est la taille du groupe ?',
    a: '8 a 15 personnes maximum. Assez pour creer des liens, assez peu pour rester intime. Roseline est presente sur chaque depart.',
  },
  {
    q: 'Quelle est la politique d\'annulation ?',
    a: 'Annulation gratuite jusqu\'a 60 jours avant le depart (remboursement integral de l\'acompte). Entre 30 et 60 jours : 50% rembourses. Moins de 30 jours : non remboursable.',
  },
]

export default function RetourAuxSourcesPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="VOYAGE IMMERSIF"
          title="Retour aux Sources"
          subtitle="14 jours pour se reconnecter a ses racines, avec ses enfants"
          badges={['14 jours', '8-15 personnes', 'Juillet-aout & decembre', 'A partir de 2 200 EUR']}
          ctaPrimary={{ label: 'Reserver mon depart 2027', href: '#reserver' }}
        />

        {/* La Promesse */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="LA PROMESSE"
              title="Ce voyage va changer quelque chose en vous"
              centered
            />
            <div className="mt-10 space-y-6 text-lg leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
              <p>
                Votre grand-mere vous parle du Senegal depuis que vous etes enfant. Vos parents y sont nes, y ont grandi, y ont aime. Et vous, vous n'y etes peut-etre jamais alle. Ou tres peu. Et jamais comme ca.
              </p>
              <p>
                Il y a des voyages qu'on fait. Et il y a des voyages qui vous transforment.
              </p>
              <p>
                Retour aux Sources n'est pas une visite guidee. C'est une reconnexion. Avec vos racines. Avec votre histoire. Avec la culture que vos parents ont portee jusqu'a vous. Et que vous allez a votre tour transmettre a vos enfants.
              </p>
              <p style={{ color: '#560E13', fontWeight: 600 }}>
                14 jours pour remonter le temps. 14 jours pour marcher ou vos grands-parents ont marche. 14 jours pour gouter ce qu'ils ont goute. 14 jours pour comprendre ce qu'ils ont voulu vous transmettre.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline - Itineraire */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="L'ITINERAIRE"
              title="14 jours a travers le Senegal"
              subtitle="De Dakar a Saint-Louis, en passant par le Saloum et la Petite Cote."
              centered
            />
            <div className="mt-14">
              <TimelineSection days={timelineDays} />
            </div>
          </div>
        </section>

        {/* Pour Qui */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="POUR QUI"
              title="Ce voyage est fait pour vous si..."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={pourQuiFeatures} />
            </div>
          </div>
        </section>

        {/* Inclus / Non inclus */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="LE DETAIL"
              title="Ce qui est inclus"
              centered
            />
            <div className="mt-14 grid md:grid-cols-2 gap-8">
              <div
                className="rounded-xl p-8"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <h3
                  className="text-xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    color: '#560E13',
                  }}
                >
                  Inclus dans le prix
                </h3>
                <ul className="space-y-3">
                  {inclus.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(10,10,10,0.75)' }}>
                      <span style={{ color: '#F6C961' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-xl p-8"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <h3
                  className="text-xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    color: '#0A0A0A',
                  }}
                >
                  Non inclus
                </h3>
                <ul className="space-y-3">
                  {nonInclus.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(10,10,10,0.75)' }}>
                      <span style={{ color: 'rgba(10,10,10,0.3)' }} className="mt-0.5 flex-shrink-0">&#10005;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Temoignages */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TEMOIGNAGES"
              title="Ils l'ont vecu"
              subtitle="Des voyageurs de la diaspora partagent leur experience."
              centered
            />
            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} name={t.name} location={t.location} quote={t.quote} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TARIFS"
              title="Investissez dans vos racines"
              centered
            />
            <p className="text-center mt-4 mb-14 text-sm font-semibold" style={{ color: '#560E13' }}>
              Dates : 12-26 juillet 2027 | 19 dec. 2027 - 2 jan. 2028
            </p>
            <PricingTable tiers={pricingTiers} />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="FAQ"
              title="Vos questions, nos reponses"
              centered
            />
            <div className="mt-14">
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="reserver" className="py-20 px-6" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
              }}
            >
              Pret a vivre cette experience ?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Les places sont limitees a 15 personnes par depart. Reservez votre place des maintenant avec un acompte de 30%.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20reserver%20mon%20acompte%20pour%20Retour%20aux%20Sources."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Reserver mon acompte
              </a>
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20j%27ai%20des%20questions%20sur%20Retour%20aux%20Sources."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FEFCF9',
                  border: '2px solid rgba(254,252,249,0.4)',
                }}
              >
                Ecrire a Roseline sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
