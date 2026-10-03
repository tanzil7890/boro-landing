"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyNow } from "@/lib/content";

export function WhyNow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const count = whyNow.items.length;

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={whyNow.eyebrow}
          title={whyNow.title}
          description={whyNow.description}
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-2xl">
          <div aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-line" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-linear-to-b from-violet to-cyan shadow-[0_0_12px_rgb(124_92_255/0.8)]"
          />
          <ol className="flex flex-col gap-16">
            {whyNow.items.map((item, i) => (
              <TimelineItem
                key={item.label}
                item={item}
                progress={progress}
                threshold={(i + 0.15) / count}
                highlight={i === count - 1}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

type TimelineItemProps = {
  item: (typeof whyNow.items)[number];
  progress: MotionValue<number>;
  threshold: number;
  highlight: boolean;
};

function TimelineItem({ item, progress, threshold, highlight }: TimelineItemProps) {
  // Each node lights up as the progress line reaches it.
  const range = [threshold - 0.12, threshold];
  const opacity = useTransform(progress, range, [0.3, 1]);
  const glow = useTransform(progress, range, [0, 1]);

  return (
    <motion.li style={{ opacity }} className="relative pl-12">
      <span aria-hidden className="absolute left-0 top-1 grid size-6 place-items-center rounded-full border border-line bg-canvas">
        <motion.span
          style={{ opacity: glow, scale: glow }}
          className="size-2.5 rounded-full bg-linear-to-br from-violet to-cyan shadow-[0_0_12px_rgb(124_92_255/0.9)]"
        />
      </span>
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.label}</div>
      <h3 className="mt-2 text-xl font-medium tracking-tight text-fg sm:text-2xl">
        {highlight ? <span className="text-gradient">{item.title}</span> : item.title}
      </h3>
      <p className="mt-2 max-w-lg leading-relaxed text-muted">{item.description}</p>
    </motion.li>
  );
}
