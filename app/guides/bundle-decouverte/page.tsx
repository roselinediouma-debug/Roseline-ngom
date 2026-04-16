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
  title: 'Bundle Découverte | 2 guides pour 49 €',
  description: 'Les guides Casamance et Sénégal en 7 jours ensemble. 120+ pages, 200+ adresses, économie de 9 €.',
  openGraph: {
    title: 'Bundle Découverte | 2 guides pour 49 €',
    description: 'Les guides Casamance et Sénégal en 7 jours ensemble. 120+ pages, 200+ adresses, économie de 9 €.',
  },
}

const FAQ = [
  { q: 'Dans quel format sont les guides ?', a: 'Les deux guides sont en PDF haute qualité, optimisés pour mobile et tablette. Lisibles hors ligne, livrés immédiatement par email.' },
  { q: 'Quelle est la différence avec l\'achat individuel ?', a: 'Le contenu est identique. Le bundle vous permet simplement d\'obtenir les deux guides ensemble avec une économie de 9 € par rapport à l\'achat séparé.' },
  { q: 'Puis-je me faire rembourser ?', a: 'Oui. Satisfait ou remboursé 14 jours, sans condition. Un simple email suffit.' },
  { q: 'Les guides sont-ils mis à jour ?', a: 'Oui. Vous recevez toutes les mises à jour gratuitement pendant 12 mois après votre achat. Contacts, adresses, prix : tout est vérifié chaque trimestre.' },
  { q: 'Comment se passe la livraison ?', a: 'Immédiate. Après le paiement, vous recevez les deux guides par email en quelques secondes.' },
]

export default function BundleDecouvertePage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="OFFRE BUNDLE"
          title="Bundle Découverte"
          subtitle="Les deux guides essentiels pour découvrir le Sénégal, réunis en une seule offre à prix réduit"
          badges={['120+ pages', '200+ adresses', '50+ contacts', '49 € au lieu de 58 €']}
          ctaPrimary={{ label: 'Acheter le bundle (49 €)', href: '#acheter' }}
        />

        {/* Pourquoi le bundle */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="POURQUOI LE BUNDLE"
              title="Deux guides, un seul achat"
              centered
            />
            <div className="mt-12">
              <FeatureGrid features={[
                { icon: '🌍', title: 'Couverture complète', description: 'De Dakar au Sine Saloum avec le guide 7 jours, puis la Casamance en profondeur. Tout le Sénégal est couvert.' },
                { icon: '💰', title: '9 € d\'économie', description: 'Les deux guides achetés séparément coûtent 58 €. En bundle, vous payez 49 €. Simple et avantageux.' },
                { icon: '🔗', title: 'Itinéraires complémentaires', description: 'Le guide 7 jours couvre le nord et le centre. Le guide Casamance couvre le sud. Ensemble, ils forment un voyage complet.' },
                { icon: '📇', title: 'Tous les contacts en un achat', description: 'Hébergements, chauffeurs, piroguiers, restaurants : plus de 50 contacts vérifiés pour tout le pays, en une seule commande.' },
              ]} />
            </div>
          </div>
        </section>

        {/* Ce qui est inclus */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader eyebrow="CONTENU" title="Ce qui est inclus" centered />
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Guide Casamance */}
              <Link href="/guides/guide-casamance" className="block p-8 rounded-2xl transition-shadow hover:shadow-lg" style={{ backgroundColor: '#FEFCF9', border: '1px solid #e0d8d0' }}>
                <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#F6C961' }}>Guide 1</div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
                  Guide Casamance
                </h3>
                <p className="text-sm opacity-70 mb-4">
                  50-70 pages pour organiser votre voyage en Casamance avec les contacts directs des meilleurs prestataires.
                </p>
                <ul className="space-y-2 text-sm">
                  {['50-70 pages', '200+ adresses vérifiées', 'Itinéraires 5, 7 et 14 jours', 'Carte interactive QR code'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#F6C961' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm font-semibold" style={{ color: '#560E13' }}>
                  Voir le détail →
                </div>
              </Link>

              {/* Le Sénégal en 7 jours */}
              <Link href="/guides/guide-senegal-7jours" className="block p-8 rounded-2xl transition-shadow hover:shadow-lg" style={{ backgroundColor: '#FEFCF9', border: '1px solid #e0d8d0' }}>
                <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#F6C961' }}>Guide 2</div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
                  Le Sénégal en 7 jours
                </h3>
                <p className="text-sm opacity-70 mb-4">
                  50-60 pages avec un programme optimisé heure par heure pour découvrir l&apos;essentiel du Sénégal en une semaine.
                </p>
                <ul className="space-y-2 text-sm">
                  {['50-60 pages', 'Programme heure par heure', '3 niveaux de budget', 'Chauffeurs recommandés'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#F6C961' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm font-semibold" style={{ color: '#560E13' }}>
                  Voir le détail →
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="AVIS ACHETEURS" title="Ce qu'ils en disent" centered />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <TestimonialCard name="Sophie L." location="Nantes" quote="J'ai pris le bundle pour un mois au Sénégal. Le guide 7 jours pour Dakar et le nord, puis la Casamance pour la suite. Parfait." stars={5} />
              <TestimonialCard name="Moussa B." location="Bruxelles" quote="L'économie de 9 euros, c'est anecdotique. Ce qui compte, c'est d'avoir tout au même endroit. Aucune perte de temps." stars={5} />
              <TestimonialCard name="Fatou S." location="Marseille" quote="J'ai offert le bundle à mes parents pour leur premier voyage au Sénégal. Ils ont tout organisé seuls, sans agence." stars={5} />
            </div>
          </div>
        </section>

        {/* Acheter */}
        <section id="acheter" className="py-20 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>
              OFFRE BUNDLE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}>
              Bundle Découverte
            </h2>
            <div className="mb-2">
              <span className="text-2xl line-through opacity-50 mr-3" style={{ color: '#FEFCF9' }}>58 €</span>
              <span className="text-5xl font-bold" style={{ color: '#F6C961' }}>49 €</span>
            </div>
            <p className="text-sm font-semibold mb-2" style={{ color: '#F6C961' }}>Economie de 9 €</p>
            <p className="text-sm mb-2 opacity-60" style={{ color: '#FEFCF9' }}>Paiement unique. Livraison immédiate.</p>
            <p className="text-xs mb-8 opacity-40" style={{ color: '#FEFCF9' }}>Satisfait ou remboursé 14 jours · Mises à jour 12 mois</p>

            <a
              href="/api/checkout?product=bundle_decouverte"
              className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Acheter le bundle (49 €)
            </a>
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
