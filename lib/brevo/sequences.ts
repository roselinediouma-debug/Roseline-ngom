/**
 * Mapping centralisé : source (outil/lead magnet) → configuration Brevo.
 *
 * Permet aux outils IA de router chaque lead dans la bonne liste + séquence,
 * sans dupliquer la logique dans chaque API route.
 *
 * Les listIds Brevo sont résolus à partir de variables d'env pour éviter
 * les hardcodes et permettre des valeurs différentes dev/prod.
 */

import { createBrevoContact } from '@/lib/brevo'

export type ToolSource =
  | 'calculator_ota'
  | 'chatbot_voyageur'
  | 'chatbot_diaspora'
  | 'chatbot_hotelier'
  | 'chatbot_entrepreneur'
  | 'chatbot_consulting'

type SequenceConfig = {
  label: string
  listIdEnv: string
  tag: string
}

export const TOOL_SEQUENCES: Record<ToolSource, SequenceConfig> = {
  calculator_ota: {
    label: 'Hôteliers OTA (calculateur commission)',
    listIdEnv: 'BREVO_HOTELIERS_OTA_LIST_ID',
    tag: 'lead-calculator-ota',
  },
  chatbot_voyageur: {
    label: 'Voyageurs curieux (chatbot)',
    listIdEnv: 'BREVO_VOYAGEURS_LIST_ID',
    tag: 'lead-chatbot-voyageur',
  },
  chatbot_diaspora: {
    label: 'Diaspora Le Bled Autrement (chatbot)',
    listIdEnv: 'BREVO_BLED_LIST_ID',
    tag: 'lead-chatbot-diaspora',
  },
  chatbot_hotelier: {
    label: 'Hôteliers (chatbot)',
    listIdEnv: 'BREVO_HOTELIERS_OTA_LIST_ID',
    tag: 'lead-chatbot-hotelier',
  },
  chatbot_entrepreneur: {
    label: 'Entrepreneurs / institutionnels (chatbot)',
    listIdEnv: 'BREVO_INSTITUTIONNEL_LIST_ID',
    tag: 'lead-chatbot-entrepreneur',
  },
  chatbot_consulting: {
    label: 'Prospects consulting (chatbot)',
    listIdEnv: 'BREVO_CONSULTING_LIST_ID',
    tag: 'lead-chatbot-consulting',
  },
}

export function resolveListId(source: ToolSource): number | undefined {
  const conf = TOOL_SEQUENCES[source]
  if (!conf) return undefined
  const raw = process.env[conf.listIdEnv]
  if (!raw) return undefined
  const n = parseInt(raw, 10)
  return isFinite(n) ? n : undefined
}

/**
 * Enregistre un lead outil dans Brevo (contact + liste).
 * Ne throw jamais : log et continue si Brevo indisponible.
 */
export async function registerToolLead(args: {
  email: string
  source: ToolSource
  prenom?: string
  attributes?: Record<string, string>
}): Promise<{ ok: boolean; listId?: number; tag: string }> {
  const { email, source, prenom, attributes = {} } = args
  const conf = TOOL_SEQUENCES[source]
  const listId = resolveListId(source)

  if (!process.env.BREVO_API_KEY) {
    return { ok: false, tag: conf.tag }
  }

  try {
    await createBrevoContact({
      email: email.toLowerCase().trim(),
      attributes: {
        PRENOM: prenom?.trim() || 'Visiteur',
        SOURCE: source,
        ...attributes,
      },
      listIds: listId ? [listId] : [],
    })
    return { ok: true, listId, tag: conf.tag }
  } catch (err) {
    console.error('[registerToolLead] Brevo fail:', err)
    return { ok: false, listId, tag: conf.tag }
  }
}
