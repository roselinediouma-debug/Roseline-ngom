import Stripe from 'stripe'

// Instanciation lazy — uniquement quand la clé est disponible
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY non configurée')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    timeout: 30000,
    maxNetworkRetries: 3,
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
  guide_senegal_7j: {
    name: 'Le Sénégal en 7 jours',
    description: 'Guide complet pour un séjour de 7 jours au Sénégal',
    price: 2900,
    currency: 'eur',
  },
  bundle_decouverte: {
    name: 'Bundle Découverte Sénégal',
    description: 'Pack découverte incluant guides et ressources pour le Sénégal',
    price: 4900,
    currency: 'eur',
  },
} as const

export type ProductKey = keyof typeof PRODUCTS
