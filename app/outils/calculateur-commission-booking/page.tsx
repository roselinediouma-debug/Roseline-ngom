import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

const PATH = '/outils/calculateur-commission-booking'

export const metadata: Metadata = buildMetadata({
  title: 'Calculateur commission Booking hôtel (gratuit)',
  description:
    "Calculez en 30 secondes combien Booking prend sur votre hôtel chaque année, et ce que vous économisez en passant 30 % des réservations en direct. Gratuit.",
  path: PATH,
  keywords: [
    'commission booking hôtel',
    'commission OTA',
    'Booking commission Sénégal',
    'calculateur commission Booking',
    'combien prend Booking',
    'hôtellerie Sénégal',
  ],
})

const FAQ = [
  {
    question: 'Combien prend Booking.com sur chaque réservation ?',
    answer:
      "Booking.com prélève en moyenne 15 à 20 % de commission sur chaque réservation, avec des pics à 25 % pour les hôtels inscrits au programme Preferred Partner ou Genius. Ce taux est calculé sur le montant total de la réservation, nuits et suppléments inclus.",
  },
  {
    question: 'Pourquoi calculer ce que coûte Booking à mon hôtel ?',
    answer:
      "Beaucoup d'hôteliers sénégalais perdent entre 3 et 15 millions de FCFA par an en commissions OTA sans l'avoir chiffré. Voir le montant exact annualisé permet de prioriser les investissements (site direct, Google Business, base fidélité) qui réduisent cette dépendance.",
  },
  {
    question: 'Comment réduire la commission Booking sans perdre en visibilité ?',
    answer:
      "Trois leviers : 1) un site web qui convertit avec moteur de réservation direct, 2) une fiche Google Business Profile optimisée qui capte la recherche locale, 3) une séquence email post-séjour pour les réservations répétées. L'objectif réaliste est de passer de 80 % OTA / 20 % direct à 50/50 en 12 mois.",
  },
  {
    question: "Les résultats du calculateur sont-ils précis ?",
    answer:
      "Le calcul est mathématiquement exact pour les données que vous entrez. Il donne un ordre de grandeur fiable. Pour un audit personnalisé tenant compte de votre mix OTA réel (Booking + Expedia + Agoda), contactez Roseline pour un appel gratuit de 30 minutes.",
  },
  {
    question: 'Roseline peut-elle m\'aider à réduire ma dépendance aux OTA ?',
    answer:
      "Oui. Roseline Ngom accompagne des hôtels indépendants au Sénégal sur la stratégie digitale : site direct, SEO local, fidélisation, IA. Premier appel de 30 minutes offert pour diagnostiquer votre situation.",
  },
]

export default function CalculatorOtaPage() {
  return (
    <>
      <Nav variant="solid" />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Outils', path: '/outils' },
            { name: 'Calculateur commission Booking', path: PATH },
          ]),
          faqSchema(FAQ.map((f) => ({ question: f.question, answer: f.answer }))),
          serviceSchema({
            name: 'Calculateur commission OTA pour hôteliers',
            description:
              "Outil gratuit pour chiffrer le coût annuel des commissions Booking.com et OTA pour un hôtel.",
            slug: PATH,
            serviceType: 'Outil digital gratuit',
          }),
        ]}
      />
      <main style={{ backgroundColor: '#FEFCF9' }}>
        {/* Hero */}
        <section className="pt-32 pb-10 px-5">
          <div className="max-w-4xl mx-auto">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: '#560E13' }}
            >
              Outil gratuit · Hôteliers
            </p>
            <h1
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
            >
              Combien Booking prend à votre hôtel chaque année ?
            </h1>
            <p className="text-lg opacity-80 max-w-3xl">
              Entrez 3 chiffres, obtenez en 30 secondes le montant exact des commissions
              versées aux OTA et ce que vous pourriez récupérer en passant 30 % des
              réservations en direct.
            </p>
          </div>
        </section>

        {/* Calculateur */}
        <section className="py-8 px-5">
          <div className="max-w-4xl mx-auto">
            <CalculatorClient />
          </div>
        </section>

        {/* Contenu SEO */}
        <section className="py-16 px-5" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl mb-6"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
            >
              Pourquoi autant d&apos;hôtels sénégalais payent trop de commission
            </h2>
            <div className="space-y-4 text-base opacity-90 leading-relaxed">
              <p>
                En 2026, la majorité des hôtels indépendants de Dakar, Saly et Saint-Louis
                dépendent à 70-85 % des OTA (Booking.com, Expedia, Agoda) pour leurs
                réservations. Résultat : un quart du chiffre d&apos;affaires part en
                commissions, soit plusieurs millions de FCFA chaque année.
              </p>
              <p>
                Ces plateformes restent indispensables pour capter la clientèle
                internationale, mais le ratio est souvent déséquilibré. Un hôtel de
                20 chambres avec un panier moyen de 55 000 FCFA et 60 % d&apos;occupation
                annuelle peut verser plus de 30 millions de FCFA / an à Booking.
              </p>
              <p>
                Le calculateur ci-dessus vous donne votre propre chiffre. Si le montant
                vous surprend, c&apos;est normal : la plupart des hôteliers ne l&apos;ont
                jamais vu sur une seule ligne.
              </p>
            </div>

            <h2
              className="text-3xl mt-12 mb-6"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
            >
              Les 3 leviers pour reprendre le contrôle
            </h2>
            <ul className="space-y-4 text-base opacity-90 leading-relaxed">
              <li>
                <strong style={{ color: '#560E13' }}>1. Site web direct qui convertit.</strong>{' '}
                Un moteur de réservation propre, mobile-first, avec paiement sécurisé en
                FCFA ou EUR. ROI habituel : 6 à 9 mois.
              </li>
              <li>
                <strong style={{ color: '#560E13' }}>
                  2. Google Business Profile optimisé.
                </strong>{' '}
                Plus de 40 % des recherches hôtel au Sénégal passent par Google Maps.
                Photos pro, avis gérés, posts hebdo : captation locale gratuite.
              </li>
              <li>
                <strong style={{ color: '#560E13' }}>
                  3. Fidélisation post-séjour automatisée.
                </strong>{' '}
                Email ou WhatsApp 48h après le départ + offre de retour. Fait doubler les
                réservations répétées en 12 mois.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl mb-8 text-center"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
            >
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <details
                  key={i}
                  className="rounded-lg p-5 cursor-pointer"
                  style={{ backgroundColor: '#F8F5F0', border: '1px solid #E5E0D6' }}
                >
                  <summary
                    className="font-medium text-base"
                    style={{ color: '#560E13' }}
                  >
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm opacity-90 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 px-5" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#F6C961' }}
            >
              Je vous montre comment en 30 minutes
            </h2>
            <p className="text-base mb-6" style={{ color: '#FEFCF9', opacity: 0.9 }}>
              Audit gratuit de votre écosystème digital : site, OTA, Google, base clients.
              Repartez avec 3 actions concrètes à lancer cette semaine.
            </p>
            <a
              href="https://calendly.com/roseline-ngom/audit-gratuit-30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-md text-sm font-medium"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Réserver mon audit gratuit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
