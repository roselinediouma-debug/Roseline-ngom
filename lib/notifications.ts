import { sendTransactionalEmail } from './brevo'

/**
 * Notifications admin — email + WhatsApp (CallMeBot).
 *
 * Env vars requises :
 *   ADMIN_EMAIL                  — email destinataire (ex: roselinediouma@gmail.com)
 *   CALLMEBOT_PHONE              — numéro WhatsApp au format international SANS + (ex: 33650329808)
 *   CALLMEBOT_APIKEY             — clé obtenue auprès de CallMeBot (voir README plus bas)
 *
 * Setup CallMeBot (gratuit, 2 minutes) :
 *   1. Ajouter le numéro +34 644 44 21 47 dans tes contacts WhatsApp (bot CallMeBot)
 *   2. Envoyer-lui : "I allow callmebot to send me messages"
 *   3. Tu reçois par retour ta clé API personnelle → la mettre dans CALLMEBOT_APIKEY
 *   4. Docs : https://www.callmebot.com/blog/free-api-whatsapp-messages/
 *
 * Si une var manque, la notification silencieusement passe — ne bloque jamais le flux.
 */

interface AdminNotifPayload {
  subject: string          // titre email / première ligne WhatsApp
  message: string          // corps — peut contenir \n
  priority?: 'low' | 'normal' | 'high'
}

const EMOJI = {
  low: 'ℹ️',
  normal: '🔔',
  high: '🚨',
} as const

export async function notifyAdmin({ subject, message, priority = 'normal' }: AdminNotifPayload) {
  const emoji = EMOJI[priority]

  // Lancer email + WhatsApp en parallèle, sans bloquer si l'un échoue
  await Promise.allSettled([
    sendAdminEmail(subject, message, emoji),
    sendAdminWhatsApp(subject, message, emoji),
  ])
}

async function sendAdminEmail(subject: string, message: string, emoji: string) {
  const to = process.env.ADMIN_EMAIL
  if (!to || !process.env.BREVO_API_KEY) return

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <div style="background:#560E13;color:#F6C961;padding:16px 20px;border-radius:8px 8px 0 0;">
        <strong style="font-size:14px;letter-spacing:1px;">${emoji} NOTIFICATION ADMIN</strong>
      </div>
      <div style="background:#FEFCF9;padding:24px;border:1px solid #e0d8d0;border-top:none;border-radius:0 0 8px 8px;">
        <h2 style="margin:0 0 16px;color:#560E13;font-size:18px;">${subject}</h2>
        <div style="font-size:14px;line-height:1.6;color:#2C2420;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </div>
    </div>`

  try {
    await sendTransactionalEmail({
      to,
      subject: `${emoji} ${subject}`,
      htmlContent,
    })
  } catch (err) {
    console.error('notifyAdmin email failed:', err)
  }
}

async function sendAdminWhatsApp(subject: string, message: string, emoji: string) {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) return

  const text = `${emoji} *${subject}*\n\n${message}`
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apikey)}`

  try {
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) {
      const body = await res.text()
      console.error('CallMeBot non-ok:', res.status, body.slice(0, 200))
    }
  } catch (err) {
    console.error('notifyAdmin WhatsApp failed:', err)
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
