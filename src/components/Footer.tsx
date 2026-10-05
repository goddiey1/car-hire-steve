import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

const linkClass =
  "inline-flex min-h-11 items-center transition-colors hover:text-expedition-sand";

export default function Footer() {
  const phoneDisplay = siteConfig.phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <footer
      id="contact"
      className="border-t border-expedition-forest-light bg-expedition-forest pb-28 pt-10 text-expedition-sand/70 sm:py-16 sm:pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-1">
            <p className="mb-6 text-xl font-semibold tracking-tight text-expedition-sand">
              {siteConfig.name}
            </p>
            <p className="text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-base font-semibold text-expedition-sand">Quick Links</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/#fleet" className={linkClass}>
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/#transfers" className={linkClass}>
                  Airport
                </Link>
              </li>
              <li>
                <Link href="/#trip-steps" className={linkClass}>
                  How it works
                </Link>
              </li>
              <li>
                <a href="#contact" className={linkClass}>
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className={linkClass}>
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-6 text-base font-semibold text-expedition-sand">Contact Us</h2>
            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-expedition-accent" aria-hidden="true" />
                <span>
                  {siteConfig.location.area}, {siteConfig.location.city}, {siteConfig.location.country}
                  <br />
                  <span className="text-expedition-sand/50">Available for airport pickups (JKIA &amp; Wilson)</span>
                </span>
              </p>
              {siteConfig.phone && (
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-expedition-accent" aria-hidden="true" />
                  <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-expedition-sand">
                    {phoneDisplay}
                  </a>
                </p>
              )}
              {siteConfig.email && (
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-expedition-accent" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-expedition-sand">
                    {siteConfig.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-expedition-forest-light/60 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
