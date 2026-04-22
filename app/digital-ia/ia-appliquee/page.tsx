import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import ProcessSteps from '@/components/ProcessSteps'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata = buildMetadata({
  title: 'IA Appliquée : 3 500-12 000 €',
  description: "Intégrez l'intelligence artificielle dans votre entreprise. Chatbots, automatisation, analyse données.",
  path: '/digital-ia/ia-appliquee',
})

const features = [
  {
    icon: '\ud83d\udd0d',
    title: 'Audit IA',
    description: 'Identification des processus ou l\u2019intelligence artificielle peut avoir le plus d\u2019impact dans votre entreprise. On cible les gains rapides.',
  },
  {
    icon: '\ud83e\udd16',
    title: 'Chatbots intelligents',
    description: 'Un assistant virtuel forme sur vos donnees qui repond a vos clients 24h/24. Service client, qualification de leads, support interne.',
  },
  {
    icon: '\ud83d\udcdd',
    title: 'Automatisation contenu',
    description: 'Generation de contenus marketing, emails, fiches produits et publications grace a l\u2019IA. Votre equipe produit 10 fois plus, 10 fois plus vite.',
  },
  {
    icon: '\ud83d\udcc8',
    title: 'Analyse donnees',
    description: 'Tableaux de bord intelligents qui transforment vos donnees brutes en decisions. Previsions, tendances, alertes automatiques.',
  },
  {
    icon: '\ud83d\udd04',
    title: 'Workflows IA',
    description: 'Automatisation de vos processus metier avec l\u2019IA : tri d\u2019emails, extraction de donnees, generation de rapports, classification automatique.',
  },
  {
    icon: '\ud83c\udf93',
    title: 'Formation equipe IA',
    description: 'Vos collaborateurs apprennent a utiliser ChatGPT, Midjourney et les outils IA au quotidien. Prompting, bonnes pratiques, cas concrets.',
  },
]

const processSteps = [
  {
    number: 1,
    title: 'Audit besoins',
    description: 'Cartographie de vos processus, identification des taches repetitives et evaluation du potentiel IA de votre entreprise.',
  },
  {
    number: 2,
    title: 'Proof of Concept',
    description: 'On teste la solution IA sur un cas concret de votre entreprise. Resultats mesurables avant de s\u2019engager sur le deploiement complet.',
  },
  {
    number: 3,
    title: 'Deploiement',
    description: 'Mise en production de la solution validee. Integration avec vos outils existants et parametrage sur mesure.',
  },
  {
    number: 4,
    title: 'Formation',
    description: 'Votre equipe est formee a utiliser les outils IA deployes. Sessions pratiques, documentation et support.',
  },
  {
    number: 5,
    title: 'Optimisation',
    description: 'Suivi des performances, ajustements et amelioration continue. L\u2019IA s\u2019ameliore avec le temps et vos retours.',
  },
]

const faqItems = [
  {
    q: 'Mon entreprise est-elle prete pour l\u2019IA ?',
    a: 'Si vous avez des taches repetitives, des donnees clients ou du contenu a produire, oui. L\u2019audit initial permet de mesurer precisement ou l\u2019IA peut vous apporter de la valeur, meme si votre entreprise est petite.',
  },
  {
    q: 'Faut-il des competences techniques dans l\u2019equipe ?',
    a: 'Non. Nos solutions sont concues pour etre utilisees par des non-techniciens. La formation incluse garantit que votre equipe est autonome. L\u2019objectif est de vous simplifier la vie, pas de la compliquer.',
  },
  {
    q: 'Quels outils IA utilisez-vous ?',
    a: 'OpenAI (ChatGPT, GPT-4), Claude, Midjourney, Make, Zapier, Langchain selon les besoins. Nous choisissons les outils les plus adaptes a votre contexte, pas les plus a la mode.',
  },
  {
    q: 'Qu\u2019est-ce que le Proof of Concept ?',
    a: 'C\u2019est un test grandeur nature sur un cas reel de votre entreprise. Par exemple, un chatbot sur 100 conversations clients ou une automatisation sur un mois de donnees. Vous voyez les resultats avant de vous engager.',
  },
  {
    q: 'Combien de temps avant de voir des resultats ?',
    a: 'Le Proof of Concept livre des resultats en 2 a 3 semaines. Le deploiement complet prend 4 a 8 semaines selon la complexite. Les gains de productivite sont visibles des le premier mois d\u2019utilisation.',
  },
]

export default function IAAppliqueePage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="IA APPLIQUEE"
          title="L\u2019IA au service de votre business"
          subtitle="Vos concurrents utilisent deja l\u2019intelligence artificielle. Integrez l\u2019IA dans vos operations pour gagner du temps, reduire les couts et prendre de meilleures decisions."
          badges={['ChatGPT', 'Automatisation IA', 'Data', '3 500-12 000 \u20ac']}
          ctaPrimary={{ label: 'Lancer mon audit IA', href: '#cta' }}
          ctaSecondary={{ label: 'Voir le processus', href: '#processus' }}
        />

        {/* Probleme */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="LE CONSTAT"
              title="Vos concurrents avancent. Et vous ?"
              centered
            />
            <div className="mt-8 space-y-4 text-left">
              {[
                'Vos equipes passent des heures sur des taches que l\u2019IA pourrait faire en minutes',
                'Vous entendez parler de ChatGPT mais ne savez pas comment l\u2019appliquer a votre metier',
                'Vos concurrents automatisent leur service client, leur contenu, leur analyse de donnees',
                'Vous accumulez des donnees sans jamais en tirer de decisions concretes',
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
              title="L\u2019IA integree a vos operations"
              subtitle="Des solutions concretes, deployees dans votre entreprise, avec des resultats mesurables."
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
              title="De l\u2019audit au deploiement en 5 etapes"
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
              title="Un investissement qui se rentabilise"
              centered
            />
            <div className="mt-10 inline-block rounded-xl p-8" style={{ backgroundColor: '#FEFCF9', border: '2px solid #F6C961' }}>
              <p className="text-5xl font-bold mb-2" style={{ color: '#0A0A0A' }}>3 500 - 12 000 \u20ac</p>
              <p className="text-lg mb-4" style={{ color: 'rgba(10,10,10,0.6)' }}>Selon le perimetre et la complexite du projet</p>
              <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}>
                <p className="text-sm font-semibold" style={{ color: '#560E13' }}>
                  Audit + Proof of Concept + Deploiement + Formation inclus
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
              Pret a integrer l&apos;IA dans votre business ?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Reservez un appel decouverte de 15 minutes. On identifie ensemble les opportunites IA pour votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://calendly.com/roselinengom"
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
