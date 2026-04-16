import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos | Roseline Ngom',
  description: "Fondatrice de TripAfro, experte voyage et stratégie digitale pour l'Afrique. 10+ ans d'expérience.",
  openGraph: {
    title: 'À propos | Roseline Ngom',
    description: "Fondatrice de TripAfro, experte voyage et stratégie digitale pour l'Afrique. 10+ ans d'expérience.",
  },
}

const VOLETS = [
  {
    icon: '🌍',
    title: 'TripAfro Voyages',
    description: 'Sejours immersifs et authentiques au Senegal et en Afrique de l\'Ouest.',
    href: '/voyages',
  },
  {
    icon: '📖',
    title: 'Guides Signatures',
    description: 'Guides PDF complets avec itineraires, contacts verifies et adresses testees.',
    href: '/guides',
  },
  {
    icon: '🎯',
    title: 'Consulting Strategique',
    description: 'Accompagnement pour vos projets en Afrique : audit, strategie, execution.',
    href: '/consulting',
  },
  {
    icon: '💡',
    title: 'Digital & IA',
    description: 'Formation et accompagnement en strategie digitale et intelligence artificielle.',
    href: '/digital-ia',
  },
  {
    icon: '🎁',
    title: 'Ressources Gratuites',
    description: 'Guides gratuits, newsletter et contenus exclusifs pour preparer votre voyage.',
    href: '/ressources',
  },
]

const VALEURS = [
  {
    title: 'Authenticite',
    description:
      'Des experiences reelles, loin des circuits touristiques classiques. Chaque recommandation vient du terrain.',
  },
  {
    title: 'Autonomie',
    description:
      'Rendre chaque voyageur autonome et confiant, avec toutes les informations pour voyager seul ou en groupe.',
  },
  {
    title: 'Excellence',
    description:
      'La qualite dans chaque detail : guides, voyages, accompagnement. Aucun compromis sur l\'experience.',
  },
]

export default function AProposPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#560E13' }}>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#FEFCF9',
            }}
          >
            Roseline Ngom
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(254,252,249,0.75)' }}>
            Fondatrice de TripAfro, experte voyage et strategie digitale pour l&apos;Afrique
          </p>
        </section>

        {/* ── Bio ── */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-3xl mx-auto">
            {/* Initials circle */}
            <div className="flex justify-center mb-10">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#560E13' }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    color: '#FEFCF9',
                  }}
                >
                  RN
                </span>
              </div>
            </div>

            <div className="space-y-5 text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
              <p>
                Senegalaise de la diaspora, j&apos;ai grandi entre deux cultures avec une seule obsession :
                rendre l&apos;Afrique de l&apos;Ouest accessible a ceux qui veulent la decouvrir vraiment,
                au-dela des cliches.
              </p>
              <p>
                Apres plus de 10 ans d&apos;experience entre la France et le Senegal, j&apos;ai fonde
                TripAfro pour offrir une alternative aux voyages standardises. Des sejours immersifs,
                des guides concrets, un accompagnement humain.
              </p>
              <p>
                Aujourd&apos;hui, notre communaute reunit plus de 35 000 membres sur les reseaux sociaux :
                voyageurs, entrepreneurs, membres de la diaspora et curieux du continent africain.
              </p>
              <p>
                Mon approche est simple : du terrain, de l&apos;authenticite, et zero compromis sur la qualite.
                Chaque guide, chaque voyage, chaque conseil vient de mon experience directe.
              </p>
            </div>
          </div>
        </section>

        {/* ── Les 5 volets ── */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="L'ECOSYSTEME" title="Les 5 volets de TripAfro" centered />

            <div className="mt-12 space-y-4">
              {VOLETS.map((v) => (
                <Link key={v.title} href={v.href} className="block group">
                  <div
                    className="flex items-start gap-4 p-5 rounded-xl transition-all group-hover:scale-[1.01]"
                    style={{
                      backgroundColor: '#FEFCF9',
                      border: '1px solid #e0d8d0',
                    }}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{v.icon}</span>
                    <div>
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{
                          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                          color: '#0A0A0A',
                        }}
                      >
                        {v.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
                        {v.description}
                      </p>
                    </div>
                    <span
                      className="ml-auto flex-shrink-0 mt-1 opacity-30 group-hover:opacity-60 transition-opacity"
                      style={{ color: '#560E13' }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Valeurs ── */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader eyebrow="VALEURS" title="Ce qui nous guide" centered />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {VALEURS.map((v) => (
                <div key={v.title} className="text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(86,14,19,0.08)' }}
                  >
                    <span
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                        color: '#560E13',
                      }}
                    >
                      {v.title.charAt(0)}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: '#0A0A0A',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-6 text-center" style={{ backgroundColor: '#560E13' }}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#FEFCF9',
            }}
          >
            Travaillons ensemble
          </h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: 'rgba(254,252,249,0.7)' }}>
            Que vous prepariez un voyage, lanciez un projet ou cherchiez un partenaire strategique,
            je suis la pour vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consulting"
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Consulting
            </Link>
            <Link
              href="/voyages"
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#FEFCF9', border: '1.5px solid rgba(254,252,249,0.4)' }}
            >
              Voyages
            </Link>
            <a
              href="https://calendly.com/roselinengom/decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'transparent', color: '#F6C961', border: '1.5px solid rgba(246,201,97,0.4)' }}
            >
              Reserver un appel
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
