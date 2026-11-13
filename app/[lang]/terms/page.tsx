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
    pathname: "/terms",
    title: isZh ? "使用条款 - FitKit 服务条款与免责声明" : "Terms of Use - FitKit Terms & Conditions",
    description: isZh
      ? "FitKit 使用条款与法律免责声明：了解免费健康计算器与训练指南的使用准则。本站内容仅供科学科普与健身参考，不构成任何医疗诊断或临床处方建议。"
      : "FitKit Terms of Use: Review our terms of service, non-medical educational disclaimer, intellectual property policies, and guidelines for using our fitness tools.",
  });
}

export default async function TermsPage({
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
        <span className="text-gray-600">{isZh ? "使用条款" : "Terms of Use"}</span>
      </nav>

      <div className="border-b border-gray-100 pb-6 mb-8">
        <div className="inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 mb-3">
          {isZh ? "最后更新：2026-11-13" : "Last Updated: November 13, 2026"}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {isZh ? "使用条款" : "Terms of Use"}
        </h1>
      </div>

      {isZh ? (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6 text-sm md:text-base">
          <p>
            欢迎使用 FitKit。使用本网站，即表示你同意以下条款。
          </p>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. 免费服务与内容变更</h2>
            <p>
              FitKit 提供免费的健身计算器、健康工具和训练指南，工具和文章都可以免费使用，无需注册和付费。我们可能会不定期更新、修改或下线部分工具和文章，恕不另行通知。
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. 非医疗建议免责声明</h2>
            <p>
              站内所有计算结果都是基于公开公式和一般人群数据的估算，例如 BMR、体脂率和宏量配比，不同人的身体状况、运动水平和代谢水平差异很大，结果只能作为参考，不能作为医疗、诊断、治疗或精确营养处方使用。站内内容也不能代替医生、营养师、物理治疗师或教练的专业建议。
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. 用户个人责任</h2>
            <p>
              你需要对自己的饮食和训练决定负责。在开始新的饮食计划、高强度训练或减重计划前，特别是有疾病、伤病、孕期或正在服药的情况下，请先咨询专业人士。因依据本站内容自行调整饮食或训练而产生的任何后果，由你自行承担。
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. 知识产权与合理使用</h2>
            <p>
              未经书面许可，不得将本站内容用于商业转载、批量抓取或冒充 FitKit 提供服务。你可以出于个人学习目的分享文章链接，但请注明来源。
            </p>
            <p className="text-xs text-gray-400 mt-4">
              如你不同意以上任何条款，请停止使用本网站。
            </p>
          </div>
        </div>
      ) : (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6 text-sm md:text-base">
          <p>
            By using FitKit, you agree to these Terms of Use.
          </p>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Service Availability</h2>
            <p>
              FitKit provides free fitness calculators, physiological tools, and educational guides without subscription fees or mandatory accounts. We reserve the right to update, modify, or retire tools and articles at our discretion.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Health & Medical Disclaimer</h2>
            <p>
              Calculators (including BMR, TDEE, Body Fat %, and Macronutrients) produce estimates derived from established population-level scientific equations. They are provided solely for general educational purposes and do not constitute clinical diagnosis, personalized medical advice, or therapeutic prescription. Always consult a licensed healthcare professional before embarking on significant caloric deficits or intense exercise regimens.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. User Responsibility</h2>
            <p>
              You acknowledge that participation in physical exercise carries inherent risk. You assume full personal responsibility for your nutrition, physical training, and health choices.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Intellectual Property</h2>
            <p>
              All proprietary algorithms, editorial articles, custom graphics, and code are protected by intellectual property laws. Scraping, redistribution, or commercial reproduction without written permission is strictly prohibited.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
