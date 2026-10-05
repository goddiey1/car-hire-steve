"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import Button from "@/components/ui/Button";

export default function ClientBookingButton({
  car,
}: {
  car: {
    brand: string;
    model: string;
    price_per_day: number;
    currency: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="w-full min-h-[56px] text-lg"
      >
        <CalendarCheck className="h-6 w-6" />
        <span>Check Availability & Book</span>
      </Button>

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
