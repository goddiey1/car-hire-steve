import CarCard, { Car } from "./CarCard";

export default function FleetSection({ cars }: { cars: Car[] }) {
  return (
    <section id="fleet" className="relative overflow-hidden bg-neutral-50 py-14 dark:bg-neutral-950 sm:py-32">
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
          <span className="text-blue-500 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2 sm:mb-4 block">
            Premium Selection
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-6 tracking-tight">
            Our Exceptional Fleet
          </h2>
          <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed px-1">
            From city cruisers to safari-ready SUVs — all maintained to international standards.
          </p>
          <p className="mt-3 text-xs font-medium text-neutral-500 dark:text-neutral-500 sm:hidden">
            Tap a vehicle to check dates and get your quote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
