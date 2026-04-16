'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ExperienceCard } from '@/components/ExperienceCard'

// ─── Teasers des 15 expériences — version "verrouillée" pour créer du suspense ──
// Le contenu réel (nom du lieu, contact, tips) est dans le PDF uniquement.
const EXPERIENCES_PREVIEW = [
  // DAKAR & CAP-VERT
  { n: 1, category: 'Mémoire', teaser: 'Classée UNESCO. Et pourtant, presque personne ne la vit vraiment.', image: '/images/senegal/gallery-3.jpg' },
  { n: 2, category: 'Nature', teaser: 'Les plus belles photos du Sénégal se prennent ici. À 6h30 du matin.', image: '/images/senegal/exp-01-lac-rose.jpg' },
  // PETITE CÔTE
  { n: 3, category: 'Faune', teaser: 'Un safari à 1h de Dakar. Oui, au Sénégal.', image: '/images/senegal/exp-08-niokolo.jpg' },
  { n: 4, category: 'Adrénaline', teaser: 'Une des quatre expériences de ce type au monde. 180 kilos à côté de vous.', image: '/images/senegal/exp-05-bassari.jpg' },
  { n: 5, category: 'Évasion', teaser: 'La mangrove à portée de main, entre océan et cocotiers.', image: '/images/senegal/exp-06-saloum.jpg' },
  { n: 6, category: 'Gastronomie', teaser: 'Le poisson grillé, l\'ambiance, les pieds dans le sable. Rien d\'autre.', image: '/images/senegal/exp-02-mbour.jpg' },
  { n: 7, category: 'Rencontres', teaser: 'Un des plus grands débarquements de pêche artisanale d\'Afrique de l\'Ouest.', image: '/images/senegal/exp-03-carabane.jpg' },
  { n: 8, category: 'Sacré', teaser: 'Mille ans. Un seul arbre. Un silence qui impose.', image: '/images/senegal/gallery-4.jpg' },
  { n: 9, category: 'Culture', teaser: 'Une île de coquillages où deux confessions reposent ensemble. Unique en Afrique.', image: '/images/senegal/exp-04-goree.jpg' },
  // SINE SALOUM
  { n: 10, category: 'Nature', teaser: 'Un labyrinthe d\'eau, classé Réserve de Biosphère UNESCO.', image: '/images/senegal/gallery-5.jpg' },
  // NORD & DÉSERT
  { n: 11, category: 'Villes', teaser: 'L\'ancienne capitale de l\'AOF, au rythme d\'un autre siècle.', image: '/images/senegal/exp-07-saint-louis.jpg' },
  { n: 12, category: 'Aventure', teaser: 'Un mini-Sahara à 150 km de Dakar. Et une nuit sous les étoiles.', image: '/images/senegal/exp-10-lompoul.jpg' },
  // CASAMANCE & ÎLES
  { n: 13, category: 'Hors des sentiers', teaser: 'Premier comptoir français de l\'Afrique de l\'Ouest. Oublié du monde.', image: '/images/senegal/exp-03-carabane.jpg' },
  { n: 14, category: 'Hors des sentiers', teaser: 'L\'île vierge. Presque aucun touriste ne la connaît.', image: '/images/senegal/exp-06-saloum.jpg' },
  { n: 15, category: 'Mystère', teaser: 'Fromagers sacrés, bolongs secrets, silence total. Aucun guide ne la mentionne.', image: '/images/senegal/gallery-1.jpg' },
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

const GALLERY = [
  '/images/senegal/gallery-1.jpg',
  '/images/senegal/gallery-2.jpg',
  '/images/senegal/gallery-3.jpg',
  '/images/senegal/gallery-4.jpg',
  '/images/senegal/gallery-5.jpg',
  '/images/senegal/gallery-6.jpg',
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

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: '#e0d8d0' }}>
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left transition-colors hover:opacity-70"
      >
        <span className="font-semibold text-sm pr-6" style={{ color: '#560E13' }}>{q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-transform"
          style={{
            backgroundColor: open ? '#560E13' : '#F8F5F0',
            color: open ? '#F6C961' : '#560E13',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: '#0A0A0A', opacity: 0.75 }}>
          {a}
        </p>
      )}
    </div>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-sm" style={{ color: '#F6C961' }} aria-label="5 étoiles">
      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
    </div>
  )
}

export default function GuidePage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
    <div style={{ backgroundColor: '#FEFCF9', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO — 100vh immersif avec photo pleine page
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Photo de fond */}
        <Image
          src="/images/senegal/hero.jpg"
          alt="Sénégal au coucher du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay dégradé bordeaux pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(86,14,19,0.55) 0%, rgba(86,14,19,0.45) 35%, rgba(86,14,19,0.9) 100%)',
          }}
        />

        {/* Contenu centré */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-5 py-24">
          <div
            className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(246,201,97,0.18)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.5)' }}
          >
            📖 Guide offert · 33 pages
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              color: '#FEFCF9',
              textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}
          >
            Le Sénégal<br />
            <span style={{ color: '#F6C961', fontStyle: 'italic' }}>que seule une locale</span><br />
            peut vous offrir
          </h1>

          <p
            className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(254,252,249,0.92)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            15 expériences secrètes, mon carnet d&apos;adresses personnel, les astuces qu&apos;on ne trouve dans aucun Lonely Planet.
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
            Recevoir mon guide <span>→</span>
          </button>

          <div className="mt-6 text-xs uppercase tracking-widest" style={{ color: 'rgba(246,201,97,0.85)' }}>
            100% gratuit · livraison immédiate
          </div>
        </div>

        {/* Chevron animé bas */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center animate-bounce" style={{ color: '#F6C961' }}>
          <div className="text-[10px] uppercase tracking-[0.3em] mb-1 opacity-80">Découvrir</div>
          <div className="text-2xl">↓</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — OUVREZ LE GUIDE (éditorial)
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5" style={{ backgroundColor: '#FEFCF9' }}>
        <div className="max-w-6xl mx-auto">
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
                  className="absolute -bottom-6 -right-6 w-full h-full rounded-lg"
                  style={{ backgroundColor: 'rgba(86,14,19,0.15)', transform: 'rotate(3deg)' }}
                />
                <div
                  className="relative w-[300px] h-[420px] md:w-[340px] md:h-[470px] rounded-lg overflow-hidden"
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
                      <h3 className="text-3xl font-bold leading-[1.1] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                        15 expériences secrètes au Sénégal
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#F6C961' }}>
                        Le guide que seule une locale peut vous offrir
                      </p>
                    </div>
                    <div>
                      <div className="font-bold text-base" style={{ fontFamily: 'var(--font-playfair)' }}>Roseline Ngom</div>
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
              <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#b8860b' }}>
                Un guide, un carnet d&apos;adresses
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
                Ce n&apos;est pas un guide touristique. C&apos;est mon carnet.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#0A0A0A', opacity: 0.78 }}>
                Pendant dix ans, j&apos;ai emmené des voyageurs découvrir le Sénégal. À chaque fois, ce sont les mêmes
                lieux, les mêmes rencontres qui transforment leur séjour. J&apos;ai rassemblé ces 15 pépites ici —
                pour que vous viviez un voyage, pas des vacances.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: '2px solid rgba(246,201,97,0.3)' }}>
                {[
                  { num: '33', label: 'pages dédiées' },
                  { num: '15', label: 'expériences' },
                  { num: '10 ans', label: 'sur le terrain' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
                      {num}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] opacity-60 mt-2">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — LES 15 EXPÉRIENCES (grille photos)
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              À l&apos;intérieur du guide
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              15 expériences que<br />je ne partage qu&apos;à mes proches
            </h2>
            <p className="text-sm md:text-base opacity-60 max-w-2xl mx-auto">
              Chaque expérience est détaillée sur une page du PDF : le lieu exact, comment y aller, quand, combien, mon contact de confiance sur place et l&apos;astuce insider que seule une locale connaît.
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
                color: '#FEFCF9',
                boxShadow: '0 10px 30px rgba(86,14,19,0.3)',
              }}
            >
              Recevoir le guide complet <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — RENCONTREZ ROSELINE
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
            {/* Portrait */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute -top-3 -left-3 w-full h-full rounded-2xl"
                  style={{ backgroundColor: '#F6C961', zIndex: 0 }}
                />
                <div
                  className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 20px 40px rgba(86,14,19,0.2)' }}
                >
                  <Image
                    src="/images/roseline.jpg"
                    alt="Roseline Ngom"
                    fill
                    sizes="(max-width: 768px) 224px, 256px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Texte */}
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#b8860b' }}>
                L&apos;auteure
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
                Bonjour, je suis Roseline
              </h2>

              <blockquote
                className="text-xl md:text-2xl leading-snug mb-6 pl-5"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: '#560E13',
                  fontStyle: 'italic',
                  borderLeft: '3px solid #F6C961',
                }}
              >
                &ldquo;Ce guide, c&apos;est ce que j&apos;offre à mes amis quand ils viennent me voir.&rdquo;
              </blockquote>

              <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: '#0A0A0A', opacity: 0.78 }}>
                Fondatrice de TripAfro, je partage l&apos;Afrique de l&apos;Ouest autrement depuis plus de 10 ans.
                En une décennie, j&apos;ai accompagné plus de 2000 voyageurs — et à chaque fois, ce sont ces mêmes
                expériences qui transforment un séjour en voyage intime.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6" style={{ borderTop: '2px solid rgba(246,201,97,0.3)' }}>
                {[
                  { num: '2000+', label: 'voyageurs accompagnés' },
                  { num: '12+', label: 'destinations' },
                  { num: '10 ans', label: 'sur le terrain' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-bold leading-none" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
                      {num}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.15em] opacity-60 mt-2 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — GALERIE MOSAÏQUE (ambiance Sénégal)
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5" style={{ backgroundColor: '#560E13' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#F6C961' }}>
              @tripafro
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-playfair)', color: '#FEFCF9' }}>
              Le Sénégal vu de l&apos;intérieur
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {GALLERY.map((src, i) => (
              <div
                key={src}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
                style={{ aspectRatio: '1/1' }}
              >
                <Image
                  src={src}
                  alt={`Sénégal - photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ backgroundColor: 'rgba(86,14,19,0.3)' }} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 space-y-4">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'YouTube', href: 'https://www.youtube.com/@RoselineNgom' },
                { label: 'Instagram', href: 'https://www.instagram.com/roselinengom' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@roselinengom' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/roselinengom' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                  style={{ backgroundColor: 'rgba(246,201,97,0.15)', color: '#F6C961', border: '1px solid rgba(246,201,97,0.3)' }}
                >
                  {label}
                </a>
              ))}
            </div>
            <a
              href="https://www.instagram.com/tripafro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#F6C961' }}
            >
              @tripafro · 24 000+ abonnés <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — FORM (capture centrale)
         ═══════════════════════════════════════════════════════════ */}
      <section id="guide-form" className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ border: '1px solid #e0d8d0' }}>
            <div className="grid md:grid-cols-[1fr_1.2fr]">
              {/* Gauche : visuel */}
              <div className="relative p-10 md:p-12 flex flex-col justify-center text-white" style={{ backgroundColor: '#560E13' }}>
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="hexForm" x="0" y="0" width="50" height="44" patternUnits="userSpaceOnUse">
                        <polygon points="25,2 47,14 47,30 25,42 3,30 3,14" fill="none" stroke="#F6C961" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexForm)" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#F6C961' }}>
                    Dernière étape
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Votre guide vous attend
                  </h2>
                  <p className="text-sm leading-relaxed mb-6 opacity-85">
                    Entrez votre email ci-contre et recevez le PDF dans votre boîte mail dans les 2 minutes.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {['33 pages illustrées', 'Téléchargement immédiat', '100% gratuit, 0% spam'].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span style={{ color: '#F6C961' }}>✓</span>
                        <span className="opacity-90">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Droite : form */}
              <div className="p-8 md:p-12">
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
                      Votre email *
                    </span>
                    <input
                      type="email"
                      placeholder="vous@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none focus:border-[#560E13] transition-colors"
                      style={{ borderColor: '#e0d8d0', backgroundColor: '#FEFCF9' }}
                    />
                  </label>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
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
                    {loading ? 'Envoi en cours...' : 'Envoyer mon guide →'}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-[10px] uppercase tracking-wider" style={{ color: '#0A0A0A', opacity: 0.5 }}>
                    <span>🔒 RGPD</span>
                    <span>·</span>
                    <span>0 spam</span>
                    <span>·</span>
                    <span>Désinscription 1 clic</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — TÉMOIGNAGES (avec portraits)
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="text-4xl md:text-5xl font-bold" style={{ color: '#560E13', fontFamily: 'var(--font-playfair)' }}>2000+</div>
              <div className="text-left text-xs opacity-60 leading-tight uppercase tracking-wider">
                voyageurs<br />nous font confiance
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Ce qu&apos;ils en disent
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white p-7 rounded-2xl flex flex-col"
                style={{ border: '1px solid #e0d8d0', boxShadow: '0 4px 20px rgba(86,14,19,0.05)' }}
              >
                <Stars />
                <div className="text-3xl mt-3 mb-2 leading-none" style={{ color: '#F6C961' }}>&ldquo;</div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#0A0A0A', opacity: 0.8 }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #e0d8d0' }}>
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={t.image} alt={t.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#560E13' }}>{t.name}</div>
                    <div className="text-xs opacity-50">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION — FAQ
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#b8860b' }}>
              Questions fréquentes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
              Tout ce que vous vous demandez
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL — avec photo de fond
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-5 overflow-hidden">
        <Image
          src="/images/senegal/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(86,14,19,0.92)' }} />

        <div className="relative z-10 max-w-2xl mx-auto text-center" style={{ color: '#FEFCF9' }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Prêt à découvrir <span style={{ color: '#F6C961', fontStyle: 'italic' }}>mon Sénégal</span> ?
          </h2>
          <p className="text-sm md:text-base opacity-85 mb-10 leading-relaxed">
            Il arrive dans votre boîte mail en moins de 2 minutes. Gratuit, sans spam, 1 clic pour se désinscrire.
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
            Recevoir mon guide maintenant <span>→</span>
          </button>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 px-4 text-center text-xs opacity-40" style={{ backgroundColor: '#FEFCF9', color: '#0A0A0A' }}>
        © {new Date().getFullYear()} Roseline Ngom — TripAfro ·{' '}
        <a href="/" className="underline hover:opacity-70">Retour à l&apos;accueil</a>
      </footer>
    </div>
  )
}
