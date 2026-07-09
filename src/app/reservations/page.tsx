"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, Users, Flame, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationsPage() {
  const { t, locale, isRtl } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    seating: "standard"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-2 block">
            {t("reservation_subtitle")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase">
            {t("reservation_title")}
          </h1>
          <p className="text-xs text-white/50 max-w-[500px] mx-auto leading-relaxed mt-2">
            {t("reservation_desc")}
          </p>
        </div>

        <div className="max-w-[600px] mx-auto bg-[#181818] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl relative">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#FFD400] uppercase">
                    {t("res_name")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Rami Al-Assaf"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/30"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#FFD400] uppercase">
                      {t("res_email")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#FFD400] uppercase">
                      {t("res_phone")}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+20 100 2345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/30"
                    />
                  </div>
                </div>

                {/* Date, Time, Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#FFD400] uppercase">
                      {t("res_date")}
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C41218] appearance-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#FFD400] uppercase">
                      {t("res_time")}
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C41218]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#FFD400] uppercase">
                      {t("res_guests")}
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#C41218] appearance-none"
                    >
                      <option value="1">1 {t("res_guests_opt")}</option>
                      <option value="2">2 {t("res_guests_opt")}</option>
                      <option value="4">4 {t("res_guests_opt")}</option>
                      <option value="6">6 {t("res_guests_opt")}</option>
                      <option value="8">8 {t("res_guests_opt")}</option>
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#FFD400] uppercase">
                    {locale === "en" ? "Seating Zone" : "منطقة الجلوس"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "standard", labelEn: "Standard Dining", labelAr: "صالة الطعام" },
                      { id: "hearth", labelEn: "Hearthside Live", labelAr: "أمام موقد النار" },
                      { id: "outdoor", labelEn: "Outdoor Terrace", labelAr: "الشرفة الخارجية" }
                    ].map((zone) => {
                      const label = locale === "en" ? zone.labelEn : zone.labelAr;
                      const isSelected = formData.seating === zone.id;
                      return (
                        <button
                          key={zone.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, seating: zone.id })}
                          className={`p-4 rounded-xl border text-xs font-bold transition-all duration-300 ${
                            isSelected
                              ? "border-[#C41218] bg-[#C41218]/5 text-white"
                              : "border-white/5 bg-[#121212] hover:border-[#C41218]/50 text-white/70 hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white font-black text-xs uppercase tracking-wider text-center hover:shadow-[0_4px_15px_rgba(196,18,24,0.3)] transition-all duration-300 transform active:scale-95"
                >
                  {t("res_submit")}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-black mb-3">
                  {locale === "en" ? "Booking Requested!" : "تم تقديم طلب الحجز!"}
                </h3>
                <p className="text-xs text-white/50 mb-6 max-w-[320px] leading-relaxed">
                  {t("res_success")}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[#121212] border border-white/10 hover:border-transparent hover:bg-[#C41218] text-xs font-bold transition-all text-white"
                >
                  {locale === "en" ? "Book another table" : "احجز طاولة أخرى"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
