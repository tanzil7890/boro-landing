"use client";

import {
  CircleCheck,
  FileJson,
  Loader2,
  Package,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag, type Tone } from "@/components/ui/Tag";
import { Window } from "@/components/ui/Window";
import { PRCard } from "@/components/visuals/PRCard";
import { howItWorks } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";

const WINDOW_TITLES = ["boro · sources", "boro · scan", "src/billing/checkout.ts", "Pull request #128"];

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
      return <DetectVisual />;
    case 1:
      return <ScanVisual />;
    case 2:
      return <FixVisual />;
    default:
      return <ShipVisual />;
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

const SOURCES: { icon: LucideIcon; source: string; detail: string; tag: string; tone: Tone }[] = [
  { icon: ScrollText, source: "Changelog", detail: "charges.create removed in API 2026-09-30", tag: "Breaking", tone: "del" },
  { icon: FileJson, source: "OpenAPI diff", detail: "POST /v1/charges marked deprecated", tag: "Deprecated", tone: "warn" },
  { icon: Package, source: "SDK release", detail: "stripe-node 18.0.0 (major)", tag: "Breaking", tone: "del" },
  { icon: Sparkles, source: "Changelog", detail: "New: tax.calculations endpoint", tag: "Feature", tone: "add" },
];

function DetectVisual() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-5">
      <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-subtle">
        <span>Watching 42 APIs</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-add" />
          live
        </span>
      </div>
      {SOURCES.map((s, i) => {
        const Icon = s.icon;
        return (
          <Stagger key={s.detail} i={i} className="flex items-center gap-3 rounded-lg border border-line bg-white/2 p-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-white/3">
              <Icon className="size-4 text-fg/70" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-wider text-subtle">{s.source}</div>
              <div className="truncate text-[13px] text-fg/90">{s.detail}</div>
            </div>
            <Tag tone={s.tone} className="ml-auto">
              {s.tag}
            </Tag>
          </Stagger>
        );
      })}
    </div>
  );
}

const USAGES = [
  { repo: "acme/web", file: "src/billing/checkout.ts", line: 4, call: "charges.create" },
  { repo: "acme/web", file: "src/billing/checkout.ts", line: 41, call: "charges.create" },
  { repo: "acme/web", file: "src/api/refunds.ts", line: 48, call: "charges.retrieve" },
  { repo: "acme/workers", file: "jobs/invoice.ts", line: 33, call: "charges.create" },
];

function ScanVisual() {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Tracing affected call sites</span>
        <span className="font-mono text-warn">4 usages · 3 files · 2 repos</span>
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
        {USAGES.map((u, i) => (
          <Stagger
            key={`${u.file}:${u.line}`}
            i={i + 2}
            className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-warn/15 bg-warn/4 px-3 py-2.5 font-mono text-[12px]"
          >
            <div className="min-w-0">
              <div className="text-[10px] text-subtle">{u.repo}</div>
              <div className="truncate text-fg/85">
                {u.file}
                <span className="text-subtle">:{u.line}</span>
              </div>
            </div>
            <span className="text-warn">{u.call}</span>
          </Stagger>
        ))}
      </div>
    </div>
  );
}

const DIFF: { kind: "ctx" | "del" | "add"; code: string }[] = [
  { kind: "ctx", code: "export async function checkout(order: Order) {" },
  { kind: "del", code: "  const charge = await stripe.charges.create({" },
  { kind: "add", code: "  const intent = await stripe.paymentIntents.create({" },
  { kind: "ctx", code: "    amount: order.total," },
  { kind: "del", code: "    source: order.cardToken," },
  { kind: "add", code: "    payment_method: order.paymentMethodId," },
  { kind: "add", code: "    confirm: true," },
  { kind: "ctx", code: "  });" },
  { kind: "del", code: "  return charge.id;" },
  { kind: "add", code: "  return intent.id;" },
  { kind: "ctx", code: "}" },
];

function FixVisual() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden py-3 font-mono text-[12px] leading-6">
        {DIFF.map((line, i) => (
          <Stagger
            key={i}
            i={i * 0.6}
            className={cn(
              "flex whitespace-pre border-l-2",
              line.kind === "add" && "border-add bg-add/10",
              line.kind === "del" && "border-del bg-del/10",
              line.kind === "ctx" && "border-transparent",
            )}
          >
            <span
              className={cn(
                "w-8 shrink-0 select-none text-center",
                line.kind === "add" ? "text-add" : line.kind === "del" ? "text-del" : "text-subtle",
              )}
            >
              {line.kind === "add" ? "+" : line.kind === "del" ? "−" : ""}
            </span>
            <span className={cn("text-fg/85", line.kind === "del" && "opacity-60")}>
              <Highlight code={line.code} />
            </span>
          </Stagger>
        ))}
      </div>
      <BuildStatus />
    </div>
  );
}

function BuildStatus() {
  return (
    <div className="relative flex h-11 items-center gap-2 border-t border-line px-4 font-mono text-[11px]">
      <motion.span
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.2 }}
        className="absolute left-4 flex items-center gap-2 text-muted"
      >
        <Loader2 className="size-3.5 animate-spin" />
        Running build and tests
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.3 }}
        className="flex items-center gap-2 text-add"
      >
        <CircleCheck className="size-3.5" />
        Build passed · 142 tests passed
      </motion.span>
    </div>
  );
}

function ShipVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-5">
      <Stagger i={0} className="rounded-lg border border-line bg-white/2 p-4 text-[13px] leading-relaxed">
        <div className="font-medium text-fg">What changed upstream</div>
        <p className="mt-1 text-muted">
          Stripe removed <code className="font-mono text-[#c4b5fd]">charges.create</code> in API version
          2026-09-30.
        </p>
        <div className="mt-3 font-medium text-fg">What this PR does</div>
        <p className="mt-1 text-muted">
          Migrates 4 call sites to <code className="font-mono text-[#c4b5fd]">paymentIntents.create</code>.
        </p>
      </Stagger>
      <Stagger i={1.5}>
        <PRCard />
      </Stagger>
    </div>
  );
}
