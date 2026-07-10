"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, MenuItem } from "@/context/CartContext";
import { Search, Flame, Plus } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { locale } = useLanguage();
  const { 
    cart, 
    openCustomizer, 
    addToCart,
    discountPercent,
    dbMenuItems,
    searchQuery
  } = useCart();
  
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

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal - discount;

  return (
    <div className="bg-[#F5F6F8] text-[#1A1A1A] pt-36 pb-20 min-h-screen">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Full-Width Menu Grid List */}
        <div className="w-full space-y-10">
          {categories.map((cat) => {
            const catItems = dbMenuItems.filter(item => item.category === cat.id);
            const filteredCatItems = catItems.filter(item => {
              const name = locale === "en" ? item.nameEn : item.nameAr;
              return name.toLowerCase().includes(searchQuery.toLowerCase());
            });

            if (filteredCatItems.length === 0) return null;

            return (
              <div key={cat.id} id={`category-section-${cat.id}`} className="space-y-4 scroll-mt-28">
                {/* Category Section title */}
                <h2 className="text-sm font-black tracking-wide border-b border-neutral-200/85 pb-2 uppercase text-neutral-800">
                  {locale === "en" ? cat.labelEn : cat.labelAr}
                </h2>

                {/* Full-screen 4-column cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                        className="bg-white rounded-lg border border-neutral-200/60 overflow-hidden flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer w-full max-w-[320px] sm:max-w-none mx-auto sm:mx-0"
                      >
                        {/* Image preview */}
                        <div className="relative h-32 overflow-hidden bg-neutral-50/50 p-2">
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
