"use client";

import { useState } from "react";
import { Plane, Calendar, Users, Briefcase, MapPin, User, Mail, Send, MessageCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { submitEnquiry } from "@/lib/submit-enquiry";

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
    const text = `Hello DAZ safaris and tours! I just sent a transfer request via email and want a fast response.\n\n*From:* ${formData.airport}\n*To:* ${formData.destination}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Flight:* ${formData.flightNumber || "N/A"}\n*Passengers:* ${formData.passengers}\n*Luggage:* ${formData.luggage} bags`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 w-full max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Plane className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-xl sm:text-3xl font-bold mb-2">Book an Airport Transfer</h3>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">JKIA or Wilson Airport pickups to your destination.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit} 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:col-span-2">
              <div className="space-y-1.5">
                <label htmlFor="transfer-name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input id="transfer-name" required type="text" name="name" onChange={handleChange} className="w-full pl-10 pr-4 py-3.5 sm:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base sm:text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="transfer-email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input id="transfer-email" required type="email" name="email" onChange={handleChange} className="w-full pl-10 pr-4 py-3.5 sm:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base sm:text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="transfer-airport" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Pickup Location</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <select id="transfer-airport" name="airport" value={formData.airport} onChange={handleChange} className="w-full pl-10 pr-4 py-3.5 sm:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-base sm:text-sm" required>
                  <option value="JKIA">Jomo Kenyatta Int. Airport (JKIA)</option>
                  <option value="Wilson Airport">Wilson Airport</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="transfer-destination" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Drop-off Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input id="transfer-destination" type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="e.g. Kempinski Hotel" className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="transfer-date" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input id="transfer-date" type="date" name="date" value={formData.date} min={minDate} onChange={handleChange} className="w-full pl-10 pr-4 py-3.5 sm:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="transfer-time" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Time</label>
                <input id="transfer-time" type="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3.5 sm:py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="transfer-passengers" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <select id="transfer-passengers" name="passengers" value={formData.passengers} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                    {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="transfer-luggage" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Luggage</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <select id="transfer-luggage" name="luggage" value={formData.luggage} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                    {[0,1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="transfer-flight-number" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Flight Number (Optional)</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input id="transfer-flight-number" type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="e.g. KQ100" className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="md:col-span-2 pt-2 sm:pt-4">
              <button type="submit" disabled={isSubmitting} className="w-full min-h-[48px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white disabled:opacity-70 active:scale-[0.98]">
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="text-sm sm:text-base">Request Transfer Quote</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              {submissionError && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  {submissionError}
                </p>
              )}
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Request Sent!</h3>
            <p role="status" className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-md mx-auto text-lg">
              We&apos;ve received your transfer details and will email you shortly. Want an instant confirmation right now?
            </p>
            
            {siteConfig.whatsapp && (
              <button type="button" onClick={handleWhatsApp} className="max-w-md mx-auto w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-[#1ebd5b] transition-colors shadow-lg shadow-[#25D366]/20">
                <MessageCircle className="w-6 h-6" aria-hidden="true" />
                <span>Continue on WhatsApp →</span>
              </button>
            )}
            <button type="button" onClick={() => setStep("form")} className="mt-6 text-sm font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
              Submit another request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
