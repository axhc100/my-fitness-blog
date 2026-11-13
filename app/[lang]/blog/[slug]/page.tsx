import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { marked } from 'marked';
import katex from 'katex';
import type { Metadata } from 'next';
import { getDictionary } from '../../../dictionaries';
import Image from 'next/image';
import parse, { Element, HTMLReactParserOptions, domToReact, DOMNode } from 'html-react-parser';
import RelatedToolCTA from '../../../../components/RelatedToolCTA';
import RelatedArticles from '../../../../components/RelatedArticles';
import ArticleTOC, { TocItem } from '../../../../components/ArticleTOC';
import {
  resolveArticleCategoryKey,
  CATEGORIES_CONFIG,
} from '@/lib/categories';
import {
  absoluteUrl,
  buildPageMetadata,
  getArticles,
  SITE_NAME,
  type Lang,
} from '../../../lib/seo';

function getMdFilesRecursive(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dirPath);

  list.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getMdFilesRecursive(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });

  return results;
}

function findMdFileRecursive(dirPath: string, targetSlug: string): string | null {
  if (!fs.existsSync(dirPath)) return null;

  const list = fs.readdirSync(dirPath);
  for (const file of list) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      const found = findMdFileRecursive(fullPath, targetSlug);
      if (found) return found;
    } else if (file.endsWith('.md')) {
      const slug = path.basename(file, '.md');
      if (slug === targetSlug) {
        return fullPath;
      }
    }
  }
  return null;
}

export async function generateStaticParams() {
  const languages = ['en', 'zh'];
  const paths: { lang: string; slug: string }[] = [];

  languages.forEach((lang) => {
    const dirPath = path.join(process.cwd(), 'content', lang);
    if (fs.existsSync(dirPath)) {
      const allFilePaths = getMdFilesRecursive(dirPath);
      allFilePaths.forEach((filePath) => {
        const slug = path.basename(filePath, '.md');
        paths.push({ lang, slug });
      });
    }
  });
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const baseContentDir = path.join(process.cwd(), 'content', lang);
  const filePath = findMdFileRecursive(baseContentDir, slug);

  if (!filePath || !fs.existsSync(filePath)) {
    return { title: 'Article Not Found - FitKit' };
  }

  const fileRaw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileRaw);
  const image = content.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1] ?? data.image;

  return buildPageMetadata({
    lang,
    pathname: `/blog/${slug}`,
    title: data.title || slug,
    description: data.description || '',
    type: 'article',
    image,
    publishedTime: data.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh'; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isZh = lang === 'zh';
  const dict = await getDictionary(lang);

  const baseContentDir = path.join(process.cwd(), 'content', lang);
  const filePath = findMdFileRecursive(baseContentDir, slug);

  if (!filePath || !fs.existsSync(filePath)) {
    return (
      <div className="p-10 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">{dict.articleNotFound}</p>
        <Link href={`/${lang}`} className="text-blue-600 hover:underline">
          {dict.backToHome}
        </Link>
      </div>
    );
  }

  const fileRaw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileRaw);

  let cleanContent = content;

  // 1. 清理文内可能存在的冗余目录标题
  cleanContent = cleanContent.replace(/^#{1,3}\s*(目录|Table of Contents|Content)\s*$/gmi, '');

  // 2. 消除与 H1 重复紧随其后的首个 H2 标题
  const firstH2Match = content.match(/^##\s+(.+)$/m);
  if (
    firstH2Match &&
    (firstH2Match[1].trim() === (data.title || '').trim() ||
      (data.title || '').includes(firstH2Match[1].trim()))
  ) {
    cleanContent = cleanContent.replace(/^##\s+.+$/m, '').trim();
  }

  // 3. LaTeX 公式预渲染（支持 $$...$$ 块级和 $...$ 行内数学公式）
  cleanContent = cleanContent.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return `\n\n<div class="katex-display my-4 overflow-x-auto text-center">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>\n\n`;
    } catch {
      return math;
    }
  });

  cleanContent = cleanContent.replace(/\$([^\$\n\r]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return math;
    }
  });

  // 4. 修复中文标点紧贴导致的 Markdown 加粗失效问题（如：**加粗**是）
  cleanContent = cleanContent.replace(/\*\*([^*\n\r]+?)\*\*/g, '<strong>$1</strong>');

  // 5. 自动生成正文 TOC 目录并为 H2 / H3 注入唯一锚点 ID（必须保留前后两重空行，防止截断后续 Markdown 表格）
  const tocItems: TocItem[] = [];
  let headingCounter = 0;
  const contentWithHeadingIds = cleanContent.replace(
    /^(#{2,3})\s+(.+)$/gm,
    (match, hashes, rawTitle) => {
      headingCounter++;
      const level = hashes.length;
      const plainText = rawTitle
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[*_`]/g, '')
        .trim();
      const id = `heading-${headingCounter}`;
      tocItems.push({ id, text: plainText, level });
      return `\n\n<h${level} id="${id}">${rawTitle}</h${level}>\n\n`;
    }
  );

  const htmlContent = await marked(contentWithHeadingIds);
  const heroImage = content.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1] ?? data.image;

  // 6. 计算阅读时长
  const wordCount = content.replace(/\s+/g, '').length;
  const readingMinutes = isZh
    ? Math.max(1, Math.ceil(wordCount / 450))
    : Math.max(1, Math.ceil(content.split(/\s+/).length / 220));
  const readingTimeText = isZh ? `阅读约 ${readingMinutes} 分钟` : `${readingMinutes} min read`;

  // 7. 标准化文章分类与面包屑
  const catKey = resolveArticleCategoryKey({
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category,
    tags: data.tags,
  });
  const catConfig = CATEGORIES_CONFIG[lang].find((c) => c.key === catKey) || CATEGORIES_CONFIG[lang][1];
  const categoryLabel = catConfig.label;

  // 8. 结构化数据 (Article + BreadcrumbList)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: heroImage ? [heroImage] : undefined,
    datePublished: data.date,
    dateModified: data.date,
    inLanguage: isZh ? 'zh-CN' : 'en',
    mainEntityOfPage: absoluteUrl(`/${lang}/blog/${slug}`),
    author: {
      '@type': 'Organization',
      name: isZh ? 'FitKit 科学团队' : 'FitKit Science Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: absoluteUrl(`/${lang}`),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '博客' : 'Blog',
        item: absoluteUrl(`/${lang}/#articles`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryLabel,
        item: absoluteUrl(`/${lang}/#articles`),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: data.title,
        item: absoluteUrl(`/${lang}/blog/${slug}`),
      },
    ],
  };

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // 包装所有表格，确保在宽屏和移动端 (360px) 均支持横向流畅滚动且永不重叠
      if (domNode instanceof Element && domNode.name === 'table') {
        return (
          <div className="w-full my-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm scrollbar-thin">
            <table className="w-full text-left text-sm" {...domNode.attribs}>
              {domToReact(domNode.children as DOMNode[], options)}
            </table>
          </div>
        );
      }

      if (domNode instanceof Element && domNode.name === 'p') {
        if (
          domNode.children.length === 1 &&
          domNode.children[0] instanceof Element &&
          domNode.children[0].name === 'img'
        ) {
          const imgNode = domNode.children[0];
          const { src, alt } = imgNode.attribs;
          const isVideo =
            src.endsWith('.mp4') || src.endsWith('.webm') || alt?.toLowerCase().includes('video');

          if (isVideo) {
            return (
              <span className="block w-full rounded-2xl overflow-hidden shadow-lg my-8 bg-black border border-gray-800 relative group">
                <video
                  src={src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[500px] object-contain block mx-auto"
                >
                  Your browser does not support the video tag.
                </video>
              </span>
            );
          }

          return (
            <span className="block w-full rounded-2xl overflow-hidden shadow-sm my-8 bg-gray-50 border border-gray-100">
              <Image
                src={src}
                alt={alt || 'FitKit Guide Visual'}
                width={1200}
                height={630}
                sizes="(max-width: 768px) 100vw, 800px"
                className="w-full h-auto object-cover block"
                unoptimized
              />
            </span>
          );
        }

        if (domNode.children.length === 1 && domNode.children[0].type === 'text') {
          const textContent = domNode.children[0].data.trim();
          if (textContent.startsWith('https://github.com/')) {
            return (
              <span className="block w-full rounded-2xl overflow-hidden shadow-md my-8 bg-gray-50/50">
                <Image
                  src={textContent}
                  alt="Blog Image"
                  width={800}
                  height={450}
                  sizes="100vw"
                  className="w-full h-auto object-contain block"
                  unoptimized
                />
              </span>
            );
          }
        }
      }
    },
  };

  const reactContent = parse(htmlContent, options);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-4 md:px-8 selection:bg-blue-100">
      <div className="max-w-5xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* 🍞 面包屑导航（移动端横向滚动不换行） */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-xs text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-none pb-4 mb-6"
        >
          <Link href={`/${lang}`} className="hover:text-blue-600 transition shrink-0">
            {isZh ? '首页' : 'Home'}
          </Link>
          <span className="shrink-0 text-gray-300">/</span>
          <Link href={`/${lang}/#articles`} className="hover:text-blue-600 transition shrink-0">
            {isZh ? '博客' : 'Blog'}
          </Link>
          <span className="shrink-0 text-gray-300">/</span>
          <Link href={`/${lang}/#articles`} className="hover:text-blue-600 transition shrink-0 font-medium text-gray-600">
            {categoryLabel}
          </Link>
          <span className="shrink-0 text-gray-300">/</span>
          <span className="text-gray-400 truncate max-w-xs">{data.title}</span>
        </nav>

        {/* 双栏布局：正文区 + 桌面端右侧吸顶 TOC */}
        <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
          <main className="w-full lg:max-w-3xl min-w-0">
            <article>
              {/* 文章头部 Header */}
              <header className="mb-8 border-b pb-6 border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${catConfig.badgeClass}`}>
                    {categoryLabel}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {data.date}
                  </span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400 font-medium">
                    {readingTimeText}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                  {data.title}
                </h1>

                {/* 作者简要栏（带头像） */}
                <div className="flex items-center gap-3 pt-2">
                  <Image
                    src="/images/author-avatar.jpg"
                    alt="FitKit Author"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      {isZh ? 'FitKit 运动科学组' : 'FitKit Science Team'}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {isZh ? '专注循证健身与健康数据' : 'Evidence-based sports science'}
                    </div>
                  </div>
                </div>
              </header>

              {/* 📱 仅在移动端渲染折叠目录抽屉 */}
              <ArticleTOC items={tocItems} lang={lang} mode="mobile" />

              {/* 正文渲染 */}
              <div
                className="prose prose-gray max-w-none leading-relaxed
                           prose-headings:font-bold prose-headings:text-gray-900
                           prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                           prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                           prose-p:text-gray-600 prose-p:mb-4 prose-p:text-sm md:prose-p:text-base
                           prose-strong:text-gray-900 prose-strong:font-bold
                           prose-ul:text-sm md:prose-ul:text-base prose-ul:space-y-1.5"
              >
                {reactContent}
              </div>

              {/* 文章标签 */}
              {Array.isArray(data.tags) && data.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-bold text-gray-400 mr-1">🏷️ Tags:</span>
                    {data.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/${lang}/#articles`}
                        className="text-xs px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200/60 transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 作者详细 Bio 卡片 */}
              <div className="my-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <Image
                  src="/images/author-avatar.jpg"
                  alt="FitKit Author"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      {isZh ? 'FitKit 科学健身团队' : 'FitKit Research & Fitness Team'}
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                      {isZh ? '认证作者' : 'Verified Author'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {isZh
                      ? '专注科学健身与健康数据工具，文章基于国际运动科学文献（ISSN, ACSM, PubMed）整理，仅供科普与训练参考。'
                      : 'Dedicated to evidence-based sports science and practical health calculators. Articles synthesized from peer-reviewed exercise physiology and clinical literature.'}
                  </p>
                </div>
              </div>
            </article>

            {/* 🛠️ 工具联动推荐 (Related Tool CTA) */}
            <RelatedToolCTA
              lang={lang}
              category={data.category}
              tags={data.tags}
              content={content}
            />

            {/* 📚 相关阅读 (Related Articles) */}
            <RelatedArticles
              lang={lang}
              currentSlug={slug}
              articles={getArticles(lang)}
            />
          </main>

          {/* 📑 桌面端右侧固定吸顶目录（仅在 lg 及以上展示，单份渲染绝无重复） */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <ArticleTOC items={tocItems} lang={lang} mode="desktop" />
          </aside>
        </div>
      </div>
    </div>
  );
}
