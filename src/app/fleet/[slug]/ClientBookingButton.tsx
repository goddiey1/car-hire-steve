"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import BookingModal from "@/components/BookingModal";

export default function ClientBookingButton({ car }: { car: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full min-h-[56px] py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98]"
      >
        <CalendarCheck className="w-6 h-6" />
        <span>Check Availability & Book</span>
      </button>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carBrand={car.brand}
        carModel={car.model}
        price={car.price_per_day}
        currency={car.currency}
      />
    </>
  );
}
