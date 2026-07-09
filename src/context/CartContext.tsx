"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  category: "shawarma" | "burger" | "wrap" | "club" | "juice" | "starters" | "salads" | "sauces" | "plates";
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

// Helper: Sets all default menu items with the brand logo to remove AI pictures.
export const menuItems: MenuItem[] = [
  // SHAWARMA (شاورما)
  {
    id: "sh_small",
    category: "shawarma",
    nameEn: "Shawarma Small",
    nameAr: "شاورما صغيرة",
    descEn: "Classic spit-roasted shawarma wrap with garlic paste and pickles in soft arabic bread.",
    descAr: "شاورما كلاسيكية ملفوفة في خبز عربي صغير مع الثومية والمخلل.",
    price: 6.00,
    image: "/assets/logo.png",
    badgeEn: "Popular",
    badgeAr: "محبوب",
    sizes: [
      { labelEn: "Single wrap", labelAr: "رول واحد", priceModifier: 0 },
      { labelEn: "Combo with Drink", labelAr: "كومبو مع مشروب", priceModifier: 4.00 }
    ],
    addons: [
      { labelEn: "Extra Garlic Paste", labelAr: "ثومية إضافية", price: 1.00 },
      { labelEn: "Add Cheese Slice", labelAr: "إضافة جبنة", price: 1.00 }
    ]
  },
  {
    id: "sh_big",
    category: "shawarma",
    nameEn: "Shawarma Big",
    nameAr: "شاورما كبيرة",
    descEn: "Large spit-roasted shawarma wrapped in toasted Saj flatbread with double meat and fries.",
    descAr: "رول شاورما كبير في خبز الصاج المحمص مع شرائح دجاج مضاعفة والبطاطس.",
    price: 10.00,
    image: "/assets/logo.png",
    badgeEn: "Best Seller",
    badgeAr: "الأكثر مبيعاً",
    sizes: [
      { labelEn: "Regular Big", labelAr: "كبير عادي", priceModifier: 0 },
      { labelEn: "Double Saj Wrap", labelAr: "دبل صاج", priceModifier: 6.00 }
    ],
    addons: [
      { labelEn: "Extra Spicy Sauce", labelAr: "شطة حارة إضافية", price: 1.00 },
      { labelEn: "Add Melted Cheddar", labelAr: "جبن شيدر ذائب", price: 2.00 }
    ]
  },
  {
    id: "sh_ar_small",
    category: "shawarma",
    nameEn: "Shawarma Arabic Small",
    nameAr: "شاورما عربي صغيرة",
    descEn: "Slices of saj chicken shawarma cut Arabic style, served with fries, garlic sauce, and pickles.",
    descAr: "شاورما دجاج مقطعة عربي، تقدم مع البطاطس، الثومية، والمخلل في علبة.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard Plate", labelAr: "وجبة قياسية", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Fries", labelAr: "بطاطس إضافية", price: 2.00 }]
  },
  {
    id: "sh_ar_medium",
    category: "shawarma",
    nameEn: "Shawarma Arabic Medium",
    nameAr: "شاورما عربي وسط",
    descEn: "Medium platter of Arabic-sliced chicken shawarma, loaded with extra fries, pickles, and garlic dip.",
    descAr: "وجبة شاورما عربي حجم وسط، تقدم مع بطاطس مقرمشة، مخلل، وثومية كانز.",
    price: 17.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Medium Platter", labelAr: "صحن وسط", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Garlic Dip", labelAr: "ثومية إضافية", price: 1.00 }]
  },
  {
    id: "sh_ar_double",
    category: "shawarma",
    nameEn: "Shawarma Arabic Double B Kanz",
    nameAr: "شاورما عربي كبير دبل",
    descEn: "Double decker platter of sliced Arabic shawarma wraps, complete with family fries, garlic sauce, and spicy salsa.",
    descAr: "وجبة دبل عائلية من الشاورما المقطعة عربي مع بطاطس عائلية، مخلل، شطة وثومية.",
    price: 20.00,
    image: "/assets/logo.png",
    badgeEn: "Signature",
    badgeAr: "توقيعنا الخاص",
    sizes: [{ labelEn: "Double Deck Box", labelAr: "صندوق دبل", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Pickles", labelAr: "مخلل إضافي", price: 1.00 }]
  },
  {
    id: "bashka",
    category: "shawarma",
    nameEn: "Bashka B Kanz",
    nameAr: "باشكا بي كانز",
    descEn: "Authentic oven-baked shawarma pie stuffed with juicy roasted meats, mozzarella, and garlic blend.",
    descAr: "فطيرة شاورما مخبوزة بالفرن محشوة بشرائح اللحم، جبن الموزاريلا، وصلصة الثوم.",
    price: 20.00,
    image: "/assets/logo.png",
    badgeEn: "Unique",
    badgeAr: "مميز",
    sizes: [{ labelEn: "Standard Pie", labelAr: "فطيرة قياسية", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Mozzarella Melt", labelAr: "موزاريلا إضافية", price: 3.00 }]
  },
  {
    id: "sh_plate",
    category: "shawarma",
    nameEn: "Shawarma Plate",
    nameAr: "صحن شاورما",
    descEn: "Freshly cut chicken shawarma strips served cleanly on a plate with hummus, salad, and Saj bread.",
    descAr: "شرائح شاورما دجاج تقدم بصحن مع حمص، سلطة، وخبز صاج دافئ.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Plate Portion", labelAr: "وجبة صحن", priceModifier: 0 }],
    addons: [{ labelEn: "Add Extra Hummus", labelAr: "إضافة حمص", price: 2.00 }]
  },
  {
    id: "sh_combo",
    category: "shawarma",
    nameEn: "Shawarma Combo",
    nameAr: "شاورما كومبو",
    descEn: "Big chicken wrap served with french fries and a cold beverage of your choice.",
    descAr: "رول شاورما كبير يقدم مع بطاطس مقلية ومشروب غازي بارد.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Combo Set", labelAr: "وجبة كومبو كاملة", priceModifier: 0 }],
    addons: [{ labelEn: "Upgrade to Large Fries", labelAr: "ترقية بطاطس كبير", price: 2.00 }]
  },
  {
    id: "hassan_mathar",
    category: "shawarma",
    nameEn: "Hassan Mathar",
    nameAr: "حسن مطر",
    descEn: "Toasted samoon bread loaded with shaved shawarma, garlic paste, and mozzarella cheese crust.",
    descAr: "خبز صمون محمص محشو بشاورما الدجاج، ثومية، ومغطى بطبقة موزاريلا مقرمشة.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard Portion", labelAr: "حجم قياسي", priceModifier: 0 }],
    addons: [{ labelEn: "Double Mozzarella", labelAr: "جبنة دبل", price: 2.00 }]
  },
  {
    id: "sh_club",
    category: "shawarma",
    nameEn: "Shawarma Club",
    nameAr: "نادي شاورما",
    descEn: "Triple-decker club sandwich stuffed with chicken shawarma shavings, lettuce, tomatoes, and garlic aioli.",
    descAr: "كلوب سندوتش ثلاثي الطبقات محشو بشاورما الدجاج، خس، طماطم، وصلصة ثوم.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Club Portion", labelAr: "كلوب كامل", priceModifier: 0 }],
    addons: [{ labelEn: "Add Egg Slice", labelAr: "إضافة شريحة بيض", price: 1.00 }]
  },

  // BURGER (برجر)
  {
    id: "bg_fish",
    category: "burger",
    nameEn: "Fish Burger",
    nameAr: "برجر السمك",
    descEn: "Crispy breaded fish fillet, tartar sauce, cheddar cheese, and pickles on toasted bun.",
    descAr: "فيلي سمك مقرمش، صلصة تارتار، جبن شيدر، ومخلل في خبز البرجر.",
    price: 9.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Single Fillet", labelAr: "شريحة واحدة", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Tartar Sauce", labelAr: "صلصة تارتار إضافية", price: 1.00 }]
  },
  {
    id: "bg_beef",
    category: "burger",
    nameEn: "Beef Burger",
    nameAr: "برجر لحم",
    descEn: "Juicy grilled beef patty, lettuce, tomatoes, onions, cheddar, and our classic burger spread.",
    descAr: "شريحة لحم بقري مشوية، خس، طماطم، بصل، جبن شيدر، وصلصة البرجر.",
    price: 8.00,
    image: "/assets/logo.png",
    sizes: [
      { labelEn: "Single Patty", labelAr: "شريحة واحدة", priceModifier: 0 },
      { labelEn: "Double Beef Patty", labelAr: "دبل برجر بقري", priceModifier: 3.50 }
    ],
    addons: [{ labelEn: "Extra Cheese Slice", labelAr: "إضافة جبنة", price: 1.00 }]
  },
  {
    id: "bg_chicken",
    category: "burger",
    nameEn: "Chicken Burger",
    nameAr: "برجر دجاج",
    descEn: "Tender grilled chicken patty, shredded lettuce, and classic mayonnaise spread on soft buns.",
    descAr: "برجر دجاج مشوي طري مع خس مقطع وصلصة مايونيز.",
    price: 8.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Regular size", labelAr: "حجم عادي", priceModifier: 0 }],
    addons: [{ labelEn: "Add Cheddar Slice", labelAr: "إضافة جبنة", price: 1.00 }]
  },
  {
    id: "bg_breaded",
    category: "burger",
    nameEn: "Chicken Breaded Burger",
    nameAr: "برجر دجاج بالبقسماط",
    descEn: "Crispy breaded chicken patty, cheese, and garlic sauce for the perfect crunch.",
    descAr: "شريحة دجاج بالبقسماط مقرمشة مع الجبنة وصلصة الثوم.",
    price: 6.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Regular", labelAr: "عادي", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Spicy Spread", labelAr: "شطة حارة", price: 1.00 }]
  },
  {
    id: "bg_shrimp",
    category: "burger",
    nameEn: "Shrimp Burger",
    nameAr: "برجر جمبري",
    descEn: "Golden fried shrimp patties, lettuce, and dynamite seafood dressing on toasted buns.",
    descAr: "شريحة روبيان مقلي ذهبي، خس، وصلصة ديناميت حارة.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Shrimp Bun", labelAr: "برجر روبيان", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Dynamite Sauce", labelAr: "صلصة ديناميت إضافية", price: 1.00 }]
  },
  {
    id: "bg_zinger",
    category: "burger",
    nameEn: "Zinger Burger",
    nameAr: "زنجر برجر",
    descEn: "Super crispy hot zinger chicken breast, cheese, spicy mayonnaise, and pickles.",
    descAr: "صدر دجاج زنجر مقرمش وحار، مع الجبنة، مايونيز حار، ومخلل.",
    price: 10.00,
    image: "/assets/logo.png",
    badgeEn: "Spicy Hot",
    badgeAr: "حار نار",
    sizes: [{ labelEn: "Regular Spicy", labelAr: "حار عادي", priceModifier: 0 }],
    addons: [{ labelEn: "Add Extra Jalapenos", labelAr: "إضافة فلفل هلابينو", price: 1.00 }]
  },
  {
    id: "bg_special",
    category: "burger",
    nameEn: "B Kanz Special Burger",
    nameAr: "برجر بي كانز خاص",
    descEn: "Giant double-crispy chicken breast stacked with beef bacon, melting cheese, lettuce, and secret spices.",
    descAr: "صدر دجاج دبل مقرمش، شرائح بيكن بقري، جبنة ذائبة، خس، وصلصة بهارات كانز السرية.",
    price: 12.00,
    image: "/assets/logo.png",
    badgeEn: "Premium Choice",
    badgeAr: "اختيار فاخر",
    sizes: [{ labelEn: "Giant Burger", labelAr: "برجر عملاق", priceModifier: 0 }],
    addons: [{ labelEn: "Double Bacon", labelAr: "بيكن دبل", price: 3.00 }]
  },

  // WRAP SANDWICH (توريتلا)
  {
    id: "wr_mathafi",
    category: "wrap",
    nameEn: "Mathafi Wrap",
    nameAr: "تورتيلا مطافي",
    descEn: "Crispy hot zinger chicken fillet wrapped in a toasted tortilla with fiery sauce, cheese, and lettuce.",
    descAr: "فيليه دجاج زنجر حار ومقرمش في خبز تورتيلا مع صلصة مطافي الحارة والجبن.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Regular Wrap", labelAr: "رول عادي", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Spicy Heat", labelAr: "حرارة إضافية", price: 1.00 }]
  },
  {
    id: "wr_fish",
    category: "wrap",
    nameEn: "Fish Wrap",
    nameAr: "تورتيلا سمك",
    descEn: "Breaded crispy fish fillet strips, greens, and cream tartar rolled in soft tortilla.",
    descAr: "أصابع فيليه سمك مقرمشة، خس، وصلصة تارتار كريمية في خبز التورتيلا.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Fish Wrap", labelAr: "رول سمك", priceModifier: 0 }],
    addons: []
  },
  {
    id: "wr_chicken",
    category: "wrap",
    nameEn: "Chicken Wrap",
    nameAr: "تورتيلا دجاج",
    descEn: "Grilled chicken slices, lettuce, cheddar, and garlic mayonnaise wrapped to perfection.",
    descAr: "شرائح دجاج مشوية، خس، جبن شيدر، ومايونيز الثوم في خبز التورتيلا.",
    price: 9.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Chicken Wrap", labelAr: "رول دجاج", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Cheese", labelAr: "جبنة إضافية", price: 1.00 }]
  },
  {
    id: "wr_egg",
    category: "wrap",
    nameEn: "Egg Wrap",
    nameAr: "تورتيلا البيض",
    descEn: "Omelette wrap cooked with green peppers, tomatoes, and cheese inside flat toasted tortilla.",
    descAr: "بيض أومليت مع فلفل أخضر وطماطم وجبنة موزاريلا في خبز تورتيلا محمص.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Omelette Wrap", labelAr: "رول البيض", priceModifier: 0 }],
    addons: []
  },
  {
    id: "wr_zinger",
    category: "wrap",
    nameEn: "Zinger Wrap",
    nameAr: "تورتيلا زنجر",
    descEn: "Spicy zinger tenders, fresh shredded lettuce, cheese, and spicy dressing.",
    descAr: "قطع دجاج زنجر حارة، خس مقطع، جبنة، وصلصة زنجر الحارة.",
    price: 11.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Zinger Wrap", labelAr: "رول زنجر", priceModifier: 0 }],
    addons: [{ labelEn: "Add Cheese", labelAr: "إضافة جبنة", price: 1.00 }]
  },

  // CLUB (كلوب)
  {
    id: "cl_arabic",
    category: "club",
    nameEn: "Arabic Club",
    nameAr: "كلوب عربي",
    descEn: "Traditional Gulf club sandwich stacked with egg, chicken salad, cheese, and fries.",
    descAr: "كلوب سندوتش عربي تقليدي محشو بالبيض، دجاج، جبنة، ويقدم مع بطاطس.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Double Deck Club", labelAr: "كلوب قطعتين", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Fries Side", labelAr: "بطاطس جانبي إضافي", price: 2.00 }]
  },
  {
    id: "cl_special",
    category: "club",
    nameEn: "Club Special",
    nameAr: "كلوب خاص",
    descEn: "Premium sandwich layers packed with turkey breast, roast beef, fried egg, cheese, and mayonnaise.",
    descAr: "طبقات سندوتش فاخرة محشوة بصدر ديك رومي، لحم بقري مشوي، بيض مقلي، وجبن.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Special Portion", labelAr: "كلوب خاص كامل", priceModifier: 0 }],
    addons: []
  },
  {
    id: "cl_zinger",
    category: "club",
    nameEn: "Zinger Club",
    nameAr: "كلوب زنجر",
    descEn: "Triple-layer bread stuffed with hot zinger chicken, sliced cheese, lettuce, and hot dynamite spreads.",
    descAr: "سندوتش كلوب ثلاثي محشو بدجاج زنجر حار، جبن شيدر، خس، وصلصة حارة.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Spicy Club", labelAr: "كلوب حار", priceModifier: 0 }],
    addons: [{ labelEn: "Extra Sauce", labelAr: "صوص إضافي", price: 1.00 }]
  },
  {
    id: "cl_beef",
    category: "club",
    nameEn: "Beef Club",
    nameAr: "كلوب لحم البقر",
    descEn: "Grilled ground beef, bacon strips, melted provolone, pickles, and lettuce in three slice breads.",
    descAr: "لحم بقري مشوي، شرائح بيكن، جبن بروفولون ذائب، خس ومخلل في كلوب سندوتش.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Beef Club", labelAr: "كلوب لحم", priceModifier: 0 }],
    addons: []
  },
  {
    id: "cl_veg",
    category: "club",
    nameEn: "Veg Club",
    nameAr: "كلوب الخضار",
    descEn: "Sautéed mushrooms, green peppers, tomatoes, onions, lettuce, and white cheese slices.",
    descAr: "مشروم سوتيه، فلفل أخضر، طماطم، بصل، خس، وشرائح جبن أبيض.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Veggie Club", labelAr: "كلوب نباتي", priceModifier: 0 }],
    addons: []
  },

  // JUICES & MOJITOS (عصائر ومشروبات)
  {
    id: "ju_pomegranate",
    category: "juice",
    nameEn: "Pomegranate",
    nameAr: "عصير رمان",
    descEn: "Cold pressed fresh pomegranate seed nectar, chilled with crushed ice.",
    descAr: "عصير رمان طازج معصور بارداً ومنعش بالثلج المجروش.",
    price: 6.00,
    image: "/assets/logo.png",
    sizes: [
      { labelEn: "Regular Cup", labelAr: "كوب عادي", priceModifier: 0 },
      { labelEn: "Large Bottle", labelAr: "جالون عائلي", priceModifier: 4.00 }
    ],
    addons: []
  },
  {
    id: "ju_orange",
    category: "juice",
    nameEn: "Orange",
    nameAr: "عصير برتقال",
    descEn: "100% natural cold pressed sweet orange juice.",
    descAr: "عصير برتقال طبيعي ١٠٠٪ معصور طازجاً ومليء بالفيتامين.",
    price: 6.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Regular Cup", labelAr: "كوب عادي", priceModifier: 0 }],
    addons: []
  },
  {
    id: "ju_mango",
    category: "juice",
    nameEn: "Mango",
    nameAr: "عصير مانجو",
    descEn: "Thick sweet nectar prepared from fresh ripe alphonso mangoes.",
    descAr: "عصير مانجو غني وحلو ومحضّر من مانجو ألفونسو الطازجة.",
    price: 6.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Regular Cup", labelAr: "كوب عادي", priceModifier: 0 }],
    addons: []
  },
  {
    id: "ju_avocado_watermelon",
    category: "juice",
    nameEn: "Avocado + Watermelon",
    nameAr: "أفوكادو + بطيخ",
    descEn: "Signature layered juice: rich creamy blended avocado topped with sweet watermelon nectar.",
    descAr: "عصير طبقات مميز: مزيج الأفوكادو الكريمي المغطى بعصير البطيخ الحلو والبارد.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Large Jar", labelAr: "كوب كبير", priceModifier: 0 }],
    addons: []
  },
  {
    id: "ju_lemon_mint",
    category: "juice",
    nameEn: "Lemon Mint",
    nameAr: "ليمون نعناع",
    descEn: "Refreshing frozen slush blend of lime, fresh mint leaves, and ice.",
    descAr: "مزيج ليمون طازج مثلج مع أوراق النعناع البري المنعشة والثلج.",
    price: 6.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Regular Cup", labelAr: "كوب عادي", priceModifier: 0 }],
    addons: []
  },
  {
    id: "mj_strawberry",
    category: "juice",
    nameEn: "Strawberry Mojito",
    nameAr: "موهيتو فراولة",
    descEn: "Refreshing strawberry syrup, sparkling soda, lime squeezes, and spearmint leaves.",
    descAr: "مشروب فوار بنكهة الفراولة المنعشة، ليمون، ونعناع مع الصودا والثلج.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Sparkling Mojito", labelAr: "موهيتو فوار", priceModifier: 0 }],
    addons: []
  },
  {
    id: "mj_blue_energy",
    category: "juice",
    nameEn: "Blue Energy Mojito",
    nameAr: "موهيتو طاقة زرقاء",
    descEn: "Glow blue mojito infused with energy elements, sparkling soda, lime, and crushed ice.",
    descAr: "موهيتو فوار باللون الأزرق المنعش مع عناصر الطاقة، الليمون، والثلج.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Sparkling Mojito", labelAr: "موهيتو فوار", priceModifier: 0 }],
    addons: []
  },
  {
    id: "mj_passion_fruit",
    category: "juice",
    nameEn: "Passion Fruit Mojito",
    nameAr: "موهيتو فاكهة العاطفة",
    descEn: "Sweet and tangy passion fruit nectar blended with mint leaves, lemon juice, and soda.",
    descAr: "مذاق فاكهة العاطفة الاستوائية مع صودا فوارة، نعناع، وعصير ليمون.",
    price: 12.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Sparkling Mojito", labelAr: "موهيتو فوار", priceModifier: 0 }],
    addons: []
  },
  {
    id: "tea_black",
    category: "juice",
    nameEn: "Black Tea",
    nameAr: "شاي أحمر أسود",
    descEn: "Hot brewed red tea leaves, perfect digestif after a heavy spicy feast.",
    descAr: "كوب شاي أحمر ساخن محضر من أوراق الشاي الفاخرة.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Hot Cup", labelAr: "كوب ساخن", priceModifier: 0 }],
    addons: []
  },

  // STARTERS & LOADED FRIES (مقبلات وبطاطس)
  {
    id: "st_kanz_loaded",
    category: "starters",
    nameEn: "B Kanz Loaded Fries",
    nameAr: "دجاج فريس بي كانز",
    descEn: "Golden fries loaded with chicken shawarma, melted cheddar cheese, and signature Kanz sauce.",
    descAr: "بطاطس ذهبية مغطاة بشاورما الدجاج، صوص الجبنة الشيدر الذائبة، وصلصة كانز الخاصة.",
    price: 17.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Sharing Platter", labelAr: "وجبة مشاركة", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_zinger_loaded",
    category: "starters",
    nameEn: "Zinger Loaded Fries",
    nameAr: "دجاج فريس زنجر",
    descEn: "French fries loaded with chopped zinger spicy chicken bites, cheese sauce, and hot ranch.",
    descAr: "بطاطس مقرمشة مغطاة بقطع دجاج زنجر حار، صوص الجبنة، وصلصة رانش حارة.",
    price: 14.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Sharing Platter", labelAr: "وجبة مشاركة", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_special_bk",
    category: "starters",
    nameEn: "Special BK Fries",
    nameAr: "بطاطا بي كيه الخاصة",
    descEn: "Sweet seasoned french fries tossed in special chef's herb spice blends.",
    descAr: "بطاطس متبلة ببهارات وأعشاب الشيف الخاصة بنكهة رائعة.",
    price: 7.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard Fries", labelAr: "حجم قياسي", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_potato_cheese",
    category: "starters",
    nameEn: "Potato w. Cheese",
    nameAr: "بطاطس بالجبن",
    descEn: "Golden french fries drenched in rich hot melted cheddar cheese sauce.",
    descAr: "بطاطس ذهبية مقلية مغمورة بصوص الجبنة الشيدر الذائبة الساخنة.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard", labelAr: "حجم قياسي", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_onion_rings",
    category: "starters",
    nameEn: "Onion Rings",
    nameAr: "حلقات البصل",
    descEn: "Crispy batter-fried sweet onion rings served with a side of garlic mayonnaise.",
    descAr: "حلقات بصل مقلية ومقرمشة تقدم مع مايونيز ثوم جانبي.",
    price: 6.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "8 Pieces", labelAr: "٨ حبات", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_mozzarella_sticks",
    category: "starters",
    nameEn: "Mozzarella Sticks",
    nameAr: "موزارلا ستيك",
    descEn: "Breaded melting mozzarella cheese sticks served with marinara dip.",
    descAr: "أصابع جبن موزاريلا مقرمشة وذائبة تقدم مع صلصة مارينارا.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "5 Pieces", labelAr: "٥ حبات", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_zinger_chicken",
    category: "starters",
    nameEn: "Zinger Chicken",
    nameAr: "دجاج زنجر",
    descEn: "Spicy breaded crispy chicken strips, served with hot garlic mayonnaise dip.",
    descAr: "قطع دجاج زنجر مقرمشة وحارة تقدم مع صوص الثوم الحار.",
    price: 19.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Large Portion", labelAr: "وجبة كبيرة", priceModifier: 0 }],
    addons: []
  },
  {
    id: "st_chicken_baik",
    category: "starters",
    nameEn: "Chicken Fillet Baik",
    nameAr: "مسحب دجاج بايك",
    descEn: "Golden crispy chicken fillet nuggets served with garlic paste and french fries (Baik style).",
    descAr: "قطع مسحب دجاج ذهبية مقرمشة تقدم مع الثومية والبطاطس على طريقة بايك الشهيرة.",
    price: 18.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "6 Pieces Box", labelAr: "٦ قطع مع بطاطس", priceModifier: 0 }],
    addons: []
  },

  // SALADS (سلطات)
  {
    id: "sa_fathoosh",
    category: "salads",
    nameEn: "Fathoosh",
    nameAr: "فتوش",
    descEn: "Crisp romaine, tomatoes, cucumber, radishes, sumac, fresh mint, and toasted Saj croutons in pomegranate dressing.",
    descAr: "خس، طماطم، خيار، فجل، سماق، نعناع طازج، وقطع خبز صاج محمص مع دبس الرمان.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard Plate", labelAr: "وجبة صحن", priceModifier: 0 }],
    addons: []
  },
  {
    id: "sa_green",
    category: "salads",
    nameEn: "Green Salad",
    nameAr: "سلطة خضراء",
    descEn: "Simple mix of fresh cucumber, lettuce, tomato, parsley, lemon juice, and olive oil dressing.",
    descAr: "مزيج بسيط من الخيار الطازج، الخس، الطماطم، البقدونس، مع ليمون وزيت زيتون.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard", labelAr: "صحن عادي", priceModifier: 0 }],
    addons: []
  },
  {
    id: "sa_taboula",
    category: "salads",
    nameEn: "Taboula",
    nameAr: "تبولة",
    descEn: "Finely chopped fresh parsley, mint, bulgur wheat, tomatoes, onions, olive oil, and lemon dressing.",
    descAr: "بقدونس مفروم طازج، نعناع، برغل، طماطم، بصل، زيت زيتون وعصرة ليمون حامض.",
    price: 10.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Standard", labelAr: "صحن عادي", priceModifier: 0 }],
    addons: []
  },

  // SAUCES (صوص)
  {
    id: "su_garlic",
    category: "sauces",
    nameEn: "Garlic Sauce",
    nameAr: "ثومية",
    descEn: "Signature creamy white garlic paste cup, perfect with rotisserie shawarma.",
    descAr: "علبة ثومية كريمية شهيرة ومحفوظة، مثالية مع قطع الشاورما.",
    price: 1.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Small Cup", labelAr: "علبة صغيرة", priceModifier: 0 }],
    addons: []
  },
  {
    id: "su_cocktail",
    category: "sauces",
    nameEn: "Cocktail Sauce",
    nameAr: "صوص كوكتيل",
    descEn: "Blended ketchup, mayonnaise, and secret spices dip cup.",
    descAr: "علبة صوص كوكتيل لذيذة ومخلوطة من الكاتشب والمايونيز والبهارات.",
    price: 2.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Small Cup", labelAr: "علبة صغيرة", priceModifier: 0 }],
    addons: []
  },
  {
    id: "su_hummus",
    category: "sauces",
    nameEn: "Hummus",
    nameAr: "حمص صحن",
    descEn: "Creamy pureed chickpeas, tahini, garlic, lemon juice, and olive oil drip.",
    descAr: "حمص مطحون ناعم مع طحينة، ثوم، ليمون، وزيت زيتون.",
    price: 5.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Portion plate", labelAr: "صحن صغير", priceModifier: 0 }],
    addons: []
  },

  // PLATES (صحون)
  {
    id: "pl_shakshuka",
    category: "plates",
    nameEn: "Shakshuka",
    nameAr: "شكشوكة صحن",
    descEn: "Scrambled eggs simmered in a spiced tomato, pepper, and onion sauce, served with Saj flatbread.",
    descAr: "بيض مخفوق مطبوخ مع صلصة الطماطم المتبلة، الفلفل، والبصل، يقدم مع خبز صاج.",
    price: 5.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Plate Portion", labelAr: "صحن شكشوكة", priceModifier: 0 }],
    addons: []
  },
  {
    id: "pl_foul",
    category: "plates",
    nameEn: "Foul Mixed Plate",
    nameAr: "فول صحن مشكل",
    descEn: "Warm fava beans cooked with cumin, garlic, lemon, topped with chopped tomatoes, olive oil, and herbs.",
    descAr: "صحن فول مدمس مطبوخ مع الكمون، الثوم، الليمون، مغطى بالطماطم المفرومة وزيت الزيتون.",
    price: 5.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Plate Portion", labelAr: "صحن فول", priceModifier: 0 }],
    addons: []
  },
  {
    id: "pl_kibda",
    category: "plates",
    nameEn: "Kibda",
    nameAr: "كبدة صاج",
    descEn: "Spiced beef liver sautéed with bell peppers, onions, cumin, and garlic, served with bread.",
    descAr: "كبدة مشوية على الصاج مع الفلفل الرومي، البصل، الكمون والثوم، وتقدم مع الخبز.",
    price: 15.00,
    image: "/assets/logo.png",
    sizes: [{ labelEn: "Plate Portion", labelAr: "صحن كبدة", priceModifier: 0 }],
    addons: []
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
  placeOrder: (details: {
    customerName: string;
    phone: string;
    address: string;
    notes: string;
    paymentMethod: string;
  }) => void;
  couponCode: string;
  discountPercent: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  deliveryFee: number;
  setDeliveryFee: (fee: number) => void;
  deliveryType: "delivery" | "dinein" | "takeaway";
  setDeliveryType: (type: "delivery" | "dinein" | "takeaway") => void;
  checkoutDetails: {
    customerName: string;
    phone: string;
    address: string;
    notes: string;
    paymentMethod: string;
  } | null;
  dbMenuItems: MenuItem[];
  updateProductImage: (productId: string, base64Data: string) => void;
  resetProductImage: (productId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dbMenuItems, setDbMenuItems] = useState<MenuItem[]>(menuItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successStep, setSuccessStep] = useState(1);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [deliveryFee, setDeliveryFeeState] = useState(5.00); // 5 AED default delivery
  const [deliveryType, setDeliveryTypeState] = useState<"delivery" | "dinein" | "takeaway">("delivery");
  const [checkoutDetails, setCheckoutDetails] = useState<CartContextProps["checkoutDetails"]>(null);

  // Sync custom image overrides from localStorage
  useEffect(() => {
    const customImages = JSON.parse(localStorage.getItem("kanz_custom_images") || "{}");
    if (Object.keys(customImages).length > 0) {
      setDbMenuItems(prev =>
        prev.map(item => 
          customImages[item.id] ? { ...item, image: customImages[item.id] } : item
        )
      );
    }
  }, []);

  const updateProductImage = (productId: string, base64Data: string) => {
    const customImages = JSON.parse(localStorage.getItem("kanz_custom_images") || "{}");
    customImages[productId] = base64Data;
    localStorage.setItem("kanz_custom_images", JSON.stringify(customImages));
    
    setDbMenuItems(prev =>
      prev.map(item => 
        item.id === productId ? { ...item, image: base64Data } : item
      )
    );
  };

  const resetProductImage = (productId: string) => {
    const customImages = JSON.parse(localStorage.getItem("kanz_custom_images") || "{}");
    delete customImages[productId];
    localStorage.setItem("kanz_custom_images", JSON.stringify(customImages));
    
    setDbMenuItems(prev =>
      prev.map(item => 
        item.id === productId ? { ...item, image: "/assets/logo.png" } : item
      )
    );
  };

  const setDeliveryType = (type: "delivery" | "dinein" | "takeaway") => {
    setDeliveryTypeState(type);
    if (type === "delivery") {
      setDeliveryFeeState(5.00); // 5 AED delivery fee
    } else {
      setDeliveryFeeState(0);
    }
  };

  const setDeliveryFee = (fee: number) => {
    setDeliveryFeeState(fee);
  };

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.toUpperCase().trim();
    if (formattedCode === "KANZFEST") {
      setCouponCode(formattedCode);
      setDiscountPercent(20);
      return true;
    } else if (formattedCode === "FREEFEED") {
      setCouponCode(formattedCode);
      setDiscountPercent(100);
      return true;
    } else if (formattedCode === "WELCOME10") {
      setCouponCode(formattedCode);
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
  };

  const openCustomizer = (itemId: string) => {
    const item = dbMenuItems.find(i => i.id === itemId);
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

  const clearCart = () => {
    setCart([]);
    removeCoupon();
  };

  const placeOrder = (details: {
    customerName: string;
    phone: string;
    address: string;
    notes: string;
    paymentMethod: string;
  }) => {
    setCheckoutDetails(details);
    setIsCartOpen(false);
    setSuccessStep(1);
    setIsSuccessOpen(true);

    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const tax = subtotal * 0.14;
    const discount = subtotal * (discountPercent / 100);
    const total = subtotal + tax + deliveryFee - discount;

    const newOrder = {
      id: "KANZ-" + Math.floor(100000 + Math.random() * 900000),
      items: cart,
      customerName: details.customerName,
      phone: details.phone,
      address: details.address || (deliveryType === "dinein" ? "Dine-in Table" : "Takeaway Counter"),
      notes: details.notes,
      paymentMethod: details.paymentMethod,
      subtotal,
      tax,
      deliveryFee,
      discount,
      total,
      status: "confirmed",
      deliveryType,
      createdAt: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem("kanz_orders") || "[]");
    localStorage.setItem("kanz_orders", JSON.stringify([newOrder, ...existingOrders]));
    
    setTimeout(() => {
      setSuccessStep(2);
      const orders = JSON.parse(localStorage.getItem("kanz_orders") || "[]");
      const updated = orders.map((o: any) => o.id === newOrder.id ? { ...o, status: "preparing" } : o);
      localStorage.setItem("kanz_orders", JSON.stringify(updated));
    }, 3000);

    setTimeout(() => {
      setSuccessStep(3);
      const orders = JSON.parse(localStorage.getItem("kanz_orders") || "[]");
      const updated = orders.map((o: any) => o.id === newOrder.id ? { ...o, status: "delivering" } : o);
      localStorage.setItem("kanz_orders", JSON.stringify(updated));
    }, 8000);

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
      placeOrder,
      couponCode,
      discountPercent,
      applyCoupon,
      removeCoupon,
      deliveryFee,
      setDeliveryFee,
      deliveryType,
      setDeliveryType,
      checkoutDetails,
      dbMenuItems,
      updateProductImage,
      resetProductImage
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
