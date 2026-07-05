"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationsPage() {
  const { t, locale, isRtl } = useLanguage();
  const [activeBranch, setActiveBranch] = useState(0);

  const branches = [
    {
      nameEn: "Heliopolis Flagship",
      nameAr: "فرع مصر الجديدة الرئيسي",
      addressEn: "45 El-Nozha Street, Heliopolis, Cairo, Egypt",
      addressAr: "٤٥ شارع النزهة، مصر الجديدة، القاهرة، مصر",
      phone: "+20 2 2418 9090",
      hoursEn: "12:00 PM - 03:00 AM",
      hoursAr: "١٢:٠٠ ظهراً - ٠٣:٠٠ بعد منتصف الليل",
      mapCoords: { top: "50%", left: "55%" }
    },
    {
      nameEn: "Maadi Branch",
      nameAr: "فرع المعادي",
      addressEn: "Road 9, Maadi, Cairo, Egypt",
      addressAr: "شارع ٩، المعادي، القاهرة، مصر",
      phone: "+20 2 2735 4040",
      hoursEn: "12:00 PM - 02:00 AM",
      hoursAr: "١٢:٠٠ ظهراً - ٠٢:٠٠ بعد منتصف الليل",
      mapCoords: { top: "65%", left: "40%" }
    },
    {
      nameEn: "New Cairo Drive-Thru",
      nameAr: "فرع التجمع الخامس (درايف ثرو)",
      addressEn: "North 90th Street, New Cairo, Egypt",
      addressAr: "شارع التسعين الشمالي، التجمع الخامس، مصر",
      phone: "+20 100 9876 543",
      hoursEn: "24 Hours",
      hoursAr: "على مدار ٢٤ ساعة",
      mapCoords: { top: "35%", left: "70%" }
    }
  ];

  return (
    <div className="bg-[#0E0E0E] text-[#FDFBF7] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E61C24] mb-2 block font-sans">
            {locale === "en" ? "Visit the Hearth" : "تفضل بزيارة فروعنا"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {locale === "en" ? "Our Outlets" : "فروع كنز"}
          </h1>
          <p className="text-sm text-white/60 max-w-[500px] mx-auto leading-relaxed">
            {locale === "en"
              ? "Find a Shawarma b'Kanz outlet near you to taste our wood-fired carvings fresh off the spit."
              : "ابحث عن أقرب فرع لشاورما بي كانز لتذوق الشاورما المشوية على حطب البلوط ساخنة ومباشرة من السيخ."}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Branches list */}
          <div className="flex flex-col gap-4">
            {branches.map((branch, idx) => {
              const name = locale === "en" ? branch.nameEn : branch.nameAr;
              const address = locale === "en" ? branch.addressEn : branch.addressAr;
              const hours = locale === "en" ? branch.hoursEn : branch.hoursAr;
              const isActive = activeBranch === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveBranch(idx)}
                  className={`w-full text-left rtl:text-right p-6 rounded-2xl border transition-all duration-300 flex gap-4 ${
                    isActive
                      ? "border-[#E61C24] bg-[#E61C24]/5"
                      : "border-white/5 bg-[#161616] hover:border-white/10"
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${isActive ? "bg-[#E61C24]/10 text-[#E61C24]" : "bg-white/5 text-[#F1C40F]"}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base mb-2 text-white">{name}</h3>
                    <p className="text-xs text-white/50 mb-4 leading-relaxed">{address}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-white/40" />
                        <span>{branch.phone}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span>{hours}</span>
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Map Box */}
          <div className="map-card-wrapper h-[400px]">
            <div className="map-placeholder h-full">
              <div className="map-grid-lines" />
              <div className="map-road road-1" />
              <div className="map-road road-2" />
              <div className="map-road road-3" />
              
              {/* Dynamic Map Pin */}
              <div
                className="map-pin absolute transition-all duration-500"
                style={{
                  top: branches[activeBranch].mapCoords.top,
                  left: branches[activeBranch].mapCoords.left,
                }}
              >
                <img src="/assets/logo.png" alt="Map Marker logo" />
                <span className="map-pin-pulse" />
              </div>

              {/* Popup */}
              <div
                className="map-popup absolute transition-all duration-500"
                style={{
                  top: `calc(${branches[activeBranch].mapCoords.top} - 80px)`,
                  left: `calc(${branches[activeBranch].mapCoords.left} - 60px)`,
                }}
              >
                <h5>{locale === "en" ? branches[activeBranch].nameEn : branches[activeBranch].nameAr}</h5>
                <p>{t("map_popup_text")}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
