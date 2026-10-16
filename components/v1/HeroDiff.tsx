"use client";

import { Check, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { useWaitlist } from "@/lib/useWaitlist";
import { cn, EASE_OUT } from "@/lib/utils";
import { hero } from "./content";
import { PartnerLink } from "./DesignPartner";
import { DiffRow, FileCard, greenButton, HunkHeader } from "./primitives";

const TYPE_START = 1150;
const TYPE_SPEED = 42;

/**
 * README.md diff: the old line gets struck through, then the new headline types itself in.
 */
export function HeroDiff({ merged, onMerged }: { merged: boolean; onMerged: (email: string) => void }) {
  const reduce = useReducedMotion();
  const [struck, setStruck] = useState(false);
  // null = render the full headline (SSR / reduced motion); a number = characters typed so far.
  const [typed, setTyped] = useState<number | null>(null);

  useEffect(() => {
    const strike = setTimeout(() => setStruck(true), reduce ? 0 : 700);
    if (reduce) return () => clearTimeout(strike);

    let count = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setTyped(0);
      interval = setInterval(() => {
        count += 1;
        setTyped(count);
        if (count >= hero.added.length) clearInterval(interval);
      }, TYPE_SPEED);
    }, TYPE_START);

    return () => {
      clearTimeout(strike);
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduce]);

  const shown = typed === null ? hero.added : hero.added.slice(0, typed);

  return (
    <FileCard
      path={hero.file}
      additions={1}
      deletions={1}
      right={<ChevronDown aria-hidden className="size-4 text-pr-muted" />}
    >
      <HunkHeader>{hero.hunk}</HunkHeader>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DiffRow kind="del" oldNo={1}>
          <span
            className={cn(
              "font-jet text-base text-pr-ink/75 line-through decoration-2 transition-[text-decoration-color] duration-500 sm:text-xl",
              struck ? "decoration-pr-del" : "decoration-transparent",
            )}
          >
            {hero.removed}
          </span>
        </DiffRow>
      </motion.div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ delay: TYPE_START / 1000, duration: 0.45, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <DiffRow kind="add" newNo={1}>
          <h1 className="relative py-3 text-[clamp(2.6rem,8vw,6.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#0d1117] [font-stretch:115%]">
            <span className="sr-only">{hero.added}</span>
            <span aria-hidden className="invisible">
              {hero.added}
            </span>
            <span aria-hidden className="absolute inset-0 py-3">
              {shown}
              {typed !== null && (
                <span className="ml-1 inline-block h-[0.8em] w-[0.07em] translate-y-[0.08em] animate-caret bg-pr-add" />
              )}
            </span>
          </h1>
        </DiffRow>
      </motion.div>

      <DiffRow kind="ctx" oldNo={2} newNo={2}>
        <p className="max-w-2xl text-pretty py-2 text-lg leading-relaxed text-pr-muted sm:text-xl">{hero.description}</p>
      </DiffRow>
      <DiffRow kind="ctx" oldNo={3} newNo={3}>
        <div className="py-3">
          <HeroForm merged={merged} onMerged={onMerged} />
        </div>
      </DiffRow>
      <DiffRow kind="ctx" oldNo={4} newNo={4}>
        <span className="font-jet text-sm text-pr-muted">{"// private beta · no spam, ever"}</span>
      </DiffRow>
      <DiffRow kind="ctx" oldNo={5} newNo={5} className="pb-3">
        <span className="font-jet text-sm text-pr-muted">{`// ${hero.partnerPrompt.toLowerCase()} `}</span>
        <PartnerLink placement="hero" className="font-jet text-sm">
          become a design partner
        </PartnerLink>
      </DiffRow>
    </FileCard>
  );
}

function HeroForm({ merged, onMerged }: { merged: boolean; onMerged: (email: string) => void }) {
  const { email, setEmail, submit, error, isError, isLoading } = useWaitlist({ onSuccess: onMerged });
  const inputId = useId();
  const errorId = useId();

  if (merged) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 rounded-md border border-pr-merged/30 bg-[#fbefff] px-3 py-2 text-sm text-[#6639ba]"
      >
        <Check className="size-4" />
        Approved and merged. You&apos;re on the waitlist.
      </motion.p>
    );
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={submit} noValidate className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Work email
        </label>
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={isError}
          aria-describedby={errorId}
          className={cn(
            "min-w-0 flex-1 rounded-md border bg-pr-canvas px-3 py-2 font-jet text-sm outline-none transition focus:bg-white focus:ring-3",
            isError ? "border-pr-del focus:ring-pr-del/20" : "border-pr-line focus:border-pr-link focus:ring-pr-link/25",
          )}
        />
        <button type="submit" disabled={isLoading} className={greenButton}>
          {isLoading ? "Approving…" : "Approve & join waitlist"}
        </button>
      </form>
      <p id={errorId} aria-live="polite" className="mt-2 min-h-5 text-sm text-pr-del">
        {isError ? error : ""}
      </p>
    </div>
  );
}
