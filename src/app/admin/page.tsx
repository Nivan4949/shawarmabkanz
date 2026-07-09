"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, MenuItem } from "@/context/CartContext";
import { 
  TrendingUp, 
  ShoppingBag, 
  Smartphone, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Power,
  ShieldAlert,
  Lock,
  Image,
  Upload,
  RefreshCw
} from "lucide-react";

export default function AdminPage() {
  const { locale } = useLanguage();
  const { 
    dbMenuItems, 
    updateProductImage, 
    resetProductImage 
  } = useCart();

  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "coupons" | "products" | "qr" | "pwa">("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Check login flag on mount
  useEffect(() => {
    const flag = sessionStorage.getItem("kanz_admin_logged");
    if (flag === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "kanz2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("kanz_admin_logged", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("kanz_admin_logged");
    setPasswordInput("");
  };

  // Load orders on mount
  useEffect(() => {
    if (isAuthenticated) {
      const loaded = JSON.parse(localStorage.getItem("kanz_orders") || "[]");
      setOrders(loaded);
    }
  }, [isAuthenticated]);

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

  // Base64 Image Upload handler
  const handleImageUpload = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        updateProductImage(productId, reader.result);
      }
    };
    reader.readAsDataURL(file);
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

  // Filtered products for manager
  const filteredProducts = dbMenuItems.filter((item) => {
    const matchesCategory = productCategoryFilter === "all" || item.category === productCategoryFilter;
    const name = locale === "en" ? item.nameEn : item.nameAr;
    const matchesSearch = name.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", labelEn: "All", labelAr: "الكل" },
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

  // Render Login Card if not logged in
  if (!isAuthenticated) {
    return (
      <div className="bg-[#F5F6F8] text-[#1A1A1A] min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-[380px] bg-white border border-neutral-200/60 rounded-xl p-6 shadow-2xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#C41218]/5 text-[#C41218] border border-[#C41218]/15 flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-lg font-black uppercase tracking-wide text-neutral-800">
              {locale === "en" ? "Kanz Command Suite" : "لوحة تحكم كنز"}
            </h1>
            <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest">
              {locale === "en" ? "Restricted Area passcode needed" : "منطقة محظورة تتطلب كلمة مرور"}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5 text-left rtl:text-right">
              <label className="text-[9px] text-neutral-400 uppercase font-black tracking-wider">
                {locale === "en" ? "Security Key" : "مفتاح الأمان"}
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-850 focus:outline-none focus:border-[#C41218] text-center font-mono"
              />
            </div>

            {loginError && (
              <p className="text-[10px] text-red-650 font-bold flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{locale === "en" ? "Incorrect key!" : "مفتاح الأمان غير صحيح!"}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-[#C41218]/10"
            >
              {locale === "en" ? "Unlock Console" : "فتح لوحة التحكم"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F8] text-[#1A1A1A] pt-28 pb-20 min-h-screen">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#C41218] mb-1 block">
              {locale === "en" ? "Management Suite" : "لوحة التحكم"}
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase text-neutral-800">
              {locale === "en" ? "Kanz Command Center" : "إدارة المطعم والمبيعات"}
            </h1>
          </div>

          {/* Tab Navigation buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-neutral-200/60 self-start">
            {(["dashboard", "orders", "products", "coupons", "qr", "pwa"] as const).map(tab => {
              const isActive = activeTab === tab;
              const labels = {
                dashboard: locale === "en" ? "Stats" : "الإحصائيات",
                orders: locale === "en" ? "Orders" : "الطلبات",
                products: locale === "en" ? "Products" : "الأصناف",
                coupons: locale === "en" ? "Coupons" : "الكوبونات",
                qr: locale === "en" ? "QR Table" : "رموز QR",
                pwa: "PWA",
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all relative ${
                    isActive ? "bg-[#C41218] text-white" : "text-neutral-500 hover:text-neutral-850"
                  }`}
                >
                  {labels[tab]}
                  {tab === "orders" && orders.filter(o => o.status === "confirmed").length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                  )}
                </button>
              );
            })}
            
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded bg-neutral-100 text-red-650 hover:bg-[#C41218] hover:text-white transition-colors"
              title="Lock Admin Console"
            >
              <Power className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Tab Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-black text-neutral-400">{locale === "en" ? "Total Revenue" : "إجمالي الإيرادات"}</span>
                  <h3 className="text-2xl font-black text-[#C41218] mt-1">{totalRevenue.toFixed(2)} AED</h3>
                </div>
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-black text-neutral-400">{locale === "en" ? "Total Bookings" : "إجمالي الطلبات"}</span>
                  <h3 className="text-2xl font-black text-neutral-800 mt-1">{orders.length}</h3>
                </div>
                <div className="w-10 h-10 bg-[#C41218]/5 text-[#C41218] rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-black text-neutral-400">{locale === "en" ? "Average Value" : "متوسط الطلب"}</span>
                  <h3 className="text-2xl font-black text-neutral-800 mt-1">{avgOrder.toFixed(2)} AED</h3>
                </div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-black text-neutral-400">{locale === "en" ? "Active Sessions" : "المستخدمين النشطين"}</span>
                  <h3 className="text-2xl font-black text-[#FF7A00] mt-1">42</h3>
                </div>
                <div className="w-10 h-10 bg-[#FF7A00]/5 text-[#FF7A00] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Split statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Orders by Delivery Type (Bar Chart) */}
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl lg:col-span-8 space-y-4 shadow-sm">
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">{locale === "en" ? "Sales Breakdown by Channel" : "توزيع قنوات البيع"}</h3>
                
                <div className="space-y-3 pt-2">
                  {/* Delivery bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                      <span>{locale === "en" ? "Home Delivery" : "توصيل للمنازل"} ({deliveryCount})</span>
                      <span className="text-[#C41218] font-black">{orders.length > 0 ? ((deliveryCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C41218] rounded-full" style={{ width: `${orders.length > 0 ? (deliveryCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>

                  {/* Dine-in bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                      <span>{locale === "en" ? "Dine-in QR Orders" : "طلبات الطاولات بالـ QR"} ({dineinCount})</span>
                      <span className="text-[#C41218] font-black">{orders.length > 0 ? ((dineinCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: `${orders.length > 0 ? (dineinCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>

                  {/* Takeaway bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                      <span>{locale === "en" ? "Takeaway Pickup" : "سفري واستلام"} ({takeawayCount})</span>
                      <span className="text-[#C41218] font-black">{orders.length > 0 ? ((takeawayCount/orders.length)*100).toFixed(0) : 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFD400] rounded-full" style={{ width: `${orders.length > 0 ? (takeawayCount/orders.length)*100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Hearth loads */}
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl lg:col-span-4 space-y-3 shadow-sm">
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">{locale === "en" ? "Realtime Hearth Load" : "حالة مواقد الشواء"}</h3>
                <div className="space-y-2 pt-1 text-[11px]">
                  <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded border border-neutral-200/50">
                    <span className="text-neutral-500">Spit Rotisserie 01</span>
                    <span className="text-green-600 font-bold">Active 380°C</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded border border-neutral-200/50">
                    <span className="text-neutral-500">Spit Rotisserie 02</span>
                    <span className="text-green-600 font-bold">Active 410°C</span>
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
                placeholder={locale === "en" ? "Search orders..." : "ابحث برقم الطلب..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 pl-9 pr-4 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218] placeholder-neutral-450 shadow-sm"
              />
              <Search className="absolute top-3.5 left-3.5 w-4 h-4 text-neutral-400" />
            </div>

            {/* List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-neutral-200/60 shadow-sm">
                <p className="text-xs text-neutral-500">
                  {locale === "en" ? "No orders found." : "لا توجد طلبات في قاعدة البيانات حالياً."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white border border-neutral-200/60 rounded-xl p-5 space-y-4 shadow-sm">
                    
                    {/* Order header details */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#C41218]">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            order.deliveryType === "delivery" ? "bg-purple-100 text-purple-650" :
                            order.deliveryType === "takeaway" ? "bg-blue-100 text-blue-650" : "bg-green-100 text-green-650"
                          }`}>
                            {order.deliveryType}
                          </span>
                        </div>
                        <p className="text-[9px] text-neutral-400 mt-0.5">{new Date(order.createdAt).toLocaleString()}</p>
                      </div>

                      {/* Interactive order status manager */}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-black text-neutral-400">{locale === "en" ? "Status" : "الحالة"}:</span>
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
                                  isCurrent ? colors[status] : "bg-neutral-100 text-neutral-500 hover:text-neutral-800"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed text-neutral-700">
                      <div>
                        <h4 className="font-bold text-neutral-400 mb-0.5">{locale === "en" ? "Customer" : "العميل"}</h4>
                        <p className="font-semibold text-neutral-800">{order.customerName}</p>
                        <p className="text-neutral-500">{order.phone}</p>
                        <p className="text-neutral-400 line-clamp-1 mt-0.5">{order.address}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-neutral-400 mb-0.5">{locale === "en" ? "Items" : "الأطباق"}</h4>
                        <ul className="space-y-0.5">
                          {order.items.map((item: any, idx: number) => (
                            <li key={idx}>
                              {locale === "en" ? item.nameEn : item.nameAr} <span className="text-[#C41218] font-black">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right flex flex-col justify-end">
                        <p className="text-neutral-400 text-[9px]">{locale === "en" ? "Subtotal" : "المجموع الفرعي"}: {order.subtotal.toFixed(2)} AED</p>
                        {order.discount > 0 && <p className="text-green-600 text-[9px]">{locale === "en" ? "Discount" : "الخصم"}: -{order.discount.toFixed(2)} AED</p>}
                        <p className="text-[9px] text-neutral-400">{locale === "en" ? "Taxes & Delivery" : "الضريبة والخدمة"}: {(order.tax + order.deliveryFee).toFixed(2)} AED</p>
                        <p className="text-xs font-black text-[#C41218] mt-0.5">{locale === "en" ? "Total" : "المبلغ الكلي"}: {order.total.toFixed(2)} AED</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Photo Uploader Tab (Matches request) */}
        {activeTab === "products" && (
          <div className="space-y-6">
            
            {/* Category and Search Filter Box */}
            <div className="bg-white border border-neutral-200/60 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                {categories.map((cat) => {
                  const isActive = productCategoryFilter === cat.id;
                  const label = locale === "en" ? cat.labelEn : cat.labelAr;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setProductCategoryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors ${
                        isActive ? "bg-[#C41218] text-white" : "bg-neutral-50 text-neutral-600 border border-neutral-200/60 hover:bg-neutral-100"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Input filter */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder={locale === "en" ? "Search menu items..." : "ابحث عن طبق..."}
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-neutral-55 border border-neutral-200 rounded-lg py-1.5 pl-8 pr-3 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218]"
                />
                <Search className="absolute top-2.5 left-2.5 w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>

            {/* Products grid */}
            <div className="bg-white border border-neutral-200/60 rounded-xl overflow-hidden shadow-sm divide-y divide-neutral-150">
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center text-neutral-400 text-xs">
                  {locale === "en" ? "No products found." : "لا توجد أطباق مطابقة."}
                </div>
              ) : (
                filteredProducts.map((item) => {
                  const name = locale === "en" ? item.nameEn : item.nameAr;
                  return (
                    <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                      
                      {/* Left: Product Thumbnail name */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-neutral-50 border border-neutral-200 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={item.image}
                            alt={name}
                            className="w-full h-full object-contain rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-neutral-800 text-xs">{name}</h4>
                          <span className="text-[10px] text-neutral-400 capitalize">{item.category} | {item.price.toFixed(2)} AED</span>
                        </div>
                      </div>

                      {/* Right: Upload action buttons */}
                      <div className="flex items-center gap-3">
                        <label className="px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-650 hover:bg-neutral-100 hover:text-neutral-850 cursor-pointer flex items-center gap-1.5 transition-colors font-bold text-[11px]">
                          <Upload className="w-3.5 h-3.5 text-[#C41218]" />
                          <span>{locale === "en" ? "Upload Photo" : "تحميل صورة"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(item.id, e)}
                            className="hidden"
                          />
                        </label>

                        {/* Reset button only shown if custom image exists */}
                        {item.image !== "/assets/logo.png" && (
                          <button
                            onClick={() => resetProductImage(item.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Reset to default logo"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Coupons Tab Content */}
        {activeTab === "coupons" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <div key={coupon.code} className={`bg-white border p-5 rounded-xl flex flex-col justify-between h-36 shadow-sm ${coupon.active ? "border-neutral-200/60" : "border-neutral-200 opacity-40"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-black tracking-wider text-[#C41218]">{coupon.code}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{coupon.discount}% Off Menu</p>
                  </div>
                  <button
                    onClick={() => toggleCoupon(coupon.code)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      coupon.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-[9px] text-neutral-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>{coupon.active ? "Active" : "Disabled"}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QR Code Generator Tab Content */}
        {activeTab === "qr" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="bg-white border border-neutral-200/60 p-5 rounded-xl lg:col-span-7 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">{locale === "en" ? "Create Table QR" : "توليد رمز QR"}</h3>
              <form onSubmit={handleGenerateQr} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-neutral-400 font-semibold">{locale === "en" ? "Table Number" : "رقم الطاولة"}</label>
                    <input
                      type="text"
                      value={qrTable}
                      onChange={(e) => setQrTable(e.target.value)}
                      placeholder="e.g. 5"
                      className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-neutral-400 font-semibold">{locale === "en" ? "Service Type" : "نوع الخدمة"}</label>
                    <select
                      value={qrType}
                      onChange={(e) => setQrType(e.target.value)}
                      className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#C41218]"
                    >
                      <option value="dinein">{locale === "en" ? "Dine-in (Table)" : "خدمة طاولات"}</option>
                      <option value="takeaway">{locale === "en" ? "Takeaway" : "استلام سفري"}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#C41218] hover:bg-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-[#C41218]/10"
                >
                  {locale === "en" ? "Generate QR" : "توليد الرمز"}
                </button>
              </form>
            </div>

            <div className="bg-white border border-neutral-200/60 p-5 rounded-xl lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4 min-h-[260px] shadow-sm">
              {showQr ? (
                <>
                  <div className="relative p-3 bg-white rounded-xl w-40 h-40 flex items-center justify-center shadow border border-neutral-100">
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
                    <h4 className="text-xs font-bold text-[#C41218]">Table {qrTable} QR Active</h4>
                    <p className="text-[9px] text-neutral-450 mt-0.5 truncate max-w-[180px]">{generatedUrl}</p>
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
                <div className="text-neutral-400 text-[11px]">
                  <p>{locale === "en" ? "Configure fields to review QR output" : "يرجى تعبئة الحقول لتوليد الرمز المخصص"}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PWA Settings Content */}
        {activeTab === "pwa" && (
          <div className="bg-white border border-neutral-200/60 p-5 rounded-xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-neutral-800 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#C41218]" />
              <span>Mobile Application (PWA) Core Registry</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-neutral-50 rounded border border-neutral-200">
                  <div>
                    <h5 className="font-bold">Offline Shell Pre-Caching</h5>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Asset cache registered via Service Worker</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 font-bold text-[8px]">Enabled</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-neutral-50 rounded border border-neutral-200">
                  <div>
                    <h5 className="font-bold">Standalone UI Mode</h5>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Launches without native browser URL bars</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 font-bold text-[8px]">Active</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-neutral-50 rounded border border-neutral-200">
                  <div>
                    <h5 className="font-bold">Push Notifications Endpoint</h5>
                    <p className="text-[9px] text-neutral-400 mt-0.5">FCM mock listeners for dispatching fire alert deals</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-bold text-[8px]">Standby</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-neutral-50 rounded border border-neutral-200">
                  <div>
                    <h5 className="font-bold">App Icon Assets</h5>
                    <p className="text-[9px] text-neutral-400 mt-0.5">Maskable branding PNG verified</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 font-bold text-[8px]">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
