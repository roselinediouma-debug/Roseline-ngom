'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const voyages = [
  {
    icon: '🌍',
    title: 'Retour aux Racines',
    subtitle: 'Pour la diaspora africaine',
    description: "Un voyage profondément émotionnel pour reconnecter avec vos origines. Gorée, Casamance, villages ancestraux — vivez une expérience qui transforme.",
    price: 'À partir de 1 500 EUR / personne',
    features: ['Itinéraire personnalisé selon vos origines', 'Rencontres avec des familles locales', 'Cérémonie de bienvenue traditionnelle', 'Guide culturel francophone dédié'],
    whatsappMsg: "Bonjour Roseline, je souhaite en savoir plus sur le voyage Retour aux Racines.",
  },
  {
    icon: '✨',
    title: 'Voyage Sur Mesure',
    subtitle: 'Pour les voyageurs exigeants',
    description: "Vous avez une vision précise de ce que vous souhaitez vivre ? Je conçois votre itinéraire unique, de A à Z, avec les meilleures adresses du terrain.",
    price: 'À partir de 2 000 EUR / personne',
    features: ['Consultation initiale gratuite 30 min', 'Itinéraire 100% personnalisé', 'Hébergements sélectionnés à la main', 'Conciergerie disponible 24h/24'],
    whatsappMsg: "Bonjour Roseline, je souhaite créer un voyage sur mesure au Sénégal.",
  },
  {
    icon: '🥁',
    title: 'Expériences Culturelles',
    subtitle: 'Immersion totale',
    description: "Plongez dans la culture sénégalaise : cours de cuisine locale, ateliers de percussion sabar, rencontres avec des artisans — une immersion authentique et joyeuse.",
    price: 'À partir de 500 EUR / expérience',
    features: ['Ateliers cuisine & gastronomie', 'Cours de percussion sabar', 'Rencontres avec artistes locaux', 'Expériences à la carte'],
    whatsappMsg: "Bonjour Roseline, je souhaite en savoir plus sur vos expériences culturelles.",
  },
]

const processSteps = [
  { icon: '💬', title: 'Partagez votre vision', desc: "Dites-moi qui vous êtes, vos envies, votre budget. Rien n'est trop grand ou trop petit." },
  { icon: '🗺️', title: 'Je crée votre itinéraire', desc: "En 48h, je vous propose un programme sur mesure avec les meilleures adresses du terrain." },
  { icon: '🌟', title: 'Vous vivez l\'expérience', desc: "Je vous accompagne de A à Z : avant, pendant et après votre voyage." },
]

const testimonials = [
  { name: 'Fatou B.', country: 'Canada 🇨🇦', text: "Un voyage qui a changé ma vie. Roseline connaît chaque recoin du Sénégal. Je recommande les yeux fermés.", trip: 'Retour aux Racines' },
  { name: 'Thomas L.', country: 'France 🇫🇷', text: "L'itinéraire sur mesure était parfait. Chaque journée était une nouvelle surprise. Merci Roseline !", trip: 'Voyage Sur Mesure' },
  { name: 'Aminata S.', country: 'Suisse 🇨🇭', text: "Les ateliers de cuisine et la rencontre avec les artisanes de Dakar — des moments que je n'oublierai jamais.", trip: 'Expériences Culturelles' },
]

const faq = [
  { q: "Combien de temps à l'avance dois-je réserver ?", a: "Idéalement 2 à 3 mois avant votre départ pour les voyages sur mesure. Pour les expériences à la journée, 2 semaines suffisent." },
  { q: "Les voyages sont-ils adaptés aux familles avec enfants ?", a: "Oui, je propose des voyages familiaux adaptés à tous les âges. Les enfants adorent les ateliers et les rencontres locales." },
  { q: "Que comprend le prix ?", a: "Chaque voyage est différent. Je vous fournis un devis détaillé incluant hébergement, transport local, guide et activités. Les billets d'avion internationaux sont à votre charge." },
  { q: "Puis-je venir seul(e) ?", a: "Absolument ! Je propose des voyages solo avec d'autres voyageurs pour créer des liens, et des voyages privés pour ceux qui préfèrent l'exclusivité." },
]

export default function VoyagesPage() {
  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', typeVoyage: '', nbVoyageurs: '',
    dates: '', budget: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError("Une erreur est survenue. Contactez-nous sur WhatsApp.")
      }
    } catch {
      setError("Une erreur est survenue. Contactez-nous sur WhatsApp.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main>
        {/* Hero plein écran */}
        <section
          className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20"
          style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #560E13 60%, #1a0508 100%)' }}
        >
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%"><defs><pattern id="hexV" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse"><polygon points="30,2 56,16 56,36 30,50 4,36 4,16" fill="none" stroke="#F6C961" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#hexV)" /></svg>
          </div>
          <div className="relative max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(246,201,97,0.2)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.3)' }}>
              TripAfro · Voyages Immersifs
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Vivez le Sénégal<br />comme jamais avant
            </h1>
            <p className="text-lg opacity-75 text-white mb-10 max-w-xl mx-auto">
              Des voyages authentiques, conçus sur mesure par une experte terrain. De Dakar à la Casamance, du Lac Rose aux îles du Saloum.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20planifier%20un%20voyage%20au%20S%C3%A9n%C3%A9gal."
                target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                💬 Planifier mon voyage
              </a>
              <button
                onClick={() => document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl font-semibold text-sm border transition-opacity hover:opacity-75"
                style={{ borderColor: 'rgba(254,252,249,0.3)', color: '#FEFCF9' }}
              >
                Demander un devis
              </button>
            </div>
          </div>
        </section>

        {/* 3 cartes voyages */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Nos programmes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {voyages.map(({ icon, title, subtitle, description, price, features, whatsappMsg }) => (
                <div key={title} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div
                    className="h-40 flex items-center justify-center text-6xl"
                    style={{ background: 'linear-gradient(135deg, #560E13, #3d0a0e)' }}
                  >
                    {icon}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-50">{subtitle}</div>
                    <h3 className="font-bold text-xl mb-2" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>{title}</h3>
                    <p className="text-sm opacity-65 mb-4">{description}</p>
                    <ul className="flex flex-col gap-2 mb-4 flex-1">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ backgroundColor: '#F6C961', color: '#560E13' }}>✓</span>
                          <span className="opacity-70">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-semibold text-sm mb-4" style={{ color: '#560E13' }}>{price}</div>
                    <a
                      href={`https://wa.me/33650329808?text=${encodeURIComponent(whatsappMsg)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="block w-full py-3 rounded-xl text-sm font-bold text-center transition-opacity hover:opacity-85"
                      style={{ backgroundColor: '#25D366', color: 'white' }}
                    >
                      💬 En savoir plus
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process 3 étapes */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Comment ça marche
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm opacity-60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Ils en parlent mieux que nous
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(({ name, country, text, trip }) => (
                <div key={name} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3 opacity-50">{trip}</div>
                  <p className="text-sm italic mb-4 opacity-75">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#560E13', color: '#F6C961' }}>{name[0]}</div>
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

        {/* FAQ */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Questions fréquentes
            </h2>
            <div className="flex flex-col gap-4">
              {faq.map(({ q, a }) => (
                <div key={q} className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: '#F8F5F0' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#560E13' }}>{q}</h3>
                  <p className="text-sm opacity-65">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulaire devis */}
        <section id="devis" className="py-16 px-4" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Demander un devis gratuit
            </h2>
            <p className="text-center text-sm opacity-60 mb-10">Je vous réponds sous 24h avec une proposition personnalisée.</p>

            {sent ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#560E13' }}>Demande envoyée !</h3>
                <p className="text-sm opacity-65 mb-6">Je vous réponds sous 24h. En attendant, vous pouvez me contacter directement sur WhatsApp.</p>
                <a
                  href="https://wa.me/33650329808"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ backgroundColor: '#25D366' }}
                >💬 WhatsApp</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Nom complet *</label>
                    <input name="nom" value={formData.nom} onChange={handleChange} required placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-bordeaux" style={{ borderColor: '#e0d8d0' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Email *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.com" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">WhatsApp / Téléphone</label>
                    <input name="telephone" value={formData.telephone} onChange={handleChange} placeholder="+33 6 ..." className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Type de voyage *</label>
                    <select name="typeVoyage" value={formData.typeVoyage} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }}>
                      <option value="">Choisir...</option>
                      <option value="retour-racines">Retour aux Racines</option>
                      <option value="sur-mesure">Voyage Sur Mesure</option>
                      <option value="experience">Expérience Culturelle</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Nombre de voyageurs *</label>
                    <input name="nbVoyageurs" type="number" min="1" max="50" value={formData.nbVoyageurs} onChange={handleChange} required placeholder="2" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Budget indicatif *</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }}>
                      <option value="">Choisir...</option>
                      <option value="moins-1500">Moins de 1 500 EUR</option>
                      <option value="1500-3000">1 500 – 3 000 EUR</option>
                      <option value="3000-5000">3 000 – 5 000 EUR</option>
                      <option value="plus-5000">Plus de 5 000 EUR</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Dates souhaitées</label>
                  <input name="dates" value={formData.dates} onChange={handleChange} placeholder="Ex : Mars 2025, 10 jours" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: '#e0d8d0' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-60">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Décrivez votre projet, vos envies, vos questions..." className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: '#e0d8d0' }} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    {loading ? 'Envoi...' : '📩 Envoyer ma demande'}
                  </button>
                  <a
                    href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20un%20devis%20pour%20un%20voyage."
                    target="_blank" rel="noopener noreferrer"
                    className="px-6 py-4 rounded-xl font-bold text-sm text-white text-center transition-opacity hover:opacity-85"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    💬
                  </a>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
