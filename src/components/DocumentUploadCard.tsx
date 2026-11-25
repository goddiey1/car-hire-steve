"use client";

import { useState, useRef } from "react";
import { Upload, CheckCircle2, X, FileText, Image as ImageIcon } from "lucide-react";

export interface UploadedDoc {
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  base64?: string;
}

interface DocumentUploadCardProps {
  label: string;
  description: string;
  required?: boolean;
  doc: UploadedDoc | null;
  onDocChange: (doc: UploadedDoc | null) => void;
}

export default function DocumentUploadCard({
  label,
  description,
  required = false,
  doc,
  onDocChange,
}: DocumentUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    setError(null);
    if (!file) return;

    // Check size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    // Check mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setError("Accepted formats: JPG, PNG, WEBP, or PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const previewUrl = file.type.startsWith("image/") ? base64 : "";
      onDocChange({
        file,
        name: file.name,
        size: file.size,
        previewUrl,
        base64,
      });
    };
    reader.onerror = () => {
      setError("Failed to read file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const removeDoc = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDocChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5">
        <label className="text-xs font-bold text-[#2b3524] uppercase tracking-wider flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        <span className="text-[11px] text-neutral-400">{description}</span>
      </div>

      {!doc ? (
        <label
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center w-full h-32 sm:h-36 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer bg-[#fbfaf8] hover:bg-neutral-50 hover:border-[#d66b44] transition-all p-3 text-center group"
        >
          <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-[#d66b44] transition-colors mb-2">
            <Upload className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-[#2b3524] group-hover:text-[#d66b44] transition-colors">
            Tap to upload or take a photo
          </span>
          <span className="text-[10px] text-neutral-400 mt-0.5">
            JPG, PNG or PDF (Max 5MB)
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      ) : (
        <div className="relative w-full border border-neutral-200 bg-[#fbfaf8] rounded-xl p-3 flex items-center gap-3 shadow-xs">
          {/* Thumbnail / Icon */}
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-200 flex items-center justify-center shrink-0 border border-neutral-300/80">
            {doc.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={doc.previewUrl}
                alt={label}
                className="w-full h-full object-cover"
              />
            ) : (
              <FileText className="w-6 h-6 text-neutral-500" />
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#2b3524] truncate">
                {doc.name}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              {formatSize(doc.size)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={removeDoc}
            className="absolute top-2.5 right-2.5 p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove document"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
