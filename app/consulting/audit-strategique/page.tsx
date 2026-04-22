import { buildMetadata } from '@/lib/seo/metadata'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import ProcessSteps from '@/components/ProcessSteps'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata = buildMetadata({
  title: 'Audit Stratégique : 1 800 €',
  description: "Audit complet de votre projet Afrique : marché, positionnement, plan d'action. Livrables en 3 semaines.",
  path: '/consulting/audit-strategique',
})

const livrables = [
  {
    icon: '1',
    title: 'Cartographie du marche',
    description: 'Analyse complete de votre environnement concurrentiel, des tendances du secteur et du positionnement de votre offre sur le marche cible.',
  },
  {
    icon: '2',
    title: 'Analyse de l\'offre',
    description: 'Evaluation detaillee de votre produit ou service : points forts, faiblesses, opportunites d\'amelioration et differenciation.',
  },
  {
    icon: '3',
    title: 'Audit digital',
    description: 'Revue de votre presence en ligne : site web, reseaux sociaux, referencement, reputation. Ce qui fonctionne. Ce qui ne fonctionne pas.',
  },
  {
    icon: '4',
    title: 'Diagnostic commercial',
    description: 'Analyse de vos canaux de vente, de votre parcours client et de vos taux de conversion. Ou perdez-vous des clients ?',
  },
  {
    icon: '5',
    title: '5 recommandations prioritaires',
    description: 'Pas 50. Cinq. Les actions les plus impactantes a mettre en oeuvre immediatement pour des resultats visibles.',
  },
  {
    icon: '6',
    title: 'Roadmap 6 mois',
    description: 'Un plan d\'action concret, priorise et chiffre. Vous savez exactement quoi faire, dans quel ordre, et avec quel budget.',
  },
]

const methodologie = [
  {
    number: 1,
    title: 'Collecte',
    description: 'Entretiens, analyse documentaire, immersion terrain. On comprend votre contexte en profondeur avant de poser le moindre diagnostic.',
  },
  {
    number: 2,
    title: 'Analyse',
    description: 'Croisement des donnees, benchmark concurrentiel, identification des leviers de croissance. Le travail de fond qui fait la difference.',
  },
  {
    number: 3,
    title: 'Restitution',
    description: 'Presentation du diagnostic complet avec les 6 livrables. Session de travail de 2h pour valider les recommandations ensemble.',
  },
]

const faqItems = [
  {
    q: 'Combien de temps dure l\'audit ?',
    a: '3 semaines calendaires, du kick-off a la restitution. La premiere semaine est consacree a la collecte, la deuxieme a l\'analyse, la troisieme a la restitution.',
  },
  {
    q: 'Faut-il etre present au Senegal ?',
    a: 'Non. L\'audit peut se faire entierement a distance via visio. Si votre projet necessite une visite terrain, les frais de deplacement sont en supplement.',
  },
  {
    q: 'Quels types de projets acceptez-vous ?',
    a: 'Hotels, lodges, agences receptives, operateurs culturels, offices de tourisme, porteurs de projets tourisme ou culture en Afrique de l\'Ouest.',
  },
  {
    q: 'Que se passe-t-il apres l\'audit ?',
    a: 'Vous pouvez executer les recommandations de votre cote. Ou passer a la formule Accompagnement pour que je vous aide a les mettre en oeuvre. C\'est votre choix.',
  },
  {
    q: 'Le tarif est-il negociable ?',
    a: 'Le tarif standard est de 1 800 EUR. Les clients TripAfro existants beneficient d\'un tarif preferentiel a 1 500 EUR. Pour les projets a fort impact social, je peux adapter.',
  },
]

export default function AuditStrategiquePage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="AUDIT"
          title="Audit Strategique"
          subtitle="Un diagnostic complet de votre projet en 3 semaines"
          badges={['3 semaines', '6 livrables', '1 800 EUR']}
          ctaPrimary={{ label: 'Reserver mon audit', href: '#calendly' }}
        />

        {/* Accroche */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'rgba(10,10,10,0.8)' }}>
              Vous allez prendre une decision importante. Avant de la prendre, il vous faut un regard exterieur qui sache de quoi il parle.
            </p>
          </div>
        </section>

        {/* Pour qui */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="POUR QUI"
              title="Cet audit est fait pour vous si..."
              centered
            />
            <div className="mt-10 grid md:grid-cols-2 gap-4">
              {[
                'Vous gerez un hotel ou un lodge au Senegal',
                'Vous dirigez une agence de voyage receptive',
                'Vous etes operateur culturel ou evenementiel',
                'Vous travaillez dans un office de tourisme',
                'Vous portez un projet tourisme ou culture en Afrique',
                'Vous voulez investir dans le secteur et avez besoin de clarifier votre strategie',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: '#FEFCF9' }}
                >
                  <span style={{ color: '#F6C961' }} className="mt-0.5 flex-shrink-0 text-lg">&#10003;</span>
                  <p style={{ color: 'rgba(10,10,10,0.75)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Les 6 livrables */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="LIVRABLES"
              title="6 livrables concrets en 3 semaines"
              subtitle="Pas de jargon. Pas de PowerPoint de 200 slides. Des resultats actionnables."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={livrables} />
            </div>
          </div>
        </section>

        {/* Methodologie */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="METHODOLOGIE"
              title="3 phases. 3 semaines. 0 perte de temps."
              centered
            />
            <div className="mt-14">
              <ProcessSteps steps={methodologie} />
            </div>
          </div>
        </section>

        {/* Prix */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="TARIF"
              title="Un investissement, pas une depense"
              centered
            />
            <div className="mt-10 inline-block rounded-xl p-8" style={{ backgroundColor: '#F8F5F0', border: '2px solid #F6C961' }}>
              <p className="text-5xl font-bold mb-2" style={{ color: '#0A0A0A' }}>1 800 EUR</p>
              <p className="text-lg mb-4" style={{ color: 'rgba(10,10,10,0.6)' }}>Diagnostic complet en 3 semaines</p>
              <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}>
                <p className="text-sm font-semibold" style={{ color: '#560E13' }}>
                  Client TripAfro ? Tarif preferentiel : 1 500 EUR
                </p>
              </div>
            </div>
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
              15 minutes pour comprendre votre projet et voir si l'audit est adapte.
            </p>
            <CalendlyEmbed url="https://calendly.com/roselinengom" />
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
