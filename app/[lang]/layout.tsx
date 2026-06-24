import "../globals.css";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "../lib/seo";
import Script from "next/script"; // ✨ 引入 Next.js 官方脚本优化组件
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "FitKit - Free Fitness Calculators and Health Tools",
    template: "%s | FitKit",
  },
  description:
    "FitKit provides free fitness calculators, body composition tools, nutrition calculators and practical training guides.",
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

  return (
    <html lang={lang || "en"} suppressHydrationWarning>
      <head>
        {/* 🎯 Google AdSense 自动化广告脚本占位区
          等你的域名通过 AdSense 审核后，将下面的 client=ca-pub-XXXXXXXXXXXXXXXX 替换为你自己的广告主 ID 即可。
          Next.js 的 Script 组件会确保广告脚本以非阻塞的最高性能加载，完全不耽误网页打开速度！
        */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
