'use client'

import { useState, useEffect, useRef } from 'react'
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
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const FAQS = [
  { q: 'Combien de temps dure un audit stratégique ?', a: 'Un audit complet dure 3 semaines. Semaine 1 : collecte des données et entretiens. Semaine 2 : analyse et rédaction. Semaine 3 : finalisation et restitution en visio de 1h30.' },
  { q: 'Je suis basé en France, c\'est possible à distance ?', a: 'Absolument. 100% de mes missions peuvent se faire à distance via visio et documents partagés. Un déplacement sur site au Sénégal est possible en option (supplément 500 EUR + frais).' },
  { q: 'Comment se passe le paiement ?', a: 'Acompte de 40% à la signature du contrat. 40% à mi-parcours. 20% à la livraison finale. Paiement par virement bancaire (EUR ou FCFA) ou par Stripe.' },
  { q: 'Et si je ne suis pas satisfait ?', a: 'Je m\'engage sur des livrables concrets et mesurables. Si après la restitution vous estimez que les recommandations ne sont pas actionnables, je reprends le travail sans frais supplémentaires.' },
  { q: 'Quelle est la différence entre l\'audit et l\'accompagnement ?', a: 'L\'audit est un diagnostic ponctuel (3 semaines). Vous repartez avec un plan. L\'accompagnement est un co-pilotage dans la durée (3 à 12 mois). Je reste à vos côtés pour exécuter le plan, ajuster, et mesurer les résultats.' },
  { q: 'Est-ce que vous travaillez avec les institutions publiques ?', a: 'Oui. Ministères, offices de tourisme, agences de développement, collectivités territoriales, fondations. J\'ai une expérience directe du cadre institutionnel sénégalais et des organisations internationales.' },
  { q: 'Comment se passe la première prise de contact ?', a: 'Vous réservez un créneau de 30 minutes sur mon Calendly. C\'est gratuit, sans engagement. Je vous écoute, je vous pose des questions, et je vous dis honnêtement si je peux vous aider ou non.' },
  { q: 'Combien de clients accompagnez-vous en même temps ?', a: 'Je limite volontairement à 5 accompagnements simultanés maximum. La qualité de mon travail dépend du temps que je consacre à chaque projet. Je préfère refuser un client que de mal le servir.' },
]

export default function ConsultingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const labelRef = useReveal<HTMLDivElement>()
  const titleRef = useReveal<HTMLDivElement>()
  const subRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()
  const citRef = useReveal<HTMLParagraphElement>()

  return (
    <div className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroLine}></div>
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <div className={s.pill}><span>Consulting stratégique</span></div>
            <h1>Vous avez la vision.<br />Il vous manque<br /><em>la stratégie.</em></h1>
            <p className={s.sub}>Audit, accompagnement et conseil pour les acteurs du tourisme, de la culture et les institutions au Sénégal et en Afrique de l&apos;Ouest. De la vision à l&apos;exécution.</p>
            <div className={s.heroBtns}>
              <a href="https://calendly.com/roselinengom/decouverte-15min" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Réserver un échange de 30 min</a>
              <a href="#offres" className={s.btnOutline}>Voir les offres →</a>
            </div>
            <div className={s.heroMetrics}>
              <div className={s.m}><div className={s.n}>10 ans</div><div className={s.l}>de terrain au Sénégal</div></div>
              <div className={s.m}><div className={s.n}>50+</div><div className={s.l}>projets accompagnés</div></div>
              <div className={s.m}><div className={s.n}>3</div><div className={s.l}>continents couverts</div></div>
            </div>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroPortrait}>
              <Image src="/images/roseline-portrait-3.jpg" alt="Roseline Ngom" width={340} height={510} priority style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      <div className={s.cred}>
        <span>Fondatrice TripAfro · Master Finance INSEEC · Consultante tourisme &amp; développement · 10 ans d&apos;expertise Afrique de l&apos;Ouest</span>
      </div>

      {/* CONSTAT */}
      <section className={s.constat}>
        <div className={s.constatIn}>
          <div className={`${s.label} ${s.fi}`} ref={labelRef}>Le constat</div>
          <div className={`${s.stitle} ${s.fi}`} ref={titleRef}>
            Les projets qui échouent n&apos;échouent pas par manque d&apos;idées.<br />Ils échouent par manque de méthode.
          </div>
          <div className={`${s.ssub} ${s.fi}`} ref={subRef}>
            Depuis 10 ans, je vois les mêmes schémas se répéter. Des porteurs de projets brillants qui avancent sans carte. Des acteurs établis qui stagnent sans comprendre pourquoi. Des institutions qui financent sans mesurer.
          </div>
          <div className={`${s.constatGrid} ${s.fi}`} ref={gridRef}>
            <div className={s.constatCard}><div className={s.num}>01</div><h3>Vous avez un projet mais pas de roadmap</h3><p>Un lodge, une agence, un restaurant, un festival. L&apos;idée est là, le financement aussi parfois. Mais le plan d&apos;action chiffré, séquencé, réaliste ? Il manque. Et sans lui, chaque décision est un pari.</p></div>
            <div className={s.constatCard}><div className={s.num}>02</div><h3>Vous investissez sans visibilité</h3><p>Vous engagez des fonds importants sans étude de marché, sans benchmark, sans analyse de la concurrence. Vous construisez sur du sable. Et quand les premiers vents arrivent, tout vacille.</p></div>
            <div className={s.constatCard}><div className={s.num}>03</div><h3>Vous êtes seul face aux institutions</h3><p>Au Sénégal, les dispositifs existent. Les financements aussi. Mais vous ne savez pas à qui parler, quels dossiers préparer, quelles portes pousser. Le système est opaque pour ceux qui ne le connaissent pas de l&apos;intérieur.</p></div>
            <div className={s.constatCard}><div className={s.num}>04</div><h3>Votre activité a démarré mais stagne</h3><p>Le lancement est fait. Les premiers clients sont venus. Et puis, plateau. Vous ne savez pas pourquoi ça ne décolle pas. Votre positionnement, votre pricing, votre distribution, votre communication : quelque chose bloque. Mais quoi ?</p></div>
          </div>
        </div>
      </section>

      <section className={s.citation}>
        <p className={s.fi} ref={citRef}>
          Mon rôle n&apos;est pas de rêver à votre place.<br />C&apos;est de transformer votre rêve en <em>plan d&apos;action chiffré, séquencé, exécutable.</em>
        </p>
      </section>

      {/* OFFRES */}
      <section className={s.offres} id="offres">
        <div className={s.offresIn}>
          <div className={s.label}>Les offres</div>
          <div className={s.stitle}>Trois niveaux d&apos;accompagnement.<br />Un seul standard : l&apos;exécution.</div>
          <div className={s.ssub}>Que vous soyez en phase de réflexion, de lancement ou de croissance, il existe une formule adaptée à votre étape.</div>

          <div className={s.offre}>
            <div className={s.side}>
              <div className={s.num}>01</div><div className={s.icon}>🔍</div>
              <div className={s.price}>1 800 €</div><div className={s.priceCfa}>~1 180 000 FCFA</div>
              <div className={s.duration}>3 semaines</div>
            </div>
            <div className={s.body}>
              <div className={s.tags}><span className={s.tagAudit}>Diagnostic</span><span className={s.tagAudit}>Roadmap</span></div>
              <h3>Audit Stratégique</h3>
              <p>Avant de prendre une décision importante, il vous faut un regard extérieur qui connaît votre marché. En 3 semaines, je vous livre un diagnostic complet avec des recommandations actionnables et une feuille de route à 6 mois. Pas un document de 200 pages. Un plan qui sert à décider.</p>
              <ul>
                <li>Analyse de positionnement (marché, concurrence, différenciation)</li>
                <li>Audit de l&apos;offre actuelle (forces, faiblesses, opportunités)</li>
                <li>Analyse digitale (site, réseaux, funnel, e-réputation)</li>
                <li>Analyse commerciale (pricing, canaux, taux de conversion)</li>
                <li>5 recommandations stratégiques prioritaires, chiffrées et argumentées</li>
                <li>Roadmap à 6 mois avec actions concrètes et responsables</li>
                <li>Restitution en visio (1h30) avec session de questions</li>
              </ul>
              <a href="https://calendly.com/roselinengom/decouverte-15min" target="_blank" rel="noopener noreferrer">Planifier un échange →</a>
            </div>
          </div>

          <div className={s.offre}>
            <div className={s.side}>
              <div className={s.num}>02</div><div className={s.icon}>🧭</div>
              <div className={s.price}>3 500 – 10 000 €</div><div className={s.priceCfa}>~2,3M – 6,6M FCFA</div>
              <div className={s.duration}>3 à 12 mois</div>
            </div>
            <div className={s.body}>
              <div className={s.tags}><span className={s.tagAccomp}>Co-pilotage</span><span className={s.tagAccomp}>Livrables</span></div>
              <h3>Accompagnement de Projet</h3>
              <p>Un projet ne meurt jamais d&apos;une mauvaise idée. Il meurt d&apos;une mauvaise exécution. Je suis votre co-pilote. Je ne fais pas le travail à votre place. Je le fais avec vous. Visios bimensuelles, livrables concrets, mise en relation avec mon réseau. Jusqu&apos;à ce que ça marche.</p>
              <div className={s.subFormules}>
                <div className={s.subF}><div className={s.fname}>Compact</div><div className={s.fprice}>3 500 €</div><div className={s.fcfa}>~2,3M FCFA</div><div className={s.fdur}>3 mois · 6 visios</div></div>
                <div className={s.subF}><div className={s.fname}>Standard</div><div className={s.fprice}>6 000 €</div><div className={s.fcfa}>~3,9M FCFA</div><div className={s.fdur}>6 mois · 12 visios</div></div>
                <div className={s.subF}><div className={s.fname}>Complète</div><div className={s.fprice}>10 000 €</div><div className={s.fcfa}>~6,6M FCFA</div><div className={s.fdur}>12 mois · 24 visios</div></div>
              </div>
              <ul>
                <li>Session stratégique de cadrage (2-3h)</li>
                <li>Visios de travail bimensuelles (1h)</li>
                <li>Support WhatsApp continu pendant toute la durée</li>
                <li>Livrables clés (business plan, stratégie, positionnement, plan d&apos;acquisition)</li>
                <li>Mise en relation avec mon réseau (prestataires, institutions, partenaires)</li>
                <li>Audit de mi-parcours pour ajuster la trajectoire</li>
              </ul>
              <a href="https://calendly.com/roselinengom/decouverte-15min" target="_blank" rel="noopener noreferrer">Discuter de votre projet →</a>
            </div>
          </div>

          <div className={s.offre}>
            <div className={s.side}>
              <div className={s.num}>03</div><div className={s.icon}>🏛️</div>
              <div className={s.price}>1 200 € / jour</div><div className={s.priceCfa}>~787 000 FCFA / jour</div>
              <div className={s.duration}>Forfait ou journée</div>
            </div>
            <div className={s.body}>
              <div className={s.tags}><span className={s.tagInstit}>Institutions</span><span className={s.tagInstit}>Études</span><span className={s.tagInstit}>Événements</span></div>
              <h3>Conseil Institutionnel</h3>
              <p>Pour les ministères, agences de développement, collectivités, fondations et organisations internationales qui ont besoin d&apos;une expertise pointue sur le tourisme, la culture ou le développement en Afrique de l&apos;Ouest. Missions ponctuelles ou études sectorielles, calibrées sur vos enjeux.</p>
              <ul>
                <li>Études sectorielles (ex : diagnostic tourisme diaspora, état du marché)</li>
                <li>Cadrage de politiques publiques (notes stratégiques, contributions)</li>
                <li>Formation de cadres (ateliers, masterclass institutionnelles)</li>
                <li>Accompagnement d&apos;événements (conception, programmation, modération)</li>
                <li>Participation à des jurys, comités, commissions d&apos;experts</li>
                <li>Forfaits études complètes : 5 000 – 15 000 € (~3,3M – 9,8M FCFA)</li>
              </ul>
              <a href="https://calendly.com/roselinengom/decouverte-15min" target="_blank" rel="noopener noreferrer">Demander une proposition →</a>
            </div>
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className={s.pourQui}>
        <div className={s.pourQuiIn}>
          <div className={s.label} style={{ color: '#F6C961' }}>Pour qui</div>
          <div className={s.stitle} style={{ color: 'white' }}>Six profils. Un même besoin : la clarté.</div>
          <div className={s.pqGrid}>
            <div className={s.pq}><div className={s.icon}>🏨</div><h3>Porteurs de projets touristiques</h3><p>Vous voulez ouvrir un lodge, une agence, un restaurant. Vous avez besoin de clarté avant d&apos;investir 50 000 ou 500 000 euros.</p></div>
            <div className={s.pq}><div className={s.icon}>🏩</div><h3>Dirigeants d&apos;hôtels et lodges</h3><p>Votre activité stagne ou régresse. Vous cherchez un regard extérieur expert qui connaît votre marché de l&apos;intérieur.</p></div>
            <div className={s.pq}><div className={s.icon}>✈️</div><h3>Agences de voyage et réceptifs</h3><p>Vous voulez restructurer votre offre, attaquer un nouveau marché, digitaliser votre acquisition client.</p></div>
            <div className={s.pq}><div className={s.icon}>🎭</div><h3>Opérateurs culturels</h3><p>Festivals, musées, galeries, industries créatives. Vous voulez professionnaliser votre modèle et monétiser votre audience.</p></div>
            <div className={s.pq}><div className={s.icon}>🏛️</div><h3>Institutions et collectivités</h3><p>Ministères, offices de tourisme, agences de développement. Vous cherchez une expertise terrain, pas une analyse théorique.</p></div>
            <div className={s.pq}><div className={s.icon}>🌍</div><h3>Entrepreneurs diaspora</h3><p>Vous avez un projet au Sénégal depuis des années. Vous avez besoin d&apos;un pont entre votre ville et Dakar. Quelqu&apos;un qui parle les deux langages.</p></div>
          </div>
        </div>
      </section>

      {/* METHODE */}
      <section className={s.methode}>
        <div className={s.methodeIn}>
          <div className={s.label}>La méthode</div>
          <div className={s.stitle}>Pas de théorie. Du terrain.</div>
          <div className={s.ssub}>Chaque mission suit le même processus en 5 étapes. Rigoureux, transparent, actionnable.</div>
          <div className={s.steps}>
            <div className={s.step}><div className={s.dot}>1</div><div className={s.stCt}><h3>Écoute</h3><p>Un premier échange de 30 à 45 minutes. Je comprends votre vision, votre contexte, vos contraintes. Gratuit, sans engagement. À la fin de cet appel, on sait tous les deux si ça vaut le coup de travailler ensemble.</p><div className={s.dur}>30-45 min · Gratuit</div></div></div>
            <div className={s.step}><div className={s.dot}>2</div><div className={s.stCt}><h3>Diagnostic</h3><p>J&apos;analyse votre positionnement, votre marché, vos forces et vos angles morts. J&apos;interroge vos équipes, vos partenaires, vos clients si nécessaire. Je collecte les données qui permettent de décider, pas de deviner.</p><div className={s.dur}>Semaine 1</div></div></div>
            <div className={s.step}><div className={s.dot}>3</div><div className={s.stCt}><h3>Stratégie</h3><p>Je construis vos recommandations. Chiffrées, séquencées, argumentées. Chaque recommandation est accompagnée d&apos;un calendrier, d&apos;un budget estimé et d&apos;un responsable. Pas de PowerPoint creux.</p><div className={s.dur}>Semaine 2</div></div></div>
            <div className={s.step}><div className={s.dot}>4</div><div className={s.stCt}><h3>Restitution</h3><p>Je vous présente le plan. On challenge ensemble. On ajuste. On valide. Vous repartez avec un document opérationnel, pas un rapport décoratif. Et vous savez exactement quoi faire lundi matin.</p><div className={s.dur}>Semaine 3</div></div></div>
            <div className={s.step}><div className={s.dot}>5</div><div className={s.stCt}><h3>Exécution</h3><p>Si vous choisissez l&apos;accompagnement, je reste à vos côtés. Visios bimensuelles, livrables concrets, mise en relation avec mon réseau, suivi des résultats. Jusqu&apos;à ce que la stratégie devienne réalité.</p><div className={s.dur}>Mois 2 et suivants</div></div></div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className={s.expertise}>
        <div className={s.expertiseIn}>
          <div className={s.label}>Domaines d&apos;expertise</div>
          <div className={s.stitle}>Ce que je maîtrise. Ce sur quoi vous pouvez compter.</div>
          <div className={s.expGrid}>
            <div className={s.expItem}><div className={`${s.bar} ${s.barExpert}`}></div><div className={s.info}><div className={s.name}>Stratégie touristique Sénégal &amp; Afrique de l&apos;Ouest</div><div className={s.level}>Expert · 10 ans de terrain</div></div></div>
            <div className={s.expItem}><div className={`${s.bar} ${s.barExpert}`}></div><div className={s.info}><div className={s.name}>Culture, patrimoine et industries créatives</div><div className={s.level}>Expert · Conception de programmes culturels</div></div></div>
            <div className={s.expItem}><div className={`${s.bar} ${s.barAvance}`}></div><div className={s.info}><div className={s.name}>Projets diaspora (investissement, retour, installation)</div><div className={s.level}>Avancé · Connaissance des dispositifs et des réseaux</div></div></div>
            <div className={s.expItem}><div className={`${s.bar} ${s.barAvance}`}></div><div className={s.info}><div className={s.name}>Transformation digitale du tourisme</div><div className={s.level}>Avancé · IA, automation, stratégie digitale</div></div></div>
            <div className={s.expItem}><div className={`${s.bar} ${s.barSolide}`}></div><div className={s.info}><div className={s.name}>Finance, business plan, pricing</div><div className={s.level}>Solide · Master Finance INSEEC</div></div></div>
            <div className={s.expItem}><div className={`${s.bar} ${s.barAvance}`}></div><div className={s.info}><div className={s.name}>Personal branding et positionnement</div><div className={s.level}>Avancé · 35K+ communauté construite</div></div></div>
          </div>
          <div className={s.expNote}>Ce que je ne fais pas : juridique, fiscal, foncier, visa. Pour ces sujets, je vous mets en relation avec les experts de mon réseau. La transparence fait partie de la méthode.</div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className={s.pourquoi}>
        <div className={s.pourquoiIn}>
          <div className={s.pourquoiImg}>
            <Image src="/images/roseline-portrait-2.jpg" alt="Roseline Ngom" width={420} height={560} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className={s.pourquoiTxt}>
            <div className={s.label}>Pourquoi moi</div>
            <h2>Pourquoi travailler avec moi<br /><em>plutôt qu&apos;un cabinet.</em></h2>
            <div className={s.args}>
              <div className={s.arg}><div className={s.numA}>01</div><div><h4>Je connais le terrain.</h4><p>Pas un consultant parisien qui débarque avec ses slides. 10 ans sur place. Je connais les acteurs, les institutions, les pièges, les opportunités. Par leur nom.</p></div></div>
              <div className={s.arg}><div className={s.numA}>02</div><div><h4>Je parle les deux langages.</h4><p>Celui de la diaspora à Paris, Bruxelles ou New York. Et celui des institutions à Dakar, Ziguinchor ou Saint-Louis. Je fais le pont. Pas la traduction.</p></div></div>
              <div className={s.arg}><div className={s.numA}>03</div><div><h4>Je m&apos;engage sur l&apos;exécution.</h4><p>Pas de rapport de 200 pages que personne ne lit. Des livrables opérationnels. Des décisions prises. Des résultats mesurés à 6 mois.</p></div></div>
              <div className={s.arg}><div className={s.numA}>04</div><div><h4>Je coûte 5x moins qu&apos;un cabinet.</h4><p>Pour une expertise 5x plus pertinente sur ce marché. Parce que je n&apos;ai pas 50 consultants juniors à payer, pas de bureaux avenue Montaigne, pas de marque à entretenir.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className={s.temos}>
        <div className={s.temosIn}>
          <div className={s.label}>Ils m&apos;ont fait confiance</div>
          <div className={s.stitle}>Ce qu&apos;ils en disent</div>
          <div className={s.temoGrid}>
            <div className={s.temo}><q>Roseline a transformé notre vision floue en un plan d&apos;action concret. En 3 semaines, nous savions exactement quoi faire, dans quel ordre, avec quel budget. Nous aurions dû la consulter 2 ans plus tôt.</q><div className={s.who}>Directeur d&apos;un lodge, Sine Saloum</div><div className={s.role}>Audit stratégique</div></div>
            <div className={s.temo}><q>Ce qui m&apos;a impressionné, c&apos;est sa connaissance du terrain. Elle ne travaille pas depuis un bureau. Elle connaît chaque acteur, chaque institution, chaque piège. C&apos;est rare et précieux.</q><div className={s.who}>Entrepreneur diaspora, Paris</div><div className={s.role}>Accompagnement 6 mois</div></div>
            <div className={s.temo}><q>Nous avons fait appel à Roseline pour une étude sectorielle sur le tourisme culturel en Casamance. La qualité du livrable et la profondeur de l&apos;analyse ont dépassé nos attentes.</q><div className={s.who}>Responsable programme, organisation internationale</div><div className={s.role}>Conseil institutionnel</div></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.faq}>
        <div className={s.faqIn}>
          <div className={s.label}>Questions fréquentes</div>
          <div className={s.stitle}>Tout ce que vous devez savoir</div>
          <div style={{ marginTop: 25 }}>
            {FAQS.map((item, i) => (
              <div key={i} className={`${s.faqItem} ${openFaq === i ? s.open : ''}`}>
                <button className={s.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}<span className={s.arrow}>+</span>
                </button>
                <div className={s.faqA}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={s.ctaFinal}>
        <h2>La clarté ne vient pas<br />en y <em>pensant.</em><br />Elle vient en <em>agissant.</em></h2>
        <div className={s.sub}>Un premier échange de 30 minutes, gratuit, sans engagement. Je vous écoute, je vous challenge, et je vous dis honnêtement si je peux vous aider.</div>
        <div className={s.ctaBtns}>
          <a href="https://calendly.com/roselinengom/decouverte-15min" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Réserver un échange gratuit</a>
          <a href="https://wa.me/33650329808" target="_blank" rel="noopener noreferrer" className={s.btnOutline}>Discuter sur WhatsApp →</a>
        </div>
        <div className={s.micro}>Réponse sous 24h · +33 6 50 32 98 08 · roselinediouma@gmail.com</div>
      </section>

      <Footer />
    </div>
  )
}
