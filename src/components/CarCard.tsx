"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Users, Compass } from "lucide-react";
import { Card } from "@heroui/react";
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

function optimizeCloudinaryUrl(url: string) {
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_1000,c_fit/");
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
      <Card className="group flex h-full flex-col border-0 bg-transparent shadow-none">
        <Link
          href={`/fleet/${car.slug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-expedition-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expedition-accent focus-visible:ring-offset-2"
        >
          <Image
            src={optimizeCloudinaryUrl(car.images[activeImageIndex])}
            alt={
              car.image_alts
                ? car.image_alts[activeImageIndex]
                : `${car.brand} ${car.model} for hire in Nairobi — photo ${activeImageIndex + 1}`
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-10"
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-expedition-forest/90 via-expedition-forest/25 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 sm:left-5 sm:top-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-expedition-sand/90 sm:text-[11px]">
              {car.category}
            </span>
            {car.badge && (
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-expedition-accent sm:text-[11px]">
                {car.badge}
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
            <Card.Title className="font-display text-xl leading-tight tracking-tight text-expedition-sand sm:text-3xl">
              {car.brand} {car.model}
            </Card.Title>
          </div>
        </Link>

        {car.images.length > 1 && (
          <div className="mt-3 flex gap-1.5" role="tablist" aria-label={`${car.brand} ${car.model} photos`}>
            {car.images.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeImageIndex}
                aria-label={`Show ${car.brand} ${car.model} photo ${index + 1}`}
                onClick={() => setActiveImageIndex(index)}
                className={`h-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expedition-accent ${
                  index === activeImageIndex
                    ? "w-6 bg-expedition-accent"
                    : "w-1.5 bg-expedition-forest/25 hover:bg-expedition-forest/40 dark:bg-expedition-sand/30"
                }`}
              />
            ))}
          </div>
        )}

        <Card.Content className="mt-4 flex flex-1 flex-col p-0">
          <div className="flex items-end justify-between gap-3 border-b border-expedition-sand-dark/70 pb-4 dark:border-expedition-forest-light/40">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-expedition-forest/50 dark:text-expedition-sand/50">
                From
              </p>
              <p className="mt-0.5 text-xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
                {priceLabel}
                <span className="text-sm font-normal text-expedition-forest/55 dark:text-expedition-sand/55">
                  {" "}
                  / day
                </span>
              </p>
            </div>
            <p className="max-w-[45%] text-right text-xs leading-snug text-expedition-forest/65 dark:text-expedition-sand/65">
              {transmissionShort} · {car.specs.fuel_type}
            </p>
          </div>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-expedition-forest/75 dark:text-expedition-sand/75">
            <li className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              {car.specs.seats} seats
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-expedition-accent" aria-hidden="true" strokeWidth={1.5} />
              {car.drivetrain}
            </li>
          </ul>

          <Button
            type="button"
            onPress={() => setIsModalOpen(true)}
            className="relative z-10 mt-5 w-full sm:mt-6"
            fullWidth
          >
            <span className="sm:hidden">Check availability</span>
            <span className="hidden sm:inline">Check availability &amp; book</span>
          </Button>
        </Card.Content>
      </Card>

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
