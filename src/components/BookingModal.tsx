"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, MapPin, Plane, Send, MessageCircle, User, Mail, UserCheck } from "lucide-react";
import { siteConfig, whatsappGreeting } from "@/lib/site";
import { submitEnquiry } from "@/lib/submit-enquiry";
import Field from "@/components/ui/Field";
import Button from "@/components/ui/Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carBrand: string;
  carModel: string;
  price: number;
  currency: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  carBrand,
  carModel,
  price,
  currency,
}: BookingModalProps) {
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
    const text = `${whatsappGreeting()} I just sent a booking request via email and want a fast response.\n\n*Car:* ${carBrand} ${carModel}\n*Driver Option:* ${formData.driverOption}\n*From:* ${formData.pickupDate}\n*To:* ${formData.returnDate}\n*Location:* ${formData.location}\n*Flight:* ${formData.flightNumber || "N/A"}`;
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    handleClose();
  };

  if (!isClient || !isOpen) return null;

  const iconSize = "h-4 w-4";

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="fixed inset-0 bg-expedition-forest/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-lg bg-expedition-sand pb-[env(safe-area-inset-bottom)] shadow-2xl animate-[fade-up_0.25s_ease-out] dark:bg-expedition-forest sm:max-h-[90vh] sm:max-w-lg sm:rounded-lg"
      >
        <div
          className="mx-auto mt-2 h-1 w-10 rounded-full bg-expedition-sand-dark dark:bg-expedition-forest-light sm:hidden"
          aria-hidden="true"
        />
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-expedition-sand-dark/80 p-4 dark:border-expedition-forest-light/50 sm:p-6">
          <div className="min-w-0">
            <h3
              id="booking-modal-title"
              className="font-display text-lg tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-xl"
            >
              Request Availability
            </h3>
            <p className="truncate text-sm text-expedition-forest/60 dark:text-expedition-sand/60">
              {carBrand} {carModel} — {currency} {price.toLocaleString()}/day
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            data-autofocus
            aria-label="Close booking form"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md border border-expedition-sand-dark text-expedition-forest/50 transition-colors hover:text-expedition-forest dark:border-expedition-forest-light dark:text-expedition-sand/50 dark:hover:text-expedition-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expedition-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain p-4 sm:p-6">
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="booking-name"
                  label="Name"
                  name="name"
                  required
                  type="text"
                  onChange={handleChange}
                  icon={<User className={iconSize} />}
                />
                <Field
                  id="booking-email"
                  label="Email"
                  name="email"
                  required
                  type="email"
                  onChange={handleChange}
                  icon={<Mail className={iconSize} />}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="booking-pickup"
                  label="Pickup Date"
                  name="pickupDate"
                  required
                  type="date"
                  min={minDate}
                  onChange={handleChange}
                  icon={<Calendar className={iconSize} />}
                />
                <Field
                  id="booking-return"
                  label="Return Date"
                  name="returnDate"
                  required
                  type="date"
                  min={formData.pickupDate || minDate}
                  onChange={handleChange}
                  icon={<Calendar className={iconSize} />}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  id="booking-location"
                  label="Location"
                  name="location"
                  required
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  icon={<MapPin className={iconSize} />}
                />
                <Field
                  id="booking-flight"
                  label="Flight No. (Optional)"
                  name="flightNumber"
                  type="text"
                  onChange={handleChange}
                  placeholder="e.g. KQ100"
                  icon={<Plane className={iconSize} />}
                />
              </div>

              <Field
                id="booking-driver"
                label="Driving Option"
                as="select"
                name="driverOption"
                value={formData.driverOption}
                onChange={handleChange}
                icon={<UserCheck className={iconSize} />}
              >
                <option value="Self-Drive">Self-Drive</option>
                <option value="Chauffeur-Driven">Chauffeur-Driven</option>
              </Field>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Submit Request</span>
                  </>
                )}
              </Button>
              {submissionError && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  {submissionError}
                </p>
              )}
            </form>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-expedition-accent text-expedition-accent">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-2xl tracking-tight text-expedition-forest dark:text-expedition-sand">
                Request Sent!
              </h3>
              <p role="status" className="mx-auto mb-8 max-w-sm text-expedition-forest/75 dark:text-expedition-sand/75">
                We&apos;ve received your inquiry and will email you within 2 hours. Want an instant answer right now?
              </p>

              {siteConfig.whatsapp && (
                <Button type="button" variant="whatsapp" onClick={handleWhatsApp} className="w-full">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  <span>Continue on WhatsApp →</span>
                </Button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 text-sm font-medium text-expedition-forest/60 hover:text-expedition-accent dark:text-expedition-sand/60"
              >
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
