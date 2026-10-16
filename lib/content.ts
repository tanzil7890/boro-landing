// All marketing copy for the landing page lives here.

export const site = {
  name: "Boro",
  url: "https://hey-boro.com",
  domain: "hey-boro.com",
  tagline: "Keep your integrations working",
  description:
    "Boro maps every outside API your code depends on, watches for changes, tests each integration every night, and opens a pull request with the fix before your customers notice.",
};

// "Become a design partner": opens the founder's Cal.com booking (30-min meeting) in a popup.
export const designPartner = {
  label: "Become a design partner",
  calLink: "tanzil-meeting/30min",
  url: "https://cal.com/tanzil-meeting/30min",
};

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "For teams", href: "#teams" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  badge: "New",
  eyebrow: "Integration reliability for engineering teams",
  titleLead: ["Every", "integration,"],
  titleAccent: ["always", "working."],
  description: site.description,
  note: "Work email required. No spam, ever.",
  partnerPrompt: "Run a platform team?",
};

export const vendors = {
  heading: "Built for the outside APIs your product runs on",
  names: [
    "Stripe",
    "Shopify",
    "Twilio",
    "OpenAI",
    "Plaid",
    "Auth0",
    "Klaviyo",
    "Anthropic",
    "Salesforce",
    "HubSpot",
    "Avalara",
    "EasyPost",
    "Okta",
    "Segment",
    "SendGrid",
    "Slack",
  ],
  categories: ["Payments", "Commerce", "Messaging", "AI", "Auth", "CRM", "Tax", "Shipping", "Data"],
};

export const problem = {
  eyebrow: "The problem",
  title: "Nobody owns the question: do our integrations still work?",
  description:
    "Your product depends on 10 to 30 outside APIs. They change, expire and behave differently over time. Today, engineers find out when a customer complains.",
  cards: [
    {
      id: "announced",
      title: "Announced changes, missed deadlines",
      description:
        "Deprecations and version sunsets are published somewhere. Nobody connects them to the code and the workflow they will break.",
    },
    {
      id: "silent",
      title: "Silent drift nobody announced",
      description:
        "A webhook arrives in a different order. A payload gains a field. The provider says nothing, and your refund flow quietly fails.",
    },
    {
      id: "expiring",
      title: "Things that expire or run out",
      description:
        "OAuth tokens and scopes expire. Rate limits start biting after a traffic spike. Models get retired. It always happens at the worst time.",
    },
  ],
  stats: [
    {
      value: 10,
      suffix: "–30",
      label: "outside APIs a typical product depends on. Most have no clear owner.",
    },
    {
      value: 50,
      suffix: "+",
      label: "API vendors we've worked with. The same breakages show up at every one.",
    },
    {
      value: 30,
      suffix: "%+",
      label: "of our service downtime at AWS came from external API and package changes that went unnoticed.",
    },
  ],
};

export const whyNow = {
  eyebrow: "Why now",
  title: "Agents can change code. Nobody is watching the integrations.",
  description:
    "Integration breakage made sense when every check had to be done by hand. It doesn't anymore.",
  items: [
    {
      label: "Two years ago",
      title: "Codebase access was unthinkable",
      description:
        "Handing an external tool the keys to your repository was a non-starter for most teams.",
    },
    {
      label: "Today",
      title: "Agents in the codebase are standard practice",
      description:
        "Claude Code, Cursor, Devin and others proved that teams will grant codebase access to tools that are valuable. But they only run when someone asks.",
    },
    {
      label: "What's missing",
      title: "A system that knows which code serves which workflow, and tests it",
      description:
        "Boro keeps a live map of every integration, links it to the business flow it powers, and checks it continuously. So breakages get caught and repaired, not discovered.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "Map. Watch. Test. Repair.",
  description:
    "Boro runs the whole loop continuously, so your team only does the last step: review and merge.",
  steps: [
    {
      label: "Map",
      title: "Every integration, linked to the workflow it serves",
      description:
        "Boro connects to your repos and finds every place your code calls an outside API, then groups those calls by business workflow: checkout, refunds, sign-up, notifications, AI features.",
    },
    {
      label: "Watch",
      title: "Changes that matter to you, with a deadline",
      description:
        "Boro tracks changelogs, deprecations and version sunsets. You don't get a generic alert. You get “this change hits your refund flow, deadline March 31.”",
    },
    {
      label: "Test",
      title: "Nightly integration tests against sandboxes",
      description:
        "Boro writes tests for each workflow (webhook payloads, pagination, rate limits, retries, idempotency) and runs them on a schedule. It catches drift even when the provider announces nothing.",
    },
    {
      label: "Repair",
      title: "A pull request with the fix and the evidence",
      description:
        "Boro opens a PR that says what changed, which tests failed before and pass after. A human reviews and merges.",
    },
  ],
};

export const integrationMap = {
  eyebrow: "The integration map",
  title: "One live map of everything your product depends on.",
  description:
    "Provider, call sites, business workflow and current health, in one place. It's the first thing Boro builds, and the place your platform team checks every day.",
  workflows: [
    {
      name: "Checkout",
      providers: ["Stripe", "Avalara"],
      callSites: 14,
      status: "healthy",
      note: "All nightly tests passing",
    },
    {
      name: "Refunds",
      providers: ["Stripe"],
      callSites: 6,
      status: "failing",
      note: "Webhook retry order changed · fix PR #214",
    },
    {
      name: "Sign-up & login",
      providers: ["Auth0"],
      callSites: 9,
      status: "warning",
      note: "OAuth scope change in 30 days",
    },
    {
      name: "Notifications",
      providers: ["Twilio", "SendGrid"],
      callSites: 11,
      status: "healthy",
      note: "All nightly tests passing",
    },
    {
      name: "AI assistant",
      providers: ["OpenAI"],
      callSites: 5,
      status: "warning",
      note: "Model retires Jun 30 · migration PR #209",
    },
    {
      name: "Order sync",
      providers: ["Shopify"],
      callSites: 8,
      status: "healthy",
      note: "API version 2026-10 adopted",
    },
  ],
} as const;

export const useCases = {
  eyebrow: "Use cases",
  title: "Whatever breaks next, Boro is already watching.",
  description:
    "Payments, commerce, messaging, AI, auth, data. If your product calls it, Boro keeps it working.",
  items: [
    {
      id: "sunset",
      label: "Version sunset",
      title: "A provider retires the API version you're on",
      description:
        "Boro finds every affected call site, opens migration PRs well before the deadline, and shows progress on a shared board.",
      example: "Shopify Admin API 2025-07 sunset · 23 call sites · 3 PRs",
    },
    {
      id: "drift",
      label: "Silent drift",
      title: "Behavior changes with no announcement",
      description:
        "A nightly test fails because a webhook retry assumes an event order that no longer holds. Boro flags the workflow and drafts a fix before refunds break.",
      example: "Stripe webhook order changed · refunds test failing",
    },
    {
      id: "expiry",
      label: "Expiring access",
      title: "Tokens, scopes, limits and models run out",
      description:
        "An OAuth scope is about to change, a rate limit starts biting after a traffic spike, a model is being retired. Boro sends the alert with the fix attached.",
      example: "OpenAI model retires in 30 days · PR #209 ready",
    },
    {
      id: "incident",
      label: "Incident to repair",
      title: "Something breaks in production anyway",
      description:
        "Boro links the error spike to the provider change that caused it and drafts the repair, so diagnosis takes minutes instead of hours.",
      example: "Twilio 429s up 40x · traced to new rate limit",
    },
  ],
};

export const journey = {
  eyebrow: "What it's like",
  title: "From first PR to the place you check integration health.",
  description: "Read-only on day one. Indispensable by month three.",
  stages: [
    {
      label: "Day 1",
      feeling: "This found things we didn't know about.",
      steps: [
        "Install the GitHub app on a couple of repos and connect Slack. Read-only to start.",
        "Boro builds the integration map in about an hour, grouped by workflow.",
        "A first digest: upcoming sunsets, which workflows they hit, which have no tests.",
        "The first PR: an API version migration with failing and passing test results attached.",
      ],
    },
    {
      label: "Week 1",
      feeling: "This caught something before a customer did.",
      steps: [
        "Your team reviews and merges the migration PR, usually with small edits.",
        "Boro proposes integration tests for your riskiest workflows, using sandbox keys.",
        "A nightly run fails. Slack names the workflow, the likely cause and a draft fix PR.",
        "On-call gets the integration map too.",
      ],
    },
    {
      label: "Month 3",
      feeling: "This is where we check integration health.",
      steps: [
        "Boro runs on every repo. Nightly drift tests cover your revenue workflows.",
        "Sunset deadlines live on a shared board, flagged weeks early with PRs ready.",
        "When prod breaks, Boro links the error spike to the provider change and drafts the repair.",
        "A monthly integration health report goes to engineering leadership.",
      ],
    },
  ],
};

export const audiences = {
  eyebrow: "Who it's for",
  title: "Built for the people who own reliability.",
  tabs: [
    {
      key: "teams",
      tabLabel: "Engineering teams",
      eyebrow: "For platform and engineering leaders",
      title: "Know every integration works. Before your customers tell you.",
      description:
        "Boro gives your platform team one place to see integration health across every repo, and catches breakages before they reach production. Think of it as reliability tooling for everything outside your codebase.",
      bullets: [
        "A live map of every integration and the workflow it serves",
        "Nightly drift tests on your revenue-critical flows",
        "Repair PRs with evidence. Nothing merges without your review",
      ],
    },
    {
      key: "providers",
      tabLabel: "API providers",
      eyebrow: "For API providers",
      title: "Ship changes without breaking your customers.",
      description:
        "Offer Boro to your customers. When you ship a breaking change or a new version, their integration map lights up and the migration PR is already waiting.",
      bullets: [
        "Ship breaking changes without the support tickets",
        "Turn version sunsets into merged PRs, not unread emails",
        "See migration progress across every customer",
      ],
    },
  ],
} as const;

export const features = {
  eyebrow: "Features",
  title: "Built to be trusted with your code.",
  description: "Everything Boro does ends in a pull request you control.",
  items: [
    {
      id: "map",
      title: "Integration map",
      description:
        "Every provider, every call site, every workflow it powers, across all your repos.",
    },
    {
      id: "alerts",
      title: "Alerts with context",
      description:
        "Names the workflow and the deadline. “This hits refunds by March 31,” not “API updated.”",
    },
    {
      id: "tests",
      title: "Nightly drift tests",
      description:
        "Webhooks, pagination, rate limits, retries and idempotency, run against sandboxes in your CI.",
    },
    {
      id: "control",
      title: "You stay in control",
      description:
        "Read-only to start. Scoped permissions and reviewable diffs. Boro proposes; your team decides what ships.",
    },
    {
      id: "evidence",
      title: "Repair PRs with evidence",
      description:
        "What changed upstream, which tests failed before, which pass after.",
    },
    {
      id: "health",
      title: "Integration health board",
      description:
        "Deadlines, test status and open repairs on one shared board, plus a monthly report for leadership.",
    },
    {
      id: "notify",
      title: "Lives where you work",
      description: "GitHub, CI and Slack. No new tool for your team to babysit.",
    },
  ],
};

export const faqs = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  description: "Everything you need to know about Boro.",
  items: [
    {
      q: "How is this different from Claude Code, Cursor or Devin?",
      a: "Coding agents are great at making a change when you ask for one. Boro is always on: it keeps the integration map, watches every provider, runs drift tests every night, and starts the repair before anyone asks. It's reliability tooling, not a chat window.",
    },
    {
      q: "Does Boro need access to my code?",
      a: "Boro starts read-only to build the integration map. To open repair PRs it needs permission to create pull requests. It never pushes to protected branches and never merges anything. Every change is a PR your team reviews.",
    },
    {
      q: "Does Boro touch production?",
      a: "No. Integration tests run against provider sandboxes with sandbox keys you approve, inside your CI. For incidents, Boro reads the error signals you connect; it doesn't call your production APIs.",
    },
    {
      q: "How is this different from Dependabot?",
      a: "Dependabot bumps package versions. Boro covers the API behind the package: it maps which workflows depend on it, tests the integration, catches changes nobody announced, and rewrites your code when it needs to change.",
    },
    {
      q: "Which providers and languages are supported?",
      a: "Any outside API your code calls. We're starting with TypeScript and the most common providers in payments, commerce, messaging, auth and AI, and prioritizing the rest by waitlist demand. Tell us your stack when you sign up.",
    },
    {
      q: "I run an API. How does Boro work for me?",
      partner: true,
      a: "Offer Boro to your customers. When you ship a breaking change or retire a version, Boro opens migration PRs in your opted-in customers' codebases, so migrations take days instead of quarters.",
    },
    {
      q: "How much does it cost?",
      partner: true,
      a: "Boro is in private beta. Pricing will be per integration or per repo, never per PR. Join the waitlist and we'll share details as early access opens.",
    },
  ],
};

export const finalCta = {
  titleLead: "Know your integrations work.",
  titleAccent: "Before your customers tell you.",
  description: "Join the waitlist for early access to Boro.",
  note: "We'll only email you about early access.",
  partnerPrompt: "Want to shape Boro with us?",
};
