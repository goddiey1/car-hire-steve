"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Globe,
  Car,
  Calendar,
  Plane,
  FileText,
  Shield,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Printer,
  Download,
  MessageCircle,
  Compass,
  Info,
  AlertCircle,
  Check,
} from "lucide-react";
import SignaturePad from "@/components/SignaturePad";
import DocumentUploadCard, { UploadedDoc } from "@/components/DocumentUploadCard";
import { siteConfig } from "@/lib/site";

type ServiceType = "self-drive" | "transfer" | "chauffeur";

// Strict Validators
const validateFullName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) return "Full legal name is required.";
  if (trimmed.length < 4) return "Name must be at least 4 characters.";
  if (trimmed.length > 60) return "Name cannot exceed 60 characters.";
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes.";
  }
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return "Please enter your first and last name (e.g. Johnathan Smith).";
  }
  if (parts.some((p) => p.length < 2)) {
    return "Each name component must be at least 2 letters.";
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) return "Email address is required.";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email format (e.g. name@example.com).";
  }
  return null;
};

const validatePhone = (phone: string): string | null => {
  const trimmed = phone.trim();
  if (!trimmed) return "WhatsApp or mobile number is required.";
  if (!/^[+]?[\d\s\-()]{9,22}$/.test(trimmed)) {
    return "Only digits, +, spaces, hyphens, and brackets are allowed.";
  }
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length < 9) {
    return "Phone number must have at least 9 digits (include country code, e.g. +254...).";
  }
  if (digitsOnly.length > 15) {
    return "Phone number cannot exceed 15 digits.";
  }
  return null;
};

const validateNationality = (nat: string): string | null => {
  const trimmed = nat.trim();
  if (!trimmed) return "Country of residence or nationality is required.";
  if (trimmed.length < 2) return "Country must be at least 2 characters.";
  if (!/^[a-zA-Z\s,.-]{2,50}$/.test(trimmed)) {
    return "Country name can only contain letters and spaces.";
  }
  return null;
};

const validateStartDate = (startDate: string): string | null => {
  if (!startDate) return "Rental / trip start date is required.";
  const today = new Date().toISOString().split("T")[0];
  if (startDate < today) return "Start date cannot be in the past.";
  return null;
};

const validateEndDate = (startDate: string, endDate: string): string | null => {
  if (!endDate) return null;
  if (startDate && endDate < startDate) {
    return "Return date cannot be earlier than start date.";
  }
  return null;
};

export default function CheckInForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [submissionTimestamp, setSubmissionTimestamp] = useState<string>("");

  // Service Type: determines whether driving license is required
  const [serviceType, setServiceType] = useState<ServiceType>("self-drive");

  // Step 1: Renter Details
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    vehicle: "Toyota Prado TX (4x4 Expedition)",
    rentalStartDate: "",
    rentalEndDate: "",
    flightOrLocation: "",
    bookingRef: "",
    notes: "",
  });

  // Touched state for strict real-time validation feedback
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  // Step 2: Uploaded Documents
  const [licenseFront, setLicenseFront] = useState<UploadedDoc | null>(null);
  const [licenseBack, setLicenseBack] = useState<UploadedDoc | null>(null);
  const [passportDoc, setPassportDoc] = useState<UploadedDoc | null>(null);
  const [extraDoc, setExtraDoc] = useState<UploadedDoc | null>(null);

  // Step 3: Agreement & Signature
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  // Helper flags
  const isSelfDrive = serviceType === "self-drive";

  // Strict Field Validation Computations
  const fullNameError = touched.fullName ? validateFullName(formData.fullName) : null;
  const emailError = touched.email ? validateEmail(formData.email) : null;
  const phoneError = touched.phone ? validatePhone(formData.phone) : null;
  const nationalityError = touched.nationality ? validateNationality(formData.nationality) : null;
  const startDateError = touched.rentalStartDate ? validateStartDate(formData.rentalStartDate) : null;
  const endDateError = touched.rentalEndDate ? validateEndDate(formData.rentalStartDate, formData.rentalEndDate) : null;

  // Step 1 validation
  const isStep1Valid =
    validateFullName(formData.fullName) === null &&
    validateEmail(formData.email) === null &&
    validatePhone(formData.phone) === null &&
    validateNationality(formData.nationality) === null &&
    validateStartDate(formData.rentalStartDate) === null &&
    validateEndDate(formData.rentalStartDate, formData.rentalEndDate) === null;

  // Step 2 validation:
  // For Self-Drive: License Front + Back + Passport/ID required
  // For Transfer / Chauffeured: Only Passport/ID required
  const isStep2Valid = isSelfDrive
    ? licenseFront !== null && licenseBack !== null && passportDoc !== null
    : passportDoc !== null;

  // Step 3 validation
  const isStep3Valid = termsAgreed && signatureData !== null;

  const handleProceedToStep2 = () => {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      nationality: true,
      rentalStartDate: true,
      rentalEndDate: true,
    });

    if (!isStep1Valid) return;

    setCurrentStep(2);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleServiceTypeChange = (type: ServiceType) => {
    setServiceType(type);
    if (type === "transfer") {
      setFormData((prev) => ({
        ...prev,
        vehicle: "Airport Executive Transfer (JKIA / Wilson)",
      }));
    } else if (type === "chauffeur") {
      setFormData((prev) => ({
        ...prev,
        vehicle: "Safari 4x4 Cruiser (Pop-Up Roof + Safari Guide)",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        vehicle: "Toyota Prado TX (4x4 Expedition)",
      }));
    }
  };

  const handleVehicleChange = (vehicle: string) => {
    setFormData((prev) => ({ ...prev, vehicle }));
    const lower = vehicle.toLowerCase();
    if (lower.includes("transfer") || lower.includes("airport")) {
      setServiceType("transfer");
    } else if (lower.includes("chauffeur") || lower.includes("guide")) {
      setServiceType("chauffeur");
    } else {
      setServiceType("self-drive");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const payload = {
        serviceType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        vehicle: formData.vehicle,
        rentalDates: `${formData.rentalStartDate} to ${formData.rentalEndDate || "TBD"}`,
        bookingRef: formData.bookingRef || formData.flightOrLocation || "Online Check-In",
        licenseFront: licenseFront?.base64,
        licenseBack: licenseBack?.base64,
        passportDoc: passportDoc?.base64,
        extraDoc: extraDoc?.base64,
        signature: signatureData,
        termsAgreed: true,
        notes: formData.notes,
      };

      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(result.error || "Failed to process check-in.");
      }

      const code = result.refCode || `SAS-CKIN-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(code);
      setSubmissionTimestamp(new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }));
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please check your connection.";
      setSubmissionError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppConfirmation = () => {
    const serviceLabel =
      serviceType === "transfer"
        ? "Airport Transfer"
        : serviceType === "chauffeur"
        ? "Chauffeured Safari"
        : "Self-Drive 4x4";

    const text = `Hello Stevinson Adventure Safari! I have completed my Online Check-In.\n\n*Reference:* ${confirmationCode}\n*Service:* ${serviceLabel}\n*Name:* ${formData.fullName}\n*Vehicle:* ${formData.vehicle}\n*Dates:* ${formData.rentalStartDate} to ${formData.rentalEndDate || "TBD"}\n*Pickup/Flight:* ${formData.flightOrLocation || "JKIA Airport"}\n\nMy details, identification, and signed agreement are submitted.`;
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadReceipt = () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1450;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Outer Border
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Top Header Banner
      ctx.fillStyle = "#2b3524";
      ctx.fillRect(32, 32, canvas.width - 64, 150);

      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 40px serif";
      ctx.fillText("STEVINSON ADVENTURE SAFARI", 60, 95);

      ctx.fillStyle = "#d66b44";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("FAST-TRACK CHECK-IN VOUCHER & RECEIPT", 60, 135);

      // Confirmation Code Box
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(canvas.width - 390, 60, 330, 90);
      ctx.strokeStyle = "#3b4732";
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width - 390, 60, 330, 90);

      ctx.fillStyle = "#666666";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("CONFIRMATION CODE", canvas.width - 370, 92);

      ctx.fillStyle = "#2b3524";
      ctx.font = "bold 26px monospace";
      ctx.fillText(confirmationCode || "SAS-CKIN-CONFIRMED", canvas.width - 370, 130);

      // Section 1: Lead Traveler Details (Left Column)
      ctx.fillStyle = "#888888";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("LEAD TRAVELER / RENTER", 60, 250);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(formData.fullName || "Traveler", 60, 290);

      ctx.fillStyle = "#4b5563";
      ctx.font = "20px sans-serif";
      ctx.fillText(`${formData.phone} • ${formData.email}`, 60, 325);

      if (formData.nationality) {
        ctx.fillStyle = "#6b7280";
        ctx.font = "18px sans-serif";
        ctx.fillText(`Origin / Nationality: ${formData.nationality}`, 60, 360);
      }

      // Section 2: Assigned Vehicle / Service (Right Column)
      ctx.fillStyle = "#888888";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("SERVICE & VEHICLE ASSIGNED", 640, 250);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(formData.vehicle || "Service Booked", 640, 290);

      ctx.fillStyle = "#d66b44";
      ctx.font = "bold 20px sans-serif";
      const serviceDisplay =
        serviceType === "transfer"
          ? "Airport Executive Transfer (Chauffeured)"
          : serviceType === "chauffeur"
          ? "Safari Tour (Chauffeured Guide)"
          : "Self-Drive 4x4 Vehicle Hire";
      ctx.fillText(serviceDisplay, 640, 325);

      // Dates & Pickup
      ctx.fillStyle = "#888888";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("DATES & SCHEDULE", 60, 430);
      ctx.fillStyle = "#111827";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(
        `${formData.rentalStartDate} ${formData.rentalEndDate ? `to ${formData.rentalEndDate}` : ""}`,
        60,
        465
      );

      ctx.fillStyle = "#888888";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("PICKUP / FLIGHT", 640, 430);
      ctx.fillStyle = "#111827";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(formData.flightOrLocation || "J.K.I.A Terminal (To be coordinated)", 640, 465);

      // Verification Box
      ctx.fillStyle = "#fbfaf8";
      ctx.fillRect(60, 520, canvas.width - 120, 210);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(60, 520, canvas.width - 120, 210);

      ctx.fillStyle = "#2b3524";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("VERIFICATION AUDIT STATUS", 90, 565);

      ctx.fillStyle = "#059669";
      ctx.font = "bold 19px sans-serif";
      ctx.fillText("✔ Passport / ID Verified & Encrypted On File", 90, 610);
      ctx.fillText(
        isSelfDrive ? "✔ Driving License Verified (Front & Back)" : "✔ Professional Chauffeur Assigned",
        90,
        650
      );
      ctx.fillText("✔ Rental Agreement Digitally Countersigned", 90, 690);

      ctx.fillStyle = "#6b7280";
      ctx.font = "18px sans-serif";
      ctx.fillText(`Issued: ${submissionTimestamp || new Date().toLocaleDateString()}`, 640, 690);

      // Finish & trigger download
      const finishDownload = () => {
        // Approval Stamp
        ctx.strokeStyle = "#059669";
        ctx.lineWidth = 3;
        ctx.strokeRect(canvas.width - 380, 800, 310, 95);
        ctx.fillStyle = "#059669";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("FAST-TRACK APPROVED", canvas.width - 365, 842);
        ctx.font = "15px sans-serif";
        ctx.fillText("Stevinson Safari Operations", canvas.width - 340, 872);

        // Footer
        ctx.fillStyle = "#9ca3af";
        ctx.font = "17px sans-serif";
        ctx.fillText(
          "Stevinson Adventure Safari • Murang'a Rd, Ngara, Nairobi",
          60,
          canvas.height - 90
        );
        ctx.fillText(
          "Tel: +254 715 494 311 • Stevinsonadventure44@gmail.com",
          60,
          canvas.height - 60
        );

        // Trigger Download
        const a = document.createElement("a");
        a.download = `Stevinson-CheckIn-${confirmationCode || "Voucher"}.png`;
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsDownloading(false);
      };

      if (signatureData) {
        const sigImg = new window.Image();
        sigImg.crossOrigin = "anonymous";
        sigImg.onload = () => {
          ctx.fillStyle = "#6b7280";
          ctx.font = "bold 16px sans-serif";
          ctx.fillText("AUTHORIZED DIGITAL SIGNATURE:", 60, 785);
          ctx.drawImage(sigImg, 60, 800, 260, 90);
          ctx.fillStyle = "#9ca3af";
          ctx.font = "15px sans-serif";
          ctx.fillText("Kenya Electronic Transactions Act Compliance", 60, 920);
          finishDownload();
        };
        sigImg.onerror = () => {
          finishDownload();
        };
        sigImg.src = signatureData;
      } else {
        finishDownload();
      }
    } catch (err) {
      console.error("Receipt download failed:", err);
      setIsDownloading(false);
      window.print();
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden font-sans print:border-none print:shadow-none print:p-0 print:rounded-none">
      
      {/* Step Progress Bar (Hidden on Print & on Success Step 4) */}
      {currentStep !== 4 && (
        <div className="bg-[#1a2119] px-4 sm:px-8 py-3.5 sm:py-4 text-white border-b border-[#2b3524] no-print print:hidden">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            
            {/* Step 1 Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                  currentStep >= 1
                    ? "bg-[#d66b44] text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                1
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white/90">
                <span className="sm:hidden">Renter</span>
                <span className="hidden sm:inline">Service &amp; Renter</span>
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-2 sm:mx-3 ${currentStep >= 2 ? "bg-[#d66b44]" : "bg-white/10"}`} />

            {/* Step 2 Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                  currentStep >= 2
                    ? "bg-[#d66b44] text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                2
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white/90">
                <span className="sm:hidden">Docs</span>
                <span className="hidden sm:inline">Documents</span>
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-2 sm:mx-3 ${currentStep >= 3 ? "bg-[#d66b44]" : "bg-white/10"}`} />

            {/* Step 3 Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                  currentStep >= 3
                    ? "bg-[#d66b44] text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                3
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white/90">
                <span className="sm:hidden">Sign</span>
                <span className="hidden sm:inline">Agreement &amp; Signature</span>
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Form Content Area */}
      <div className="p-4 sm:p-8 md:p-10 print:p-0">

        {/* ==================== STEP 1: SERVICE & RENTER DETAILS ==================== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2b3524]">
                1. Select Service &amp; Renter Details
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Choose your trip type so we adapt required verification documents accordingly.
              </p>
            </div>

            {/* Service Category Selector (Question 2: Choose Documents Dynamically) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider block">
                Trip / Service Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Option A: Self-Drive */}
                <button
                  type="button"
                  onClick={() => handleServiceTypeChange("self-drive")}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    serviceType === "self-drive"
                      ? "border-[#d66b44] bg-[#fbf5f2] ring-2 ring-[#d66b44]/20 shadow-xs"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Car className={`w-5 h-5 ${serviceType === "self-drive" ? "text-[#d66b44]" : "text-neutral-500"}`} />
                    {serviceType === "self-drive" && (
                      <CheckCircle2 className="w-4 h-4 text-[#d66b44]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#2b3524] block">
                    Self-Drive 4x4
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    You drive yourself. Requires Driving License &amp; Passport/ID.
                  </span>
                </button>

                {/* Option B: Airport Transfer */}
                <button
                  type="button"
                  onClick={() => handleServiceTypeChange("transfer")}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    serviceType === "transfer"
                      ? "border-[#d66b44] bg-[#fbf5f2] ring-2 ring-[#d66b44]/20 shadow-xs"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Plane className={`w-5 h-5 ${serviceType === "transfer" ? "text-[#d66b44]" : "text-neutral-500"}`} />
                    {serviceType === "transfer" && (
                      <CheckCircle2 className="w-4 h-4 text-[#d66b44]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#2b3524] block">
                    Airport Transfer
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    Driver provided. Driving License NOT required.
                  </span>
                </button>

                {/* Option C: Chauffeured Safari */}
                <button
                  type="button"
                  onClick={() => handleServiceTypeChange("chauffeur")}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    serviceType === "chauffeur"
                      ? "border-[#d66b44] bg-[#fbf5f2] ring-2 ring-[#d66b44]/20 shadow-xs"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Compass className={`w-5 h-5 ${serviceType === "chauffeur" ? "text-[#d66b44]" : "text-neutral-500"}`} />
                    {serviceType === "chauffeur" && (
                      <CheckCircle2 className="w-4 h-4 text-[#d66b44]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#2b3524] block">
                    Chauffeured &amp; Safari
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    Guide provided. Driving License NOT required.
                  </span>
                </button>

              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d66b44]" />
                    <span>Lead Traveler Legal Name *</span>
                  </span>
                  {touched.fullName && !fullNameError && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Valid
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan David Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  onBlur={() => markTouched("fullName")}
                  className={`w-full px-3.5 py-3 sm:py-2.5 rounded-lg border text-base sm:text-sm font-semibold text-[#2b3524] outline-none transition-all ${
                    fullNameError
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : touched.fullName
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20"
                  }`}
                />
                {fullNameError && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{fullNameError}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#d66b44]" />
                    <span>Email Address *</span>
                  </span>
                  {touched.email && !emailError && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Valid
                    </span>
                  )}
                </label>
                <input
                  type="email"
                  required
                  placeholder="john.smith@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => markTouched("email")}
                  className={`w-full px-3.5 py-3 sm:py-2.5 rounded-lg border text-base sm:text-sm font-semibold text-[#2b3524] outline-none transition-all ${
                    emailError
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : touched.email
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20"
                  }`}
                />
                {emailError && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              {/* WhatsApp / Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d66b44]" />
                    <span>WhatsApp / Mobile Number *</span>
                  </span>
                  {touched.phone && !phoneError && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Valid
                    </span>
                  )}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +254 715 494 311 or +44 7123 456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onBlur={() => markTouched("phone")}
                  className={`w-full px-3.5 py-3 sm:py-2.5 rounded-lg border text-base sm:text-sm font-semibold text-[#2b3524] outline-none transition-all ${
                    phoneError
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : touched.phone
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20"
                  }`}
                />
                {phoneError ? (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-neutral-400 mt-1">Include country code for airport pickup coordination</p>
                )}
              </div>

              {/* Country / Nationality */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#d66b44]" />
                    <span>Country of Residence / Nationality *</span>
                  </span>
                  {touched.nationality && !nationalityError && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Valid
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. United Kingdom, Germany, USA, Kenya"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  onBlur={() => markTouched("nationality")}
                  className={`w-full px-3.5 py-3 sm:py-2.5 rounded-lg border text-base sm:text-sm font-semibold text-[#2b3524] outline-none transition-all ${
                    nationalityError
                      ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : touched.nationality
                      ? "border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20"
                  }`}
                />
                {nationalityError && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{nationalityError}</span>
                  </p>
                )}
              </div>

              {/* Vehicle Preference */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#d66b44]" />
                  <span>Vehicle Assigned / Preference</span>
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => handleVehicleChange(e.target.value)}
                  className="w-full px-3.5 py-3 sm:py-2.5 rounded-lg border border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20 outline-none text-base sm:text-sm font-semibold text-[#2b3524] bg-white cursor-pointer"
                >
                  <option>Toyota Prado TX (4x4 Expedition)</option>
                  <option>Safari 4x4 Cruiser (Pop-Up Roof)</option>
                  <option>Toyota Noah (7-Seater Family Van)</option>
                  <option>Toyota Fielder (Station Wagon)</option>
                  <option>Airport Executive Transfer (JKIA / Wilson)</option>
                  <option>Safari 4x4 Cruiser (Pop-Up Roof + Safari Guide)</option>
                  <option>Custom Itinerary / Chauffeured Guide</option>
                </select>
              </div>

              {/* Rental Dates (Responsive Grid - never overflows on mobile) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#d66b44]" />
                  <span>{isSelfDrive ? "Rental Dates (Start → End) *" : "Trip / Transfer Date *"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <div>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.rentalStartDate}
                      onChange={(e) => setFormData({ ...formData, rentalStartDate: e.target.value })}
                      onBlur={() => markTouched("rentalStartDate")}
                      className={`w-full min-w-0 px-2.5 py-2.5 sm:py-2 rounded-lg border outline-none text-xs sm:text-sm font-semibold text-[#2b3524] ${
                        startDateError ? "border-red-400 bg-red-50/20" : "border-neutral-300 focus:border-[#d66b44]"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      placeholder="End date"
                      min={formData.rentalStartDate || new Date().toISOString().split("T")[0]}
                      value={formData.rentalEndDate}
                      onChange={(e) => setFormData({ ...formData, rentalEndDate: e.target.value })}
                      onBlur={() => markTouched("rentalEndDate")}
                      className={`w-full min-w-0 px-2.5 py-2.5 sm:py-2 rounded-lg border outline-none text-xs sm:text-sm font-semibold text-[#2b3524] ${
                        endDateError ? "border-red-400 bg-red-50/20" : "border-neutral-300 focus:border-[#d66b44]"
                      }`}
                    />
                  </div>
                </div>
                {(startDateError || endDateError) && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{startDateError || endDateError}</span>
                  </p>
                )}
              </div>

              {/* Flight No. or Pickup */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#d66b44]" />
                  <span>Flight Number or Airport Terminal / Hotel Pickup</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. KQ 101 arriving J.K.I.A Terminal 1A or Serena Hotel Nairobi"
                  value={formData.flightOrLocation}
                  onChange={(e) => setFormData({ ...formData, flightOrLocation: e.target.value })}
                  className="w-full px-3.5 py-3 sm:py-2.5 rounded-lg border border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20 outline-none text-base sm:text-sm font-semibold text-[#2b3524]"
                />
                <p className="text-[10px] text-neutral-400 mt-1">Live flight monitor active for seamless inside-terminal meet &amp; greet</p>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={handleProceedToStep2}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.98] ${
                  isStep1Valid
                    ? "bg-[#2b3524] hover:bg-[#3b4732] text-white"
                    : "bg-neutral-800 text-white hover:bg-neutral-900"
                }`}
              >
                <span>Continue to Document Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 2: DYNAMIC DOCUMENT UPLOAD ==================== */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2b3524]">
                  2. Document Verification
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fbf5f2] text-[#d66b44] border border-[#d66b44]/20">
                  {isSelfDrive ? "🚗 Self-Drive Requirements (4 Docs)" : "✈️ Airport Transfer / Chauffeur (ID Only)"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {isSelfDrive
                  ? "For self-drive hires, Kenya regulations and insurance require a valid driving license (both sides) and photo identification."
                  : "Because a professional Stevinson chauffeur is provided for this service, a driving license is NOT required. Only your identification is needed."}
              </p>
            </div>

            {/* Smart Banner Explaining Requirements */}
            {!isSelfDrive ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-emerald-950 leading-relaxed shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-emerald-900 block text-sm">
                    No Driving License Required for this Service
                  </strong>
                  You selected an <strong>Airport Transfer / Chauffeured Tour</strong>. Since our professional Stevinson driver will be behind the wheel, driving license fields are hidden. You only need to upload your <strong>Passport or National ID</strong> for airport security clearance and arrival manifest.
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-950 leading-relaxed shadow-xs">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-900 block text-sm">
                    Self-Drive Verification Required
                  </strong>
                  For self-drive hires, please upload clear photos of your <strong>Driving License (Front &amp; Back)</strong> and your <strong>Passport or National ID</strong>.
                </div>
              </div>
            )}

            {/* Document Upload Cards Grid: DYNAMICALLY OMIT DRIVING LICENSE FOR TRANSFERS */}
            <div className={`grid gap-5 sm:gap-6 ${isSelfDrive ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 max-w-3xl"}`}>
              
              {/* Driving License Front & Back: ONLY RENDERED FOR SELF-DRIVE */}
              {isSelfDrive && (
                <>
                  <DocumentUploadCard
                    label="Driving License (Front)"
                    description="Must show photo & validity"
                    required={true}
                    doc={licenseFront}
                    onDocChange={setLicenseFront}
                  />

                  <DocumentUploadCard
                    label="Driving License (Back)"
                    description="Must show vehicle classes"
                    required={true}
                    doc={licenseBack}
                    onDocChange={setLicenseBack}
                  />
                </>
              )}

              {/* Passport / National ID (Always Required for security/check-in) */}
              <DocumentUploadCard
                label={isSelfDrive ? "Passport / National ID" : "Passport / National ID (Primary Traveler)"}
                description={isSelfDrive ? "Photo & details page" : "Required for airport security & driver handoff"}
                required={true}
                doc={passportDoc}
                onDocChange={setPassportDoc}
              />

              {/* Extra Document (Flight confirmation, hotel voucher) */}
              <DocumentUploadCard
                label={isSelfDrive ? "Flight Ticket or Booking Voucher" : "Flight Ticket / Boarding Pass"}
                description={isSelfDrive ? "Optional confirmation" : "Helps our driver track terminal arrival"}
                required={false}
                doc={extraDoc}
                onDocChange={setExtraDoc}
              />
            </div>

            {/* Special Notes / Requests */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#d66b44]" />
                <span>Special Requests or Notes (Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Request child booster seat, extra luggage space, specific terminal door meet, or flight delay notes."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:border-[#d66b44] focus:ring-2 focus:ring-[#d66b44]/20 outline-none text-sm font-semibold text-[#2b3524]"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-lg border border-neutral-300 text-xs sm:text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Renter Info</span>
              </button>

              <button
                type="button"
                disabled={!isStep2Valid}
                onClick={() => {
                  setCurrentStep(3);
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isStep2Valid
                    ? "bg-[#2b3524] hover:bg-[#3b4732] text-white shadow-md active:scale-[0.98]"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                <span>Continue to Signature</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== STEP 3: AGREEMENT & SIGNATURE ==================== */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2b3524]">
                3. Rental Agreement &amp; Digital Signature
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Review the core service terms and provide your digital signature to confirm your vehicle handover.
              </p>
            </div>

            {/* Dynamic Terms Summary based on Service Type */}
            <div className="bg-[#fbfaf8] border border-neutral-200 rounded-xl p-4 sm:p-5 text-xs text-neutral-600 space-y-2.5 max-h-48 overflow-y-auto leading-relaxed">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2b3524] uppercase tracking-wider mb-1">
                <Shield className="w-4 h-4 text-[#d66b44]" />
                <span>
                  {isSelfDrive
                    ? "Summary of Self-Drive Rental Terms"
                    : "Summary of Transfer & Chauffeur Service Terms"}
                </span>
              </div>
              {isSelfDrive ? (
                <>
                  <p>
                    <strong>1. Driver Eligibility:</strong> The renter must hold a valid national driving license or International Driving Permit (IDP) and be at least 23 years of age.
                  </p>
                  <p>
                    <strong>2. Vehicle Handover:</strong> The vehicle is delivered with full roadworthy inspection, tools, spare tire, and clean condition. Renter agrees to inspect and report any existing marks at delivery.
                  </p>
                  <p>
                    <strong>3. Insurance &amp; Liability:</strong> Comprehensive commercial rental insurance is included. Renter is responsible for applicable damage excess in case of blameworthy collisions or negligence.
                  </p>
                  <p>
                    <strong>4. Prohibited Usage:</strong> Off-track driving in designated national park wilderness, driving under the influence of alcohol/drugs, and unauthorized sub-leasing are strictly prohibited.
                  </p>
                  <p>
                    <strong>5. Fuel &amp; Traffic Fines:</strong> Vehicles are delivered full-to-full or matched level. Renter is responsible for official traffic fines incurred during the hire period.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Meet &amp; Greet Service:</strong> A certified Stevinson driver will meet you inside the airport terminal or hotel lobby with a personalized name-board.
                  </p>
                  <p>
                    <strong>2. Flight Delay Buffer:</strong> Free 90-minute customs and baggage clearance buffer included. We track flights live for delayed landings.
                  </p>
                  <p>
                    <strong>3. Luggage &amp; Safety:</strong> Full luggage assistance is included. Passenger seatbelts must be worn at all times in transit.
                  </p>
                  <p>
                    <strong>4. Chauffeur Standards:</strong> Your assigned driver is licensed, professional, and knowledgeable on optimal expressway routing and Nairobi traffic.
                  </p>
                </>
              )}
            </div>

            {/* Checkbox Agreement */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#d66b44] focus:ring-[#d66b44] cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-[#2b3524] font-medium leading-snug">
                I confirm that all information provided is accurate. I accept the Stevinson Adventure Safari service terms and acknowledge this digital signature is legally binding.
              </span>
            </label>

            {/* Digital Signature Pad */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider block">
                Digital Signature *
              </label>
              <SignaturePad onChange={setSignatureData} required />
              {!signatureData && (
                <p className="text-[11px] text-amber-600 font-medium">
                  Please sign with your finger, mouse, or upload a signature image above.
                </p>
              )}
            </div>

            {submissionError && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                ⚠️ {submissionError}
              </div>
            )}

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-lg border border-neutral-300 text-xs sm:text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Documents</span>
              </button>

              <button
                type="submit"
                disabled={!isStep3Valid || isSubmitting}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-md ${
                  isStep3Valid && !isSubmitting
                    ? "bg-[#25D366] hover:bg-[#1ebd5b] text-white active:scale-[0.98]"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying &amp; Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Online Check-In</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 4: 1-PAGE PRINTABLE VOUCHER RECEIPT ==================== */}
        {currentStep === 4 && (
          <div className="py-2 sm:py-4 space-y-6">
            
            {/* Screen-Only Header Notice */}
            <div className="text-center no-print print:hidden space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-[#d66b44] uppercase tracking-widest block">
                Check-In Pre-Verified &amp; Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b3524]">
                You&apos;re All Set for Fast-Track Pickup!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
                Your pre-arrival verification is complete. Tapping &quot;Print Receipt&quot; prints a clean <strong>single-page voucher</strong>.
              </p>
            </div>

            {/* ========================================================
                THE PRINTABLE RECEIPT (Optimized for exact 1-page A4)
                ======================================================== */}
            <div
              id="printable-receipt"
              className="printable-receipt bg-white border border-neutral-200 rounded-xl p-5 sm:p-7 max-w-2xl mx-auto text-left shadow-xs space-y-4"
            >
              {/* Voucher Top Letterhead */}
              <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Stevinson Adventure Safari"
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#2b3524] uppercase tracking-tight leading-none">
                      Stevinson Adventure Safari
                    </h3>
                    <p className="text-[10px] text-[#d66b44] font-bold tracking-widest uppercase mt-0.5">
                      Fast-Track Check-In Voucher &amp; Receipt
                    </p>
                  </div>
                </div>

                {/* Reference Box */}
                <div className="text-right">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block">
                    Confirmation Code
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-[#2b3524] bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded inline-block mt-0.5">
                    {confirmationCode}
                  </span>
                </div>
              </div>

              {/* 2-Column Summary Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-b border-neutral-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Lead Traveler / Renter
                  </span>
                  <span className="font-bold text-[#2b3524] text-sm block">
                    {formData.fullName}
                  </span>
                  <span className="text-neutral-500 block text-[11px]">
                    {formData.phone} • {formData.email}
                  </span>
                  {formData.nationality && (
                    <span className="text-neutral-400 block text-[10px]">
                      Origin: {formData.nationality}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Service &amp; Vehicle
                  </span>
                  <span className="font-bold text-[#2b3524] text-sm block">
                    {formData.vehicle}
                  </span>
                  <span className="text-[#d66b44] font-semibold block text-[11px]">
                    {serviceType === "transfer"
                      ? "Airport Transfer (Chauffeured)"
                      : serviceType === "chauffeur"
                      ? "Safari Tour (Chauffeured Guide)"
                      : "Self-Drive 4x4 Hire"}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Dates &amp; Schedule
                  </span>
                  <span className="font-semibold text-neutral-800 text-xs">
                    {formData.rentalStartDate} {formData.rentalEndDate ? `→ ${formData.rentalEndDate}` : ""}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Flight / Pickup Location
                  </span>
                  <span className="font-semibold text-neutral-800 text-xs">
                    {formData.flightOrLocation || "J.K.I.A Terminal (To be coordinated)"}
                  </span>
                </div>
              </div>

              {/* Verification & Document Status Checklist */}
              <div className="bg-[#fbfaf8] border border-neutral-200/80 rounded-lg p-2.5 text-[11px] text-neutral-600 space-y-1">
                <span className="font-bold text-[#2b3524] text-xs block mb-1">
                  Verification Audit Status:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Passport / ID Verified &amp; On File</span>
                  </span>

                  {isSelfDrive ? (
                    <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Driving License Verified</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-blue-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Professional Chauffeur Assigned</span>
                    </span>
                  )}

                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Agreement Accepted &amp; Countersigned</span>
                  </span>

                  <span className="text-neutral-500 font-medium">
                    Issued: {submissionTimestamp || "Confirmed"}
                  </span>
                </div>
              </div>

              {/* Digital Signature Presentation on Receipt */}
              <div className="border-t border-neutral-200 pt-3 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Authorized Traveler / Driver Signature:
                  </span>
                  {signatureData ? (
                    <div className="h-14 mt-1 border-b border-neutral-300 inline-block pr-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={signatureData}
                        alt="Digital Signature"
                        className="h-full object-contain max-w-[200px]"
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-mono font-bold text-neutral-700 mt-2 block">
                      [Signed Electronically by {formData.fullName}]
                    </span>
                  )}
                  <span className="text-[9px] text-neutral-400 block mt-1">
                    Kenya Electronic Transactions Act &amp; Business Laws Compliance
                  </span>
                </div>

                {/* Stamp */}
                <div className="text-right">
                  <div className="border-2 border-emerald-600 text-emerald-700 px-2.5 py-1 rounded text-center rotate-[-2deg] font-bold text-[10px] uppercase tracking-wider inline-block">
                    FAST-TRACK APPROVED
                    <span className="block text-[8px] font-normal text-emerald-800">
                      Stevinson Safari Operations
                    </span>
                  </div>
                </div>
              </div>

              {/* Printable Footer Notice */}
              <div className="border-t border-neutral-200 pt-2 text-[9px] text-neutral-400 text-center flex items-center justify-between">
                <span>Stevinson Adventure Safari • Murang&apos;a Rd, Ngara, Nairobi</span>
                <span>Tel: +254 715 494 311 • Stevinsonadventure44@gmail.com</span>
              </div>
            </div>

            {/* Screen Action Buttons (Hidden when printing!) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 max-w-xl mx-auto no-print print:hidden">
              <button
                type="button"
                onClick={handleWhatsAppConfirmation}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs sm:text-sm font-bold tracking-wide rounded-lg transition-all shadow-md shadow-[#25D366]/20 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadReceipt}
                disabled={isDownloading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 bg-[#2b3524] hover:bg-[#3b4732] text-white text-xs sm:text-sm font-bold rounded-lg transition-all shadow-xs active:scale-[0.98]"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[#d66b44]" />
                ) : (
                  <Download className="w-4 h-4 text-[#d66b44] shrink-0" />
                )}
                <span>{isDownloading ? "Generating..." : "Download Receipt"}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3.5 bg-white border border-neutral-300 hover:bg-neutral-50 text-[#2b3524] text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-xs active:scale-[0.98]"
              >
                <Printer className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Print / PDF</span>
              </button>
            </div>

            {/* Contact Help Link */}
            <p className="text-xs text-neutral-400 pt-3 text-center no-print print:hidden">
              Need to modify your booking?{" "}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d66b44] hover:underline font-semibold"
              >
                Chat with Stevinson Concierge on WhatsApp
              </a>
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
