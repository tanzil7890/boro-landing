import { Audiences } from "@/components/sections/Audiences";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { Problem } from "@/components/sections/Problem";
import { VendorMarquee } from "@/components/sections/VendorMarquee";
import { WhyNow } from "@/components/sections/WhyNow";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VendorMarquee />
        <Problem />
        <WhyNow />
        <HowItWorks />
        <Audiences />
        <Features />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
