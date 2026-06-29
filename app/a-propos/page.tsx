import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BRAND = '#560E13'
const CREAM = '#FEFCF9'
const INK = '#0A0A0A'

export const metadata: Metadata = {
  title: 'À propos — Roseline Ngom',
  description: "L'histoire personnelle de Roseline Ngom. Pourquoi la diaspora, pourquoi TripAfro, pourquoi les récits nationaux des pays francophones, pourquoi l'IA, pourquoi maintenant.",
}

const paragraph: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant), serif',
  fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
  lineHeight: 1.75,
  color: INK,
  marginBottom: 28,
  fontWeight: 400,
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: BRAND,
  opacity: 0.7,
  marginTop: 64,
  marginBottom: 22,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
}

const sectionRule = (
  <span
    aria-hidden
    style={{ width: 28, height: 1, background: BRAND, opacity: 0.4, display: 'inline-block' }}
  />
)

export default function AProposPage() {
  return (
    <>
      <Nav variant="solid" />
      <main style={{ backgroundColor: CREAM, minHeight: '100vh', padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 6rem' }}>
        <article style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* eyebrow */}
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: BRAND, opacity: 0.65, marginBottom: 28 }}>
            / À propos
          </div>

          {/* opening line — geante, italique, intime */}
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontWeight: 500,
              color: BRAND,
              fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.005em',
              marginBottom: 56,
              maxWidth: 640,
            }}
          >
            Je ne suis pas arrivée dans le tourisme par hasard.
          </h1>

          {/* texte ouverture */}
          <p style={paragraph}>
            Je suis née quelque part entre deux pays. Une enfance française avec, dans la voix de mes parents, un Sénégal qu&apos;on me racontait à demi-mot. Une mémoire qui ne se transmettait pas en ligne droite. Une histoire qui m&apos;appartenait sans m&apos;avoir été vraiment donnée.
          </p>
          <p style={paragraph}>
            La première fois que j&apos;ai marché sur le sable de Dakar, j&apos;ai compris qu&apos;il existait un mot pour ce que je vivais. Pas «&nbsp;voyage&nbsp;». Pas «&nbsp;découverte&nbsp;». Quelque chose de plus grave, de plus tendre, qui ressemblait à une reconnaissance.
          </p>

          {/* La diaspora */}
          <div style={sectionLabel}>{sectionRule} Pourquoi la diaspora</div>
          <p style={paragraph}>
            J&apos;ai compris très vite que je n&apos;étais pas seule. Que des milliers de personnes comme moi vivaient ce même décalage entre l&apos;héritage et le récit. Qu&apos;il manquait des gens pour traduire, accompagner, mettre des mots.
          </p>
          <p style={paragraph}>
            La diaspora n&apos;est pas une cible commerciale. C&apos;est une condition. Et personne n&apos;avait construit pour elle une expérience qui ressemble à la dignité de cette condition. C&apos;est devenu mon point de départ.
          </p>

          {/* TripAfro */}
          <div style={sectionLabel}>{sectionRule} Pourquoi TripAfro</div>
          <p style={paragraph}>
            J&apos;ai fondé TripAfro en 2016 parce que j&apos;avais besoin de toucher le terrain avant d&apos;avoir le droit d&apos;en parler. Dix ans plus tard, plus d&apos;un millier de voyageurs ont fait leur retour avec moi. J&apos;ai dormi dans cent maisons, mangé sous cent toits, écouté cent histoires. C&apos;est ma colonne vertébrale.
          </p>
          <p style={paragraph}>
            TripAfro continue, séparément. Mais TripAfro a fait son travail. Il m&apos;a donné le droit de penser plus largement. De parler de désirabilité, de récit national, d&apos;attractivité économique. Sans terrain, je n&apos;aurais pas eu cette légitimité. C&apos;est pour cela que je l&apos;appelle aujourd&apos;hui un laboratoire.
          </p>

          {/* Les récits */}
          <div style={sectionLabel}>{sectionRule} Pourquoi les récits</div>
          <p style={paragraph}>
            Parce qu&apos;à un moment, j&apos;ai vu une chose simple et brutale. Le Sénégal n&apos;a pas un problème d&apos;image, il a un problème de propriétaire d&apos;image. La Côte d&apos;Ivoire non plus. Le Bénin non plus. L&apos;Afrique francophone est racontée chaque jour par d&apos;autres, dans des langues qui ne sont pas tout à fait les siennes, avec des intentions qui ne sont pas toujours les nôtres.
          </p>
          <p style={paragraph}>
            Réparer cela n&apos;est pas un slogan. C&apos;est un métier. Stratégie, marketing territorial, attractivité, données, IA. C&apos;est ce métier que je construis.
          </p>

          {/* L'IA */}
          <div style={sectionLabel}>{sectionRule} Pourquoi l&apos;intelligence artificielle</div>
          <p style={paragraph}>
            Parce que les récits, désormais, se jouent aussi dans les modèles. Quand un voyageur, un investisseur, un étudiant tape le nom d&apos;un pays africain dans ChatGPT, Gemini, Perplexity ou Claude, ce sont des sources tierces qui répondent. Souvent en anglais. Souvent datées. Souvent biaisées par défaut.
          </p>
          <p style={paragraph}>
            Aucune nation africaine ne contrôle aujourd&apos;hui son récit dans les LLM. Et c&apos;est une asymétrie aussi importante, à mes yeux, que celles que l&apos;on dénonce depuis longtemps dans les médias traditionnels. J&apos;ai décidé que ce serait l&apos;un de mes terrains.
          </p>

          {/* Les territoires */}
          <div style={sectionLabel}>{sectionRule} Pourquoi les territoires</div>
          <p style={paragraph}>
            Parce qu&apos;une nation, c&apos;est un récit qui s&apos;incarne dans un sol. Et que conseiller une stratégie d&apos;attractivité sans aimer le territoire qu&apos;elle sert revient à écrire pour personne. J&apos;aime ces sols. Je les connais l&apos;un après l&apos;autre. Je crois qu&apos;ils méritent mieux que ce qu&apos;on dit d&apos;eux.
          </p>
          <p style={paragraph}>
            J&apos;ai commencé par l&apos;Afrique francophone, parce que c&apos;est de là que je viens et que c&apos;est là que la fenêtre est la plus étroite. Mon territoire de conseil s&apos;étend aujourd&apos;hui à toute la francophonie. De Bruxelles à Montréal, de Tunis à Genève, de Dakar à Pointe-à-Pitre. Une même langue, une même conversation sur le récit, des marchés différents.
          </p>

          {/* Maintenant */}
          <div style={sectionLabel}>{sectionRule} Pourquoi maintenant</div>
          <p style={paragraph}>
            Parce que la fenêtre est étroite. Coupe du monde 2030 au Maroc, refonte des plans nationaux, montée en puissance des LLM, retour d&apos;une diaspora qui veut investir, glissement géopolitique de l&apos;Afrique francophone. Tout se joue entre 2026 et 2030. Et celles et ceux qui décident vite, qui s&apos;équipent vite, qui structurent vite, prendront l&apos;avance pour quinze ans.
          </p>
          <p style={paragraph}>
            Je ne crois pas qu&apos;on rattrape ce genre de moment. Je crois qu&apos;on le saisit, ou qu&apos;on le regarde passer. Je préfère l&apos;option où il faut travailler.
          </p>

          {/* signature */}
          <div
            style={{
              marginTop: 72,
              paddingTop: 36,
              borderTop: '1px solid rgba(86,14,19,0.15)',
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
              color: BRAND,
              lineHeight: 1.5,
            }}
          >
            Roseline Ngom
          </div>
          <div
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.55)',
              marginTop: 6,
            }}
          >
            Paris · Dakar · 2026
          </div>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              marginTop: 56,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: BRAND,
              textDecoration: 'none',
              borderBottom: `1px solid ${BRAND}`,
              paddingBottom: 2,
            }}
          >
            ← Accueil
          </Link>
        </article>
      </main>
      <Footer />
    </>
  )
}
