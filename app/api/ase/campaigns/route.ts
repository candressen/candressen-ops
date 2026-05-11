import { NextResponse } from 'next/server'

const URL = process.env.NEXT_PUBLIC_ASE_SUPABASE_URL!
const KEY = process.env.ASE_SUPABASE_SERVICE_KEY!

export async function GET() {
  const res = await fetch(`${URL}/rest/v1/email_campaigns?limit=20&order=created_at.asc`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    cache: 'no-store'
  })
  const data = await res.json()
  return NextResponse.json(data)
}
