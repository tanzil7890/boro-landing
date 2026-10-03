import type { Metadata } from "next";
import { JetBrains_Mono, Mona_Sans } from "next/font/google";

const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--nf-mona" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--nf-jet" });

export const metadata: Metadata = {
  title: "Boro · Direction 1: The page is a PR",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: LayoutProps<"/1">) {
  return (
    <div
      data-theme="pr"
      className={`${mona.variable} ${jet.variable} min-h-screen overflow-x-clip bg-pr-bg font-mona text-pr-ink selection:bg-pr-add-strong`}
    >
      {children}
    </div>
  );
}
