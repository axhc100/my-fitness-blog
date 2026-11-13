export type CategoryKey = 'all' | 'strength' | 'yoga' | 'sculpt' | 'wellness';

export interface CategoryItem {
  key: CategoryKey;
  label: string;
  badgeClass: string;
}

export const CATEGORIES_CONFIG: Record<'zh' | 'en', CategoryItem[]> = {
  zh: [
    { key: 'all', label: '全部文章', badgeClass: 'bg-gray-100 text-gray-700' },
    { key: 'strength', label: '力量与增肌', badgeClass: 'bg-slate-900 text-white' },
    { key: 'yoga', label: '瑜伽与柔韧度', badgeClass: 'bg-teal-50 text-teal-800 border border-teal-200' },
    { key: 'sculpt', label: '体态与塑形', badgeClass: 'bg-indigo-50 text-indigo-800 border border-indigo-200' },
    { key: 'wellness', label: '恢复与营养', badgeClass: 'bg-amber-50 text-amber-900 border border-amber-200' },
  ],
  en: [
    { key: 'all', label: 'All Topics', badgeClass: 'bg-gray-100 text-gray-700' },
    { key: 'strength', label: 'Strength & Hypertrophy', badgeClass: 'bg-slate-900 text-white' },
    { key: 'yoga', label: 'Yoga & Mobility', badgeClass: 'bg-teal-50 text-teal-800 border border-teal-200' },
    { key: 'sculpt', label: 'Body Sculpting', badgeClass: 'bg-indigo-50 text-indigo-800 border border-indigo-200' },
    { key: 'wellness', label: 'Recovery & Nutrition', badgeClass: 'bg-amber-50 text-amber-900 border border-amber-200' },
  ],
};

/**
 * 核心分类归一化算法：在 Server Component 和 Client Component 中均可无缝安全调用
 */
export function resolveArticleCategoryKey(article: {
  slug?: string;
  category?: string;
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
}): Exclude<CategoryKey, 'all'> {
  const cat = (article.category || '').toLowerCase();
  const title = (article.title || '').toLowerCase();
  const tagsStr = (article.tags || []).join(' ').toLowerCase();
  const allText = `${cat} ${tagsStr} ${title}`;

  // 1. 优先匹配明确的瑜伽/柔韧
  if (/瑜伽|普拉提|开胯|一字马|柔韧|筋膜|结缔组织|yoga|pilates|mobility|splits|stretch|fascia/i.test(cat || allText)) {
    return 'yoga';
  }

  // 2. 匹配体态与塑形
  if (/体态|塑形|骨盆|细腰|沙漏|肋骨|假胯宽|腹肌|马甲线|sculpt|tone|waist|rib flare|posture|abs/i.test(cat || allText)) {
    return 'sculpt';
  }

  // 3. 匹配营养与恢复
  if (/营养|饮食|蛋白质|宏量|卡路里|热量|补水|睡眠|恢复|hyrox|有氧|耐力|nutrition|diet|protein|macro|calorie|sleep|recovery|hydration|cardio|endurance/i.test(cat || allText)) {
    return 'wellness';
  }

  // 4. 其余归入力量与增肌
  return 'strength';
}
