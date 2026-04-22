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
  {
    q: 'Quelle est la différence entre l\'audit et l\'accompagnement ?',
    a: "L'audit est un diagnostic ponctuel de 3 semaines. Vous repartez avec un plan d'action chiffré. L'accompagnement est un co-pilotage dans la durée (3 à 12 mois) pour exécuter le plan, ajuster et mesurer les résultats.",
  },
  {
    q: 'Je suis basé hors Sénégal, c\'est possible à distance ?',
    a: "Oui, 100 % des missions peuvent se faire à distance via visio et documents partagés. Un déplacement sur site au Sénégal est possible en option (supplément 500 € + frais).",
  },
  {
    q: 'Comment se passe le premier contact ?',
    a: "Vous réservez un créneau de 30 minutes sur Calendly. Gratuit, sans engagement. Je vous écoute, je challenge votre projet, et je vous dis honnêtement si je peux vous aider.",
  },
  {
    q: 'Combien de clients accompagnez-vous simultanément ?',
    a: "Je limite volontairement à 5 accompagnements en parallèle. La qualité dépend du temps que je consacre à chaque projet. Je préfère refuser un client que de mal le servir.",
  },
]

export default function ConsultingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const secRef1 = useReveal<HTMLDivElement>()
  const secRef2 = useReveal<HTMLDivElement>()
  const secRef3 = useReveal<HTMLDivElement>()
  const secRef4 = useReveal<HTMLDivElement>()
  const secRef5 = useReveal<HTMLDivElement>()
  const secRef6 = useReveal<HTMLDivElement>()

  return (
    <div className={s.page}>
      <Nav />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroLine}></div>
        <div className={s.heroCt}>
          <div className={s.heroLeft}>
            <div className={s.pill}><span>Consulting stratégique · Tourisme · Afrique de l&apos;Ouest</span></div>
            <h1>
              Tourisme africain :<br />
              la stratégie fait<br />
              <em>10× plus</em> que les slogans.
            </h1>
            <p className={s.sub}>
              Audit, accompagnement et conseil pour porteurs de projets tourisme, hôteliers, agences réceptives et institutions au Sénégal et en Afrique de l&apos;Ouest. De la vision à l&apos;exécution.
            </p>

            {/* Pilules de preuve */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F6C961', padding: '8px 14px', border: '1px solid rgba(246,201,97,0.35)', borderRadius: 2 }}>10 ans de terrain Sénégal</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F6C961', padding: '8px 14px', border: '1px solid rgba(246,201,97,0.35)', borderRadius: 2 }}>Master Finance INSEEC</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F6C961', padding: '8px 14px', border: '1px solid rgba(246,201,97,0.35)', borderRadius: 2 }}>Fondatrice TripAfro</span>
            </div>

            <div className={s.heroBtns}>
              <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Réserver un échange — 30 min, gratuit</a>
              <a href="#offres" className={s.btnOutline}>Voir les offres →</a>
            </div>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroPortrait}>
              <Image
                src="/images/roseline-portrait-3.jpg"
                alt="Roseline Ngom, consultante tourisme"
                width={340}
                height={510}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className={s.cred}>
        <span>Fondatrice TripAfro · Master Finance INSEEC · Consultante tourisme &amp; développement · 10 ans d&apos;expertise Afrique de l&apos;Ouest</span>
      </div>

      {/* POUR QUI / PAS POUR QUI */}
      <section style={{ padding: '100px 20px', background: '#FEFCF9' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={secRef1} className={s.fi}>
          <div className={s.label} style={{ textAlign: 'center' }}>Qualification</div>
          <div className={s.stitle} style={{ textAlign: 'center' }}>
            C&apos;est pour vous.<br />
            Ou ça ne l&apos;est pas.
          </div>
          <p className={s.ssub} style={{ textAlign: 'center', marginBottom: 50 }}>
            Autant être clair dès le départ. Vous ne perdrez pas 30 minutes d&apos;appel pour rien.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* C'est pour vous */}
            <div style={{ background: '#F8F5F0', borderLeft: '4px solid #F6C961', padding: '32px 30px', borderRadius: 3 }}>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 22, color: '#560E13', fontWeight: 600, marginBottom: 20 }}>
                C&apos;est pour vous si…
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Vous portez un projet tourisme, culture ou diaspora au Sénégal ou en Afrique de l\'Ouest',
                  'Vous voulez décider vite et bien, pas réfléchir encore 6 mois',
                  'Vous cherchez quelqu\'un qui connaît les acteurs par leur prénom',
                  'Vous préférez un plan d\'action chiffré à un rapport de 200 pages',
                ].map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 12, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(10,10,10,0.75)' }}>
                    <span style={{ color: '#F6C961', fontFamily: 'var(--font-cormorant), serif', fontSize: 20, lineHeight: 1, fontWeight: 700, minWidth: 16 }}>+</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ce n'est pas pour vous */}
            <div style={{ background: '#F8F5F0', borderLeft: '4px solid rgba(86,14,19,0.3)', padding: '32px 30px', borderRadius: 3 }}>
              <div style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 22, color: '#560E13', fontWeight: 600, marginBottom: 20 }}>
                Ce n&apos;est pas pour vous si…
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Vous cherchez un consultant qui valide toutes vos idées',
                  'Votre seul critère, c\'est le prix le plus bas',
                  'Vous avez besoin de juridique, fiscal, foncier ou visa (pas mon métier)',
                  'Vous voulez externaliser le travail au lieu de le faire ensemble',
                ].map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 12, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(10,10,10,0.6)' }}>
                    <span style={{ color: 'rgba(86,14,19,0.45)', fontFamily: 'var(--font-cormorant), serif', fontSize: 20, lineHeight: 1, fontWeight: 700, minWidth: 16 }}>—</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CITATION */}
      <section className={s.citation}>
        <p className={s.fi} ref={secRef2 as React.RefObject<HTMLParagraphElement>}>
          Mon rôle n&apos;est pas de rêver à votre place.<br />
          C&apos;est de transformer votre vision en <em>plan d&apos;action chiffré, séquencé, exécutable.</em>
        </p>
      </section>

      {/* OFFRES — tableau comparatif */}
      <section className={s.offres} id="offres">
        <div className={s.offresIn}>
          <div className={s.label}>Les offres</div>
          <div className={s.stitle}>
            Trois niveaux.<br />Un seul standard : l&apos;exécution.
          </div>
          <div className={s.ssub}>
            Réflexion, lancement ou croissance : un format existe pour chaque étape. Choisissez en 10 secondes.
          </div>

          {/* Tableau comparatif desktop */}
          <div style={{ marginTop: 40, maxWidth: 1100, marginInline: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }} className="offresGrid">
              {/* Audit */}
              <div style={{ background: '#FEFCF9', border: '1px solid rgba(86,14,19,0.1)', borderRadius: 4, padding: '36px 28px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 600, color: '#F6C961', lineHeight: 1, marginBottom: 6 }}>01</div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#560E13', color: '#F6C961', borderRadius: 2, alignSelf: 'flex-start', marginBottom: 18 }}>Diagnostic</span>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 28, color: '#560E13', fontWeight: 600, marginBottom: 10, lineHeight: 1.15 }}>Audit Stratégique</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(10,10,10,0.7)', lineHeight: 1.6, marginBottom: 22 }}>Décider avant d&apos;investir. Un diagnostic complet et une roadmap à 6 mois, livrés en 3 semaines.</p>
                <div style={{ borderTop: '1px solid rgba(86,14,19,0.08)', paddingTop: 18, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.55)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}><span>Durée</span><span style={{ color: '#560E13', fontWeight: 600 }}>3 semaines</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.55)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}><span>Prix</span><span style={{ color: '#560E13', fontWeight: 700, fontSize: 15 }}>1 800 €</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(10,10,10,0.45)' }}><span>~1 180 000 FCFA</span></div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'rgba(10,10,10,0.7)', lineHeight: 1.55 }}>
                  <li>Analyse positionnement + concurrence</li>
                  <li>Audit offre + digital + commercial</li>
                  <li>5 recommandations chiffrées</li>
                  <li>Roadmap 6 mois + restitution 1h30</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', display: 'inline-block', padding: '12px 20px', background: 'transparent', color: '#560E13', border: '1px solid #560E13', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', borderRadius: 2 }}>Planifier un échange →</a>
              </div>

              {/* Accompagnement — carte mise en avant */}
              <div style={{ background: 'linear-gradient(135deg, #560E13 0%, #3d090e 100%)', border: '1px solid rgba(246,201,97,0.2)', borderRadius: 4, padding: '36px 28px', display: 'flex', flexDirection: 'column', color: '#FEFCF9', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#F6C961', color: '#560E13', borderRadius: 2 }}>Le plus demandé</div>
                <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 600, color: '#F6C961', lineHeight: 1, marginBottom: 6 }}>02</div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#F6C961', color: '#560E13', borderRadius: 2, alignSelf: 'flex-start', marginBottom: 18 }}>Co-pilotage</span>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 28, color: '#FEFCF9', fontWeight: 600, marginBottom: 10, lineHeight: 1.15 }}>Accompagnement</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(254,252,249,0.78)', lineHeight: 1.6, marginBottom: 22 }}>Exécuter sans se planter. Je suis votre co-pilote : visios bimensuelles, livrables, mises en relation.</p>
                <div style={{ borderTop: '1px solid rgba(246,201,97,0.2)', paddingTop: 18, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(254,252,249,0.55)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}><span>Durée</span><span style={{ color: '#F6C961', fontWeight: 600 }}>3 à 12 mois</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(254,252,249,0.55)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}><span>Dès</span><span style={{ color: '#F6C961', fontWeight: 700, fontSize: 15 }}>3 500 €</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(254,252,249,0.45)' }}><span>Compact / Standard / Complète</span></div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'rgba(254,252,249,0.8)', lineHeight: 1.55 }}>
                  <li>Cadrage stratégique + visios mensuelles</li>
                  <li>Support WhatsApp continu</li>
                  <li>Business plan, pricing, acquisition</li>
                  <li>Accès à mon réseau (institutions, prestataires)</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', display: 'inline-block', padding: '12px 20px', background: '#F6C961', color: '#560E13', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', borderRadius: 2 }}>Discuter du projet →</a>
              </div>

              {/* Conseil institutionnel */}
              <div style={{ background: '#FEFCF9', border: '1px solid rgba(86,14,19,0.1)', borderRadius: 4, padding: '36px 28px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 28, fontWeight: 600, color: '#F6C961', lineHeight: 1, marginBottom: 6 }}>03</div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#560E13', color: '#F6C961', borderRadius: 2, alignSelf: 'flex-start', marginBottom: 18 }}>Institutions</span>
                <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 28, color: '#560E13', fontWeight: 600, marginBottom: 10, lineHeight: 1.15 }}>Conseil Institutionnel</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(10,10,10,0.7)', lineHeight: 1.6, marginBottom: 22 }}>Ministères, agences, ONG, fondations. Études, cadrages, missions ponctuelles calibrées.</p>
                <div style={{ borderTop: '1px solid rgba(86,14,19,0.08)', paddingTop: 18, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.55)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}><span>Format</span><span style={{ color: '#560E13', fontWeight: 600 }}>Journée / forfait</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.55)', marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}><span>Jour</span><span style={{ color: '#560E13', fontWeight: 700, fontSize: 15 }}>1 200 €</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(10,10,10,0.45)' }}><span>Forfait étude : 5 000 – 15 000 €</span></div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'rgba(10,10,10,0.7)', lineHeight: 1.55 }}>
                  <li>Études sectorielles tourisme / diaspora</li>
                  <li>Notes stratégiques, cadrage politiques publiques</li>
                  <li>Formation de cadres / masterclass</li>
                  <li>Jurys, comités, modération d&apos;événements</li>
                </ul>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', display: 'inline-block', padding: '12px 20px', background: 'transparent', color: '#560E13', border: '1px solid #560E13', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', borderRadius: 2 }}>Demander une offre →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODE en 4 étapes */}
      <section className={s.methode}>
        <div className={s.methodeIn}>
          <div className={s.label}>La méthode</div>
          <div className={s.stitle}>
            Pas de théorie.<br />Du terrain.
          </div>
          <div className={s.ssub}>
            Quatre étapes. Rigoureuses, transparentes, actionnables. De l&apos;écoute à la décision.
          </div>
          <div className={s.steps} ref={secRef3}>
            <div className={s.step}>
              <div className={s.dot}>1</div>
              <div className={s.stCt}>
                <h3>Écoute</h3>
                <p>Un premier appel de 30 à 45 minutes. Je comprends votre vision, votre contexte, vos contraintes. À la fin de cet appel, on sait tous les deux si ça vaut le coup de travailler ensemble.</p>
                <div className={s.dur}>30-45 min · Gratuit</div>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.dot}>2</div>
              <div className={s.stCt}>
                <h3>Diagnostic</h3>
                <p>J&apos;analyse votre positionnement, votre marché, vos forces et vos angles morts. J&apos;interroge vos équipes, vos partenaires, vos clients. Je collecte les données qui permettent de décider, pas de deviner.</p>
                <div className={s.dur}>Semaine 1</div>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.dot}>3</div>
              <div className={s.stCt}>
                <h3>Stratégie</h3>
                <p>Je construis vos recommandations. Chiffrées, séquencées, argumentées. Chaque action s&apos;accompagne d&apos;un calendrier, d&apos;un budget estimé et d&apos;un responsable. Pas de PowerPoint creux.</p>
                <div className={s.dur}>Semaine 2</div>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.dot}>4</div>
              <div className={s.stCt}>
                <h3>Exécution</h3>
                <p>Restitution en visio, challenge, validation. Vous repartez avec un document opérationnel et vous savez exactement quoi faire lundi matin. Si vous choisissez l&apos;accompagnement, je reste à vos côtés jusqu&apos;aux résultats.</p>
                <div className={s.dur}>Semaine 3 et au-delà</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI MOI — 3 arguments */}
      <section className={s.pourquoi}>
        <div className={s.pourquoiIn} ref={secRef4}>
          <div className={s.pourquoiImg}>
            <Image
              src="/images/roseline-portrait-2.jpg"
              alt="Roseline Ngom, consultante tourisme Sénégal"
              width={420}
              height={560}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={s.pourquoiTxt}>
            <div className={s.label}>Pourquoi moi</div>
            <h2>
              Pourquoi travailler avec moi<br />
              <em>plutôt qu&apos;un cabinet.</em>
            </h2>
            <div className={s.args}>
              <div className={s.arg}>
                <div className={s.numA}>01</div>
                <div>
                  <h4>Je connais le terrain par son prénom.</h4>
                  <p>Pas un consultant parisien qui débarque avec ses slides. 10 ans sur place. Les acteurs, les institutions, les pièges, les opportunités. Par leur nom.</p>
                </div>
              </div>
              <div className={s.arg}>
                <div className={s.numA}>02</div>
                <div>
                  <h4>Je parle les deux langages.</h4>
                  <p>Celui de la diaspora à Paris, Bruxelles ou New York. Celui des institutions à Dakar, Ziguinchor ou Saint-Louis. Je fais le pont. Pas la traduction.</p>
                </div>
              </div>
              <div className={s.arg}>
                <div className={s.numA}>03</div>
                <div>
                  <h4>Je m&apos;engage sur l&apos;exécution.</h4>
                  <p>Pas de rapport de 200 pages que personne ne lit. Des livrables opérationnels. Des décisions prises. Des résultats mesurés à 6 mois.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREUVES — témoignages condensés */}
      <section className={s.temos}>
        <div className={s.temosIn} ref={secRef5}>
          <div className={s.label}>Preuves</div>
          <div className={s.stitle}>
            Ce qu&apos;ils en disent.
          </div>
          <div className={s.temoGrid}>
            <div className={s.temo}>
              <q>En 3 semaines, nous savions exactement quoi faire, dans quel ordre, avec quel budget. Nous aurions dû la consulter 2 ans plus tôt.</q>
              <div className={s.who}>Directeur d&apos;un lodge, Sine Saloum</div>
              <div className={s.role}>Audit stratégique</div>
            </div>
            <div className={s.temo}>
              <q>Elle ne travaille pas depuis un bureau. Elle connaît chaque acteur, chaque institution, chaque piège. C&apos;est rare et précieux.</q>
              <div className={s.who}>Entrepreneur diaspora, Paris</div>
              <div className={s.role}>Accompagnement 6 mois</div>
            </div>
            <div className={s.temo}>
              <q>La qualité du livrable et la profondeur de l&apos;analyse ont dépassé nos attentes.</q>
              <div className={s.who}>Responsable programme, organisation internationale</div>
              <div className={s.role}>Conseil institutionnel</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — 4 questions */}
      <section className={s.faq}>
        <div className={s.faqIn} ref={secRef6}>
          <div className={s.label}>Questions fréquentes</div>
          <div className={s.stitle}>L&apos;essentiel avant de réserver</div>
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
        <h2>
          La clarté ne vient pas<br />
          en y <em>pensant.</em><br />
          Elle vient en <em>agissant.</em>
        </h2>
        <div className={s.sub}>
          Un premier échange de 30 minutes, gratuit, sans engagement. Je vous écoute, je vous challenge, et je vous dis honnêtement si je peux vous aider.
        </div>
        <div className={s.ctaBtns}>
          <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Réserver un échange gratuit</a>
          <a href="https://wa.me/33650329808" target="_blank" rel="noopener noreferrer" className={s.btnOutline}>Discuter sur WhatsApp →</a>
        </div>
        <div className={s.micro}>Réponse sous 24h · +33 6 50 32 98 08 · roselinediouma@gmail.com</div>
      </section>

      <Footer />
    </div>
  )
}
