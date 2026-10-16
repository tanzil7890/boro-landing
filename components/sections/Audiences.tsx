"use client";

import { Check, CircleCheck, GitPullRequest } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DesignPartnerButton } from "@/components/ui/DesignPartner";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag, type Tone } from "@/components/ui/Tag";
import { Window } from "@/components/ui/Window";
import { audiences } from "@/lib/content";
import { EASE_OUT } from "@/lib/utils";

export function Audiences() {
  const [teams, providers] = audiences.tabs;

  return (
    <section className="relative py-24 sm:py-32">
      <span id="teams" aria-hidden className="absolute top-0" />
      <Container>
        <SectionHeading eyebrow={audiences.eyebrow} title={audiences.title} />

        <Reveal className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 *:min-w-0">
          <div>
            <Eyebrow>{teams.eyebrow}</Eyebrow>
            <h3 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
              {teams.title}
            </h3>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted">{teams.description}</p>
            <ul className="mt-8 flex flex-col gap-3">
              {teams.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[15px] text-fg/90">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-violet/15 text-[#b9a8ff]">
                    <Check className="size-3" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <Button href="#join" variant="ghost" className="mt-10">
              Get early access
            </Button>
          </div>
          <TeamsVisual />
        </Reveal>

        <Reveal className="relative mt-16">
          <span id="providers" aria-hidden className="absolute -top-24" />
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white/2 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>{providers.eyebrow}</Eyebrow>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{providers.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{providers.description}</p>
            </div>
            <DesignPartnerButton placement="providers-strip" variant="primary" className="shrink-0" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const INBOX: { vendor: string; title: string; tag: string; tone: Tone }[] = [
  { vendor: "stripe · refunds", title: "Make refund webhook handler order-independent", tag: "Drift", tone: "del" },
  { vendor: "openai · AI assistant", title: "Migrate off retiring model before Jun 30", tag: "Deadline", tone: "warn" },
  { vendor: "auth0 · login", title: "Request the new read:users scopes", tag: "Deadline", tone: "warn" },
  { vendor: "twilio · notifications", title: "Back off and batch SMS under new rate limit", tag: "Incident", tone: "del" },
];

function TeamsVisual() {
  return (
    <Window
      title="Repair PRs · acme"
      right={<span className="font-mono text-[11px] text-muted">4 open</span>}
      bodyClassName="divide-y divide-line"
    >
      {INBOX.map((pr, i) => (
        <motion.div
          key={pr.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: EASE_OUT }}
          className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-white/2"
        >
          <GitPullRequest className="mt-0.5 size-4 shrink-0 text-add" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm text-fg">{pr.title}</div>
            <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-subtle">
              boro-bot · {pr.vendor} ·
              <CircleCheck className="size-3 text-add" />
              tests attached
            </div>
          </div>
          <Tag tone={pr.tone}>{pr.tag}</Tag>
        </motion.div>
      ))}
    </Window>
  );
}
