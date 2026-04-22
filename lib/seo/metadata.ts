import type { Metadata } from 'next'

/**
 * Base URL canonique du site.
 * Utilisée pour metadataBase, canonical, openGraph.url.
 */
export const SITE_URL = 'https://www.roselinengom.com'
export const SITE_NAME = 'Roseline Ngom'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`
export const TWITTER_HANDLE = '@roselinengom'

export type BuildMetadataInput = {
  /** 50-60 caractères idéal. Sera suffixé automatiquement par ", Roseline Ngom" si pas déjà dedans. */
  title: string
  /** 150-160 caractères idéal. */
  description: string
  /** Path relatif (ex: "/voyages/retour-aux-sources"). Laisser vide pour la home. */
  path?: string
  /** URL absolue ou relative d'une image OG (1200×630). Défaut = og-default. */
  ogImage?: string
  /** Alt text pour l'image OG. */
  ogImageAlt?: string
  /** Type OG ("website", "article", "profile"). Défaut "website". */
  ogType?: 'website' | 'article' | 'profile'
  /** Si true, la page sera marquée noindex (utile pour admin, drafts). */
  noindex?: boolean
  /** Mots-clés facultatifs (Google les ignore mais utile pour Bing et archivage). */
  keywords?: string[]
  /** Date de publication (pour articles). */
  publishedTime?: string
  /** Date de dernière modification (pour articles). */
  modifiedTime?: string
  /** Auteurs (pour articles). */
  authors?: string[]
}

/**
 * Construit un objet `Metadata` Next.js complet et cohérent.
 * Inclut OpenGraph, Twitter Cards, canonical, robots.
 *
 * Usage dans une page.tsx :
 *   export const metadata = buildMetadata({
 *     title: "Retour aux Sources : voyage diaspora au Sénégal (14 jours)",
 *     description: "Voyage en groupe 14 jours pour la diaspora sénégalaise...",
 *     path: "/voyages/retour-aux-sources",
 *     ogImage: "/images/og/retour-aux-sources.jpg",
 *   })
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path = '',
    ogImage = DEFAULT_OG_IMAGE,
    ogImageAlt = title,
    ogType = 'website',
    noindex = false,
    keywords,
    publishedTime,
    modifiedTime,
    authors,
  } = input

  const fullTitle = title.includes('Roseline Ngom')
    ? title
    : `${title}, Roseline Ngom`

  const canonical = path ? `${SITE_URL}${path}` : SITE_URL

  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

  return {
    // `absolute` empêche l'application du template racine `%s, Roseline Ngom`
    // (sinon double suffixe : "Titre, Roseline Ngom, Roseline Ngom")
    title: { absolute: fullTitle },
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical,
      languages: {
        'fr-FR': canonical,
        'x-default': canonical,
      },
    },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
    authors: authors?.map((name) => ({ name })),
  }
}
