"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Trophy, Target, Award, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    { qKey: "faq_q1", aKey: "faq_a1" },
    { qKey: "faq_q2", aKey: "faq_a2" },
    { qKey: "faq_q3", aKey: "faq_a3" },
    { qKey: "faq_q4", aKey: "faq_a4" },
  ];

  return (
    <div className="bg-[#0E0E0E] text-[#FDFBF7] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E61C24] mb-2 block">
            {t("nav_story")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {t("about_title")}
          </h1>
          <p className="text-sm text-white/60 max-w-[500px] mx-auto leading-relaxed">
            {locale === "en" 
              ? "Discover the wood-fired heritage and culinary craft behind Egypt's finest street feast." 
              : "اكتشف تراث الشواء على الحطب وحرفة الطهي خلف أفضل وليمة طعام شارع في مصر."}
          </p>
        </div>

        {/* Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F1C40F] uppercase">
              {t("about_heading")}
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              {t("about_p1")}
            </p>
            <p className="text-sm leading-relaxed text-white/70">
              {t("about_p2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl h-80"
          >
            <img
              src="/assets/hero_shawarma.png"
              alt="Live hearth fire grilling"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E61C24] flex items-center justify-center text-white font-extrabold shadow-lg">
                🔥
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">{t("hero_badge")}</h4>
                <span className="text-xs text-white/50">{t("contact_loc_desc")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="p-8 rounded-2xl bg-[#1D1D1D] border border-white/5 flex gap-4 items-start">
            <div className="p-3 bg-[#E61C24]/10 rounded-xl text-[#E61C24] shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FDFBF7] mb-2 uppercase">{t("mission_title")}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{t("mission_desc")}</p>
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-2xl bg-[#1D1D1D] border border-white/5 flex gap-4 items-start">
            <div className="p-3 bg-[#F1C40F]/10 rounded-xl text-[#F1C40F] shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FDFBF7] mb-2 uppercase">{t("vision_title")}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{t("vision_desc")}</p>
            </div>
          </div>
        </div>

        {/* Chef Spotlight */}
        <div className="bg-[#161616] p-8 md:p-12 rounded-2xl border border-white/5 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-xl">
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-48 h-48 rounded-full border-4 border-[#F1C40F]/20 overflow-hidden shadow-lg bg-black/40 flex items-center justify-center text-5xl">
              👨‍🍳
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col">
            <span className="text-xs font-bold text-[#E61C24] uppercase mb-1">{t("chef_title")}</span>
            <h3 className="text-xl md:text-2xl font-black mb-4 text-[#F1C40F]">{t("chef_name")}</h3>
            <p className="text-xs text-white/70 leading-relaxed max-w-[640px]">
              {t("chef_desc")}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-xl md:text-3xl font-black uppercase text-center mb-10">
            {t("faq_title")}
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-[#1D1D1D] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left rtl:text-right font-bold text-sm text-[#FDFBF7]"
                  >
                    <span>{t(faq.qKey)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#E61C24]" : ""
                      }`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    className="overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-white/60 border-t border-white/5 leading-relaxed">
                      {t(faq.aKey)}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
