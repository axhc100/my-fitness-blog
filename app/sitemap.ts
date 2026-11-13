import type { MetadataRoute } from "next";
import { absoluteUrl, getArticles, LANGUAGES, localizedAlternates, TOOL_SLUGS } from "./lib/seo";

export const STATIC_PAGES = ["tools", "about", "contact", "privacy", "terms", "cookies"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/en"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages: localizedAlternates("") },
    },
    {
      url: absoluteUrl("/zh"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages: localizedAlternates("") },
    },
  ];

  for (const lang of LANGUAGES) {
    for (const page of STATIC_PAGES) {
      const pathname = `/${page}`;
      urls.push({
        url: absoluteUrl(`/${lang}${pathname}`),
        lastModified: now,
        changeFrequency: page === "tools" ? "weekly" : "monthly",
        priority: page === "tools" ? 0.9 : 0.6,
        alternates: { languages: localizedAlternates(pathname) },
      });
    }

    for (const slug of TOOL_SLUGS) {
      const pathname = `/tools/${slug}`;
      urls.push({
        url: absoluteUrl(`/${lang}${pathname}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: { languages: localizedAlternates(pathname) },
      });
    }

    for (const article of getArticles(lang)) {
      const pathname = `/blog/${article.slug}`;
      urls.push({
        url: absoluteUrl(`/${lang}${pathname}`),
        lastModified: article.date ? new Date(article.date) : now,
        changeFrequency: "monthly",
        priority: 0.72,
        alternates: { languages: localizedAlternates(pathname) },
      });
    }
  }

  return urls;
}