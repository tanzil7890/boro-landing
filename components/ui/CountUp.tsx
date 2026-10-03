"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "@/lib/utils";

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

const format = new Intl.NumberFormat("en-US");

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduce) {
      el.textContent = `${format.format(to)}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = `${format.format(Math.round(v))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{`${format.format(to)}${suffix}`}</span>
      <span aria-hidden ref={ref} className="tabular-nums">{`0${suffix}`}</span>
    </span>
  );
}
