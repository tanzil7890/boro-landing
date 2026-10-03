// All marketing copy for the landing page lives here.

export const site = {
  name: "Boro",
  url: "https://hey-boro.com",
  domain: "hey-boro.com",
  tagline: "Self-maintaining APIs",
  description:
    "When an API you depend on ships a breaking change or a new feature, Boro finds every affected line in your codebase and opens a pull request with the fix.",
};

// "Become a design partner": opens the founder's Cal.com booking (30-min meeting) in a popup.
export const designPartner = {
  label: "Become a design partner",
  calLink: "tanzil-meeting/30min",
  url: "https://cal.com/tanzil-meeting/30min",
};

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For teams", href: "#teams" },
  { label: "For providers", href: "#providers" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  badge: "New",
  eyebrow: "Dependabot for APIs",
  titleLead: ["APIs", "that"],
  titleAccent: ["maintain", "themselves."],
  description: site.description,
  note: "Work email required. No spam, ever.",
  partnerPrompt: "Run an API?",
};

export const vendors = {
  heading: "Built for the APIs your product depends on",
  names: [
    "Stripe",
    "Twilio",
    "OpenAI",
    "Shopify",
    "Plaid",
    "AWS SDK",
    "GitHub",
    "Slack",
    "SendGrid",
    "Anthropic",
    "Auth0",
    "Segment",
    "HubSpot",
    "Mapbox",
  ],
};

export const problem = {
  eyebrow: "The problem",
  title: "API communication is broken.",
  description:
    "Breaking changes ship with little warning. Useful features quietly launch and go unnoticed. And the changelog? Nobody reads it.",
  cards: [
    {
      id: "breaking",
      title: "Breaking changes ship with little warning",
      description:
        "A field gets renamed, an endpoint disappears, and you find out from your error tracker instead of your vendor.",
    },
    {
      id: "features",
      title: "Useful features go unnoticed",
      description:
        "Vendors ship the improvements you asked for, and they sit unused because nobody saw the announcement.",
    },
    {
      id: "changelogs",
      title: "Changelogs don't get read",
      description:
        "Release notes are scattered across blogs, emails and docs. Keeping up is nobody's job.",
    },
  ],
  stats: [
    {
      value: 50,
      suffix: "+",
      label: "API vendors we've worked with. The same pattern shows up at every one.",
    },
    {
      value: 30,
      suffix: "%+",
      label: "of our service downtime at AWS came from external API and package changes that went unnoticed.",
    },
    {
      value: 0,
      suffix: "",
      label: "changelogs your team will need to read once Boro is watching.",
    },
  ],
};

export const whyNow = {
  eyebrow: "Why now",
  title: "The infrastructure exists. The application layer doesn't.",
  description:
    "This friction made sense before agentic coding tools. It doesn't anymore.",
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
        "Claude Code, Devin, Greptile and others proved that developers and enterprises will grant codebase access to tools that are valuable.",
    },
    {
      label: "What's missing",
      title: "A layer between API providers and the code that calls them",
      description:
        "Automated code changes are solved. Boro connects API providers to their customers' codebases, so changes get applied, not just announced.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "From changelog to merged PR, automatically.",
  description:
    "Boro runs the whole loop, so your team only does the last step: review and merge.",
  steps: [
    {
      label: "Detect",
      title: "Every upstream change, caught",
      description:
        "Boro watches changelogs, OpenAPI specs, SDK releases and deprecation notices for the APIs you use, and classifies each change as breaking, deprecated or new.",
    },
    {
      label: "Scan",
      title: "Mapped to the exact lines it affects",
      description:
        "Each change is traced to the precise call sites across your repositories, with structural code analysis instead of a fragile text search.",
    },
    {
      label: "Fix",
      title: "Migrated in your code's own style",
      description:
        "An agent writes the change the way your team would, then runs your build and test suite to prove it works.",
    },
    {
      label: "Ship",
      title: "A focused PR, ready to merge",
      description:
        "You get one pull request explaining what changed upstream and why. Review it, merge it, move on.",
    },
  ],
};

export const audiences = {
  eyebrow: "Who it's for",
  title: "One loop. Two sides of every API.",
  tabs: [
    {
      key: "teams",
      tabLabel: "Engineering teams",
      eyebrow: "For engineering teams",
      title: "Never read a changelog again.",
      description:
        "Boro is Dependabot for the APIs you call. When any vendor ships a change, you get a tested pull request instead of a surprise in production.",
      bullets: [
        "One focused PR per upstream change",
        "Every vendor you depend on, tracked in one place",
        "Nothing merges without your review",
      ],
    },
    {
      key: "providers",
      tabLabel: "API providers",
      eyebrow: "For API providers",
      title: "Don't announce changes. Apply them.",
      description:
        "Give your customers an update agent that migrates their code for them. Ship breaking changes without breaking anyone, and get new features adopted the week they launch.",
      bullets: [
        "Ship breaking changes without the support tickets",
        "Turn feature launches into merged PRs, not unread emails",
        "See migration progress across every customer",
      ],
    },
  ],
} as const;

export const features = {
  eyebrow: "Features",
  title: "Built to be trusted with your code.",
  description:
    "Everything Boro does ends in a pull request you control.",
  items: [
    {
      id: "vendors",
      title: "Every vendor, one place",
      description:
        "Track all the APIs and SDKs your product depends on from a single dashboard.",
    },
    {
      id: "sources",
      title: "Reads the fine print",
      description:
        "Changelogs, OpenAPI diffs, SDK releases and deprecation headers, all parsed for you.",
    },
    {
      id: "language",
      title: "Code-aware, not text-aware",
      description:
        "Understands your code's structure and conventions, so fixes look like your team wrote them.",
    },
    {
      id: "control",
      title: "You stay in control",
      description:
        "Scoped permissions and reviewable diffs. Boro proposes changes; your team decides what ships.",
    },
    {
      id: "tested",
      title: "Tested before you see it",
      description:
        "Runs your CI before opening the PR, so you only review green builds.",
    },
    {
      id: "adoption",
      title: "Features, not just fixes",
      description:
        "When a vendor launches something useful, Boro opens a PR that adopts it.",
    },
    {
      id: "notify",
      title: "Notified where you work",
      description:
        "PR summaries land in GitHub and Slack with the upstream context attached.",
    },
  ],
};

export const faqs = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  description: "Everything you need to know about Boro.",
  items: [
    {
      q: "Does Boro need access to my code?",
      a: "Boro needs read access to find affected usages and permission to open pull requests. It never pushes to protected branches and never merges anything. Every change is a PR your team reviews.",
    },
    {
      q: "How does Boro know an API changed?",
      a: "It monitors changelogs, OpenAPI specs, SDK releases and deprecation notices for the APIs you depend on, then turns each relevant change into a concrete code migration.",
    },
    {
      q: "How is this different from Dependabot?",
      a: "Dependabot bumps version numbers. Boro changes your code: it rewrites the call sites a breaking change affects, adopts new features, and opens a PR that already passes your tests.",
    },
    {
      q: "I run an API. How does Boro work for me?",
      partner: true,
      a: "Offer Boro as your update agent. When you ship a breaking change or a new feature, Boro opens pull requests in your opted-in customers' codebases, so migrations take days instead of quarters.",
    },
    {
      q: "Which languages and frameworks are supported?",
      a: "We're prioritizing based on waitlist demand. Tell us your stack when you sign up and we'll let you know when it's supported.",
    },
    {
      q: "How much does it cost?",
      partner: true,
      a: "Boro is in private beta. Join the waitlist and we'll share pricing as early access opens.",
    },
  ],
};

export const finalCta = {
  titleLead: "Stop reading changelogs.",
  titleAccent: "Start merging PRs.",
  description:
    "Join the waitlist for early access to self-maintaining APIs.",
  note: "We'll only email you about early access.",
  partnerPrompt: "Evaluating Boro for your API or your team?",
};
