"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "#fleet", label: "Vehicles" },
  { href: "#transfers", label: "Airport" },
  { href: "#trip-steps", label: "How it works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const solid = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 z-50 w-full transition-all duration-300 safe-top ${
        solid
          ? "border-b border-expedition-sand-dark/80 bg-expedition-sand/95 py-2.5 backdrop-blur-sm dark:border-expedition-forest-light/50 dark:bg-expedition-forest/95 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="min-w-0"
            aria-label={`${siteConfig.name} home`}
          >
            <span
              className={`block truncate text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                solid
                  ? "text-expedition-forest dark:text-expedition-sand"
                  : "text-expedition-sand"
              }`}
            >
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                className={`text-sm font-medium transition-colors ${
                  solid
                    ? "text-expedition-forest/80 hover:text-expedition-forest dark:text-expedition-sand/80 dark:hover:text-expedition-sand"
                    : "text-expedition-sand/90 hover:text-expedition-sand"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle isScrolled={solid} />
            <a
              href={isHome ? "#fleet" : "/#fleet"}
              className={`inline-flex min-h-[40px] items-center justify-center rounded-md px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                solid
                  ? "bg-expedition-accent text-white hover:bg-expedition-accent-hover focus-visible:ring-expedition-accent"
                  : "bg-expedition-sand text-expedition-forest hover:bg-white focus-visible:ring-expedition-sand"
              }`}
            >
              View fleet
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle isScrolled={solid} />
            <button
              type="button"
              className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 dark:focus-visible:ring-white ${
                solid
                  ? "text-expedition-forest dark:text-expedition-sand"
                  : "text-expedition-sand"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-full flex max-h-[calc(100svh-4rem)] w-full flex-col overflow-y-auto border-b border-t border-expedition-sand-dark bg-expedition-sand dark:border-expedition-forest-light dark:bg-expedition-forest md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center border-b border-expedition-sand-dark/70 px-4 py-3.5 text-base font-medium text-expedition-forest dark:border-expedition-forest-light/50 dark:text-expedition-sand"
            >
              {link.label}
            </Link>
          ))}
          <div className="p-3">
            <a
              href={isHome ? "#fleet" : "/#fleet"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-expedition-accent px-5 py-3.5 font-semibold text-white"
            >
              View fleet
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
