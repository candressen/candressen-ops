export const PROJECTS = [
  {
    id: 'postperk',
    name: 'PostPerk',
    color: '#FF6B6B',
    status: 'active',
    priority: 'high',
    description: 'Referral growth campaign platform for creator-led ecommerce launches.',
    nextAction: 'Finalize analytics event map for the beta onboarding funnel.',
  },
  {
    id: 'somlr',
    name: 'Somlr',
    color: '#C084FC',
    status: 'planning',
    priority: 'medium',
    description: 'AI-assisted sommelier experience for personalized wine discovery.',
    nextAction: 'Validate recommendation rubric with the tasting notes dataset.',
  },
  {
    id: 'sprintsensei',
    name: 'SprintSensei',
    color: '#34D399',
    status: 'active',
    priority: 'high',
    description: 'Team operations dashboard that surfaces sprint risk and delivery drift.',
    nextAction: 'Ship burndown anomaly alerts to the internal staging environment.',
  },
  {
    id: 'hotpotato',
    name: 'HotPotato',
    color: '#FB923C',
    status: 'blocked',
    priority: 'urgent',
    description: 'Live party game service with fast room creation and rotating prompts.',
    nextAction: 'Resolve websocket reconnect issue before reopening public rooms.',
  },
  {
    id: 'santossmudge',
    name: 'SantosSmudge',
    color: '#60A5FA',
    status: 'maintenance',
    priority: 'low',
    description: 'Brand asset cleanup pipeline for photography retouch and export QA.',
    nextAction: 'Refresh preset library and document the new approval checklist.',
  },
  {
    id: 'ase',
    name: 'Agent Setup Experts',
    color: '#2563EB',
    status: 'active',
    priority: 'urgent',
    description: 'Done-for-you AI agent setup service. Deploy in 48 hours.',
    nextAction: 'Build and launch website by Apr 20',
  },
  {
    id: 'thegoodscene',
    name: 'The Good Scene',
    color: '#F59E0B',
    status: 'active',
    priority: 'medium',
    description: 'Local events curation app focused on independent arts and community venues.',
    nextAction: 'Confirm editorial picks for the next weekly city guide push.',
  },

  // SOMLR — Phase 1: Auth + Routing (Apr 21)
  { id: 'som-01', title: 'Auth helpers — signUp, signIn, signOut, getSession', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 21', statusNote: 'lib/supabase/auth.ts', team: 'dev' },
  { id: 'som-02', title: 'Login + Registration screens with age gate', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 21', statusNote: 'app/auth/login.tsx + register.tsx', team: 'dev' },
  { id: 'som-03', title: 'Age restriction screen (under 21)', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 21', statusNote: 'app/auth/age-restricted.tsx', team: 'dev' },
  { id: 'som-04', title: 'Root layout route guard — unauth → login, no profile → onboarding', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 21', statusNote: 'app/_layout.tsx', team: 'dev' },
  // SOMLR — Phase 2: Taste Setup (Apr 22)
  { id: 'som-05', title: 'Onboarding Step 1 — rank wine types', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 22', statusNote: 'app/onboarding/step1.tsx', team: 'dev' },
  { id: 'som-06', title: 'Onboarding Step 2 — select flavor traits', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 22', statusNote: 'app/onboarding/step2.tsx', team: 'dev' },
  { id: 'som-07', title: 'Onboarding Step 3 — reference wine + write profile to Supabase', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 22', statusNote: 'app/onboarding/step3.tsx + lib/supabase/profile.ts', team: 'dev' },
  // SOMLR — Phase 3: Scan + AI (Apr 23)
  { id: 'som-08', title: 'Wire real camera — expo-camera, multi-photo, thumbnails', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 23', statusNote: 'app/scan/index.tsx', team: 'dev' },
  { id: 'som-09', title: 'OCR pipeline — image → base64 → GPT-4o Vision', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 23', statusNote: 'lib/ocr/index.ts', team: 'dev' },
  { id: 'som-10', title: 'AI wine ranking — taste profile + wine list → GPT-4o ranked results', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 23', statusNote: 'lib/ai/rank.ts', team: 'dev' },
  { id: 'som-11', title: 'Wire loading screen to real AI call with pulse animation', projectId: 'somlr', status: 'done', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 23', statusNote: 'app/scan/loading.tsx', team: 'dev' },
  // SOMLR — Phase 4: Results + Favorites (Apr 24)
  { id: 'som-12', title: 'Wire results to real AI response + Save to Favorites', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'urgent', progress: 0, eta: 'Apr 24', statusNote: 'app/results/index.tsx', team: 'dev' },
  { id: 'som-13', title: 'Favorites screen — pull from Supabase, edit, delete, share', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 24', statusNote: 'app/(tabs)/favorites.tsx', team: 'dev' },
  { id: 'som-14', title: 'Favorites CRUD helpers', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 24', statusNote: 'lib/supabase/favorites.ts', team: 'dev' },
  { id: 'som-15', title: 'Wine detail screen — full tasting notes, update rating', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'medium', progress: 0, eta: 'Apr 24', statusNote: 'app/wine/[id].tsx', team: 'dev' },
  // SOMLR — Phase 5: Polish (Apr 25)
  { id: 'som-16', title: 'Wire profile screen — real user data, retake quiz, logout', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 25', statusNote: 'app/(tabs)/profile.tsx', team: 'dev' },
  { id: 'som-17', title: 'Add missing wine flow in results', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'medium', progress: 0, eta: 'Apr 25', statusNote: 'app/results/index.tsx', team: 'dev' },
  { id: 'som-18', title: 'Share card generation — wine name + rating + Somlr.ai branding', projectId: 'somlr', status: 'backlog', assignee: 'Woz', priority: 'medium', progress: 0, eta: 'Apr 25', statusNote: 'lib/share/index.ts', team: 'dev' },
] as const;

export const AGENTS: {
  id: string;
  name: string;
  role: string;
  model: string;
  provider: string;
  status: 'online' | 'idle' | 'busy';
  emoji: string;
  currentTask: string;
  schedule: string;
  team: 'dev' | 'marketing';
}[] = [
  { id: 'bob', name: 'Bob', role: 'Orchestrator / CTO-COO Partner', model: 'claude-sonnet-4-6', provider: 'Anthropic', status: 'online', emoji: '🔧', currentTask: 'Always on — orchestrating all projects', schedule: 'Always on', team: 'dev' },
  { id: 'woz', name: 'Woz', role: 'Coding Agent & Dashboard Updater', model: 'gpt-5.4', provider: 'OpenAI', status: 'idle', emoji: '🛠️', currentTask: 'On-demand ACP + daily dashboard sync', schedule: 'Daily 8am + on-demand', team: 'dev' },
  { id: 'jordan', name: 'Jordan', role: 'CTO / Lead Planner', model: 'gpt-5.4', provider: 'OpenAI', status: 'idle', emoji: '🎨', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'marcopolo', name: 'MarcoPolo', role: 'Code Locator', model: 'o4-mini', provider: 'OpenAI', status: 'idle', emoji: '🗺️', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'patel', name: 'Patel', role: 'QA Agent', model: 'claude-haiku-3-5', provider: 'Anthropic', status: 'idle', emoji: '📈', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'vlad', name: 'Vlad', role: 'Security Agent', model: 'claude-sonnet-4-6', provider: 'Anthropic', status: 'idle', emoji: '⚙️', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'duy', name: 'Duy', role: 'Schema Guardian', model: 'o4-mini', provider: 'OpenAI', status: 'idle', emoji: '🧪', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'pablo', name: 'Pablo', role: 'Docs & Spec Writer', model: 'claude-haiku-3-5', provider: 'Anthropic', status: 'idle', emoji: '📱', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'alberto', name: 'Alberto', role: 'Environment Doctor', model: 'o4-mini', provider: 'OpenAI', status: 'idle', emoji: '🚀', currentTask: 'Standing by', schedule: 'On-demand', team: 'dev' },
  { id: 'dan', name: 'Dan', role: 'Content Writer (blog + social + images)', model: 'gpt-5.4', provider: 'OpenAI', status: 'busy', emoji: '✍️', currentTask: 'Writing ASE blog posts + social copy daily', schedule: 'Daily 9am', team: 'marketing' },
  { id: 'nora', name: 'Nora', role: 'Analytics & Reporting', model: 'o4-mini', provider: 'OpenAI', status: 'online', emoji: '📊', currentTask: 'Daily campaign stats', schedule: 'Daily 9am weekdays', team: 'marketing' },
  { id: 'hulk', name: 'Hulk', role: 'Lead Scraping & Email Enrichment', model: 'o4-mini', provider: 'OpenAI', status: 'online', emoji: '💪', currentTask: 'Scraping leads across 8 industries', schedule: 'Daily 7am weekdays', team: 'marketing' },
  { id: 'vero', name: 'Vero', role: 'Social Media Scheduler', model: 'o4-mini', provider: 'OpenAI', status: 'idle', emoji: '📱', currentTask: 'Scheduling approved posts to LinkedIn/FB/IG', schedule: 'Daily 2:30pm', team: 'marketing' },
  { id: 'nova', name: 'Nova', role: 'CMO / Strategy', model: 'gpt-5.4', provider: 'OpenAI', status: 'idle', emoji: '⭐', currentTask: 'Google Ads strategy complete — awaiting API approval', schedule: 'On-demand', team: 'marketing' },
  { id: 'iris', name: 'Iris', role: 'COO / Ops', model: 'gpt-5.4', provider: 'OpenAI', status: 'idle', emoji: '🌀', currentTask: 'Standing by', schedule: 'On-demand', team: 'marketing' },
  { id: 'seong', name: 'Seong', role: 'SEO Agent', model: 'gemini-2.5-flash', provider: 'Gemini', status: 'idle', emoji: '🔍', currentTask: 'Standing by', schedule: 'On-demand', team: 'marketing' },
  { id: 'felix', name: 'Felix', role: 'CRM / Email', model: 'gpt-5.4', provider: 'OpenAI', status: 'idle', emoji: '📧', currentTask: 'Standing by', schedule: 'On-demand', team: 'marketing' },
  { id: 'marki', name: 'Marki', role: 'Paid Marketing', model: 'gpt-5.4', provider: 'OpenAI', status: 'idle', emoji: '📣', currentTask: 'On hold — activate post first 2 clients', schedule: 'On-demand', team: 'marketing' },
  { id: 'zara', name: 'Zara', role: 'Ops / Automation', model: 'o4-mini', provider: 'OpenAI', status: 'idle', emoji: '⚡', currentTask: 'Standing by', schedule: 'On-demand', team: 'marketing' },
];

export const TASKS: {
  id: string;
  title: string;
  projectId: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'blocked' | 'testing' | 'deployment' | 'done';
  assignee: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  progress: number;
  eta?: string;
  statusNote?: string;
  team: 'dev' | 'marketing';
}[] = [
  { id: 'ase-m01', title: 'Homepage copy', projectId: 'ase', status: 'done', assignee: 'Dan', priority: 'high', progress: 100, eta: 'Apr 14', statusNote: 'Saved to ase-copy/homepage.md', team: 'marketing' },
  { id: 'ase-m02', title: 'AI Agent Setup page copy', projectId: 'ase', status: 'done', assignee: 'Dan', priority: 'high', progress: 0, eta: 'Apr 14', team: 'marketing' },
  { id: 'ase-m03', title: 'OpenClaw Setup page copy', projectId: 'ase', status: 'backlog', assignee: 'Dan', priority: 'high', progress: 0, eta: 'Apr 15', team: 'marketing' },
  { id: 'ase-m04', title: 'Miami + Florida local page copy', projectId: 'ase', status: 'backlog', assignee: 'Dan', priority: 'high', progress: 0, eta: 'Apr 15', team: 'marketing' },
  { id: 'ase-m05', title: 'Pricing + Contact page copy', projectId: 'ase', status: 'backlog', assignee: 'Dan', priority: 'medium', progress: 0, eta: 'Apr 16', team: 'marketing' },
  { id: 'ase-m06', title: 'ICP brief + messaging framework', projectId: 'ase', status: 'done', assignee: 'Nova', priority: 'high', progress: 100, statusNote: 'Saved to ase-icp-messaging.md', team: 'marketing' },
  { id: 'ase-m07', title: 'Keyword map — all 8 domains', projectId: 'ase', status: 'done', assignee: 'Seong', priority: 'high', progress: 100, statusNote: 'Saved to ase-keyword-map.md', team: 'marketing' },
  { id: 'ase-d01a', title: 'Scaffold Next.js + install deps + design tokens', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 100, eta: 'Apr 15', statusNote: 'Done ✅', team: 'dev' },
  { id: 'ase-d01b', title: 'Nav component — logo, links, CTA button', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 100, eta: 'Apr 15', statusNote: 'Done ✅', team: 'dev' },
  { id: 'ase-d01c', title: 'Footer component — links, tagline, copyright', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 100, eta: 'Apr 15', statusNote: 'Done ✅', team: 'dev' },
  { id: 'ase-d01d', title: 'Root layout — wire Nav + Footer + GA4 placeholder', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'urgent', progress: 100, eta: 'Apr 15', statusNote: 'After 1c', team: 'dev' },
  { id: 'ase-d02a', title: 'Homepage — Hero + Social Proof sections', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 16', statusNote: 'After 1d', team: 'dev' },
  { id: 'ase-d02b', title: 'Homepage — Problem + Solution sections', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 16', statusNote: 'After 2a', team: 'dev' },
  { id: 'ase-d02c', title: 'Homepage — How It Works + Included sections', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 16', statusNote: 'After 2b', team: 'dev' },
  { id: 'ase-d02d', title: 'Homepage — Who It\'s For + Pricing Preview sections', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 16', statusNote: 'After 2c', team: 'dev' },
  { id: 'ase-d02e', title: 'Homepage — FAQ + CTA + full page assembly', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 16', statusNote: 'After 2d', team: 'dev' },
  { id: 'ase-d03', title: 'AI Agent Setup page (app/ai-agent-setup/)', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 17', statusNote: 'After 2e', team: 'dev' },
  { id: 'ase-d04', title: 'OpenClaw Setup page (app/openclaw-setup/)', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 17', statusNote: 'After 3', team: 'dev' },
  { id: 'ase-d05', title: 'Miami + Florida local SEO pages', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 17', statusNote: 'After 4', team: 'dev' },
  { id: 'ase-d06', title: 'Pricing + Contact pages', projectId: 'ase', status: 'done', assignee: 'Woz', priority: 'high', progress: 100, eta: 'Apr 18', statusNote: 'After 5', team: 'dev' },
  { id: 'ase-d07', title: 'Meta tags + sitemap + robots.txt + build check', projectId: 'ase', status: 'backlog', assignee: 'Woz', priority: 'high', progress: 0, eta: 'Apr 18', statusNote: 'After 6', team: 'dev' },
];


export type Project = (typeof PROJECTS)[number];
export type Agent = (typeof AGENTS)[number];
export type Task = (typeof TASKS)[number];

export const APPROVALS: {
  id: string;
  title: string;
  description: string;
  project: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
}[] = [];

export const SKILLS = [
  { name: 'gh-issues', status: 'active' as const, agent: 'Bob', notes: 'GitHub issue management' },
  { name: 'coding-agent', status: 'active' as const, agent: 'Woz', notes: 'Codex + Claude Code delegation' },
  { name: 'weather', status: 'active' as const, agent: 'Bob', notes: 'wttr.in integration' },
  { name: 'healthcheck', status: 'planned' as const, agent: 'Vlad', notes: 'Security audits' },
  { name: 'github', status: 'active' as const, agent: 'Jordan', notes: 'PR and CI management' },
  { name: 'skill-creator', status: 'planned' as const, agent: 'Bob', notes: 'Create new agent skills' },
  { name: 'node-connect', status: 'planned' as const, agent: 'Alberto', notes: 'Node pairing and diagnostics' },
  { name: 'obsidian-sync', status: 'planned' as const, agent: 'Pablo', notes: 'Vault sync and memory management' },
]

export const TOKEN_DATA = [
  { agent: 'Bob', model: 'claude-sonnet-4-6', dailyTokens: 39210766, dailyCost: 29.00, cacheHitRate: 0.98 },
  { agent: 'Jordan', model: 'gpt-5.4', dailyTokens: 800000, dailyCost: 0.60, cacheHitRate: 0.71 },
  { agent: 'Woz', model: 'gpt-5.4-mini', dailyTokens: 320000, dailyCost: 0.32, cacheHitRate: 0.44 },
  { agent: 'MarcoPolo', model: 'o4-mini', dailyTokens: 12000, dailyCost: 0.02, cacheHitRate: 0.55 },
  { agent: 'Athena', model: 'gemini-2.5-flash', dailyTokens: 8000, dailyCost: 0.01, cacheHitRate: 0.62 },
  { agent: 'Patel', model: 'claude-haiku-3-5', dailyTokens: 5000, dailyCost: 0.01, cacheHitRate: 0.80 },
  { agent: 'Vlad', model: 'claude-sonnet-4-6', dailyTokens: 4000, dailyCost: 0.06, cacheHitRate: 0.74 },
  { agent: 'Duy', model: 'o4-mini', dailyTokens: 2000, dailyCost: 0.01, cacheHitRate: 0.68 },
  { agent: 'Pablo', model: 'claude-haiku-3-5', dailyTokens: 1500, dailyCost: 0.01, cacheHitRate: 0.77 },
  { agent: 'Alberto', model: 'o4-mini', dailyTokens: 1500, dailyCost: 0.01, cacheHitRate: 0.59 },
]

export const JOURNAL_ENTRIES = [
  { date: '2026-04-10', title: 'Mission Control Build Day', content: 'Started the Mission Control Next.js build. Resolved Codex CLI auth issue (v0.118.0 requires codex login --with-api-key). Scaffold complete, building pages one at a time.' },
  { date: '2026-04-09', title: 'Infrastructure Setup Complete', content: 'Connected Discord (The Lab), built Obsidian vault structure, configured agent team (Jordan, Woz, Marco Polo, Athena, Patel, Vlad, Duy, Pablo, Alberto). Security hardened.' },
  { date: '2026-04-09', title: 'Day One', content: 'First session with Christian. Onboarded 6 projects: PostPerk, Somlr, SprintSensei, HotPotato, SantosSmudge, The Good Scene. Identity set as Bob, CTO/COO partner.' },
]

