"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { DesignPartnerLink } from "@/components/ui/DesignPartner";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow={faqs.eyebrow}
          title={faqs.title}
          description={faqs.description}
        />

        <Reveal className="divide-y divide-line border-y border-line">
          {faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-fg outline-none transition-colors hover:text-white focus-visible:text-white"
                  >
                    {item.q}
                    <Plus
                      className={cn(
                        "size-4 shrink-0 text-muted transition-transform duration-300",
                        isOpen && "rotate-45 text-fg",
                      )}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 leading-relaxed text-muted">
                        {item.a}
                        {"partner" in item && item.partner && (
                          <>
                            {" "}
                            <DesignPartnerLink placement="faq" />
                          </>
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
