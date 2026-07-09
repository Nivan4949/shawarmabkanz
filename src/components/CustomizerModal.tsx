"use client";

import React, { useState, useEffect } from "react";
import { useCart, AddonOption, MenuItem } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Check, Flame, ChevronRight, ShoppingBag, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ingredientsMap: Record<string, { id: string; en: string; ar: string }[]> = {
  classic_chicken: [
    { id: "garlic", en: "Garlic Paste", ar: "الثومية" },
    { id: "pickles", en: "Pickles", ar: "المخلل" },
    { id: "fries", en: "Fries", ar: "البطاطس" }
  ],
  fire_beef: [
    { id: "tahini", en: "Tahini Sauce", ar: "طحينة" },
    { id: "biwaz", en: "Biwaz (Onion Salad)", ar: "بيواز البصل" },
    { id: "chili", en: "Chili Paste", ar: "الشطة الحارة" }
  ],
  spit_burger: [
    { id: "secret_sauce", en: "Secret Sauce", ar: "الصوص السري" },
    { id: "cheddar", en: "Cheddar Cheese", ar: "جبن شيدر" },
    { id: "pickles", en: "Pickles", ar: "المخلل" }
  ],
  garlic_burger: [
    { id: "garlic_aioli", en: "Garlic Aioli", ar: "ثوم أيولي" },
    { id: "cheddar", en: "Cheddar Cheese", ar: "جبن شيدر" },
    { id: "pickles", en: "Pickles", ar: "المخلل" },
    { id: "lettuce", en: "Lettuce", ar: "الخس" }
  ],
  kanz_sub: [
    { id: "garlic", en: "Garlic Paste", ar: "الثومية" },
    { id: "fries", en: "Fries", ar: "البطاطس" },
    { id: "pickles", en: "Pickles", ar: "المخلل" }
  ],
  philly_sub: [
    { id: "peppers", en: "Bell Peppers", ar: "فلفل رومي" },
    { id: "onions", en: "Onions", ar: "البصل" },
    { id: "provolone", en: "Provolone Cheese", ar: "جبن بروفولون" }
  ]
};

const breadOptions = [
  { id: "saj", labelEn: "Artisan Saj Bread", labelAr: "خبز صاج طازج", price: 0 },
  { id: "lebanese", labelEn: "Traditional Lebanese", labelAr: "خبز لبناني تقليدي", price: 0 },
  { id: "baguette", labelEn: "French Baguette", labelAr: "خبز فرنسي محمص", price: 0.50 }
];

export const CustomizerModal: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const { isCustomizerOpen, closeCustomizer, customizerItem, addToCart } = useCart();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedSpice, setSelectedSpice] = useState<"regular" | "medium" | "spicy">("regular");
  const [selectedBreadIndex, setSelectedBreadIndex] = useState(0);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Reset local state when item changes
  useEffect(() => {
    if (customizerItem) {
      setSelectedSizeIndex(0);
      setSelectedSpice("regular");
      setSelectedBreadIndex(0);
      setRemovedIngredients([]);
      setSelectedAddons([]);
      setTotalPrice(customizerItem.price);
    }
  }, [customizerItem]);

  // Update total price when selections change
  useEffect(() => {
    if (!customizerItem) return;
    const basePrice = customizerItem.price;
    const sizePrice = customizerItem.sizes[selectedSizeIndex]?.priceModifier || 0;
    const breadPrice = customizerItem.category !== "drink" && customizerItem.category !== "burger" 
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

  const handleIngredientToggle = (id: string) => {
    setRemovedIngredients(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
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

    const isDrinkOrBurger = customizerItem.category === "drink" || customizerItem.category === "burger";
    const breadSuffixEn = isDrinkOrBurger ? "" : ` - ${breadOptions[selectedBreadIndex].labelEn}`;
    const breadSuffixAr = isDrinkOrBurger ? "" : ` - ${breadOptions[selectedBreadIndex].labelAr}`;

    const removalsEn = removedIngredients.length > 0 
      ? ` (No ${removedIngredients.map(id => ingredientsMap[customizerItem.id]?.find(x => x.id === id)?.en).join(", ")})` 
      : "";
    const removalsAr = removedIngredients.length > 0 
      ? ` (بدون ${removedIngredients.map(id => ingredientsMap[customizerItem.id]?.find(x => x.id === id)?.ar).join("، ")})` 
      : "";

    const cartItem = {
      cartId: `${customizerItem.id}_${selectedSizeIndex}_${selectedSpice}_${selectedBreadIndex}_${removedIngredients.join("-")}_${selectedAddons.map((a) => a.labelEn).join("-")}`,
      id: customizerItem.id,
      nameEn: `${customizerItem.nameEn}${breadSuffixEn}${removalsEn}`,
      nameAr: `${customizerItem.nameAr}${breadSuffixAr}${removalsAr}`,
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

  // Add beverage directly from Drawer
  const addRelatedItem = () => {
    const pomeDrink = {
      cartId: "pom_infusion_related",
      id: "pom_infusion",
      nameEn: "Pomegranate Mint Nectar",
      nameAr: "عصير رمان بالنعناع",
      sizeNameEn: "Regular Cup",
      sizeNameAr: "كوب وسط",
      spiceNameEn: "Regular (Tame)",
      spiceNameAr: "عادي",
      addons: [],
      unitPrice: 3.99,
      quantity: 1,
      image: "/assets/pomegranate_drink.png"
    };
    addToCart(pomeDrink);
  };

  const name = locale === "en" ? customizerItem.nameEn : customizerItem.nameAr;
  const desc = locale === "en" ? customizerItem.descEn : customizerItem.descAr;
  const ingredientsList = ingredientsMap[customizerItem.id] || [];

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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-out Panel Drawer */}
          <motion.div
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className={`relative bg-[#121212] border-t lg:border-t-0 border-white/5 w-full sm:w-[460px] h-full overflow-hidden shadow-2xl z-10 flex flex-col text-[#FFFFFF] ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            }`}
          >
            {/* Header Area */}
            <div className="relative h-64 flex items-end p-6 overflow-hidden">
              <img
                src={customizerItem.image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
              
              <button
                onClick={closeCustomizer}
                className={`absolute top-6 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#C41218] hover:border-transparent transition-all duration-300 ${
                  isRtl ? "left-6" : "right-6"
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 w-full">
                {customizerItem.badgeEn && (
                  <span className="inline-block px-2.5 py-1 rounded bg-[#C41218] text-[9px] font-black uppercase tracking-wider mb-2">
                    {locale === "en" ? customizerItem.badgeEn : customizerItem.badgeAr}
                  </span>
                )}
                <h3 className="text-2xl font-black tracking-tight">{name}</h3>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>

            {/* Scrollable Customization Options */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-none pb-28">
              
              {/* Sizes Group */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold tracking-wider text-[#FFD400] uppercase">
                    {t("modal_size")}
                  </h4>
                  <span className="text-[10px] uppercase font-black text-[#C41218] tracking-widest">{locale === "en" ? "Required" : "مطلوب"}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {customizerItem.sizes.map((size, idx) => {
                    const sizeLabel = locale === "en" ? size.labelEn : size.labelAr;
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`flex items-center justify-between p-4 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                          isSelected
                            ? "border-[#C41218] bg-[#C41218]/5 text-white"
                            : "border-white/5 bg-[#181818] hover:border-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-[#C41218]" : "border-white/30"}`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-[#C41218]" />}
                          </span>
                          <span>{sizeLabel}</span>
                        </span>
                        {size.priceModifier > 0 && (
                          <span className="text-[#FFD400]">
                            +${size.priceModifier.toFixed(2)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bread Selection Group (Only for Wraps and Subs) */}
              {customizerItem.category !== "drink" && customizerItem.category !== "burger" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold tracking-wider text-[#FFD400] uppercase">
                      {locale === "en" ? "Select Flatbread" : "اختر نوع الخبز"}
                    </h4>
                    <span className="text-[10px] uppercase font-black text-[#C41218] tracking-widest">{locale === "en" ? "Required" : "مطلوب"}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {breadOptions.map((bread, idx) => {
                      const breadLabel = locale === "en" ? bread.labelEn : bread.labelAr;
                      const isSelected = selectedBreadIndex === idx;
                      return (
                        <button
                          key={bread.id}
                          onClick={() => setSelectedBreadIndex(idx)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#181818] hover:border-white/20"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-[#C41218]" : "border-white/30"}`}>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-[#C41218]" />}
                            </span>
                            <span>{breadLabel}</span>
                          </span>
                          {bread.price > 0 && (
                            <span className="text-[#FFD400]">
                              +${bread.price.toFixed(2)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Spice Level Group */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold tracking-wider text-[#FFD400] uppercase">
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
                        className={`py-3 rounded-xl border text-xs font-bold text-center transition-all duration-300 relative overflow-hidden ${
                          isSelected
                            ? "border-[#C41218] bg-[#C41218]/5 text-white"
                            : "border-white/5 bg-[#181818] hover:border-white/20"
                        }`}
                      >
                        {spice === "spicy" && (
                          <Flame className={`absolute top-1.5 w-3 h-3 text-[#FF7A00] ${isRtl ? "left-1.5" : "right-1.5"}`} />
                        )}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Remove Ingredients Group (Hold back fillings) */}
              {ingredientsList.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold tracking-wider text-[#FFD400] uppercase">
                    {locale === "en" ? "Remove Ingredients" : "مكونات لا ترغب بها"}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {ingredientsList.map((ing) => {
                      const isRemoved = removedIngredients.includes(ing.id);
                      return (
                        <button
                          key={ing.id}
                          onClick={() => handleIngredientToggle(ing.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                            isRemoved
                              ? "border-[#C41218]/40 bg-[#C41218]/5 text-white/50 line-through"
                              : "border-white/5 bg-[#181818] hover:border-white/10"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isRemoved ? "bg-[#C41218] border-[#C41218]" : "border-white/20"}`}>
                              {isRemoved && <X className="w-3.5 h-3.5 text-white" />}
                            </span>
                            <span>{locale === "en" ? ing.en : ing.ar}</span>
                          </span>
                          <span className="text-[10px] uppercase text-white/30">{isRemoved ? (locale === "en" ? "Excluded" : "مستثنى") : ""}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Addons Group */}
              {customizerItem.addons.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold tracking-wider text-[#FFD400] uppercase">
                    {t("modal_addons")}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {customizerItem.addons.map((addon, idx) => {
                      const addonLabel = locale === "en" ? addon.labelEn : addon.labelAr;
                      const isSelected = selectedAddons.some(
                        (a) => a.labelEn === addon.labelEn
                      );
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAddonToggle(addon)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#181818] hover:border-white/25"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                isSelected ? "border-[#C41218] bg-[#C41218]" : "border-white/20"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </span>
                            <span>{addonLabel}</span>
                          </span>
                          <span className="text-[#FFD400] font-bold">
                            +${addon.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Products Section */}
              {customizerItem.category !== "drink" && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h4 className="text-sm font-bold tracking-wider text-[#FFD400] uppercase">
                    {locale === "en" ? "Frequently Ordered Together" : "أطباق يكثر طلبها معاً"}
                  </h4>
                  <div className="bg-[#181818] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-all">
                    <img
                      src="/assets/pomegranate_drink.png"
                      alt="Pomegranate drink"
                      className="w-14 h-14 object-cover rounded-xl bg-black/45"
                    />
                    <div className="flex-grow">
                      <h5 className="text-xs font-bold">{locale === "en" ? "Pomegranate Mint Nectar" : "عصير رمان بالنعناع"}</h5>
                      <p className="text-[10px] text-white/50 mt-0.5">{locale === "en" ? "Fresh cold-pressed" : "عصير طازج بالنعناع"}</p>
                      <span className="text-xs font-black text-[#FFD400] mt-1 block">$3.99</span>
                    </div>
                    <button
                      onClick={addRelatedItem}
                      className="w-9 h-9 rounded-full bg-[#C41218] hover:bg-[#FF7A00] flex items-center justify-center text-white transition-colors"
                      title="Add Drink to Cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Calculator & Add Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 bg-[#181818] flex items-center justify-between z-20">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase font-semibold">
                  {t("modal_total")}
                </span>
                <span className="text-2xl font-black text-[#FFD400]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="px-8 py-3.5 rounded-xl font-black text-white text-xs uppercase tracking-wider bg-gradient-to-r from-[#C41218] to-[#FF7A00] hover:shadow-[0_4px_20px_rgba(196,18,24,0.35)] transition-all duration-300 flex items-center gap-2 transform active:scale-95"
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
