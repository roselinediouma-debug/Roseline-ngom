import OfferCard from '@/components/OfferCard'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const offers = [
  {
    level: 'Gratuit',
    levelColor: '#16a34a',
    title: 'Guide PDF + Checklist',
    description: 'Le kit de démarrage pour préparer votre voyage au Sénégal.',
    price: '0 EUR',
    features: [
      '10 expériences secrètes au Sénégal',
      'Checklist de voyage complète',
      'Téléchargement immédiat',
      'Accès à vie',
    ],
    ctaText: 'Télécharger gratuitement',
    ctaLink: '/guide',
  },
  {
    level: 'Digital',
    levelColor: '#2563eb',
    title: 'Guides & Formations',
    description: 'Pour aller plus loin et préparer un voyage inoubliable.',
    price: '29 – 97 EUR',
    features: [
      'Guide Casamance complet (29 EUR)',
      'Masterclass Voyage Sénégal (97 EUR)',
      'Accès immédiat en ligne',
      'Mises à jour incluses',
    ],
    ctaText: 'Découvrir les formations',
    ctaLink: '/offres#digital',
  },
  {
    level: 'Voyages',
    levelColor: '#560E13',
    title: 'Voyages Immersifs TripAfro',
    description: 'Des expériences authentiques, organisées sur mesure par Roseline.',
    price: '500 – 5 000 EUR',
    features: [
      'Retour aux Racines (diaspora)',
      'Voyages sur mesure',
      'Expériences culturelles',
      'Accompagnement complet',
    ],
    ctaText: 'Planifier mon voyage',
    ctaLink: '/voyages',
    highlighted: true,
  },
  {
    level: 'Conseil',
    levelColor: '#7c3aed',
    title: 'Conseil & Accompagnement',
    description: 'Un accompagnement stratégique pour vos projets en Afrique de l\'Ouest.',
    price: '300 – 3 000 EUR',
    features: [
      'Audit de projet (300 EUR)',
      'Accompagnement 3 mois (1500 EUR)',
      'Conseil diaspora (sur devis)',
      'Session découverte gratuite 15 min',
    ],
    ctaText: 'Prendre RDV',
    ctaLink: '/conseil',
  },
  {
    level: 'Premium',
    levelColor: '#b45309',
    title: 'Accompagnement VIP 6 mois',
    description: 'Pour les projets ambitieux qui nécessitent un suivi intensif.',
    price: '5 000 – 10 000 EUR',
    features: [
      'Suivi hebdomadaire personnalisé',
      'Accès direct WhatsApp',
      'Réseau de partenaires inclus',
      'Candidature sur sélection',
    ],
    ctaText: 'Candidater',
    ctaLink: '/contact',
  },
  {
    level: 'Institutionnel',
    levelColor: '#0e7490',
    title: 'Programme Grand Théâtre & TRAME',
    description: 'Partenariats institutionnels et programmes culturels sur mesure.',
    price: 'Sur devis',
    features: [
      'Conception de programmes culturels',
      'Partenariat Grand Théâtre de Dakar',
      'Formations professionnelles',
      'Projets à impact social',
    ],
    ctaText: 'En savoir plus',
    ctaLink: '/contact',
  },
]

const processSteps = [
  { num: '01', title: 'Partagez votre vision', desc: 'Dites-moi qui vous êtes et ce que vous souhaitez vivre ou créer.' },
  { num: '02', title: 'Échange personnalisé', desc: "On explore ensemble les possibilités lors d'une session découverte gratuite." },
  { num: '03', title: 'Proposition sur mesure', desc: 'Je vous propose une offre adaptée à vos besoins et votre budget.' },
]

const faq = [
  { q: 'Comment démarrer ?', a: "Commencez par télécharger le guide gratuit, puis écrivez-moi sur WhatsApp ou prenez un RDV découverte de 15 min." },
  { q: 'Puis-je payer en plusieurs fois ?', a: 'Oui, pour les offres à partir de 300 EUR, un paiement en 2 ou 3 fois est possible. Contactez-moi pour en discuter.' },
  { q: 'Les voyages sont-ils adaptés aux familles ?', a: 'Absolument ! Je propose des voyages pour tous les profils : familles, couples, groupes d\'amis, voyageurs solo.' },
  { q: 'Comment se passe la session découverte ?', a: 'C\'est un RDV de 15 min en visio, entièrement gratuit. On discute de votre projet et je vous présente les options.' },
]

export default function OffresPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section
          className="pt-28 pb-16 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #560E13 0%, #3d0a0e 100%)', color: '#FEFCF9' }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(246,201,97,0.2)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.3)' }}>
              Écosystème complet
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Du gratuit au premium
            </h1>
            <p className="text-lg opacity-75">
              Choisissez le niveau qui correspond à votre projet et à votre budget.
            </p>
          </div>
        </section>

        {/* Escalier de valeur */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <OfferCard key={offer.level} {...offer} />
              ))}
            </div>
          </div>
        </section>

        {/* Process 3 étapes */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Comment ça fonctionne
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map(({ num, title, desc }) => (
                <div key={num} className="flex flex-col items-center text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-4"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    {num}
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm opacity-60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-10 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Questions fréquentes
            </h2>
            <div className="flex flex-col gap-4">
              {faq.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2" style={{ color: '#560E13' }}>{q}</h3>
                  <p className="text-sm opacity-65">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4 text-center bg-white">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Pas encore convaincu·e ?
            </h2>
            <p className="text-sm opacity-60 mb-8">
              Commencez par le guide gratuit, et si vous avez des questions, écrivez-moi directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20offres."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#25D366' }}
              >
                💬 Écrire sur WhatsApp
              </a>
              <a
                href="/guide"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                🎁 Guide gratuit
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
