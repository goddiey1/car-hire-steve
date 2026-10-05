export const siteConfig = {
  name: "Stevinson Adventure",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://StevinsonAdventure.com",
  description:
    "Premium car hire and airport transfers in Nairobi, Kenya. Self-drive and chauffeur-driven vehicles for international tourists. JKIA & Wilson Airport pickups with WhatsApp booking.",
  locale: "en_KE",
  phone: "+254 715 927 397",
  email: "dazsafaris19@gmail.com",
  whatsapp: "254715927397",
  ogImage:
    "https://res.cloudinary.com/dpyqxho1q/image/upload/v1776721279/68d2434a7b13f_wdkrva.jpg",
  location: {
    city: "Nairobi",
    country: "Kenya",
    area: "CBD",
  },
} as const;
