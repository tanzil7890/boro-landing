"use client";

import {
  FileCode2,
  Folder,
  FlaskConical,
  GitPullRequest,
  Network,
  TriangleAlert,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { Tag } from "@/components/ui/Tag";
import { Window } from "@/components/ui/Window";
import { PRCard } from "@/components/visuals/PRCard";
import { cn, EASE_OUT } from "@/lib/utils";

const STAGES = [
  { label: "Map", icon: Network, duration: 2800, status: "Mapping integrations in acme/web", dot: "bg-cyan" },
  { label: "Test", icon: FlaskConical, duration: 2600, status: "Nightly test failed: refunds", dot: "bg-del" },
  { label: "Repair", icon: Wand2, duration: 3400, status: "Writing repair", dot: "bg-violet" },
  { label: "Open PR", icon: GitPullRequest, duration: 4800, status: "PR #214 opened", dot: "bg-add" },
];

type FileNode = { name: string; depth: number; dir?: boolean; hits?: number };

const FILES: FileNode[] = [
  { name: "src", depth: 0, dir: true },
  { name: "assistant", depth: 1, dir: true },
  { name: "reply.ts", depth: 2, hits: 1 },
  { name: "auth", depth: 1, dir: true },
  { name: "session.ts", depth: 2, hits: 2 },
  { name: "billing", depth: 1, dir: true },
  { name: "checkout.ts", depth: 2, hits: 3 },
  { name: "refunds.ts", depth: 2, hits: 1 },
  { name: "notify", depth: 1, dir: true },
  { name: "sms.ts", depth: 2, hits: 2 },
  { name: "webhooks", depth: 1, dir: true },
  { name: "stripe.ts", depth: 2, hits: 4 },
];

type CodeLine =
  | { kind: "ctx" | "del"; code: string }
  | { kind: "add"; code: string; order: number };

const CODE: CodeLine[] = [
  { kind: "ctx", code: "export async function onStripeEvent(event: Event) {" },
  { kind: "ctx", code: "  switch (event.type) {" },
  { kind: "ctx", code: '    case "refund.updated":' },
  { kind: "del", code: "      const refund = await db.refunds.get(event.id);" },
  { kind: "del", code: "      await refund.markSettled();" },
  { kind: "add", code: "      await db.refunds.upsert(event.data);", order: 0 },
  { kind: "add", code: "      await reconcileRefund(event.data.charge);", order: 1 },
  { kind: "ctx", code: "      break;" },
  { kind: "ctx", code: '    case "charge.refunded":' },
  { kind: "add", code: "      await reconcileRefund(event.data.id);", order: 2 },
  { kind: "ctx", code: "      break;" },
  { kind: "ctx", code: "  }" },
  { kind: "ctx", code: "}" },
];

/**
 * Looping product demo: map integrations → nightly test catches drift → write the repair → open a PR.
 * Pauses while scrolled out of view.
 */
export function HeroPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [{ stage, run }, setState] = useState({ stage: 0, run: 0 });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      setState((s) =>
        s.stage === STAGES.length - 1
          ? { stage: 0, run: s.run + 1 }
          : { stage: s.stage + 1, run: s.run },
      );
    }, STAGES[stage].duration);
    return () => clearTimeout(timer);
  }, [stage, inView]);

  return (
    <div ref={ref} className="relative">
      <Window title="boro · agent" right={<Status stage={stage} />}>
        <Stepper stage={stage} run={run} />
        <AnimatePresence mode="wait">
          <motion.div
            key={run}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EventBanner stage={stage} />
            <div className="relative flex h-[372px]">
              <FileTree stage={stage} />
              <Editor stage={stage} />
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[380px]"
                >
                  <PRCard title="Make refund webhook handler order-independent" number={214} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </Window>
    </div>
  );
}

function Status({ stage }: { stage: number }) {
  const { status, dot } = STAGES[stage];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={stage}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 font-mono text-[11px] text-muted"
      >
        <span className="relative flex size-1.5">
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-75", dot)} />
          <span className={cn("relative size-1.5 rounded-full", dot)} />
        </span>
        <span className="hidden sm:inline">{status}</span>
      </motion.span>
    </AnimatePresence>
  );
}

function Stepper({ stage, run }: { stage: number; run: number }) {
  return (
    <div className="grid grid-cols-4 border-b border-line">
      {STAGES.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="relative flex items-center justify-center gap-2 px-2 py-3 text-[11px] sm:justify-start sm:px-4 sm:text-xs"
          >
            <Icon
              className={cn(
                "size-3.5 shrink-0 transition-colors duration-300",
                i <= stage ? "text-fg" : "text-subtle",
              )}
            />
            <span
              className={cn(
                "font-medium transition-colors duration-300",
                i === stage ? "text-fg" : i < stage ? "text-muted" : "text-subtle",
              )}
            >
              {s.label}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-px">
              {i < stage && <div className="h-full w-full bg-linear-to-r from-violet to-cyan" />}
              {i === stage && (
                <motion.div
                  key={`${run}-${i}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: s.duration / 1000, ease: "linear" }}
                  className="h-full bg-linear-to-r from-violet to-cyan shadow-[0_0_8px_rgb(124_92_255/0.8)]"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EventBanner({ stage }: { stage: number }) {
  return (
    <div className="flex h-12 items-center gap-3 border-b border-line px-4 text-xs">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: EASE_OUT }}
        className="flex min-w-0 items-center gap-3"
      >
        <Tag tone="del">
          <TriangleAlert className="size-3" />
          Drift
        </Tag>
        <span className="hidden shrink-0 font-mono text-muted sm:inline">stripe · nightly test</span>
        <span className="truncate text-fg/90">
          Refund webhooks now arrive out of order. No changelog entry.
        </span>
      </motion.div>
      {stage >= 2 && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-auto hidden shrink-0 font-mono text-[11px] text-warn md:inline"
        >
          Refunds workflow · 1 file
        </motion.span>
      )}
    </div>
  );
}

function FileTree({ stage }: { stage: number }) {
  const scanned = stage >= 1;
  return (
    <div className="relative hidden w-56 shrink-0 overflow-hidden border-r border-line py-3 md:block">
      <div className="mb-2 px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
        acme/web
      </div>
      {FILES.map((file, i) => {
        const hit = scanned && !!file.hits;
        const Icon = file.dir ? Folder : FileCode2;
        return (
          <div
            key={file.name}
            className={cn(
              "mx-2 flex items-center gap-1.5 rounded-md py-[3px] pr-2 font-mono text-[12px] transition-colors duration-300",
              hit ? "bg-cyan/8 text-fg" : "text-muted",
              hit && stage >= 2 && file.name === "stripe.ts" && "ring-1 ring-inset ring-del/40",
            )}
            style={{ paddingLeft: 8 + file.depth * 14, transitionDelay: hit ? `${i * 120}ms` : "0ms" }}
          >
            <Icon className={cn("size-3.5 shrink-0", hit ? "text-cyan" : "text-subtle")} />
            <span className="truncate">{file.name}</span>
            {hit && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 + 0.15 }}
                className="ml-auto rounded bg-cyan/15 px-1.5 text-[10px] leading-4 text-cyan"
              >
                {file.hits}
              </motion.span>
            )}
          </div>
        );
      })}
      {stage === 1 && (
        <motion.div
          aria-hidden
          initial={{ top: "-15%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 1.7, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-x-0 h-16 border-b border-cyan/50 bg-linear-to-b from-transparent to-cyan/10"
        />
      )}
    </div>
  );
}

function Editor({ stage }: { stage: number }) {
  const scanned = stage >= 1;
  const fixing = stage >= 2;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-line px-4 font-mono text-[11px]">
        <span className="flex items-center gap-1.5 rounded-md bg-white/4 px-2 py-1 text-fg/80">
          <FileCode2 className="size-3 text-cyan" />
          src/webhooks/stripe.ts
        </span>
        {fixing && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="ml-auto"
          >
            <span className="text-add">+3</span> <span className="text-del">−2</span>
          </motion.span>
        )}
      </div>

      <div className="flex-1 overflow-hidden py-2 font-mono text-[11px] leading-[22px] sm:text-[12.5px]">
        {CODE.map((line, i) => {
          if (line.kind === "add") {
            if (!fixing) return null;
            return (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 22, opacity: 1 }}
                transition={{ delay: 0.3 + line.order * 0.4, duration: 0.3, ease: EASE_OUT }}
                className="flex overflow-hidden border-l-2 border-add bg-add/10"
              >
                <Gutter className="text-add">+</Gutter>
                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ delay: 0.45 + line.order * 0.4, duration: 0.45, ease: "linear" }}
                  className="whitespace-pre text-fg/90"
                >
                  <Highlight code={line.code} />
                </motion.span>
              </motion.div>
            );
          }

          const isDel = line.kind === "del";
          return (
            <div
              key={i}
              className={cn(
                "flex h-[22px] border-l-2 transition-colors duration-500",
                !isDel && "border-transparent",
                isDel && (fixing ? "border-del bg-del/10" : scanned ? "border-warn bg-warn/7" : "border-transparent"),
              )}
              style={{ transitionDelay: isDel && scanned && !fixing ? "700ms" : "0ms" }}
            >
              <Gutter className={isDel && fixing ? "text-del" : undefined}>{isDel && fixing ? "−" : ""}</Gutter>
              <span
                className={cn(
                  "whitespace-pre text-fg/75 transition-opacity duration-300",
                  isDel && fixing && "line-through decoration-del/60 opacity-50",
                )}
              >
                <Highlight code={line.code} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Gutter({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn("w-7 shrink-0 select-none text-center text-subtle", className)}>{children}</span>
  );
}
