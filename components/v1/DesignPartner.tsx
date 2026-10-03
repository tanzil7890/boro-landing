"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useDesignPartnerLink } from "@/components/ui/DesignPartner";
import { designPartner } from "@/lib/content";
import { cn } from "@/lib/utils";
import { greenButton } from "./primitives";

// Light popup with GitHub green, to match the PR page.
const LOOK = { theme: "light", brand: "#1f883d" } as const;

const grayButton =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[#d1d9e0] bg-pr-canvas px-3.5 py-1.5 text-sm font-semibold text-pr-ink transition-colors hover:bg-[#eff2f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pr-link";

type Props = { placement: string; className?: string; children?: ReactNode; primary?: boolean };

/** GitHub-style button: gray by default, green when it's the main action. */
export function PartnerButton({ placement, className, children, primary }: Props) {
  const link = useDesignPartnerLink(`pr-${placement}`, LOOK);
  return (
    <a {...link} className={cn(primary ? greenButton : grayButton, className)}>
      {children ?? designPartner.label}
    </a>
  );
}

export function PartnerLink({ placement, className, children }: Props) {
  const link = useDesignPartnerLink(`pr-${placement}`, LOOK);
  return (
    <a {...link} className={cn("inline-flex items-center gap-1 font-medium text-pr-link hover:underline", className)}>
      {children ?? designPartner.label}
      <ArrowRight aria-hidden className="size-3.5" />
    </a>
  );
}
