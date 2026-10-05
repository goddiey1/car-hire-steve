import Link from "next/link";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { siteConfig, whatsappGreeting } from "@/lib/site";

export default function MobileActionBar() {
  const message = encodeURIComponent(
    `${whatsappGreeting()} I'd like a quick quote for car hire or an airport transfer.`
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-expedition-sand-dark/80 bg-expedition-sand/95 px-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm safe-bottom dark:border-expedition-forest-light/50 dark:bg-expedition-forest/95 sm:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <Link
          href="/#transfers"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-md bg-expedition-accent px-3 text-sm font-semibold text-white transition-colors active:scale-[0.98]"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Get a quote
        </Link>
        {siteConfig.whatsapp && (
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-semibold text-white transition-colors active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
