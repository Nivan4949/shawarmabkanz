"use client";

import React, { useState, useEffect } from "react";
import { useCart, AddonOption, MenuItem } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Check, Flame, ShoppingBag, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const breadOptions = [
  { id: "saj", labelEn: "Saj Bread", labelAr: "خبز صاج", price: 0 },
  { id: "lebanese", labelEn: "Lebanese Bread", labelAr: "خبز لبناني", price: 0 },
  { id: "baguette", labelEn: "Baguette", labelAr: "صمون باجيت", price: 2.00 }
];

export const CustomizerModal: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const { isCustomizerOpen, closeCustomizer, customizerItem, addToCart } = useCart();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSpice, setSelectedSpice] = useState<"regular" | "medium" | "spicy">("regular");
  const [selectedBreadIndex, setSelectedBreadIndex] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Reset local state when item changes
  useEffect(() => {
    if (customizerItem) {
      setSelectedSizeIndex(0);
      setSelectedSpice("regular");
      setSelectedBreadIndex(0);
      setSelectedAddons([]);
      setTotalPrice(customizerItem.price);
    }
  }, [customizerItem]);

  // Update total price when selections change
  useEffect(() => {
    if (!customizerItem) return;
    const basePrice = customizerItem.price;
    const sizePrice = customizerItem.sizes[selectedSizeIndex]?.priceModifier || 0;
    const breadPrice = customizerItem.category === "shawarma" || customizerItem.category === "wrap"
      ? breadOptions[selectedBreadIndex].price 
      : 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    setTotalPrice(basePrice + sizePrice + breadPrice + addonsPrice);
  }, [selectedSizeIndex, selectedSpice, selectedBreadIndex, selectedAddons, customizerItem]);

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
    const sizeNameEn = size?.labelEn || "Standard";
    const sizeNameAr = size?.labelAr || "قياسي";

    const spiceTranslations = {
      regular: { en: "Regular", ar: "عادي" },
      medium: { en: "Medium Spicy", ar: "وسط" },
      spicy: { en: "Extra Hot", ar: "حار جداً" },
    };

    const isWrapOrSub = customizerItem.category === "shawarma" || customizerItem.category === "wrap";
    const breadSuffixEn = isWrapOrSub ? ` - ${breadOptions[selectedBreadIndex].labelEn}` : "";
    const breadSuffixAr = isWrapOrSub ? ` - ${breadOptions[selectedBreadIndex].labelAr}` : "";

    const cartItem = {
      cartId: `${customizerItem.id}_${selectedSizeIndex}_${selectedSpice}_${selectedBreadIndex}_${selectedAddons.map((a) => a.labelEn).join("-")}`,
      id: customizerItem.id,
      nameEn: `${customizerItem.nameEn}${breadSuffixEn}`,
      nameAr: `${customizerItem.nameAr}${breadSuffixAr}`,
      sizeNameEn,
      sizeNameAr,
      spiceNameEn: spiceTranslations[selectedSpice].en,
      spiceNameAr: spiceTranslations[selectedSpice].ar,
      addons: selectedAddons,
      unitPrice: totalPrice,
      quantity: 1,
      image: customizerItem.image,
    };

    addToCart(cartItem);
    closeCustomizer();
  };

  const addRelatedItem = () => {
    const pomeDrink = {
      cartId: "ju_pomegranate_default",
      id: "ju_pomegranate",
      nameEn: "Pomegranate Juice",
      nameAr: "عصير رمان",
      sizeNameEn: "Regular Cup",
      sizeNameAr: "كوب عادي",
      spiceNameEn: "Regular",
      spiceNameAr: "عادي",
      addons: [],
      unitPrice: 6.00,
      quantity: 1,
      image: "/assets/pomegranate_drink.png"
    };
    addToCart(pomeDrink);
  };

  const name = locale === "en" ? customizerItem.nameEn : customizerItem.nameAr;
  const desc = locale === "en" ? customizerItem.descEn : customizerItem.descAr;

  return (
    <AnimatePresence>
      {isCustomizerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCustomizer}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-out Panel Drawer */}
          <motion.div
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`relative bg-[#121212] border-t lg:border-t-0 border-white/5 w-full sm:w-[420px] h-full overflow-hidden shadow-2xl z-10 flex flex-col text-[#FFFFFF] ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            }`}
          >
            {/* Header Area */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black tracking-tight">{name}</h3>
                <p className="text-[10px] text-white/40 leading-tight mt-1">{desc}</p>
              </div>
              <button
                onClick={closeCustomizer}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Scrollable Customization Options */}
            <div className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-none pb-24">
              
              {/* Sizes Group */}
              {customizerItem.sizes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold tracking-wider text-white/40 uppercase">
                    {t("modal_size")}
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {customizerItem.sizes.map((size, idx) => {
                      const sizeLabel = locale === "en" ? size.labelEn : size.labelAr;
                      const isSelected = selectedSizeIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-colors ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#181818] text-white/60 hover:text-white"
                          }`}
                        >
                          <span>{sizeLabel}</span>
                          {size.priceModifier > 0 && (
                            <span className="text-[#FFD400]">
                              +{size.priceModifier.toFixed(2)} {locale === "en" ? "AED" : "درهم"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bread Selection Group (Only for Wraps and Shawarma) */}
              {(customizerItem.category === "shawarma" || customizerItem.category === "wrap") && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold tracking-wider text-white/40 uppercase">
                    {locale === "en" ? "Select Bread" : "اختر الخبز"}
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {breadOptions.map((bread, idx) => {
                      const breadLabel = locale === "en" ? bread.labelEn : bread.labelAr;
                      const isSelected = selectedBreadIndex === idx;
                      return (
                        <button
                          key={bread.id}
                          onClick={() => setSelectedBreadIndex(idx)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-colors ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#181818] text-white/60 hover:text-white"
                          }`}
                        >
                          <span>{breadLabel}</span>
                          {bread.price > 0 && (
                            <span className="text-[#FFD400]">
                              +{bread.price.toFixed(2)} {locale === "en" ? "AED" : "درهم"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Spice Level Group (Except Drinks and Sauces) */}
              {customizerItem.category !== "juice" && customizerItem.category !== "sauces" && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold tracking-wider text-white/40 uppercase">
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
                          className={`py-2.5 rounded-lg border text-xs font-bold text-center transition-colors relative ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#181818] text-white/60 hover:text-white"
                          }`}
                        >
                          {spice === "spicy" && (
                            <Flame className={`absolute top-1 w-3 h-3 text-[#FF7A00] ${isRtl ? "left-1" : "right-1"}`} />
                          )}
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Addons Group */}
              {customizerItem.addons.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold tracking-wider text-white/40 uppercase">
                    {t("modal_addons")}
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {customizerItem.addons.map((addon, idx) => {
                      const addonLabel = locale === "en" ? addon.labelEn : addon.labelAr;
                      const isSelected = selectedAddons.some(
                        (a) => a.labelEn === addon.labelEn
                      );
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAddonToggle(addon)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-colors ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#181818] text-white/60 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-4.5 h-4.5 rounded flex items-center justify-center border transition-all ${
                                isSelected ? "border-[#C41218] bg-[#C41218]" : "border-white/20"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <span>{addonLabel}</span>
                          </span>
                          <span className="text-[#FFD400] font-black">
                            +{addon.price.toFixed(2)} {locale === "en" ? "AED" : "درهم"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Products Section */}
              {customizerItem.category !== "juice" && (
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <h4 className="text-xs font-bold tracking-wider text-white/40 uppercase">
                    {locale === "en" ? "Pair it with Juice" : "العصائر الموصى بها"}
                  </h4>
                  <div className="bg-[#181818] border border-white/5 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="flex-grow">
                      <h5 className="text-xs font-bold">{locale === "en" ? "Pomegranate Juice" : "عصير رمان طازج"}</h5>
                      <span className="text-xs font-black text-[#FFD400] mt-0.5 block">6.00 {locale === "en" ? "AED" : "درهم"}</span>
                    </div>
                    <button
                      onClick={addRelatedItem}
                      className="w-8 h-8 rounded-lg bg-[#C41218] flex items-center justify-center text-white transition-colors"
                      title="Add Drink to Cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Calculator & Add Button */}
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/5 bg-[#181818] flex items-center justify-between z-20">
              <div>
                <span className="text-[10px] text-white/40 uppercase font-semibold">
                  {t("modal_total")}
                </span>
                <span className="text-xl font-black text-[#FFD400] block">
                  {totalPrice.toFixed(2)} <span className="text-[10px] text-white/40 font-normal">{locale === "en" ? "AED" : "درهم"}</span>
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-lg font-black text-white text-xs uppercase tracking-wider bg-gradient-to-r from-[#C41218] to-[#FF7A00] transition-all transform active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t("modal_add_btn")}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
