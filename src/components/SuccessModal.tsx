"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Flame, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SuccessModal: React.FC = () => {
  const { t } = useLanguage();
  const { isSuccessOpen, setIsSuccessOpen, successStep } = useCart();

  if (!isSuccessOpen) return null;

  return (
    <AnimatePresence>
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSuccessOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-[#161616] border border-white/10 rounded-2xl w-[90%] max-w-[440px] p-8 text-center shadow-2xl z-10 text-[#FDFBF7]"
          >
            {/* Checkmark */}
            <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <Check className="w-8 h-8 text-green-500" />
            </div>

            <h3 className="text-2xl font-black mb-3">{t("success_title")}</h3>
            <p className="text-sm text-[#FDFBF7]/70 mb-8 leading-relaxed">
              {t("success_desc")}
            </p>

            {/* Tracker */}
            <div className="flex justify-between relative mb-8">
              {/* Progress Line Backdrop */}
              <div className="absolute top-4 left-6 right-6 h-[2px] bg-white/10 z-0" />
              
              {/* Progress Line Active */}
              <div
                className="absolute top-4 left-6 h-[2px] bg-[#C41218] transition-all duration-1000 z-0"
                style={{
                  width: successStep === 1 ? "0%" : successStep === 2 ? "50%" : "100%",
                }}
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 relative z-10 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    successStep >= 1
                      ? "bg-[#C41218] border-2 border-[#C41218] text-white shadow-[0_0_10px_#C41218]"
                      : "bg-[#1D1D1D] border-2 border-white/10 text-white/50"
                  }`}
                >
                  {successStep > 1 ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${successStep >= 1 ? "text-[#FDFBF7]/90" : "text-white/40"}`}>
                  {t("step_1")}
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2 relative z-10 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    successStep >= 2
                      ? "bg-[#C41218] border-2 border-[#C41218] text-white shadow-[0_0_10px_#C41218]"
                      : "bg-[#1D1D1D] border-2 border-white/10 text-white/50"
                  }`}
                >
                  {successStep === 2 ? (
                    <Flame className="w-4 h-4 animate-bounce" />
                  ) : successStep > 2 ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    "2"
                  )}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${successStep >= 2 ? "text-[#FDFBF7]/90" : "text-white/40"}`}>
                  {t("step_2")}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2 relative z-10 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    successStep >= 3
                      ? "bg-[#C41218] border-2 border-[#C41218] text-white shadow-[0_0_10px_#C41218]"
                      : "bg-[#1D1D1D] border-2 border-white/10 text-white/50"
                  }`}
                >
                  🛵
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${successStep >= 3 ? "text-[#FDFBF7]/90" : "text-white/40"}`}>
                  {t("step_3")}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full py-3.5 rounded-lg bg-[#1D1D1D] hover:bg-[#C41218] text-white font-bold transition-all duration-300 border border-white/10 hover:border-transparent"
            >
              {t("success_close")}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
