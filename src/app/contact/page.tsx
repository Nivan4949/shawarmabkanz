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
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FDFBF7] pt-28 pb-20 overflow-hidden">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E61C24] mb-2 block font-sans">
            {t("nav_contact")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {locale === "en" ? "Get In Touch" : "اتصل بنا"}
          </h1>
          <p className="text-sm text-white/60 max-w-[500px] mx-auto leading-relaxed">
            {t("contact_desc")}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Details */}
          <div className="flex flex-col">
            <h2 className="text-xl md:text-3xl font-extrabold text-[#F1C40F] uppercase mb-8">
              {t("contact_title")}
            </h2>

            <div className="flex flex-col gap-8 mb-10">
              {/* Item 1 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 text-[#E61C24] rounded-xl border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1">{t("contact_loc_title")}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{t("contact_loc_desc")}</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 text-[#E61C24] rounded-xl border border-white/10 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1">{t("contact_phone_title")}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">+20 100 2345 678 | +20 2 2418 9090</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 text-[#E61C24] rounded-xl border border-white/10 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1">{t("contact_email_title")}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">hello@shawarmabkanz.com</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 text-[#E61C24] rounded-xl border border-white/10 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1">{t("contact_hours_title")}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{t("contact_hours_desc")}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons (Call / WhatsApp) */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
              <a
                href="tel:+201002345678"
                className="px-6 py-3 rounded-lg bg-white/5 hover:bg-[#E61C24] border border-white/10 hover:border-transparent text-white font-bold text-xs flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>{locale === "en" ? "Call Hotlines" : "اتصل بالدليفري"}</span>
              </a>
              <a
                href="https://wa.me/201002345678"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-lg bg-green-500/10 hover:bg-green-500 border border-green-500/20 hover:border-transparent text-green-500 hover:text-white font-bold text-xs flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_2px_10px_rgba(34,197,94,0.15)] hover:shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === "en" ? "WhatsApp Order" : "اطلب عبر الواتساب"}</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl">
            <h3 className="text-lg font-bold text-white uppercase mb-6">{t("form_title")}</h3>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder={t("form_name_placeholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#1D1D1D] border border-white/5 px-4 py-3 rounded-lg text-sm text-[#FDFBF7] focus:outline-none focus:border-[#E61C24]"
                />
                <input
                  type="email"
                  required
                  placeholder={t("form_email_placeholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#1D1D1D] border border-white/5 px-4 py-3 rounded-lg text-sm text-[#FDFBF7] focus:outline-none focus:border-[#E61C24]"
                />
              </div>

              <textarea
                required
                rows={4}
                placeholder={t("form_msg_placeholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-[#1D1D1D] border border-white/5 px-4 py-3 rounded-lg text-sm text-[#FDFBF7] focus:outline-none focus:border-[#E61C24]"
              />

              <button
                type="submit"
                className="py-3.5 rounded-lg bg-gradient-to-r from-[#E61C24] to-[#F39C12] text-white font-bold text-center hover:shadow-[0_4px_15px_rgba(230,28,36,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t("form_submit")}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
