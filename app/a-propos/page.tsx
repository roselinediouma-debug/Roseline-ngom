'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import s from './page.module.css'

export default function AProposPage() {
  const rootRef = useRef<HTMLDivElement | null>(null)

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

      {/* HERO EDITORIAL */}
      <section className={s.hero}>
        <div className={s.heroLine} />
        <div className={s.heroCt}>
          <div>
            <div className={s.heroLabel}>Qui est Roseline Ngom</div>
            <h1 className={s.heroH1}>
              Casamançaise<br />de cœur.<br /><em>Experte de<br />conviction.</em>
            </h1>
            <p className={s.intro}>
              Fondatrice de TripAfro. Consultante en tourisme et développement. Spécialiste de la transformation digitale du tourisme africain. <strong>Entre Paris et Dakar depuis 10 ans.</strong>
            </p>
            <div className={s.meta}>
              <div className={s.metaItem}><div className={s.mN}>10 ans</div><div className={s.mL}>de terrain au Sénégal</div></div>
              <div className={s.metaItem}><div className={s.mN}>2 000+</div><div className={s.mL}>voyageurs accompagnés</div></div>
              <div className={s.metaItem}><div className={s.mN}>35K</div><div className={s.mL}>communauté TripAfro</div></div>
            </div>
          </div>
          <div className={s.heroRight}>
            <div className={s.heroPhoto}>
              <Image src="/images/roseline-portrait-1.jpg" alt="Roseline Ngom" width={400} height={500} priority style={{ width: '100%', height: 'auto' }} />
              <div className={s.caption}>Tourisme · Culture · Développement</div>
            </div>
          </div>
        </div>
      </section>

      {/* MON HISTOIRE */}
      <section className={s.histoire}>
        <div className={s.histoireIn}>
          <div className={`${s.label} ${s.fi}`}>Mon histoire</div>
          <div className={`${s.stitle} ${s.fi}`}>
            Tout a commencé par un pays<br />qu&apos;on m&apos;a appris à aimer.
          </div>

          <div className={`${s.chapter} ${s.fi}`}>
            <div className={s.chLabel}>Les racines</div>
            <h2>Je suis née entre deux mondes.</h2>
            <p>Sénégalaise d&apos;origine, enracinée en Casamance, élevée en France. Comme des millions de personnes de la diaspora, j&apos;ai grandi en écoutant les histoires d&apos;un pays que je portais dans le cœur sans toujours savoir comment y revenir.</p>
            <p><strong>Le Sénégal n&apos;était pas un lieu de vacances. C&apos;était une identité.</strong> Un goût, une musique, une manière d&apos;accueillir, une chaleur qui ne s&apos;explique pas. Et un jour, j&apos;ai décidé que cette identité méritait d&apos;être partagée. Pas dans un musée. Dans la vraie vie.</p>
          </div>

          <div className={`${s.histoirePhoto} ${s.fi}`}>
            <Image src="/images/senegal/cover.jpg" alt="Sénégal" width={600} height={400} style={{ width: '100%', height: 'clamp(200px, 22vw, 300px)', objectFit: 'cover' }} />
            <Image src="/images/senegal/saint-louis.jpg" alt="Saint-Louis" width={600} height={400} style={{ width: '100%', height: 'clamp(200px, 22vw, 300px)', objectFit: 'cover' }} />
          </div>

          <div className={`${s.chapter} ${s.fi}`}>
            <div className={s.chLabel}>Le déclic</div>
            <h2>TripAfro est né d&apos;une frustration.</h2>
            <p>Les agences de voyage vendaient un Sénégal de carte postale. Des plages, des hôtels all-inclusive, des excursions minutées. Rien de ce que je connaissais. Rien de ce que mes grands-parents m&apos;avaient transmis.</p>
            <p>J&apos;ai créé TripAfro pour offrir <strong>l&apos;autre Sénégal</strong>. Celui des rencontres, des saveurs, des silences. Celui où on navigue en pirogue dans les mangroves au lever du soleil. Celui où on mange thieboudienne chez une famille, pas dans un restaurant pour touristes.</p>
            <p>En 10 ans, plus de 2 000 voyageurs m&apos;ont fait confiance. Des familles diaspora. Des couples mixtes. Des aventuriers solo. Des groupes d&apos;amis. <strong>Chacun est reparti transformé.</strong></p>
          </div>

          <div className={`${s.pullQuote} ${s.fi}`}>« Le Sénégal m&apos;a tout appris. Mon travail, c&apos;est de vous transmettre ce qu&apos;il m&apos;a donné. »</div>

          <div className={`${s.chapter} ${s.fi}`}>
            <div className={s.chLabel}>L&apos;évolution</div>
            <h2>Du voyage à l&apos;écosystème.</h2>
            <p>Au fil des années, j&apos;ai réalisé que le tourisme sénégalais avait besoin de plus que des voyages. Il avait besoin de <strong>stratégie, de digital, d&apos;accompagnement</strong>. Des hôtels sans site web. Des agences sans stratégie. Des porteurs de projets diaspora sans méthode.</p>
            <p>J&apos;ai élargi mon expertise. Master en Finance à l&apos;INSEEC. Formation à l&apos;IA appliquée. Maîtrise des outils d&apos;automation (N8N, Supabase, Claude API). Aujourd&apos;hui, je combine <strong>la connaissance du terrain et la puissance du digital</strong> pour accompagner tout l&apos;écosystème touristique africain.</p>
          </div>

          <div className={`${s.histoirePhoto} ${s.single} ${s.fi}`}>
            <Image src="/images/roseline-portrait-2.jpg" alt="Roseline au Sénégal" width={1000} height={500} style={{ width: '100%', height: 'clamp(250px, 28vw, 380px)', objectFit: 'cover' }} />
          </div>

          <div className={`${s.chapter} ${s.fi}`}>
            <div className={s.chLabel}>Aujourd&apos;hui</div>
            <h2>4 missions. 1 vision.</h2>
            <p>Tout ce que je fais converge vers une seule idée : <strong>révéler le potentiel du Sénégal.</strong> À travers les voyages immersifs TripAfro. À travers le consulting stratégique pour les acteurs du tourisme et de la culture. À travers la transformation digitale. À travers les formations.</p>
            <p>Mon rôle n&apos;est pas de vendre un pays. C&apos;est de le construire. Brique par brique, voyage par voyage, projet par projet.</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className={s.parcours}>
        <div className={s.parcoursIn}>
          <div className={`${s.label} ${s.fi}`}>Parcours</div>
          <div className={`${s.stitle} ${s.fi}`}>Les étapes clés.</div>
          <div className={`${s.tl} ${s.fi}`}>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2015</div><h3>Premiers pas dans le tourisme sénégalais</h3><p>Premières excursions organisées pour la diaspora. Découverte du potentiel et des lacunes du secteur.</p></div>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2017</div><h3>Création de TripAfro</h3><p>Lancement officiel de la marque. Premiers groupes de voyageurs. Construction de la communauté Instagram.</p></div>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2019</div><h3>35 000 abonnés</h3><p>TripAfro devient une référence pour la diaspora. Expansion des offres : Retour aux Sources, Voyage Signature.</p></div>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2021</div><h3>Master Finance INSEEC</h3><p>Consolidation des compétences en stratégie, finance, business plan. Pont entre le terrain et la rigueur académique.</p></div>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2023</div><h3>Lancement du consulting</h3><p>Premiers audits stratégiques pour des hôtels et agences. Accompagnement de porteurs de projets diaspora.</p></div>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2025</div><h3>Pivot digital &amp; IA</h3><p>Formation à l&apos;IA, maîtrise de N8N, Supabase, Claude API. Lancement des offres Digital &amp; IA pour le tourisme.</p></div>
            <div className={s.tlItem}><div className={s.dot} /><div className={s.tlYear}>2026</div><h3>L&apos;écosystème complet</h3><p>Voyages + Consulting + Digital &amp; IA + Guides + Back to Senegal. Une seule mission : révéler le Sénégal.</p></div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className={s.expertise}>
        <div className={s.expertiseIn}>
          <div className={`${s.label} ${s.fi}`}>Ce que je fais</div>
          <div className={`${s.stitle} ${s.fi}`}>4 verticales. 1 écosystème.</div>
          <div className={s.expGrid}>
            <div className={`${s.exp} ${s.fi}`}>
              <div className={s.eIco}>✈️</div>
              <h3>Voyages immersifs</h3>
              <p>Séjours authentiques au Sénégal. Retour aux Sources (14j), Voyage Signature (sur mesure), Back to Senegal (accélérateur).</p>
              <a href="/voyages">Découvrir les voyages →</a>
            </div>
            <div className={`${s.exp} ${s.fi} ${s.fiD1}`}>
              <div className={s.eIco}>📋</div>
              <h3>Consulting stratégique</h3>
              <p>Audit, accompagnement et conseil pour les acteurs du tourisme, de la culture et les institutions au Sénégal.</p>
              <a href="/consulting">En savoir plus →</a>
            </div>
            <div className={`${s.exp} ${s.fi} ${s.fiD2}`}>
              <div className={s.eIco}>🤖</div>
              <h3>Digital &amp; IA</h3>
              <p>Présence digitale, transformation, IA appliquée et formations pour hôtels, agences et opérateurs culturels.</p>
              <a href="/digital-ia">Découvrir les offres →</a>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className={s.valeurs}>
        <div className={s.valeursIn}>
          <div className={`${s.label} ${s.fi}`} style={{ color: '#F6C961' }}>Ce en quoi je crois</div>
          <div className={`${s.stitle} ${s.fi}`} style={{ color: 'white' }}>4 convictions qui guident tout ce que je fais.</div>
          <div className={s.valGrid}>
            <div className={`${s.val} ${s.fi}`}>
              <div className={s.vIco}>🌱</div>
              <div><h3>Le terrain d&apos;abord</h3><p>Pas de théorie sans vécu. Chaque recommandation, chaque itinéraire, chaque stratégie est née sur le terrain. Pas dans un bureau.</p></div>
            </div>
            <div className={`${s.val} ${s.fi} ${s.fiD1}`}>
              <div className={s.vIco}>🤝</div>
              <div><h3>La confiance se mérite</h3><p>Je ne promets que ce que je peux tenir. Chaque client, chaque voyageur, chaque institution reçoit le même niveau d&apos;engagement.</p></div>
            </div>
            <div className={`${s.val} ${s.fi} ${s.fiD2}`}>
              <div className={s.vIco}>🌐</div>
              <div><h3>L&apos;Afrique ne se visite pas, elle se vit</h3><p>Le tourisme n&apos;est pas une industrie extractive. C&apos;est un outil de développement, de fierté, de transmission. Je le pratique comme tel.</p></div>
            </div>
            <div className={`${s.val} ${s.fi} ${s.fiD3}`}>
              <div className={s.vIco}>🚀</div>
              <div><h3>Le digital au service de l&apos;humain</h3><p>L&apos;IA et l&apos;automation ne remplacent pas la teranga. Ils libèrent du temps pour ce qui compte : l&apos;accueil, la relation, l&apos;expérience.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTOS PERSO */}
      <section className={s.photosPerso}>
        <div className={s.photosIn}>
          <div className={`${s.label} ${s.fi}`}>En images</div>
          <div className={`${s.stitle} ${s.fi}`}>Quelques moments.</div>
          <div className={`${s.photoMosaic} ${s.fi}`}>
            <div><Image src="/images/roseline-portrait-3.jpg" alt="Roseline, portrait" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
            <div><Image src="/images/senegal/cover.jpg" alt="Sénégal" fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} /></div>
            <div><Image src="/images/senegal/saint-louis.jpg" alt="Saint-Louis" fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} /></div>
            <div><Image src="/images/roseline-portrait-2.jpg" alt="Roseline" fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} /></div>
            <div><Image src="/images/roseline.jpg" alt="Roseline" fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} /></div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className={s.video}>
        <div className={`${s.videoIn} ${s.fi}`}>
          <div className={s.label}>En vidéo</div>
          <div className={s.stitle}>Le Monument de la Renaissance, vu par Roseline</div>
          <div className={s.vw}>
            <iframe src="https://www.youtube.com/embed/1mQm-hhOaws" title="Monument Renaissance" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <h2 className={s.fi}>Envie de travailler ensemble ?<br /><em>Parlons-en.</em></h2>
        <p className={s.fi}>Que vous souhaitiez voyager, entreprendre ou transformer votre activité digitale, je suis là pour vous accompagner.</p>
        <div className={`${s.ctaBtns} ${s.fi}`}>
          <a href="https://calendly.com/roselinengom" className={s.bg}>Réserver un échange gratuit</a>
          <a href="https://wa.me/33650329808" className={s.bo}>Discuter sur WhatsApp →</a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
