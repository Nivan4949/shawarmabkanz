import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomizerModal } from "@/components/CustomizerModal";
import { SuccessModal } from "@/components/SuccessModal";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "900"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Shawarma b'Kanz | Taste the Treasure of Flame-Grilled Shawarma",
  description: "Savor the finest slow-roasted, flame-seared shawarmas, burgers, and sandwiches at Shawarma b'Kanz. Crafted with our legendary 18-spice blend. Order online now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0E0E0E] text-[#FDFBF7] relative overflow-x-hidden selection:bg-[#E61C24] selection:text-white">
        <LanguageProvider>
          <CartProvider>
            {/* Background Glow FX */}
            <div className="bg-glow bg-glow-1 opacity-60" />
            <div className="bg-glow bg-glow-2 opacity-50" />

            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            
            {/* Global Overlay/Drawer Components */}
            <CartDrawer />
            <CustomizerModal />
            <SuccessModal />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
