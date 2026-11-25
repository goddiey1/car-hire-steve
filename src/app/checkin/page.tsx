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
        <div className="text-center mb-8 sm:mb-12 no-print print:hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2b3524]/10 text-[#2b3524] text-xs font-bold tracking-wider uppercase mb-3">
            <FileCheck className="w-3.5 h-3.5 text-[#d66b44]" />
            <span>Fast-Track Airport Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2b3524] tracking-tight">
            Online Rental Check-In
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Pre-verify your driving license, identification, and rental agreement ahead of time for an express 3-minute vehicle handover at J.K.I.A, Wilson Airport, or your hotel.
          </p>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-6">
            <div className="flex items-center justify-center gap-2 bg-white/80 border border-neutral-200/80 rounded-lg py-2.5 px-3 text-xs text-neutral-700 font-medium">
              <Clock className="w-4 h-4 text-[#d66b44] shrink-0" />
              <span>Instant Airport Handover</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/80 border border-neutral-200/80 rounded-lg py-2.5 px-3 text-xs text-neutral-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#d66b44] shrink-0" />
              <span>256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/80 border border-neutral-200/80 rounded-lg py-2.5 px-3 text-xs text-neutral-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#d66b44] shrink-0" />
              <span>Kenya DPA Compliant</span>
            </div>
          </div>
        </div>

        {/* Interactive Check-In Form */}
        <CheckInForm />

      </div>
    </main>
  );
}
