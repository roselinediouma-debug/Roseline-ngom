import Anthropic from '@anthropic-ai/sdk'

/**
 * Wrapper Anthropic unique pour tout le projet.
 * Les outils (chatbot, scoring candidatures, etc.) doivent passer par ici.
 */

let cached: Anthropic | null = null

export function getClaudeClient(): Anthropic {
  if (cached) return cached
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY manquante')
  cached = new Anthropic({ apiKey })
  return cached
}

/** Modèle par défaut pour les outils grand public (chatbot, génération courte). */
export const CLAUDE_MODEL_DEFAULT = 'claude-sonnet-4-20250514'

/** Modèle plus léger pour scoring ou classifications. */
export const CLAUDE_MODEL_FAST = 'claude-haiku-4-5'

/** Tarifs approximatifs en EUR / million de tokens (avril 2026). À recalibrer 2x/an. */
export const CLAUDE_PRICING_EUR = {
  'claude-sonnet-4-20250514': { input: 2.8, output: 14 },
  'claude-haiku-4-5': { input: 0.7, output: 3.5 },
} as const

export type ClaudeModel = keyof typeof CLAUDE_PRICING_EUR

/** Calcule le coût estimé en euros pour une utilisation donnée. */
export function estimateCostEur(
  model: ClaudeModel,
  tokensIn: number,
  tokensOut: number
): number {
  const p = CLAUDE_PRICING_EUR[model]
  if (!p) return 0
  return (tokensIn * p.input + tokensOut * p.output) / 1_000_000
}
