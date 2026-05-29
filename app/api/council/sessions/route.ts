import { NextResponse } from 'next/server'

const SUPA_URL = process.env.NEXT_PUBLIC_ASE_SUPABASE_URL!
const KEY = process.env.ASE_SUPABASE_SERVICE_KEY!

const MEMBER_LABELS = [
  { key: 'socrates', name: 'Socrates', role: 'Contrarian' },
  { key: 'descartes', name: 'Descartes', role: 'First Principles' },
  { key: 'leibniz', name: 'Leibniz', role: 'Expansionist' },
  { key: 'seneca', name: 'Seneca', role: 'Outsider' },
  { key: 'machiavelli', name: 'Machiavelli', role: 'Executor' },
] as const

function asObject(value: unknown): Record<string, any> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, any>) : null
}

function asArray(value: unknown): any[] {
  return Array.isArray(value) ? value : []
}

function pickFirstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function pickFirstDate(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value
  }
  return null
}

function collectSummaryCandidates(memberKey: string, row: Record<string, any>) {
  const response = asObject(row.response)
  const analyses = asObject(row.analyses)
  const summaries = asObject(row.summaries)
  const members = asObject(row.members)
  const memberAnalysis = asObject(analyses?.[memberKey])
  const memberSummary = asObject(summaries?.[memberKey])
  const memberResponse = asObject(response?.[memberKey])
  const memberEntry = asObject(members?.[memberKey])

  return [
    row[`${memberKey}_summary`],
    row[`${memberKey}_analysis`],
    row[`${memberKey}_take`],
    memberAnalysis?.summary,
    memberAnalysis?.take,
    memberAnalysis?.analysis,
    memberSummary?.summary,
    memberSummary?.take,
    memberResponse?.summary,
    memberResponse?.take,
    memberResponse?.analysis,
    memberEntry?.summary,
    memberEntry?.take,
  ]
}

function normalizeSession(row: Record<string, any>) {
  const response = asObject(row.response)
  const analyses = asObject(row.analyses)
  const summaries = asObject(row.summaries)

  const memberSummaries = MEMBER_LABELS.map((member) => ({
    key: member.key,
    name: member.name,
    role: member.role,
    summary: pickFirstString(...collectSummaryCandidates(member.key, row)) || 'Summary unavailable.',
  }))

  const synthesis = pickFirstString(
    row.chairman_synthesis,
    row.synthesis,
    row.verdict_summary,
    row.summary,
    response?.chairman_synthesis,
    response?.synthesis,
    response?.verdict,
    analyses?.chairman?.summary,
    summaries?.chairman,
  )

  return {
    id: row.id ?? `${row.idea_title ?? row.title ?? 'session'}-${row.created_at ?? ''}`,
    ideaTitle: pickFirstString(row.idea_title, row.title, row.idea, row.topic, row.name) || 'Untitled review',
    project: pickFirstString(row.project, row.project_name, row.project_slug, row.workspace, row.product) || 'General',
    createdAt: pickFirstDate(row.created_at, row.reviewed_at, row.session_date, row.date),
    verdict: pickFirstString(row.verdict_summary, row.verdict, row.outcome, row.decision, synthesis) || 'Council review recorded.',
    chairmanSynthesis: synthesis || 'Synthesis unavailable.',
    memberSummaries,
  }
}

export async function GET() {
  try {
    const res = await fetch(`${SUPA_URL}/rest/v1/council_sessions?select=*&limit=12&order=created_at.desc`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json({ sessions: [], error: errorText || `Supabase returned ${res.status}` }, { status: 200 })
    }

    const data = await res.json()
    const sessions = asArray(data).map((row) => normalizeSession(asObject(row) ?? {}))
    return NextResponse.json({ sessions })
  } catch (error) {
    return NextResponse.json({
      sessions: [],
      error: error instanceof Error ? error.message : 'Failed to load council sessions',
    }, { status: 200 })
  }
}
