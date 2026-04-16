import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import FeatureGrid from '@/components/FeatureGrid'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Consulting Stratégique | Roseline Ngom',
  description: 'Audit stratégique, accompagnement et conseil institutionnel pour vos projets en Afrique de l\'Ouest.',
  openGraph: {
    title: 'Consulting Stratégique | Roseline Ngom',
    description: 'Audit stratégique, accompagnement et conseil institutionnel pour vos projets en Afrique de l\'Ouest.',
  },
}

const services = [
  {
    title: 'Audit Strategique',
    duration: '3 semaines',
    price: '1 800 EUR',
    tagline: 'Un diagnostic complet avant de prendre votre decision.',
    href: '/consulting/audit-strategique',
  },
  {
    title: 'Accompagnement',
    duration: '3 a 12 mois',
    price: '3 500 - 10 000 EUR',
    tagline: 'Votre co-pilote strategique. De la vision a l\'execution.',
    href: '/consulting/accompagnement',
  },
  {
    title: 'Conseil Institutionnel',
    duration: 'Variable',
    price: '1 200 EUR / jour',
    tagline: 'Expertise tourisme, culture et diaspora pour les institutions.',
    href: '/consulting/institutionnel',
  },
]

const credibiliteFeatures = [
  {
    icon: 'AFD',
    title: 'Laureate AFD MEET AFRICA',
    description: 'Selectionnee par l\'Agence Francaise de Developpement parmi les entrepreneurs les plus prometteurs du continent africain.',
  },
  {
    icon: 'P',
    title: 'Partenariats MONCAP / APIX',
    description: 'Collaborations actives avec les institutions senegalaises de promotion de l\'investissement et de la diaspora.',
  },
  {
    icon: '10',
    title: '10 ans de terrain',
    description: 'Plus de 10 ans a operer au Senegal. Pas depuis un bureau a Paris. Sur le terrain. Chaque jour.',
  },
  {
    icon: '24K',
    title: 'Communaute de 24 000+',
    description: 'Une communaute engagee de voyageurs, entrepreneurs et acteurs culturels de la diaspora senegalaise.',
  },
]

const faqItems = [
  {
    q: 'En quoi votre consulting est-il different des cabinets classiques ?',
    a: 'Je ne suis pas un cabinet. Je suis une operatrice terrain. J\'ai cree et gere des entreprises au Senegal pendant 10 ans. Mes recommandations viennent de l\'experience, pas de modeles theoriques.',
  },
  {
    q: 'Travaillez-vous uniquement sur le Senegal ?',
    a: 'Mon expertise principale est le Senegal et l\'Afrique de l\'Ouest. Mais les methodes s\'appliquent a tout projet tourisme ou culture sur le continent africain.',
  },
  {
    q: 'Les missions se font-elles en presentiel ou a distance ?',
    a: 'Les deux. La plupart des missions debutent par des visios, avec des deplacements terrain quand le projet le necessite. Les frais de deplacement sont en supplement.',
  },
  {
    q: 'Quel est le delai pour demarrer une mission ?',
    a: 'En general, 2 a 3 semaines apres la signature. Cela depend de la complexite et de mon planning. Un appel decouverte permet de caler les dates.',
  },
  {
    q: 'Proposez-vous des tarifs adaptes pour les startups ?',
    a: 'Oui. Les clients TripAfro existants beneficient de tarifs preferentiels. Et pour les projets a fort impact social, je peux adapter ma proposition.',
  },
]

export default function ConsultingPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="CONSULTING STRATEGIQUE"
          title="Vous avez la vision. Je vous donne la strategie."
          subtitle="Tourisme, culture, diaspora : 10 ans d'expertise terrain au Senegal"
          ctaPrimary={{ label: 'Decouvrir les offres', href: '#services' }}
          ctaSecondary={{ label: 'Reserver un appel', href: '#calendly' }}
        />

        {/* 3 Service Cards */}
        <section id="services" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Trois facons de travailler ensemble
            </h2>
            <p className="text-center mb-14 text-lg" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Chaque projet est unique. Choisissez la formule qui correspond a votre besoin.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
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
                      {s.duration}
                    </span>
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p
                      className="text-base italic mb-4 leading-relaxed flex-1"
                      style={{ color: 'rgba(10,10,10,0.7)' }}
                    >
                      {s.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: '#560E13' }}>
                        {s.price}
                      </span>
                      <span
                        className="text-sm font-semibold group-hover:translate-x-1 transition-transform"
                        style={{ color: '#F6C961' }}
                      >
                        En savoir plus &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Credibilite */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Pourquoi me faire confiance
            </h2>
            <p className="text-center mb-14 text-lg max-w-2xl mx-auto" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Les resultats parlent. Les partenariats aussi.
            </p>
            <FeatureGrid features={credibiliteFeatures} />
          </div>
        </section>

        {/* Calendly */}
        <section id="calendly" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Reservez votre appel decouverte
            </h2>
            <p className="text-center mb-10 text-lg" style={{ color: 'rgba(10,10,10,0.6)' }}>
              15 minutes. Gratuit. Sans engagement. On parle de votre projet.
            </p>
            <CalendlyEmbed url="https://calendly.com/roselinengom/decouverte-15min" />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
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
      </main>
      <Footer />
    </>
  )
}
