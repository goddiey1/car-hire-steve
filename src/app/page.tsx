import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";
import { Car } from "@/components/CarCard";
import FleetSection from "@/components/FleetSection";
import TransferForm from "@/components/TransferForm";
import LongTermAndContactSection from "@/components/LongTermAndContactSection";
import Image from "next/image";
import { ShieldCheck, Clock, MapPin, MessageSquare, Compass, CheckCircle2, Car as CarIcon } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  }
};

export default function Home() {
  const cars: Car[] = Array.isArray(carsData) ? carsData : ((carsData as { default?: Car[] }).default || []);

  return (
    <main id="main-content" className="flex flex-col min-h-screen bg-[#f7f5f0]">
      
      {/* Stitch Design Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-40 pb-56 sm:pt-48 sm:pb-64 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dpyqxho1q/image/upload/v1791315382/homepage_img_luz0vq.jpg"
            alt="Safari vehicle in Kenya"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay to make text readable and blend at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#f7f5f0] z-10" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 mx-auto px-4 text-center max-w-5xl">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b7355]/80 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8">
            <Compass className="w-3.5 h-3.5" />
            Premium Safaris | Based in Nairobi, Kenya
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg font-serif">
            Your Kenyan Journey Begins
            <span className="block italic font-light mt-2 sm:mt-4 text-white/90">The Moment You Touch Down</span>
          </h1>

          <p className="mt-6 sm:mt-8 mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-medium drop-shadow-md">
            Boutique inside-terminal airport transfers from J.K.I.A & Wilson Airport, paired with rugged 4x4 expedition cruisers custom-built for the Masai Mara, Amboseli, and beyond.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#transfers"
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 bg-[#d66b44] hover:bg-[#c55a33] text-white text-sm font-bold tracking-wide uppercase rounded transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4 mr-2" /> Book Airport Transfer
            </a>
            <a
              href="#fleet"
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/30 text-white text-sm font-bold tracking-wide uppercase rounded transition-all shadow-lg"
            >
              <CarIcon className="w-4 h-4 mr-2" /> Browse Safari Fleet
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-10 text-white/90">
            <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="w-6 h-6 rounded-full bg-[#8b7355] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
              <div className="text-left">
                <p className="text-[11px] font-bold tracking-wide">Inside-Terminal Meet & Greet</p>
                <p className="text-[9px] text-white/70">Outside baggage claim</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="w-6 h-6 rounded-full bg-[#8b7355] flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 text-white" />
              </span>
              <div className="text-left">
                <p className="text-[11px] font-bold tracking-wide">Automatic Flight Delay Tracking</p>
                <p className="text-[9px] text-white/70">No extra charges for delays</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="w-6 h-6 rounded-full bg-[#8b7355] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </span>
              <div className="text-left">
                <p className="text-[11px] font-bold tracking-wide">Comprehensive Safari Cover</p>
                <p className="text-[9px] text-white/70">Full roadside assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Booking Widget Area */}
      <section id="transfers" className="relative z-30 -mt-24 sm:-mt-32 container mx-auto px-4 max-w-6xl">
        <TransferForm />
      </section>

      <div className="pt-24 bg-[#f7f5f0]">
        <FleetSection cars={cars} />
      </div>

      {/* Long-Term Hires & Talk To Us Section */}
      <LongTermAndContactSection />

    </main>
  );
}
