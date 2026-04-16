import Link from 'next/link'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Digital & IA | Roseline Ngom',
  description: 'Accélérez votre croissance digitale. Présence en ligne, transformation digitale, IA appliquée, formations.',
  openGraph: {
    title: 'Digital & IA | Roseline Ngom',
    description: 'Accélérez votre croissance digitale. Présence en ligne, transformation digitale, IA appliquée, formations.',
  },
}

const expertises = [
  {
    title: 'Presence Digitale',
    price: '1 500 \u20ac/mois',
    description: 'Reseaux sociaux, creation de contenu et community management. Votre marque visible et coherente, chaque jour.',
    href: '/digital-ia/presence-digitale',
  },
  {
    title: 'Transformation Digitale',
    price: '8 500 - 15 000 \u20ac',
    description: 'Site web, CRM, automatisation : une refonte complete de vos outils pour passer au niveau superieur.',
    href: '/digital-ia/transformation',
  },
  {
    title: 'IA Appliquee',
    price: '3 500 - 12 000 \u20ac',
    description: 'Integrez l\u2019intelligence artificielle dans vos operations pour gagner du temps et prendre de meilleures decisions.',
    href: '/digital-ia/ia-appliquee',
  },
  {
    title: 'Formations',
    price: '2 500 - 15 000 \u20ac',
    description: 'Montez en competences vos equipes sur le digital et l\u2019IA avec des programmes concrets et sur mesure.',
    href: '/digital-ia/formations',
  },
]

export default function DigitalIAPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="DIGITAL & IA"
          title="Accelerez votre croissance digitale"
          subtitle="Transformation digitale et intelligence artificielle au service des entreprises africaines et des entrepreneurs de la diaspora. Passez de l\u2019invisible au incontournable."
          ctaPrimary={{ label: 'Decouvrir nos expertises', href: '#expertises' }}
          ctaSecondary={{ label: 'Audit flash gratuit', href: 'https://calendly.com/roselinengom/decouverte-15min' }}
        />

        {/* Nos expertises */}
        <section id="expertises" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="NOS EXPERTISES"
              title="Quatre leviers pour votre croissance digitale"
              subtitle="Chaque entreprise a des besoins differents. Choisissez l\u2019expertise qui correspond a votre etape."
              centered
            />

            <div className="mt-14 grid md:grid-cols-2 gap-8">
              {expertises.map((e) => (
                <Link
                  key={e.title}
                  href={e.href}
                  className="group rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: '#FEFCF9',
                    border: '1px solid rgba(86,14,19,0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="p-8 flex flex-col flex-1">
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                        color: '#0A0A0A',
                      }}
                    >
                      {e.title}
                    </h3>
                    <p
                      className="text-sm font-semibold uppercase tracking-wide mb-4"
                      style={{ color: '#560E13' }}
                    >
                      {e.price}
                    </p>
                    <p
                      className="text-base leading-relaxed flex-1 mb-6"
                      style={{ color: 'rgba(10,10,10,0.7)' }}
                    >
                      {e.description}
                    </p>
                    <span
                      className="text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block"
                      style={{ color: '#F6C961' }}
                    >
                      Decouvrir &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Audit flash */}
        <section className="py-20 px-6" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
              }}
            >
              Pas sur de ce qu&apos;il vous faut ?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Reservez un audit flash gratuit de 15 minutes. On analyse votre situation et on vous oriente vers la bonne solution.
            </p>
            <Link
              href="https://calendly.com/roselinengom/decouverte-15min"
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: '#F6C961',
                color: '#560E13',
              }}
            >
              Audit flash gratuit (15 min)
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
