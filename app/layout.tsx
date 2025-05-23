// app/layout.tsx
import type { Metadata } from "next";
import { Libre_Franklin, Fjalla_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/cosmic/blocks/ecommerce/CartProvider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Suspense } from "react";
import TawkMessenger from "@/components/TawkMessenger";
export const revalidate = 0;

const sans = Libre_Franklin({ subsets: ["latin"], variable: "--font-sans" });
const display = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "AdaTop",
  description: "POS System & Inventory System For Your Business Dashboard",
  openGraph: {
    title: "AdaTop",
    description: "POS System & Inventory System For Your Business Dashboard.",
    images:
      "https://imgix.cosmicjs.com/69313380-b156-11ee-9844-f9a09795e2a3-desktop.png?auto=format,compression",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} font-sans md:p-0 bg-white dark:bg-black h-dvh w-full`}
      >
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <div>
                {/* <Banner /> */}
                <Header />
                {children}
              </div>
              <Footer />
              <TawkMessenger />
            </CartProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
