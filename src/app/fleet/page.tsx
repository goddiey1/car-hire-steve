import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";
import { Car } from "@/components/CarCard";
import FleetSection from "@/components/FleetSection";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Compass, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Safari Fleet & 4x4 Car Rental in Nairobi | Stevinson Adventure Safari",
  description:
    "Explore our complete fleet of 4x4 safari land cruisers, Toyota Prado TX, minivans, and executive sedans for self-drive and chauffeur hire in Nairobi, Kenya.",
  alternates: {
    canonical: `${siteConfig.url}/fleet`,
  },
  openGraph: {
    title: "Safari Fleet & 4x4 Car Rental in Nairobi | Stevinson Adventure Safari",
    description:
      "Explore our complete fleet of 4x4 safari land cruisers, Toyota Prado TX, minivans, and executive sedans in Nairobi.",
    url: `${siteConfig.url}/fleet`,
  },
};

export default function FleetPage() {
  const cars: Car[] = Array.isArray(carsData)
    ? (carsData as Car[])
    : (((carsData as any).default || []) as Car[]);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Fleet",
        "item": `${siteConfig.url}/fleet`,
      },
    ],
  };

  return (
    <main id="main-content" className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-[#f7f5f0] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-[#2b3524]/70 mb-8 overflow-x-auto whitespace-nowrap"
        >
          <Link href="/" className="hover:text-[#d66b44] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-[#2b3524]/40" />
          <span className="text-[#2b3524] font-semibold">Safari Fleet</span>
        </nav>

        {/* Page Hero Header - AEO Question & Direct Answer */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d66b44] block mb-2">
            Nairobi Vehicle Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2b3524] tracking-tight mb-4">
            Safari Fleet &amp; Car Rental in Nairobi
          </h1>
          <p className="text-base sm:text-lg text-[#2b3524]/80 leading-relaxed font-medium">
            Explore our verified fleet of rugged 4x4 expedition cruisers, executive Prado SUVs, and airport transfer shuttles based on Murang'a Rd, Nairobi. All vehicles include comprehensive insurance, routine maintenance, and inside-terminal delivery at JKIA and Wilson Airport.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 text-xs font-bold uppercase tracking-wider text-[#2b3524]">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#e5e0d8] px-3.5 py-1.5 rounded-full shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d66b44]" /> Unlimited Mileage Options
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#e5e0d8] px-3.5 py-1.5 rounded-full shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" /> 24/7 Roadside Assistance
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#e5e0d8] px-3.5 py-1.5 rounded-full shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#d66b44]" /> Park Ready 4WD
            </span>
          </div>
        </div>

        {/* Fleet Grid Component */}
        <FleetSection cars={cars} />
      </div>
    </main>
  );
}
