"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Car } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "#fleet", label: "Our Fleet" },
  { href: "#transfers", label: "Airport Transfers" },
  { href: "#how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 safe-top ${
        isScrolled
          ? "glass-panel shadow-sm py-2.5 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group min-w-0" aria-label="DAZ safaris and tours home">
            <div className="bg-blue-500 text-white p-1.5 sm:p-2 rounded-lg group-hover:bg-blue-600 transition-colors shrink-0">
              <Car className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </div>
            <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors truncate ${isScrolled ? "text-neutral-900 dark:text-white" : "text-white"}`}>
              DAZ<span className="text-blue-500">Hire</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${isScrolled ? "text-neutral-600 dark:text-neutral-300" : "text-neutral-200"}`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle isScrolled={isScrolled} />
            <a
              href="#fleet"
              className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
              Book Now
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle isScrolled={isScrolled} />
            <button
              type="button"
              className={`p-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isScrolled ? "text-neutral-900 dark:text-white" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-full flex max-h-[calc(100svh-4rem)] w-full flex-col gap-1 overflow-y-auto rounded-b-3xl border-t border-neutral-200 bg-white p-3 shadow-xl dark:border-neutral-800 dark:bg-neutral-950 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-800 dark:text-neutral-200 px-3 py-3.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 min-h-[48px] flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-5 py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 mt-2 min-h-[48px] flex items-center justify-center"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
