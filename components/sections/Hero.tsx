"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { Aurora, GridBackground } from "@/components/ui/Backgrounds";
import { Container } from "@/components/ui/Container";
import { DesignPartnerLink } from "@/components/ui/DesignPartner";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { hero } from "@/lib/content";
import { EASE_OUT } from "@/lib/utils";
import { HeroPipeline } from "./HeroPipeline";

// Each accent word gets its own slice of the violet → cyan gradient.
const ACCENT_GRADIENTS = [
  "linear-gradient(90deg, #7C5CFF, #4F97F6)",
  "linear-gradient(90deg, #4F97F6, #22D3EE)",
];

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // The product window starts tilted back and flattens as it scrolls into view.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const words = [
    ...hero.titleLead.map((text) => ({ text, gradient: undefined })),
    ...hero.titleAccent.map((text, i) => ({ text, gradient: ACCENT_GRADIENTS[i] })),
  ];

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40"
    >
      <Aurora />
      <GridBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 20%), rgb(124 92 255 / 0.10), transparent 40%)",
        }}
      />

      <Container className="relative flex flex-col items-center text-center">
        <motion.a
          href="#how-it-works"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 py-1 pl-1 pr-3 text-sm text-muted backdrop-blur transition-colors hover:border-white/20 hover:text-fg"
        >
          <span className="rounded-full bg-violet/15 px-2 py-0.5 text-xs font-medium text-[#b9a8ff]">
            {hero.badge}
          </span>
          {hero.eyebrow}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
          className="mt-7 max-w-4xl text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-[84px]"
        >
          {words.map(({ text, gradient }, i) => (
            <motion.span
              key={text}
              variants={word}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="inline-block pb-[0.08em]"
              style={
                gradient
                  ? {
                      backgroundImage: gradient,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }
                  : undefined
              }
            >
              {text}
              {i < words.length - 1 && " "}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
          className="mt-6 max-w-2xl text-pretty text-base text-muted sm:text-lg"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE_OUT }}
          className="mt-10 flex w-full flex-col items-center"
        >
          <WaitlistForm hint={hero.note} />
          <p className="mt-1 text-sm text-muted">
            {hero.partnerPrompt} <DesignPartnerLink placement="hero" />
          </p>
        </motion.div>
      </Container>

      <Container className="relative mt-12 sm:mt-16">
        <div style={{ perspective: 1600 }}>
          <motion.div
            ref={stageRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: EASE_OUT }}
            style={{ rotateX, scale, transformOrigin: "50% 0%" }}
            className="relative mx-auto max-w-5xl motion-reduce:transform-none!"
          >
            <div
              aria-hidden
              className="absolute -inset-x-8 -top-8 bottom-1/3 rounded-full bg-violet/20 blur-3xl"
            />
            <HeroPipeline />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
