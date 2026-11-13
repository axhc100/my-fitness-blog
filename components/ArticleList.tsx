'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CategoryKey,
  CATEGORIES_CONFIG,
  resolveArticleCategoryKey,
} from '@/lib/categories';

export interface ArticleItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
}

interface ArticleListProps {
  articles: ArticleItem[];
  lang: 'en' | 'zh';
  readMoreText: string;
}

const POSTS_PER_PAGE = 5;

export default function ArticleList({ articles, lang, readMoreText }: ArticleListProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = CATEGORIES_CONFIG[lang] || CATEGORIES_CONFIG.en;

  // Filter articles based on normalized category key
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((art) => resolveArticleCategoryKey(art) === selectedCategory);
  }, [articles, selectedCategory]);

  const handleSelectCategory = (key: CategoryKey) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredArticles.slice(start, start + POSTS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  return (
    <div>
      {/* 🏷️ 分类胶囊筛选器 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => handleSelectCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 📄 文章列表 */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-sm text-gray-400">
          💡 {lang === 'zh' ? '该分类下暂无文章，新干货火速撰写中...' : 'No articles found in this category yet...'}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedArticles.map((art) => {
            const catKey = resolveArticleCategoryKey(art);
            const catMeta = categories.find((c) => c.key === catKey) || categories[1];

            return (
              <Link
                key={art.slug}
                href={`/${lang}/blog/${art.slug}`}
                className="block p-6 bg-white rounded-2xl border border-gray-100/90 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 group"
              >
                {/* 🏷️ 卡片分类标签与日期 */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${catMeta.badgeClass}`}
                  >
                    {catMeta.label}
                  </span>
                  <span
                    className="text-xs text-gray-400 font-mono whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100"
                    suppressHydrationWarning
                  >
                    {art.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition duration-200 mb-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {art.description}
                </p>
                <span className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                  {readMoreText} <span>→</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* 🎯 客户端平滑无刷新分页导航 */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
          {currentPage > 1 ? (
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-600 transition shadow-sm cursor-pointer"
            >
              ← {lang === 'zh' ? '上一页' : 'Prev'}
            </button>
          ) : (
            <span className="px-4 py-2 text-gray-300 text-xs font-bold bg-gray-50 border border-gray-100 rounded-xl cursor-not-allowed">
              ← {lang === 'zh' ? '上一页' : 'Prev'}
            </span>
          )}

          <span className="text-xs text-gray-400 font-mono bg-white px-3 py-1 rounded-full border shadow-sm">
            {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages ? (
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-600 transition shadow-sm cursor-pointer"
            >
              {lang === 'zh' ? '下一页' : 'Next'} →
            </button>
          ) : (
            <span className="px-4 py-2 text-gray-300 text-xs font-bold bg-gray-50 border border-gray-100 rounded-xl cursor-not-allowed">
              {lang === 'zh' ? '下一页' : 'Next'} →
            </span>
          )}
        </div>
      )}
    </div>
  );
}
