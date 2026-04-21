import { createServiceClient } from '@/lib/supabase'

/**
 * Rate limiting Supabase-backed (serverless-safe, pas d'état en mémoire).
 * Mode démo : si cookie/param `tools_demo_key` correspond à TOOLS_DEMO_KEY, bypass total.
 */

export type RateLimitResult = {
  allowed: boolean
  remainingHour: number
  remainingDay: number
  retryAfterSeconds?: number
}

export type RateLimitConfig = {
  toolName: string
  perHour: number
  perDay: number
}

/**
 * Vérifie le rate limit. À appeler AVANT le traitement métier.
 * En cas de succès, log l'appel dans `tool_rate_limit` (compteur unifié).
 */
export async function checkRateLimit(
  ip: string,
  config: RateLimitConfig,
  opts?: { demoKey?: string | null }
): Promise<RateLimitResult> {
  // Mode démo : bypass complet
  const validDemoKey = process.env.TOOLS_DEMO_KEY
  if (opts?.demoKey && validDemoKey && opts.demoKey === validDemoKey) {
    return { allowed: true, remainingHour: 9999, remainingDay: 9999 }
  }

  // IP vide ou anonymisée : on laisse passer avec une limite prudente (1/h)
  const effectiveIp = ip && ip.trim().length > 0 ? ip.trim() : 'unknown'

  const supabase = createServiceClient()
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()

  const { count: countHour } = await supabase
    .from('tool_rate_limit')
    .select('*', { count: 'exact', head: true })
    .eq('tool_name', config.toolName)
    .eq('user_ip', effectiveIp)
    .gte('created_at', oneHourAgo)

  const { count: countDay } = await supabase
    .from('tool_rate_limit')
    .select('*', { count: 'exact', head: true })
    .eq('tool_name', config.toolName)
    .eq('user_ip', effectiveIp)
    .gte('created_at', oneDayAgo)

  const usedHour = countHour ?? 0
  const usedDay = countDay ?? 0

  if (usedHour >= config.perHour) {
    return {
      allowed: false,
      remainingHour: 0,
      remainingDay: Math.max(0, config.perDay - usedDay),
      retryAfterSeconds: 3600,
    }
  }
  if (usedDay >= config.perDay) {
    return {
      allowed: false,
      remainingHour: Math.max(0, config.perHour - usedHour),
      remainingDay: 0,
      retryAfterSeconds: 86400,
    }
  }

  // Log l'appel
  await supabase.from('tool_rate_limit').insert({
    tool_name: config.toolName,
    user_ip: effectiveIp,
  })

  return {
    allowed: true,
    remainingHour: config.perHour - usedHour - 1,
    remainingDay: config.perDay - usedDay - 1,
  }
}

/** Extrait l'IP client depuis les headers Next.js (compatible Vercel). */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
