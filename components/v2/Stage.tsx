"use client";

import { ArrowDown, Check, X } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useId, useRef, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { useWaitlist } from "@/lib/useWaitlist";
import { cn } from "@/lib/utils";
import { hero } from "@/lib/content";
import { deps, stage } from "./content";
import { PartnerLink } from "./DesignPartner";
import { scramble } from "./scramble";

type Scene = "ok" | "broken" | "scanning" | "repairing" | "healed";

// Everything below is driven by scroll progress through the pinned section (0 → 1).
const BREAK: [number, number] = [0.07, 0.3];
const SCAN: [number, number] = [0.36, 0.56];
const HEAL = {
  head: [0.6, 0.68],
  sub: [0.64, 0.71],
  form: [0.68, 0.76],
  deps: [0.72, 0.78],
} satisfies Record<string, [number, number]>;
const REVEAL = { head: 0.39, sub: 0.44, form: 0.49, deps: 0.53 };

function sceneAt(p: number): Scene {
  if (p < BREAK[0]) return "ok";
  if (p < 0.34) return "broken";
  if (p < 0.58) return "scanning";
  if (p < 0.84) return "repairing";
  return "healed";
}

const STATUS: Record<Scene, { text: string; dot: string }> = {
  ok: { text: "all integrations passing", dot: "bg-brk-green" },
  broken: { text: "nightly test failed", dot: "bg-brk-red" },
  scanning: { text: "boro is tracing the drift", dot: "bg-brk-amber" },
  repairing: { text: "boro is repairing", dot: "bg-brk-amber" },
  healed: { text: "repaired by boro", dot: "bg-brk-green" },
};

// How far each headline word gets knocked out of place at full damage.
const DISPLACE = [
  { x: -18, y: 12, r: -5 },
  { x: 16, y: -14, r: 4 },
  { x: -10, y: 24, r: -3 },
  { x: 28, y: 8, r: 6 },
];

/** Damage for one element: rises as the drift hits, falls back to 0 as Boro heals it. */
function useDamage(brk: MotionValue<number>, p: MotionValue<number>, heal: [number, number]) {
  const healed = useTransform(p, heal, [0, 1]);
  return useTransform(() => brk.get() * (1 - healed.get()));
}

/**
 * Direction 2's signature: a pinned, scroll-scrubbed scene where the hero breaks
 * (an outside API silently changed and the nightly test caught it), Boro traces it
 * to the call site, repairs it, and the reviewed fix gets merged.
 */
export function Stage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [scene, setScene] = useState<Scene>("ok");
  const [depsBroken, setDepsBroken] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    setScene(sceneAt(v));
    setDepsBroken(v >= BREAK[0] + 0.02 && v < HEAL.deps[0] + 0.03);
  });

  const brk = useTransform(p, BREAK, [0, 1]);
  const head = useDamage(brk, p, HEAL.head);
  const sub = useDamage(brk, p, HEAL.sub);
  const form = useDamage(brk, p, HEAL.form);
  const hint = useTransform(p, [0, 0.04], [1, 0]);

  return (
    <section ref={ref} aria-label="Watch this page break" className="relative h-[440vh] motion-reduce:hidden">
      <div className="sticky top-0 h-svh overflow-hidden">
        <TopBar scene={scene} />
        <Rail p={p} />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center-safe px-6 pb-24 pt-20 sm:pt-24 [@media(min-height:860px)]:pb-40">
          <p className="font-jet text-xs text-brk-dim">{stage.eyebrow}</p>

          <ScanTarget p={p} reveal={REVEAL.head} heal={HEAL.head} label={stage.labels.head} className="mt-4 sm:mt-5">
            <h1
              className={cn(
                "text-[min(9.5vw,13vh)] font-bold leading-[0.88] tracking-[-0.05em]",
                scene === "broken" && "animate-glitch",
              )}
            >
              <span className="sr-only">{stage.words.join(" ")}</span>
              <span aria-hidden>
                {stage.words.map((word, i) => (
                  <Fragment key={word}>
                    <BrokenWord text={word} dmg={head} displace={DISPLACE[i]} seed={i + 1} accent={i % 2 === 0} />
                    {i < stage.words.length - 1 && " "}
                  </Fragment>
                ))}
              </span>
            </h1>
          </ScanTarget>

          <ScanTarget p={p} reveal={REVEAL.sub} heal={HEAL.sub} label={stage.labels.sub} className="mt-5 max-w-2xl sm:mt-7">
            <BrokenText text={stage.description} dmg={sub} />
          </ScanTarget>

          <div className="mt-8 flex flex-wrap items-start gap-x-10 gap-y-5 sm:gap-y-8 [@media(min-height:820px)]:mt-12">
            <ScanTarget p={p} reveal={REVEAL.form} heal={HEAL.form} label={stage.labels.form} className="w-full max-w-xl">
              <StageForm dmg={form} />
            </ScanTarget>
            <ScanTarget p={p} reveal={REVEAL.deps} heal={HEAL.deps} label={stage.labels.deps} className="mt-3 w-fit">
              <DepChips broken={depsBroken} />
            </ScanTarget>
          </div>
          <p className="mt-5 font-jet text-xs text-brk-dim">
            {hero.partnerPrompt.toLowerCase()} <PartnerLink placement="hero" />
          </p>
        </div>

        <Toast p={p} healed={scene === "healed"} />
        <ConsolePanel p={p} />
        <Scanline p={p} />
        <DiffCard p={p} />
        <MergedCard p={p} />

        <motion.div
          style={{ opacity: hint }}
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 font-jet text-xs text-brk-dim"
        >
          {stage.hint}
          <ArrowDown className="size-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function TopBar({ scene }: { scene: Scene }) {
  const status = STATUS[scene];
  return (
    <div className="absolute inset-x-0 top-0 z-20 border-b border-brk-line bg-brk-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-6">
        <LogoMark variant="mono" className="size-6 text-brk-ink" />
        <span className="font-bold tracking-tight">boro</span>
        <span className="ml-auto flex items-center gap-2 font-jet text-xs text-brk-dim">
          <span className={cn("size-2 rounded-full transition-colors", status.dot, scene !== "ok" && scene !== "healed" && "animate-pulse")} />
          {status.text}
        </span>
        <PartnerLink placement="topbar" className="ml-4 hidden font-jet text-xs sm:inline">
          design partner →
        </PartnerLink>
        <a href="#join" className="ml-4 rounded-md border border-brk-line px-3 py-1.5 font-jet text-xs transition-colors hover:border-brk-ink">
          join →
        </a>
      </div>
    </div>
  );
}

function BrokenWord({
  text,
  dmg,
  displace,
  seed,
  accent,
}: {
  text: string;
  dmg: MotionValue<number>;
  displace: { x: number; y: number; r: number };
  seed: number;
  accent: boolean;
}) {
  const [level, setLevel] = useState(0);
  useMotionValueEvent(dmg, "change", (v) => setLevel(Math.round(v * 8)));
  const x = useTransform(dmg, (v) => v * displace.x);
  const y = useTransform(dmg, (v) => v * displace.y);
  const rotate = useTransform(dmg, (v) => v * displace.r);
  const color = useTransform(dmg, [0, 1], ["#ededed", accent ? "#ff3b30" : "#9a9a9a"]);
  const textShadow = useTransform(dmg, (v) =>
    v > 0.02 ? `${v * 6}px 0 rgb(255 59 48 / 0.8), ${-v * 6}px 0 rgb(255 176 32 / 0.55)` : "none",
  );
  return (
    <motion.span style={{ x, y, rotate, color, textShadow }} className="inline-block">
      {scramble(text, (level / 8) * 0.6, seed)}
    </motion.span>
  );
}

function BrokenText({ text, dmg }: { text: string; dmg: MotionValue<number> }) {
  const [level, setLevel] = useState(0);
  useMotionValueEvent(dmg, "change", (v) => setLevel(Math.round(v * 6)));
  const skewX = useTransform(dmg, (v) => v * -8);
  const x = useTransform(dmg, (v) => v * 14);
  const opacity = useTransform(dmg, [0, 1], [1, 0.55]);
  return (
    <motion.p style={{ skewX, x, opacity }} className="text-pretty text-base leading-relaxed text-brk-dim sm:text-lg [@media(min-height:820px)]:sm:text-xl">
      {scramble(text, (level / 6) * 0.3, 42)}
    </motion.p>
  );
}

function StageForm({ dmg }: { dmg: MotionValue<number> }) {
  const { email, setEmail, submit, error, isError, isLoading, isSuccess } = useWaitlist();
  const inputId = useId();
  const [level, setLevel] = useState(0);
  useMotionValueEvent(dmg, "change", (v) => setLevel(Math.round(v * 6)));
  const rotate = useTransform(dmg, (v) => v * -3.5);
  const y = useTransform(dmg, (v) => v * 22);
  const broken = useTransform(dmg, [0, 0.08], [0, 1]);

  return (
    <motion.div style={{ rotate, y }} className="relative">
      <motion.span
        aria-hidden
        style={{ opacity: broken }}
        className="pointer-events-none absolute -inset-2 rounded-md border border-dashed border-brk-red"
      />
      <motion.span
        aria-hidden
        style={{ opacity: broken }}
        className="absolute -top-9 left-0 whitespace-nowrap font-jet text-xs text-brk-red"
      >
        ✖ {stage.error}
      </motion.span>
      {isSuccess ? (
        <p className="flex h-12 items-center gap-2 font-jet text-sm text-brk-green">
          <Check className="size-4" /> you&apos;re on the waitlist
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="flex gap-2">
          <label htmlFor={inputId} className="sr-only">
            Work email
          </label>
          <input
            id={inputId}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={isError}
            className="h-12 min-w-0 flex-1 rounded-md border border-brk-line bg-brk-panel px-4 font-jet text-sm text-brk-ink outline-none transition-colors placeholder:text-brk-dim focus:border-brk-green"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 shrink-0 rounded-md bg-brk-ink px-5 font-bold text-black transition-colors hover:bg-white disabled:opacity-70"
          >
            {isLoading ? "Joining…" : scramble("Join waitlist", (level / 6) * 0.6, 9)}
          </button>
        </form>
      )}
      <p aria-live="polite" className="mt-2 min-h-4 font-jet text-xs text-brk-red">
        {isError ? `✖ ${error}` : ""}
      </p>
    </motion.div>
  );
}

function DepChips({ broken }: { broken: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 font-jet text-xs">
      {deps.map((dep) => {
        const bad = broken && dep.breaks;
        return (
          <span
            key={dep.name}
            className={cn(
              "inline-flex items-center gap-1.5 rounded border px-2 py-1 transition-colors duration-300",
              bad ? "border-brk-red/50 bg-brk-red/10 text-brk-red" : "border-brk-line text-brk-dim",
            )}
          >
            {dep.name} <span className="opacity-60">→ {dep.workflow}</span>
            {bad ? <X className="size-3" /> : <Check className="size-3 text-brk-green" />}
          </span>
        );
      })}
    </div>
  );
}

/** Wraps an element with the bounding box Boro draws when the scan finds it (amber), then fixes it (green). */
function ScanTarget({
  p,
  reveal,
  heal,
  label,
  className,
  children,
}: {
  p: MotionValue<number>;
  reveal: number;
  heal: [number, number];
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const visible = useTransform(p, [reveal, reveal + 0.02, heal[1] + 0.02, heal[1] + 0.05], [0, 1, 1, 0]);
  const fixed = useTransform(p, heal, [0, 1]);
  const amber = useTransform(() => visible.get() * (1 - fixed.get()));
  const green = useTransform(() => visible.get() * fixed.get());

  return (
    <div className={cn("relative", className)}>
      {children}
      <Box opacity={amber} tone="amber" label={`⚠ ${label}`} />
      <Box opacity={green} tone="green" label="✓ fixed by boro" />
    </div>
  );
}

function Box({ opacity, tone, label }: { opacity: MotionValue<number>; tone: "amber" | "green"; label: string }) {
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className={cn(
        "pointer-events-none absolute -inset-3 rounded-sm border",
        tone === "amber"
          ? "border-brk-amber/80 shadow-[0_0_24px_rgb(255_176_32/0.18)]"
          : "border-brk-green/80 shadow-[0_0_24px_rgb(48_209_88/0.22)]",
      )}
    >
      <span
        className={cn(
          "absolute left-2 top-0 -translate-y-full whitespace-nowrap px-1.5 py-0.5 font-jet text-[10px] font-medium text-black",
          tone === "amber" ? "bg-brk-amber" : "bg-brk-green",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Toast({ p, healed }: { p: MotionValue<number>; healed: boolean }) {
  const opacity = useTransform(p, [0.04, 0.08], [0, 1]);
  const y = useTransform(p, [0.04, 0.08], [-24, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "absolute right-4 top-[68px] z-10 w-[min(360px,calc(100%-2rem))] rounded-md border bg-brk-panel p-3 font-jet text-xs transition-colors duration-500 sm:right-6 xl:top-[46%] xl:p-4",
        healed ? "border-brk-green/40" : "border-brk-red/40",
      )}
    >
      <div className="flex items-center gap-2 text-brk-dim">
        <span className={cn("size-1.5 rounded-full", healed ? "bg-brk-green" : "bg-brk-red")} />
        {stage.toast.source}
        <span className="ml-auto">just now</span>
      </div>
      <div className="mt-2 font-bold text-brk-red">{stage.toast.version}</div>
      <div className="mt-1 hidden leading-relaxed text-brk-ink xl:block">{stage.toast.body}</div>
      {healed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden text-brk-green"
        >
          <div className="mt-3 border-t border-brk-line pt-3">✓ repaired by boro · {stage.merged.title}</div>
        </motion.div>
      )}
    </motion.div>
  );
}

function ConsolePanel({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.09, 0.12, 0.84, 0.88], [0, 1, 1, 0]);
  const y = useTransform(p, [0.09, 0.12], [16, 0]);
  const errors = useTransform(p, [0.12, 0.3, 0.66, 0.8], [0, 4, 4, 0]);
  const errorsText = useTransform(errors, (v) => `${Math.round(v)} errors`);
  const errorsColor = useTransform(errors, (v) => (v < 0.5 ? "#30d158" : "#ff3b30"));
  const cleared = useTransform(p, [0.79, 0.82], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-6 left-6 hidden w-[460px] rounded-md border border-brk-line bg-brk-panel/95 font-jet backdrop-blur md:block"
    >
      <div className="flex items-center border-b border-brk-line px-4 py-2 text-[11px] text-brk-dim">
        Console
        <motion.span style={{ color: errorsColor }} className="ml-auto">
          {errorsText}
        </motion.span>
      </div>
      <div className="px-4 py-3">
        {stage.console.map((line, i) => (
          <ConsoleLine key={line.text} level={line.level} text={line.text} p={p} at={0.12 + i * 0.03} />
        ))}
        <motion.div style={{ opacity: cleared }} className="text-[11px] leading-5 text-brk-green">
          ✓ 0 errors · waitlist workflow passing
        </motion.div>
      </div>
    </motion.div>
  );
}

function ConsoleLine({ level, text, p, at }: { level: string; text: string; p: MotionValue<number>; at: number }) {
  const opacity = useTransform(p, [at, at + 0.015, 0.7, 0.8], [0, 1, 1, 0.15]);
  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "truncate whitespace-pre text-[11px] leading-5",
        level === "error" ? "text-brk-red" : level === "warn" ? "text-brk-amber" : "text-brk-dim",
      )}
    >
      {level === "error" ? "✖ " : level === "warn" ? "⚠ " : ""}
      {text}
    </motion.div>
  );
}

function Scanline({ p }: { p: MotionValue<number> }) {
  const top = useTransform(p, SCAN, ["-10%", "100%"]);
  const opacity = useTransform(p, [SCAN[0] - 0.01, SCAN[0] + 0.01, SCAN[1] - 0.01, SCAN[1] + 0.01], [0, 1, 1, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ top, opacity }}
      className="pointer-events-none absolute inset-x-0 z-10 h-28 border-b-2 border-brk-green bg-linear-to-b from-transparent to-brk-green/15 shadow-[0_10px_40px_rgb(48_209_88/0.35)]"
    >
      <span className="absolute bottom-2 right-6 font-jet text-[10px] uppercase tracking-[0.2em] text-brk-green">
        boro · tracing the failing test
      </span>
    </motion.div>
  );
}

function DiffCard({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.6, 0.63, 0.82, 0.86], [0, 1, 1, 0]);
  const x = useTransform(p, [0.6, 0.63], [24, 0]);
  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute bottom-6 right-6 hidden w-[400px] overflow-hidden rounded-md border border-brk-green/40 bg-brk-panel font-jet text-xs lg:block"
    >
      <div className="border-b border-brk-line px-4 py-2 text-[11px] text-brk-dim">boro · fixing {stage.diff.file}</div>
      <div className="bg-brk-red/10 px-4 py-2 text-brk-red">− {stage.diff.del}</div>
      <div className="bg-brk-green/10 px-4 py-2 text-brk-green">+ {stage.diff.add}</div>
      <div className="space-y-1 px-4 py-3 text-brk-dim">
        {stage.diff.notes.map((note) => (
          <div key={note}>✓ {note}</div>
        ))}
      </div>
    </motion.div>
  );
}

function MergedCard({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.86, 0.9], [0, 1]);
  const y = useTransform(p, [0.86, 0.9], [24, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-4 bottom-8 mx-auto flex max-w-2xl items-center gap-4 rounded-md border border-brk-green/40 bg-brk-panel/95 p-4 backdrop-blur sm:inset-x-6"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brk-green text-black">
        <Check className="size-5" />
      </span>
      <div className="min-w-0">
        <div className="text-lg font-bold">{stage.merged.title}</div>
        <div className="font-jet text-xs text-brk-dim">{stage.merged.body}</div>
      </div>
    </motion.div>
  );
}

/** Progress rail on the left: drift → trace → repair → merged. */
function Rail({ p }: { p: MotionValue<number> }) {
  const stops: [string, number][] = [
    ["drift", BREAK[0]],
    ["trace", SCAN[0]],
    ["repair", HEAL.head[0]],
    ["merged", 0.86],
  ];
  return (
    <div aria-hidden className="absolute left-6 top-1/2 hidden h-72 -translate-y-1/2 2xl:block">
      <div className="absolute inset-y-0 left-0 w-px bg-brk-line" />
      <motion.div style={{ scaleY: p }} className="absolute inset-y-0 left-0 w-px origin-top bg-brk-ink" />
      {stops.map(([label, at]) => (
        <div
          key={label}
          className="absolute left-3 -translate-y-1/2 font-jet text-[10px] uppercase tracking-[0.2em] text-brk-dim"
          style={{ top: `${at * 100}%` }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/** Reduced-motion fallback: no scrubbing or shaking, just the before/after. */
export function StaticStory() {
  const zero = useMotionValue(0);
  return (
    <section className="mx-auto hidden max-w-6xl px-6 pb-20 pt-28 motion-reduce:block">
      <p className="font-jet text-xs text-brk-dim">{stage.eyebrow}</p>
      <h1 className="mt-5 text-6xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-8xl">{stage.words.join(" ")}</h1>
      <p className="mt-7 max-w-2xl text-xl leading-relaxed text-brk-dim">{stage.description}</p>
      <div className="mt-12 max-w-xl">
        <StageForm dmg={zero} />
      </div>
      <div className="mt-16 grid gap-4 font-jet text-xs md:grid-cols-2">
        <div className="rounded-md border border-brk-red/40 bg-brk-panel p-4">
          <div className="text-brk-dim">before · nightly test failed · no changelog entry</div>
          {stage.console.slice(0, 4).map((line) => (
            <div key={line.text} className={line.level === "error" ? "mt-1 text-brk-red" : "mt-1 text-brk-dim"}>
              {line.text}
            </div>
          ))}
        </div>
        <div className="rounded-md border border-brk-green/40 bg-brk-panel p-4">
          <div className="text-brk-dim">after · boro</div>
          <div className="mt-1 text-brk-red">− {stage.diff.del}</div>
          <div className="mt-1 text-brk-green">+ {stage.diff.add}</div>
          <div className="mt-3 text-brk-green">✓ {stage.merged.title} · 0 errors</div>
        </div>
      </div>
    </section>
  );
}
