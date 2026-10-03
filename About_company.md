Hey Boro


Self-Maintaining APIs


Over the past year, I've worked with over 50 API vendors, mostly early-stage startups. One pattern is consistent: API communication is broken.

Breaking changes ship with little warning. Useful features quietly launch and go unnoticed. Changelogs don't get read. Heck, when I worked at AWS, over 30% of our service downtime was due to external api/package changes going unnoticed. This friction made sense before agentic coding tools existed. However, now it doesn't.

Agentic coding tools like Claude Code, Devin, Greptile, etc prove that developers and enterprises are willing to give codebase access to external tools, provided they're valuable. Two years ago, this was unthinkable. Now it's standard practice.

The infrastructure for automated code changes exists. What's missing is the application layer connecting API providers to their customers' codebases. API providers shouldn't just announce changes; they should apply them.

When Stripe ships a breaking change or a new feature, an agent should scan customer codebases, identify affected usages, and open a PR with the fix.

This could work as per-provider agents. "Install Stripe's update agent", or as a neutral third-party service tracking changes across vendors, like Dependabot but for APIs. If you're working on this, consider applying to YC.