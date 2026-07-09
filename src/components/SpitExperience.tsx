"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Info, HelpCircle } from "lucide-react";

export const SpitExperience: React.FC = () => {
  const { t } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<1 | 2 | 3 | 4>(1);

  const spitCards = [
    {
      id: 1,
      num: "01",
      titleKey: "spit_info_title1",
      descKey: "spit_info_desc1",
    },
    {
      id: 2,
      num: "02",
      titleKey: "spit_info_title2",
      descKey: "spit_info_desc2",
    },
    {
      id: 3,
      num: "03",
      titleKey: "spit_info_title3",
      descKey: "spit_info_desc3",
    },
    {
      id: 4,
      num: "04",
      titleKey: "spit_info_title4",
      descKey: "spit_info_desc4",
    },
  ];

  return (
    <section id="spit-experience" className="py-20 bg-[#0E0E0E] relative border-t border-white/5">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-widest text-[#C41218] uppercase mb-2 block">
            {t("spit_badge")}
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase text-[#FFFFFF] tracking-tight mb-4">
            {t("spit_title")}
          </h2>
          <p className="max-w-[480px] mx-auto text-white/50 text-xs leading-relaxed">
            {t("spit_intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          
          {/* Spit Visual Area (Left) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Clean Flat diagram of Shawarma Cone */}
            <div className="relative w-64 h-96 bg-[#181818] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-center shadow-lg">
              
              {/* Rod */}
              <div className="absolute top-0 bottom-0 w-2 bg-white/10 left-1/2 -translate-x-1/2" />
              
              {/* Stylized Cone Shape */}
              <div className="w-48 h-64 bg-gradient-to-b from-[#FFD400] via-[#FF7A00] to-[#C41218] rounded-t-full rounded-b-3xl relative z-10 flex flex-col justify-around p-4 shadow-xl border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                
                {/* Hotspot 1: Slow Roast */}
                <button
                  onClick={() => setActiveHotspot(1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs transition-colors self-center relative z-20 ${
                    activeHotspot === 1 ? "bg-white text-black border-white" : "bg-black/60 text-white border-white/20"
                  }`}
                >
                  1
                </button>

                {/* Hotspot 2: Caramelized Crust */}
                <button
                  onClick={() => setActiveHotspot(2)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs transition-colors self-center relative z-20 ${
                    activeHotspot === 2 ? "bg-white text-black border-white" : "bg-black/60 text-white border-white/20"
                  }`}
                >
                  2
                </button>

                {/* Hotspot 3: Citrus Drip */}
                <button
                  onClick={() => setActiveHotspot(3)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs transition-colors self-center relative z-20 ${
                    activeHotspot === 3 ? "bg-white text-black border-white" : "bg-black/60 text-white border-white/20"
                  }`}
                >
                  3
                </button>
              </div>

              {/* Fire Hearth Base (Hotspot 4) */}
              <button
                onClick={() => setActiveHotspot(4)}
                className={`w-full py-3 rounded-xl border font-bold text-xs transition-colors relative z-20 flex items-center justify-center gap-1.5 ${
                  activeHotspot === 4 ? "bg-[#C41218] text-white border-[#C41218]" : "bg-black/40 text-white/60 border-white/5"
                }`}
              >
                <span>4. {t("spit_info_title4")}</span>
              </button>

            </div>
          </div>

          {/* Spit Details Area (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative min-h-[180px] w-full">
              <AnimatePresence mode="wait">
                {(() => {
                  const card = spitCards.find(c => c.id === activeHotspot);
                  if (!card) return null;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-[#181818] border border-white/5 rounded-2xl p-8 shadow-lg flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-black text-[#C41218] px-2 py-0.5 bg-[#C41218]/10 rounded">
                          {card.num}
                        </span>
                        <h4 className="text-sm font-black text-[#FFD400]">
                          {t(card.titleKey)}
                        </h4>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {t(card.descKey)}
                      </p>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
