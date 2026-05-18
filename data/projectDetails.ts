export type ProjectDetail = {
  slug: string;
  name: string;
  emoji: string;
  status: string;
  description: string;
  completed: string[];
  inProgress: string[];
  nextSteps: string[];
  targets: { label: string; deadline: string }[];
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  ase: {
    slug: 'ase',
    name: 'Agent Setup Experts',
    emoji: '🤖',
    status: 'In Progress',
    description: 'Done-for-you AI agent setup service. Deploy in 48 hours.',
    completed: [
      'Google Business Profile created',
      'Google Tag Manager is live on agentsetupexperts.com',
      'Google Ads strategy approved and API Standard Access application submitted',
      'Buffer troubleshooting fixed via Supabase image upload + Buffer assets field',
      'Voice agent is live with Flask, ngrok, OpenAI Realtime, and Twilio',
      'Hulk scraping, Vero posting, Nora reporting, and email warmup are all running',
    ],
    inProgress: [
      'Meta App Review for pages_manage_posts so Vero can auto-post to Facebook and Instagram',
      'Researching the best marketing tactics and strategies to grow ASE',
      'Monitoring Google Ads API approval and current campaign performance',
    ],
    nextSteps: [
      'Complete Meta app review and restore full Facebook and Instagram posting automation',
      'Turn on Google Ads once Standard Access is approved',
      'Keep warmup running through May 25 and convert campaigns into booked calls',
    ],
    targets: [
      { label: 'Meta app review approved', deadline: 'As soon as possible' },
      { label: 'Google Ads API access decision', deadline: 'Within 1 to 3 business days' },
      { label: 'Email warmup completes', deadline: 'May 25, 2026' },
    ],
  },
  somlr: {
    slug: 'somlr',
    name: 'Somlr',
    emoji: '🍷',
    status: 'Dev Complete',
    description: 'AI-powered wine assistant that scans menus and recommends wines based on taste profile.',
    completed: [
      'Core development is complete',
      'Auth, onboarding, OCR pipeline, AI ranking, camera flow, and loading states are built',
    ],
    inProgress: [
      'Waiting on the new Apple Developer account for the TestFlight path',
      'Small Woz follow-up remains to wire isScanning=true so waves animate during OCR scan',
    ],
    nextSteps: [
      'Get RBLS Rebels Apps LLC approved',
      'Sign up for the Apple Developer Program',
      'Prepare and ship the TestFlight build',
    ],
    targets: [
      { label: 'RBLS LLC approval', deadline: 'Pending' },
      { label: 'Apple Developer signup', deadline: 'Immediately after LLC approval' },
      { label: 'TestFlight build sent', deadline: 'Right after developer account setup' },
    ],
  },
  tgs: {
    slug: 'tgs',
    name: 'The Good Scene',
    emoji: '🎭',
    status: 'Live',
    description: 'Curated experience, discovery, and content concept focused on local events and culture.',
    completed: [
      'Site is live',
      'Fabiana was emailed about the Airtable setup requirements',
    ],
    inProgress: [
      'Waiting on Fabiana to create the contact_messages Airtable table',
      'Waiting on Fabiana to create the event_reservations Airtable table',
    ],
    nextSteps: [
      'Get both Airtable tables created',
      'Resume the data-connected contact and reservation flows after the Airtable handoff lands',
    ],
    targets: [
      { label: 'Airtable contact_messages table ready', deadline: 'Pending Fabiana' },
      { label: 'Airtable event_reservations table ready', deadline: 'Pending Fabiana' },
    ],
  },
  postperk: {
    slug: 'postperk',
    name: 'PostPerk',
    emoji: '📸',
    status: 'July 2026',
    description: 'Restaurants offer discounts in exchange for social posts, turning customers into promoters.',
    completed: [],
    inProgress: [
      'Project is not started yet and is being held for a later build window',
    ],
    nextSteps: [
      'Define MVP scope and validation plan',
      'Kick off execution in the July 2026 window',
    ],
    targets: [
      { label: 'Project kickoff', deadline: 'July 2026' },
    ],
  },
  sprintsensei: {
    slug: 'sprintsensei',
    name: 'SprintSensei',
    emoji: '⚡',
    status: 'Parked',
    description: 'Sprint planning and analytics product for capacity planning, scheduling, and execution visibility.',
    completed: [],
    inProgress: [
      'Project is currently parked while higher-priority launches move first',
    ],
    nextSteps: [
      'Re-evaluate timing and scope when active bandwidth opens up',
    ],
    targets: [
      { label: 'Scope refresh', deadline: 'TBD' },
    ],
  },
  rblsapps: {
    slug: 'rblsapps',
    name: 'RBLS Apps',
    emoji: '🚀',
    status: 'Launching',
    description: 'Apple Developer account vehicle for Somlr and future apps under RBLS Rebels Apps LLC.',
    completed: [],
    inProgress: [
      'LLC approval is pending',
      'Preparing the path to Apple Developer Program enrollment and Somlr TestFlight upload',
    ],
    nextSteps: [
      'Complete LLC approval',
      'Enroll in the Apple Developer Program',
      'Upload Somlr to TestFlight',
    ],
    targets: [
      { label: 'LLC approval', deadline: 'Pending' },
      { label: 'Apple Developer enrollment', deadline: 'Immediately after LLC approval' },
      { label: 'Somlr TestFlight upload', deadline: 'After enrollment' },
    ],
  },
  santossmudge: {
    slug: 'santossmudge',
    name: 'SantosSmudge',
    emoji: '🎨',
    status: 'Maintenance',
    description: 'Brand asset cleanup pipeline for photography retouch and export QA.',
    completed: [],
    inProgress: [
      'Preset library refresh is still open',
      'New approval checklist still needs to be documented',
    ],
    nextSteps: [
      'Refresh the preset library',
      'Document and standardize the updated approval checklist',
    ],
    targets: [
      { label: 'Preset library refresh', deadline: 'Next maintenance pass' },
      { label: 'Approval checklist documented', deadline: 'Next maintenance pass' },
    ],
  },
  emailmafia: {
    slug: 'emailmafia',
    name: 'EmailMafia',
    emoji: '✉️',
    status: 'Ideation',
    description: 'Early-stage email-focused concept in ideation and sketching mode.',
    completed: [],
    inProgress: [
      'Initial ideation is underway',
      'Sketching the first concept direction for June 2026',
    ],
    nextSteps: [
      'Clarify the product concept',
      'Sketch the first workflow and positioning ideas',
    ],
    targets: [
      { label: 'Ideation and sketching phase', deadline: 'June 2026' },
    ],
  },
};
