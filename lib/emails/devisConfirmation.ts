import { wrapInEmailTemplate } from './baseTemplate'

const CALENDLY_URL = 'https://calendly.com/roselinengom/decouverte-15min'

const buttonStyle =
  'display:inline-block;background-color:#F6C961;color:#560E13;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:700;'

export function getDevisConfirmationEmail(
  prenom: string
): { subject: string; htmlContent: string } {
  const subject = 'Demande de devis reçue'

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Votre demande de devis a bien été reçue. Merci de votre confiance !
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Je prends le temps d'étudier votre projet en détail et je vous enverrai
      une proposition personnalisée sous 48 heures.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333333;">
      Si votre demande est urgente, vous pouvez me contacter directement par
      WhatsApp au <strong>+33 6 XX XX XX XX</strong>. Sinon, le plus simple
      est de réserver un créneau pour qu'on en discute ensemble :
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${CALENDLY_URL}" style="${buttonStyle}">
            Réserver un appel découverte
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 4px;font-size:15px;line-height:1.6;color:#333333;">
      À très vite,
    </p>
    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#560E13;font-weight:600;">
      Roseline
    </p>`

  const htmlContent = wrapInEmailTemplate({
    preheader: 'Votre demande de devis est bien enregistrée.',
    body,
  })

  return { subject, htmlContent }
}
