import { siteConfig } from "@/lib/site";
import Button from "@/components/ui/Button";

export default function ExpeditionHero() {
  return (
    <section className="relative overflow-hidden bg-expedition-forest pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(196, 92, 38, 0.35), transparent 45%), radial-gradient(circle at 80% 20%, rgba(244, 239, 230, 0.12), transparent 40%)",
        }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-expedition-sand/80">
          {siteConfig.name} · {siteConfig.location.city}
        </p>
        <h1 className="font-display max-w-3xl text-[1.75rem] font-normal leading-[1.12] tracking-tight text-expedition-sand sm:text-4xl md:text-5xl lg:text-6xl">
          Car hire &amp; airport transfers
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-expedition-sand/85 sm:mt-5 sm:text-lg">
          {siteConfig.tagline}. Browse the fleet or book a JKIA pickup — confirm by form or
          WhatsApp.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button href="#fleet" variant="primary" className="w-full sm:w-auto">
            View fleet
          </Button>
          <Button href="#transfers" variant="inverse" className="w-full sm:w-auto">
            Airport transfer
          </Button>
        </div>
      </div>
    </section>
  );
}
