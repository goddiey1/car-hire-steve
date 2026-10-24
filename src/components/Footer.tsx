import Image from "next/image";
import { Car, Mail, MapPin, Phone, ExternalLink, Navigation } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const phoneDisplay = siteConfig.phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <footer id="contact" className="bg-neutral-950 pb-28 pt-10 text-neutral-400 sm:py-16 sm:pb-16 border-t border-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand & Rating Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-1.5 rounded-lg flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Stevinson Safari Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain brightness-0 invert" 
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Stevinson<span className="text-blue-500">Adventure Safari</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Premium car rental and airport transfers in Nairobi, Kenya — built for international travellers who want a reliable handoff at JKIA or Wilson.
            </p>
            {/* 5.0 Star Google Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs">
              <span className="text-amber-400 tracking-wider">★★★★★</span>
              <span className="font-bold text-white">5.0</span>
              <span className="text-neutral-400">on Google Maps</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h2 className="text-white font-semibold mb-6 text-base">Quick Links</h2>
            <ul className="space-y-3 text-sm">
              <li><a href="#fleet" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Our Fleet</a></li>
              <li><a href="#transfers" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Airport Transfers</a></li>
              <li><a href="#services" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Long-Term Hires</a></li>
              <li><a href="#contact" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="/terms-and-conditions" className="inline-flex min-h-11 items-center hover:text-blue-400 transition-colors">Terms &amp; Conditions</a></li> 
            </ul>
          </div>

          {/* Contact Details & Interactive Map Column */}
          <div className="md:col-span-2">
            <h2 className="text-white font-semibold mb-6 text-base">Contact &amp; Location</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Contact Information */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-white font-medium">
                      {siteConfig.location.address}, {siteConfig.location.city}, {siteConfig.location.country}
                    </p>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      Available for airport pickups (JKIA &amp; Wilson Airport)
                    </p>
                    <a 
                      href={siteConfig.location.googleMapsUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#d66b44] hover:text-[#e77c55] font-semibold mt-2 transition-colors group"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {siteConfig.phone && (
                  <p className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
                    <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-blue-400 transition-colors">
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

              {/* Interactive Live Embedded Google Map */}
              <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-md group">
                <iframe
                  title="Stevinson Adventure Safari Location Map"
                  src="https://maps.google.com/maps?q=-1.273757,36.826639&hl=en&z=15&output=embed"
                  width="100%"
                  height="170"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full opacity-90 hover:opacity-100 transition-opacity"
                />
                <a
                  href={siteConfig.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-neutral-950/90 backdrop-blur-sm border border-neutral-700/80 hover:border-[#d66b44] text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#d66b44]" />
                </a>
              </div>
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
