import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECT_DETAILS } from '@/data/projectDetails';

const STATUS_COLORS: Record<string, string> = {
  Live: 'bg-green-100 text-green-700',
  'Dev Complete': 'bg-green-100 text-green-700',
  Launching: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Maintenance: 'bg-yellow-100 text-yellow-700',
  Blocked: 'bg-red-100 text-red-700',
  Parked: 'bg-gray-100 text-gray-500',
  'July 2026': 'bg-gray-100 text-gray-500',
  Ideation: 'bg-purple-100 text-purple-700',
};

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECT_DETAILS[slug];

  if (!project) notFound();

  const sections = [
    {
      title: 'Completed',
      items: project.completed,
      empty: 'Nothing completed yet.',
      bulletClass: 'bg-green-100 text-green-700',
      bullet: '✓',
    },
    {
      title: 'In Progress',
      items: project.inProgress,
      empty: 'No active work right now.',
      bulletClass: 'bg-yellow-100 text-yellow-700',
      bullet: '•',
    },
    {
      title: 'Next Steps',
      items: project.nextSteps,
      empty: 'No next steps defined yet.',
      bulletClass: 'bg-blue-100 text-blue-700',
      bullet: '→',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <header className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="max-w-[960px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">← Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">Projects</span>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[project.status] || 'bg-gray-100 text-gray-500'}`}>
            {project.status}
          </span>
        </div>
      </header>

      <main className="max-w-[960px] mx-auto px-8 py-10 space-y-8">
        <section className="bg-white rounded-3xl border border-gray-200 p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-4xl mb-3">{project.emoji}</p>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 mt-3 max-w-2xl">{project.description}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sections.map((section) => (
            <section key={section.title} className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h2>
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
            </section>
          ))}
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Targets</h2>
          <div className="space-y-3">
            {project.targets.map((target) => (
              <div key={`${target.label}-${target.deadline}`} className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm font-medium text-gray-800">{target.label}</p>
                <p className="text-sm text-gray-500 whitespace-nowrap">{target.deadline}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
