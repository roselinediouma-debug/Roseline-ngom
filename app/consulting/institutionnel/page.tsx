import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Conseil Institutionnel | Roseline Ngom',
  description: 'Missions de conseil pour institutions et organisations. Expertise Afrique de l\'Ouest, diaspora, développement.',
  openGraph: {
    title: 'Conseil Institutionnel | Roseline Ngom',
    description: 'Missions de conseil pour institutions et organisations. Expertise Afrique de l\'Ouest, diaspora, développement.',
  },
}

const typesDesMissions = [
  {
    icon: 'E',
    title: 'Etudes sectorielles',
    description: 'Analyses approfondies du marche touristique et culturel senegalais. Donnees terrain, tendances, opportunites d\'investissement.',
  },
  {
    icon: 'N',
    title: 'Notes strategiques',
    description: 'Syntheses operationnelles pour orienter les politiques publiques. Recommandations basees sur 10 ans de terrain.',
  },
  {
    icon: 'F',
    title: 'Formations',
    description: 'Interventions aupres des equipes institutionnelles sur le tourisme, la culture et la diaspora. Format atelier ou conference.',
  },
  {
    icon: 'J',
    title: 'Jurys et comites',
    description: 'Participation a des jurys de selection, comites de pilotage et instances de gouvernance du secteur tourisme et culture.',
  },
  {
    icon: 'V',
    title: 'Evenements',
    description: 'Conception et animation d\'evenements institutionnels : forums, tables rondes, missions economiques, salons professionnels.',
  },
]

const references = [
  {
    icon: 'SN',
    title: 'Institutions publiques senegalaises',
    description: 'Collaboration avec les agences et ministeres en charge du tourisme, de l\'investissement et de la promotion de la diaspora.',
  },
  {
    icon: 'OI',
    title: 'Organisations internationales',
    description: 'Partenariats avec des agences de developpement et organisations multilaterales intervenant en Afrique de l\'Ouest.',
  },
  {
    icon: 'FR',
    title: 'Collectivites territoriales francaises',
    description: 'Missions de conseil aupres de collectivites engagees dans la cooperation decentralisee avec le Senegal.',
  },
]

const faqItems = [
  {
    q: 'Quels types d\'institutions font appel a vous ?',
    a: 'Ministeres, agences de developpement, collectivites territoriales, organisations internationales, chambres de commerce. Tout acteur institutionnel implique dans le tourisme, la culture ou la diaspora en Afrique de l\'Ouest.',
  },
  {
    q: 'Intervenez-vous en dehors du Senegal ?',
    a: 'Mon expertise principale est le Senegal et la sous-region ouest-africaine. Je peux intervenir sur des missions plus larges si le sujet touche au tourisme, a la culture ou a la diaspora africaine.',
  },
  {
    q: 'Comment se deroule la contractualisation ?',
    a: 'Je travaille soit au forfait projet, soit au tarif journalier de 1 200 EUR. Une proposition detaillee est envoyee apres le premier echange. Les conditions sont adaptees aux procedures de chaque institution.',
  },
  {
    q: 'Avez-vous des references verifiables ?',
    a: 'Oui. Laureate AFD MEET AFRICA, partenariats MONCAP et APIX, interventions lors de forums institutionnels. Les references detaillees sont communiquees sur demande.',
  },
  {
    q: 'Quel est votre delai de mobilisation ?',
    a: 'En general, 2 a 4 semaines. Pour les missions urgentes, je peux m\'organiser plus rapidement. Un premier echange permet de caler le planning.',
  },
]

export default function InstitutionnelPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="CONSEIL INSTITUTIONNEL"
          title="Conseil Institutionnel"
          subtitle="Expertise pointue sur le tourisme, la culture et la diaspora senegalaise"
          ctaPrimary={{ label: 'Demander une proposition', href: '#calendly' }}
        />

        {/* Intro */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'rgba(10,10,10,0.8)' }}>
              Pour les ministeres, agences de developpement, collectivites territoriales et organisations internationales.
            </p>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Vous avez besoin d'une expertise terrain, pas d'un rapport theorique. 10 ans d'operations au Senegal. Des donnees de premiere main. Une connaissance intime du secteur.
            </p>
          </div>
        </section>

        {/* Types de missions */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="MISSIONS"
              title="Types de missions"
              subtitle="Des formats adaptes aux besoins institutionnels."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={typesDesMissions} />
            </div>
          </div>
        </section>

        {/* References */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="REFERENCES"
              title="Ils nous font confiance"
              subtitle="Des collaborations avec des acteurs de premier plan."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={references} />
            </div>
          </div>
        </section>

        {/* Tarif */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="TARIFICATION"
              title="Tarifs clairs et transparents"
              centered
            />
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="rounded-xl p-8" style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.1)' }}>
                <p className="text-sm uppercase tracking-widest mb-3 font-semibold" style={{ color: '#560E13' }}>
                  Tarif journalier
                </p>
                <p className="text-4xl font-bold mb-2" style={{ color: '#0A0A0A' }}>1 200 EUR</p>
                <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>Par jour d'intervention</p>
              </div>
              <div className="rounded-xl p-8" style={{ backgroundColor: '#FEFCF9', border: '2px solid #F6C961' }}>
                <p className="text-sm uppercase tracking-widest mb-3 font-semibold" style={{ color: '#560E13' }}>
                  Forfait projet
                </p>
                <p className="text-4xl font-bold mb-2" style={{ color: '#0A0A0A' }}>Sur devis</p>
                <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>Adapte a la complexite de la mission</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calendly */}
        <section id="calendly" className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#0A0A0A',
              }}
            >
              Demander une proposition
            </h2>
            <p className="text-center mb-10 text-lg" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Echangeons sur votre mission. Nous vous adressons une proposition detaillee sous 48h.
            </p>
            <CalendlyEmbed url="https://calendly.com/roselinengom/decouverte-15min" />
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
      </main>
      <Footer />
    </>
  )
}
