"use client";

import { useState } from "react";
import CarCard, { Car } from "./CarCard";
import { ShieldCheck, Navigation2, BadgeCheck, CheckCircle2, FileText } from "lucide-react";

export default function FleetSection({ cars }: { cars: Car[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Vehicles", count: cars.length },
    { id: "suv", label: "Expedition 4x4 Cruisers", count: cars.filter(c => c.category === "SUV").length },
    { id: "minivan", label: "JKIA Airport Shuttles", count: cars.filter(c => c.category === "Minivan" || c.category === "Estate").length },
  ];

  const filteredCars = activeTab === "all" 
    ? cars 
    : cars.filter(c => {
        if (activeTab === "suv") return c.category === "SUV";
        if (activeTab === "minivan") return c.category === "Minivan" || c.category === "Estate";
        return true;
      });

  return (
    <section id="fleet" className="bg-[#f7f5f0] py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[#d66b44] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Pristine Kenyan Overland Engineering
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2b3524] mb-4">
            Our Exclusive Safari & VIP Fleet
          </h2>
          <p className="text-[#2b3524]/70 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Every expedition vehicle in the Stevinson Adventure Safari garage is purpose-built in Nairobi for extreme terrain, photography comfort, high-frequency radio connectivity, and effortless highway cruising.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 text-[11px] font-bold tracking-wider uppercase rounded-full transition-all ${
                activeTab === tab.id 
                  ? "bg-[#1a2119] text-white border border-[#1a2119]" 
                  : "bg-white text-[#2b3524] border border-[#e5e0d8] hover:border-[#1a2119]/30"
              }`}
            >
              {tab.label} {tab.id === "all" ? `(${tab.count})` : ""}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Guarantee Banner & Contract Download */}
        <div className="mt-16 bg-white border border-[#e5e0d8] rounded p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a2119] rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-[#2b3524] font-serif font-bold text-lg">Stevinson Transparent Rental Promise</h4>
              <p className="text-[#2b3524]/60 text-xs mt-1 max-w-xl">From unlimited mileage options to 24/7 roadside assistance anywhere in East Africa, your peace of mind is included.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0 w-full lg:w-auto border-t lg:border-t-0 pt-6 lg:pt-0 border-neutral-100">
            <div className="flex flex-col gap-3 text-xs font-bold text-[#2b3524] uppercase tracking-wider">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d66b44]" /> No Hidden Fees</div>
              <div className="flex items-center gap-2"><Navigation2 className="w-4 h-4 text-[#d66b44]" /> GPS Tracked Fleet</div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#d66b44]" /> KATO Registered</div>
            </div>
            
            <div className="h-full w-px bg-neutral-200 hidden sm:block"></div>
            
            <a 
              href="/Stevinson_Rental_Contract.pdf" 
              download="Stevinson_Adventure_Safari_Contract.pdf"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-[#2b3524] hover:bg-[#1a2119] text-white text-xs font-bold tracking-widest uppercase rounded transition-colors shadow-md group"
            >
              <FileText className="w-4 h-4 text-[#d66b44] group-hover:scale-110 transition-transform" />
              Download Rental Contract
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
