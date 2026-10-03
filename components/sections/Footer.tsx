import { Container } from "@/components/ui/Container";
import { DesignPartnerLink } from "@/components/ui/DesignPartner";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-subtle">{site.tagline}.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <DesignPartnerLink
            placement="footer"
            className="text-sm font-normal text-muted no-underline hover:text-fg [&>svg]:hidden"
          />
        </nav>
      </Container>
      <Container className="mt-10 flex flex-wrap items-center justify-between gap-2 text-xs text-subtle">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <a href={site.url} className="font-mono transition-colors hover:text-fg">
          {site.domain}
        </a>
      </Container>
    </footer>
  );
}
