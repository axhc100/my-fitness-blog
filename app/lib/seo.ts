import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export const SITE_URL = "https://www.fitkit.top";
export const SITE_NAME = "FitKit";
export const LANGUAGES = ["en", "zh"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const TOOL_SLUGS = ["splits", "macro", "bfp", "bmr", "water", "ibw", "hr"] as const;

type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
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
    splits: ["Splits Tracker", "Track stretching consistency and flexibility progress toward front splits or middle splits."],
    macro: ["Macro Calculator", "Calculate daily protein, carbohydrate and fat targets based on your body and fitness goal."],
    bfp: ["Body Fat Calculator", "Estimate your body fat percentage quickly with a simple fitness calculator."],
    bmr: ["BMR Calculator", "Find your basal metabolic rate and understand daily calorie needs."],
    water: ["Daily Water Calculator", "Calculate a personalized daily hydration target from your body weight and activity."],
    ibw: ["Ideal Weight Calculator", "Estimate a healthy ideal body weight range using established formulas."],
    hr: ["Fat Burning Heart Rate Calculator", "Calculate cardio heart rate zones for more efficient fat-burning workouts."],
  },
  zh: {
    splits: ["一字马进度打卡", "记录拉伸习惯和柔韧性进步，帮助你持续接近横叉或竖叉目标。"],
    macro: ["三大营养素计算器", "根据身体数据和健身目标，计算每日蛋白质、碳水和脂肪摄入量。"],
    bfp: ["体脂率计算器", "用简单的健身计算器快速估算身体脂肪百分比。"],
    bmr: ["BMR 基础代谢计算器", "计算基础代谢率，了解每日热量需求。"],
    water: ["每日饮水量计算器", "根据体重和运动状态生成个性化每日补水目标。"],
    ibw: ["标准体重计算器", "使用经典公式估算适合身高区间的健康理想体重。"],
    hr: ["燃脂心率区间计算器", "计算有氧训练心率区间，让减脂运动更有方向。"],
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
        date: data.date || "",
        image,
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
