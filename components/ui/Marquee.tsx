import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Time for one full loop, e.g. "40s". */
  duration?: string;
};

/** Infinite horizontal scroller. Children are rendered twice so the loop is seamless. */
export function Marquee({ children, className, duration = "40s" }: MarqueeProps) {
  return (
    <div className={cn("group fade-x flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-14 pr-14">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-14 pr-14">
          {children}
        </div>
      </div>
    </div>
  );
}
