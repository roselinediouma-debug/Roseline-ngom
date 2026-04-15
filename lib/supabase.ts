import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Client public (côté client, avec anon key)
let _supabase: SupabaseClient | null = null

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      if (!url || !key) {
        // Retourne un objet no-op pour le build
        return () => Promise.resolve({ data: null, error: null, count: null })
      }
      _supabase = createClient(url, key)
    }
    const val = (_supabase as unknown as Record<string, unknown>)[prop as string]
    return typeof val === 'function' ? val.bind(_supabase) : val
  },
})

// Client serveur avec service role
export function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase service role non configuré')
  return createClient(url, key)
}
