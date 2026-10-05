"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, MapPin, Plane, Send, MessageCircle, User, Mail, UserCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { submitEnquiry } from "@/lib/submit-enquiry";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carBrand: string;
  carModel: string;
  price: number;
  currency: string;
}

export default function BookingModal({ isOpen, onClose, carBrand, carModel, price, currency }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pickupDate: "",
    returnDate: "",
    location: "JKIA Airport",
    flightNumber: "",
    driverOption: "Self-Drive",
    website: "",
  });
  const minDate = new Date().toISOString().split("T")[0];

  const handleClose = useCallback(() => {
    setStep("form");
    setSubmissionError("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), a[href]'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(focusFrame);
      previouslyFocused?.focus();
    };
  }, [handleClose, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError("");

    if (formData.website) {
      setSubmissionError("We could not send your request. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry(`New inquiry: ${carBrand} ${carModel}`, {
        name: formData.name,
        email: formData.email,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        location: formData.location,
        flightNumber: formData.flightNumber,
        driverOption: formData.driverOption,
        car: `${carBrand} ${carModel}`,
      });
      setStep("success");
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "We could not send your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (!siteConfig.whatsapp) return;
    const text = `Hello Stevinson Adventure! I just sent a booking request via email and want a fast response.\n\n*Car:* ${carBrand} ${carModel}\n*Driver Option:* ${formData.driverOption}\n*From:* ${formData.pickupDate}\n*To:* ${formData.returnDate}\n*Location:* ${formData.location}\n*Flight:* ${formData.flightNumber || "N/A"}`;
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!isClient || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div ref={dialogRef} tabIndex={-1} className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-3xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl animate-[fade-up_0.25s_ease-out] sm:max-h-[90vh] sm:max-w-lg sm:rounded-3xl dark:bg-neutral-900">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-neutral-200 sm:hidden dark:bg-neutral-700" aria-hidden="true" />
        <div className="flex justify-between items-start gap-3 p-4 sm:p-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 shrink-0">
          <div className="min-w-0">
            <h3 id="booking-modal-title" className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              Request Availability
            </h3>
            <p className="text-sm text-neutral-500 truncate">
              {carBrand} {carModel} — {currency} {price}/day
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            data-autofocus
            aria-label="Close booking form"
            className="p-2.5 shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors bg-white dark:bg-neutral-800 rounded-full shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">
          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="booking-name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <input id="booking-name" required type="text" name="name" onChange={handleChange} className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="booking-email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <input id="booking-email" required type="email" name="email" onChange={handleChange} className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="booking-pickup" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <input id="booking-pickup" required type="date" name="pickupDate" min={minDate} onChange={handleChange} className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="booking-return" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <input id="booking-return" required type="date" name="returnDate" min={formData.pickupDate || minDate} onChange={handleChange} className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="booking-location" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <input id="booking-location" required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="booking-flight" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Flight No. (Optional)</label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                    <input id="booking-flight" type="text" name="flightNumber" onChange={handleChange} placeholder="e.g. KQ100" className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pb-2">
                <label htmlFor="booking-driver" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Driving Option</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" aria-hidden="true" />
                  <select id="booking-driver" name="driverOption" value={formData.driverOption} onChange={handleChange} className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-base sm:text-sm appearance-none">
                    <option value="Self-Drive">Self-Drive</option>
                    <option value="Chauffeur-Driven">Chauffeur-Driven</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full min-h-[48px] py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98]">
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
              {submissionError && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  {submissionError}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Request Sent!</h3>
              <p role="status" className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
                We&apos;ve received your inquiry and will email you within 2 hours. Want an instant answer right now?
              </p>

              {siteConfig.whatsapp && (
                <button type="button" onClick={handleWhatsApp} className="w-full py-3.5 bg-[#25D366] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1ebd5b] transition-colors shadow-lg shadow-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Continue on WhatsApp →</span>
                </button>
              )}
              <button type="button" onClick={handleClose} className="mt-4 text-sm font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
