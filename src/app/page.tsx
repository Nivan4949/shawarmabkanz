"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SpitExperience } from "@/components/SpitExperience";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Compass, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { t, locale, isRtl } = useLanguage();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const reviews = [
    {
      avatar: "RA",
      name: "Rami Al-Assaf",
      titleKey: "crit_label",
      text: '"I\'ve had shawarma in Beirut, Dubai, and Istanbul, but the flame-seared crust at Shawarma b\'Kanz is on another level. The chicken is incredibly juicy, and the garlic paste is silky-smooth perfection!"',
    },
    {
      avatar: "SK",
      name: "Sarah Khan",
      titleKey: "reviewer_label_2",
      text: '"The Kanz Sub inside that toasted baguette is a masterpiece. The fries are crunchy, the pickle tang is sharp, and the meat has this amazing wood-grilled hickory scent. 10/10!"',
    },
    {
      avatar: "MD",
      name: "Michael Diaz",
      titleKey: "reviewer_label_3",
      text: '"The Spit-Fired Burger is a genius combination. Putting shaved shawarma and secret sauce on top of a beef patty? Absolute heaven. Best late night spot in town."',
    },
  ];

  return (
    <div className="bg-[#0E0E0E] text-[#FDFBF7] overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:py-40 flex items-center bg-radial-[circle_at_70%_30%] from-[#E61C24]/10 via-transparent to-transparent">
        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-center lg:text-left rtl:lg:text-right"
          >
            <div className="mb-6">
              <span className="inline-flex px-4 py-1.5 rounded-full bg-[#E61C24]/10 border border-[#E61C24]/20 text-[#E61C24] text-xs font-bold uppercase tracking-wider">
                {t("hero_badge")}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-[1.1]">
              <span className="accent-text block mb-1">{t("hero_title_accent")}</span>
              <span>{t("hero_title_main")}</span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/70 max-w-[540px] mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero_desc")}
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-lg font-bold text-white bg-gradient-to-r from-[#E61C24] to-[#F39C12] hover:shadow-[0_4px_20px_rgba(230,28,36,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>{t("hero_cta_order")}</span>
              </Link>
              <a
                href="#spit-experience"
                className="px-8 py-3.5 rounded-lg font-bold text-white border-2 border-white hover:bg-white hover:text-[#0E0E0E] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>{t("hero_cta_explore")}</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 border-t border-white/5 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F1C40F] to-[#F39C12]">
                  4.9★
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-1">
                  {t("stat_reviews")}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F1C40F] to-[#F39C12]">
                  {t("stat_spices_val")}
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-1">
                  {t("stat_spices")}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F1C40F] to-[#F39C12]">
                  {t("stat_locations_val")}
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-1">
                  {t("stat_locations")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[420px] aspect-square">
              {/* Sizzling food image */}
              <img
                src="/assets/hero_shawarma.png"
                alt="Sizzling Shawarma Wrap"
                className="w-full h-full object-cover rounded-[50%_24px_50%_50%] border-4 border-white/5 shadow-2xl shadow-[#E61C24]/20 animation-float duration-6000 animate-[floatImg_6s_ease-in-out_infinite]"
              />

              {/* Rising Smoke Particles */}
              <div className="smoke-container">
                <div className="smoke-particle p1" />
                <div className="smoke-particle p2" />
                <div className="smoke-particle p3" />
              </div>

              {/* Sparks Particles */}
              <div className="sparks-container">
                <div className="spark s1" />
                <div className="spark s2" />
                <div className="spark s3" />
                <div className="spark s4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Story ("The Legend of Kanz") */}
      <section id="story" className="section-padding bg-[#111111]/30">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="section-header text-center mb-16">
            <span className="section-subtitle block text-sm font-bold tracking-widest text-[#E61C24] uppercase mb-2">
              {t("story_subtitle")}
            </span>
            <h2 className="section-title text-3xl md:text-4xl font-extrabold uppercase mb-4">
              {t("story_title")}
            </h2>
            <p className="section-desc max-w-[600px] mx-auto text-[#FDFBF7]/70 text-sm leading-relaxed">
              {t("story_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-[#1D1D1D] p-10 rounded-2xl border border-white/5 hover:border-[#E61C24]/30 hover:shadow-2xl hover:shadow-black transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-[circle_at_50%_0] from-[#E61C24]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-[#E61C24]/10 text-[#E61C24] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-3">{t("story_feat1_title")}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{t("story_feat1_desc")}</p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-[#1D1D1D] p-10 rounded-2xl border border-white/5 hover:border-[#E61C24]/30 hover:shadow-2xl hover:shadow-black transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-[circle_at_50%_0] from-[#E61C24]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-[#E61C24]/10 text-[#E61C24] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-3">{t("story_feat2_title")}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{t("story_feat2_desc")}</p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-[#1D1D1D] p-10 rounded-2xl border border-white/5 hover:border-[#E61C24]/30 hover:shadow-2xl hover:shadow-black transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-[circle_at_50%_0] from-[#E61C24]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-[#E61C24]/10 text-[#E61C24] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-3">{t("story_feat3_title")}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{t("story_feat3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Spit Experience */}
      <SpitExperience />

      {/* Testimonials Slider */}
      <section id="testimonials" className="section-padding bg-[#161616]">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="section-header text-center mb-16">
            <span className="section-subtitle block text-sm font-bold tracking-widest text-[#E61C24] uppercase mb-2">
              {t("reviews_subtitle")}
            </span>
            <h2 className="section-title text-3xl md:text-4xl font-extrabold uppercase mb-4">
              {t("reviews_title")}
            </h2>
            <p className="section-desc max-w-[600px] mx-auto text-[#FDFBF7]/70 text-sm leading-relaxed">
              {t("reviews_desc")}
            </p>
          </div>

          <div className="max-w-[800px] mx-auto relative overflow-hidden">
            {/* Slider Container */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                {reviews.map((review, idx) => {
                  if (idx !== activeReviewIndex) return null;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRtl ? 50 : -50 }}
                      transition={{ duration: 0.4 }}
                      className="w-full bg-[#1D1D1D] p-8 md:p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center shadow-xl"
                    >
                      <div className="flex items-center gap-1 text-[#F1C40F] mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>

                      <p className="text-lg md:text-xl font-medium italic text-white/90 leading-relaxed mb-8 max-w-[640px]">
                        {review.text}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E61C24] to-[#F39C12] text-white font-extrabold flex items-center justify-center shadow-lg">
                          {review.avatar}
                        </div>
                        <div className="text-left rtl:text-right">
                          <h4 className="text-base font-bold text-white">{review.name}</h4>
                          <span className="text-xs text-white/50">{t(review.titleKey)}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Carousel Navigation Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeReviewIndex === idx ? "w-6 bg-[#E61C24]" : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
