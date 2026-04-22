import { buildMetadata } from '@/lib/seo/metadata'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import TestimonialCard from '@/components/TestimonialCard'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'

export const metadata = buildMetadata({
  title: 'Guide Casamance : itinéraires et hébergements',
  description: 'Le guide pratique pour votre voyage en Casamance : hôtels et campements, tarifs, transport, itinéraires et circuit combiné. 29 €.',
  path: '/guides/guide-casamance',
})

const SOMMAIRE = [
  'Introduction : pourquoi la Casamance',
  'Quand y aller : les bonnes périodes',
  'Comment y aller : avion, bateau, bus',
  'Destinations à visiter en Casamance',
  'Itinéraires recommandés (5, 7, 14 jours)',
  'Recommandations d’hôtels et campements avec tarifs indicatifs',
  'Le guide local partenaire (contact direct)',
  'Circuit combiné Casamance + Sine Saloum',
  'Conseils pratiques et culturels',
]

const FAQ = [
  { q: 'Dans quel format est le guide ?', a: 'PDF téléchargeable, lisible sur ordinateur, tablette ou mobile. Hors ligne une fois téléchargé.' },
  { q: 'Les hébergements recommandés sont-ils réservables en ligne ?', a: 'Pour les hôtels, la plupart oui (Booking, site direct, WhatsApp). Pour les campements villageois, la réservation se fait souvent par téléphone ou WhatsApp ; le guide donne le contact à chaque fois.' },
  { q: 'Qui est le guide partenaire ?', a: 'Un guide local de confiance en Casamance, testé lors de mes voyages. Son contact direct figure dans le PDF avec ses spécialités (pirogue, randonnée, excursions villages).' },
  { q: 'Les tarifs sont-ils garantis ?', a: 'Les tarifs sont indicatifs et actualisés à la date de publication du guide. Ils peuvent varier selon la saison. Les fourchettes couvrent les variations habituelles.' },
  { q: 'Comment se passe la livraison ?', a: 'Immédiate. Après le paiement, vous recevez le guide par email en quelques minutes.' },
  { q: 'Et si le guide ne me convient pas ?', a: 'Satisfait ou remboursé 14 jours, sans condition. Un email suffit.' },
]

export default function GuideCasamancePage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="GUIDE SIGNATURE"
          title="Guide Casamance"
          subtitle="Le guide pratique pour organiser votre voyage en Casamance : destinations, hôtels, transport et itinéraires"
          badges={['Itinéraires 5-7-14 j', 'Hôtels & campements', 'Guide partenaire', '29 €']}
          ctaPrimary={{ label: 'Acheter le guide (29 €)', href: '#acheter' }}
          ctaSecondary={{ label: 'Voir le sommaire', href: '#sommaire' }}
        />

        {/* Le problème */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="LE PROBLÈME"
              title="Ce que ce guide vous évite"
              centered
            />
            <div className="mt-12">
              <FeatureGrid features={[
                { icon: '⏰', title: 'Des heures de recherche', description: 'Plus besoin de fouiller des blogs contradictoires. Les infos essentielles sont centralisées.' },
                { icon: '🗺️', title: 'Un itinéraire mal conçu', description: 'Les circuits recommandés sont testés sur le terrain : durée réaliste, trajets optimisés.' },
                { icon: '🏨', title: 'Un hébergement au hasard', description: 'Hôtels et campements sélectionnés selon le profil et le budget, avec tarifs indicatifs.' },
                { icon: '🤝', title: 'Un guide qui ne tient pas ses promesses', description: 'Le contact d’un guide local partenaire, rencontré et testé, figure dans le PDF.' },
              ]} />
            </div>
          </div>
        </section>

        {/* Sommaire */}
        <section id="sommaire" className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="AU SOMMAIRE" title="Ce que contient le guide" centered />
            <div className="mt-10 space-y-0">
              {SOMMAIRE.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-4"
                  style={{ borderBottom: '1px solid #e0d8d0' }}
                >
                  <span className="text-lg font-bold flex-shrink-0 w-8" style={{ color: '#F6C961', fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inclus / Non inclus */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
                ✅ Ce qui est inclus
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  'PDF téléchargeable immédiatement',
                  'Destinations principales à visiter',
                  'Itinéraires 5, 7 et 14 jours',
                  'Recommandations d’hôtels avec tarifs indicatifs',
                  'Contact direct d’un guide local partenaire',
                  'Comparatif des modes de transport (avion, bateau, bus)',
                  'Circuit combiné Casamance + Sine Saloum',
                  'Conseils pratiques et culturels',
                  'Support email si question',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: '#F6C961' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
                Ce qui n&apos;est PAS inclus
              </h3>
              <ul className="space-y-3 text-sm opacity-60">
                {[
                  'Réservation des hébergements (vous le faites vous-même)',
                  'Accompagnement sur place',
                  'Billets d’avion ou de bateau',
                  'Assurance voyage',
                  'Mise à jour trimestrielle des contacts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="AVIS ACHETEURS" title="Ce qu'ils en disent" centered />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <TestimonialCard name="Amina K." location="Lyon" quote="Le guide m'a permis d'organiser 10 jours en Casamance sans agence. L'itinéraire tient la route sur le terrain." stars={5} />
              <TestimonialCard name="Thomas R." location="Paris" quote="J'ai voyagé seul grâce à ce guide. Les recommandations d'hôtels et le contact du guide local ont fait la différence." stars={5} />
              <TestimonialCard name="Ndèye F." location="Dakar" quote="J'ai offert ce guide à ma cousine qui vit à Marseille. Elle a organisé son premier voyage en Casamance toute seule." stars={5} />
            </div>
          </div>
        </section>

        {/* Auteure */}
        <section className="py-16 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden" style={{ backgroundColor: '#560E13' }}>
              <div className="w-full h-full flex items-center justify-center text-2xl" style={{ color: '#F6C961' }}>RN</div>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>Roseline Ngom</h3>
            <p className="text-sm opacity-70 leading-relaxed max-w-xl mx-auto">
              Fondatrice de TripAfro, experte voyage au Sénégal depuis plus de 10 ans.
              Chaque recommandation de ce guide est basée sur une expérience personnelle et des années de terrain.
            </p>
          </div>
        </section>

        {/* Acheter */}
        <section id="acheter" className="py-20 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>
              GUIDE SIGNATURE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}>
              Guide Casamance
            </h2>
            <div className="text-5xl font-bold mb-2" style={{ color: '#F6C961' }}>29 €</div>
            <p className="text-sm mb-2 opacity-60" style={{ color: '#FEFCF9' }}>Paiement unique. Pas d&apos;abonnement.</p>
            <p className="text-xs mb-8 opacity-40" style={{ color: '#FEFCF9' }}>Satisfait ou remboursé 14 jours</p>

            <a
              href="/api/checkout?product=guide_casamance"
              className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Acheter le guide (29 €)
            </a>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(254,252,249,0.15)' }}>
              <p className="text-sm opacity-60" style={{ color: '#FEFCF9' }}>
                Les 2 guides ensemble pour 49 € ?{' '}
                <Link href="/guides/bundle-decouverte" className="font-semibold underline" style={{ color: '#F6C961' }}>
                  Voir le bundle →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="FAQ" title="Questions fréquentes" centered />
            <div className="mt-10">
              <FAQAccordion items={FAQ} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
