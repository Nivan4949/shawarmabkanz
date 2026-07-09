"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Globe, UtensilsCrossed, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { toggleLanguage, t, locale } = useLanguage();
  const { cart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: locale === "en" ? "Menu" : "القائمة", href: "/" },
    { label: locale === "en" ? "Offers" : "العروض", href: "/offers" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-md ${
          isShrunk ? "h-14 bg-[#1C0204]/95 shadow-md" : "h-16 bg-[#240407]/80"
        } flex items-center`}
      >
        <div className="w-[90%] max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/assets/logo.png"
              alt="Shawarma b'Kanz Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="brand-name text-base font-black tracking-wide uppercase select-none">
              {t("brand_name")}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-xs font-bold tracking-wide py-1 relative block transition-colors duration-300 ${
                        isActive ? "text-[#FFD400]" : "text-white/70 hover:text-[#FFD400]"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C41218] to-[#FFD400]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-[#C41218] hover:border-transparent text-[10px] font-bold transition-all duration-300 text-white"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "العربية" : "English"}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-[#C41218] hover:border-transparent flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#C41218] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1C0204]/95 border-t border-white/10 backdrop-blur-md py-2 px-6 flex items-center justify-around md:hidden shadow-lg shadow-black">
        <Link href="/" className={`flex flex-col items-center gap-1 text-[9px] font-bold ${pathname === "/" ? "text-[#FFD400]" : "text-white/50"}`}>
          <UtensilsCrossed className="w-4.5 h-4.5" />
          <span>{locale === "en" ? "Menu" : "القائمة"}</span>
        </Link>
        <button onClick={() => setIsCartOpen(true)} className={`flex flex-col items-center gap-1 text-[9px] font-bold relative text-white/50`}>
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#C41218] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span>{locale === "en" ? "Cart" : "العربة"}</span>
        </button>
        <Link href="/offers" className={`flex flex-col items-center gap-1 text-[9px] font-bold ${pathname === "/offers" ? "text-[#FFD400]" : "text-white/50"}`}>
          <Percent className="w-4.5 h-4.5" />
          <span>{locale === "en" ? "Offers" : "العروض"}</span>
        </Link>
      </div>
    </>
  );
};
