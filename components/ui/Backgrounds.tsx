import { cn } from "@/lib/utils";

/** Faint 64px grid. Pair with a fade-* utility to mask the edges. */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-grid fade-top", className)}
    />
  );
}

/** Slowly drifting violet/cyan glow blobs. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute left-1/2 top-[-18%] h-[520px] w-[820px] -translate-x-1/2 animate-aurora rounded-full bg-violet/25 blur-[120px]" />
      <div className="absolute left-[62%] top-[2%] h-[380px] w-[520px] -translate-x-1/2 animate-aurora rounded-full bg-cyan/15 blur-[120px] [animation-delay:-8s]" />
    </div>
  );
}
