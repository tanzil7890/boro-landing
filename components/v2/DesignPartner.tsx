"use client";

import type { ReactNode } from "react";
import { useDesignPartnerLink } from "@/components/ui/DesignPartner";
import { designPartner } from "@/lib/content";
import { cn } from "@/lib/utils";

// Dark popup with terminal green, to match the break page.
const LOOK = { theme: "dark", brand: "#30d158" } as const;

type Props = { placement: string; className?: string; children?: ReactNode };

/** A runnable-looking terminal command: `$ boro partner --book-call ↵`. */
export function PartnerCommand({ placement, className, children }: Props) {
  const link = useDesignPartnerLink(`break-${placement}`, LOOK);
  return (
    <a
      {...link}
      className={cn(
        "group inline-flex items-center gap-2 rounded-md border border-brk-green/40 bg-brk-green/10 px-4 py-2.5 font-jet text-[13px] text-brk-ink transition-colors hover:border-brk-green hover:bg-brk-green/15",
        className,
      )}
    >
      <span className="text-brk-green">$</span>
      {children ?? "boro partner --book-call"}
      <span className="text-brk-dim transition-colors group-hover:text-brk-green">↵</span>
    </a>
  );
}

export function PartnerLink({ placement, className, children }: Props) {
  const link = useDesignPartnerLink(`break-${placement}`, LOOK);
  return (
    <a
      {...link}
      className={cn(
        "text-brk-green underline decoration-brk-green/40 underline-offset-4 transition-colors hover:decoration-brk-green",
        className,
      )}
    >
      {children ?? `${designPartner.label.toLowerCase()} →`}
    </a>
  );
}
