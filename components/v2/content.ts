// Copy for direction 2: the page depends on an API, the API ships a breaking change, Boro heals the page.

export const stage = {
  eyebrow: "hey-boro.com · depends on 3 APIs",
  words: ["APIs", "that", "maintain", "themselves."],
  description:
    "When an API you depend on ships a breaking change or a new feature, Boro finds every affected line in your codebase and opens a pull request with the fix.",
  hint: "Scroll to ship a breaking change",
  toast: {
    source: "changelog · waitlist-api",
    version: "v2.0.0 · BREAKING",
    body: "waitlist.join() was removed. Use waitlist.subscribe().",
  },
  error: "TypeError: waitlist.join is not a function",
  console: [
    { level: "error", text: "Uncaught TypeError: waitlist.join is not a function" },
    { level: "trace", text: "    at JoinForm (JoinForm.tsx:31:18)" },
    { level: "trace", text: "    at Hero (Hero.tsx:12:9)" },
    { level: "error", text: "POST /v1/waitlist/join 410 Gone: endpoint removed" },
    { level: "warn", text: "pricing.plans.list is deprecated, use pricing.catalog.list" },
    { level: "error", text: "Failed to render <JoinForm />, falling back" },
  ],
  diff: {
    file: "src/components/JoinForm.tsx",
    del: "await waitlist.join(email)",
    add: "await waitlist.subscribe({ email })",
  },
  merged: {
    title: "PR #128 merged",
    body: "4 call sites fixed · tests passing · 0 errors. You didn't lift a finger.",
  },
};

export const deps = [
  { name: "pricing-api", before: "v1", after: "v1" },
  { name: "auth-api", before: "v3", after: "v3" },
  { name: "waitlist-api", before: "v1", after: "v2", breaks: true },
];

export const log = {
  command: "$ tail -f /var/log/integrations.log",
  title: "API communication is broken.",
  lines: [
    { time: "09:14:02", level: "WARN", text: "stripe: charges.create is deprecated (sunset 2026-09-30)", note: "nobody saw this" },
    { time: "09:14:02", level: "INFO", text: "openai: new Responses API available", note: "or this" },
    { time: "11:02:47", level: "ERROR", text: 'stripe: 400 parameter_unknown "source"', note: "production is down" },
    { time: "11:02:48", level: "ERROR", text: "checkout failed for 1,284 customers", note: "now everyone sees it" },
  ],
};

export const watch = {
  command: "boro watch --repo acme/web",
  title: "From changelog to merged PR, automatically.",
  lines: [
    { glyph: "✓", tone: "green", text: "watching 42 APIs across 3 repos", step: -1 },
    { glyph: "⚑", tone: "red", text: "stripe 2026-09-30: charges.create removed", step: 0 },
    { glyph: "⌕", tone: "amber", text: "found 4 usages in 3 files", step: 1 },
    { glyph: "✎", tone: "ink", text: "writing migration in your code style… done", step: 2 },
    { glyph: "✓", tone: "green", text: "build passed · 142 tests passed", step: 2 },
    { glyph: "⇪", tone: "green", text: 'opened PR #128 "Migrate charges → PaymentIntents"', step: 3 },
  ],
};

export const gitLog = {
  command: "$ git log --oneline",
  title: "Why now.",
  commits: [
    { sha: "e3f1a2c", head: true, text: "boro: connect API providers to their customers' codebases" },
    { sha: "9b7d410", text: "agents get codebase access: Claude Code, Devin, Greptile become standard" },
    { sha: "1a0c3f9", text: "giving external tools codebase access: considered unthinkable" },
  ],
};
