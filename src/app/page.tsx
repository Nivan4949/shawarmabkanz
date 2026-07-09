"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SpitExperience } from "@/components/SpitExperience";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Compass, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function Home() {
  const { t, locale, isRtl } = useLanguage();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const reviews = [
    {
      avatar: "RA",
      name: "Rami Al-Assaf",
      titleKey: "crit_label",
      text: locale === "en" 
        ? '"I\'ve had shawarma in Beirut, Dubai, and Istanbul, but the flame-seared crust at Shawarma b\'Kanz is on another level. The chicken is incredibly juicy, and the garlic paste is silky-smooth perfection!"'
        : '"لقد تذوقت الشاورما في بيروت ودبي وإسطنبول، لكن قشرة اللحم المحمرة على الصاج في شاورما بي كانز في مستوى آخر تماماً. اللجاج طري جداً والثومية حريرية مذهلة!"',
    },
    {
      avatar: "SK",
      name: "Sarah Khan",
      titleKey: "reviewer_label_2",
      text: locale === "en"
        ? '"The Kanz Sub inside that toasted baguette is a masterpiece. The fries are crunchy, the pickle tang is sharp, and the meat has this amazing wood-grilled hickory scent. 10/10!"'
        : '"سندوتش كنز باجيت عبارة عن تحفة فنية. البطاطس مقرمشة والمخلل لاذع واللحم له رائحة شواء حطب البلوط الطبيعي المذهلة. ١٠/١٠!"',
    },
    {
      avatar: "MD",
      name: "Michael Diaz",
      titleKey: "reviewer_label_3",
      text: locale === "en"
        ? '"The Spit-Fired Burger is a genius combination. Putting shaved shawarma and secret sauce on top of a beef patty? Absolute heaven. Best late night spot in town."'
        : '"برجر لهب السيخ فكرة عبقرية. وضع شاورما اللحم المشرحة مع الصوص السري فوق شريحة البرجر البقري؟ قمة اللذة. أفضل مكان للطلبات المتأخرة."',
    },
  ];

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] overflow-hidden">
      
      {/* Simple, Clean Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-20">
          
          {/* Hero Content (Left) */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-left rtl:lg:text-right">
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C41218]/10 border border-[#C41218]/25 text-[#FFD400] text-[11px] font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#C41218]" />
                <span>{t("hero_badge")}</span>
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-black uppercase tracking-tight mb-6 leading-[1.1]">
              <span className="text-[#C41218] block mb-1">{t("hero_title_accent")}</span>
              <span className="text-white">{t("hero_title_main")}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-white/50 max-w-[480px] mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero_desc")}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#C41218] to-[#FF7A00] hover:opacity-90 transition-all duration-300"
              >
                {t("hero_cta_order")}
              </Link>
              <a
                href="#story"
                className="px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white border border-white/15 bg-white/5 hover:bg-white hover:text-[#0E0E0E] transition-all duration-300"
              >
                {t("hero_cta_explore")}
              </a>
            </div>

            {/* Clean Stats Grid */}
            <div className="flex items-center justify-center lg:justify-start gap-8 border-t border-white/5 pt-8">
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-[#FFD400]">4.9★</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mt-1">
                  {t("stat_reviews")}
                </span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-[#FF7A00]">{t("stat_spices_val")}</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mt-1">
                  {t("stat_spices")}
                </span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-white">{t("stat_locations_val")}</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mt-1">
                  {t("stat_locations")}
                </span>
              </div>
            </div>
          </div>

          {/* Simple Shawarma Preview (Right) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 border border-white/5 rounded-full" />
              <div className="absolute inset-4 border border-dashed border-white/5 rounded-full" />

              {/* Sizzling food image (static floating wrapper) */}
              <div className="relative w-[80%] h-[80%] rounded-full overflow-hidden border-2 border-white/5 shadow-2xl shadow-black/80 bg-black/40">
                <img
                  src="/assets/hero_shawarma.png"
                  alt="Sizzling Shawarma Wrap"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="py-20 bg-[#121212]/40 relative border-t border-white/5">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-[#C41218] uppercase mb-2 block">
              {t("story_subtitle")}
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
              {t("story_title")}
            </h2>
            <p className="max-w-[480px] mx-auto text-white/50 text-xs leading-relaxed">
              {t("story_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-5">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold mb-2 text-white">{t("story_feat1_title")}</h4>
              <p className="text-xs text-white/45 leading-relaxed">{t("story_feat1_desc")}</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold mb-2 text-white">{t("story_feat2_title")}</h4>
              <p className="text-xs text-white/45 leading-relaxed">{t("story_feat2_desc")}</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-5">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold mb-2 text-white">{t("story_feat3_title")}</h4>
              <p className="text-xs text-white/45 leading-relaxed">{t("story_feat3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified interactive Spit Experience */}
      <SpitExperience />

      {/* Simplified Testimonials */}
      <section id="testimonials" className="py-20 bg-[#121212] border-t border-white/5">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-black tracking-widest text-[#C41218] uppercase mb-2 block">
              {t("reviews_subtitle")}
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
              {t("reviews_title")}
            </h2>
          </div>

          <div className="max-w-[700px] mx-auto relative px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full bg-[#181818] p-8 md:p-10 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center shadow-lg relative"
              >
                <div className="flex items-center gap-1 text-[#FFD400] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs md:text-sm font-medium italic text-white/80 leading-relaxed mb-6 max-w-[560px]">
                  {reviews[activeReviewIndex].text}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white font-extrabold flex items-center justify-center">
                    {reviews[activeReviewIndex].avatar}
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="text-xs font-bold text-white">{reviews[activeReviewIndex].name}</h4>
                    <span className="text-[9px] text-white/40 font-bold uppercase">{t(reviews[activeReviewIndex].titleKey)}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider arrows */}
            <button
              onClick={handlePrevReview}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#C41218] hover:border-transparent flex items-center justify-center text-white transition-all ${
                isRtl ? "right-[-10px]" : "left-[-10px]"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextReview}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#C41218] hover:border-transparent flex items-center justify-center text-white transition-all ${
                isRtl ? "left-[-10px]" : "right-[-10px]"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
