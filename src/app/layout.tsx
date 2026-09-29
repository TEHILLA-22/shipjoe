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
    default: "EM Move Logistics — Nigeria ↔ UK ↔ Europe Shipping & Freight",
    template: "%s | EM Move Logistics",
  },
  description:
    "EM Move Logistics ships from Nigeria to the United Kingdom by air and sea, and from Nigeria to all EU member states by sea.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "EM Move Logistics — Nigeria ↔ UK ↔ Europe Shipping & Freight",
    description:
      "International shipping and freight from Nigeria to the United Kingdom and across Europe.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EM Move Logistics",
    description: "Nigeria ↔ UK ↔ Europe shipping and freight services.",
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
