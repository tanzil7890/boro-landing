"use client";

import { CircleCheck, CircleX, FileCode2, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag, type Tone } from "@/components/ui/Tag";
import { Window } from "@/components/ui/Window";
import { PRCard } from "@/components/visuals/PRCard";
import { howItWorks } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";

const WINDOW_TITLES = ["boro · integration map", "boro · watch", "boro · nightly tests", "Pull request #214"];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          description={howItWorks.description}
        />

        <div className="mt-16 grid gap-16 lg:mt-8 lg:grid-cols-2 lg:gap-20">
          <ol className="min-w-0">
            {howItWorks.steps.map((step, i) => (
              <motion.li
                key={step.label}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="py-6 lg:flex lg:min-h-[75vh] lg:items-center lg:py-0"
              >
                <div
                  className={cn(
                    "transition-opacity duration-500",
                    active === i ? "lg:opacity-100" : "lg:opacity-25",
                  )}
                >
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full border text-[11px] transition-colors duration-500",
                        active === i ? "border-violet/50 bg-violet/10 text-fg" : "border-line",
                      )}
                    >
                      0{i + 1}
                    </span>
                    {step.label}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{step.description}</p>

                  {/* Mobile: visual sits inline under each step. */}
                  <div className="mt-8 lg:hidden">
                    <Window title={WINDOW_TITLES[i]} bodyClassName="h-[340px]">
                      <StepVisual index={i} />
                    </Window>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Desktop: one sticky window that swaps visuals as you scroll. */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-210px)]">
              <Window
                title={WINDOW_TITLES[active]}
                right={<StepDots active={active} />}
                bodyClassName="relative h-[380px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="h-full"
                  >
                    <StepVisual index={active} />
                  </motion.div>
                </AnimatePresence>
              </Window>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepDots({ active }: { active: number }) {
  return (
    <div className="flex gap-1.5">
      {howItWorks.steps.map((step, i) => (
        <span
          key={step.label}
          className={cn(
            "h-1.5 rounded-full transition-all duration-500",
            i === active ? "w-5 bg-linear-to-r from-violet to-cyan" : "w-1.5 bg-white/15",
          )}
        />
      ))}
    </div>
  );
}

function StepVisual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <MapVisual />;
    case 1:
      return <WatchVisual />;
    case 2:
      return <TestVisual />;
    default:
      return <RepairVisual />;
  }
}

/** Staggers a list of rows in when they scroll into view. */
function Stagger({ children, i, className }: { children: ReactNode; i: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + i * 0.12, duration: 0.4, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CALL_SITES = [
  { provider: "stripe", file: "src/billing/checkout.ts:41", call: "paymentIntents.create", workflow: "Checkout" },
  { provider: "stripe", file: "src/webhooks/stripe.ts:88", call: "charge.refunded", workflow: "Refunds" },
  { provider: "auth0", file: "src/auth/session.ts:17", call: "oauth/token", workflow: "Sign-up & login" },
  { provider: "twilio", file: "src/notify/sms.ts:23", call: "messages.create", workflow: "Notifications" },
  { provider: "openai", file: "src/assistant/reply.ts:52", call: "responses.create", workflow: "AI assistant" },
];

function MapVisual() {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Mapping outside API calls</span>
        <span className="font-mono text-cyan">53 call sites · 6 workflows</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="h-full rounded-full bg-linear-to-r from-violet to-cyan"
        />
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {CALL_SITES.map((c, i) => (
          <Stagger
            key={c.file}
            i={i + 1}
            className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-line bg-white/2 px-3 py-2 font-mono text-[12px]"
          >
            <div className="min-w-0">
              <div className="text-[10px] text-subtle">
                {c.provider} · {c.call}
              </div>
              <div className="flex items-center gap-1.5 truncate text-fg/85">
                <FileCode2 className="size-3 shrink-0 text-subtle" />
                {c.file}
              </div>
            </div>
            <Tag tone="violet">{c.workflow}</Tag>
          </Stagger>
        ))}
      </div>
    </div>
  );
}

const CHANGES: { provider: string; detail: string; workflow: string; due: string; tone: Tone }[] = [
  { provider: "shopify", detail: "Admin API 2025-07 sunset", workflow: "Order sync", due: "Apr 1", tone: "warn" },
  { provider: "auth0", detail: "read:users scope split in two", workflow: "Sign-up & login", due: "30 days", tone: "warn" },
  { provider: "openai", detail: "Model retirement announced", workflow: "AI assistant", due: "Jun 30", tone: "warn" },
  { provider: "stripe", detail: "Webhook retry order changed", workflow: "Refunds", due: "Now", tone: "del" },
];

function WatchVisual() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-5">
      <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-subtle">
        <span>Watching 18 providers</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-add" />
          live
        </span>
      </div>
      {CHANGES.map((c, i) => (
        <Stagger key={c.detail} i={i} className="rounded-lg border border-line bg-white/2 p-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">{c.provider}</span>
            <Tag tone={c.tone} className="ml-auto">
              {c.due}
            </Tag>
          </div>
          <div className="mt-1 truncate text-[13px] text-fg/90">{c.detail}</div>
          <div className="mt-0.5 text-[11px] text-muted">
            Hits <span className="text-[#b9a8ff]">{c.workflow}</span>
          </div>
        </Stagger>
      ))}
    </div>
  );
}

const TESTS: { name: string; workflow: string; ok: boolean }[] = [
  { name: "checkout · payment succeeds", workflow: "Checkout", ok: true },
  { name: "checkout · tax calculated", workflow: "Checkout", ok: true },
  { name: "refunds · webhook retry is idempotent", workflow: "Refunds", ok: false },
  { name: "login · token refresh", workflow: "Sign-up & login", ok: true },
  { name: "sms · respects rate limit", workflow: "Notifications", ok: true },
  { name: "orders · pagination complete", workflow: "Order sync", ok: true },
];

function TestVisual() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-2">
          <Moon className="size-3.5" />
          Nightly run · 02:00 UTC · sandbox
        </span>
        <span>
          <span className="text-add">5 passed</span> · <span className="text-del">1 failed</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4 font-mono text-[12px]">
        {TESTS.map((t, i) => (
          <Stagger
            key={t.name}
            i={i * 0.8}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2",
              t.ok ? "text-fg/80" : "border border-del/30 bg-del/10 text-fg",
            )}
          >
            {t.ok ? (
              <CircleCheck className="size-3.5 shrink-0 text-add" />
            ) : (
              <CircleX className="size-3.5 shrink-0 text-del" />
            )}
            <span className="truncate">{t.name}</span>
          </Stagger>
        ))}
      </div>
      <div className="border-t border-line px-5 py-3 text-[12px] text-muted">
        <span className="text-del">Drift detected:</span> Stripe now sends{" "}
        <code className="font-mono text-[#c4b5fd]">refund.updated</code> first. No changelog entry.
      </div>
    </div>
  );
}

function RepairVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-5">
      <Stagger i={0} className="rounded-lg border border-line bg-white/2 p-4 text-[13px] leading-relaxed">
        <div className="font-medium text-fg">What changed upstream</div>
        <p className="mt-1 text-muted">
          Stripe webhooks can now deliver <code className="font-mono text-[#c4b5fd]">refund.updated</code> before{" "}
          <code className="font-mono text-[#c4b5fd]">charge.refunded</code>.
        </p>
        <div className="mt-3 font-medium text-fg">Evidence</div>
        <div className="mt-1.5 flex flex-wrap gap-2 font-mono text-[11px]">
          <Tag tone="del">Before: 1 test failing</Tag>
          <Tag tone="add">After: 6 of 6 passing</Tag>
        </div>
      </Stagger>
      <Stagger i={1.5}>
        <PRCard title="Make refund webhook handler order-independent" number={214} />
      </Stagger>
    </div>
  );
}
