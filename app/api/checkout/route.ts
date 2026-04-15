import { NextResponse } from 'next/server'
import { getStripe, PRODUCTS, ProductKey } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const { productKey } = await req.json() as { productKey: ProductKey }

    if (!PRODUCTS[productKey]) {
      return NextResponse.json({ error: 'Produit inconnu' }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe non configuré' }, { status: 503 })
    }

    const product = PRODUCTS[productKey]
    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/guide/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/offres`,
      metadata: { productKey },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Erreur Stripe' }, { status: 500 })
  }
}
