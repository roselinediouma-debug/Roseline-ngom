const BREVO_API_KEY = process.env.BREVO_API_KEY!
const BREVO_BASE_URL = 'https://api.brevo.com/v3'

interface BrevoContact {
  email: string
  attributes?: Record<string, string>
  listIds?: number[]
}

export async function createBrevoContact({ email, attributes = {}, listIds = [] }: BrevoContact) {
  const res = await fetch(`${BREVO_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({ email, attributes, listIds, updateEnabled: true }),
  })

  if (!res.ok) {
    const err = await res.json()
    console.error('Brevo error:', err)
    throw new Error(`Brevo API error: ${res.status}`)
  }

  return res.status === 204 ? null : res.json()
}

export async function sendTransactionalEmail({
  to,
  subject,
  htmlContent,
  senderName = 'Roseline Ngom',
  senderEmail = 'roseline@roselinengom.com',
}: {
  to: string
  subject: string
  htmlContent: string
  senderName?: string
  senderEmail?: string
}) {
  const res = await fetch(`${BREVO_BASE_URL}/smtp/email`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    console.error('Brevo send error:', err)
    throw new Error(`Brevo send error: ${res.status}`)
  }

  return res.json()
}
