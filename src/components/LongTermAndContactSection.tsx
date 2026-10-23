import { siteConfig } from "@/lib/site";
import { CalendarRange, MessageCircle, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LongTermAndContactSection() {
  const whatsappLongTerm = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Stevinson Adventure Safari, I am interested in inquiring about your long-term vehicle hire options."
  )}`;

  const whatsappTalkToUs = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Stevinson Adventure Safari, I would like to talk to you about vehicle rental and safari options."
  )}`;

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#f7f5f0] border-t border-[#e5e0d8]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d66b44] block mb-2">
            Tailored Rental Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2b3524] tracking-tight">
            Extended Stays & Dedicated Support
          </h2>
          <div className="w-16 h-0.5 bg-[#d66b44] mx-auto mt-4" />
        </div>

        {/* Two-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Long-Term Hires */}
          <div className="bg-white rounded-2xl border border-[#e5e0d8] p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8b7355]" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355]">
                  <CalendarRange className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-[#f7f5f0] text-[#2b3524] rounded-full border border-[#e5e0d8]">
                  Extended Stays
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b3524] mb-4">
                Long-Term Hires
              </h3>

              <p className="text-[#2b3524]/75 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Hire any of our vehicles for a longer period of time with our long-term hire options. Are you travelling to Kenya for an extended period of time, or do you need a vehicle for several weeks? Book your long-term hire early and enjoy a wider range of cars to choose from.
              </p>

              <div className="space-y-2.5 mb-8 text-xs sm:text-sm font-semibold text-[#2b3524]/80">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d66b44] shrink-0" />
                  <span>Discounted weekly & monthly corporate rates</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d66b44] shrink-0" />
                  <span>Routine scheduled maintenance & replacement vehicle</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d66b44] shrink-0" />
                  <span>Flexible extension terms with zero hassle</span>
                </div>
              </div>
            </div>

            <a
              href={whatsappLongTerm}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#2b3524] hover:bg-[#1f271a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm group-hover:bg-[#d66b44]"
            >
              <span>Inquire for Long-Term Rates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 2: Talk To Us */}
          <div className="bg-white rounded-2xl border border-[#e5e0d8] p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#25D366]" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-[#25D366]/10 text-[#1b7e3e] rounded-full border border-[#25D366]/30">
                  Always Available
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b3524] mb-4">
                Talk To Us
              </h3>

              <p className="text-[#2b3524]/75 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                At Stevinson Adventure Safari, we pride ourselves on providing excellent customer service and high-quality vehicles. All of our cars are well-maintained and regularly serviced to ensure your safety and comfort on the road. Enjoy the experience of the best car hire company in Kenya. Talk to us.
              </p>

              <div className="space-y-2.5 mb-8 text-xs sm:text-sm font-semibold text-[#2b3524]/80">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>24/7 dedicated local Kenyan support on the road</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Personal concierge handoff at JKIA & Wilson</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Direct honest communication with no middlemen</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <a
                href={whatsappTalkToUs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#2b3524] hover:bg-[#1f271a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#d66b44]" />
                <span>Call Us Direct</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
