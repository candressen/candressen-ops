import { NextResponse } from 'next/server'

const SUPA_URL = process.env.NEXT_PUBLIC_ASE_SUPABASE_URL!
const KEY = process.env.ASE_SUPABASE_SERVICE_KEY!

export async function GET() {
  const [leadsRes, campsRes] = await Promise.all([
    fetch(`${SUPA_URL}/rest/v1/leads?select=status,replied,booked_call&limit=1000`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
      cache: 'no-store',
    }),
    fetch(`${SUPA_URL}/rest/v1/email_campaigns?select=emails_sent,replies,booked_calls&limit=20`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
      cache: 'no-store',
    }),
  ])

  const leads = await leadsRes.json()
  const camps = await campsRes.json()

  const totalLeads = Array.isArray(leads) ? leads.length : 0
  const replied = Array.isArray(leads) ? leads.filter((l: any) => l.replied).length : 0
  const booked = Array.isArray(leads) ? leads.filter((l: any) => l.booked_call).length : 0
  const emailsSent = Array.isArray(camps)
    ? camps.reduce((s: number, c: any) => s + (c.emails_sent || 0), 0)
    : 0

  return NextResponse.json({ totalLeads, emailsSent, replied, booked })
}
