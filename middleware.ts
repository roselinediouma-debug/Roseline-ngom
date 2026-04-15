import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protéger toutes les routes /admin/* sauf /admin (login)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const token = request.cookies.get('sb-access-token')?.value
      || request.cookies.get('supabase-auth-token')?.value

    // Vérification simple du cookie de session Supabase
    // En production, utiliser @supabase/auth-helpers-nextjs pour une vérification complète
    const sessionCookie = request.cookies.get('sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token')

    if (!token && !sessionCookie) {
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
