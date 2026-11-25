import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import carsData from "@/data/cars.json";

export default function sitemap(): MetadataRoute.Sitemap {
  // Commercial landing pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
    },
    {
      url: `${siteConfig.url}/fleet`,
    },
    {
      url: `${siteConfig.url}/4x4-self-drive-kenya`,
    },
    {
      url: `${siteConfig.url}/nairobi-airport-car-rental`,
    },
    {
      url: `${siteConfig.url}/checkin`,
    },
  ];

  // Product / Car pages with direct Google Image indexing tags
  const carRoutes: MetadataRoute.Sitemap = carsData.map((car) => ({
    url: `${siteConfig.url}/fleet/${car.slug}`,
    images: Array.isArray(car.images) ? car.images : [],
  }));

  return [...routes, ...carRoutes];
}
