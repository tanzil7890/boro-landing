"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { audiences, faqs, finalCta, howItWorks, integrationMap, problem, site, whyNow } from "@/lib/content";
import { useWaitlist } from "@/lib/useWaitlist";
import { cn, EASE_OUT } from "@/lib/utils";
import { gitLog, log, mapCommand, watch } from "./content";
import { PartnerCommand, PartnerLink } from "./DesignPartner";

function Wrap({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("border-t border-brk-line py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

function Heading({ command, title, children }: { command: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="font-jet text-xs text-brk-dim">{command}</p>
      <h2 className="mt-4 text-balance text-4xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-pretty text-lg leading-relaxed text-brk-dim">{children}</p>}
    </div>
  );
}

function Pane({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-brk-line bg-brk-panel", className)}>
      <div className="border-b border-brk-line px-4 py-2 font-jet text-[11px] text-brk-dim">{title}</div>
      {children}
    </div>
  );
}

function Caret() {
  return <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-brk-green" />;
}

const LEVEL: Record<string, string> = {
  WARN: "text-brk-amber",
  INFO: "text-brk-dim",
  ERROR: "text-brk-red",
};

export function LogSection() {
  return (
    <Wrap>
      <Heading command={log.command} title={problem.title}>
        {problem.description}
      </Heading>
      <Pane title="integrations.log" className="mt-12">
        <div className="overflow-x-auto p-5 font-jet text-[13px] leading-7">
          {log.lines.map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: i * 0.45, duration: 0.3 }}
              className="flex gap-4 whitespace-nowrap"
            >
              <span className="text-brk-dim">{line.time}</span>
              <span className={cn("w-16", LEVEL[line.level])}>[{line.level}]</span>
              <span className={line.level === "ERROR" ? "text-brk-ink" : "text-brk-ink/80"}>{line.text}</span>
              <span className="ml-auto pl-8 text-brk-dim">← {line.note}</span>
            </motion.div>
          ))}
        </div>
      </Pane>
      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {problem.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: EASE_OUT }}
          >
            <div
              className={cn(
                "text-7xl font-bold tracking-[-0.06em] sm:text-8xl",
                i === 1 ? "text-brk-red" : i === 2 ? "text-brk-green" : "text-brk-ink",
              )}
            >
              {stat.value}
              {stat.suffix}
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brk-dim">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </Wrap>
  );
}

const TONE: Record<string, string> = {
  green: "text-brk-green",
  red: "text-brk-red",
  amber: "text-brk-amber",
  ink: "text-brk-ink",
};

/** How it works as a live `boro watch` session that streams in when scrolled into view. */
export function WatchSection() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const total = watch.lines.length;

  useEffect(() => {
    if (!started) return;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= total) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, [started, total]);

  const reachedStep = Math.max(-1, ...watch.lines.slice(0, count).map((l) => l.step));

  return (
    <Wrap id="how-it-works">
      <Heading command="$ man boro" title={howItWorks.title}>
        {howItWorks.description}
      </Heading>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <motion.div onViewportEnter={() => setStarted(true)} viewport={{ once: true, amount: 0.5 }}>
          <Pane title="~/acme — zsh">
            <div className="min-h-80 overflow-x-auto p-5 font-jet text-[13px] leading-7">
              <div className="whitespace-nowrap">
                <span className="text-brk-green">$</span> {watch.command}
                {count === 0 && <Caret />}
              </div>
              {watch.lines.slice(0, count).map((line) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3 whitespace-nowrap"
                >
                  <span className={TONE[line.tone]}>{line.glyph}</span>
                  <span className="text-brk-ink/90">{line.text}</span>
                </motion.div>
              ))}
              {count >= total && (
                <div>
                  <span className="text-brk-green">$</span> <Caret />
                </div>
              )}
            </div>
          </Pane>
        </motion.div>
        <ol className="space-y-6">
          {howItWorks.steps.map((step, i) => (
            <li
              key={step.label}
              className={cn(
                "border-l-2 pl-5 transition-all duration-500",
                i <= reachedStep ? "border-brk-green opacity-100" : "border-brk-line opacity-40",
              )}
            >
              <div className="font-jet text-xs uppercase tracking-[0.2em] text-brk-dim">
                0{i + 1} · {step.label}
              </div>
              <h3 className="mt-1 text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-brk-dim">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Wrap>
  );
}

const HEALTH: Record<string, { glyph: string; tone: string }> = {
  healthy: { glyph: "✓", tone: "text-brk-green" },
  warning: { glyph: "⚠", tone: "text-brk-amber" },
  failing: { glyph: "✖", tone: "text-brk-red" },
};

/** The integration map as `boro map` output: workflow, providers, call sites, health. */
export function MapSection() {
  return (
    <Wrap id="map">
      <Heading command={mapCommand} title={integrationMap.title}>
        {integrationMap.description}
      </Heading>
      <Pane title="boro map" className="mt-12">
        <div className="overflow-x-auto p-5 font-jet text-[13px] leading-8">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead className="text-brk-dim">
              <tr>
                <th className="pr-6 font-normal">WORKFLOW</th>
                <th className="pr-6 font-normal">PROVIDERS</th>
                <th className="pr-6 font-normal">CALL SITES</th>
                <th className="font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {integrationMap.workflows.map((wf, i) => {
                const health = HEALTH[wf.status];
                return (
                  <motion.tr
                    key={wf.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <td className="whitespace-nowrap pr-6 text-brk-ink">{wf.name}</td>
                    <td className="whitespace-nowrap pr-6 text-brk-ink/80">{wf.providers.join(", ")}</td>
                    <td className="pr-6 text-brk-dim">{wf.callSites}</td>
                    <td className={cn("whitespace-nowrap", health.tone)}>
                      {health.glyph}{" "}
                      <span className={wf.status === "healthy" ? "text-brk-dim" : undefined}>{wf.note}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Pane>
    </Wrap>
  );
}

export function GitLogSection() {
  return (
    <Wrap>
      <Heading command={gitLog.command} title={whyNow.title}>
        {whyNow.description}
      </Heading>
      <Pane title="git log" className="mt-12">
        <div className="overflow-x-auto p-5 font-jet text-[13px] leading-8">
          {gitLog.commits.map((commit, i) => (
            <motion.div
              key={commit.sha}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
              className="flex gap-3 whitespace-nowrap"
            >
              <span className={commit.head ? "text-brk-green" : "text-brk-dim"}>*</span>
              <span className="text-brk-amber">{commit.sha}</span>
              {commit.head && <span className="text-brk-green">(HEAD → main)</span>}
              <span className={commit.head ? "text-brk-ink" : "text-brk-ink/70"}>{commit.text}</span>
            </motion.div>
          ))}
        </div>
      </Pane>
    </Wrap>
  );
}

export function PanesSection() {
  return (
    <Wrap id="who">
      <Heading command="$ ls ~" title={audiences.title} />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {audiences.tabs.map((tab) => (
          <Pane key={tab.key} title={`~/${tab.key === "teams" ? "for-teams" : "for-providers"} — cat README.md`}>
            <div className="p-6">
              <p className="font-jet text-xs uppercase tracking-[0.2em] text-brk-dim">{tab.eyebrow}</p>
              <h3 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em]">{tab.title}</h3>
              <p className="mt-3 leading-relaxed text-brk-dim">{tab.description}</p>
              <ul className="mt-6 space-y-2 font-jet text-[13px]">
                {tab.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-brk-green">+</span>
                    {b}
                  </li>
                ))}
              </ul>
              {tab.key === "teams" && <PartnerCommand placement="for-teams" className="mt-8" />}
            </div>
          </Pane>
        ))}
      </div>
    </Wrap>
  );
}

// One `boro help <topic>` per faqs.items entry, in order.
const TOPICS = ["agents", "access", "production", "packages", "languages", "providers", "pricing"];

export function HelpSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Wrap id="faq">
      <Heading command="$ boro help" title={faqs.title} />
      <Pane title="boro help" className="mt-12">
        <div className="px-5 pt-4 font-jet text-xs text-brk-dim">Usage: boro help &lt;topic&gt;</div>
        <div className="mt-3">
          {faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-brk-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full flex-col gap-1 px-5 py-3.5 text-left font-jet text-[13px] transition-colors hover:bg-white/3 sm:flex-row sm:gap-6"
                >
                  <span className="shrink-0 text-brk-green sm:w-48">boro help {TOPICS[i] ?? "more"}</span>
                  <span className="text-brk-ink">{item.q}</span>
                  <span className="ml-auto hidden text-brk-dim sm:inline">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-relaxed text-brk-dim sm:pl-[16.5rem]">
                        {item.a}
                        {"partner" in item && item.partner && (
                          <>
                            {" "}
                            <PartnerLink placement="help" />
                          </>
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Pane>
    </Wrap>
  );
}

/** CTA: the `boro join` prompt is the real input. */
export function JoinSection() {
  const { email, setEmail, submit, status, error } = useWaitlist();
  const inputId = useId();
  const [submitted, setSubmitted] = useState("");

  return (
    <Wrap id="join">
      <h2 className="text-balance text-5xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-7xl">
        {finalCta.titleLead}
        <br />
        <span className="text-brk-green">{finalCta.titleAccent}</span>
      </h2>
      <p className="mt-6 text-lg text-brk-dim">{finalCta.description}</p>
      <form
        onSubmit={(e) => {
          setSubmitted(email.trim());
          submit(e);
        }}
        noValidate
        className="mt-10 rounded-md border border-brk-line bg-brk-panel p-5 font-jet text-sm sm:p-6 sm:text-base"
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
          <span className="text-brk-green">$</span>
          <label htmlFor={inputId}>boro join --email</label>
          <input
            id={inputId}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "success"}
            className="min-w-[14ch] flex-1 bg-transparent text-brk-ink caret-brk-green outline-none placeholder:text-brk-dim/60"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="rounded border border-brk-line px-3 py-1 text-xs text-brk-dim transition-colors hover:border-brk-ink hover:text-brk-ink disabled:opacity-50"
          >
            ↵ run
          </button>
        </div>
        <div aria-live="polite" className="mt-3 min-h-12 text-[13px] leading-6">
          {status === "loading" && <div className="text-brk-dim">… joining waitlist</div>}
          {status === "error" && <div className="text-brk-red">✖ {error}</div>}
          {status === "success" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-brk-green">✓ added {submitted} to the waitlist</div>
              <div className="text-brk-dim">→ we&apos;ll email you when early access opens</div>
            </motion.div>
          )}
        </div>
      </form>
      <p className="mt-3 font-jet text-xs text-brk-dim">Press Enter to run.</p>
      <div className="mt-10 flex flex-wrap items-center gap-3 font-jet text-sm text-brk-dim">
        {finalCta.partnerPrompt.toLowerCase()}
        <PartnerCommand placement="join" />
      </div>
    </Wrap>
  );
}

export function BreakFooter() {
  return (
    <footer className="border-t border-brk-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-8 font-jet text-xs text-brk-dim">
        <LogoMark variant="mono" className="size-4 text-brk-ink" />
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href={site.url} className="hover:text-brk-ink">
          {site.domain}
        </a>
        <PartnerLink placement="footer" />
        <span className="ml-auto">integrations: all passing</span>
      </div>
    </footer>
  );
}
