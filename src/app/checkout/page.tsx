"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, CreditCard, Landmark, ShieldCheck, Flame, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { t, locale, isRtl } = useLanguage();
  const { 
    cart, 
    deliveryFee, 
    deliveryType, 
    discountPercent, 
    couponCode,
    placeOrder 
  } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Map pin coordinate simulations
  const [pinX, setPinX] = useState(150);
  const [pinY, setPinY] = useState(120);
  const mapRef = useRef<HTMLDivElement>(null);

  // Totals calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.14;
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal + tax + deliveryFee - discount;

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/menu");
    }
  }, [cart, router]);

  // Handle simulated map click
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPinX(x);
    setPinY(y);

    // Mock address text based on coordinates clicked
    const districts = [
      "Heliopolis District", 
      "Nasr City Area", 
      "New Cairo Block 5", 
      "Downtown Plaza Complex", 
      "Maadi Green Suburbs", 
      "Zamalek Island Boulevard"
    ];
    const selectedDistrict = districts[Math.floor((x + y) % districts.length)];
    const mockAddr = `${locale === "en" ? "Street" : "شارع"} ${Math.floor(y / 5 + 1)}, ${selectedDistrict}, Cairo (GPS: ${((30.0 + y/1000).toFixed(4))}°N, ${((31.2 + x/1000).toFixed(4))}°E)`;
    setAddress(mockAddr);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert(locale === "en" ? "Please fill in your Name and Phone Number!" : "يرجى ملء الاسم ورقم الهاتف!");
      return;
    }
    if (deliveryType === "delivery" && !address) {
      alert(locale === "en" ? "Please choose your address on the map!" : "يرجى تحديد عنوان التوصيل من الخريطة!");
      return;
    }
    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
      alert(locale === "en" ? "Please fill in all credit card details!" : "يرجى إدخال تفاصيل بطاقة الائتمان كاملة!");
      return;
    }

    placeOrder({
      customerName,
      phone,
      address,
      notes,
      paymentMethod,
    });
  };

  if (cart.length === 0) return null;

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* Back Link */}
        <Link href="/menu" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-[#FFD400] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "en" ? "Back to Feast Menu" : "العودة لقائمة الطعام"}</span>
        </Link>

        {/* Title */}
        <div className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-1 block">
            {locale === "en" ? "Confirm Order" : "تأكيد الطلب"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase">
            {locale === "en" ? "Complete Your Feast" : "إتمام وليمتك"}
          </h1>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form & Address Map */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Customer info card */}
            <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-[#FFD400]">
                {locale === "en" ? "1. Customer Details" : "١. البيانات الشخصية"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/60 font-semibold">{locale === "en" ? "Name" : "الاسم"}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={locale === "en" ? "Enter your full name" : "أدخل اسمك الكامل"}
                    className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C41218]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/60 font-semibold">{locale === "en" ? "Phone Number" : "رقم الهاتف"}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={locale === "en" ? "e.g. +20 100 000 0000" : "مثال: ٠١٠٠٠٠٠٠٠٠٠"}
                    className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C41218]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-xs text-white/60 font-semibold">{locale === "en" ? "Order Notes / Special Requests" : "ملاحظات خاصة"}</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={locale === "en" ? "Any special kitchen instructions (e.g. extra garlic, no onions)..." : "أي تعليمات خاصة للمطبخ..."}
                  className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C41218] min-h-[80px]"
                />
              </div>
            </div>

            {/* Address Selection (Map Simulation) */}
            {deliveryType === "delivery" && (
              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-[#FFD400] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C41218]" />
                  <span>{locale === "en" ? "2. Delivery Location (Map)" : "٢. تحديد عنوان التوصيل"}</span>
                </h3>
                <p className="text-xs text-white/60">
                  {locale === "en" ? "Click or tap on the map to place your delivery pin. The system will auto-calculate the address." : "انقر على الخريطة لتحديد موقعك بدقة. سيقوم النظام بحساب العنوان تلقائياً."}
                </p>

                {/* Simulated Google Map */}
                <div 
                  ref={mapRef}
                  onClick={handleMapClick}
                  className="relative h-60 bg-[#121212] rounded-xl border border-white/5 overflow-hidden cursor-crosshair group shadow-inner"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                >
                  {/* Grid Lines resembling streets */}
                  <div className="absolute inset-x-0 top-1/4 h-[3px] bg-white/5" />
                  <div className="absolute inset-x-0 top-2/3 h-[4px] bg-white/5" />
                  <div className="absolute inset-y-0 left-1/3 w-[3px] bg-white/5" />
                  <div className="absolute inset-y-0 left-3/4 w-[4px] bg-white/5" />
                  
                  {/* Diagonal park styling */}
                  <div className="absolute top-1/2 left-10 w-24 h-16 bg-green-950/20 rounded-full blur-md" />
                  <div className="absolute top-8 right-16 w-32 h-20 bg-amber-950/15 rounded-xl blur-lg" />
                  
                  {/* Glowing Nile River mock line */}
                  <div className="absolute -left-10 bottom-6 w-[120%] h-12 bg-sky-950/20 border-y border-sky-800/10 rotate-[-10deg]" />

                  {/* Pulsing Pin */}
                  <div 
                    className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none"
                    style={{ left: pinX, top: pinY }}
                  >
                    <div className="relative">
                      <MapPin className="w-8 h-8 text-[#C41218] fill-black/40 filter drop-shadow-lg animate-[bounce_1s_infinite]" />
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/40 rounded-full blur-[2px]" />
                    </div>
                  </div>

                  <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/75 border border-white/5 text-[9px] text-white/50 tracking-wider">
                    {locale === "en" ? "SHAWARMA B KANZ MAP V2.0" : "خارطة شاورما بي كانز"}
                  </span>
                </div>

                {/* Display Address Text */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs text-white/60 font-semibold">{locale === "en" ? "Selected Address" : "العنوان المحدد"}</label>
                  <input
                    type="text"
                    readOnly
                    value={address}
                    placeholder={locale === "en" ? "Tap on the map above to select your address" : "انقر على الخريطة أعلاه لتحديد عنوانك"}
                    className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-xs text-[#FFD400] font-bold focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Payment Portal */}
            <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-[#FFD400]">
                {locale === "en" ? "3. Choose Payment Method" : "٣. طريقة الدفع"}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-xs font-bold gap-2 transition-all duration-300 ${
                    paymentMethod === "cash"
                      ? "border-[#C41218] bg-[#C41218]/5 text-white"
                      : "border-white/5 bg-[#121212] text-white/60 hover:border-white/20"
                  }`}
                >
                  <Landmark className="w-5 h-5" />
                  <span>{locale === "en" ? "Cash On Delivery" : "الدفع عند الاستلام"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-xs font-bold gap-2 transition-all duration-300 ${
                    paymentMethod === "card"
                      ? "border-[#C41218] bg-[#C41218]/5 text-white"
                      : "border-white/5 bg-[#121212] text-white/60 hover:border-white/20"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{locale === "en" ? "Pay with Card" : "الدفع بالبطاقة"}</span>
                </button>
              </div>

              {/* Card inputs (if selected) */}
              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-4 space-y-4 border-t border-white/5"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black tracking-wider">{locale === "en" ? "Cardholder Number" : "رقم البطاقة"}</label>
                      <input
                        type="text"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="4000 1234 5678 9010"
                        className="bg-[#121212] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C41218]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-white/50 uppercase font-black tracking-wider">{locale === "en" ? "Expiry Date" : "تاريخ الانتهاء"}</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="bg-[#121212] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C41218] text-center"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-white/50 uppercase font-black tracking-wider">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          placeholder="***"
                          className="bg-[#121212] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C41218] text-center"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wallet mockups */}
              <div className="flex justify-center gap-4 pt-4 border-t border-white/5 text-[10px] text-white/40">
                <span className="flex items-center gap-1">
                  🍎 Apple Pay Ready
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  🤖 Google Pay Ready
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl space-y-6 sticky top-28">
              <h3 className="text-base font-bold text-[#FFFFFF]">
                {locale === "en" ? "Order Summary" : "ملخص الطلب"}
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                {cart.map((item) => {
                  const name = locale === "en" ? item.nameEn : item.nameAr;
                  const size = locale === "en" ? item.sizeNameEn : item.sizeNameAr;
                  const addons = item.addons.map(a => locale === "en" ? a.labelEn : a.labelAr).join(", ");
                  return (
                    <div key={item.cartId} className="flex gap-3 justify-between items-start text-xs border-b border-white/5 pb-3">
                      <div>
                        <h4 className="font-bold text-white/90">{name} <span className="text-[#FFD400]">x{item.quantity}</span></h4>
                        <p className="text-[10px] text-white/40 mt-0.5">{size} {addons ? `| +${addons}` : ""}</p>
                      </div>
                      <span className="font-black text-[#FFD400]">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Pricing Math */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>{locale === "en" ? "Subtotal" : "المجموع الفرعي"}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>{locale === "en" ? "Tax (14%)" : "الضريبة (١٤٪)"}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {deliveryType === "delivery" && (
                  <div className="flex justify-between text-white/60">
                    <span>{locale === "en" ? "Delivery Fee" : "رسوم التوصيل"}</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {couponCode && (
                  <div className="flex justify-between text-green-500 font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-4 border-t border-white/5">
                  <span>{locale === "en" ? "Grand Total" : "المجموع الكلي"}</span>
                  <span className="text-[#FFD400] text-lg font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white font-black text-xs uppercase tracking-wider text-center hover:shadow-[0_4px_25px_rgba(196,18,24,0.35)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Flame className="w-4 h-4" />
                <span>{locale === "en" ? "Authorize & Rotate on Spit" : "تأكيد الطلب وبدء التحمير"}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/30 pt-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>SSL Encrypted Checkout Core</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
