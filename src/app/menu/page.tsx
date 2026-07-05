"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, menuItems } from "@/context/CartContext";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuPage() {
  const { t, locale, isRtl } = useLanguage();
  const { openCustomizer } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | "wrap" | "burger" | "sandwich" | "drink">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all" as const, labelKey: "menu_tab_all" },
    { id: "wrap" as const, labelKey: "menu_tab_wraps" },
    { id: "burger" as const, labelKey: "menu_tab_burgers" },
    { id: "sandwich" as const, labelKey: "menu_tab_sandwiches" },
    { id: "drink" as const, labelKey: "menu_tab_drinks" },
  ];

  // Filtering logic
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const itemName = locale === "en" ? item.nameEn : item.nameAr;
    const itemDesc = locale === "en" ? item.descEn : item.descAr;
    const matchesSearch =
      itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemDesc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0E0E0E] text-[#FDFBF7] pt-28 pb-20">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E61C24] mb-2 block">
            {t("menu_subtitle")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {t("menu_title")}
          </h1>
          <p className="text-sm text-white/60 max-w-[500px] mx-auto leading-relaxed">
            {t("menu_desc")}
          </p>
        </div>

        {/* Filter Controls (Tabs + Search) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-[#161616] p-4 rounded-2xl border border-white/5 shadow-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#E61C24] to-[#F39C12] text-white shadow-lg shadow-[#E61C24]/10"
                      : "bg-[#1D1D1D] text-white/70 hover:text-white border border-white/5"
                  }`}
                >
                  {t(cat.labelKey)}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={locale === "en" ? "Search foods..." : "ابحث عن طبق..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1D1D1D] border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-xs text-[#FDFBF7] focus:outline-none focus:border-[#E61C24] placeholder-white/40"
              style={{
                paddingLeft: isRtl ? "1rem" : "2.5rem",
                paddingRight: isRtl ? "2.5rem" : "1rem",
              }}
            />
            <Search
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
              style={{
                left: isRtl ? "auto" : "1rem",
                right: isRtl ? "1rem" : "auto",
              }}
            />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#161616] rounded-2xl border border-white/5">
            <span className="text-4xl block mb-4">🔍</span>
            <p className="text-sm text-white/50">
              {locale === "en"
                ? "No culinary treasures found matching your filter."
                : "لم نجد أي طبق يطابق خيارات البحث الحالية."}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredItems.map((item) => {
              const name = locale === "en" ? item.nameEn : item.nameAr;
              const desc = locale === "en" ? item.descEn : item.descAr;
              const badge = locale === "en" ? item.badgeEn : item.badgeAr;

              return (
                <motion.div
                  layout
                  key={item.id}
                  className="bg-[#1D1D1D] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-[#E61C24]/30 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-44 overflow-hidden bg-black/20">
                    <img
                      src={item.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {badge && (
                      <span className={`absolute top-4 bg-[#E61C24] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isRtl ? "right-4" : "left-4"
                      }`}>
                        {badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-white mb-2 leading-tight">
                      {name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-6 flex-grow">
                      {desc}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-black text-[#F1C40F]">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => openCustomizer(item.id)}
                        className="px-4 py-2 text-xs font-bold rounded-lg border border-white/10 hover:border-transparent bg-white/5 hover:bg-gradient-to-r hover:from-[#E61C24] hover:to-[#F39C12] hover:text-white transition-all duration-300"
                      >
                        {locale === "en" ? "Customize" : "تخصيص الطلب"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
