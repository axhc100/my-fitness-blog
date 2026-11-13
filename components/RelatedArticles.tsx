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

/**
 * 主题归一化映射：将细分/无 category 的历史文章精准映射到各大核心运动健康主题
 */
function resolveNormalizedTheme(category?: string, title?: string, tags?: string[]): string {
  const cat = (category || '').toLowerCase();
  const t = (title || '').toLowerCase();
  const tagsStr = (tags || []).join(' ').toLowerCase();
  const allText = `${cat} ${tagsStr} ${t}`;

  if (/瑜伽|普拉提|开胯|一字马|柔韧|筋膜|结缔组织|阴瑜伽|yoga|pilates|mobility|splits|stretch|fascia/i.test(cat || allText)) {
    return 'yoga';
  }
  if (/力量|增肌|肌肥大|分化|深蹲|卧推|硬拉|推举|负重|hypertrophy|strength|split|squat|bench|deadlift|press|overload/i.test(cat || allText)) {
    return 'strength';
  }
  if (/体态|塑形|骨盆|细腰|沙漏|肋骨|假胯宽|腹肌|马甲线|sculpt|tone|waist|rib flare|posture|abs/i.test(cat || allText)) {
    return 'sculpt';
  }
  if (/功能性|自重|单腿|动力链|动物流|徒手|calisthenics|functional|single-leg/i.test(cat || allText)) {
    return 'functional';
  }
  if (/hyrox|匹克球|网球|球拍|比赛|竞赛|热门运动|sports|pickleball/i.test(cat || allText)) {
    return 'sports';
  }
  if (/恢复|睡眠|昼夜节律|营养|补水|饮食|recovery|sleep|hydration|nutrition/i.test(cat || allText)) {
    return 'wellness';
  }
  return 'strength';
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

  // 严格主题与标签相关性算法
  const currentArt = articles.find((a) => a.slug === currentSlug);
  const currentTitle = currentArt?.title || '';
  const currentTheme = resolveNormalizedTheme(currentCategory, currentTitle, currentTags);
  const currentTagSet = new Set(currentTags);

  const scoredArticles = pool.map((art) => {
    let score = 0;
    const artTheme = resolveNormalizedTheme(art.category, art.title, art.tags);

    // 1. 同原始分类（最高优先级 +60）
    if (art.category && currentCategory && art.category.toLowerCase() === currentCategory.toLowerCase()) {
      score += 60;
    } else if (artTheme === currentTheme) {
      // 2. 同归一化主题大类（+40）
      score += 40;
    }

    // 3. 标签匹配加分（核心标签每个 +12，过滤过于通用的学科大词）
    if (Array.isArray(art.tags)) {
      for (const t of art.tags) {
        if (currentTagSet.has(t)) {
          if (/生物力学|运动生物力学|biomechanics/i.test(t)) {
            score += 2;
          } else {
            score += 12;
          }
        }
      }
    }

    // 4. 优先推荐已具备描述性语义 slug 的精品长文与指南（+100）
    const isDescriptiveSlug =
      !art.slug.startsWith('26-') &&
      !/^\d+$/.test(art.slug) &&
      !/^\d{2}-\d{2}/.test(art.slug);
    if (isDescriptiveSlug) {
      score += 100;
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
