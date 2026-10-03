"use client";

import { CircleCheck, Eye, GitCommitHorizontal, Radar, ScanSearch, type LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { howItWorks as steps } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";
import { howItWorks } from "./content";
import { Code, DiffRow, Label, SectionIntro } from "./primitives";

type Event = {
  icon: LucideIcon;
  step?: string;
  done?: boolean;
  text: ReactNode;
  description?: string;
  detail?: ReactNode;
};

const USAGES = [
  { file: "acme/web · src/billing/checkout.ts", count: 2 },
  { file: "acme/web · src/api/refunds.ts", count: 1 },
  { file: "acme/workers · jobs/invoice.ts", count: 1 },
];

const COMMIT_DIFF: { kind: "add" | "del" | "ctx"; code: string }[] = [
  { kind: "del", code: "const charge = await stripe.charges.create({" },
  { kind: "add", code: "const intent = await stripe.paymentIntents.create({" },
  { kind: "ctx", code: "  amount: order.total," },
  { kind: "del", code: "  source: order.cardToken," },
  { kind: "add", code: "  payment_method: order.paymentMethodId," },
  { kind: "add", code: "  confirm: true," },
  { kind: "ctx", code: "});" },
];

const EVENTS: Event[] = [
  {
    icon: Radar,
    step: "01 · Detect",
    text: (
      <>
        detected a breaking change in <Code>stripe</Code> API <Code>2026-09-30</Code> <Label tone="red">breaking-change</Label>
      </>
    ),
    description: steps.steps[0].description,
    detail: (
      <blockquote className="rounded-md border border-pr-line border-l-4 border-l-pr-del bg-pr-canvas px-4 py-3 font-jet text-[13px] leading-relaxed">
        <div className="text-pr-muted">stripe/CHANGELOG.md · 2026-09-30</div>
        <div className="mt-1">
          <b>Breaking:</b> <Code>charges.create</Code> has been removed. Migrate to <Code>paymentIntents.create</Code>.
        </div>
      </blockquote>
    ),
  },
  {
    icon: ScanSearch,
    step: "02 · Scan",
    text: (
      <>
        scanned <b className="text-pr-ink">3 repositories</b> and found <b className="text-pr-ink">4 usages</b> of{" "}
        <Code>charges.create</Code>
      </>
    ),
    description: steps.steps[1].description,
    detail: (
      <ul className="divide-y divide-pr-line rounded-md border border-pr-line font-jet text-[13px]">
        {USAGES.map((u) => (
          <li key={u.file} className="flex items-center gap-3 px-4 py-2">
            <span className="truncate">{u.file}</span>
            <span className="ml-auto shrink-0 rounded-full bg-[#fff8c5] px-2 text-xs text-pr-warn">
              {u.count} {u.count === 1 ? "usage" : "usages"}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: GitCommitHorizontal,
    step: "03 · Fix",
    text: <>added 1 commit</>,
    description: steps.steps[2].description,
    detail: (
      <div className="overflow-hidden rounded-md border border-pr-line">
        <div className="flex items-center gap-3 border-b border-pr-line bg-pr-canvas px-4 py-2 text-sm">
          <span className="font-medium">Migrate charges.create → paymentIntents.create</span>
          <span className="ml-auto font-jet text-xs text-pr-muted">a1f3c9e</span>
        </div>
        <div className="font-jet text-[13px] leading-6">
          {COMMIT_DIFF.map((line, i) => (
            <DiffRow key={i} kind={line.kind} oldNo={40 + i} newNo={40 + i} className="[&>div]:py-0">
              <span className="whitespace-pre">
                <Highlight code={line.code} palette="light" />
              </span>
            </DiffRow>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: CircleCheck,
    step: "04 · Ship",
    done: true,
    text: (
      <>
        <b className="text-pr-ink">All checks have passed</b> · 3 successful checks
      </>
    ),
    description: steps.steps[3].description,
    detail: (
      <ul className="divide-y divide-pr-line rounded-md border border-pr-line text-sm">
        {[
          ["Tests", "142 passed"],
          ["Type check", "no errors"],
          ["Lint", "clean"],
        ].map(([name, result]) => (
          <li key={name} className="flex items-center gap-2 px-4 py-2">
            <CircleCheck className="size-4 text-pr-add" />
            <span className="font-medium">{name}</span>
            <span className="text-pr-muted">· {result}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Eye,
    text: (
      <>
        requested a review from <b className="text-pr-ink">you</b> ·{" "}
        <a href="#review" className="text-pr-link hover:underline">
          approve below
        </a>
      </>
    ),
  },
];

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="timeline" className="scroll-mt-20">
      <SectionIntro hunk={howItWorks.hunk} title={howItWorks.title} description={howItWorks.description} />
      <ol ref={ref} className="relative space-y-10">
        <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-0.5 bg-pr-line" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-0 left-[19px] top-0 w-0.5 origin-top bg-pr-btn"
        />
        {EVENTS.map((event, i) => {
          const Icon = event.icon;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="relative pl-14"
            >
              <span
                className={cn(
                  "absolute left-0 top-0 grid size-10 place-items-center rounded-full border-4 border-pr-bg",
                  event.done ? "bg-pr-btn text-white" : "bg-pr-canvas text-pr-muted ring-1 ring-pr-line",
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[15px] text-pr-muted">
                {!event.done && <b className="text-pr-ink">boro-bot</b>}
                {event.text}
                {event.step && (
                  <span className="ml-auto rounded-full border border-pr-line px-2 py-px font-jet text-[11px] text-pr-muted">
                    {event.step}
                  </span>
                )}
              </div>
              {event.description && (
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-pr-muted">{event.description}</p>
              )}
              {event.detail && <div className="mt-3">{event.detail}</div>}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
