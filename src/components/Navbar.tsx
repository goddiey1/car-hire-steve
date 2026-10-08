"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Clock, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useCurrency, Currency } from "./CurrencyProvider";

const navLinks = [
  { href: "#transfers", label: "Airport Transfers" },
  { href: "#fleet", label: "Safari Fleet" },
  { href: "#services", label: "Self-Drive & Chauffeur" },
  { href: "#how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 shadow-sm flex flex-col">
      {/* Top utility bar */}
      <div className="bg-[#1a2119] text-white/80 py-1.5 text-[9px] sm:text-[11px] font-medium tracking-wide">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex gap-3 sm:gap-6 items-center w-full sm:w-auto overflow-x-auto whitespace-nowrap hide-scrollbar">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0"></span> <span className="hidden sm:inline">J.K.I.A & Wilson Airport Type </span>Booking Active</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-white/50 shrink-0" /> <span className="hidden sm:inline">International time (E.A.T +3)</span><span className="sm:hidden">E.A.T +3</span></span>
            <span className="flex items-center gap-1.5 shrink-0">24/7 Dispatch</span>
          </div>
          <div className="flex gap-4 sm:gap-6 items-center w-full sm:w-auto justify-between sm:justify-end border-t border-white/10 sm:border-none pt-1 sm:pt-0">
            <div className="relative">
              <button 
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                Currency: {currency} <ChevronDown className="w-3 h-3" />
              </button>
              {currencyOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-[#2b3524] rounded shadow-lg border border-neutral-200 overflow-hidden flex flex-col min-w-[100px] z-[60]">
                  {(['KSh', 'USD', 'GBP'] as Currency[]).map((c) => (
                    <button 
                      key={c}
                      className="px-4 py-2 text-left hover:bg-neutral-100 font-bold text-xs"
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyOpen(false);
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0">
              <Phone className="w-3 h-3" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 bg-white ${isScrolled ? "py-3" : "py-4 sm:py-5"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex flex-col min-w-0" aria-label="Stevinson Adventure Safari home">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#2b3524] font-serif uppercase leading-none">
                Stevinson
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#d66b44] uppercase mt-1">
                Adventure Safari
              </span>
              <span className="text-[7px] sm:text-[9px] font-medium tracking-widest text-[#2b3524]/60 uppercase mt-1 hidden sm:block">
                Safari • Airport Concierge • Car Hire
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-semibold text-[#2b3524]/80 hover:text-[#d66b44] transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <Link href="#reviews" className="text-[13px] font-medium text-[#2b3524]/70 hover:text-[#d66b44] transition-colors">Reviews</Link>
              <Link href="#contact" className="text-[13px] font-medium text-[#2b3524]/70 hover:text-[#d66b44] transition-colors">Contact</Link>
              
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-[13px] font-bold tracking-wide rounded hover:bg-[#1ebd5b] transition-all flex items-center gap-2 shadow-sm"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="p-2 text-[#2b3524]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute left-0 top-full flex w-full flex-col bg-white border-t border-neutral-100 p-4 shadow-xl lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#2b3524] px-3 py-4 border-b border-neutral-50 hover:bg-neutral-50"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="w-full text-center px-5 py-3 mt-4 bg-[#25D366] text-white font-bold rounded flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
