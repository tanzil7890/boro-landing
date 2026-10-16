// Copy for direction 2: the page depends on outside APIs. One of them silently changes behavior,
// Boro's nightly integration test catches it, and Boro heals the page with a reviewed PR.
// Shared positioning copy comes from lib/content; this file only holds the break story and terminal props.

import { hero, site } from "@/lib/content";

export const stage = {
  eyebrow: "hey-boro.com · 3 outside APIs · 3 workflows",
  words: [...hero.titleLead, ...hero.titleAccent],
  description: site.description,
  hint: "Scroll to run tonight's integration tests",
  toast: {
    source: "boro · nightly test · 02:00",
    version: "FAILED · waitlist workflow",
    body: "waitlist-api renamed response field `id` to `subscriber_id`. No changelog entry.",
  },
  error: "TypeError: Cannot read properties of undefined (reading 'id')",
  console: [
    { level: "error", text: "Uncaught TypeError: Cannot read properties of undefined (reading 'id')" },
    { level: "trace", text: "    at confirmSignup (waitlist.ts:18:22)" },
    { level: "trace", text: "    at JoinForm (JoinForm.tsx:31:18)" },
    { level: "error", text: "POST /v1/confirmations 422: subscriber_id required" },
    { level: "warn", text: "waitlist-api changelog: no entries since 2026-08-02" },
    { level: "error", text: "Failed to render <JoinForm />, falling back" },
  ],
  labels: {
    head: "Hero.tsx:12 · renders <JoinForm />",
    sub: "Copy.tsx:8 · pricing workflow",
    form: "JoinForm.tsx:31 · waitlist workflow",
    deps: "integration map · waitlist-api → waitlist",
  },
  diff: {
    file: "src/lib/waitlist.ts",
    del: "const id = res.id",
    add: "const id = res.subscriber_id ?? res.id",
    notes: ["1 call site updated · waitlist workflow", "tests: 1 failing → 6/6 passing"],
  },
  merged: {
    title: "PR #214 merged",
    body: "tests: before 1 failing → after 6/6 passing · reviewed and merged by your team.",
  },
};

// No version bump: silent drift doesn't announce itself. Each dependency shows the workflow it serves.
export const deps = [
  { name: "pricing-api", workflow: "pricing" },
  { name: "auth-api", workflow: "sign-up" },
  { name: "waitlist-api", workflow: "waitlist", breaks: true },
];

// The three problem types (announced, silent drift, expiring) across real-world providers. Sample data.
export const log = {
  command: "$ tail -f /var/log/integrations.log",
  lines: [
    { time: "02:00:14", level: "WARN", text: "shopify: Admin API 2025-07 sunset in 21 days · 23 call sites", note: "announced. nobody owns it" },
    { time: "02:00:15", level: "INFO", text: "openai: model used by AI assistant retires Jun 30", note: "in an email nobody read" },
    { time: "02:00:15", level: "WARN", text: "auth0: OAuth scope change for sign-up & login in 30 days", note: "about to expire" },
    { time: "09:41:07", level: "ERROR", text: "stripe: refund webhooks now arriving in a different order", note: "no changelog entry" },
    { time: "11:02:47", level: "ERROR", text: "twilio: 429 Too Many Requests ×1,284 after traffic spike", note: "rate limit bit" },
    { time: "11:02:48", level: "ERROR", text: "refunds failing for 312 customers", note: "a customer found it first" },
  ],
};

// How it works as a `boro watch` session. `step` indexes howItWorks.steps (Map, Watch, Test, Repair).
export const watch = {
  command: "boro watch --repo acme/web",
  lines: [
    { glyph: "✓", tone: "green", text: "connected 3 repos · read-only", step: -1 },
    { glyph: "⌗", tone: "ink", text: "mapped 53 outside API calls across 6 workflows", step: 0 },
    { glyph: "⚑", tone: "amber", text: "auth0 scope change hits sign-up & login · deadline Mar 31", step: 1 },
    { glyph: "▶", tone: "ink", text: "nightly test: refunds workflow · stripe sandbox", step: 2 },
    { glyph: "✖", tone: "red", text: "refunds: webhook order changed · no changelog entry", step: 2 },
    { glyph: "✎", tone: "ink", text: "writing fix in your code style… done", step: 3 },
    { glyph: "✓", tone: "green", text: "tests: before 1 failing → after 6/6 passing", step: 3 },
    { glyph: "⇪", tone: "green", text: 'opened PR #214 "Handle refund webhooks in any order"', step: 3 },
  ],
};

export const mapCommand = "$ boro map --repo acme/web";

export const gitLog = {
  command: "$ git log --oneline",
  commits: [
    { sha: "e3f1a2c", head: true, text: "boro: live integration map tied to workflows, tested every night" },
    { sha: "9b7d410", text: "agents get codebase access: Claude Code, Cursor, Devin (but only run when asked)" },
    { sha: "1a0c3f9", text: "giving external tools codebase access: considered unthinkable" },
  ],
};
