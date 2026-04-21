import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import TestimonialCard from '@/components/TestimonialCard'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guide Casamance | 50-70 pages, contacts vérifiés',
  description: 'Le guide complet pour organiser votre voyage en Casamance. 200+ adresses, contacts WhatsApp vérifiés, itinéraires testés. 29 €.',
  openGraph: {
    title: 'Guide Casamance | 50-70 pages, contacts vérifiés',
    description: 'Le guide complet pour organiser votre voyage en Casamance. 200+ adresses, contacts WhatsApp vérifiés, itinéraires testés. 29 €.',
  },
}

const SOMMAIRE = [
  'Introduction : pourquoi la Casamance est différente',
  'Quand y aller : saison par saison',
  'Comment y aller : vol, ferry, route',
  'Itinéraires recommandés : 5, 7 et 14 jours',
  'Les 20 expériences incontournables',
  'Hébergements testés et notés (contact direct)',
  'Restaurants et adresses locales',
  'Chauffeurs et piroguiers de confiance',
  'Budget type par profil',
  'Conseils culturels (codes diolas)',
  'Carte interactive (QR code Google Maps)',
  'Bonus : checklist Casamance, fiche sécurité, lexique diola',
]

const FAQ = [
  { q: 'Dans quel format est le guide ?', a: 'PDF haute qualité, optimisé pour mobile et tablette. Lisible hors ligne.' },
  { q: 'Les contacts sont-ils vraiment à jour ?', a: 'Oui. Chaque numéro, chaque adresse est vérifié tous les trimestres. Si un contact change, vous recevez la mise à jour gratuitement pendant 12 mois.' },
  { q: 'Comment se passe la livraison ?', a: 'Immédiate. Après le paiement, vous recevez le guide par email en quelques secondes.' },
  { q: 'Et si le guide ne me convient pas ?', a: 'Satisfait ou remboursé 14 jours, sans condition. Un email suffit.' },
  { q: 'Puis-je utiliser ce guide pour un usage commercial ?', a: "Non, le guide est réservé à un usage personnel. Pour un usage professionnel (agence, blog), contactez-nous." },
  { q: 'Les hébergements sont-ils partenaires de TripAfro ?', a: "Certains oui, d'autres non. Chaque recommandation est basée sur une expérience réelle, pas sur un partenariat commercial." },
]

export default function GuideCasamancePage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="GUIDE SIGNATURE"
          title="Guide Casamance"
          subtitle="50-70 pages pour organiser votre voyage en Casamance, avec les contacts directs des meilleurs prestataires"
          badges={['50-70 pages', '200+ adresses', 'Contacts vérifiés', '29 €']}
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
                { icon: '⏰', title: 'Des heures de recherche', description: 'Plus besoin de fouiller 50 blogs contradictoires. Tout est centralisé, vérifié, à jour.' },
                { icon: '💸', title: 'Des erreurs de débutant', description: "Mauvais taux de change, arnaques taxis, hébergements douteux : le guide vous protège." },
                { icon: '📞', title: 'Des contacts obsolètes', description: 'Chaque numéro de téléphone, chaque WhatsApp est vérifié tous les trimestres.' },
                { icon: '🗺️', title: 'Du temps perdu sur place', description: "L'itinéraire est optimisé. Pas de détours inutiles, pas de mauvaises surprises." },
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
                {['PDF téléchargeable immédiatement', 'Contacts WhatsApp vérifiés', 'Itinéraires 5, 7 et 14 jours', 'Carte interactive QR code', 'Mises à jour 12 mois', 'Bonus : checklist + lexique diola', 'Support email si question'].map((item, i) => (
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
                {['Réservation des hébergements (vous le faites vous-même)', 'Accompagnement sur place', 'Billets d\'avion', 'Assurance voyage'].map((item, i) => (
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
              <TestimonialCard name="Amina K." location="Lyon" quote="Le guide Casamance m'a permis d'organiser 10 jours incroyables sans agence. Les contacts piroguiers sont en or." stars={5} />
              <TestimonialCard name="Thomas R." location="Paris" quote="J'ai voyagé seul en Casamance grâce à ce guide. Chaque adresse était fiable, chaque conseil pertinent." stars={5} />
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
            <p className="text-xs mb-8 opacity-40" style={{ color: '#FEFCF9' }}>Satisfait ou remboursé 14 jours · Mises à jour 12 mois</p>

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
