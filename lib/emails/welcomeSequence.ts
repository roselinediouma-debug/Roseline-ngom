import { wrapInEmailTemplate } from './baseTemplate'

const SITE_URL = 'https://www.roselinengom.com'

const buttonStyle =
  'display:inline-block;background-color:#F6C961;color:#560E13;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:700;'

function signature(): string {
  return `
    <p style="margin:24px 0 4px;font-size:15px;line-height:1.6;color:#333333;">
      À très vite,
    </p>
    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#560E13;font-weight:600;">
      Roseline
    </p>`
}

export function getWelcomeEmail(
  step: number,
  prenom: string
): { subject: string; htmlContent: string } {
  switch (step) {
    case 1:
      return step1(prenom)
    case 2:
      return step2(prenom)
    case 3:
      return step3(prenom)
    case 4:
      return step4(prenom)
    case 5:
      return step5(prenom)
    default:
      throw new Error(`Welcome sequence step ${step} does not exist (1-5)`)
  }
}

/* ------------------------------------------------------------------ */
/*  STEP 1 : J+0 - Bienvenue                                         */
/* ------------------------------------------------------------------ */
function step1(prenom: string) {
  const subject = `Bienvenue ${prenom} !`

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Merci d'avoir téléchargé le guide gratuit ! J'espère qu'il vous donnera
      déjà plein d'idées pour votre futur voyage au Sénégal.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Je suis Roseline, franco-sénégalaise et fondatrice de TripAfro.
      Je crée des contenus et des guides pour aider les voyageurs à découvrir
      le Sénégal autrement, loin des circuits touristiques classiques.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      Si vous voulez suivre mes coulisses, mes bons plans et mes dernières
      découvertes, retrouvez-moi sur Instagram :
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="https://instagram.com/roselinengom" style="${buttonStyle}">
            Me suivre sur Instagram
          </a>
        </td>
      </tr>
    </table>
    ${signature()}`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Votre guide est prêt, et ce n\'est que le début.',
    body,
  })

  return { subject, htmlContent }
}

/* ------------------------------------------------------------------ */
/*  STEP 2 : J+3 - 3 erreurs à éviter                                */
/* ------------------------------------------------------------------ */
function step2(prenom: string) {
  const subject = '3 erreurs à éviter au Sénégal'

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Quand on prépare son premier voyage au Sénégal, certaines erreurs
      reviennent tout le temps. Je les vois chaque semaine dans les messages
      que je reçois.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      J'ai regroupé les 3 plus fréquentes dans un article sur le blog, avec
      les solutions concrètes pour les éviter.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      5 minutes de lecture qui peuvent vous faire économiser du temps, de
      l'argent et quelques galères.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/blog" style="${buttonStyle}">
            Lire l'article
          </a>
        </td>
      </tr>
    </table>
    ${signature()}`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Évitez ces erreurs classiques avant de partir.',
    body,
  })

  return { subject, htmlContent }
}

/* ------------------------------------------------------------------ */
/*  STEP 3 : J+7 - Organiser en 7 jours                              */
/* ------------------------------------------------------------------ */
function step3(prenom: string) {
  const subject = 'Comment organiser votre voyage en 7 jours'

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Une semaine au Sénégal, c'est le format idéal pour un premier voyage.
      Mais encore faut-il savoir quoi mettre dedans pour ne rien rater.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      J'ai créé un guide complet avec un itinéraire jour par jour, les
      hébergements testés, les budgets détaillés et tous mes contacts
      sur place.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      Tout est prêt pour que vous n'ayez plus qu'à faire vos valises.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/guides/guide-senegal-7jours" style="${buttonStyle}">
            Découvrir le guide 7 jours
          </a>
        </td>
      </tr>
    </table>
    ${signature()}`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Un itinéraire jour par jour pour votre premier voyage.',
    body,
  })

  return { subject, htmlContent }
}

/* ------------------------------------------------------------------ */
/*  STEP 4 : J+14 - La Casamance                                     */
/* ------------------------------------------------------------------ */
function step4(prenom: string) {
  const subject = 'La Casamance, le secret le mieux gardé du Sénégal'

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Il y a un endroit au Sénégal dont on parle peu, et c'est justement ce
      qui fait son charme. La Casamance, c'est des forêts de mangroves, des
      îles accessibles uniquement en pirogue, une gastronomie incroyable et
      une culture à part entière.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      J'y retourne chaque année, et chaque fois je découvre quelque chose de
      nouveau. J'ai tout rassemblé dans un guide dédié.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      Si vous cherchez une expérience authentique loin du tourisme de masse,
      la Casamance est faite pour vous.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/guides/guide-casamance" style="${buttonStyle}">
            Découvrir le guide Casamance
          </a>
        </td>
      </tr>
    </table>
    ${signature()}`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Mangroves, îles et culture : la Casamance vous attend.',
    body,
  })

  return { subject, htmlContent }
}

/* ------------------------------------------------------------------ */
/*  STEP 5 : J+21 - Le bundle                                        */
/* ------------------------------------------------------------------ */
function step5(prenom: string) {
  const subject = 'Le bundle : tout ce qu\'il faut pour partir'

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Depuis quelques semaines, je vous partage mes conseils pour préparer
      votre voyage au Sénégal. Si vous êtes décidé à partir, j'ai réuni
      tous mes guides dans un bundle complet à prix réduit.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Le bundle inclut le guide 7 jours, le guide Casamance, et tous les
      bonus : check-lists, contacts sur place, itinéraires alternatifs.
      Vous économisez par rapport à l'achat séparé.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      C'est la formule idéale pour partir l'esprit tranquille.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/guides/bundle-decouverte" style="${buttonStyle}">
            Voir le bundle découverte
          </a>
        </td>
      </tr>
    </table>
    ${signature()}`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Tous les guides réunis dans un seul pack.',
    body,
  })

  return { subject, htmlContent }
}
