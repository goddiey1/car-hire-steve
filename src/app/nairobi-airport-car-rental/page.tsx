import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import TransferForm from "@/components/TransferForm";
import Link from "next/link";
import { ChevronRight, Plane, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Nairobi Airport Car Rental & Transfers | JKIA Pickups",
  description:
    "Reliable airport car rental and transfers at Jomo Kenyatta International Airport (JKIA) and Wilson Airport in Nairobi. Book your pickup today.",
  alternates: {
    canonical: `${siteConfig.url}/nairobi-airport-car-rental`,
  },
};

export default function AirportRentalPage() {
  return (
    <main
      id="main-content"
      className="bg-expedition-sand pb-16 pt-24 dark:bg-expedition-forest sm:pb-24 sm:pt-32"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="hide-scrollbar mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-expedition-forest/60 dark:text-expedition-sand/60">
          <Link href="/" className="transition-colors hover:text-expedition-accent">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-expedition-forest dark:text-expedition-sand">
            Nairobi Airport Car Rental
          </span>
        </nav>

        <p className="mb-8 text-sm">
          <Link
            href="/#fleet"
            className="font-semibold text-expedition-accent underline-offset-4 hover:underline"
          >
            ← Browse the fleet on {siteConfig.name}
          </Link>
        </p>

        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-expedition-accent">
              Airport Transfers
            </p>
            <h1 className="mb-6 font-display text-4xl leading-tight tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-5xl md:text-6xl">
              Nairobi Airport Car Rental &amp; Transfers
            </h1>
            <p className="mb-8 text-lg text-expedition-forest/75 dark:text-expedition-sand/75 sm:text-xl">
              Skip the taxi queues. Whether you need a self-drive rental waiting for you at the
              parking lot, or a chauffeur-driven transfer to your hotel, we ensure a seamless
              arrival at JKIA and Wilson Airport.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Plane,
                  title: "Flight Tracking",
                  desc: "We monitor your flight and adjust for delays automatically.",
                },
                {
                  icon: Clock,
                  title: "24/7 Availability",
                  desc: "No matter what time you land, your vehicle will be ready.",
                },
                {
                  icon: ShieldCheck,
                  title: "Meet & Greet",
                  desc: "Our representative will be waiting at arrivals with a name sign.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-expedition-sand-dark/80 bg-white dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/20">
                    <Icon
                      className="h-6 w-6 text-expedition-accent"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
                      {title}
                    </h3>
                    <p className="text-expedition-forest/70 dark:text-expedition-sand/70">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <TransferForm />
          </div>
        </div>

        <article className="article mx-auto max-w-4xl rounded-lg border border-expedition-sand-dark/80 bg-white p-8 dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/20 sm:p-12">
          <h2>Renting a Car at Jomo Kenyatta International Airport (JKIA)</h2>
          <p>
            JKIA is East Africa&apos;s busiest airport and the main gateway for visitors to Kenya.
            Navigating arrival procedures and finding reliable transportation can be stressful after
            a long flight. <strong>{siteConfig.name}</strong> eliminates this stress by providing
            premium car hire services directly at the airport terminals.
          </p>

          <h3>Self-Drive Airport Pickup</h3>
          <p>
            If you&apos;ve booked a self-drive rental with us, we will have the car ready at the
            airport parking. A representative will meet you at the arrivals hall, assist with your
            luggage, and complete the vehicle handover process in less than 15 minutes.
          </p>

          <h3>Chauffeur-Driven Airport Transfers</h3>
          <p>
            Prefer to relax after your flight? Our professional chauffeurs will whisk you away to
            your hotel in Nairobi CBD, Westlands, or beyond. We offer a range of vehicles from
            comfortable sedans to luxury SUVs and spacious minivans for groups.
          </p>

          <h3>Wilson Airport Car Hire</h3>
          <p>
            Flying in from a domestic safari? We also offer direct pickups and car rental services
            at Wilson Airport, connecting you seamlessly from the bush to the city.
          </p>
        </article>
      </div>
    </main>
  );
}
