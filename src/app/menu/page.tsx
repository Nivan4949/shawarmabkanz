"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, menuItems, MenuItem } from "@/context/CartContext";
import { Search, Heart, Flame, Plus, Check, ArrowUpDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
  const { t, locale, isRtl } = useLanguage();
  const { openCustomizer, addToCart } = useCart();
  
  const [activeCategory, setActiveCategory] = useState<"all" | "wrap" | "burger" | "sandwich" | "drink">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState<"popularity" | "priceLow" | "priceHigh">("popularity");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { id: "all" as const, labelEn: "Full Feast", labelAr: "الوليمة الكاملة" },
    { id: "wrap" as const, labelEn: "Shawarma Wraps", labelAr: "شاورما لفائف" },
    { id: "burger" as const, labelEn: "Spit Burgers", labelAr: "برجر السيخ" },
    { id: "sandwich" as const, labelEn: "Toasted Subs", labelAr: "السندوتشات والباجيت" },
    { id: "drink" as const, labelEn: "Fresh Juices", labelAr: "العصائر الطازجة" },
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("kanz_favs") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("kanz_favs", JSON.stringify(next));
      return next;
    });
  };

  // Quick Add handler (adds default option directly)
  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();

    // Default configuration: Regular size, Regular spice, Saj bread (or default size index 0)
    const cartItem = {
      cartId: `${item.id}_0_regular_0__`,
      id: item.id,
      nameEn: item.nameEn,
      nameAr: item.nameAr,
      sizeNameEn: item.sizes[0]?.labelEn || "Regular",
      sizeNameAr: item.sizes[0]?.labelAr || "عادي",
      spiceNameEn: "Regular (Tame)",
      spiceNameAr: "عادي (بدون شطة)",
      addons: [],
      unitPrice: item.price,
      quantity: 1,
      image: item.image,
    };

    addToCart(cartItem);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 2000);
  };

  // Suggestions logic
  const searchMatches = menuItems.filter(item => {
    const name = locale === "en" ? item.nameEn : item.nameAr;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter & Sort items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const itemName = locale === "en" ? item.nameEn : item.nameAr;
    const itemDesc = locale === "en" ? item.descEn : item.descAr;
    const matchesSearch =
      itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemDesc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    // Default popularity: Best seller badge items first
    const scoreA = a.badgeEn ? 2 : 0;
    const scoreB = b.badgeEn ? 2 : 0;
    return scoreB - scoreA;
  });

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-2 block">
            {t("menu_subtitle")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase">
            {t("menu_title")}
          </h1>
          <p className="text-xs text-white/50 max-w-[500px] mx-auto leading-relaxed mt-2">
            {t("menu_desc")}
          </p>
        </div>

        {/* Filter Controls (Sticky Category Nav + Search + Sort) */}
        <div className="sticky top-[72px] z-30 bg-[#121212]/90 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl mb-12 flex flex-col gap-4">
          
          {/* Row 1: Categories and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            {/* Category Tabs with Swipe on Mobile */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const label = locale === "en" ? cat.labelEn : cat.labelAr;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white shadow-lg shadow-[#C41218]/15"
                        : "bg-[#181818] text-white/60 hover:text-white border border-white/5"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div ref={searchContainerRef} className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={locale === "en" ? "Search foods..." : "ابحث عن طبق..."}
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full bg-[#181818] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/40"
                style={{
                  paddingLeft: isRtl ? "1rem" : "2.5rem",
                  paddingRight: isRtl ? "2.5rem" : "1rem",
                }}
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
                style={{
                  left: isRtl ? "auto" : "1rem",
                  right: isRtl ? "1rem" : "auto",
                }}
              />

              {/* Autocomplete Dropdown suggestions */}
              <AnimatePresence>
                {showSuggestions && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-[#181818] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-40 max-h-[200px] overflow-y-auto scrollbar-none"
                  >
                    {searchMatches.length === 0 ? (
                      <div className="p-4 text-xs text-white/40 text-center">{locale === "en" ? "No suggestions" : "لا توجد اقتراحات"}</div>
                    ) : (
                      searchMatches.map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSearchQuery(locale === "en" ? item.nameEn : item.nameAr);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left rtl:text-right px-4 py-2.5 text-xs text-white/80 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0 flex justify-between items-center"
                        >
                          <span>{locale === "en" ? item.nameEn : item.nameAr}</span>
                          <span className="text-[10px] text-[#FFD400]">${item.price.toFixed(2)}</span>
                        </button>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Sort Selection controls */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs text-white/50">
            <span className="text-[10px] uppercase font-bold tracking-widest">{sortedItems.length} {locale === "en" ? "Treasures Found" : "طبق تم العثور عليه"}</span>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent border-0 text-white font-bold cursor-pointer focus:outline-none pr-6"
              >
                <option value="popularity" className="bg-[#121212]">{locale === "en" ? "Popularity" : "الأكثر مبيعاً"}</option>
                <option value="priceLow" className="bg-[#121212]">{locale === "en" ? "Price: Low to High" : "السعر: من الأقل للأعلى"}</option>
                <option value="priceHigh" className="bg-[#121212]">{locale === "en" ? "Price: High to Low" : "السعر: من الأعلى للأقل"}</option>
              </select>
            </div>
          </div>

        </div>

        {/* Menu Grid */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-20 bg-[#181818] rounded-2xl border border-white/5">
            <span className="text-4xl block mb-4">🔍</span>
            <p className="text-xs text-white/50">
              {locale === "en"
                ? "No culinary treasures found matching your search."
                : "لم نجد أي طبق يطابق خيارات البحث الحالية."}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {sortedItems.map((item) => {
              const name = locale === "en" ? item.nameEn : item.nameAr;
              const desc = locale === "en" ? item.descEn : item.descAr;
              const badge = locale === "en" ? item.badgeEn : item.badgeAr;
              
              const isSpicy = item.descEn.toLowerCase().includes("spicy") || 
                              item.descEn.toLowerCase().includes("chili") ||
                              item.id.includes("fire");
              const isNonVeg = item.category !== "drink"; // Everything but drinks is chicken/beef
              const isFav = favorites.includes(item.id);
              const isAdded = justAddedId === item.id;

              return (
                <motion.div
                  layout
                  key={item.id}
                  onClick={() => openCustomizer(item.id)}
                  className="bg-[#181818] rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-[#C41218]/30 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Photo area */}
                  <div className="relative h-48 overflow-hidden bg-black/20">
                    <img
                      src={item.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    {badge && (
                      <span className={`absolute top-4 bg-[#C41218] text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        isRtl ? "right-4" : "left-4"
                      }`}>
                        {badge}
                      </span>
                    )}

                    {/* Favorite Heart Toggle */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`absolute top-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all ${
                        isRtl ? "left-4" : "right-4"
                      } hover:scale-110`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "text-[#C41218] fill-[#C41218]" : "text-white"}`} />
                    </button>

                    {/* Veg/Non-Veg & Spicy Indicators Overlay at Bottom */}
                    <div className={`absolute bottom-3 flex gap-1.5 ${isRtl ? "left-3" : "right-3"}`}>
                      {isNonVeg && (
                        <span className="w-5 h-5 rounded bg-black/60 border border-[#C41218]/30 flex items-center justify-center" title="Non-Vegetarian">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C41218]" />
                        </span>
                      )}
                      {isSpicy && (
                        <span className="w-5 h-5 rounded bg-[#C41218]/80 border border-[#C41218] flex items-center justify-center" title="Spicy">
                          <Flame className="w-3.5 h-3.5 text-white" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-base font-black text-white mb-2 leading-tight group-hover:text-[#FFD400] transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {desc}
                    </p>

                    {/* Price and Buttons */}
                    <div className="flex items-center justify-between mt-auto gap-4 pt-4 border-t border-white/5">
                      <span className="text-lg font-black text-[#FFD400]">
                        ${item.price.toFixed(2)}
                      </span>
                      
                      {/* Action trigger group */}
                      <div className="flex items-center gap-2">
                        {/* Quick Add Button */}
                        <button
                          onClick={(e) => handleQuickAdd(item, e)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            isAdded
                              ? "bg-green-600 text-white"
                              : "bg-[#121212] hover:bg-[#C41218] text-white border border-white/5"
                          }`}
                          title="Quick Add with default options"
                        >
                          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
