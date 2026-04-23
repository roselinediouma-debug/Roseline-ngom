import { createServiceClient } from '@/lib/supabase'

export type ToolName =
  | 'calculator_ota'
  | 'chatbot'
  | 'audit_presence'
  | 'generate_posts'

export type Segment =
  | 'hotelier'
  | 'voyageur'
  | 'diaspora'
  | 'entrepreneur'
  | 'consulting'
  | null

export type ChatbotCategory =
  | 'DEMANDE_DEVIS'
  | 'INFO_VOYAGE'
  | 'CONSULTING'
  | 'DIASPORA'
  | 'AUTRE'
  | null

export type TrackUsageInput = {
  toolName: ToolName
  userIp?: string
  userEmail?: string | null
  inputData?: Record<string, unknown> | null
  resultSummary?: string | null
  leadCreated?: boolean
  leadId?: string | null
  tokensInput?: number
  tokensOutput?: number
  sessionId?: string | null
  segment?: Segment
  category?: ChatbotCategory
}

/**
 * Log une utilisation d'outil IA dans Supabase.
 * Ne fait jamais échouer l'API appelante si l'insert Supabase plante : just logué.
 */
export async function trackUsage(input: TrackUsageInput): Promise<void> {
  try {
    const supabase = createServiceClient()
    await supabase.from('tool_usage').insert({
      tool_name: input.toolName,
      segment: input.segment ?? null,
      category: input.category ?? null,
      user_ip: input.userIp ?? null,
      user_email: input.userEmail ?? null,
      input_data: input.inputData ?? null,
      result_summary: input.resultSummary ?? null,
      lead_created: input.leadCreated ?? false,
      lead_id: input.leadId ?? null,
      tokens_input: input.tokensInput ?? 0,
      tokens_output: input.tokensOutput ?? 0,
      session_id: input.sessionId ?? null,
    })
  } catch (err) {
    console.error('[trackUsage] insert failed:', err)
  }
}
