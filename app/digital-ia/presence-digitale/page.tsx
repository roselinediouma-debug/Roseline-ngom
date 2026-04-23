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
  title: 'Présence Digitale : 1 500 €/mois',
  description: 'Gestion complète de votre présence en ligne. Réseaux sociaux, contenu, communauté. Engagement 3 mois.',
  path: '/digital-ia/presence-digitale',
})

const features = [
  {
    icon: '\ud83c\udfaf',
    title: 'Strategie social media',
    description: 'Audit de votre presence actuelle, definition de votre ligne editoriale et calendrier de publication adapte a vos objectifs business.',
  },
  {
    icon: '\u270d\ufe0f',
    title: 'Creation de contenu',
    description: 'Visuels, textes, videos courtes : du contenu professionnel qui reflete votre marque et engage votre audience.',
  },
  {
    icon: '\ud83d\udcac',
    title: 'Community management',
    description: 'Gestion quotidienne de vos communautes. Reponses aux messages, moderation, animation. Votre audience se sent ecoutee.',
  },
  {
    icon: '\ud83d\udcca',
    title: 'Reporting mensuel',
    description: 'Chaque mois, un rapport clair : ce qui a fonctionne, ce qu\u2019il faut ajuster, les chiffres cles et les recommandations.',
  },
  {
    icon: '\ud83d\udcb0',
    title: 'Gestion publicites',
    description: 'Campagnes publicitaires sur Facebook, Instagram et LinkedIn. Ciblage precis, budget optimise, resultats mesurables.',
  },
  {
    icon: '\u2728',
    title: 'Identite de marque',
    description: 'Coherence visuelle sur tous vos canaux. Charte graphique, ton de voix, templates. Votre marque devient reconnaissable.',
  },
]

const processSteps = [
  {
    number: 1,
    title: 'Audit',
    description: 'Analyse complete de votre presence digitale actuelle, de vos concurrents et de votre audience cible.',
  },
  {
    number: 2,
    title: 'Strategie',
    description: 'Definition de votre positionnement, ligne editoriale, calendrier et objectifs chiffres.',
  },
  {
    number: 3,
    title: 'Creation',
    description: 'Production du contenu du mois : visuels, textes, videos. Tout est valide avant publication.',
  },
  {
    number: 4,
    title: 'Publication',
    description: 'Planification et publication sur vos canaux. Community management au quotidien.',
  },
  {
    number: 5,
    title: 'Analyse',
    description: 'Reporting mensuel, ajustements de la strategie et optimisation continue des performances.',
  },
]

const faqItems = [
  {
    q: 'Quelle est la duree d\u2019engagement minimum ?',
    a: 'L\u2019engagement minimum est de 3 mois. C\u2019est le temps necessaire pour installer une strategie, construire une audience et observer les premiers resultats concrets. Au-dela, le contrat se renouvelle au mois.',
  },
  {
    q: 'Quelles plateformes gerez-vous ?',
    a: 'Nous gerons Instagram, Facebook, LinkedIn et TikTok selon votre cible. La strategie definit les plateformes prioritaires pour votre activite. Inutile d\u2019etre partout, il faut etre la ou sont vos clients.',
  },
  {
    q: 'Est-ce que je valide le contenu avant publication ?',
    a: 'Oui, systematiquement. Chaque mois, vous recevez le calendrier editorial et les contenus pour validation avant toute publication. Vous gardez le controle sur votre image.',
  },
  {
    q: 'Au bout de combien de temps voit-on des resultats ?',
    a: 'Les premiers indicateurs bougent des le premier mois (engagement, portee). Pour une croissance significative de l\u2019audience et des leads entrants, comptez 2 a 3 mois de travail regulier.',
  },
  {
    q: 'Qu\u2019est-ce qui est inclus dans les 1 500 \u20ac/mois ?',
    a: 'La strategie, la creation de contenu (12 a 16 publications/mois), le community management, la gestion des publicites (hors budget media) et le reporting mensuel. Tout est inclus, pas de frais caches.',
  },
]

export default function PresenceDigitalePage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="PRESENCE DIGITALE"
          title="Rendez votre marque visible et memorable"
          subtitle="Strategie social media, creation de contenu et community management. Votre presence digitale geree par des experts."
          badges={['Reseaux sociaux', 'Contenu', 'Communaute', '1 500 \u20ac/mois']}
          ctaPrimary={{ label: 'Demarrer maintenant', href: '#cta' }}
          ctaSecondary={{ label: 'Voir le processus', href: '#processus' }}
        />

        {/* Probleme */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="LE CONSTAT"
              title="Votre entreprise est invisible en ligne"
              centered
            />
            <div className="mt-8 space-y-4 text-left">
              {[
                'Vous publiez de temps en temps, sans strategie ni regularite',
                'Votre image de marque varie d\u2019un canal a l\u2019autre',
                'Vous n\u2019avez pas le temps de gerer vos reseaux sociaux',
                'Vos concurrents captent l\u2019attention que vous meritez',
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
              title="Une presence digitale professionnelle, sans effort"
              subtitle="Tout ce qu\u2019il faut pour que votre marque brille en ligne. On s\u2019occupe de tout."
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
              title="5 etapes pour des resultats durables"
              centered
            />
            <div className="mt-14">
              <ProcessSteps steps={processSteps} />
            </div>
          </div>
        </section>

        {/* Teaser outil gratuit */}
        <section className="py-16 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F8F5F0 0%, #fff 100%)',
                border: '1px solid rgba(86, 14, 19, 0.1)',
              }}
            >
              <div
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ backgroundColor: '#560E13', color: '#F6C961' }}
              >
                Essayer d&apos;abord · 100 % gratuit
              </div>
              <h3
                className="text-2xl md:text-3xl mb-3"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#560E13',
                }}
              >
                Teste l&apos;approche avec notre générateur de posts IA
              </h3>
              <p className="mb-5 opacity-80 leading-relaxed">
                Avant de s&apos;engager sur un accompagnement mensuel, goûte la méthode.
                Renseigne ton hôtel, ta ville et une info à mettre en avant. En 15 secondes
                notre IA te livre 3 posts prêts à publier (Google Business Profile, Instagram,
                LinkedIn), optimisés SEO local — le même niveau que ce qu&apos;on produirait
                dans l&apos;accompagnement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/outils/generer-posts"
                  className="inline-block px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#560E13', color: '#F6C961' }}
                >
                  Générer mes 3 posts gratuitement →
                </Link>
                <Link
                  href="/outils/audit-presence-en-ligne"
                  className="inline-block px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
                  style={{ color: '#560E13', border: '1.5px solid rgba(86, 14, 19, 0.2)' }}
                >
                  Faire l&apos;audit de ma présence
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Prix */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="TARIF"
              title="Un investissement previsible"
              centered
            />
            <div className="mt-10 inline-block rounded-xl p-8" style={{ backgroundColor: '#FEFCF9', border: '2px solid #F6C961' }}>
              <p className="text-5xl font-bold mb-2" style={{ color: '#0A0A0A' }}>1 500 €<span className="text-2xl font-normal">/mois</span></p>
              <p className="text-lg mb-4" style={{ color: 'rgba(10,10,10,0.6)' }}>Engagement 3 mois minimum</p>
              <div className="rounded-lg px-4 py-2 inline-block" style={{ backgroundColor: 'rgba(246,201,97,0.15)' }}>
                <p className="text-sm font-semibold" style={{ color: '#560E13' }}>
                  Contenu + Community management + Publicites + Reporting inclus
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
              Pret a devenir visible ?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Reservez un appel decouverte de 15 minutes ou ecrivez-nous directement sur WhatsApp.
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
