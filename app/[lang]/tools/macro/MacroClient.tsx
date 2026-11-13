'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sex,
  ActivityLevel,
  ACTIVITY_LEVELS,
  calculateBMR,
  calculateTDEE,
  calculateMacros,
  MacroGoal,
  MacroResult,
} from '@/lib/calculators';
import ToolScientificGuide from '@/components/ToolScientificGuide';

interface MacroClientProps {
  paramsPromise: any;
}

export default function MacroClient({ paramsPromise }: MacroClientProps) {
  const unwrappedParams = use<{ lang?: string }>(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';
  const searchParams = useSearchParams();

  // 1. 真实初始默认值（方案 A：175 / 70 / 25 / male / cut）
  const [sex, setSex] = useState<Sex>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [age, setAge] = useState<number>(25);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('light');
  const [goal, setGoal] = useState<MacroGoal>('cut');
  const [customCalories, setCustomCalories] = useState<number | null>(null);
  const [importedNotice, setImportedNotice] = useState<string | null>(null);

  const [results, setResults] = useState<MacroResult & { tdee: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. 解析 URL Query 联动参数（BMR -> 宏量）
  useEffect(() => {
    const qSex = searchParams.get('sex');
    const qHeight = Number(searchParams.get('heightCm'));
    const qWeight = Number(searchParams.get('weightKg'));
    const qAge = Number(searchParams.get('age'));
    const qAct = searchParams.get('activityLevel') as ActivityLevel;
    const qGoal = searchParams.get('goal') as MacroGoal;
    const qCal = Number(searchParams.get('calories'));

    if (qSex === 'male' || qSex === 'female') setSex(qSex);
    if (qHeight >= 120 && qHeight <= 230) setHeightCm(qHeight);
    if (qWeight >= 30 && qWeight <= 200) setWeightKg(qWeight);
    if (qAge >= 15 && qAge <= 80) setAge(qAge);
    if (qAct && ACTIVITY_LEVELS[qAct]) setActivityLevel(qAct);
    if (qGoal === 'cut' || qGoal === 'maintain' || qGoal === 'bulk') setGoal(qGoal);

    if (Number.isFinite(qCal) && qCal >= 1000 && qCal <= 5000) {
      setCustomCalories(Math.round(qCal));
      const goalLabel =
        (qGoal === 'cut' ? (isZh ? '减脂' : 'cut') :
         qGoal === 'bulk' ? (isZh ? '增肌' : 'bulk') : (isZh ? '维持' : 'maintain'));
      setImportedNotice(
        isZh
          ? `已带入你在 BMR 页算出的目标热量 ${Math.round(qCal)} 千卡（${goalLabel}），可修改。`
          : `Your target of ${Math.round(qCal).toLocaleString()} kcal from the BMR calculator (${goalLabel}) has been applied. You can edit it.`
      );
    }

    setMounted(true);
  }, [searchParams, isZh]);

  // 3. 核心计算
  const compute = () => {
    if (heightCm <= 0 || weightKg <= 0 || age <= 0) return;
    const bmr = calculateBMR({ weightKg, heightCm, age, sex });
    const tdee = Math.round(calculateTDEE(bmr, activityLevel));

    let targetCalories = customCalories;
    if (!targetCalories) {
      if (goal === 'cut') {
        targetCalories = Math.round(tdee - 400);
      } else if (goal === 'bulk') {
        targetCalories = Math.round(tdee + 350);
      } else {
        targetCalories = tdee;
      }
    }

    const macro = calculateMacros(targetCalories, weightKg, goal);
    setResults({ ...macro, tdee });
  };

  useEffect(() => {
    if (mounted) {
      compute();
    }
  }, [mounted, sex, heightCm, weightKg, age, activityLevel, goal, customCalories]);

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    compute();
  };

  const resetToExample = () => {
    setSex('male');
    setHeightCm(175);
    setWeightKg(70);
    setAge(25);
    setActivityLevel('light');
    setGoal('cut');
    setCustomCalories(null);
    setImportedNotice(null);
  };

  const handleCopy = async () => {
    if (!results) return;
    const copyText = isZh
      ? `我的每日目标 ${results.calories} 千卡：蛋白 ${results.proteinG}g、碳水 ${results.carbsG}g、脂肪 ${results.fatG}g。\n算自 FitKit：https://www.fitkit.top/zh/tools/macro`
      : `My daily target is ${results.calories.toLocaleString()} kcal: protein ${results.proteinG}g, carbs ${results.carbsG}g, fat ${results.fatG}g.\nCalculated with FitKit: https://www.fitkit.top/en/tools/macro`;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = copyText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!results) return;
    const url = `https://www.fitkit.top/${lang}/tools/macro`;
    const shareTitle = isZh ? 'FitKit 三大营养素宏量配比计算器' : 'FitKit Macro Calculator';
    const shareText = isZh
      ? `我的每日宏量目标：${results.calories} kcal (蛋白 ${results.proteinG}g | 碳水 ${results.carbsG}g | 脂肪 ${results.fatG}g)`
      : `My daily macro target: ${results.calories} kcal (Protein ${results.proteinG}g | Carbs ${results.carbsG}g | Fat ${results.fatG}g)`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url });
      } catch {}
    } else {
      handleCopy();
    }
  };

  // 生成回算 BMR / 体脂链接
  const recalculateBmrUrl = `/${lang}/tools/bmr?sex=${sex}&age=${age}&heightCm=${heightCm}&weightKg=${weightKg}&activityLevel=${activityLevel}`;
  const recalculateBfpUrl = `/${lang}/tools/bfp?sex=${sex}&age=${age}&heightCm=${heightCm}&weightKg=${weightKg}`;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/${lang}/tools`}
          className="text-xs font-semibold text-blue-600 hover:underline mb-6 inline-block"
        >
          {isZh ? '← 返回工具库' : '← Back to Tools'}
        </Link>

        {/* 来源参数提示 */}
        {importedNotice && (
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>{importedNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCustomCalories(null);
                setImportedNotice(null);
              }}
              className="text-[11px] underline text-emerald-700 hover:text-emerald-900 shrink-0"
            >
              {isZh ? '还原默认算法' : 'Reset to formula'}
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 inline-block">🥑</span>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {isZh ? '三大营养素宏量配比计算器' : 'Macro Nutrient Calculator'}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed max-w-lg mx-auto">
              {isZh
                ? '基于科学运动营养学，精准测算每日蛋白质、碳水化合物与健康脂肪的最佳克数分配。'
                : 'Evidence-based macronutrient targets tailored for cutting, lean bulking, or body recomposition.'}
            </p>
          </div>

          {/* 示例数据小提示（带入真实参数时动态显示） */}
          <div className="mb-6 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs text-center font-medium">
            💡 {importedNotice
              ? (isZh
                ? `已成功带入 BMR 计算实际数据（${heightCm} cm / ${weightKg} kg / ${age} 岁），可直接微调后计算。`
                : `Imported your calculated BMR parameters (${heightCm} cm / ${weightKg} kg / ${age} yrs). Adjust and recalculate.`)
              : (isZh
                ? '以下为默认初始数据（175 cm / 70 kg / 25 岁），可直接修改后计算。'
                : 'Default baseline data loaded (175 cm / 70 kg / 25 yrs). Edit directly and calculate.')}
          </div>

          <form onSubmit={handleCalculateSubmit} className="space-y-5">
            {/* 性别选择 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {isZh ? '生理性别' : 'Biological Sex'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                    sex === 'male'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>👨</span> {isZh ? '男' : 'Male'}
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                    sex === 'female'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>👩</span> {isZh ? '女' : 'Female'}
                </button>
              </div>
            </div>

            {/* 身高、体重、年龄 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {isZh ? '身高 (cm)' : 'Height (cm)'}
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={120}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {isZh ? '体重 (kg)' : 'Weight (kg)'}
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={30}
                  max={200}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {isZh ? '年龄 (岁)' : 'Age (years)'}
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={15}
                  max={80}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold"
                  required
                />
              </div>
            </div>

            {/* 活动水平 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {isZh ? '日常体力与运动水平' : 'Activity Level'}
              </label>
              <select
                value={activityLevel}
                onChange={(e) => {
                  setActivityLevel(e.target.value as ActivityLevel);
                  setCustomCalories(null);
                }}
                className="w-full min-h-[44px] px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(Object.keys(ACTIVITY_LEVELS) as ActivityLevel[]).map((level) => (
                  <option key={level} value={level}>
                    {isZh ? ACTIVITY_LEVELS[level].labelZh : ACTIVITY_LEVELS[level].labelEn} ({isZh ? ACTIVITY_LEVELS[level].descZh : ACTIVITY_LEVELS[level].descEn}) × {ACTIVITY_LEVELS[level].factor}
                  </option>
                ))}
              </select>
            </div>

            {/* 阶段目标 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {isZh ? '当前核心健身目标' : 'Fitness Goal'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGoal('cut');
                    setCustomCalories(null);
                  }}
                  className={`min-h-[44px] p-2.5 text-xs font-bold rounded-xl border transition ${
                    goal === 'cut'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  🔥 {isZh ? '减脂刷脂' : 'Cutting'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGoal('maintain');
                    setCustomCalories(null);
                  }}
                  className={`min-h-[44px] p-2.5 text-xs font-bold rounded-xl border transition ${
                    goal === 'maintain'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ⚖️ {isZh ? '维持平衡' : 'Maintain'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGoal('bulk');
                    setCustomCalories(null);
                  }}
                  className={`min-h-[44px] p-2.5 text-xs font-bold rounded-xl border transition ${
                    goal === 'bulk'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  💪 {isZh ? '干净增肌' : 'Lean Bulk'}
                </button>
              </div>
            </div>

            {/* 提交与重置按钮 */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="min-h-[44px] flex-1 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl text-xs font-black tracking-wider uppercase transition shadow-sm"
              >
                {isZh ? '⚡ 生成我的宏量配比' : '⚡ Calculate My Macros'}
              </button>
              <button
                type="button"
                onClick={resetToExample}
                className="min-h-[44px] py-3 px-4 rounded-xl text-xs font-bold border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
              >
                {isZh ? '重置为示例' : 'Reset to Example'}
              </button>
            </div>
          </form>

          {/* 计算结果区 */}
          {results && (
            <div className="mt-8 pt-8 border-t border-gray-100 space-y-5 animate-fade-in">
              <div className="p-6 bg-gray-900 text-white rounded-2xl text-center shadow-inner">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  {isZh ? '建议每日热量预算' : 'Target Daily Calorie Budget'}
                </span>
                <div className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                  {results.calories} <span className="text-sm font-bold text-amber-200">kcal/day</span>
                </div>
                <div className="text-[11px] text-gray-400 mt-2">
                  {isZh ? `对应 TDEE 估算：${results.tdee} kcal` : `Baseline TDEE: ${results.tdee} kcal`}
                </div>
              </div>

              {/* 三大宏量卡片：含每公斤克数与能量占比 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 蛋白质 */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                  <div className="text-xs font-bold text-blue-900 mb-1">
                    🥩 {isZh ? '蛋白质' : 'Protein'}
                  </div>
                  <div className="text-2xl font-black font-mono text-blue-600">
                    {results.proteinG} <span className="text-xs font-normal">g</span>
                  </div>
                  <div className="text-[11px] text-blue-800 font-semibold mt-1">
                    {results.proteinPerKg} g/kg
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {Math.round((results.proteinG * 4 / results.calories) * 100)}% ({results.proteinG * 4} kcal)
                  </div>
                </div>

                {/* 碳水化合物 */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                  <div className="text-xs font-bold text-emerald-900 mb-1">
                    🍞 {isZh ? '碳水化合物' : 'Carbs'}
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-600">
                    {results.carbsG} <span className="text-xs font-normal">g</span>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                    {Math.round((results.carbsG / weightKg) * 100) / 100} g/kg
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {Math.round((results.carbsG * 4 / results.calories) * 100)}% ({results.carbsG * 4} kcal)
                  </div>
                </div>

                {/* 优质脂肪 */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
                  <div className="text-xs font-bold text-amber-900 mb-1">
                    🥑 {isZh ? '健康脂肪' : 'Fats'}
                  </div>
                  <div className="text-2xl font-black font-mono text-amber-600">
                    {results.fatG} <span className="text-xs font-normal">g</span>
                  </div>
                  <div className="text-[11px] text-amber-800 font-semibold mt-1">
                    {results.fatPerKg} g/kg
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {Math.round((results.fatG * 9 / results.calories) * 100)}% ({results.fatG * 9} kcal)
                  </div>
                </div>
              </div>

              {/* 四舍五入误差声明（文档硬性要求） */}
              <p className="text-[11px] text-gray-400 text-center italic">
                {isZh
                  ? '注：因四舍五入，各宏量热量之和与总热量可能相差 1–3 千卡。'
                  : 'Note: Due to rounding, the sum of macro calories may differ by 1–3 kcal from the total budget.'}
              </p>

              {/* 回算 BMR / 体脂率链路打通 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="font-bold text-gray-700">
                  {isZh ? '想换个目标？' : 'Want a different target?'}
                </span>
                <div className="flex gap-4">
                  <Link
                    href={recalculateBmrUrl}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {isZh ? '回算 BMR / TDEE →' : 'Recalculate BMR →'}
                  </Link>
                  <Link
                    href={recalculateBfpUrl}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {isZh ? '测测体脂率 →' : 'Recalculate Body Fat →'}
                  </Link>
                </div>
              </div>

              {/* 复制与分享按钮 */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[44px] flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>📋</span>
                  {copied ? (isZh ? '已复制 ✓' : 'Copied ✓') : (isZh ? '复制结果' : 'Copy result')}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="min-h-[44px] flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>🔗</span>
                  {isZh ? '分享' : 'Share'}
                </button>
              </div>
            </div>
          )}
        </div>

        <ToolScientificGuide slug="macro" lang={lang} />
      </div>
    </div>
  );
}
