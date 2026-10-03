"use client";

import { GitMerge, GitPullRequest } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Height of the sticky tab bar; sticky file headers sit right under it. */
export const BAR_H = "top-[52px]";

type Kind = "add" | "del" | "ctx";

const rowBg: Record<Kind, string> = {
  add: "bg-pr-add-bg",
  del: "bg-pr-del-bg",
  ctx: "",
};

const gutterBg: Record<Kind, string> = {
  add: "bg-pr-add-strong/50",
  del: "bg-pr-del-strong/50",
  ctx: "",
};

const sign: Record<Kind, string> = { add: "+", del: "−", ctx: "" };

type DiffRowProps = {
  kind: Kind;
  oldNo?: number;
  newNo?: number;
  children: ReactNode;
  className?: string;
};

/** One line of a unified diff: two line-number columns, a +/− sign, then content. */
export function DiffRow({ kind, oldNo, newNo, children, className }: DiffRowProps) {
  return (
    <div className={cn("flex", rowBg[kind], className)}>
      <Num className={cn("hidden sm:block", gutterBg[kind])}>{kind === "add" ? "" : oldNo}</Num>
      <Num className={gutterBg[kind]}>{kind === "del" ? "" : newNo}</Num>
      <span
        aria-hidden
        className={cn(
          "w-7 shrink-0 select-none pt-[0.35em] text-center font-jet text-sm",
          kind === "add" ? "text-pr-add" : kind === "del" ? "text-pr-del" : "text-transparent",
        )}
      >
        {sign[kind]}
      </span>
      <div className="min-w-0 flex-1 py-1 pr-4">{children}</div>
    </div>
  );
}

function Num({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "w-11 shrink-0 select-none pr-2 pt-[0.45em] text-right font-jet text-xs text-pr-muted/70",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function HunkHeader({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#ddf4ff] px-4 py-1.5 font-jet text-xs text-pr-muted sm:pl-[6.5rem]">{children}</div>
  );
}

type FileCardProps = {
  path: string;
  additions?: number;
  deletions?: number;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** A "Files changed" card. Its header sticks under the tab bar while you scroll through it. */
export function FileCard({ path, additions = 0, deletions = 0, right, children, className }: FileCardProps) {
  return (
    <section className={cn("rounded-lg border border-pr-line bg-pr-bg", className)}>
      <header
        className={cn(
          "sticky z-20 flex items-center gap-3 rounded-t-lg border-b border-pr-line bg-pr-canvas/95 px-4 py-2.5 backdrop-blur",
          BAR_H,
        )}
      >
        <span className="truncate font-jet text-[13px] font-medium text-pr-ink">{path}</span>
        <DiffStat additions={additions} deletions={deletions} />
        <div className="ml-auto flex items-center gap-3">{right}</div>
      </header>
      <div className="overflow-hidden rounded-b-lg">{children}</div>
    </section>
  );
}

/** GitHub-style "+3 −1 ■■■□□" diff summary. */
export function DiffStat({ additions, deletions }: { additions: number; deletions: number }) {
  const total = Math.max(additions + deletions, 1);
  const green = Math.round((additions / total) * 5);
  const red = Math.min(5 - green, deletions > 0 ? Math.max(1, Math.round((deletions / total) * 5)) : 0);
  return (
    <span className="hidden shrink-0 items-center gap-2 font-jet text-xs sm:flex">
      {additions > 0 && <span className="text-pr-add">+{additions}</span>}
      {deletions > 0 && <span className="text-pr-del">−{deletions}</span>}
      <span className="flex gap-px">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "size-2 rounded-[1px]",
              i < green ? "bg-pr-btn" : i < green + red ? "bg-pr-del" : "bg-pr-line",
            )}
          />
        ))}
      </span>
    </span>
  );
}

export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code className={cn("rounded-md bg-[#818b981f] px-1.5 py-0.5 font-jet text-[0.85em]", className)}>
      {children}
    </code>
  );
}

export function Branch({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-[#ddf4ff] px-1.5 py-0.5 font-jet text-[0.85em] text-pr-link">{children}</span>
  );
}

const labelTones = {
  red: "border-[#cf222e]/30 bg-[#ffebe9] text-[#a40e26]",
  blue: "border-[#0969da]/30 bg-[#ddf4ff] text-[#0550ae]",
  purple: "border-[#8250df]/30 bg-[#fbefff] text-[#6639ba]",
  green: "border-[#1a7f37]/30 bg-[#dafbe1] text-[#116329]",
  amber: "border-[#9a6700]/30 bg-[#fff8c5] text-[#7d4e00]",
};

export function Label({ tone, children }: { tone: keyof typeof labelTones; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-px text-xs font-medium", labelTones[tone])}>
      {children}
    </span>
  );
}

/** Deterministic GitHub-style identicon for a handle. */
export function Identicon({ name, size = 32, className }: { name: string; size?: number; className?: string }) {
  let h = 7;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const hue = h % 360;
  const cells: [number, number][] = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      if ((h >> (y * 3 + x)) & 1) {
        cells.push([x, y]);
        if (x < 2) cells.push([4 - x, y]);
      }
    }
  }
  return (
    <svg
      viewBox="-1 -1 7 7"
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0 rounded-full border border-pr-line bg-[#f6f8fa]", className)}
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={`hsl(${hue} 55% 55%)`} />
      ))}
    </svg>
  );
}

/** The PR's Open → Merged status pill. */
export function StatusPill({ merged, size = "md" }: { merged: boolean; size?: "sm" | "md" }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={merged ? "merged" : "open"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium text-white",
          merged ? "bg-pr-merged" : "bg-pr-btn",
          size === "md" ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-xs",
        )}
      >
        {merged ? <GitMerge className="size-4" /> : <GitPullRequest className="size-4" />}
        {merged ? "Merged" : "Open"}
      </motion.span>
    </AnimatePresence>
  );
}

/** Section opener: a hunk-style mono line followed by a big headline. */
export function SectionIntro({ hunk, title, description }: { hunk: string; title: string; description?: string }) {
  return (
    <div className="mb-8">
      <div className="font-jet text-xs text-pr-muted">{hunk}</div>
      <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.03em] [font-stretch:112%] sm:text-[2.75rem] sm:leading-[1.05]">
        {title}
      </h2>
      {description && <p className="mt-3 max-w-2xl text-pretty text-lg text-pr-muted">{description}</p>}
    </div>
  );
}

export const greenButton =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[#1f232826] bg-pr-btn px-3.5 py-1.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.03)] transition-colors hover:bg-[#1c8139] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pr-link disabled:opacity-70";
