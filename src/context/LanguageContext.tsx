"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const translationsEn = {
  brand_name: "Shawarma b'Kanz",
  nav_home: "Home",
  nav_story: "Our Treasure",
  nav_spit: "Spit Experience",
  nav_menu: "Menu",
  nav_reviews: "Reviews",
  nav_contact: "Find Us",
  hero_badge: "🔥 Pure Spit-Roasted Perfection",
  hero_title_accent: "Taste the Treasure",
  hero_title_main: "of Flame-Sear",
  hero_desc: "Born from flame, infused with our legendary 18-spice recipe, and carved hot onto artisan flatbreads. Taste the true treasure of shawarma.",
  hero_cta_order: "Order Online Now",
  hero_cta_explore: "Explore Spit Secret",
  stat_reviews: "5k+ Reviews",
  stat_spices: "Secret Spices",
  stat_spices_val: "18",
  stat_locations: "Outlets",
  stat_locations_val: "3",
  story_subtitle: "The Legend of Kanz",
  story_title: "What Makes It a Treasure?",
  story_desc: '"Kanz" in Arabic means treasure. Every bite of our food is crafted to live up to that name, combining centuries-old slow cooking with contemporary culinary craftsmanship.',
  story_feat1_title: "18-Spice Signature",
  story_feat1_desc: "A closely guarded family recipe using cardamoms, Sumac, clove, and wild herbs sourced directly from Middle Eastern mountains.",
  story_feat2_title: "Flame-Seared Finish",
  story_feat2_desc: "We don't just carve. Our carvings get a flash sear over open flame grates, locking in juices and offering unmatched crispy edges.",
  story_feat3_title: "Stone-Baked Bread",
  story_feat3_desc: "Traditional Saj and Markouk flatbreads are rolled thin and baked freshly on the Saj dome for each individual order.",
  spit_badge: "🔍 Interactive Spit Anatomy",
  spit_title: "The Secret of the Spit",
  spit_intro: "Click on the glowing radar indicators on the rotisserie to discover the culinary science behind our flavor profile.",
  spit_mobile_heading: "Click parts to inspect",
  spit_info_title1: "Slow-Roast Self-Basting (Top)",
  spit_info_desc1: "The top of the cone is layered with fine mutton and beef fats. As it rotates slowly, the fats melt and trickle down, continuously basting the lower chicken or beef layers and preserving succulent moisture.",
  spit_info_title2: "Kanz Caramelized Crust (Middle)",
  spit_info_desc2: "Here the spice rub locks in the marinade. The slow rotational speed allows the spice sugars to caramelize slowly into a crisp, deeply flavor-dense exterior crust ready to be shaved.",
  spit_info_title3: "Infused Citrus Drip (Bottom)",
  spit_info_desc3: "At the bottom base, we position custom drip rings with fresh lemon slices, cardamom pods, and sea salt. The natural drippings blend with the citrus steam, wrapping the meat in a fragrant vapor.",
  spit_info_title4: "Wood-Fire Hearth Base (Fire)",
  spit_info_desc4: "We use authentic oak wood fire burners behind the vertical rotisserie. This injects a distinct hickory woodsmoke note into the crisp, roasted edges that electric grills can never duplicate.",
  menu_subtitle: "Taste the Menu",
  menu_title: "Our Signature Offerings",
  menu_desc: "Browse our flame-kissed catalog. Filter by your cravings. Select your customized options and add to your feast.",
  menu_tab_all: "Full Feast",
  menu_tab_wraps: "Wraps",
  menu_tab_burgers: "Burgers",
  menu_tab_sandwiches: "Sandwiches",
  menu_tab_drinks: "Drinks",
  reviews_subtitle: "Wall of Flavour",
  reviews_title: "Loved by Shawarma Critics",
  reviews_desc: "See what food lovers and street-food critics have to say about the spit-fired treasures at Shawarma b'Kanz.",
  crit_label: "Food Critic, Cairo Eats",
  reviewer_label_2: "Local Guide",
  reviewer_label_3: "Burgers of Arabia Blog",
  contact_title: "Visit the Treasure",
  contact_desc: "Come visit our outlets to eat it hot right off the spit, or reach out to us for catering.",
  contact_loc_title: "Main Flagship Outlet",
  contact_loc_desc: "45 El-Nozha Street, Heliopolis, Cairo, Egypt",
  contact_phone_title: "Delivery & Catering",
  contact_email_title: "Support Email",
  contact_hours_title: "Opening Hours",
  contact_hours_desc: "Everyday: 12:00 PM - 03:00 AM (Midnight cravings covered!)",
  map_popup_text: "Smell the roast from here!",
  form_title: "Send us a message",
  form_submit: "Send Message",
  form_name_placeholder: "Name",
  form_email_placeholder: "Email",
  form_msg_placeholder: "Your message...",
  footer_about: "Taste the treasure of flame-seared slow-roasted shawarma. Igniting street-food traditions since 2024.",
  footer_links_head: "Navigation",
  footer_news_head: "Join the Feast",
  footer_news_desc: "Subscribe to get secret discount codes and flame alerts.",
  footer_news_placeholder: "Your email...",
  footer_news_submit: "Join",
  cart_title: "Your Feast",
  cart_empty: "Your cart is empty. Start adding some treasures!",
  cart_start_order: "Go to Menu",
  cart_subtotal: "Subtotal",
  cart_tax: "Tax (14%)",
  cart_total: "Grand Total",
  cart_checkout: "Place Order",
  modal_size: "Select Size",
  modal_spice: "Spice Level",
  modal_addons: "Extra Treasures",
  modal_total: "Price",
  modal_add_btn: "Add to Feast",
  spice_regular: "Regular (Tame)",
  spice_medium: "Medium (Warmth)",
  spice_spicy: "Kanz Fire (Ignited!)",
  success_title: "Order Placed!",
  success_desc: "Our spitmasters have received your request. Your flame-seared feast is rotating into reality.",
  step_1: "Confirmed",
  step_2: "Spit Roast",
  step_3: "Transit",
  success_close: "Sweet!",
  
  // Custom generated text for other sections
  about_title: "Our Story",
  about_heading: "The Hunt for the Ultimate Spit Roast",
  about_p1: "Shawarma b'Kanz was born out of a desire to rescue the true identity of shawarma. In a market flooded with electric grills and dry, pre-cut carvings, we went back to the roots. We built custom vertical spit assemblies heated by hand-split oak wood.",
  about_p2: "Combined with a legendary blend of 18 spices hand-carried from historical trade routes, our meat bastes itself in rich fats as it spins slowly over the hearth, before receiving a flash sear on open fire. The result is a treasure box of flame, crisp, and juiciness.",
  mission_title: "Our Mission",
  mission_desc: "To deliver street-food traditions as they were meant to be: slow-roasted, fire-kissed, and crafted with absolute integrity.",
  vision_title: "Our Vision",
  vision_desc: "To ignite a new global appreciation for wood-fired shawarma, honoring heritage while creating modern taste treasures.",
  chef_title: "The Spitmaster",
  chef_name: "Chef Tariq Al-Mansoor",
  chef_desc: "With over 20 years of fire-cooking expertise across Damascus, Beirut, and Cairo, Chef Tariq manages our spit-hearths with a craftsman's precision. To Tariq, shawarma isn't food; it's a living fire performance.",
  faq_title: "Frequently Asked Questions",
  faq_q1: "What does 'b'Kanz' mean?",
  faq_a1: "'Kanz' is the Arabic word for treasure. 'b'Kanz' literally translates to 'in a treasure (box)'. Every recipe is crafted as a hidden culinary chest.",
  faq_q2: "Is all your meat wood-fired?",
  faq_a2: "Yes! Unlike gas or electric grills, our custom rotisseries use real oak wood logs. The unique smokiness and charred edges are 100% natural.",
  faq_q3: "Do you deliver?",
  faq_a3: "Absolutely. We deliver from 12:00 PM to 03:00 AM daily. Select your options and hit checkout, or call our lines directly.",
  faq_q4: "Are your flatbreads baked fresh?",
  faq_a4: "Yes, our Saj flatbreads are rolled thin and baked live on the traditional Saj dome for every single order.",
  reservation_title: "Book a Table",
  reservation_subtitle: "Experience the Hearth Live",
  reservation_desc: "Reserve a spot right in front of our open flame pits and watch the spitmasters carve the treasures in real time.",
  res_name: "Full Name",
  res_email: "Email Address",
  res_phone: "Phone Number",
  res_date: "Select Date",
  res_time: "Select Time",
  res_guests: "Number of Guests",
  res_guests_opt: "Guests",
  res_submit: "Confirm Reservation",
  res_success: "Reservation Request Sent! We will email you details shortly.",
  offers_title: "Special Offers",
  offers_subtitle: "Feast More, Pay Less",
  offers_desc: "Check out our special combo boxes and time-limited treasure deals.",
  offer_combo1_title: "The Solo Spit Box",
  offer_combo1_desc: "1 Classic Chicken Wrap, 1 Fries, 1 Garlic Paste, and 1 Lemonade. The perfect single treasure.",
  offer_combo2_title: "The Spitmaster Duo",
  offer_combo2_desc: "2 Double Kanz Wraps (Chicken or Beef), 1 Large Fries, 2 Dipping Sauces, and 2 Sodas.",
  offer_combo3_title: "The Feast Box",
  offer_combo3_desc: "4 Assorted Sandwiches, 2 Spit Burgers, 2 Large Fries, 4 Soft Drinks, and a Pomegranate mint pitcher.",
  order_now: "Order Now",
  gallery_title: "Hearth Gallery",
  gallery_subtitle: "Visual Feast from the Spit",
  gallery_desc: "Browse visual logs of sizzling fat, blazing oak logs, and perfectly folded wraps.",
};

const translationsAr = {
  brand_name: "شاورما بي كانز",
  nav_home: "الرئيسية",
  nav_story: "كنزنا الخاص",
  nav_spit: "أسرار السيخ",
  nav_menu: "القائمة",
  nav_reviews: "الآراء",
  nav_contact: "مواقعنا",
  hero_badge: "🔥 شاورما مشوية على السيخ بامتياز",
  hero_title_accent: "تذوّق كنز النكهة",
  hero_title_main: "من لهب النار",
  hero_desc: "ولدت من قلب اللهب، مشبعة بخلطتنا السرية المكونة من 18 بهاراً، تُشرح ساخنة على الخبز الطازج. تذوّق الكنز الحقيقي للشاورما.",
  hero_cta_order: "اطلب الآن أونلاين",
  hero_cta_explore: "اكتشف أسرار السيخ",
  stat_reviews: "أكثر من ٥ آلاف تقييم",
  stat_spices: "بهاراً سرياً",
  stat_spices_val: "١٨",
  stat_locations: "فروع",
  stat_locations_val: "٣",
  story_subtitle: "أسطورة الكنز",
  story_title: "ما الذي يجعلها كنزاً؟",
  story_desc: "كل لقمة من أكلنا محضرة بعناية لترقى إلى هذا الاسم، لتجمع بين الشواء البطيء الأصيل واللمسات العصرية المبدعة.",
  story_feat1_title: "خلطة الـ ١٨ بهاراً",
  story_feat1_desc: "وصفة عائلية سرية ومحفوظة، تعتمد على حب الهيل، السماق، القرنفل، والأعشاب البرية من جبال الشرق الأوسط.",
  story_feat2_title: "تحمير على اللهب",
  story_feat2_desc: "لا نكتفي بالتقطيع. بعد شرح اللحم، نقوم بوضعه سريعاً على شواية لهب مفتوحة، لنضمن الحفاظ على العصارة بنكهة كرسبي خارقة.",
  story_feat3_title: "خبز طازج من الصاج",
  story_feat3_desc: "خبز الصاج والماركوق التقليدي يُفرد رقيقاً ويُخبز فوراً على الصاج الساخن مع كل طلب لضمان الطراوة والقرمشة.",
  spit_badge: "🔍 تشريح تفاعلي لسيخ الشاورما",
  spit_title: "أسرار دوران السيخ",
  spit_intro: "اضغط على النقاط المضيئة في سيخ الشاورما لتكتشف أسرار الطهي خلف نكهتنا الفريدة.",
  spit_mobile_heading: "انقر على الأجزاء للمعاينة",
  spit_info_title1: "تدهين ذاتي للشواء البطيء (أعلى السيخ)",
  spit_info_desc1: "تُوضع قطع اللية الفاخرة ودهن البقر في قمة السيخ. ومع الدوران البطيء، يذوب الدهن وينساب تدريجياً ليدهن طبقات الدجاج أو اللحم بالأسفل بشكل مستمر، مما يحمي الشاورما من الجفاف ويمنحها طراوة استثنائية.",
  spit_info_title2: "كرست كنز المكرمل (منتصف السيخ)",
  spit_info_desc2: "هنا تتداخل التتبيلة والبهارات مع اللحم. سرعة الدوران البطيئة للغاية تسمح للسكريات والبهارات بالتكرمل تدريجياً لتشكيل طبقة خارجية مقرمشة وغنية بالنكهات وجاهزة للتقطيع.",
  spit_info_title3: "رذاذ الحمضيات المنعش (أسفل السيخ)",
  spit_info_desc3: "في القاعدة، نضع حلقات حمضيات مخصصة مع الليمون الطازج، وحب الهيل، والملح البحري. تتساقط عصارات الشاورما لتتبخر وتتغلغل النكهة العطرية باللحم من جديد.",
  spit_info_title4: "قاعدة موقد الحطب الطبيعي (اللهب)",
  spit_info_desc4: "نستخدم حطب البلوط الطبيعي المشتعل خلف السيخ مباشرة. هذا يمنح قطع اللحم المحمرة نكهة تدخين خشبية مميزة لا يمكن لمحامص الكهرباء أو الغاز تقليدها أبداً.",
  menu_subtitle: "تذوق قائمتنا",
  menu_title: "أطباقنا المميزة",
  menu_desc: "تصفح قائمتنا المشتعلة بالنكهات. اطلب خيارات التخصيص التي تفضلها وأضفها إلى وليمتك الخاصة.",
  menu_tab_all: "الوليمة الكاملة",
  menu_tab_wraps: "اللفائف (الرول)",
  menu_tab_burgers: "البرجر",
  menu_tab_sandwiches: "السندوتشات",
  menu_tab_drinks: "المشروبات",
  reviews_subtitle: "جدار المذاق",
  reviews_title: "شهادات نقاد الطعام",
  reviews_desc: "شاهد تقييمات عشاق ونقاد الشاورما المكتوبة لولائم شاورما بي كانز الفريدة.",
  crit_label: "ناقد طعام، كايرو إيتس",
  reviewer_label_2: "مرشد محلي",
  reviewer_label_3: "مدونة برجر أرابيا",
  contact_title: "تفضل بزيارتنا",
  contact_desc: "تفضل بزيارة فروعنا لتناول الشاورما ساخنة مباشرة من السيخ، أو تواصل معنا لطلبات المناسبات.",
  contact_loc_title: "الفرع الرئيسي",
  contact_loc_desc: "٤٥ شارع النزهة، مصر الجديدة، القاهرة، مصر",
  contact_phone_title: "الدليفري والحفلات",
  contact_email_title: "البريد الإلكتروني للدعم",
  contact_hours_title: "أوقات العمل",
  contact_hours_desc: "يومياً: ١٢:٠٠ ظهراً - ٠٣:٠٠ بعد منتصف الليل (نغطي جوع آخر الليل!)",
  map_popup_text: "رائحة الشواء تفوح من هنا!",
  form_title: "أرسل لنا رسالة",
  form_submit: "إرسال الرسالة",
  form_name_placeholder: "الاسم",
  form_email_placeholder: "البريد الإلكتروني",
  form_msg_placeholder: "رسالتك...",
  footer_about: "شاورما مشوية على لهب حطب البلوط الطبيعي بخلطة بهاراتنا الأسطورية. نحيي تقاليد طعام الشارع منذ عام ٢٠٢٤.",
  footer_links_head: "خريطة الموقع",
  footer_news_head: "انضم إلى الوليمة",
  footer_news_desc: "اشترك في قائمتنا البريدية للحصول على كود خصم وتنبيهات بجديدنا.",
  footer_news_placeholder: "بريدك الإلكتروني...",
  footer_news_submit: "انضمام",
  cart_title: "وليمتك الحالية",
  cart_empty: "عربتك فارغة حتى الآن. ابدأ بإضافة بعض الكنوز الشهية!",
  cart_start_order: "اذهب إلى القائمة",
  cart_subtotal: "المجموع الفرعي",
  cart_tax: "الضريبة (١٤٪)",
  cart_total: "المجموع الكلي",
  cart_checkout: "إتمام الطلب",
  modal_size: "اختر الحجم",
  modal_spice: "درجة الحرارة",
  modal_addons: "إضافات الكنز",
  modal_total: "السعر",
  modal_add_btn: "إضافة إلى الوليمة",
  spice_regular: "عادي (بدون شطة)",
  spice_medium: "وسط (لذعة خفيفة)",
  spice_spicy: "لهب كانز (حار جداً!)",
  success_title: "تم استلام الطلب!",
  success_desc: "استلم معلمو الشاورما طلبك بنجاح. وليمتك اللذيذة تدور على السيخ لتتحضر لك.",
  step_1: "تم التأكيد",
  step_2: "على السيخ",
  step_3: "بالطريق إليك",
  success_close: "رائع!",
  
  // Custom translations for other pages
  about_title: "قصتنا",
  about_heading: "رحلة البحث عن السيخ المشوي المثالي",
  about_p1: "تأسست شاورما بي كانز برغبة حقيقية في استعادة الهوية الأصلية للشاورما. في سوق غارق في الشوايات الكهربائية واللحوم الجاهزة، قررنا العودة إلى الجذور. قمنا ببناء أسياخ شاورما رأسية مخصصة تُسخَّن بواسطة خشب البلوط المشقوق يدوياً.",
  about_p2: "جنباً إلى جنب مع خلطتنا الأسطورية المكونة من 18 بهاراً مستوردة خصيصاً من طرق التجارة التاريخية، يُدهن اللحم ذاتياً بالدهون الغنية أثناء دورانه ببطء فوق الموقد، قبل أن يتم تحميره بشكل خاطف على لهب نار مباشر. والنتيجة هي كنز متفجر بالنكهات والمقرمشة والعصارة.",
  mission_title: "مهمتنا",
  mission_desc: "تقديم شاورما طعام الشارع كما ينبغي لها أن تكون: شواء بطيء، لمسة لهب، ومصنوعة بنزاهة وإتقان تام.",
  vision_title: "رؤيتنا",
  vision_desc: "إثارة تقدير عالمي جديد لشاورما الحطب والفرن التقليدي، مع احترام التراث وابتكار كنوز مذاق حديثة.",
  chef_title: "معلم الشاورما",
  chef_name: "الشيف طارق المنصور",
  chef_desc: "مع أكثر من 20 عاماً من الخبرة في طهي النار بدمشق وبيروت والقاهرة، يدير الشيف طارق مواقدنا بدقة الحرفي. بالنسبة لطارق، الشاورما ليست مجرد طعام، بل هي عرض فني حي بالنار.",
  faq_title: "الأسئلة الشائعة",
  faq_q1: "ما معنى 'بي كانز'؟",
  faq_a1: "'كنز' تعني كنزاً، و'بي كانز' تعني حرفياً 'في كنز' أو 'بالكنز'. كل وصفة لدينا مصممة كصندوق مخفي من كنوز الطهي.",
  faq_q2: "هل لحومكم مشوية على الحطب بالكامل؟",
  faq_a2: "نعم! على عكس الشوايات الكهربائية أو الغاز، نستخدم حطب البلوط الطبيعي المشتعل. نكهة التدخين والحواف المحمرة طبيعية 100٪.",
  faq_q3: "هل توفرون خدمة التوصيل؟",
  faq_a3: "بكل تأكيد. نوفر خدمة التوصيل من 12:00 ظهراً وحتى 03:00 بعد منتصف الليل يومياً. اختر طلبك واضغط إتمام، أو اتصل بخطوطنا مباشرة.",
  faq_q4: "هل يخبز خبز الصاج طازجاً؟",
  faq_a4: "نعم، يتم فرد خبز الصاج والماركوق رقيقاً ويخبز حياً أمامك على الصاج الساخن لكل طلب على حدة.",
  reservation_title: "احجز طاولة",
  reservation_subtitle: "عِش تجربة موقد النار مباشرة",
  reservation_desc: "احجز مكانك أمام مواقد الشواء المفتوحة مباشرة واستمتع بمشاهدة معلمي الشاورما أثناء تقطيع الكنوز الساخنة أمامك مباشرة.",
  res_name: "الاسم الكامل",
  res_email: "البريد الإلكتروني",
  res_phone: "رقم الهاتف",
  res_date: "اختر التاريخ",
  res_time: "اختر الوقت",
  res_guests: "عدد الضيوف",
  res_guests_opt: "أشخاص",
  res_submit: "تأكيد الحجز",
  res_success: "تم إرسال طلب الحجز بنجاح! سنقوم بالتأكيد عبر البريد قريباً.",
  offers_title: "العروض الخاصة",
  offers_subtitle: "وليمة أكبر وسعر أقل",
  offers_desc: "تصفح صناديق الكومبو والعروض الخاصة والمحدودة الزمن.",
  offer_combo1_title: "صندوق السيخ الفردي",
  offer_combo1_desc: "رول شاورما كلاسيك دجاج، بطاطس، ثومية، وعصير ليمون منعش. كنز فردي متكامل.",
  offer_combo2_title: "كومبو الثنائي",
  offer_combo2_desc: "2 رول دبل كنز (دجاج أو لحم)، بطاطس حجم عائلي، 2 صوص ثومية، و 2 مشروب صودا.",
  offer_combo3_title: "صندوق الوليمة العائلي",
  offer_combo3_desc: "4 سندوتشات مشكلة، 2 برجر على لهب السيخ، 2 بطاطس كبير، 4 مشروبات صودا، وإبريق عصير رمان بالنعناع.",
  order_now: "اطلب الآن",
  gallery_title: "معرض الموقد",
  gallery_subtitle: "وليمة بصرية من قلب اللهب",
  gallery_desc: "تصفح الصور الحية للحوم المتساقطة بالدهن والأسياخ المشتعلة بحطب البلوط ولفائف الشاورما الطازجة.",
};

type Locale = "en" | "ar";

interface LanguageContextProps {
  locale: Locale;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("en");

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("kanz_lang") as Locale;
    if (saved === "en" || saved === "ar") {
      setLocale(saved);
      updateHTMLAttributes(saved);
    } else {
      updateHTMLAttributes("en");
    }
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
    localStorage.setItem("kanz_lang", nextLocale);
    updateHTMLAttributes(nextLocale);
  };

  const updateHTMLAttributes = (lang: Locale) => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    if (lang === "ar") {
      html.setAttribute("dir", "rtl");
      document.body.classList.add("rtl-mode");
    } else {
      html.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl-mode");
    }
  };

  const t = (key: string): string => {
    const dict = locale === "en" ? translationsEn : translationsAr;
    return (dict as any)[key] || key;
  };

  const isRtl = locale === "ar";

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
