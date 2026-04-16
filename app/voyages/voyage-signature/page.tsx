'use client'

import { useState, FormEvent } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SalesPageHero from '@/components/SalesPageHero'
import SectionHeader from '@/components/SectionHeader'
import FeatureGrid from '@/components/FeatureGrid'
import ProcessSteps from '@/components/ProcessSteps'
import FAQAccordion from '@/components/FAQAccordion'

const pourQuiFeatures = [
  {
    icon: '1',
    title: 'Couples en quete d\'exception',
    description: 'Voyage de noces, anniversaire, escapade romantique. Vous voulez vivre le Senegal a deux, dans l\'intimite et le luxe.',
  },
  {
    icon: '2',
    title: 'Familles avec des besoins specifiques',
    description: 'Enfants en bas age, adolescents difficiles a convaincre, grands-parents a menager. Chaque detail est pense pour votre configuration.',
  },
  {
    icon: '3',
    title: 'Voyageurs solo en quete de sens',
    description: 'Vous voulez vous retrouver, ecrire, mediter, photographier. Un voyage concu autour de votre rythme et de vos envies profondes.',
  },
  {
    icon: '4',
    title: 'Groupes d\'amis',
    description: 'Un anniversaire, un EVJF, une reunion entre amis d\'enfance. Vous voulez vivre quelque chose d\'unique ensemble.',
  },
  {
    icon: '5',
    title: 'Professionnels en reperage',
    description: 'Vous explorez le Senegal pour un projet, un investissement, une installation. Vous avez besoin d\'un guide qui connait le terrain.',
  },
]

const processSteps = [
  {
    number: 1,
    title: 'Nous vous ecoutons',
    description: 'Un echange visio de 30 minutes, gratuit et sans engagement. Vous nous parlez de vos envies, vos contraintes, votre budget.',
  },
  {
    number: 2,
    title: 'Nous vous proposons',
    description: 'En 5 jours ouvrables, vous recevez une proposition PDF detaillee : itineraire, hebergements, activites, tarif.',
  },
  {
    number: 3,
    title: 'Nous ajustons',
    description: 'Un aller-retour maximum. On affine ensemble jusqu\'a ce que le programme soit exactement ce que vous imaginiez.',
  },
  {
    number: 4,
    title: 'Vous confirmez',
    description: 'Acompte de 30%, signature du devis. Votre voyage est reserve. Le solde est du 30 jours avant le depart.',
  },
  {
    number: 5,
    title: 'Vous voyagez',
    description: 'Support 24/7 pendant tout le voyage. Roseline est joignable sur WhatsApp a tout moment.',
  },
]

const exempleItineraires = [
  {
    title: 'Le Senegal essentiel',
    duree: '7 jours',
    prix: 'A partir de 2 500 EUR/pers.',
    description: 'Dakar, Goree, Saly, Lac Rose. L\'essentiel du Senegal pour un premier voyage ou un sejour court.',
  },
  {
    title: 'Immersion profonde',
    duree: '10 jours',
    prix: 'A partir de 3 800 EUR/pers.',
    description: 'Dakar, Sine Saloum, Casamance. Pour ceux qui veulent aller au-dela des sentiers battus et vivre l\'authenticite.',
  },
  {
    title: 'Le grand tour',
    duree: '14 jours',
    prix: 'A partir de 5 200 EUR/pers.',
    description: 'Du nord au sud, de Saint-Louis a la Casamance. Le voyage le plus complet, pour ne rien manquer.',
  },
  {
    title: 'Voyage de noces exclusif',
    duree: '10 jours',
    prix: 'Sur devis',
    description: 'Lodges de luxe, diner prive sur la plage, excursions en pirogue, spa et detente. Le Senegal en amoureux.',
  },
]

const faqItems = [
  {
    q: 'Combien coute un voyage sur mesure ?',
    a: 'Les tarifs varient selon la duree, le nombre de voyageurs, le niveau d\'hebergement et les activites choisies. Comptez a partir de 2 500 EUR par personne pour 7 jours. La consultation initiale est gratuite.',
  },
  {
    q: 'Combien de temps a l\'avance faut-il reserver ?',
    a: 'Idealement 2 a 3 mois avant votre depart. Pour les periodes de haute saison (decembre-janvier, juillet-aout), 4 mois est recommande.',
  },
  {
    q: 'Peut-on modifier l\'itineraire en cours de voyage ?',
    a: 'Oui, dans la limite du possible. C\'est l\'avantage du sur mesure : nous nous adaptons a vos envies sur place. Roseline est joignable 24/7.',
  },
  {
    q: 'Les vols sont-ils inclus ?',
    a: 'Non, les vols internationaux ne sont pas inclus. Cela vous permet de choisir votre compagnie et vos dates. Nous vous conseillons sur les meilleurs vols.',
  },
  {
    q: 'Quel est le processus de paiement ?',
    a: '30% a la reservation, le solde 30 jours avant le depart. Paiement par virement bancaire ou PayPal.',
  },
  {
    q: 'Que se passe-t-il si je dois annuler ?',
    a: 'Annulation gratuite jusqu\'a 60 jours avant le depart. Entre 30 et 60 jours : 50% de l\'acompte retenu. Moins de 30 jours : acompte non remboursable. Nous recommandons une assurance annulation.',
  },
]

const BUDGET_OPTIONS = ['2 500 EUR', '3 500 EUR', '5 000 EUR', '8 000 EUR+']
const TYPE_OPTIONS = ['Emotionnel', 'Aventure', 'Farniente', 'Culturel', 'Mix']

export default function VoyageSignaturePage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    nbAdultes: '',
    nbEnfants: '',
    dates: '',
    duree: '',
    budget: '',
    types: [] as string[],
    contraintes: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleTypeToggle(type: string) {
    setFormData((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          typeVoyage: 'voyage-signature',
          nbVoyageurs: String(Number(formData.nbAdultes || 0) + Number(formData.nbEnfants || 0)),
          dates: formData.dates,
          budget: formData.budget,
          message: `Duree: ${formData.duree}\nTypes: ${formData.types.join(', ')}\nAdultes: ${formData.nbAdultes}\nEnfants: ${formData.nbEnfants}\nContraintes: ${formData.contraintes}\n\n${formData.message}`,
        }),
      })

      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Une erreur est survenue. Contactez-nous sur WhatsApp.')
    }
  }

  const inputStyle = {
    backgroundColor: '#FEFCF9',
    border: '1px solid rgba(86,14,19,0.15)',
    color: '#0A0A0A',
  }

  return (
    <>
      <Nav />
      <main>
        <SalesPageHero
          eyebrow="SUR MESURE"
          title="Voyage Signature"
          subtitle="Votre Senegal. Votre rythme. Votre histoire."
          ctaPrimary={{ label: 'Demander mon devis', href: '#devis' }}
        />

        {/* Pour Qui */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="POUR QUI"
              title="Un voyage cree pour vous, pas pour tout le monde"
              subtitle="Le Voyage Signature s'adresse a ceux qui refusent le standard."
              centered
            />
            <div className="mt-14">
              <FeatureGrid features={pourQuiFeatures} />
            </div>
          </div>
        </section>

        {/* Notre Methode */}
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="NOTRE METHODE"
              title="Du premier echange au dernier jour de voyage"
              subtitle="Un processus simple, clair, humain. Pas de formulaire a rallonge. Pas de robot."
              centered
            />
            <div className="mt-14">
              <ProcessSteps steps={processSteps} />
            </div>
          </div>
        </section>

        {/* Exemples d'Itineraires */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="EXEMPLES"
              title="Des itineraires pour vous inspirer"
              subtitle="Chaque voyage est unique. Voici quelques bases de depart."
              centered
            />
            <div className="mt-14 grid md:grid-cols-2 gap-6">
              {exempleItineraires.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl p-8 flex flex-col"
                  style={{
                    backgroundColor: '#F8F5F0',
                    border: '1px solid rgba(86,14,19,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                        color: '#560E13',
                      }}
                    >
                      {ex.title}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'rgba(246,201,97,0.2)', color: '#560E13' }}
                    >
                      {ex.duree}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'rgba(10,10,10,0.65)' }}>
                    {ex.description}
                  </p>
                  <p className="font-bold text-base" style={{ color: '#560E13' }}>
                    {ex.prix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulaire Devis */}
        <section id="devis" className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              eyebrow="VOTRE DEVIS"
              title="Racontez-nous votre voyage ideal"
              subtitle="Reponse personnalisee sous 48h. Consultation gratuite, sans engagement."
              centered
            />

            {status === 'success' ? (
              <div
                className="mt-10 rounded-xl p-8 text-center"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <p
                  className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    color: '#560E13',
                  }}
                >
                  Demande envoyee !
                </p>
                <p className="mb-6" style={{ color: 'rgba(10,10,10,0.6)' }}>
                  Roseline vous repond sous 48h avec une proposition personnalisee.
                </p>
                <a
                  href="https://wa.me/33650329808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg font-semibold text-sm"
                  style={{ backgroundColor: '#25D366', color: 'white' }}
                >
                  Contacter Roseline sur WhatsApp
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-10 rounded-xl p-6 md:p-8 space-y-5"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Nom complet *</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Telephone / WhatsApp</label>
                  <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="+33 6 ..." className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Nombre d'adultes *</label>
                    <input type="number" name="nbAdultes" min="1" max="20" value={formData.nbAdultes} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Nombre d'enfants</label>
                    <input type="number" name="nbEnfants" min="0" max="20" value={formData.nbEnfants} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Dates souhaitees</label>
                    <input type="text" name="dates" value={formData.dates} onChange={handleChange} placeholder="Ex : mars 2027, flexible" className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Duree souhaitee</label>
                    <input type="text" name="duree" value={formData.duree} onChange={handleChange} placeholder="Ex : 7 jours, 10 jours" className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Budget indicatif *</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg text-sm outline-none cursor-pointer" style={inputStyle}>
                    <option value="">Selectionnez</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Type de voyage souhaite</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {TYPE_OPTIONS.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeToggle(type)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
                        style={{
                          backgroundColor: formData.types.includes(type) ? '#560E13' : '#F8F5F0',
                          color: formData.types.includes(type) ? '#FEFCF9' : '#560E13',
                          border: '1px solid rgba(86,14,19,0.15)',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Contraintes particulieres</label>
                  <input type="text" name="contraintes" value={formData.contraintes} onChange={handleChange} placeholder="Allergies, mobilite reduite, regime alimentaire..." className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>Message libre</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Decrivez votre voyage ideal, vos envies, vos questions..." className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-y" style={inputStyle} />
                </div>

                {status === 'error' && (
                  <p className="text-sm" style={{ color: '#c0392b' }}>{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3.5 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 cursor-pointer"
                  style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6" style={{ backgroundColor: '#FEFCF9' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader eyebrow="FAQ" title="Questions frequentes" centered />
            <div className="mt-14">
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section className="py-20 px-6" style={{ backgroundColor: '#560E13' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
              }}
            >
              Vous preferez en parler de vive voix ?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(254,252,249,0.75)' }}>
              Roseline repond personnellement a chaque message. Pas de chatbot. Pas d'attente. Juste une conversation humaine.
            </p>
            <a
              href="https://wa.me/33650329808?text=Bonjour%20Roseline%2C%20je%20souhaite%20discuter%20d%27un%20voyage%20sur%20mesure."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Ecrire a Roseline sur WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
