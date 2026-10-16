"use client";

import { CircleCheck, CircleX, Eye, FlaskConical, GitCommitHorizontal, Network, Radar, type LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { howItWorks as steps, integrationMap } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";
import { howItWorks, pr } from "./content";
import { Code, DiffRow, Label, SectionIntro } from "./primitives";

type Event = {
  icon: LucideIcon;
  step?: string;
  done?: boolean;
  text: ReactNode;
  description?: string;
  detail?: ReactNode;
};

const WORKFLOWS = integrationMap.workflows;
const CALL_SITES = WORKFLOWS.reduce((n, w) => n + w.callSites, 0);
const PROVIDERS = new Set(WORKFLOWS.flatMap((w) => w.providers)).size;

const STATUS_DOT = {
  healthy: "bg-pr-add",
  warning: "bg-[#bf8700]",
  failing: "bg-pr-del",
} as const;

const ALERTS = [
  { provider: "openai", change: "model retires Jun 30", workflow: "AI assistant", action: "migration PR #209" },
  { provider: "auth0", change: "OAuth scope change", workflow: "Sign-up & login", action: "deadline in 30 days" },
];

const TEST_OUTPUT: { ok: boolean; name: string }[] = [
  { ok: true, name: "refunds · full refund issues credit" },
  { ok: true, name: "refunds · partial refund updates order total" },
  { ok: false, name: "refunds · webhook retry is idempotent" },
];

const COMMIT_DIFF: { kind: "add" | "del" | "ctx"; code: string }[] = [
  { kind: "ctx", code: 'case "refund.updated":' },
  { kind: "del", code: "  // assumes charge.refunded already arrived" },
  { kind: "del", code: "  await markRefunded(lastChargeEvent.id);" },
  { kind: "add", code: "  await refunds.upsert(event.data.object.id, {" },
  { kind: "add", code: "    status: event.data.object.status," },
  { kind: "add", code: "  }, { idempotencyKey: event.id });" },
  { kind: "ctx", code: "  break;" },
];

const EVIDENCE = [
  { ok: false, label: "Before", result: "1 failing · refunds · webhook retry is idempotent" },
  { ok: true, label: "After", result: "6/6 passing · refunds workflow" },
];

const EVENTS: Event[] = [
  {
    icon: Network,
    step: `01 · ${steps.steps[0].label}`,
    text: (
      <>
        mapped <b className="text-pr-ink">{CALL_SITES} call sites</b> to <b className="text-pr-ink">{PROVIDERS} providers</b>{" "}
        across <b className="text-pr-ink">{WORKFLOWS.length} workflows</b>
      </>
    ),
    description: steps.steps[0].description,
    detail: (
      <ul className="divide-y divide-pr-line rounded-md border border-pr-line font-jet text-[13px]">
        {WORKFLOWS.map((w) => (
          <li key={w.name} className="flex items-center gap-3 px-4 py-2">
            <span aria-hidden className={cn("size-2 shrink-0 rounded-full", STATUS_DOT[w.status])} />
            <span className="truncate font-medium text-pr-ink">{w.name}</span>
            <span className="hidden truncate text-pr-muted sm:inline">{w.providers.join(", ")}</span>
            <span className="ml-auto shrink-0 rounded-full bg-[#818b981f] px-2 text-xs text-pr-muted">
              {w.callSites} call sites
            </span>
            <span className="sr-only">status: {w.status}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Radar,
    step: `02 · ${steps.steps[1].label}`,
    text: (
      <>
        is watching changelogs, deprecations and version sunsets for all <b className="text-pr-ink">{PROVIDERS} providers</b>
      </>
    ),
    description: steps.steps[1].description,
    detail: (
      <ul className="divide-y divide-pr-line rounded-md border border-pr-line font-jet text-[13px]">
        {ALERTS.map((a) => (
          <li key={a.provider} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2">
            <span className="text-pr-muted">{a.provider}</span>
            <span>{a.change}</span>
            <span className="text-pr-muted">→ hits</span>
            <span className="font-medium text-pr-ink">{a.workflow}</span>
            <span className="ml-auto shrink-0 rounded-full bg-[#fff8c5] px-2 text-xs text-pr-warn">{a.action}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: FlaskConical,
    step: `03 · ${steps.steps[2].label}`,
    text: (
      <>
        nightly run failed <Code>refunds · webhook retry is idempotent</Code> <Label tone="red">silent-drift</Label>
      </>
    ),
    description: steps.steps[2].description,
    detail: (
      <div className="overflow-hidden rounded-md border border-pr-line font-jet text-[13px] leading-relaxed">
        <ul className="divide-y divide-pr-line">
          {TEST_OUTPUT.map((t) => (
            <li key={t.name} className={cn("flex items-center gap-2 px-4 py-1.5", !t.ok && "bg-pr-del-bg/60")}>
              {t.ok ? (
                <CircleCheck aria-label="passed" className="size-4 shrink-0 text-pr-add" />
              ) : (
                <CircleX aria-label="failed" className="size-4 shrink-0 text-pr-del" />
              )}
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-pr-line border-l-4 border-l-pr-del bg-pr-canvas px-4 py-3">
          <div className="text-pr-muted">stripe sandbox · nightly</div>
          <div className="mt-1">
            Stripe now sends <Code>refund.updated</Code> before <Code>charge.refunded</Code>. The handler assumed the
            opposite order.
          </div>
          <div className="mt-1 text-pr-muted">changelog entry: none</div>
        </div>
      </div>
    ),
  },
  {
    icon: GitCommitHorizontal,
    step: `04 · ${steps.steps[3].label}`,
    text: (
      <>
        opened <b className="text-pr-ink">#{pr.number}</b> with 1 commit to <Code>src/webhooks/stripe.ts</Code>
      </>
    ),
    description: steps.steps[3].description,
    detail: (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-md border border-pr-line">
          <div className="flex items-center gap-3 border-b border-pr-line bg-pr-canvas px-4 py-2 text-sm">
            <span className="font-medium">Make refund webhook handler order-independent</span>
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
        <ul className="divide-y divide-pr-line rounded-md border border-pr-line text-sm">
          {EVIDENCE.map((e) => (
            <li key={e.label} className="flex items-center gap-2 px-4 py-2">
              {e.ok ? (
                <CircleCheck aria-hidden className="size-4 shrink-0 text-pr-add" />
              ) : (
                <CircleX aria-hidden className="size-4 shrink-0 text-pr-del" />
              )}
              <span className="font-medium">{e.label}</span>
              <span className="text-pr-muted">· {e.result}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    icon: CircleCheck,
    done: true,
    text: (
      <>
        <b className="text-pr-ink">All checks have passed</b> · refunds 6/6, type check, lint
      </>
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
