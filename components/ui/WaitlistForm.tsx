"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { useWaitlist } from "@/lib/useWaitlist";
import { cn, EASE_OUT } from "@/lib/utils";
import { Button } from "./Button";

type WaitlistFormProps = {
  className?: string;
  hint?: string;
  shimmer?: boolean;
};

export function WaitlistForm({ className, hint, shimmer }: WaitlistFormProps) {
  const { email, setEmail, status, error, submit, isError } = useWaitlist();
  const inputId = useId();
  const messageId = useId();

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="flex h-[52px] items-center justify-center gap-3 rounded-full border border-add/30 bg-add/10 px-5 text-sm text-fg"
            role="status"
          >
            <AnimatedCheck />
            You&apos;re on the list. We&apos;ll be in touch soon.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            onSubmit={submit}
            noValidate
            className={cn(
              "flex items-center gap-2 rounded-full border bg-white/3 p-1.5 pl-5 backdrop-blur transition-[border-color,box-shadow] duration-300",
              isError
                ? "border-del/50"
                : "border-white/10 focus-within:border-violet/50 focus-within:shadow-[0_0_0_4px_rgb(124_92_255/0.12)]",
            )}
          >
            <label htmlFor={inputId} className="sr-only">
              Work email
            </label>
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={isError}
              aria-describedby={messageId}
              className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
            />
            <Button type="submit" size="sm" shimmer={shimmer} disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Joining
                </>
              ) : (
                <>
                  Join waitlist
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
      <p
        id={messageId}
        aria-live="polite"
        className={cn("mt-3 min-h-5 px-5 text-xs", isError ? "text-del" : "text-subtle")}
      >
        {isError ? error : status === "success" ? "" : hint}
      </p>
    </div>
  );
}

function AnimatedCheck() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-add" aria-hidden>
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
      <motion.path
        d="M7.5 12.5l3 3 6-6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.35, ease: EASE_OUT }}
      />
    </svg>
  );
}
