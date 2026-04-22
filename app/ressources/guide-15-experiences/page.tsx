'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ExperienceCard } from '@/components/ExperienceCard'

/* ==================================================================
   /ressources/guide-15-experiences — sales page refondue
   Hero split + mockup 3D + 15 expériences + copy éditorial + form
   ================================================================== */

const EXPERIENCES_PREVIEW = [
  { n: 1, category: 'Mémoire', teaser: 'Classée UNESCO. Et pourtant, presque personne ne la vit vraiment.', image: '/images/senegal/gallery-3.jpg' },
  { n: 2, category: 'Nature', teaser: 'Les plus belles photos du Sénégal se prennent ici. À 6h30 du matin.', image: '/images/senegal/exp-01-lac-rose.jpg' },
  { n: 3, category: 'Faune', teaser: 'Un safari à 1h de Dakar. Oui, au Sénégal.', image: '/images/senegal/bandia-girafe.jpeg' },
  { n: 4, category: 'Adrénaline', teaser: 'Une des quatre expériences de ce type au monde. 180 kilos à côté de vous.', image: '/images/senegal/fathala.jpeg' },
  { n: 5, category: 'Évasion', teaser: 'La mangrove à portée de main, entre océan et cocotiers.', image: '/images/senegal/lagune-somone.jpg' },
  { n: 6, category: 'Gastronomie', teaser: 'Le poisson grillé, l’ambiance, les pieds dans le sable. Rien d’autre.', image: '/images/senegal/gallery-6.jpg' },
  { n: 7, category: 'Rencontres', teaser: 'Un des plus grands débarquements de pêche artisanale d’Afrique de l’Ouest.', image: '/images/senegal/gallery-2.jpg' },
  { n: 8, category: 'Sacré', teaser: 'Mille ans. Un seul arbre. Un silence qui impose.', image: '/images/senegal/gallery-4.jpg' },
  { n: 9, category: 'Culture', teaser: 'Une île de coquillages où deux confessions reposent ensemble. Unique en Afrique.', image: '/images/senegal/joal-fadiouth.jpeg' },
  { n: 10, category: 'Nature', teaser: 'Un labyrinthe d’eau, classé Réserve de Biosphère UNESCO.', image: '/images/senegal/gallery-5.jpg' },
  { n: 11, category: 'Villes', teaser: 'L’ancienne capitale de l’AOF, au rythme d’un autre siècle.', image: '/images/senegal/saint-louis.jpg' },
  { n: 12, category: 'Aventure', teaser: 'Un mini-Sahara à 150 km de Dakar. Et une nuit sous les étoiles.', image: '/images/senegal/Lompoul.jpeg' },
  { n: 13, category: 'Hors des sentiers', teaser: 'Premier comptoir français de l’Afrique de l’Ouest. Oublié du monde.', image: '/images/senegal/karabane.jpg' },
  { n: 14, category: 'Hors des sentiers', teaser: 'L’île vierge. Presque aucun touriste ne la connaît.', image: '/images/senegal/hitou.jpg' },
  { n: 15, category: 'Mystère', teaser: 'Fromagers sacrés, bolongs secrets, silence total. Aucun guide ne la mentionne.', image: '/images/senegal/nioumoune.png' },
]

const TESTIMONIALS = [
  {
    name: 'Amina D.',
    country: 'Paris, France',
    image: '/images/senegal/testimonial-1.jpg',
    text: 'Ce guide m’a ouvert des portes que je n’aurais jamais trouvées seule. Le conseil sur Carabane vaut déjà les 10 minutes pour le télécharger.',
  },
  {
    name: 'Marcus T.',
    country: 'New York, USA',
    image: '/images/senegal/testimonial-2.jpg',
    text: 'Indispensable pour vivre le vrai Sénégal, pas le Sénégal des resorts. J’ai suivi l’itinéraire Bassari à la lettre.',
  },
  {
    name: 'Sophie K.',
    country: 'Bruxelles, Belgique',
    image: '/images/senegal/testimonial-3.jpg',
    text: 'J’ai partagé ce guide à toute ma famille avant notre voyage. Les 15 expériences sont validées par les locaux.',
  },
]

const FAQ = [
  {
    q: 'Je reçois le guide quand exactement ?',
    a: 'Immédiatement dans ta boîte mail. Si tu ne le vois pas dans 2 minutes, vérifie tes spams ou l’onglet Promotions (Gmail).',
  },
  {
    q: 'Quel est le format du fichier ?',
    a: 'PDF de 33 pages, optimisé pour lecture mobile et impression. Ouvrable partout, sans inscription à une plateforme.',
  },
  {
    q: 'Pourquoi c’est gratuit ?',
    a: 'Parce que je veux que tu te lances vraiment. Si mon travail te parle, tu décideras peut-être d’aller plus loin avec un guide payant ou un voyage TripAfro. Pas de pression, pas d’obligation.',
  },
  {
    q: 'Les contacts du guide sont-ils à jour ?',
    a: 'Oui. Les contacts WhatsApp et adresses sont vérifiés tous les trimestres. Si tu télécharges le guide, tu reçois automatiquement les mises à jour majeures pendant 12 mois.',
  },
  {
    q: 'Vous allez spammer mon email ?',
    a: 'Jamais. Tu recevras le guide, puis 1 à 2 emails par mois maximum (newsletter La Teranga). Désinscription en 1 clic si ça ne te parle pas.',
  },
]

export default function GuidePage() {
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
        body: JSON.stringify({ prenom, email, source: 'guide-pdf' }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/ressources/guide-15-experiences/merci?prenom=${encodeURIComponent(prenom)}`)
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
    document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <div style={{ backgroundColor: '#FEFCF9', fontFamily: 'var(--font-poppins), Poppins, sans-serif', color: '#0A0A0A' }}>
      <Nav />

      {/* ============ HERO SPLIT ============ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#560E13' }}>
        <Image
          src="/images/senegal/hero.jpg"
          alt="Sénégal, coucher de soleil, voyage authentique"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(86,14,19,0.92) 0%, rgba(86,14,19,0.78) 50%, rgba(20,5,8,0.95) 100%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Copy */}
            <div>
              <div
                className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(246,201,97,0.15)',
                  color: '#F6C961',
                  border: '1px solid rgba(246,201,97,0.45)',
                }}
              >
                Guide voyageur · PDF 33 pages · Gratuit
              </div>

              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#FEFCF9',
                  textShadow: '0 3px 20px rgba(0,0,0,0.4)',
                }}
              >
                15 expériences secrètes
                <br />
                <span style={{ color: '#F6C961', fontStyle: 'italic' }}>
                  au Sénégal.
                </span>
              </h1>

              <p
                className="text-base md:text-lg mb-8 leading-relaxed max-w-xl"
                style={{ color: 'rgba(254,252,249,0.88)' }}
              >
                Le carnet d’adresses qu’une locale donne à ses amis avant leur premier
                voyage. 33 pages, 15 lieux, contacts directs — mon Sénégal, pas celui
                des brochures.
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
                <span>✓ 33 pages</span>
                <span>✓ 15 expériences</span>
                <span>✓ Livraison immédiate</span>
              </div>
            </div>

            {/* Mockup 3D */}
            <div className="flex justify-center md:justify-end">
              <GuideMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF STRIP ============ */}
      <section className="py-10 px-5" style={{ backgroundColor: '#F8F5F0', borderBottom: '1px solid rgba(86,14,19,0.08)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {[
            { num: '2 000+', label: 'Voyageurs guidés' },
            { num: '10 ans', label: 'De terrain au Sénégal' },
            { num: '33', label: 'Pages dans le guide' },
            { num: '15', label: 'Lieux secrets' },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl md:text-4xl font-bold leading-none mb-2"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                {s.num}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ÉDITORIAL ============ */}
      <section className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#b8860b' }}>
            Un guide, un carnet d’adresses
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
          >
            Ce n’est pas un guide touristique.
            <br />
            <span style={{ fontStyle: 'italic', color: '#b8860b' }}>
              C’est mon carnet.
            </span>
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-left" style={{ color: 'rgba(10,10,10,0.78)' }}>
            <p>
              Pendant dix ans, j’ai emmené des voyageurs découvrir le Sénégal. À chaque fois,
              ce sont les mêmes lieux, les mêmes rencontres qui transforment leur séjour.
              J’ai rassemblé ces 15 pépites ici — pour que tu vives un voyage, pas des vacances.
            </p>
            <p>
              Ce guide n’est pas un catalogue. C’est le fruit de dix années d’expertise
              terrain, condensées en 33 pages. Les adresses que je ne partage pas sur les
              réseaux. Les contacts de confiance que j’ai mis des années à construire.
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: '1.3em', color: '#560E13', fontStyle: 'italic' }}>
              Chaque page : le lieu exact, comment y aller, quand partir, combien prévoir,
              et l’astuce insider que seule une locale connaît.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 15 EXPÉRIENCES GRID ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Ce que tu vas débloquer
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
            >
              15 expériences révélées dans le guide
            </h2>
            <p className="text-sm md:text-base max-w-xl mx-auto mt-3 opacity-60">
              Chaque expérience est un secret. Le guide les déverrouille toutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERIENCES_PREVIEW.map((exp) => (
              <ExperienceCard
                key={exp.n}
                number={exp.n}
                category={exp.category}
                teaser={exp.teaser}
                image={exp.image}
              />
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                backgroundColor: '#560E13',
                color: '#F6C961',
                boxShadow: '0 12px 30px rgba(86,14,19,0.25)',
              }}
            >
              Débloquer les 15 expériences
            </button>
          </div>
        </div>
      </section>

      {/* ============ ROSELINE ============ */}
      <section className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center">
            {/* Portrait avec cadre doré offset */}
            <div className="flex justify-center">
              <div className="relative" style={{ width: 260, height: 340 }}>
                <div
                  className="absolute rounded-[4px]"
                  style={{
                    top: 14,
                    left: 14,
                    width: 260,
                    height: 340,
                    backgroundColor: '#F6C961',
                    zIndex: 0,
                  }}
                />
                <div
                  className="relative overflow-hidden rounded-[4px]"
                  style={{
                    width: 260,
                    height: 340,
                    boxShadow: '0 20px 40px rgba(86,14,19,0.2)',
                    zIndex: 1,
                  }}
                >
                  <Image
                    src="/images/roseline.jpg"
                    alt="Roseline Ngom"
                    fill
                    sizes="260px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: '#b8860b' }}>
                L’auteure
              </div>
              <h3
                className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#560E13' }}
              >
                Roseline Ngom
              </h3>
              <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
                Fondatrice TripAfro · Casamançaise de cœur
              </p>

              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(10,10,10,0.78)' }}>
                En dix ans passés à sillonner le Sénégal, j’ai accompagné plus de 2 000
                voyageurs. Des premiers pas sur l’île de Gorée aux nuits sous les étoiles
                de Lompoul, j’ai vu ce pays transformer des visiteurs en amoureux. Ce guide,
                c’est la quintessence de ces dix années : mes adresses, mes contacts, mes secrets.
              </p>

              <blockquote
                className="text-xl md:text-2xl leading-snug my-6 pl-5"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#560E13',
                  fontStyle: 'italic',
                  borderLeft: '3px solid #F6C961',
                }}
              >
                « Dix ans de terrain, 2 000 voyageurs accompagnés. Ce guide, c’est toute mon expertise en 33 pages. »
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALERIE MOSAÏQUE ============ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#560E13' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>
              Carnet visuel
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", color: '#FEFCF9' }}
            >
              Le Sénégal <span style={{ color: '#F6C961', fontStyle: 'italic' }}>tel qu’il se vit</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: '/images/senegal/gallery-1.jpg', alt: 'Scène de vie au Sénégal', ratio: '3/4', span: 'md:row-span-2' },
              { src: '/images/senegal/gallery-2.jpg', alt: 'Paysage sénégalais authentique', ratio: '3/2', span: '' },
              { src: '/images/senegal/gallery-3.jpg', alt: 'Rencontre locale', ratio: '3/2', span: '' },
              { src: '/images/senegal/gallery-4.jpg', alt: 'Artisanat', ratio: '3/2', span: '' },
              { src: '/images/senegal/gallery-5.jpg', alt: 'Côte atlantique', ratio: '3/2', span: '' },
              { src: '/images/senegal/gallery-6.jpg', alt: 'Marché sénégalais', ratio: '16/9', span: 'md:col-span-2' },
            ].map((img) => (
              <div
                key={img.src}
                className={`group relative overflow-hidden rounded-[4px] ${img.span}`}
                style={{ aspectRatio: img.ratio }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm mb-3" style={{ color: 'rgba(254,252,249,0.7)' }}>
              Les coulisses au jour le jour
            </p>
            <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
              <a href="https://www.instagram.com/roselinengom" target="_blank" rel="noopener noreferrer" style={{ color: '#F6C961' }} className="hover:opacity-80 transition-opacity">
                Instagram
              </a>
              <span style={{ color: 'rgba(246,201,97,0.4)' }}>·</span>
              <a href="https://www.tiktok.com/@roselinengom" target="_blank" rel="noopener noreferrer" style={{ color: '#F6C961' }} className="hover:opacity-80 transition-opacity">
                TikTok
              </a>
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
              Ce qu’ils en disent
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  backgroundColor: '#F8F5F0',
                  border: '1px solid rgba(86,14,19,0.08)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="relative flex-shrink-0 overflow-hidden rounded-full"
                    style={{ width: 52, height: 52, border: '2px solid #560E13' }}
                  >
                    <Image src={t.image} alt={t.name} fill sizes="52px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#560E13' }}>{t.name}</div>
                    <div className="text-xs opacity-60">{t.country}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 text-sm mb-3" style={{ color: '#F6C961' }}>
                  {'★★★★★'}
                </div>
                <p className="text-sm leading-relaxed italic flex-1" style={{ color: 'rgba(10,10,10,0.8)' }}>
                  « {t.text} »
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPTURE FORM ============ */}
      <section id="guide-form" className="py-24 px-5" style={{ backgroundColor: '#560E13' }}>
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
              33 pages, 15 lieux, contacts directs. À lire ce soir.
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
                  placeholder="Ex : Sophie"
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
            Prêt à découvrir le <span style={{ fontStyle: 'italic', color: '#b8860b' }}>vrai</span> Sénégal ?
          </h2>
          <p className="text-base mb-8 opacity-70 max-w-xl mx-auto">
            Rejoins 2 000+ voyageurs qui ont téléchargé le guide. Ça prend 10 secondes.
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

      <Footer />
    </div>
  )
}

/* ==================================================================
   GuideMockup — cover 3D pur CSS du PDF 15 expériences
   ================================================================== */
function GuideMockup() {
  return (
    <div className="relative" style={{ width: '300px', height: '420px', perspective: '1400px' }}>
      {/* Pages derrière */}
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

      {/* Cover */}
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
        {/* Dos */}
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: '10px',
            background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
          }}
        />

        {/* Pattern doré + hex motif discret */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexCover" x="0" y="0" width="46" height="40" patternUnits="userSpaceOnUse">
                <polygon points="23,2 43,13 43,28 23,39 3,28 3,13" fill="none" stroke="#F6C961" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexCover)" />
          </svg>
        </div>

        <div className="relative h-full flex flex-col justify-between p-7 text-left">
          {/* Top */}
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
              Guide voyageur
            </div>
          </div>

          {/* Milieu : titre */}
          <div>
            <div
              className="leading-none mb-2"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#F6C961',
                fontSize: '72px',
                fontWeight: 700,
              }}
            >
              15
            </div>
            <div
              className="leading-[0.95] mb-1"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#FEFCF9',
                fontSize: '26px',
                fontWeight: 700,
              }}
            >
              expériences
            </div>
            <div
              className="leading-[0.95]"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#F6C961',
                fontSize: '26px',
                fontWeight: 700,
                fontStyle: 'italic',
              }}
            >
              secrètes au Sénégal
            </div>
            <div
              className="mt-4 text-[10px] leading-relaxed max-w-[85%]"
              style={{ color: 'rgba(254,252,249,0.7)' }}
            >
              Le carnet d’adresses qu’une locale donne à ses amis avant leur premier voyage.
            </div>
          </div>

          {/* Bas */}
          <div>
            <div className="w-10 h-[2px] mb-3" style={{ backgroundColor: '#F6C961' }} />
            <div className="flex items-center justify-between">
              <div className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(254,252,249,0.55)' }}>
                33 pages · PDF
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

        {/* Reflet */}
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
