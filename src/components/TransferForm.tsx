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
import { Card, Input, Label, Radio, RadioGroup } from "@heroui/react";
import { siteConfig, whatsappGreeting } from "@/lib/site";
import { submitEnquiry } from "@/lib/submit-enquiry";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";

const airports = [
  { value: "JKIA", label: "JKIA", sub: "Jomo Kenyatta" },
  { value: "Wilson Airport", label: "Wilson", sub: "Domestic & safari" },
] as const;

const boardInputClass =
  "w-full rounded-md border-0 bg-transparent px-0 py-2 text-base text-expedition-sand outline-none placeholder:text-expedition-sand/35 focus:ring-0 sm:text-sm";

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
        error instanceof Error ? error.message : "We could not send your request. Please try again.",
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
    <Card
      className="relative w-full max-w-4xl overflow-x-clip rounded-xl border-0 p-0 shadow-lg"
      data-transfer-form
    >
      {step === "form" ? (
        <form onSubmit={handleSubmit} className="min-w-0">
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

            <div className="bg-expedition-forest px-3 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
              <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-expedition-accent">
                    Arrival desk
                  </p>
                  <h3 className="mt-1 font-display text-xl text-expedition-sand sm:text-2xl">
                    Book airport pickup
                  </h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-expedition-accent/20 text-expedition-accent">
                  <Plane className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
              </div>

              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-expedition-sand/50 sm:mb-3">
                Landing at
              </p>
              <RadioGroup
                aria-label="Pickup airport"
                value={formData.airport}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, airport: String(value) }))
                }
                className="grid w-full min-w-0 grid-cols-2 gap-2"
              >
                {airports.map((airport) => {
                  const selected = formData.airport === airport.value;
                  return (
                    <Radio
                      key={airport.value}
                      value={airport.value}
                      className={`w-full min-w-0 rounded-lg px-2.5 py-2.5 text-left transition-colors sm:px-4 sm:py-3 ${
                        selected
                          ? "bg-expedition-accent text-white"
                          : "bg-expedition-forest-light/40 text-expedition-sand/80 hover:bg-expedition-forest-light/60"
                      }`}
                    >
                      <Radio.Control className="sr-only">
                        <Radio.Indicator />
                      </Radio.Control>
                      <Radio.Content className="!flex w-full min-w-0 !flex-col !items-start !gap-0.5">
                        <span className="w-full truncate text-sm font-semibold sm:text-base">
                          {airport.label}
                        </span>
                        <span
                          className={`w-full truncate text-[11px] leading-tight ${
                            selected ? "text-white/80" : "text-expedition-sand/50"
                          }`}
                        >
                          {airport.sub}
                        </span>
                      </Radio.Content>
                    </Radio>
                  );
                })}
              </RadioGroup>

              <div className="mt-4 rounded-lg bg-expedition-forest-light/30 p-3 sm:mt-5 sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label className="text-[10px] font-medium uppercase tracking-[0.15em] text-expedition-sand/50">
                      From
                    </Label>
                    <div className="mt-1 flex items-center gap-2 text-expedition-sand">
                      <Plane className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
                      <span className="truncate text-sm font-semibold">{formData.airport}</span>
                    </div>
                  </div>

                  <div className="hidden items-center justify-center px-1 sm:flex">
                    <ArrowRight className="h-4 w-4 text-expedition-accent" aria-hidden="true" />
                  </div>
                  <div
                    className="flex items-center gap-2 text-expedition-sand/40 sm:hidden"
                    aria-hidden="true"
                  >
                    <div className="h-px flex-1 bg-expedition-sand/20" />
                    <ArrowRight className="h-3.5 w-3.5 text-expedition-accent" />
                    <div className="h-px flex-1 bg-expedition-sand/20" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label
                      htmlFor="transfer-destination"
                      className="text-[10px] font-medium uppercase tracking-[0.15em] text-expedition-sand/50"
                    >
                      Drop-off
                    </Label>
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-expedition-accent" aria-hidden="true" />
                      <Input
                        id="transfer-destination"
                        name="destination"
                        type="text"
                        required
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Hotel or address"
                        className={`min-w-0 flex-1 border-0 bg-transparent shadow-none ${boardInputClass}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                <div className="min-w-0 rounded-lg bg-expedition-forest-light/30 px-2.5 py-2 sm:px-3 sm:py-2.5">
                  <Label
                    htmlFor="transfer-date"
                    className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-sand/50"
                  >
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    Date
                  </Label>
                  <Input
                    id="transfer-date"
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    className={`min-w-0 max-w-full border-0 bg-transparent shadow-none [color-scheme:dark] ${boardInputClass}`}
                  />
                </div>
                <div className="min-w-0 rounded-lg bg-expedition-forest-light/30 px-2.5 py-2 sm:px-3 sm:py-2.5">
                  <Label
                    htmlFor="transfer-time"
                    className="text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-sand/50"
                  >
                    Time
                  </Label>
                  <Input
                    id="transfer-time"
                    name="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className={`min-w-0 max-w-full border-0 bg-transparent shadow-none [color-scheme:dark] ${boardInputClass}`}
                  />
                </div>
                <div className="col-span-2 min-w-0 rounded-lg bg-expedition-forest-light/30 px-2.5 py-2 sm:col-span-1 sm:px-3 sm:py-2.5">
                  <Label
                    htmlFor="transfer-flight-number"
                    className="text-[10px] font-medium uppercase tracking-[0.12em] text-expedition-sand/50"
                  >
                    Flight (optional)
                  </Label>
                  <Input
                    id="transfer-flight-number"
                    name="flightNumber"
                    type="text"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    placeholder="KQ100"
                    className={`min-w-0 border-0 bg-transparent shadow-none ${boardInputClass}`}
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0 border border-t-0 border-expedition-sand-dark/60 bg-expedition-sand px-3 py-4 dark:border-expedition-forest-light/50 dark:bg-expedition-forest-light/25 sm:px-6 sm:py-6">
              <div className="mb-3 grid grid-cols-2 gap-2 sm:mb-4 sm:gap-3">
                <div className="min-w-0">
                  <Field
                    id="transfer-passengers"
                    label="Passengers"
                    as="select"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    icon={<Users className="h-3.5 w-3.5" />}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="min-w-0">
                  <Field
                    id="transfer-luggage"
                    label="Luggage"
                    as="select"
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleChange}
                    icon={<Briefcase className="h-3.5 w-3.5" />}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "bag" : "bags"}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <Field
                    id="transfer-name"
                    label="Name"
                    name="name"
                    type="text"
                    required
                    onChange={handleChange}
                    icon={<User className="h-3.5 w-3.5" />}
                  />
                </div>
                <div className="min-w-0">
                  <Field
                    id="transfer-email"
                    label="Email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    icon={<Mail className="h-3.5 w-3.5" />}
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-5">
                <Button type="submit" disabled={isSubmitting} className="w-full" fullWidth>
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
                  <p role="alert" className="mt-2 text-sm text-danger">
                    {submissionError}
                  </p>
                )}
              </div>
            </div>
        </form>
      ) : (
          <div className="border border-expedition-sand-dark/60 bg-expedition-sand px-6 py-12 text-center dark:border-expedition-forest-light/40 dark:bg-expedition-forest sm:px-10">
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
                onPress={handleWhatsApp}
                className="mx-auto w-full max-w-md"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Continue on WhatsApp →</span>
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              onPress={() => setStep("form")}
              className="mt-6 text-sm font-medium text-expedition-forest/60 dark:text-expedition-sand/60"
            >
              Book another pickup
            </Button>
          </div>
      )}
    </Card>
  );
}
