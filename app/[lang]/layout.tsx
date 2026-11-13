import "../globals.css";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, type Lang } from "../lib/seo";
import { Analytics } from '@vercel/analytics/next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "FitKit - Free Fitness Calculators, Health Tools & Workout Guides",
    template: "%s | FitKit",
  },
  description:
    "FitKit provides free, science-backed fitness calculators, macronutrient tracking tools, body fat analyzers, BMR formulas, hydration targets, and training guides.",
  category: "Health",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === "zh" ? "zh" : "en") as Lang;

  return (
    <html lang={currentLang} suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Header locale={currentLang} />
        <main className="flex-1">{children}</main>
        <Footer locale={currentLang} />
        <Analytics />
      </body>
    </html>
  );
}
