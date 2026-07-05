"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { toggleLanguage, t, locale, isRtl } = useLanguage();
  const { cart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    { label: t("nav_home"), href: "/" },
    { label: t("nav_story"), href: "/about" },
    { label: t("nav_spit"), href: "/#spit-experience" },
    { label: t("nav_menu"), href: "/menu" },
    { label: t("offers_title"), href: "/offers" },
    { label: t("gallery_title"), href: "/gallery" },
    { label: t("reservation_title"), href: "/reservations" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-md ${
          isShrunk
            ? "h-16 bg-[#0E0E0E]/95 shadow-lg"
            : "h-20 bg-[#161616]/80"
        } flex items-center`}
      >
        <div className="w-[90%] max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.png"
              alt="Shawarma b'Kanz Logo"
              className={`object-contain transition-all duration-300 ${
                isShrunk ? "w-10 h-10" : "w-12 h-12"
              } group-hover:scale-105`}
            />
            <span className="brand-name text-lg font-black tracking-wide uppercase select-none">
              {t("brand_name")}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm font-semibold tracking-wide py-1 relative block transition-colors duration-300 ${
                        isActive
                          ? "text-[#F1C40F]"
                          : "text-[#FDFBF7]/75 hover:text-[#F1C40F]"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E61C24] to-[#F39C12]"
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
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#E61C24] hover:border-transparent text-xs font-bold transition-all duration-300 text-[#FDFBF7]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "en" ? "العربية" : "English"}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#E61C24] hover:border-transparent flex items-center justify-center text-[#FDFBF7] transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#E61C24] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_#E61C24]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FDFBF7] hover:bg-[#E61C24] hover:border-transparent transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-0 w-full bg-[#0E0E0E] border-b border-white/10 z-40 lg:hidden flex flex-col py-6 shadow-2xl`}
          >
            <nav className="w-[90%] mx-auto">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-bold py-2 block ${
                        pathname === link.href ? "text-[#F1C40F]" : "text-[#FDFBF7]/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
