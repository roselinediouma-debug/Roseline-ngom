import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter La Teranga | Roseline Ngom',
  description: 'Recevez 2 fois par mois destinations, conseils pratiques et coulisses de mes projets au Sénégal.',
  openGraph: {
    title: 'Newsletter La Teranga | Roseline Ngom',
    description: 'Recevez 2 fois par mois destinations, conseils pratiques et coulisses de mes projets au Sénégal.',
  },
}

const TOPICS = [
  {
    icon: '🗺️',
    title: 'Coulisses de mes voyages',
    description: 'Les lieux que je decouvre, les rencontres que je fais, les erreurs que j\'evite. Le vrai terrain, pas le filtre Instagram.',
  },
  {
    icon: '💡',
    title: 'Bons plans exclusifs',
    description: 'Adresses testees, contacts de confiance, offres que je negocie pour mes lecteurs. Introuvable ailleurs.',
  },
  {
    icon: '📸',
    title: 'Recits & inspirations',
    description: 'Des histoires courtes qui donnent envie de partir. Ou de revenir. Le Senegal raconte par quelqu\'un qui le vit.',
  },
]

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="NEWSLETTER LA TERANGA"
          title="Deux fois par mois, je vous envoie ce que je garde pour mes lecteurs les plus fideles"
          subtitle="Des recits, des bons plans, des coulisses. Pas de spam. Jamais."
        />

        {/* What you get */}
        <section className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
                Ce que vous recevrez
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Chaque edition, c&apos;est un petit voyage
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-2xl p-7 text-center"
                  style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.06)' }}
                >
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#560E13' }}>{topic.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequency promise */}
        <section className="py-16 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}
            >
              2x par mois. Jamais plus.
            </h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(254,252,249,0.8)' }}>
              Je respecte votre boite mail comme je respecte mes voyageurs.
              Pas de sequences automatiques a rallonge. Pas de promotions deguisees.
            </p>
            <p className="text-sm" style={{ color: '#F6C961' }}>
              Desinscription en 1 clic. Toujours.
            </p>
          </div>
        </section>

        {/* Newsletter Form */}
        <section className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
                Rejoignez nos premiers abonnes
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Inscrivez-vous maintenant
              </h2>
              <p className="text-sm" style={{ color: 'rgba(10,10,10,0.6)' }}>
                Gratuit. Sans engagement. Un email = une inscription.
              </p>
            </div>

            <NewsletterForm />

            <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-[10px] uppercase tracking-wider" style={{ color: '#0A0A0A', opacity: 0.45 }}>
              <span>RGPD</span>
              <span>·</span>
              <span>Pas de spam</span>
              <span>·</span>
              <span>Desinscription 1 clic</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
