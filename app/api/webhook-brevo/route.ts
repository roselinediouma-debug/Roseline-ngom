import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: Request) {
  let body
  try {
    body = await req.json()
  } catch {
    console.error('Webhook Brevo: JSON invalide')
    return NextResponse.json({ received: true })
  }

  const { event, email } = body as { event?: string; email?: string }

  if (!event || !email) {
    console.warn('Webhook Brevo: event ou email manquant', { event, email })
    return NextResponse.json({ received: true })
  }

  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY

  switch (event) {
    case 'unsubscribe': {
      console.log(`Brevo unsubscribe: ${email}`)
      if (hasSupabase) {
        const supabase = createServiceClient()
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ unsubscribed_at: new Date().toISOString() })
          .eq('email', email)
        if (error) console.error('Erreur unsubscribe Supabase:', error)
      }
      break
    }

    case 'hard_bounce': {
      console.log(`Brevo hard_bounce: ${email}`)
      if (hasSupabase) {
        const supabase = createServiceClient()
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ bounced_at: new Date().toISOString() })
          .eq('email', email)
        if (error) console.error('Erreur hard_bounce Supabase:', error)
      }
      break
    }

    case 'spam': {
      console.log(`Brevo spam: ${email}`)
      if (hasSupabase) {
        const supabase = createServiceClient()
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ marked_spam_at: new Date().toISOString() })
          .eq('email', email)
        if (error) console.error('Erreur spam Supabase:', error)
      }
      break
    }

    case 'delivered': {
      console.log(`Brevo delivered: ${email}`)
      break
    }

    default: {
      console.log(`Brevo event non géré: ${event} pour ${email}`)
    }
  }

  return NextResponse.json({ received: true })
}
