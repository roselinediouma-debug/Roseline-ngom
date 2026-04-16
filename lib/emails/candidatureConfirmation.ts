import { wrapInEmailTemplate } from './baseTemplate'

const SITE_URL = 'https://www.roselinengom.com'

const buttonStyle =
  'display:inline-block;background-color:#F6C961;color:#560E13;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:700;'

export function getCandidatureConfirmationEmail(
  prenom: string,
  programme: string
): { subject: string; htmlContent: string } {
  const subject = `Candidature reçue - ${programme}`

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Votre candidature pour le programme <strong>${programme}</strong> a bien
      été reçue. Merci pour votre intérêt !
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Voici les prochaines étapes :
    </p>
    <ul style="margin:0 0 20px;padding:0 0 0 18px;font-size:15px;line-height:1.9;color:#333333;">
      <li>Je prends le temps d'étudier chaque candidature individuellement.</li>
      <li>Vous recevrez une réponse sous 5 jours ouvrables.</li>
      <li>Si votre profil correspond, je vous proposerai un appel pour
        échanger plus en détail.</li>
    </ul>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      En attendant, pensez à vérifier votre boîte mail (et vos spams) pour
      ne pas manquer ma réponse.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/voyages/back-to-senegal" style="${buttonStyle}">
            En savoir plus sur le programme
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 4px;font-size:15px;line-height:1.6;color:#333333;">
      À bientôt,
    </p>
    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#560E13;font-weight:600;">
      Roseline
    </p>`

  const htmlContent = wrapInEmailTemplate({
    preheader: `Votre candidature pour ${programme} est bien enregistrée.`,
    body,
  })

  return { subject, htmlContent }
}
