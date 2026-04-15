import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // TODO: traiter les événements Brevo (Prompt 9)
  return NextResponse.json({ received: true })
}
