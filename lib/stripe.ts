import Stripe from 'stripe'

// Instanciation lazy — uniquement quand la clé est disponible
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY non configurée')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-03-25.dahlia',
  })
}

// Produits disponibles à la vente
export const PRODUCTS = {
  guide_casamance: {
    name: 'Guide Casamance',
    description: 'Le guide complet pour découvrir la Casamance autrement',
    price: 2900,
    currency: 'eur',
  },
  masterclass: {
    name: 'Masterclass Voyage Sénégal',
    description: 'Tout ce que vous devez savoir pour organiser votre voyage au Sénégal',
    price: 9700,
    currency: 'eur',
  },
} as const

export type ProductKey = keyof typeof PRODUCTS
