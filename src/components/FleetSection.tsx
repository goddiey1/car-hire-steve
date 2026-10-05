import CarCard, { Car } from "./CarCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FleetSection({ cars }: { cars: Car[] }) {
  return (
    <section id="fleet" className="relative bg-expedition-sand/50 py-14 dark:bg-expedition-forest-light/20 sm:py-28">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeading
          className="mb-8 sm:mb-14"
          eyebrow="Our fleet"
          title="Expedition vehicles"
          description="Self-drive or with a driver. Tap a vehicle to check dates and send an enquiry."
        >
          <p className="mt-3 text-xs font-medium text-neutral-500 sm:hidden">
            Tap a vehicle to check dates and get your quote.
          </p>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
