"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  TrendingUp, 
  ShoppingBag, 
  Percent, 
  QrCode, 
  Smartphone, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Check,
  Power
} from "lucide-react";

export default function AdminPage() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "coupons" | "qr" | "pwa">("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load orders on mount
  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem("kanz_orders") || "[]");
    setOrders(loaded);
  }, []);

  // Update order status
  const handleUpdateStatus = (orderId: string, nextStatus: string) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o);
    setOrders(updated);
    localStorage.setItem("kanz_orders", JSON.stringify(updated));
  };

  // QR Code generator state
  const [qrTable, setQrTable] = useState("12");
  const [qrType, setQrType] = useState("dinein");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [showQr, setShowQr] = useState(false);

  const handleGenerateQr = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/menu?table=${qrTable}&type=${qrType}`;
    setGeneratedUrl(url);
    setShowQr(true);
  };

  // Coupon Manager state
  const [coupons, setCoupons] = useState([
    { code: "KANZFEST", discount: 20, active: true },
    { code: "WELCOME10", discount: 10, active: true },
    { code: "FREEFEED", discount: 100, active: true }
  ]);

  const toggleCoupon = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  // Stats calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;
  const deliveryCount = orders.filter(o => o.deliveryType === "delivery").length;
  const dineinCount = orders.filter(o => o.deliveryType === "dinein").length;
  const takeawayCount = orders.filter(o => o.deliveryType === "takeaway").length;

  // Filtered orders
  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.phone.includes(searchQuery)
  );

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] pt-28 pb-20 min-h-screen">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-1 block">
              {locale === "en" ? "Management Suite" : "لوحة التحكم"}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase">
              {locale === "en" ? "Kanz Command Center" : "إدارة المطعم والمبيعات"}
            </h1>
          </div>

          {/* Tab Navigation buttons */}
          <div className="flex flex-wrap gap-2 bg-[#181818] p-1.5 rounded-xl border border-white/5 self-start">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "dashboard" ? "bg-[#C41218] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {locale === "en" ? "Dashboard" : "الإحصائيات"}
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all relative ${
                activeTab === "orders" ? "bg-[#C41218] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {locale === "en" ? "Orders" : "الطلبات"}
              {orders.filter(o => o.status === "confirmed").length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFD400] animate-ping" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "coupons" ? "bg-[#C41218] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {locale === "en" ? "Coupons" : "الكوبونات"}
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "qr" ? "bg-[#C41218] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {locale === "en" ? "QR Generator" : "رموز QR"}
            </button>
            <button
              onClick={() => setActiveTab("pwa")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "pwa" ? "bg-[#C41218] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              PWA
            </button>
          </div>
        </div>

        {/* Dashboard Tab Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/50">{locale === "en" ? "Total Revenue" : "إجمالي الإيرادات"}</span>
                  <h3 className="text-3xl font-black text-[#FFD400] mt-1">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/50">{locale === "en" ? "Total Bookings" : "إجمالي الطلبات"}</span>
                  <h3 className="text-3xl font-black text-white mt-1">{orders.length}</h3>
                </div>
                <div className="w-12 h-12 bg-[#C41218]/10 text-[#C41218] rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/50">{locale === "en" ? "Average Value" : "متوسط الطلب"}</span>
                  <h3 className="text-3xl font-black text-white mt-1">${avgOrder.toFixed(2)}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/50">{locale === "en" ? "Active Sessions" : "المستخدمين النشطين"}</span>
                  <h3 className="text-3xl font-black text-[#FF7A00] mt-1">42</h3>
                </div>
                <div className="w-12 h-12 bg-[#FF7A00]/10 text-[#FF7A00] rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Split statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Orders by Delivery Type (Bar Chart) */}
              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl lg:col-span-8 space-y-6">
                <h3 className="text-base font-bold text-white">{locale === "en" ? "Sales Breakdown by Channel" : "توزيع قنوات البيع"}</h3>
                
                <div className="space-y-4 pt-2">
                  {/* Delivery bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{locale === "en" ? "Home Delivery" : "توصيل للمنازل"} ({deliveryCount})</span>
                      <span className="text-[#FFD400] font-black">{orders.length > 0 ? ((deliveryCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#121212] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C41218] rounded-full" style={{ width: `${orders.length > 0 ? (deliveryCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>

                  {/* Dine-in bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{locale === "en" ? "Dine-in QR Orders" : "طلبات الطاولات بالـ QR"} ({dineinCount})</span>
                      <span className="text-[#FFD400] font-black">{orders.length > 0 ? ((dineinCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#121212] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFD400] rounded-full" style={{ width: `${orders.length > 0 ? (dineinCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>

                  {/* Takeaway bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{locale === "en" ? "Takeaway Pickup" : "سفري واستلام"} ({takeawayCount})</span>
                      <span className="text-[#FFD400] font-black">{orders.length > 0 ? ((takeawayCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#121212] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: `${orders.length > 0 ? (takeawayCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Mock status overview */}
              <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl lg:col-span-4 space-y-4">
                <h3 className="text-base font-bold text-white">{locale === "en" ? "Realtime Hearth Load" : "حالة مواقد الشواء"}</h3>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs p-3 bg-[#121212] rounded-xl border border-white/5">
                    <span className="text-white/60">Spit Rotisserie 01 (Beef)</span>
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-bold text-[9px] uppercase">Active 380°C</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-3 bg-[#121212] rounded-xl border border-white/5">
                    <span className="text-white/60">Spit Rotisserie 02 (Chicken)</span>
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-bold text-[9px] uppercase">Active 410°C</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-3 bg-[#121212] rounded-xl border border-white/5">
                    <span className="text-white/60">Saj Dome Temperature</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold text-[9px] uppercase">Standby 195°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Search filter */}
            <div className="relative">
              <input
                type="text"
                placeholder={locale === "en" ? "Search orders by ID, name, or phone..." : "ابحث برقم الطلب، الاسم، أو الهاتف..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181818] border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C41218] placeholder-white/30"
              />
              <Search className="absolute top-4 left-4 w-4 h-4 text-white/30" />
            </div>

            {/* List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-[#181818] rounded-2xl border border-white/5">
                <span className="text-4xl block mb-4">📦</span>
                <p className="text-xs text-white/50">
                  {locale === "en" ? "No orders found in database." : "لا توجد طلبات في قاعدة البيانات حالياً."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-[#181818] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-white/10 transition-all">
                    
                    {/* Order header details */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-[#FFD400]">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            order.deliveryType === "delivery" ? "bg-purple-500/10 text-purple-400" :
                            order.deliveryType === "takeaway" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                          }`}>
                            {order.deliveryType}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/40 mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>

                      {/* Interactive order status manager */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-black text-white/40">{locale === "en" ? "Order Status" : "الحالة"}:</span>
                        <div className="flex gap-1.5">
                          {(["confirmed", "preparing", "delivering", "completed"] as const).map((status) => {
                            const isCurrent = order.status === status;
                            const colors = {
                              confirmed: "bg-amber-500 text-black",
                              preparing: "bg-[#FF7A00] text-white",
                              delivering: "bg-[#C41218] text-white",
                              completed: "bg-green-600 text-white"
                            };
                            return (
                              <button
                                key={status}
                                onClick={() => handleUpdateStatus(order.id, status)}
                                className={`px-2.5 py-1 rounded text-[9px] font-black uppercase transition-all ${
                                  isCurrent ? colors[status] : "bg-[#121212] text-white/40 hover:text-white"
                                }`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Customer & Items */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                      <div>
                        <h4 className="font-bold text-white/60 mb-1">{locale === "en" ? "Customer Details" : "بيانات العميل"}</h4>
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-white/60">{order.phone}</p>
                        <p className="text-white/40 mt-1 line-clamp-1">{order.address}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-white/60 mb-1">{locale === "en" ? "Items Ordered" : "الأطباق المطلوبة"}</h4>
                        <ul className="space-y-1">
                          {order.items.map((item: any, idx: number) => (
                            <li key={idx}>
                              {locale === "en" ? item.nameEn : item.nameAr} <span className="text-[#FFD400] font-black">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right flex flex-col justify-end">
                        <p className="text-white/50 text-[10px]">{locale === "en" ? "Subtotal" : "المجموع الفرعي"}: ${order.subtotal.toFixed(2)}</p>
                        {order.discount > 0 && <p className="text-green-500 text-[10px]">{locale === "en" ? "Discount" : "الخصم"}: -${order.discount.toFixed(2)}</p>}
                        <p className="text-[10px] text-white/50">{locale === "en" ? "Taxes & Delivery" : "الضريبة والخدمة"}: ${(order.tax + order.deliveryFee).toFixed(2)}</p>
                        <p className="text-sm font-black text-[#FFD400] mt-1">{locale === "en" ? "Total Paid" : "المبلغ الكلي"}: ${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Coupons Tab Content */}
        {activeTab === "coupons" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <div key={coupon.code} className={`bg-[#181818] border p-6 rounded-2xl flex flex-col justify-between h-44 ${coupon.active ? "border-white/5" : "border-white/5 opacity-50"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-black tracking-wider text-[#FFD400]">{coupon.code}</h4>
                    <p className="text-xs text-white/60 mt-1">{coupon.discount}% Off Entire Menu</p>
                  </div>
                  <button
                    onClick={() => toggleCoupon(coupon.code)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      coupon.active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-[10px] text-white/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span>{coupon.active ? "Ready for checkout usage" : "Disabled by administrator"}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QR Code Generator Tab Content */}
        {activeTab === "qr" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Generator Form */}
            <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl lg:col-span-7 space-y-6">
              <h3 className="text-base font-bold text-white">{locale === "en" ? "Create Dine-in QR Menu" : "توليد رمز QR للطاولة"}</h3>
              <form onSubmit={handleGenerateQr} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/60 font-semibold">{locale === "en" ? "Table Number" : "رقم الطاولة"}</label>
                    <input
                      type="text"
                      value={qrTable}
                      onChange={(e) => setQrTable(e.target.value)}
                      placeholder="e.g. 5, 12, Bar"
                      className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C41218]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/60 font-semibold">{locale === "en" ? "Service Type" : "نوع الخدمة"}</label>
                    <select
                      value={qrType}
                      onChange={(e) => setQrType(e.target.value)}
                      className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C41218]"
                    >
                      <option value="dinein">{locale === "en" ? "Dine-in (Table Service)" : "خدمة طاولات داخلية"}</option>
                      <option value="takeaway">{locale === "en" ? "Takeaway (Counter Call)" : "استلام سفري"}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C41218] to-[#FF7A00] text-white text-xs font-black uppercase tracking-wider hover:shadow-[0_4px_15px_rgba(196,18,24,0.3)] transition-all"
                >
                  {locale === "en" ? "Generate Table QR Code" : "توليد الرمز"}
                </button>
              </form>
            </div>

            {/* Generated QR View */}
            <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
              {showQr ? (
                <>
                  {/* Mock Premium QR Code */}
                  <div className="relative p-4 bg-white rounded-2xl w-48 h-48 flex items-center justify-center shadow-lg">
                    {/* Outer squares representing QR standard markings */}
                    <div className="absolute top-4 left-4 w-10 h-10 border-4 border-black" />
                    <div className="absolute top-4 right-4 w-10 h-10 border-4 border-black" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border-4 border-black" />
                    
                    {/* Simulated dot patterns using grid */}
                    <div 
                      className="w-36 h-36 opacity-75"
                      style={{
                        backgroundImage: "radial-gradient(circle, #000000 2px, transparent 2px)",
                        backgroundSize: "8px 8px"
                      }}
                    />

                    {/* Logo inside QR Center */}
                    <div className="absolute w-12 h-12 bg-white p-1 rounded-full shadow-md flex items-center justify-center border border-black/10">
                      <img src="/assets/logo.png" alt="QR Center Brand Logo" className="w-10 h-10 object-contain" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#FFD400]">Table {qrTable} QR Active</h4>
                    <p className="text-[10px] text-white/50 max-w-[200px] mt-1 truncate">{generatedUrl}</p>
                    <a
                      href={generatedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#C41218] font-bold mt-3 hover:underline"
                    >
                      <span>Test QR Link</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-white/40 text-xs flex flex-col items-center gap-3">
                  <QrCode className="w-12 h-12 text-white/20" />
                  <p>{locale === "en" ? "Configure table fields on the left to review QR output" : "يرجى تعبئة الحقول لتوليد الرمز المخصص"}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PWA Settings Content */}
        {activeTab === "pwa" && (
          <div className="bg-[#181818] border border-white/5 p-6 rounded-2xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#FFD400]" />
              <span>Mobile Application (PWA) Core Registry</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#121212] rounded-xl border border-white/5">
                  <div>
                    <h5 className="font-bold">Offline Shell Pre-Caching</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Asset cache registered via Service Worker (/sw.js)</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-black text-[9px]">Enabled</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-[#121212] rounded-xl border border-white/5">
                  <div>
                    <h5 className="font-bold">Standalone UI Mode</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Launches without native browser UI/Address bar</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-black text-[9px]">Active</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#121212] rounded-xl border border-white/5">
                  <div>
                    <h5 className="font-bold">Push Notifications Endpoint</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">FCM mock listeners for dispatching fire alert deals</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-black text-[9px]">Standby</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-[#121212] rounded-xl border border-white/5">
                  <div>
                    <h5 className="font-bold">App Icon Assets</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Centered centered maskable branding PNG (192x192, 512x512)</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-black text-[9px]">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
