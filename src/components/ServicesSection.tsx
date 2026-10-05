"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Plane, Building2, Compass, Car } from "lucide-react";

const services = [
  {
    title: "Self Drive",
    subtitle: "Explore at your pace",
    icon: Car,
    image: "https://res.cloudinary.com/dpyqxho1q/image/upload/v1785354191/self_drive_vsesu2.jpg",
    link: "/4x4-self-drive-kenya"
  },
  {
    title: "Airport Transfers",
    subtitle: "On-time, every time",
    icon: Plane,
    image: "https://res.cloudinary.com/dpyqxho1q/image/upload/v1785354191/airport_transfers_djj4z3.jpg",
    link: "/nairobi-airport-car-rental"
  },
  {
    title: "Corporate Hire",
    subtitle: "For business needs",
    icon: Building2,
    image: "https://res.cloudinary.com/dpyqxho1q/image/upload/v1785354196/corporate-car-hire-eldoret-airport-eliners_muh0gf.png",
    link: "#fleet"
  }
];

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-24 bg-neutral-900 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Area */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-white max-w-[200px] sm:max-w-md leading-[1.2]">
            What would you like to explore?
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2 sm:gap-3 mb-1">
            <button 
              onClick={() => scroll('left')}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-neutral-700 bg-neutral-800/80 flex items-center justify-center text-white hover:bg-neutral-700 hover:border-neutral-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-neutral-700 bg-neutral-800/80 flex items-center justify-center text-white hover:bg-neutral-700 hover:border-neutral-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 sm:pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link 
                key={index} 
                href={service.link}
                className="group relative flex-none w-[200px] h-[260px] sm:w-[280px] sm:h-[360px] overflow-hidden rounded-2xl snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 200px, 280px"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 z-10" />

                {/* Top Icon */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 z-20">
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 shadow-sm leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-neutral-300 text-[13px] sm:text-base font-medium">
                    {service.subtitle}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
