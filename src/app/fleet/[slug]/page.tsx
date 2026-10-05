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

const cars: CarItem[] = Array.isArray(carsData)
  ? carsData
  : ((carsData as { default?: CarItem[] }).default || []);

export async function generateStaticParams() {
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
    },
  };
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Fleet",
        item: `${siteConfig.url}/#fleet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${car.brand} ${car.model}`,
        item: `${siteConfig.url}/fleet/${car.slug}`,
      },
    ],
  };

  const specs = [
    { icon: Users, label: "Passengers", value: `${car.specs.seats} Seats` },
    { icon: Settings, label: "Transmission", value: car.specs.transmission },
    { icon: Fuel, label: "Fuel Type", value: car.specs.fuel_type },
    { icon: Compass, label: "Drivetrain", value: car.drivetrain },
    { icon: Briefcase, label: "Luggage Capacity", value: car.luggage, wide: true },
  ];

  return (
    <main id="main-content" className="bg-expedition-sand pb-16 pt-24 dark:bg-expedition-forest sm:pb-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="hide-scrollbar mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-expedition-forest/60 dark:text-expedition-sand/60">
          <Link href="/" className="transition-colors hover:text-expedition-accent">
            {siteConfig.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/#fleet" className="transition-colors hover:text-expedition-accent">
            Fleet
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-expedition-forest dark:text-expedition-sand">
            {car.brand} {car.model}
          </span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-expedition-sand-dark/60 bg-white dark:border-expedition-forest-light/40 dark:bg-expedition-forest-light/30">
              <Image
                src={car.images[0].replace("/upload/", "/upload/f_auto,q_auto,w_1200,c_fit/")}
                alt={car.image_alts?.[0] || `${car.brand} ${car.model} for hire in Nairobi`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
              {car.badge && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-md bg-expedition-accent px-3 py-1.5 text-sm font-medium uppercase tracking-wider text-white">
                    {car.badge}
                  </span>
                </div>
              )}
            </div>

            {car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {car.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video overflow-hidden rounded-md border border-expedition-sand-dark/60 bg-white dark:border-expedition-forest-light/40 dark:bg-expedition-forest-light/30"
                  >
                    <Image
                      src={img.replace("/upload/", "/upload/f_auto,q_auto,w_400,c_fit/")}
                      alt={
                        car.image_alts?.[idx + 1] ||
                        `${car.brand} ${car.model} detail ${idx + 1}`
                      }
                      fill
                      sizes="(max-width: 1024px) 33vw, 16vw"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-2">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-expedition-accent">
                {car.category}
              </p>
              <h1 className="mb-4 font-display text-4xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-5xl">
                {car.brand} {car.model}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-4xl">
                  {car.currency} {car.price_per_day.toLocaleString()}
                </span>
                <span className="text-expedition-forest/55 dark:text-expedition-sand/55">/ day</span>
              </div>
            </div>

            <p className="my-6 text-base leading-relaxed text-expedition-forest/75 dark:text-expedition-sand/75 sm:text-lg">
              Hire the {car.brand} {car.model} in Nairobi today. Experience premium comfort,
              reliability, and excellent fuel economy. Ideal for city tours, business trips, or
              exploring Kenya&apos;s beautiful landscapes.
            </p>

            <dl className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-expedition-sand-dark/80 bg-expedition-sand-dark/80 dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/50">
              {specs.map(({ icon: Icon, label, value, wide }) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 bg-white p-4 dark:bg-expedition-forest ${
                    wide ? "col-span-2" : ""
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-expedition-accent" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-expedition-forest/55 dark:text-expedition-sand/55">{label}</dt>
                    <dd className="font-medium text-expedition-forest dark:text-expedition-sand">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {car.features && car.features.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {car.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-expedition-forest/80 dark:text-expedition-sand/80"
                    >
                      <CheckCircle2 className="h-5 w-5 text-expedition-accent" strokeWidth={1.5} />
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
