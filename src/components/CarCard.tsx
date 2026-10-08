"use client";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";

export type Car = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  price_per_day: number;
  currency: string;
  images: string[];
  specs: {
    seats: number;
    transmission: string;
    fuel_type: string;
  };
  drivetrain: string;
  luggage: string;
  badge: string;
  features: string[];
};

import { useCurrency } from "./CurrencyProvider";

export default function CarCard({ car }: { car: Car }) {
  const { convertPrice } = useCurrency();
  const price = convertPrice(car.price_per_day);

  const handleWhatsApp = () => {
    if (!siteConfig.whatsapp) return;
    const text = `Hello Stevinson Adventure Safari! I am interested in booking the ${car.brand} ${car.model} (${price.symbol}${price.amount}/day).`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e5e0d8] flex flex-col h-full font-sans group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-[#f7f5f0] overflow-hidden">
        {/* Badge */}
        {car.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#d66b44] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-md">
            {car.badge}
          </div>
        )}
        
        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 z-10 bg-[#2b3524]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded shadow-lg border border-white/10">
          <span className="text-sm font-serif font-bold">{price.symbol}{price.amount}</span>
          <span className="text-[10px] text-white/70 ml-1">/ day</span>
        </div>

        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-[#2b3524] mb-2">
          {car.brand} {car.model}
        </h3>
        
        {/* Features / Short description */}
        <p className="text-[#2b3524]/70 text-xs leading-relaxed mb-5 min-h-[36px]">
          {car.features.join(" • ")} • Perfect for Kenyan terrain and comfort.
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] text-[#2b3524]/80 font-medium mb-6">
          <div className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#d66b44] mt-1.5 shrink-0"></span>
            <div className="flex flex-col">
              <span className="text-neutral-400 text-[9px] uppercase tracking-wider mb-0.5">Seating</span>
              <span>{car.specs.seats} Window Seats</span>
            </div>
          </div>
          
          <div className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#d66b44] mt-1.5 shrink-0"></span>
            <div className="flex flex-col">
              <span className="text-neutral-400 text-[9px] uppercase tracking-wider mb-0.5">Drivetrain</span>
              <span>{car.drivetrain} {car.specs.transmission}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#d66b44] mt-1.5 shrink-0"></span>
            <div className="flex flex-col">
              <span className="text-neutral-400 text-[9px] uppercase tracking-wider mb-0.5">Cargo Capacity</span>
              <span>{car.luggage}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#d66b44] mt-1.5 shrink-0"></span>
            <div className="flex flex-col">
              <span className="text-neutral-400 text-[9px] uppercase tracking-wider mb-0.5">Fuel</span>
              <span>{car.specs.fuel_type}</span>
            </div>
          </div>
        </div>

        {/* Push button to bottom */}
        <div className="mt-auto pt-4 border-t border-[#f7f5f0]">
          <button 
            onClick={handleWhatsApp}
            className="w-full flex justify-center items-center gap-2 bg-[#1a2119] hover:bg-[#2b3524] text-white text-[11px] font-bold uppercase tracking-widest py-3.5 rounded transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" /> Reserve via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
