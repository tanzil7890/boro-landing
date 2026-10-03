// Copy for direction 3: a printed publication, "The Changelog Nobody Reads".

export const masthead = {
  issue: "No. 01 · October 2026",
  strip: ["The changelog nobody reads", "Self-maintaining APIs", "Private beta edition"],
};

// Illustrative examples of the kind of change Boro tracks.
export const ticker = [
  "Stripe — charges.create removed in API 2026-09-30",
  "Twilio — webhook signature v2 now required",
  "OpenAI — new Responses API launched; nobody noticed",
  "Shopify — Admin GraphQL 2026-10 deprecations land",
  "Plaid — new required field on link token create",
  "AWS SDK — v2 reaches end of support",
];

export const lead = {
  kicker: "Lead · Self-maintaining APIs",
  lines: ["APIs that", "maintain"],
  accent: "themselves.",
  byline: "By the Boro desk · 3 min read",
  formLabel: "Subscribe for early access",
  note: "One email when your invite is ready. That's it.",
};

export const story = {
  kicker: "The problem",
  title: "Breaking changes ship with",
  titleAccent: "little warning.",
  standfirst: "Useful features quietly launch and go unnoticed. And the changelog? Nobody reads it.",
  paragraphs: [
    "Over the past year, Boro's founder has worked with more than 50 API vendors, most of them early-stage startups. One pattern held at every one of them: API communication is broken.",
    "Breaking changes ship with little warning. Useful features quietly launch and go unnoticed. Changelogs pile up unread across blogs, inboxes and docs sites, and keeping up with them is nobody's job.",
    "This friction made sense before agentic coding tools existed. It doesn't now. Claude Code, Devin and Greptile have proven that developers and enterprises will give codebase access to tools that are valuable. Two years ago that was unthinkable; today it is standard practice.",
    "The infrastructure for automated code changes exists. What's missing is the layer that connects API providers to their customers' codebases. Providers shouldn't just announce changes. They should apply them.",
  ],
  quote: "Over 30% of our service downtime was due to external API and package changes going unnoticed.",
  quoteBy: "Boro's founder, on their time at AWS",
  clipping: {
    source: "CHANGELOG · stripe",
    date: "2026-09-30",
    lines: ["Removed: charges.create", "Use paymentIntents.create", "Action required by all integrations"],
  },
};

export const steps = {
  kicker: "How it works",
  title: "From changelog to merged pull request,",
  titleAccent: "while you sleep.",
};

export const analysis = {
  kicker: "Analysis",
  title: "The infrastructure exists.",
  titleAccent: "The application layer doesn't.",
};

export const opinion = {
  kicker: "Opinion",
  bylines: { teams: "The case for engineering teams", providers: "The case for API providers" },
};

export const letters = {
  kicker: "Letters to the editor",
  title: "You asked.",
  titleAccent: "We answered.",
  signatures: [
    "A skeptical SRE, Berlin",
    "A CTO, Austin",
    "A platform lead, London",
    "An API provider, San Francisco",
    "A polyglot developer, Bangalore",
    "A founder on a budget, Lagos",
  ],
};

export const coupon = {
  kicker: "Early access · Admit one",
  title: "Stop reading changelogs.",
  titleAccent: "Start merging PRs.",
  finePrint: "Valid for one (1) early-access invite. No cash value. Not redeemable for changelogs.",
};
