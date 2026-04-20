import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import PricingTable from '@/components/PricingTable'
import ProcessSteps from '@/components/ProcessSteps'
import TestimonialCard from '@/components/TestimonialCard'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Accompagnement Stratégique | 3 à 12 mois',
  description: "Accompagnement personnalisé pour réussir votre projet en Afrique de l'Ouest. 3 formules de 3 500 à 10 000 €.",
  openGraph: {
    title: 'Accompagnement Stratégique | 3 à 12 mois',
    description: "Accompagnement personnalisé pour réussir votre projet en Afrique de l'Ouest. 3 formules de 3 500 à 10 000 €.",
  },
}

const tiers = [
  {
    name: 'Compact (3 mois)',
    price: '3 500 EUR',
    period: '/ 3 mois',
    features: [
      '6 visios strategiques',
      'Diagnostic initial',
      'Roadmap personnalisee',
      'Mise en relation x3',
    ],
    highlighted: false,
    ctaLabel: 'Choisir Compact',
    ctaHref: '#calendly',
  },
  {
    name: 'Standard (6 mois)',
    price: '6 500 EUR',
    period: '/ 6 mois',
    features: [
      '12 visios strategiques',
      'Diagnostic complet',
      'Roadmap detaillee',
      'Mise en relation x8',
      'Suivi KPIs mensuel',
    ],
    highlighted: true,
    ctaLabel: 'Choisir Standard',
    ctaHref: '#calendly',
  },
  {
    name: 'Complete (12 mois)',
    price: '10 000 EUR',
    period: '/ 12 mois',
    features: [
      '24 visios strategiques',
      'Diagnostic + audit digital',
      'Roadmap + execution',
      'Mise en relation illimitee',
      'Suivi KPIs + reporting',
    ],
    highlighted: false,
    ctaLabel: 'Choisir Complete',
    ctaHref: '#calendly',
  },
]

const processSteps = [
  {
    number: 1,
    title: 'Cadrage',
    description: 'On definit vos objectifs, vos contraintes et vos indicateurs de succes. Le point de depart de tout.',
  },
  {
    number: 2,
    title: 'Visios bimensuelles',
    description: 'Toutes les deux semaines, on fait le point. On ajuste la strategie. On resout les blocages.',
  },
  {
    number: 3,
    title: 'Livrables',
    description: 'Chaque session produit un livrable concret : plan d\'action, analyse, recommandation, outil.',
  },
  {
    number: 4,
    title: 'Mise en relation',
    description: 'Je vous connecte aux bonnes personnes : partenaires, fournisseurs, institutionnels, investisseurs.',
  },
  {
    number: 5,
    title: 'Bilan',
    description: 'En fin de mission, on mesure les resultats. On documente ce qui a ete fait. On planifie la suite.',
  },
]

const faqItems = [
  {
    q: 'Quelle est la difference entre les 3 formules ?',
    a: 'La duree et l\'intensite de l\'accompagnement. La formule Compact est ideale pour un cadrage rapide. La Standard est la plus populaire pour un vrai suivi strategique. La Complete inclut l\'execution et un suivi KPIs complet.',
  },
  {
    q: 'Peut-on changer de formule en cours de route ?',
    a: 'Oui. Vous pouvez upgrader a tout moment. Le montant deja paye est deduit. On ajuste sans friction.',
  },
  {
    q: 'Que signifie "mise en relation" concretement ?',
    a: 'Je vous mets en contact direct avec des acteurs cles de mon reseau : hoteliers, agents de voyage, institutionnels, investisseurs, fournisseurs. Des contacts qualifies, pas un carnet d\'adresses.',
  },
  {
    q: 'Les visios peuvent-elles etre remplacees par des rencontres ?',
    a: 'Oui, quand c\'est possible et pertinent. Les rencontres en presentiel sont plus riches. Les frais de deplacement sont en supplement.',
  },
  {
    q: 'Y a-t-il un engagement de resultat ?',
    a: 'Je m\'engage sur les moyens, pas sur les resultats. Mais en 10 ans, je n\'ai jamais eu un client qui n\'a pas progresse. La cle, c\'est l\'execution. Et c\'est pour ca qu\'on travaille ensemble.',
  },
]

export default function AccompagnementPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="ACCOMPAGNEMENT"
          title="Accompagnement Strategique"
          subtitle="Je suis votre co-pilote pendant 3, 6 ou 12 mois"
          ctaPrimary={{ label: 'Voir les formules', href: '#formules' }}
          ctaSecondary={{ label: 'Reserver un appel', href: '#calendly' }}
        />

        {/* Accroche */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'rgba(10,10,10,0.8)' }}>
              Un projet ne meurt jamais d'une mauvaise idee. Il meurt d'une mauvaise execution.
            </p>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
              Vous avez l'idee. Vous avez la motivation. Ce qui vous manque, c'est quelqu'un qui connait le terrain, qui a deja fait les erreurs, et qui peut vous faire gagner des mois.
            </p>
          </div>
        </section>

        {/* Formules */}
        <section id="formules" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="FORMULES"
              title="Choisissez votre niveau d'accompagnement"
              subtitle="Chaque formule inclut l'acces direct a Roseline par WhatsApp entre les sessions."
              centered
            />
            <div className="mt-14">
              <PricingTable tiers={tiers} />
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="COMMENT CA MARCHE"
              title="Un processus simple et structure"
              centered
            />
            <div className="mt-14">
              <ProcessSteps steps={processSteps} />
            </div>
          </div>
        </section>

        {/* Temoignages */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="TEMOIGNAGES"
              title="Ce qu'ils disent de l'accompagnement"
              centered
            />
            <div className="mt-14 grid md:grid-cols-2 gap-6">
              <TestimonialCard
                name="Amadou D."
                location="Hotelier, Saly"
                quote="Roseline m'a aide a repenser completement ma strategie commerciale. En 6 mois, mon taux de remplissage est passe de 45% a 72%. Elle connait le marche comme personne."
                stars={5}
              />
              <TestimonialCard
                name="Fatou M."
                location="Fondatrice, agence receptive Dakar"
                quote="Ce qui m'a le plus marquee, c'est la qualite de son reseau. Chaque mise en relation a debouche sur quelque chose de concret. Pas du brassage d'air. Du concret."
                stars={5}
              />
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
              Parlons de votre projet
            </h2>
            <p className="text-center mb-10 text-lg" style={{ color: 'rgba(10,10,10,0.6)' }}>
              15 minutes pour comprendre vos enjeux et identifier la bonne formule.
            </p>
            <CalendlyEmbed url="https://calendly.com/roselinengom" />
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
