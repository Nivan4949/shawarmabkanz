"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, Clock, MessageCircle, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(locale === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-2 block">
            {t("nav_contact")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase">
            {locale === "en" ? "Get In Touch" : "اتصل بنا"}
          </h1>
          <p className="text-xs text-white/50 max-w-[500px] mx-auto leading-relaxed mt-2">
            {t("contact_desc")}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#FFD400] uppercase">
              {t("contact_title")}
            </h2>

            <div className="flex flex-col gap-6">
              {/* Item 1 */}
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#181818] border border-white/5">
                <div className="p-3 bg-white/5 text-[#C41218] rounded-xl border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase mb-1">{t("contact_loc_title")}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">{t("contact_loc_desc")}</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#181818] border border-white/5">
                <div className="p-3 bg-white/5 text-[#C41218] rounded-xl border border-white/10 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase mb-1">{t("contact_phone_title")}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">+20 100 2345 678 | +20 2 2418 9090</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#181818] border border-white/5">
                <div className="p-3 bg-white/5 text-[#C41218] rounded-xl border border-white/10 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase mb-1">{t("contact_email_title")}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">hello@shawarmabkanz.com</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-4 items-start p-4 rounded-xl bg-[#181818] border border-white/5">
                <div className="p-3 bg-white/5 text-[#C41218] rounded-xl border border-white/10 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase mb-1">{t("contact_hours_title")}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">{t("contact_hours_desc")}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons (Call / WhatsApp) */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
              <a
                href="tel:+201002345678"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-[#C41218] border border-white/10 hover:border-transparent text-white font-bold text-xs flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>{locale === "en" ? "Call Hotlines" : "اتصل بالدليفري"}</span>
              </a>
              <a
                href="https://wa.me/201002345678"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-green-500/10 hover:bg-green-500 border border-green-500/20 hover:border-transparent text-green-500 hover:text-white font-bold text-xs flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_2px_10px_rgba(34,197,94,0.15)] hover:shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === "en" ? "WhatsApp Order" : "اطلب عبر الواتساب"}</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-6 bg-[#181818] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl space-y-6">
            <h3 className="text-base font-bold text-white uppercase">{t("form_title")}</h3>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder={t("form_name_placeholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#121212] border border-white/5 px-4 py-3.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/40"
                />
                <input
                  type="email"
                  required
                  placeholder={t("form_email_placeholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#121212] border border-white/5 px-4 py-3.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/40"
                />
              </div>

              <textarea
                required
                rows={5}
                placeholder={t("form_msg_placeholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-[#121212] border border-white/5 px-4 py-3.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/40"
              />

              <button
                type="submit"
                className="py-4 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white font-black text-xs uppercase tracking-wider text-center hover:shadow-[0_4px_15px_rgba(196,18,24,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{t("form_submit")}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Responsive Google Maps Simulation */}
        <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white uppercase">{locale === "en" ? "Flagship Store Map" : "موقع فرعنا الرئيسي"}</h3>
          <div 
            className="w-full h-80 rounded-xl bg-[#121212] border border-white/5 overflow-hidden flex items-center justify-center text-center relative"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          >
            {/* Map lines */}
            <div className="absolute top-1/3 inset-x-0 h-[4px] bg-white/5" />
            <div className="absolute top-2/3 inset-x-0 h-[3px] bg-white/5" />
            <div className="absolute left-1/4 inset-y-0 w-[4px] bg-white/5" />
            <div className="absolute left-2/3 inset-y-0 w-[3px] bg-white/5" />
            
            {/* Map pin */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <MapPin className="w-12 h-12 text-[#C41218] animate-bounce" />
              <span className="px-4 py-2 bg-black/80 rounded-xl border border-white/10 text-xs font-bold shadow-lg">
                {t("contact_loc_desc")}
              </span>
            </div>
            
            <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 border border-white/5 text-[9px] text-white/40 tracking-wider">
              {locale === "en" ? "Heliopolis Flagship GPS Active" : "تتبع موقع فرع مصر الجديدة نشط"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
