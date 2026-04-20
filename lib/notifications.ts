import { sendTransactionalEmail } from './brevo'

/**
 * Notifications admin — email (Brevo) + Telegram.
 *
 * Env vars requises :
 *   ADMIN_EMAIL              — email destinataire (ex: roselinediouma@gmail.com)
 *   TELEGRAM_BOT_TOKEN       — token donné par @BotFather (ex: 1234567890:AA...)
 *   TELEGRAM_CHAT_ID         — id de la conversation (ex: 123456789) — voir setup plus bas
 *
 * Setup Telegram (gratuit, 100% officiel, 5 minutes) :
 *   1. Dans Telegram, chercher @BotFather et lancer une conversation
 *   2. /newbot → choisir un nom (ex: "Roseline Leads") puis un username
 *      terminant par "bot" (ex: roseline_leads_bot)
 *   3. BotFather te donne un TOKEN → mettre dans TELEGRAM_BOT_TOKEN
 *   4. Trouver ton bot par son username, lui envoyer un premier message (ex: "hi")
 *   5. Récupérer ton chat_id en ouvrant dans un navigateur :
 *      https://api.telegram.org/bot<TOKEN>/getUpdates
 *      → chercher "chat":{"id":123456789,...} → mettre cet id dans TELEGRAM_CHAT_ID
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

  // Lancer email + Telegram en parallèle, sans bloquer si l'un échoue
  await Promise.allSettled([
    sendAdminEmail(subject, message, emoji),
    sendAdminTelegram(subject, message, emoji),
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

async function sendAdminTelegram(subject: string, message: string, emoji: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  // Échapper les caractères spéciaux Markdown dans le contenu dynamique
  const text = `${emoji} *${escapeMarkdown(subject)}*\n\n${escapeMarkdown(message)}`
  const url = `https://api.telegram.org/bot${token}/sendMessage`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('Telegram non-ok:', res.status, body.slice(0, 300))
    }
  } catch (err) {
    console.error('notifyAdmin Telegram failed:', err)
  }
}

function escapeMarkdown(s: string): string {
  // Markdown legacy : échapper *, _, `, [
  return s.replace(/([*_`\[])/g, '\\$1')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
