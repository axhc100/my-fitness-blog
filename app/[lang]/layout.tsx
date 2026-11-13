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
        {/* 🚀 Product Hunt Launch Badge */}
        <div className="fixed bottom-6 right-6 z-50 hover:scale-105 transition-transform duration-300 drop-shadow-xl">
          <a href="https://www.producthunt.com/products/fitkit?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-fitkit" target="_blank" rel="noopener noreferrer">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1192203&amp;theme=light&amp;t=1783676725471" alt="FitKit - The ultimate free, ad-free macro &amp; fitness calculator | Product Hunt" width="250" height="54" />
          </a>
        </div>
      </body>
    </html>
  );
}
