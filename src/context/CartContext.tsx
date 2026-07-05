"use client";

import React, { createContext, useContext, useState } from "react";

export interface SizeOption {
  labelEn: string;
  labelAr: string;
  priceModifier: number;
}

export interface AddonOption {
  labelEn: string;
  labelAr: string;
  price: number;
}

export interface MenuItem {
  id: string;
  category: "wrap" | "burger" | "sandwich" | "drink";
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: number;
  image: string;
  badgeEn?: string;
  badgeAr?: string;
  sizes: SizeOption[];
  addons: AddonOption[];
}

export interface CartItem {
  cartId: string;
  id: string;
  nameEn: string;
  nameAr: string;
  sizeNameEn: string;
  sizeNameAr: string;
  spiceNameEn: string;
  spiceNameAr: string;
  addons: { labelEn: string; labelAr: string; price: number }[];
  unitPrice: number;
  quantity: number;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "classic_chicken",
    category: "wrap",
    nameEn: "The Kanz Classic Chicken",
    nameAr: "شاورما دجاج كلاسيك",
    descEn: "Slow-roasted chicken wrap with garlic paste, crispy fries, and pickles in toasted Saj bread.",
    descAr: "شاورما دجاج بخلطة كانز الخاصة، ثومية، بطاطس مقرمشة، ومخلل بخبز الصاج المحمص.",
    price: 6.99,
    image: "/assets/hero_shawarma.png",
    badgeEn: "Best Seller",
    badgeAr: "الأكثر مبيعاً",
    sizes: [
      { labelEn: "Regular Size", labelAr: "حجم عادي", priceModifier: 0 },
      { labelEn: "Double Kanz Wrap", labelAr: "رول دبل كنز", priceModifier: 3.50 }
    ],
    addons: [
      { labelEn: "Extra Garlic Paste", labelAr: "ثومية إضافية", price: 0.50 },
      { labelEn: "Pomegranate Molasses", labelAr: "دبس رمان", price: 0.75 }
    ]
  },
  {
    id: "fire_beef",
    category: "wrap",
    nameEn: "Spicy Fire Beef Wrap",
    nameAr: "شاورما لحم لهب حار",
    descEn: "Flame-grilled shaved beef with spicy tahini sauce, biwaz (sumac-onion salad), and chili paste.",
    descAr: "شرائح لحم بقري مشوية مع صلصة طحينة حارة، بيواز (بصل بالسماق)، وشطة حارة.",
    price: 7.99,
    image: "/assets/hero_shawarma.png",
    badgeEn: "Spicy",
    badgeAr: "حار نار",
    sizes: [
      { labelEn: "Regular Size", labelAr: "حجم عادي", priceModifier: 0 },
      { labelEn: "Double Kanz Wrap", labelAr: "رول دبل كنز", priceModifier: 4.00 }
    ],
    addons: [
      { labelEn: "Extra Tahini Sauce", labelAr: "طحينة إضافية", price: 0.50 },
      { labelEn: "Melted Cheddar Cheese", labelAr: "جبن شيدر ذائب", price: 1.00 }
    ]
  },
  {
    id: "spit_burger",
    category: "burger",
    nameEn: "Spit-Fired Beef Burger",
    nameAr: "برجر بقري على لهب السيخ",
    descEn: "Juicy flame-grilled beef patty stacked with shaved beef shawarma, melted cheddar, and smoked secret sauce.",
    descAr: "شريحة برجر بقري مشوي مغطاة بشرائح شاورما لحم، جبن شيدر ذائب، وصلصة فلفل مدخن.",
    price: 9.49,
    image: "/assets/spit_burger.png",
    badgeEn: "Signature",
    badgeAr: "توقيعنا الخاص",
    sizes: [
      { labelEn: "Single Patty", labelAr: "شريحة واحدة", priceModifier: 0 },
      { labelEn: "Double Spit Burger", labelAr: "شريحتين برجر دبل", priceModifier: 3.00 }
    ],
    addons: [
      { labelEn: "Extra Shawarma Shavings", labelAr: "شرائح شاورما إضافية", price: 2.00 },
      { labelEn: "Fried Egg", labelAr: "بيض مقلي", price: 1.00 }
    ]
  },
  {
    id: "garlic_burger",
    category: "burger",
    nameEn: "Garlic Crunch Chicken Burger",
    nameAr: "برجر دجاج بالثوم المقرمش",
    descEn: "Crispy hand-breaded chicken breast, loaded with garlic aioli, cheddar cheese, pickles, and shredded lettuce.",
    descAr: "صدر دجاج مقرمش مغطى بصلصة ثوم أيولي وجبن شيدر، مخلل، وخس مقطع.",
    price: 8.49,
    image: "/assets/spit_burger.png",
    badgeEn: "Crispy",
    badgeAr: "مقرمش",
    sizes: [
      { labelEn: "Regular Crispy", labelAr: "عادي مقرمش", priceModifier: 0 },
      { labelEn: "Fiery Hot Crispy", labelAr: "حار ناري مقرمش", priceModifier: 1.00 }
    ],
    addons: [
      { labelEn: "Spicy Jalapenos", labelAr: "هلابينو حار", price: 0.50 },
      { labelEn: "Caramelized Onions", labelAr: "بصل مكرمل", price: 0.75 }
    ]
  },
  {
    id: "kanz_sub",
    category: "sandwich",
    nameEn: "Kanz Baguette Sub",
    nameAr: "سندوتش باجيت كنز",
    descEn: "Warm toasted French baguette filled with shaved spit chicken, pickles, crispy fries, and garlic paste.",
    descAr: "خبز فرنسي محمص محشو بشرائح شاورما دجاج، مخلل، بطاطس مقرمشة، وثومية.",
    price: 7.49,
    image: "/assets/baguette_sub.png",
    badgeEn: "Baguette",
    badgeAr: "خبز فرنسي",
    sizes: [
      { labelEn: "Regular (8 Inch)", labelAr: "عادي (٨ إنش)", priceModifier: 0 },
      { labelEn: "King Kanz (12 Inch)", labelAr: "كينج كنز (١٢ إنش)", priceModifier: 2.50 }
    ],
    addons: [
      { labelEn: "Melted Mozzarella", labelAr: "موزاريلا ذائبة", price: 1.00 },
      { labelEn: "Sautéed Mushrooms", labelAr: "مشروم سوتيه", price: 0.75 }
    ]
  },
  {
    id: "philly_sub",
    category: "sandwich",
    nameEn: "Philly Spit-Steak Sub",
    nameAr: "فيلادلفيا ستيك من السيخ",
    descEn: "Shaved spit-beef grilled with caramelized bell peppers, onions, and loaded with melted provolone.",
    descAr: "شاورما لحم مشوية على الصاج مع فلفل رومي وبصل مكرمل، وجبن بروفولون ذائب.",
    price: 8.99,
    image: "/assets/baguette_sub.png",
    badgeEn: "Cheesy",
    badgeAr: "غرقان جبنة",
    sizes: [
      { labelEn: "Regular (8 Inch)", labelAr: "عادي (٨ إنش)", priceModifier: 0 },
      { labelEn: "King Kanz (12 Inch)", labelAr: "كينج كنز (١٢ إنش)", priceModifier: 3.00 }
    ],
    addons: [
      { labelEn: "Double Cheese Melt", labelAr: "إضافة جبنة دبل", price: 1.25 },
      { labelEn: "Spicy Jalapenos", labelAr: "فلفل هلابينو حار", price: 0.50 }
    ]
  },
  {
    id: "pom_infusion",
    category: "drink",
    nameEn: "Pomegranate Mint Nectar",
    nameAr: "عصير رمان بالنعناع",
    descEn: "Fresh cold-pressed pomegranate juice infused with fresh mint leaves and a dash of lime.",
    descAr: "عصير رمان طازج معطر بأوراق النعناع البري وعصرة ليمون حامض.",
    price: 3.99,
    image: "/assets/pomegranate_drink.png",
    badgeEn: "Fresh",
    badgeAr: "طازج",
    sizes: [
      { labelEn: "Regular Cup", labelAr: "كوب وسط", priceModifier: 0 },
      { labelEn: "Large Jar", labelAr: "برطمان كبير", priceModifier: 1.50 }
    ],
    addons: [
      { labelEn: "Extra Fresh Mint", labelAr: "نعناع طازج إضافي", price: 0.25 },
      { labelEn: "Honey Sweetener", labelAr: "تحلية عسل طبيعي", price: 0.50 }
    ]
  },
  {
    id: "mint_lemonade",
    category: "drink",
    nameEn: "Sparkling Mint Lemonade",
    nameAr: "ليمون بالنعناع فوار",
    descEn: "A refreshing frozen blend of fresh lemon, spearmint, sparkling soda, and crushed ice.",
    descAr: "مزيج منعش من الليمون الطازج، النعناع، الصودا الفوارة والثلج المجروش.",
    price: 3.49,
    image: "/assets/lemonade_drink.png",
    badgeEn: "Frozen",
    badgeAr: "ثلج منعش",
    sizes: [
      { labelEn: "Regular Cup", labelAr: "كوب وسط", priceModifier: 0 },
      { labelEn: "Large Jar", labelAr: "برطمان كبير", priceModifier: 1.25 }
    ],
    addons: [
      { labelEn: "Extra Ice Crushes", labelAr: "ثلج مجروش إضافي", price: 0.20 }
    ]
  }
];

interface CartContextProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  customizerItem: MenuItem | null;
  openCustomizer: (itemId: string) => void;
  closeCustomizer: () => void;
  addToCart: (item: CartItem) => void;
  updateQty: (cartId: string, change: number) => void;
  removeCartItem: (cartId: string) => void;
  clearCart: () => void;
  isSuccessOpen: boolean;
  setIsSuccessOpen: (open: boolean) => void;
  successStep: number;
  placeOrder: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successStep, setSuccessStep] = useState(1);

  const openCustomizer = (itemId: string) => {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
      setCustomizerItem(item);
      setIsCustomizerOpen(true);
    }
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
    setCustomizerItem(null);
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.cartId === newItem.cartId);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += newItem.quantity;
        return next;
      }
      return [...prev, newItem];
    });
  };

  const updateQty = (cartId: string, change: number) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.cartId === cartId);
      if (idx === -1) return prev;
      
      const next = [...prev];
      next[idx].quantity += change;
      
      if (next[idx].quantity <= 0) {
        return next.filter(item => item.cartId !== cartId);
      }
      return next;
    });
  };

  const removeCartItem = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    setIsCartOpen(false);
    setSuccessStep(1);
    setIsSuccessOpen(true);
    
    // Simulate spit roast step after 1s
    setTimeout(() => {
      setSuccessStep(2);
    }, 1500);

    // Simulate transit step after 4s
    setTimeout(() => {
      setSuccessStep(3);
    }, 5000);

    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      isCustomizerOpen,
      setIsCustomizerOpen,
      customizerItem,
      openCustomizer,
      closeCustomizer,
      addToCart,
      updateQty,
      removeCartItem,
      clearCart,
      isSuccessOpen,
      setIsSuccessOpen,
      successStep,
      placeOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
