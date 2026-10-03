"use client";

import { Check, CircleCheck, GitMerge, GitPullRequest } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { DesignPartnerButton } from "@/components/ui/DesignPartner";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Tag, type Tone } from "@/components/ui/Tag";
import { Window } from "@/components/ui/Window";
import { audiences } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";

type Key = (typeof audiences.tabs)[number]["key"];

export function Audiences() {
  const [tab, setTab] = useState<Key>("teams");
  const current = audiences.tabs.find((t) => t.key === tab)!;

  // Nav links to #teams / #providers also switch the tab.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.('a[href="#teams"], a[href="#providers"]');
      if (link) setTab(link.getAttribute("href")!.slice(1) as Key);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const index = audiences.tabs.findIndex((t) => t.key === tab);
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = audiences.tabs[(index + step + audiences.tabs.length) % audiences.tabs.length].key;
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <section className="relative py-24 sm:py-32">
      <span id="teams" aria-hidden className="absolute top-0" />
      <span id="providers" aria-hidden className="absolute top-0" />
      <Container>
        <SectionHeading eyebrow={audiences.eyebrow} title={audiences.title} />

        <div
          role="tablist"
          aria-label="Who Boro is for"
          className="mx-auto mt-10 flex w-fit rounded-full border border-line bg-white/3 p-1"
        >
          {audiences.tabs.map((t) => {
            const selected = t.key === tab;
            return (
              <button
                key={t.key}
                id={`tab-${t.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${t.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(t.key)}
                onKeyDown={onKeyDown}
                className="relative rounded-full px-5 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-violet/60"
              >
                {selected && (
                  <motion.span
                    layoutId="audience-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/15"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className={cn("relative transition-colors", selected ? "text-fg" : "text-muted hover:text-fg")}>
                  {t.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 *:min-w-0"
          >
            <div>
              <Eyebrow>{current.eyebrow}</Eyebrow>
              <h3 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted">{current.description}</p>
              <ul className="mt-8 flex flex-col gap-3">
                {current.bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: EASE_OUT }}
                    className="flex items-center gap-3 text-[15px] text-fg/90"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-violet/15 text-[#b9a8ff]">
                      <Check className="size-3" />
                    </span>
                    {bullet}
                  </motion.li>
                ))}
              </ul>
              {tab === "providers" ? (
                <DesignPartnerButton placement="providers-tab" variant="primary" className="mt-10" />
              ) : (
                <Button href="#join" variant="ghost" className="mt-10">
                  Get early access
                </Button>
              )}
            </div>
            {tab === "teams" ? <TeamsVisual /> : <ProvidersVisual />}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}

const INBOX: { vendor: string; title: string; tag: string; tone: Tone }[] = [
  { vendor: "stripe", title: "Migrate charges.create → paymentIntents.create", tag: "Breaking", tone: "del" },
  { vendor: "openai", title: "Adopt the Responses API for chat", tag: "New feature", tone: "add" },
  { vendor: "twilio", title: "Update webhook signature validation", tag: "Breaking", tone: "del" },
  { vendor: "shopify", title: "Bump Admin GraphQL API to 2026-10", tag: "Deprecation", tone: "warn" },
];

function TeamsVisual() {
  return (
    <Window
      title="Pull requests · acme/web"
      right={<span className="font-mono text-[11px] text-muted">4 open</span>}
      bodyClassName="divide-y divide-line"
    >
      {INBOX.map((pr, i) => (
        <motion.div
          key={pr.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: EASE_OUT }}
          className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-white/2"
        >
          <GitPullRequest className="mt-0.5 size-4 shrink-0 text-add" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm text-fg">{pr.title}</div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-subtle">
              boro-bot · {pr.vendor} ·
              <CircleCheck className="size-3 text-add" />
              checks passed
            </div>
          </div>
          <Tag tone={pr.tone}>{pr.tag}</Tag>
        </motion.div>
      ))}
    </Window>
  );
}

const ROLLOUT_STATS = [
  { label: "Customer repos", value: 1284 },
  { label: "PRs opened", value: 1102 },
  { label: "Merged", value: 958 },
];

const ROLLOUT_FEED = [
  { repo: "acme/web", event: "PR merged", time: "2m" },
  { repo: "globex/api", event: "PR opened", time: "6m" },
  { repo: "initech/core", event: "Tests passed", time: "9m" },
];

function ProvidersVisual() {
  return (
    <Window
      title="stripe · update agent"
      right={<Tag tone="violet">Rolling out</Tag>}
      bodyClassName="p-5"
    >
      <div className="font-mono text-[11px] uppercase tracking-wider text-subtle">Migration</div>
      <div className="mt-1 text-sm text-fg">charges → PaymentIntents · API 2026-09-30</div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {ROLLOUT_STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-line bg-white/2 p-3">
            <CountUp to={stat.value} className="text-xl font-semibold tracking-tight text-fg" />
            <div className="mt-0.5 text-[11px] text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-muted">Merged across customers</span>
        <span className="font-mono text-fg">75%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ delay: 0.3, duration: 1.4, ease: EASE_OUT }}
          className="h-full rounded-full bg-linear-to-r from-violet to-cyan"
        />
      </div>

      <div className="mt-5 flex flex-col divide-y divide-line rounded-lg border border-line">
        {ROLLOUT_FEED.map((row, i) => (
          <motion.div
            key={row.repo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.12 }}
            className="flex items-center gap-2 px-3 py-2 text-xs"
          >
            <GitMerge className="size-3.5 text-[#b9a8ff]" />
            <span className="font-mono text-fg/85">{row.repo}</span>
            <span className="text-muted">{row.event}</span>
            <span className="ml-auto font-mono text-subtle">{row.time} ago</span>
          </motion.div>
        ))}
      </div>
    </Window>
  );
}
