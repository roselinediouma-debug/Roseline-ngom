import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import TimelineSection from '@/components/TimelineSection'
import PricingTable from '@/components/PricingTable'
import FAQAccordion from '@/components/FAQAccordion'
import CandidatureForm from '@/components/CandidatureForm'

export const metadata: Metadata = {
  title: 'Back to Senegal | Programme entrepreneurial',
  description: 'Programme de 7 jours pour entrepreneurs de la diaspora. Rendez-vous institutionnels, networking, accompagnement projet.',
  openGraph: {
    title: 'Back to Senegal | Programme entrepreneurial',
    description: 'Programme de 7 jours pour entrepreneurs de la diaspora. Rendez-vous institutionnels, networking, accompagnement projet.',
  },
}

const timelineDays = [
  {
    day: 'Jour 1',
    title: 'Arrivee & cadrage',
    location: 'Dakar',
    highlights: [
      'Accueil a l\'aeroport et transfert hotel',
      'Presentation du programme et des intervenants',
      'Diagnostic individuel : ou en est votre projet ?',
      'Diner de bienvenue et networking',
    ],
  },
  {
    day: 'Jour 2-3',
    title: 'Institutions & financement',
    location: 'Dakar',
    highlights: [
      'Visite et echanges avec la FAISE (Fonds d\'Appui a l\'Investissement des Senegalais de l\'Exterieur)',
      'Rencontre DER/FJ : mecanismes de financement diaspora',
      'Presentation APIX : cadre juridique et incitations fiscales',
      'Banques partenaires : options de credit et garanties',
    ],
  },
  {
    day: 'Jour 4-5',
    title: 'Terrain & reseau',
    location: 'Dakar & regions',
    highlights: [
      'Visites de sites potentiels pour vos projets',
      'Rencontres avec des entrepreneurs de la diaspora deja installes',
      'Networking structure avec l\'ecosysteme local',
      'Retours d\'experience : ce qui marche, ce qui ne marche pas',
    ],
  },
  {
    day: 'Jour 6',
    title: 'Strategie & plan d\'action',
    location: 'Dakar',
    highlights: [
      'Ateliers en petit groupe : affiner votre business model',
      'Preparation du pitch : presenter votre projet en 5 minutes',
      'Session de feedback avec des mentors locaux',
      'Redaction de votre feuille de route individuelle',
    ],
  },
  {
    day: 'Jour 7',
    title: 'Cloture & engagement',
    location: 'Dakar',
    highlights: [
      'Presentation des feuilles de route individuelles',
      'Ceremonie de cloture officielle',
      'Remise des attestations',
      'Engagement de suivi 6 mois avec l\'equipe TripAfro',
    ],
  },
]

const partenaires = [
  { name: 'APIX', description: 'Agence de Promotion des Investissements et des Grands Travaux' },
  { name: 'DER/FJ', description: 'Delegation Generale a l\'Entrepreneuriat Rapide des Femmes et des Jeunes' },
  { name: 'FAISE', description: 'Fonds d\'Appui a l\'Investissement des Senegalais de l\'Exterieur' },
  { name: 'MONCAP Diaspora', description: 'Mecanisme de garantie pour les investissements diaspora' },
  { name: 'CESAG', description: 'Centre Africain d\'Etudes Superieures en Gestion' },
]

const inclus = [
  'Hebergement 6 nuits en hotel 4 etoiles a Dakar',
  'Pension complete : petits-dejeuners, dejeuners et diners',
  'Tous les transferts et transports internes',
  'Acces a toutes les sessions institutionnelles',
  'Materiel pedagogique et supports de travail',
  'Networking structures avec les partenaires',
  'Diagnostic individuel et feuille de route personnalisee',
  'Suivi post-programme 6 mois (visio mensuelle)',
  'Certificat de participation',
  'Support WhatsApp 24/7',
]

const pricingTiers = [
  {
    name: 'Early Bird',
    price: '3 800 EUR',
    period: '/ participant',
    features: [
      'Reservation 3+ mois avant le depart',
      'Programme complet 7 jours',
      'Hebergement 4 etoiles + pension complete',
      'Acces institutionnel complet',
      'Suivi 6 mois inclus',
      'Economisez 700 EUR',
    ],
    highlighted: true,
    ctaLabel: 'Postuler en Early Bird',
    ctaHref: '#candidature',
  },
  {
    name: 'Tarif Normal',
    price: '4 500 EUR',
    period: '/ participant',
    features: [
      'Programme complet 7 jours',
      'Hebergement 4 etoiles + pension complete',
      'Acces institutionnel complet',
      'Suivi 6 mois inclus',
      'Places limitees a 12 participants',
    ],
    highlighted: false,
    ctaLabel: 'Postuler au programme',
    ctaHref: '#candidature',
  },
  {
    name: 'VIP',
    price: '6 500 EUR',
    period: '/ participant',
    features: [
      'Tout le programme Normal, plus :',
      'Suite hotel au lieu de chambre standard',
      '2 sessions individuelles avec Roseline',
      'Mise en relation premium avec 3 contacts cles',
      'Suivi 12 mois (au lieu de 6)',
      'Acces prioritaire aux editions suivantes',
    ],
    highlighted: false,
    ctaLabel: 'Postuler en VIP',
    ctaHref: '#candidature',
  },
]

const faqItems = [
  {
    q: 'Qui peut postuler a Back to Senegal ?',
    a: 'Tout membre de la diaspora (senegalaise ou africaine) residant a l\'etranger, porteur d\'un projet d\'investissement ou d\'installation au Senegal. Le programme est selectionne sur dossier.',
  },
  {
    q: 'Faut-il deja avoir un projet structure ?',
    a: 'Non. Vous pouvez etre au stade de l\'idee. Le programme vous aide justement a passer de l\'idee au projet concret, avec un plan d\'action clair.',
  },
  {
    q: 'Combien de participants par edition ?',
    a: '8 a 12 participants maximum par edition. C\'est volontairement restreint pour garantir un accompagnement personnalise et des echanges de qualite.',
  },
  {
    q: 'Les vols sont-ils inclus ?',
    a: 'Non, les vols internationaux ne sont pas inclus. Cela vous permet de choisir vos dates et votre compagnie. Nous vous conseillons sur les meilleurs vols.',
  },
  {
    q: 'Quel est le processus de selection ?',
    a: 'Vous remplissez le formulaire de candidature. Nous etudions votre profil et votre projet. Un entretien visio de 20 minutes finalise la selection. Reponse sous 10 jours.',
  },
  {
    q: 'En quoi consiste le suivi post-programme ?',
    a: 'Un suivi de 6 mois (12 mois en VIP) avec une visio mensuelle, un acces au reseau des alumni, et un support par email et WhatsApp pour avancer sur votre feuille de route.',
  },
  {
    q: 'Les partenaires institutionnels sont-ils garantis ?',
    a: 'Oui. Les partenariats avec APIX, DER/FJ, FAISE et MONCAP Diaspora sont contractualises. Les intervenants sont confirmes pour chaque edition.',
  },
  {
    q: 'Quelle est la politique d\'annulation ?',
    a: 'Annulation gratuite jusqu\'a 60 jours avant le depart. Entre 30 et 60 jours : 50% rembourses. Moins de 30 jours : non remboursable. Une assurance annulation est recommandee.',
  },
]

export default function BackToSenegalPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="PROGRAMME INSTITUTIONNEL"
          title="Back to Senegal"
          subtitle="7 jours pour passer de l'idee au projet concret, soutenus par les institutions"
          badges={['Programme institutionnel', 'FAISE, DER/FJ, APIX', '8 a 12 participants', 'Selection sur dossier']}
          ctaPrimary={{ label: 'Postuler au programme', href: '#candidature' }}
        />

        {/* Le Probleme */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="LE CONSTAT"
              title="Pourquoi votre projet n'avance pas"
              centered
            />
            <div className="mt-10 space-y-6">
              {[
                'Vous avez une idee depuis des mois, peut-etre des annees. Mais vous ne savez pas par ou commencer.',
                'Vous ne connaissez pas les bons interlocuteurs sur place. Les institutions vous semblent opaques, inaccessibles.',
                'Vous avez peur de vous faire arnaquer. De perdre votre argent. De faire confiance aux mauvaises personnes.',
                'Vous manquez d\'un reseau local solide. Les contacts WhatsApp ne suffisent pas.',
                'Vous avez besoin d\'un cadre, d\'un accompagnement, d\'un programme qui vous prend par la main et vous emmene jusqu\'au bout.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(86,14,19,0.08)', color: '#560E13' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-lg font-semibold text-center" style={{ color: '#560E13' }}>
              Back to Senegal existe pour debloquer exactement ca.
            </p>
          </div>
        </section>

        {/* Programme 7 jours */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="LE PROGRAMME"
              title="7 jours qui vont tout changer"
              subtitle="Un programme dense, structure, avec des resultats concrets."
              centered
            />
            <div className="mt-14">
              <TimelineSection days={timelineDays} />
            </div>
          </div>
        </section>

        {/* Partenaires Institutionnels */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="NOS PARTENAIRES"
              title="Soutenus par les institutions"
              subtitle="Des partenariats officiels pour des resultats concrets."
              centered
            />
            <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-6">
              {partenaires.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 flex flex-col items-center text-center"
                  style={{
                    backgroundColor: '#F8F5F0',
                    border: '1px solid rgba(86,14,19,0.08)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                    style={{ backgroundColor: '#560E13', color: '#F6C961' }}
                  >
                    {p.name.slice(0, 2)}
                  </div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#560E13' }}>{p.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(10,10,10,0.5)' }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inclus */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="TOUT EST INCLUS"
              title="Ce que comprend le programme"
              centered
            />
            <div
              className="mt-10 rounded-xl p-8"
              style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
            >
              <ul className="space-y-3">
                {inclus.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(10,10,10,0.75)' }}>
                    <span style={{ color: '#F6C961' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Suivi Post-Programme */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="APRES LE PROGRAMME"
              title="Un suivi de 6 mois pour concretiser"
              centered
            />
            <div className="mt-10 space-y-6 text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
              <p>
                Le programme ne s'arrete pas a l'aeroport. Pendant 6 mois apres votre retour, vous beneficiez d'un accompagnement structure.
              </p>
              <p>
                Chaque mois, une visio individuelle avec l'equipe TripAfro pour faire le point sur votre feuille de route. Ou en etes-vous ? Quels obstacles ? Quelles prochaines etapes ?
              </p>
              <p>
                Vous gardez acces au reseau des alumni Back to Senegal : des entrepreneurs de la diaspora qui partagent les memes defis que vous. Entraide, contacts, opportunites.
              </p>
              <p>
                Support par email et WhatsApp pour les questions ponctuelles. Mise en relation avec des prestataires locaux de confiance si besoin.
              </p>
              <p style={{ color: '#560E13', fontWeight: 600 }}>
                Notre objectif : que 80% des participants aient lance une action concrete dans les 6 mois suivant le programme.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TARIFS"
              title="Investissez dans votre projet"
              centered
            />
            <p className="text-center mt-4 mb-14 text-sm font-semibold" style={{ color: '#560E13' }}>
              Edition 1 : 8-14 fevrier 2027 | Edition 2 : 5-11 juillet 2027
            </p>
            <PricingTable tiers={pricingTiers} />
          </div>
        </section>

        {/* Formulaire Candidature */}
        <section id="candidature" className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="CANDIDATURE"
              title="Postulez au programme"
              subtitle="Selection sur dossier. Reponse sous 10 jours ouvrables."
              centered
            />
            <div className="mt-10">
              <CandidatureForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader eyebrow="FAQ" title="Questions frequentes" centered />
            <div className="mt-14">
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
              }}
            >
              Votre projet merite mieux qu'un fichier Word oublie sur votre bureau
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(254,252,249,0.75)' }}>
              7 jours. Des institutions. Un reseau. Un plan d'action. Tout ce qu'il vous manque pour avancer, enfin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#candidature"
                className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Postuler maintenant
              </a>
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20des%20informations%20sur%20Back%20to%20Senegal."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FEFCF9',
                  border: '2px solid rgba(254,252,249,0.4)',
                }}
              >
                Parler a Roseline
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
