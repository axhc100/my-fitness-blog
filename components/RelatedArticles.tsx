import Link from 'next/link';
import { Lang, Article } from '@/app/lib/seo';
import { resolveArticleCategoryKey, CATEGORIES_CONFIG } from '@/lib/categories';

interface RelatedArticlesProps {
  lang: Lang;
  currentSlug: string;
  currentCategory?: string;
  currentTags?: string[];
  articles: Article[];
}

export default function RelatedArticles({
  lang,
  currentSlug,
  currentCategory,
  currentTags = [],
  articles,
}: RelatedArticlesProps) {
  // 排除当前文章
  const pool = articles.filter((a) => a.slug !== currentSlug);

  if (pool.length === 0) return null;

  // 优先级计算：同分类 + 同标签权重最高，其次按发布时间排序
  const currentKey = currentCategory || '';
  const currentTagSet = new Set(currentTags);

  const scoredArticles = pool.map((art) => {
    let score = 0;

    // 1. 同分类权重
    const artCatKey = resolveArticleCategoryKey(art);
    if (artCatKey && artCatKey === currentKey) {
      score += 10;
    } else if (art.category && art.category === currentCategory) {
      score += 10;
    }

    // 2. 同标签权重（每个重合标签 +3 分）
    if (Array.isArray(art.tags)) {
      for (const t of art.tags) {
        if (currentTagSet.has(t)) {
          score += 3;
        }
      }
    }

    return { art, score };
  });

  // 排序：score 从高到低，相同时按时间降序
  scoredArticles.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.art.date).getTime() - new Date(a.art.date).getTime();
  });

  const selected = scoredArticles.slice(0, 3).map((item) => item.art);

  return (
    <div className="my-12 pt-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>📚</span>
          <span>{lang === 'zh' ? '推荐阅读' : 'Recommended Reading'}</span>
        </h3>
        <Link
          href={`/${lang}/#articles`}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
        >
          {lang === 'zh' ? '查看全部 →' : 'View All →'}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selected.map((art) => {
          const catKey = resolveArticleCategoryKey(art);
          const catConfig =
            CATEGORIES_CONFIG[lang].find((c) => c.key === catKey) || CATEGORIES_CONFIG[lang][1];

          return (
            <Link
              key={art.slug}
              href={`/${lang}/blog/${art.slug}`}
              className="flex flex-col justify-between p-5 bg-gray-50/70 hover:bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catConfig.badgeClass}`}>
                    {catConfig.label}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400" suppressHydrationWarning>
                    {art.date}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h4>
              </div>
              <span className="text-[11px] font-bold text-blue-500 mt-4 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                {lang === 'zh' ? '阅读全文' : 'Read Now'} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
