import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description:
    'Comment roselinengom.com collecte, traite et protège vos données personnelles. RGPD, durées de conservation, droits, outils IA.',
  path: '/politique-confidentialite',
  noindex: false,
})

const UPDATED = '21 avril 2026'

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pt-28 pb-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <article className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
          >
            Politique de confidentialité
          </h1>
          <p className="text-sm opacity-70 mb-10">Dernière mise à jour : {UPDATED}</p>

          <div className="prose max-w-none text-base leading-relaxed space-y-6">
            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                1. Responsable du traitement
              </h2>
              <p>
                Le site roselinengom.com est édité par Roseline Ngom, consultante en
                tourisme et digital. Contact :{' '}
                <a href="mailto:contact@tripafro.com" style={{ color: '#560E13' }}>
                  contact@tripafro.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                2. Données collectées
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Formulaires de contact et lead magnets</strong> : prénom, email,
                  éventuelle organisation.
                </li>
                <li>
                  <strong>Navigation</strong> : données techniques anonymisées via Google
                  Analytics 4 (IP tronquée, pages vues, source de trafic).
                </li>
                <li>
                  <strong>Cookies</strong> : strictement nécessaires + mesure
                  d&apos;audience anonymisée. Pas de cookies publicitaires tiers.
                </li>
              </ul>
            </section>

            <section id="outils-ia">
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                3. Outils IA (calculateur, chatbot)
              </h2>
              <p>
                Le site propose des outils interactifs basés sur l&apos;intelligence
                artificielle (calculateur de commission OTA, chatbot TripAfro). Voici
                comment ils traitent vos données :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Calculateur de commission Booking</strong> : les valeurs que vous
                  saisissez (prix moyen, nombre de réservations, taux de commission) sont
                  calculées côté navigateur. Un log anonymisé est conservé côté serveur à
                  des fins statistiques pendant <strong>30 jours maximum</strong> puis
                  automatiquement purgé.
                </li>
                <li>
                  <strong>Chatbot TripAfro</strong> : vos messages sont envoyés à
                  l&apos;API Anthropic (Claude) pour générer une réponse. Ils ne sont pas
                  utilisés pour entraîner le modèle (engagement Anthropic pour l&apos;API).
                  Nous conservons les conversations <strong>30 jours maximum</strong> pour
                  améliorer le service, puis les purgeons automatiquement.
                </li>
                <li>
                  <strong>Aucune donnée sensible</strong> (financière, médicale, identité)
                  ne doit être saisie dans ces outils. Si vous en saisissez, elle sera
                  purgée comme le reste mais nous vous recommandons de ne pas le faire.
                </li>
                <li>
                  <strong>Si vous laissez votre email</strong> dans le formulaire du
                  calculateur ou le chatbot, il sera ajouté à notre base Brevo (hébergée en
                  UE) pour vous envoyer le rapport demandé et, selon votre segment,
                  quelques emails pertinents. Désabonnement en 1 clic à tout moment.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                4. Sous-traitants
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Supabase</strong> (UE) : hébergement base de données (leads,
                  logs outils).
                </li>
                <li>
                  <strong>Brevo</strong> (France) : emailing transactionnel et listes
                  marketing.
                </li>
                <li>
                  <strong>Vercel</strong> (UE) : hébergement du site.
                </li>
                <li>
                  <strong>Anthropic</strong> (États-Unis) : API Claude pour le chatbot.
                  Clauses contractuelles types en vigueur.
                </li>
                <li>
                  <strong>Google Analytics 4</strong> : mesure d&apos;audience anonymisée.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                5. Durées de conservation
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Leads email (base Brevo + Supabase) : 3 ans sans interaction, puis suppression.</li>
                <li>Logs outils IA (input + résumé résultat) : 30 jours puis purge automatique.</li>
                <li>Logs techniques (rate limiting) : 48 heures.</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl mt-8 mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
              >
                6. Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
                rectification, d&apos;effacement, d&apos;opposition et de portabilité sur
                vos données. Pour l&apos;exercer, écrivez à{' '}
                <a href="mailto:contact@tripafro.com" style={{ color: '#560E13' }}>
                  contact@tripafro.com
                </a>
                . Vous pouvez également saisir la CNIL (
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#560E13' }}
                >
                  cnil.fr
                </a>
                ).
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
