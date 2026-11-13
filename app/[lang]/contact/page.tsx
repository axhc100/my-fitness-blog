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
    pathname: "/contact",
    title: isZh ? "联系我们 - FitKit 反馈与建议" : "Contact FitKit - Feedback & Support",
    description: isZh
      ? "遇到工具计算异常、文章数据疑问或有新工具建议？欢迎与 FitKit 取得联系。"
      : "Questions about our fitness formulas, bug reports, or feature requests? Contact the FitKit team.",
  });
}

export default async function ContactPage({
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
        <span className="text-gray-600">{isZh ? "联系我们" : "Contact"}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">
        {isZh ? "联系我们" : "Contact Us"}
      </h1>

      {isZh ? (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5 text-sm md:text-base">
          <p>
            如果你在使用 FitKit 时遇到问题，或者对工具、文章有建议，欢迎联系我们。最常见的几类反馈是：计算结果和你的预期不一致、某个工具在手机上显示异常、文章里的公式或数据有疑问、希望我们增加某个新的计算器。
          </p>
          <p>
            联系我们之前，可以先看一下对应工具页下方的说明、常见问题和参考文献，很多计算逻辑和适用范围已经写在那里。反馈时请尽量写清楚你用的是哪个工具或哪篇文章、输入了什么数据、出现了什么现象，必要时附一张截图，我们会更快定位问题。
          </p>
          <p>
            我们会认真阅读每一条留言，但因为 FitKit 目前由团队精简维护，回复可能不会特别快，请理解。如果你反馈的是工具错误或文章事实错误，我们会优先核对和修正。
          </p>
          
          <div className="my-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
              官方联系邮箱
            </h2>
            <a
              href="mailto:contact@fitkit.top"
              className="text-lg md:text-xl font-mono font-bold text-blue-600 hover:underline"
            >
              contact@fitkit.top
            </a>
            <p className="text-xs text-gray-400 mt-2">
              我们会在 1–2 个工作日内查阅您的来信。
            </p>
          </div>

          <p className="text-xs text-gray-500">
            安全提示：我们不会通过邮件向你推销任何产品，也不会把你的邮箱分享给第三方。如果你收到自称是 FitKit 官方、要求你付款或提供账号密码的邮件，请不要回复，那不是我们发的。
          </p>
        </div>
      ) : (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5 text-sm md:text-base">
          <p>
            Contact us for tool calculations, display issues, formula inquiries, or suggestions for new health calculators. Common inquiries include calculation discrepancies, mobile formatting feedback, or suggestions for specialized tools.
          </p>
          <p>
            Before reaching out, please check the scientific guide and FAQ section located beneath each tool page, as most clinical formulas and boundary conditions are detailed there. When reporting an issue, please specify the tool, your input parameters, expected vs. actual output, and a screenshot if possible.
          </p>
          <p>
            We review every submission carefully. Priority is given to mathematical or scientific formula corrections.
          </p>

          <div className="my-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
              Official Email
            </h2>
            <a
              href="mailto:contact@fitkit.top"
              className="text-lg md:text-xl font-mono font-bold text-blue-600 hover:underline"
            >
              contact@fitkit.top
            </a>
            <p className="text-xs text-gray-400 mt-2">
              We generally respond within 1–2 business days.
            </p>
          </div>

          <p className="text-xs text-gray-500">
            Security Notice: FitKit never sells products via email, nor do we request account passwords, payment info, or credit card details. Never reply to suspicious messages claiming to represent FitKit asking for financial transactions.
          </p>
        </div>
      )}
    </div>
  );
}
