"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

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
    <section id="spit-experience" className="section-padding bg-gradient-to-b from-[#0E0E0E] to-[#161616] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="bg-glow bg-glow-2 opacity-50" />

      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="section-header text-center mb-16">
          <span className="section-subtitle block text-sm font-bold tracking-widest text-[#E61C24] uppercase mb-2">
            {t("spit_badge")}
          </span>
          <h2 className="section-title text-3xl md:text-4xl font-extrabold uppercase mb-4 text-[#FDFBF7]">
            {t("spit_title")}
          </h2>
          <p className="section-desc max-w-[600px] mx-auto text-[#FDFBF7]/70 text-sm leading-relaxed">
            {t("spit_intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Spit Visual Area */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="lg:hidden text-xs text-[#AAAAAA] uppercase tracking-wider mb-6">
              {t("spit_mobile_heading")}
            </h3>
            
            <div className="spit-apparatus">
              {/* Stand Top */}
              <div className="spit-stand-top" />

              {/* Rotator and Meat */}
              <div className="spit-rotator">
                <div className="spit-rod" />

                {/* Shawarma Meat Cone */}
                <div className="spit-meat-block">
                  {/* Layer top (Hotspot 1) */}
                  <div
                    onMouseEnter={() => setActiveHotspot(1)}
                    onClick={() => setActiveHotspot(1)}
                    className="meat-layer layer-top hotspot"
                  >
                    <span
                      className={`hotspot-pulse ${
                        activeHotspot === 1 ? "scale-125 border-white bg-[#E61C24]" : ""
                      }`}
                    />
                  </div>

                  {/* Layer middle (Hotspot 2) */}
                  <div
                    onMouseEnter={() => setActiveHotspot(2)}
                    onClick={() => setActiveHotspot(2)}
                    className="meat-layer layer-middle hotspot"
                  >
                    <span
                      className={`hotspot-pulse ${
                        activeHotspot === 2 ? "scale-125 border-white bg-[#E61C24]" : ""
                      }`}
                    />
                  </div>

                  {/* Layer bottom (Hotspot 3) */}
                  <div
                    onMouseEnter={() => setActiveHotspot(3)}
                    onClick={() => setActiveHotspot(3)}
                    className="meat-layer layer-bottom hotspot"
                  >
                    <span
                      className={`hotspot-pulse ${
                        activeHotspot === 3 ? "scale-125 border-white bg-[#E61C24]" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Stand Bottom */}
              <div className="spit-stand-bottom" />

              {/* Fire Pit Base (Hotspot 4) */}
              <div
                onMouseEnter={() => setActiveHotspot(4)}
                onClick={() => setActiveHotspot(4)}
                className="spit-fire-pit hotspot"
              >
                <span
                  className={`hotspot-pulse ${
                    activeHotspot === 4 ? "scale-125 border-white bg-[#E61C24]" : ""
                  }`}
                />
                <div className="fire-flame flame-1" />
                <div className="fire-flame flame-2" />
                <div className="fire-flame flame-3" />
              </div>
            </div>
          </div>

          {/* Spit Details Area */}
          <div className="flex flex-col justify-center">
            <div className="relative min-h-[220px] w-full">
              <AnimatePresence mode="wait">
                {(() => {
                  const card = spitCards.find(c => c.id === activeHotspot);
                  if (!card) return null;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="w-full bg-[#1D1D1D] border border-white/5 rounded-2xl p-8 shadow-xl flex flex-col"
                    >
                      <span className="text-4xl font-black text-[#E61C24]/10 mb-2 leading-none">
                        {card.num}
                      </span>
                      <h4 className="text-lg font-bold text-[#F1C40F] mb-3">
                        {t(card.titleKey)}
                      </h4>
                      <p className="text-sm text-[#FDFBF7]/80 leading-relaxed">
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
