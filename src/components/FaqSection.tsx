import Link from "next/link";
import { HelpCircle, ChevronDown, CheckCircle2, Plane, ShieldCheck, Clock } from "lucide-react";

export const faqItems = [
  {
    question: "What is the best car rental for airport transfers at JKIA Nairobi?",
    answer:
      "Stevinson Adventure Safari provides dedicated inside-terminal meet-and-greet airport transfers at Jomo Kenyatta International Airport (JKIA) and Wilson Airport in Nairobi. Our drivers track your incoming flight in real time with zero extra charges for flight delays, meeting you directly outside baggage claim with a personalized name board.",
  },
  {
    question: "What are the requirements to rent a self-drive car in Kenya?",
    answer:
      "To rent a self-drive vehicle in Kenya, drivers must be at least 21 years old and hold a valid national driving license held for a minimum of 2 years. International visitors can drive using their valid home country driving license or an International Driving Permit (IDP) alongside their original passport.",
  },
  {
    question: "Are there hidden fees, deposit policies, or mileage limits?",
    answer:
      "No hidden fees. We offer transparent daily rates starting from KES 5,000/day with unlimited mileage options available on safari expedition rentals. Standard rentals require a refundable security deposit (from KES 40,000 to KES 50,000 depending on category) and comprehensive insurance cover with explicit excess terms stated on our official rental contract.",
  },
  {
    question: "How does the airport pickup and vehicle delivery process work?",
    answer:
      "Airport pickup follows a seamless 3-step workflow: 1) Share your flight number, arrival date, and chosen vehicle via WhatsApp; 2) Our concierge monitors your flight and meets you at the arrivals terminal with a name board; 3) Complete a quick 5-minute inspection, sign the contract, and receive your keys right at the airport.",
  },
  {
    question: "Can I take rental 4x4 vehicles to Masai Mara, Amboseli, and remote national parks?",
    answer:
      "Yes. Our fleet includes purpose-built 4WD Toyota Prado TX and Land Cruiser safari vehicles equipped with high ground clearance, all-terrain tires, and heavy-duty suspension specifically maintained for the rough terrains of Masai Mara, Amboseli, Samburu, and Tsavo.",
  },
  {
    question: "Do you offer long-term car hire and corporate discounts in Nairobi?",
    answer:
      "Yes. We provide flexible weekly and monthly long-term car rental packages with discounted corporate rates, scheduled routine maintenance, and complimentary replacement vehicles in Nairobi and across Kenya.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-[#e5e0d8]">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d66b44] block mb-2">
            Clear Answers &amp; Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2b3524] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-[#d66b44] mx-auto mt-4" />
          <p className="text-[#2b3524]/75 text-sm sm:text-base mt-4">
            Everything you need to know about renting a 4x4, airport pickups at JKIA, insurance excess, and safari logistics in Kenya.
          </p>
        </div>

        {/* 3-Step Logistics Flow (AEO Structure) */}
        <div className="mb-14 p-6 sm:p-8 bg-[#f7f5f0] border border-[#e5e0d8] rounded-2xl">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d66b44] mb-6 text-center">
            How Airport Delivery &amp; Self-Drive Works (3 Simple Steps)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-[#e5e0d8]/80 shadow-xs">
              <span className="w-8 h-8 rounded-full bg-[#2b3524] text-white text-xs font-bold flex items-center justify-center mb-3">
                1
              </span>
              <h4 className="font-serif font-bold text-[#2b3524] text-base mb-1">Reserve on WhatsApp</h4>
              <p className="text-xs text-[#2b3524]/70 leading-relaxed">
                Choose your vehicle, select your dates, and confirm availability directly with Steve.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-[#e5e0d8]/80 shadow-xs">
              <span className="w-8 h-8 rounded-full bg-[#d66b44] text-white text-xs font-bold flex items-center justify-center mb-3">
                2
              </span>
              <h4 className="font-serif font-bold text-[#2b3524] text-base mb-1">Terminal Meet &amp; Greet</h4>
              <p className="text-xs text-[#2b3524]/70 leading-relaxed">
                We track your flight in real time and meet you right outside baggage claim at JKIA or Wilson.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-[#e5e0d8]/80 shadow-xs">
              <span className="w-8 h-8 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center mb-3">
                3
              </span>
              <h4 className="font-serif font-bold text-[#2b3524] text-base mb-1">Quick Handover</h4>
              <p className="text-xs text-[#2b3524]/70 leading-relaxed">
                Conduct a 5-minute vehicle walkthrough, sign your contract, and hit the Kenyan road.
              </p>
            </div>
          </div>
        </div>

        {/* Q&A Accordion / List - Formatted for AI Answer Engines */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-[#f7f5f0] border border-[#e5e0d8] rounded-xl hover:border-[#d66b44]/50 transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b3524] mb-3 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#d66b44] shrink-0 mt-0.5" />
                <span>{item.question}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#2b3524]/80 leading-relaxed pl-8">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#2b3524]/70">
            Have a custom safari route or special request?{" "}
            <a
              href="#contact"
              className="text-[#d66b44] font-bold underline hover:text-[#c55a33] transition-colors"
            >
              Talk directly with our team
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
