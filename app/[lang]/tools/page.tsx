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
    pathname: "/tools",
    title: isZh ? "健身计算器与健康数据工具大全 - FitKit" : "All Fitness Calculators & Health Tools - FitKit",
    description: isZh
      ? "FitKit 免费健身工具大全：BMR 基础代谢、三大营养素、体脂率、每日饮水量、标准体重、靶心率及一字马柔韧度打卡。"
      : "Complete directory of FitKit free health and fitness calculators: BMR, Macros, Body Fat %, Hydration, Ideal Weight, Target Heart Rate & Splits.",
  });
}

const toolItems = [
  {
    slug: "bmr",
    emoji: "⚡",
    zhTitle: "BMR 与 TDEE 每日能量计算",
    enTitle: "BMR & TDEE Calculator",
    zhDesc: "基于 Mifflin-St Jeor 公式与活动系数，精准计算每日基础代谢与维持/减脂/增肌目标热量。",
    enDesc: "Calculate Basal Metabolic Rate and Total Daily Energy Expenditure (TDEE) with Mifflin-St Jeor.",
  },
  {
    slug: "macro",
    emoji: "🍳",
    zhTitle: "三大营养素比例计算器",
    enTitle: "Macro Calculator",
    zhDesc: "根据你的热量目标与训练偏好，科学分配每日蛋白质、健康脂肪与碳水化合物克数。",
    enDesc: "Calculate evidence-based protein, carbohydrate, and fat targets tailored for your training goals.",
  },
  {
    slug: "bfp",
    emoji: "🔥",
    zhTitle: "体脂率计算器 (海军体围 & BMI)",
    enTitle: "Body Fat Calculator",
    zhDesc: "采用美国海军体围法与 BMI 双算法，精确估算身体去脂体重与体脂百分比。",
    enDesc: "Estimate body fat percentage using US Navy tape circumference and BMI methodology.",
  },
  {
    slug: "water",
    emoji: "💧",
    zhTitle: "每日科学饮水量计算器",
    enTitle: "Daily Water Intake Calculator",
    zhDesc: "结合人体体重代谢负荷与日常运动出汗量，定制个性化全天科学补水与电解质目标。",
    enDesc: "Personalized daily fluid intake calculation based on body weight and exercise sweat rate.",
  },
  {
    slug: "ibw",
    emoji: "⚖️",
    zhTitle: "标准理想体重计算器",
    enTitle: "Ideal Body Weight Calculator",
    zhDesc: "运用临床权威 Devine 方程与 WHO 体重指数基准，测算属于你的理想健康体重区间。",
    enDesc: "Find your clinically optimal body weight range using the classic Devine equation and WHO standards.",
  },
  {
    slug: "hr",
    emoji: "❤️",
    zhTitle: "燃脂靶心率区间计算器",
    enTitle: "Target Heart Rate (Zone 2)",
    zhDesc: "依据 Tanaka 公式与 Karvonen 储备心率法，精准锁定 Zone 2 最佳脂肪氧化心率区间。",
    enDesc: "Calculate maximal heart rate and aerobic Zone 2 fat oxidation zones using Tanaka and Karvonen formulas.",
  },
  {
    slug: "splits",
    emoji: "🤸‍♂️",
    zhTitle: "一字马柔韧性打卡工具",
    enTitle: "Splits Flexibility Tracker",
    zhDesc: "记录每日横叉与竖叉下落距离，结合 PNF 神经拉伸原理量化柔韧度突破进度。",
    enDesc: "Log daily front and middle splits progress with biomechanical ROM tracking and PNF science.",
  },
];

export default async function ToolsDirectoryPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const isZh = lang === "zh";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <nav className="text-xs text-gray-400 mb-8">
        <Link href={`/${lang}`} className="hover:text-blue-600 transition">
          {isZh ? "首页" : "Home"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{isZh ? "全部工具" : "Tools"}</span>
      </nav>

      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          {isZh ? "健康数据智能工具大全" : "Fitness & Health Tools"}
        </h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
          {isZh
            ? "所有工具完全免费、无广告干扰、无需注册。数据仅保存在你的浏览器本地，安全隐私。"
            : "Free, ad-free, science-backed fitness calculators. All calculations are processed locally on your device."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {toolItems.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${lang}/tools/${tool.slug}`}
            className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]"
          >
            <div>
              <span className="text-3xl mb-4 block group-hover:scale-110 transition duration-300 transform origin-left">
                {tool.emoji}
              </span>
              <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                {isZh ? tool.zhTitle : tool.enTitle}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                {isZh ? tool.zhDesc : tool.enDesc}
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform duration-300 mt-6 inline-flex items-center gap-1">
              {isZh ? "进入工具" : "Open Tool"} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
