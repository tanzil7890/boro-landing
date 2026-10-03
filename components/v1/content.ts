// Copy for direction 1: the whole page is a pull request opened by boro-bot.
import { audiences, faqs, site } from "@/lib/content";

export const pr = {
  owner: "hey-boro",
  repo: "your-codebase",
  title: "Replace changelogs with pull requests",
  number: 1,
  base: "main",
  head: "boro/stripe-2026-09-30",
  additions: 128,
  deletions: 64,
};

export const tabs = [
  { id: "files", label: "Files changed", count: "+128 −64" },
  { id: "timeline", label: "Timeline", count: "5" },
  { id: "checks", label: "Checks", count: "3" },
  { id: "for-you", label: "Who it's for", count: "2" },
  { id: "conversation", label: "Conversation", count: String(faqs.items.length) },
];

export const hero = {
  file: "README.md",
  hunk: "@@ -1,3 +1,3 @@ hey-boro.com",
  removed: "Read every changelog your vendors ship.",
  added: "APIs that maintain themselves.",
  description: site.description,
};

export const problem = {
  file: "PROBLEM.md",
  hunk: "@@ -14,6 +14,6 @@ API communication is broken",
  pairs: [
    { del: "Breaking changes ship with little warning.", add: "Boro opens the fix before anything breaks." },
    { del: "Useful features quietly launch and go unnoticed.", add: "Boro opens a PR that adopts them." },
    { del: "Changelogs don't get read.", add: "Boro reads every one, so you don't have to." },
  ],
};

export const founder = {
  handle: "founder",
  role: "ex-AWS",
  body: [
    "Over the past year I've worked with over 50 API vendors. One pattern is consistent: API communication is broken.",
    "When I worked at AWS, over 30% of our service downtime was due to external API and package changes going unnoticed.",
  ],
  suggestion: { del: "downtime from unnoticed API changes: 30%+", add: "downtime from unnoticed API changes: 0%" },
};

export const howItWorks = {
  hunk: "@@ -24,8 +24,12 @@ how-it-works",
  title: "From changelog to merged PR, automatically.",
  description: "Boro runs the whole loop. Your team only does the last step: review and merge.",
};

export const whyNow = {
  hunk: "@@ -40,5 +40,6 @@ why-now",
  title: "The infrastructure exists. The application layer didn't.",
  description:
    "Agentic coding tools proved teams will give tools codebase access when they're valuable. Two years ago that was unthinkable. Now it's standard practice.",
  checks: [
    {
      name: "agents / codebase-access",
      pass: "Developers already let Claude Code, Devin and Greptile into their repos.",
      time: "2y",
    },
    {
      name: "infra / automated-code-changes",
      pass: "The infrastructure for automated code changes exists.",
      time: "1y",
    },
    {
      name: "app-layer / provider-to-codebase",
      fail: "Missing: nothing connects API providers to their customers' codebases.",
      pass: "Fixed by Boro: providers apply changes instead of announcing them.",
      time: "now",
    },
  ],
};

export const forYou = {
  hunk: "@@ -52,0 +52,14 @@ who-its-for",
  title: "One PR. Both sides of the API.",
  files: audiences.tabs.map((t) => ({
    key: t.key,
    path: `docs/${t.key === "teams" ? "for-engineering-teams" : "for-api-providers"}.md`,
    title: t.title,
    description: t.description,
    bullets: t.bullets,
  })),
};

const askers = ["skeptical-sre", "cto-at-acme", "platform-lead", "api-provider", "polyglot-dev", "founder-on-a-budget"];

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
  description: "Early access is rolling out to a small group of teams and API providers.",
};
