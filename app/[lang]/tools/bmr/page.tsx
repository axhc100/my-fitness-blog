'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Sex,
  ActivityLevel,
  ACTIVITY_LEVELS,
  getCalorieTargets,
  CalorieTargets,
} from '@/lib/calculators';
import ToolScientificGuide from '@/components/ToolScientificGuide';

const uiText = {
  zh: {
    back: "← 返回工具库",
    title: "BMR 与 TDEE 计算器：基础代谢 + 每日总消耗",
    subtitle: "先算基础代谢（BMR），再按你的活动水平算出每日总消耗（TDEE），并给出减脂 / 维持 / 增肌三档热量。",
    sampleNote: "以下为示例数据（175 cm / 70 kg / 25 岁），可直接修改后计算。",
    gender: "生理性别",
    male: "男",
    female: "女",
    height: "身高 (cm)",
    weight: "体重 (kg)",
    age: "年龄 (岁)",
    activityLevelTitle: "每周日常运动与体力活动水平",
    calcBtn: "计算 BMR 与 TDEE",
    resultsTitle: "你的每日热量：基础代谢 BMR、每日总消耗 TDEE、三档目标",
    bmrLabel: "基础代谢率 (BMR)",
    tdeeLabel: "每日总消耗 (TDEE)",
    calorieUnit: "千卡/天",
    selectedActivity: "当前活动系数",
    cutLabel: "减脂热量区间",
    cutDesc: "温和热量赤字 (TDEE - 500 ~ 300)",
    maintainLabel: "维持体重热量",
    maintainDesc: "能量动态平衡 (TDEE)",
    bulkLabel: "增肌热量区间",
    bulkDesc: "轻微热量盈余 (TDEE + 250 ~ 500)",
    goToMacro: "去算我的宏量配比 →",
    tdeeDisclaimer: "TDEE 是估算值：它 = BMR × 活动系数。系数 1.2–1.9 是人群平均值，不是你的精确值。建议先按这个结果吃 2–3 周，每周称一次体重，再按体重变化上下调整 100–200 千卡。",
    copyResult: "复制结果",
    copied: "已复制 ✓",
    share: "分享",
    shareFailed: "链接已复制到剪贴板！",
  },
  en: {
    back: "← Back to Tools",
    title: "BMR & TDEE Calculator: Basal Metabolic Rate + Daily Energy Expenditure",
    subtitle: "Calculate your BMR first, then your TDEE based on activity level, with cut / maintain / bulk calorie targets.",
    sampleNote: "Sample data below (175 cm / 70 kg / 25 years old). Edit it and calculate.",
    gender: "Biological Sex",
    male: "Male",
    female: "Female",
    height: "Height (cm)",
    weight: "Weight (kg)",
    age: "Age (years)",
    activityLevelTitle: "Weekly Physical Activity Level",
    calcBtn: "Calculate BMR & TDEE",
    resultsTitle: "Your daily calories: BMR, TDEE, and cut / maintain / bulk targets",
    bmrLabel: "Basal Metabolic Rate (BMR)",
    tdeeLabel: "Total Daily Energy Expenditure (TDEE)",
    calorieUnit: "kcal/day",
    selectedActivity: "Activity Multiplier",
    cutLabel: "Fat Loss Range (Cut)",
    cutDesc: "Moderate deficit (TDEE - 500 ~ 300)",
    maintainLabel: "Maintenance",
    maintainDesc: "Energy balance (TDEE)",
    bulkLabel: "Muscle Gain Range (Bulk)",
    bulkDesc: "Slight surplus (TDEE + 250 ~ 500)",
    goToMacro: "Calculate my macros →",
    tdeeDisclaimer: "TDEE is an estimate: TDEE = BMR × activity factor. Factors 1.2–1.9 are population averages, not your exact value. Follow the result for 2–3 weeks, weigh yourself weekly, then adjust by 100–200 kcal based on weight change.",
    copyResult: "Copy result",
    copied: "Copied ✓",
    share: "Share",
    shareFailed: "Link copied to clipboard!",
  },
};

export default function BmrPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = use(params);
  const isZh = lang === 'zh';
  const t = uiText[lang] || uiText.en;

  const [sex, setSex] = useState<Sex>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [age, setAge] = useState<number>(25);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('light');

  const [targets, setTargets] = useState<CalorieTargets | null>(null);
  const [copied, setCopied] = useState(false);

  // 初始化时或输入变动时计算
  useEffect(() => {
    if (heightCm > 0 && weightKg > 0 && age > 0) {
      const res = getCalorieTargets(
        { weightKg, heightCm, age, sex },
        activityLevel
      );
      setTargets(res);
    }
  }, [sex, heightCm, weightKg, age, activityLevel]);

  const handleCopy = async () => {
    if (!targets) return;
    const actLabel = isZh
      ? ACTIVITY_LEVELS[activityLevel].labelZh
      : ACTIVITY_LEVELS[activityLevel].labelEn;

    const copyText = isZh
      ? `我的 BMR 是 ${targets.bmr} 千卡/天，TDEE（${actLabel}）是 ${targets.tdee} 千卡/天。\n减脂 ${targets.cutLow}–${targets.cutHigh}，维持 ${targets.maintain}，增肌 ${targets.bulkLow}–${targets.bulkHigh} 千卡/天。\n算自 FitKit：https://www.fitkit.top/zh/tools/bmr`
      : `My BMR is ${targets.bmr.toLocaleString()} kcal/day and my TDEE (${actLabel}) is ${targets.tdee.toLocaleString()} kcal/day.\nCut ${targets.cutLow.toLocaleString()}–${targets.cutHigh.toLocaleString()}, maintain ${targets.maintain.toLocaleString()}, bulk ${targets.bulkLow.toLocaleString()}–${targets.bulkHigh.toLocaleString()} kcal/day.\nCalculated with FitKit: https://www.fitkit.top/en/tools/bmr`;

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
    if (!targets) return;
    const url = `https://www.fitkit.top/${lang}/tools/bmr`;
    const shareTitle = isZh
      ? 'FitKit BMR 与 TDEE 每日热量计算器'
      : 'FitKit BMR & TDEE Calculator';
    const actLabel = isZh
      ? ACTIVITY_LEVELS[activityLevel].labelZh
      : ACTIVITY_LEVELS[activityLevel].labelEn;
    const shareText = isZh
      ? `我的 BMR 为 ${targets.bmr} kcal，TDEE（${actLabel}）为 ${targets.tdee} kcal。`
      : `My BMR is ${targets.bmr} kcal, TDEE (${actLabel}) is ${targets.tdee} kcal.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url });
      } catch {
        // 用户取消分享
      }
    } else {
      handleCopy();
    }
  };

  const buildMacroUrl = (calories: number, goal: 'cut' | 'maintain' | 'bulk') => {
    return `/${lang}/tools/macro?sex=${sex}&age=${age}&heightCm=${heightCm}&weightKg=${weightKg}&activityLevel=${activityLevel}&calories=${calories}&goal=${goal}&tdee=${targets?.tdee ?? calories}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/${lang}/tools`}
          className="text-xs font-semibold text-blue-600 hover:underline mb-6 inline-block"
        >
          {t.back}
        </Link>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 inline-block">⚡</span>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {t.title}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed max-w-lg mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="mb-6 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs text-center font-medium">
            💡 {t.sampleNote}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-5"
          >
            {/* 性别选择 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {t.gender}
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
                  <span>👨</span> {t.male}
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
                  <span>👩</span> {t.female}
                </button>
              </div>
            </div>

            {/* 身高、体重、年龄 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t.height}
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
                  {t.weight}
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={30}
                  max={250}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {t.age}
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={10}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold"
                  required
                />
              </div>
            </div>

            {/* 5 档活动水平（纵向单选，每项一行，含中文名 + 系数） */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {t.activityLevelTitle}
              </label>
              <div className="space-y-2">
                {(Object.keys(ACTIVITY_LEVELS) as ActivityLevel[]).map((level) => {
                  const item = ACTIVITY_LEVELS[level];
                  const isSelected = activityLevel === level;
                  return (
                    <label
                      key={level}
                      onClick={() => setActivityLevel(level)}
                      className={`min-h-[44px] flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-semibold shadow-xs'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="activity"
                          checked={isSelected}
                          onChange={() => setActivityLevel(level)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-bold">
                            {isZh ? item.labelZh : item.labelEn}
                          </span>
                          <span className="text-[11px] text-gray-400 ml-2">
                            ({isZh ? item.descZh : item.descEn})
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                        × {item.factor}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </form>

          {/* 结果展示区 */}
          {targets && (
            <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
              <h2 className="text-sm font-bold text-gray-900 tracking-tight text-center">
                {t.resultsTitle}
              </h2>

              {/* BMR 与 TDEE 核心卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-xs text-gray-500 font-medium mb-1">
                    {t.bmrLabel}
                  </div>
                  <div className="text-3xl font-black text-gray-900 font-mono">
                    {targets.bmr}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {t.calorieUnit} (Mifflin-St Jeor)
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200/80 text-center">
                  <div className="text-xs text-blue-700 font-bold mb-1">
                    {t.tdeeLabel}
                  </div>
                  <div className="text-3xl font-black text-blue-600 font-mono">
                    {targets.tdee}
                  </div>
                  <div className="text-[11px] text-blue-500 mt-1">
                    {isZh
                      ? `${ACTIVITY_LEVELS[activityLevel].labelZh} × ${ACTIVITY_LEVELS[activityLevel].factor}`
                      : `${ACTIVITY_LEVELS[activityLevel].labelEn} × ${ACTIVITY_LEVELS[activityLevel].factor}`}
                  </div>
                </div>
              </div>

              {/* TDEE 估算必填说明 */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs leading-relaxed">
                <span className="font-bold">⚠️ {isZh ? '估算说明：' : 'Notice: '}</span>
                {t.tdeeDisclaimer}
              </div>

              {/* 三档目标热量卡片（窄屏上下排列，带去算宏量按钮） */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {isZh ? '根据目标的建议摄入热量' : 'Target Calorie Budgets'}
                </h3>

                {/* 减脂档 */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🔥</span>
                      <span className="font-bold text-xs text-gray-900">{t.cutLabel}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{t.cutDesc}</div>
                    <div className="text-lg font-black text-blue-600 font-mono mt-1">
                      {targets.cutLow} – {targets.cutHigh} <span className="text-xs font-normal text-gray-500">{t.calorieUnit}</span>
                    </div>
                  </div>
                  <Link
                    href={buildMacroUrl(targets.cutHigh, 'cut')}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center text-center shadow-xs"
                  >
                    {t.goToMacro}
                  </Link>
                </div>

                {/* 维持档 */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⚖️</span>
                      <span className="font-bold text-xs text-gray-900">{t.maintainLabel}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{t.maintainDesc}</div>
                    <div className="text-lg font-black text-purple-600 font-mono mt-1">
                      {targets.maintain} <span className="text-xs font-normal text-gray-500">{t.calorieUnit}</span>
                    </div>
                  </div>
                  <Link
                    href={buildMacroUrl(targets.maintain, 'maintain')}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center text-center shadow-xs"
                  >
                    {t.goToMacro}
                  </Link>
                </div>

                {/* 增肌档 */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">💪</span>
                      <span className="font-bold text-xs text-gray-900">{t.bulkLabel}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{t.bulkDesc}</div>
                    <div className="text-lg font-black text-emerald-600 font-mono mt-1">
                      {targets.bulkLow} – {targets.bulkHigh} <span className="text-xs font-normal text-gray-500">{t.calorieUnit}</span>
                    </div>
                  </div>
                  <Link
                    href={buildMacroUrl(targets.bulkLow, 'bulk')}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center text-center shadow-xs"
                  >
                    {t.goToMacro}
                  </Link>
                </div>
              </div>

              {/* 结果复制与分享按钮 */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[44px] flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>📋</span>
                  {copied ? t.copied : t.copyResult}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="min-h-[44px] flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>🔗</span>
                  {t.share}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 科学原理与参考文献组件 */}
        <ToolScientificGuide slug="bmr" lang={lang} />
      </div>
    </div>
  );
}
