import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export const SITE_URL = "https://www.fitkit.top";
export const SITE_NAME = "FitKit";
export const LANGUAGES = ["en", "zh"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const TOOL_SLUGS = ["splits", "macro", "bfp", "bmr", "water", "ibw", "hr"] as const;

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
};

const homeSeo = {
  en: {
    title: "FitKit - Free Fitness Calculators, Health Tools and Training Guides",
    description:
      "Use FitKit free fitness calculators, macro tracking tools, body fat calculators, BMR calculators, hydration targets, flexibility tracking and practical health guides.",
    keywords: [
      "FitKit",
      "fitness calculator",
      "macro calculator",
      "body fat calculator",
      "BMR calculator",
      "health tools",
      "workout guides",
    ],
  },
  zh: {
    title: "FitKit - 免费健身计算器、健康工具与训练指南",
    description:
      "FitKit 提供免费的健身计算器、三大营养素计算器、体脂率计算、基础代谢计算、饮水量目标、柔韧性追踪和实用健康文章。",
    keywords: [
      "FitKit",
      "健身计算器",
      "三大营养素计算器",
      "体脂率计算器",
      "基础代谢计算器",
      "健康工具",
      "健身指南",
    ],
  },
} satisfies Record<Lang, { title: string; description: string; keywords: string[] }>;

const toolSeo = {
  en: {
    splits: ["Splits Progression Tracker - Flexibility & Hip Mobility Guide", "Track front and middle splits range of motion with biomechanical progression metrics. Includes PNF stretching principles, sarcomere lengthening science, and injury prevention."],
    macro: ["Macro Calculator (Protein, Carbs, Fats) - Flexible Dieting & IIFYM", "Calculate evidence-based macronutrient targets (protein, carbohydrates, fats) tailored for cutting, clean bulking, or body recomposition according to ISSN sports nutrition guidelines."],
    bfp: ["Body Fat Calculator (US Navy & BMI Method) - Lean Mass & Fat Percentage", "Calculate your body fat percentage using the US Navy tape circumference method and BMI equations. Track body recomposition, visual progress, and visceral fat categories."],
    bmr: ["BMR Calculator (Mifflin-St Jeor) - Basal Metabolic Rate & TDEE", "Accurately calculate your Basal Metabolic Rate (BMR) using the clinically validated Mifflin-St Jeor formula. Includes TDEE multipliers, scientific background, and caloric guidelines."],
    water: ["Daily Water Intake Calculator - Personalized Hydration Target", "Calculate your optimal daily fluid intake based on body weight and exercise sweat rate according to American College of Sports Medicine (ACSM) hydration standards."],
    ibw: ["Ideal Body Weight Calculator (Devine Formula & WHO Healthy Range)", "Find your ideal body weight (IBW) based on height using the clinical Devine formula and WHO BMI healthy benchmarks. Includes musculoskeletal limitations."],
    hr: ["Target Heart Rate Calculator (Tanaka & Karvonen) - Zone 2 Fat Burning", "Calculate your peak fat oxidation zone (Zone 2) and maximal heart rate using the Tanaka equation and Karvonen heart rate reserve method."],
  },
  zh: {
    splits: ["一字马横叉/竖叉进度打卡 - 髋关节活动度与柔韧性科学训练", "基于运动神经力学与本体感觉神经肌肉易化术（PNF），科学记录横叉与竖叉下落距离与开胯角度，打破牵张反射与韧带僵硬。"],
    macro: ["三大营养素比例计算器 (蛋白质/碳水/脂肪) - 循证运动营养配比", "基于国际运动营养学会（ISSN）标准，个性化测算减脂缺口、增肌盈余与维持期的蛋白质、碳水化合物及健康脂肪克数分配。"],
    bfp: ["体脂率计算器 (美国海军体围法 & BMI双模式) - 身体成分与骨骼肌分析", "支持美国海军体围测量法与 BMI 两种算法，精准测算体脂百分比、去脂体重与体型分布。提供人体测量学科学依据与健康区间诊断。"],
    bmr: ["BMR 基础代谢率计算器 (Mifflin-St Jeor 公式) - 每日热量与TDEE计算", "采用临床权威的 Mifflin-St Jeor 基础代谢计算公式，精确推导每日维持热量（BMR/TDEE）。包含科学依据推导、适用人群指南与减脂热量底线考量。"],
    water: ["每日饮水量动态计算器 - 科学补水与运动出汗量补偿", "根据美国运动医学会（ACSM）与国家医学院指南，基于体重代谢质量与运动排汗消耗，动态计算每日个性化饮水与电解质需求。"],
    ibw: ["标准理想体重计算器 (Devine 经典公式 & WHO 健康范围)", "采用临床药理学与世界卫生组织（WHO）公认的 Devine 理想体重计算方程，结合身高与骨架测算健康适宜体重区间。"],
    hr: ["靶心率与黄金燃脂区间计算器 (Tanaka公式 & Karvonen储备心率)", "基于 Tanaka 现代最大心率修正方程与 Karvonen 储备心率法，精准计算 Zone 2 最佳脂肪氧化心率区间，提升有氧心肺耐力。"],
  },
} satisfies Record<Lang, Record<(typeof TOOL_SLUGS)[number], [string, string]>>;

export function absoluteUrl(pathname = "") {
  if (!pathname) return SITE_URL;
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function getHomeSeo(lang: Lang) {
  return homeSeo[lang] ?? homeSeo.en;
}

export function getToolSeo(lang: Lang, slug: (typeof TOOL_SLUGS)[number]) {
  return toolSeo[lang][slug] ?? toolSeo.en[slug];
}

export function getMdFilesRecursive(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath).flatMap((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) return getMdFilesRecursive(fullPath);
    return file.endsWith(".md") ? [fullPath] : [];
  });
}

export function findMdFileRecursive(dirPath: string, targetSlug: string): string | null {
  if (!fs.existsSync(dirPath)) return null;

  for (const file of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const found = findMdFileRecursive(fullPath, targetSlug);
      if (found) return found;
    } else if (file.endsWith(".md") && path.basename(file, ".md") === targetSlug) {
      return fullPath;
    }
  }

  return null;
}

export function getArticles(lang: Lang): Article[] {
  const contentDir = path.join(/* turbopackIgnore: true */ process.cwd(), "content", lang);

  return getMdFilesRecursive(contentDir)
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const image = content.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1] ?? data.image;

      return {
        slug: path.basename(filePath, ".md"),
        title: data.title || path.basename(filePath, ".md"),
        description: data.description || "",
        date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date || "").split("T")[0],
        image,
        category: data.category || undefined,
        tags: Array.isArray(data.tags) ? data.tags : undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(lang: Lang, slug: string) {
  const filePath = findMdFileRecursive(
    path.join(/* turbopackIgnore: true */ process.cwd(), "content", lang),
    slug
  );
  if (!filePath) return null;

  const fileRaw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(fileRaw);
  const image = parsed.content.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1] ?? parsed.data.image;

  return {
    filePath,
    raw: fileRaw,
    content: parsed.content,
    data: parsed.data,
    image,
  };
}

export function localizedAlternates(pathname: string) {
  return {
    en: absoluteUrl(`/en${pathname}`),
    zh: absoluteUrl(`/zh${pathname}`),
    "x-default": absoluteUrl(`/en${pathname}`),
  };
}

export function buildPageMetadata({
  lang,
  pathname = "",
  title,
  description,
  type = "website",
  image,
  publishedTime,
}: {
  lang: Lang;
  pathname?: string;
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(`/${lang}${pathname}`);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title,
    description,
    keywords: getHomeSeo(lang).keywords,
    alternates: {
      canonical: url,
      languages: localizedAlternates(pathname),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type,
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
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
  };
}
