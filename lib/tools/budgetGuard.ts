import { createServiceClient } from '@/lib/supabase'
import { estimateCostEur, type ClaudeModel } from '@/lib/claude/client'

/**
 * Budget guard mensuel pour les appels Claude API.
 * Si le coût cumulé du mois en cours dépasse TOOLS_MONTHLY_BUDGET_EUR,
 * les outils retournent un message de repli sans appeler Claude.
 */

const DEFAULT_BUDGET_EUR = 30

function currentMonthKey(): string {
  const d = new Date()
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

function budgetLimit(): number {
  const raw = process.env.TOOLS_MONTHLY_BUDGET_EUR
  if (!raw) return DEFAULT_BUDGET_EUR
  const n = parseFloat(raw)
  return isFinite(n) && n > 0 ? n : DEFAULT_BUDGET_EUR
}

/**
 * Retourne true si on peut encore appeler Claude ce mois-ci.
 * Réserve 2 € de marge pour ne pas dépasser en cas d'appel en cours.
 */
export async function hasBudgetRemaining(): Promise<{
  ok: boolean
  spentEur: number
  limitEur: number
}> {
  const limitEur = budgetLimit()
  try {
    const supabase = createServiceClient()
    const month = currentMonthKey()
    const { data } = await supabase
      .from('tool_monthly_cost')
      .select('estimated_cost_eur')
      .eq('month', month)
      .maybeSingle()
    const spentEur = data?.estimated_cost_eur ? Number(data.estimated_cost_eur) : 0
    return {
      ok: spentEur < limitEur - 2, // marge 2 €
      spentEur,
      limitEur,
    }
  } catch (err) {
    console.error('[budgetGuard.hasBudgetRemaining] fail:', err)
    // En cas d'erreur Supabase, on laisse passer (fail-open) pour ne pas bloquer
    return { ok: true, spentEur: 0, limitEur }
  }
}

/**
 * Incrémente le cumul mensuel après chaque appel Claude réussi.
 */
export async function recordCost(
  model: ClaudeModel,
  tokensIn: number,
  tokensOut: number
): Promise<void> {
  try {
    const supabase = createServiceClient()
    const month = currentMonthKey()
    const cost = estimateCostEur(model, tokensIn, tokensOut)

    // Upsert : insert si pas de ligne, sinon addition
    const { data: existing } = await supabase
      .from('tool_monthly_cost')
      .select('tokens_input, tokens_output, estimated_cost_eur')
      .eq('month', month)
      .maybeSingle()

    if (!existing) {
      await supabase.from('tool_monthly_cost').insert({
        month,
        tokens_input: tokensIn,
        tokens_output: tokensOut,
        estimated_cost_eur: cost,
        updated_at: new Date().toISOString(),
      })
    } else {
      await supabase
        .from('tool_monthly_cost')
        .update({
          tokens_input: (existing.tokens_input ?? 0) + tokensIn,
          tokens_output: (existing.tokens_output ?? 0) + tokensOut,
          estimated_cost_eur: Number(existing.estimated_cost_eur ?? 0) + cost,
          updated_at: new Date().toISOString(),
        })
        .eq('month', month)
    }
  } catch (err) {
    console.error('[budgetGuard.recordCost] fail:', err)
  }
}
