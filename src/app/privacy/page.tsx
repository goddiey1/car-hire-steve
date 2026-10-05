import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How DAZ safaris and tours handles booking and transfer enquiry information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-50 px-4 pb-16 pt-28 sm:px-6 sm:pt-36" style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      <article className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">Privacy notice</p>
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">How we use your enquiry details</h1>
        <div className="space-y-6 text-neutral-700">
          <p>When you request a vehicle or airport-transfer quote, we collect the details you provide, such as your name, email address, travel dates, destination, and flight number.</p>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-neutral-900">Why we collect this information</h2>
            <p>We use it to respond to your request, prepare a quote, arrange the service you ask for, and provide customer support. Please do not include payment-card information in an enquiry form or WhatsApp message.</p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-neutral-900">Form provider and WhatsApp</h2>
            <p>Online enquiries are delivered through our form-service provider. If you choose WhatsApp, your message is handled by WhatsApp under its own privacy terms. Only send details you are comfortable sharing through those services.</p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold text-neutral-900">Your choices</h2>
            <p>You may ask us to access, correct, or delete your enquiry information by emailing <a className="text-blue-600 underline underline-offset-2 hover:text-blue-700" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. We may retain information when necessary for legal, accounting, or fraud-prevention purposes.</p>
          </section>
          <p className="text-sm text-neutral-500">Last updated: July 22, 2026.</p>
        </div>
      </article>
    </main>
  );
}
