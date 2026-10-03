import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Base = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Adds a slow light sweep across the button. */
  shimmer?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Base & Omit<ComponentProps<"button">, keyof Base> & { href?: undefined };
type AnchorProps = Base & Omit<ComponentProps<"a">, keyof Base> & { href: string };

const variants = {
  primary:
    "bg-fg text-canvas shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-6px_rgb(124_92_255/0.45)] hover:-translate-y-px hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_10px_40px_-4px_rgb(124_92_255/0.7)]",
  ghost:
    "border border-line bg-white/3 text-fg/80 hover:bg-white/6 hover:text-fg",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", shimmer, className, children, ...rest } = props;

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:pointer-events-none disabled:opacity-70",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {shimmer && <span aria-hidden className="shimmer pointer-events-none absolute inset-0 animate-shimmer" />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <a {...(rest as ComponentProps<"a">)} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button {...(rest as ComponentProps<"button">)} className={classes}>
      {content}
    </button>
  );
}
