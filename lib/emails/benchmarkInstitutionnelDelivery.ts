/**
 * Email transactionnel de livraison du benchmark institutionnel (Bénin · Maroc · Rwanda).
 * Appelé depuis /api/capture quand source === 'benchmark-institutionnel'.
 */

const SITE_URL = 'https://www.roselinengom.com'
const PDF_URL = `${SITE_URL}/benchmark-institutionnel.pdf`
const CALENDLY_URL = 'https://calendly.com/roselinengom/decouverte-15min'
const CONSULTING_URL = `${SITE_URL}/consulting/institutionnel`
const LINKEDIN_URL = 'https://www.linkedin.com/in/roselinengom'

const C = {
  bordeaux: '#560E13',
  or: '#F6C961',
  creme: '#F8F5F0',
  blanc: '#FEFCF9',
  noir: '#0A0A0A',
}

export function benchmarkInstitutionnelDeliveryEmail({
  prenom,
  organisation,
}: {
  prenom?: string
  organisation?: string
}) {
  const nom = prenom && prenom.trim() ? prenom.trim() : ''
  const orga = organisation && organisation.trim() ? organisation.trim() : ''
  const greeting = nom ? `Bonjour ${nom},` : 'Bonjour,'
  const orgaLine = orga
    ? `Merci pour votre intérêt ; bien noté que vous représentez ${orga}.`
    : 'Merci pour votre intérêt.'

  const subject = 'Benchmark Bénin · Maroc · Rwanda, votre rapport'

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.creme};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${C.noir};">
  <span style="display:none;font-size:1px;color:${C.creme};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">Votre rapport institutionnel est à l'intérieur.</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.creme};padding:24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:${C.blanc};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(86,14,19,0.08);">

          <tr>
            <td style="background-color:${C.bordeaux};padding:32px 32px 28px;text-align:center;">
              <div style="color:${C.or};font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Roseline Ngom · Consulting</div>
              <div style="color:${C.blanc};font-size:22px;font-weight:600;font-family:Georgia,'Times New Roman',serif;">Benchmark Bénin · Maroc · Rwanda</div>
              <div style="color:${C.or};font-size:12px;margin-top:4px;letter-spacing:1.5px;">POLITIQUE TOURISTIQUE COMPARÉE</div>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 32px 24px;">
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${greeting}</p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${orgaLine}</p>
              <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">
                Ce rapport est le fruit d'une analyse croisée des politiques touristiques de trois pays africains qui ont réussi,
                à des échelles et sur des positionnements très différents, à faire du tourisme un véritable levier de développement.
                L'objectif : proposer des pistes concrètes et transposables au contexte sénégalais.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:12px 0 32px;">
                <tr>
                  <td align="center">
                    <a href="${PDF_URL}" style="display:inline-block;background-color:${C.or};color:${C.bordeaux};text-decoration:none;padding:16px 36px;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">
                      Télécharger le rapport (PDF)
                    </a>
                  </td>
                </tr>
              </table>

              <div style="background-color:${C.creme};border-radius:12px;padding:24px;margin:0 0 28px;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.bordeaux};font-weight:700;margin-bottom:12px;">Au sommaire</div>
                <ul style="margin:0;padding:0 0 0 18px;font-size:14px;line-height:1.9;">
                  <li><strong>Bénin</strong>, marque pays, culture vaudou, capture diaspora</li>
                  <li><strong>Maroc</strong>, Vision 2020/2030, open sky, infrastructures, formation</li>
                  <li><strong>Rwanda</strong>, positionnement premium, MICE, monétisation par visiteur</li>
                  <li>Lectures croisées &amp; 5 leçons pour le Sénégal</li>
                  <li>Sources publiques, données OMT &amp; rapports ministériels</li>
                </ul>
              </div>

              <div style="height:2px;background-color:${C.or};margin:32px 0;border-radius:2px;"></div>

              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${C.bordeaux};margin:0 0 12px;font-weight:600;">
                Un échange de 30 minutes ?
              </div>
              <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
                Si votre institution souhaite approfondir une piste du rapport, travailler sur un plan d'action ou un audit de stratégie,
                je propose un premier échange gratuit et confidentiel.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right:8px;">
                    <a href="${CALENDLY_URL}" style="display:inline-block;background-color:${C.bordeaux};color:${C.blanc};text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;">
                      Réserver un échange
                    </a>
                  </td>
                  <td>
                    <a href="${CONSULTING_URL}" style="display:inline-block;background-color:${C.creme};color:${C.bordeaux};text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;border:1px solid ${C.bordeaux};">
                      Consulting institutionnel
                    </a>
                  </td>
                </tr>
              </table>

              <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e8e0d8;">
                <p style="font-size:15px;line-height:1.6;margin:0 0 8px;">Cordialement,</p>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;color:${C.bordeaux};font-weight:600;">Roseline Ngom</div>
                <div style="font-size:12px;opacity:0.6;margin-top:2px;">Consultante tourisme &amp; transformation digitale · Fondatrice TripAfro</div>
                <div style="font-size:12px;margin-top:6px;">
                  <a href="${LINKEDIN_URL}" style="color:${C.bordeaux};font-weight:600;text-decoration:none;">Me contacter sur LinkedIn</a>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color:${C.creme};padding:24px 32px;text-align:center;">
              <div style="font-size:11px;opacity:0.5;line-height:1.6;">
                Ce rapport vous est adressé à titre d'information institutionnelle suite à votre demande sur roselinengom.com.<br/>
                Pour vous désinscrire, répondez simplement à cet email.
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
