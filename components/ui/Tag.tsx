import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "del" | "warn" | "add" | "violet" | "neutral";

const tones: Record<Tone, string> = {
  del: "border-del/30 bg-del/10 text-del",
  warn: "border-warn/30 bg-warn/10 text-warn",
  add: "border-add/30 bg-add/10 text-add",
  violet: "border-violet/30 bg-violet/10 text-[#b9a8ff]",
  neutral: "border-line bg-white/4 text-muted",
};

export function Tag({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
