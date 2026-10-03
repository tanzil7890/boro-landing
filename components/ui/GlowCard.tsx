"use client";

import { useRef, type ComponentProps, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Card whose border and background light up under the cursor (see .glow-card in globals.css). */
export function GlowCard({ className, children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      {...props}
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "glow-card relative overflow-hidden rounded-2xl border border-line bg-white/2",
        className,
      )}
    >
      {children}
    </div>
  );
}
