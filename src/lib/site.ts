const DEFAULT_NAME = "Stevinson Adventure";
const DEFAULT_URL = "https://StevinsonAdventure.com";
const DEFAULT_DESCRIPTION =
  "Premium car hire and airport transfers in Nairobi, Kenya. Self-drive and chauffeur-driven vehicles for international tourists. JKIA & Wilson Airport pickups with WhatsApp booking.";
const DEFAULT_TAGLINE = "Car hire & safari routes from Nairobi";
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dpyqxho1q/image/upload/v1776721279/68d2434a7b13f_wdkrva.jpg";

function env(key: string, fallback: string): string {
  const value = process.env[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export const siteConfig = {
  name: env("NEXT_PUBLIC_SITE_NAME", DEFAULT_NAME),
  shortName: env("NEXT_PUBLIC_SITE_SHORT_NAME", "StevinsonAdventure"),
  url: env("NEXT_PUBLIC_SITE_URL", DEFAULT_URL),
  description: env("NEXT_PUBLIC_SITE_DESCRIPTION", DEFAULT_DESCRIPTION),
  tagline: env("NEXT_PUBLIC_SITE_TAGLINE", DEFAULT_TAGLINE),
  locale: env("NEXT_PUBLIC_SITE_LOCALE", "en_KE"),
  phone: env("NEXT_PUBLIC_CONTACT_PHONE", "+254 715 927 397"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL", "dazsafaris19@gmail.com"),
  whatsapp: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "254715927397"),
  ogImage: env("NEXT_PUBLIC_OG_IMAGE", DEFAULT_OG_IMAGE),
  location: {
    city: env("NEXT_PUBLIC_LOCATION_CITY", "Nairobi"),
    country: env("NEXT_PUBLIC_LOCATION_COUNTRY", "Kenya"),
    area: env("NEXT_PUBLIC_LOCATION_AREA", "CBD"),
  },
} as const;

export function siteTitle(pageTitle?: string): string {
  if (pageTitle) return `${pageTitle} | ${siteConfig.name}`;
  return `${siteConfig.name} | Premium Car Rental & Airport Transfers in Nairobi`;
}

export function whatsappGreeting(): string {
  return `Hello ${siteConfig.name}!`;
}
