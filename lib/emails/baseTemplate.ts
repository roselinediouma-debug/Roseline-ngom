export function wrapInEmailTemplate({
  preheader,
  body,
}: {
  preheader?: string;
  body: string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Roseline Ngom</title>
</head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Arial,Helvetica,sans-serif;">
  ${
    preheader
      ? `<span style="display:none;font-size:1px;color:#F8F5F0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>`
      : ""
  }

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F5F0;padding:24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FEFCF9;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#560E13;padding:32px;text-align:center;">
              <span style="color:#F6C961;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;font-family:Arial,Helvetica,sans-serif;">ROSELINE NGOM</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#333333;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e0d8d0;padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <span style="font-size:12px;color:#666666;">Retrouvez-moi</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <a href="https://youtube.com/@roselinengom" style="color:#560E13;font-size:12px;text-decoration:none;">YouTube</a>
                    <span style="color:#999999;font-size:12px;"> &middot; </span>
                    <a href="https://instagram.com/roselinengom" style="color:#560E13;font-size:12px;text-decoration:none;">Instagram</a>
                    <span style="color:#999999;font-size:12px;"> &middot; </span>
                    <a href="https://tiktok.com/@roselinengom" style="color:#560E13;font-size:12px;text-decoration:none;">TikTok</a>
                    <span style="color:#999999;font-size:12px;"> &middot; </span>
                    <a href="https://linkedin.com/in/roselinengom" style="color:#560E13;font-size:12px;text-decoration:none;">LinkedIn</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <span style="font-size:11px;color:#999999;">@tripafro &middot; 24&nbsp;000+ abonn&eacute;s</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <span style="font-size:11px;color:#999999;">&copy; 2025 Roseline Ngom &middot; Tous droits r&eacute;serv&eacute;s</span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <span style="font-size:11px;color:#bbbbbb;">Si vous ne souhaitez plus recevoir ces emails, <a href="{{unsubscribe_url}}" style="color:#999999;text-decoration:underline;font-size:11px;">d&eacute;sabonnez-vous ici</a>.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
