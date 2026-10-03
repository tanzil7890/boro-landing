import { GridBackground } from "@/components/ui/Backgrounds";
import { Container } from "@/components/ui/Container";
import { DesignPartnerLink } from "@/components/ui/DesignPartner";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { finalCta } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="join" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white/2 px-6 py-20 text-center sm:px-16 sm:py-28">
            <GridBackground className="fade-center" />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[360px] w-[640px] max-w-full -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-violet/25 blur-[100px]"
            />
            <div className="relative flex flex-col items-center">
              <LogoMark className="size-14 rounded-[13px] shadow-[0_0_48px_rgb(124_92_255/0.55)]" />
              <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-6xl">
                {finalCta.titleLead}
                <br />
                <span className="text-gradient">{finalCta.titleAccent}</span>
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-muted sm:text-lg">{finalCta.description}</p>
              <WaitlistForm className="mt-10" hint={finalCta.note} shimmer />
              <p className="mt-2 text-sm text-muted">
                {finalCta.partnerPrompt} <DesignPartnerLink placement="final-cta" />
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
