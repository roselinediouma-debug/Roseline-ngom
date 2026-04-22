'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import s from './page.module.css'

export default function BackToSenegalPage() {
  const [days, setDays] = useState('--')
  const [hours, setHours] = useState('--')
  const [mins, setMins] = useState('--')
  const [secs, setSecs] = useState('--')
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Countdown towards opening of applications — keep it live for urgency
  useEffect(() => {
    const end = new Date('2027-02-01T00:00:00').getTime()
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n)
    const tick = () => {
      const diff = end - Date.now()
      if (diff <= 0) return
      setDays(String(Math.floor(diff / 864e5)))
      setHours(pad(Math.floor((diff % 864e5) / 36e5)))
      setMins(pad(Math.floor((diff % 36e5) / 6e4)))
      setSecs(pad(Math.floor((diff % 6e4) / 1e3)))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Fade-in on scroll
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
          <Image src="/images/senegal/hero.jpg" alt="Sénégal, Back to Senegal" fill priority sizes="100vw" />
        </div>
        <div className={s.heroOv} />
        <div className={s.heroAccent} />
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <div className={s.topline}>
              <span className={s.chip}>Prochaine cohorte</span>
              <span className={s.chipOutline}>7 jours · Dakar & région</span>
            </div>
            <h1 className={s.heroH1}>
              BACK TO<br /><span>SENEGAL</span>
            </h1>
            <div className={s.tagline}>
              L&apos;accélérateur de projets pour la diaspora.
            </div>
            <p className={s.heroSub}>
              Sept jours sur le terrain pour transformer un projet qui dort depuis des années
              en plan d&apos;action exécutable.{' '}
              <strong>
                Rencontres institutionnelles, entrepreneurs locaux, expertise foncière,
                business plan, pitch devant jury.
              </strong>{' '}
              Vous repartez avec une roadmap, un carnet d&apos;adresses et une communauté.
            </p>
            <div className={s.btns}>
              <a href="#waitlist" className={s.btnAcc}>Rejoindre la liste d&apos;attente →</a>
              <a href="#programme" className={s.btnGhost}>Voir le programme</a>
            </div>
            <div className={s.proof}>
              <div className={s.proofItem}>
                <div className={s.pN}>15+</div>
                <div className={s.pL}>décideurs rencontrés</div>
              </div>
              <div className={s.proofItem}>
                <div className={s.pN}>12</div>
                <div className={s.pL}>places par cohorte</div>
              </div>
              <div className={s.proofItem}>
                <div className={s.pN}>3 mois</div>
                <div className={s.pL}>de suivi post-programme</div>
              </div>
            </div>
          </div>

          <div className={s.heroCard}>
            <div className={s.hcCountdown}>
              <div className={s.hcTitle}>Ouverture Cohorte 1 dans</div>
              <div className={s.cdRow}>
                <div className={s.cdBox}><div className={s.cdN}>{days}</div><div className={s.cdL}>Jours</div></div>
                <div className={s.cdBox}><div className={s.cdN}>{hours}</div><div className={s.cdL}>Heures</div></div>
                <div className={s.cdBox}><div className={s.cdN}>{mins}</div><div className={s.cdL}>Min</div></div>
                <div className={s.cdBox}><div className={s.cdN} style={{ color: '#F6C961' }}>{secs}</div><div className={s.cdL}>Sec</div></div>
              </div>
            </div>
            <div className={s.hcCohortes}>
              <div className={s.coh}>
                <div className={s.cLabel}>Cohorte 1</div>
                <div className={s.cDate}>Février 2027</div>
                <div className={`${s.cPlaces} ${s.hot}`}>Liste d&apos;attente</div>
                <a href="#waitlist" className={s.cCta}>Être prévenu·e</a>
              </div>
              <div className={`${s.coh} ${s.cohGold}`}>
                <div className={s.cLabel}>Cohorte 2</div>
                <div className={s.cDate}>Juillet 2027</div>
                <div className={`${s.cPlaces} ${s.open}`}>Liste d&apos;attente</div>
                <a href="#waitlist" className={s.cCta}>Être prévenu·e</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOULEUR */}
      <section className={s.douleur}>
        <div className={s.douleurIn}>
          <div className={`${s.label} ${s.fi}`}>Le constat</div>
          <div className={`${s.stitle} ${s.fi}`}>
            Des milliards d&apos;euros envoyés au pays chaque année.<br />
            Très peu deviennent des projets productifs.
          </div>
          <div className={`${s.intro} ${s.fi}`}>
            Pas par manque d&apos;argent. Par manque de{' '}
            <strong>réseau, d&apos;information et de méthode</strong>. Voici ce qui bloque les porteurs de projets diaspora :
          </div>
          <div className={s.douleurGrid}>
            <div className={`${s.doul} ${s.fi}`}>
              <div className={s.dNum}>01</div>
              <h3>Pas de réseau local</h3>
              <p>Vous ne connaissez personne à l&apos;APIX, à la DER, au FAISE. Les emails restent sans réponse.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD1}`}>
              <div className={s.dNum}>02</div>
              <h3>Pas de méthode</h3>
              <p>Business plan théorique, jamais confronté au terrain. Pricing au doigt mouillé.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD2}`}>
              <div className={s.dNum}>03</div>
              <h3>Des années perdues</h3>
              <p>Le projet traîne depuis 3, 5, 10 ans. Vous tournez en rond. Seul·e derrière votre écran.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD3}`}>
              <div className={s.dNum}>04</div>
              <h3>Foncier opaque</h3>
              <p>Comment sécuriser un terrain ? Quel notaire ? Quels pièges ? Personne ne vous explique.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD4}`}>
              <div className={s.dNum}>05</div>
              <h3>Prestataires non fiables</h3>
              <p>Architecte, artisan, fournisseur. Trouvés sur Google. Aucune garantie. Aucune référence.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD5}`}>
              <div className={s.dNum}>06</div>
              <h3>La solitude du porteur</h3>
              <p>Personne autour de vous ne comprend votre projet. Pas de pairs. Pas de mentors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT */}
      <section className={s.split}>
        <div className={`${s.splitL} ${s.fi}`}>
          <h3 className={s.splitH3}>
            Sans Back to Senegal<br />vous <span>perdez du temps</span>
          </h3>
          <div className={s.sp}><div className={s.spI}>—</div><div className={s.spT}><strong>2 à 5 ans</strong> de démarches solitaires</div></div>
          <div className={s.sp}><div className={s.spI}>—</div><div className={s.spT}>Des dizaines d&apos;emails sans réponse</div></div>
          <div className={s.sp}><div className={s.spI}>—</div><div className={s.spT}>Un business plan <strong>jamais validé</strong> par le terrain</div></div>
          <div className={s.sp}><div className={s.spI}>—</div><div className={s.spT}>Des prestataires trouvés au hasard</div></div>
          <div className={s.sp}><div className={s.spI}>—</div><div className={s.spT}>Aucune communauté de pairs</div></div>
        </div>
        <div className={`${s.splitR} ${s.fi}`}>
          <h3 className={s.splitH3}>
            Avec Back to Senegal<br />vous <span>accélérez tout</span>
          </h3>
          <div className={s.sp}><div className={s.spI}>+</div><div className={s.spT}><strong>7 jours</strong> pour faire ce qui prend 2 ans</div></div>
          <div className={s.sp}><div className={s.spI}>+</div><div className={s.spT}>15+ rencontres <strong>face à face</strong> organisées</div></div>
          <div className={s.sp}><div className={s.spI}>+</div><div className={s.spT}>Business plan <strong>validé par un jury</strong></div></div>
          <div className={s.sp}><div className={s.spI}>+</div><div className={s.spT}>Prestataires <strong>vérifiés</strong> par Roseline</div></div>
          <div className={s.sp}><div className={s.spI}>+</div><div className={s.spT}>Communauté de <strong>12 porteurs de projets</strong></div></div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className={s.prog} id="programme">
        <div className={s.progIn}>
          <div className={`${s.label} ${s.fi}`}>Le programme</div>
          <div className={`${s.stitle} ${s.fi}`}>Sept jours. Sept accélérations. Une transformation.</div>
          <div className={s.jours}>
            <div className={`${s.jour} ${s.fi}`}><div className={s.jNum}>J1</div><h4>Pitch &amp; cadrage</h4><p>Chaque porteur pitch son projet. Feedback immédiat du groupe et de Roseline.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD1}`}><div className={s.jNum}>J2</div><h4>Institutions</h4><p>APIX, DER/FJ, FAISE, ADEPME. Face à face, pas en visio.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD2}`}><div className={s.jNum}>J3</div><h4>Banques</h4><p>Comptes, financement, dispositifs dédiés à la diaspora.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD3}`}><div className={s.jNum}>J4</div><h4>Entrepreneurs</h4><p>Cinq fondateurs qui ont déjà fait le chemin. Retour brut.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD4}`}><div className={s.jNum}>J5</div><h4>Terrain</h4><p>Visites ciblées, expert foncier, prestataires locaux vérifiés.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD5}`}><div className={s.jNum}>J6</div><h4>Business plan</h4><p>Atelier intensif. Chiffrage, séquençage, scénarios. Document final.</p></div>
            <div className={`${s.jour} ${s.fi}`}><div className={s.jNum}>J7</div><h4>Pitch final</h4><p>Jury d&apos;experts et d&apos;investisseurs. Roadmap. Accueil alumni.</p></div>
          </div>
        </div>
      </section>

      {/* GAINS */}
      <section className={s.gains}>
        <div className={s.gainsIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Ce que vous repartez avec</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>Pas des promesses. Des livrables.</div>
          <div className={s.gainGrid}>
            <div className={`${s.gain} ${s.fi}`}><div className={s.gNum}>01</div><h4>Roadmap 6 mois</h4><p>Plan d&apos;action personnalisé, chiffré, séquencé.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD1}`}><div className={s.gNum}>02</div><h4>15+ contacts clés</h4><p>Décideurs, entrepreneurs, institutions.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD2}`}><div className={s.gNum}>03</div><h4>Business plan validé</h4><p>Confronté au terrain et au jury d&apos;experts.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD3}`}><div className={s.gNum}>04</div><h4>Feedback jury</h4><p>Experts et investisseurs. Sans filtre.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD4}`}><div className={s.gNum}>05</div><h4>Communauté alumni</h4><p>Groupe privé à vie. Entraide durable.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD5}`}><div className={s.gNum}>06</div><h4>3 mois de suivi</h4><p>Visios mensuelles avec Roseline post-programme.</p></div>
          </div>
        </div>
      </section>

      {/* LETTRE */}
      <section className={s.lettre}>
        <div className={`${s.lettreIn} ${s.fi}`}>
          <div className={s.lettreImg}>
            <Image src="/images/roseline-portrait-1.jpg" alt="Roseline Ngom" width={400} height={500} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className={s.lettreTxt}>
            <div className={s.salut}>Pourquoi j&apos;ai créé Back to Senegal</div>
            <p>
              Depuis dix ans, je reçois le même message :{' '}
              <strong>« Roseline, j&apos;ai un projet au Sénégal. Mais je ne sais pas par où commencer. »</strong>
            </p>
            <p>
              J&apos;ai vu des dizaines de projets s&apos;essouffler. Pas par manque d&apos;argent.
              Par manque de réseau, d&apos;information, de méthode.
            </p>
            <p>
              Back to Senegal, c&apos;est sept jours pour vous transmettre ce que j&apos;ai mis dix ans à construire.
              Un carnet d&apos;adresses. Une méthode. Et la conviction que{' '}
              <strong>votre projet est faisable, si on l&apos;attaque bien</strong>.
            </p>
            <div className={s.sig}>— Roseline</div>
          </div>
        </div>
      </section>

      {/* COHORTES — détail */}
      <section className={s.cohDetail}>
        <div className={s.cohDetailIn}>
          <div className={`${s.label} ${s.fi}`}>Les cohortes 2027</div>
          <div className={`${s.stitle} ${s.fi}`}>Deux fenêtres. Même programme. Douze places.</div>

          <div className={s.cohGrid}>
            <div className={`${s.cohCard} ${s.fi}`}>
              <div className={s.cohBadge}>Cohorte 1</div>
              <div className={s.cohDateBig}>Février 2027</div>
              <div className={s.cohSeason}>Saison sèche · température idéale</div>
              <ul className={s.cohList}>
                <li>Programme complet sur 7 jours consécutifs</li>
                <li>Dakar, Almadies, Diamniadio, Mbour, Saly</li>
                <li>Hébergement, repas et transports internes inclus</li>
                <li>Sélection sur dossier + entretien</li>
              </ul>
              <div className={s.cohState}>
                <span className={s.cohDot} /> Liste d&apos;attente ouverte
              </div>
            </div>

            <div className={`${s.cohCard} ${s.cohCardGold} ${s.fi} ${s.fiD1}`}>
              <div className={s.cohBadge}>Cohorte 2</div>
              <div className={s.cohDateBig}>Juillet 2027</div>
              <div className={s.cohSeason}>Saison verte · possibilité combiner avec Retour aux Sources</div>
              <ul className={s.cohList}>
                <li>Programme complet sur 7 jours consécutifs</li>
                <li>Dakar, Almadies, Diamniadio, Mbour, Saly</li>
                <li>Hébergement, repas et transports internes inclus</li>
                <li>Sélection sur dossier + entretien</li>
              </ul>
              <div className={s.cohState}>
                <span className={s.cohDot} /> Liste d&apos;attente ouverte
              </div>
            </div>
          </div>

          <p className={`${s.cohFooter} ${s.fi}`}>
            Les candidatures s&apos;ouvriront d&apos;abord aux inscrits de la liste d&apos;attente,
            avec un tarif préférentiel réservé aux premiers confirmés.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className={s.waitlist} id="waitlist">
        <div className={`${s.waitlistIn} ${s.fi}`}>
          <div className={s.waitlistLabel}>Liste d&apos;attente</div>
          <h2 className={s.waitlistH2}>
            Soyez prévenu·e <span>à l&apos;ouverture.</span>
          </h2>
          <p className={s.waitlistSub}>
            Douze places par cohorte, sélection sur dossier. La liste d&apos;attente reçoit
            l&apos;information en priorité et accède au tarif préférentiel.
          </p>
          <div className={s.waitlistForm}>
            <NewsletterForm />
          </div>
          <p className={s.waitlistMicro}>
            Pas de spam. Désinscription en 1 clic.
          </p>
        </div>
      </section>

      {/* EN ATTENDANT */}
      <section className={s.enattendant}>
        <div className={`${s.enattendantIn} ${s.fi}`}>
          <div className={s.label} style={{ textAlign: 'center', marginBottom: 14 }}>En attendant</div>
          <h2 className={s.enattendantH2}>Votre projet est déjà avancé ?</h2>
          <p className={s.enattendantP}>
            Si vous ne pouvez pas attendre la prochaine cohorte, je propose aussi un accompagnement
            stratégique individuel sur trois, six ou douze mois.
          </p>
          <div className={s.enattendantBtns}>
            <a href="/consulting/accompagnement" className={s.btnAcc}>Voir l&apos;accompagnement individuel</a>
            <a href="/blog" className={s.btnGhost} style={{ color: '#560E13', borderColor: '#560E13' }}>Lire le blog</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
