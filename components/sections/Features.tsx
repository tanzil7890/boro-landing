import {
  Bell,
  BellRing,
  CircleCheck,
  CircleX,
  FlaskConical,
  GitPullRequest,
  LayoutDashboard,
  Network,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { features } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = {
  map: Network,
  alerts: BellRing,
  tests: FlaskConical,
  control: ShieldCheck,
  evidence: GitPullRequest,
  health: LayoutDashboard,
  notify: Bell,
};

const wide = new Set(["map", "control"]);

const mono = "rounded-lg border border-line bg-black/30 font-mono text-[11px]";

const MAP_ROWS = [
  { provider: "Stripe", workflow: "Checkout", sites: 14 },
  { provider: "Stripe", workflow: "Refunds", sites: 6 },
  { provider: "Auth0", workflow: "Sign-up & login", sites: 9 },
  { provider: "OpenAI", workflow: "AI assistant", sites: 5 },
];

const visuals: Record<string, ReactNode> = {
  map: (
    <div className="grid gap-2 sm:grid-cols-2">
      {MAP_ROWS.map((r, i) => (
        <div
          key={r.workflow}
          className="flex items-center gap-2 rounded-lg border border-line bg-white/2 px-3 py-2.5 text-xs"
        >
          <span
            className="size-1.5 animate-pulse rounded-full bg-add"
            style={{ animationDelay: `${i * 180}ms` }}
          />
          <span className="text-fg/85">{r.provider}</span>
          <span className="text-subtle">→</span>
          <span className="truncate text-[#b9a8ff]">{r.workflow}</span>
          <span className="ml-auto font-mono text-[11px] text-subtle">{r.sites}</span>
        </div>
      ))}
    </div>
  ),
  alerts: (
    <div className={cn(mono, "p-3")}>
      <div className="flex items-center gap-2">
        <Tag tone="warn">Mar 31</Tag>
        <span className="truncate text-fg/80">stripe · hits Refunds</span>
      </div>
    </div>
  ),
  tests: (
    <div className={cn(mono, "flex flex-col gap-1.5 p-3")}>
      {["webhooks", "pagination", "rate limits"].map((check) => (
        <span key={check} className="flex items-center gap-2 text-fg/80">
          <CircleCheck className="size-3.5 text-add" />
          {check}
        </span>
      ))}
    </div>
  ),
  control: (
    <div className="grid gap-2 sm:grid-cols-2">
      {[
        { label: "Read repository contents", allowed: true },
        { label: "Open pull requests", allowed: true },
        { label: "Push to protected branches", allowed: false },
        { label: "Merge without review", allowed: false },
      ].map((p) => (
        <div
          key={p.label}
          className="flex items-center gap-2 rounded-lg border border-line bg-white/2 px-3 py-2.5 text-xs"
        >
          {p.allowed ? (
            <CircleCheck className="size-3.5 text-add" />
          ) : (
            <CircleX className="size-3.5 text-subtle" />
          )}
          <span className={p.allowed ? "text-fg/85" : "text-subtle line-through"}>{p.label}</span>
        </div>
      ))}
    </div>
  ),
  evidence: (
    <div className={cn(mono, "flex flex-wrap items-center gap-2 p-3")}>
      <Tag tone="del">before: 1 failing</Tag>
      <Tag tone="add">after: 6/6 passing</Tag>
    </div>
  ),
  health: (
    <div className={cn(mono, "flex items-center justify-between gap-2 p-3")}>
      <span className="text-add">4 healthy</span>
      <span className="text-warn">2 deadlines</span>
      <span className="text-del">1 failing</span>
    </div>
  ),
  notify: (
    <div className={cn(mono, "p-3")}>
      <div className="text-subtle">#eng-platform</div>
      <div className="mt-1 text-fg/85">
        <span className="text-[#b9a8ff]">boro</span>: Refunds test failed. Fix in PR #214
      </div>
    </div>
  ),
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {features.items.map((item, i) => {
            const Icon = icons[item.id as keyof typeof icons];
            return (
              <Reveal
                key={item.id}
                delay={(i % 3) * 0.08}
                className={cn(wide.has(item.id) && "md:col-span-2")}
              >
                <GlowCard className="flex h-full flex-col p-6 sm:p-7">
                  <div className="grid size-9 place-items-center rounded-lg border border-line bg-white/3">
                    <Icon className="size-4 text-fg/80" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-fg">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{item.description}</p>
                  <div className="mt-auto pt-6">{visuals[item.id]}</div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
