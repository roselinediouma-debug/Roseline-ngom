import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { registerToolLead, TOOL_SEQUENCES, type ToolSource } from '@/lib/brevo/sequences'
import { trackUsage, type ToolName, type Segment } from '@/lib/tools/trackUsage'
import { notifyAdmin } from '@/lib/notifications'
import { getClientIp } from '@/lib/tools/rateLimit'

/**
 * Endpoint commun pour les formulaires email des outils IA.
 * Source attendue = clé TOOL_SEQUENCES (ex: 'calculator_ota', 'chatbot_voyageur').
 */

function sourceToTool(source: ToolSource): ToolName {
  if (source === 'calculator_ota') return 'calculator_ota'
  return 'chatbot'
}

function sourceToSegment(source: ToolSource): Segment {
  switch (source) {
    case 'calculator_ota':
    case 'chatbot_hotelier':
      return 'hotelier'
    case 'chatbot_diaspora':
      return 'diaspora'
    case 'chatbot_voyageur':
      return 'voyageur'
    case 'chatbot_entrepreneur':
      return 'entrepreneur'
    case 'chatbot_consulting':
      return 'consulting'
    default:
      return null
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email: string = body?.email || ''
    const prenom: string = body?.prenom || ''
    const source: ToolSource = body?.source
    const extraAttributes: Record<string, string> = body?.extraAttributes || {}

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }
    if (!source || !TOOL_SEQUENCES[source]) {
      return NextResponse.json({ error: 'Source inconnue' }, { status: 400 })
    }

    const emailLower = email.toLowerCase().trim()
    const prenomClean = prenom.trim()
    const conf = TOOL_SEQUENCES[source]
    const ip = getClientIp(req.headers)

    // 1. Supabase leads
    let leadId: string | null = null
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createServiceClient()
        const { data, error } = await supabase
          .from('leads')
          .upsert(
            {
              email: emailLower,
              prenom: prenomClean || null,
              source,
              tags: ['outil-ia', conf.tag],
            },
            { onConflict: 'email' }
          )
          .select('id')
          .maybeSingle()
        if (error) console.error('[tools/lead] supabase:', error)
        leadId = data?.id ?? null
      } catch (err) {
        console.error('[tools/lead] supabase fail:', err)
      }
    }

    // 2. Brevo (liste + séquence)
    await registerToolLead({
      email: emailLower,
      source,
      prenom: prenomClean,
      attributes: extraAttributes,
    })

    // 3. Track usage
    await trackUsage({
      toolName: sourceToTool(source),
      segment: sourceToSegment(source),
      userIp: ip,
      userEmail: emailLower,
      inputData: extraAttributes,
      leadCreated: true,
      leadId,
    })

    // 4. Notif Roseline
    await notifyAdmin({
      subject: `Nouveau lead outil : ${conf.label}`,
      message: `${prenomClean || 'Visiteur'} (${emailLower}) via ${source}.${
        Object.keys(extraAttributes).length
          ? `\nContexte : ${JSON.stringify(extraAttributes)}`
          : ''
      }`,
      priority: 'normal',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[tools/lead] fail:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
