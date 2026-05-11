import { NextRequest, NextResponse } from 'next/server'

const VALID_PASSWORD = process.env.DASHBOARD_PASSWORD || 'candressen2026'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === VALID_PASSWORD) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('dashboard_session', VALID_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return res
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}
