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
    pathname: "/privacy",
    title: isZh ? "隐私政策 - FitKit 数据与本地隐私说明" : "Privacy Policy - FitKit Data & Local Storage",
    description: isZh
      ? "FitKit 隐私政策：我们尊重并保护每位访客的个人信息，无需注册账号，不向远程云端服务器存储任何个人体测指标，所有健身测算逻辑均在用户浏览器本地离线运行。"
      : "FitKit Privacy Policy: We require no accounts, collect no personal body metrics in cloud databases, and process all fitness calculations locally on your device.",
  });
}

export default async function PrivacyPage({
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
        <span className="text-gray-600">{isZh ? "隐私政策" : "Privacy Policy"}</span>
      </nav>

      <div className="border-b border-gray-100 pb-6 mb-8">
        <div className="inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 mb-3">
          {isZh ? "最后更新：2026-11-13" : "Last Updated: November 13, 2026"}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {isZh ? "隐私政策" : "Privacy Policy"}
        </h1>
      </div>

      {isZh ? (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6 text-sm md:text-base">
          <p>
            FitKit 重视你的隐私。本政策说明我们在你使用网站时收集什么、不收集什么，以及你的数据保存在哪里。
          </p>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. 数据不上传原则</h2>
            <p>
              我们不要求你注册账号，也不收集你的姓名、手机号、身份证号或账号密码。你在使用计算器时输入的身高、体重、年龄、目标等数据，只在你的浏览器里完成计算，不会上传到我们的服务器，也不会与你的身份关联。
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. 本地存储（Local Storage）</h2>
            <p>
              你的打卡记录、历史计算记录和目标倒计时，默认通过浏览器本地存储保存在你自己的设备上。只有你能看到这些记录，清除浏览器数据、更换浏览器或更换设备后，这些记录会丢失。如果你希望长期保存，请自行截图或导出记录。
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. 基础访问统计与第三方徽章</h2>
            <p>
              网站可能会使用最基础的访问统计（如 Vercel Analytics）来了解哪些工具和文章更受欢迎（例如页面访问量）。这些统计不收集个人身份信息。
            </p>
            <p className="mt-2">
              页面右下角的 Product Hunt 徽章会链接到第三方网站，点击后将跳转到 Product Hunt，受其隐私政策约束，与 FitKit 无关。
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. 联系与邮件隐私</h2>
            <p>
              如果你通过邮件联系我们，我们只会用你的邮箱回复你的问题，不会用于广告推送，也不会分享给第三方。未来如果网站接入邮件订阅服务，我们会在投放前更新本政策并在页面上明确标注，不会悄悄收集或出售你的数据。
            </p>
          </div>
        </div>
      ) : (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6 text-sm md:text-base">
          <p>
            FitKit values your privacy. This policy outlines how information is handled when you use our site and tools.
          </p>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Zero Server-Side Health Data Retention</h2>
            <p>
              FitKit does not require user registration. We do not collect your name, phone number, identity credentials, or passwords. All fitness calculator parameters (such as height, weight, age, neck/waist/hip measurements, and personal goals) are processed entirely client-side within your browser. They are never uploaded to remote databases or matched to your identity.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Local Storage Usage</h2>
            <p>
              Features such as goal countdowns, stretching check-ins, and calculator history are stored exclusively in your browser’s local storage (localStorage). They remain on your device and are cleared if you reset your browser data or switch devices.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Anonymous Analytics & Third-Party Badges</h2>
            <p>
              We may use privacy-preserving, anonymous visit statistics (such as Vercel Web Analytics) to understand which calculators and guides provide the most utility. No personally identifiable information (PII) is tracked.
            </p>
            <p className="mt-2">
              The Product Hunt badge on our pages links to Product Hunt’s external platform and is subject to their independent privacy terms.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Email Inquiries</h2>
            <p>
              When you contact us via email, your address is used strictly to answer your question or bug report. We never rent, sell, or disclose email addresses to commercial third parties.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
