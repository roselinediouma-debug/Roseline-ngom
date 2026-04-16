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
  title: 'Le Sénégal en 7 jours | Guide optimisé',
  description: "Itinéraire heure par heure pour découvrir l'essentiel du Sénégal en une semaine. 3 niveaux de budget. 29 €.",
  openGraph: {
    title: 'Le Sénégal en 7 jours | Guide optimisé',
    description: "Itinéraire heure par heure pour découvrir l'essentiel du Sénégal en une semaine. 3 niveaux de budget. 29 €.",
  },
}

const ITINERAIRE = [
  { jour: 'Jour 1-2', lieu: 'Dakar', desc: 'Gorée, marché Sandaga, Ngor, Almadies, nightlife' },
  { jour: 'Jour 3', lieu: 'Lac Rose', desc: 'Excursion demi-journée, baignade, quad, retour Dakar' },
  { jour: 'Jour 4-5', lieu: 'Sine Saloum', desc: 'Pirogue bolongs, Fadiouth, pêche, mangroves UNESCO' },
  { jour: 'Jour 6', lieu: 'Saly & Bandia', desc: 'Réserve de Bandia, plage Somone, marché Mbour' },
  { jour: 'Jour 7', lieu: 'Gorée & Retour', desc: 'Île de Gorée si pas fait J1, derniers achats, départ' },
]

const FAQ = [
  { q: 'Le programme est-il flexible ?', a: "Oui. L'itinéraire est une recommandation optimisée. Vous pouvez l'adapter selon vos envies et votre rythme." },
  { q: 'Le guide inclut-il les billets d\'avion ?', a: 'Non, le guide couvre uniquement l\'organisation sur place : hébergements, transports internes, activités, contacts.' },
  { q: 'Est-ce adapté aux familles avec enfants ?', a: 'Oui. Le guide propose des variantes par profil : solo, couple, famille. Les hébergements sont notés pour l\'accueil enfants.' },
  { q: 'Combien coûte une semaine au Sénégal ?', a: 'Le guide détaille 3 budgets : économique (600-800 €/pers), moyen (1 000-1 500 €/pers), premium (2 000+ €/pers), hors vol.' },
  { q: 'Livraison et format ?', a: 'PDF immédiat par email après paiement. Lisible sur téléphone, tablette, ordinateur.' },
  { q: 'Remboursement possible ?', a: 'Oui, satisfait ou remboursé 14 jours sans condition.' },
]

export default function GuideSenegal7JoursPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="GUIDE SIGNATURE"
          title="Le Sénégal en 7 jours"
          subtitle="L'itinéraire optimisé heure par heure pour découvrir l'essentiel du Sénégal en une semaine"
          badges={['50-60 pages', 'Heure par heure', '3 niveaux de budget', '29 €']}
          ctaPrimary={{ label: 'Acheter le guide (29 €)', href: '#acheter' }}
        />

        {/* Le pitch */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}>
              Vous avez une semaine pour découvrir le Sénégal. Pas deux. Pas trois. Une.
            </p>
            <p className="text-sm leading-relaxed opacity-70 mb-4">
              Et vous voulez voir ce qui compte, manger ce qui compte, vivre ce qui compte.
            </p>
            <p className="text-sm leading-relaxed opacity-70">
              Ce guide est l&apos;itinéraire que je donnerais à ma meilleure amie si elle me disait :
              &laquo;&nbsp;Roseline, je pars 7 jours, organise-moi tout.&nbsp;&raquo;
            </p>
          </div>
        </section>

        {/* Itinéraire */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="L'ITINÉRAIRE" title="7 jours, optimisés pour vous" centered />
            <div className="mt-12 space-y-0">
              {ITINERAIRE.map((item, i) => (
                <div key={i} className="flex gap-6 py-6" style={{ borderBottom: '1px solid #e0d8d0' }}>
                  <div className="flex-shrink-0 w-20">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F6C961' }}>{item.jour}</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#560E13' }}>{item.lieu}</h4>
                    <p className="text-sm opacity-70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ce qui est inclus */}
        <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="CONTENU COMPLET" title="Ce que vous trouverez dans le guide" centered />
            <div className="mt-12">
              <FeatureGrid features={[
                { icon: '🕐', title: 'Programme heure par heure', description: 'Pas juste jour par jour. Chaque journée est planifiée avec horaires précis.' },
                { icon: '🏨', title: 'Hébergements par budget', description: '3 niveaux : économique, moyen, premium. Avec contacts directs et tarifs négociés.' },
                { icon: '🚗', title: 'Chauffeurs recommandés', description: 'Noms, numéros WhatsApp, tarifs. Des personnes de confiance testées par Roseline.' },
                { icon: '💰', title: 'Budget détaillé', description: 'Combien prévoir par jour, par personne, par activité. 3 scénarios réalistes.' },
                { icon: '⚠️', title: '10 erreurs à éviter', description: 'Les pièges classiques des premiers voyageurs au Sénégal, et comment les contourner.' },
                { icon: '📍', title: 'Carte interactive', description: 'QR code vers Google Maps avec tous les points du guide. Utilisable hors ligne.' },
              ]} />
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="AVIS" title="Ils ont suivi l'itinéraire" centered />
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <TestimonialCard name="Julie M." location="Bordeaux" quote="7 jours parfaitement organisés. On n'a perdu aucun temps grâce au programme heure par heure. Un vrai gain." stars={5} />
              <TestimonialCard name="Ibrahima D." location="Genève" quote="Mon premier voyage au Sénégal, organisé seul avec ce guide. Résultat : le meilleur voyage de ma vie." stars={5} />
              <TestimonialCard name="Claire V." location="Toulouse" quote="Le budget détaillé nous a permis de ne pas avoir de mauvaise surprise. Tout correspondait aux prix annoncés." stars={5} />
            </div>
          </div>
        </section>

        {/* Acheter */}
        <section id="acheter" className="py-20 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>GUIDE SIGNATURE</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}>
              Le Sénégal en 7 jours
            </h2>
            <div className="text-5xl font-bold mb-2" style={{ color: '#F6C961' }}>29 €</div>
            <p className="text-sm mb-2 opacity-60" style={{ color: '#FEFCF9' }}>Paiement unique. Livraison immédiate.</p>
            <p className="text-xs mb-8 opacity-40" style={{ color: '#FEFCF9' }}>Satisfait ou remboursé 14 jours · Mises à jour 12 mois</p>
            <a
              href="/api/checkout?product=guide_senegal_7j"
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
            <div className="mt-10"><FAQAccordion items={FAQ} /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
