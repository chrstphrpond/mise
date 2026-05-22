import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mise.app"),
  title: {
    default: "Mise — Smarter F&B Operations with Modern POS",
    template: "%s · Mise",
  },
  description:
    "The POS purpose-built for cafes, restaurants, cloud kitchens, and multi-outlet F&B brands. Manage orders, tables, kitchen, inventory and reports — without the legacy POS baggage.",
  keywords: [
    "POS",
    "F&B POS",
    "restaurant POS",
    "cafe POS",
    "cloud kitchen POS",
    "kitchen display system",
    "KDS",
    "inventory management",
    "multi-outlet POS",
  ],
  authors: [{ name: "Mise" }],
  creator: "Mise",
  publisher: "Mise",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://mise.app",
    siteName: "Mise",
    title: "Mise — Smarter F&B Operations with Modern POS",
    description:
      "The POS purpose-built for cafes, restaurants, cloud kitchens, and multi-outlet F&B brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mise — Smarter F&B Operations with Modern POS",
    description: "The POS purpose-built for F&B operators.",
    creator: "@getmise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://mise.app" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[70] focus-visible:rounded-full focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
