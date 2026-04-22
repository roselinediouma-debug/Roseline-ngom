import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Ressources gratuites, guides Sénégal & tourisme',
  description:
    'Guides PDF gratuits pour préparer votre Sénégal : carnet d\'adresses, guide diaspora Le Bled Autrement, benchmark institutionnel et newsletter La Teranga.',
  path: '/ressources',
  ogImage: '/images/og/ressources.jpg',
})

const RESOURCES = [
  {
    title: '15 experiences secretes au Senegal',
    format: 'PDF · 33 pages',
    description:
      'Mon carnet d\'adresses personnel. 15 lieux, contacts directs, astuces locales. Le guide que je donne a mes amis avant leur premier voyage.',
    href: '/ressources/guide-15-experiences',
    cta: 'Telecharger gratuitement',
    icon: '📖',
    badge: 'Le plus populaire',
  },
  {
    title: 'Le Bled Autrement',
    format: 'PDF · 14 pages · Diaspora',
    description:
      'Le guide pour la diaspora qui veut enfin vivre le Sénégal autrement qu’en touriste. Les 3 types de retour, les blocages silencieux, comment transmettre aux enfants.',
    href: '/ressources/le-bled-autrement',
    cta: 'Telecharger gratuitement',
    icon: '🌍',
    badge: 'Nouveau',
  },
  {
    title: 'Benchmark Bénin · Maroc · Rwanda',
    format: 'PDF · Institutionnel',
    description:
      'Politique touristique comparée : ce que le Sénégal peut apprendre de 3 pays africains qui ont réussi leur transformation. Pour décideurs tourisme.',
    href: '/ressources/benchmark-institutionnel',
    cta: 'Telecharger gratuitement',
    icon: '📊',
    badge: null,
  },
  {
    title: 'Newsletter La Teranga',
    format: 'Email · Bi-mensuel',
    description:
      'Deux fois par mois, je partage ce que je garde pour mes lecteurs les plus fideles. Coulisses, bons plans, recits de terrain.',
    href: '/ressources/newsletter',
    cta: 'S\'inscrire gratuitement',
    icon: '💌',
    badge: null,
  },
]

export default function RessourcesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main>
        <SalesPageHero
          eyebrow="RESSOURCES GRATUITES"
          title="Avant de voyager avec nous, decouvrez ce que nous savons"
          subtitle="4 ressources gratuites pour preparer votre Senegal"
        />

        {/* Resource Cards */}
        <section className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {RESOURCES.map((resource) => (
                <div
                  key={resource.title}
                  className="relative rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: '#F8F5F0',
                    border: '1px solid rgba(86,14,19,0.08)',
                    boxShadow: '0 4px 24px rgba(86,14,19,0.06)',
                  }}
                >
                  {resource.badge && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                    >
                      {resource.badge}
                    </div>
                  )}

                  {/* Icon area */}
                  <div
                    className="flex items-center justify-center py-10"
                    style={{ backgroundColor: '#560E13' }}
                  >
                    <span className="text-6xl">{resource.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4"
                      style={{
                        backgroundColor: 'rgba(86,14,19,0.08)',
                        color: '#560E13',
                      }}
                    >
                      {resource.format}
                    </span>

                    <h3
                      className="text-xl font-bold mb-3"
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                        color: '#560E13',
                      }}
                    >
                      {resource.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-6 flex-1"
                      style={{ color: 'rgba(10,10,10,0.65)' }}
                    >
                      {resource.description}
                    </p>

                    <Link
                      href={resource.href}
                      className="block w-full py-3.5 rounded-xl text-sm font-bold text-center uppercase tracking-wider transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
                    >
                      {resource.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <p className="text-sm mb-4" style={{ color: 'rgba(10,10,10,0.5)' }}>
                Vous cherchez des guides complets avec itineraires et contacts verifies ?
              </p>
              <Link
                href="/guides"
                className="inline-block px-8 py-3.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Voir nos guides signatures
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
