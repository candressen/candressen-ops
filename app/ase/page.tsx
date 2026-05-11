'use client'
import Link from 'next/link'
import { useState } from 'react'

type Lead = {
  id: number; name: string; company: string; industry: string;
  city: string; email: string; status: string; replied: boolean; notes: string;
}

const MOCK_LEADS: Lead[] = [
  { id: 1, name: 'Marco Rivera', company: 'Green Edge Landscaping', industry: 'Landscaping', city: 'Miami', email: 'marco@greenedge.com', status: 'Contacted', replied: false, notes: '' },
  { id: 2, name: 'Sofia Chen', company: 'Brickell Kitchen', industry: 'Restaurant', city: 'Miami', email: 'sofia@brickellkitchen.com', status: 'Replied', replied: true, notes: 'Interested, wants a demo' },
  { id: 3, name: 'James Williams', company: 'Williams Law Group', industry: 'Law Firm', city: 'Coral Gables', email: 'james@williamslawgroup.com', status: 'New', replied: false, notes: '' },
]

const STATUS_COLORS: Record<string, string> = {
  'New': 'bg-gray-100 text-gray-600',
  'Contacted': 'bg-blue-100 text-blue-700',
  'Replied': 'bg-green-100 text-green-700',
  'Booked': 'bg-purple-100 text-purple-700',
  'Not Interested': 'bg-red-100 text-red-600',
}

export default function ASELeads() {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', 'New', 'Contacted', 'Replied', 'Booked', 'Not Interested']
  const filtered = filter === 'All' ? MOCK_LEADS : MOCK_LEADS.filter(l => l.status === filter)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-bold text-gray-900">ASE — Cold Email Leads</h1>
          </div>
          <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Lead</button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: MOCK_LEADS.length },
            { label: 'Contacted', value: MOCK_LEADS.filter(l => l.status !== 'New').length },
            { label: 'Replied', value: MOCK_LEADS.filter(l => l.replied).length },
            { label: 'Booked', value: MOCK_LEADS.filter(l => l.status === 'Booked').length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === s ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name', 'Company', 'Industry', 'City', 'Status', 'Replied', 'Notes'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-5 py-4 text-gray-600">{lead.company}</td>
                  <td className="px-5 py-4 text-gray-500">{lead.industry}</td>
                  <td className="px-5 py-4 text-gray-500">{lead.city}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-600'}`}>{lead.status}</span>
                  </td>
                  <td className="px-5 py-4">{lead.replied ? '✅' : '—'}</td>
                  <td className="px-5 py-4 text-gray-400 text-xs max-w-[200px] truncate">{lead.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
