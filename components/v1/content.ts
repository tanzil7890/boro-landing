// Copy for direction 1: the whole page is a pull request opened by boro-bot.
import { audiences, faqs, hero as baseHero, howItWorks as baseHowItWorks, problem as baseProblem, site, whyNow as baseWhyNow } from "@/lib/content";

export const pr = {
  owner: "hey-boro",
  repo: "your-codebase",
  title: "Keep every integration working",
  number: 214,
  base: "main",
  head: "boro/refunds-webhook-order",
  additions: 42,
  deletions: 17,
};

export const tabs = [
  { id: "files", label: "Files changed", count: `+${pr.additions} −${pr.deletions}` },
  { id: "timeline", label: "Timeline", count: "6" },
  { id: "checks", label: "Checks", count: "3" },
  { id: "for-you", label: "Who it's for", count: "2" },
  { id: "conversation", label: "Conversation", count: String(faqs.items.length) },
];

export const hero = {
  file: "README.md",
  hunk: "@@ -1,3 +1,3 @@ hey-boro.com",
  removed: "Find out from customers when an integration breaks.",
  added: [...baseHero.titleLead, ...baseHero.titleAccent].join(" "),
  description: site.description,
  partnerPrompt: baseHero.partnerPrompt,
};

export const problem = {
  file: "PROBLEM.md",
  hunk: `@@ -14,6 +14,6 @@ ${baseProblem.title}`,
  pairs: [
    {
      del: "Deprecation deadlines get missed.",
      add: "Boro links every change to the workflow it hits, with the deadline.",
    },
    {
      del: "A webhook drifts and nobody announces it.",
      add: "Boro's nightly tests catch it before refunds break.",
    },
    {
      del: "Tokens, scopes, rate limits and models run out at the worst time.",
      add: "Boro flags them early, with the fix attached.",
    },
  ],
};

export const founder = {
  handle: "founder",
  role: "ex-AWS",
  body: [
    "Over the past year I've worked with over 50 API vendors. Every product depends on 10 to 30 outside APIs, and nobody owns the question of whether they still work.",
    "When I worked at AWS, over 30% of our service downtime came from external API and package changes that went unnoticed.",
  ],
  suggestion: { del: "integration breakages found by: customers", add: "integration breakages found by: nightly tests" },
};

export const howItWorks = {
  hunk: "@@ -24,8 +24,12 @@ how-it-works",
  title: baseHowItWorks.title,
  description: baseHowItWorks.description,
};

export const whyNow = {
  hunk: "@@ -40,5 +40,6 @@ why-now",
  title: baseWhyNow.title,
  description: baseWhyNow.description,
  checks: [
    {
      name: "agents / codebase-access",
      pass: "Claude Code, Cursor and Devin proved teams will grant codebase access to tools that are valuable.",
      time: "2y",
    },
    {
      name: "agents / on-demand",
      pass: "Coding agents make a change when someone asks. Nobody asks until something is already broken.",
      time: "1y",
    },
    {
      name: "integrations / continuous-coverage",
      fail: "Missing: nothing keeps a live map of integrations, linked to workflows, and tests it continuously.",
      pass: "Fixed by Boro: every integration mapped, watched and tested every night.",
      time: "now",
    },
  ],
};

const forYouPaths: Record<string, string> = {
  teams: "docs/for-platform-teams.md",
  providers: "docs/for-api-providers.md",
};

export const forYou = {
  hunk: "@@ -52,0 +52,14 @@ who-its-for",
  title: audiences.title,
  // Engineering teams first and primary; API providers are a smaller, secondary file.
  files: audiences.tabs.map((t) => ({
    key: t.key,
    path: forYouPaths[t.key],
    title: t.title,
    description: t.description,
    bullets: t.bullets,
  })),
};

const askers = [
  "skeptical-sre",
  "security-lead",
  "platform-lead",
  "cto-at-acme",
  "polyglot-dev",
  "api-provider",
  "founder-on-a-budget",
];

export const conversation = {
  hunk: "@@ -66,0 +66,18 @@ conversation",
  title: "Questions from the review.",
  threads: faqs.items.map((item, i) => ({
    asker: askers[i % askers.length],
    q: item.q,
    a: item.a,
    partner: "partner" in item && item.partner,
  })),
};

export const review = {
  title: "Approve this PR to join the waitlist.",
  description: "Early access is rolling out to a small group of engineering teams.",
};
