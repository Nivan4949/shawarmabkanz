"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscribed to the feast!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-8 text-[#FDFBF7]">
      <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        {/* Brand Info */}
        <div className="flex flex-col">
          <img
            src="/assets/logo.png"
            alt="Shawarma b'Kanz"
            className="w-16 h-16 object-contain mb-6"
          />
          <p className="text-sm text-white/60 max-w-[320px] leading-relaxed">
            {t("footer_about")}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:pl-8">
          <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-[#F1C40F]">
            {t("footer_links_head")}
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#FDFBF7]/70">
            <li>
              <Link href="/" className="hover:text-[#F1C40F] transition-colors">
                {t("nav_home")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#F1C40F] transition-colors">
                {t("nav_story")}
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-[#F1C40F] transition-colors">
                {t("nav_menu")}
              </Link>
            </li>
            <li>
              <Link href="/reservations" className="hover:text-[#F1C40F] transition-colors">
                {t("reservation_title")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col">
          <h4 className="text-sm font-bold tracking-wider uppercase mb-6 text-[#F1C40F]">
            {t("footer_news_head")}
          </h4>
          <p className="text-sm text-white/60 mb-6 leading-relaxed">
            {t("footer_news_desc")}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              required
              placeholder={t("footer_news_placeholder")}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow bg-[#161616] border border-white/10 px-4 py-2.5 rounded-lg text-sm text-[#FDFBF7] focus:outline-none focus:border-[#E61C24]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white text-sm font-bold hover:shadow-[0_2px_10px_rgba(196,18,24,0.2)] transition-all duration-300"
            >
              {t("footer_news_submit")}
            </button>
          </form>
        </div>
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Shawarma b'Kanz. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#C41218] transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#C41218] transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#C41218] transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
