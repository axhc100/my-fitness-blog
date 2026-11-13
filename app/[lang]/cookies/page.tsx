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
      ? "FitKit Cookie 与本地存储使用说明：我们严格坚持本地优先与隐私优先原则，不使用任何侵入式第三方跨站广告追踪 Cookie，您的身体指标与计算历史仅保存在浏览器本地。"
      : "Read the FitKit Cookie and Local Storage Policy. Learn how we protect privacy through local-first browser storage with zero third-party cross-site ad trackers.",
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

      <div className="border-b border-gray-100 pb-6 mb-8">
        <div className="inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 mb-3">
          {isZh ? "最后更新：2026-11-13" : "Last Updated: November 13, 2026"}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {isZh ? "Cookie 与本地存储说明" : "Cookie & Local Storage Policy"}
        </h1>
      </div>

      {isZh ? (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8 text-sm md:text-base">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">1. 什么是 Cookie 与本地存储？</h2>
            <p>
              Cookie 是网站在用户访问时保存在浏览器中的小型文本文件，常用于会话管理或行为追踪。除传统 Cookie 外，现代网页技术还包括<strong>浏览器本地存储（localStorage）</strong>与<strong>会话存储（sessionStorage）</strong>，用于在客户端保存离线数据。
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">2. FitKit 的“本地优先”数据原则</h2>
            <p>
              FitKit 本身<strong>不使用任何第三方跨站追踪或定向广告营销 Cookie</strong>，也无需任何访客注册或登录账号。
            </p>
            <p className="mt-2">
              网站主要使用<strong>浏览器本地存储（localStorage）</strong>来保存你的三大营养素微调偏好、BMR 计算历史、一字马打卡进度和目标 Flag 倒计时。这些数据直接保存在你的设备本地，绝对不会同步或上传至任何远程云端数据库。
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">3. 匿名性能统计与分析</h2>
            <p>
              为了持续改善网站访问速度与工具稳定性，我们可能启用轻量级、不采集个人身份信息的性能统计服务（例如 Vercel Web Analytics）。此类服务仅统计总页面访问量与网络延迟，不记录任何个人体测数值，不使用跨网站追踪凭证。
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">4. 如何管理或清除本地数据？</h2>
            <p>
              你可以随时在浏览器的“设置 / 清除浏览数据”中删除本站的 Cookie 与本地存储。请注意，清除本地存储后，之前保存在当前设备上的 Flag 倒计时、BMR 测算缓存等数据将被重置为初始状态。
            </p>
          </div>
        </div>
      ) : (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8 text-sm md:text-base">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">1. What Are Cookies and Local Storage?</h2>
            <p>
              Cookies are small data files placed on your browser when visiting websites. Modern web standards also provide <strong>Browser Local Storage (localStorage)</strong>, enabling web applications to save offline preferences directly on client devices without transmitting data to remote servers.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">2. FitKit Local-First Architecture</h2>
            <p>
              FitKit does <strong>not deploy invasive third-party tracking beacons or behavioral advertising cookies</strong>. We do not require accounts or user logins.
            </p>
            <p className="mt-2">
              We utilize <strong>Browser Local Storage (localStorage)</strong> strictly to preserve your personal fitness calculations, splits flexibility entries, and fitness goal countdown flags. This data remains on your physical device and is never uploaded or shared externally.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">3. Anonymous Performance Analytics</h2>
            <p>
              To maintain high uptime and fast page response speeds, we may utilize privacy-respecting telemetry (such as Vercel Web Analytics) to observe aggregated traffic volumes. These tools measure general site stability without compiling individual user profiles or collecting health metrics.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">4. Managing and Clearing Your Data</h2>
            <p>
              You can wipe cookies and local storage at any time through your browser preferences. Note that clearing local data will reset saved goal countdowns and historical calculator values on that specific browser.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
