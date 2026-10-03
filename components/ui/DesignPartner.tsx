"use client";

import { getCalApi } from "@calcom/embed-react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { designPartner } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

type CalLook = { theme?: "dark" | "light"; brand?: string };

// One Cal.com namespace per look (theme + brand color), each loaded and themed once.
const namespaces = new Map<string, Promise<boolean>>();
function loadCal(namespace: string, theme: "dark" | "light", brand: string) {
  let ready = namespaces.get(namespace);
  if (!ready) {
    ready = getCalApi({ namespace })
      .then((cal) => {
        cal("ui", {
          theme,
          cssVarsPerTheme: { light: { "cal-brand": brand }, dark: { "cal-brand": brand } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        return true;
      })
      .catch(() => false);
    namespaces.set(namespace, ready);
  }
  return ready;
}

/**
 * Props that make any anchor open the design-partner booking popup.
 * It's a real link to the booking page, so if the Cal.com script can't load
 * it still opens the page in a new tab. `placement` is sent as utm_campaign.
 */
export function useDesignPartnerLink(placement: string, { theme = "dark", brand = "#7c5cff" }: CalLook = {}) {
  const namespace = `design-partner-${theme}-${brand.replace("#", "")}`;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadCal(namespace, theme, brand).then((ok) => active && setReady(ok));
    return () => {
      active = false;
    };
  }, [namespace, theme, brand]);

  return {
    href: designPartner.url,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-haspopup": "dialog" as const,
    "data-cal-namespace": namespace,
    "data-cal-link": designPartner.calLink,
    "data-cal-config": JSON.stringify({
      layout: "month_view",
      theme,
      utm_source: "hey-boro.com",
      utm_medium: "website",
      utm_campaign: placement,
    }),
    // Cal.com opens its popup from a document-level click listener but doesn't cancel the link itself.
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      if (ready) e.preventDefault();
    },
  };
}

type ButtonProps = {
  placement: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

/** "Become a design partner" as a button (main site style). */
export function DesignPartnerButton({ placement, variant = "ghost", size = "md", className, children, onClick }: ButtonProps) {
  const { onClick: openCal, ...link } = useDesignPartnerLink(placement);
  return (
    <Button
      {...link}
      variant={variant}
      size={size}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        openCal(e);
        onClick?.();
      }}
    >
      {children ?? designPartner.label}
    </Button>
  );
}

/** "Become a design partner →" as an inline text link (main site style). */
export function DesignPartnerLink({
  placement,
  className,
  children,
}: { placement: string } & Pick<ComponentProps<"a">, "className" | "children">) {
  const link = useDesignPartnerLink(placement);
  return (
    <a
      {...link}
      className={cn(
        "group/dp inline-flex items-center gap-1 font-medium text-fg underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-violet",
        className,
      )}
    >
      {children ?? designPartner.label}
      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover/dp:translate-x-0.5" />
    </a>
  );
}
