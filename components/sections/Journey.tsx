import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={journey.eyebrow} title={journey.title} description={journey.description} />

        <div className="relative mt-16 grid gap-4 lg:grid-cols-3">
          {journey.stages.map((stage, i) => (
            <Reveal key={stage.label} delay={i * 0.1}>
              <GlowCard className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full border font-mono text-[11px]",
                      i === journey.stages.length - 1
                        ? "border-violet/50 bg-violet/10 text-fg"
                        : "border-line text-muted",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{stage.label}</span>
                </div>
                <ol className="mt-6 flex flex-col gap-3">
                  {stage.steps.map((step) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-fg/40" />
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="mt-auto pt-6">
                  <p className="border-t border-line pt-5 text-[15px] font-medium tracking-tight">
                    <span className="text-gradient">“{stage.feeling}”</span>
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-subtle">
          Illustrative timeline of the intended experience, not a customer quote.
        </p>
      </Container>
    </section>
  );
}
