'use client'

import { useEffect, useState } from 'react'

type AgentCard = {
  name: string
  role: string
  model?: string
  note?: string
  emoji: string
}

type TeamSection = {
  title: string
  subtitle: string
  badge: string
  agents: AgentCard[]
}

type CouncilSession = {
  id: string
  idea: string
  project: string
  createdAt: string | null
  synthesisSummary: string
}

const TEAM_SECTIONS: TeamSection[] = [
  {
    title: "Bob's Team",
    subtitle: 'Primary operator stack on Christian\'s machine.',
    badge: 'Core Team',
    agents: [
      { name: 'Bob', role: 'Orchestrator', model: 'Claude Sonnet', emoji: '🔧' },
      { name: 'Woz', role: 'Coding', model: 'GPT-5.4', emoji: '🛠️' },
      { name: 'Dan', role: 'Content', model: 'GPT-5.4', emoji: '✍️' },
      { name: 'Felix', role: 'Email Writing', model: 'GPT-4o', emoji: '📧' },
      { name: 'Hulk', role: 'Lead Scraping', model: 'o4-mini', emoji: '💪' },
      { name: 'Nora', role: 'Analytics', model: 'o4-mini', emoji: '📊' },
      { name: 'Vero', role: 'Social Scheduling', model: 'o4-mini', emoji: '📱' },
      { name: 'Cristina', role: 'Voice Agent', model: 'gpt-realtime-2', emoji: '🎙️' },
    ],
  },
  {
    title: 'Specialist Agents',
    subtitle: 'Purpose-built helpers that support execution around coding, docs, and schema safety.',
    badge: 'Specialists',
    agents: [
      { name: 'MarcoPolo', role: 'Code Locator', model: 'GPT-4o', note: 'Maps files before Woz starts coding', emoji: '🗺️' },
      { name: 'Pablo', role: 'Docs & Spec Writer', model: 'GPT-4o', note: 'Writes PRDs, ADRs, and decision briefs', emoji: '📝' },
      { name: 'Duy', role: 'Schema Guardian', model: 'GPT-4o', note: 'Validates DB migrations before they run', emoji: '🧪' },
    ],
  },
  {
    title: 'R&D Council',
    subtitle: 'Deliberation council for strategy, product direction, and contrarian review.',
    badge: 'Council',
    agents: [
      { name: 'Socrates', role: 'Contrarian', model: 'o4-mini', emoji: '⚖️' },
      { name: 'Descartes', role: 'First Principles', model: 'o4-mini', emoji: '🧠' },
      { name: 'Leibniz', role: 'Expansionist', model: 'o4-mini', emoji: '🌌' },
      { name: 'Seneca', role: 'Outsider', model: 'o4-mini', emoji: '🪟' },
      { name: 'Machiavelli', role: 'Executor', model: 'o4-mini', emoji: '♟️' },
      { name: 'Bob', role: 'Chairman', model: 'Claude Sonnet', emoji: '🔧' },
    ],
  },
  {
    title: "Pol's Team",
    subtitle: "Raul's machine and its supporting operator roster.",
    badge: 'Pol',
    agents: [
      { name: 'Pol', role: 'Orchestrator', emoji: '🧭' },
      { name: 'Jeff', role: 'Coding', emoji: '💻' },
      { name: 'Scrappy', role: 'Lead Scraping', emoji: '🔎' },
      { name: 'Indranil', role: 'Email Writer', emoji: '✉️' },
      { name: 'Sunil', role: 'Email Sender', emoji: '📨' },
      { name: 'Mahima', role: 'Analytics / Reporting', emoji: '📈' },
      { name: 'Ranjita', role: 'Enrichment', emoji: '🧬' },
      { name: 'Estella', role: 'Ad Creative', emoji: '🎨' },
      { name: 'Cal', role: 'Scheduling', emoji: '🗓️' },
    ],
  },
]

const SYSTEM_HEALTH = [
  {
    label: 'Credential verification',
    value: 'Healthy',
    note: 'Last run: 2026-06-06, all credentials passed.',
  },
  {
    label: 'Active crons',
    value: '21',
    note: 'Enabled schedules currently active across agents.',
  },
  {
    label: 'Obsidian vault',
    value: 'Connected',
    note: 'Project notes, decisions, and weekly review flow are wired in.',
  },
  {
    label: 'Dream sessions',
    value: 'Scheduled',
    note: 'Nightly micro-dream and weekly deep-dream are both on deck.',
  },
]

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

function trimSummary(value: string) {
  const clean = value?.trim() || 'Synthesis summary unavailable.'
  return clean.length > 220 ? `${clean.slice(0, 217)}...` : clean
}

export default function TeamPage() {
  const [sessions, setSessions] = useState<CouncilSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/council/sessions')
      .then((response) => response.json())
      .then((data) => {
        setSessions(Array.isArray(data.sessions) ? data.sessions : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-10 text-white">
      <section className="space-y-3">
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Team Operations
        </span>
        <div>
          <h1 className="text-4xl font-semibold">Agent roster and system map</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/60">
            Updated team layout across Bob, the specialist layer, the R&amp;D Council, and Pol&apos;s machine, plus live council history and current system health.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {TEAM_SECTIONS.map((section) => (
          <article
            key={section.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="mt-1 text-sm text-white/55">{section.subtitle}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                {section.badge}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {section.agents.map((agent) => (
                <div key={`${section.title}-${agent.name}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{agent.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                        {agent.model ? (
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/70">
                            {agent.model}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-white/75">{agent.role}</p>
                      {agent.note ? <p className="mt-2 text-xs leading-5 text-white/45">{agent.note}</p> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">R&amp;D Council session history</h2>
            <p className="mt-1 text-sm text-white/55">
              Last five council sessions from the Panta Rhei Supabase project.
            </p>
          </div>
          <a
            href="https://supabase.com/dashboard/project/vhtcpxegvzocdwqeigal/editor?schema=public"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Open Panta Rhei Supabase
          </a>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
            Loading recent council sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-sm text-white/60">
            No council sessions available right now.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {sessions.map((session) => (
              <article key={session.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {session.project || 'General'}
                  </span>
                  <span className="text-xs text-white/40">{formatDate(session.createdAt)}</span>
                </div>
                <h3 className="text-base font-semibold leading-6 text-white">{session.idea}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{trimSummary(session.synthesisSummary)}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">System health</h2>
          <p className="mt-1 text-sm text-white/55">Key operational checks for the dashboard, memory, and automation stack.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SYSTEM_HEALTH.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-white/50">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-white/55">{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
