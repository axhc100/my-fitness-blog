import Link from "next/link";

type Props = { locale: "zh" | "en" };

const t = {
  zh: {
    tagline: "免费健身计算器、健康工具与训练指南。用科学的数据工具，精确追踪身体与健康指标。",
    tools: "工具",
    help: "内容与帮助",
    about: "关于 FitKit",
    contact: "联系我们",
    privacy: "隐私政策",
    terms: "使用条款",
    cookies: "Cookie 说明",
    allTools: "全部工具 →",
    allPosts: "全部文章 →",
    copyright: "免费使用 · 内容仅供参考，不能代替医疗建议。",
    followUs: "关注我们",
  },
  en: {
    tagline: "Free fitness calculators, health tools and training guides. Use science-backed tools to track your body and health precisely.",
    tools: "Tools",
    help: "Content & Help",
    about: "About FitKit",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    cookies: "Cookie Policy",
    allTools: "All tools →",
    allPosts: "All articles →",
    copyright: "Free to use · For reference only, not medical advice.",
    followUs: "Follow Us",
  },
} as const;

const toolLinks = [
  { href: "/tools/bmi", zh: "BMI 身体质量指数计算", en: "BMI Calculator" },
  { href: "/tools/bmr", zh: "BMR 基础代谢计算", en: "BMR Calculator" },
  { href: "/tools/macro", zh: "三大营养素计算器", en: "Macro Calculator" },
  { href: "/tools/bfp", zh: "体脂率计算器", en: "Body Fat Calculator" },
  { href: "/tools/water", zh: "每日饮水量计算", en: "Daily Water Calculator" },
  { href: "/tools/ibw", zh: "标准体重计算", en: "Ideal Weight Calculator" },
  { href: "/tools/hr", zh: "燃脂心率区间计算", en: "Fat-Burning Heart Rate" },
  { href: "/tools/splits", zh: "一字马进度打卡", en: "Splits Tracker" },
];

export default function Footer({ locale }: Props) {
  const c = t[locale] || t.en;
  const year = new Date().getFullYear();
  const p = (href: string) => `/${locale}${href}`;

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-20 pt-16 pb-12 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto px-6">
        {/* 3 列栅格布局：品牌、工具、内容与帮助（坚决不放未接入的虚假订阅框） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* 第 1 列：品牌与简介 */}
          <div className="space-y-3">
            <Link href={p("")} className="flex items-center gap-2 group">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FitKit
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed pr-4">
              {c.tagline}
            </p>
            {/* 社交账号说明：未开通的不放死链接，杜绝 404 */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                {c.followUs}
              </span>
              <p className="text-xs text-gray-400">
                {locale === "zh"
                  ? "官方社交媒体渠道筹备中，敬请期待。"
                  : "Official social channels coming soon."}
              </p>
            </div>
          </div>

          {/* 第 2 列：核心工具 */}
          <nav aria-label={c.tools}>
            <h3 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-4">
              {c.tools}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              {toolLinks.map((tool) => (
                <li key={tool.href}>
                  <Link href={p(tool.href)} className="hover:text-blue-600 transition">
                    {locale === "zh" ? tool.zh : tool.en}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href={p("/tools")} className="font-semibold text-blue-600 hover:text-blue-700 transition">
                  {c.allTools}
                </Link>
              </li>
            </ul>
          </nav>

          {/* 第 3 列：内容与帮助 */}
          <nav aria-label={c.help}>
            <h3 className="font-bold text-gray-900 text-xs tracking-wider uppercase mb-4">
              {c.help}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>
                <Link href={p("/about")} className="hover:text-blue-600 transition">
                  {c.about}
                </Link>
              </li>
              <li>
                <Link href={p("/contact")} className="hover:text-blue-600 transition">
                  {c.contact}
                </Link>
              </li>
              <li>
                <Link href={p("/privacy")} className="hover:text-blue-600 transition">
                  {c.privacy}
                </Link>
              </li>
              <li>
                <Link href={p("/terms")} className="hover:text-blue-600 transition">
                  {c.terms}
                </Link>
              </li>
              <li>
                <Link href={p("/cookies")} className="hover:text-blue-600 transition">
                  {c.cookies}
                </Link>
              </li>
              <li className="pt-1">
                <Link href={p("/#articles")} className="font-semibold text-blue-600 hover:text-blue-700 transition">
                  {c.allPosts}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 底部版权与医疗免责声明 */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© {year} FitKit</span>
            <span>·</span>
            <span>{locale === "zh" ? "免费使用" : "Free to use"}</span>
          </div>
          <p className="text-center sm:text-right text-[11px] text-gray-400">
            {c.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
