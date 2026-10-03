"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { pr, tabs } from "./content";
import { PartnerButton } from "./DesignPartner";
import { Branch, greenButton, StatusPill } from "./primitives";

export const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6";

const TAB_IDS = tabs.map((t) => t.id);

/** Highlights the tab whose section is in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function PRHeader({ merged }: { merged: boolean }) {
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 200));
  const active = useActiveSection(TAB_IDS);

  return (
    <>
      <div className="border-b border-pr-line bg-pr-canvas">
        <div className={cn(WRAP, "flex h-14 items-center gap-3")}>
          <a href="#top" aria-label="Boro home" className="rounded-md">
            <LogoMark className="size-7" />
          </a>
          <span className="truncate font-jet text-sm">
            <span className="text-pr-muted">{pr.owner}</span>
            <span className="px-1 text-pr-muted">/</span>
            <span className="font-semibold">{pr.repo}</span>
          </span>
          <span className="hidden rounded-full border border-pr-line px-2 py-px text-xs text-pr-muted sm:inline">
            Public
          </span>
          <a href={site.url} className="ml-auto shrink-0 font-jet text-xs text-pr-muted hover:text-pr-link">
            {site.domain}
          </a>
        </div>
      </div>

      <div id="top" className={cn(WRAP, "pt-8")}>
        <p className="text-balance text-[1.75rem] font-normal leading-tight tracking-[-0.02em] sm:text-[2rem]">
          {pr.title} <span className="font-light text-pr-muted">#{pr.number}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-pr-muted">
          <StatusPill merged={merged} />
          <span>
            <span className="font-semibold text-pr-ink">boro-bot</span> {merged ? "merged" : "wants to merge"} 1
            commit into <Branch>{pr.base}</Branch> from <Branch>{pr.head}</Branch>
          </span>
        </div>
      </div>

      <div className="sticky top-0 z-30 mt-6 border-b border-pr-line bg-pr-bg/90 backdrop-blur">
        <div className={cn(WRAP, "flex h-[52px] items-end gap-4")}>
          <AnimatePresence>
            {compact && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="hidden items-center gap-2 self-center xl:flex"
              >
                <StatusPill merged={merged} size="sm" />
                <span className="max-w-64 truncate text-sm font-semibold">
                  {pr.title} <span className="font-normal text-pr-muted">#{pr.number}</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <nav aria-label="Sections" className="-mb-px flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-t-md px-3 pb-3 pt-2 text-sm transition-colors hover:text-pr-ink",
                  active === tab.id ? "font-semibold text-pr-ink" : "text-pr-muted",
                )}
              >
                {tab.label}
                <span className="rounded-full bg-[#818b981f] px-1.5 py-px font-jet text-[11px] font-medium">
                  {tab.count}
                </span>
                {active === tab.id && (
                  <motion.span
                    layoutId="pr-tab"
                    className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-[#fd8c73]"
                  />
                )}
              </a>
            ))}
          </nav>

          <PartnerButton placement="header" className="mb-2 hidden lg:inline-flex" />
          <a href="#review" className={cn(greenButton, "mb-2 hidden sm:inline-flex", merged && "bg-pr-merged hover:bg-pr-merged")}>
            {merged ? "Merged ✓" : "Approve & join"}
          </a>
        </div>
      </div>
    </>
  );
}
