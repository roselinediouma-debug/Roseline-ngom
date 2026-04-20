import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  const diagnostics: Record<string, unknown> = {
    has_token: !!token,
    token_len: token?.length ?? 0,
    has_chat_id: !!chatId,
    chat_id_len: chatId?.length ?? 0,
  }

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, reason: 'missing_env', diagnostics })
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: '🧪 Debug test from /api/debug-telegram',
      }),
    })
    const body = await res.text()
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      telegram_response: body.slice(0, 500),
      diagnostics,
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      reason: 'fetch_error',
      error: String(err),
      diagnostics,
    })
  }
}
