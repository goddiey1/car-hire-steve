"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Settings, Users, Fuel, Briefcase, Compass } from "lucide-react";
import BookingModal from "./BookingModal";
import Button from "@/components/ui/Button";

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
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_800,c_fit/");
  }
  return url;
}

export default function CarCard({ car }: { car: Car }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transmissionShort =
    car.specs.transmission === "Automatic" ? "Auto" : car.specs.transmission;

  const priceLabel = `${car.currency} ${car.price_per_day.toLocaleString()}`;

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-expedition-sand-dark/80 bg-white dark:border-expedition-forest-light/50 dark:bg-expedition-forest">
        <div className="relative aspect-[16/10] overflow-hidden bg-expedition-sand sm:aspect-[4/3] dark:bg-expedition-forest-light/40">
          <Image
            src={optimizeCloudinaryUrl(car.images[activeImageIndex])}
            alt={
              car.image_alts
                ? car.image_alts[activeImageIndex]
                : `${car.brand} ${car.model} for hire in Nairobi — photo ${activeImageIndex + 1}`
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 sm:group-hover:scale-105"
          />

          {car.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show ${car.brand} ${car.model} photo ${index + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expedition-accent ${
                    index === activeImageIndex
                      ? "w-4 bg-expedition-accent"
                      : "w-1.5 bg-expedition-forest/30 dark:bg-expedition-sand/40"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-wrap items-start gap-1.5 sm:left-4 sm:top-4">
            <span className="rounded-md bg-expedition-sand px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-expedition-forest shadow-sm dark:bg-expedition-forest dark:text-expedition-sand sm:text-xs">
              {car.category}
            </span>
            {car.badge && (
              <span className="rounded-md bg-expedition-accent px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white sm:text-xs">
                {car.badge}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-grow flex-col p-4 sm:p-6">
          <div className="mb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <Link
                href={`/fleet/${car.slug}`}
                className="transition-colors hover:text-expedition-accent"
              >
                <h3 className="font-display text-xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-2xl">
                  {car.brand} {car.model}
                </h3>
              </Link>
              <div className="shrink-0 sm:text-right">
                <span className="text-xs text-expedition-forest/55 dark:text-expedition-sand/55">From</span>
                <p className="text-lg font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-xl">
                  {priceLabel}
                  <span className="text-xs font-normal text-expedition-forest/55 dark:text-expedition-sand/55"> / day</span>
                </p>
              </div>
            </div>

            {car.features?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {car.features.map((feature, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-expedition-sand-dark/80 px-2 py-0.5 text-[11px] text-expedition-forest/70 dark:border-expedition-forest-light/50 dark:text-expedition-sand/70 sm:text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-5 grid grid-cols-2 border-y border-expedition-sand-dark/70 py-3 dark:border-expedition-forest-light/40 sm:grid-cols-5 sm:divide-x sm:divide-expedition-sand-dark/70 dark:sm:divide-expedition-forest-light/40 sm:py-4">
            <div className="flex items-center gap-2 p-2 sm:flex-col sm:items-center sm:gap-1.5 sm:p-0 sm:text-center">
              <Users className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs text-expedition-forest/75 dark:text-expedition-sand/75">
                {car.specs.seats} seats
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:flex-col sm:items-center sm:gap-1.5 sm:p-0 sm:text-center">
              <Settings className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs text-expedition-forest/75 dark:text-expedition-sand/75">
                <span className="sm:hidden">{transmissionShort}</span>
                <span className="hidden sm:inline">{car.specs.transmission}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:flex-col sm:items-center sm:gap-1.5 sm:p-0 sm:text-center">
              <Fuel className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs text-expedition-forest/75 dark:text-expedition-sand/75">
                {car.specs.fuel_type}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:flex-col sm:items-center sm:gap-1.5 sm:p-0 sm:text-center">
              <Compass className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs text-expedition-forest/75 dark:text-expedition-sand/75">
                {car.drivetrain}
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-2 p-2 sm:col-span-1 sm:flex-col sm:items-center sm:gap-1.5 sm:p-0 sm:text-center">
              <Briefcase className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs text-expedition-forest/75 dark:text-expedition-sand/75">
                <span className="sm:hidden">{shortenLuggage(car.luggage)}</span>
                <span className="hidden sm:inline">{car.luggage}</span>
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-auto w-full"
          >
            <span className="sm:hidden">Check Availability</span>
            <span className="hidden sm:inline">Check Availability &amp; Book</span>
          </Button>
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
