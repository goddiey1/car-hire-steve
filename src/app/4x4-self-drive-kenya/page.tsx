import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";
import CarCard from "@/components/CarCard";
import Link from "next/link";
import { ChevronRight, ShieldCheck, MapPin, Compass } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "4x4 Self Drive Car Hire in Kenya | Nairobi Safari Rentals",
  description:
    "Explore Kenya at your own pace with our reliable 4x4 self-drive car rentals in Nairobi. Toyota Prado, RAV4, and more. Instant WhatsApp booking.",
  alternates: {
    canonical: `${siteConfig.url}/4x4-self-drive-kenya`,
  },
};

export default function SelfDriveKenyaPage() {
  const fourByFourCars = carsData.filter(
    (car) =>
      car.drivetrain.includes("4WD") ||
      car.drivetrain.includes("4x4") ||
      car.category === "SUV"
  );

  return (
    <main id="main-content" className="bg-expedition-sand pb-16 pt-24 dark:bg-expedition-forest sm:pb-24 sm:pt-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="hide-scrollbar mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-expedition-forest/60 dark:text-expedition-sand/60">
          <Link href="/" className="transition-colors hover:text-expedition-accent">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-expedition-forest dark:text-expedition-sand">
            4x4 Self Drive Kenya
          </span>
        </nav>

        <p className="mb-8 text-center text-sm">
          <Link
            href="/#fleet"
            className="font-semibold text-expedition-accent underline-offset-4 hover:underline"
          >
            ← Browse the full fleet on {siteConfig.name}
          </Link>
        </p>

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-expedition-accent">
            Self Drive
          </p>
          <h1 className="mb-6 font-display text-4xl leading-tight tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-5xl md:text-6xl">
            Premium 4x4 Self Drive Car Hire in Kenya
          </h1>
          <p className="mb-8 text-lg text-expedition-forest/75 dark:text-expedition-sand/75 sm:text-xl">
            Experience the freedom of exploring Kenya&apos;s stunning landscapes, from the Maasai Mara
            to the Great Rift Valley, with our reliable and fully serviced 4x4 vehicles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#available-4x4">View Available 4x4s</Button>
          </div>
        </div>

        <div className="mb-20 grid gap-px overflow-hidden rounded-lg border border-expedition-sand-dark/80 bg-expedition-sand-dark/80 md:grid-cols-3 dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/50">
          {[
            {
              icon: Compass,
              title: "Unlimited Freedom",
              desc: "Create your own itinerary and explore Kenya at your own pace without being tied to a tour guide's schedule.",
            },
            {
              icon: ShieldCheck,
              title: "Fully Serviced & Insured",
              desc: "Our 4x4 vehicles are rigorously maintained and come with comprehensive insurance for your peace of mind on rough terrains.",
            },
            {
              icon: MapPin,
              title: "Free Airport Pickup",
              desc: "We offer free vehicle handover at Jomo Kenyatta International Airport (JKIA) or your hotel in Nairobi.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-8 dark:bg-expedition-forest">
              <Icon
                className="mb-6 h-7 w-7 text-expedition-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
                {title}
              </h3>
              <p className="text-expedition-forest/70 dark:text-expedition-sand/70">{desc}</p>
            </div>
          ))}
        </div>

        <div id="available-4x4" className="mb-20">
          <h2 className="mb-10 text-center font-display text-3xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-4xl">
            Our 4x4 Fleet
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {fourByFourCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>

        <article className="article mx-auto max-w-4xl rounded-lg border border-expedition-sand-dark/80 bg-white p-8 dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/20 sm:p-12">
          <h2>Why Choose a 4x4 for Self-Drive in Kenya?</h2>
          <p>
            Kenya is a country of diverse and breathtaking landscapes, but navigating its national
            parks and off-the-beaten-path destinations requires a reliable vehicle. A 4x4 is
            essential for traversing the rugged terrains of the Maasai Mara, Amboseli, and Tsavo.
          </p>
          <h3>What to expect when self-driving</h3>
          <ul>
            <li>
              <strong>Road Conditions:</strong> While major highways in Kenya are paved, the roads
              leading to and inside national parks are mostly dirt tracks that can become muddy
              during the rainy season.
            </li>
            <li>
              <strong>Navigation:</strong> We recommend downloading offline maps on Google Maps or
              using a dedicated GPS.
            </li>
            <li>
              <strong>Safety:</strong> Avoid driving at night, especially on highways, due to
              limited visibility and wildlife crossings.
            </li>
          </ul>
          <h3>Our Most Popular 4x4 Rental</h3>
          <p>
            The <strong>Toyota Prado TX</strong> is the gold standard for self-drive safaris in
            Kenya. It offers the perfect balance of rugged off-road capability, high ground
            clearance, and premium interior comfort.
          </p>
        </article>
      </div>
    </main>
  );
}
