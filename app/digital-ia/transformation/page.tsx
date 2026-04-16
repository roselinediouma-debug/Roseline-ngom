import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import ProcessSteps from '@/components/ProcessSteps'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Transformation Digitale | 8 500-15 000 €',
  description: 'Modernisez votre entreprise. Site web, CRM, automatisation, formation équipe. Accompagnement complet.',
  openGraph: {
    title: 'Transformation Digitale | 8 500-15 000 €',
    description: 'Modernisez votre entreprise. Site web, CRM, automatisation, formation équipe. Accompagnement complet.',
  },
}

const features = [
  {
    icon: '\ud83c\udf10',
    title: 'Site web moderne',
    description: 'Un site professionnel, rapide et optimise pour le mobile. Vitrine ou e-commerce, concu pour convertir vos visiteurs en clients.',
  },
  {
    icon: '\ud83d\udcdd',
    title: 'CRM et gestion clients',
    description: 'Centralisez vos contacts, suivez vos prospects et automatisez vos relances. Fini les fichiers Excel et les opportunites perdues.',
  },
  {
    icon: '\u2699\ufe0f',
    title: 'Automatisation processus',
    description: 'Factures, devis, emails, rappels : automatisez les taches repetitives pour que votre equipe se concentre sur l\u2019essentiel.',
  },
  {
    icon: '\ud83d\udcb3',
    title: 'Integration paiement',
    description: 'Paiement en ligne, mobile money, virement : mettez en place les solutions de paiement adaptees a vos marches.',
  },
  {
    icon: '\ud83c\udf93',
    title: 'Formation equipe',
    description: 'Votre equipe est formee a utiliser chaque outil. Pas de dependance externe. Vous etes autonomes des la livraison.',
  },
  {
    icon: '\ud83d\udee1\ufe0f',
    title: 'Support 6 mois',
    description: 'Apres la mise en ligne, 6 mois de support technique et d\u2019accompagnement pour garantir une adoption reussie.',
  },
]

const processSteps = [
  {
    number: 1,
    title: 'Diagnostic',
    description: 'Audit complet de vos outils actuels, vos processus et vos besoins. On identifie les priorites.',
  },
  {
    number: 2,
    title: 'Conception',
    description: 'Architecture de la solution, choix des outils, maquettes et validation avec votre equipe.',
  },
  {
    number: 3,
    title: 'Developpement',
    description: 'Mise en place technique : site, CRM, automatisations, integrations. Tests a chaque etape.',
  },
  {
    number: 4,
    title: 'Migration',
    description: 'Transfert de vos donnees existantes, parametrage final et verification complete avant la mise en production.',
  },
  {
    number: 5,
    title: 'Formation',
    description: 'Sessions de formation pratique pour votre equipe. Documentation et support pour une prise en main sereine.',
  },
]

const faqItems = [
  {
    q: 'Combien de temps dure une transformation digitale complete ?',
    a: 'Entre 6 et 12 semaines selon la complexite du projet. Un site vitrine simple peut etre livre en 4 semaines. Un projet complet avec CRM, automatisations et e-commerce prend 8 a 12 semaines.',
  },
  {
    q: 'Est-ce que vous travaillez avec des entreprises basees en Afrique ?',
    a: 'Oui, c\u2019est notre specialite. Nous connaissons les contraintes locales : connectivite, solutions de paiement, habitudes utilisateurs. Nos solutions sont concues pour fonctionner dans le contexte africain.',
  },
  {
    q: 'Quelles technologies utilisez-vous ?',
    a: 'Nous privilegions des outils modernes, fiables et abordables : WordPress ou Next.js pour les sites, HubSpot ou Notion pour le CRM, Zapier ou Make pour l\u2019automatisation. Le choix depend de vos besoins et de votre budget.',
  },
  {
    q: 'Que se passe-t-il apres la livraison ?',
    a: 'Vous beneficiez de 6 mois de support technique inclus. Votre equipe est formee. Et si vous souhaitez continuer a evoluer, nous proposons des forfaits de maintenance mensuels.',
  },
  {
    q: 'Comment se decompose le tarif ?',
    a: 'Le tarif de 8 500 a 15 000 \u20ac couvre le diagnostic, la conception, le developpement, la migration, la formation et 6 mois de support. Le montant exact depend du perimetre du projet, defini ensemble lors du diagnostic.',
  },
]

export default function TransformationPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="TRANSFORMATION DIGITALE"
          title="Passez au digital. Pour de vrai."
          subtitle="Site web, CRM, automatisation : une refonte complete de vos outils et processus pour faire entrer votre entreprise dans l\u2019ere numerique."
          badges={['Site web', 'Automatisation', 'CRM', '8 500-15 000 \u20ac']}
          ctaPrimary={{ label: 'Lancer mon projet', href: '#cta' }}
          ctaSecondary={{ label: 'Voir le processus', href: '#processus' }}
        />

        {/* Probleme */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="LE CONSTAT"
              title="Vos outils vous ralentissent"
              centered
            />
            <div className="mt-8 space-y-4 text-left">
              {[
                'Votre site web date de 2015 et ne genere aucun lead',
                'Vous gerez vos clients sur Excel ou dans un cahier',
                'Vos processus sont manuels : devis, factures, relances',
                'Vous perdez du temps sur des taches que la technologie pourrait faire a votre place',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: '#F8F5F0' }}
                >
                  <span style={{ color: '#560E13' }} className="mt-0.5 flex-shrink-0 text-lg font-bold">&times;</span>
                  <p style={{ color: 'rgba(10,10,10,0.75)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="LA SOLUTION"
              title="Une infrastructure digitale complete"
              subtitle="Tout ce dont votre entreprise a besoin pour operer efficacement dans le monde numerique."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={features} />
            </div>
          </div>
        </section>

        {/* Processus */}
        <section id="processus" className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="PROCESSUS"
              title="5 phases pour une transformation reussie"
              centered
            />
            <div className="mt-14">
              <ProcessSteps steps={processSteps} />
            </div>
          </div>
        </section>

        {/* Prix */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="TARIF"
              title="Un investissement mesurable"
              centered
            />
            <div className="mt-10 inline-block rounded-xl p-8" style={{ backgroundColor: '#FEFCF9', border: '2px solid #F6C961' }}>
              <p className="text-5xl font-bold mb-2" style={{ color: '#0A0A0A' }}>8 500 - 15 000 \u20ac</p>
              <p className="text-lg mb-4" style={{ color: 'rgba(10,10,10,0.6)' }}>Projet cle en main avec 6 mois de support</p>
              <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}>
                <p className="text-sm font-semibold" style={{ color: '#560E13' }}>
                  Diagnostic + Conception + Developpement + Formation + Support inclus
                </p>
              </div>
            </div>
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

        {/* CTA final */}
        <section id="cta" className="py-20 px-6" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
              }}
            >
              Pret a transformer votre entreprise ?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Reservez un appel decouverte de 15 minutes. On parle de votre projet et on definit les priorites ensemble.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://calendly.com/roselinengom/decouverte-15min"
                className="inline-block px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: '#F6C961',
                  color: '#560E13',
                }}
              >
                Reserver un appel
              </Link>
              <Link
                href="https://wa.me/33650329808"
                className="inline-block px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FEFCF9',
                  border: '2px solid rgba(254,252,249,0.4)',
                }}
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
