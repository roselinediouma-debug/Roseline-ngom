import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nos Offres | Roseline Ngom',
  description: "Du gratuit au premium : voyages, guides, consulting, digital & IA. Trouvez l'offre qui vous correspond.",
  openGraph: {
    title: 'Nos Offres | Roseline Ngom',
    description: "Du gratuit au premium : voyages, guides, consulting, digital & IA. Trouvez l'offre qui vous correspond.",
  },
}

const volets = [
  {
    icon: '🌍',
    title: 'TripAfro Voyages',
    price: '2 200 – 6 500 €',
    features: [
      'Voyages immersifs au Sénégal et en Afrique de l\'Ouest',
      'Retour aux racines pour la diaspora',
      'Itinéraires sur mesure avec accompagnement local',
      'Hébergement, transport et expériences inclus',
    ],
    href: '/voyages',
    cta: 'Explorer les voyages',
  },
  {
    icon: '📚',
    title: 'Guides Signatures',
    price: '29 – 49 €',
    features: [
      'Guide Casamance authentique',
      'Guide Sénégal 7 jours incontournables',
      'Bundle découverte multi-guides',
      'Accès immédiat + mises à jour à vie',
    ],
    href: '/guides',
    cta: 'Découvrir les guides',
  },
  {
    icon: '🎯',
    title: 'Consulting Stratégique',
    price: '1 800 – 15 000 €',
    features: [
      'Audit stratégique de projet',
      'Accompagnement personnalisé 3 à 6 mois',
      'Conseil institutionnel et partenariats',
    ],
    href: '/consulting',
    cta: 'En savoir plus',
  },
  {
    icon: '💻',
    title: 'Digital & IA',
    price: '1 500 €/mois – 15 000 €',
    features: [
      'Présence digitale et stratégie de contenu',
      'Formations IA appliquée au business',
      'Transformation digitale pour organisations',
    ],
    href: '/digital-ia',
    cta: 'Voir les solutions',
  },
  {
    icon: '🎁',
    title: 'Ressources Gratuites',
    price: '0 €',
    features: [
      'Guide PDF : 10 expériences secrètes au Sénégal',
      'Checklist de voyage complète',
      'Newsletter avec conseils exclusifs',
      'Accès immédiat sans engagement',
    ],
    href: '/ressources',
    cta: 'Accéder gratuitement',
  },
]

const steps = [
  {
    num: '01',
    title: 'Téléchargez le guide gratuit',
    desc: 'Recevez immédiatement le guide PDF avec 10 expériences secrètes au Sénégal et la checklist de voyage.',
  },
  {
    num: '02',
    title: 'Explorez les guides et voyages',
    desc: 'Parcourez les guides signatures et les voyages immersifs pour trouver ce qui vous correspond.',
  },
  {
    num: '03',
    title: 'Réservez un appel découverte',
    desc: 'Un échange de 15 minutes, gratuit et sans engagement, pour définir ensemble votre projet.',
  },
]

const faqItems = [
  {
    q: 'Comment fonctionne l\'écosystème Roseline Ngom ?',
    a: 'L\'écosystème est organisé en 5 volets complémentaires : voyages immersifs, guides numériques, consulting stratégique, solutions digitales & IA, et ressources gratuites. Vous pouvez commencer par n\'importe quel volet selon vos besoins.',
  },
  {
    q: 'Par où commencer si je ne sais pas quel volet choisir ?',
    a: 'Commencez par télécharger le guide gratuit, puis réservez un appel découverte de 15 minutes. Cet échange gratuit me permettra de vous orienter vers le volet le plus adapté à votre projet.',
  },
  {
    q: 'Quelles sont les options de paiement disponibles ?',
    a: 'Pour les voyages et le consulting, un paiement en 2 ou 3 fois est possible. Les guides sont payables en une fois. Contactez-moi pour discuter de la solution qui vous convient.',
  },
  {
    q: 'Les voyages TripAfro sont-ils adaptés aux familles ?',
    a: 'Absolument ! Les voyages sont conçus pour tous les profils : familles, couples, groupes d\'amis, voyageurs solo, et membres de la diaspora souhaitant un retour aux sources.',
  },
  {
    q: 'Comment se déroule un appel découverte ?',
    a: 'C\'est un rendez-vous de 15 minutes en visio ou par téléphone, entièrement gratuit. On fait le point sur votre projet, vos envies, et je vous présente les options les plus pertinentes.',
  },
]

export default function OffresPage() {
  return (
    <>
      <Nav variant="solid" />
      <main>
        {/* 1. Hero */}
        <SalesPageHero
          eyebrow="ÉCOSYSTÈME COMPLET"
          title="Du gratuit au premium"
          subtitle="Choisissez le niveau qui correspond à votre projet"
        />

        {/* 2. Les 5 volets */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <SectionHeader
                eyebrow="Nos offres"
                title="Les 5 volets"
                subtitle="Un écosystème complet pour accompagner chaque étape de votre projet"
                centered
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volets.map((volet) => (
                <div
                  key={volet.title}
                  className="bg-white rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{ border: '1px solid rgba(86,14,19,0.08)' }}
                >
                  <div className="text-4xl mb-3">{volet.icon}</div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: '#560E13',
                    }}
                  >
                    {volet.title}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: '#F6C961' }}
                  >
                    {volet.price}
                  </p>
                  <ul className="flex-1 space-y-2 mb-6">
                    {volet.features.map((f) => (
                      <li
                        key={f}
                        className="text-sm flex items-start gap-2"
                        style={{ color: 'rgba(10,10,10,0.65)' }}
                      >
                        <span style={{ color: '#560E13', flexShrink: 0 }}>&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={volet.href}
                    className="block text-center px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
                  >
                    {volet.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Comment démarrer */}
        <section className="py-20 px-4" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-14">
              <SectionHeader
                title="Comment démarrer"
                subtitle="Trois étapes simples pour lancer votre projet"
                centered
              />
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-5"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    {num}
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: '#0A0A0A',
                    }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-14">
              <SectionHeader
                title="Questions fréquentes"
                centered
              />
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* 5. CTA Final */}
        <section className="py-20 px-4 text-center" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
              }}
            >
              Prêt à démarrer ?
            </h2>
            <p className="text-base mb-10" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Commencez par le guide gratuit ou échangeons directement sur WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ressources/guide-15-experiences"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Télécharger le guide gratuit
              </Link>
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20offres."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FEFCF9',
                  border: '2px solid rgba(254,252,249,0.4)',
                }}
              >
                Écrire sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
