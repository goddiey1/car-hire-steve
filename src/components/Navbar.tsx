"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Clock, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useCurrency, Currency } from "./CurrencyProvider";

const navLinks = [
  { href: "/fleet", label: "Safari Fleet" },
  { href: "/#transfers", label: "Airport Transfers" },
  { href: "/4x4-self-drive-kenya", label: "4x4 Self-Drive" },
  { href: "/#faq", label: "FAQs & Logistics" },
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

  const phoneDisplay = siteConfig.phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#2b3524] text-[#f7f5f0]/80 py-2 text-[11px] font-medium tracking-wider border-b border-[#3b4732]">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d66b44]" /> 24/7 JKIA &amp; Wilson Airport Handoff
            </span>
            <span className="hidden sm:inline-block text-[#f7f5f0]/40">•</span>
            <span className="hidden sm:inline-block">Park-Ready 4x4 Cruisers</span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors bg-black/20 px-2 py-0.5 rounded border border-white/10"
                aria-label="Select currency"
              >
                <span className="text-white font-bold">{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#d66b44]" />
              </button>
              
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-1 bg-[#2b3524] border border-[#3b4732] rounded shadow-lg py-1 z-50 text-white min-w-[70px]">
                  {(['KSh', 'USD', 'GBP'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                      className={`w-full text-left px-3 py-1 hover:bg-[#3b4732] text-xs ${currency === c ? 'text-[#d66b44] font-bold' : ''}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d66b44]" />
              <span>{phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 bg-white ${isScrolled ? "py-3" : "py-4 sm:py-5"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="Stevinson Adventure Safari home">
              <Image 
                src="/logo.png" 
                alt="Stevinson Safari Logo" 
                width={55} 
                height={55} 
                className="object-contain"
                priority
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#2b3524] font-serif uppercase leading-none">
                  Stevinson
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#d66b44] uppercase mt-1">
                  Adventure Safari
                </span>
                <span className="text-[7px] sm:text-[9px] font-medium tracking-widest text-[#2b3524]/60 uppercase mt-1 hidden sm:block">
                  Safari • Airport Concierge • Car Hire
                </span>
              </div>
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
              <Link href="/#contact" className="text-[13px] font-medium text-[#2b3524]/70 hover:text-[#d66b44] transition-colors">
                Contact
              </Link>
              
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
