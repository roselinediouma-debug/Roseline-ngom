import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import FeatureGrid from '@/components/FeatureGrid'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Voyages TripAfro | Roseline Ngom',
  description: 'Découvrez nos voyages immersifs au Sénégal : Retour aux Sources, Voyage Signature, Back to Senegal. Organisés par Roseline Ngom.',
  openGraph: {
    title: 'Voyages TripAfro | Roseline Ngom',
    description: 'Découvrez nos voyages immersifs au Sénégal : Retour aux Sources, Voyage Signature, Back to Senegal. Organisés par Roseline Ngom.',
  },
}

const voyages = [
  {
    title: 'Retour aux Sources',
    duration: '14 jours',
    price: 'A partir de 2 200 EUR',
    tagline: 'Se reconnecter a ses racines, avec ses enfants',
    href: '/voyages/retour-aux-sources',
    icon: '1',
  },
  {
    title: 'Voyage Signature',
    duration: 'Sur mesure',
    price: 'Sur devis',
    tagline: 'Votre Senegal. Votre rythme. Votre histoire.',
    href: '/voyages/voyage-signature',
    icon: '2',
  },
  {
    title: 'Back to Senegal',
    duration: '7 jours',
    price: 'A partir de 3 800 EUR',
    tagline: 'Passer de l\'idee au projet concret',
    href: '/voyages/back-to-senegal',
    icon: '3',
  },
]

const pourquoiFeatures = [
  {
    icon: '10+',
    title: '10 ans de terrain',
    description: 'Plus de 10 ans a organiser des voyages au Senegal. Chaque partenaire, chaque hebergement, chaque guide a ete teste personnellement.',
  },
  {
    icon: 'R',
    title: 'Roseline presente sur chaque depart',
    description: 'Ce n\'est pas un catalogue. C\'est une experience humaine. Roseline accompagne chaque groupe, du premier jour au dernier.',
  },
  {
    icon: 'P',
    title: 'Partenariats institutionnels',
    description: 'APIX, DER/FJ, FAISE, MONCAP Diaspora : des partenaires officiels pour des voyages qui ont du poids et de la credibilite.',
  },
  {
    icon: '24K',
    title: 'Une communaute de 24 000+ voyageurs',
    description: 'Rejoignez une communaute active de voyageurs qui partagent leurs experiences, leurs conseils et leurs coups de coeur.',
  },
]

const faqItems = [
  {
    q: 'Faut-il un visa pour le Senegal ?',
    a: 'Pour les ressortissants francais, aucun visa n\'est necessaire pour un sejour de moins de 90 jours. Un passeport valide 6 mois apres la date de retour suffit. Nous vous envoyons un memo complet a la reservation.',
  },
  {
    q: 'Les vols sont-ils inclus dans le prix ?',
    a: 'Non, les vols internationaux ne sont pas inclus. Cela vous permet de choisir votre compagnie, vos dates exactes et vos options de confort. Nous vous conseillons sur les meilleurs vols.',
  },
  {
    q: 'Les voyages sont-ils adaptes aux enfants ?',
    a: 'Oui. Le voyage Retour aux Sources est specialement concu pour les familles. Les activites sont pensees pour tous les ages, et des tarifs reduits s\'appliquent pour les enfants.',
  },
  {
    q: 'Quel est le niveau de confort ?',
    a: 'Nous selectionnons des hebergements de qualite : hotels 3 a 4 etoiles, lodges de charme, residences privees. Immersion ne veut pas dire inconfort.',
  },
  {
    q: 'Comment reserver ?',
    a: 'Contactez Roseline par WhatsApp ou via le formulaire de la page du voyage qui vous interesse. Un acompte de 30% confirme votre place. Le solde est du 30 jours avant le depart.',
  },
]

export default function VoyagesPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          title="Le Senegal qu'on ne vous a jamais raconte"
          subtitle="Voyages immersifs pour la diaspora, les voyageurs curieux, et ceux qui veulent construire au Senegal"
          ctaPrimary={{ label: 'Decouvrir les 3 voyages', href: '#voyages' }}
        />

        {/* Nos 3 voyages */}
        <section id="voyages" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Nos 3 voyages
            </h2>
            <p className="text-center mb-14 text-lg" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Trois facons de vivre le Senegal. Laquelle est la votre ?
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {voyages.map((v) => (
                <Link
                  key={v.title}
                  href={v.href}
                  className="group rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: '#FEFCF9',
                    border: '1px solid rgba(86,14,19,0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    className="h-48 flex flex-col items-center justify-center text-center px-6"
                    style={{ background: 'linear-gradient(135deg, #560E13 0%, #3d0a0e 100%)' }}
                  >
                    <span
                      className="text-sm uppercase tracking-widest mb-3 font-semibold"
                      style={{ color: '#F6C961' }}
                    >
                      {v.duration}
                    </span>
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                    >
                      {v.title}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p
                      className="text-base italic mb-4 leading-relaxed flex-1"
                      style={{ color: 'rgba(10,10,10,0.7)' }}
                    >
                      &laquo; {v.tagline} &raquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: '#560E13' }}>
                        {v.price}
                      </span>
                      <span
                        className="text-sm font-semibold group-hover:translate-x-1 transition-transform"
                        style={{ color: '#F6C961' }}
                      >
                        Decouvrir &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi TripAfro */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Pourquoi TripAfro
            </h2>
            <p className="text-center mb-14 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Ce qui nous differencie, c'est simple : on connait le terrain. Pas depuis un bureau. Depuis le terrain.
            </p>
            <FeatureGrid features={pourquoiFeatures} />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-14"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Questions frequentes
            </h2>
            <FAQAccordion items={faqItems} />
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
              Pret a vivre le Senegal autrement ?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Parlez directement a Roseline. Elle repond personnellement a chaque message.
            </p>
            <a
              href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20voyages."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Parler a Roseline
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
