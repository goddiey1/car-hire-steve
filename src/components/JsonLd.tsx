import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";
import { faqItems } from "./FaqSection";

type CarItem = {
  brand: string;
  model: string;
  price_per_day: number;
  currency: string;
  category: string;
  slug?: string;
  specs?: {
    seats?: number;
    transmission?: string;
    fuel_type?: string;
  };
  drivetrain?: string;
};

export default function JsonLd() {
  const cars: CarItem[] = Array.isArray(carsData)
    ? (carsData as CarItem[])
    : (((carsData as { default?: CarItem[] }).default || []) as CarItem[]);

  const business = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    email: siteConfig.email,
    priceRange: "$$",
    hasMap: siteConfig.location.googleMapsUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "1",
      bestRating: "5",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.area,
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.coordinates.lat,
      longitude: siteConfig.location.coordinates.lng,
    },
    areaServed: [
      { "@type": "City", name: "Nairobi" },
      { "@type": "Airport", name: "Jomo Kenyatta International Airport" },
      { "@type": "Airport", name: "Wilson Airport" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: siteConfig.phone,
            availableLanguage: ["English", "Swahili"],
          },
        }
      : {}),
    makesOffer: cars.map((car) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Car",
        name: `${car.brand} ${car.model}`,
        vehicleConfiguration: car.category,
        ...(car.specs?.seats ? { seatingCapacity: car.specs.seats } : {}),
        ...(car.specs?.transmission ? { vehicleTransmission: car.specs.transmission } : {}),
        ...(car.specs?.fuel_type ? { fuelType: car.specs.fuel_type } : {}),
        ...(car.drivetrain ? { driveWheelConfiguration: car.drivetrain } : {}),
      },
      price: car.price_per_day,
      priceCurrency: "KES",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: car.price_per_day,
        priceCurrency: "KES",
        unitText: "DAY",
      },
    })),
  };

  // 1:1 Synchronized with visible FAQSection to prevent Google hidden schema penalty
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, faqPage]) }}
    />
  );
}
