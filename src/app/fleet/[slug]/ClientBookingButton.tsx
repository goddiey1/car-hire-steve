"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function ClientBookingButton({ car }: { car: any }) {
  const handleWhatsApp = () => {
    if (!siteConfig.whatsapp) return;
    const text = `Hello Stevinson Adventure Safari! I would like to check availability and book the *${car.brand} ${car.model}* (${car.category}) at KES ${car.price_per_day.toLocaleString()}/day.\n\nPlease let me know its availability for my travel dates.`;
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="w-full min-h-[56px] py-4 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold text-base sm:text-lg rounded-xl transition-all shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] active:scale-[0.98]"
    >
      <MessageCircle className="w-6 h-6 shrink-0" />
      <span>Book via WhatsApp</span>
    </button>
  );
}
