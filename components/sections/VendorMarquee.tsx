import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { vendors } from "@/lib/content";

export function VendorMarquee() {
  return (
    <section aria-label="APIs Boro is built for" className="border-y border-line py-10">
      <Container>
        <p className="text-center text-sm text-subtle">{vendors.heading}</p>
        <Marquee className="mt-6" duration="45s">
          {vendors.names.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap text-xl font-semibold tracking-tight text-fg/35 transition-colors duration-300 hover:text-fg/80"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
