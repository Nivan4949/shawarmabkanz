"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Gift, Copy, Check, Tag, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function OffersPage() {
  const { t, locale } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const combos = [
    {
      id: "combo_solo",
      titleKey: "offer_combo1_title",
      descKey: "offer_combo1_desc",
      price: 10.99,
      tag: "15% OFF",
      image: "/assets/hero_shawarma.png",
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
      image: "/assets/spit_burger.png",
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
      image: "/assets/baguette_sub.png",
      items: [
        { labelEn: "4 Assorted Sandwiches", labelAr: "٤ سندوتشات مشكلة" },
        { labelEn: "2 Spit Burgers", labelAr: "٢ برجر على اللهب" },
        { labelEn: "2 Large Fries", labelAr: "٢ بطاطس حجم عائلي" },
        { labelEn: "4 Soft Drinks", labelAr: "٤ مشروبات غازية" },
        { labelEn: "1 Pomegranate Pitcher", labelAr: "١ إبريق رمان بالنعناع" }
      ]
    }
  ];

  const coupons = [
    { code: "KANZFEST", discount: "20% OFF", descEn: "Save 20% on all orders above $15", descAr: "خصم ٢٠٪ على جميع الطلبات فوق ١٥ دولار" },
    { code: "WELCOME10", discount: "10% OFF", descEn: "Save 10% on your first wood-fired feast", descAr: "خصم ١٠٪ على أول تجربة لوليمتنا المشوية" },
    { code: "FREEFEED", discount: "100% OFF", descEn: "Spitmaster complimentary box (Testing only)", descAr: "صندوق تجريبي مجاني بالكامل (للاختبار فقط)" }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

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
      image: combo.image
    };

    addToCart(cartItem);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto space-y-20">
        
        {/* Combos Header */}
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-2 block">
            {t("offers_subtitle")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase">
            {t("offers_title")}
          </h1>
          <p className="text-xs text-white/50 max-w-[500px] mx-auto leading-relaxed mt-2">
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
                className="bg-[#181818] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-[#C41218]/30 hover:shadow-2xl transition-all duration-300 relative group"
              >
                {/* Ribbons */}
                <div className="absolute top-4 right-4 bg-[#C41218] text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-[0_0_10px_rgba(196,18,24,0.3)]">
                  {combo.tag}
                </div>

                <div className="relative h-48 overflow-hidden bg-black/20">
                  <img
                    src={combo.image}
                    alt={title}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <div className="p-2 bg-[#C41218]/10 rounded-lg text-[#C41218] border border-[#C41218]/20">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-black text-white">{title}</h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs text-white/50 mb-6 leading-relaxed flex-grow">
                    {desc}
                  </p>

                  {/* Inside list */}
                  <ul className="mb-6 flex flex-col gap-2 border-t border-b border-white/5 py-4">
                    {combo.items.map((item, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2 text-white/80">
                        <span className="text-[#FFD400]">✔</span>
                        <span>{locale === "en" ? item.labelEn : item.labelAr}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-semibold">Price</span>
                      <span className="text-lg font-black text-[#FFD400]">
                        ${combo.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddCombo(combo)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white text-xs font-black uppercase tracking-wider hover:shadow-[0_4px_15px_rgba(196,18,24,0.3)] transition-all duration-300 transform active:scale-95"
                    >
                      {t("order_now")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coupons Section */}
        <div className="space-y-8 pt-10 border-t border-white/5">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#FFD400] mb-2 block">
              {locale === "en" ? "Feast Discount Codes" : "رموز التوفير لوليمتك"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">
              {locale === "en" ? "Secret Spice Coupons" : "كوبونات الخصم السرية"}
            </h2>
            <p className="text-xs text-white/50 max-w-[500px] mx-auto leading-relaxed mt-2">
              {locale === "en" ? "Apply these codes inside your cart drawer during checkout to claim discounts." : "قم بتطبيق هذه الأكواد داخل عربة التسوق أثناء الدفع للحصول على الخصم."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <div
                  key={coupon.code}
                  className="bg-[#181818] border border-dashed border-white/10 p-6 rounded-2xl flex flex-col justify-between h-44 hover:border-white/20 transition-all relative overflow-hidden"
                >
                  {/* Backdrop glowing tag */}
                  <div className="absolute top-[-10px] right-[-10px] w-20 h-20 bg-[#C41218]/5 rounded-full blur-xl" />

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#FFD400] font-black tracking-wider uppercase mb-1">
                        <Tag className="w-3 h-3" />
                        <span>{coupon.discount}</span>
                      </span>
                      <h4 className="text-lg font-black tracking-wider text-white">{coupon.code}</h4>
                    </div>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isCopied ? "bg-green-600 text-white" : "bg-white/5 border border-white/10 text-white hover:bg-[#C41218]"
                      }`}
                      title="Copy Code"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed pr-8">
                    {locale === "en" ? coupon.descEn : coupon.descAr}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
