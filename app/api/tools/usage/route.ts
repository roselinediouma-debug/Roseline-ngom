import { NextResponse } from 'next/server'
import { trackUsage, type ToolName, type Segment } from '@/lib/tools/trackUsage'
import { getClientIp } from '@/lib/tools/rateLimit'

/**
 * Beacon endpoint léger : log l'utilisation d'un outil côté client
 * (ex: calculateur qui n'a pas d'API métier dédiée).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const toolName: ToolName = body?.toolName
    if (!toolName) {
      return NextResponse.json({ error: 'toolName requis' }, { status: 400 })
    }
    await trackUsage({
      toolName,
      segment: (body?.segment ?? null) as Segment,
      userIp: getClientIp(req.headers),
      inputData: body?.inputData ?? null,
      resultSummary: body?.resultSummary ?? null,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tools/usage] fail:', err)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
