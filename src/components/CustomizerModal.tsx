"use client";

import React, { useState, useEffect } from "react";
import { useCart, AddonOption } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomizerModal: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const { isCustomizerOpen, closeCustomizer, customizerItem, addToCart } = useCart();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSpice, setSelectedSpice] = useState<"regular" | "medium" | "spicy">("regular");
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Reset local state when item changes
  useEffect(() => {
    if (customizerItem) {
      setSelectedSizeIndex(0);
      setSelectedSpice("regular");
      setSelectedAddons([]);
      setTotalPrice(customizerItem.price);
    }
  }, [customizerItem]);

  // Update total price when selections change
  useEffect(() => {
    if (!customizerItem) return;
    const basePrice = customizerItem.price;
    const sizePrice = customizerItem.sizes[selectedSizeIndex]?.priceModifier || 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    setTotalPrice(basePrice + sizePrice + addonsPrice);
  }, [selectedSizeIndex, selectedSpice, selectedAddons, customizerItem]);

  if (!customizerItem) return null;

  const handleAddonToggle = (addon: AddonOption) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.labelEn === addon.labelEn);
      if (exists) {
        return prev.filter((a) => a.labelEn !== addon.labelEn);
      }
      return [...prev, addon];
    });
  };

  const handleAdd = () => {
    const size = customizerItem.sizes[selectedSizeIndex];
    const sizeNameEn = size.labelEn;
    const sizeNameAr = size.labelAr;

    const spiceTranslations = {
      regular: { en: "Regular (Tame)", ar: "عادي (بدون شطة)" },
      medium: { en: "Medium (Warmth)", ar: "وسط (لذعة خفيفة)" },
      spicy: { en: "Kanz Fire (Ignited!)", ar: "لهب كانز (حار جداً!)" },
    };

    const cartItem = {
      cartId: `${customizerItem.id}_${selectedSizeIndex}_${selectedSpice}_${selectedAddons.map((a) => a.labelEn).join("-")}`,
      id: customizerItem.id,
      nameEn: customizerItem.nameEn,
      nameAr: customizerItem.nameAr,
      sizeNameEn,
      sizeNameAr,
      spiceNameEn: spiceTranslations[selectedSpice].en,
      spiceNameAr: spiceTranslations[selectedSpice].ar,
      addons: selectedAddons,
      unitPrice: totalPrice,
      quantity: 1,
      image: "/assets/hero_shawarma.png",
    };

    addToCart(cartItem);
    closeCustomizer();
  };

  const name = locale === "en" ? customizerItem.nameEn : customizerItem.nameAr;
  const desc = locale === "en" ? customizerItem.descEn : customizerItem.descAr;

  return (
    <AnimatePresence>
      {isCustomizerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCustomizer}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-[#161616] border border-white/10 rounded-2xl w-[90%] max-w-[500px] overflow-hidden shadow-2xl z-10 text-[#FDFBF7]"
          >
            {/* Close Button */}
            <button
              onClick={closeCustomizer}
              className={`absolute top-4 z-20 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-[#E61C24] hover:border-transparent transition-all duration-300 ${
                isRtl ? "left-4" : "right-4"
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Image & Info */}
            <div className="relative h-44 flex items-end p-6 border-b border-white/5">
              <img
                src="/assets/hero_shawarma.png"
                alt={name}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-[#161616]/10" />
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-black">{name}</h3>
                <p className="text-xs text-[#FDFBF7]/70 mt-1 line-clamp-2">{desc}</p>
              </div>
            </div>

            {/* Scrollable Body Options */}
            <div className="p-6 flex flex-col gap-6 max-h-[50vh] overflow-y-auto">
              {/* Sizes Group */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold tracking-wider text-[#F1C40F] uppercase">
                  {t("modal_size")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {customizerItem.sizes.map((size, idx) => {
                    const sizeLabel = locale === "en" ? size.labelEn : size.labelAr;
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs font-semibold transition-all duration-300 ${
                          isSelected
                            ? "border-[#E61C24] bg-[#E61C24]/10 text-white"
                            : "border-white/5 bg-[#1D1D1D] hover:border-[#E61C24]/50"
                        }`}
                      >
                        <span>{sizeLabel}</span>
                        {size.priceModifier > 0 && (
                          <span className="text-[#F1C40F]">
                            +${size.priceModifier.toFixed(2)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spice Level Group */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold tracking-wider text-[#F1C40F] uppercase">
                  {t("modal_spice")}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(["regular", "medium", "spicy"] as const).map((spice) => {
                    const label = t(`spice_${spice}`);
                    const isSelected = selectedSpice === spice;
                    return (
                      <button
                        key={spice}
                        onClick={() => setSelectedSpice(spice)}
                        className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all duration-300 ${
                          isSelected
                            ? "border-[#E61C24] bg-[#E61C24]/10 text-white"
                            : "border-white/5 bg-[#1D1D1D] hover:border-[#E61C24]/50"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Addons Group */}
              {customizerItem.addons.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-bold tracking-wider text-[#F1C40F] uppercase">
                    {t("modal_addons")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customizerItem.addons.map((addon, idx) => {
                      const addonLabel = locale === "en" ? addon.labelEn : addon.labelAr;
                      const isSelected = selectedAddons.some(
                        (a) => a.labelEn === addon.labelEn
                      );
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAddonToggle(addon)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-xs font-semibold transition-all duration-300 ${
                            isSelected
                              ? "border-[#E61C24] bg-[#E61C24]/10 text-white"
                              : "border-white/5 bg-[#1D1D1D] hover:border-[#E61C24]/50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isSelected ? "border-[#E61C24] bg-[#E61C24]" : "border-white/20"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <span>{addonLabel}</span>
                          </span>
                          <span className="text-[#FDFBF7]/60">
                            +${addon.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Calculator & Add Button */}
            <div className="p-6 border-t border-white/5 bg-[#1D1D1D] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase font-semibold">
                  {t("modal_total")}
                </span>
                <span className="text-2xl font-black text-[#F1C40F]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-[#E61C24] to-[#F39C12] hover:shadow-[0_4px_15px_rgba(230,28,36,0.3)] transition-all duration-300"
              >
                {t("modal_add_btn")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
