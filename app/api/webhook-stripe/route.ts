import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as unknown as {
      id: string; customer_email: string; amount_total: number; metadata: Record<string, string>
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createServiceClient()
      const { error } = await supabase.from('commandes').insert({
        email: session.customer_email,
        produit: session.metadata?.productKey || 'unknown',
        montant: session.amount_total,
        stripe_id: session.id,
        status: 'paid',
      })
      if (error) console.error('Supabase commande insert error:', error)
    }
  }

  return NextResponse.json({ received: true })
}
