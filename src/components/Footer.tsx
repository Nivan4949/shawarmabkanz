"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t, locale } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscribed to the feast!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-white border-t border-neutral-200/60 pt-16 pb-8 text-neutral-800">
      <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {/* Brand Info */}
        <div className="flex flex-col">
          <img
            src="/assets/logo.png"
            alt="Shawarma b'Kanz"
            className="w-12 h-12 object-contain mb-4 bg-neutral-50 rounded-full p-0.5 border border-neutral-200"
          />
          <p className="text-xs text-neutral-500 max-w-[280px] leading-relaxed">
            {t("footer_about")}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:pl-8">
          <h4 className="text-xs font-black tracking-wider uppercase mb-4 text-[#C41218]">
            {t("footer_links_head")}
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-neutral-600">
            <li>
              <Link href="/" className="hover:text-[#C41218] transition-colors">
                {t("nav_menu")}
              </Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-[#C41218] transition-colors">
                {locale === "en" ? "Offers" : "العروض"}
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-[#C41218] transition-colors">
                {locale === "en" ? "Admin Console" : "إدارة المطعم"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col">
          <h4 className="text-xs font-black tracking-wider uppercase mb-4 text-[#C41218]">
            {t("footer_news_head")}
          </h4>
          <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
            {t("footer_news_desc")}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              required
              placeholder={t("footer_news_placeholder")}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow bg-neutral-50 border border-neutral-200 px-3 py-2 rounded-lg text-xs text-neutral-800 focus:outline-none focus:border-[#C41218] placeholder-neutral-400"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white text-xs font-bold transition-colors shadow-sm"
            >
              {t("footer_news_submit")}
            </button>
          </form>
        </div>
      </div>

      <div className="w-[90%] max-w-[1200px] mx-auto pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-neutral-400">
          &copy; {new Date().getFullYear()} Shawarma b'Kanz. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C41218] hover:border-transparent transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C41218] hover:border-transparent transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
