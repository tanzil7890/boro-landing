import type { ReactNode } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { LogoMark } from "@/components/ui/Logo";
import { audiences, faqs, howItWorks, problem, site, whyNow } from "@/lib/content";
import { cn } from "@/lib/utils";
import { analysis, letters, lead, masthead, opinion, steps, story, ticker } from "./content";
import { Coupon, InlineForm } from "./Forms";
import { PartnerButton, PartnerLink } from "./DesignPartner";
import { Drawing, FadeUp, LineReveal, Rule, Stamp } from "./Motion";

const WRAP = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";

// Fine-line illustrations for Detect / Scan / Fix / Ship (140×110 box).
const DRAWINGS: { paths: string[]; dots?: [number, number][] }[] = [
  {
    paths: [
      "M22 8H88L108 28V102H22Z",
      "M88 8V28H108",
      "M36 44H92",
      "M36 56H96",
      "M36 68H78",
      "M118 72A16 16 0 1 1 118 104A16 16 0 1 1 118 72",
      "M118 80V90",
      "M118 96V96.5",
    ],
  },
  {
    paths: [
      "M14 24H78",
      "M14 38H96",
      "M14 52H62",
      "M14 66H90",
      "M14 80H54",
      "M92 34A24 24 0 1 1 92 82A24 24 0 1 1 92 34",
      "M109 75L128 96",
    ],
  },
  {
    paths: [
      "M14 22H104V48H14Z",
      "M24 35H34",
      "M44 35H94",
      "M14 62H104V88H14Z",
      "M24 75H34",
      "M29 70V80",
      "M44 75H98",
      "M110 35C128 35 128 75 110 75",
      "M115 69L110 75L116 80",
    ],
  },
  {
    paths: ["M30 104V6", "M30 86C30 66 82 72 82 52C82 34 30 40 30 22", "M98 46L104 52L118 36"],
    dots: [
      [30, 86],
      [82, 52],
      [30, 22],
    ],
  },
];

function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={WRAP}>
      <div className={className}>{children}</div>
    </section>
  );
}

function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-plex text-[11px] font-medium uppercase tracking-[0.22em] text-paper-accent", className)}>
      {children}
    </p>
  );
}

function SectionTitle({ title, accent, className }: { title: string; accent: string; className?: string }) {
  return (
    <h2 className={cn("text-balance font-serif text-5xl leading-[0.98] tracking-[-0.02em] sm:text-6xl", className)}>
      {title} <em className="text-paper-accent">{accent}</em>
    </h2>
  );
}

/** Direction 3: the landing page as a printed publication, "The Changelog Nobody Reads". */
export function EditorialPage() {
  return (
    <>
      <div aria-hidden className="paper-grain pointer-events-none fixed inset-0 z-40 mix-blend-multiply" />

      {/* Masthead */}
      <header className={cn(WRAP, "pt-6")}>
        <div className="flex items-center gap-4 font-plex text-[11px] uppercase tracking-[0.16em] text-paper-muted">
          <span className="hidden sm:inline">{masthead.issue}</span>
          <a href="#top" className="mx-auto flex items-center gap-3 text-paper-ink sm:mx-0 sm:flex-1 sm:justify-center">
            <LogoMark variant="mono" className="size-9" />
            <span className="font-serif text-5xl normal-case tracking-[-0.02em] sm:text-6xl">Boro</span>
          </a>
          <span className="hidden items-center gap-2 sm:flex">
            {site.domain} ·
            <a href="#subscribe" className="hover:text-paper-accent">
              Subscribe
            </a>
            ·
            <PartnerLink placement="masthead" className="no-underline hover:text-paper-accent">
              Design partners →
            </PartnerLink>
          </span>
        </div>
        <Rule double className="mt-5" />
        <div className="flex justify-between py-2 font-plex text-[10px] uppercase tracking-[0.2em] text-paper-muted">
          {masthead.strip.map((item, i) => (
            <span key={item} className={i === 1 ? "hidden md:inline" : undefined}>
              {item}
            </span>
          ))}
        </div>
        <Rule />
      </header>

      {/* Breaking-news ticker: breaking news = breaking changes */}
      <div className={cn(WRAP, "mt-3")}>
        <div className="flex overflow-hidden bg-paper-ink text-paper">
          <span className="z-10 shrink-0 bg-paper-accent px-3 py-2 font-plex text-[11px] font-medium uppercase tracking-[0.2em]">
            Breaking
          </span>
          <div className="flex overflow-hidden">
            <div className="flex w-max animate-marquee [--marquee-duration:55s] hover:[animation-play-state:paused]">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">
                  {ticker.map((item) => (
                    <span key={item} className="whitespace-nowrap px-6 py-2 font-plex text-[11px] uppercase tracking-[0.14em]">
                      {item} <span className="pl-6 text-paper-accent">▪</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main id="top">
        {/* Lead */}
        <Section className="grid gap-10 border-b border-paper-rule py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-8">
            <Kicker>{lead.kicker}</Kicker>
            <h1 className="mt-6 font-serif text-[clamp(4rem,10.5vw,10rem)] leading-[0.86] tracking-[-0.03em]">
              <LineReveal
                lines={[...lead.lines, <em key="accent" className="text-paper-accent">{lead.accent}</em>]}
              />
            </h1>
          </div>
          <aside className="flex flex-col justify-end gap-8 lg:col-span-4 lg:border-l lg:border-paper-rule lg:pl-8">
            <FadeUp delay={0.5}>
              <p className="font-serif text-[1.65rem] italic leading-snug">{site.description}</p>
              <p className="mt-4 font-plex text-[11px] uppercase tracking-[0.16em] text-paper-muted">{lead.byline}</p>
            </FadeUp>
            <FadeUp delay={0.65}>
              <InlineForm />
              <p className="mt-3 font-serif text-xl italic">
                Run an API? <PartnerLink placement="lead" />
              </p>
            </FadeUp>
          </aside>
        </Section>

        {/* Lead story */}
        <Section className="grid gap-12 border-b border-paper-rule py-16 lg:grid-cols-12 lg:py-20">
          <article className="lg:col-span-8">
            <Kicker>{story.kicker}</Kicker>
            <FadeUp>
              <SectionTitle title={story.title} accent={story.titleAccent} className="mt-4 sm:text-7xl" />
              <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-paper-muted">{story.standfirst}</p>
            </FadeUp>
            <div className="mt-10 gap-10 text-[17px] leading-[1.7] md:columns-2 [&>p+p]:mt-5">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[5.4em] first-letter:leading-[0.78] first-letter:text-paper-accent">
                {story.paragraphs[0]}
              </p>
              <p>{story.paragraphs[1]}</p>
              <blockquote className="my-8 break-inside-avoid border-y border-paper-ink py-6">
                <p className="font-serif text-[1.9rem] italic leading-[1.15]">
                  <span className="text-paper-accent">“</span>
                  {story.quote}
                  <span className="text-paper-accent">”</span>
                </p>
                <footer className="mt-3 font-plex text-[11px] uppercase tracking-[0.16em] text-paper-muted">
                  — {story.quoteBy}
                </footer>
              </blockquote>
              <p>{story.paragraphs[2]}</p>
              <p>{story.paragraphs[3]}</p>
            </div>
          </article>

          <aside className="space-y-12 lg:col-span-4">
            <div className="border-t-[3px] border-paper-ink pt-4">
              <h3 className="font-serif text-3xl">By the numbers</h3>
              <dl className="mt-4 divide-y divide-paper-rule">
                {problem.stats.map((stat) => (
                  <div key={stat.label} className="py-5">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <CountUp
                        to={stat.value}
                        suffix={stat.suffix}
                        className="font-serif text-7xl leading-none tracking-[-0.03em]"
                      />
                      <p className="mt-2 text-[15px] leading-snug text-paper-muted">{stat.label}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure>
              <figcaption className="font-plex text-[10px] uppercase tracking-[0.2em] text-paper-muted">
                From the archive · Fig. 1
              </figcaption>
              <div className="relative mt-3">
                <div className="-rotate-2 border border-paper-rule bg-[#fbf8f2] p-5 font-plex text-[13px] leading-relaxed shadow-[0_10px_30px_-12px_rgb(20_20_19/0.35)]">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-paper-muted">
                    <span>{story.clipping.source}</span>
                    <span>{story.clipping.date}</span>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {story.clipping.lines.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <Stamp className="absolute -bottom-6 right-2">Fixed by Boro</Stamp>
              </div>
            </figure>
          </aside>
        </Section>

        {/* How it works */}
        <Section id="how-it-works" className="border-b border-paper-rule py-16 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Kicker>{steps.kicker}</Kicker>
              <FadeUp>
                <SectionTitle title={steps.title} accent={steps.titleAccent} className="mt-4" />
              </FadeUp>
            </div>
            <p className="self-end text-lg leading-relaxed text-paper-muted lg:col-span-4">{howItWorks.description}</p>
          </div>
          <ol className="mt-14 grid border-t border-paper-ink sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-paper-rule">
            {howItWorks.steps.map((step, i) => (
              <li key={step.label} className="border-b border-paper-rule py-8 sm:px-6 lg:border-b-0 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-4xl italic text-paper-accent">No. {i + 1}</span>
                  <span className="font-plex text-[11px] uppercase tracking-[0.18em] text-paper-muted">{step.label}</span>
                </div>
                <Drawing paths={DRAWINGS[i].paths} dots={DRAWINGS[i].dots} className="mt-6" />
                <h3 className="mt-6 font-serif text-[1.75rem] leading-tight">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Analysis: why now */}
        <Section className="border-b border-paper-rule py-16 lg:py-24">
          <Kicker>{analysis.kicker}</Kicker>
          <FadeUp>
            <SectionTitle title={analysis.title} accent={analysis.titleAccent} className="mt-4 max-w-4xl" />
          </FadeUp>
          <div className="relative mt-14">
            <Rule className="absolute inset-x-0 top-[7px] hidden md:block" />
            <div className="grid gap-10 md:grid-cols-3">
              {whyNow.items.map((item, i) => (
                <FadeUp key={item.label} delay={0.2 + i * 0.15}>
                  <span
                    className={cn(
                      "relative block size-4 rounded-full border-2 border-paper-ink",
                      i === whyNow.items.length - 1 ? "bg-paper-accent" : "bg-paper",
                    )}
                  />
                  <p className="mt-5 font-plex text-[11px] uppercase tracking-[0.18em] text-paper-muted">{item.label}</p>
                  <h3 className={cn("mt-2 font-serif text-3xl leading-tight", i === 2 && "italic text-paper-accent")}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-paper-muted">{item.description}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </Section>

        {/* Opinion: audiences */}
        <Section className="border-b border-paper-rule py-16 lg:py-24">
          <Kicker>{opinion.kicker}</Kicker>
          <div className="mt-8 grid gap-12 md:grid-cols-2 md:divide-x md:divide-paper-rule">
            {audiences.tabs.map((tab, i) => (
              <FadeUp key={tab.key} delay={i * 0.12} className={i === 1 ? "md:pl-12" : "md:pr-12"}>
                <p className="font-plex text-[11px] uppercase tracking-[0.18em] text-paper-muted">{tab.eyebrow}</p>
                <h3 className="mt-3 text-balance font-serif text-5xl leading-[1] tracking-[-0.02em]">{tab.title}</h3>
                <p className="mt-3 font-serif text-lg italic text-paper-muted">
                  {tab.key === "teams" ? opinion.bylines.teams : opinion.bylines.providers}
                </p>
                <p className="mt-5 text-[17px] leading-[1.7]">{tab.description}</p>
                <ul className="mt-5 space-y-2 text-[15px]">
                  {tab.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-paper-accent">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {tab.key === "providers" && <PartnerButton placement="opinion-providers" className="mt-8" />}
              </FadeUp>
            ))}
          </div>
        </Section>

        {/* Letters: FAQ */}
        <Section id="letters" className="border-b border-paper-rule py-16 lg:py-24">
          <Kicker>{letters.kicker}</Kicker>
          <FadeUp>
            <SectionTitle title={letters.title} accent={letters.titleAccent} className="mt-4" />
          </FadeUp>
          <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {faqs.items.map((item, i) => (
              <FadeUp key={item.q} delay={(i % 2) * 0.1} className="border-t border-paper-ink pt-6">
                <p className="font-serif text-[1.65rem] italic leading-snug">“{item.q}”</p>
                <p className="mt-2 font-plex text-[11px] uppercase tracking-[0.16em] text-paper-muted">
                  — {letters.signatures[i % letters.signatures.length]}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed">
                  <span className="mr-2 font-plex text-[11px] font-medium uppercase tracking-[0.16em] text-paper-accent">
                    The editors reply:
                  </span>
                  {item.a}
                  {"partner" in item && item.partner && (
                    <>
                      {" "}
                      <PartnerLink placement="letters" />.
                    </>
                  )}
                </p>
              </FadeUp>
            ))}
          </div>
        </Section>

        {/* Coupon CTA */}
        <Section id="subscribe" className="py-20 lg:py-28">
          <Coupon />
          <p className="mt-10 text-center font-serif text-xl italic">
            Run an API? <PartnerLink placement="coupon" />
          </p>
        </Section>
      </main>

      {/* Colophon */}
      <footer className={cn(WRAP, "pb-10")}>
        <Rule double />
        <div className="grid gap-6 py-6 text-sm text-paper-muted sm:grid-cols-3">
          <span className="flex items-center gap-2 text-paper-ink">
            <LogoMark variant="mono" className="size-5" />
            <span className="font-serif text-2xl">Boro</span>
          </span>
          <p className="font-serif italic sm:text-center">
            Set in Instrument Serif, Instrument Sans &amp; IBM Plex Mono. Printed on the internet at{" "}
            <a href={site.url} className="underline decoration-paper-rule underline-offset-4 hover:text-paper-accent">
              {site.domain}
            </a>
            .
          </p>
          <p className="font-plex text-[11px] uppercase tracking-[0.16em] sm:text-right">
            <PartnerLink placement="colophon" className="no-underline hover:text-paper-accent">
              Design partners
            </PartnerLink>{" "}
            · © {new Date().getFullYear()} Boro
          </p>
        </div>
      </footer>
    </>
  );
}
