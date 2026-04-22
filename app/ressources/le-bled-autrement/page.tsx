'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

/* ------------------------------------------------------------------ */
/*  Le Bled Autrement — Sales page (lead magnet gratuit)              */
/*  Copywriting diaspora + mockup 3D du PDF                            */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  {
    num: '01',
    icon: '🪞',
    title: 'Ce schéma qu’on connaît tous',
    excerpt: 'Pourquoi la diaspora revient toujours au même endroit, au même moment, avec les mêmes sensations. Et pourquoi ça finit par peser.',
  },
  {
    num: '02',
    icon: '🔄',
    title: 'Les 3 types de retour',
    excerpt: 'Familial, vacances, racines. Chacun a ses pièges. Savoir ce que vous cherchez vraiment avant de réserver le billet.',
  },
  {
    num: '03',
    icon: '🤫',
    title: 'Les 5 blocages silencieux',
    excerpt: 'Ce que personne ne dit mais que tous les enfants de la diaspora ressentent en rentrant. Et comment les nommer pour les dépasser.',
  },
  {
    num: '04',
    icon: '👨\u200D👩\u200D👧',
    title: 'Transmettre aux enfants',
    excerpt: 'Préparer vos enfants (et votre conjoint) à découvrir le pays autrement que par 3 jours chez mamie. Méthode concrète.',
  },
  {
    num: '05',
    icon: '🗺️',
    title: 'Régions, hospitalité, cuisine',
    excerpt: 'Au-delà de Dakar et du village familial : Casamance, Sine Saloum, Saint-Louis, Fouta. Là où la rencontre se fait vraiment.',
  },
  {
    num: '06',
    icon: '🧭',
    title: 'S’organiser sans faire le touriste',
    excerpt: 'Une méthode en 6 étapes pour que ce retour change quelque chose en vous. Pas juste une photo de plus sur Instagram.',
  },
]

const SIGNALS = [
  'Tu rentres chaque été mais tu repars avec un goût d’inachevé',
  'Tu n’es jamais rentré et plus le temps passe, plus ça devient difficile',
  'Tu veux emmener tes enfants mais tu ne sais pas par où commencer',
  'Tu as l’impression d’être un touriste dans ton propre pays',
  'Tu passes 3 semaines au village et tu ne vois que le village',
  'Tu culpabilises de vouloir visiter autre chose que la famille',
]

const FAQ = [
  {
    q: 'C’est vraiment gratuit ?',
    a: 'Oui, 100 %. Entre ton prénom et ton email, le PDF arrive dans ta boîte en 2 minutes. Pas de carte bancaire, pas d’abonnement caché.',
  },
  {
    q: 'Le guide est-il réservé aux Sénégalais ?',
    a: 'Non. Il est pensé pour toute diaspora africaine qui rentre (ou aimerait rentrer) autrement qu’en touriste. Les exemples sont sénégalais, la méthode est universelle.',
  },
  {
    q: 'Je suis 2e ou 3e génération, né en France. Ça me concerne ?',
    a: 'C’est exactement pour toi. Le chapitre sur les 5 blocages silencieux parle spécifiquement du décalage que ressentent les générations nées hors du pays.',
  },
  {
    q: 'Qu’est-ce qui va arriver après ?',
    a: 'Tu recevras le PDF immédiatement + 2 ou 3 emails ensuite pour aller plus loin (stories diaspora, invitation au Voyage Retour aux Sources si ça te parle). Désinscription en 1 clic à tout moment.',
  },
  {
    q: 'Mes données seront revendues ?',
    a: 'Jamais. Hébergement en UE (Brevo + Supabase). Purge automatique si tu te désinscris. Politique RGPD complète sur le site.',
  },
]

export default function LeBledAutrementPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !email.includes('@')) {
      setError('Entre un email valide pour recevoir le guide.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email, source: 'le-bled-autrement' }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/merci/le-bled-autrement')
      } else {
        setError('Une erreur est survenue. Réessaie dans un instant.')
      }
    } catch {
      setError('Une erreur est survenue. Réessaie dans un instant.')
    } finally {
      setLoading(false)
    }
  }

  const scrollToForm = () =>
    document.getElementById('bled-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <div style={{ backgroundColor: '#FEFCF9', fontFamily: 'var(--font-poppins), Poppins, sans-serif', color: '#0A0A0A' }}>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#560E13' }}>
        <Image
          src="/images/senegal/hero.jpg"
          alt="Retour au Sénégal, diaspora"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(86,14,19,0.92) 0%, rgba(86,14,19,0.75) 50%, rgba(20,5,8,0.95) 100%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left : copy */}
            <div>
              <div
                className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(246,201,97,0.15)',
                  color: '#F6C961',
                  border: '1px solid rgba(246,201,97,0.45)',
                }}
              >
                Guide diaspora · PDF 14 pages · Gratuit
              </div>

              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#FEFCF9',
                  textShadow: '0 3px 20px rgba(0,0,0,0.4)',
                }}
              >
                Tu rentres chaque été.
                <br />
                <span style={{ color: '#F6C961', fontStyle: 'italic' }}>
                  Ou tu n’es jamais rentré.
                </span>
                <br />
                Les deux se comprennent.
              </h1>

              <p
                className="text-base md:text-lg mb-8 leading-relaxed max-w-xl"
                style={{ color: 'rgba(254,252,249,0.88)' }}
              >
                Le guide pour la diaspora qui veut vivre le Sénégal autrement qu’en touriste.
                Sans culpabilité, sans nostalgie forcée. Avec méthode.
              </p>

              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  backgroundColor: '#F6C961',
                  color: '#560E13',
                  boxShadow: '0 12px 40px rgba(246,201,97,0.4)',
                }}
              >
                Recevoir le guide · Gratuit
              </button>

              <div className="flex items-center gap-5 mt-6 text-xs" style={{ color: 'rgba(254,252,249,0.55)' }}>
                <span>✓ 14 pages</span>
                <span>✓ PDF immédiat</span>
                <span>✓ Sans spam</span>
              </div>
            </div>

            {/* Right : mockup 3D du PDF */}
            <div className="flex justify-center md:justify-end">
              <GuideMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SIGNAUX : est-ce pour moi ? ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Est-ce que ça te parle ?
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              Si une seule de ces phrases te fait tiquer,
              <br />
              ce guide est pour toi.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SIGNALS.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.06)' }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: '#560E13', color: '#F6C961' }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed pt-1">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ L'IDÉE CENTRALE ============ */}
      <section className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#b8860b' }}>
            L’idée du guide
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
          >
            Rentrer, ce n’est pas revenir.
            <br />
            <span style={{ fontStyle: 'italic', color: '#b8860b' }}>
              C’est rencontrer un pays qui a continué sans toi.
            </span>
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(10,10,10,0.78)' }}>
            <p>
              La plupart des enfants de la diaspora reproduisent, sans le vouloir, le même voyage
              qu’il y a 10 ans. Même aéroport, même maison, même cercle de cousins, mêmes plats,
              même hammam. Même frustration au retour.
            </p>
            <p>
              Ce n’est la faute de personne. On répète ce qu’on connaît.
              Mais quelque chose en toi sait qu’il y a plus. Et ce guide est fait pour
              t’aider à aller chercher ce plus.
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: '1.3em', color: '#560E13', fontStyle: 'italic' }}>
              Pas un guide de tourisme. Un guide de retour.
            </p>
          </div>
        </div>
      </section>

      {/* ============ APERÇU DES 6 CHAPITRES ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Ce que tu vas lire
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              6 chapitres pour un vrai retour
            </h2>
            <p className="text-sm opacity-60 mt-3 max-w-xl mx-auto">
              14 pages, lisibles en 20 minutes. Conçues pour être relues avant chaque voyage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHAPTERS.map((c) => (
              <div
                key={c.num}
                className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
                style={{
                  backgroundColor: '#F8F5F0',
                  border: '1px solid rgba(86,14,19,0.08)',
                }}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-cormorant), serif", color: '#F6C961' }}
                  >
                    {c.num}
                  </span>
                  <div className="text-2xl">{c.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-tight" style={{ color: '#560E13' }}>
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>
                  {c.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AUTEURE ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[180px,1fr] gap-8 items-center">
            <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden mx-auto md:mx-0" style={{ border: '3px solid #F6C961' }}>
              <Image
                src="/images/roseline-portrait-1.jpg"
                alt="Roseline Ngom"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#b8860b' }}>
                L’auteure
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Roseline Ngom
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
                Née au Sénégal, partie en France à 20 ans, revenue dix ans plus tard. J’ai fait
                le voyage que je décris dans ce guide — avec tous les faux départs et les silences
                qu’il implique. Depuis 10 ans, j’accompagne la diaspora à rentrer autrement
                via TripAfro, et je constate : ceux qui préparent leur retour vivent une expérience
                différente de ceux qui l’improvisent.
              </p>
              <p className="text-sm md:text-base leading-relaxed mt-3" style={{ color: 'rgba(10,10,10,0.75)' }}>
                Ce guide, c’est ce que j’aurais voulu qu’on me donne avant mon premier retour adulte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TÉMOIGNAGES ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Ils l’ont lu
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              Ce que la diaspora en dit
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Le chapitre sur les 5 blocages silencieux m’a littéralement fait pleurer. J’ai enfin mis des mots sur ce que je ressens depuis 15 ans.',
                name: 'Awa D.',
                loc: 'Paris, 34 ans, née en France',
              },
              {
                quote:
                  'J’ai offert ce guide à ma femme (française) avant notre premier voyage en famille. Elle a compris des choses que je n’arrivais pas à lui expliquer.',
                name: 'Moussa T.',
                loc: 'Bruxelles, 41 ans',
              },
              {
                quote:
                  'Je ne suis pas sénégalaise mais ivoirienne. Les 3/4 du guide s’applique à moi aussi. Très juste, très doux.',
                name: 'Ophélie K.',
                loc: 'Lyon, 29 ans',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <div className="text-2xl mb-3" style={{ color: '#F6C961' }}>“</div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'rgba(10,10,10,0.8)' }}>
                  {t.quote}
                </p>
                <div className="text-sm font-bold" style={{ color: '#560E13' }}>{t.name}</div>
                <div className="text-xs opacity-60">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPTURE FORM ============ */}
      <section id="bled-form" className="py-24 px-5" style={{ backgroundColor: '#560E13' }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>
              Recevoir le guide
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}
            >
              Ton PDF, dans 2 minutes.
            </h2>
            <p className="text-sm" style={{ color: 'rgba(254,252,249,0.7)' }}>
              14 pages à lire ce soir, à relire avant chaque voyage.
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ backgroundColor: '#FEFCF9', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Prénom (optionnel)
                </span>
                <input
                  type="text"
                  placeholder="Ex : Awa"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                  style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: '#560E13' }}>
                  Ton email *
                </span>
                <input
                  type="email"
                  placeholder="toi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                  style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                />
              </label>
              {error && <p className="text-red-600 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 mt-2"
                style={{
                  backgroundColor: '#560E13',
                  color: '#FEFCF9',
                  boxShadow: '0 10px 30px rgba(86,14,19,0.3)',
                }}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer mon guide gratuit'}
              </button>
            </form>

            <div
              className="flex flex-wrap items-center justify-center gap-3 mt-5 text-[10px] uppercase tracking-wider"
              style={{ color: '#0A0A0A', opacity: 0.45 }}
            >
              <span>RGPD</span>
              <span>·</span>
              <span>Pas de spam</span>
              <span>·</span>
              <span>Désinscription 1 clic</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Questions fréquentes
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              Ce qu’on nous demande souvent
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl p-5 cursor-pointer transition-colors"
                style={{ backgroundColor: '#FEFCF9', border: '1px solid rgba(86,14,19,0.08)' }}
              >
                <summary className="flex items-start justify-between gap-4 list-none">
                  <h3 className="text-base font-bold" style={{ color: '#560E13' }}>
                    {item.q}
                  </h3>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform group-open:rotate-45"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    +
                  </span>
                </summary>
                <p className="text-sm leading-relaxed mt-3" style={{ color: 'rgba(10,10,10,0.7)' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="py-20 px-5 text-center" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
          >
            Le prochain retour peut être différent.
          </h2>
          <p className="text-base mb-8 opacity-70 max-w-xl mx-auto">
            Ça ne coûte qu’un email. Et peut-être 20 minutes de lecture qui changent la tête dans laquelle tu reviens.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{
              backgroundColor: '#560E13',
              color: '#F6C961',
              boxShadow: '0 12px 40px rgba(86,14,19,0.3)',
            }}
          >
            Recevoir le guide maintenant
          </button>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center text-xs opacity-40" style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}>
        &copy; {new Date().getFullYear()} Roseline Ngom, TripAfro &middot;{' '}
        <a href="/" className="underline hover:opacity-70">Retour à l&apos;accueil</a>
        &middot;{' '}
        <a href="/politique-confidentialite" className="underline hover:opacity-70">Confidentialité</a>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  GuideMockup — cover 3D pur CSS du PDF Le Bled Autrement            */
/* ------------------------------------------------------------------ */
function GuideMockup() {
  return (
    <div
      className="relative"
      style={{
        width: '300px',
        height: '420px',
        perspective: '1400px',
      }}
    >
      {/* Pages empilées derrière (effet livret) */}
      <div
        className="absolute"
        style={{
          top: '18px',
          left: '14px',
          width: '100%',
          height: '100%',
          backgroundColor: '#f5eee2',
          borderRadius: '6px',
          transform: 'rotate(3deg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '10px',
          left: '7px',
          width: '100%',
          height: '100%',
          backgroundColor: '#faf4e8',
          borderRadius: '6px',
          transform: 'rotate(1.5deg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      />

      {/* Cover principale */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #560E13 0%, #7a1a22 55%, #2d0609 100%)',
          transform: 'rotateY(-14deg) rotateX(3deg)',
          transformStyle: 'preserve-3d',
          boxShadow:
            '0 40px 80px rgba(0,0,0,0.5), 0 20px 30px rgba(86,14,19,0.3), inset -2px 0 6px rgba(0,0,0,0.25), inset 2px 0 6px rgba(255,255,255,0.05)',
        }}
      >
        {/* Tranche/relief vertical (dos du livre) */}
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: '10px',
            background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
          }}
        />

        {/* Texture pattern doré très discrète */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(246,201,97,0.6), transparent 35%), radial-gradient(circle at 80% 75%, rgba(246,201,97,0.45), transparent 40%)',
          }}
        />

        {/* Contenu cover */}
        <div className="relative h-full flex flex-col justify-between p-7 text-left">
          {/* Top : éditeur + badge */}
          <div>
            <div
              className="text-[9px] font-bold uppercase tracking-[0.35em]"
              style={{ color: 'rgba(246,201,97,0.75)' }}
            >
              TripAfro · Roseline Ngom
            </div>
            <div
              className="mt-3 inline-block text-[8px] font-bold uppercase tracking-[0.25em] px-2 py-1 rounded"
              style={{
                backgroundColor: 'rgba(246,201,97,0.15)',
                color: '#F6C961',
                border: '1px solid rgba(246,201,97,0.35)',
              }}
            >
              Guide diaspora
            </div>
          </div>

          {/* Milieu : titre */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
              style={{ color: 'rgba(254,252,249,0.55)' }}
            >
              Le
            </div>
            <div
              className="leading-[0.95] mb-1"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
                fontSize: '46px',
                fontWeight: 700,
              }}
            >
              Bled
            </div>
            <div
              className="leading-[0.95]"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#F6C961',
                fontSize: '46px',
                fontWeight: 700,
                fontStyle: 'italic',
              }}
            >
              Autrement
            </div>
            <div
              className="mt-4 text-[10px] leading-relaxed max-w-[85%]"
              style={{ color: 'rgba(254,252,249,0.7)' }}
            >
              Rentrer au Sénégal quand on est de la diaspora —
              sans culpabilité, sans nostalgie, avec méthode.
            </div>
          </div>

          {/* Bas : séparateur + meta */}
          <div>
            <div className="w-10 h-[2px] mb-3" style={{ backgroundColor: '#F6C961' }} />
            <div className="flex items-center justify-between">
              <div className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(254,252,249,0.55)' }}>
                14 pages · PDF
              </div>
              <div
                className="text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-1 rounded"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Gratuit
              </div>
            </div>
          </div>
        </div>

        {/* Reflet verre */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      </div>
    </div>
  )
}
