'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

type Format = '7j' | '14j'

export default function RetourAuxSourcesPage() {
  const [floatShow, setFloatShow] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [format, setFormat] = useState<Format>('14j')
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
      typeVoyage: 'retour_aux_sources',
      formatVoyage: String(fd.get('formatVoyage') || format),
      departSouhaite: String(fd.get('departSouhaite') || ''),
      nbAdultes: String(fd.get('nbAdultes') || '1'),
      nbEnfants: String(fd.get('nbEnfants') || '0'),
      villeResidence: String(fd.get('villeResidence') || ''),
      message: String(fd.get('message') || ''),
      demandeProgrammeDetaille: true,
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
    const onScroll = () => setFloatShow(window.scrollY > 800)
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    rootRef.current.querySelectorAll('.' + s.fi).forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const faq = [
    { q: 'Le vol est-il inclus ?', a: "Non. Le vol international n'est pas inclus pour vous laisser la liberté de choisir votre compagnie. Je vous conseille sur les meilleures options." },
    { q: 'Pourquoi le tarif de décembre est plus élevé ?', a: "La haute saison des fêtes (20 déc. - 2 janv.) applique un supplément de +45% sur le tarif Early Bird. Les prestataires, hôtels et transports facturent tous un supplément à cette période. Le tarif reflète simplement le coût réel, sans marge additionnelle." },
    { q: 'Quelle différence entre 7 jours et 14 jours ?', a: "Le 7 jours couvre le Nord : Dakar, Gorée, Lac Rose, Lompoul, Saint-Louis, Djoudj. Le 14 jours reprend ce premier parcours et ajoute le Sud : Kaolack, Sine Saloum, Saly, Somone, Bandia. Deux expériences complètes, deux intensités." },
    { q: 'Mes enfants peuvent-ils venir ?', a: "Absolument, c'est même recommandé. -30% pour les -12 ans. Gratuit pour les -2 ans." },
    { q: 'Je suis seul(e), c\'est possible ?', a: 'Bien sûr. Beaucoup partent en solo. Supplément chambre individuelle : 450€ (~295 000 FCFA).' },
    { q: 'Quel niveau de confort ?', a: 'Hôtels 3-4★ à Dakar et Saint-Louis. Écolodges confortables au Sine Saloum. Climatisation partout.' },
    { q: 'Comment se passe le paiement ?', a: 'Acompte à la réservation. Solde 45-60 jours avant. Virement EUR/FCFA ou Stripe.' },
    { q: 'Et si je dois annuler ?', a: 'Early Bird : gratuit jusqu\'à J-90. Normal : gratuit jusqu\'à J-60. Dernière Minute : non remboursable.' },
    { q: 'Roseline est-elle présente ?', a: 'Oui. Personnellement. Sur chaque départ, du premier au dernier jour.' },
    { q: 'Mon conjoint(e) n\'est pas africain(e) ?', a: "Parfaitement adapté. C'est souvent le conjoint non-africain qui est le plus ému." },
  ]

  // Tarifs
  const tarifs = {
    '7j': { early: 1795, normal: 1998, last: 2350 },
    '14j': { early: 2450, normal: 2995, last: 3200 },
  }
  const current = tarifs[format]
  const earlyDec = Math.round(current.early * 1.45)
  const normalDec = Math.round(current.normal * 1.45)
  const lastDec = Math.round(current.last * 1.45)

  // Étapes (teaser, pas le détail jour par jour)
  const etapes7j = [
    { lieu: 'Dakar', focus: 'Arrivée, Plateau, marchés', nuits: 2 },
    { lieu: 'Île de Gorée', focus: 'Mémoire, Maison des Esclaves', nuits: 0 },
    { lieu: 'Lac Rose', focus: 'Récolteurs de sel, flottaison', nuits: 0 },
    { lieu: 'Lompoul', focus: 'Dunes, bivouac sous les étoiles', nuits: 1 },
    { lieu: 'Sowène / Langue de Barbarie', focus: 'Pirogue, oiseaux, fleuve', nuits: 1 },
    { lieu: 'Saint-Louis', focus: 'Ancienne capitale, patrimoine', nuits: 2 },
    { lieu: 'Parc du Djoudj', focus: 'Réserve ornithologique UNESCO', nuits: 0 },
  ]
  const etapes14j = [
    ...etapes7j,
    { lieu: 'Kaolack', focus: 'Capitale de l\'arachide, grand marché', nuits: 1 },
    { lieu: 'Sine Saloum (Ndangane)', focus: 'Bolongs, mangroves, Niominka', nuits: 3 },
    { lieu: 'Saly', focus: 'Petite Côte, plage, pêcheurs de Mbour', nuits: 1 },
    { lieu: 'Somone / Bandia', focus: 'Safari, lagune, kayak', nuits: 2 },
  ]
  const etapes = format === '7j' ? etapes7j : etapes14j

  return (
    <div ref={rootRef} className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <Image src="/images/senegal/hero.jpg" alt="Retour aux Sources, Sénégal" fill priority sizes="100vw" />
        </div>
        <div className={s.heroOv} />
        <div className={s.heroWave}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60Z" opacity=".6" />
            <path d="M0,35 C480,55 960,10 1440,40 L1440,60 L0,60Z" />
          </svg>
        </div>
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <div className={s.heroPill}>
              <span>Voyage immersif</span>
              <div className={s.dot} />
              <span>7 ou 14 jours</span>
              <div className={s.dot} />
              <span>Sénégal</span>
            </div>
            <div className={s.heroTitle}>
              <h1>Retour aux</h1>
              <em>Sources</em>
            </div>
            <p className={s.heroSub}>
              Vos parents vous parlent du Sénégal depuis que vous êtes enfant. Vous rêvez d&apos;y emmener vos enfants. De leur montrer d&apos;où ils viennent. <strong>Ce voyage existe. Il vous attend.</strong>
            </p>
            <div className={s.heroTags}>
              <span>Dès 1 795 € · ~1,18M FCFA</span>
              <span>Groupe 15 pers. maximum</span>
              <span>Juillet · Août · Décembre 2026</span>
            </div>
            <div className={s.heroBtns}>
              <a href="#programme-detaille" className={s.bg}>RECEVOIR LE PROGRAMME DÉTAILLÉ →</a>
              <a href="#formats" className={s.bo}>Voir les 2 formats</a>
            </div>
            <div className={s.heroUrgency}>
              <div className={s.hu}>
                <div className={s.dot} />
                <span>Deux formats : 7 jours (Nord) ou 14 jours (Nord + Sud)</span>
              </div>
            </div>
          </div>

          <div className={s.heroCard}>
            <h3>Infos rapides</h3>
            <div className={s.hcRow}><div className={s.hcIcon}>1</div><div><div className={s.hcLabel}>Durée</div><div className={s.hcValue}>7 ou 14 jours · <em>au choix</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>2</div><div><div className={s.hcLabel}>Format</div><div className={s.hcValue}>Groupe 15 personnes max</div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>3</div><div><div className={s.hcLabel}>Avis voyageurs</div><div className={s.hcValue}>4.9/5 · <em>2 000+ voyageurs</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>4</div><div><div className={s.hcLabel}>Early Bird 7 j</div><div className={s.hcValue}>1 795 € · <em>~1,18M FCFA</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>5</div><div><div className={s.hcLabel}>Early Bird 14 j</div><div className={s.hcValue}>2 450 € · <em>~1,61M FCFA</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>6</div><div><div className={s.hcLabel}>Votre guide</div><div className={s.hcValue}>Roseline Ngom · <em>présente 100%</em></div></div></div>
            <a href="#programme-detaille" className={s.hcCta}>Recevoir le programme →</a>
          </div>
        </div>
      </section>

      {/* URGENCE BAR */}
      <div className={s.ub}><p>Départs juillet et août 2026 : places limitées à 15 personnes par groupe. <a href="#programme-detaille">Demander le programme détaillé</a></p></div>

      {/* EMOTION */}
      <section className={s.emo}>
        <div className={s.emoIn}>
          <div className={`${s.label} ${s.fi}`}>Plus qu&apos;un voyage</div>
          <div className={`${s.stitle} ${s.fi}`}>Ce n&apos;est pas un circuit touristique.<br />C&apos;est une reconnexion.</div>
          <div className={`${s.emoTx} ${s.fi}`}>
            <p>Il y a des voyages qu&apos;on fait pour les photos. Et il y a ceux qui vous transforment.</p>
            <p><strong>Retour aux Sources n&apos;est pas une visite guidée du Sénégal.</strong> C&apos;est une immersion conçue pour la diaspora africaine. Pour ceux qui portent un pays dans le cœur sans toujours savoir comment y retourner.</p>
            <p>Pendant 7 ou 14 jours, vous allez marcher où vos grands-parents ont marché. Goûter ce qu&apos;ils ont goûté. Entendre ce qu&apos;ils ont voulu vous transmettre. <strong>Et vos enfants verront, avec leurs propres yeux, d&apos;où ils viennent.</strong></p>
            <p>Ce n&apos;est pas du tourisme. C&apos;est un acte de transmission. Et ça change tout.</p>
          </div>
          <div className={`${s.eq} ${s.fi}`}>« Quand mon fils de 8 ans a touché le sable de la plage où son grand-père a grandi, j&apos;ai compris pourquoi j&apos;avais fait ce voyage. »</div>
        </div>
      </section>

      {/* FORMATS */}
      <section className={s.prog} id="formats">
        <div className={s.progIn}>
          <div className={`${s.label} ${s.fi}`}>Deux formats</div>
          <div className={`${s.stitle} ${s.fi}`}>Choisissez votre intensité.</div>

          {/* Toggle */}
          <div className={s.fi} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 30, marginBottom: 40, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setFormat('7j')}
              style={{
                padding: '14px 28px',
                background: format === '7j' ? '#560E13' : 'transparent',
                color: format === '7j' ? '#FEFCF9' : '#560E13',
                border: '1.5px solid #560E13',
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all .25s ease',
              }}
            >
              7 jours · Nord
            </button>
            <button
              type="button"
              onClick={() => setFormat('14j')}
              style={{
                padding: '14px 28px',
                background: format === '14j' ? '#560E13' : 'transparent',
                color: format === '14j' ? '#FEFCF9' : '#560E13',
                border: '1.5px solid #560E13',
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all .25s ease',
              }}
            >
              14 jours · Nord + Sud
            </button>
          </div>

          {/* Étapes - teaser */}
          <div className={`${s.fi}`} style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'grid', gap: 14 }}>
              {etapes.map((e, i) => (
                <div
                  key={`${format}-${i}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    alignItems: 'center',
                    gap: 20,
                    padding: '18px 22px',
                    background: '#FEFCF9',
                    border: '1px solid rgba(86,14,19,0.1)',
                    borderRadius: 4,
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontSize: 26,
                    fontWeight: 600,
                    color: '#F6C961',
                    lineHeight: 1,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#560E13', marginBottom: 4 }}>{e.lieu}</div>
                    <div style={{ fontSize: 13, color: 'rgba(10,10,10,0.65)' }}>{e.focus}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    {e.nuits > 0 ? `${e.nuits} nuit${e.nuits > 1 ? 's' : ''}` : 'étape'}
                  </div>
                </div>
              ))}
            </div>

            {/* Teaser locked */}
            <div
              style={{
                marginTop: 30,
                padding: '32px 28px',
                background: 'linear-gradient(180deg, #F8F5F0 0%, #FEFCF9 100%)',
                border: '1px dashed rgba(86,14,19,0.25)',
                borderRadius: 4,
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#b8860b', marginBottom: 10 }}>
                Programme jour par jour
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 28, color: '#560E13', marginBottom: 12, fontWeight: 600 }}>
                Le détail du programme se demande.
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', maxWidth: 560, margin: '0 auto 22px', lineHeight: 1.6 }}>
                Hébergements précis, itinéraires heure par heure, repas, excursions et extras : je vous envoie le programme détaillé PDF par email. C&apos;est aussi l&apos;occasion d&apos;en discuter avec vous.
              </p>
              <a href="#programme-detaille" className={s.bg} style={{ display: 'inline-block' }}>
                Recevoir le programme détaillé →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className={s.pq}>
        <div className={s.pqIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Pour qui</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>Ce voyage est fait pour vous si...</div>
          <div className={s.pqg}>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic} style={{ background: 'transparent', border: '1px solid rgba(246,201,97,0.35)', color: '#F6C961', fontFamily: 'var(--font-cormorant), serif', fontSize: 26, fontWeight: 600 }}>01</div><h3>Vous voulez transmettre vos racines</h3><p>Vos enfants grandissent en France, en Belgique, au Canada. Ils entendent parler du Sénégal mais ne l&apos;ont jamais vécu. Ce voyage est pour eux autant que pour vous.</p></div>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic} style={{ background: 'transparent', border: '1px solid rgba(246,201,97,0.35)', color: '#F6C961', fontFamily: 'var(--font-cormorant), serif', fontSize: 26, fontWeight: 600 }}>02</div><h3>Vous n&apos;y êtes pas retourné(e)</h3><p>5 ans, 10 ans, 20 ans. Vous ne savez plus par où commencer. On s&apos;occupe de tout. Vous n&apos;avez qu&apos;à vivre.</p></div>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic} style={{ background: 'transparent', border: '1px solid rgba(246,201,97,0.35)', color: '#F6C961', fontFamily: 'var(--font-cormorant), serif', fontSize: 26, fontWeight: 600 }}>03</div><h3>Votre conjoint(e) ne connaît pas</h3><p>Il/elle n&apos;est pas d&apos;origine sénégalaise. Vous voulez lui montrer d&apos;où vous venez. Ce voyage sera votre plus beau cadeau.</p></div>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic} style={{ background: 'transparent', border: '1px solid rgba(246,201,97,0.35)', color: '#F6C961', fontFamily: 'var(--font-cormorant), serif', fontSize: 26, fontWeight: 600 }}>04</div><h3>Vous voulez voyager en communauté</h3><p>Pas seul dans un hôtel anonyme. Avec 8 à 15 personnes qui partagent la même histoire, les mêmes questions, la même envie.</p></div>
          </div>
        </div>
      </section>

      {/* VIDEO 1 */}
      <section className={s.vid}>
        <div className={`${s.vidIn} ${s.fi}`}>
          <div className={s.label}>Les coulisses</div>
          <div className={s.stitle}>Vivez l&apos;expérience TripAfro</div>
          <div className={s.vw}>
            <iframe src="https://www.youtube.com/embed/cAXg3qd8HkI" title="TripAfro" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>

      {/* INCLUS */}
      <section className={s.inc}>
        <div className={s.incIn}>
          <div className={`${s.label} ${s.fi}`}>Le détail</div>
          <div className={`${s.stitle} ${s.fi}`}>Ce qui est inclus. Ce qui ne l&apos;est pas.</div>
          <div className={`${s.ig} ${s.fi}`}>
            <div className={`${s.ic} ${s.icOui}`}>
              <h3>Inclus</h3>
              <ul>
                <li>Hébergement (hôtels 3-4★ et écolodges)</li>
                <li>Transports internes (minibus climatisé + pirogues)</li>
                <li>Petits-déjeuners et dîners</li>
                <li>Toutes les excursions et entrées</li>
                <li>Guide francophone dédié</li>
                <li>Roseline présente sur chaque départ</li>
                <li>Assurance voyage</li>
                <li>Support WhatsApp 24/7</li>
                <li>Album photo numérique professionnel</li>
              </ul>
            </div>
            <div className={`${s.ic} ${s.icNon}`}>
              <h3>Non inclus</h3>
              <ul>
                <li>Vol international aller-retour</li>
                <li>Déjeuners libres (~5 000 FCFA/jour)</li>
                <li>Dépenses personnelles et souvenirs</li>
                <li>Pourboires (facultatifs)</li>
                <li>Extensions de séjour (sur demande)</li>
                <li>Visa si applicable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO 2 */}
      <section className={s.vid2}>
        <div className={`${s.vid2In} ${s.fi}`}>
          <div className={s.label} style={{ color: '#F6C961' }}>Dakar vue par Roseline</div>
          <div className={s.stitle} style={{ color: 'white' }}>Le Monument de la Renaissance</div>
          <div className={s.vw}>
            <iframe src="https://www.youtube.com/embed/1mQm-hhOaws" title="Monument" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className={s.prix}>
        <div className={s.prixIn}>
          <div className={`${s.label} ${s.fi}`}>Les tarifs</div>
          <div className={`${s.stitle} ${s.fi}`}>Un prix transparent. Zéro surprise.</div>

          <div className={s.fi} style={{ textAlign: 'center', marginTop: 10, marginBottom: 30, fontSize: 13, color: 'rgba(10,10,10,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Format affiché : <strong style={{ color: '#560E13' }}>{format === '7j' ? '7 jours' : '14 jours'}</strong> · <button type="button" onClick={() => setFormat(format === '7j' ? '14j' : '7j')} style={{ background: 'none', border: 'none', color: '#b8860b', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 13, fontWeight: 700, textDecoration: 'underline' }}>changer</button>
          </div>

          <div className={s.pxg}>
            <div className={`${s.px} ${s.fi}`}>
              <div className={s.tp}>Early Bird</div>
              <div className={s.am}>{current.early.toLocaleString('fr-FR')}€</div>
              <div className={s.cf}>~{(current.early * 656).toLocaleString('fr-FR')} FCFA</div>
              <div className={s.pr}>par personne, base double</div>
              <div className={s.dt}>Réservation 4+ mois avant<br />Acompte 500€<br />Annulation gratuite J-90</div>
            </div>
            <div className={`${s.px} ${s.ft} ${s.fi}`}>
              <div className={s.tp}>Tarif Normal</div>
              <div className={s.am}>{current.normal.toLocaleString('fr-FR')}€</div>
              <div className={s.cf}>~{(current.normal * 656).toLocaleString('fr-FR')} FCFA</div>
              <div className={s.pr}>par personne, base double</div>
              <div className={s.dt}>Réservation 2-4 mois avant<br />Acompte 700€<br />Annulation gratuite J-60</div>
            </div>
            <div className={`${s.px} ${s.fi}`}>
              <div className={s.tp}>Dernière Minute</div>
              <div className={s.am}>{current.last.toLocaleString('fr-FR')}€</div>
              <div className={s.cf}>~{(current.last * 656).toLocaleString('fr-FR')} FCFA</div>
              <div className={s.pr}>par personne, base double</div>
              <div className={s.dt}>Moins de 2 mois avant<br />Paiement intégral<br />Non remboursable</div>
            </div>
          </div>

          {/* Décembre surcharge */}
          <div
            className={s.fi}
            style={{
              marginTop: 40,
              padding: '28px 32px',
              background: 'linear-gradient(135deg, #560E13 0%, #3d090e 100%)',
              borderRadius: 4,
              color: '#FEFCF9',
              maxWidth: 900,
              marginInline: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#F6C961' }}>Départ décembre 2026</span>
              <span style={{ fontSize: 28, fontFamily: 'var(--font-cormorant), serif', color: '#F6C961', fontWeight: 600 }}>+45% haute saison</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(254,252,249,0.82)', marginBottom: 18 }}>
              Le départ des fêtes (20 décembre au 2 janvier) applique un supplément de +45% sur la grille tarifaire. Les prestataires locaux, hôtels et transports facturent tous leur haute saison à cette période. Pas de marge cachée : le tarif reflète simplement le coût réel de la période.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontSize: 13 }}>
              <div>
                <div style={{ color: 'rgba(254,252,249,0.55)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>Early Bird déc.</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#F6C961' }}>{earlyDec.toLocaleString('fr-FR')} €</div>
              </div>
              <div>
                <div style={{ color: 'rgba(254,252,249,0.55)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>Normal déc.</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#F6C961' }}>{normalDec.toLocaleString('fr-FR')} €</div>
              </div>
              <div>
                <div style={{ color: 'rgba(254,252,249,0.55)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>Dernière Min. déc.</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#F6C961' }}>{lastDec.toLocaleString('fr-FR')} €</div>
              </div>
            </div>
          </div>

          <div className={`${s.enf} ${s.fi}`} style={{ marginTop: 30 }}>
            <span>Enfants -12 ans : -30% sur le tarif · Bébés -2 ans : gratuit · Supplément chambre individuelle : 450 €</span>
          </div>
        </div>
      </section>

      {/* DATES */}
      <section className={s.dat}>
        <div className={s.datIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Les départs 2026</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>Trois fenêtres. Places limitées.</div>
          <div className={s.dg}>
            <div className={`${s.dc} ${s.fi}`}>
              <div className={s.mo}>Juillet</div>
              <div className={s.yr}>2026</div>
              <div className={s.rg}>Formats 7 j et 14 j</div>
              <div className={`${s.pl} ${s.plFw}`}>Tarif standard</div>
              <div className={`${s.st} ${s.sf}`}>Places limitées à 15</div>
            </div>
            <div className={`${s.dc} ${s.fi}`}>
              <div className={s.mo}>Août</div>
              <div className={s.yr}>2026</div>
              <div className={s.rg}>Formats 7 j et 14 j</div>
              <div className={`${s.pl} ${s.plOk}`}>Tarif standard</div>
              <div className={`${s.st} ${s.so}`}>Ouvert</div>
            </div>
            <div className={`${s.dc} ${s.fi}`}>
              <div className={s.mo}>Décembre</div>
              <div className={s.yr}>2026</div>
              <div className={s.rg}>Formats 7 j et 14 j</div>
              <div className={`${s.pl} ${s.plOk}`} style={{ background: 'rgba(246,201,97,0.18)', color: '#F6C961' }}>Haute saison +45%</div>
              <div className={`${s.st} ${s.so}`}>Ouvert</div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className={s.tms}>
        <div className={s.tmsIn}>
          <div className={`${s.label} ${s.fi}`}>Témoignages</div>
          <div className={`${s.stitle} ${s.fi}`}>Ceux qui sont partis racontent</div>
          <div className={s.tmg}>
            <div className={`${s.tm} ${s.fi}`}>
              <div className={s.tmStars}>★★★★★</div>
              <q>J&apos;ai emmené mes 3 enfants pour la première fois. Ils parlent encore du jour où on a navigué dans les mangroves. Ce voyage a changé notre famille.</q>
              <div className={s.tmWh}>Fatou M.</div>
              <div className={s.tmFr}>Paris · Juillet 2024</div>
            </div>
            <div className={`${s.tm} ${s.fi}`}>
              <div className={s.tmStars}>★★★★★</div>
              <q>Mon mari n&apos;est pas sénégalais. Après Retour aux Sources, il comprend enfin pourquoi je pleure quand j&apos;entends du mbalax. Roseline a créé quelque chose de spécial.</q>
              <div className={s.tmWh}>Awa K.</div>
              <div className={s.tmFr}>Bruxelles · Décembre 2024</div>
            </div>
            <div className={`${s.tm} ${s.fi}`}>
              <div className={s.tmStars}>★★★★★</div>
              <q>Je n&apos;étais pas retourné au Sénégal depuis 22 ans. J&apos;avais peur. En fait, c&apos;est le Sénégal qui m&apos;a retrouvé.</q>
              <div className={s.tmWh}>Ibrahima S.</div>
              <div className={s.tmFr}>Montréal · Août 2024</div>
            </div>
            <div className={`${s.tm} ${s.fi}`}>
              <div className={s.tmStars}>★★★★★</div>
              <q>L&apos;organisation est impeccable. Roseline est présente du premier au dernier jour. On se sent en famille. Le Sine Saloum, c&apos;est le paradis.</q>
              <div className={s.tmWh}>Marie-Claire D.</div>
              <div className={s.tmFr}>Lyon · Juillet 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.faq}>
        <div className={s.faqIn}>
          <div className={`${s.label} ${s.fi}`}>Questions fréquentes</div>
          <div className={`${s.stitle} ${s.fi}`}>Tout savoir avant de réserver</div>
          <div className={s.fi} style={{ marginTop: 25 }}>
            {faq.map((item, i) => (
              <div key={i} className={`${s.fi2} ${openFaq === i ? s.op : ''}`}>
                <div className={s.fq} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}<span className={s.ar}>+</span>
                </div>
                <div className={s.fa}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE - Demande programme détaillé (lead chaud) */}
      <section className={s.form} id="programme-detaille">
        <div className={s.fmIn}>
          <div className={`${s.fmL} ${s.fi}`}>
            <div className={s.label}>Programme détaillé</div>
            <h2>Recevez le programme<br />jour par jour <em>par email</em></h2>
            <p>Je vous envoie le PDF complet sous 24h : itinéraires heure par heure, hébergements précis, repas, excursions, extras, conseils pratiques.</p>
            <p>Je vous propose aussi un appel de 20 min pour répondre à vos questions et voir si ce voyage vous correspond vraiment. <strong>Aucun engagement.</strong></p>
            <div className={s.ub2}>
              <div className={s.dot} />
              <span>15 places max par départ · Juillet, Août, Décembre 2026</span>
            </div>
            <div className={s.ca}>
              <a href="https://wa.me/33650329808">WhatsApp : +33 6 50 32 98 08</a>
              <a href="mailto:roselinediouma@gmail.com">roselinediouma@gmail.com</a>
              <a href="https://calendly.com/roselinengom">Réserver un appel de 15 min</a>
            </div>
          </div>
          <form className={`${s.fc} ${s.fi}`} onSubmit={handleSubmit}>
            <h3>Recevoir le programme détaillé</h3>
            {submitted ? (
              <div style={{ padding: 20, background: '#f5f0e8', border: '1px solid #c9b897', borderRadius: 4, color: '#560E13' }}>
                <strong>Merci {'!'}</strong> Votre demande est bien reçue. Je vous envoie le programme détaillé et je vous recontacte sous 24h.
              </div>
            ) : (
              <>
                <div className={s.fr}>
                  <div><label>Prénom *</label><input type="text" name="prenom" required placeholder="Votre prénom" /></div>
                  <div><label>Nom *</label><input type="text" name="nom" required placeholder="Votre nom" /></div>
                </div>
                <div className={s.fr}>
                  <div><label>Email *</label><input type="email" name="email" required placeholder="votre@email.com" /></div>
                  <div><label>WhatsApp</label><input type="tel" name="whatsapp" placeholder="+33 6 XX XX XX XX" /></div>
                </div>
                <label>Format souhaité *</label>
                <select name="formatVoyage" defaultValue={format} required>
                  <option value="7j">7 jours · Nord (Dakar, Gorée, Saint-Louis, Djoudj)</option>
                  <option value="14j">14 jours · Nord + Sud (Sine Saloum, Saly, Somone)</option>
                  <option value="indecis">Je ne sais pas encore, j&apos;aimerais en discuter</option>
                </select>
                <label>Départ qui vous intéresse</label>
                <select name="departSouhaite" defaultValue="">
                  <option value="">Choisir une période...</option>
                  <option>Juillet 2026</option>
                  <option>Août 2026</option>
                  <option>Décembre 2026 (+45% haute saison)</option>
                  <option>Plusieurs dates possibles</option>
                </select>
                <div className={s.fr}>
                  <div>
                    <label>Adultes</label>
                    <select name="nbAdultes" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select>
                  </div>
                  <div>
                    <label>Enfants</label>
                    <select name="nbEnfants" defaultValue="0"><option>0</option><option>1</option><option>2</option><option>3</option><option>4+</option></select>
                  </div>
                </div>
                <label>Ville de résidence</label>
                <input type="text" name="villeResidence" placeholder="Paris, Bruxelles, Montréal..." />
                <label>Votre histoire, vos questions</label>
                <textarea name="message" placeholder="Ce qui vous motive, vos questions, vos contraintes..." />
                {submitError && (
                  <div style={{ color: '#B00020', fontSize: 13, marginTop: 8 }}>{submitError}</div>
                )}
                <button className={s.fs} type="submit" disabled={submitting}>
                  {submitting ? 'Envoi...' : 'Recevoir le programme détaillé →'}
                </button>
                <div className={s.fmi}>Aucun engagement. Le PDF arrive dans votre boîte sous 24h.</div>
              </>
            )}
          </form>
        </div>
      </section>

      <Footer />

      <a href="#programme-detaille" className={`${s.fl} ${floatShow ? s.sh : ''}`}>
        <span className={s.pu} />
        Recevoir le programme détaillé
      </a>
    </div>
  )
}
