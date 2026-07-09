"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, CreditCard, Landmark, ShieldCheck, Flame, ArrowLeft } from "lucide-react";
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
      router.push("/");
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
    <div className="bg-[#F5F6F8] text-[#1A1A1A] pt-28 pb-20 min-h-screen">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-[#C41218] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "en" ? "Back to Feast Menu" : "العودة لقائمة الطعام"}</span>
        </Link>

        {/* Title */}
        <div className="mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-1 block">
            {locale === "en" ? "Confirm Order" : "تأكيد الطلب"}
          </span>
          <h1 className="text-2xl md:text-4xl font-black uppercase text-neutral-800">
            {locale === "en" ? "Complete Your Feast" : "إتمام وليمتك"}
          </h1>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form & Address Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer info card */}
            <div className="bg-white border border-neutral-200/60 p-5 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-[#C41218]">
                {locale === "en" ? "1. Customer Details" : "١. البيانات الشخصية"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold">{locale === "en" ? "Name" : "الاسم"}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={locale === "en" ? "Enter your name" : "أدخل اسمك"}
                    className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold">{locale === "en" ? "Phone" : "الهاتف"}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={locale === "en" ? "+20 100..." : "٠١٠٠..."}
                    className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-[10px] text-neutral-400 uppercase font-bold">{locale === "en" ? "Notes" : "تعليمات خاصة"}</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={locale === "en" ? "Kitchen instructions..." : "تعليمات خاصة للمطبخ..."}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218] min-h-[60px]"
                />
              </div>
            </div>

            {/* Address Selection (Map Simulation) */}
            {deliveryType === "delivery" && (
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-[#C41218] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C41218]" />
                  <span>{locale === "en" ? "2. Delivery Location" : "٢. عنوان التوصيل"}</span>
                </h3>
                
                {/* Simulated Google Map */}
                <div 
                  ref={mapRef}
                  onClick={handleMapClick}
                  className="relative h-56 bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden cursor-crosshair group shadow-inner"
                  style={{
                    backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 top-1/3 h-[2px] bg-neutral-200" />
                  <div className="absolute inset-y-0 left-1/2 w-[2px] bg-neutral-200" />

                  {/* Pulsing Pin */}
                  <div 
                    className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
                    style={{ left: pinX, top: pinY }}
                  >
                    <MapPin className="w-7 h-7 text-[#C41218] fill-[#C41218]/10" />
                  </div>

                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-white/80 border border-neutral-200 text-[8px] text-neutral-400 font-bold">
                    GPS TARGETING ACTIVE
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 pt-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold">{locale === "en" ? "Address Text" : "العنوان بالتفصيل"}</label>
                  <input
                    type="text"
                    readOnly
                    value={address}
                    placeholder={locale === "en" ? "Tap on the map above to select your address" : "انقر على الخريطة أعلاه لتحديد عنوانك"}
                    className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-[#C41218] font-bold focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Payment Portal */}
            <div className="bg-white border border-neutral-200/60 p-5 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-[#C41218]">
                {locale === "en" ? "3. Choose Payment Method" : "٣. طريقة الدفع"}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold gap-1.5 transition-colors ${
                    paymentMethod === "cash"
                      ? "border-[#C41218] bg-[#C41218]/5 text-[#C41218]"
                      : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>{locale === "en" ? "Cash On Delivery" : "الدفع عند الاستلام"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-bold gap-1.5 transition-colors ${
                    paymentMethod === "card"
                      ? "border-[#C41218] bg-[#C41218]/5 text-[#C41218]"
                      : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{locale === "en" ? "Pay with Card" : "الدفع بالبطاقة"}</span>
                </button>
              </div>

              {/* Card inputs */}
              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-3 space-y-3 border-t border-neutral-200"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-neutral-400 uppercase font-black">{locale === "en" ? "Card Number" : "رقم البطاقة"}</label>
                      <input
                        type="text"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="4000 1234 5678 9010"
                        className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-neutral-400 uppercase font-black">Expiry</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-xs text-neutral-850 focus:outline-none focus:border-[#C41218] text-center"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-neutral-400 uppercase font-black">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          placeholder="***"
                          className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-xs text-neutral-850 focus:outline-none focus:border-[#C41218] text-center"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-neutral-200/60 p-5 rounded-xl space-y-5 sticky top-24 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-800">
                {locale === "en" ? "Order Summary" : "ملخص الطلب"}
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-[200px] overflow-y-auto scrollbar-none pr-1">
                {cart.map((item) => {
                  const name = locale === "en" ? item.nameEn : item.nameAr;
                  const size = locale === "en" ? item.sizeNameEn : item.sizeNameAr;
                  const addons = item.addons.map(a => locale === "en" ? a.labelEn : a.labelAr).join(", ");
                  return (
                    <div key={item.cartId} className="flex gap-2 justify-between items-start text-xs border-b border-neutral-100 pb-2">
                      <div>
                        <h4 className="font-bold text-neutral-800">{name} <span className="text-[#C41218]">x{item.quantity}</span></h4>
                        <p className="text-[10px] text-neutral-400 mt-0.5">{size} {addons ? `| +${addons}` : ""}</p>
                      </div>
                      <span className="font-black text-[#C41218]">
                        {(item.unitPrice * item.quantity).toFixed(2)} {locale === "en" ? "AED" : "درهم"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pricing Math */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>{locale === "en" ? "Subtotal" : "المجموع الفرعي"}</span>
                  <span>{subtotal.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>{locale === "en" ? "Tax (14%)" : "الضريبة (١٤٪)"}</span>
                  <span>{tax.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                </div>
                {deliveryType === "delivery" && (
                  <div className="flex justify-between text-neutral-500">
                    <span>{locale === "en" ? "Delivery Fee" : "رسوم التوصيل"}</span>
                    <span>{deliveryFee.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                  </div>
                )}
                {couponCode && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{discount.toFixed(2)} {locale === "en" ? "AED" : "درهم"}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-neutral-800 pt-3 border-t border-neutral-200">
                  <span>{locale === "en" ? "Grand Total" : "المجموع الكلي"}</span>
                  <span className="text-[#C41218] text-base font-black">
                    {total.toFixed(2)} {locale === "en" ? "AED" : "درهم"}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 transform active:scale-95 shadow-md shadow-[#C41218]/10"
              >
                <Flame className="w-4 h-4" />
                <span>{locale === "en" ? "Place Order" : "تأكيد وإرسال الطلب"}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-neutral-450 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>Secure Checkout Encryption</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
