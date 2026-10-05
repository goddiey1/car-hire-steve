import { CalendarCheck, MessageCircle } from "lucide-react";
import { siteConfig, whatsappGreeting } from "@/lib/site";
import Button from "@/components/ui/Button";

export default function MobileActionBar() {
  const message = encodeURIComponent(
    `${whatsappGreeting()} I'd like a quick quote for car hire or an airport transfer.`,
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-expedition-sand-dark/80 bg-expedition-sand/95 px-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm safe-bottom dark:border-expedition-forest-light/50 dark:bg-expedition-forest/95 sm:hidden"
      data-mobile-action-bar
    >
      <div className="mx-auto flex max-w-md gap-2">
        <Button href="/#transfers" className="min-w-0 flex-1 text-sm" fullWidth size="md">
          <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Get a quote</span>
        </Button>
        {siteConfig.whatsapp && (
          <Button
            href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`}
            variant="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 shrink-0 text-sm"
            size="md"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </Button>
        )}
      </div>
    </div>
  );
}
