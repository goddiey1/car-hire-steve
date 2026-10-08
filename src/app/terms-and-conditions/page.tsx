import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Stevinson Adventure Safari",
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
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh" }}>
      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 lg:py-24">
      <header className="max-w-2xl border-b border-slate-300 pb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
          Stevinson Adventure Safari
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          Please read these terms before collecting your vehicle. Your signature on the hire contract confirms your agreement to them.
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {section.title}
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
              {section.items.map((item) => (
                <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:size-1.5 before:rounded-full before:bg-amber-600" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <aside className="mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <h2 className="text-lg font-semibold">Important</h2>
        <p className="mt-2 leading-7">
          Insurance excesses, daily minimum kilometres, hire dates, and any additional charges are confirmed on your individual car hire contract.
        </p>
      </aside>
      </div>
    </main>
  );
}
