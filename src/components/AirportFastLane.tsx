import Link from "next/link";
import { PlaneLanding } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AirportFastLane() {
  return (
    <section
      aria-label="Airport fast lane"
      className="border-y border-expedition-sand-dark/60 bg-expedition-sand-dark/40 py-6 dark:border-expedition-forest-light/40 dark:bg-expedition-forest-light/20 sm:py-8"
    >
      <div className="container mx-auto flex flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-expedition-accent/15 text-expedition-accent">
            <PlaneLanding className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
          </span>
          <div>
            <h2 className="font-display text-lg text-expedition-forest dark:text-expedition-sand sm:text-xl">
              Just landed at NBO?
            </h2>
            <p className="mt-1 text-sm text-expedition-forest/75 dark:text-expedition-sand/75">
              Skip route planning — jump straight to airport pickup and transfer details.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button href="#transfers" variant="primary" className="w-full sm:w-auto">
            Book pickup
          </Button>
          <Link
            href="/nairobi-airport-car-rental"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md px-5 text-sm font-semibold text-expedition-forest underline-offset-4 hover:underline dark:text-expedition-sand"
          >
            JKIA guide
          </Link>
        </div>
      </div>
    </section>
  );
}
