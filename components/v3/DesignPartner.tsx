"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useDesignPartnerLink } from "@/components/ui/DesignPartner";
import { designPartner } from "@/lib/content";
import { cn } from "@/lib/utils";

// Light popup with the signal orange, to match the paper page.
const LOOK = { theme: "light", brand: "#ff4f1f" } as const;

type Props = { placement: string; className?: string; children?: ReactNode };

/** Ink block button, like the page's other buttons. */
export function PartnerButton({ placement, className, children }: Props) {
  const link = useDesignPartnerLink(`editorial-${placement}`, LOOK);
  return (
    <a
      {...link}
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-paper-ink px-5 py-3 font-plex text-[13px] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-paper-accent",
        className,
      )}
    >
      {children ?? designPartner.label}
      <ArrowRight aria-hidden className="size-4" />
    </a>
  );
}

export function PartnerLink({ placement, className, children }: Props) {
  const link = useDesignPartnerLink(`editorial-${placement}`, LOOK);
  return (
    <a
      {...link}
      className={cn(
        "underline decoration-paper-accent decoration-2 underline-offset-4 transition-colors hover:text-paper-accent",
        className,
      )}
    >
      {children ?? designPartner.label}
    </a>
  );
}
