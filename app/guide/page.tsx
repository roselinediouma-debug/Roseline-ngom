'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import SectionWrapper from '@/components/SectionWrapper'
import { ExperienceCard } from '@/components/ExperienceCard'
import Footer from '@/components/Footer'

// ─── Teasers des 15 expériences — version "verrouillée" pour créer du suspense ──
// Le contenu réel (nom du lieu, contact, tips) est dans le PDF uniquement.
const EXPERIENCES_PREVIEW = [
  // DAKAR & CAP-VERT
  { n: 1, category: 'Mémoire', teaser: 'Classée UNESCO. Et pourtant, presque personne ne la vit vraiment.', image: '/images/senegal/gallery-3.jpg' },
  { n: 2, category: 'Nature', teaser: 'Les plus belles photos du Sénégal se prennent ici. À 6h30 du matin.', image: '/images/senegal/exp-01-lac-rose.jpg' },
  // PETITE CÔTE
  { n: 3, category: 'Faune', teaser: 'Un safari à 1h de Dakar. Oui, au Sénégal.', image: '/images/senegal/bandia-girafe.jpeg' },
  { n: 4, category: 'Adrénaline', teaser: 'Une des quatre expériences de ce type au monde. 180 kilos à côté de vous.', image: '/images/senegal/fathala.jpeg' },
  { n: 5, category: 'Évasion', teaser: 'La mangrove à portée de main, entre océan et cocotiers.', image: '/images/senegal/lagune-somone.jpg' },
  { n: 6, category: 'Gastronomie', teaser: 'Le poisson grillé, l\'ambiance, les pieds dans le sable. Rien d\'autre.', image: '/images/senegal/gallery-6.jpg' },
  { n: 7, category: 'Rencontres', teaser: 'Un des plus grands débarquements de pêche artisanale d\'Afrique de l\'Ouest.', image: '/images/senegal/gallery-2.jpg' },
  { n: 8, category: 'Sacré', teaser: 'Mille ans. Un seul arbre. Un silence qui impose.', image: '/images/senegal/gallery-4.jpg' },
  { n: 9, category: 'Culture', teaser: 'Une île de coquillages où deux confessions reposent ensemble. Unique en Afrique.', image: '/images/senegal/joal-fadiouth.jpeg' },
  // SINE SALOUM
  { n: 10, category: 'Nature', teaser: 'Un labyrinthe d\'eau, classé Réserve de Biosphère UNESCO.', image: '/images/senegal/gallery-5.jpg' },
  // NORD & DÉSERT
  { n: 11, category: 'Villes', teaser: 'L\'ancienne capitale de l\'AOF, au rythme d\'un autre siècle.', image: '/images/senegal/saint-louis.jpg' },
  { n: 12, category: 'Aventure', teaser: 'Un mini-Sahara à 150 km de Dakar. Et une nuit sous les étoiles.', image: '/images/senegal/Lompoul.jpeg' },
  // CASAMANCE & ÎLES
  { n: 13, category: 'Hors des sentiers', teaser: 'Premier comptoir français de l\'Afrique de l\'Ouest. Oublié du monde.', image: '/images/senegal/karabane.jpg' },
  { n: 14, category: 'Hors des sentiers', teaser: 'L\'île vierge. Presque aucun touriste ne la connaît.', image: '/images/senegal/hitou.jpg' },
  { n: 15, category: 'Mystère', teaser: 'Fromagers sacrés, bolongs secrets, silence total. Aucun guide ne la mentionne.', image: '/images/senegal/nioumoune.png' },
]

const TESTIMONIALS = [
  {
    name: 'Amina D.',
    country: 'Paris, France',
    image: '/images/senegal/testimonial-1.jpg',
    text: 'Ce guide m\'a ouvert des portes que je n\'aurais jamais trouvées seule. Le conseil sur Carabane vaut déjà les 10 minutes pour le télécharger.',
  },
  {
    name: 'Marcus T.',
    country: 'New York, USA',
    image: '/images/senegal/testimonial-2.jpg',
    text: 'Indispensable pour vivre le vrai Sénégal — pas le Sénégal des resorts. J\'ai suivi l\'itinéraire Bassari à la lettre.',
  },
  {
    name: 'Sophie K.',
    country: 'Bruxelles, Belgique',
    image: '/images/senegal/testimonial-3.jpg',
    text: 'J\'ai partagé ce guide à toute ma famille avant notre voyage. Les 15 expériences sont validées par les locaux.',
  },
]


const FAQ_ITEMS = [
  {
    q: 'Je reçois le guide quand exactement ?',
    a: 'Instantanément dans votre boîte mail. Si vous ne le voyez pas dans 2 minutes, vérifiez vos spams ou onglet Promotions (Gmail).',
  },
  {
    q: 'Quel est le format du fichier ?',
    a: 'Un PDF de 33 pages, optimisé pour la lecture mobile et l\'impression. Ouvrable partout, sans inscription à une plateforme.',
  },
  {
    q: 'Pourquoi c\'est gratuit ?',
    a: 'Parce que je veux que vous vous lanciez vraiment. Si mon travail résonne avec vous, vous déciderez peut-être d\'aller plus loin avec un guide payant ou un voyage TripAfro.',
  },
  {
    q: 'Vous allez spammer mon email ?',
    a: 'Jamais. Vous recevrez le guide, puis occasionnellement une newsletter (1 à 2/mois max). Désinscription en 1 clic si ça ne vous parle pas.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 text-sm" style={{ color: '#F6C961' }} aria-label="5 étoiles">
      {[...Array(5)].map((_, i) => <span key={i}>&#9733;</span>)}
    </div>
  )
}

export default function GuidePage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer un email valide.')
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
        router.push(`/guide/merci?prenom=${encodeURIComponent(prenom)}`)
      } else {
        setError('Une erreur est survenue. Réessayez.')
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      {/* ═══ Navigation ═══ */}
      <Nav />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO (full-screen photo)
         ═══════════════════════════════════════════════════════════ */}
      <HeroSection
        imageSrc="/images/senegal/hero.jpg"
        imageAlt="Paysage du Sénégal au coucher du soleil"
        eyebrow="Guide offert · 33 pages"
        title={
          <>
            15 expériences secrètes<br />
            <span style={{ color: '#F6C961', fontStyle: 'italic' }}>au Sénégal</span>
          </>
        }
        subtitle="Le guide que seule une locale peut vous offrir. 33 pages, 15 lieux secrets, contacts directs et conseils pratiques."
        ctaLabel="Recevoir mon guide gratuitement"
        ctaHref="#guide-form"
        ctaSubtext="100% gratuit · livraison immédiate par email"
        showChevron
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — EDITORIAL (bg cream)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="cream">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          {/* Mockup PDF stylisé */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 z-20 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest rotate-[6deg]"
                style={{
                  backgroundColor: '#F6C961',
                  color: '#560E13',
                  boxShadow: '0 6px 20px rgba(246,201,97,0.5)',
                }}
              >
                100% gratuit
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-full h-full rounded-[4px]"
                style={{ backgroundColor: 'rgba(86,14,19,0.15)', transform: 'rotate(3deg)' }}
              />
              <div
                className="relative w-[300px] h-[420px] md:w-[340px] md:h-[470px] rounded-[4px] overflow-hidden"
                style={{
                  boxShadow: '0 30px 60px -15px rgba(86,14,19,0.5), 0 0 0 1px rgba(86,14,19,0.1)',
                  transform: 'rotate(-2deg)',
                }}
              >
                <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #560E13 0%, #3d0a0e 100%)' }} />
                <div className="absolute inset-0 opacity-[0.08]">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="hexPDF" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
                        <polygon points="25,2 47,14 47,30 25,42 3,30 3,14" fill="none" stroke="#F6C961" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexPDF)" />
                  </svg>
                </div>
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <span
                    className="inline-block self-start px-3 py-1 text-[9px] font-bold tracking-[0.2em]"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    GUIDE OFFERT · 2026
                  </span>
                  <div>
                    <div className="w-12 h-[3px] mb-4" style={{ backgroundColor: '#F6C961' }} />
                    <h3 className="text-3xl font-bold leading-[1.1] mb-4 font-cormorant">
                      15 expériences secrètes au Sénégal
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#F6C961' }}>
                      Le guide que seule une locale peut vous offrir
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-base font-cormorant">Roseline Ngom</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase mt-0.5" style={{ color: '#F6C961' }}>
                      Fondatrice TripAfro
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Texte éditorial */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4 font-poppins" style={{ color: '#b8860b' }}>
              Un guide, un carnet d&apos;adresses
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight font-cormorant" style={{ color: '#560E13' }}>
              Ce n&apos;est pas un guide touristique. C&apos;est mon carnet.
            </h2>
            <p className="text-base leading-relaxed mb-4 font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.78 }}>
              Pendant dix ans, j&apos;ai emmené des voyageurs découvrir le Sénégal. À chaque fois, ce sont les mêmes
              lieux, les mêmes rencontres qui transforment leur séjour. J&apos;ai rassemblé ces 15 pépites ici —
              pour que vous viviez un voyage, pas des vacances.
            </p>
            <p className="text-base leading-relaxed mb-4 font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.78 }}>
              Ce guide n&apos;est pas un catalogue. C&apos;est le fruit de dix années d&apos;expertise terrain, condensées en 33 pages.
              Les adresses que je ne partage pas sur les réseaux. Les contacts de confiance que j&apos;ai mis des années à construire.
            </p>
            <p className="text-base leading-relaxed mb-8 font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.78 }}>
              Chaque page contient le lieu exact, comment y aller, quand partir, combien prévoir, et surtout
              l&apos;astuce insider que seule une locale connaît.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: '2px solid rgba(246,201,97,0.3)' }}>
              {[
                { num: '33', label: 'pages' },
                { num: '15', label: 'expériences' },
                { num: '10 ans', label: 'de terrain' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold leading-none font-cormorant" style={{ color: '#560E13' }}>
                    {num}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] opacity-60 mt-2 font-dm-sans">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — PHOTO STRIP (bg bordeaux)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="bordeaux">
        <div className="text-center mb-10">
          <p
            className="text-xl sm:text-2xl md:text-[28px] leading-relaxed font-cormorant max-w-3xl mx-auto"
            style={{ color: '#F6C961', fontStyle: 'italic' }}
          >
            &laquo; Le Sénégal a tout. Il est temps de le révéler. &raquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { src: '/images/senegal/exp-01-lac-rose.jpg', caption: 'Lac Rose' },
            { src: '/images/senegal/goree.jpg', caption: 'Île de Gorée' },
            { src: '/images/senegal/saint-louis.jpg', caption: 'Saint-Louis' },
          ].map(({ src, caption }) => (
            <div key={src} className="group">
              <div className="relative overflow-hidden rounded-[4px]" style={{ aspectRatio: '3/2' }}>
                <Image
                  src={src}
                  alt={caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-center mt-3 text-sm font-dm-sans" style={{ color: 'rgba(254,252,249,0.7)' }}>
                {caption}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — 15 EXPÉRIENCES GRID (bg cream)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="cream">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-cormorant" style={{ color: '#560E13' }}>
            15 expériences révélées dans le guide
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto font-dm-sans" style={{ opacity: 0.6 }}>
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
            className="btn-bordeaux"
          >
            Télécharger le guide
          </button>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — MEET ROSELINE (bg white)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="white">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
          {/* Portrait avec cadre doré offset */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: 300, height: 400 }}>
              <div
                className="absolute rounded-[4px]"
                style={{
                  top: 12,
                  left: 12,
                  width: 300,
                  height: 400,
                  backgroundColor: '#F6C961',
                  zIndex: 0,
                }}
              />
              <div
                className="relative overflow-hidden rounded-[4px]"
                style={{
                  width: 300,
                  height: 400,
                  boxShadow: '0 20px 40px rgba(86,14,19,0.2)',
                  zIndex: 1,
                }}
              >
                <Image
                  src="/images/roseline.jpg"
                  alt="Roseline Ngom"
                  fill
                  sizes="300px"
                  loading="lazy"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight font-cormorant" style={{ color: '#560E13' }}>
              Roseline Ngom
            </h2>
            <p className="text-sm mb-6 font-poppins" style={{ color: '#6B7280' }}>
              Fondatrice TripAfro · Casamançaise de coeur
            </p>

            <p className="text-base leading-relaxed mb-4 font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.78 }}>
              En une décennie passée à sillonner le Sénégal, j&apos;ai accompagné plus de 2 000 voyageurs.
              Des premiers pas sur l&apos;île de Gorée aux nuits sous les étoiles de Lompoul, j&apos;ai vu
              ce pays transformer des visiteurs en amoureux. Ce guide, c&apos;est la quintessence de ces
              dix années : mes adresses, mes contacts, mes secrets.
            </p>
            <p className="text-base leading-relaxed mb-6 font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.78 }}>
              Je l&apos;ai écrit pour vous éviter les pièges à touristes et vous emmener directement
              dans les endroits qui comptent. Ceux où le Sénégal se révèle vraiment.
            </p>

            <blockquote
              className="text-xl md:text-2xl leading-snug mb-8 pl-5 font-cormorant"
              style={{
                color: '#560E13',
                fontStyle: 'italic',
                borderLeft: '3px solid #F6C961',
              }}
            >
              &laquo; Dix ans de terrain, 2 000 voyageurs accompagnés. Ce guide, c&apos;est toute mon expertise en 33 pages. &raquo;
            </blockquote>

            <div className="grid grid-cols-3 gap-4 pt-6" style={{ borderTop: '2px solid rgba(246,201,97,0.3)' }}>
              {[
                { num: '2 000+', label: 'voyageurs guidés' },
                { num: '10 ans', label: 'de terrain' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold leading-none font-cormorant" style={{ color: '#560E13' }}>
                    {num}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] opacity-60 mt-2 leading-tight font-dm-sans">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — TESTIMONIALS (bg cream)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="cream">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-cormorant" style={{ color: '#560E13' }}>
            Ce qu&apos;ils disent après avoir lu le guide
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white p-7 rounded-[4px] flex flex-col"
              style={{ border: '1px solid #e0d8d0', boxShadow: '0 4px 20px rgba(86,14,19,0.05)' }}
            >
              {/* Avatar + info */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="relative flex-shrink-0 overflow-hidden rounded-full"
                  style={{ width: 56, height: 56, border: '2px solid #560E13' }}
                >
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#560E13' }}>{t.name}</div>
                  <div className="text-xs opacity-50">{t.country}</div>
                </div>
              </div>
              <Stars />
              <p className="text-sm leading-relaxed flex-1 mt-3 font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.8, fontStyle: 'italic' }}>
                &laquo; {t.text} &raquo;
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — CAPTURE FORM (bg white)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="white" id="guide-form">
        <div className="grid md:grid-cols-2 gap-0 rounded-[4px] overflow-hidden" style={{ boxShadow: '0 25px 60px rgba(86,14,19,0.12)' }}>
          {/* Left: bordeaux card with hex overlay */}
          <div className="relative p-10 md:p-12 flex flex-col justify-center" style={{ backgroundColor: '#560E13' }}>
            <div className="hex-overlay" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 font-cormorant" style={{ color: '#F6C961' }}>
                Votre guide vous attend
              </h2>
              <ul className="space-y-4 text-sm" style={{ color: '#FEFCF9' }}>
                {[
                  '33 pages illustrées avec cartes et photos',
                  '15 expériences secrètes avec contacts directs',
                  'Téléchargement immédiat par email',
                  '100% gratuit, zéro spam',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M4 10l4 4 8-8" stroke="#F6C961" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="opacity-90 font-dm-sans">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 md:p-12 flex flex-col justify-center" style={{ backgroundColor: '#FEFCF9' }}>
            {success ? (
              <div className="text-center py-8">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
                  <circle cx="24" cy="24" r="24" fill="#560E13" />
                  <path d="M14 24l7 7 13-13" stroke="#F6C961" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-xl font-bold font-cormorant" style={{ color: '#560E13' }}>
                  Vérifiez votre boîte email
                </p>
                <p className="text-sm mt-2 font-dm-sans" style={{ opacity: 0.6 }}>
                  Votre guide arrive dans les prochaines minutes.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-cormorant" style={{ color: '#560E13' }}>
                  Recevez-le maintenant
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-widest mb-2 block font-dm-sans" style={{ color: '#560E13' }}>
                      Prénom (optionnel)
                    </span>
                    <input
                      type="text"
                      placeholder="Ex : Sophie"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="w-full px-4 py-3 rounded-[4px] text-sm outline-none focus:border-[#560E13] transition-colors font-dm-sans"
                      style={{ border: '1px solid #e0d8d0', backgroundColor: '#FEFCF9' }}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-widest mb-2 block font-dm-sans" style={{ color: '#560E13' }}>
                      Votre email *
                    </span>
                    <input
                      type="email"
                      placeholder="vous@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-[4px] text-sm outline-none focus:border-[#560E13] transition-colors font-dm-sans"
                      style={{ border: '1px solid #e0d8d0', backgroundColor: '#FEFCF9' }}
                    />
                  </label>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-bordeaux w-full mt-2"
                  >
                    {loading ? 'Envoi en cours...' : 'Recevoir mon guide gratuit'}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-[10px] uppercase tracking-wider font-dm-sans" style={{ color: '#0A0A0A', opacity: 0.5 }}>
                    <span>RGPD</span>
                    <span>·</span>
                    <span>0 spam</span>
                    <span>·</span>
                    <span>Désinscription 1 clic</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — FAQ (bg bordeaux)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="bordeaux">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-cormorant" style={{ color: '#F6C961' }}>
              Questions fréquentes
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border-b" style={{ borderColor: 'rgba(246,201,97,0.2)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-5 flex items-center justify-between text-left transition-colors hover:opacity-80"
                >
                  <span className="font-semibold text-sm pr-6 font-dm-sans" style={{ color: '#F6C961' }}>
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-transform"
                    style={{
                      backgroundColor: openFaq === i ? '#F6C961' : 'rgba(246,201,97,0.15)',
                      color: openFaq === i ? '#560E13' : '#F6C961',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm leading-relaxed font-dm-sans" style={{ color: 'rgba(254,252,249,0.8)' }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA (bg black)
         ═══════════════════════════════════════════════════════════ */}
      <SectionWrapper bg="black">
        {/* Background image with low opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/senegal/hero.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
            style={{ opacity: 0.15 }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight font-cormorant" style={{ color: '#FEFCF9' }}>
            Prêt à découvrir le <span style={{ color: '#F6C961', fontStyle: 'italic' }}>vrai</span> Sénégal ?
          </h2>
          <p className="text-sm md:text-base mb-10 leading-relaxed font-dm-sans" style={{ color: 'rgba(254,252,249,0.7)' }}>
            Rejoignez 2 000+ voyageurs qui ont téléchargé le guide.
          </p>
          <button
            onClick={scrollToForm}
            className="btn-gold"
          >
            Recevoir le guide gratuitement
          </button>
        </div>
      </SectionWrapper>

      {/* ═══ Footer ═══ */}
      <Footer />
    </div>
  )
}
