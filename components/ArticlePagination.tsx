import Link from 'next/link';
import { Lang, Article } from '@/app/lib/seo';

interface ArticlePaginationProps {
  lang: Lang;
  prevArticle: Article | null;
  nextArticle: Article | null;
}

export default function ArticlePagination({
  lang,
  prevArticle,
  nextArticle,
}: ArticlePaginationProps) {
  const isZh = lang === 'zh';

  if (!prevArticle && !nextArticle) return null;

  return (
    <nav
      aria-label="Article Pagination"
      className="my-10 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* 上一篇 (按时间降序排列中的下一条，即更早发布的文章) */}
      {prevArticle ? (
        <Link
          href={`/${lang}/blog/${prevArticle.slug}`}
          className="group flex flex-col p-4 sm:p-5 rounded-2xl bg-gray-50/70 hover:bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
        >
          <span className="text-[11px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors flex items-center gap-1 mb-1.5">
            ← {isZh ? '上一篇' : 'Previous Article'}
          </span>
          <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {prevArticle.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* 下一篇 (按时间降序排列中的上一条，即更新发布的文章) */}
      {nextArticle ? (
        <Link
          href={`/${lang}/blog/${nextArticle.slug}`}
          className="group flex flex-col items-start sm:items-end text-left sm:text-right p-4 sm:p-5 rounded-2xl bg-gray-50/70 hover:bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
        >
          <span className="text-[11px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors flex items-center gap-1 mb-1.5">
            {isZh ? '下一篇' : 'Next Article'} →
          </span>
          <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {nextArticle.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
