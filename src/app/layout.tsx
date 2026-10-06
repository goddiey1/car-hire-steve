import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileActionBar from "@/components/MobileActionBar";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Stevinson Adventure | Premium Car Rental & Airport Transfers in Nairobi",
    template: "%s | Stevinson Adventure",
  },
  description: siteConfig.description,
  keywords: [
    "car hire Nairobi",
    "car rental Kenya",
    "JKIA airport transfer",
    "Wilson Airport pickup",
    "self drive Kenya",
    "safari car hire",
    "Nairobi airport transfer",
    "Stevinson Adventure",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Stevinson Adventure | Premium Car Rental & Airport Transfers in Nairobi",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Stevinson Adventure — premium car rental and airport transfers in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stevinson Adventure | Car Hire & Airport Transfers in Nairobi",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
  icons: {
    icon: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Stevinson Adventure",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <CurrencyProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-lg focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to content
            </a>
            <JsonLd />
            <Navbar />
            {children}
            <Footer />
            <MobileActionBar />
            <WhatsAppFloat />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
