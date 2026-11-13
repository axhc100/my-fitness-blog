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
    pathname: "/about",
    title: isZh ? "关于 FitKit - 科学健身计算器与训练指南" : "About FitKit - Science-Backed Fitness Tools",
    description: isZh
      ? "了解 FitKit 科学健身平台的初心与使命：我们致力于打造严谨、循证的免费健康工具矩阵，涵盖 BMR 与 TDEE 计算、宏量营养素配比、体脂率测算、补水标准与全景运动生理学指南。"
      : "Explore FitKit: Free evidence-based fitness calculators, Mifflin-St Jeor TDEE formulas, macro diets, body fat analysis, and peer-reviewed athletic training guides.",
  });
}

export default async function AboutPage({
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
        <span className="text-gray-600">{isZh ? "关于 FitKit" : "About"}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">
        {isZh ? "关于 FitKit" : "About FitKit"}
      </h1>

      {isZh ? (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5 text-sm md:text-base">
          <p>
            FitKit 是一个免费的健身计算器与健康工具站，也是一个训练指南博客。我们希望把健身里那些看起来很专业、算起来很麻烦的东西，变成人人都能直接用的工具：输入身高、体重、年龄和目标，就能得到一个有依据、可执行的参考结果。
          </p>
          <p>
            站内现在提供 BMR 基础代谢、三大营养素、体脂率、每日饮水量、标准体重、燃脂心率区间等计算工具，以及一字马进度打卡和目标倒计时。工具的计算方法会写在页面上，例如 BMR 使用 Mifflin-St Jeor 公式，相关说明和参考文献也会一并给出，方便你核对和理解，而不是只给一个数字。
          </p>
          <p>
            博客主要写力量与增肌、瑜伽与柔韧度、体态与塑形、恢复与营养四个方向，内容偏长、偏系统，会讲原理、讲课表、也讲常见误区。如果你是刚开始训练的新手，可以先从工具和入门文章开始，再慢慢看长文。
          </p>
          <p>
            FitKit 不需要注册账号，也没有付费墙，工具和文章都可以免费使用。你的计算和打卡记录默认只保存在你自己的浏览器里，不会上传到我们的服务器，换设备或清除浏览器数据后会丢失。
          </p>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs md:text-sm">
            <strong>免责声明：</strong> 我们不是医疗机构，站内内容只能作为一般健身参考，不能代替医生、营养师或教练的专业建议。如果你有疾病、伤病、孕期或正在服药，在调整饮食和训练前请先咨询专业人士。
          </div>
        </div>
      ) : (
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-5 text-sm md:text-base">
          <p>
            FitKit is a free fitness calculator, health tool and training guide site. We bridge the gap between complex sports science literature and practical daily fitness tracking: by entering your height, weight, age, and goals, you receive evidence-based, actionable benchmarks.
          </p>
          <p>
            Our toolkit includes Basal Metabolic Rate (BMR), Macronutrient splits, Body Fat Percentage (US Navy & BMI method), Daily Hydration, Ideal Body Weight, Target Heart Rate (Zone 2), and Splits Flexibility progress tracking. Mathematical formulas (such as Mifflin-St Jeor for BMR) and clinical references are transparently documented on each tool page.
          </p>
          <p>
            Our blog delivers in-depth education across Strength & Hypertrophy, Mobility & Yoga, Body Recomposition, and Recovery & Nutrition. Whether you are an absolute beginner or a seasoned lifter, our resources help you make informed decisions.
          </p>
          <p>
            No registration or payment is required. All calculator inputs and personal check-ins are stored locally on your device in your own browser by default and are never uploaded to remote servers.
          </p>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs md:text-sm">
            <strong>Medical Disclaimer:</strong> Content on FitKit is for educational and general fitness reference only and is not medical advice. Always consult a physician, dietitian, or qualified healthcare provider before initiating any new diet or training regimen, especially if you have an underlying medical condition, injury, are pregnant, or take medication.
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
        <Link
          href={`/${lang}/tools`}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs md:text-sm hover:bg-blue-700 transition"
        >
          {isZh ? "浏览全部工具 →" : "Explore All Tools →"}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs md:text-sm hover:bg-gray-200 transition"
        >
          {isZh ? "联系我们" : "Contact Us"}
        </Link>
      </div>
    </div>
  );
}
