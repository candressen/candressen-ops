import { NextResponse } from 'next/server'

const PANTA_RHEI_URL = 'https://vhtcpxegvzocdwqeigal.supabase.co'
const PANTA_RHEI_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodGNweGVndnpvY2R3cWVpZ2FsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDAwNjE5NSwiZXhwIjoyMDk1NTgyMTk1fQ.mR0cYIq_nPi4yQf3TaCEa0QZRJMVT1g81JoYtGnobI8'

function asArray(value: unknown) {
  return Array.isArray(value) ? value : []
}

function pickString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export async function GET() {
  try {
    const response = await fetch(
      `${PANTA_RHEI_URL}/rest/v1/council_sessions?select=id,idea,project,created_at,synthesis_summary&order=created_at.desc&limit=5`,
      {
        headers: {
          apikey: PANTA_RHEI_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${PANTA_RHEI_SERVICE_ROLE_KEY}`,
        },
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ sessions: [], error: errorText || `Supabase returned ${response.status}` }, { status: 200 })
    }

    const data = await response.json()
    const sessions = asArray(data).map((row: any, index) => ({
      id: pickString(row?.id, `session-${index}`),
      idea: pickString(row?.idea, 'Untitled council session'),
      project: pickString(row?.project, 'General'),
      createdAt: typeof row?.created_at === 'string' ? row.created_at : null,
      synthesisSummary: pickString(row?.synthesis_summary, 'Synthesis summary unavailable.'),
    }))

    return NextResponse.json({
      projectUrl: PANTA_RHEI_URL,
      table: 'council_sessions',
      sessions,
    })
  } catch (error) {
    return NextResponse.json(
      {
        projectUrl: PANTA_RHEI_URL,
        table: 'council_sessions',
        sessions: [],
        error: error instanceof Error ? error.message : 'Failed to load council sessions',
      },
      { status: 200 },
    )
  }
}
