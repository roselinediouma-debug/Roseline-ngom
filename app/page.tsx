'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

/* Hook fade-in au scroll */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(s.vis)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const GALLERY_IMAGES = [
  '/images/senegal/gallery-1.jpg',
  '/images/senegal/gallery-2.jpg',
  '/images/senegal/gallery-3.jpg',
  '/images/senegal/gallery-4.jpg',
  '/images/senegal/gallery-5.jpg',
  '/images/senegal/gallery-6.jpg',
  '/images/senegal/exp-01-lac-rose.jpg',
  '/images/senegal/goree.jpg',
  '/images/senegal/saint-louis.jpg',
  '/images/senegal/Lompoul.jpeg',
]

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const videoRef = useReveal<HTMLDivElement>()
  const aboutRef = useReveal<HTMLDivElement>()
  const voyLabelRef = useReveal<HTMLDivElement>()
  const voyTitleRef = useReveal<HTMLDivElement>()
  const vcard1Ref = useReveal<HTMLDivElement>()
  const vcard2Ref = useReveal<HTMLDivElement>()
  const vcard3Ref = useReveal<HTMLDivElement>()
  const temoLabelRef = useReveal<HTMLDivElement>()
  const temoTitleRef = useReveal<HTMLDivElement>()
  const temoGridRef = useReveal<HTMLDivElement>()
  const expRef = useReveal<HTMLDivElement>()
  const guideTxtRef = useReveal<HTMLDivElement>()
  const guidePhotosRef = useReveal<HTMLDivElement>()

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage-guide' }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/guide/merci')
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  // Galerie : dédoublée pour le scroll infini
  const galleryLoop = [...GALLERY_IMAGES, ...GALLERY_IMAGES]

  return (
    <div className={s.home}>
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className={s.hero}>
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <h1>
              Le Sénégal<br />comme personne<br />ne vous l&apos;a<br /><em>jamais montré.</em>
            </h1>
            <p className={s.heroSub}>
              Voyages immersifs au cœur du Sénégal. Consulting stratégique pour vos projets.
              Transformation digitale du tourisme africain.
            </p>
            <div className={s.heroBtns}>
              <Link href="/guide" className={s.btnGold}>Recevoir le guide gratuit</Link>
              <a
                href="https://calendly.com/roselinengom/decouverte-15min"
                target="_blank"
                rel="noopener noreferrer"
                className={s.btnOutline}
              >
                Session découverte 15 min →
              </a>
            </div>
            <div className={s.heroStats}>
              <div className={s.stat}>
                <div className="n" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 700, color: '#F6C961' }}>2 000+</div>
                <div className="l" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>voyageurs accompagnés</div>
              </div>
              <div className={s.stat}>
                <div className="n" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 700, color: '#F6C961' }}>10 ans</div>
                <div className="l" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>de terrain au Sénégal</div>
              </div>
              <div className={s.stat}>
                <div className="n" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 700, color: '#F6C961' }}>35K</div>
                <div className="l" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>communauté TripAfro</div>
              </div>
            </div>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroPortrait}>
              <Image
                src="/images/roseline-portrait-3.jpg"
                alt="Roseline Ngom"
                width={340}
                height={510}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
              <span className="tag">Tourisme · Culture · Développement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <div className={s.trust}>
        <span>Fondatrice TripAfro · 10 ans d&apos;expertise Sénégal · Master Finance INSEEC · Consultante tourisme &amp; digital</span>
      </div>

      {/* ═══ VIDEO ═══ */}
      <section className={s.videoSec}>
        <div className={`${s.videoIn} ${s.fi}`} ref={videoRef}>
          <div className={s.label}>Expérience TripAfro</div>
          <h2>Regardez ce que vivent nos voyageurs</h2>
          <div className={s.videoSub}>
            Pas une promesse. Une preuve. Découvrez les coulisses d&apos;une expérience TripAfro au Sénégal.
          </div>
          <div className={s.videoWrap}>
            <iframe
              src="https://www.youtube.com/embed/cAXg3qd8HkI"
              title="Expérience TripAfro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className={s.about}>
        <div className={`${s.aboutIn} ${s.fi}`} ref={aboutRef}>
          <div className={s.aboutImg}>
            <Image
              src="/images/roseline-portrait-1.jpg"
              alt="Roseline Ngom"
              width={500}
              height={620}
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="badge" style={{ position: 'absolute', bottom: -14, right: -14, background: '#F6C961', color: '#3A0A0D', padding: '12px 20px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(246,201,97,0.25)' }}>
              Experte Sénégal
            </div>
          </div>
          <div className={s.aboutTxt}>
            <div className={s.label}>Qui est Roseline Ngom</div>
            <h2>Casamançaise de cœur.<br /><em>Experte de conviction.</em></h2>
            <p>
              Depuis 10 ans, je construis un pont entre les voyageurs du monde entier et le vrai Sénégal.
              Pas celui des brochures. Celui des rencontres, des saveurs, des silences.
            </p>
            <p>
              Fondatrice de TripAfro, j&apos;ai accompagné plus de 2 000 voyageurs, et aujourd&apos;hui je concentre
              mon énergie sur trois missions : faire vivre le Sénégal autrement, accompagner les porteurs
              de projets, et transformer le digital du tourisme africain.
            </p>
            <div className={s.aboutSig}>« Le Sénégal a tout. Il est temps de le révéler. »</div>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY SCROLL ═══ */}
      <section className={s.gallery}>
        <div className={s.galleryTrack}>
          {galleryLoop.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" loading="lazy" />
          ))}
        </div>
      </section>

      {/* ═══ VOYAGES ═══ */}
      <section className={s.voyages}>
        <div className={s.voyagesIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={voyLabelRef}>Voyages TripAfro</div>
          <div className={`${s.secTitle} ${s.fi}`} ref={voyTitleRef}>Trois façons de vivre le Sénégal</div>

          <div className={`${s.vcard} ${s.fi}`} ref={vcard1Ref}>
            <div className={s.vcardImg}>
              <Image src="/images/senegal/gallery-1.jpg" alt="Retour aux Sources" fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              <span className={s.vcardPrice}>Dès 2 200 €</span>
            </div>
            <div className={s.vcardCt}>
              <div className="tags" style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>14 jours</span>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>Groupe 8-15</span>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>Juillet-Août · Décembre</span>
              </div>
              <h3>Retour aux Sources</h3>
              <p>14 jours d&apos;immersion totale. Dakar, Saly, Sine Saloum, Saint-Louis. Un voyage pensé pour ceux qui veulent vivre le Sénégal de l&apos;intérieur, pas le survoler.</p>
              <Link href="/voyages/retour-aux-sources">Découvrir le programme →</Link>
            </div>
          </div>

          <div className={`${s.vcard} ${s.rev} ${s.fi}`} ref={vcard2Ref}>
            <div className={s.vcardImg}>
              <Image src="/images/senegal/gallery-4.jpg" alt="Voyage Signature" fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              <span className={s.vcardPrice}>Sur devis</span>
            </div>
            <div className={s.vcardCt}>
              <div className="tags" style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>Sur mesure</span>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>5-14 jours</span>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>Toute l&apos;année</span>
              </div>
              <h3>Voyage Signature</h3>
              <p>Votre Sénégal, votre rythme, votre histoire. Un itinéraire conçu sur mesure, du premier échange jusqu&apos;au retour. Couples, familles, groupes d&apos;amis, voyageurs solo.</p>
              <Link href="/voyages/voyage-signature">Demander un devis →</Link>
            </div>
          </div>

          <div className={`${s.vcard} ${s.fi}`} ref={vcard3Ref}>
            <div className={s.vcardImg}>
              <Image src="/images/senegal/gallery-2.jpg" alt="Back to Senegal" fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              <span className={s.vcardSoon}>Coming soon — Fév. 2027</span>
              <span className={s.vcardPrice}>Dès 3 800 €</span>
            </div>
            <div className={s.vcardCt}>
              <div className="tags" style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>7 jours</span>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>Institutionnel</span>
                <span style={{ fontSize: 9, color: '#8A7E74', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', background: 'white', borderRadius: 20 }}>Sélection sur dossier</span>
              </div>
              <h3>Back to Senegal</h3>
              <p>7 jours pour passer de l&apos;idée au projet concret. Rencontres institutionnelles, banques, entrepreneurs locaux. Le programme qui accélère vos projets au Sénégal.</p>
              <Link href="/voyages/back-to-senegal">S&apos;inscrire à la liste d&apos;attente →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGES ═══ */}
      <section className={s.temoSec}>
        <div className={s.temoIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={temoLabelRef}>Ils ont voyagé avec TripAfro</div>
          <div className={`${s.secTitle} ${s.fi}`} ref={temoTitleRef}>Ce qu&apos;ils en disent</div>
          <div className={`${s.temoGrid} ${s.fi}`} ref={temoGridRef}>
            <div className={s.temo}>
              <div className="stars" style={{ color: '#F6C961', fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
              <q>Ce voyage m&apos;a reconnectée avec mes racines d&apos;une manière que je n&apos;aurais jamais imaginée. Roseline a pensé à chaque détail.</q>
              <div className="who" style={{ fontSize: 13, fontWeight: 600, color: '#560E13' }}>Aminata D.</div>
              <div className="where" style={{ fontSize: 11, color: '#8A7E74', marginTop: 2 }}>Paris, France</div>
            </div>
            <div className={s.temo}>
              <div className="stars" style={{ color: '#F6C961', fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
              <q>Nous sommes venus en couple pour notre anniversaire. L&apos;expérience du Sine Saloum restera gravée à jamais. Merci TripAfro.</q>
              <div className="who" style={{ fontSize: 13, fontWeight: 600, color: '#560E13' }}>Marc &amp; Sophie</div>
              <div className="where" style={{ fontSize: 11, color: '#8A7E74', marginTop: 2 }}>Bruxelles, Belgique</div>
            </div>
            <div className={s.temo}>
              <div className="stars" style={{ color: '#F6C961', fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
              <q>J&apos;ai découvert un Sénégal que 20 ans de voyages en solo ne m&apos;avaient jamais montré. Le guide de Roseline est précieux.</q>
              <div className="who" style={{ fontSize: 13, fontWeight: 600, color: '#560E13' }}>Mamadou N.</div>
              <div className="where" style={{ fontSize: 11, color: '#8A7E74', marginTop: 2 }}>Lyon, France</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERTISE ═══ */}
      <section className={s.expertise}>
        <div className={s.expertiseIn}>
          <div className={s.expertiseImg}>
            <Image
              src="/images/roseline-portrait-2.jpg"
              alt="Roseline Ngom"
              width={420}
              height={630}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={`${s.expCards} ${s.fi}`} ref={expRef}>
            <div className={s.expHead}>
              <div className={s.label} style={{ textAlign: 'left' }}>Au-delà des voyages</div>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 32, fontWeight: 600, color: 'white', marginBottom: 20, lineHeight: 1.12 }}>
                Mon expertise au service<br />du tourisme <em style={{ color: '#F6C961', fontStyle: 'italic', fontWeight: 400 }}>africain</em>
              </h2>
            </div>
            <div className={s.expCard}>
              <h3>Consulting stratégique</h3>
              <p>Audit, accompagnement et conseil pour les acteurs du tourisme et de la culture en Afrique de l&apos;Ouest. De la vision à l&apos;exécution.</p>
              <Link href="/consulting">En savoir plus →</Link>
            </div>
            <div className={s.expCard}>
              <h3>Digital &amp; Intelligence Artificielle</h3>
              <p>Présence digitale, transformation, IA appliquée et formations pour hôtels, lodges, agences et acteurs culturels.</p>
              <Link href="/digital-ia">Découvrir les offres →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GUIDE LEAD MAGNET ═══ */}
      <section className={s.guide}>
        <div className={s.guideIn}>
          <div className={`${s.guideTxt} ${s.fi}`} ref={guideTxtRef}>
            <div className={s.label}>Guide offert · 2026</div>
            <h2>15 expériences secrètes<br /><em>au Sénégal</em></h2>
            <p>
              Le guide que seule une locale peut vous offrir. 33 pages de lieux cachés, de conseils pratiques
              et de secrets que les circuits touristiques ne montrent jamais.
            </p>
            <form className={s.guideForm} onSubmit={handleGuideSubmit}>
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? '...' : 'Télécharger'}
              </button>
            </form>
            <div className={s.guideMicro}>Gratuit, sans spam. 500+ voyageurs nous font déjà confiance.</div>
          </div>
          <div className={`${s.guidePhotos} ${s.fi}`} ref={guidePhotosRef}>
            <div>
              <Image src="/images/senegal/exp-01-lac-rose.jpg" alt="" fill sizes="(max-width:900px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <Image src="/images/senegal/gallery-5.jpg" alt="" fill sizes="(max-width:900px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className={s.ctaFinal}>
        <h2>Prêt à découvrir le <em>vrai Sénégal</em> ?</h2>
        <p>Que vous souhaitiez voyager, entreprendre ou transformer votre activité, je suis là pour vous accompagner.</p>
        <div className={s.ctaBtns}>
          <a
            href="https://calendly.com/roselinengom/decouverte-15min"
            target="_blank"
            rel="noopener noreferrer"
            className={s.btnGold}
          >
            Réserver un appel gratuit
          </a>
          <a
            href="https://wa.me/33650329808"
            target="_blank"
            rel="noopener noreferrer"
            className={s.btnOutline}
          >
            Discuter sur WhatsApp →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
