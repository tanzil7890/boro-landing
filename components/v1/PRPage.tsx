"use client";

import { Check, CircleDot } from "lucide-react";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChecksPanel } from "./ChecksPanel";
import { PartnerLink } from "./DesignPartner";
import { Conversation } from "./Conversation";
import { ForYou } from "./ForYou";
import { HeroDiff } from "./HeroDiff";
import { PRHeader, WRAP } from "./PRHeader";
import { Identicon, Label } from "./primitives";
import { ProblemDiff } from "./ProblemDiff";
import { ReviewBox } from "./ReviewBox";
import { Timeline } from "./Timeline";

/** Direction 1: the landing page is a pull request. Joining the waitlist merges it. */
export function PRPage() {
  const [mergedEmail, setMergedEmail] = useState<string | null>(null);
  const merged = mergedEmail !== null;

  return (
    <>
      <PRHeader merged={merged} />
      <div className={cn(WRAP, "grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_232px]")}>
        <main className="min-w-0 space-y-24 sm:space-y-32">
          <div id="files" className="scroll-mt-20 space-y-6">
            <HeroDiff merged={merged} onMerged={setMergedEmail} />
            <ProblemDiff />
          </div>
          <Timeline />
          <ChecksPanel />
          <ForYou />
          <Conversation />
          <ReviewBox mergedEmail={mergedEmail} onMerged={setMergedEmail} />
        </main>
        <Sidebar merged={merged} />
      </div>
      <footer className="border-t border-pr-line bg-pr-canvas">
        <div className={cn(WRAP, "flex flex-wrap items-center gap-x-4 gap-y-2 py-8 text-xs text-pr-muted")}>
          <LogoMark className="size-5" />
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a href={site.url} className="hover:text-pr-link">
            {site.domain}
          </a>
          <PartnerLink placement="footer" className="text-xs" />
          <span className="ml-auto font-jet">This page is a pull request. Merge it.</span>
        </div>
      </footer>
    </>
  );
}

function Sidebar({ merged }: { merged: boolean }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[76px] divide-y divide-pr-line text-sm">
        <Block title="Reviewers">
          <div className="flex items-center gap-2">
            <Identicon name="you" size={20} />
            <span className="font-semibold">you</span>
            {merged ? (
              <Check className="ml-auto size-4 text-pr-add" />
            ) : (
              <span className="ml-auto size-2 rounded-full bg-[#bf8700]" />
            )}
          </div>
          <p className="mt-1 text-xs text-pr-muted">{merged ? "Approved these changes" : "Awaiting your review"}</p>
        </Block>
        <Block title="Assignees">
          <div className="flex items-center gap-2">
            <LogoMark className="size-5" />
            <span className="font-semibold">boro-bot</span>
          </div>
        </Block>
        <Block title="Labels">
          <div className="flex flex-wrap gap-1">
            <Label tone="red">silent-drift</Label>
            <Label tone="blue">workflow:refunds</Label>
            <Label tone="amber">api:stripe</Label>
            <Label tone="purple">automated</Label>
            <Label tone="green">tests-passing</Label>
          </div>
        </Block>
        <Block title="Milestone">
          <div className="h-2 overflow-hidden rounded-full bg-pr-line">
            <div className="h-full w-[72%] rounded-full bg-pr-btn" />
          </div>
          <p className="mt-1.5 font-semibold">Private beta</p>
        </Block>
        <Block title="Design partners">
          <p className="text-xs text-pr-muted">Run a platform team? Shape Boro with us before launch.</p>
          <PartnerLink placement="sidebar" className="mt-1.5 text-sm">
            Book a call
          </PartnerLink>
        </Block>
        <Block title="Development">
          <p className="flex items-start gap-1.5">
            <CircleDot className="mt-0.5 size-4 shrink-0 text-pr-merged" />
            <span>
              Fixes <span className="font-semibold">Refunds test failing after Stripe webhook order changed</span>{" "}
              <span className="text-pr-muted">#213</span>
            </span>
          </p>
        </Block>
      </div>
    </aside>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="py-4 first:pt-0">
      <h3 className="mb-2 text-xs font-semibold text-pr-muted">{title}</h3>
      {children}
    </div>
  );
}
