import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import ComparisonTable from '@/components/ComparisonTable'
import TestimonialCard from '@/components/TestimonialCard'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guides Signatures | Roseline Ngom',
  description: 'Guides PDF pour organiser votre voyage au Sénégal. Contacts vérifiés, itinéraires heure par heure, 200+ adresses.',
  openGraph: {
    title: 'Guides Signatures | Roseline Ngom',
    description: 'Guides PDF pour organiser votre voyage au Sénégal. Contacts vérifiés, itinéraires heure par heure, 200+ adresses.',
  },
}

const GUIDES = [
  {
    title: 'Guide Casamance',
    pages: '50-70 pages',
    price: '29 €',
    description: 'Tout pour organiser votre voyage en Casamance : itinéraires, contacts vérifiés, hébergements testés, chauffeurs recommandés.',
    href: '/guides/guide-casamance',
  },
  {
    title: 'Le Sénégal en 7 jours',
    pages: '50-60 pages',
    price: '29 €',
    description: "L'itinéraire optimisé heure par heure pour découvrir l'essentiel du Sénégal en une semaine.",
    href: '/guides/guide-senegal-7jours',
  },
]

const FAQ_ITEMS = [
  { q: 'Dans quel format est livré le guide ?', a: 'PDF haute qualité, lisible sur téléphone, tablette et ordinateur. Vous le recevez par email immédiatement après achat.' },
  { q: 'Comment se passe le paiement ?', a: 'Paiement sécurisé par carte bancaire via Stripe. Vous recevez une facture automatiquement.' },
  { q: 'Les informations sont-elles à jour ?', a: 'Oui. Chaque guide est mis à jour tous les trimestres. Vous recevez les mises à jour gratuitement pendant 12 mois.' },
  { q: 'Puis-je me faire rembourser ?', a: 'Oui, satisfait ou remboursé pendant 14 jours, sans condition. Un simple email suffit.' },
  { q: 'Puis-je partager le guide ?', a: "Le guide est réservé à un usage personnel. Merci de ne pas le redistribuer. Si vos amis veulent le guide, partagez-leur le lien : c'est le meilleur soutien." },
  { q: 'Quelle est la différence avec le guide gratuit ?', a: 'Le guide gratuit présente 15 expériences avec des conseils généraux. Les Guides Signatures contiennent les contacts directs, les prix négociés, les itinéraires heure par heure, et 200+ adresses vérifiées.' },
]

export default function GuidesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main>
        <SalesPageHero
          eyebrow="GUIDES SIGNATURES"
          title="Les guides qui vous rendent autonomes"
          subtitle="Tout ce qu'il faut pour organiser votre voyage au Sénégal vous-même, sans agence, sans incertitude"
          ctaPrimary={{ label: 'Voir les guides', href: '#guides' }}
        />

        {/* Comparaison */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="POURQUOI C'EST DIFFÉRENT"
              title="Guide gratuit, blog, ou Guide Signature ?"
              subtitle="Comparez et voyez la différence"
              centered
            />
            <div className="mt-12">
              <ComparisonTable
                columns={[
                  { name: 'Blog internet' },
                  { name: 'Guide gratuit' },
                  { name: 'Guide Signature', highlighted: true },
                ]}
                rows={[
                  { feature: 'Contacts vérifiés (WhatsApp, tel)', values: [false, false, true] },
                  { feature: 'Itinéraire heure par heure', values: [false, false, true] },
                  { feature: 'Prix négociés hébergements', values: [false, false, true] },
                  { feature: 'Mise à jour garantie 12 mois', values: [false, false, true] },
                  { feature: 'Adresses secrètes', values: [false, 'Quelques-unes', '200+'] },
                  { feature: 'Chauffeurs recommandés par nom', values: [false, false, true] },
                  { feature: 'Budget détaillé par profil', values: [false, false, true] },
                  { feature: 'Carte interactive QR code', values: [false, false, true] },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Les guides */}
        <section id="guides" className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="NOS GUIDES" title="Choisissez votre destination" centered />

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {GUIDES.map((guide) => (
                <Link key={guide.href} href={guide.href} className="block group">
                  <div
                    className="rounded-2xl p-8 transition-all duration-300 group-hover:scale-[1.02] h-full"
                    style={{ backgroundColor: '#FEFCF9', border: '2px solid #e0d8d0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#F6C961', color: '#560E13' }}>
                        {guide.pages}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#560E13', color: '#F6C961' }}>
                        {guide.price}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
                      {guide.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-70 mb-6">{guide.description}</p>
                    <span className="text-sm font-semibold" style={{ color: '#560E13' }}>
                      Découvrir le guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bundle */}
            <Link href="/guides/bundle-decouverte" className="block mt-8 group">
              <div
                className="rounded-2xl p-8 text-center transition-all duration-300 group-hover:scale-[1.01]"
                style={{ backgroundColor: '#560E13', border: '2px solid #F6C961' }}
              >
                <span
                  className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                >
                  ÉCONOMIE 9 €
                </span>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}>
                  Bundle Découverte : les 2 guides
                </h3>
                <p className="text-lg font-bold mb-2" style={{ color: '#F6C961' }}>49 € au lieu de 58 €</p>
                <p className="text-sm opacity-70" style={{ color: '#FEFCF9' }}>
                  120 pages. 200+ adresses. 50+ contacts vérifiés. Le combo parfait.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Garantie */}
        <section className="py-16 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
              Satisfait ou remboursé 14 jours
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Si le guide ne correspond pas à vos attentes, un simple email et vous êtes remboursé. Sans condition, sans question.
              Vous bénéficiez aussi de 12 mois de mises à jour gratuites : contacts, prix, nouvelles adresses.
            </p>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="ILS ONT ACHETÉ" title="Ce que disent nos lecteurs" centered />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <TestimonialCard name="Fatou D." location="Paris" quote="Ce guide m'a fait économiser des heures de recherche. Les contacts sont vraiment à jour, j'ai pu appeler les chauffeurs directement." stars={5} />
              <TestimonialCard name="Marc L." location="Bruxelles" quote="Premier voyage au Sénégal organisé entièrement avec ce guide. Tout était parfait, les adresses, les prix, les conseils. Merci Roseline." stars={5} />
              <TestimonialCard name="Aminata S." location="Montréal" quote="J'ai offert le bundle à mes parents qui partaient pour la première fois. Ils m'ont dit que c'était le meilleur cadeau qu'on pouvait leur faire." stars={5} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="FAQ" title="Questions fréquentes" centered />
            <div className="mt-10">
              <FAQAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}>
              Prêt à organiser votre voyage ?
            </h2>
            <p className="text-sm mb-8 opacity-70" style={{ color: '#FEFCF9' }}>
              Choisissez votre guide et partez l'esprit tranquille.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides/guide-casamance" className="px-8 py-4 rounded-xl font-bold text-center transition-opacity hover:opacity-90" style={{ backgroundColor: '#F6C961', color: '#560E13' }}>
                Guide Casamance (29 €)
              </Link>
              <Link href="/guides/bundle-decouverte" className="px-8 py-4 rounded-xl font-bold text-center transition-opacity hover:opacity-90" style={{ border: '2px solid #F6C961', color: '#F6C961' }}>
                Bundle Découverte (49 €)
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
