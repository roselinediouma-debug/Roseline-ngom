import { wrapInEmailTemplate } from './baseTemplate'

const SITE_URL = 'https://www.roselinengom.com'

const buttonStyle =
  'display:inline-block;background-color:#F6C961;color:#560E13;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:700;'

export function getGuidePurchaseEmail(
  prenom: string,
  guideName: string,
  guideSlug: string
): { subject: string; htmlContent: string } {
  const subject = `Votre guide est prêt, ${prenom}`

  const body = `
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Bonjour ${prenom},
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Merci pour votre achat ! Votre guide <strong>${guideName}</strong> est
      maintenant disponible. Vous pouvez le télécharger en cliquant sur le
      bouton ci-dessous.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}/guides/${guideSlug}/download" style="${buttonStyle}">
            Télécharger mon guide
          </a>
        </td>
      </tr>
    </table>
    <div style="background-color:#F8F5F0;border-radius:12px;padding:20px 24px;margin:0 0 24px;">
      <p style="font-size:14px;line-height:1.6;margin:0 0 8px;color:#560E13;font-weight:700;">
        Bon à savoir
      </p>
      <ul style="margin:0;padding:0 0 0 18px;font-size:14px;line-height:1.8;color:#333333;">
        <li>Votre guide est mis à jour pendant 12 mois. Vous recevrez les
          nouvelles versions par email automatiquement.</li>
        <li>Vous disposez d'un délai de 14 jours pour demander un remboursement,
          sans justification. Il suffit de répondre à cet email.</li>
      </ul>
    </div>
    <p style="font-size:15px;line-height:1.6;margin:0 0 16px;color:#333333;">
      Si vous avez la moindre question, répondez directement à cet email.
      Je lis tout personnellement.
    </p>
    <p style="margin:24px 0 4px;font-size:15px;line-height:1.6;color:#333333;">
      Bon voyage,
    </p>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:18px;color:#560E13;font-weight:600;">
      Roseline
    </p>
    <div style="border-top:1px solid #e0d8d0;padding-top:16px;">
      <p style="font-size:13px;line-height:1.6;margin:0;color:#666666;">
        <strong>P.S.</strong> Si vous n'avez pas encore le bundle complet,
        jetez un oeil au
        <a href="${SITE_URL}/guides/bundle-decouverte" style="color:#560E13;font-weight:600;text-decoration:underline;">
          bundle découverte</a>
        qui réunit tous les guides à prix réduit.
      </p>
    </div>`

  const htmlContent = wrapInEmailTemplate({
    preheader: `Votre guide ${guideName} est prêt à télécharger.`,
    body,
  })

  return { subject, htmlContent }
}
