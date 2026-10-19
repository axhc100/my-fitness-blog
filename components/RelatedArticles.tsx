import Link from 'next/link';
import { Lang, Article } from '@/app/lib/seo';

interface RelatedArticlesProps {
  lang: Lang;
  currentSlug: string;
  articles: Article[];
}

export default function RelatedArticles({ lang, currentSlug, articles }: RelatedArticlesProps) {
  // Exclude current article and pick 3 related ones
  const filtered = articles.filter((a) => a.slug !== currentSlug).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <div className="my-12 pt-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>📚</span>
          <span>{lang === 'zh' ? '推荐阅读' : 'Recommended Reading'}</span>
        </h3>
        <Link
          href={`/${lang}`}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
        >
          {lang === 'zh' ? '查看全部 →' : 'View All →'}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((art) => (
          <Link
            key={art.slug}
            href={`/${lang}/blog/${art.slug}`}
            className="flex flex-col justify-between p-5 bg-gray-50/70 hover:bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200 group"
          >
            <div>
              <span className="text-[11px] font-mono text-gray-400 block mb-1.5" suppressHydrationWarning>
                {art.date}
              </span>
              <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {art.title}
              </h4>
            </div>
            <span className="text-[11px] font-bold text-blue-500 mt-4 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              {lang === 'zh' ? '阅读全文' : 'Read Now'} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
