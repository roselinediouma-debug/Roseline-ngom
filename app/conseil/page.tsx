'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CalendlyEmbed from '@/components/CalendlyEmbed'

const offresConseil = [
  {
    icon: '🔍',
    title: 'Audit de projet',
    price: '300 EUR',
    duration: 'Séance unique de 2h',
    description: "Analyse complète de votre projet lié à l'Afrique de l'Ouest : opportunités, risques, recommandations concrètes.",
    features: ['Analyse de faisabilité', 'Identification des risques', 'Feuille de route personnalisée', 'Compte-rendu écrit'],
    cta: 'Réserver un audit',
  },
  {
    icon: '🎯',
    title: 'Accompagnement projet',
    price: '1 500 EUR / 3 mois',
    duration: '4 sessions mensuelles + suivi',
    description: "Un accompagnement intensif pour lancer ou développer votre projet en Afrique de l'Ouest avec les bons partenaires.",
    features: ['4 sessions stratégiques (1h chacune)', 'Accès au réseau de partenaires', 'Révision de documents', 'Support WhatsApp dédié'],
    cta: 'Démarrer l\'accompagnement',
    highlighted: true,
  },
  {
    icon: '🌍',
    title: 'Conseil diaspora',
    price: 'Sur devis',
    duration: 'Programme personnalisé',
    description: "Pour les membres de la diaspora africaine qui souhaitent investir, s'installer ou contribuer au développement de leur pays d'origine.",
    features: ['Analyse de votre situation', 'Opportunités d\'investissement', 'Mise en réseau local', 'Accompagnement installation'],
    cta: 'Discuter de mon projet',
  },
]

const personas = [
  { icon: '🚀', title: 'Entrepreneurs', desc: "Vous souhaitez lancer ou développer une activité en Afrique de l'Ouest." },
  { icon: '🌱', title: 'Porteurs de projets', desc: "Vous avez une idée à impact social ou culturel et cherchez à la structurer." },
  { icon: '🏠', title: 'Diaspora', desc: "Vous souhaitez investir, vous installer ou contribuer au développement de votre pays." },
  { icon: '🎨', title: 'Créatifs & Culturels', desc: "Artistes, journalistes, créateurs de contenu qui souhaitent explorer la scène africaine." },
]

const testimonials = [
  { name: 'Ibrahima D.', country: 'France 🇫🇷', text: "Roseline m'a aidé à structurer mon projet d'école au Sénégal. Sa connaissance du terrain est inestimable.", service: 'Accompagnement projet' },
  { name: 'Clarisse N.', country: 'Belgique 🇧🇪', text: "L'audit a identifié des partenaires clés que je n'aurais jamais trouvés seule. ROI immédiat.", service: 'Audit de projet' },
]

export default function ConseilPage() {
  return (
    <>
      <Nav variant="solid" />
      <main>
        {/* Hero */}
        <section
          className="pt-28 pb-20 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #560E13 0%, #3d0a0e 100%)', color: '#FEFCF9' }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(246,201,97,0.2)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.3)' }}>
              Conseil stratégique
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Accompagnement stratégique pour l'Afrique de l'Ouest
            </h1>
            <p className="text-lg opacity-75">
              10 ans de terrain, un réseau solide, une expertise unique. Transformez votre vision en réalité.
            </p>
          </div>
        </section>

        {/* Pour qui */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
              Pour qui ?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {personas.map(({ icon, title, desc }) => (
                <div key={title} className="text-center bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-bold text-sm mb-2">{title}</h3>
                  <p className="text-xs opacity-60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Les 3 offres conseil */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
              Nos offres conseil
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {offresConseil.map(({ icon, title, price, duration, description, features, cta, highlighted }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 flex flex-col"
                  style={highlighted
                    ? { border: '2px solid #F6C961', boxShadow: '0 8px 32px rgba(246,201,97,0.15)', backgroundColor: '#fff' }
                    : { border: '1px solid #e0d8d0', backgroundColor: '#fff' }
                  }
                >
                  {highlighted && (
                    <div className="text-center text-xs font-bold mb-4 py-1 px-3 rounded-full self-start"
                      style={{ backgroundColor: '#F6C961', color: '#560E13' }}>⭐ RECOMMANDÉ</div>
                  )}
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>{title}</h3>
                  <div className="font-bold text-xl mb-1" style={{ color: '#560E13' }}>{price}</div>
                  <div className="text-xs opacity-50 mb-3">{duration}</div>
                  <p className="text-sm opacity-65 mb-4">{description}</p>
                  <ul className="flex flex-col gap-2 flex-1 mb-6">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-0.5"
                          style={{ backgroundColor: '#F6C961', color: '#560E13' }}>✓</span>
                        <span className="opacity-70">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#rdv"
                    onClick={(e) => { e.preventDefault(); document.getElementById('rdv')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="block w-full py-3 rounded-xl text-sm font-bold text-center transition-opacity hover:opacity-85 cursor-pointer"
                    style={highlighted
                      ? { backgroundColor: '#F6C961', color: '#560E13' }
                      : { backgroundColor: '#560E13', color: '#FEFCF9' }
                    }
                  >
                    {cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
              Ce que disent mes clients
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map(({ name, country, text, service }) => (
                <div key={name} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-50">{service}</div>
                  <p className="text-sm italic mb-4 opacity-75">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: '#560E13', color: '#F6C961' }}>{name[0]}</div>
                    <div>
                      <div className="text-sm font-semibold">{name}</div>
                      <div className="text-xs opacity-50">{country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendly RDV */}
        <section id="rdv" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">📅</div>
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
              Session découverte gratuite — 15 min
            </h2>
            <p className="text-sm opacity-60 mb-8 max-w-lg mx-auto">
              Parlons de votre projet. 15 minutes pour explorer les possibilités ensemble, sans engagement.
            </p>

            {/* Embed Calendly */}
            <CalendlyEmbed url="https://calendly.com/roseline-ngom/decouverte" />

            {/* Alternative WhatsApp */}
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid #e0d8d0' }}>
              <p className="text-sm opacity-60 mb-4">Vous préférez WhatsApp ?</p>
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20discuter%20de%20mon%20projet."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#25D366' }}
              >
                💬 Écrire sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
