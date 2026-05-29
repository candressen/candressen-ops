'use client'
import Link from 'next/link'
import { AGENTS } from '@/data/index'
import { useEffect, useState } from 'react'

const PROJECTS = [
  { name: 'Agent Setup Experts', slug: 'ase', status: 'In Progress', emoji: '🤖', url: 'agentsetupexperts.com', next: 'Google Ads standard access pending, research best marketing tactics' },
  { name: 'Somlr', slug: 'somlr', status: 'Dev Complete', emoji: '🍷', url: 'somlr.ai', next: 'Awaiting RBLS LLC approval → TestFlight' },
  { name: 'The Good Scene', slug: 'tgs', status: 'Live', emoji: '🎭', url: 'thegoodscene.com', next: 'Fabiana Airtable token' },
  { name: 'PostPerk', slug: 'postperk', status: 'July 2026', emoji: '📸', url: '', next: 'Starts July' },
  { name: 'SprintSensei', slug: 'sprintsensei', status: 'Parked', emoji: '⚡', url: '', next: 'TBD' },
  { name: 'RBLS Apps', slug: 'rblsapps', status: 'Launching', emoji: '🚀', url: 'rblsapps.com', next: 'LLC approval → Apple Dev Program → TestFlight' },
  { name: 'SantosSmudge', slug: 'santossmudge', status: 'Maintenance', emoji: '🎨', url: '', next: 'Refresh preset library' },
  { name: 'EmailMafia', slug: 'emailmafia', status: 'Ideation', emoji: '✉️', url: '', next: 'Ideation & sketching phase — June 2026' },
]

const STATUS_COLORS: Record<string, string> = {
  'Live': 'bg-green-100 text-green-700',
  'Dev Complete': 'bg-green-100 text-green-700',
  'Launching': 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Maintenance': 'bg-yellow-100 text-yellow-700',
  'Ideation': 'bg-purple-100 text-purple-700',
  'Blocked': 'bg-red-100 text-red-700',
  'Parked': 'bg-gray-100 text-gray-400',
  'July 2026': 'bg-gray-100 text-gray-500',
}

const WEEK_TASKS = [
  {
    project: 'ASE',
    emoji: '🤖',
    items: [
      { text: 'Instantly warmup completing (~May 25 launch)', done: false },
      { text: 'Voice agent live on agentsetupexperts.com', done: true },
      { text: '8 campaigns loaded with 237 leads total', done: true },
      { text: 'Google Ads standard access pending approval', done: false },
    ],
  },
  {
    project: 'TGS',
    emoji: '🎭',
    items: [
      { text: 'Waiting on Fabiana Airtable tables', done: false },
      { text: 'Site live, waiting on Airtable follow-up', done: false },
    ],
  },
  {
    project: 'Somlr',
    emoji: '🍷',
    items: [
      { text: 'Phase 6 complete', done: true },
      { text: 'TestFlight pending new Apple dev account', done: false },
    ],
  },
  {
    project: 'candressen.com',
    emoji: '🏠',
    items: [
      { text: 'Live data from Supabase ✓', done: true },
      { text: 'Leads synced: 237 total (updated May 18)', done: true },
      { text: 'Daily Woz sync active', done: true },
    ],
  },
]

const COUNCIL_MEMBERS = [
  { name: 'Socrates', role: 'Contrarian', model: 'o4-mini' },
  { name: 'Descartes', role: 'First Principles', model: 'o4-mini' },
  { name: 'Leibniz', role: 'Expansionist', model: 'o4-mini' },
  { name: 'Seneca', role: 'Outsider', model: 'o4-mini' },
  { name: 'Machiavelli', role: 'Executor', model: 'o4-mini' },
]

type CouncilSummary = {
  key: string
  name: string
  role: string
  summary: string
}

type CouncilSession = {
  id: string
  ideaTitle: string
  project: string
  createdAt: string | null
  verdict: string
  chairmanSynthesis: string
  memberSummaries: CouncilSummary[]
}

const clampTwoLines = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
}

function formatDate(value: string | null) {
  if (!value) return 'Date unavailable'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default function Home() {
  const [stats, setStats] = useState({ totalLeads: 0, emailsSent: 0, replied: 0, booked: 0 })
  const [loading, setLoading] = useState(true)
  const [councilSessions, setCouncilSessions] = useState<CouncilSession[]>([])
  const [councilLoading, setCouncilLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ase/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))

    fetch('/api/council/sessions')
      .then(r => r.json())
      .then(d => {
        setCouncilSessions(Array.isArray(d.sessions) ? d.sessions : [])
        setCouncilLoading(false)
      })
      .catch(() => setCouncilLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">candressen.com</h1>
            <p className="text-sm text-gray-500">Operations Dashboard</p>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/ase" className="hover:text-gray-900">ASE</Link>
            <Link href="/team" className="hover:text-gray-900">Team</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-10 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-500 mb-6">All active products and initiatives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map(p => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[p.status]}`}>{p.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{p.name}</h3>
                {p.url && <p className="text-sm text-gray-400 mb-2">{p.url}</p>}
                {p.next && <p className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">→ {p.next}</p>}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">ASE Cold Email — Live Stats</h2>
            <Link href="/ase" className="text-sm text-blue-600 hover:underline font-medium">View all leads →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Leads', value: loading ? '…' : stats.totalLeads },
              { label: 'Emails Sent', value: loading ? '…' : stats.emailsSent },
              { label: 'Replies', value: loading ? '…' : stats.replied },
              { label: 'Booked Calls', value: loading ? '…' : stats.booked },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">🌡️ All 8 campaigns warming up · 237 leads loaded · Launch target ~May 25</p>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">R&D Council</h2>
              <p className="text-gray-500 mt-1">Recent decisions feed from the council_sessions table</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-900 text-white">Recent decisions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mb-6">
            {COUNCIL_MEMBERS.map(member => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <p className="font-bold text-gray-900">{member.name}</p>
                  <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">{member.model}</span>
                </div>
                <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{member.role}</span>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {councilLoading ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-sm text-gray-500">Loading council sessions…</div>
            ) : councilSessions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-sm text-gray-500">No council sessions returned yet.</div>
            ) : (
              councilSessions.map(session => (
                <article key={session.id} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Idea reviewed</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{session.project}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{session.ideaTitle}</h3>
                      <p className="text-sm text-gray-600 max-w-3xl">{session.verdict}</p>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">{formatDate(session.createdAt)}</div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-2">Chairman synthesis</p>
                    <p className="text-sm text-gray-700" style={clampTwoLines}>{session.chairmanSynthesis}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {session.memberSummaries.map(member => (
                      <div key={`${session.id}-${member.key}`} className="rounded-2xl border border-gray-200 p-4 bg-white">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500">{member.role}</span>
                        </div>
                        <p className="text-sm text-gray-600" style={clampTwoLines}>{member.summary}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Week of May 18 — Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WEEK_TASKS.map(group => (
              <div key={group.project} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{group.emoji}</span>
                  <h3 className="font-bold text-gray-900">{group.project}</h3>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={item.done ? 'text-green-500 mt-0.5' : 'text-gray-300 mt-0.5'}>
                        {item.done ? '✓' : '○'}
                      </span>
                      <span className={item.done ? 'text-gray-500 line-through' : 'text-gray-700'}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Agent Team</h2>
          <p className="text-gray-500 mb-6">Active agents and their models</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map(a => (
              <div key={a.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{a.emoji}</span>
                    <span className="font-bold text-gray-900">{a.name}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${a.status === 'online' ? 'bg-green-100 text-green-700' : a.status === 'busy' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{a.role}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{a.model}</span>
                  <span className="text-xs text-gray-400">{a.schedule}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
