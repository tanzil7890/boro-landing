"use client";

import { ArrowRight, Scissors } from "lucide-react";
import { motion } from "motion/react";
import { useId } from "react";
import { useWaitlist } from "@/lib/useWaitlist";
import { cn } from "@/lib/utils";
import { coupon, lead } from "./content";
import { Stamp } from "./Motion";

function useForm() {
  const waitlist = useWaitlist();
  return { ...waitlist, inputId: useId(), errorId: useId() };
}

const inkButton =
  "inline-flex shrink-0 items-center justify-center gap-2 bg-paper-ink px-5 py-3 font-plex text-[13px] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-paper-accent disabled:opacity-60";

/** Inline "subscribe" row under the headline. */
export function InlineForm() {
  const { email, setEmail, submit, error, isError, isLoading, isSuccess, inputId, errorId } = useForm();

  if (isSuccess) {
    return (
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif text-2xl italic">
        Thank you. Your invite is on its way <span className="text-paper-accent">(eventually)</span>.
      </motion.p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={inputId} className="font-plex text-[11px] uppercase tracking-[0.18em] text-paper-muted">
        {lead.formLabel}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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
            "min-w-0 flex-1 border-b bg-transparent py-3 text-lg outline-none placeholder:text-paper-muted/60",
            isError ? "border-paper-accent" : "border-paper-ink focus:border-paper-accent",
          )}
        />
        <button type="submit" disabled={isLoading} className={inkButton}>
          {isLoading ? "Sending…" : "Join"}
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p id={errorId} aria-live="polite" className="mt-2 min-h-5 text-sm text-paper-accent">
        {isError ? error : <span className="text-paper-muted">{lead.note}</span>}
      </p>
    </form>
  );
}

/** Clip-out coupon CTA. Hovering sends the scissors along the dashed edge. */
export function Coupon() {
  const { email, setEmail, submit, error, isError, isLoading, isSuccess, inputId, errorId } = useForm();

  return (
    <div className="group relative mx-auto max-w-3xl border-2 border-dashed border-paper-ink bg-[#f8f5ee] px-6 py-12 text-center sm:px-14 sm:py-16">
      <Scissors
        aria-hidden
        className="absolute -top-3.5 left-6 size-6 -rotate-90 bg-paper px-0.5 text-paper-ink transition-[left] duration-[1800ms] ease-in-out group-hover:left-[calc(100%-3rem)]"
      />
      <p className="font-plex text-[11px] uppercase tracking-[0.22em] text-paper-accent">{coupon.kicker}</p>
      <h2 className="mt-5 text-balance font-serif text-5xl leading-[0.95] tracking-[-0.02em] sm:text-7xl">
        {coupon.title} <em className="text-paper-accent">{coupon.titleAccent}</em>
      </h2>

      {isSuccess ? (
        <div className="relative mt-10 flex flex-col items-center">
          <p className="font-serif text-2xl italic">You&apos;re on the list. We&apos;ll write when your invite is ready.</p>
          <Stamp play="mount" className="absolute -bottom-28 right-0 text-xl sm:-right-10">
            Accepted
          </Stamp>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-lg text-left">
          <label htmlFor={inputId} className="sr-only">
            Work email
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
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
                "min-w-0 flex-1 border-b bg-transparent py-3 text-lg outline-none placeholder:text-paper-muted/60",
                isError ? "border-paper-accent" : "border-paper-ink focus:border-paper-accent",
              )}
            />
            <button type="submit" disabled={isLoading} className={inkButton}>
              {isLoading ? "Sending…" : "Redeem"}
              <ArrowRight className="size-4" />
            </button>
          </div>
          <p id={errorId} aria-live="polite" className="mt-2 min-h-5 text-sm text-paper-accent">
            {isError ? error : ""}
          </p>
        </form>
      )}

      <p className="mx-auto mt-8 max-w-md font-plex text-[10px] uppercase leading-relaxed tracking-[0.14em] text-paper-muted">
        {coupon.finePrint}
      </p>
    </div>
  );
}
