import { CalendarClock, KeyRound, Waves } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { problem } from "@/lib/content";

const icons = { announced: CalendarClock, silent: Waves, expiring: KeyRound };

const visuals: Record<string, ReactNode> = {
  announced: (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-black/30 p-3 font-mono text-[11px]">
      <span className="truncate text-fg/80">shopify · API 2025-07 sunset</span>
      <Tag tone="warn" className="ml-auto">
        in 21 days
      </Tag>
    </div>
  ),
  silent: (
    <div className="rounded-lg border border-line bg-black/30 p-3 font-mono text-[11px]">
      <div className="flex items-center gap-2 text-del">
        <span className="size-1.5 animate-pulse rounded-full bg-del" />
        refund.updated before charge.refunded
      </div>
      <div className="mt-1 text-muted">no changelog entry</div>
    </div>
  ),
  expiring: (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-black/30 p-3 font-mono text-[11px]">
      <span className="truncate text-muted">twilio · 429 Too Many Requests</span>
      <Tag tone="del" className="ml-auto">
        ×40
      </Tag>
    </div>
  ),
};

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          description={problem.description}
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {problem.cards.map((card, i) => {
            const Icon = icons[card.id as keyof typeof icons];
            return (
              <Reveal key={card.id} delay={i * 0.08}>
                <GlowCard className="flex h-full flex-col p-6">
                  <div className="grid size-9 place-items-center rounded-lg border border-line bg-white/3">
                    <Icon className="size-4 text-fg/80" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-fg">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
                  <div className="mt-auto pt-6">{visuals[card.id]}</div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-4 grid divide-y divide-line rounded-2xl border border-line bg-white/2 md:grid-cols-3 md:divide-x md:divide-y-0">
          {problem.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="p-8">
              <CountUp
                to={stat.value}
                suffix={stat.suffix}
                className="text-gradient text-5xl font-semibold tracking-tight sm:text-6xl"
              />
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
