'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ToolScientificGuide from '@/components/ToolScientificGuide';

interface OneRmClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

type ExerciseKey = 'squat' | 'bench' | 'deadlift' | 'overhead' | 'custom';

export default function OneRmClient({ paramsPromise }: OneRmClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [exercise, setExercise] = useState<ExerciseKey>('squat');
  const [customExercise, setCustomExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('5');
  const [result, setResult] = useState<{
    oneRm: number;
    exerciseLabel: string;
    weight: number;
    reps: number;
    percentages: { pct: number; weight: number; repsRange: string; focus: string }[];
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedExercise = localStorage.getItem('fitkit_1rm_exercise') as ExerciseKey;
    const savedCustom = localStorage.getItem('fitkit_1rm_custom');
    const savedWeight = localStorage.getItem('fitkit_1rm_weight');
    const savedReps = localStorage.getItem('fitkit_1rm_reps');

    if (savedExercise) setExercise(savedExercise);
    if (savedCustom) setCustomExercise(savedCustom);
    if (savedWeight) setWeight(savedWeight);
    if (savedReps) setReps(savedReps);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('fitkit_1rm_exercise', exercise);
      if (customExercise) localStorage.setItem('fitkit_1rm_custom', customExercise);
      if (weight) localStorage.setItem('fitkit_1rm_weight', weight);
      if (reps) localStorage.setItem('fitkit_1rm_reps', reps);
    }
  }, [exercise, customExercise, weight, reps, mounted]);

  const exerciseOptions: Record<ExerciseKey, { zh: string; en: string }> = {
    squat: { zh: '杠铃深蹲 (Squat)', en: 'Barbell Squat' },
    bench: { zh: '杠铃卧推 (Bench Press)', en: 'Barbell Bench Press' },
    deadlift: { zh: '杠铃硬拉 (Deadlift)', en: 'Deadlift' },
    overhead: { zh: '站姿过顶推举 (Overhead Press)', en: 'Overhead Press' },
    custom: { zh: '自定义动作 (Custom Lift)', en: 'Custom Lift' },
  };

  const calculate1RM = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (!w || !r || w <= 0 || r <= 0) return;

    // Epley Formula: 1RM = Weight * (1 + Reps / 30)
    // If reps === 1, it is 100% of tested weight.
    const calculated1RM = r === 1 ? w : Math.round(w * (1 + r / 30));

    // Standard percentage breakdown: 50%, 60%, 70%, 80%, 85%, 90%, 95%
    const pctList = [
      { pct: 95, repsRange: '1~2', focus: isZh ? '极限神经募集 / 力量冲刺' : 'Peak CNS / Near Max' },
      { pct: 90, repsRange: '2~3', focus: isZh ? '绝对力量 / 神经适应' : 'Pure Strength' },
      { pct: 85, repsRange: '4~5', focus: isZh ? '力量增肌兼顾 / 核心复合组' : 'Strength & Hypertrophy' },
      { pct: 80, repsRange: '6~8', focus: isZh ? '肌肥大黄金负荷 / 机械张力' : 'Hypertrophy Sweet Spot' },
      { pct: 70, repsRange: '10~12', focus: isZh ? '增肌容量组 / 代谢压力' : 'Hypertrophy Volume' },
      { pct: 60, repsRange: '12~15', focus: isZh ? '爆发力训练 / 肌肉耐力' : 'Speed Power & Endurance' },
      { pct: 50, repsRange: '15~20', focus: isZh ? '动作模式热身 / 泵感激活' : 'Warm-up & Activation' },
    ];

    const percentages = pctList.map((item) => ({
      pct: item.pct,
      weight: Math.round(calculated1RM * (item.pct / 100)),
      repsRange: item.repsRange,
      focus: item.focus,
    }));

    const currentLabel =
      exercise === 'custom' && customExercise.trim()
        ? customExercise.trim()
        : exerciseOptions[exercise][lang];

    setResult({
      oneRm: calculated1RM,
      exerciseLabel: currentLabel,
      weight: w,
      reps: r,
      percentages,
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleCopy = () => {
    if (!result) return;
    const p70 = result.percentages.find((p) => p.pct === 70)?.weight ?? 0;
    const p80 = result.percentages.find((p) => p.pct === 80)?.weight ?? 0;
    const p90 = result.percentages.find((p) => p.pct === 90)?.weight ?? 0;

    const text = isZh
      ? `【${result.exerciseLabel}】1RM 预估值：${result.oneRm} kg（基于 ${result.weight}kg × ${result.reps} 次 Epley 科学估算）。\n训练百分比推荐：\n• 70% 增肌容量：${p70} kg (10~12次)\n• 80% 肌肥大黄金组：${p80} kg (6~8次)\n• 90% 绝对力量组：${p90} kg (2~3次)\n测算自 FitKit 科学力量工具箱：https://www.fitkit.top/zh/tools/1rm`
      : `[${result.exerciseLabel}] 1RM Estimate: ${result.oneRm} kg (based on ${result.weight}kg x ${result.reps} reps via Epley formula).\nTraining Percentages:\n• 70% Hypertrophy: ${p70} kg (10–12 reps)\n• 80% Muscle Growth: ${p80} kg (6–8 reps)\n• 90% Absolute Strength: ${p90} kg (2–3 reps)\nCalculated on FitKit Strength Tools: https://www.fitkit.top/en/tools/1rm`;

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
          showToast(isZh ? '已复制结果！' : 'Results copied!');
          setTimeout(() => setCopied(false), 2500);
        } else {
          showToast(isZh ? '复制失败，请长按手动选择复制' : 'Copy failed, please copy manually');
        }
      } catch {
        showToast(isZh ? '复制失败，请长按手动选择复制' : 'Copy failed, please copy manually');
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          showToast(isZh ? '已复制结果！' : 'Results copied!');
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => copyFallback(text));
    } else {
      copyFallback(text);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://www.fitkit.top';
    const title = isZh ? 'FitKit 1RM 最大力量与训练负荷计算器' : 'FitKit 1RM One-Rep Max Calculator';

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
          // User closed share sheet
        } else {
          copyUrl();
        }
      }
    } else {
      copyUrl();
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
            {isZh ? '1RM 最大力量计算器' : '1RM Calculator'}
          </span>
        </nav>

        {/* Main Tool Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-block p-3 bg-indigo-50 text-indigo-600 rounded-2xl text-2xl mb-3 shadow-inner">
              🏋️
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isZh ? '1RM 最大力量与训练负荷计算器' : 'One-Rep Max (1RM) Calculator'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isZh
                ? '基于权威 Epley 力量方程，根据次极限量（1–10 次）精准推算深蹲、卧推、硬拉等动作的单次极限重量与完整周期化训练强度负荷表。'
                : 'Calculate your One-Rep Max (1RM) and percentage-based training loads using the validated Epley strength equation.'}
            </p>
          </div>

          {/* Formula & Validation Examples Box */}
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-gray-700 leading-relaxed max-w-lg mx-auto">
            <div className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span>📐</span>
              <span>{isZh ? '计算公式与验算示例' : 'Formula & Validation Benchmarks'}</span>
            </div>
            <div className="font-mono text-indigo-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 mb-2">
              {isZh ? 'Epley 公式：1RM = 重量 × (1 + 次数 / 30)' : 'Epley Formula: 1RM = Weight × (1 + Reps / 30)'}
            </div>
            <p className="text-[11px] text-gray-600 mb-2">
              {isZh
                ? '注：本工具为数学生理学估算公式、非实测值；次数建议 1–10 次，超过 10 次估算误差会变大。'
                : 'Note: Estimated physiological formula, not a direct test. Recommended for 1–10 reps; sets over 10 reps introduce fatigue error.'}
            </p>
            <div className="text-[11px] text-gray-600 bg-slate-100/80 p-2.5 rounded-lg space-y-1 mb-2">
              <div className="font-semibold text-gray-700">{isZh ? '页面验算示例：' : 'Benchmark Examples:'}</div>
              <div>• 100kg × 5 次 → 100 × (1 + 5/30) = 117kg</div>
              <div>• 80kg × 8 次 → 80 × (1 + 8/30) = 101kg</div>
            </div>
            <div className="text-[11px] text-amber-900 bg-amber-50/90 p-2.5 rounded-lg border border-amber-200/70">
              <span className="font-bold">⚠️ {isZh ? '提示：' : 'Safety Tip:'} </span>
              {isZh
                ? '1RM 是估算值，实测 1RM 请在有保护、有热身的前提下做；新手不要直接冲极限重量；结果仅供训练参考。'
                : '1RM is an estimate. True 1RM testing requires spotters and thorough warm-up. Beginners must not jump straight to max single attempts.'}
            </div>
          </div>

          <form onSubmit={calculate1RM} className="space-y-6 max-w-lg mx-auto">
            {/* Exercise Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {isZh ? '训练动作 (Exercise)' : 'Exercise Movement'}
              </label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value as ExerciseKey)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                <option value="squat">{exerciseOptions.squat[lang]}</option>
                <option value="bench">{exerciseOptions.bench[lang]}</option>
                <option value="deadlift">{exerciseOptions.deadlift[lang]}</option>
                <option value="overhead">{exerciseOptions.overhead[lang]}</option>
                <option value="custom">{exerciseOptions.custom[lang]}</option>
              </select>
            </div>

            {/* Custom Exercise Name Input (if custom) */}
            {exercise === 'custom' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '自定义动作名称' : 'Custom Lift Name'}
                </label>
                <input
                  type="text"
                  value={customExercise}
                  onChange={(e) => setCustomExercise(e.target.value)}
                  placeholder={isZh ? '例如：器械腿屈伸、哑铃推胸' : 'e.g., Leg Extension, Incline DB Press'}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>
            )}

            {/* Weight and Reps Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '测试重量 (kg)' : 'Weight Lifted (kg)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="600"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="100"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    kg
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '完成次数 (1–10 次)' : 'Reps to Fatigue (1–10)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="30"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="5"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    {isZh ? '次' : 'reps'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-normal">
              💡 {isZh
                ? '提示：建议输入 1–10 次内的力竭重量，此区间内公式推算精度最高（误差 < 3%）；超过 10 次肌耐力疲劳会放大误差。'
                : 'Tip: Testing in the 1–10 repetition range yields optimal accuracy. Sets exceeding 10 reps involve muscular endurance decay.'}
            </p>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isZh ? '立即测算 1RM 与训练负荷' : 'Calculate 1RM & Training Loads'}</span>
              <span>→</span>
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-8 border-t border-gray-100 max-w-xl mx-auto animate-fade-in">
              <div className="p-6 sm:p-7 rounded-3xl bg-indigo-50/70 border border-indigo-200 text-center">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-800">
                    {result.exerciseLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-200/70 text-indigo-900">
                    {isZh ? 'Epley 力量公式' : 'Epley Equation'}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  {isZh ? '预估最大单次极限重量 (1RM)' : 'Estimated One-Rep Max (1RM)'}
                </div>

                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-black text-indigo-700 tracking-tight">
                    {result.oneRm}
                  </span>
                  <span className="text-lg font-bold text-indigo-900/60">kg</span>
                </div>

                <div className="text-xs text-indigo-900/80 leading-relaxed max-w-md mx-auto">
                  {isZh
                    ? `根据您完成的 ${result.weight} kg × ${result.reps} 次测试推算，您的理论极限强度约为 ${result.oneRm} kg。`
                    : `Based on your test of ${result.weight} kg for ${result.reps} reps, your theoretical maximum capacity is approximately ${result.oneRm} kg.`}
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

              {/* Comprehensive Percentage Load Breakdown Table */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                    <span>📊</span>
                    <span>{isZh ? '力量训练周期化强度百分比表' : 'Training Intensity Percentage Chart'}</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400">1RM = {result.oneRm} kg</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100/80 text-gray-700 font-extrabold uppercase text-[10px] tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3 sm:px-4">{isZh ? '强度' : 'Intensity'}</th>
                        <th className="py-2.5 px-3 sm:px-4">{isZh ? '目标重量' : 'Weight'}</th>
                        <th className="py-2.5 px-3 sm:px-4">{isZh ? '参考次数' : 'Est. Reps'}</th>
                        <th className="py-2.5 px-3 sm:px-4 hidden sm:table-cell">{isZh ? '训练效益与定位' : 'Training Focus'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-800">
                      {result.percentages.map((row) => (
                        <tr
                          key={row.pct}
                          className={`hover:bg-indigo-50/40 transition-colors ${
                            row.pct === 80 ? 'bg-indigo-50/30 font-bold' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3 sm:px-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                                row.pct >= 90
                                  ? 'bg-rose-100 text-rose-800'
                                  : row.pct >= 80
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : row.pct >= 70
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {row.pct}%
                            </span>
                          </td>
                          <td className="py-2.5 px-3 sm:px-4 font-black text-gray-900 whitespace-nowrap text-sm sm:text-base">
                            {row.weight} <span className="text-xs font-normal text-gray-400">kg</span>
                          </td>
                          <td className="py-2.5 px-3 sm:px-4 whitespace-nowrap text-gray-600">
                            {row.repsRange} {isZh ? '次' : 'reps'}
                          </td>
                          <td className="py-2.5 px-3 sm:px-4 text-gray-500 text-[11px] hidden sm:table-cell">
                            {row.focus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 text-right">
                  * {isZh ? '注：目标重量已按国际惯例四舍五入保留整数 kg。' : 'Note: Load weights rounded to nearest whole kilogram.'}
                </p>
              </div>

              {/* Safety & Clinical Disclaimer */}
              <div className="mt-6 p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold mr-1">⚠️ {isZh ? '安全防伤警示：' : 'Safety Notice:'}</span>
                {isZh
                  ? '本工具计算的 1RM 为基于重复次数的数学生理学估算值，并非实测真实极限。实测真实 1RM 请务必在充分热身、有安全深蹲架保护臂或专业保护者（Spotter）协助下进行；力量训练新手切勿直接冲击大重量极限；结果仅供日常训练强度负荷规划参考。'
                  : 'Calculated 1RM values are physiological estimates derived from submaximal sets. Never attempt true 1RM lifts without comprehensive warm-up, safety catches, and experienced spotters. Beginners must avoid direct maximal testing.'}
              </div>

              {/* Next Steps Guidance */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                  {isZh ? '下一步：完善你的训练与身体指标' : 'Next Steps: Comprehensive Fitness Toolkit'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

                  <Link
                    href={`/${lang}/tools/bmr`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚡</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 BMR 与 TDEE' : 'BMR & TDEE Calculator'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '根据高强度大重量训练消耗测算总能量' : 'Calibrate daily caloric expenditure for heavy training'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/protein`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">🥩</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '去看蛋白质需求' : 'Protein Calculator'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '根据体重与增肌目标精准测算每日蛋白质总量' : 'Calculate daily protein targets for muscle growth'}
                    </div>
                  </Link>
                </div>
              </div>

              {/* Related Scientific Articles */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
                  {isZh ? '推荐进阶训练阅读' : 'Recommended Training Guides'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href={`/${lang}/blog/hypertrophy-split-periodization`}
                    className="p-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition text-left flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">📖</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {isZh ? '肌肥大分化训练：全身、上下肢与 PPL 怎么选？' : 'Hypertrophy Splits Compared: Full Body, Upper/Lower, or PPL?'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {isZh ? '根据 1RM 负荷科学安排每周训练容量' : 'Structure your weekly training splits scientifically'}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/blog/single-leg-training-guide`}
                    className="p-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition text-left flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">🦵</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {isZh ? '单腿训练全指南：重塑下肢动力链与单侧力量' : 'Single-Leg Training Guide: Rebuild Lower Body Kinetic Chain'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {isZh ? '平衡双腿力量不对称，辅助深蹲突破' : 'Fix unilateral asymmetries and boost squat 1RM'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* E-E-A-T Scientific Reference Guide */}
        <ToolScientificGuide slug="1rm" lang={lang} />
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
