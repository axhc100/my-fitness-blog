'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ToolScientificGuide from '@/components/ToolScientificGuide';

interface ProteinClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

type GoalKey = 'maintenance' | 'hypertrophy' | 'cutting' | 'endurance';

export default function ProteinClient({ paramsPromise }: ProteinClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState<GoalKey>('hypertrophy');
  const [meals, setMeals] = useState('4');

  const [result, setResult] = useState<{
    targetDaily: number;
    minDaily: number;
    maxDaily: number;
    perMeal: number;
    mealsCount: number;
    weight: number;
    goalLabel: string;
    factorRange: string;
    chickenGrams: number;
    eggsCount: number;
    beefGrams: number;
    wheyScoops: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const savedWeight = localStorage.getItem('fitkit_protein_weight');
    const savedGoal = localStorage.getItem('fitkit_protein_goal') as GoalKey;
    const savedMeals = localStorage.getItem('fitkit_protein_meals');

    if (savedWeight) setWeight(savedWeight);
    if (savedGoal) setGoal(savedGoal);
    if (savedMeals) setMeals(savedMeals);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (weight) localStorage.setItem('fitkit_protein_weight', weight);
      localStorage.setItem('fitkit_protein_goal', goal);
      localStorage.setItem('fitkit_protein_meals', meals);
    }
  }, [weight, goal, meals, mounted]);

  const goalConfigs: Record<
    GoalKey,
    {
      zh: string;
      en: string;
      min: number;
      max: number;
      baseline: number;
      descZh: string;
      descEn: string;
    }
  > = {
    hypertrophy: {
      zh: '力量抗阻增肌 (Hypertrophy)',
      en: 'Muscle Hypertrophy & Strength',
      min: 1.6,
      max: 2.2,
      baseline: 2.0,
      descZh: '国际运动营养学会（ISSN）黄金增肌区间，最大化刺激肌原纤维蛋白质合成（MPS）。',
      descEn: 'ISSN gold standard for stimulating maximum muscle protein synthesis with progressive overload.',
    },
    cutting: {
      zh: '减脂期防掉肌 (Cutting / Fat Loss)',
      en: 'Fat Loss & Muscle Retention',
      min: 1.8,
      max: 2.4,
      baseline: 2.0,
      descZh: '热量赤字期提高蛋白质比例以抵抗肌肉分解糖异生，并利用高热效应（TEF）增强饱腹感。',
      descEn: 'Higher intake protects lean tissue against gluconeogenic breakdown during calorie deficits.',
    },
    maintenance: {
      zh: '久坐维持健康 (Maintenance)',
      en: 'Sedentary & Maintenance',
      min: 0.8,
      max: 1.0,
      baseline: 1.0,
      descZh: '世界卫生组织（WHO）及各国膳食指南（RDA）推荐的健康成年人基础氮平衡摄入底线。',
      descEn: 'WHO baseline RDA requirement to maintain essential daily nitrogen balance.',
    },
    endurance: {
      zh: '耐力有氧训练 (Endurance)',
      en: 'Endurance & Cardio Training',
      min: 1.2,
      max: 1.6,
      baseline: 1.4,
      descZh: '长跑、骑行等高耐力运动所需，用于补充运动造成的氨基酸氧化消耗并加速线粒体恢复。',
      descEn: 'Compensates for amino acid oxidation during prolonged aerobic exercise.',
    },
  };

  const calculateProtein = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(weight);
    const m = parseInt(meals, 10);
    if (!w || w <= 0 || !m || m <= 0) return;

    const cfg = goalConfigs[goal];
    const targetDaily = Math.round(w * cfg.baseline);
    const minDaily = Math.round(w * cfg.min);
    const maxDaily = Math.round(w * cfg.max);
    const perMeal = Math.round(targetDaily / m);

    // Food equivalents:
    // Chicken breast: ~23g protein per 100g raw
    const chickenGrams = Math.round(targetDaily / 0.23);
    // Medium egg: ~6.5g protein
    const eggsCount = Math.round(targetDaily / 6.5);
    // Lean beef: ~21g protein per 100g
    const beefGrams = Math.round(targetDaily / 0.21);
    // Whey scoop: ~24g protein per scoop
    const wheyScoops = parseFloat((targetDaily / 24).toFixed(1));

    setResult({
      targetDaily,
      minDaily,
      maxDaily,
      perMeal,
      mealsCount: m,
      weight: w,
      goalLabel: cfg[lang],
      factorRange: `${cfg.min}–${cfg.max} g/kg`,
      chickenGrams,
      eggsCount,
      beefGrams,
      wheyScoops,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = isZh
      ? `【每日蛋白质需求测算】目标：${result.goalLabel}\n• 推荐摄入总量：${result.targetDaily} g/天（推荐区间：${result.minDaily}–${result.maxDaily} g/天）\n• 分餐分配（${result.mealsCount}餐）：每餐约 ${result.perMeal} g\n• 食物等效：约等于 ${result.chickenGrams}g 鸡胸肉 / ${result.eggsCount} 个鸡蛋 / ${result.wheyScoops} 勺蛋白粉\n测算自 FitKit 科学营养工具箱：https://www.fitkit.top/zh/tools/protein`
      : `[Daily Protein Target] Goal: ${result.goalLabel}\n• Target Intake: ${result.targetDaily} g/day (Optimal Range: ${result.minDaily}–${result.maxDaily} g/day)\n• Meal Spacing (${result.mealsCount} meals): ~${result.perMeal} g/meal\n• Whole Food Equivalent: ~${result.chickenGrams}g chicken breast / ${result.eggsCount} eggs / ${result.wheyScoops} whey scoops\nCalculated on FitKit Health Tools: https://www.fitkit.top/en/tools/protein`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://www.fitkit.top';
    const title = isZh ? 'FitKit 每日蛋白质需求与分餐计算器' : 'FitKit Daily Protein Intake Calculator';
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/60 py-8 md:py-12 px-4 flex flex-col items-center text-gray-900">
      <div className="w-full max-w-3xl">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
          <Link href={`/${lang}`} className="hover:text-blue-600 transition">
            {isZh ? '首页' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/tools`} className="hover:text-blue-600 transition">
            {isZh ? '健康工具箱' : 'Tools'}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">
            {isZh ? '每日蛋白质需求计算器' : 'Protein Calculator'}
          </span>
        </nav>

        {/* Main Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-block p-3 bg-amber-50 text-amber-600 rounded-2xl text-2xl mb-3 shadow-inner">
              🥩
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isZh ? '每日蛋白质需求与分餐计算器' : 'Daily Protein Requirement Calculator'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isZh
                ? '基于国际运动营养学会（ISSN）循证标准，根据体重与训练目标精准测算全天蛋白质克数、分餐摄入建议及常见天然食物等效对照。'
                : 'Calculate your optimal daily protein requirements and per-meal distribution based on ISSN scientific benchmarks.'}
            </p>
          </div>

          {/* Formula & Benchmark Card */}
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-gray-700 leading-relaxed max-w-lg mx-auto">
            <div className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span>📐</span>
              <span>{isZh ? '核心摄入标准与验算示例' : 'Intake Benchmarks & Validation'}</span>
            </div>
            <div className="font-mono text-amber-800 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 mb-2 space-y-0.5 text-[11px]">
              <div>• {isZh ? '基础维持：0.8–1.0 g / kg 体重' : 'Maintenance: 0.8–1.0 g/kg'}</div>
              <div>• {isZh ? '力量增肌：1.6–2.2 g / kg 体重 (基准 2.0 g/kg)' : 'Hypertrophy: 1.6–2.2 g/kg (Baseline: 2.0 g/kg)'}</div>
              <div>• {isZh ? '减脂防掉肌：1.8–2.4 g / kg 体重 (基准 2.0 g/kg)' : 'Cutting: 1.8–2.4 g/kg (Baseline: 2.0 g/kg)'}</div>
            </div>
            <div className="text-[11px] text-gray-600 bg-slate-100/80 p-2.5 rounded-lg mb-2">
              <span className="font-semibold text-gray-700">{isZh ? '验算示例：' : 'Validation Example: '}</span>
              {isZh ? '70kg 增肌按 2.0 算 → 70 × 2.0 = 140g / 天' : '70kg muscle building @ 2.0 g/kg → 70 × 2.0 = 140g/day'}
            </div>
            <div className="text-[11px] text-amber-900 bg-amber-50/90 p-2 rounded-lg border border-amber-200/60">
              💡 {isZh
                ? '分餐吸收原则：建议每餐摄入 25–45g 优质蛋白质，充分激活肌肉蛋白质合成（MPS）开关。'
                : 'Distribution Tip: Spacing 25–45g of protein per meal optimally triggers Muscle Protein Synthesis.'}
            </div>
          </div>

          <form onSubmit={calculateProtein} className="space-y-6 max-w-lg mx-auto">
            {/* Weight Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isZh ? '当前体重 (kg)' : 'Body Weight (kg)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="30"
                  max="250"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                  kg
                </span>
              </div>
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isZh ? '健身目标与运动强度' : 'Training Goal & Activity'}
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as GoalKey)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              >
                <option value="hypertrophy">{goalConfigs.hypertrophy[lang]}</option>
                <option value="cutting">{goalConfigs.cutting[lang]}</option>
                <option value="endurance">{goalConfigs.endurance[lang]}</option>
                <option value="maintenance">{goalConfigs.maintenance[lang]}</option>
              </select>
              <p className="text-[11px] text-gray-400 mt-1.5 leading-normal">
                {goalConfigs[goal][isZh ? 'descZh' : 'descEn']}
              </p>
            </div>

            {/* Meals Spacing Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isZh ? '每日分餐餐数' : 'Daily Meals Spacing'}
              </label>
              <select
                value={meals}
                onChange={(e) => setMeals(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              >
                <option value="3">{isZh ? '3 餐（早、午、晚）' : '3 Meals (Breakfast, Lunch, Dinner)'}</option>
                <option value="4">{isZh ? '4 餐（推荐：3正餐 + 1练后加餐）' : '4 Meals (3 Meals + 1 Post-Workout)'}</option>
                <option value="5">{isZh ? '5 餐（多餐少食：3正餐 + 2加餐）' : '5 Meals (Frequent Spacing)'}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isZh ? '立即测算蛋白质目标' : 'Calculate Protein Targets'}</span>
              <span>→</span>
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-8 border-t border-gray-100 max-w-xl mx-auto animate-fade-in">
              <div className="p-6 sm:p-7 rounded-3xl bg-amber-50/70 border border-amber-200 text-center">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-900">
                    {result.goalLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-200/80 text-amber-950">
                    {result.factorRange}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  {isZh ? '推荐每日蛋白质摄入基准总量' : 'Recommended Daily Protein Target'}
                </div>

                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-black text-amber-700 tracking-tight">
                    {result.targetDaily}
                  </span>
                  <span className="text-lg font-bold text-amber-900/60">g / {isZh ? '天' : 'day'}</span>
                </div>

                <div className="text-xs text-amber-900/80 leading-relaxed max-w-md mx-auto">
                  {isZh
                    ? `根据 ${result.weight} kg 体重推算，建议全天摄入区间为 ${result.minDaily} ~ ${result.maxDaily} 克。`
                    : `Based on your weight of ${result.weight} kg, your optimal daily intake bracket is ${result.minDaily}–${result.maxDaily} g.`}
                </div>

                {/* Per Meal Target Box */}
                <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-950">
                  <span className="font-medium">
                    {isZh ? `平均每餐摄入建议（${result.mealsCount} 餐）：` : `Target per meal (${result.mealsCount} meals):`}
                  </span>
                  <span className="text-sm font-black text-amber-800">
                    {result.perMeal} g / {isZh ? '餐' : 'meal'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Copy & Share */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>📋</span>
                  <span>{copied ? (isZh ? '已复制结果！' : 'Copied!') : isZh ? '复制结果' : 'Copy Result'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>🔗</span>
                  <span>{shared ? (isZh ? '链接已复制！' : 'Link Copied!') : isZh ? '分享计算器' : 'Share'}</span>
                </button>
              </div>

              {/* Whole Food Equivalents Card */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span>🍽️</span>
                  <span>{isZh ? '全天蛋白质相当于以下天然食物总量（参考对照）：' : 'Whole Food Equivalents:'}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-xl mb-1">🍗</div>
                    <div className="font-bold text-gray-900">{result.chickenGrams} g</div>
                    <div className="text-[10px] text-gray-500">{isZh ? '生鸡胸肉' : 'Chicken Breast'}</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-xl mb-1">🥚</div>
                    <div className="font-bold text-gray-900">{result.eggsCount} {isZh ? '个' : 'eggs'}</div>
                    <div className="text-[10px] text-gray-500">{isZh ? '全鸡蛋' : 'Whole Eggs'}</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-xl mb-1">🥩</div>
                    <div className="font-bold text-gray-900">{result.beefGrams} g</div>
                    <div className="text-[10px] text-gray-500">{isZh ? '瘦牛肉' : 'Lean Beef'}</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                    <div className="text-xl mb-1">🥤</div>
                    <div className="font-bold text-gray-900">{result.wheyScoops} {isZh ? '勺' : 'scoops'}</div>
                    <div className="text-[10px] text-gray-500">{isZh ? '乳清蛋白粉' : 'Whey Protein'}</div>
                  </div>
                </div>
              </div>

              {/* Next Steps Guidance */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                  {isZh ? '下一步：完善你的训练与身体指标' : 'Next Steps: Comprehensive Fitness Toolkit'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href={`/${lang}/tools/1rm`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">🏋️</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 1RM 最大力量' : 'Calculate 1RM'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '用 Epley 方程推算深蹲卧推极限负荷' : 'Estimate peak strength loads for major lifts'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/bmr`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚡</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 BMR 与 TDEE' : 'BMR & TDEE Calculator'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '算出维持生命所需最低热量与全天总消耗' : 'Determine daily baseline calories and energy burn'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/bmi`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚖️</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 BMI 指数' : 'Calculate BMI'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '结合肌肉量与身材比例评估体格分级' : 'Evaluate body composition and weight classification'}
                    </div>
                  </Link>
                </div>
              </div>

              {/* Related Scientific Articles */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
                  {isZh ? '推荐科学营养阅读' : 'Recommended Nutrition Guides'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href={`/${lang}/blog/daily-protein-intake-guide`}
                    className="p-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition text-left flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">📖</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {isZh ? '一天吃多少蛋白质？按体重算最准' : 'Daily Protein Intake: How Much Do You Need?'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {isZh ? '运动生理学权威解答蛋白质摄入标准' : 'Evidence-based intake targets for active lifters'}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/blog/macro-diet-abs`}
                    className="p-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition text-left flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">🥗</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {isZh ? '吃出马甲线与腹肌：三大营养素搭配法则' : 'Eat Your Way to Abs: The Science of Macronutrient Ratios'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {isZh ? '科学分配碳水、蛋白质与脂肪比例' : 'Optimize protein, carbohydrate, and fat intake'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* E-E-A-T Scientific Reference Guide */}
        <ToolScientificGuide slug="protein" lang={lang} />
      </div>
    </main>
  );
}
