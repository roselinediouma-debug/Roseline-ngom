'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

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

export default function DigitalIaPage() {
  const r1 = useReveal<HTMLDivElement>()
  const r2 = useReveal<HTMLDivElement>()
  const r3 = useReveal<HTMLDivElement>()
  const r4 = useReveal<HTMLDivElement>()

  return (
    <div className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroGlow}></div>
        <div className={s.heroGlow2}></div>
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <div className={s.pill}><div className={s.dot}></div><span>Digital &amp; Intelligence Artificielle</span></div>
            <h1>Pendant que vous hésitez,<br />vos concurrents<br /><em>automatisent.</em></h1>
            <p className={s.sub}>
              Hôtels, agences de voyage, lodges, restaurants, opérateurs culturels : vos concurrents installent des chatbots IA qui répondent en 10 secondes. Ils automatisent leurs devis, leurs relances, leur contenu. <strong>Ils captent vos clients. Chaque. Jour.</strong>
            </p>
            <div className={s.heroBtns}>
              <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Audit flash gratuit →</a>
              <a href="#solutions" className={s.btnOutline}>Voir les offres</a>
            </div>
            <div className={s.heroProof}>
              <div className={s.metric}><div className={s.n}>+300%</div><div className={s.l}>de réservations en ligne</div></div>
              <div className={s.sep}></div>
              <div className={s.metric}><div className={s.n}>15h</div><div className={s.l}>économisées par semaine</div></div>
              <div className={s.sep}></div>
              <div className={s.metric}><div className={s.n}>24/7</div><div className={s.l}>réponse automatique</div></div>
            </div>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroPortrait}>
              <Image src="/images/roseline-portrait-2.jpg" alt="Roseline Ngom" width={340} height={510} priority style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* URGENCE BAR */}
      <div className={s.urgence}>
        <p>⚡ ALERTE : En 2026, un hôtel, un lodge ou une agence sans stratégie digitale perd en moyenne 30 à 50 clients par mois. À 80 000 FCFA la nuit, c&apos;est 2,4 à 4 millions FCFA qui s&apos;évaporent. Chaque mois.</p>
      </div>

      {/* PROBLEME */}
      <section className={s.probleme}>
        <div className={s.problemeIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={r1}>Le constat</div>
          <div className={s.secTitle}>Votre service est exceptionnel.<br />Mais votre digital vous rend invisible.</div>
          <div className={s.secSub}>
            Soyons honnêtes. Pendant que vous lisez cette page, un voyageur vient de chercher votre établissement ou votre agence sur Google. Il n&apos;a rien trouvé. Ou il a trouvé un site lent, pas à jour, sans possibilité de réserver. Il est parti chez votre concurrent. En 3 clics. 30 à 50 fois par mois.
          </div>
          <div className={s.probGrid}>
            <div className={s.prob}><div className={s.icon}>🚫</div><h3>Site web obsolète ou inexistant</h3><p>Pas responsive, pas de réservation en ligne, pas de SEO. Vous êtes invisible. Vos concurrents qui ont un site moderne captent VOS clients.</p></div>
            <div className={s.prob}><div className={s.icon}>⏰</div><h3>DM et emails sans réponse</h3><p>Vous répondez en 48h. L&apos;agence concurrente répond en 10 secondes via son chatbot. Avec le nom du client, ses dates, son budget. Le devis part automatiquement.</p></div>
            <div className={s.prob}><div className={s.icon}>📉</div><h3>Zéro data, zéro visibilité</h3><p>Combien de réservations avez-vous perdues ce mois-ci ? Vous ne savez pas. Parce que vous n&apos;avez aucun outil pour le mesurer. Vous pilotez à l&apos;aveugle.</p></div>
            <div className={s.prob}><div className={s.icon}>🤷</div><h3>L&apos;IA ? C&apos;est pour les autres.</h3><p>ChatGPT, Claude, N8N, automations. Vos concurrents les utilisent déjà pour générer du contenu, qualifier des leads, répondre aux clients. L&apos;écart se creuse chaque semaine.</p></div>
            <div className={s.prob}><div className={s.icon}>💸</div><h3>Budget pub sans résultat</h3><p>Vous avez jeté 500 EUR dans Facebook Ads. Résultat : 0 réservation. Sans funnel, sans landing page, sans retargeting, la pub payante est de l&apos;argent brûlé.</p></div>
            <div className={s.prob}><div className={s.icon}>👨‍💻</div><h3>Le CM qui ne connaît pas votre métier</h3><p>Votre CM poste 3 photos par semaine. Jolies, oui. Mais zéro stratégie, zéro conversion, zéro mesure. Un CM sans stratégie sectorielle est de l&apos;argent jeté.</p></div>
          </div>
        </div>
      </section>

      {/* LOST */}
      <section className={s.lost}>
        <div className={s.lostIn}>
          <div className={s.secLabel} style={{ color: '#EF4444' }}>Ce que l&apos;inaction vous coûte réellement</div>
          <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 30, color: 'white', fontWeight: 500, marginBottom: 30, lineHeight: 1.2 }}>
            Calculons ensemble ce que vous perdez <em style={{ color: '#F6C961', fontStyle: 'italic' }}>chaque mois</em>.
          </div>
          <div className={s.lostGrid}>
            <div className={s.lostCard}><div className={s.lostNum}>30-50</div><div className={s.lostLabel}>clients perdus par mois<br />(réservations, devis, demandes d&apos;info)</div></div>
            <div className={s.lostCard}><div className={s.lostNum}>2,4M – 4M</div><div className={s.lostLabel}>FCFA de CA qui s&apos;évapore<br />chaque mois (hôtel, agence ou resto)</div></div>
            <div className={s.lostCard}><div className={s.lostNum}>28,8M – 48M</div><div className={s.lostLabel}>FCFA perdus sur 12 mois<br />Bien plus que le coût de la solution.</div></div>
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            La formule Présence Digitale coûte 985 000 FCFA/mois. Elle vous en fait gagner 2,4M minimum. <span style={{ color: '#F6C961', fontWeight: 600 }}>ROI : 2,4x dès le premier mois.</span>
          </div>
        </div>
      </section>

      {/* TRANSITION */}
      <section className={s.transition}>
        <p>Vos concurrents ne vont pas vous attendre.<br />En <em>90 jours</em>, votre digital peut devenir<br />votre <em>machine à clients</em>.</p>
      </section>

      {/* SOLUTIONS */}
      <section className={s.solutions} id="solutions">
        <div className={s.solutionsIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={r2}>Les solutions</div>
          <div className={s.secTitle}>Quatre formules. Un seul objectif :<br />que le digital travaille pour vous.</div>
          <div className={s.secSub}>
            Du pilotage mensuel de vos réseaux à l&apos;installation d&apos;agents IA qui qualifient vos clients 24h/24. Choisissez le niveau qui vous correspond.
          </div>
          <div className={s.solGrid}>
            <div className={s.sol}>
              <div className={s.visual}><div className={s.num}>01</div><div className={s.icon}>📱</div><div className={s.price}>1 500 € / mois</div><div className={s.priceSub}>Engagement 6 mois minimum</div></div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagRecurrent}>Récurrent</span><span className={s.tagFormation}>Plug &amp; play</span></div>
                <h3>Présence Digitale</h3>
                <p>Votre communication digitale pilotée tous les mois. Hôtel, agence, lodge, restaurant ou opérateur culturel : nous adaptons la stratégie à votre métier et à votre saisonnalité.</p>
                <ul>
                  <li>Stratégie éditoriale mensuelle adaptée à votre secteur</li>
                  <li>12 visuels + 4 reels créés et publiés par mois</li>
                  <li>Community management (réponses DM sous 4h)</li>
                  <li>Reporting mensuel avec métriques et recommandations</li>
                  <li>1 visio stratégique par mois (1h)</li>
                  <li>Support WhatsApp continu</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Planifier un audit flash gratuit →</a>
              </div>
            </div>
            <div className={s.sol}>
              <div className={s.visual}><div className={s.num}>02</div><div className={s.icon}>🚀</div><div className={s.price}>8 500 – 15 000 €</div><div className={s.priceSub}>~5,5M – 9,8M FCFA · Projet sur 3 mois</div></div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagProjet}>Projet</span><span className={s.tagFormation}>Transformation</span></div>
                <h3>Transformation Digitale</h3>
                <p>En 3 mois, on transforme votre présence digitale de A à Z. Site professionnel, système de réservation ou de devis en ligne, CRM, automations.</p>
                <ul>
                  <li>Audit digital complet + benchmark concurrence</li>
                  <li>Refonte ou création de site web professionnel</li>
                  <li>Système de réservation en ligne intégré</li>
                  <li>CRM + automations email (confirmation, relance, fidélisation)</li>
                  <li>Formation de votre équipe (2 sessions de 2h)</li>
                  <li>30 jours de support post-lancement inclus</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Discuter de votre projet →</a>
              </div>
            </div>
            <div className={s.sol}>
              <div className={s.visual}><div className={s.num}>03</div><div className={s.icon}>🤖</div><div className={s.price}>3 500 – 12 000 €</div><div className={s.priceSub}>~2,3M – 7,9M FCFA · Selon complexité</div></div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagProjet}>Projet</span><span className={s.tagRecurrent}>Intelligence Artificielle</span></div>
                <h3>IA Appliquée</h3>
                <p>Des agents intelligents qui travaillent pour vous. 24h/24. Chatbots, devis automatisés, génération de contenu. Pendant que vous dormez, votre business tourne.</p>
                <ul>
                  <li>Chatbot intelligent qui qualifie vos leads</li>
                  <li>Workflow automatisé : demande → devis → relance → conversion</li>
                  <li>Génération de contenu assistée (posts, emails, descriptions)</li>
                  <li>Analyse automatique des avis clients</li>
                  <li>Dashboard de suivi en temps réel</li>
                  <li>Formation + documentation pour votre équipe</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Identifier vos cas d&apos;usage →</a>
              </div>
            </div>
            <div className={s.sol}>
              <div className={s.visual}><div className={s.num}>04</div><div className={s.icon}>🎓</div><div className={s.price}>2 500 – 15 000 €</div><div className={s.priceSub}>~1,6M – 9,8M FCFA · 1 à 5 jours</div></div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagFormation}>Formation</span></div>
                <h3>Formations Équipe</h3>
                <p>Vous pouvez tout externaliser. Ou vous pouvez rendre votre équipe autonome. Nos formations sont conçues pour les équipes du tourisme et de la culture.</p>
                <ul>
                  <li>Masterclass IA pour le tourisme (1 jour, 2 500 €)</li>
                  <li>Formation communication digitale (2 jours, 4 000 €)</li>
                  <li>Programme sur mesure selon vos besoins</li>
                  <li>Kit de prompts IA prêts à l&apos;emploi</li>
                  <li>Communauté WhatsApp post-formation (3 mois)</li>
                  <li>Certification délivrée</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Réserver une formation →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className={s.stack}>
        <div className={s.stackIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={r3} style={{ color: '#F6C961' }}>Notre stack technique</div>
          <div className={s.secTitle} style={{ color: 'white' }}>Les outils que nous maîtrisons.<br />Pas des mots. Des résultats.</div>
          <div className={s.stackGrid}>
            <div className={s.stackItem}><div className={s.ico}>⚙️</div><div className={s.name}>N8N</div><div className={s.desc}>Automations et workflows multi-étapes sans code</div></div>
            <div className={s.stackItem}><div className={s.ico}>🗄️</div><div className={s.name}>Supabase</div><div className={s.desc}>Base de données temps réel, CRM sur mesure</div></div>
            <div className={s.stackItem}><div className={s.ico}>🤖</div><div className={s.name}>Claude &amp; OpenAI</div><div className={s.desc}>IA générative pour contenu, chatbots, analyse</div></div>
            <div className={s.stackItem}><div className={s.ico}>⚡</div><div className={s.name}>Next.js &amp; React</div><div className={s.desc}>Sites web performants, rapides, modernes</div></div>
            <div className={s.stackItem}><div className={s.ico}>📧</div><div className={s.name}>Brevo</div><div className={s.desc}>Email marketing, séquences automatisées</div></div>
            <div className={s.stackItem}><div className={s.ico}>💳</div><div className={s.name}>Stripe</div><div className={s.desc}>Paiement en ligne sécurisé</div></div>
            <div className={s.stackItem}><div className={s.ico}>📊</div><div className={s.name}>Plausible</div><div className={s.desc}>Analytics respectueux de la vie privée</div></div>
            <div className={s.stackItem}><div className={s.ico}>☁️</div><div className={s.name}>Vercel</div><div className={s.desc}>Hébergement ultra-rapide et scalable</div></div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.process}>
        <div className={s.processIn}>
          <div className={s.secLabel}>Comment ça se passe</div>
          <div className={s.secTitle}>Du premier appel à la mise en ligne.<br />En 5 étapes claires.</div>
          <div className={s.steps}>
            <div className={s.step}><div className={s.dot}>1</div><div><h3>Audit flash gratuit (30 min)</h3><p>On analyse votre situation actuelle ensemble. Site, réseaux, outils, processus. Je vous identifie 2-3 opportunités concrètes. Pas de blabla, pas de jargon.</p><div className={s.duration}>⏱ 30 minutes · Gratuit · Sans engagement</div></div></div>
            <div className={s.step}><div className={s.dot}>2</div><div><h3>Proposition sur mesure</h3><p>Dans les 5 jours, vous recevez une proposition PDF personnalisée. Objectifs, méthode, livrables, planning, prix. Tout est transparent.</p><div className={s.duration}>⏱ 5 jours ouvrés</div></div></div>
            <div className={s.step}><div className={s.dot}>3</div><div><h3>Kick-off et exécution</h3><p>On démarre. Acompte 40%, accès partagés, calendrier de travail défini. Vous savez exactement quoi attendre et quand.</p><div className={s.duration}>⏱ Selon la formule (1 semaine à 3 mois)</div></div></div>
            <div className={s.step}><div className={s.dot}>4</div><div><h3>Formation et livraison</h3><p>Chaque outil installé est accompagné d&apos;une formation et d&apos;une documentation. Vous repartez autonome, pas dépendant.</p><div className={s.duration}>⏱ 2 sessions de formation incluses</div></div></div>
            <div className={s.step}><div className={s.dot}>5</div><div><h3>Suivi et optimisation</h3><p>30 jours de support post-livraison inclus. On mesure les résultats, on ajuste, on optimise. Puis vous pouvez voler seul ou passer en formule récurrente.</p><div className={s.duration}>⏱ 30 jours inclus</div></div></div>
          </div>
        </div>
      </section>

      {/* ROSELINE */}
      <section className={s.roseline}>
        <div className={`${s.roselineIn} ${s.fi}`} ref={r4}>
          <div className={s.roselineImg}>
            <Image src="/images/roseline-portrait-1.jpg" alt="Roseline Ngom" width={420} height={560} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className={s.roselineTxt}>
            <div className={s.label}>Pourquoi moi</div>
            <h2>L&apos;experte qui code,<br /><em>qui connaît le terrain,<br />et qui parle votre langue.</em></h2>
            <p>La plupart des agences digitales ne connaissent ni le tourisme, ni la culture, ni l&apos;Afrique. Les professionnels du secteur ne maîtrisent pas l&apos;IA. Je fais les deux. Hôtels, agences de voyage, lodges, festivals, restaurants. Depuis 10 ans. Avec des résultats.</p>
            <p>Je ne vends pas de la technologie. Je vends des clients en plus, du temps en moins, et de la croissance mesurable.</p>
            <div className={s.skillsGrid}>
              <div className={s.skillTag}><div className={s.dot}></div>Automation N8N</div>
              <div className={s.skillTag}><div className={s.dot}></div>API Claude &amp; OpenAI</div>
              <div className={s.skillTag}><div className={s.dot}></div>React &amp; Next.js</div>
              <div className={s.skillTag}><div className={s.dot}></div>Supabase &amp; BDD</div>
              <div className={s.skillTag}><div className={s.dot}></div>Stratégie tourisme 10 ans</div>
              <div className={s.skillTag}><div className={s.dot}></div>Connaissance terrain Sénégal</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={s.ctaFinal}>
        <h2>Dans 6 mois, vous serez soit<br />en avance, soit <em>dépassé.</em></h2>
        <div className={s.sub}>
          L&apos;audit flash est gratuit. 30 minutes. Sans engagement. Je vous montre exactement combien de clients vous perdez chaque mois et comment les récupérer. Les places sont limitées : je n&apos;accompagne que 5 nouveaux projets par trimestre.
        </div>
        <div className={s.ctaBtns}>
          <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Réserver mon audit gratuit →</a>
          <a href="https://wa.me/33650329808" target="_blank" rel="noopener noreferrer" className={s.btnOutline}>Discuter sur WhatsApp</a>
        </div>
        <div className={s.micro}>Réponse sous 24h · +33 6 50 32 98 08 · roselinediouma@gmail.com</div>
      </section>

      <Footer />
    </div>
  )
}
