"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Globe, MapPin, Menu, UtensilsCrossed, Percent, Search } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const { toggleLanguage, locale } = useLanguage();
  const { 
    cart, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery 
  } = useCart();
  const pathname = usePathname();
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeCategory, setActiveCategory] = useState("shawarma");

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

  // Scroll Spy: Tracks viewport scroll position and updates active category tab
  useEffect(() => {
    if (pathname !== "/") return;
    const handleScrollSpy = () => {
      const categorySections = [
        "shawarma", "burger", "wrap", "club", "juice", "starters", "salads", "sauces", "plates"
      ];
      // offset = header row height (64px) + categories bar height (48px) + offset buffer
      const scrollPosition = window.scrollY + 130;

      for (const section of categorySections) {
        const el = document.getElementById(`category-section-${section}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: locale === "en" ? "Menu" : "القائمة", href: "/" },
    { label: locale === "en" ? "Offers" : "العروض", href: "/offers" },
  ];

  const categories = [
    { id: "shawarma", labelEn: "Shawarma", labelAr: "شاورما", emoji: "🌯" },
    { id: "burger", labelEn: "Burgers", labelAr: "البرجر", emoji: "🍔" },
    { id: "wrap", labelEn: "Wraps", labelAr: "تورتيلا", emoji: "🌮" },
    { id: "club", labelEn: "Clubs", labelAr: "كلوب", emoji: "🥪" },
    { id: "juice", labelEn: "Juices & Tea", labelAr: "عصائر وشاي", emoji: "🍹" },
    { id: "starters", labelEn: "Starters & Fries", labelAr: "مقبلات وبطاطس", emoji: "🍟" },
    { id: "salads", labelEn: "Salads", labelAr: "سلطات", emoji: "🥗" },
    { id: "sauces", labelEn: "Sauces", labelAr: "صوص", emoji: "🥫" },
    { id: "plates", labelEn: "Plates", labelAr: "صحون", emoji: "🍽️" }
  ];

  const scrollToCategory = (catId: string) => {
    const element = document.getElementById(`category-section-${catId}`);
    if (element) {
      // Header height offset (Row 1 + Row 2 = 112px + a little buffer)
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveCategory(catId);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#C41218] border-b border-black/10 flex flex-col"
      >
        {/* ROW 1: Branding, Locator, Cart, Language Toggle */}
        <div className={`w-full flex items-center transition-all duration-300 ${isShrunk ? "h-14" : "h-16"}`}>
          <div className="w-[90%] max-w-[1200px] mx-auto flex items-center justify-between gap-3 h-full">
            
            {/* Mobile: Hamburger toggle */}
            <div className="md:hidden flex items-center shrink-0">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-9 h-9 bg-white text-[#C41218] rounded flex items-center justify-center shadow-sm hover:opacity-90 active:scale-95 transition-transform"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop logo */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/assets/logo.png"
                  alt="Shawarma b'Kanz Logo"
                  className="w-9 h-9 object-contain bg-white rounded-full p-0.5"
                />
                <span className="brand-name text-sm font-black tracking-wide uppercase select-none text-white">
                  Kanz
                </span>
              </Link>
            </div>

            {/* Branch locator pill */}
            <div className="flex-grow max-w-full md:max-w-md bg-white border border-neutral-200 rounded px-2.5 py-1 flex items-center gap-2 shadow-sm overflow-hidden">
              <div className="w-6 h-6 rounded bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left rtl:text-right overflow-hidden leading-tight flex-grow">
                <span className="text-[7.5px] text-green-600 font-black uppercase tracking-wider">
                  {locale === "en" ? "Receive From" : "الاستلام من"}
                </span>
                <span className="text-[10px] font-black text-neutral-800 truncate">
                  {locale === "en" ? "Shawarma B Kanz (Ranya)" : "شاورما بي كانز (رنية)"}
                </span>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <nav>
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
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[9px] font-bold text-white transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>{locale === "en" ? "العربية" : "English"}</span>
              </button>

              {/* Desktop Small Cart Button (Matches request) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white hover:text-[#FFD400] transition-colors flex items-center justify-center"
                title={locale === "en" ? "Shopping Cart" : "عربة التسوق"}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFD400] text-[#C41218] text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* ROW 2: Horizontal Categories scrollbar & Search (Shown on homepage menu) */}
        {pathname === "/" && (
          <div className="bg-white border-t border-b border-neutral-200/60 shadow-sm h-14 flex items-center">
            <div className="w-[90%] max-w-[1200px] mx-auto flex items-center justify-between gap-4 h-full">
              
              {/* Scrollable Categories List */}
              <div className="flex items-center gap-3.5 overflow-x-auto scrollbar-none py-1.5 px-4 w-full md:w-auto h-full">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const label = (locale === "ar" ? cat.labelAr : cat.labelEn) || cat.labelEn;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => scrollToCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 shadow-sm active:scale-95 ${
                        isActive
                          ? "bg-[#C41218] text-white border-[#C41218]"
                          : "bg-neutral-100/70 text-neutral-600 border-neutral-200/60 hover:bg-neutral-100 hover:text-[#C41218]"
                      }`}
                    >
                      <span className="text-sm shrink-0">{cat.emoji}</span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop Search Box inside Sub-header */}
              <div className="relative w-48 md:w-60 shrink-0 hidden md:block">
                <input
                  type="text"
                  placeholder={locale === "en" ? "Search items..." : "ابحث عن صنف..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-md py-1.5 pl-8 pr-3 text-[11px] text-neutral-800 focus:outline-none focus:border-[#C41218] placeholder-neutral-400"
                />
                <Search className="absolute top-2.5 left-2.5 w-3.5 h-3.5 text-neutral-400" />
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 py-1.5 px-4 flex items-center justify-around md:hidden shadow-lg shadow-black/5">
        <Link href="/" className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${pathname === "/" ? "text-[#C41218]" : "text-neutral-400 hover:text-[#C41218]"}`}>
          <UtensilsCrossed className="w-4 h-4" />
          <span>{locale === "en" ? "Menu" : "القائمة"}</span>
        </Link>
        
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="flex flex-col items-center gap-0.5 text-[9px] font-bold relative text-neutral-400 hover:text-[#C41218]"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#C41218] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span>{locale === "en" ? "Cart" : "العربة"}</span>
        </button>

        <Link href="/offers" className={`flex flex-col items-center gap-0.5 text-[9px] font-bold ${pathname === "/offers" ? "text-[#C41218]" : "text-neutral-400 hover:text-[#C41218]"}`}>
          <Percent className="w-4 h-4" />
          <span>{locale === "en" ? "Offers" : "العروض"}</span>
        </Link>

        <button 
          onClick={toggleLanguage} 
          className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-neutral-400 hover:text-[#C41218]"
        >
          <Globe className="w-4 h-4" />
          <span>{locale === "en" ? "العربية" : "English"}</span>
        </button>
      </div>
    </>
  );
};
