"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  TrendingUp, 
  ShoppingBag, 
  QrCode, 
  Smartphone, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Search,
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
            <h1 className="text-2xl md:text-4xl font-black uppercase">
              {locale === "en" ? "Kanz Command Center" : "إدارة المطعم والمبيعات"}
            </h1>
          </div>

          {/* Tab Navigation buttons */}
          <div className="flex flex-wrap gap-2 bg-[#181818] p-1 rounded-lg border border-white/5 self-start">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeTab === "dashboard" ? "bg-[#C41218] text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {locale === "en" ? "Dashboard" : "الإحصائيات"}
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all relative ${
                activeTab === "orders" ? "bg-[#C41218] text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {locale === "en" ? "Orders" : "الطلبات"}
              {orders.filter(o => o.status === "confirmed").length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FFD400]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeTab === "coupons" ? "bg-[#C41218] text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {locale === "en" ? "Coupons" : "الكوبونات"}
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeTab === "qr" ? "bg-[#C41218] text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {locale === "en" ? "QR Generator" : "رموز QR"}
            </button>
            <button
              onClick={() => setActiveTab("pwa")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeTab === "pwa" ? "bg-[#C41218] text-white" : "text-white/50 hover:text-white"
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
              <div className="bg-[#181818] border border-white/5 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/40">{locale === "en" ? "Total Revenue" : "إجمالي الإيرادات"}</span>
                  <h3 className="text-2xl font-black text-[#FFD400] mt-1">{totalRevenue.toFixed(2)} AED</h3>
                </div>
                <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-[#181818] border border-white/5 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/40">{locale === "en" ? "Total Bookings" : "إجمالي الطلبات"}</span>
                  <h3 className="text-2xl font-black text-white mt-1">{orders.length}</h3>
                </div>
                <div className="w-10 h-10 bg-[#C41218]/10 text-[#C41218] rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-[#181818] border border-white/5 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/40">{locale === "en" ? "Average Value" : "متوسط الطلب"}</span>
                  <h3 className="text-2xl font-black text-white mt-1">{avgOrder.toFixed(2)} AED</h3>
                </div>
                <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-[#181818] border border-white/5 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-white/40">{locale === "en" ? "Active Sessions" : "المستخدمين النشطين"}</span>
                  <h3 className="text-2xl font-black text-[#FF7A00] mt-1">42</h3>
                </div>
                <div className="w-10 h-10 bg-[#FF7A00]/10 text-[#FF7A00] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Split statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Orders by Delivery Type (Bar Chart) */}
              <div className="bg-[#181818] border border-white/5 p-5 rounded-xl lg:col-span-8 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{locale === "en" ? "Sales Breakdown by Channel" : "توزيع قنوات البيع"}</h3>
                
                <div className="space-y-3 pt-2">
                  {/* Delivery bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-white/70">
                      <span>{locale === "en" ? "Home Delivery" : "توصيل للمنازل"} ({deliveryCount})</span>
                      <span className="text-[#FFD400] font-black">{orders.length > 0 ? ((deliveryCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C41218] rounded-full" style={{ width: `${orders.length > 0 ? (deliveryCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>

                  {/* Dine-in bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-white/70">
                      <span>{locale === "en" ? "Dine-in QR Orders" : "طلبات الطاولات بالـ QR"} ({dineinCount})</span>
                      <span className="text-[#FFD400] font-black">{orders.length > 0 ? ((dineinCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFD400] rounded-full" style={{ width: `${orders.length > 0 ? (dineinCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>

                  {/* Takeaway bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-white/70">
                      <span>{locale === "en" ? "Takeaway Pickup" : "سفري واستلام"} ({takeawayCount})</span>
                      <span className="text-[#FFD400] font-black">{orders.length > 0 ? ((takeawayCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: `${orders.length > 0 ? (takeawayCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Hearth loads */}
              <div className="bg-[#181818] border border-white/5 p-5 rounded-xl lg:col-span-4 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{locale === "en" ? "Realtime Hearth Load" : "حالة مواقد الشواء"}</h3>
                <div className="space-y-2 pt-1 text-[11px]">
                  <div className="flex items-center justify-between p-2.5 bg-[#121212] rounded border border-white/5">
                    <span className="text-white/50">Spit Rotisserie 01</span>
                    <span className="text-green-500 font-bold">Active 380°C</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#121212] rounded border border-white/5">
                    <span className="text-white/50">Spit Rotisserie 02</span>
                    <span className="text-green-500 font-bold">Active 410°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Search filter */}
            <div className="relative">
              <input
                type="text"
                placeholder={locale === "en" ? "Search orders..." : "ابحث برقم الطلب، الاسم، أو الهاتف..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181818] border border-white/5 rounded-xl py-2.5 pl-9 pr-4 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C41218] placeholder-white/30"
              />
              <Search className="absolute top-3 left-3 w-4 h-4 text-white/30" />
            </div>

            {/* List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-[#181818] rounded-xl border border-white/5">
                <p className="text-xs text-white/40">
                  {locale === "en" ? "No orders found." : "لا توجد طلبات في قاعدة البيانات حالياً."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-[#181818] border border-white/5 rounded-xl p-5 space-y-4">
                    
                    {/* Order header details */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#FFD400]">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            order.deliveryType === "delivery" ? "bg-purple-500/10 text-purple-400" :
                            order.deliveryType === "takeaway" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
                          }`}>
                            {order.deliveryType}
                          </span>
                        </div>
                        <p className="text-[9px] text-white/40 mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>

                      {/* Interactive order status manager */}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-black text-white/30">{locale === "en" ? "Status" : "الحالة"}:</span>
                        <div className="flex gap-1">
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
                                className={`px-2 py-0.5 rounded text-[8px] font-black uppercase transition-colors ${
                                  isCurrent ? colors[status] : "bg-[#121212] text-white/30 hover:text-white"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed">
                      <div>
                        <h4 className="font-bold text-white/40 mb-0.5">{locale === "en" ? "Customer" : "العميل"}</h4>
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-white/50">{order.phone}</p>
                        <p className="text-white/30 line-clamp-1 mt-0.5">{order.address}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-white/40 mb-0.5">{locale === "en" ? "Items" : "الأطباق"}</h4>
                        <ul className="space-y-0.5">
                          {order.items.map((item: any, idx: number) => (
                            <li key={idx}>
                              {locale === "en" ? item.nameEn : item.nameAr} <span className="text-[#FFD400] font-black">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right flex flex-col justify-end">
                        <p className="text-white/40 text-[9px]">{locale === "en" ? "Subtotal" : "المجموع الفرعي"}: {order.subtotal.toFixed(2)} AED</p>
                        {order.discount > 0 && <p className="text-green-500 text-[9px]">{locale === "en" ? "Discount" : "الخصم"}: -{order.discount.toFixed(2)} AED</p>}
                        <p className="text-[9px] text-white/40">{locale === "en" ? "Taxes & Delivery" : "الضريبة والخدمة"}: {(order.tax + order.deliveryFee).toFixed(2)} AED</p>
                        <p className="text-xs font-black text-[#FFD400] mt-0.5">{locale === "en" ? "Total" : "المبلغ الكلي"}: {order.total.toFixed(2)} AED</p>
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
              <div key={coupon.code} className={`bg-[#181818] border p-5 rounded-xl flex flex-col justify-between h-36 ${coupon.active ? "border-white/5" : "border-white/5 opacity-40"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-black tracking-wider text-[#FFD400]">{coupon.code}</h4>
                    <p className="text-xs text-white/50 mt-1">{coupon.discount}% Off Menu</p>
                  </div>
                  <button
                    onClick={() => toggleCoupon(coupon.code)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      coupon.active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-[9px] text-white/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span>{coupon.active ? "Active" : "Disabled"}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QR Code Generator Tab Content */}
        {activeTab === "qr" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="bg-[#181818] border border-white/5 p-5 rounded-xl lg:col-span-7 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{locale === "en" ? "Create Table QR" : "توليد رمز QR"}</h3>
              <form onSubmit={handleGenerateQr} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-white/50 font-semibold">{locale === "en" ? "Table Number" : "رقم الطاولة"}</label>
                    <input
                      type="text"
                      value={qrTable}
                      onChange={(e) => setQrTable(e.target.value)}
                      placeholder="e.g. 5"
                      className="bg-[#121212] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C41218]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-white/50 font-semibold">{locale === "en" ? "Service Type" : "نوع الخدمة"}</label>
                    <select
                      value={qrType}
                      onChange={(e) => setQrType(e.target.value)}
                      className="bg-[#121212] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C41218]"
                    >
                      <option value="dinein">{locale === "en" ? "Dine-in (Table)" : "خدمة طاولات"}</option>
                      <option value="takeaway">{locale === "en" ? "Takeaway" : "استلام سفري"}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {locale === "en" ? "Generate QR" : "توليد الرمز"}
                </button>
              </form>
            </div>

            <div className="bg-[#181818] border border-white/5 p-5 rounded-xl lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4 min-h-[260px]">
              {showQr ? (
                <>
                  <div className="relative p-3 bg-white rounded-xl w-40 h-40 flex items-center justify-center shadow">
                    <div className="absolute top-3 left-3 w-8 h-8 border-4 border-black" />
                    <div className="absolute top-3 right-3 w-8 h-8 border-4 border-black" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-4 border-black" />
                    
                    <div 
                      className="w-28 h-28 opacity-75"
                      style={{
                        backgroundImage: "radial-gradient(circle, #000000 2px, transparent 2px)",
                        backgroundSize: "7px 7px"
                      }}
                    />

                    <div className="absolute w-10 h-10 bg-white p-1 rounded-full shadow flex items-center justify-center border border-black/10">
                      <img src="/assets/logo.png" alt="Brand Logo" className="w-8 h-8 object-contain" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#FFD400]">Table {qrTable} QR Active</h4>
                    <p className="text-[9px] text-white/40 mt-0.5 truncate max-w-[180px]">{generatedUrl}</p>
                    <a
                      href={generatedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#C41218] font-bold mt-2 hover:underline"
                    >
                      <span>Test QR Link</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-white/30 text-[11px]">
                  <p>{locale === "en" ? "Configure fields to review QR output" : "يرجى تعبئة الحقول لتوليد الرمز المخصص"}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PWA Settings Content */}
        {activeTab === "pwa" && (
          <div className="bg-[#181818] border border-white/5 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#FFD400]" />
              <span>Mobile Application (PWA) Core Registry</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-[#121212] rounded border border-white/5">
                  <div>
                    <h5 className="font-bold">Offline Shell Pre-Caching</h5>
                    <p className="text-[9px] text-white/40 mt-0.5">Asset cache registered via Service Worker</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-bold text-[8px]">Enabled</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-[#121212] rounded border border-white/5">
                  <div>
                    <h5 className="font-bold">Standalone UI Mode</h5>
                    <p className="text-[9px] text-white/40 mt-0.5">Launches without native browser URL bars</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-bold text-[8px]">Active</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-[#121212] rounded border border-white/5">
                  <div>
                    <h5 className="font-bold">Push Notifications Endpoint</h5>
                    <p className="text-[9px] text-white/40 mt-0.5">FCM mock listeners for dispatching fire alert deals</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold text-[8px]">Standby</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-[#121212] rounded border border-white/5">
                  <div>
                    <h5 className="font-bold">App Icon Assets</h5>
                    <p className="text-[9px] text-white/40 mt-0.5">Maskable branding PNG verified</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-bold text-[8px]">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
