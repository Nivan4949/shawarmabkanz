"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ShoppingCart, Percent, Tag, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const router = useRouter();
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQty, 
    removeCartItem, 
    couponCode,
    discountPercent,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    deliveryType,
    setDeliveryType 
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen size to toggle Bottom Sheet vs Side Drawer layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.14;
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal + tax + deliveryFee - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
    } else {
      setCouponInput("");
    }
  };

  const getEstimatedTime = () => {
    if (deliveryType === "delivery") {
      return locale === "en" ? "25 - 35 mins" : "٢٥ - ٣٥ دقيقة";
    } else if (deliveryType === "takeaway") {
      return locale === "en" ? "10 - 15 mins" : "١٠ - ١٥ دقيقة";
    } else {
      return locale === "en" ? "15 - 20 mins" : "١٥ - ٢٠ دقيقة";
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const drawerVariants = {
    hidden: isMobile 
      ? { y: "100%" } 
      : { x: isRtl ? "-100%" : "100%" },
    visible: isMobile 
      ? { y: 0 } 
      : { x: 0 },
    exit: isMobile 
      ? { y: "100%" } 
      : { x: isRtl ? "-100%" : "100%" }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden max-sm:items-end">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Body: Side Drawer on Desktop, Bottom Sheet on Mobile */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={{ type: "tween", duration: 0.3 }}
            className={`bg-white border-t sm:border-t-0 border-neutral-200 shadow-2xl flex flex-col z-10 text-[#1A1A1A] relative w-full sm:max-w-[440px] h-[85vh] sm:h-full ${
              isMobile 
                ? "rounded-t-3xl border-t border-neutral-350"
                : (isRtl ? "absolute top-0 left-0 border-r" : "absolute top-0 right-0 border-l")
            }`}
          >
            {/* Mobile Visual Drag Handle */}
            {isMobile && (
              <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mt-3 shrink-0" />
            )}

            {/* Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-sm font-black flex items-center gap-2 text-neutral-850">
                <ShoppingCart className="w-5 h-5 text-[#C41218]" />
                <span>{t("cart_title")}</span>
                <span className="text-xs font-medium text-neutral-400">
                  ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-[#C41218] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery/Order Type Selector */}
            {cart.length > 0 && (
              <div className="p-5 border-b border-neutral-200 bg-neutral-50/50">
                <div className="grid grid-cols-3 gap-2 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
                  {(["delivery", "takeaway", "dinein"] as const).map((type) => {
                    const isSelected = deliveryType === type;
                    const labels = {
                      delivery: locale === "en" ? "Delivery" : "دليفري",
                      takeaway: locale === "en" ? "Takeaway" : "سفري",
                      dinein: locale === "en" ? "Dine-in" : "محلي",
                    };
                    return (
                      <button
                        key={type}
                        onClick={() => setDeliveryType(type)}
                        className={`py-2 rounded-md text-xs font-bold text-center transition-all ${
                          isSelected 
                            ? "bg-[#C41218] text-white" 
                            : "text-neutral-500 hover:text-[#C41218]"
                        }`}
                      >
                        {labels[type]}
                      </button>
                    );
                  })}
                </div>
                
                {/* Est time & fee description */}
                <div className="flex items-center justify-between mt-3 text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C41218]" />
                    <span>{getEstimatedTime()}</span>
                  </div>
                  <span>
                    {deliveryType === "delivery"
                      ? `${locale === "en" ? "Delivery Fee" : "رسوم التوصيل"}: ${deliveryFee.toFixed(2)} ${locale === "en" ? "AED" : "درهم"}`
                      : locale === "en" ? "Free Pickup" : "استلام مجاني"}
                  </span>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-3 scrollbar-none pb-28">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center gap-3">
                  <span className="text-4xl">🛒</span>
                  <p className="text-neutral-400 text-xs max-w-[240px]">{t("cart_empty")}</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-6 py-2.5 rounded-lg bg-[#C41218] text-xs font-bold text-white uppercase tracking-wider hover:bg-[#FF7A00] transition-colors"
                  >
                    {t("cart_start_order")}
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const itemName = locale === "en" ? item.nameEn : item.nameAr;
                  const sizeName = locale === "en" ? item.sizeNameEn : item.sizeNameAr;
                  const spiceName = locale === "en" ? item.spiceNameEn : item.spiceNameAr;

                  const addonsLabel = item.addons
                    .map((a) => (locale === "en" ? a.labelEn : a.labelAr))
                    .join(", ");
                  const detailsString = `${sizeName} | ${spiceName}${
                    addonsLabel ? ` | +${addonsLabel}` : ""
                  }`;

                  return (
                    <motion.div
                      layout
                      key={item.cartId}
                      className="flex gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <img
                        src={item.image}
                        alt={itemName}
                        className="w-14 h-14 object-contain rounded-lg bg-white border border-neutral-200 p-1"
                      />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-black text-neutral-800 leading-tight">{itemName}</h4>
                          <span className="text-[10px] text-neutral-400 mt-0.5 block leading-tight">
                            {detailsString}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-md px-1.5 py-0.5">
                            <button
                              onClick={() => updateQty(item.cartId, -1)}
                              className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-neutral-800 rounded transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-neutral-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.cartId, 1)}
                              className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-neutral-800 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-black text-[#C41218]">
                              {(item.unitPrice * item.quantity).toFixed(2)} <span className="text-[9px] text-neutral-400 font-normal">{locale === "en" ? "AED" : "درهم"}</span>
                            </span>
                            <button
                              onClick={() => removeCartItem(item.cartId)}
                              className="text-red-500 hover:text-red-650 p-1 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer calculations */}
            {cart.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-neutral-200 bg-neutral-50 flex flex-col gap-3 z-25">
                
                {/* Coupon Input Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder={couponCode ? `${couponCode} Applied!` : (locale === "en" ? "Coupon (e.g. KANZFEST)" : "كود الخصم")}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      disabled={!!couponCode}
                      className="w-full bg-white border border-neutral-200 rounded-lg py-2 pl-8 pr-4 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218] placeholder-neutral-400 disabled:opacity-60 disabled:text-[#C41218] disabled:font-bold"
                    />
                    <Tag className="absolute top-2.5 left-2.5 w-3.5 h-3.5 text-neutral-400" />
                  </div>
                  {couponCode ? (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="px-3 py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors"
                    >
                      {locale === "en" ? "Remove" : "حذف"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-white border border-neutral-200 hover:bg-[#C41218] hover:text-white hover:border-transparent text-xs font-bold transition-all text-neutral-700"
                    >
                      {locale === "en" ? "Apply" : "تطبيق"}
                    </button>
                  )}
                </form>

                {couponError && (
                  <p className="text-[10px] text-red-500 font-bold">
                    {locale === "en" ? "Invalid code! Try: KANZFEST, WELCOME10" : "كود الخصم غير صحيح! جرب: KANZFEST"}
                  </p>
                )}

                {/* Subtotals & Taxes */}
                <div className="flex flex-col gap-1 text-xs border-t border-neutral-200 pt-2">
                  <div className="flex justify-between text-[11px] text-neutral-500">
                    <span>{t("cart_subtotal")}</span>
                    <span>{subtotal.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="flex justify-between text-[11px] text-neutral-500">
                      <span>{locale === "en" ? "Delivery Fee" : "رسوم التوصيل"}</span>
                      <span>{deliveryFee.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                    </div>
                  )}
                  {couponCode && (
                    <div className="flex justify-between text-[11px] text-green-600 font-bold">
                      <span className="flex items-center gap-1">
                        <span>Discount ({discountPercent}%)</span>
                      </span>
                      <span>-{discount.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs font-black text-neutral-850 border-t border-neutral-200 pt-2 mt-1">
                    <span>{t("cart_total")}</span>
                    <span className="text-[#C41218] text-sm font-black">
                      {total.toFixed(2)} {locale === "en" ? "AED" : "درهم"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#C41218]/10"
                >
                  <Percent className="w-4 h-4" />
                  <span>{locale === "en" ? "Proceed to Checkout" : "الذهاب للدفع"}</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
