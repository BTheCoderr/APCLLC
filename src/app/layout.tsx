import React from "react";
import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "APC LLC | Cargo Van Delivery from Rhode Island",
    template: "%s | APC LLC",
  },
  description:
    "Owner-operated cargo van logistics from Warwick, Rhode Island. Same-day, scheduled, and long-distance property transport across the continental U.S.",
  keywords:
    "cargo van delivery, Rhode Island, Warwick, Providence, same-day delivery, business delivery, interstate property transport, junk removal, APC LLC, All Purpose Contractors",
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE_URL || SITE.domain),
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Transportation",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  openGraph: {
    title: "APC LLC | Cargo Van Delivery from Rhode Island",
    description: SITE.tagline,
    url: SITE.domain,
    siteName: SITE.legalName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/APCLLC.jpeg",
        width: 512,
        height: 512,
        alt: "APC LLC logo with cargo van",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APC LLC | Cargo Van Delivery from Rhode Island",
    description: SITE.tagline,
    images: ["/APCLLC.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.domain,
  },
};

export const viewport = {
  themeColor: "#0B1220",
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
        <meta name="application-name" content={SITE.shortName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE.shortName} />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <link rel="icon" href="/APCLLC.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/APCLLC.jpeg" type="image/jpeg" />
      </head>
      <body
        className={`${oswald.variable} ${sourceSans.variable} font-sans antialiased has-mobile-bar`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <JsonLd />
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
