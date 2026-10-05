"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappGreeting } from "@/lib/site";
import Button from "@/components/ui/Button";

export default function WhatsAppFloat() {
  const number = siteConfig.whatsapp;
  const message = encodeURIComponent(
    `${whatsappGreeting()} I'd like to enquire about car hire or an airport transfer.`,
  );

  if (!number) return null;

  return (
    <Button
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="fixed z-40 hidden shadow-lg shadow-[#25D366]/25 sm:bottom-6 sm:right-6 sm:inline-flex"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="text-sm font-semibold">WhatsApp</span>
    </Button>
  );
}
