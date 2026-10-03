"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** A hairline rule that draws outward from its center when it scrolls into view. */
export function Rule({ double, className, delay = 0 }: { double?: boolean; className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: EXPO }}
      className={cn(double ? "h-[5px] border-y border-paper-ink" : "h-px bg-paper-ink", className)}
    />
  );
}

/** Headline whose lines rise into view through a mask, one after another. */
export function LineReveal({ lines, className, delay = 0.15 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: delay + i * 0.12, ease: EXPO }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A rubber stamp that thumps onto the page. `play` defaults to when it scrolls into view. */
export function Stamp({
  children,
  className,
  play = "inView",
}: {
  children: ReactNode;
  className?: string;
  play?: "inView" | "mount";
}) {
  const target = { opacity: 1, scale: 1, rotate: -12 };
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 2.4, rotate: -28 }}
      {...(play === "mount" ? { animate: target } : { whileInView: target, viewport: { once: true, margin: "0px 0px -20% 0px" } })}
      transition={{ type: "spring", stiffness: 380, damping: 17, mass: 0.9, delay: play === "mount" ? 0.15 : 0.45 }}
      className={cn(
        "stamp-ink pointer-events-none select-none border-[3px] border-paper-accent p-1 font-plex text-lg font-medium uppercase tracking-[0.22em] text-paper-accent",
        className,
      )}
    >
      <div className="border border-paper-accent px-4 py-1.5 text-center">{children}</div>
    </motion.div>
  );
}

/** Fine-line SVG illustration whose strokes draw in sequence on scroll. */
export function Drawing({ paths, dots = [], className }: { paths: string[]; dots?: [number, number][]; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 140 110"
      fill="none"
      aria-hidden
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      className={cn("h-28 w-auto text-paper-ink", className)}
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, shown: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 0.9, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
      {dots.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={5}
          className="fill-paper stroke-paper-accent"
          strokeWidth={1.6}
          variants={{ hidden: { scale: 0 }, shown: { scale: 1 } }}
          transition={{ delay: 0.6 + i * 0.2, type: "spring", stiffness: 400, damping: 15 }}
        />
      ))}
    </motion.svg>
  );
}
