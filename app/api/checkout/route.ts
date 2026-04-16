import { NextResponse } from 'next/server'
import { getStripe, PRODUCTS, ProductKey } from '@/lib/stripe'

async function createCheckoutSession(productKey: string, origin: string) {
  if (!PRODUCTS[productKey as ProductKey]) {
    return NextResponse.json({ error: 'Produit inconnu' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe non configuré' }, { status: 503 })
  }

  const product = PRODUCTS[productKey as ProductKey]
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
    success_url: `${origin}/merci/${productKey}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/guides`,
    metadata: { productKey },
  })

  return session.url
}

// GET — lien direct depuis les pages (href="/api/checkout?product=guide_casamance")
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const productKey = searchParams.get('product') || ''
    const origin = new URL(req.url).origin

    const url = await createCheckoutSession(productKey, origin)
    if (url instanceof NextResponse) return url

    return NextResponse.redirect(url as string)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: 'Erreur Stripe', detail: message }, { status: 500 })
  }
}

// POST — appel API depuis le frontend (fetch)
export async function POST(req: Request) {
  try {
    const { productKey } = await req.json() as { productKey: string }
    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const url = await createCheckoutSession(productKey, origin)
    if (url instanceof NextResponse) return url

    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: 'Erreur Stripe', detail: message }, { status: 500 })
  }
}
