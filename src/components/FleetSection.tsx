import { Car } from "./CarCard";
import FleetCarousel from "./FleetCarousel";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FleetSection({ cars }: { cars: Car[] }) {
  return (
    <section id="fleet" className="relative min-w-0 overflow-x-clip bg-expedition-sand/50 py-14 dark:bg-expedition-forest-light/20 sm:py-28">
      <div className="container relative z-10 mx-auto min-w-0 px-4 sm:px-6">
        <SectionHeading
          className="mb-8 sm:mb-10"
          eyebrow="Our fleet"
          title="Expedition vehicles"
          description="Self-drive or with a driver. Slide through the lineup, then tap a vehicle to check dates."
        />

        <FleetCarousel cars={cars} />
      </div>
    </section>
  );
}
