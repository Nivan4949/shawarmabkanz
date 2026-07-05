"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const { t, locale, isRtl } = useLanguage();
  const { isCartOpen, setIsCartOpen, cart, updateQty, removeCartItem, placeOrder } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  const drawerVariants = {
    hidden: { x: isRtl ? "-100%" : "100%" },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            transition={{ type: "tween", duration: 0.3 }}
            className={`absolute top-0 ${
              isRtl ? "left-0" : "right-0"
            } w-full max-w-[450px] h-full bg-[#161616] border-l border-white/5 shadow-2xl flex flex-col z-10 text-[#FDFBF7]`}
            style={{
              borderLeft: isRtl ? "none" : "1px solid rgba(255,255,255,0.08)",
              borderRight: isRtl ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#F1C40F]" />
                <span>{t("cart_title")}</span>
                <span className="text-sm font-medium text-white/50">
                  ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
                  <span className="text-5xl">🛒</span>
                  <p className="text-white/60 text-sm max-w-[260px]">{t("cart_empty")}</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-white text-xs font-bold transition-colors"
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
                      className="flex gap-4 p-4 rounded-xl bg-[#1D1D1D] border border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={itemName}
                        className="w-16 h-16 object-cover rounded-lg bg-black/20"
                      />
                      <div className="flex-grow flex flex-col">
                        <h4 className="text-sm font-bold text-[#FDFBF7]">{itemName}</h4>
                        <span className="text-[10px] text-white/50 mt-0.5 leading-relaxed">
                          {detailsString}
                        </span>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-md px-1 py-0.5">
                            <button
                              onClick={() => updateQty(item.cartId, -1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 rounded transition-all"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.cartId, 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 rounded transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-[#F1C40F]">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeCartItem(item.cartId)}
                              className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
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
              <div className="p-6 border-t border-white/5 bg-[#1D1D1D] flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-[#FDFBF7]/60">
                    <span>{t("cart_subtotal")}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#FDFBF7]/60">
                    <span>{t("cart_tax")}</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#FDFBF7] mt-1 pt-2 border-t border-white/5">
                    <span>{t("cart_total")}</span>
                    <span className="text-[#F1C40F]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#E61C24] to-[#F39C12] text-white font-bold text-center hover:shadow-[0_4px_15px_rgba(230,28,36,0.3)] transition-all duration-300"
                >
                  {t("cart_checkout")}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
