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
    <section id="spit-experience" className="py-24 bg-gradient-to-b from-[#0E0E0E] to-[#121212] relative overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="bg-glow bg-glow-2 opacity-30" />

      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-black tracking-widest text-[#C41218] uppercase mb-2 block">
            {t("spit_badge")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-[#FFFFFF] tracking-tight mb-4">
            {t("spit_title")}
          </h2>
          <p className="max-w-[550px] mx-auto text-white/60 text-sm leading-relaxed">
            {t("spit_intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          
          {/* Spit Visual Area (Left) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <h3 className="lg:hidden text-xs text-white/40 uppercase tracking-widest mb-8">
              {t("spit_mobile_heading")}
            </h3>
            
            <div className="spit-apparatus scale-95 md:scale-100">
              {/* Stand Top */}
              <div className="spit-stand-top" />

              {/* Rotator and Meat */}
              <div className="spit-rotator">
                <div className="spit-rod" />

                {/* Shawarma Meat Cone */}
                <div 
                  className="spit-meat-block"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, #FFD400 0%, #FF7A00 45%, #C41218 80%, #181818 100%)"
                  }}
                >
                  {/* Layer top (Hotspot 1) */}
                  <div
                    onMouseEnter={() => setActiveHotspot(1)}
                    onClick={() => setActiveHotspot(1)}
                    className="meat-layer layer-top hotspot"
                  >
                    <span
                      className={`hotspot-pulse ${
                        activeHotspot === 1 ? "scale-125 border-white bg-[#C41218]" : ""
                      }`}
                      style={{
                        borderColor: activeHotspot === 1 ? "#FFFFFF" : "#C41218",
                        boxShadow: activeHotspot === 1 ? "0 0 15px #C41218" : "none"
                      }}
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
                        activeHotspot === 2 ? "scale-125 border-white bg-[#C41218]" : ""
                      }`}
                      style={{
                        borderColor: activeHotspot === 2 ? "#FFFFFF" : "#C41218",
                        boxShadow: activeHotspot === 2 ? "0 0 15px #C41218" : "none"
                      }}
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
                        activeHotspot === 3 ? "scale-125 border-white bg-[#C41218]" : ""
                      }`}
                      style={{
                        borderColor: activeHotspot === 3 ? "#FFFFFF" : "#C41218",
                        boxShadow: activeHotspot === 3 ? "0 0 15px #C41218" : "none"
                      }}
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
                    activeHotspot === 4 ? "scale-125 border-white bg-[#C41218]" : ""
                  }`}
                  style={{
                    borderColor: activeHotspot === 4 ? "#FFFFFF" : "#C41218",
                    boxShadow: activeHotspot === 4 ? "0 0 15px #C41218" : "none"
                  }}
                />
                <div 
                  className="fire-flame flame-1" 
                  style={{ borderBottomColor: "#C41218" }}
                />
                <div 
                  className="fire-flame flame-2" 
                  style={{ borderBottomColor: "#FF7A00" }}
                />
                <div 
                  className="fire-flame flame-3" 
                  style={{ borderBottomColor: "#FFD400" }}
                />
              </div>
            </div>
          </div>

          {/* Spit Details Area (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
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
                      className="w-full bg-[#181818] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col"
                    >
                      <span className="text-5xl font-black text-[#C41218]/10 mb-3 leading-none">
                        {card.num}
                      </span>
                      <h4 className="text-lg font-black text-[#FFD400] mb-4">
                        {t(card.titleKey)}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
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
