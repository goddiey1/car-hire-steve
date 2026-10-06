"use client";

import { useState } from "react";
import { Plane, Calendar, Users, MapPin, MessageCircle, Mail, Car, User } from "lucide-react";
import { siteConfig } from "@/lib/site";

import { useCurrency } from "./CurrencyProvider";

export default function TransferForm() {
  const [activeTab, setActiveTab] = useState("airport");
  const { convertPrice } = useCurrency();
  
  // Dummy form state for the visual
  const [formData, setFormData] = useState({
    airport: "JKIA Terminal 1A",
    destination: "",
    date: "",
    flight: "",
    guests: "2",
    luggage: "4"
  });

  const baseMinKsh = 4500;
  const baseMaxKsh = 5800;
  const minPrice = convertPrice(baseMinKsh);
  const maxPrice = convertPrice(baseMaxKsh);

  const handleWhatsApp = () => {
    if (!siteConfig.whatsapp) return;
    const text = `Hello Stevinson Adventure! I'd like to reserve an airport transfer.\n\n*From:* ${formData.airport}\n*To:* ${formData.destination || "Nairobi City"}\n*Date:* ${formData.date}\n*Flight:* ${formData.flight || "TBD"}\n*Guests:* ${formData.guests}`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-neutral-200/60 font-sans">
      
      {/* Top Tabs */}
      <div className="flex flex-col sm:flex-row w-full bg-[#1a2119] text-white/70 text-xs sm:text-[11px] font-bold tracking-widest uppercase">
        <button 
          onClick={() => setActiveTab("airport")}
          className={`flex-1 py-4 sm:py-5 px-2 flex items-center justify-center gap-2 transition-all ${activeTab === "airport" ? "bg-white text-[#2b3524]" : "hover:bg-white/10"}`}
        >
          <Plane className="w-4 h-4" /> Airport Transfer (JKIA / Wilson)
        </button>
        <button 
          onClick={() => setActiveTab("self-drive")}
          className={`flex-1 py-4 sm:py-5 px-2 flex items-center justify-center gap-2 transition-all ${activeTab === "self-drive" ? "bg-white text-[#2b3524]" : "hover:bg-white/10"}`}
        >
          <Car className="w-4 h-4" /> Self-Drive & Safari 4x4
        </button>
        <button 
          onClick={() => setActiveTab("chauffeur")}
          className={`flex-1 py-4 sm:py-5 px-2 flex items-center justify-center gap-2 transition-all ${activeTab === "chauffeur" ? "bg-white text-[#2b3524]" : "hover:bg-white/10"}`}
        >
          <User className="w-4 h-4" /> Chauffeured & Safari Guide
        </button>
      </div>

      {/* Form Body */}
      <div className="p-6 sm:p-8">
        
        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Pickup */}
          <div className="relative border border-neutral-200 rounded-lg p-3 hover:border-[#d66b44] transition-colors group cursor-text">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <Plane className="w-3 h-3 text-[#d66b44]" /> Pickup Location
            </label>
            <select className="w-full bg-transparent text-sm font-semibold text-[#2b3524] outline-none appearance-none cursor-pointer">
              <option>J.K.I.A Terminal 1A/1E (VIP Desk)</option>
              <option>Wilson Airport</option>
            </select>
            <p className="text-[10px] text-neutral-400 mt-1">Flight monitor active (Free)</p>
          </div>

          {/* Destination */}
          <div className="relative border border-neutral-200 rounded-lg p-3 hover:border-[#d66b44] transition-colors group">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <MapPin className="w-3 h-3 text-[#d66b44]" /> Destination
            </label>
            <input 
              type="text" 
              placeholder="Nairobi City / Luxury Hotel" 
              className="w-full bg-transparent text-sm font-semibold text-[#2b3524] placeholder:text-[#2b3524]/60 outline-none"
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            />
            <p className="text-[10px] text-neutral-400 mt-1">Express expressway routing</p>
          </div>

          {/* Date & Flight */}
          <div className="relative border border-neutral-200 rounded-lg p-3 hover:border-[#d66b44] transition-colors group">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <Calendar className="w-3 h-3 text-[#d66b44]" /> Date & Flight No.
            </label>
            <div className="flex gap-2">
              <input 
                type="date" 
                className="w-1/2 bg-transparent text-sm font-semibold text-[#2b3524] outline-none"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="KQ 101" 
                className="w-1/2 bg-transparent text-sm font-semibold text-[#2b3524] placeholder:text-[#2b3524]/60 outline-none"
                onChange={(e) => setFormData({...formData, flight: e.target.value})}
              />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">Free 90-minute customs buffer</p>
          </div>

          {/* Guests & Luggage */}
          <div className="relative border border-neutral-200 rounded-lg p-3 hover:border-[#d66b44] transition-colors group cursor-text">
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <Users className="w-3 h-3 text-[#d66b44]" /> Guests & Luggage
            </label>
            <div className="flex items-center text-sm font-semibold text-[#2b3524]">
              <select className="bg-transparent outline-none appearance-none cursor-pointer pr-2" onChange={(e) => setFormData({...formData, guests: e.target.value})}>
                <option value="1">1 Guest</option>
                <option value="2" selected>2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
              <span className="text-neutral-300 mx-2">|</span>
              <select className="bg-transparent outline-none appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, luggage: e.target.value})}>
                <option value="1">1 Bag</option>
                <option value="2">2 Bags</option>
                <option value="4" selected>4 Safari Duffels</option>
                <option value="5+">5+ Bags</option>
              </select>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">+ Standard Size Speciality</p>
          </div>

        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Price Estimate */}
          <div className="flex items-start gap-4 max-w-lg">
            <div className="w-10 h-10 rounded-full bg-[#f7f5f0] flex items-center justify-center shrink-0 border border-neutral-200">
              <span className="w-4 h-4 rounded-full bg-[#d66b44]"></span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Price Estimate:</span>
                <span className="text-lg font-serif font-bold text-[#2b3524]">{minPrice.symbol}{minPrice.amount} - {maxPrice.symbol}{maxPrice.amount} {minPrice.code}</span>
                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Flat Rate</span>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500 mt-1 leading-relaxed">
                Includes inside-terminal meet & greet, incident management, parking fees, and roadblock navigating. No hidden extras.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
            <button 
              onClick={handleWhatsApp}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-sm font-bold tracking-wide rounded transition-all shadow-lg shadow-[#25D366]/30"
            >
              <MessageCircle className="w-5 h-5" /> Reserve Instantly via WhatsApp
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-[#2b3524] text-sm font-bold tracking-wide rounded transition-all">
              <Mail className="w-4 h-4 text-neutral-400" /> Email Enquiry
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
