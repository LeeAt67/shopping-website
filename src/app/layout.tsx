import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "购物商城 - 优质商品一站式购物",
  description: "购物商城提供各类优质商品，包括电子产品、珠宝、男装、女装等，享受便捷的在线购物体验。",
  keywords: "购物,商城,电子产品,珠宝,服装,在线购物",
  openGraph: {
    title: "购物商城 - 优质商品一站式购物",
    description: "购物商城提供各类优质商品，享受便捷的在线购物体验。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
