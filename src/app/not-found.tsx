import Link from "next/link";
import { Car, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80svh] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-8 mx-auto">
        <Car className="w-12 h-12" strokeWidth={1.5} />
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
        404
      </h1>
      
      <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Looks like this vehicle drove off!
      </h2>
      
      <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-10 text-lg">
        The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on the road.
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
      >
        <span>Return to Homepage</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </main>
  );
}
