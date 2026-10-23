import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";

type CarItem = {
  brand: string;
  model: string;
  price_per_day: number;
  currency: string;
  category: string;
};

export default function JsonLd() {
  const cars: CarItem[] = Array.isArray(carsData)
    ? carsData
    : ((carsData as { default?: CarItem[] }).default || []);

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
      },
      price: car.price_per_day,
      priceCurrency: car.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: car.price_per_day,
        priceCurrency: car.currency,
        unitText: "DAY",
      },
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What cars do you have available and what are the prices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a range of vehicles including the Toyota Axio (5,000 KSH/day), Toyota Noah (8,000 KSH/day), Toyota Prado (15,000 KSH/day), Toyota Land Cruiser V8 (25,000 KSH/day), and Lexus 570 (35,000 KSH/day)."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer Airport Transfers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We provide comfortable and reliable airport transfers from JKIA and Wilson Airport. Just let us know your arrival time, number of passengers, and luggage details."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book a car or transfer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book by messaging us on WhatsApp. Our team will assist you within 5 minutes."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, faqPage]) }}
    />
  );
}
