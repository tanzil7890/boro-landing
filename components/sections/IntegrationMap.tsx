"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag, type Tone } from "@/components/ui/Tag";
import { Window } from "@/components/ui/Window";
import { integrationMap } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";

const STATUS: Record<string, { label: string; tone: Tone; dot: string }> = {
  healthy: { label: "Healthy", tone: "add", dot: "bg-add" },
  warning: { label: "Deadline", tone: "warn", dot: "bg-warn" },
  failing: { label: "Failing", tone: "del", dot: "bg-del" },
};

export function IntegrationMap() {
  const { workflows } = integrationMap;
  const counts = {
    healthy: workflows.filter((w) => w.status === "healthy").length,
    attention: workflows.filter((w) => w.status !== "healthy").length,
  };

  return (
    <section id="map" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={integrationMap.eyebrow}
          title={integrationMap.title}
          description={integrationMap.description}
        />

        <Reveal className="mx-auto mt-16 max-w-5xl">
          <Window
            title="boro · integration health · acme"
            right={
              <span className="font-mono text-[11px] text-muted">
                <span className="text-add">{counts.healthy} healthy</span> ·{" "}
                <span className="text-warn">{counts.attention} need attention</span>
              </span>
            }
          >
            <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,1.8fr)_80px] gap-4 border-b border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle md:grid">
              <span>Workflow</span>
              <span>Providers</span>
              <span>Call sites</span>
              <span>Latest</span>
              <span className="text-right">Status</span>
            </div>
            <div className="divide-y divide-line">
              {workflows.map((w, i) => {
                const status = STATUS[w.status];
                return (
                  <motion.div
                    key={w.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE_OUT }}
                    className={cn(
                      "grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 px-5 py-4 transition-colors hover:bg-white/2 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,1.8fr)_80px]",
                      w.status === "failing" && "bg-del/4",
                    )}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium text-fg">
                      <span className="relative flex size-2">
                        {w.status !== "healthy" && (
                          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", status.dot)} />
                        )}
                        <span className={cn("relative size-2 rounded-full", status.dot)} />
                      </span>
                      {w.name}
                    </span>
                    <span className="order-last col-span-2 flex flex-wrap gap-1.5 md:order-none md:col-span-1">
                      {w.providers.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-line bg-white/3 px-2 py-0.5 text-[11px] text-fg/80"
                        >
                          {p}
                        </span>
                      ))}
                    </span>
                    <span className="hidden font-mono text-[12px] text-muted md:block">{w.callSites}</span>
                    <span className="order-last col-span-2 truncate text-[13px] text-muted md:order-none md:col-span-1">
                      {w.note}
                    </span>
                    <Tag tone={status.tone} className="justify-self-end">
                      {status.label}
                    </Tag>
                  </motion.div>
                );
              })}
            </div>
          </Window>
        </Reveal>
      </Container>
    </section>
  );
}
