import Link from "next/link";
import type { SiteSettings } from "@/types/content";
import { navLinks } from "@/content/site";
import { MobileNav } from "./MobileNav";

type NavbarProps = {
  site: SiteSettings;
};

export function Navbar({ site }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
            JR
          </span>
          <div className="leading-tight">
            <span className="text-base font-bold tracking-tight text-foreground">
              {site.name}
            </span>
            <span className="hidden sm:block text-[11px] font-medium text-muted">
              {site.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/catalog"
            className="hidden sm:inline-flex btn-secondary px-4 py-2 text-sm"
          >
            {site.ctas.catalog}
          </Link>
          <Link href="/contact" className="btn-primary px-4 py-2 text-sm">
            {site.ctas.primary}
          </Link>
          <MobileNav site={site} />
        </div>
      </div>
    </header>
  );
}
