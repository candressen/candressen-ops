'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const PROJECTS = [
  { name: 'Agent Setup Experts', slug: 'ase', status: 'Active', emoji: '🤖', url: 'agentsetupexperts.com', next: 'Cold email launch ~May 25' },
  { name: 'Somlr', slug: 'somlr', status: 'Beta', emoji: '🍷', url: 'somlr.ai', next: 'TestFlight pending Apple dev account' },
  { name: 'The Good Scene', slug: 'tgs', status: 'In Progress', emoji: '🎭', url: 'thegoodscene.com', next: 'Waiting on Fabiana Airtable token + DNS' },
  { name: 'PostPerk', slug: 'postperk', status: 'Planned', emoji: '📸', url: '', next: 'Define MVP scope' },
  { name: 'SprintSensei', slug: 'sprintsensei', status: 'Planned', emoji: '⚡', url: '', next: 'Define MVP scope' },
  { name: 'HotPotato', slug: 'hotpotato', status: 'Blocked', emoji: '🥔', url: '', next: 'Fix WebSocket reconnect bug' },
  { name: 'SantosSmudge', slug: 'santossmudge', status: 'Maintenance', emoji: '🎨', url: '', next: 'Refresh preset library + approval checklist' },
]

const STATUS_COLORS: Record<string, string> = {
  'Active': 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Beta': 'bg-purple-100 text-purple-700',
  'Planned': 'bg-gray-100 text-gray-500',
  'Blocked': 'bg-red-100 text-red-700',
  'Maintenance': 'bg-yellow-100 text-yellow-700',
}

const WEEK_TASKS = [
  {
    project: 'ASE',
    emoji: '🤖',
    items: [
      { text: 'Instantly warmup completing (~May 25 launch)', done: false },
      { text: 'Voice agent live on agentsetupexperts.com', done: true },
      { text: '8 campaigns loaded with 230 leads total', done: true },
      { text: 'Meta/Google ads setup', done: false },
    ],
  },
  {
    project: 'TGS',
    emoji: '🎭',
    items: [
      { text: 'Waiting on Fabiana Airtable token', done: false },
      { text: 'DNS pending configuration', done: false },
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
      { text: 'Leads synced: 230 total (updated May 15)', done: true },
      { text: 'Daily Woz sync active', done: true },
    ],
  },
]

export default function Home() {
  const [stats, setStats] = useState({ totalLeads: 0, emailsSent: 0, replied: 0, booked: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ase/stats')
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false) })
      .catch(() => setLoading(false))
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

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-500 mb-6">All active products and initiatives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map(p => (
              <Link key={p.slug} href={`/${p.slug}`} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
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

        {/* ASE Live Stats */}
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
          <p className="text-xs text-gray-400 mt-2">🌡️ All 8 campaigns warming up · 230 leads loaded · Launch target ~May 25</p>
        </section>

        {/* Week's Task List */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Week of May 15 — Status</h2>
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

      </main>
    </div>
  )
}
