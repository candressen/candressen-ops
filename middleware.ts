import { NextRequest, NextResponse } from 'next/server'

const VALID_PASSWORD = process.env.DASHBOARD_PASSWORD || 'candressen2026'

export function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Skip auth for login page and static assets
  if (url.pathname === '/login' || url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const session = req.cookies.get('dashboard_session')
  if (session?.value === VALID_PASSWORD) {
    return NextResponse.next()
  }

  // Redirect to login
  const loginUrl = new URL('/login', req.url)
  loginUrl.searchParams.set('from', url.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
