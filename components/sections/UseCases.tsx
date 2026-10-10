import { CalendarClock, KeyRound, Siren, Waves } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCases, vendors } from "@/lib/content";

const icons = { sunset: CalendarClock, drift: Waves, expiry: KeyRound, incident: Siren };

export function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={useCases.eyebrow}
          title={useCases.title}
          description={useCases.description}
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {vendors.categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line bg-white/3 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
            >
              {c}
            </span>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 *:min-w-0">
          {useCases.items.map((item, i) => {
            const Icon = icons[item.id as keyof typeof icons];
            return (
              <Reveal key={item.id} delay={(i % 2) * 0.08}>
                <GlowCard className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg border border-line bg-white/3">
                      <Icon className="size-4 text-fg/80" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.label}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-fg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  <div className="mt-auto pt-6">
                    <div className="truncate rounded-lg border border-line bg-black/30 p-3 font-mono text-[11px] text-fg/80">
                      {item.example}
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
