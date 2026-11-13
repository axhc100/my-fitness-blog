'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ToolScientificGuide from '@/components/ToolScientificGuide';

interface FatLossClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

export default function FatLossClient({ paramsPromise }: FatLossClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [currentWeight, setCurrentWeight] = useState('80');
  const [targetWeight, setTargetWeight] = useState('75');
  const [deficit, setDeficit] = useState('500');
  const [errorMsg, setErrorMsg] = useState('');

  const [result, setResult] = useState<{
    currentWeight: number;
    targetWeight: number;
    lossWeight: number;
    deficit: number;
    daysNeeded: number;
    weeklyRate: number;
    targetDateStr: string;
    targetDateFormatted: string;
    totalDeficitKcal: number;
    paceCategory: string;
    paceColor: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [flagLinked, setFlagLinked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedCurrent = localStorage.getItem('fitkit_fatloss_current');
    const savedTarget = localStorage.getItem('fitkit_fatloss_target');
    const savedDeficit = localStorage.getItem('fitkit_fatloss_deficit');

    if (savedCurrent) setCurrentWeight(savedCurrent);
    if (savedTarget) setTargetWeight(savedTarget);
    if (savedDeficit) setDeficit(savedDeficit);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (currentWeight) localStorage.setItem('fitkit_fatloss_current', currentWeight);
      if (targetWeight) localStorage.setItem('fitkit_fatloss_target', targetWeight);
      if (deficit) localStorage.setItem('fitkit_fatloss_deficit', deficit);
    }
  }, [currentWeight, targetWeight, deficit, mounted]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const calculateFatLoss = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const cur = parseFloat(currentWeight);
    const target = parseFloat(targetWeight);
    const def = parseFloat(deficit);

    if (!cur || cur <= 0 || !target || target <= 0 || !def || def <= 0) {
      setErrorMsg(
        isZh
          ? '请填写有效的当前体重、目标体重与热量缺口数值。'
          : 'Please enter valid numbers for current weight, target weight, and calorie deficit.'
      );
      return;
    }

    if (target >= cur) {
      setErrorMsg(
        isZh
          ? '目标体重必须低于当前体重。若您的目标是增重增肌，请使用 BMR 与宏量工具计算热量盈余。'
          : 'Target weight must be lower than current weight for fat loss. Use BMR/Macro tools for muscle building surpluses.'
      );
      return;
    }

    const lossWeight = parseFloat((cur - target).toFixed(1));
    const totalDeficitKcal = Math.round(lossWeight * 7700);
    const daysNeeded = Math.round(totalDeficitKcal / def);
    const weeklyRate = parseFloat(((def * 7) / 7700).toFixed(2));

    const targetDateObj = new Date();
    targetDateObj.setDate(targetDateObj.getDate() + daysNeeded);
    const y = targetDateObj.getFullYear();
    const m = String(targetDateObj.getMonth() + 1).padStart(2, '0');
    const d = String(targetDateObj.getDate()).padStart(2, '0');
    const targetDateStr = `${y}-${m}-${d}`;
    const targetDateFormatted = isZh
      ? `${y} 年 ${targetDateObj.getMonth() + 1} 月 ${targetDateObj.getDate()} 日`
      : targetDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    let paceCategory = isZh ? '黄金推荐减脂速度（高效且安全）' : 'Gold Standard (Optimal & Safe)';
    let paceColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (weeklyRate < 0.3) {
      paceCategory = isZh ? '温和慢速（肌肉保护极佳，适合极低体脂冲刺）' : 'Gentle & Steady (Maximum Lean Mass Retention)';
      paceColor = 'text-blue-700 bg-blue-50 border-blue-200';
    } else if (weeklyRate <= 0.75) {
      paceCategory = isZh ? '黄金推荐减脂速度（高效且安全，不易掉肌肉）' : 'Gold Standard (Efficient, Safe & Sustainable)';
      paceColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (weeklyRate <= 1.0) {
      paceCategory = isZh ? '进阶较快速度（建议摄入充足蛋白质并保持抗阻训练）' : 'Accelerated Pace (Maintain High Protein & Lifting)';
      paceColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      paceCategory = isZh ? '速度过快警示（易分解肌肉、降低代谢并触发暴食）' : 'Aggressive Warning (Elevated Risk of Muscle Loss)';
      paceColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    setResult({
      currentWeight: cur,
      targetWeight: target,
      lossWeight,
      deficit: def,
      daysNeeded,
      weeklyRate,
      targetDateStr,
      targetDateFormatted,
      totalDeficitKcal,
      paceCategory,
      paceColor,
    });
    setFlagLinked(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = isZh
      ? `【FitKit 减脂速度与达标日期预测】\n• 当前体重：${result.currentWeight} kg → 目标体重：${result.targetWeight} kg（计划减重 ${result.lossWeight} kg）\n• 每日热量缺口：${result.deficit} kcal/天（累计缺口约 ${result.totalDeficitKcal.toLocaleString()} kcal）\n• 预计需要时间：约 ${result.daysNeeded} 天\n• 预计达成目标日期：${result.targetDateFormatted}\n• 每周减重速度：约 ${result.weeklyRate} kg/周\n测算自 FitKit 科学营养工具箱：https://www.fitkit.top/zh/tools/fat-loss`
      : `[FitKit Fat Loss & Target Date Forecast]\n• Current: ${result.currentWeight} kg → Target: ${result.targetWeight} kg (Total Loss: ${result.lossWeight} kg)\n• Daily Deficit: ${result.deficit} kcal/day (Cumulative Deficit: ~${result.totalDeficitKcal.toLocaleString()} kcal)\n• Estimated Timeline: ~${result.daysNeeded} days\n• Projected Completion Date: ${result.targetDateFormatted}\n• Weekly Rate of Loss: ~${result.weeklyRate} kg/week\nCalculated on FitKit Health Tools: https://www.fitkit.top/en/tools/fat-loss`;

    const copyFallback = (str: string) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = str;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (success) {
          setCopied(true);
          showToast(isZh ? '测算结果已复制到剪贴板！' : 'Results copied to clipboard!');
          setTimeout(() => setCopied(false), 2500);
        } else {
          showToast(isZh ? '复制失败，请手动选择复制' : 'Copy failed, please copy manually');
        }
      } catch {
        showToast(isZh ? '复制失败，请手动选择复制' : 'Copy failed, please copy manually');
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          showToast(isZh ? '测算结果已复制到剪贴板！' : 'Results copied to clipboard!');
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => copyFallback(text));
    } else {
      copyFallback(text);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://www.fitkit.top';
    const title = isZh ? 'FitKit 减脂速度预测与目标日期计算器' : 'FitKit Fat Loss & Target Date Calculator';

    const copyUrlFallback = () => {
      try {
        const input = document.createElement('input');
        input.value = url;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.focus();
        input.select();
        const success = document.execCommand('copy');
        document.body.removeChild(input);
        if (success) {
          setShared(true);
          showToast(isZh ? '链接已复制！' : 'Link copied!');
          setTimeout(() => setShared(false), 2500);
        } else {
          showToast(isZh ? '复制失败，请手动复制浏览器地址栏' : 'Copy failed, please copy address manually');
        }
      } catch {
        showToast(isZh ? '复制失败，请手动复制浏览器地址栏' : 'Copy failed, please copy address manually');
      }
    };

    const copyUrl = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            setShared(true);
            showToast(isZh ? '链接已复制！' : 'Link copied!');
            setTimeout(() => setShared(false), 2500);
          })
          .catch(() => copyUrlFallback());
      } else {
        copyUrlFallback();
      }
    };

    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && typeof navigator !== 'undefined' && navigator.share) {
      try {
        showToast(isZh ? '正在调起系统分享...' : 'Opening share menu...');
        await navigator.share({ title, url });
        setShared(true);
        showToast(isZh ? '分享成功！' : 'Shared successfully!');
        setTimeout(() => setShared(false), 2500);
      } catch (err: any) {
        if (err && err.name === 'AbortError') {
          // User closed the share sheet
        } else {
          copyUrl();
        }
      }
    } else {
      copyUrl();
    }
  };

  const handleLinkFlag = () => {
    if (!result) return;
    const goalTitle = isZh
      ? `减重至 ${result.targetWeight}kg（减掉 ${result.lossWeight}kg）`
      : `Reach ${result.targetWeight}kg (Lose ${result.lossWeight}kg)`;

    try {
      localStorage.setItem('user_fitness_goal', goalTitle);
      localStorage.setItem('user_fitness_target_date', result.targetDateStr);
      setFlagLinked(true);
      showToast(
        isZh
          ? '🎯 已成功联动到首页 Flag 倒计时！返回首页即可查看实时天数倒数。'
          : '🎯 Successfully linked to Homepage Goal Flag countdown!'
      );
    } catch {
      showToast(isZh ? '保存失败，请检查浏览器本地存储权限' : 'Failed to save to local storage');
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
            {isZh ? '减脂速度预测与目标日期计算器' : 'Fat Loss Calculator'}
          </span>
        </nav>

        {/* Main Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-block p-3 bg-rose-50 text-rose-600 rounded-2xl text-2xl mb-3 shadow-inner">
              🎯
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isZh ? '减脂速度预测与目标日期计算器' : 'Fat Loss & Target Date Calculator'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isZh
                ? '基于人体脂肪组织 7700 大卡能量守恒模型，根据当前体重、目标体重与每日热量缺口，科学推算所需天数、预计达标日期与每周减重速率。'
                : 'Calculate realistic fat loss timelines, projected completion dates, and weekly rates of loss based on the 7,700 kcal energy deficit model.'}
            </p>
          </div>

          {/* Formula & Validation Benchmark Card */}
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-gray-700 leading-relaxed max-w-lg mx-auto">
            <div className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span>📐</span>
              <span>{isZh ? '核心热量守恒公式与验算示例' : 'Energy Balance Formula & Benchmarks'}</span>
            </div>
            <div className="font-mono text-rose-900 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 mb-2 space-y-0.5 text-[11px]">
              <div>• {isZh ? '人体脂肪热量当量：约 7700 大卡 ≈ 1 kg 纯体脂' : 'Fat Energy Equivalent: ~7,700 kcal ≈ 1 kg adipose tissue'}</div>
              <div>• {isZh ? '所需天数 = (当前体重 − 目标体重) × 7700 ÷ 每日热量缺口' : 'Days Needed = (Current Wt − Target Wt) × 7,700 ÷ Daily Deficit'}</div>
              <div>• {isZh ? '每周减重速率 = 每日缺口 × 7 ÷ 7700 (kg/周)' : 'Weekly Rate = Daily Deficit × 7 ÷ 7,700 (kg/week)'}</div>
            </div>
            <div className="text-[11px] text-gray-600 bg-slate-100/80 p-2.5 rounded-lg mb-2">
              <span className="font-semibold text-gray-700">{isZh ? '验算示例：' : 'Validation Example: '}</span>
              {isZh
                ? '当前 80kg、目标 75kg、每日缺口 500 大卡 → 需减 5kg → 5 × 7700 ÷ 500 = 77 天，每周约 0.45kg'
                : 'Current 80kg, Target 75kg, Deficit 500 kcal → 5kg loss → 5 × 7700 ÷ 500 = 77 days, ~0.45 kg/week'}
            </div>
            <div className="text-[11px] text-amber-900 bg-amber-50/90 p-2.5 rounded-lg border border-amber-200/60 leading-relaxed">
              ⚠️ {isZh
                ? '健康减脂原则：减重速度建议每周 0.5–1kg 为宜，不要追求过快；缺口过大容易掉肌肉、降低代谢并损害健康；结果仅供科学参考，有基础疾病、孕期或备孕者请遵循专业医生医嘱。'
                : 'Clinical Guideline: Optimal fat loss pace is 0.5–1.0 kg/week. Excessive deficits risk muscle catabolism and metabolic slowdown. Results are for reference only; consult a physician for medical conditions.'}
            </div>
          </div>

          <form onSubmit={calculateFatLoss} className="space-y-5 max-w-lg mx-auto">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Current Weight */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '当前体重 (kg)' : 'Current Weight (kg)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="30"
                    max="250"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="80"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    kg
                  </span>
                </div>
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '目标体重 (kg)' : 'Target Weight (kg)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="30"
                    max="250"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    placeholder="75"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    kg
                  </span>
                </div>
              </div>
            </div>

            {/* Calorie Deficit Input & Quick Presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {isZh ? '每日热量缺口 (大卡 / 天)' : 'Daily Calorie Deficit (kcal/day)'}
                </label>
                <span className="text-[11px] text-gray-400">
                  {isZh ? '推荐：300~750 大卡' : 'Recommended: 300–750 kcal'}
                </span>
              </div>

              <div className="relative mb-2">
                <input
                  type="number"
                  step="50"
                  min="100"
                  max="2000"
                  value={deficit}
                  onChange={(e) => setDeficit(e.target.value)}
                  placeholder="500"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                  kcal / {isZh ? '天' : 'day'}
                </span>
              </div>

              {/* Quick Select Presets */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeficit('300')}
                  className={`py-2 px-2.5 rounded-xl border text-center transition font-semibold ${
                    deficit === '300'
                      ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-2xs'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                >
                  <div>300 kcal</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                    {isZh ? '温和慢速' : 'Mild'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeficit('500')}
                  className={`py-2 px-2.5 rounded-xl border text-center transition font-semibold ${
                    deficit === '500'
                      ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-2xs'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>500 kcal</span>
                    <span className="text-[10px] text-rose-600 font-bold">★</span>
                  </div>
                  <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
                    {isZh ? '黄金推荐' : 'Optimal'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeficit('750')}
                  className={`py-2 px-2.5 rounded-xl border text-center transition font-semibold ${
                    deficit === '750'
                      ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-2xs'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
                  }`}
                >
                  <div>750 kcal</div>
                  <div className="text-[10px] text-gray-400 font-normal mt-0.5">
                    {isZh ? '进阶较快' : 'Accelerated'}
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isZh ? '立即测算减脂目标与周期' : 'Calculate Fat Loss Timeline'}</span>
              <span>→</span>
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-8 border-t border-gray-100 max-w-xl mx-auto animate-fade-in">
              <div className="p-6 sm:p-7 rounded-3xl bg-rose-50/70 border border-rose-200 text-center">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-rose-900">
                    {isZh ? '减脂目标达成预测' : 'Fat Loss Target Forecast'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${result.paceColor}`}
                  >
                    {result.paceCategory}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  {isZh
                    ? `从 ${result.currentWeight}kg 减至 ${result.targetWeight}kg（累计减重 ${result.lossWeight}kg）`
                    : `From ${result.currentWeight}kg to ${result.targetWeight}kg (Total loss: ${result.lossWeight}kg)`}
                </div>

                {/* Primary Metric: Days Needed */}
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-black text-rose-700 tracking-tight">
                    {result.daysNeeded}
                  </span>
                  <span className="text-lg font-bold text-rose-900/60">{isZh ? '天' : 'Days'}</span>
                </div>

                {/* Target Date Highlight */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 rounded-2xl border border-rose-200/80 shadow-2xs mb-4">
                  <span className="text-base">📅</span>
                  <span className="text-xs text-gray-600">
                    {isZh ? '预计达成日期：' : 'Projected Completion Date:'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-rose-900">
                    {result.targetDateFormatted}
                  </span>
                </div>

                {/* Grid Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-rose-200/60 text-xs">
                  <div className="p-3 bg-white/80 rounded-xl border border-rose-100">
                    <div className="text-[11px] text-gray-500 mb-0.5">
                      {isZh ? '每周预计减重速率' : 'Weekly Loss Rate'}
                    </div>
                    <div className="text-lg font-black text-rose-800">
                      ~{result.weeklyRate} <span className="text-xs font-normal">kg / {isZh ? '周' : 'wk'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-rose-100">
                    <div className="text-[11px] text-gray-500 mb-0.5">
                      {isZh ? '累计所需热量赤字' : 'Total Caloric Deficit'}
                    </div>
                    <div className="text-lg font-black text-rose-800">
                      {result.totalDeficitKcal.toLocaleString()} <span className="text-xs font-normal">kcal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Copy, Share, Flag Link */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>📋</span>
                  <span>{copied ? (isZh ? '已复制结果！' : 'Copied!') : isZh ? '复制结果' : 'Copy Result'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>🔗</span>
                  <span>{shared ? (isZh ? '链接已复制！' : 'Link Copied!') : isZh ? '分享计算器' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLinkFlag}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs ${
                    flagLinked
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20 active:scale-95'
                  }`}
                >
                  <span>🚩</span>
                  <span>
                    {flagLinked
                      ? isZh
                        ? '已设为首页 Flag！'
                        : 'Set to Flag!'
                      : isZh
                      ? '设为首页 Flag 倒计时'
                      : 'Set as Home Flag'}
                  </span>
                </button>
              </div>

              {/* Next Steps Guidance */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                  {isZh ? '下一步：完善你的减脂饮食与能量系统' : 'Next Steps: Comprehensive Fat Loss Toolkit'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href={`/${lang}/tools/bmr`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚡</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 BMR 与 TDEE' : 'BMR & TDEE'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '确定你全天的总热量消耗底线，精确控制热量赤字' : 'Determine daily calorie burn to calibrate accurate deficits'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/macro`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">🍳</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '三大营养素宏量配比' : 'Macro Ratios'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '分配碳水、蛋白质与健康脂肪克数，减脂不掉肌' : 'Allocate exact protein, carb, and fat gram ratios'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/protein`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">🥩</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '每日蛋白质需求' : 'Protein Intake'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '热量受限期提高蛋白质摄入，抵抗肌肉糖异生' : 'Elevate protein intake during caloric deficits'}
                    </div>
                  </Link>
                </div>
              </div>

              {/* Related Scientific Articles */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
                  {isZh ? '推荐循证减脂阅读' : 'Recommended Fat Loss Guides'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  <Link
                    href={`/${lang}/blog/daily-protein-intake-guide`}
                    className="p-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition text-left flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">🥩</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {isZh ? '一天吃多少蛋白质？按体重算最准' : 'Daily Protein Intake: How Much Do You Need?'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {isZh ? '减脂期如何维持正氮平衡与高饱腹感' : 'Evidence-based intake targets for active lifters'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* E-E-A-T Scientific Reference Guide */}
        <ToolScientificGuide slug="fat-loss" lang={lang} />
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-gray-900/95 text-white text-xs sm:text-sm font-semibold rounded-full shadow-2xl backdrop-blur-md border border-white/10 animate-fade-in flex items-center gap-2 pointer-events-none"
        >
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
