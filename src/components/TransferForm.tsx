"use client";

import { useState } from "react";
import {
  Plane,
  Calendar,
  Users,
  Briefcase,
  MapPin,
  User,
  Mail,
  Send,
  MessageCircle,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, whatsappGreeting } from "@/lib/site";
import { submitEnquiry } from "@/lib/submit-enquiry";
import Button from "@/components/ui/Button";

const airports = [
  { value: "JKIA", label: "JKIA", sub: "Jomo Kenyatta" },
  { value: "Wilson Airport", label: "Wilson", sub: "Domestic & safari" },
] as const;

const inputClass =
  "w-full rounded-md border-0 bg-transparent px-0 py-2 text-base text-expedition-sand outline-none placeholder:text-expedition-sand/35 focus:ring-0 sm:text-sm";
const lightInputClass =
  "w-full rounded-md border border-expedition-sand-dark/80 bg-white px-3 py-3 text-base text-expedition-forest outline-none placeholder:text-expedition-forest/35 focus:border-expedition-accent focus:ring-1 focus:ring-expedition-accent dark:border-expedition-forest-light/50 dark:bg-expedition-forest/50 dark:text-expedition-sand dark:placeholder:text-expedition-sand/35 sm:py-2.5 sm:text-sm";

export default function TransferForm() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    airport: "JKIA",
    destination: "",
    date: "",
    time: "",
    passengers: "1",
    luggage: "1",
    flightNumber: "",
    website: "",
  });
  const minDate = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      await submitEnquiry(`Transfer inquiry: ${formData.airport} to ${formData.destination}`, {
        name: formData.name,
        email: formData.email,
        airport: formData.airport,
        destination: formData.destination,
        date: formData.date,
        time: formData.time,
        passengers: formData.passengers,
        luggage: formData.luggage,
        flightNumber: formData.flightNumber,
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
    const text = `${whatsappGreeting()} I just sent a transfer request via email and want a fast response.\n\n*From:* ${formData.airport}\n*To:* ${formData.destination}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Flight:* ${formData.flightNumber || "N/A"}\n*Passengers:* ${formData.passengers}\n*Luggage:* ${formData.luggage} bags`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-4xl overflow-hidden rounded-xl shadow-lg"
    >
      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="overflow-hidden"
          >
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

            {/* Flight-board header */}
            <div className="bg-expedition-forest px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-expedition-accent">
                    Arrival desk
                  </p>
                  <h3 className="mt-1 font-display text-xl text-expedition-sand sm:text-2xl">
                    Book airport pickup
                  </h3>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-expedition-accent/20 text-expedition-accent">
                  <Plane className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
              </div>

              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-expedition-sand/50">
                Landing at
              </p>
              <div
                className="grid grid-cols-2 gap-2"
                role="radiogroup"
                aria-label="Pickup airport"
              >
                {airports.map((airport) => {
                  const selected = formData.airport === airport.value;
                  return (
                    <button
                      key={airport.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, airport: airport.value }))
                      }
                      className={`rounded-lg px-3 py-3 text-left transition-colors sm:px-4 ${
                        selected
                          ? "bg-expedition-accent text-white"
                          : "bg-expedition-forest-light/40 text-expedition-sand/80 hover:bg-expedition-forest-light/60"
                      }`}
                    >
                      <span className="block text-sm font-semibold sm:text-base">
                        {airport.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-[11px] ${
                          selected ? "text-white/80" : "text-expedition-sand/50"
                        }`}
                      >
                        {airport.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Route strip */}
              <div className="mt-5 rounded-lg bg-expedition-forest-light/30 p-4">
                <div className="flex items-stretch gap-3">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <label
                      htmlFor="transfer-airport-display"
                      className="text-[10px] font-medium uppercase tracking-[0.15em] text-expedition-sand/50"
                    >
                      From
                    </label>
                    <div className="mt-1 flex items-center gap-2 text-expedition-sand">
                      <Plane className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
                      <span id="transfer-airport-display" className="truncate text-sm font-semibold">
                        {formData.airport}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center px-1">
                    <ArrowRight className="h-4 w-4 text-expedition-accent" aria-hidden="true" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <label
                      htmlFor="transfer-destination"
                      className="text-[10px] font-medium uppercase tracking-[0.15em] text-expedition-sand/50"
                    >
                      Drop-off
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
                      <input
                        id="transfer-destination"
                        name="destination"
                        type="text"
                        required
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Hotel or address"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timetable */}
              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-lg bg-expedition-forest-light/30 px-3 py-2.5">
                  <label
                    htmlFor="transfer-date"
                    className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-sand/50"
                  >
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    Date
                  </label>
                  <input
                    id="transfer-date"
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
                <div className="rounded-lg bg-expedition-forest-light/30 px-3 py-2.5">
                  <label
                    htmlFor="transfer-time"
                    className="text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-sand/50"
                  >
                    Time
                  </label>
                  <input
                    id="transfer-time"
                    name="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
                <div className="rounded-lg bg-expedition-forest-light/30 px-3 py-2.5">
                  <label
                    htmlFor="transfer-flight-number"
                    className="text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-sand/50"
                  >
                    Flight
                  </label>
                  <input
                    id="transfer-flight-number"
                    name="flightNumber"
                    type="text"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder="KQ100"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Light details band */}
            <div className="border border-t-0 border-expedition-sand-dark/60 bg-expedition-sand px-4 py-5 dark:border-expedition-forest-light/40 dark:bg-expedition-sand/10 sm:px-6 sm:py-6">
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="transfer-passengers"
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-forest/55 dark:text-expedition-sand/55"
                  >
                    <Users className="h-3.5 w-3.5 text-expedition-accent" aria-hidden="true" />
                    Passengers
                  </label>
                  <select
                    id="transfer-passengers"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className={lightInputClass}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="transfer-luggage"
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-forest/55 dark:text-expedition-sand/55"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-expedition-accent" aria-hidden="true" />
                    Luggage
                  </label>
                  <select
                    id="transfer-luggage"
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleChange}
                    className={lightInputClass}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "bag" : "bags"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="transfer-name"
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-forest/55 dark:text-expedition-sand/55"
                  >
                    <User className="h-3.5 w-3.5 text-expedition-accent" aria-hidden="true" />
                    Name
                  </label>
                  <input
                    id="transfer-name"
                    name="name"
                    type="text"
                    required
                    onChange={handleChange}
                    className={lightInputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="transfer-email"
                    className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-forest/55 dark:text-expedition-sand/55"
                  >
                    <Mail className="h-3.5 w-3.5 text-expedition-accent" aria-hidden="true" />
                    Email
                  </label>
                  <input
                    id="transfer-email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    className={lightInputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      <span>Request pickup quote</span>
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
                {submissionError && (
                  <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {submissionError}
                  </p>
                )}
              </div>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-expedition-sand-dark/60 bg-expedition-sand px-6 py-12 text-center dark:border-expedition-forest-light/40 dark:bg-expedition-forest sm:px-10"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-expedition-accent text-white">
              <Check className="h-8 w-8" strokeWidth={2} />
            </div>
            <h3 className="mb-3 font-display text-2xl tracking-tight text-expedition-forest dark:text-expedition-sand sm:text-3xl">
              Pickup request sent
            </h3>
            <p
              role="status"
              className="mx-auto mb-8 max-w-md text-expedition-forest/75 dark:text-expedition-sand/75"
            >
              We&apos;ll email your quote shortly. For a faster reply after landing plans change,
              continue on WhatsApp.
            </p>

            {siteConfig.whatsapp && (
              <Button
                type="button"
                variant="whatsapp"
                onClick={handleWhatsApp}
                className="mx-auto w-full max-w-md"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Continue on WhatsApp →</span>
              </Button>
            )}
            <button
              type="button"
              onClick={() => setStep("form")}
              className="mt-6 text-sm font-medium text-expedition-forest/60 hover:text-expedition-accent dark:text-expedition-sand/60"
            >
              Book another pickup
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
