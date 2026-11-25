import type { Metadata } from "next";
import CheckInForm from "./CheckInForm";
import { ShieldCheck, Clock, FileCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Check-In & Document Verification | Stevinson Adventure Safari",
  description:
    "Complete your fast-track online check-in. Pre-verify your driving license, passport, and sign your rental agreement for express vehicle pickup at JKIA or Wilson Airport.",
  openGraph: {
    title: "Online Check-In | Stevinson Adventure Safari",
    description:
      "Fast-track your car rental check-in before landing in Nairobi. Upload your driving license and sign online for instant airport vehicle handover.",
    url: `${siteConfig.url}/checkin`,
  },
};

export default function CheckInPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] pt-28 sm:pt-36 pb-28 sm:pb-24 px-3 sm:px-4 font-sans print:pt-0 print:pb-0 print:bg-white print:min-h-0">
      <div className="container mx-auto px-0 sm:px-4 max-w-4xl print:max-w-none print:p-0 print:m-0">
        
        {/* Page Header (Hidden on Print) */}
        <div className="text-center mb-4 sm:mb-8 no-print print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2b3524]/10 text-[#2b3524] text-xs font-bold tracking-wider uppercase mb-2">
            <FileCheck className="w-3.5 h-3.5 text-[#d66b44]" />
            <span>Fast-Track Airport Concierge</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2b3524] tracking-tight">
            Online Rental Check-In
          </h1>
          <p className="mt-2 text-xs sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Pre-verify your driving license, identification, and rental agreement ahead of time for an express 3-minute vehicle handover at J.K.I.A, Wilson Airport, or your hotel.
          </p>

          {/* Trust Indicators: Compact, subtle inline strip without oversized mobile boxes */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-neutral-500 font-medium mt-3">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d66b44] shrink-0" />
              <span>Instant Airport Handover</span>
            </span>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d66b44] shrink-0" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="text-neutral-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d66b44] shrink-0" />
              <span>Kenya DPA Compliant</span>
            </span>
          </div>
        </div>

        {/* Interactive Check-In Form */}
        <CheckInForm />

      </div>
    </main>
  );
}
