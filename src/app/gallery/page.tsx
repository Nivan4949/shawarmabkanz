"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Camera, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const { t, locale } = useLanguage();

  const galleryItems = [
    {
      titleEn: "Classic Chicken Saj Wrap",
      titleAr: "رول شاورما الدجاج الكلاسيكي",
      categoryEn: "Wraps",
      categoryAr: "اللفائف",
      image: "/assets/hero_shawarma.png",
      prompt: "Luxury Arabic grilled chicken shawarma wrap served on a charcoal stone slab with garlic cream drips, gold ambient lighting, close-up food photography.",
    },
    {
      titleEn: "Fire Beef Saj Wrap",
      titleAr: "رول شاورما لحم لهب حار",
      categoryEn: "Wraps",
      categoryAr: "اللفائف",
      image: "/assets/hero_shawarma.png",
      prompt: "Flame-seared sliced beef shawarma wrap wrapped in toasted saj bread, charcoal backgrounds, flying sparks, woodfire hearth lighting, macro photography.",
    },
    {
      titleEn: "Spit-Fired Beef Burger",
      titleAr: "برجر بقري على لهب السيخ",
      categoryEn: "Burgers",
      categoryAr: "البرجر",
      image: "/assets/spit_burger.png",
      prompt: "Vibrant street-style beef burger topped with heap of shaved beef shawarma, melted cheddar cheese cascading down, glowing orange backdrop, premium food studio shot.",
    },
    {
      titleEn: "Kanz Baguette Sub",
      titleAr: "سندوتش باجيت كنز",
      categoryEn: "Sandwiches",
      categoryAr: "السندوتشات",
      image: "/assets/baguette_sub.png",
      prompt: "Toasted baguette sub filled with chicken shawarma shavings, golden crispy fries, garlic paste smear, rustic wooden table background, warm dining room glow.",
    },
    {
      titleEn: "Pomegranate Mint Nectar",
      titleAr: "عصير رمان بالنعناع",
      categoryEn: "Drinks",
      categoryAr: "المشروبات",
      image: "/assets/pomegranate_drink.png",
      prompt: "Fresh cold-pressed dark red pomegranate juice in a condensation-covered crystal glass, fresh green mint leaves garnish, black stone backdrop, cinematic backlight.",
    },
    {
      titleEn: "Live Oak Hearth Rotisserie",
      titleAr: "سيخ شاورما على موقد الحطب",
      categoryEn: "Hearth",
      categoryAr: "الموقد",
      image: "/assets/lemonade_drink.png",
      prompt: "Authentic Middle Eastern vertical rotisserie roasting chicken shawarma over real oak wood logs, burning red embers, smoke rising, high-contrast culinary photo.",
    }
  ];

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-2 block">
            {t("gallery_subtitle")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase">
            {t("gallery_title")}
          </h1>
          <p className="text-xs text-white/50 max-w-[500px] mx-auto leading-relaxed mt-2">
            {t("gallery_desc")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => {
            const title = locale === "en" ? item.titleEn : item.titleAr;
            const category = locale === "en" ? item.categoryEn : item.categoryAr;

            return (
              <div
                key={idx}
                className="bg-[#181818] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-[#C41218]/30 hover:shadow-2xl transition-all duration-300 relative group aspect-square"
              >
                {/* Image backdrop */}
                <img
                  src={item.image}
                  alt={title}
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Normal State Metadata */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                  <span className="text-[10px] text-[#FFD400] font-black uppercase tracking-wider mb-1">
                    {category}
                  </span>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-white/50" />
                    <span>{title}</span>
                  </h3>
                </div>

                {/* Hover state Prompt Overlay */}
                <div className="absolute inset-0 bg-[#0E0E0E]/90 p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-8 h-8 rounded-xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-4">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-3">
                    {locale === "en" ? "Photography Prompt" : "وصف لقطة التصوير"}
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed text-center italic max-w-[280px]">
                    &quot;{item.prompt}&quot;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
