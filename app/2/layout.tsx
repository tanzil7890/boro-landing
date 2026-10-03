import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--nf-grotesk" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--nf-jet" });

export const metadata: Metadata = {
  title: "Boro · Direction 2: Watch this page break",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: LayoutProps<"/2">) {
  return (
    <div
      data-theme="break"
      className={`${grotesk.variable} ${jet.variable} min-h-screen overflow-x-clip bg-brk-bg font-grotesk text-brk-ink selection:bg-brk-green/40`}
    >
      {children}
    </div>
  );
}
