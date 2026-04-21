import { NextResponse } from 'next/server'
import { PRODUCTS, ProductKey } from '@/lib/stripe'

async function createCheckoutSession(productKey: string, origin: string) {
  if (!PRODUCTS[productKey as ProductKey]) {
    return NextResponse.json({ error: 'Produit inconnu' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe non configuré' }, { status: 503 })
  }

  const product = PRODUCTS[productKey as ProductKey]

  // Appel direct à l'API Stripe via fetch (contourne les problèmes de connectivité du SDK)
  const params = new URLSearchParams()
  params.append('payment_method_types[]', 'card')
  params.append('line_items[0][price_data][currency]', product.currency)
  params.append('line_items[0][price_data][product_data][name]', product.name)
  params.append('line_items[0][price_data][product_data][description]', product.description)
  params.append('line_items[0][price_data][unit_amount]', String(product.price))
  params.append('line_items[0][quantity]', '1')
  params.append('mode', 'payment')
  params.append('success_url', `${origin}/merci/${productKey}?session_id={CHECKOUT_SESSION_ID}`)
  params.append('cancel_url', `${origin}/guides`)
  params.append('metadata[productKey]', productKey)

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const session = await response.json()

  if (!response.ok) {
    console.error('Stripe API error:', session)
    return NextResponse.json({ error: 'Erreur Stripe', detail: session.error?.message }, { status: 500 })
  }

  return session.url
}

// GET, lien direct depuis les pages (href="/api/checkout?product=guide_casamance")
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

// POST, appel API depuis le frontend (fetch)
export async function POST(req: Request) {
  try {
    const { productKey } = await req.json() as { productKey: string }
    const origin = req.headers.get('origin') || 'https://roselinengom.com'

    const url = await createCheckoutSession(productKey, origin)
    if (url instanceof NextResponse) return url

    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: 'Erreur Stripe', detail: message }, { status: 500 })
  }
}
