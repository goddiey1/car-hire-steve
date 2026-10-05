"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Plane,
  Send,
  MessageCircle,
  User,
  Mail,
  UserCheck,
} from "lucide-react";
import { Modal } from "@heroui/react";
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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep("form");
      setSubmissionError("");
      onClose();
    }
  };

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
        error instanceof Error ? error.message : "We could not send your request. Please try again.",
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
      "noopener,noreferrer",
    );
    handleOpenChange(false);
  };

  if (!isOpen) return null;

  const iconSize = "h-4 w-4";

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        isDismissable
        variant="blur"
      >
        <Modal.Container
          placement="center"
          size="md"
          className="items-end sm:items-center"
        >
          <Modal.Dialog className="max-h-[min(92svh,100dvh)] w-full rounded-t-lg bg-background pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-h-[90vh] sm:rounded-lg">
            <div
              className="mx-auto mt-2 h-1 w-10 rounded-full bg-expedition-sand-dark dark:bg-expedition-forest-light sm:hidden"
              aria-hidden="true"
            />
            <Modal.Header className="border-b border-border p-4 sm:p-6">
              <div className="min-w-0 flex-1">
                <Modal.Heading className="font-display text-lg tracking-tight sm:text-xl">
                  Request Availability
                </Modal.Heading>
                <p className="truncate text-sm text-muted">
                  {carBrand} {carModel} — {currency} {price.toLocaleString()}/day
                </p>
              </div>
              <Modal.CloseTrigger aria-label="Close booking form" />
            </Modal.Header>

            <Modal.Body className="overflow-y-auto overscroll-contain p-4 sm:p-6">
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

                  <Button type="submit" disabled={isSubmitting} className="w-full" fullWidth>
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
                    <p role="alert" className="text-sm text-danger">
                      {submissionError}
                    </p>
                  )}
                </form>
              ) : (
                <div className="space-y-4 py-2 text-center">
                  <p className="font-display text-xl text-foreground">Request sent</p>
                  <p className="text-sm text-muted">
                    We&apos;ll confirm availability shortly. Prefer WhatsApp for a faster reply?
                  </p>
                  {siteConfig.whatsapp && (
                    <Button
                      type="button"
                      variant="whatsapp"
                      onPress={handleWhatsApp}
                      className="w-full"
                      fullWidth
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Continue on WhatsApp
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    onPress={() => handleOpenChange(false)}
                    className="w-full"
                    fullWidth
                  >
                    Close
                  </Button>
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
