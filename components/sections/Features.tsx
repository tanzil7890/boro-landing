import {
  ArrowRight,
  Bell,
  Braces,
  CircleCheck,
  CircleX,
  FlaskConical,
  Layers,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { features, vendors } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = {
  vendors: Layers,
  sources: ScrollText,
  language: Braces,
  control: ShieldCheck,
  tested: FlaskConical,
  adoption: Sparkles,
  notify: Bell,
};

const wide = new Set(["vendors", "control"]);

const mono = "rounded-lg border border-line bg-black/30 font-mono text-[11px]";

const visuals: Record<string, ReactNode> = {
  vendors: (
    <div className="flex flex-wrap gap-2">
      {vendors.names.slice(0, 9).map((name, i) => (
        <span
          key={name}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/3 px-3 py-1.5 text-xs text-fg/80"
        >
          <span
            className="size-1.5 animate-pulse rounded-full bg-add"
            style={{ animationDelay: `${i * 180}ms` }}
          />
          {name}
        </span>
      ))}
    </div>
  ),
  sources: (
    <div className={cn(mono, "flex flex-col gap-1.5 p-3 text-muted")}>
      <span>CHANGELOG.md</span>
      <span>openapi.yaml</span>
      <span>stripe-node@18.0.0</span>
      <span className="text-warn">Deprecation: true</span>
    </div>
  ),
  language: (
    <div className={cn(mono, "flex flex-wrap items-center gap-1.5 p-3 text-fg/80")}>
      <span>checkout()</span>
      <ArrowRight className="size-3 text-subtle" />
      <span>stripe.charges</span>
      <ArrowRight className="size-3 text-subtle" />
      <span className="text-warn">create()</span>
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
  tested: (
    <div className={cn(mono, "flex flex-col gap-1.5 p-3")}>
      {["Build", "Unit tests", "Lint"].map((check) => (
        <span key={check} className="flex items-center gap-2 text-fg/80">
          <CircleCheck className="size-3.5 text-add" />
          {check}
        </span>
      ))}
    </div>
  ),
  adoption: (
    <div className={cn(mono, "flex items-center gap-2 p-3")}>
      <Tag tone="add">New feature</Tag>
      <span className="truncate text-fg/80">PR #131 · Adopt tax.calculations</span>
    </div>
  ),
  notify: (
    <div className={cn(mono, "p-3")}>
      <div className="text-subtle">#eng-platform</div>
      <div className="mt-1 text-fg/85">
        <span className="text-[#b9a8ff]">boro</span>: PR #128 is ready for review
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
