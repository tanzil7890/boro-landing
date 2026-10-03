"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Temporary: lets us flip between the design directions. Remove from app/layout.tsx once one is chosen.
const DESIGNS = [
  { href: "/", label: "Current" },
  { href: "/1", label: "1 · PR" },
  { href: "/2", label: "2 · Break" },
  { href: "/3", label: "3 · Editorial" },
];

export function DesignSwitcher() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Design directions"
      className="fixed bottom-4 right-4 z-[100] flex gap-1 rounded-full border border-white/15 bg-black/85 p-1 font-sans text-xs shadow-xl shadow-black/30 backdrop-blur"
    >
      {DESIGNS.map((d) => (
        <Link
          key={d.href}
          href={d.href}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            pathname === d.href ? "bg-white text-black" : "text-white/70 hover:text-white",
          )}
        >
          {d.label}
        </Link>
      ))}
    </nav>
  );
}
