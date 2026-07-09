"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Globe, MapPin, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { toggleLanguage, locale } = useLanguage();
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#C41218] border-b border-black/10 flex items-center ${
          isShrunk ? "h-14 shadow-md" : "h-16"
        }`}
      >
        <div className="w-[95%] max-w-[1240px] mx-auto flex items-center justify-between gap-3">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center text-white md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/assets/logo.png"
                alt="Shawarma b'Kanz Logo"
                className="w-9 h-9 object-contain bg-white rounded-full p-0.5"
              />
              <span className="brand-name text-sm font-black tracking-wide uppercase select-none text-white hidden sm:block">
                Kanz
              </span>
            </Link>
          </div>

          {/* Branch Pill locator banner (Matches target reference) */}
          <div className="flex-grow max-w-sm md:max-w-md bg-white border border-neutral-200 rounded-md px-3 py-1 flex items-center gap-2 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left rtl:text-right overflow-hidden leading-tight">
              <span className="text-[8px] text-green-600 font-bold uppercase tracking-wider">
                {locale === "en" ? "Receive From" : "الاستلام من"}
              </span>
              <span className="text-[10px] font-black text-neutral-800 truncate">
                {locale === "en" ? "Shawarma B Kanz (Ranya)" : "شاورما بي كانز (رنية)"}
              </span>
            </div>
          </div>

          {/* Desktop Links & Action Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-xs font-bold tracking-wide py-1 relative block transition-colors duration-300 ${
                          isActive ? "text-[#FFD400]" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD400]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[9px] font-bold text-white transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>{locale === "en" ? "العربية" : "English"}</span>
            </button>

            {/* Cart Trigger (For Mobile, toggles cart drawer) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-105 lg:hidden"
            >
              <ShoppingBag className="w-4 h-4" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#FFD400] text-neutral-800 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md"
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 py-2 px-6 flex items-center justify-around md:hidden shadow-lg shadow-black/5">
        <Link href="/" className={`flex flex-col items-center gap-1 text-[9px] font-bold ${pathname === "/" ? "text-[#C41218]" : "text-neutral-500"}`}>
          <ShoppingBag className="w-4.5 h-4.5" />
          <span>{locale === "en" ? "Menu" : "القائمة"}</span>
        </Link>
        <button onClick={() => setIsCartOpen(true)} className={`flex flex-col items-center gap-1 text-[9px] font-bold relative text-neutral-500`}>
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
        <Link href="/offers" className={`flex flex-col items-center gap-1 text-[9px] font-bold ${pathname === "/offers" ? "text-[#C41218]" : "text-neutral-500"}`}>
          <Globe className="w-4.5 h-4.5" />
          <span>{locale === "en" ? "Offers" : "العروض"}</span>
        </Link>
      </div>
    </>
  );
};
