'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

/* Icônes SVG minimalistes — remplacent les emojis anciens */
type IconName =
  | 'globe-off' | 'clock' | 'trending-down' | 'help-circle' | 'coins' | 'user-x'
  | 'smartphone' | 'rocket' | 'cpu' | 'graduation'
  | 'gear' | 'database' | 'zap' | 'mail' | 'credit-card' | 'bar-chart' | 'cloud'

function Icon({ name, size = 22, color = 'currentColor' }: { name: IconName; size?: number; color?: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { display: 'inline-block' },
  }
  switch (name) {
    case 'globe-off':
      return <svg {...common}><path d="M12 2a10 10 0 1 0 10 10" /><path d="M2 12h20M12 2v20" /><path d="M3 3l18 18" /></svg>
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
    case 'trending-down':
      return <svg {...common}><path d="M3 7l7 7 4-4 7 7" /><path d="M21 17v-5h-5" /></svg>
    case 'help-circle':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7" /><circle cx="12" cy="17" r=".6" fill={color} /></svg>
    case 'coins':
      return <svg {...common}><circle cx="9" cy="9" r="5" /><path d="M15 4.3a5 5 0 0 1 0 9.4" /><path d="M4 16a5 5 0 0 0 10 0" /></svg>
    case 'user-x':
      return <svg {...common}><circle cx="10" cy="8" r="4" /><path d="M3 21a7 7 0 0 1 14 0" /><path d="M17 5l4 4M21 5l-4 4" /></svg>
    case 'smartphone':
      return <svg {...common}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></svg>
    case 'rocket':
      return <svg {...common}><path d="M5 19c0-4 2-7 7-12l4 4c-5 5-8 7-12 7v-1z" /><circle cx="15" cy="9" r="1.4" /><path d="M14 4l6 6" /></svg>
    case 'cpu':
      return <svg {...common}><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="10" y="10" width="4" height="4" /><path d="M3 10h3M3 14h3M18 10h3M18 14h3M10 3v3M14 3v3M10 18v3M14 18v3" /></svg>
    case 'graduation':
      return <svg {...common}><path d="M2 9l10-5 10 5-10 5-10-5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></svg>
    case 'gear':
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h0a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v0a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></svg>
    case 'database':
      return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
    case 'zap':
      return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
    case 'mail':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
    case 'credit-card':
      return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
    case 'bar-chart':
      return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
    case 'cloud':
      return <svg {...common}><path d="M18 17a4 4 0 0 0-1.5-7.8A6 6 0 0 0 4.5 11 4 4 0 0 0 6 17h12z" /></svg>
  }
}

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
            <div className={s.pill}><span className={s.pulseDot} /><span>/ DIGITAL &amp; INTELLIGENCE ARTIFICIELLE</span></div>
            <h1>Pendant que vous hésitez,<br />vos concurrents<br /><em>automatisent.</em></h1>
            <p className={s.sub}>
              Hôtels, agences de voyage, lodges, restaurants, opérateurs culturels : vos concurrents installent des chatbots IA qui répondent en 10 secondes. Ils automatisent leurs devis, leurs relances, leur contenu. <strong>Ils captent vos clients. Chaque. Jour.</strong>
            </p>
            <div className={s.heroBtns}>
              <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Audit flash gratuit →</a>
              <a href="#solutions" className={s.btnOutline}>Voir les offres</a>
            </div>
            <div className={s.heroProof}>
              <div className={s.metric}><span className={s.mk}>[ 01 ]</span><div className={s.n}>+300%</div><div className={s.l}>de réservations en ligne</div></div>
              <div className={s.sep}></div>
              <div className={s.metric}><span className={s.mk}>[ 02 ]</span><div className={s.n}>15h</div><div className={s.l}>économisées / semaine</div></div>
              <div className={s.sep}></div>
              <div className={s.metric}><span className={s.mk}>[ 03 ]</span><div className={s.n}>24/7</div><div className={s.l}>réponse automatique</div></div>
            </div>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroPortrait}>
              <Image src="/images/roseline-portrait-2.jpg" alt="Roseline Ngom" width={340} height={510} priority style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* OUTILS IA - demo live (déplacé ici pour preuve immédiate) */}
      <section style={{ padding: '80px 20px 60px', background: 'linear-gradient(180deg, #FEFCF9 0%, #F8F5F0 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8860b', marginBottom: 14 }}>
              Nos outils IA — en ligne, testables tout de suite
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 'clamp(30px, 4vw, 44px)', color: '#560E13', fontWeight: 500, lineHeight: 1.15, marginBottom: 18 }}>
              Ne croyez pas sur parole.<br /><em style={{ color: '#b8860b', fontStyle: 'italic' }}>Essayez directement.</em>
            </h2>
            <p style={{ maxWidth: 680, margin: '0 auto', fontSize: 15, lineHeight: 1.65, color: 'rgba(10,10,10,0.7)' }}>
              Ces outils tournent sur ce site, en production. Des exemples concrets de ce que je peux installer chez vous en quelques semaines. Gratuits, sans compte, résultats immédiats.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
            {/* 01 — Audit IA de présence en ligne */}
            <Link
              href="/outils/audit-presence-en-ligne"
              style={{
                display: 'block',
                textDecoration: 'none',
                padding: '36px 30px',
                background: '#FEFCF9',
                border: '1px solid rgba(86,14,19,0.12)',
                borderRadius: 6,
                transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="outilCard"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 24, fontWeight: 600, color: '#F6C961', lineHeight: 1 }}>01</span>
                <span style={{ flex: 1, height: 1, background: 'rgba(86,14,19,0.15)' }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#560E13', color: '#F6C961', borderRadius: 2 }}>Hôteliers</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 26, color: '#560E13', fontWeight: 600, marginBottom: 12, lineHeight: 1.2 }}>
                Audit IA de présence en ligne
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(10,10,10,0.7)', marginBottom: 22 }}>
                Site web, fiche Google, avis, réseaux sociaux. En 3 minutes, un diagnostic IA complet avec score sur 100, faiblesses priorisées et plan d&apos;action 90 jours personnalisé.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, borderTop: '1px solid rgba(86,14,19,0.08)' }}>
                <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Gratuit · Sans compte</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#560E13' }}>Auditer mon hôtel →</span>
              </div>
            </Link>

            {/* 02 — Générateur de posts SEO */}
            <Link
              href="/outils/generer-posts"
              style={{
                display: 'block',
                textDecoration: 'none',
                padding: '36px 30px',
                background: '#FEFCF9',
                border: '1px solid rgba(86,14,19,0.12)',
                borderRadius: 6,
                transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="outilCard"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 24, fontWeight: 600, color: '#F6C961', lineHeight: 1 }}>02</span>
                <span style={{ flex: 1, height: 1, background: 'rgba(86,14,19,0.15)' }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#560E13', color: '#F6C961', borderRadius: 2 }}>SEO local</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 26, color: '#560E13', fontWeight: 600, marginBottom: 12, lineHeight: 1.2 }}>
                Générateur de posts IA
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(10,10,10,0.7)', marginBottom: 22 }}>
                3 posts prêts à publier en 15 secondes : Google Business Profile (indexé par Google), Instagram/Facebook et LinkedIn. Mots-clés locaux, hashtags ciblés, SEO-first.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, borderTop: '1px solid rgba(86,14,19,0.08)' }}>
                <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Gratuit · Sans compte</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#560E13' }}>Générer mes posts →</span>
              </div>
            </Link>

            {/* 03 — Chatbot */}
            <div
              style={{
                padding: '36px 30px',
                background: 'linear-gradient(135deg, #560E13 0%, #3d090e 100%)',
                border: '1px solid rgba(246,201,97,0.2)',
                borderRadius: 6,
                color: '#FEFCF9',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 24, fontWeight: 600, color: '#F6C961', lineHeight: 1 }}>03</span>
                <span style={{ flex: 1, height: 1, background: 'rgba(246,201,97,0.25)' }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: '#F6C961', color: '#560E13', borderRadius: 2 }}>Voyageurs 24/7</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 26, color: '#FEFCF9', fontWeight: 600, marginBottom: 12, lineHeight: 1.2 }}>
                Assistant TripAfro — chatbot IA
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(254,252,249,0.78)', marginBottom: 22 }}>
                Un agent IA entraîné sur le Sénégal, la diaspora, les voyages, les visas. Il qualifie les prospects, détecte l&apos;intention, redirige vers Calendly ou WhatsApp. Présent en bas à droite de chaque page.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, borderTop: '1px solid rgba(246,201,97,0.15)' }}>
                <span style={{ fontSize: 11, color: 'rgba(254,252,249,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Actif 24/7</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#F6C961' }}>↘ Essayez en bas à droite</span>
              </div>
            </div>
          </div>

          {/* CTA bas */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link
              href="/outils"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: 'transparent',
                color: '#560E13',
                textDecoration: 'none',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                borderRadius: 3,
                border: '1.5px solid rgba(86,14,19,0.2)',
              }}
            >
              Voir tous les outils →
            </Link>
            <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(10,10,10,0.5)', letterSpacing: '0.08em' }}>
              Tout ce que vous testez ici, je peux l&apos;installer chez vous.
            </p>
          </div>
        </div>
      </section>

      {/* URGENCE BAR */}
      <div className={s.urgence}>
        <Icon name="zap" size={14} color="white" />
        <p>/ ALERTE 2026 — Un hôtel, lodge ou agence sans stratégie digitale perd 30 à 50 clients/mois. À 80 000 FCFA la nuit, c&apos;est 2,4 à 4M FCFA qui s&apos;évaporent.</p>
      </div>

      {/* PROBLEME */}
      <section className={s.probleme}>
        <div className={s.problemeIn}>
          <div className={s.probWatermark} aria-hidden>06</div>
          <div className={`${s.secLabel} ${s.fi}`} ref={r1}>◆ DIAGNOSTIC.SYSTÈME</div>
          <div className={s.secTitle}>Votre service est exceptionnel.<br /><em>Mais votre digital vous rend invisible.</em></div>
          <div className={s.secSub}>
            Soyons honnêtes. Pendant que vous lisez cette page, un voyageur cherche votre établissement sur Google. Il n&apos;a rien trouvé. Ou il a trouvé un site lent, pas à jour, sans possibilité de réserver. Il est parti chez votre concurrent. En 3 clics. 30 à 50 fois par mois.
          </div>
          <div className={s.probGrid}>
            <div className={s.prob}>
              <div className={s.probHeader}>
                <span className={s.probErr}>/ERR.01</span>
                <span className={s.probLine} />
                <span className={s.probTag}>INVISIBLE</span>
              </div>
              <div className={s.icon}><Icon name="globe-off" size={20} /></div>
              <h3>Site web obsolète ou inexistant</h3>
              <p>Pas responsive, pas de réservation en ligne, pas de SEO. Vous êtes invisible. Vos concurrents qui ont un site moderne captent VOS clients.</p>
            </div>
            <div className={s.prob}>
              <div className={s.probHeader}>
                <span className={s.probErr}>/ERR.02</span>
                <span className={s.probLine} />
                <span className={s.probTag}>LATENT</span>
              </div>
              <div className={s.icon}><Icon name="clock" size={20} /></div>
              <h3>DM et emails sans réponse</h3>
              <p>Vous répondez en 48h. L&apos;agence concurrente répond en 10 secondes via son chatbot. Avec le nom du client, ses dates, son budget. Le devis part automatiquement.</p>
            </div>
            <div className={s.prob}>
              <div className={s.probHeader}>
                <span className={s.probErr}>/ERR.03</span>
                <span className={s.probLine} />
                <span className={s.probTag}>SANS.DATA</span>
              </div>
              <div className={s.icon}><Icon name="trending-down" size={20} /></div>
              <h3>Zéro data, zéro visibilité</h3>
              <p>Combien de réservations avez-vous perdues ce mois-ci ? Vous ne savez pas. Parce que vous n&apos;avez aucun outil pour le mesurer. Vous pilotez à l&apos;aveugle.</p>
            </div>
            <div className={s.prob}>
              <div className={s.probHeader}>
                <span className={s.probErr}>/ERR.04</span>
                <span className={s.probLine} />
                <span className={s.probTag}>EN-RETARD</span>
              </div>
              <div className={s.icon}><Icon name="help-circle" size={20} /></div>
              <h3>L&apos;IA ? C&apos;est pour les autres.</h3>
              <p>Les outils IA et automations, vos concurrents les utilisent déjà pour générer du contenu, qualifier des leads, répondre aux clients. L&apos;écart se creuse chaque semaine.</p>
            </div>
            <div className={s.prob}>
              <div className={s.probHeader}>
                <span className={s.probErr}>/ERR.05</span>
                <span className={s.probLine} />
                <span className={s.probTag}>GASPILLÉ</span>
              </div>
              <div className={s.icon}><Icon name="coins" size={20} /></div>
              <h3>Budget pub sans résultat</h3>
              <p>Vous avez jeté 500 € dans Facebook Ads. Résultat : 0 réservation. Sans funnel, sans landing page, sans retargeting, la pub payante est de l&apos;argent brûlé.</p>
            </div>
            <div className={s.prob}>
              <div className={s.probHeader}>
                <span className={s.probErr}>/ERR.06</span>
                <span className={s.probLine} />
                <span className={s.probTag}>DÉSALIGNÉ</span>
              </div>
              <div className={s.icon}><Icon name="user-x" size={20} /></div>
              <h3>Le CM qui ne connaît pas votre métier</h3>
              <p>Votre CM poste 3 photos par semaine. Jolies, oui. Mais zéro stratégie, zéro conversion, zéro mesure. Un CM sans stratégie sectorielle est de l&apos;argent jeté.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOST */}
      <section className={s.lost}>
        <div className={s.lostIn}>
          <div className={s.secLabel} style={{ color: '#EF4444' }}>◆ ANALYSE.IMPACT</div>
          <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 32, color: 'white', fontWeight: 500, marginBottom: 10, lineHeight: 1.2 }}>
            Calculons ensemble ce que vous perdez <em style={{ color: '#F6C961', fontStyle: 'italic' }}>chaque mois</em>.
          </div>
          <div className={s.lostGrid}>
            <div className={s.lostCard}>
              <span className={s.lostKey}>CLIENTS.PERDUS /MOIS</span>
              <div className={s.lostNum}>30-50</div>
              <div className={s.lostLabel}>réservations, devis, demandes d&apos;info parties chez le concurrent</div>
            </div>
            <div className={s.lostCard}>
              <span className={s.lostKey}>FUITE.CA /MOIS</span>
              <div className={s.lostNum}>2,4M – 4M</div>
              <div className={s.lostLabel}>FCFA de CA qui s&apos;évapore chaque mois (hôtel, agence, resto)</div>
            </div>
            <div className={s.lostCard}>
              <span className={s.lostKey}>IMPACT.ANNUEL</span>
              <div className={s.lostNum}>28,8M – 48M</div>
              <div className={s.lostLabel}>FCFA perdus sur 12 mois. Bien plus que le coût de la solution.</div>
            </div>
          </div>
          <div style={{ marginTop: 28, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', letterSpacing: '0.05em' }}>
            // Formule Présence Digitale : 985 000 FCFA/mois · Gain min. : 2,4M FCFA/mois · <span style={{ color: '#F6C961', fontWeight: 600 }}>ROI = 2,4× dès M1</span>
          </div>
        </div>
      </section>

      {/* TRANSITION */}
      <section className={s.transition}>
        <div className={s.transitionMk}>// SUITE — COUCHE.SOLUTION</div>
        <p>Vos concurrents ne vont pas vous attendre.<br />En <em>90 jours</em>, votre digital peut devenir<br />votre <em>machine à clients</em>.</p>
      </section>

      {/* SOLUTIONS */}
      <section className={s.solutions} id="solutions">
        <div className={s.solutionsIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={r2}>◆ COUCHE.SOLUTION</div>
          <div className={s.secTitle}>Quatre formules. Un seul objectif :<br /><em>que le digital travaille pour vous.</em></div>
          <div className={s.secSub}>
            Du pilotage mensuel de vos réseaux à l&apos;installation d&apos;agents IA qui qualifient vos clients 24h/24. Choisissez le niveau qui vous correspond.
          </div>
          <div className={s.solGrid}>
            <div className={s.sol}>
              <div className={s.visual}>
                <span className={s.visualMk}>/FORMULE.01</span>
                <div className={s.num}>01</div>
                <div className={s.iconBox}><Icon name="smartphone" size={28} /></div>
                <div className={s.price}>1 500 € / mois</div>
                <div className={s.priceSub}>ENGAGEMENT.6MOIS</div>
              </div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagRecurrent}>▸ RÉCURRENT</span><span className={s.tagFormation}>CLÉ-EN-MAIN</span></div>
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
                <span className={s.ctaMk}>/CTA.RDV</span>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Planifier un audit flash gratuit →</a>
              </div>
            </div>
            <div className={s.sol}>
              <div className={s.visual}>
                <span className={s.visualMk}>/FORMULE.02</span>
                <div className={s.num}>02</div>
                <div className={s.iconBox}><Icon name="rocket" size={28} /></div>
                <div className={s.price}>8 500 – 15 000 €</div>
                <div className={s.priceSub}>~5,5M – 9,8M FCFA · PROJET.3MOIS</div>
              </div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagProjet}>▸ PROJET</span><span className={s.tagFormation}>TRANSFORMATION</span></div>
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
                <span className={s.ctaMk}>/CTA.CADRAGE</span>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Discuter de votre projet →</a>
              </div>
            </div>
            <div className={s.sol}>
              <div className={s.visual}>
                <span className={s.visualMk}>/FORMULE.03</span>
                <div className={s.num}>03</div>
                <div className={s.iconBox}><Icon name="cpu" size={28} /></div>
                <div className={s.price}>3 500 – 12 000 €</div>
                <div className={s.priceSub}>~2,3M – 7,9M FCFA · SUR-MESURE</div>
              </div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagProjet}>▸ PROJET</span><span className={s.tagRecurrent}>IA APPLIQUÉE</span></div>
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
                <span className={s.ctaMk}>/CTA.CAS-USAGE</span>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Identifier vos cas d&apos;usage →</a>
              </div>
            </div>
            <div className={s.sol}>
              <div className={s.visual}>
                <span className={s.visualMk}>/FORMULE.04</span>
                <div className={s.num}>04</div>
                <div className={s.iconBox}><Icon name="graduation" size={28} /></div>
                <div className={s.price}>2 500 – 15 000 €</div>
                <div className={s.priceSub}>~1,6M – 9,8M FCFA · 1–5 JOURS</div>
              </div>
              <div className={s.content}>
                <div className={s.tag}><span className={s.tagFormation}>▸ FORMATION</span></div>
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
                <span className={s.ctaMk}>/CTA.FORMATION</span>
                <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer">Réserver une formation →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className={s.stack}>
        <div className={s.stackIn}>
          <div className={`${s.secLabel} ${s.fi}`} ref={r3} style={{ color: '#F6C961' }}>◆ STACK.TECHNIQUE</div>
          <div className={s.secTitle} style={{ color: 'white' }}>Les outils que nous maîtrisons.<br /><em style={{ color: '#F6C961' }}>Pas des mots. Des résultats.</em></div>
          <div className={s.stackGrid}>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.01</span><div className={s.ico}><Icon name="gear" size={22} /></div><div className={s.name}>N8N</div><div className={s.desc}>Automations et workflows multi-étapes sans code</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.02</span><div className={s.ico}><Icon name="database" size={22} /></div><div className={s.name}>Supabase</div><div className={s.desc}>Base de données temps réel, CRM sur mesure</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.03</span><div className={s.ico}><Icon name="cpu" size={22} /></div><div className={s.name}>LLM &amp; IA générative</div><div className={s.desc}>Modèles de langage pour contenu, chatbots, analyse</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.04</span><div className={s.ico}><Icon name="zap" size={22} /></div><div className={s.name}>Next.js &amp; React</div><div className={s.desc}>Sites web performants, rapides, modernes</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.05</span><div className={s.ico}><Icon name="mail" size={22} /></div><div className={s.name}>Brevo</div><div className={s.desc}>Email marketing, séquences automatisées</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.06</span><div className={s.ico}><Icon name="credit-card" size={22} /></div><div className={s.name}>Stripe</div><div className={s.desc}>Paiement en ligne sécurisé</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.07</span><div className={s.ico}><Icon name="bar-chart" size={22} /></div><div className={s.name}>Plausible</div><div className={s.desc}>Analytics respectueux de la vie privée</div></div>
            <div className={s.stackItem}><span className={s.stackMk}>/TECH.08</span><div className={s.ico}><Icon name="cloud" size={22} /></div><div className={s.name}>Vercel</div><div className={s.desc}>Hébergement ultra-rapide et scalable</div></div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={s.process}>
        <div className={s.processIn}>
          <div className={s.secLabel}>◆ PROCESSUS.DÉROULÉ</div>
          <div className={s.secTitle}>Du premier appel à la mise en ligne.<br /><em>En 5 étapes claires.</em></div>
          <div className={s.steps}>
            <div className={s.step}><div className={s.dot}>/01</div><div><h3>Audit flash gratuit (30 min)</h3><p>On analyse votre situation actuelle ensemble. Site, réseaux, outils, processus. Je vous identifie 2-3 opportunités concrètes. Pas de blabla, pas de jargon.</p><div className={s.duration}>T+30MIN · GRATUIT · SANS.ENGAGEMENT</div></div></div>
            <div className={s.step}><div className={s.dot}>/02</div><div><h3>Proposition sur mesure</h3><p>Dans les 5 jours, vous recevez une proposition PDF personnalisée. Objectifs, méthode, livrables, planning, prix. Tout est transparent.</p><div className={s.duration}>T+5J · SUR-MESURE</div></div></div>
            <div className={s.step}><div className={s.dot}>/03</div><div><h3>Kick-off et exécution</h3><p>On démarre. Acompte 40%, accès partagés, calendrier de travail défini. Vous savez exactement quoi attendre et quand.</p><div className={s.duration}>1SEM – 3MOIS · ACOMPTE.40%</div></div></div>
            <div className={s.step}><div className={s.dot}>/04</div><div><h3>Formation et livraison</h3><p>Chaque outil installé est accompagné d&apos;une formation et d&apos;une documentation. Vous repartez autonome, pas dépendant.</p><div className={s.duration}>2.SESSIONS · DOCS.INCLUS</div></div></div>
            <div className={s.step}><div className={s.dot}>/05</div><div><h3>Suivi et optimisation</h3><p>30 jours de support post-livraison inclus. On mesure les résultats, on ajuste, on optimise. Puis vous pouvez voler seul ou passer en formule récurrente.</p><div className={s.duration}>30J.SUPPORT · KPI.SUIVIS</div></div></div>
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
            <div className={s.label}>/À-PROPOS.FONDATRICE</div>
            <div className={s.roselineBadge}>FONDATRICE · DIGITAL · IA · 10 ANS</div>
            <h2>L&apos;experte qui code,<br /><em>qui connaît le terrain,<br />et qui parle votre langue.</em></h2>
            <p>La plupart des agences digitales ne connaissent ni le tourisme, ni la culture, ni l&apos;Afrique. Les professionnels du secteur ne maîtrisent pas l&apos;IA. Je fais les deux. Hôtels, agences de voyage, lodges, festivals, restaurants. Depuis 10 ans. Avec des résultats.</p>
            <p>Je ne vends pas de la technologie. Je vends des clients en plus, du temps en moins, et de la croissance mesurable.</p>
            <div className={s.skillsGrid}>
              <div className={s.skillTag}><span className={s.mk}>✓</span>AUTOMATISATION N8N</div>
              <div className={s.skillTag}><span className={s.mk}>✓</span>API LLM &amp; IA</div>
              <div className={s.skillTag}><span className={s.mk}>✓</span>REACT &amp; NEXT.JS</div>
              <div className={s.skillTag}><span className={s.mk}>✓</span>SUPABASE &amp; BDD</div>
              <div className={s.skillTag}><span className={s.mk}>✓</span>TOURISME 10 ANS</div>
              <div className={s.skillTag}><span className={s.mk}>✓</span>TERRAIN SÉNÉGAL</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={s.ctaFinal}>
        <div className={s.ctaFinalMk}>/ SESSIONS.OUVERTES — 5 PLACES / TRIMESTRE</div>
        <h2>Dans 6 mois, vous serez soit<br />en avance, soit <em>dépassé.</em></h2>
        <div className={s.sub}>
          L&apos;audit flash est gratuit. 30 minutes. Sans engagement. Je vous montre exactement combien de clients vous perdez chaque mois et comment les récupérer. Les places sont limitées : je n&apos;accompagne que 5 nouveaux projets par trimestre.
        </div>
        <div className={s.ctaBtns}>
          <a href="https://calendly.com/roselinengom" target="_blank" rel="noopener noreferrer" className={s.btnGold}>Réserver mon audit →</a>
          <a href="https://wa.me/33650329808" target="_blank" rel="noopener noreferrer" className={s.btnOutline}>WhatsApp</a>
        </div>
        <div className={s.micro}>RÉPONSE.24H · +33 6 50 32 98 08 · ROSELINEDIOUMA@GMAIL.COM</div>
      </section>

      <Footer />
    </div>
  )
}
