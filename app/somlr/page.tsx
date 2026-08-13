import Link from 'next/link'

import { PROJECT_DETAILS } from '@/data/projectDetails'

const project = PROJECT_DETAILS.somlr

const statusSections = [
  {
    title: 'Completed',
    items: project.completed,
    empty: 'Nothing completed yet.',
    bullet: '✓',
    bulletClass: 'bg-green-100 text-green-700',
  },
  {
    title: 'In Progress',
    items: project.inProgress,
    empty: 'No active work right now.',
    bullet: '•',
    bulletClass: 'bg-yellow-100 text-yellow-700',
  },
  {
    title: 'Next Steps',
    items: project.nextSteps,
    empty: 'No next steps defined yet.',
    bullet: '→',
    bulletClass: 'bg-blue-100 text-blue-700',
  },
] as const

const quickNavCards = [
  {
    title: 'Influencer Outreach',
    description: '99 wine influencers researched, 24 confirmed emails',
    href: '/somlr/influencers',
    active: true,
  },
  {
    title: 'App Analytics',
    description: 'Coming soon — TestFlight installs, sessions, retention',
    active: false,
  },
  {
    title: 'Marketing',
    description: 'Coming soon — campaign tracking, outreach status',
    active: false,
  },
] as const

export default function SomlrPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-gray-600">Home</Link>
              <span>→</span>
              <span className="text-gray-600">Somlr</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">🍷 Somlr</h1>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Dev Complete
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-base text-gray-600">AI-powered wine assistant</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-400"
            >
              📱 App Store (coming soon)
            </button>
            <Link
              href="https://somlr.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              🔗 somlr.ai
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-10 space-y-8">
        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">Quick Navigation</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {quickNavCards.map((card) =>
              card.active ? (
                <Link
                  key={card.title}
                  href={card.href}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-lg font-bold text-gray-900">{card.title}</p>
                  <p className="mt-2 text-sm text-gray-500">{card.description}</p>
                </Link>
              ) : (
                <div
                  key={card.title}
                  className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-gray-400"
                >
                  <p className="text-lg font-bold text-gray-500">{card.title}</p>
                  <p className="mt-2 text-sm">{card.description}</p>
                </div>
              )
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-bold text-gray-900">Project Status</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {statusSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">{section.title}</h3>
                {section.items.length ? (
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${section.bulletClass}`}>
                          {section.bullet}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">{section.empty}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Targets</h2>
          <div className="space-y-3">
            {project.targets.map((target) => (
              <div
                key={`${target.label}-${target.deadline}`}
                className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <p className="text-sm font-medium text-gray-800">{target.label}</p>
                <p className="text-sm text-gray-500">{target.deadline}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">📊 App Analytics</h2>
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-gray-500">
            <p className="max-w-3xl text-sm leading-6">
              Analytics will appear here once the app is live on the App Store. Metrics: Daily Active Users,
              Session Length, Menu Scans, Wine Recommendations served, Retention D1/D7/D30.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">🎯 Influencer Outreach</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { label: 'Researched', value: '99' },
                  { label: 'Confirmed emails', value: '24' },
                  { label: 'Inferred', value: '32' },
                  { label: 'Personal / not public', value: '33' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/somlr/influencers"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              View Full Table →
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
