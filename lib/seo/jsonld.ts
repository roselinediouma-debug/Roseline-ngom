import { SITE_URL, SITE_NAME } from './metadata'

/**
 * Helpers pour générer des objets JSON-LD (Schema.org) conformes.
 * À consommer via le composant <JsonLd data={...} />.
 */

const ROSELINE_SAME_AS = [
  'https://www.instagram.com/roselinengom',
  'https://www.youtube.com/@RoselineNgom',
  'https://www.tiktok.com/@roselinengom',
  'https://www.linkedin.com/in/roselinengom',
  'https://www.instagram.com/tripafro',
]

/** Person, Roseline Ngom (homepage, author box, author schema sur articles). */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#roseline`,
    name: 'Roseline Ngom',
    alternateName: 'Roseline Queval',
    description:
      "Experte voyage Sénégal et consulting digital tourisme. Fondatrice TripAfro. 10 ans d'expérience terrain.",
    url: SITE_URL,
    image: `${SITE_URL}/images/roseline.jpg`,
    jobTitle: 'Fondatrice TripAfro, experte voyage Sénégal',
    worksFor: {
      '@type': 'Organization',
      name: 'TripAfro',
      url: 'https://www.tripafro.com',
    },
    nationality: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Senegal' },
    ],
    knowsAbout: [
      'Voyage au Sénégal',
      'Tourisme diaspora africaine',
      'Consulting digital tourisme',
      'Intelligence artificielle appliquée au tourisme',
      'Casamance',
      'Sine Saloum',
    ],
    sameAs: ROSELINE_SAME_AS,
  }
}

/** Organization, TripAfro / entité Roseline Ngom. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    founder: { '@id': `${SITE_URL}/#roseline` },
    sameAs: ROSELINE_SAME_AS,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'roselinediouma@gmail.com',
        telephone: '+33-6-50-32-98-08',
        areaServed: ['FR', 'BE', 'CA', 'SN'],
        availableLanguage: ['French'],
      },
    ],
  }
}

/** BreadcrumbList, à placer sur toute page de 2e niveau ou plus. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

/** Article, pour chaque post de blog. */
export function articleSchema(input: {
  title: string
  description: string
  slug: string
  image: string
  datePublished: string
  dateModified?: string
  authorName?: string
}) {
  const {
    title,
    description,
    slug,
    image,
    datePublished,
    dateModified,
    authorName = 'Roseline Ngom',
  } = input

  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const url = `${SITE_URL}/blog/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [imageUrl],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#roseline`,
      name: authorName,
      url: `${SITE_URL}/a-propos`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  }
}

/** FAQPage, à ajouter sur toute page avec accordéon FAQ. */
export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * Schémas pour une page voyage.
 * Retourne un tableau de 2 schémas :
 * 1. TouristTrip (descriptif du voyage)
 * 2. Product avec aggregateRating (pour les étoiles dans le SERP)
 *
 * NOTE: Google ne supporte pas aggregateRating directement sur TouristTrip
 * (erreur "Type d'objet non valide"). On utilise Product en parallèle.
 */
export function touristTripSchema(input: {
  name: string
  description: string
  slug: string
  image: string
  priceFrom: number
  priceCurrency?: string
  durationDays: number
  itineraryPlaces: string[]
  aggregateRating?: { ratingValue: number; reviewCount: number }
}) {
  const {
    name,
    description,
    slug,
    image,
    priceFrom,
    priceCurrency = 'EUR',
    durationDays,
    itineraryPlaces,
    aggregateRating,
  } = input

  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const url = `${SITE_URL}${slug.startsWith('/') ? slug : `/${slug}`}`

  const trip = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image: [imageUrl],
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: String(priceFrom),
      priceCurrency,
      availability: 'https://schema.org/InStock',
      url,
    },
    touristType: {
      '@type': 'Audience',
      audienceType: 'Diaspora, voyageurs culturels, familles',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: itineraryPlaces.map((place, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: { '@type': 'TouristDestination', name: place },
      })),
    },
    duration: `P${durationDays}D`,
  }

  if (!aggregateRating) return [trip]

  // Product parallèle pour porter les étoiles (rich snippet Review)
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: [imageUrl],
    url,
    brand: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: String(priceFrom),
      priceCurrency,
      availability: 'https://schema.org/InStock',
      url,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return [trip, product]
}

/** Service, pour pages consulting et digital-ia. */
export function serviceSchema(input: {
  name: string
  description: string
  slug: string
  serviceType: string
}) {
  const { name, description, slug, serviceType } = input
  const url = `${SITE_URL}${slug.startsWith('/') ? slug : `/${slug}`}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: { '@id': `${SITE_URL}/#organization` },
    url,
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Senegal' },
    ],
  }
}

/** WebSite, permet à Google d'afficher un SearchBox dans les résultats. */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}
