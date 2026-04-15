/**
 * Email transactionnel de livraison du guide Sénégal.
 * Appelé depuis /api/capture après création du contact Brevo.
 */

const SITE_URL = 'https://www.roselinengom.com'
const PDF_URL = `${SITE_URL}/guide-senegal-gratuit.pdf`
const CALENDLY_URL = 'https://calendly.com/roselinengom/15min'
const INSTAGRAM_URL = 'https://instagram.com/tripafro'

const C = {
  bordeaux: '#560E13',
  or: '#F6C961',
  creme: '#F8F5F0',
  blanc: '#FEFCF9',
  noir: '#0A0A0A',
}

export function guideDeliveryEmail({ prenom }: { prenom?: string }) {
  const greeting = prenom && prenom.trim() ? `Bonjour ${prenom.trim()},` : 'Bonjour,'

  const subject = 'Votre guide Sénégal est prêt — Roseline Ngom'

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.creme};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${C.noir};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.creme};padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:${C.blanc};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(86,14,19,0.08);">

          <!-- HEADER bordeaux -->
          <tr>
            <td style="background-color:${C.bordeaux};padding:32px 32px 28px;text-align:center;">
              <div style="color:${C.or};font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Roseline Ngom</div>
              <div style="color:${C.blanc};font-size:22px;font-weight:600;font-family:Georgia,'Times New Roman',serif;">10 expériences secrètes au Sénégal</div>
            </td>
          </tr>

          <!-- CORPS -->
          <tr>
            <td style="padding:40px 32px 24px;">
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:${C.noir};">${greeting}</p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:${C.noir};">
                Merci pour votre confiance — votre guide est prêt !
              </p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:${C.noir};">
                J'y ai rassemblé les 10 expériences que j'offre à mes amis quand ils viennent découvrir mon pays.
                Des lieux hors des sentiers battus, des conseils pratiques, et la pépite insider pour chaque expérience.
              </p>

              <!-- CTA principal -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:12px 0 32px;">
                <tr>
                  <td align="center">
                    <a href="${PDF_URL}" style="display:inline-block;background-color:${C.or};color:${C.bordeaux};text-decoration:none;padding:16px 36px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">
                      Télécharger mon guide (PDF)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Ce que contient le guide -->
              <div style="background-color:${C.creme};border-radius:12px;padding:24px;margin:0 0 28px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.bordeaux};font-weight:700;margin-bottom:12px;">Au sommaire</div>
                <ul style="margin:0;padding:0 0 0 18px;font-size:14px;line-height:1.9;color:${C.noir};">
                  <li>Le Lac Rose au coucher du soleil (avec la vraie saison)</li>
                  <li>Le marché aux pirogues de Mbour à l'aube</li>
                  <li>L'île de Carabane en bolong (Casamance profonde)</li>
                  <li>Gorée avec un historien local</li>
                  <li>Le pays Bassari, inscrit UNESCO</li>
                  <li>Le Delta du Saloum en pirogue traditionnelle</li>
                  <li>Saint-Louis de nuit, quartier Guet Ndar</li>
                  <li>Safari au Niokolo-Koba (lions + chimpanzés)</li>
                  <li>La lutte sénégalaise à Pikine</li>
                  <li>Bivouac dans le désert du Lompoul</li>
                </ul>
              </div>

              <!-- Séparateur or -->
              <div style="height:2px;background-color:${C.or};margin:32px 0;border-radius:2px;"></div>

              <!-- Bloc suite -->
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${C.bordeaux};margin:0 0 12px;font-weight:600;">
                Envie d'aller plus loin ?
              </div>
              <p style="font-size:15px;line-height:1.6;margin:0 0 20px;color:${C.noir};">
                Si vous préparez un voyage concret, réservez 15 minutes avec moi — on valide ensemble votre projet,
                sans engagement.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <a href="${CALENDLY_URL}" style="display:inline-block;background-color:${C.bordeaux};color:${C.blanc};text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;">
                      Réserver 15 min gratuites
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e8e0d8;">
                <p style="font-size:15px;line-height:1.6;margin:0 0 8px;color:${C.noir};">
                  À très vite,
                </p>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:${C.bordeaux};font-weight:600;">
                  Roseline
                </div>
                <div style="font-size:12px;color:${C.noir};opacity:0.6;margin-top:2px;">
                  Fondatrice TripAfro
                </div>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:${C.creme};padding:24px 32px;text-align:center;">
              <div style="font-size:12px;color:${C.noir};opacity:0.55;line-height:1.7;">
                <a href="${INSTAGRAM_URL}" style="color:${C.bordeaux};text-decoration:none;font-weight:600;">Instagram @tripafro</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}" style="color:${C.bordeaux};text-decoration:none;font-weight:600;">roselinengom.com</a>
              </div>
              <div style="font-size:11px;color:${C.noir};opacity:0.4;margin-top:12px;line-height:1.6;">
                Vous recevez cet email parce que vous avez demandé le guide Sénégal sur roselinengom.com.<br/>
                Pour vous désinscrire, répondez simplement à cet email avec "STOP".
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, htmlContent }
}
