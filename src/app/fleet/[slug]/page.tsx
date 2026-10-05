import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import carsData from "@/data/cars.json";
import { siteConfig } from "@/lib/site";
import BookingModal from "@/components/BookingModal";
import { Settings, Users, Fuel, Briefcase, Compass, CalendarCheck, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import ClientBookingButton from "./ClientBookingButton";

type CarItem = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  price_per_day: number;
  currency: string;
  images: string[];
  image_alts: string[];
  specs: {
    seats: number;
    transmission: string;
    fuel_type: string;
  };
  drivetrain: string;
  luggage: string;
  badge?: string;
  features: string[];
  available: boolean;
};

const cars: CarItem[] = Array.isArray(carsData) ? carsData : ((carsData as any).default || []);

export async function generateStaticParams() {
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const car = cars.find((c) => c.slug === resolvedParams.slug);
  
  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  const title = `${car.brand} ${car.model} Car Hire in Nairobi | ${siteConfig.name}`;
  const description = `Hire a ${car.brand} ${car.model} (${car.category}) in Nairobi for ${car.currency} ${car.price_per_day}/day. Perfect for self-drive or airport transfers. WhatsApp us to book instantly!`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/fleet/${car.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: car.images[0] }],
    },
    twitter: {
      title,
      description,
      images: [car.images[0]],
    }
  };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const car = cars.find((c) => c.slug === resolvedParams.slug);

  if (!car) {
    notFound();
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Fleet",
        "item": `${siteConfig.url}/#fleet`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${car.brand} ${car.model}`,
        "item": `${siteConfig.url}/fleet/${car.slug}`
      }
    ]
  };

  return (
    <main id="main-content" className="pt-24 pb-16 sm:pt-32 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/#fleet" className="hover:text-blue-500 transition-colors">Fleet</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            {car.brand} {car.model}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-lg">
              <Image
                src={car.images[0].replace('/upload/', '/upload/f_auto,q_auto,w_1200,c_fill/')}
                alt={car.image_alts?.[0] || `${car.brand} ${car.model} for hire in Nairobi`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {car.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-amber-400 text-amber-950 backdrop-blur-md text-sm font-semibold rounded-full shadow-md">
                    {car.badge}
                  </span>
                </div>
              )}
            </div>
            
            {car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {car.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer">
                    <Image
                      src={img.replace('/upload/', '/upload/f_auto,q_auto,w_400,c_fill/')}
                      alt={car.image_alts?.[idx + 1] || `${car.brand} ${car.model} detail ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 33vw, 16vw"
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full mb-3">
                {car.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                {car.brand} {car.model}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-blue-500">
                  {car.currency} {car.price_per_day}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">/day</span>
              </div>
            </div>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 my-6">
              Hire the {car.brand} {car.model} in Nairobi today. Experience premium comfort, reliability, and excellent fuel economy. Ideal for city tours, business trips, or exploring Kenya's beautiful landscapes.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Passengers</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.specs.seats} Seats</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Settings className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Transmission</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.specs.transmission}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Fuel className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Fuel Type</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.specs.fuel_type}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Compass className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Drivetrain</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.drivetrain}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 col-span-2">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Luggage Capacity</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.luggage}</p>
                </div>
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-green" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto">
              <ClientBookingButton car={car} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
