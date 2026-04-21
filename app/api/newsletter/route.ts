import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { createBrevoContact, sendTransactionalEmail } from '@/lib/brevo'

export async function POST(req: Request) {
  try {
    const { email, prenom = '' } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()

    // 1. Insert Supabase (si configuré)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()
        await supabase.from('newsletter_subscribers').upsert(
          { email: emailLower, prenom: prenom.trim(), source: 'newsletter-page' },
          { onConflict: 'email' }
        )
      } catch (err) {
        console.error('Supabase newsletter insert failed:', err)
      }
    }

    // 2. Brevo : créer contact + ajouter à la liste newsletter
    if (process.env.BREVO_API_KEY) {
      const listId = process.env.BREVO_NEWSLETTER_LIST_ID
        ? parseInt(process.env.BREVO_NEWSLETTER_LIST_ID)
        : undefined

      try {
        await createBrevoContact({
          email: emailLower,
          attributes: { PRENOM: prenom.trim() || 'Lecteur', SOURCE: 'newsletter' },
          listIds: listId ? [listId] : [],
        })
      } catch (err) {
        console.error('Brevo newsletter contact failed:', err)
      }

      // 3. Email de bienvenue
      try {
        await sendTransactionalEmail({
          to: emailLower,
          subject: 'Bienvenue dans La Teranga, Roseline Ngom',
          htmlContent: `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:sans-serif;color:#0A0A0A;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FEFCF9;border-radius:16px;overflow:hidden;">
<tr><td style="background:#560E13;padding:32px;text-align:center;">
<div style="color:#F6C961;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Newsletter La Teranga</div>
</td></tr>
<tr><td style="padding:40px 32px;">
<p style="font-size:16px;line-height:1.6;">Bonjour${prenom.trim() ? ` ${prenom.trim()}` : ''},</p>
<p style="font-size:16px;line-height:1.6;">Bienvenue dans La Teranga, ma newsletter sur le Sénégal.</p>
<p style="font-size:16px;line-height:1.6;">Deux fois par mois, je partage des destinations, des conseils pratiques, et les coulisses de mes projets. Du vrai contenu, comme si je vous écrivais en personne.</p>
<p style="font-size:16px;line-height:1.6;">En attendant le premier numéro, vous pouvez télécharger mon guide gratuit :</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
<tr><td align="center">
<a href="https://www.roselinengom.com/guide" style="display:inline-block;background:#F6C961;color:#560E13;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;text-transform:uppercase;">Télécharger le guide gratuit</a>
</td></tr></table>
<p style="font-size:15px;line-height:1.6;">À très vite,</p>
<div style="font-size:18px;color:#560E13;font-weight:600;">Roseline</div>
</td></tr>
</table>
</td></tr></table>
</body></html>`,
        })
      } catch (err) {
        console.error('Newsletter welcome email failed:', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
