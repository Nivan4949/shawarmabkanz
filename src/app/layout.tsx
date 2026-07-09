import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomizerModal } from "@/components/CustomizerModal";
import { SuccessModal } from "@/components/SuccessModal";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
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
    <html lang="en" className={`${poppins.variable} ${cairo.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0E0E0E" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0E0E0E] text-[#FDFBF7] relative overflow-x-hidden selection:bg-[#C41218] selection:text-white">
        <LanguageProvider>
          <CartProvider>
            {/* Background Glow FX */}
            <div className="bg-glow bg-glow-1 opacity-60" />
            <div className="bg-glow bg-glow-2 opacity-50" />

            <Navbar />
            <main className="flex-grow pb-16 lg:pb-0">
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
