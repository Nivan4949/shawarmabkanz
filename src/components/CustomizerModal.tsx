"use client";

import React, { useState, useEffect } from "react";
import { useCart, AddonOption } from "@/context/CartContext";
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-out Panel Drawer */}
          <motion.div
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`relative bg-white border-t lg:border-t-0 border-neutral-200 w-full sm:w-[420px] h-full overflow-hidden shadow-2xl z-10 flex flex-col text-[#1A1A1A] ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            }`}
          >
            {/* Header Area */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black tracking-tight text-neutral-850">{name}</h3>
                <p className="text-[10px] text-neutral-500 leading-tight mt-1">{desc}</p>
              </div>
              <button
                onClick={closeCustomizer}
                className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-[#C41218] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Customization Options */}
            <div className="flex-grow overflow-y-auto p-5 space-y-6 scrollbar-none pb-24">
              
              {/* Sizes Group */}
              {customizerItem.sizes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
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
                          className={`flex items-center justify-between p-3.5 rounded-lg border text-xs font-bold transition-all ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-[#C41218]"
                              : "border-neutral-200/80 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <span>{sizeLabel}</span>
                          {size.priceModifier > 0 && (
                            <span className="text-[#C41218]">
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
                  <h4 className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
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
                          className={`flex items-center justify-between p-3.5 rounded-lg border text-xs font-bold transition-all ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-[#C41218]"
                              : "border-neutral-200/80 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <span>{breadLabel}</span>
                          {bread.price > 0 && (
                            <span className="text-[#C41218]">
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
                  <h4 className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
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
                          className={`py-2.5 rounded-lg border text-xs font-bold text-center transition-all relative ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-[#C41218]"
                              : "border-neutral-200/80 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
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
                  <h4 className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
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
                          className={`flex items-center justify-between p-3.5 rounded-lg border text-xs font-bold transition-all ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-[#C41218]"
                              : "border-neutral-200/80 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                                isSelected ? "border-[#C41218] bg-[#C41218]" : "border-neutral-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                            </span>
                            <span>{addonLabel}</span>
                          </span>
                          <span className="text-[#C41218]">
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
                <div className="space-y-3 pt-3 border-t border-neutral-200">
                  <h4 className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
                    {locale === "en" ? "Pair it with Juice" : "العصائر الموصى بها"}
                  </h4>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 flex items-center gap-3">
                    <div className="flex-grow">
                      <h5 className="text-xs font-bold text-neutral-800">{locale === "en" ? "Pomegranate Juice" : "عصير رمان طازج"}</h5>
                      <span className="text-xs font-black text-[#C41218] mt-0.5 block">6.00 {locale === "en" ? "AED" : "درهم"}</span>
                    </div>
                    <button
                      onClick={addRelatedItem}
                      className="w-7 h-7 rounded bg-[#C41218] flex items-center justify-center text-white hover:bg-[#FF7A00] transition-colors"
                      title="Add Drink to Cart"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Calculator & Add Button */}
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between z-20">
              <div>
                <span className="text-[9px] text-neutral-400 uppercase font-semibold">
                  {t("modal_total")}
                </span>
                <span className="text-lg font-black text-[#C41218] block">
                  {totalPrice.toFixed(2)} <span className="text-[10px] text-neutral-500 font-normal">{locale === "en" ? "AED" : "درهم"}</span>
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="px-5 py-3 rounded-lg font-black text-white text-xs uppercase tracking-wider bg-[#C41218] hover:bg-[#FF7A00] transition-colors flex items-center gap-1.5 shadow-md shadow-[#C41218]/10"
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
