"use client";

import { CircleCheck, GitPullRequest } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CHECKS = ["Tests", "Type check", "Lint"];

type PRCardProps = {
  className?: string;
  title?: string;
  number?: number;
};

/** Pull request summary card; checks tick in one by one on mount. */
export function PRCard({
  className,
  title = "Make refund webhook handler order-independent",
  number = 214,
}: PRCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#101016] p-4 shadow-2xl shadow-black/60",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-add/15 text-add">
          <GitPullRequest className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-fg">
            {title} <span className="font-normal text-subtle">#{number}</span>
          </div>
          <div className="mt-1 font-mono text-[11px] text-muted">
            boro-bot wants to merge into{" "}
            <span className="rounded bg-white/5 px-1 text-fg/80">main</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3">
        {CHECKS.map((check, i) => (
          <motion.div
            key={check}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.25 }}
            className="flex items-center gap-1.5 text-xs text-muted"
          >
            <CircleCheck className="size-3.5 text-add" />
            {check}
          </motion.div>
        ))}
        <span className="ml-auto font-mono text-[11px]">
          <span className="text-add">+18</span> <span className="text-del">−11</span>
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
        className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-add/10 px-3 py-2 text-xs"
      >
        <span className="text-add">All checks passed</span>
        <span className="rounded-md bg-add px-2.5 py-1 font-medium text-canvas">Merge</span>
      </motion.div>
    </div>
  );
}
