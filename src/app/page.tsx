import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";
import { Car } from "@/components/CarCard";
import FleetSection from "@/components/FleetSection";
import TransferForm from "@/components/TransferForm";
import ExpeditionHero from "@/components/ExpeditionHero";
import AirportFastLane from "@/components/AirportFastLane";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  const cars: Car[] = Array.isArray(carsData)
    ? carsData
    : ((carsData as { default?: Car[] }).default || []);

  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <ExpeditionHero />
      <AirportFastLane />
      <FleetSection cars={cars} />

      <section id="transfers" className="relative bg-expedition-sand py-14 dark:bg-expedition-forest sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
            <div className="w-full lg:w-1/2">
              <SectionHeading
                eyebrow="Airport arrivals"
                title="Seamless airport transfers"
                description="Skip the taxi queue after a long flight. We track your flight, meet you at arrivals, and drive you straight to your hotel or safari jump-off."
              />

              <ul className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
                {[
                  "Meet & Greet at arrivals",
                  "Free waiting for delays",
                  "Clean, air-conditioned vehicles",
                  "Fixed prices, no meters",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-expedition-forest/85 dark:text-expedition-sand/85 sm:text-base"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-expedition-forest dark:border-expedition-sand">
                      <Check className="h-3 w-3 text-expedition-forest dark:text-expedition-sand" aria-hidden="true" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/2">
              <TransferForm />
            </div>
          </div>
        </div>
      </section>

      <section
        id="trip-steps"
        className="border-t border-expedition-sand-dark/80 bg-white py-12 dark:border-expedition-forest-light/40 dark:bg-expedition-forest-light/20 sm:py-28"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            align="center"
            className="mb-10 sm:mb-16"
            title="Book in three steps"
            description="Same simple flow for self-drive hire or an airport pickup."
          />

          <ol className="mx-auto m-0 grid max-w-5xl list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-10">
            {[
              {
                step: "01",
                title: "Choose your vehicle",
                desc: "Browse the fleet, open a car card, and check availability for your dates.",
              },
              {
                step: "02",
                title: "Send an enquiry",
                desc: "Tell us pickup point, dates, and whether you want self-drive or a driver.",
              },
              {
                step: "03",
                title: "Confirm & go",
                desc: "We reply by email or WhatsApp — confirm details, pay securely, and meet us at the airport or depot.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="border-t border-expedition-sand-dark pt-6 dark:border-expedition-forest-light/60"
              >
                <span className="mb-4 block font-display text-4xl tracking-tight text-expedition-sand-dark dark:text-expedition-forest-light sm:text-5xl">
                  {item.step}
                </span>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-expedition-forest/75 dark:text-expedition-sand/75 sm:text-base">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
