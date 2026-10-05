import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `How ${siteConfig.name} handles booking and transfer enquiry information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-expedition-sand px-4 pb-16 pt-28 dark:bg-expedition-forest sm:px-6 sm:pt-36">
      <article className="mx-auto max-w-3xl rounded-lg border border-expedition-sand-dark/80 bg-white p-6 dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/20 sm:p-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-expedition-accent">
          Privacy notice
        </p>
        <h1 className="mb-6 font-display text-3xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-4xl">
          How we use your enquiry details
        </h1>
        <div className="space-y-6 text-expedition-forest/80 dark:text-expedition-sand/80">
          <p>
            When you request a vehicle or airport-transfer quote, we collect the details you
            provide, such as your name, email address, travel dates, destination, and flight number.
          </p>
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
              Why we collect this information
            </h2>
            <p>
              We use it to respond to your request, prepare a quote, arrange the service you ask
              for, and provide customer support. Please do not include payment-card information in
              an enquiry form or WhatsApp message.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
              Form provider and WhatsApp
            </h2>
            <p>
              Online enquiries are delivered through our form-service provider. If you choose
              WhatsApp, your message is handled by WhatsApp under its own privacy terms. Only send
              details you are comfortable sharing through those services.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand">
              Your choices
            </h2>
            <p>
              You may ask us to access, correct, or delete your enquiry information by emailing{" "}
              <a
                className="font-medium text-expedition-accent underline underline-offset-2 transition-colors hover:text-expedition-accent-hover"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              . We may retain information when necessary for legal, accounting, or fraud-prevention
              purposes.
            </p>
          </section>
          <p className="text-sm text-expedition-forest/50 dark:text-expedition-sand/50">Last updated: July 22, 2026.</p>
        </div>
      </article>
    </main>
  );
}
