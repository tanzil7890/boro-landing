"use client";

import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { whyNow } from "./content";
import { SectionIntro } from "./primitives";

type State = "fail" | "running" | "pass";

/** "Why now" as a checks panel: the last check fails until Boro fixes it. */
export function ChecksPanel() {
  const [state, setState] = useState<State>("fail");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function start() {
    timers.current.push(
      setTimeout(() => setState("running"), 1100),
      setTimeout(() => setState("pass"), 2300),
    );
  }

  const summary = {
    fail: { title: "Some checks were not successful", sub: "2 successful and 1 failing check" },
    running: { title: "Some checks haven't completed yet", sub: "2 successful and 1 in progress" },
    pass: { title: "All checks have passed", sub: "3 successful checks" },
  }[state];

  return (
    <section id="checks" className="scroll-mt-20">
      <SectionIntro hunk={whyNow.hunk} title={whyNow.title} description={whyNow.description} />
      <motion.div
        onViewportEnter={start}
        viewport={{ once: true, amount: 0.6 }}
        className="overflow-hidden rounded-lg border border-pr-line"
      >
        <div className="flex items-center gap-3 border-b border-pr-line bg-pr-canvas px-4 py-3">
          <StatusIcon state={state} className="size-8" />
          <div>
            <div className="font-semibold">{summary.title}</div>
            <div className="text-xs text-pr-muted">{summary.sub}</div>
          </div>
        </div>
        <ul className="divide-y divide-pr-line">
          {whyNow.checks.map((check) => {
            const rowState: State = check.fail ? state : "pass";
            const text = rowState === "pass" ? check.pass : check.fail;
            return (
              <li
                key={check.name}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 transition-colors duration-500",
                  rowState === "fail" && "bg-pr-del-bg/60",
                  check.fail && rowState === "pass" && "bg-pr-add-bg/60",
                )}
              >
                <StatusIcon state={rowState} className="mt-0.5 size-5" />
                <div className="min-w-0 flex-1">
                  <div className="font-jet text-[13px] font-semibold">{check.name}</div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={text}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-0.5 text-sm text-pr-muted"
                    >
                      {text}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <span className="shrink-0 font-jet text-xs text-pr-muted">{check.time}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}

function StatusIcon({ state, className }: { state: State; className?: string }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={state}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
        className="shrink-0"
      >
        {state === "pass" && <CircleCheck className={cn("text-pr-add", className)} />}
        {state === "fail" && <CircleX className={cn("text-pr-del", className)} />}
        {state === "running" && <Loader2 className={cn("animate-spin text-[#bf8700]", className)} />}
      </motion.span>
    </AnimatePresence>
  );
}
