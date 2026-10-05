import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center bg-expedition-sand p-4 text-center dark:bg-expedition-forest">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-expedition-accent">
        {siteConfig.name}
      </p>

      <h1 className="mb-4 font-display text-4xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-6xl">
        404
      </h1>

      <h2 className="mb-4 text-xl font-semibold tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-2xl">
        Looks like this vehicle drove off!
      </h2>

      <p className="mx-auto mb-10 max-w-md text-lg text-expedition-forest/75 dark:text-expedition-sand/75">
        The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back
        on the road.
      </p>

      <Button href="/#fleet">
        <span>View fleet</span>
        <ArrowRight className="h-5 w-5" />
      </Button>
    </main>
  );
}
