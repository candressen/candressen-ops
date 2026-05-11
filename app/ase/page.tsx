'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Lead = {
  id: string; name: string; company: string; industry: string;
  city: string; email: string; status: string; replied: boolean; notes: string;
  google_rating: number; google_reviews: number; created_at: string;
}

type Campaign = {
  id: string; name: string; industry: string; status: string;
  leads_count: number; emails_sent: number; replies: number; booked_calls: number;
}

const STATUS_COLORS: Record<string, string> = {
  'new': 'bg-gray-700 text-gray-300',
  'contacted': 'bg-blue-900 text-blue-300',
  'replied': 'bg-green-900 text-green-300',
  'booked': 'bg-purple-900 text-purple-300',
  'not_interested': 'bg-red-900 text-red-400',
  'warming_up': 'bg-yellow-900 text-yellow-300',
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_ASE_SUPABASE_URL!

async function fetchData(table: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?limit=100&order=created_at.desc`, {
    headers: {
      'apikey': process.env.NEXT_PUBLIC_ASE_SUPABASE_URL ? '' : '',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ASE_SUPABASE_URL}`,
    }
  })
  return res.json()
}

export default function ASELeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [l, c] = await Promise.all([
          fetch('/api/ase/leads').then(r => r.json()),
          fetch('/api/ase/campaigns').then(r => r.json()),
        ])
        setLeads(Array.isArray(l) ? l : [])
        setCampaigns(Array.isArray(c) ? c : [])
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const statuses = ['All', 'new', 'contacted', 'replied', 'booked', 'not_interested']
  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 px-8 py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm">← Home</Link>
            <span className="text-zinc-700">/</span>
            <h1 className="text-lg font-bold text-white">ASE — Cold Email Leads</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span>🌡️ Warmup active</span>
            <span>•</span>
            <span>Launch ~May 25</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Campaign stats */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Campaigns</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {campaigns.map(c => (
              <div key={c.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
                <p className="text-xs text-zinc-500 mb-1 truncate">{c.industry}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[c.status] || 'bg-gray-700 text-gray-300'}`}>
                  {c.status}
                </span>
                <p className="text-2xl font-bold text-white mt-2">{c.leads_count}</p>
                <p className="text-xs text-zinc-500">leads</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length },
            { label: 'Contacted', value: leads.filter(l => l.status !== 'new').length },
            { label: 'Replied', value: leads.filter(l => l.replied).length },
            { label: 'Booked', value: leads.filter(l => l.status === 'booked').length },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
              <p className="text-sm text-zinc-400">{s.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === s ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-zinc-500 py-16 text-center">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-16 text-center">
            <p className="text-zinc-500 text-lg mb-2">No leads yet</p>
            <p className="text-zinc-600 text-sm">Iris will populate this once lead scraping begins</p>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  {['Company', 'Industry', 'City', 'Email', 'Rating', 'Status', 'Replied'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-zinc-800/50">
                    <td className="px-5 py-4 font-medium text-white">{lead.company}</td>
                    <td className="px-5 py-4 text-zinc-400">{lead.industry}</td>
                    <td className="px-5 py-4 text-zinc-500">{lead.city}</td>
                    <td className="px-5 py-4 text-zinc-400">{lead.email || '—'}</td>
                    <td className="px-5 py-4 text-zinc-400">{lead.google_rating ? `⭐ ${lead.google_rating}` : '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[lead.status] || 'bg-gray-700 text-gray-300'}`}>{lead.status}</span>
                    </td>
                    <td className="px-5 py-4">{lead.replied ? '✅' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
