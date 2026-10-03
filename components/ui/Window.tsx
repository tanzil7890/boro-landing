import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type WindowProps = {
  title?: ReactNode;
  right?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

/** App-window chrome used for product mockups. */
export function Window({ title, right, className, bodyClassName, children }: WindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0b0b10]/90 shadow-2xl shadow-black/60 backdrop-blur",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-line px-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/10" />
          ))}
        </div>
        {title && <div className="truncate font-mono text-xs text-muted">{title}</div>}
        {right && <div className="ml-auto flex items-center">{right}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
