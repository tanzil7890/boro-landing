"use client";

import { GitMerge } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { useWaitlist } from "@/lib/useWaitlist";
import { cn, EASE_OUT } from "@/lib/utils";
import { finalCta } from "@/lib/content";
import { review } from "./content";
import { PartnerLink } from "./DesignPartner";
import { greenButton } from "./primitives";

const OPTIONS = [
  { value: "comment", label: "Comment", description: "Submit general feedback without explicit approval.", disabled: true },
  { value: "approve", label: "Approve", description: "Join the waitlist for early access to Boro." },
  { value: "changes", label: "Request changes", description: "Unavailable: all checks are passing.", disabled: true },
];

/** The CTA: GitHub's "Finish your review" box. Submitting merges the PR. */
export function ReviewBox({
  mergedEmail,
  onMerged,
}: {
  mergedEmail: string | null;
  onMerged: (email: string) => void;
}) {
  const { email, setEmail, submit, error, isError, isLoading } = useWaitlist({ onSuccess: onMerged });
  const inputId = useId();
  const errorId = useId();

  return (
    <section id="review" className="scroll-mt-20">
      <AnimatePresence mode="wait" initial={false}>
        {mergedEmail ? (
          <motion.div
            key="merged"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex gap-4 rounded-lg border border-pr-merged/40 bg-[#fbefff] p-5 sm:p-8"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-pr-merged text-white">
              <GitMerge className="size-6" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] [font-stretch:112%] sm:text-4xl">
                Pull request successfully merged.
              </h2>
              <p className="mt-2 text-pr-muted sm:text-lg">
                You&apos;re on the waitlist. We&apos;ll email <b className="text-pr-ink">{mergedEmail}</b> when early
                access opens.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={submit}
            noValidate
            className="rounded-lg border border-pr-line"
          >
            <div className="rounded-t-lg border-b border-pr-line bg-pr-canvas px-4 py-3 text-sm font-semibold">
              Finish your review
            </div>
            <div className="p-4 sm:p-8">
              <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.02] tracking-[-0.04em] [font-stretch:115%] sm:text-5xl">
                {review.title}
              </h2>
              <p className="mt-3 text-lg text-pr-muted">{review.description}</p>

              <label htmlFor={inputId} className="mt-8 block text-sm font-semibold">
                Leave a comment <span className="font-normal text-pr-muted">(your work email)</span>
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
                  "mt-2 w-full rounded-md border bg-pr-canvas px-3 py-2.5 font-jet text-sm outline-none transition focus:bg-white focus:ring-3",
                  isError ? "border-pr-del focus:ring-pr-del/20" : "border-pr-line focus:border-pr-link focus:ring-pr-link/25",
                )}
              />
              <p id={errorId} aria-live="polite" className="mt-2 min-h-5 text-sm text-pr-del">
                {isError ? error : ""}
              </p>

              <fieldset className="mt-4 space-y-3">
                <legend className="sr-only">Review type</legend>
                {OPTIONS.map((o) => (
                  <label
                    key={o.value}
                    className={cn("flex gap-3", o.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}
                  >
                    <input
                      type="radio"
                      name="review"
                      value={o.value}
                      defaultChecked={o.value === "approve"}
                      disabled={o.disabled}
                      className="mt-1 accent-pr-btn"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{o.label}</span>
                      <span className="block text-sm text-pr-muted">{o.description}</span>
                    </span>
                  </label>
                ))}
              </fieldset>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-pr-muted">
                  {finalCta.partnerPrompt} <PartnerLink placement="review" />
                </p>
                <button type="submit" disabled={isLoading} className={cn(greenButton, "px-5 py-2 text-[15px]")}>
                  {isLoading ? "Submitting…" : "Submit review"}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
