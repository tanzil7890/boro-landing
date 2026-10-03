"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DesignPartnerButton } from "@/components/ui/DesignPartner";
import { Logo } from "@/components/ui/Logo";
import { nav } from "@/lib/content";
import { cn, EASE_OUT } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-line bg-canvas/70 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" aria-label="Boro home" className="flex items-center rounded-md">
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DesignPartnerButton placement="navbar" size="sm" className="hidden lg:inline-flex" />
            <Button href="#join" size="sm" className="hidden sm:inline-flex">
              Join waitlist
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid size-9 place-items-center rounded-full border border-line text-fg/80 md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </Container>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="overflow-hidden md:hidden"
            >
              <Container className="flex flex-col gap-1 pb-5">
                {nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2.5 text-[15px] text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                ))}
                <Button href="#join" onClick={() => setOpen(false)} className="mt-2">
                  Join waitlist
                </Button>
                <DesignPartnerButton placement="mobile-menu" onClick={() => setOpen(false)} className="mt-1" />
              </Container>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
