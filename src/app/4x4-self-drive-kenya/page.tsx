import { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";
import CarCard from "@/components/CarCard";
import Link from "next/link";
import { ChevronRight, ShieldCheck, MapPin, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "4x4 Self Drive Car Hire in Kenya | Nairobi Safari Rentals",
  description: "Explore Kenya at your own pace with our reliable 4x4 self-drive car rentals in Nairobi. Toyota Prado, RAV4, and more. Instant WhatsApp booking.",
  alternates: {
    canonical: `${siteConfig.url}/4x4-self-drive-kenya`,
  }
};

export default function SelfDriveKenyaPage() {
  // Filter for 4x4 or self-drive suitable cars
  const fourByFourCars = carsData.filter(car => 
    car.drivetrain.includes("4WD") || car.drivetrain.includes("4x4") || car.category === "SUV"
  );

  return (
    <main id="main-content" className="pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">4x4 Self Drive Kenya</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400">4x4 Self Drive</span> Car Hire in Kenya
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Experience the freedom of exploring Kenya's stunning landscapes, from the Maasai Mara to the Great Rift Valley, with our reliable and fully serviced 4x4 vehicles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#available-4x4" className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30">
              View Available 4x4s
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
              <Compass className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Unlimited Freedom</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Create your own itinerary and explore Kenya at your own pace without being tied to a tour guide's schedule.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Fully Serviced & Insured</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Our 4x4 vehicles are rigorously maintained and come with comprehensive insurance for your peace of mind on rough terrains.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Free Airport Pickup</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              We offer free vehicle handover at Jomo Kenyatta International Airport (JKIA) or your hotel in Nairobi.
            </p>
          </div>
        </div>

        {/* Available Vehicles */}
        <div id="available-4x4" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
            Our 4x4 Fleet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {fourByFourCars.map((car) => (
              <CarCard key={car.id} car={car as any} />
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto bg-neutral-50 dark:bg-neutral-900/30 p-8 sm:p-12 rounded-3xl border border-neutral-100 dark:border-neutral-800">
          <h2>Why Choose a 4x4 for Self-Drive in Kenya?</h2>
          <p>
            Kenya is a country of diverse and breathtaking landscapes, but navigating its national parks and off-the-beaten-path destinations requires a reliable vehicle. A 4x4 is essential for traversing the rugged terrains of the Maasai Mara, Amboseli, and Tsavo. 
          </p>
          <h3>What to expect when self-driving</h3>
          <ul>
            <li><strong>Road Conditions:</strong> While major highways in Kenya are paved, the roads leading to and inside national parks are mostly dirt tracks that can become muddy during the rainy season.</li>
            <li><strong>Navigation:</strong> We recommend downloading offline maps on Google Maps or using a dedicated GPS.</li>
            <li><strong>Safety:</strong> Avoid driving at night, especially on highways, due to limited visibility and wildlife crossings.</li>
          </ul>
          <h3>Our Most Popular 4x4 Rental</h3>
          <p>
            The <strong>Toyota Prado TX</strong> is the gold standard for self-drive safaris in Kenya. It offers the perfect balance of rugged off-road capability, high ground clearance, and premium interior comfort.
          </p>
        </article>
      </div>
    </main>
  );
}
