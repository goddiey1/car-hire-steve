"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Eraser, Upload, Edit3, CheckCircle2 } from "lucide-react";

interface SignaturePadProps {
  onChange: (dataUrl: string | null) => void;
  required?: boolean;
}

export default function SignaturePad({ onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<"draw" | "upload">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [savedDrawing, setSavedDrawing] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize and size the canvas with High-DPI support
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Read previous drawing if existing
    const prevData = savedDrawing;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1a2119";

    // Restore previous drawing if there was one
    if (prevData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = prevData;
    }
  }, [savedDrawing]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if pointer capture not supported
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (!hasDrawn) {
      setHasDrawn(true);
    }
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.closePath();
      const dataUrl = canvas.toDataURL("image/png");
      setSavedDrawing(dataUrl);
      setHasDrawn(true);
      onChange(dataUrl);
    }
    setIsDrawing(false);
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
    setSavedDrawing(null);
    onChange(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Signature image must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedImage(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const clearUpload = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <div className="w-full">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-neutral-200 mb-3 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("draw");
              onChange(savedDrawing);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              mode === "draw"
                ? "bg-[#2b3524] text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Draw with Finger / Mouse</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("upload");
              onChange(uploadedImage);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              mode === "upload"
                ? "bg-[#2b3524] text-white shadow-sm"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Signature</span>
          </button>
        </div>

        {/* Clear Action */}
        {mode === "draw" && hasDrawn && (
          <button
            type="button"
            onClick={clearDrawing}
            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}

        {mode === "upload" && uploadedImage && (
          <button
            type="button"
            onClick={clearUpload}
            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>

      {/* Draw Mode Container (Always mounted to preserve strokes) */}
      <div className={mode === "draw" ? "block" : "hidden"}>
        <div className="relative w-full bg-[#fbfaf8] border-2 border-dashed border-neutral-300 rounded-xl overflow-hidden group hover:border-[#d66b44] transition-colors">
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            className="w-full h-40 sm:h-44 touch-none cursor-crosshair block"
            style={{ touchAction: "none" }}
          />

          {/* Guide Line & Instruction */}
          <div className="pointer-events-none absolute inset-x-6 bottom-7 border-b border-neutral-300 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 font-medium bg-[#fbfaf8] px-1 -translate-y-2.5">
              Sign above this line
            </span>
            <span className="text-[10px] text-neutral-400 font-medium bg-[#fbfaf8] px-1 -translate-y-2.5 sm:inline hidden">
              Touchscreen &amp; Mouse supported
            </span>
          </div>

          {hasDrawn && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Signed</span>
            </div>
          )}
        </div>
      </div>

      {/* Upload Mode Container */}
      <div className={mode === "upload" ? "block" : "hidden"}>
        <div className="w-full">
          {!uploadedImage ? (
            <label className="flex flex-col items-center justify-center w-full h-40 sm:h-44 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer bg-[#fbfaf8] hover:bg-neutral-50 hover:border-[#d66b44] transition-all p-4 text-center">
              <Upload className="w-8 h-8 text-neutral-400 mb-2" />
              <span className="text-xs font-semibold text-[#2b3524]">
                Click or tap to upload signature photo
              </span>
              <span className="text-[11px] text-neutral-400 mt-1">
                PNG, JPG or WEBP (Max 5MB)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          ) : (
            <div className="relative w-full h-40 sm:h-44 bg-[#fbfaf8] border-2 border-neutral-300 rounded-xl flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploadedImage}
                alt="Uploaded Signature"
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Uploaded</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
