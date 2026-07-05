"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Flame, Percent, Gift } from "lucide-react";
import { motion } from "framer-motion";

export default function OffersPage() {
  const { t, locale } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();

  const combos = [
    {
      id: "combo_solo",
      titleKey: "offer_combo1_title",
      descKey: "offer_combo1_desc",
      price: 10.99,
      tag: "15% OFF",
      items: [
        { labelEn: "1 Classic Chicken Wrap", labelAr: "١ رول شاورما دجاج" },
        { labelEn: "1 Fries", labelAr: "١ بطاطس مقرمشة" },
        { labelEn: "1 Garlic Paste", labelAr: "١ علبة ثومية" },
        { labelEn: "1 Lemonade", labelAr: "١ ليمون منعش" }
      ]
    },
    {
      id: "combo_duo",
      titleKey: "offer_combo2_title",
      descKey: "offer_combo2_desc",
      price: 19.99,
      tag: "20% OFF",
      items: [
        { labelEn: "2 Double Kanz Wraps", labelAr: "٢ رول دبل كنز شاورما" },
        { labelEn: "1 Large Fries", labelAr: "١ بطاطس عائلي" },
        { labelEn: "2 Dipping Sauces", labelAr: "٢ صوص خارجي" },
        { labelEn: "2 Sodas", labelAr: "٢ مشروب غازي" }
      ]
    },
    {
      id: "combo_feast",
      titleKey: "offer_combo3_title",
      descKey: "offer_combo3_desc",
      price: 39.99,
      tag: "BEST VALUE",
      items: [
        { labelEn: "4 Assorted Sandwiches", labelAr: "٤ سندوتشات مشكلة" },
        { labelEn: "2 Spit Burgers", labelAr: "٢ برجر على اللهب" },
        { labelEn: "2 Large Fries", labelAr: "٢ بطاطس حجم عائلي" },
        { labelEn: "4 Soft Drinks", labelAr: "٤ مشروبات غازية" },
        { labelEn: "1 Pomegranate Pitcher", labelAr: "١ إبريق رمان بالنعناع" }
      ]
    }
  ];

  const handleAddCombo = (combo: typeof combos[0]) => {
    const nameEn = t(combo.titleKey);
    const nameAr = t(combo.titleKey);

    const cartItem = {
      cartId: `${combo.id}_combo`,
      id: combo.id,
      nameEn,
      nameAr,
      sizeNameEn: "Feast Box",
      sizeNameAr: "صندوق الوليمة",
      spiceNameEn: "Default Mix",
      spiceNameAr: "خلطة جاهزة",
      addons: [],
      unitPrice: combo.price,
      quantity: 1,
      image: "/assets/hero_shawarma.png"
    };

    addToCart(cartItem);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FDFBF7] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E61C24] mb-2 block">
            {t("offers_subtitle")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {t("offers_title")}
          </h1>
          <p className="text-sm text-white/60 max-w-[500px] mx-auto leading-relaxed">
            {t("offers_desc")}
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {combos.map((combo) => {
            const title = t(combo.titleKey);
            const desc = t(combo.descKey);

            return (
              <div
                key={combo.id}
                className="bg-[#1D1D1D] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-[#E61C24]/30 hover:shadow-2xl transition-all duration-300 relative group"
              >
                {/* Ribbons */}
                <div className="absolute top-4 right-4 bg-[#E61C24] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-[0_0_10px_#E61C24]">
                  {combo.tag}
                </div>

                <div className="relative h-48 overflow-hidden bg-black/20">
                  <img
                    src="/assets/hero_shawarma.png"
                    alt={title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <div className="p-2 bg-[#E61C24]/10 rounded-lg text-[#E61C24] border border-[#E61C24]/20">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-white">{title}</h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs text-white/60 mb-6 leading-relaxed flex-grow">
                    {desc}
                  </p>

                  {/* Inside list */}
                  <ul className="mb-6 flex flex-col gap-2 border-t border-b border-white/5 py-4">
                    {combo.items.map((item, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2 text-white/80">
                        <span className="text-[#F1C40F]">✔</span>
                        <span>{locale === "en" ? item.labelEn : item.labelAr}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-semibold">Price</span>
                      <span className="text-xl font-black text-[#F1C40F]">
                        ${combo.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddCombo(combo)}
                      className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E61C24] to-[#F39C12] text-white text-xs font-bold hover:shadow-[0_2px_10px_rgba(230,28,36,0.3)] transition-all duration-300"
                    >
                      {t("order_now")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
