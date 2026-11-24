import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import carsData from "@/data/cars.json";
import { siteConfig } from "@/lib/site";
import { Settings, Users, Fuel, Briefcase, Compass, CheckCircle2, ChevronRight } from "lucide-react";
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
  image_alts?: string[];
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

const cars: CarItem[] = Array.isArray(carsData) ? (carsData as CarItem[]) : (((carsData as any).default || []) as CarItem[]);

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
  const description = `Hire a ${car.brand} ${car.model} (${car.category}) in Nairobi for KES ${car.price_per_day.toLocaleString()}/day. Ideal for 4x4 self-drive safari or JKIA airport transfers. Book via WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/fleet/${car.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/fleet/${car.slug}`,
      images: [{ url: car.images[0] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.images[0]],
    },
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
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Fleet",
        "item": `${siteConfig.url}/fleet`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${car.brand} ${car.model}`,
        "item": `${siteConfig.url}/fleet/${car.slug}`,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": ["Product", "Car"],
    name: `${car.brand} ${car.model}`,
    image: car.images,
    description: `Hire the ${car.brand} ${car.model} (${car.category}) in Nairobi. Features ${car.specs.seats} seats, ${car.specs.transmission} transmission, ${car.specs.fuel_type} engine, and ${car.drivetrain} drivetrain. Available for self-drive safari and JKIA airport transfers.`,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    category: car.category,
    seatingCapacity: car.specs.seats,
    vehicleTransmission: car.specs.transmission,
    fuelType: car.specs.fuel_type,
    driveWheelConfiguration: car.drivetrain,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/fleet/${car.slug}`,
      priceCurrency: "KES",
      price: car.price_per_day,
      priceValidUntil: "2027-12-31",
      availability: car.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "AutoRental",
        name: siteConfig.name,
        telephone: siteConfig.phone,
        url: siteConfig.url,
      },
    },
  };

  return (
    <main id="main-content" className="pt-24 pb-16 sm:pt-32 sm:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, productSchema]) }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar"
        >
          <Link href="/" className="hover:text-[#d66b44] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/fleet" className="hover:text-[#d66b44] transition-colors">
            Fleet
          </Link>
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
                src={car.images[0].replace("/upload/", "/upload/f_auto,q_auto,w_1200,c_fill/")}
                alt={car.image_alts?.[0] || `${car.brand} ${car.model} (${car.category}) available for hire in Nairobi JKIA`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {car.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-[#d66b44] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
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
                      src={img.replace("/upload/", "/upload/f_auto,q_auto,w_400,c_fill/")}
                      alt={car.image_alts?.[idx + 1] || `${car.brand} ${car.model} detail photo ${idx + 1}`}
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
              <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-[#d66b44] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                {car.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
                {car.brand} {car.model}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#2b3524] dark:text-amber-400">
                  KES {car.price_per_day.toLocaleString()}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">/ day</span>
              </div>
            </div>

            <p className="text-base text-neutral-600 dark:text-neutral-300 my-6 leading-relaxed">
              Hire the {car.brand} {car.model} in Nairobi today. Experience premium comfort, proven reliability, and excellent fuel efficiency. Fully maintained and ready for city travel, business engagements, or safari expedition trips across Kenya.
            </p>

            {/* Semantic Specs Grid */}
            <ul aria-label="Vehicle Specifications" className="grid grid-cols-2 gap-4 mb-8">
              <li className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-[#d66b44]" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Passengers</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.specs.seats} Seats</p>
                </div>
              </li>

              <li className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Settings className="w-5 h-5 text-[#d66b44]" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Transmission</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.specs.transmission}</p>
                </div>
              </li>

              <li className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Fuel className="w-5 h-5 text-[#d66b44]" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Fuel Type</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.specs.fuel_type}</p>
                </div>
              </li>

              <li className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Compass className="w-5 h-5 text-[#d66b44]" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Drivetrain</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.drivetrain}</p>
                </div>
              </li>

              <li className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 col-span-2">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                  <Briefcase className="w-5 h-5 text-[#d66b44]" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Cargo Capacity</p>
                  <p className="font-semibold text-neutral-900 dark:text-white">{car.luggage}</p>
                </div>
              </li>
            </ul>

            {car.features && car.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
                  Vehicle Highlights &amp; Inclusions
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
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
