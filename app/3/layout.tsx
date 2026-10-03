import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--nf-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--nf-isans" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--nf-plex" });

export const metadata: Metadata = {
  title: "Boro · Direction 3: The Changelog Nobody Reads",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: LayoutProps<"/3">) {
  return (
    <div
      data-theme="paper"
      className={`${serif.variable} ${sans.variable} ${plex.variable} min-h-screen overflow-x-clip bg-paper font-isans text-paper-ink selection:bg-paper-accent/25`}
    >
      {children}
    </div>
  );
}
