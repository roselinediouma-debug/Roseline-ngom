import { wrapInEmailTemplate } from './baseTemplate'

const SITE_URL = 'https://www.roselinengom.com'

const buttonStyle =
  'display:inline-block;background-color:#F6C961;color:#560E13;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:700;'

export function getNewsletterWelcomeEmail(
  prenom: string
): { subject: string; htmlContent: string } {
  const subject = 'Bienvenue dans La Teranga'

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bienvenue dans <strong>La Teranga</strong>, ma newsletter dédiée au
      Sénégal et aux voyages en Afrique de l'Ouest. Je suis ravie de vous
      compter parmi les lecteurs.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Voici ce que vous recevrez, environ deux fois par mois :
    </p>
    <ul style="margin:0 0 20px;padding:0 0 0 18px;font-size:15px;line-height:1.9;color:#333333;">
      <li>Des destinations et itinéraires détaillés</li>
      <li>Des conseils pratiques (budget, santé, logistique)</li>
      <li>Les coulisses de mes voyages et de TripAfro</li>
    </ul>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      En attendant la prochaine édition, vous pouvez télécharger le guide
      gratuit si ce n'est pas déjà fait :
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/guide" style="${buttonStyle}">
            Télécharger le guide gratuit
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 4px;font-size:15px;line-height:1.6;color:#333333;">
      À très vite dans votre boîte mail,
    </p>
    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#560E13;font-weight:600;">
      Roseline
    </p>`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Bienvenue ! Découvrez ce qui vous attend dans La Teranga.',
    body,
  })

  return { subject, htmlContent }
}
