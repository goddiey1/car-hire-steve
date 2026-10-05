import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/#fleet", label: "Vehicles" },
  { href: "/#transfers", label: "Airport" },
  { href: "/#trip-steps", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
] as const;

const linkClass =
  "inline-flex min-h-11 items-center text-sm font-medium text-expedition-sand/80 transition-colors hover:text-expedition-sand";

export default function Footer() {
  const phoneDisplay = siteConfig.phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <footer
      id="contact"
      className="border-t border-expedition-forest-light bg-expedition-forest pb-28 pt-10 text-expedition-sand/70 sm:pb-14 sm:pt-14"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-md">
            <p className="font-display text-3xl tracking-tight text-expedition-sand sm:text-4xl">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-expedition-sand/70">
              {siteConfig.description}
            </p>
          </div>

          <address className="flex flex-col gap-3 text-sm not-italic text-expedition-sand/85 md:max-w-sm">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
              <span>
                {siteConfig.location.area}, {siteConfig.location.city}, {siteConfig.location.country}
                <span className="mt-1 block text-expedition-sand/50">
                  Airport pickups at JKIA &amp; Wilson
                </span>
              </span>
            </p>
            {siteConfig.phone && (
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
                <a href={`tel:${siteConfig.phone}`} className={linkClass}>
                  {phoneDisplay}
                </a>
              </p>
            )}
            {siteConfig.email && (
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>
                  {siteConfig.email}
                </a>
              </p>
            )}
          </address>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-expedition-forest-light/60 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <a href="#contact" className={linkClass}>
              Contact
            </a>
          </nav>
          <p className="text-sm text-expedition-sand/55">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
