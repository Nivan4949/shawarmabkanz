"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, menuItems, MenuItem } from "@/context/CartContext";
import { Search, Heart, Flame, Plus, Check, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuPage() {
  const { t, locale, isRtl } = useLanguage();
  const { openCustomizer, addToCart } = useCart();
  
  const [activeCategory, setActiveCategory] = useState<"all" | "shawarma" | "burger" | "wrap" | "club" | "juice" | "starters" | "salads" | "sauces" | "plates">("all");
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
    { id: "all" as const, labelEn: "All", labelAr: "الكل" },
    { id: "shawarma" as const, labelEn: "Shawarma", labelAr: "شاورما" },
    { id: "burger" as const, labelEn: "Burgers", labelAr: "البرجر" },
    { id: "wrap" as const, labelEn: "Wraps", labelAr: "تورتيلا" },
    { id: "club" as const, labelEn: "Clubs", labelAr: "كلوب" },
    { id: "juice" as const, labelEn: "Juices & Tea", labelAr: "عصائر وشاي" },
    { id: "starters" as const, labelEn: "Starters & Fries", labelAr: "مقبلات وبطاطس" },
    { id: "salads" as const, labelEn: "Salads", labelAr: "سلطات" },
    { id: "sauces" as const, labelEn: "Sauces", labelAr: "صوص" },
    { id: "plates" as const, labelEn: "Plates", labelAr: "صحون" }
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
      cartId: `${item.id}_default`,
      id: item.id,
      nameEn: item.nameEn,
      nameAr: item.nameAr,
      sizeNameEn: item.sizes[0]?.labelEn || "Standard",
      sizeNameAr: item.sizes[0]?.labelAr || "قياسي",
      spiceNameEn: "Regular",
      spiceNameAr: "عادي",
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
      <div className="w-[95%] max-w-[1200px] mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-2 block">
            {t("menu_subtitle")}
          </span>
          <h1 className="text-2xl md:text-4xl font-black uppercase">
            {t("menu_title")}
          </h1>
        </div>

        {/* Filter Controls (Sticky Category Nav + Search + Sort) */}
        <div className="sticky top-[72px] z-30 bg-[#121212]/95 p-4 rounded-xl border border-white/5 shadow-md mb-10 flex flex-col gap-4">
          
          {/* Row 1: Categories and Search */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
            {/* Category Tabs with Swipe on Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const label = locale === "en" ? cat.labelEn : cat.labelAr;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-[#C41218] text-white"
                        : "bg-[#181818] text-white/50 hover:text-white border border-white/5"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div ref={searchContainerRef} className="relative w-full lg:w-72">
              <input
                type="text"
                placeholder={locale === "en" ? "Search items..." : "ابحث عن صنف..."}
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full bg-[#181818] border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#C41218] placeholder-white/30"
                style={{
                  paddingLeft: isRtl ? "1rem" : "2.25rem",
                  paddingRight: isRtl ? "2.25rem" : "1rem",
                }}
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
                style={{
                  left: isRtl ? "auto" : "0.75rem",
                  right: isRtl ? "0.75rem" : "auto",
                }}
              />

              {/* Autocomplete Dropdown suggestions */}
              <AnimatePresence>
                {showSuggestions && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1 bg-[#181818] border border-white/10 rounded-lg overflow-hidden shadow-xl z-40 max-h-[180px] overflow-y-auto scrollbar-none"
                  >
                    {searchMatches.length === 0 ? (
                      <div className="p-3 text-[11px] text-white/30 text-center">{locale === "en" ? "No matches" : "لا توجد نتائج"}</div>
                    ) : (
                      searchMatches.map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSearchQuery(locale === "en" ? item.nameEn : item.nameAr);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left rtl:text-right px-4 py-2 text-[11px] text-white/70 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0 flex justify-between items-center"
                        >
                          <span>{locale === "en" ? item.nameEn : item.nameAr}</span>
                          <span className="text-[10px] text-[#FFD400]">{item.price.toFixed(2)} AED</span>
                        </button>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Sort Selection controls */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs text-white/40">
            <span>{sortedItems.length} {locale === "en" ? "Items" : "صنف"}</span>
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent border-0 text-white font-bold cursor-pointer focus:outline-none pr-5 text-xs"
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
          <div className="text-center py-20 bg-[#181818] rounded-xl border border-white/5">
            <p className="text-xs text-white/40">
              {locale === "en"
                ? "No items found."
                : "لم نجد أي صنف يطابق البحث."}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {sortedItems.map((item) => {
              const name = locale === "en" ? item.nameEn : item.nameAr;
              const desc = locale === "en" ? item.descEn : item.descAr;
              const badge = locale === "en" ? item.badgeEn : item.badgeAr;
              
              const isSpicy = item.descEn.toLowerCase().includes("spicy") || 
                              item.descEn.toLowerCase().includes("chili") ||
                              item.id.includes("zinger") ||
                              item.id.includes("mathafi");
              const isFav = favorites.includes(item.id);
              const isAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => openCustomizer(item.id)}
                  className="bg-[#181818] rounded-xl border border-white/5 overflow-hidden flex flex-col hover:border-[#C41218]/30 transition-all duration-200 cursor-pointer"
                >
                  {/* Photo area */}
                  <div className="relative h-40 overflow-hidden bg-black/10">
                    <img
                      src={item.image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Badge */}
                    {badge && (
                      <span className={`absolute top-3 bg-[#C41218] text-white text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                        isRtl ? "right-3" : "left-3"
                      }`}>
                        {badge}
                      </span>
                    )}

                    {/* Favorite Heart Toggle */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={`absolute top-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-transform ${
                        isRtl ? "left-3" : "right-3"
                      } hover:scale-105`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? "text-[#C41218] fill-[#C41218]" : "text-white"}`} />
                    </button>

                    {/* Spicy Indicator */}
                    {isSpicy && (
                      <span className={`absolute bottom-3 w-6 h-6 rounded bg-[#C41218]/90 border border-[#C41218] flex items-center justify-center ${
                        isRtl ? "left-3" : "right-3"
                      }`}>
                        <Flame className="w-3.5 h-3.5 text-white" />
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-sm font-black text-white mb-1.5 leading-snug">
                      {name}
                    </h3>
                    <p className="text-[11px] text-white/50 leading-relaxed mb-4 flex-grow line-clamp-2">
                      {desc}
                    </p>

                    {/* Price and Buttons */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                      <span className="text-sm font-black text-[#FFD400]">
                        {item.price.toFixed(2)} <span className="text-[10px] text-white/40 font-normal">{locale === "en" ? "AED" : "درهم"}</span>
                      </span>
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isAdded
                            ? "bg-green-600 text-white"
                            : "bg-[#121212] hover:bg-[#C41218] text-white border border-white/5"
                        }`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
