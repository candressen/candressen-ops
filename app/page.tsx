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
          <p className="text-xs text-gray-400 mt-2">🌡️ All 8 campaigns warming up · 237 leads loaded · Launch target ~May 25</p>
        </section>

        {/* Week's Task List */}
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


        {/* Agent Team */}
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
