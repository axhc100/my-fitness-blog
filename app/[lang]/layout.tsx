import "../globals.css";
import Script from "next/script"; // ✨ 引入 Next.js 官方脚本优化组件
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Fitness & Health Toolkit",
  description: "Your ultimate fitness and health tools container with smart tracking.",
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