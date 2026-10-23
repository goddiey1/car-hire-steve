export const siteConfig = {
  name: "Stevinson Adventure Safari",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://StevinsonAdventure.com",
  description:
    "Premium car hire and airport transfers in Nairobi, Kenya. Self-drive and chauffeur-driven vehicles for international tourists. JKIA & Wilson Airport pickups with WhatsApp booking.",
  locale: "en_KE",
  phone: "+254 715 494 311",
  email: "Stevinsonadventure44@gmail.com",
  whatsapp: "254715494311",
  ogImage:
    "https://res.cloudinary.com/dpyqxho1q/image/upload/v1776721279/68d2434a7b13f_wdkrva.jpg",
  location: {
    address: "Murang'a Rd, Ngara",
    city: "Nairobi",
    country: "Kenya",
    area: "Ngara",
    coordinates: {
      lat: -1.273757,
      lng: 36.826639,
    },
    googleMapsUrl: "https://www.google.com/maps/place/1%C2%B016'25.5%22S+36%C2%B049'35.9%22E/@-1.2737567,36.826639,17z",
  },
} as const;
