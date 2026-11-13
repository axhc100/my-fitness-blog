'use client';

import React, { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTOCProps {
  items: TocItem[];
  lang: 'en' | 'zh';
  mode?: 'mobile' | 'desktop';
}

export default function ArticleTOC({ items, lang, mode = 'desktop' }: ArticleTOCProps) {
  const isZh = lang === 'zh';
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      let currentActive = items[0]?.id || '';

      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActive = items[i].id;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  if (mode === 'mobile') {
    return (
      <details className="lg:hidden mb-8 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl group text-xs">
        <summary className="font-bold text-gray-800 cursor-pointer list-none flex items-center justify-between select-none">
          <span className="flex items-center gap-2">
            <span>📑</span>
            <span>{isZh ? '本篇章节目录' : 'Table of Contents'}</span>
            <span className="text-[10px] text-gray-400 font-normal">({items.length} 节)</span>
          </span>
          <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <ul className="mt-3 pt-3 border-t border-slate-200/60 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={`${item.level === 3 ? 'ml-3 text-gray-500' : 'font-semibold text-gray-700'}`}
            >
              <a
                href={`#${item.id}`}
                className="hover:text-blue-600 transition block py-0.5 line-clamp-1"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    );
  }

  return (
    <div className="w-full">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 pb-2 border-b border-gray-100 flex items-center gap-1.5 mb-3">
        <span>📑</span>
        <span>{isZh ? '本篇导读' : 'On This Page'}</span>
      </div>
      <nav aria-label="Table of contents">
        <ul className="space-y-1.5 text-xs">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`${item.level === 3 ? 'ml-3' : ''}`}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-1 transition-colors leading-relaxed line-clamp-2 ${
                    isActive
                      ? 'text-blue-600 font-bold border-l-2 border-blue-600 pl-2 -ml-2.5'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
