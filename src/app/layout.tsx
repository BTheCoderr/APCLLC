import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "APC LLC | Cargo Van Delivery & Moving Services in Rhode Island",
  description: "Professional cargo van transport and moving services in Rhode Island and nationwide. Fast, reliable, and affordable delivery solutions.",
  keywords: "cargo van, delivery, moving services, Rhode Island, transport, hauling, freight, local moving, APC LLC, All Purpose Contractors",
  manifest: "/manifest.json",
  authors: [{ name: "All Purpose Contractors LLC" }],
  creator: "All Purpose Contractors LLC",
  publisher: "All Purpose Contractors LLC",
  category: "Transportation",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "APC LLC | Cargo Van Delivery & Moving Services",
    description: "Professional cargo van transport and moving services in Rhode Island.",
    url: "https://apcllc.co",
    siteName: "All Purpose Contractors LLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/APCLLC.jpeg",
        width: 600,
        height: 600,
        alt: "APC LLC Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "APC LLC | Cargo Van Delivery & Moving Services",
    description: "Professional cargo van transport and moving services in Rhode Island.",
    images: ["/APCLLC.jpeg"]
  }
};

export const viewport = {
  themeColor: "#c62a2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="APC LLC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="APC LLC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#c62a2a" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <link rel="icon" href="/APCLLC.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/APCLLC.jpeg" type="image/jpeg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
