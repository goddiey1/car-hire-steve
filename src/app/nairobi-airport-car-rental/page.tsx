import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import TransferForm from "@/components/TransferForm";
import Link from "next/link";
import { ChevronRight, Plane, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Nairobi Airport Car Rental & Transfers | JKIA Pickups",
  description: "Reliable airport car rental and transfers at Jomo Kenyatta International Airport (JKIA) and Wilson Airport in Nairobi. Book your pickup today.",
  alternates: {
    canonical: `${siteConfig.url}/nairobi-airport-car-rental`,
  }
};

export default function AirportRentalPage() {
  return (
    <main id="main-content" className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">Nairobi Airport Car Rental</span>
        </nav>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              Nairobi Airport <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400">Car Rental & Transfers</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Skip the taxi queues. Whether you need a self-drive rental waiting for you at the parking lot, or a chauffeur-driven transfer to your hotel, we ensure a seamless arrival at JKIA and Wilson Airport.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Flight Tracking</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">We monitor your flight and adjust for delays automatically.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">24/7 Availability</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">No matter what time you land, your vehicle will be ready.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Meet & Greet</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Our representative will be waiting at arrivals with a name sign.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">Book Your Airport Transfer</h2>
            <TransferForm />
          </div>
        </div>

        {/* SEO Content Section */}
        <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h2>Renting a Car at Jomo Kenyatta International Airport (JKIA)</h2>
          <p>
            JKIA is East Africa's busiest airport and the main gateway for visitors to Kenya. Navigating arrival procedures and finding reliable transportation can be stressful after a long flight. <strong>DAZ safaris and tours</strong> eliminates this stress by providing premium car hire services directly at the airport terminals.
          </p>
          
          <h3>Self-Drive Airport Pickup</h3>
          <p>
            If you've booked a self-drive rental with us, we will have the car ready at the airport parking. A representative will meet you at the arrivals hall, assist with your luggage, and complete the vehicle handover process in less than 15 minutes.
          </p>
          
          <h3>Chauffeur-Driven Airport Transfers</h3>
          <p>
            Prefer to relax after your flight? Our professional chauffeurs will whisk you away to your hotel in Nairobi CBD, Westlands, or beyond. We offer a range of vehicles from comfortable sedans to luxury SUVs and spacious minivans for groups.
          </p>

          <h3>Wilson Airport Car Hire</h3>
          <p>
            Flying in from a domestic safari? We also offer direct pickups and car rental services at Wilson Airport, connecting you seamlessly from the bush to the city.
          </p>
        </article>
      </div>
    </main>
  );
}
