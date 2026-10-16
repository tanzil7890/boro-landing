// Copy for direction 3: a printed publication, "The Integration Desk".
// Shared positioning copy comes from lib/content.ts; this file holds only the editorial framing.

import { finalCta, hero, howItWorks, whyNow } from "@/lib/content";

export const publication = "The Integration Desk";

export const masthead = {
  issue: "No. 01 · October 2026",
  strip: [publication, "Every integration, always working", "Private beta edition"],
};

// Illustrative examples of the kinds of change Boro catches: announced, silent and expiring.
export const ticker = [
  "Shopify — Admin API 2025-07 sunset; 23 call sites still on it",
  "Stripe — refund.updated now arrives before charge.refunded; no changelog entry",
  "Auth0 — OAuth scope change lands in 30 days; sign-up flow affected",
  "OpenAI — model retires Jun 30; AI assistant still calls it",
  "Twilio — 429s up 40x after traffic spike; notifications delayed",
  "Plaid — account field renamed in sandbox; order sync test failing",
];

export const lead = {
  kicker: "Lead · Integration reliability",
  lines: [...hero.titleLead],
  accentLines: [...hero.titleAccent],
  byline: "By the Boro desk · 3 min read",
  formLabel: "Subscribe for early access",
  note: "One email when your invite is ready. That's it.",
  partnerPrompt: hero.partnerPrompt,
};

export const story = {
  kicker: "The problem",
  title: "Nobody owns the question:",
  titleAccent: "do our integrations still work?",
  standfirst:
    "Your product runs on 10 to 30 outside APIs. They change, expire and drift. Today, engineers find out when a customer complains.",
  paragraphs: [
    "Payments, commerce, messaging, AI, auth, CRM, tax, shipping, data: every modern product is stitched together from other companies' APIs. Boro's founder has worked with more than 50 API vendors, and the same breakages showed up at every one.",
    "Some are announced. Deprecations and version sunsets get published somewhere, but nobody connects them to the code and the workflow they will break, and the deadline slips by. Others are never announced at all: Stripe starts delivering refund webhooks in a different order, there is no changelog entry, and the refund flow quietly fails.",
    "Then there are the things that simply run out. OAuth tokens and scopes expire. Rate limits start biting after a traffic spike. AI models get retired. It always happens at the worst possible time, and it is nobody's job to see it coming.",
    "Coding agents like Claude Code, Cursor and Devin made codebase access normal, but they only run when someone asks. What's missing is a system that keeps a live map of every integration, ties it to the business workflow it powers, and tests it continuously, so breakages get caught and repaired instead of discovered.",
  ],
  quote: "Over 30% of our service downtime was due to external API and package changes going unnoticed.",
  quoteBy: "Boro's founder, on their time at AWS",
  clipping: {
    source: "Nightly run · refunds",
    date: "2026-10-15",
    lines: [
      "webhook retry is idempotent — FAILED",
      "Stripe sends refund.updated before charge.refunded",
      "No changelog entry · fix PR #214 opened",
    ],
  },
  stamp: "Caught by Boro",
};

export const steps = {
  kicker: howItWorks.eyebrow,
  title: howItWorks.title,
  titleAccent: "You just merge.",
};

export const analysis = {
  kicker: "Analysis · Why now",
  title: "Agents can change code.",
  titleAccent: "Nobody is watching the integrations.",
  standfirst: whyNow.description,
};

export const opinion = {
  kicker: "Opinion",
  bylines: { teams: "The case for platform teams", providers: "The case for API providers" },
};

export const letters = {
  kicker: "Letters to the editor",
  title: "You asked.",
  titleAccent: "We answered.",
  // One per FAQ, in order.
  signatures: [
    "A skeptical staff engineer, Berlin",
    "A security lead, Austin",
    "An SRE on call, London",
    "A platform lead, Toronto",
    "A polyglot developer, Bangalore",
    "An API provider, San Francisco",
    "A founder on a budget, Lagos",
  ],
};

export const coupon = {
  kicker: "Early access · Admit one",
  title: finalCta.titleLead,
  titleAccent: finalCta.titleAccent,
  finePrint:
    "Valid for one (1) early-access invite. No cash value. Not redeemable for 3 a.m. pages about a webhook nobody owns.",
  partnerPrompt: finalCta.partnerPrompt,
};
