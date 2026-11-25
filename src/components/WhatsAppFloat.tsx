"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function WhatsAppFloat() {
  const number = siteConfig.whatsapp;
  const message = encodeURIComponent(
    "Hello Stevinson Adventure Safari! I'd like to enquire about car hire or an airport transfer."
  );

  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Stevinson Adventure Safari on WhatsApp"
      className="fixed z-40 hidden items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-transform hover:scale-105 hover:bg-[#1ebd5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:flex sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3.5 print:hidden no-print"
    >
      <MessageCircle className="h-6 w-6 sm:h-5 sm:w-5" aria-hidden="true" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
