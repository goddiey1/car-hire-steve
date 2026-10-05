"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import CarCard, { Car } from "./CarCard";

/** Index of the snap-start card closest to the track's left edge. */
function nearestCardIndex(track: HTMLElement): number {
  const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-fleet-card]"));
  if (!cards.length) return 0;
  const origin = cards[0].offsetLeft;
  const marker = track.scrollLeft + 8;
  let closest = 0;
  let closestDist = Infinity;
  cards.forEach((card, index) => {
    const left = card.offsetLeft - origin;
    const dist = Math.abs(left - marker);
    if (dist < closestDist) {
      closestDist = dist;
      closest = index;
    }
  });
  return closest;
}

export default function FleetCarousel({ cars }: { cars: Car[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const sync = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanPrev(scrollLeft > 8);
      setCanNext(scrollLeft + clientWidth < scrollWidth - 8);
      const closest = nearestCardIndex(el);
      setActiveIndex((prev) => (prev === closest ? prev : closest));
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [cars.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-fleet-card]");
    const nextIndex = Math.max(0, Math.min(cars.length - 1, activeIndex + direction));
    const target = cards[nextIndex];
    const first = cards[0];
    if (!target || !first) return;
    setActiveIndex(nextIndex);
    el.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: "smooth" });
  };

  const goToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-fleet-card]");
    const target = cards[index];
    const first = cards[0];
    if (!target || !first) return;
    setActiveIndex(index);
    el.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="relative min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-5">
        <p className="min-w-0 text-xs text-expedition-forest/60 dark:text-expedition-sand/60">
          <span className="sm:hidden">Swipe to browse</span>
          <span className="hidden sm:inline">Slide through the fleet</span>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            isIconOnly
            variant="outline"
            onPress={() => scrollByCard(-1)}
            isDisabled={!canPrev}
            aria-label="Previous vehicles"
            className="min-h-11 min-w-11"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            isIconOnly
            variant="outline"
            onPress={() => scrollByCard(1)}
            isDisabled={!canNext}
            aria-label="Next vehicles"
            className="min-h-11 min-w-11"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Full-bleed swipe track on phones; stays inside container from sm up */}
      <div className="-mx-4 min-w-0 sm:mx-0">
        <div
          ref={trackRef}
          data-fleet-track
          className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 touch-pan-x sm:gap-6 sm:px-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              data-fleet-card
              className="w-[min(100%,calc(100vw-2.75rem))] shrink-0 snap-start sm:w-[min(100%,24rem)] md:w-[min(100%,22rem)] lg:w-[min(100%,20rem)]"
            >
              <CarCard car={car} />
            </div>
          ))}
          <div className="w-2 shrink-0 sm:w-4" aria-hidden="true" />
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5"
        role="tablist"
        aria-label="Fleet slides"
      >
        {cars.map((car, index) => (
          <button
            key={car.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${car.brand} ${car.model}`}
            onClick={() => goToIndex(index)}
            className="min-h-11 min-w-11 rounded-full p-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expedition-accent"
          >
            <span
              className={`mx-auto block h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-expedition-accent"
                  : "w-2.5 bg-expedition-forest/30 dark:bg-expedition-sand/35"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
