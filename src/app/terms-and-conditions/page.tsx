import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Car hire terms, insurance information, and vehicle-use conditions.",
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`,
  },
};

const sections = [
  {
    title: "Hire period and vehicle return",
    items: [
      "You are responsible for the vehicle for the full period it is hired to you.",
      "The full amount due must be settled by the time the vehicle is collected.",
      "The vehicle must be returned to its original collection point, or another return location confirmed by the company.",
      "You must return the vehicle on or before the agreed return date and comply with the conditions of the hire agreement.",
    ],
  },
  {
    title: "Driver requirements",
    items: [
      "The driver must hold a valid driving licence and the required driving experience stated in the hire agreement.",
      "The driver must provide valid identification and a valid driving licence when requested.",
      "Only the authorised hirer may drive the vehicle unless the company gives written authority for another driver in a separate agreement. Additional-driver charges may apply.",
      "The hirer must be in good health and mentally fit to drive. The company may refuse to hire a vehicle where it reasonably considers a client unfit to drive.",
    ],
  },
  {
    title: "Insurance, accidents, and liability",
    items: [
      "Vehicles are insured, but the hirer is responsible for the applicable excess on every claim. The collision and theft excess amounts depend on the vehicle hired and will be shown on your hire agreement.",
      "The vehicle must be returned in the same good condition in which it was hired, subject to normal wear and tear. The hirer is responsible for damage, abnormalities, and minor-accident repairs.",
      "The hire charge does not include parking fees, traffic-offence penalties, or related charges. These remain the hirer’s responsibility.",
      "Travel insurance is recommended. Basic third-party cover may not meet all costs following an accident.",
      "The hirer remains fully liable for damage where the vehicle is used, garaged, or driven in breach of this agreement, even if an insurance claim is made.",
    ],
  },
  {
    title: "Vehicle use and care",
    items: [
      "Do not take the vehicle outside Kenya without notifying the company and receiving its approval. Unauthorised cross-border use may attract a KSh 60,000 charge.",
      "Return the vehicle with fuel at the level specified in the hire agreement. If the fuel level is lower, a refuelling charge will apply.",
      "Check that oil and water levels are maintained. The hirer is responsible for damage arising from insufficient oil or water.",
      "Before accepting the vehicle, check that the supplied equipment is in good condition and report any damage or missing items immediately.",
      "Use only reputable, authorised mechanics. Repair charges from bogus mechanics will not be refunded.",
    ],
  },
  {
    title: "Extras",
    items: ["Chauffeur service is available (driver only)."],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-expedition-sand dark:bg-expedition-forest">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 lg:py-24">
        <header className="max-w-2xl border-b border-expedition-sand-dark/80 pb-10 dark:border-expedition-forest-light/50">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-expedition-accent">
            {siteConfig.name}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-5 text-base leading-7 text-expedition-forest/75 dark:text-expedition-sand/75">
            Please read these terms before collecting your vehicle. Your signature on the hire
            contract confirms your agreement to them.
          </p>
        </header>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl tracking-tight text-expedition-forest dark:text-expedition-sand">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-expedition-forest/80 dark:text-expedition-sand/80">
                {section.items.map((item) => (
                  <li
                    className="relative pl-6 before:absolute before:left-0 before:top-3 before:size-1.5 before:rounded-full before:bg-expedition-accent"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="mt-14 rounded-lg border border-expedition-sand-dark/80 bg-white p-6 text-expedition-forest dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/20 dark:text-expedition-sand">
          <h2 className="text-lg font-semibold tracking-tight">Important</h2>
          <p className="mt-2 leading-7 text-expedition-forest/75 dark:text-expedition-sand/75">
            Insurance excesses, daily minimum kilometres, hire dates, and any additional charges are
            confirmed on your individual car hire contract.
          </p>
        </aside>
      </div>
    </main>
  );
}
