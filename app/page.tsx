'use client'
import Link from 'next/link'

const PROJECTS = [
  { name: 'Agent Setup Experts', slug: 'ase', status: 'Active', emoji: '🤖', url: 'agentsetupexperts.com' },
  { name: 'The Good Scene', slug: 'tgs', status: 'In Progress', emoji: '🎭', url: 'thegoodscene.com' },
  { name: 'Somlr', slug: 'somlr', status: 'Beta', emoji: '🍷', url: 'somlr.ai' },
  { name: 'PostPerk', slug: 'postperk', status: 'Planned', emoji: '📸', url: '' },
  { name: 'SprintSensei', slug: 'sprintsensei', status: 'Planned', emoji: '⚡', url: '' },
]

const STATUS_COLORS: Record<string, string> = {
  'Active': 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Beta': 'bg-purple-100 text-purple-700',
  'Planned': 'bg-gray-100 text-gray-500',
}

export default function Home() {
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
            <Link href="/projects" className="hover:text-gray-900">Projects</Link>
            <Link href="/team" className="hover:text-gray-900">Team</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
        <p className="text-gray-500 mb-8">All active products and initiatives</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{p.emoji}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[p.status]}`}>{p.status}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{p.name}</h3>
              {p.url && <p className="text-sm text-gray-400">{p.url}</p>}
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">ASE Cold Email</h2>
            <Link href="/ase" className="text-sm text-blue-600 hover:underline font-medium">View all leads →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Leads', value: '0' },
              { label: 'Emails Sent', value: '0' },
              { label: 'Replies', value: '0' },
              { label: 'Booked Calls', value: '0' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
