import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description:
    'Mentions légales du site roselinengom.com : éditeur, hébergeur, propriété intellectuelle.',
  path: '/mentions-legales',
  noindex: false,
})

const UPDATED = '23 avril 2026'

export default function MentionsLegalesPage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pt-28 pb-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <article className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
          >
            Mentions légales
          </h1>
          <p className="text-sm opacity-70 mb-10">Dernière mise à jour : {UPDATED}</p>

          <div className="prose max-w-none text-base leading-relaxed space-y-6">
            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                1. Éditeur du site
              </h2>
              <p>
                Le site <strong>roselinengom.com</strong> est édité par Roseline Ngom,
                consultante indépendante en tourisme et digital.
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Contact :{' '}
                  <a href="mailto:contact@tripafro.com" style={{ color: '#560E13' }}>
                    contact@tripafro.com
                  </a>
                </li>
                <li>Directrice de la publication : Roseline Ngom</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                2. Hébergement
              </h2>
              <p>
                Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
                Covina, CA 91723, États-Unis.
              </p>
              <p>
                Site :{' '}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#560E13' }}
                >
                  vercel.com
                </a>
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                3. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, images, photographies,
                vidéos, logos, graphismes, structure, code) est la propriété exclusive de
                Roseline Ngom ou de ses partenaires, sauf mention contraire. Toute reproduction,
                représentation, modification ou exploitation, totale ou partielle, sans
                autorisation écrite préalable, est interdite et constitue une contrefaçon
                sanctionnée par les articles L.335-2 et suivants du Code de la propriété
                intellectuelle.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                4. Données personnelles
              </h2>
              <p>
                Le traitement des données personnelles est détaillé dans notre{' '}
                <a href="/politique-confidentialite" style={{ color: '#560E13' }}>
                  politique de confidentialité
                </a>
                .
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                5. Cookies
              </h2>
              <p>
                Le site utilise des cookies techniques et de mesure d'audience (Google
                Analytics 4 avec anonymisation d'IP). Vous pouvez à tout moment configurer
                votre navigateur pour refuser les cookies.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                6. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de
                litige, compétence est attribuée aux tribunaux français.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
