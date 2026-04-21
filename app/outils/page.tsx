import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo/jsonld'

const TOOLS = [
  {
    href: '/outils/calculateur-commission-booking',
    badge: 'Hôteliers',
    title: 'Calculateur commission Booking',
    description:
      'Combien Booking vous prend chaque année, et ce que vous pourriez récupérer en passant 30 % de vos réservations en direct. Résultat en FCFA en 30 secondes.',
    available: true,
  },
  {
    href: '#chatbot',
    badge: 'Voyageurs',
    title: 'Assistant TripAfro (chatbot IA)',
    description:
      "Posez votre question sur le Sénégal, les visas, les prix ou la diaspora. Réponses 24/7 par notre assistant IA entraîné par Roseline. Disponible en bas à droite de chaque page.",
    available: true,
  },
  {
    href: '#soon',
    badge: 'Bientôt',
    title: "D'autres outils arrivent",
    description:
      'Simulateur ROI site web pour hôteliers, générateur de réponses aux avis, audit présence Google Business… La roadmap se construit en fonction de vos retours.',
    available: false,
  },
]

export default function OutilsHubPage() {
  return (
    <>
      <Nav variant="solid" />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', path: '/' },
          { name: 'Outils', path: '/outils' },
        ])}
      />
      <main style={{ backgroundColor: '#FEFCF9' }}>
        {/* Hero */}
        <section className="pt-32 pb-16 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: '#560E13' }}
            >
              Outils gratuits
            </p>
            <h1
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
            >
              Des outils IA pour décider plus vite
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Créés par Roseline Ngom pour les hôteliers sénégalais et les voyageurs qui
              préparent leur séjour. Gratuits, sans création de compte, résultats
              instantanés.
            </p>
          </div>
        </section>

        {/* Liste */}
        <section className="py-12 px-5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOOLS.map((tool) => {
              const card = (
                <div
                  className="h-full p-6 rounded-lg transition-transform hover:-translate-y-1"
                  style={{
                    backgroundColor: '#F8F5F0',
                    border: '1px solid #E5E0D6',
                    opacity: tool.available ? 1 : 0.6,
                  }}
                >
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                    style={{ backgroundColor: '#560E13', color: '#F6C961' }}
                  >
                    {tool.badge}
                  </span>
                  <h2
                    className="text-2xl mb-3"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      color: '#560E13',
                    }}
                  >
                    {tool.title}
                  </h2>
                  <p className="text-sm opacity-80 leading-relaxed">{tool.description}</p>
                  {tool.available && tool.href.startsWith('/') && (
                    <p className="mt-4 text-sm font-medium" style={{ color: '#560E13' }}>
                      Utiliser l&apos;outil →
                    </p>
                  )}
                </div>
              )
              return tool.available && tool.href.startsWith('/') ? (
                <Link key={tool.href} href={tool.href} className="block">
                  {card}
                </Link>
              ) : (
                <div key={tool.title}>{card}</div>
              )
            })}
          </div>
        </section>

        {/* Promesse démo */}
        <section className="py-16 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="POURQUOI CES OUTILS"
              title="Des démonstrations, pas des gadgets"
              centered
            />
            <p className="mt-6 text-base opacity-80">
              Ces outils servent à deux choses : vous aider concrètement maintenant, et
              vous montrer ce que Roseline peut installer chez vous. Si vous aimez ce que
              vous voyez, parlons de votre projet digital.
            </p>
            <Link
              href="/consulting"
              className="inline-block mt-6 px-6 py-3 rounded-md text-sm font-medium"
              style={{ backgroundColor: '#560E13', color: '#F6C961' }}
            >
              Découvrir le consulting digital
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
