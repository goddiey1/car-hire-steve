"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Settings, Users, Fuel, Briefcase, Compass, CalendarCheck } from "lucide-react";
import BookingModal from "./BookingModal";

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  price_per_day: number;
  currency: string;
  images: string[];
  image_alts: string[];
  specs: {
    seats: number;
    transmission: string;
    fuel_type: string;
  };
  drivetrain: string;
  luggage: string;
  badge?: string;
  features: string[];
  available: boolean;
}

function shortenLuggage(text: string) {
  return text.replace(" Large Suitcases", " bags").replace(" Suitcases", " bags");
}

function optimizeCloudinaryUrl(url: string) {
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_800,c_fill/');
  }
  return url;
}

export default function CarCard({ car }: { car: Car }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transmissionShort =
    car.specs.transmission === "Automatic" ? "Auto" : car.specs.transmission;

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 sm:aspect-[4/3] dark:bg-neutral-800">
          <Image
            src={optimizeCloudinaryUrl(car.images[activeImageIndex])}
            alt={car.image_alts ? car.image_alts[activeImageIndex] : `${car.brand} ${car.model} for hire in Nairobi — photo ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 sm:group-hover:scale-105"
          />

          {car.images.length > 1 && (
            <div className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-neutral-950/20 px-1.5 py-0.5 backdrop-blur-sm sm:bottom-2">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show ${car.brand} ${car.model} photo ${index + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(index);
                  }}
                  className={`flex h-8 w-7 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    index === activeImageIndex ? "after:h-2 after:w-4 after:rounded-full after:bg-white" : "after:h-2 after:w-2 after:rounded-full after:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-1.5 sm:flex-col sm:gap-2 items-start max-w-[70%]">
            <span className="px-2.5 py-1 sm:px-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[11px] sm:text-xs font-semibold rounded-full shadow-sm">
              {car.category}
            </span>
            {car.badge && (
              <span className="px-2.5 py-1 sm:px-3 bg-amber-400 text-amber-950 backdrop-blur-md text-[11px] sm:text-xs font-semibold rounded-full shadow-sm">
                {car.badge}
              </span>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
              <Link href={`/fleet/${car.slug}`} className="hover:text-blue-500 transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                  {car.brand} {car.model}
                </h3>
              </Link>
              <div className="flex items-baseline gap-1.5 sm:block sm:text-right sm:shrink-0 rounded-xl bg-blue-50 dark:bg-blue-500/10 px-3 py-2 sm:bg-transparent sm:dark:bg-transparent sm:px-0 sm:py-0 w-fit">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 sm:block">From</span>
                <span className="text-xl sm:text-2xl font-bold text-blue-500">
                  {car.currency} {car.price_per_day}
                </span>
                <span className="text-xs text-neutral-500">/day</span>
              </div>
            </div>

            {car.features?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {car.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-[11px] sm:text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-x-2 sm:gap-y-4 mb-4 sm:mb-6 py-3 sm:py-4 border-y border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:text-center sm:gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 sm:bg-transparent sm:dark:bg-transparent p-2.5 sm:p-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 sm:text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-xs text-neutral-700 dark:text-neutral-400 leading-tight">
                {car.specs.seats} seats
              </span>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:text-center sm:gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 sm:bg-transparent sm:dark:bg-transparent p-2.5 sm:p-0 sm:border-x sm:border-neutral-100 sm:dark:border-neutral-800">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 sm:text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-xs text-neutral-700 dark:text-neutral-400 leading-tight">
                <span className="sm:hidden">{transmissionShort}</span>
                <span className="hidden sm:inline">{car.specs.transmission}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:text-center sm:gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 sm:bg-transparent sm:dark:bg-transparent p-2.5 sm:p-0 col-span-2 sm:col-span-1">
              <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 sm:text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-xs text-neutral-700 dark:text-neutral-400 leading-tight">
                {car.specs.fuel_type}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:text-center sm:gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 sm:bg-transparent sm:dark:bg-transparent p-2.5 sm:p-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 sm:text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-xs text-neutral-700 dark:text-neutral-400 leading-tight">
                {car.drivetrain}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:text-center sm:gap-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 sm:bg-transparent sm:dark:bg-transparent p-2.5 sm:p-0 col-span-2 sm:col-span-2 sm:border-l sm:border-neutral-100 sm:dark:border-neutral-800">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 sm:text-neutral-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-xs text-neutral-700 dark:text-neutral-400 leading-tight">
                <span className="sm:hidden">{shortenLuggage(car.luggage)}</span>
                <span className="hidden sm:inline">{car.luggage}</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full min-h-[48px] py-3 sm:py-3.5 bg-neutral-900 dark:bg-white hover:bg-blue-500 dark:hover:bg-blue-500 text-white dark:text-neutral-900 hover:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98] text-sm sm:text-base mt-auto"
          >
            <CalendarCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">Check Availability</span>
            <span className="hidden sm:inline">Check Availability &amp; Book</span>
          </button>
        </div>
      </div>

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
