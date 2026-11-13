'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface SearchItem {
  id: string;
  type: 'tool' | 'article';
  title: string;
  url: string;
  summary: string;
  keywords?: string[];
  tags?: string[];
}

interface SearchBoxProps {
  locale: 'zh' | 'en';
}

const STATIC_SEARCH_ITEMS: Record<'zh' | 'en', SearchItem[]> = {
  zh: [
    {
      id: 'tool-bmr',
      type: 'tool',
      title: 'BMR 基础代谢与 TDEE 计算器',
      url: '/zh/tools/bmr',
      summary: '使用 Mifflin-St Jeor 公式算基础代谢与每日总消耗，提供减脂维持增肌目标。',
      keywords: ['基础代谢', 'BMR', 'TDEE', '每日热量', '代谢', '卡路里'],
    },
    {
      id: 'tool-macro',
      type: 'tool',
      title: '三大营养素宏量配比计算器',
      url: '/zh/tools/macro',
      summary: '精准测算减脂、增肌或维持期蛋白质、碳水与健康脂肪最佳克数分配。',
      keywords: ['三大营养素', '宏量', '蛋白质', '碳水', '脂肪', '饮食配比'],
    },
    {
      id: 'tool-bfp',
      type: 'tool',
      title: '体脂率计算器 (美国海军体围法)',
      url: '/zh/tools/bfp',
      summary: '使用颈围、腰围、臀围精准测算体脂百分比与去脂体重。',
      keywords: ['体脂率', '体脂', '去脂体重', '海军体围', 'BFP'],
    },
    {
      id: 'tool-water',
      type: 'tool',
      title: '每日饮水量动态计算器',
      url: '/zh/tools/water',
      summary: '根据体重代谢与运动出汗量，科学测算每日最佳饮水量。',
      keywords: ['饮水', '喝水', '补水', '脱水', '出汗'],
    },
    {
      id: 'tool-ibw',
      type: 'tool',
      title: '标准理想体重计算器 (Devine)',
      url: '/zh/tools/ibw',
      summary: '结合身高与骨骼测算健康适宜标准体重区间。',
      keywords: ['标准体重', '理想体重', 'BMI', '体重对照'],
    },
    {
      id: 'tool-hr',
      type: 'tool',
      title: '燃脂心率与 Zone 2 区间计算器',
      url: '/zh/tools/hr',
      summary: '测算最大心率与 Zone 2 最佳脂肪氧化心率区间。',
      keywords: ['燃脂心率', '心率区间', 'Zone 2', '有氧', '最大心率'],
    },
    {
      id: 'tool-splits',
      type: 'tool',
      title: '一字马进度打卡与柔韧度追踪',
      url: '/zh/tools/splits',
      summary: '记录横叉与竖叉下落距离与开胯角度，记录柔韧进步。',
      keywords: ['一字马', '开胯', '劈叉', '柔韧性', '拉伸'],
    },
  ],
  en: [
    {
      id: 'tool-bmr',
      type: 'tool',
      title: 'BMR & TDEE Calculator',
      url: '/en/tools/bmr',
      summary: 'Calculate BMR and Total Daily Energy Expenditure with calorie targets.',
      keywords: ['bmr', 'tdee', 'metabolism', 'calories', 'cut', 'bulk'],
    },
    {
      id: 'tool-macro',
      type: 'tool',
      title: 'Macronutrient Calculator',
      url: '/en/tools/macro',
      summary: 'Calculate daily protein, carbohydrates, and fats split tailored for fitness goals.',
      keywords: ['macro', 'protein', 'carbs', 'fats', 'nutrition', 'diet'],
    },
    {
      id: 'tool-bfp',
      type: 'tool',
      title: 'Body Fat Calculator (US Navy)',
      url: '/en/tools/bfp',
      summary: 'Estimate body fat percentage and lean mass using circumference measurements.',
      keywords: ['body fat', 'bfp', 'navy tape', 'lean mass'],
    },
    {
      id: 'tool-water',
      type: 'tool',
      title: 'Daily Water Intake Calculator',
      url: '/en/tools/water',
      summary: 'Determine optimal hydration based on body weight and workout sweat rate.',
      keywords: ['water', 'hydration', 'fluid intake', 'electrolytes'],
    },
    {
      id: 'tool-ibw',
      type: 'tool',
      title: 'Ideal Body Weight Calculator',
      url: '/en/tools/ibw',
      summary: 'Find healthy ideal weight range using the clinical Devine formula.',
      keywords: ['ideal weight', 'ibw', 'healthy weight', 'bmi'],
    },
    {
      id: 'tool-hr',
      type: 'tool',
      title: 'Target Heart Rate & Zone 2 Calculator',
      url: '/en/tools/hr',
      summary: 'Calculate maximum heart rate and optimal Zone 2 fat-burning zone.',
      keywords: ['heart rate', 'zone 2', 'fat burning', 'cardio'],
    },
    {
      id: 'tool-splits',
      type: 'tool',
      title: 'Splits Progression Tracker',
      url: '/en/tools/splits',
      summary: 'Track front and middle splits flexibility and hip mobility progression.',
      keywords: ['splits', 'flexibility', 'hip mobility', 'stretching'],
    },
  ],
};

export default function SearchBox({ locale }: SearchBoxProps) {
  const isZh = locale === 'zh';
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 快捷键 Cmd/Ctrl + K 打开，Esc 关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // 防抖过滤搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        setResults([]);
        return;
      }

      const items = STATIC_SEARCH_ITEMS[locale] || STATIC_SEARCH_ITEMS.en;
      const matched = items.filter((item) => {
        const fullString = [
          item.title,
          item.summary,
          ...(item.keywords || []),
          ...(item.tags || []),
        ]
          .join(' ')
          .toLowerCase();
        return fullString.includes(q);
      });

      setResults(matched);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, locale]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <>
      {/* 搜索入口按钮 */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={isZh ? '站内搜索 (Ctrl+K)' : 'Search site (Ctrl+K)'}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/80 rounded-xl transition border border-gray-200/50"
      >
        <span>🔍</span>
        <span className="hidden sm:inline font-medium">
          {isZh ? '搜索工具...' : 'Search tools...'}
        </span>
        <kbd className="hidden sm:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-400">
          ⌘K
        </kbd>
      </button>

      {/* 搜索遮罩层与弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-gray-900/40 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 输入框 */}
            <div className="relative border-b border-gray-100 p-4 flex items-center gap-3">
              <span className="text-gray-400 text-base">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isZh
                    ? '搜索计算器、代谢、营养或减脂指标...'
                    : 'Search calculators, BMR, macros, hydration...'
                }
                className="w-full text-sm text-gray-900 focus:outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md bg-gray-50 border"
              >
                ESC
              </button>
            </div>

            {/* 结果列表 */}
            <div className="max-h-80 overflow-y-auto p-2">
              {query && results.length === 0 && (
                <div className="py-8 text-center text-xs text-gray-400">
                  {isZh
                    ? '没有找到相关内容，试试 BMR、体脂率、增肌、饮水'
                    : 'No results. Try BMR, body fat, macros, or water.'}
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
                    {isZh ? '匹配工具' : 'Tools'}
                  </div>
                  {results.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.url)}
                      className="w-full text-left p-3 rounded-xl hover:bg-blue-50/70 transition flex flex-col group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                        {item.summary}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {!query && (
                <div className="p-4 text-center text-xs text-gray-400 space-y-1">
                  <p>
                    {isZh
                      ? '输入关键词快速直达健康工具或指南'
                      : 'Type keywords to instantly jump to tools and guides.'}
                  </p>
                  <p className="text-[11px] text-gray-300">
                    {isZh ? '支持快捷键 ⌘K / Ctrl+K 快速唤起' : 'Shortcut: ⌘K or Ctrl+K to search'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
