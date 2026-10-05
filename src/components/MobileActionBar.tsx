import { CalendarCheck, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function MobileActionBar() {
  const message = encodeURIComponent(
    "Hello DAZ safaris and tours! I'd like a quick quote for car hire or an airport transfer."
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200/80 bg-white/95 px-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-lg safe-bottom dark:border-neutral-800 dark:bg-neutral-950/95 sm:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href="#transfers"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-3 text-sm font-bold text-white transition-colors active:scale-[0.98] dark:bg-white dark:text-neutral-900"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Get a quote
        </a>
        {siteConfig.whatsapp && (
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white transition-colors active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
