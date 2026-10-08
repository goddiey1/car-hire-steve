import { Car, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const phoneDisplay = siteConfig.phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <footer id="contact" className="bg-neutral-950 pb-28 pt-10 text-neutral-400 sm:py-16 sm:pb-16 border-t border-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                <Car className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Stevinson<span className="text-blue-500">Adventure Safari</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium car rental and airport transfers in Nairobi, Kenya — built for international travellers who want a reliable handoff at JKIA or Wilson.
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-6 text-base">Quick Links</h2>
            <ul className="space-y-3 text-sm">
              <li><a href="#fleet" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Our Fleet</a></li>
              <li><a href="#transfers" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Airport Transfers</a></li>
              <li><a href="#how-it-works" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="#contact" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="/terms-and-conditions" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Terms &amp; Conditions</a></li> 
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-white font-semibold mb-6 text-base">Contact Us</h2>
            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.location.area}, {siteConfig.location.city}, {siteConfig.location.country}
                  <br />
                  <span className="text-neutral-500">Available for airport pickups (JKIA &amp; Wilson)</span>
                </span>
              </p>
              {siteConfig.phone && (
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-blue-400 transition-colors">
                    {phoneDisplay}
                  </a>
                </p>
              )}
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-blue-400 transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Stevinson Adventure Safari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
