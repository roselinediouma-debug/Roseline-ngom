'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

export default function RetourAuxSourcesPage() {
  const [floatShow, setFloatShow] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

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
    { q: 'Le vol est-il inclus ?', a: "Non. Le vol international n'est pas inclus pour vous laisser la liberté de choisir votre compagnie. On vous conseille sur les meilleures options." },
    { q: 'Mes enfants peuvent-ils venir ?', a: "Absolument, c'est même recommandé. -30% pour les -12 ans. Gratuit pour les -2 ans." },
    { q: 'Je suis seul(e), c\'est possible ?', a: 'Bien sûr. Beaucoup partent en solo. Supplément chambre individuelle : 450€ (~295 000 FCFA).' },
    { q: 'Quel niveau de confort ?', a: 'Hôtels 3-4★ à Dakar et Saint-Louis. Écolodges confortables au Sine Saloum. Climatisation partout.' },
    { q: 'Comment se passe le paiement ?', a: 'Acompte à la réservation. Solde 45-60 jours avant. Virement EUR/FCFA ou Stripe.' },
    { q: 'Et si je dois annuler ?', a: 'Early Bird : gratuit jusqu\'à J-90. Normal : gratuit jusqu\'à J-60. Dernière Minute : non remboursable.' },
    { q: 'Roseline est-elle présente ?', a: 'Oui. Personnellement. Sur chaque départ. Du jour 1 au jour 14.' },
    { q: 'Mon conjoint(e) n\'est pas africain(e) ?', a: "Parfaitement adapté. C'est souvent le conjoint non-africain qui est le plus ému." },
  ]

  return (
    <div ref={rootRef} className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <Image src="/images/senegal/hero.jpg" alt="Retour aux Sources — Sénégal" fill priority sizes="100vw" />
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
              <span>14 jours</span>
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
              <span>🌍 Dès 2 200€ · ~1,4M FCFA</span>
              <span>👪 Groupe 8-15 pers.</span>
              <span>☀️ Juil. · Août · Déc. 2026</span>
            </div>
            <div className={s.heroBtns}>
              <a href="#reservation" className={s.bg}>RÉSERVER MA PLACE →</a>
              <a href="#programme" className={s.bo}>Voir le programme</a>
            </div>
            <div className={s.heroUrgency}>
              <div className={s.hu}>
                <div className={s.dot} />
                <span>Départ juillet 2026 : <strong>6 places restantes sur 15</strong></span>
              </div>
            </div>
          </div>

          <div className={s.heroCard}>
            <h3>Infos rapides</h3>
            <div className={s.hcRow}><div className={s.hcIcon}>📅</div><div><div className={s.hcLabel}>Durée</div><div className={s.hcValue}>14 jours · <em>5 régions</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>👪</div><div><div className={s.hcLabel}>Format</div><div className={s.hcValue}>Groupe 8-15 personnes</div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>⭐</div><div><div className={s.hcLabel}>Avis voyageurs</div><div className={s.hcValue}>4.9/5 · <em>2 000+ voyageurs</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>💰</div><div><div className={s.hcLabel}>Tarif Early Bird</div><div className={s.hcValue}>2 200€ · <em>~1,4M FCFA</em></div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>✅</div><div><div className={s.hcLabel}>Inclus</div><div className={s.hcValue}>Hébergement, repas, transport</div></div></div>
            <div className={s.hcRow}><div className={s.hcIcon}>🧑‍💼</div><div><div className={s.hcLabel}>Votre guide</div><div className={s.hcValue}>Roseline Ngom · <em>100% présente</em></div></div></div>
            <a href="#reservation" className={s.hcCta}>Devis séjour gratuit →</a>
          </div>
        </div>
      </section>

      {/* URGENCE BAR */}
      <div className={s.ub}><p>⚡ Les départs de juillet et août 2026 se remplissent. 9 des 15 places sont déjà réservées. <a href="#reservation">Réserver maintenant</a></p></div>

      {/* EMOTION */}
      <section className={s.emo}>
        <div className={s.emoIn}>
          <div className={`${s.label} ${s.fi}`}>Plus qu&apos;un voyage</div>
          <div className={`${s.stitle} ${s.fi}`}>Ce n&apos;est pas un circuit touristique.<br />C&apos;est une reconnexion.</div>
          <div className={`${s.emoTx} ${s.fi}`}>
            <p>Il y a des voyages qu&apos;on fait pour les photos. Et il y a ceux qui vous transforment.</p>
            <p><strong>Retour aux Sources n&apos;est pas une visite guidée du Sénégal.</strong> C&apos;est une immersion de 14 jours conçue pour la diaspora africaine. Pour ceux qui portent un pays dans le cœur sans toujours savoir comment y retourner.</p>
            <p>Pendant 14 jours, vous allez marcher où vos grands-parents ont marché. Goûter ce qu&apos;ils ont goûté. Entendre ce qu&apos;ils ont voulu vous transmettre. <strong>Et vos enfants verront, avec leurs propres yeux, d&apos;où ils viennent.</strong></p>
            <p>Ce n&apos;est pas du tourisme. C&apos;est un acte de transmission. Et ça change tout.</p>
          </div>
          <div className={`${s.eq} ${s.fi}`}>« Quand mon fils de 8 ans a touché le sable de la plage où son grand-père a grandi, j&apos;ai compris pourquoi j&apos;avais fait ce voyage. »</div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className={s.prog} id="programme">
        <div className={s.progIn}>
          <div className={`${s.label} ${s.fi}`}>Le programme</div>
          <div className={`${s.stitle} ${s.fi}`}>14 jours. 5 étapes. 1 transformation.</div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className={s.pq}>
        <div className={s.pqIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Pour qui</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>Ce voyage est fait pour vous si...</div>
          <div className={s.pqg}>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic}>👪</div><h3>Vous voulez transmettre vos racines</h3><p>Vos enfants grandissent en France, en Belgique, au Canada. Ils entendent parler du Sénégal mais ne l&apos;ont jamais vécu. Ce voyage est pour eux autant que pour vous.</p></div>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic}>🏠</div><h3>Vous n&apos;y êtes pas retourné(e)</h3><p>5 ans, 10 ans, 20 ans. Vous ne savez plus par où commencer. On s&apos;occupe de tout. Vous n&apos;avez qu&apos;à vivre.</p></div>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic}>❤️</div><h3>Votre conjoint(e) ne connaît pas</h3><p>Il/elle n&apos;est pas d&apos;origine sénégalaise. Vous voulez lui montrer d&apos;où vous venez. Ce voyage sera votre plus beau cadeau.</p></div>
            <div className={`${s.pqc} ${s.fi}`}><div className={s.ic}>🤝</div><h3>Vous voulez voyager en communauté</h3><p>Pas seul dans un hôtel anonyme. Avec 8 à 15 personnes qui partagent la même histoire, les mêmes questions, la même envie.</p></div>
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
              <h3>✓ Inclus</h3>
              <ul>
                <li>Hébergement 13 nuits (hôtels 3-4★ et écolodges)</li>
                <li>Transports internes (minibus climatisé + pirogues)</li>
                <li>Petit-déjeuner et dîner chaque jour</li>
                <li>Toutes les excursions et entrées</li>
                <li>Guide francophone dédié 14 jours</li>
                <li>Roseline présente sur chaque départ</li>
                <li>Assurance voyage complète</li>
                <li>Support WhatsApp 24/7</li>
                <li>Album photo numérique professionnel</li>
              </ul>
            </div>
            <div className={`${s.ic} ${s.icNon}`}>
              <h3>✗ Non inclus</h3>
              <ul>
                <li>Vol international aller-retour</li>
                <li>Déjeuners (~5 000 FCFA/jour)</li>
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
          <div className={s.pxg}>
            <div className={`${s.px} ${s.fi}`}>
              <div className={s.tp}>Early Bird</div>
              <div className={s.am}>2 200€</div>
              <div className={s.cf}>~1 443 000 FCFA</div>
              <div className={s.pr}>par personne, base double</div>
              <div className={s.dt}>✓ Réservation 4+ mois avant<br />✓ Acompte 500€<br />✓ Annulation gratuite J-90</div>
            </div>
            <div className={`${s.px} ${s.ft} ${s.fi}`}>
              <div className={s.tp}>Tarif Normal</div>
              <div className={s.am}>2 600€</div>
              <div className={s.cf}>~1 706 000 FCFA</div>
              <div className={s.pr}>par personne, base double</div>
              <div className={s.dt}>✓ Réservation 2-4 mois avant<br />✓ Acompte 700€<br />✓ Annulation gratuite J-60</div>
            </div>
            <div className={`${s.px} ${s.fi}`}>
              <div className={s.tp}>Dernière Minute</div>
              <div className={s.am}>3 000€</div>
              <div className={s.cf}>~1 968 000 FCFA</div>
              <div className={s.pr}>par personne, base double</div>
              <div className={s.dt}>✓ Moins de 2 mois avant<br />✓ Paiement intégral<br />✓ Non remboursable</div>
            </div>
          </div>
          <div className={`${s.enf} ${s.fi}`}>
            <span>👶 Enfants -12 ans : -30% · Bébés -2 ans : gratuit</span>
          </div>
        </div>
      </section>

      {/* DATES */}
      <section className={s.dat}>
        <div className={s.datIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Les départs</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>3 dates. Places limitées.</div>
          <div className={s.dg}>
            <div className={`${s.dc} ${s.fi}`}>
              <div className={s.mo}>Juillet</div>
              <div className={s.yr}>2026</div>
              <div className={s.rg}>5 au 18 juillet</div>
              <div className={`${s.pl} ${s.plFw}`}>⚡ 6 places restantes</div>
              <div className={`${s.st} ${s.sf}`}>Se remplit vite</div>
            </div>
            <div className={`${s.dc} ${s.fi}`}>
              <div className={s.mo}>Août</div>
              <div className={s.yr}>2026</div>
              <div className={s.rg}>2 au 15 août</div>
              <div className={`${s.pl} ${s.plOk}`}>✓ 10 places</div>
              <div className={`${s.st} ${s.so}`}>Ouvert</div>
            </div>
            <div className={`${s.dc} ${s.fi}`}>
              <div className={s.mo}>Décembre</div>
              <div className={s.yr}>2026</div>
              <div className={s.rg}>20 déc. au 2 janv.</div>
              <div className={`${s.pl} ${s.plOk}`}>✓ 12 places</div>
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

      {/* FORMULAIRE */}
      <section className={s.form} id="reservation">
        <div className={s.fmIn}>
          <div className={`${s.fmL} ${s.fi}`}>
            <div className={s.label}>Réservation</div>
            <h2>Réservez votre place<br />pour l&apos;été <em>2026</em></h2>
            <p>Remplissez ce formulaire et nous vous recontacterons sous 24h pour finaliser votre inscription.</p>
            <p>Le groupe est limité à 15 personnes maximum par départ. Une fois complet, nous ouvrons une liste d&apos;attente.</p>
            <div className={s.ub2}>
              <div className={s.dot} />
              <span>Juillet : <strong>6 places</strong> · Août : 10 places · Décembre : 12 places</span>
            </div>
            <div className={s.ca}>
              <a href="https://wa.me/33650329808">📱 WhatsApp : +33 6 50 32 98 08</a>
              <a href="mailto:roselinediouma@gmail.com">✉️ roselinediouma@gmail.com</a>
              <a href="https://calendly.com/roselinengom/decouverte-15min">📅 Réserver un appel de 15 min</a>
            </div>
          </div>
          <form className={`${s.fc} ${s.fi}`} onSubmit={(e) => e.preventDefault()}>
            <h3>Formulaire de réservation</h3>
            <div className={s.fr}>
              <div><label>Prénom *</label><input type="text" placeholder="Votre prénom" /></div>
              <div><label>Nom *</label><input type="text" placeholder="Votre nom" /></div>
            </div>
            <div className={s.fr}>
              <div><label>Email *</label><input type="email" placeholder="votre@email.com" /></div>
              <div><label>WhatsApp *</label><input type="tel" placeholder="+33 6 XX XX XX XX" /></div>
            </div>
            <label>Départ souhaité *</label>
            <select defaultValue="">
              <option value="">Choisir une date...</option>
              <option>Juillet 2026 (5-18 juil.) — 6 places</option>
              <option>Août 2026 (2-15 août) — 10 places</option>
              <option>Décembre 2026 (20 déc.-2 janv.) — 12 places</option>
            </select>
            <div className={s.fr}>
              <div>
                <label>Adultes *</label>
                <select defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option></select>
              </div>
              <div>
                <label>Enfants</label>
                <select defaultValue="0"><option>0</option><option>1</option><option>2</option><option>3</option><option>4+</option></select>
              </div>
            </div>
            <label>Ville de résidence</label>
            <input type="text" placeholder="Paris, Bruxelles, Montréal..." />
            <label>Message</label>
            <textarea placeholder="Ce qui vous motive, vos questions..." />
            <button className={s.fs} type="submit">Réserver ma place →</button>
            <div className={s.fmi}>Vous n&apos;êtes pas encore engagé(e). Nous vous recontacterons sous 24h.</div>
          </form>
        </div>
      </section>

      <Footer />

      <a href="#reservation" className={`${s.fl} ${floatShow ? s.sh : ''}`}>
        <span className={s.pu} />
        Places limitées — Réserver
      </a>
    </div>
  )
}
