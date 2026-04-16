import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // L'authentification admin est gérée côté client par AdminLayout
  // qui vérifie la session Supabase via localStorage
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
