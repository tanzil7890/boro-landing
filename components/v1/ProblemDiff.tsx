"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn, EASE_OUT } from "@/lib/utils";
import { founder, problem } from "./content";
import { DiffRow, FileCard, HunkHeader, Identicon } from "./primitives";

const START = 14;

export function ProblemDiff() {
  return (
    <FileCard path={problem.file} additions={problem.pairs.length} deletions={problem.pairs.length}>
      <HunkHeader>{problem.hunk}</HunkHeader>
      {problem.pairs.map((pair, i) => (
        <Pair key={pair.del} del={pair.del} add={pair.add} line={START + i} />
      ))}
      <FounderComment />
    </FileCard>
  );
}

/** A removed pain point that gets struck through, then replaced by Boro's answer. */
function Pair({ del, add, line }: { del: string; add: string; line: number }) {
  const [on, setOn] = useState(false);
  return (
    <motion.div onViewportEnter={() => setOn(true)} viewport={{ once: true, margin: "0px 0px -25% 0px" }}>
      <DiffRow kind="del" oldNo={line}>
        <span
          className={cn(
            "block py-1.5 text-xl leading-snug tracking-[-0.02em] text-pr-ink/80 line-through decoration-2 transition-[text-decoration-color] duration-700 sm:text-[1.65rem]",
            on ? "decoration-pr-del" : "decoration-transparent",
          )}
        >
          {del}
        </span>
      </DiffRow>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={on ? { height: "auto", opacity: 1 } : undefined}
        transition={{ delay: 0.5, duration: 0.45, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <DiffRow kind="add" newNo={line}>
          <span className="block py-1.5 text-xl font-semibold leading-snug tracking-[-0.02em] [font-stretch:108%] sm:text-[1.65rem]">
            {add}
          </span>
        </DiffRow>
      </motion.div>
    </motion.div>
  );
}

const REACTIONS = [
  { emoji: "👍", count: 52 },
  { emoji: "🎯", count: 30 },
  { emoji: "👀", count: 47 },
];

/** Inline review comment from the founder, with a "suggested change". */
function FounderComment() {
  return (
    <div className="border-t border-pr-line bg-pr-canvas/60 p-3 sm:py-4 sm:pl-[6.5rem] sm:pr-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="rounded-md border border-pr-line bg-pr-bg"
      >
        <div className="flex flex-wrap items-center gap-2 border-b border-pr-line bg-pr-canvas px-4 py-2 text-sm">
          <Identicon name={founder.handle} size={24} />
          <span className="font-semibold">{founder.handle}</span>
          <span className="text-pr-muted">commented</span>
          <span className="ml-auto flex gap-1.5">
            <span className="rounded-full border border-pr-line px-2 text-xs text-pr-muted">{founder.role}</span>
            <span className="rounded-full border border-pr-line px-2 text-xs text-pr-muted">Author</span>
          </span>
        </div>
        <div className="space-y-3 px-4 py-3 text-[15px] leading-relaxed">
          {founder.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mx-4 mb-3 overflow-hidden rounded-md border border-pr-line">
          <div className="border-b border-pr-line bg-pr-canvas px-3 py-1.5 text-xs font-medium text-pr-muted">
            Suggested change
          </div>
          <div className="font-jet text-[13px]">
            <div className="flex gap-3 bg-pr-del-bg px-3 py-1.5">
              <span className="text-pr-del">−</span>
              {founder.suggestion.del}
            </div>
            <div className="flex gap-3 bg-pr-add-bg px-3 py-1.5">
              <span className="text-pr-add">+</span>
              {founder.suggestion.add}
            </div>
          </div>
          <div className="flex justify-end border-t border-pr-line bg-pr-canvas px-3 py-1.5">
            <a href="#review" className="text-xs font-medium text-pr-link hover:underline">
              Commit suggestion →
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {REACTIONS.map((r) => (
            <span
              key={r.emoji}
              className="inline-flex items-center gap-1.5 rounded-full border border-pr-link/30 bg-[#ddf4ff] px-2 py-0.5 text-xs text-pr-link"
            >
              <span aria-hidden>{r.emoji}</span>
              {r.count}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
