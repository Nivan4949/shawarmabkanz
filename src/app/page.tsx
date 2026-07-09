"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, menuItems, MenuItem } from "@/context/CartContext";
import { Search, Flame, Plus, Minus, Trash2, ArrowUpDown, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { t, locale, isRtl } = useLanguage();
  const { 
    cart, 
    updateQty, 
    removeCartItem, 
    openCustomizer, 
    addToCart,
    deliveryFee,
    discountPercent,
    couponCode
  } = useCart();
  
  const [activeCategory, setActiveCategory] = useState<string>("shawarma");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("kanz_favs") || "[]");
    setFavorites(saved);
  }, []);

  const categories = [
    { id: "shawarma", labelEn: "Shawarma", labelAr: "شاورما" },
    { id: "burger", labelEn: "Burgers", labelAr: "البرجر" },
    { id: "wrap", labelEn: "Wraps", labelAr: "تورتيلا" },
    { id: "club", labelEn: "Clubs", labelAr: "كلوب" },
    { id: "juice", labelEn: "Juices & Tea", labelAr: "عصائر وشاي" },
    { id: "starters", labelEn: "Starters & Fries", labelAr: "مقبلات وبطاطس" },
    { id: "salads", labelEn: "Salads", labelAr: "سلطات" },
    { id: "sauces", labelEn: "Sauces", labelAr: "صوص" },
    { id: "plates", labelEn: "Plates", labelAr: "صحون" }
  ];

  // Smooth scroll to section
  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`category-section-${catId}`);
    if (el) {
      const offset = 140; // Navbar + Category bar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Quick Add handler
  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();

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
    }, 1500);
  };

  // Inline Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal - discount;

  return (
    <div className="bg-[#F5F6F8] text-[#1A1A1A] pt-32 pb-20 min-h-screen">
      <div className="w-[95%] max-w-[1240px] mx-auto">
        
        {/* Sticky Sub-Header Category Tabs */}
        <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-neutral-200/60 shadow-sm mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const label = locale === "en" ? cat.labelEn : cat.labelAr;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#C41218] text-white"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-[#C41218]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-48 md:w-60 shrink-0 hidden sm:block">
            <input
              type="text"
              placeholder={locale === "en" ? "Search items..." : "ابحث عن صنف..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200/80 rounded-md py-1.5 pl-8 pr-3 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218] placeholder-neutral-400"
            />
            <Search className="absolute top-2.5 left-2.5 w-3.5 h-3.5 text-neutral-400" />
          </div>
        </div>

        {/* Two Column Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Menu Items Vertically Grouped */}
          <div className="lg:col-span-8 space-y-10">
            {categories.map((cat) => {
              const catItems = menuItems.filter(item => item.category === cat.id);
              const filteredCatItems = catItems.filter(item => {
                const name = locale === "en" ? item.nameEn : item.nameAr;
                return name.toLowerCase().includes(searchQuery.toLowerCase());
              });

              if (filteredCatItems.length === 0) return null;

              return (
                <div key={cat.id} id={`category-section-${cat.id}`} className="space-y-4">
                  {/* Category Section title */}
                  <h2 className="text-base font-black tracking-wide border-b border-neutral-200/80 pb-2 uppercase text-neutral-800">
                    {locale === "en" ? cat.labelEn : cat.labelAr}
                  </h2>

                  {/* Category card grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredCatItems.map((item) => {
                      const name = locale === "en" ? item.nameEn : item.nameAr;
                      const isSpicy = item.descEn.toLowerCase().includes("spicy") || 
                                      item.descEn.toLowerCase().includes("chili") ||
                                      item.id.includes("zinger") ||
                                      item.id.includes("mathafi");
                      
                      return (
                        <div
                          key={item.id}
                          onClick={() => openCustomizer(item.id)}
                          className="bg-white rounded-lg border border-neutral-200/60 overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                          {/* Image */}
                          <div className="relative h-32 overflow-hidden bg-neutral-100/50 p-2">
                            <img
                              src={item.image}
                              alt={name}
                              className="w-full h-full object-contain rounded-md"
                            />
                            {isSpicy && (
                              <span className="absolute bottom-2 right-2 w-5 h-5 rounded bg-[#C41218]/10 text-[#C41218] flex items-center justify-center border border-[#C41218]/20">
                                <Flame className="w-3 h-3 text-[#C41218] fill-[#C41218]" />
                              </span>
                            )}
                          </div>

                          {/* Info panel */}
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xs font-black text-neutral-800 line-clamp-1 leading-snug">
                              {name}
                            </h3>
                            <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed min-h-[30px]">
                              {locale === "en" ? item.descEn : item.descAr}
                            </p>

                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-100">
                              <span className="text-xs font-black text-[#C41218]">
                                {item.price.toFixed(2)} AED
                              </span>
                              
                              <button
                                onClick={(e) => handleQuickAdd(item, e)}
                                className="w-7 h-7 rounded bg-[#C41218]/5 hover:bg-[#C41218] text-[#C41218] hover:text-white flex items-center justify-center border border-[#C41218]/10 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Inline Sidebar Cart (Desktop only) */}
          <div className="lg:col-span-4 sticky top-20 hidden lg:block">
            <div className="bg-white border border-neutral-200/60 rounded-lg p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2.5 flex items-center gap-1.5">
                <ShoppingBag className="w-4.5 h-4.5 text-[#C41218]" />
                <span>{locale === "en" ? "My Order Cart" : "سلة طلبي"}</span>
              </h3>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-neutral-400 space-y-2">
                  <span className="text-3xl block">🍔</span>
                  <p className="text-[10px] max-w-[200px] mx-auto leading-relaxed">
                    {locale === "en" ? "Your cart is empty. Select items to start your meal." : "سلتك فارغة حالياً. أضف بعض الوجبات لتبدأ."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Cart Items list */}
                  <div className="space-y-3 max-h-[340px] overflow-y-auto scrollbar-none pr-1">
                    {cart.map((item) => {
                      const itemName = locale === "en" ? item.nameEn : item.nameAr;
                      const size = locale === "en" ? item.sizeNameEn : item.sizeNameAr;
                      const addonsText = item.addons.map(a => locale === "en" ? a.labelEn : a.labelAr).join(", ");
                      return (
                        <div key={item.cartId} className="flex gap-2.5 justify-between items-start border-b border-neutral-100 pb-2 text-[11px]">
                          <div className="space-y-0.5 flex-grow pr-2">
                            <h4 className="font-bold text-neutral-800 leading-tight">{itemName}</h4>
                            <p className="text-[9px] text-neutral-400 font-medium">{size} {addonsText ? `| +${addonsText}` : ""}</p>
                            <span className="text-[#C41218] font-bold block mt-0.5">
                              {(item.unitPrice * item.quantity).toFixed(2)} AED
                            </span>
                          </div>

                          {/* Quantity and Trash Controls */}
                          <div className="flex items-center gap-1 shrink-0 bg-neutral-50 border border-neutral-200/50 p-0.5 rounded">
                            <button
                              onClick={() => updateQty(item.cartId, -1)}
                              className="w-5 h-5 rounded hover:bg-neutral-200 flex items-center justify-center text-neutral-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-bold text-neutral-800 text-[10px]">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.cartId, 1)}
                              className="w-5 h-5 rounded hover:bg-neutral-200 flex items-center justify-center text-neutral-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeCartItem(item.cartId)}
                              className="w-5 h-5 rounded bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 ml-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Math sums */}
                  <div className="space-y-2 pt-3 border-t border-neutral-100 text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span>{locale === "en" ? "Subtotal" : "المجموع الفرعي"}</span>
                      <span className="font-bold">{subtotal.toFixed(2)} AED</span>
                    </div>
                    {couponCode && (
                      <div className="flex justify-between text-green-600 font-bold">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-{discount.toFixed(2)} AED</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-neutral-800 border-t border-neutral-100 pt-2.5">
                      <span>{locale === "en" ? "Total Order" : "المجموع الكلي"}</span>
                      <span className="text-[#C41218]">{total.toFixed(2)} AED</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full py-3.5 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 transform active:scale-95 shadow-md shadow-[#C41218]/10"
                  >
                    <span>{locale === "en" ? "Go to Checkout" : "الذهاب للدفع"}</span>
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom Cart Bar (Mobile only, shown when cart has items) */}
      {cart.length > 0 && (
        <div className="fixed bottom-14 left-0 right-0 z-30 px-4 pb-2 md:hidden">
          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-[#C41218] text-white p-3.5 rounded-xl shadow-lg flex items-center justify-between font-black text-xs uppercase tracking-wider transition-all transform active:scale-95"
          >
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span>{locale === "en" ? "View Order" : "عرض الطلب"}</span>
            </div>
            <span>{total.toFixed(2)} AED</span>
          </button>
        </div>
      )}
    </div>
  );
}
