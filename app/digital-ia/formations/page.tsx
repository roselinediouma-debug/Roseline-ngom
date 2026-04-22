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
  title: 'Formations Digital & IA : 2 500-15 000 €',
  description: 'Formations sur mesure pour vos équipes. Réseaux sociaux, IA générative, marketing digital, e-commerce.',
  path: '/digital-ia/formations',
})

const features = [
  {
    icon: '\ud83d\udcf1',
    title: 'Formation reseaux sociaux',
    description: 'Maitrisez Instagram, LinkedIn, TikTok et Facebook pour votre business. Strategie, creation de contenu, publicites et analytics.',
  },
  {
    icon: '\ud83e\udd16',
    title: 'Formation IA generative',
    description: 'ChatGPT, Claude, Midjourney : apprenez a utiliser l\u2019IA au quotidien. Prompting avance, cas d\u2019usage concrets, bonnes pratiques.',
  },
  {
    icon: '\ud83d\udcca',
    title: 'Marketing digital',
    description: 'SEO, email marketing, tunnels de vente, publicite en ligne. Les fondamentaux pour acquerir des clients sur internet.',
  },
  {
    icon: '\ud83d\uded2',
    title: 'E-commerce',
    description: 'Lancez ou optimisez votre boutique en ligne. Plateformes, logistique, paiement, fidelisation client.',
  },
  {
    icon: '\ud83d\ude80',
    title: 'Leadership digital',
    description: 'Pour les dirigeants : comprendre les enjeux du numerique, piloter une transformation digitale, prendre les bonnes decisions technologiques.',
  },
  {
    icon: '\ud83c\udf1f',
    title: 'Formation formateurs',
    description: 'Formez vos formateurs internes pour demultiplier l\u2019impact. Pedagogie, outils, certification et suivi qualite.',
  },
]

const processSteps = [
  {
    number: 1,
    title: 'Diagnostic competences',
    description: 'Evaluation du niveau actuel de votre equipe et identification des competences prioritaires a developper.',
  },
  {
    number: 2,
    title: 'Programme sur mesure',
    description: 'Conception d\u2019un programme adapte a votre secteur, vos outils et vos objectifs. Pas de formation generique.',
  },
  {
    number: 3,
    title: 'Sessions pratiques',
    description: 'Formation en petits groupes avec exercices concrets sur vos propres cas d\u2019usage. On apprend en faisant.',
  },
  {
    number: 4,
    title: 'Evaluation',
    description: 'Tests de competences, mise en situation et certification. Vous savez exactement ce que chaque participant maitrise.',
  },
  {
    number: 5,
    title: 'Suivi post-formation',
    description: 'Accompagnement de 30 jours apres la formation. Questions, ajustements, coaching individuel si necessaire.',
  },
]

const pricingTiers = [
  {
    name: 'Essentiel',
    price: '2 500 \u20ac',
    duration: '2 jours',
    description: 'Les fondamentaux pour demarrer',
    features: [
      'Formation 2 jours (14h)',
      'Jusqu\u2019a 8 participants',
      'Supports de formation',
      'Certificat de participation',
      'Suivi email 15 jours',
    ],
    highlighted: false,
  },
  {
    name: 'Avance',
    price: '5 000 \u20ac',
    duration: '5 jours',
    description: 'Montee en competences complete',
    features: [
      'Formation 5 jours (35h)',
      'Jusqu\u2019a 12 participants',
      'Supports + templates',
      'Certification competences',
      'Suivi coaching 30 jours',
      'Session Q&A mensuelle',
    ],
    highlighted: true,
  },
  {
    name: 'Sur mesure',
    price: '8 000 - 15 000 \u20ac',
    duration: 'Programme complet',
    description: 'Transformation des competences',
    features: [
      'Programme personnalise',
      'Nombre de participants flexible',
      'Supports + outils dedies',
      'Certification avancee',
      'Coaching individuel 60 jours',
      'Formation de formateurs incluse',
    ],
    highlighted: false,
  },
]

const faqItems = [
  {
    q: 'Les formations se font en presentiel ou a distance ?',
    a: 'Les deux. Nous proposons des formations en presentiel (Dakar, Paris) et a distance via visio. Le format hybride est egalement possible. Le presentiel est recommande pour les groupes de plus de 6 personnes.',
  },
  {
    q: 'Les formations sont-elles certifiantes ?',
    a: 'Oui. Chaque participant recoit un certificat de competences a l\u2019issue de la formation. Pour les formules Avance et Sur mesure, la certification inclut une evaluation pratique des competences acquises.',
  },
  {
    q: 'Peut-on adapter le contenu a notre secteur d\u2019activite ?',
    a: 'C\u2019est meme la norme. Chaque programme est concu sur mesure apres le diagnostic competences. Les exercices pratiques utilisent vos propres cas d\u2019usage, vos outils et vos donnees.',
  },
  {
    q: 'Quel est le nombre minimum de participants ?',
    a: 'A partir de 3 participants pour une formation inter-entreprises. Pour une formation intra-entreprise dediee, il n\u2019y a pas de minimum. Le tarif est le meme jusqu\u2019au nombre maximum indique.',
  },
  {
    q: 'Comment fonctionne le suivi post-formation ?',
    a: 'Apres la formation, chaque participant beneficie d\u2019un acces a un espace de ressources en ligne et d\u2019un canal de support direct (email ou Slack) pendant 15 a 60 jours selon la formule choisie.',
  },
]

export default function FormationsPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="FORMATIONS"
          title="Formez vos equipes au digital et a l&apos;IA"
          subtitle="Des programmes pratiques et sur mesure pour que vos collaborateurs maitrisent les outils numeriques qui comptent. Fini les formations generiques qui ne servent a rien."
          badges={['Equipes', 'Sur mesure', 'Certifiant', '2 500-15 000 \u20ac']}
          ctaPrimary={{ label: 'Demander un programme', href: '#cta' }}
          ctaSecondary={{ label: 'Voir les formules', href: '#tarifs' }}
        />

        {/* Probleme */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="LE CONSTAT"
              title="Vos equipes manquent de competences digitales"
              centered
            />
            <div className="mt-8 space-y-4 text-left">
              {[
                'Vos collaborateurs n\u2019utilisent pas les outils numeriques a leur plein potentiel',
                'Les formations classiques sont trop theoriques et deconnectees de votre realite',
                'Le digital evolue vite et votre equipe prend du retard',
                'Vous dependez de prestataires externes pour des taches que votre equipe pourrait gerer',
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
              eyebrow="NOS FORMATIONS"
              title="6 programmes pour monter en competences"
              subtitle="Chaque formation est adaptee a votre secteur, vos outils et le niveau de votre equipe."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={features} />
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="PROCESSUS"
              title="De l\u2019evaluation au suivi en 5 etapes"
              centered
            />
            <div className="mt-14">
              <ProcessSteps steps={processSteps} />
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TARIFS"
              title="Trois formules pour chaque besoin"
              subtitle="Du module essentiel au programme complet de transformation."
              centered
            />
            <div className="mt-14 grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl p-8 flex flex-col"
                  style={{
                    backgroundColor: '#FEFCF9',
                    border: tier.highlighted ? '2px solid #F6C961' : '1px solid rgba(86,14,19,0.08)',
                    boxShadow: tier.highlighted ? '0 8px 30px rgba(246,201,97,0.2)' : '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  {tier.highlighted && (
                    <div
                      className="text-xs font-bold uppercase tracking-widest text-center mb-4 px-3 py-1 rounded-full self-center"
                      style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                    >
                      Recommande
                    </div>
                  )}
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: '#0A0A0A',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'rgba(10,10,10,0.6)' }}>
                    {tier.duration}
                  </p>
                  <p className="text-3xl font-bold mb-2" style={{ color: '#560E13' }}>
                    {tier.price}
                  </p>
                  <p className="text-sm mb-6" style={{ color: 'rgba(10,10,10,0.6)' }}>
                    {tier.description}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span style={{ color: '#F6C961' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                        <span style={{ color: 'rgba(10,10,10,0.75)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="https://calendly.com/roselinengom"
                    className="block text-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:opacity-90"
                    style={{
                      backgroundColor: tier.highlighted ? '#F6C961' : '#F8F5F0',
                      color: '#560E13',
                      border: tier.highlighted ? 'none' : '1px solid rgba(86,14,19,0.15)',
                    }}
                  >
                    Choisir cette formule
                  </Link>
                </div>
              ))}
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
              Pret a former vos equipes ?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Reservez un appel decouverte de 15 minutes. On evalue vos besoins et on vous propose le programme adapte.
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
