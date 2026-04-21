/**
 * Email transactionnel de livraison du guide "Le Bled Autrement" (lead magnet diaspora).
 * Appelé depuis /api/capture quand source === 'le-bled-autrement'.
 */

const SITE_URL = 'https://www.roselinengom.com'
const PDF_URL = `${SITE_URL}/le-bled-autrement.pdf`
const CALENDLY_URL = 'https://calendly.com/roselinengom/decouverte-15min'
const RETOUR_URL = `${SITE_URL}/voyages/retour-aux-sources`
const YOUTUBE_URL = 'https://www.youtube.com/@RoselineNgom'
const INSTAGRAM_URL = 'https://www.instagram.com/roselinengom'
const TIKTOK_URL = 'https://www.tiktok.com/@roselinengom'
const LINKEDIN_URL = 'https://www.linkedin.com/in/roselinengom'

const C = {
  bordeaux: '#560E13',
  or: '#F6C961',
  creme: '#F8F5F0',
  blanc: '#FEFCF9',
  noir: '#0A0A0A',
}

export function bledAutrementDeliveryEmail({ prenom }: { prenom?: string }) {
  const greeting = prenom && prenom.trim() ? `Bonjour ${prenom.trim()},` : 'Bonjour,'

  const subject = 'Le Bled Autrement, votre guide est prêt'

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.creme};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${C.noir};">
  <span style="display:none;font-size:1px;color:${C.creme};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">Votre guide diaspora 14 pages est à l'intérieur.</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.creme};padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:${C.blanc};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(86,14,19,0.08);">

          <tr>
            <td style="background-color:${C.bordeaux};padding:32px 32px 28px;text-align:center;">
              <div style="color:${C.or};font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Roseline Ngom</div>
              <div style="color:${C.blanc};font-size:22px;font-weight:600;font-family:Georgia,'Times New Roman',serif;">Le Bled Autrement</div>
              <div style="color:${C.or};font-size:12px;margin-top:4px;letter-spacing:1.5px;">GUIDE DIASPORA · 14 PAGES</div>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 32px 24px;">
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${greeting}</p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
                Merci. Vraiment. Tu viens de faire un premier pas que beaucoup de gens de la diaspora n'osent jamais faire : poser les bonnes questions.
              </p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">
                Dans ce guide, je n'ai pas voulu écrire un énième "20 choses à faire au Sénégal".
                J'ai voulu parler de <em>nous</em>. De ce retour qu'on rêve, qu'on fuit, qu'on refait chaque été. Des blocages silencieux.
                De comment transmettre aux enfants sans forcer.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:12px 0 32px;">
                <tr>
                  <td align="center">
                    <a href="${PDF_URL}" style="display:inline-block;background-color:${C.or};color:${C.bordeaux};text-decoration:none;padding:16px 36px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">
                      Télécharger le PDF
                    </a>
                  </td>
                </tr>
              </table>

              <div style="background-color:${C.creme};border-radius:12px;padding:24px;margin:0 0 28px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.bordeaux};font-weight:700;margin-bottom:12px;">Au sommaire</div>
                <ul style="margin:0;padding:0 0 0 18px;font-size:14px;line-height:1.9;">
                  <li>Ce schéma qu'on connaît tous</li>
                  <li>Les 3 types de retour (familial · vacances · racines)</li>
                  <li>Les 5 blocages silencieux de la diaspora</li>
                  <li>Transmettre aux enfants et au conjoint non-africain</li>
                  <li>Arrêter de faire le touriste dans son propre pays</li>
                  <li>Régions, hospitalité, cuisine, au-delà de Dakar</li>
                </ul>
              </div>

              <div style="height:2px;background-color:${C.or};margin:32px 0;border-radius:2px;"></div>

              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${C.bordeaux};margin:0 0 12px;font-weight:600;">
                Et si ton prochain retour était différent ?
              </div>
              <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
                Une fois par an, j'accompagne un petit groupe (8 à 15 personnes) dans un vrai voyage de racines, 14 jours, Dakar, Gorée, Sine Saloum, Casamance.
                Ce n'est ni un circuit touristique, ni un retour familial. C'est autre chose.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right:8px;">
                    <a href="${RETOUR_URL}" style="display:inline-block;background-color:${C.bordeaux};color:${C.blanc};text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;">
                      Découvrir Retour aux Sources
                    </a>
                  </td>
                  <td>
                    <a href="${CALENDLY_URL}" style="display:inline-block;background-color:${C.creme};color:${C.bordeaux};text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;border:1px solid ${C.bordeaux};">
                      Réserver 15 min
                    </a>
                  </td>
                </tr>
              </table>

              <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e8e0d8;">
                <p style="font-size:15px;line-height:1.6;margin:0 0 8px;">Avec teranga,</p>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:${C.bordeaux};font-weight:600;">Roseline</div>
                <div style="font-size:12px;opacity:0.6;margin-top:2px;">Fondatrice TripAfro</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color:${C.creme};padding:32px 32px 16px;text-align:center;">
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.bordeaux};font-weight:700;margin-bottom:14px;">Retrouvez-moi</div>
              <div style="font-size:13px;line-height:2.2;">
                <a href="${YOUTUBE_URL}" style="color:${C.bordeaux};text-decoration:none;font-weight:600;">YouTube</a>
                &nbsp;·&nbsp;
                <a href="${INSTAGRAM_URL}" style="color:${C.bordeaux};text-decoration:none;font-weight:600;">Instagram</a>
                &nbsp;·&nbsp;
                <a href="${TIKTOK_URL}" style="color:${C.bordeaux};text-decoration:none;font-weight:600;">TikTok</a>
                &nbsp;·&nbsp;
                <a href="${LINKEDIN_URL}" style="color:${C.bordeaux};text-decoration:none;font-weight:600;">LinkedIn</a>
              </div>
              <div style="height:1px;background-color:${C.or};opacity:0.3;margin:20px auto;max-width:200px;"></div>
              <div style="font-size:11px;opacity:0.5;margin-top:12px;line-height:1.6;">
                Vous recevez cet email parce que vous avez demandé Le Bled Autrement sur roselinengom.com.<br/>
                Pour vous désinscrire, répondez à cet email avec "STOP".
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
