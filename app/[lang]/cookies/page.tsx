import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, type Lang } from "../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";

  return buildPageMetadata({
    lang,
    pathname: "/cookies",
    title: isZh ? "Cookie 说明 - FitKit 本地存储与使用政策" : "Cookie Policy - FitKit Local Storage & Privacy",
    description: isZh
      ? "了解 FitKit 的 Cookie 与本地数据政策：不使用跨站追踪广告 Cookie，数据仅保留在浏览器端。"
      : "FitKit Cookie & Local Storage Policy: We do not use third-party advertising cookies. Learn about our local-first storage.",
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const isZh = lang === "zh";

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <nav className="text-xs text-gray-400 mb-8">
        <Link href={`/${lang}`} className="hover:text-blue-600 transition">
          {isZh ? "首页" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{isZh ? "Cookie 说明" : "Cookie Policy"}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">
        {isZh ? "Cookie 与本地存储说明" : "Cookie & Local Storage Policy"}
      </h1>

      {isZh ? (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5 text-sm md:text-base">
          <p>
            FitKit 本身不使用第三方追踪或广告营销 Cookie，也不要求任何用户登录。
          </p>
          <p>
            网站主要使用**浏览器本地存储（localStorage）**来保存你的计算历史、一字马打卡记录和目标倒计时。这些数据仅保存在你当前使用的设备和浏览器中，不会上传到任何云端服务器。
          </p>
          <p>
            如果你未来看到 Cookie 相关提示，通常来自轻量访问统计服务（例如 Vercel Analytics，用于统计总访问量以改善产品性能）。我们会在政策页面随时同步更新说明与关闭方法。
          </p>
          <p>
            你可以随时在自己的浏览器设置中清除本地缓存和 Cookie。请注意，清除后储存在本机的历史计算和目标倒计时记录将会重置。
          </p>
        </div>
      ) : (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5 text-sm md:text-base">
          <p>
            FitKit does not deploy intrusive cross-site advertising cookies or tracking beacons, and does not require account creation.
          </p>
          <p>
            Our website relies on **Browser Local Storage (localStorage)** to preserve your goal countdowns, calculator history, and flexibility logs. This data resides strictly on your device and is never synchronized to external servers.
          </p>
          <p>
            Anonymous performance analytics (such as Vercel Web Analytics) may be utilized to measure overall page response times and popular calculators without identifying individual visitors.
          </p>
          <p>
            You can clear cookies and local storage anytime via your browser settings. Please note that clearing local storage will erase saved calculator entries and goal flags on that device.
          </p>
        </div>
      )}
    </div>
  );
}
