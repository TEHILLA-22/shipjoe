import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EM Move Logistics — Nigeria ↔ UK Shipping & Freight",
    template: "%s | EM Move Logistics",
  },
  description:
    "EM Move Logistics supports international shipping, air freight, sea freight and route-specific freight coordination between Nigeria and the United Kingdom.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "EM Move Logistics — Nigeria ↔ UK Shipping & Freight",
    description:
      "International shipping and freight services connecting Nigeria and the United Kingdom.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EM Move Logistics",
    description: "Nigeria ↔ UK shipping and freight services.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-50 text-stone-900">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
