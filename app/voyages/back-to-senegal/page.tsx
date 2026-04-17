'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

export default function BackToSenegalPage() {
  const [days, setDays] = useState('--')
  const [hours, setHours] = useState('--')
  const [mins, setMins] = useState('--')
  const [secs, setSecs] = useState('--')
  const [floatShow, setFloatShow] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const end = new Date('2027-02-01T00:00:00').getTime()
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n)
    const up = () => {
      const diff = end - Date.now()
      if (diff <= 0) return
      setDays(String(Math.floor(diff / 864e5)))
      setHours(pad(Math.floor((diff % 864e5) / 36e5)))
      setMins(pad(Math.floor((diff % 36e5) / 6e4)))
      setSecs(pad(Math.floor((diff % 6e4) / 1e3)))
    }
    up()
    const id = setInterval(up, 1000)
    return () => clearInterval(id)
  }, [])

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

  const faq = [
    {
      q: "C'est un voyage ou un programme ?",
      a: "Un programme d'accélération. Vous venez avec un projet, vous repartez avec un plan d'action, un réseau et un business plan validé.",
    },
    {
      q: 'Comment fonctionne la sélection ?',
      a: 'Formulaire → étude de dossier → entretien 30 min. 12 places max par cohorte.',
    },
    {
      q: 'Pas de projet précis, je peux postuler ?',
      a: 'Oui, avec une idée claire et une forte motivation. Le programme structure votre idée.',
    },
    {
      q: 'Le vol est inclus ?',
      a: 'Non. Tout le reste oui : hébergement, repas, transports, rencontres, ateliers, suivi 3 mois.',
    },
    {
      q: 'Paiement en plusieurs fois ?',
      a: 'Oui. 40% à la confirmation. 60% à J-60.',
    },
    {
      q: 'Quelle différence entre les 2 cohortes ?',
      a: 'Même programme. Février = saison sèche. Juillet = possibilité de combiner avec Retour aux Sources.',
    },
  ]

  return (
    <div ref={rootRef} className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <Image
            src="/images/senegal/hero.jpg"
            alt="Sénégal — Back to Senegal"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={s.heroOv} />
        <div className={s.heroAccent} />
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <div className={s.topline}>
              <span className={s.chip}>Nouveau programme</span>
              <span className={s.chipOutline}>7 jours · Sénégal</span>
            </div>
            <h1 className={s.heroH1}>
              BACK TO<br /><span>SENEGAL</span>
            </h1>
            <div className={s.tagline}>L&apos;accélérateur de projets pour la diaspora.</div>
            <p className={s.heroSub}>
              Vous avez un projet au Sénégal depuis des années. En 7 jours, on le rend concret.{' '}
              <strong>
                Rencontres institutionnelles, entrepreneurs locaux, terrain, business plan, pitch devant jury.
              </strong>{' '}
              Vous repartez avec un plan d&apos;action, pas un rêve.
            </p>
            <div className={s.btns}>
              <a href="#candidature" className={s.btnAcc}>Candidater →</a>
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
              <div className={s.hcTitle}>Cohorte 1 dans</div>
              <div className={s.cdRow}>
                <div className={s.cdBox}>
                  <div className={s.cdN}>{days}</div>
                  <div className={s.cdL}>Jours</div>
                </div>
                <div className={s.cdBox}>
                  <div className={s.cdN}>{hours}</div>
                  <div className={s.cdL}>Heures</div>
                </div>
                <div className={s.cdBox}>
                  <div className={s.cdN}>{mins}</div>
                  <div className={s.cdL}>Min</div>
                </div>
                <div className={s.cdBox}>
                  <div className={s.cdN} style={{ color: '#EF4444' }}>{secs}</div>
                  <div className={s.cdL}>Sec</div>
                </div>
              </div>
            </div>
            <div className={s.hcCohortes}>
              <div className={s.coh}>
                <div className={s.cLabel}>Cohorte 1</div>
                <div className={s.cDate}>Février 2027</div>
                <div className={`${s.cPlaces} ${s.hot}`}>⚡ 12 places</div>
                <a href="#candidature" className={s.cCta}>Candidater</a>
              </div>
              <div className={`${s.coh} ${s.cohGold}`}>
                <div className={s.cLabel}>Cohorte 2</div>
                <div className={s.cDate}>Juillet 2027</div>
                <div className={`${s.cPlaces} ${s.open}`}>✓ 12 places</div>
                <a href="#candidature" className={s.cCta}>Candidater</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOULEUR */}
      <section className={s.douleur}>
        <div className={s.douleurIn}>
          <div className={`${s.label} ${s.fi}`}>Le problème</div>
          <div className={`${s.stitle} ${s.fi}`}>
            2,7 milliards d&apos;euros de transferts diaspora par an.<br />
            4% deviennent des investissements productifs.
          </div>
          <div className={`${s.intro} ${s.fi}`}>
            Pas par manque d&apos;argent. Par manque de{' '}
            <strong>réseau, d&apos;information et de méthode</strong>. Voici ce qui bloque les porteurs de projets diaspora :
          </div>
          <div className={s.douleurGrid}>
            <div className={`${s.doul} ${s.fi}`}>
              <div className={s.dIco}>🚫</div>
              <h3>Pas de réseau local</h3>
              <p>Vous ne connaissez personne à l&apos;APIX, à la DER, au FAISE. Vos emails restent sans réponse.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD1}`}>
              <div className={s.dIco}>📄</div>
              <h3>Pas de méthode</h3>
              <p>Business plan théorique, jamais confronté au terrain. Pricing au doigt mouillé.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD2}`}>
              <div className={s.dIco}>⏰</div>
              <h3>Des années perdues</h3>
              <p>Le projet traîne depuis 3, 5, 10 ans. Vous tournez en rond. Seul derrière votre écran.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD3}`}>
              <div className={s.dIco}>❓</div>
              <h3>Foncier opaque</h3>
              <p>Comment sécuriser un terrain ? Quel notaire ? Quels pièges ? Personne ne vous explique.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD4}`}>
              <div className={s.dIco}>💸</div>
              <h3>Prestataires non fiables</h3>
              <p>Architecte, artisan, fournisseur. Trouvés sur Google. Aucune garantie. Aucune référence.</p>
            </div>
            <div className={`${s.doul} ${s.fi} ${s.fiD5}`}>
              <div className={s.dIco}>😔</div>
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
          <div className={s.sp}><div className={s.spI}>✗</div><div className={s.spT}><strong>2 à 5 ans</strong> de démarches solitaires</div></div>
          <div className={s.sp}><div className={s.spI}>✗</div><div className={s.spT}>Des dizaines d&apos;emails sans réponse</div></div>
          <div className={s.sp}><div className={s.spI}>✗</div><div className={s.spT}>Un business plan <strong>jamais validé</strong> par le terrain</div></div>
          <div className={s.sp}><div className={s.spI}>✗</div><div className={s.spT}>Des prestataires trouvés au hasard</div></div>
          <div className={s.sp}><div className={s.spI}>✗</div><div className={s.spT}>Aucune communauté de pairs</div></div>
        </div>
        <div className={`${s.splitR} ${s.fi}`}>
          <h3 className={s.splitH3}>
            Avec Back to Senegal<br />vous <span>accélérez tout</span>
          </h3>
          <div className={s.sp}><div className={s.spI}>✓</div><div className={s.spT}><strong>7 jours</strong> pour faire ce qui prend 2 ans</div></div>
          <div className={s.sp}><div className={s.spI}>✓</div><div className={s.spT}>15+ rencontres <strong>face à face</strong> organisées</div></div>
          <div className={s.sp}><div className={s.spI}>✓</div><div className={s.spT}>Business plan <strong>validé par un jury</strong></div></div>
          <div className={s.sp}><div className={s.spI}>✓</div><div className={s.spT}>Prestataires <strong>vérifiés</strong> par Roseline</div></div>
          <div className={s.sp}><div className={s.spI}>✓</div><div className={s.spT}>Communauté de <strong>12 porteurs de projets</strong></div></div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className={s.prog} id="programme">
        <div className={s.progIn}>
          <div className={`${s.label} ${s.fi}`}>Le programme</div>
          <div className={`${s.stitle} ${s.fi}`}>7 jours. 7 accélérations. 1 transformation.</div>
          <div className={s.jours}>
            <div className={`${s.jour} ${s.fi}`}><div className={s.jNum}>J1</div><div className={s.jIco}>🎯</div><h4>Pitch &amp; cadrage</h4><p>Chaque porteur pitch son projet. Feedback immédiat.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD1}`}><div className={s.jNum}>J2</div><div className={s.jIco}>🏛️</div><h4>Institutions</h4><p>APIX, DER/FJ, FAISE, ADEPME. Face à face.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD2}`}><div className={s.jNum}>J3</div><div className={s.jIco}>🏦</div><h4>Banques</h4><p>Comptes, financement, dispositifs diaspora.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD3}`}><div className={s.jNum}>J4</div><div className={s.jIco}>💼</div><h4>Entrepreneurs</h4><p>5+ qui ont réussi. Retour d&apos;expérience brut.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD4}`}><div className={s.jNum}>J5</div><div className={s.jIco}>🛤️</div><h4>Terrain</h4><p>Visites, expert foncier, prestataires locaux.</p></div>
            <div className={`${s.jour} ${s.fi} ${s.fiD5}`}><div className={s.jNum}>J6</div><div className={s.jIco}>📊</div><h4>Business plan</h4><p>Atelier intensif avec Roseline. Document final.</p></div>
            <div className={`${s.jour} ${s.fi}`}><div className={s.jNum}>J7</div><div className={s.jIco}>🚀</div><h4>Pitch final</h4><p>Jury d&apos;experts. Roadmap. Alumni. C&apos;est parti.</p></div>
          </div>
        </div>
      </section>

      {/* GAINS */}
      <section className={s.gains}>
        <div className={s.gainsIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#FF6B35' }}>Ce que vous repartez avec</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>Pas des promesses. Des livrables.</div>
          <div className={s.gainGrid}>
            <div className={`${s.gain} ${s.fi}`}><div className={s.gIco}>📋</div><h4>Roadmap 6 mois</h4><p>Plan d&apos;action personnalisé, chiffré, séquencé.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD1}`}><div className={s.gIco}>🤝</div><h4>15+ contacts clés</h4><p>Décideurs, entrepreneurs, institutions.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD2}`}><div className={s.gIco}>📈</div><h4>Business plan validé</h4><p>Confronté au terrain et au jury.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD3}`}><div className={s.gIco}>💬</div><h4>Feedback jury</h4><p>Experts et investisseurs. Sans filtre.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD4}`}><div className={s.gIco}>👥</div><h4>Communauté alumni</h4><p>Groupe privé à vie. Entraide.</p></div>
            <div className={`${s.gain} ${s.fi} ${s.fiD5}`}><div className={s.gIco}>📞</div><h4>3 mois de suivi</h4><p>Visio mensuelle avec Roseline.</p></div>
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
              Depuis 10 ans, je reçois le même message :{' '}
              <strong>« Roseline, j&apos;ai un projet au Sénégal. Mais je ne sais pas par où commencer. »</strong>
            </p>
            <p>J&apos;ai vu des dizaines de projets mourir. Pas par manque d&apos;argent. Par manque de réseau, d&apos;information, de méthode.</p>
            <p>
              Back to Senegal, c&apos;est 7 jours pour vous donner ce que j&apos;ai mis 10 ans à construire. Un carnet d&apos;adresses. Une méthode. Et la confiance que <strong>votre projet est faisable</strong>.
            </p>
            <div className={s.sig}>— Roseline</div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className={s.prix}>
        <div className={s.prixIn}>
          <div className={`${s.label} ${s.fi}`}>L&apos;investissement</div>
          <div className={`${s.stitle} ${s.fi}`}>
            La valeur de 2 ans de démarches.<br />En 7 jours. Pour 3 800€.
          </div>
          <div className={`${s.prixCard} ${s.fi}`}>
            <div className={s.prixBreakdown}>
              <div className={s.pbRow}><div className={s.pbL}>Hébergement 7 nuits (4★)</div><div className={s.pbV}>1 400€</div></div>
              <div className={s.pbRow}><div className={s.pbL}>Repas complets 7 jours</div><div className={s.pbV}>560€</div></div>
              <div className={s.pbRow}><div className={s.pbL}>Transports internes</div><div className={s.pbV}>350€</div></div>
              <div className={s.pbRow}><div className={s.pbL}>15+ rencontres organisées</div><div className={s.pbV}>2 500€</div></div>
              <div className={s.pbRow}><div className={s.pbL}>Ateliers + mentorat</div><div className={s.pbV}>1 800€</div></div>
              <div className={s.pbRow}><div className={s.pbL}>Roadmap + business plan</div><div className={s.pbV}>1 200€</div></div>
              <div className={s.pbRow}><div className={s.pbL}>3 mois de suivi</div><div className={s.pbV}>900€</div></div>
              <div className={s.pbTotal}><div className={s.pbL}>Valeur totale</div><div className={s.pbV}>8 710€</div></div>
            </div>
            <div className={s.prixFinal}>
              <div className={s.prixAmount}>3 800€</div>
              <div className={s.prixCfa}>~2 493 000 FCFA</div>
              <div className={s.prixPer}>par participant · tout compris sauf vol</div>
            </div>
            <div className={s.cohortes}>
              <div className={s.coh2}>
                <div className={s.c2Date}>Février 2027</div>
                <div className={s.c2Info}>Cohorte 1</div>
                <div className={`${s.c2Places} ${s.hot}`}>⚡ 12 places</div>
              </div>
              <div className={s.coh2}>
                <div className={s.c2Date}>Juillet 2027</div>
                <div className={s.c2Info}>Cohorte 2</div>
                <div className={`${s.c2Places} ${s.open}`}>✓ 12 places</div>
              </div>
            </div>
            <a href="#candidature" className={s.prixCta}>Candidater maintenant →</a>
            <div className={s.prixMicro}>Candidature gratuite · Sélection sur dossier · Paiement en 2 fois possible</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.faq}>
        <div className={s.faqIn}>
          <div className={`${s.label} ${s.fi}`}>Questions fréquentes</div>
          <div className={`${s.stitle} ${s.fi}`}>Tout savoir avant de candidater</div>
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

      {/* FORMULAIRE */}
      <section className={s.form} id="candidature">
        <div className={s.fmIn}>
          <div className={`${s.fmHead} ${s.fi}`}>
            <div className={s.label} style={{ color: '#FF6B35' }}>Candidature</div>
            <h2>Rejoignez Back to Senegal</h2>
            <p>12 places par cohorte. Sélection sur dossier.</p>
          </div>
          <div className={`${s.fmBar} ${s.fi}`}>
            <div className={`${s.fmS} ${s.on}`} />
            <div className={`${s.fmS} ${s.on}`} />
            <div className={`${s.fmS} ${s.on}`} />
          </div>
          <form className={`${s.fc} ${s.fi}`} onSubmit={(e) => e.preventDefault()}>
            <div className={s.fr}>
              <div><label>Prénom *</label><input type="text" placeholder="Votre prénom" /></div>
              <div><label>Nom *</label><input type="text" placeholder="Votre nom" /></div>
            </div>
            <div className={s.fr}>
              <div><label>Email *</label><input type="email" placeholder="votre@email.com" /></div>
              <div><label>WhatsApp *</label><input type="tel" placeholder="+33 6 XX XX XX XX" /></div>
            </div>
            <label>Ville *</label>
            <input type="text" placeholder="Paris, Bruxelles, Montréal..." />
            <label>Cohorte souhaitée *</label>
            <select defaultValue="">
              <option value="">Choisir...</option>
              <option>Cohorte 1 — Février 2027</option>
              <option>Cohorte 2 — Juillet 2027</option>
              <option>Peu importe</option>
            </select>
            <label>Type de projet *</label>
            <select defaultValue="">
              <option value="">Choisir...</option>
              <option>Hôtellerie / Lodge</option>
              <option>Restauration</option>
              <option>Agence de voyage</option>
              <option>Projet culturel</option>
              <option>Digital / Tech</option>
              <option>Investissement</option>
              <option>Autre</option>
            </select>
            <label>Maturité du projet *</label>
            <select defaultValue="">
              <option value="">Choisir...</option>
              <option>Idée en réflexion</option>
              <option>Projet structuré</option>
              <option>Déjà lancé</option>
              <option>Capital disponible</option>
            </select>
            <label>Budget estimé</label>
            <select defaultValue="">
              <option value="">Choisir...</option>
              <option>- de 50K€</option>
              <option>50K – 150K€</option>
              <option>150K – 500K€</option>
              <option>+ de 500K€</option>
            </select>
            <label>Votre projet et motivation *</label>
            <textarea placeholder="Décrivez votre projet, votre parcours, pourquoi Back to Senegal..." />
            <button className={s.fs} type="submit">Soumettre ma candidature →</button>
            <div className={s.fmi}>Gratuit. Sans engagement. Réponse sous 48h.</div>
          </form>
          <div className={`${s.fmCt} ${s.fi}`}>
            <a href="https://wa.me/33650329808">📱 WhatsApp</a>
            <a href="mailto:roselinediouma@gmail.com">✉️ Email</a>
            <a href="https://calendly.com/roselinengom/decouverte-15min">📅 Appel 15 min</a>
          </div>
        </div>
      </section>

      <Footer />

      <a href="#candidature" className={`${s.fl} ${floatShow ? s.sh : ''}`}>
        <span className={s.pu} />
        12 places — Candidater
      </a>
    </div>
  )
}
