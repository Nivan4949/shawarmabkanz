"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SpitExperience } from "@/components/SpitExperience";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Compass, Star, ChevronLeft, ChevronRight, ShieldCheck, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const { t, locale, isRtl } = useLanguage();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const shawarmaRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Register GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect on Shawarma image in Hero
    if (shawarmaRef.current) {
      gsap.to(shawarmaRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Scroll reveal for Story sections
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const reviews = [
    {
      avatar: "RA",
      name: "Rami Al-Assaf",
      titleKey: "crit_label",
      text: locale === "en" 
        ? '"I\'ve had shawarma in Beirut, Dubai, and Istanbul, but the flame-seared crust at Shawarma b\'Kanz is on another level. The chicken is incredibly juicy, and the garlic paste is silky-smooth perfection!"'
        : '"لقد تذوقت الشاورما في بيروت ودبي وإسطنبول، لكن قشرة اللحم المحمرة على الصاج في شاورما بي كانز في مستوى آخر تماماً. اللجاج طري جداً والثومية حريرية مذهلة!"',
    },
    {
      avatar: "SK",
      name: "Sarah Khan",
      titleKey: "reviewer_label_2",
      text: locale === "en"
        ? '"The Kanz Sub inside that toasted baguette is a masterpiece. The fries are crunchy, the pickle tang is sharp, and the meat has this amazing wood-grilled hickory scent. 10/10!"'
        : '"سندوتش كنز باجيت عبارة عن تحفة فنية. البطاطس مقرمشة والمخلل لاذع واللحم له رائحة شواء حطب البلوط الطبيعي المذهلة. ١٠/١٠!"',
    },
    {
      avatar: "MD",
      name: "Michael Diaz",
      titleKey: "reviewer_label_3",
      text: locale === "en"
        ? '"The Spit-Fired Burger is a genius combination. Putting shaved shawarma and secret sauce on top of a beef patty? Absolute heaven. Best late night spot in town."'
        : '"برجر لهب السيخ فكرة عبقرية. وضع شاورما اللحم المشرحة مع الصوص السري فوق شريحة البرجر البقري؟ قمة اللذة. أفضل مكان للطلبات المتأخرة."',
    },
  ];

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div ref={heroRef} className="bg-[#0E0E0E] text-[#FFFFFF] overflow-hidden">
      
      {/* Fullscreen Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-radial-[circle_at_center_bottom] from-[#C41218]/15 via-transparent to-transparent">
        {/* Animated Background Gradients & Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E] via-transparent to-[#0E0E0E] pointer-events-none z-10" />
        
        {/* Ambient Fire Base Lights */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#FF7A00]/5 to-transparent blur-3xl" />

        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 relative z-20">
          
          {/* Hero Content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col text-center lg:text-left rtl:lg:text-right"
          >
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-[#C41218]/10 border border-[#C41218]/25 text-[#FFD400] text-[11px] font-black uppercase tracking-wider shadow-lg shadow-[#C41218]/5">
                <Flame className="w-3.5 h-3.5 text-[#C41218] animate-pulse" />
                <span>{t("hero_badge")}</span>
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-[64px] font-black uppercase tracking-tight mb-6 leading-[1.05]">
              <span className="accent-text block mb-1">{t("hero_title_accent")}</span>
              <span className="text-white">{t("hero_title_main")}</span>
            </h1>
            
            <p className="text-sm sm:text-base text-white/60 max-w-[500px] mx-auto lg:mx-0 mb-10 leading-relaxed">
              {t("hero_desc")}
            </p>
            
            {/* Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#C41218] to-[#FF7A00] hover:shadow-[0_4px_25px_rgba(196,18,24,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>{t("hero_cta_order")}</span>
              </Link>
              <a
                href="#spit-experience"
                className="px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-white border border-white/20 bg-white/5 hover:bg-white hover:text-[#0E0E0E] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>{t("hero_cta_explore")}</span>
              </a>
            </div>

            {/* Premium Stats Grid */}
            <div className="flex items-center justify-center lg:justify-start gap-8 border-t border-white/5 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-[#FFD400]">4.9★</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mt-1">
                  {t("stat_reviews")}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-[#FF7A00]">{t("stat_spices_val")}</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mt-1">
                  {t("stat_spices")}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-white">{t("stat_locations_val")}</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black mt-1">
                  {t("stat_locations")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Shawarma Rotisserie (Right) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* Parallax Rotating Block */}
            <div ref={shawarmaRef} className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Backglow ring */}
              <div className="absolute inset-0 bg-[#C41218]/15 rounded-full filter blur-3xl animate-pulse" />
              
              {/* Rotating Gold Accent Circle */}
              <div className="absolute w-[85%] h-[85%] border border-[#FFD400]/20 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[95%] h-[95%] border border-[#C41218]/10 rounded-full border-dashed animate-[spin_60s_linear_infinite_reverse]" />

              {/* Sizzling food image (Rotating effect via container) */}
              <div className="relative w-[75%] h-[75%] rounded-full overflow-hidden border-4 border-white/5 shadow-2xl shadow-[#C41218]/25 bg-black/40">
                <img
                  src="/assets/hero_shawarma.png"
                  alt="Sizzling Shawarma Wrap"
                  className="w-full h-full object-cover animate-[spin_120s_linear_infinite]"
                />
              </div>

              {/* Floating Spices (Cardamom, Sumac, Mint particles) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Mint particle */}
                <div className="absolute top-[10%] left-[20%] w-4 h-4 bg-green-500/30 rounded-full blur-[1px] animate-[bounce_3s_ease-in-out_infinite]" />
                {/* Sumac particle */}
                <div className="absolute bottom-[20%] left-[10%] w-3 h-3 bg-red-600/40 rounded-full blur-[1px] animate-[bounce_4s_ease-in-out_infinite_delay-1000]" />
                {/* Cardamom particle */}
                <div className="absolute top-[30%] right-[10%] w-3.5 h-3.5 bg-[#FFD400]/30 rounded-full blur-[1px] animate-[bounce_5s_ease-in-out_infinite_delay-2000]" />
                {/* Flavour spark */}
                <div className="absolute bottom-[15%] right-[25%] w-2 h-2 bg-[#FF7A00] rounded-full shadow-[0_0_10px_#FF7A00] animate-[ping_1.5s_infinite]" />
              </div>

              {/* Rising Smoke Particles */}
              <div className="smoke-container">
                <div className="smoke-particle p1" />
                <div className="smoke-particle p2" />
                <div className="smoke-particle p3" />
              </div>

              {/* Sparks Particles */}
              <div className="sparks-container">
                <div className="spark s1" />
                <div className="spark s2" />
                <div className="spark s3" />
                <div className="spark s4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Story ("The Legend of Kanz") */}
      <section ref={storyRef} id="story" className="py-24 bg-[#121212]/40 relative border-t border-white/5">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-black tracking-widest text-[#C41218] uppercase mb-2 block">
              {t("story_subtitle")}
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              {t("story_title")}
            </h2>
            <p className="max-w-[550px] mx-auto text-white/60 text-sm leading-relaxed">
              {t("story_desc")}
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-[#181818] p-10 rounded-2xl border border-white/5 hover:border-[#C41218]/30 hover:shadow-2xl hover:shadow-black transition-all duration-400 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-[circle_at_50%_0] from-[#C41218]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold mb-3 text-white group-hover:text-[#FFD400] transition-colors">{t("story_feat1_title")}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{t("story_feat1_desc")}</p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-[#181818] p-10 rounded-2xl border border-white/5 hover:border-[#C41218]/30 hover:shadow-2xl hover:shadow-black transition-all duration-400 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-[circle_at_50%_0] from-[#C41218]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold mb-3 text-white group-hover:text-[#FFD400] transition-colors">{t("story_feat2_title")}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{t("story_feat2_desc")}</p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-[#181818] p-10 rounded-2xl border border-white/5 hover:border-[#C41218]/30 hover:shadow-2xl hover:shadow-black transition-all duration-400 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial-[circle_at_50%_0] from-[#C41218]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-[#C41218]/10 text-[#C41218] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold mb-3 text-white group-hover:text-[#FFD400] transition-colors">{t("story_feat3_title")}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{t("story_feat3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Spit Experience Component */}
      <SpitExperience />

      {/* Testimonials Slider */}
      <section id="testimonials" className="py-24 bg-[#121212] border-t border-white/5">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-[#C41218] uppercase mb-2 block">
              {t("reviews_subtitle")}
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              {t("reviews_title")}
            </h2>
            <p className="max-w-[550px] mx-auto text-white/60 text-sm leading-relaxed">
              {t("reviews_desc")}
            </p>
          </div>

          {/* Testimonial slider structure */}
          <div className="max-w-[800px] mx-auto relative px-10">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-[#181818] p-8 md:p-14 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center shadow-2xl relative"
              >
                <div className="flex items-center gap-1 text-[#FFD400] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-base md:text-lg font-medium italic text-white/95 leading-relaxed mb-8 max-w-[640px]">
                  {reviews[activeReviewIndex].text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white font-extrabold flex items-center justify-center shadow-lg shadow-[#C41218]/10">
                    {reviews[activeReviewIndex].avatar}
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="text-sm font-bold text-white">{reviews[activeReviewIndex].name}</h4>
                    <span className="text-[10px] text-white/40 font-bold uppercase">{t(reviews[activeReviewIndex].titleKey)}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider arrows */}
            <button
              onClick={handlePrevReview}
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#C41218] hover:border-transparent flex items-center justify-center text-white transition-all duration-300 ${
                isRtl ? "right-[-15px]" : "left-[-15px]"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextReview}
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#C41218] hover:border-transparent flex items-center justify-center text-white transition-all duration-300 ${
                isRtl ? "left-[-15px]" : "right-[-15px]"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
