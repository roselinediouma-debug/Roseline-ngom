'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

export default function VoyageSignaturePage() {
  const [floatShow, setFloatShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      prenom: String(fd.get('prenom') || '').trim(),
      nom: String(fd.get('nom') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      whatsapp: String(fd.get('whatsapp') || '').trim(),
      typeVoyage: 'voyage_signature',
      nbAdultes: String(fd.get('nbAdultes') || '2'),
      nbEnfants: String(fd.get('nbEnfants') || '0'),
      nbBebes: String(fd.get('nbBebes') || '0'),
      duree: String(fd.get('duree') || ''),
      periode: String(fd.get('periode') || ''),
      budget: String(fd.get('budget') || ''),
      confort: String(fd.get('confort') || ''),
      message: [
        fd.get('formatVoyage') ? `Format : ${fd.get('formatVoyage')}` : null,
        fd.get('message'),
      ]
        .filter(Boolean)
        .join('\n\n'),
    }
    if (!payload.prenom || !payload.nom || !payload.email) {
      setSubmitError('Merci de renseigner prénom, nom et email.')
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
      form.reset()
    } catch (err) {
      console.error(err)
      setSubmitError("Une erreur est survenue. Merci de réessayer ou de m'écrire sur WhatsApp.")
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const onScroll = () => setFloatShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(s.vis)
        })
      },
      { threshold: 0.08 }
    )
    rootRef.current.querySelectorAll('.' + s.fi).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <Image
            src="/images/senegal/hero.jpg"
            alt="Voyage Signature — Sénégal sur mesure"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={s.heroOv} />
        <div className={s.heroWave}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,55 720,5 1080,35 C1260,48 1380,22 1440,30 L1440,60 L0,60Z" opacity="0.5" />
            <path d="M0,38 C480,55 960,15 1440,42 L1440,60 L0,60Z" />
          </svg>
        </div>
        <div className={s.heroCt}>
          <div>
            <div className={s.pill}>
              <span>Sur mesure</span>
              <div className={s.sep} />
              <span>5 à 14 jours</span>
              <div className={s.sep} />
              <span>Toute l&apos;année</span>
            </div>
            <h1 className={s.heroH1}>
              Voyage<br /><em>Signature</em>
            </h1>
            <div className={s.tagline}>L&apos;aventure qui vous ressemble.</div>
            <p className={s.sub}>
              Pas de circuit préfabriqué. Pas de car de touristes.{' '}
              <strong>Votre Sénégal, conçu autour de vos envies, votre rythme, votre histoire.</strong> Un itinéraire unique, créé avec vous, du premier appel jusqu&apos;au retour.
            </p>
            <div className={s.btns}>
              <a href="#devis" className={s.bg}>Demander mon devis gratuit →</a>
              <a href="#comment" className={s.bo}>Comment ça marche</a>
            </div>
            <div className={s.proof}>
              <div className={s.pi}><div className={s.pn}>100%</div><div className={s.pl}>sur mesure</div></div>
              <div className={s.pi}><div className={s.pn}>48h</div><div className={s.pl}>pour votre devis</div></div>
              <div className={s.pi}><div className={s.pn}>2 000+</div><div className={s.pl}>voyageurs heureux</div></div>
            </div>
          </div>
          <div className={s.heroCard}>
            <h3>Votre voyage en bref</h3>
            <div className={s.hcRow}>
              <div className={s.hcIco}>✨</div>
              <div><div className={s.hcLabel}>Format</div><div className={s.hcVal}><em>100% sur mesure</em></div></div>
            </div>
            <div className={s.hcRow}>
              <div className={s.hcIco}>📅</div>
              <div><div className={s.hcLabel}>Durée</div><div className={s.hcVal}>5 à 14 jours</div></div>
            </div>
            <div className={s.hcRow}>
              <div className={s.hcIco}>☀️</div>
              <div><div className={s.hcLabel}>Période</div><div className={s.hcVal}><em>Toute l&apos;année</em></div></div>
            </div>
            <div className={s.hcRow}>
              <div className={s.hcIco}>💰</div>
              <div><div className={s.hcLabel}>Tarif</div><div className={s.hcVal}>Sur devis personnalisé</div></div>
            </div>
            <div className={s.hcRow}>
              <div className={s.hcIco}>🧑‍💼</div>
              <div><div className={s.hcLabel}>Création</div><div className={s.hcVal}><em>Roseline</em> · en personne</div></div>
            </div>
            <a href="#devis" className={s.hcCta}>Devis gratuit en 48h →</a>
          </div>
        </div>
      </section>

      {/* PROMESSE */}
      <section className={s.promesse}>
        <div className={`${s.promesseIn} ${s.fi}`}>
          <div className={s.label}>La promesse</div>
          <div className={s.stitle}>
            Un voyage qui n&apos;existe nulle part.<br />Parce qu&apos;il est conçu pour vous.
          </div>
          <div className={s.tx}>
            <p>
              Les circuits organisés montrent tous la même chose. Les mêmes hôtels, les mêmes arrêts, les mêmes photos.{' '}
              <strong>Voyage Signature, c&apos;est l&apos;inverse.</strong>
            </p>
            <p>
              On commence par un appel. Vous me racontez ce que vous cherchez. L&apos;évasion ? L&apos;aventure ? Le repos ? La découverte culturelle ? Le romantisme ? L&apos;exploration en famille ? Et je construis un itinéraire qui ne ressemble à aucun autre. Parce qu&apos;il est le vôtre.
            </p>
            <p>
              Chaque hébergement est choisi pour vous. Chaque expérience est calée sur votre rythme. Chaque rencontre est préparée. <strong>Vous n&apos;avez qu&apos;à vivre.</strong>
            </p>
          </div>
          <div className={s.promesseQuote}>« Ce voyage n&apos;était pas un séjour. C&apos;était un film dont nous étions les héros. Roseline avait écrit le scénario parfait. »</div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.process} id="comment">
        <div className={s.processIn}>
          <div className={`${s.label} ${s.fi}`}>Comment ça marche</div>
          <div className={`${s.stitle} ${s.fi}`}>
            Du premier appel au dernier coucher de soleil.<br />En 4 étapes simples.
          </div>
          <div className={s.steps}>
            <div className={`${s.step} ${s.fi}`}>
              <div className={s.sNum}>01</div>
              <div className={s.sIco}>📞</div>
              <h3>On en parle</h3>
              <p>Appel de 30 min gratuit. Vos envies, votre budget, vos dates, vos rêves. Je prends tout en note.</p>
              <div className={s.sDur}>Gratuit · 30 min</div>
            </div>
            <div className={`${s.step} ${s.fi} ${s.fiD1}`}>
              <div className={s.sNum}>02</div>
              <div className={s.sIco}>📋</div>
              <h3>Je crée votre voyage</h3>
              <p>En 48h, vous recevez un itinéraire détaillé avec hébergements, expériences, tarifs. Entièrement personnalisé.</p>
              <div className={s.sDur}>48h · Devis PDF</div>
            </div>
            <div className={`${s.step} ${s.fi} ${s.fiD2}`}>
              <div className={s.sNum}>03</div>
              <div className={s.sIco}>✅</div>
              <h3>On ajuste ensemble</h3>
              <p>Trop long ? Trop court ? Envie d&apos;ajouter le désert ? On ajuste jusqu&apos;à ce que ce soit parfait. Puis acompte 30%.</p>
              <div className={s.sDur}>Illimité</div>
            </div>
            <div className={`${s.step} ${s.fi} ${s.fiD3}`}>
              <div className={s.sNum}>04</div>
              <div className={s.sIco}>✈️</div>
              <h3>Vous vivez le voyage</h3>
              <p>Accueil aéroport. Guide dédié. Support WhatsApp 24/7. Surprises préparées. Vous n&apos;avez qu&apos;à vivre.</p>
              <div className={s.sDur}>5 à 14 jours</div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section className={s.types}>
        <div className={s.typesIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Pour chaque envie</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>Quel voyageur êtes-vous ?</div>
          <div className={s.typeGrid}>
            <div className={`${s.type} ${s.fi}`}>
              <div className={s.tIco}>👪</div>
              <h3>En famille</h3>
              <p>Avec vos enfants, vos parents. Des activités adaptées à tous les âges. Des moments de partage inoubliables.</p>
              <div className={s.tFrom}>Dès 2 500€ / pers.</div>
            </div>
            <div className={`${s.type} ${s.fi} ${s.fiD1}`}>
              <div className={s.tIco}>💑</div>
              <h3>En couple</h3>
              <p>Couchers de soleil, dîners pieds dans le sable, lodges intimistes. Le Sénégal romantique.</p>
              <div className={s.tFrom}>Dès 3 000€ / pers.</div>
            </div>
            <div className={`${s.type} ${s.fi} ${s.fiD2}`}>
              <div className={s.tIco}>🧑‍🤝‍🧑</div>
              <h3>Entre amis</h3>
              <p>Aventure, rires, découvertes. Un voyage qu&apos;on racontera pendant des années.</p>
              <div className={s.tFrom}>Dès 2 200€ / pers.</div>
            </div>
            <div className={`${s.type} ${s.fi} ${s.fiD3}`}>
              <div className={s.tIco}>🧘</div>
              <h3>En solo</h3>
              <p>Se retrouver, se déconnecter, explorer à son rythme. Le Sénégal rien que pour vous.</p>
              <div className={s.tFrom}>Dès 2 800€ / pers.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROSELINE */}
      <section className={s.roseline}>
        <div className={`${s.roselineIn} ${s.fi}`}>
          <div className={s.roselineImg}>
            <Image src="/images/roseline.jpg" alt="Roseline Ngom" width={400} height={500} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className={s.roselineTxt}>
            <div className={s.label}>Votre créatrice de voyage</div>
            <div className={s.stitle} style={{ fontSize: 'clamp(22px, 3vw, 28px)' }}>
              Chaque Voyage Signature est créé<br />par Roseline. Personnellement.
            </div>
            <p>Pas un algorithme. Pas un formulaire. Une personne qui connaît chaque recoin du Sénégal, chaque hébergement, chaque piroguier, chaque restaurant caché.</p>
            <p>Je ne délègue pas la création de votre voyage. Je le construis moi-même, parce que je veux que chaque détail soit à la hauteur de ce que le Sénégal peut offrir.</p>
            <div className={s.sig}>« Le Sénégal a tout. Il est temps de le révéler. »</div>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className={s.temos}>
        <div className={s.temosIn}>
          <div className={`${s.label} ${s.fi}`}>Ils ont vécu un Voyage Signature</div>
          <div className={`${s.stitle} ${s.fi}`}>Ce qu&apos;ils en disent</div>
          <div className={s.temoGrid}>
            <div className={`${s.temo} ${s.fi}`}>
              <div className={s.stars}>★★★★★</div>
              <q>Roseline a compris exactement ce qu&apos;on cherchait. Un mélange d&apos;aventure et de repos. Chaque jour était une surprise parfaitement calibrée.</q>
              <div className={s.wh}>Karim &amp; Aude</div>
              <div className={s.temoFr}>Couple · 10 jours · Février 2025</div>
            </div>
            <div className={`${s.temo} ${s.fi} ${s.fiD1}`}>
              <div className={s.stars}>★★★★★</div>
              <q>On a voyagé à 8, avec des enfants de 3 à 14 ans. Tout était pensé. Les transferts, les activités, les temps de repos. Zéro stress.</q>
              <div className={s.wh}>Famille Diallo</div>
              <div className={s.temoFr}>Famille · 12 jours · Décembre 2024</div>
            </div>
            <div className={`${s.temo} ${s.fi} ${s.fiD2}`}>
              <div className={s.stars}>★★★★★</div>
              <q>Je suis partie seule pour me retrouver. Roseline m&apos;a créé un parcours entre méditation, nature et rencontres locales. Le voyage de ma vie.</q>
              <div className={s.wh}>Claire M.</div>
              <div className={s.temoFr}>Solo · 7 jours · Mars 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className={s.form} id="devis">
        <div className={s.fmIn}>
          <div className={`${s.fmL} ${s.fi}`}>
            <div className={s.label}>Votre devis gratuit</div>
            <h2>Créons ensemble<br />le voyage qui<br /><em>vous ressemble</em></h2>
            <p>
              Remplissez ce formulaire et je vous envoie un{' '}
              <strong>itinéraire détaillé et personnalisé sous 48h</strong>. Gratuit, sans engagement.
            </p>
            <p>Chaque détail compte : vos envies, votre rythme, vos contraintes, vos rêves. Plus vous me racontez, plus le voyage sera parfait.</p>
            <div className={s.urgenceBox}>
              ✨ <strong>Les créneaux haute saison</strong> (novembre à avril) se remplissent vite. Réservez tôt pour avoir le choix des meilleurs hébergements.
            </div>
            <div className={s.includes}>
              <h4>Inclus dans chaque Voyage Signature</h4>
              <ul>
                <li>Itinéraire 100% personnalisé</li>
                <li>Hébergements sélectionnés par Roseline</li>
                <li>Transports internes (véhicule privé climatisé)</li>
                <li>Guide francophone dédié</li>
                <li>Expériences exclusives préparées</li>
                <li>Support WhatsApp 24/7 pendant le séjour</li>
                <li>Accueil et transfert aéroport</li>
              </ul>
            </div>
            <div className={s.ca}>
              <a href="https://wa.me/33650329808">📱 WhatsApp : +33 6 50 32 98 08</a>
              <a href="mailto:roselinediouma@gmail.com">✉️ roselinediouma@gmail.com</a>
              <a href="https://calendly.com/roselinengom">📅 Appel de 30 min (gratuit)</a>
            </div>
          </div>
          <form className={`${s.fc} ${s.fi}`} onSubmit={handleSubmit}>
            <h3>Demande de devis</h3>
            <div className={s.fcSub}>Devis gratuit sous 48h. Sans engagement.</div>
            {submitted ? (
              <div style={{ padding: 20, background: '#f5f0e8', border: '1px solid #c9b897', borderRadius: 4, color: '#560E13', marginTop: 12 }}>
                <strong>Merci {'!'}</strong> Votre demande est bien reçue. Je vous envoie votre devis sous 48h.
              </div>
            ) : (
              <>
                <div className={s.frow}>
                  <div><label>Prénom *</label><input type="text" name="prenom" required placeholder="Votre prénom" /></div>
                  <div><label>Nom *</label><input type="text" name="nom" required placeholder="Votre nom" /></div>
                </div>
                <div className={s.frow}>
                  <div><label>Email *</label><input type="email" name="email" required placeholder="votre@email.com" /></div>
                  <div><label>WhatsApp *</label><input type="tel" name="whatsapp" placeholder="+33 6 XX XX XX XX" /></div>
                </div>
                <label>Type de voyage *</label>
                <select name="formatVoyage" defaultValue="">
                  <option value="">Choisir...</option>
                  <option>En famille (avec enfants)</option>
                  <option>En couple</option>
                  <option>Entre amis</option>
                  <option>En solo</option>
                  <option>Groupe organisé (association, entreprise)</option>
                </select>
                <div className={s.frow3}>
                  <div>
                    <label>Nombre d&apos;adultes *</label>
                    <select name="nbAdultes" defaultValue="2">
                      <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                    </select>
                  </div>
                  <div>
                    <label>Enfants (-12 ans)</label>
                    <select name="nbEnfants" defaultValue="0">
                      <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option>
                    </select>
                  </div>
                  <div>
                    <label>Bébés (-2 ans)</label>
                    <select name="nbBebes" defaultValue="0">
                      <option>0</option><option>1</option><option>2</option>
                    </select>
                  </div>
                </div>
                <div className={s.frow}>
                  <div>
                    <label>Durée souhaitée *</label>
                    <select name="duree" defaultValue="">
                      <option value="">Choisir...</option>
                      <option>5 jours</option>
                      <option>7 jours</option>
                      <option>10 jours</option>
                      <option>14 jours</option>
                      <option>Autre (préciser dans le message)</option>
                    </select>
                  </div>
                  <div>
                    <label>Période envisagée *</label>
                    <select name="periode" defaultValue="">
                      <option value="">Choisir...</option>
                      <option>Janvier-Février 2027</option>
                      <option>Mars-Avril 2027</option>
                      <option>Mai-Juin 2027</option>
                      <option>Juillet-Août 2027</option>
                      <option>Septembre-Octobre 2027</option>
                      <option>Novembre-Décembre 2027</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>
                <label>Budget par personne</label>
                <select name="budget" defaultValue="">
                  <option value="">Choisir...</option>
                  <option>Moins de 2 000€</option>
                  <option>2 000 – 3 000€</option>
                  <option>3 000 – 5 000€</option>
                  <option>5 000 – 8 000€</option>
                  <option>Plus de 8 000€</option>
                  <option>Je ne sais pas encore</option>
                </select>
                <label>Niveau de confort souhaité</label>
                <select name="confort" defaultValue="">
                  <option value="">Choisir...</option>
                  <option>Authentique (campements, écolodges)</option>
                  <option>Confort (écolodges + hôtels 3-4★)</option>
                  <option>Premium (hôtels 4-5★, lodges haut de gamme)</option>
                  <option>Mixte (un peu de tout)</option>
                </select>
                <label>Ce qui vous fait rêver *</label>
                <textarea name="message" placeholder="Racontez-moi ce que vous cherchez. L'évasion ? L'aventure ? Le repos ? Les rencontres ? La culture ? La gastronomie ? Quels endroits vous attirent ? Y a-t-il des choses que vous ne voulez surtout pas ? Plus vous me dites, plus votre voyage sera parfait..." />
                {submitError && (
                  <div style={{ color: '#B00020', fontSize: 13, marginTop: 8 }}>{submitError}</div>
                )}
                <button className={s.fs} type="submit" disabled={submitting}>
                  {submitting ? 'Envoi...' : 'Recevoir mon devis personnalisé →'}
                </button>
                <div className={s.fmi}>Gratuit · Sans engagement · Réponse personnalisée sous 48h</div>
              </>
            )}
          </form>
        </div>
      </section>

      <Footer />

      <a href="#devis" className={`${s.fl} ${floatShow ? s.sh : ''}`}>
        Devis gratuit en 48h →
      </a>
    </div>
  )
}
