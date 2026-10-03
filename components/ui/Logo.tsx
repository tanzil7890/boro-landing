"use client";

import { useEffect, useId, useRef } from "react";
import { LOGO } from "@/lib/logo";
import { cn } from "@/lib/utils";

type Variant = "glyph" | "tile" | "mono";

// How far the pupil can travel from the eye's center (eye r 7.6 − pupil r 3.7, minus a little breathing room).
const PUPIL_TRAVEL = 3.1;

/** Moves the pupil toward the cursor. Leaves it at its resting glance for touch and reduced motion. */
function useLookAtCursor() {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const pupil = ref.current;
    const space = pupil?.parentNode as SVGGraphicsElement | null;
    if (!pupil || !space || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const ctm = space!.getScreenCTM();
        if (!ctm) return;
        const center = new DOMPoint(LOGO.eye.cx, LOGO.eye.cy).matrixTransform(ctm);
        const dx = e.clientX - center.x;
        const dy = e.clientY - center.y;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = PUPIL_TRAVEL * Math.min(1, dist / 140);
        const x = (dx / dist) * reach - LOGO.pupil.dx;
        const y = (dy / dist) * reach - LOGO.pupil.dy;
        pupil!.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

/** The glyph itself, in its own 64-unit coordinate space. */
function Glyph({ fill, maskId }: { fill: string; maskId: string }) {
  const pupilRef = useLookAtCursor();
  const { eye, pupil } = LOGO;

  return (
    <>
      <mask id={maskId}>
        <rect x="0" y="0" width="64" height="64" fill="#fff" />
        {/* The eye: blinks every few seconds, closes into a smile on hover. */}
        <circle
          cx={eye.cx}
          cy={eye.cy}
          r={eye.r}
          fill="#000"
          className="origin-center transform-fill animate-logo-blink transition-opacity duration-150 group-hover/logo:opacity-0"
        />
        <path
          d={LOGO.smile}
          stroke="#000"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          className="opacity-0 transition-opacity duration-150 group-hover/logo:opacity-100"
        />
      </mask>
      <path d={LOGO.body} fill={fill} mask={`url(#${maskId})`} />
      <g ref={pupilRef} className="animate-logo-blink-pupil transition-transform duration-300 ease-out">
        <circle
          cx={eye.cx + pupil.dx}
          cy={eye.cy + pupil.dy}
          r={pupil.r}
          fill={fill}
          className="transition-opacity duration-150 group-hover/logo:opacity-0"
        />
      </g>
    </>
  );
}

/**
 * "Boro the bot": a "b" whose bowl is an eye. It blinks, follows the cursor and smiles on hover.
 * `tile` is the app-icon style, `glyph` the gradient mark on its own, `mono` uses currentColor.
 */
export function LogoMark({ className, variant = "tile" }: { className?: string; variant?: Variant }) {
  const id = useId();
  const gradient = `${id}-g`;
  const maskId = `${id}-eye`;

  const stops = (
    <>
      <stop offset="0" stopColor={LOGO.stops[0]} />
      <stop offset="0.5" stopColor={LOGO.stops[1]} />
      <stop offset="1" stopColor={LOGO.stops[2]} />
    </>
  );

  if (variant === "tile") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className={cn("group/logo size-7 shrink-0", className)}>
        <defs>
          <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
            {stops}
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="15" fill={`url(#${gradient})`} />
        <rect x="0.5" y="0.5" width="63" height="63" rx="14.5" fill="none" stroke="#fff" strokeOpacity="0.18" />
        <svg x="9.5" y="9.5" width="45" height="45" viewBox={LOGO.glyphViewBox}>
          <Glyph fill={LOGO.ink} maskId={maskId} />
        </svg>
      </svg>
    );
  }

  return (
    <svg viewBox={LOGO.glyphViewBox} aria-hidden className={cn("group/logo size-7 shrink-0", className)}>
      {variant === "glyph" && (
        <defs>
          <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="8" y1="6" x2="56" y2="58">
            {stops}
          </linearGradient>
        </defs>
      )}
      <Glyph fill={variant === "mono" ? "currentColor" : `url(#${gradient})`} maskId={maskId} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      <LogoMark variant="tile" className="size-7" />
      <span className="text-[18px] font-semibold leading-none tracking-[-0.035em] text-fg">boro</span>
    </span>
  );
}
