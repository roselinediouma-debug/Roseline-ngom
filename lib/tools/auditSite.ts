/**
 * Analyse automatique du site d'un hôtel à partir de son URL.
 * - Fetch HTML : title, meta description, H1, viewport, HTTPS
 * - PageSpeed Insights API (gratuit, clé Google) : score perf mobile + LCP/CLS
 *
 * Tout est best-effort : si un appel plante, on renvoie ce qu'on a.
 */

export type SiteAnalysis = {
  url: string
  reachable: boolean
  https: boolean
  title: string | null
  titleLength: number
  metaDescription: string | null
  metaDescriptionLength: number
  h1Count: number
  firstH1: string | null
  hasViewport: boolean
  pageSize: number | null // KB
  pageSpeedMobile: number | null // 0-100
  lcpMs: number | null
  clsScore: number | null
  errors: string[]
}

const FETCH_TIMEOUT_MS = 8000

function normalizeUrl(raw: string): string | null {
  try {
    let url = raw.trim()
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`
    const parsed = new URL(url)
    return parsed.toString()
  } catch {
    return null
  }
}

function extractTag(html: string, regex: RegExp): string | null {
  const m = html.match(regex)
  return m ? m[1].trim().replace(/\s+/g, ' ') : null
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 TripAfroAuditBot/1.0 (+https://roselinengom.com)',
      },
    })
  } finally {
    clearTimeout(timer)
  }
}

async function analyzeHtml(url: string): Promise<Partial<SiteAnalysis>> {
  const result: Partial<SiteAnalysis> = {
    reachable: false,
    https: url.startsWith('https://'),
    title: null,
    titleLength: 0,
    metaDescription: null,
    metaDescriptionLength: 0,
    h1Count: 0,
    firstH1: null,
    hasViewport: false,
    pageSize: null,
    errors: [],
  }

  try {
    const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS)
    if (!res.ok) {
      result.errors!.push(`HTTP ${res.status}`)
      return result
    }
    const html = await res.text()
    result.reachable = true
    result.pageSize = Math.round(html.length / 1024)

    const title = extractTag(html, /<title[^>]*>([^<]+)<\/title>/i)
    result.title = title
    result.titleLength = title?.length ?? 0

    const desc = extractTag(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
    )
    result.metaDescription = desc
    result.metaDescriptionLength = desc?.length ?? 0

    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []
    result.h1Count = h1Matches.length
    if (h1Matches[0]) {
      result.firstH1 = h1Matches[0].replace(/<[^>]+>/g, '').trim().slice(0, 120)
    }

    result.hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html)
  } catch (err) {
    result.errors!.push(
      err instanceof Error && err.name === 'AbortError'
        ? 'Timeout'
        : 'Fetch failed'
    )
  }

  return result
}

async function fetchPageSpeed(
  url: string
): Promise<Pick<SiteAnalysis, 'pageSpeedMobile' | 'lcpMs' | 'clsScore'>> {
  const key = process.env.GOOGLE_PAGESPEED_API_KEY
  if (!key) return { pageSpeedMobile: null, lcpMs: null, clsScore: null }

  try {
    const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed')
    api.searchParams.set('url', url)
    api.searchParams.set('strategy', 'mobile')
    api.searchParams.set('key', key)
    api.searchParams.append('category', 'PERFORMANCE')

    const res = await fetchWithTimeout(api.toString(), 20000)
    if (!res.ok) return { pageSpeedMobile: null, lcpMs: null, clsScore: null }

    const data = await res.json()
    const perfScore = data?.lighthouseResult?.categories?.performance?.score
    const audits = data?.lighthouseResult?.audits
    const lcp = audits?.['largest-contentful-paint']?.numericValue
    const cls = audits?.['cumulative-layout-shift']?.numericValue

    return {
      pageSpeedMobile: typeof perfScore === 'number' ? Math.round(perfScore * 100) : null,
      lcpMs: typeof lcp === 'number' ? Math.round(lcp) : null,
      clsScore: typeof cls === 'number' ? Math.round(cls * 1000) / 1000 : null,
    }
  } catch {
    return { pageSpeedMobile: null, lcpMs: null, clsScore: null }
  }
}

/**
 * Analyse complète du site. Ne throw jamais — renvoie un objet cohérent même en cas d'erreur.
 */
export async function analyzeSite(rawUrl: string): Promise<SiteAnalysis> {
  const url = normalizeUrl(rawUrl)
  if (!url) {
    return {
      url: rawUrl,
      reachable: false,
      https: false,
      title: null,
      titleLength: 0,
      metaDescription: null,
      metaDescriptionLength: 0,
      h1Count: 0,
      firstH1: null,
      hasViewport: false,
      pageSize: null,
      pageSpeedMobile: null,
      lcpMs: null,
      clsScore: null,
      errors: ['URL invalide'],
    }
  }

  const [html, perf] = await Promise.all([analyzeHtml(url), fetchPageSpeed(url)])

  return {
    url,
    reachable: html.reachable ?? false,
    https: html.https ?? false,
    title: html.title ?? null,
    titleLength: html.titleLength ?? 0,
    metaDescription: html.metaDescription ?? null,
    metaDescriptionLength: html.metaDescriptionLength ?? 0,
    h1Count: html.h1Count ?? 0,
    firstH1: html.firstH1 ?? null,
    hasViewport: html.hasViewport ?? false,
    pageSize: html.pageSize ?? null,
    pageSpeedMobile: perf.pageSpeedMobile,
    lcpMs: perf.lcpMs,
    clsScore: perf.clsScore,
    errors: html.errors ?? [],
  }
}
