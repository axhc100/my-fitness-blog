'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ToolScientificGuide from '@/components/ToolScientificGuide';

interface VolumeClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

type MuscleGroupKey = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'glutes';

interface ExerciseItem {
  id: string;
  name: string;
  muscle: MuscleGroupKey;
  sets: string;
  reps: string;
  weight: string;
}

export default function VolumeClient({ paramsPromise }: VolumeClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const muscleConfigs: Record<
    MuscleGroupKey,
    {
      zh: string;
      en: string;
      mevSets: number; // 维持有效下限
      mavSetsMax: number; // 最佳适应区间上限
      mrvSetsMax: number; // 最大恢复上限
    }
  > = {
    legs: { zh: '腿部 (Legs / Quads / Hams)', en: 'Legs (Quads & Hamstrings)', mevSets: 6, mavSetsMax: 18, mrvSetsMax: 22 },
    chest: { zh: '胸部 (Chest / Pectorals)', en: 'Chest (Pectorals)', mevSets: 6, mavSetsMax: 18, mrvSetsMax: 22 },
    back: { zh: '背部 (Back / Lats & Traps)', en: 'Back (Lats & Upper Back)', mevSets: 8, mavSetsMax: 20, mrvSetsMax: 25 },
    shoulders: { zh: '肩部 (Shoulders / Deltoids)', en: 'Shoulders (Deltoids)', mevSets: 6, mavSetsMax: 18, mrvSetsMax: 22 },
    arms: { zh: '手臂 (Arms / Biceps & Triceps)', en: 'Arms (Biceps & Triceps)', mevSets: 6, mavSetsMax: 16, mrvSetsMax: 20 },
    glutes: { zh: '臀部 (Glutes)', en: 'Glutes', mevSets: 4, mavSetsMax: 16, mrvSetsMax: 20 },
  };

  const defaultExercises: ExerciseItem[] = [
    { id: '1', name: isZh ? '深蹲' : 'Squat', muscle: 'legs', sets: '4', reps: '8', weight: '100' },
    { id: '2', name: isZh ? '卧推' : 'Bench Press', muscle: 'chest', sets: '4', reps: '10', weight: '80' },
  ];

  const [mounted, setMounted] = useState(false);
  const [exercises, setExercises] = useState<ExerciseItem[]>(defaultExercises);
  const [errorMsg, setErrorMsg] = useState('');

  const [result, setResult] = useState<{
    totalVolumeKg: number;
    totalSets: number;
    muscleBreakdown: {
      muscle: MuscleGroupKey;
      muscleLabel: string;
      totalSets: number;
      volumeKg: number;
      landmarkStatus: string;
      landmarkBadge: string;
      landmarkBadgeColor: string;
      interpretation: string;
    }[];
    exerciseDetails: {
      name: string;
      muscleLabel: string;
      sets: number;
      reps: number;
      weight: number;
      volumeKg: number;
    }[];
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fitkit_volume_exercises');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExercises(parsed);
        }
      } catch {
        // fallback to defaults
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('fitkit_volume_exercises', JSON.stringify(exercises));
    }
  }, [exercises, mounted]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const addExercise = () => {
    const newId = String(Date.now());
    setExercises((prev) => [
      ...prev,
      { id: newId, name: '', muscle: 'back', sets: '3', reps: '10', weight: '60' },
    ]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length <= 1) {
      showToast(isZh ? '请至少保留一个训练动作。' : 'Please keep at least one exercise.');
      return;
    }
    setExercises((prev) => prev.filter((item) => item.id !== id));
  };

  const updateExercise = (id: string, field: keyof ExerciseItem, value: string) => {
    setExercises((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateVolume = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const exerciseDetails: {
      name: string;
      muscleLabel: string;
      sets: number;
      reps: number;
      weight: number;
      volumeKg: number;
    }[] = [];

    const muscleAggregator: Record<
      MuscleGroupKey,
      { sets: number; volumeKg: number }
    > = {
      legs: { sets: 0, volumeKg: 0 },
      chest: { sets: 0, volumeKg: 0 },
      back: { sets: 0, volumeKg: 0 },
      shoulders: { sets: 0, volumeKg: 0 },
      arms: { sets: 0, volumeKg: 0 },
      glutes: { sets: 0, volumeKg: 0 },
    };

    let grandTotalVolume = 0;
    let grandTotalSets = 0;

    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i];
      const s = parseInt(ex.sets, 10);
      const r = parseInt(ex.reps, 10);
      const w = parseFloat(ex.weight);

      if (!s || s <= 0 || !r || r <= 0 || isNaN(w) || w < 0) {
        setErrorMsg(
          isZh
            ? `第 ${i + 1} 个动作（${ex.name || '未命名'}）的组数、次数或重量输入无效，请核对。`
            : `Exercise #${i + 1} (${ex.name || 'Unnamed'}) has invalid sets, reps, or weight.`
        );
        return;
      }

      const singleVolume = Math.round(s * r * w);
      grandTotalVolume += singleVolume;
      grandTotalSets += s;

      muscleAggregator[ex.muscle].sets += s;
      muscleAggregator[ex.muscle].volumeKg += singleVolume;

      exerciseDetails.push({
        name: ex.name.trim() || (isZh ? `动作 #${i + 1}` : `Exercise #${i + 1}`),
        muscleLabel: muscleConfigs[ex.muscle][lang],
        sets: s,
        reps: r,
        weight: w,
        volumeKg: singleVolume,
      });
    }

    const muscleBreakdown = (Object.keys(muscleAggregator) as MuscleGroupKey[])
      .filter((m) => muscleAggregator[m].sets > 0)
      .map((m) => {
        const stats = muscleAggregator[m];
        const cfg = muscleConfigs[m];

        let landmarkBadge = 'MAV 黄金区间';
        let landmarkBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
        let landmarkStatus = isZh ? '在 MAV 最佳适应区间' : 'In MAV (Optimal Growth)';
        let interpretation = isZh
          ? '周组数处于 MAV 黄金肌肥大适应区间，机械张力刺激与超量恢复达到理想平衡。'
          : 'Weekly sets within MAV (Maximum Adaptive Volume). Ideal balance between hypertrophy stimulus and recovery.';

        if (stats.sets < cfg.mevSets) {
          landmarkBadge = '< MEV 维持阶段';
          landmarkBadgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
          landmarkStatus = isZh ? '低于 MEV 有效下限' : 'Below MEV (Maintenance Only)';
          interpretation = isZh
            ? `当前该肌群仅 ${stats.sets} 组，低于 MEV 下限（${cfg.mevSets} 组），适合减量维持，若想加速生长建议增加组数。`
            : `Only ${stats.sets} sets (below ${cfg.mevSets} MEV). Sufficient for maintenance, but add sets to stimulate gains.`;
        } else if (stats.sets <= cfg.mavSetsMax) {
          landmarkBadge = 'MAV 黄金区间';
          landmarkBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          landmarkStatus = isZh ? '在 MAV 最佳适应区间' : 'In MAV (Optimal Hypertrophy)';
          interpretation = isZh
            ? `周组数处于 MAV 黄金增肌区间（${cfg.mevSets}~${cfg.mavSetsMax} 组），容量适中高效，极利于肌肥大。`
            : `Sets fall into golden MAV range (${cfg.mevSets}–${cfg.mavSetsMax} sets). Highly productive hypertrophy zone.`;
        } else if (stats.sets <= cfg.mrvSetsMax) {
          landmarkBadge = 'MAV ~ MRV 冲击期';
          landmarkBadgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
          landmarkStatus = isZh ? '接近 MRV 恢复极限' : 'Near MRV (High Fatigue)';
          interpretation = isZh
            ? `容量接近 MRV 恢复天花板（${cfg.mrvSetsMax} 组），疲劳累积显著，需注意睡眠与关节状态。`
            : `Approaching MRV ceiling (~${cfg.mrvSetsMax} sets). Demands optimal sleep, nutrition, and joint care.`;
        } else {
          landmarkBadge = '> MRV 建议减量';
          landmarkBadgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
          landmarkStatus = isZh ? '超过 MRV 恢复上限' : 'Exceeds MRV (Overreaching)';
          interpretation = isZh
            ? `已超过 MRV 最大可恢复容量上限（>${cfg.mrvSetsMax} 组）！肌肉分解大于合成，建议安排减量周（Deload）。`
            : `Exceeds MRV (${cfg.mrvSetsMax}+ sets). Muscle catabolism outpaces recovery. Deload week strongly recommended.`;
        }

        return {
          muscle: m,
          muscleLabel: cfg[lang],
          totalSets: stats.sets,
          volumeKg: stats.volumeKg,
          landmarkStatus,
          landmarkBadge,
          landmarkBadgeColor,
          interpretation,
        };
      });

    setResult({
      totalVolumeKg: grandTotalVolume,
      totalSets: grandTotalSets,
      muscleBreakdown,
      exerciseDetails,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const breakdownLines = result.muscleBreakdown
      .map(
        (b) =>
          `• ${b.muscleLabel}：周容量 ${b.volumeKg.toLocaleString()} kg（${b.totalSets} 组）[${b.landmarkStatus}]`
      )
      .join('\n');

    const text = isZh
      ? `【FitKit 训练容量计算结果】\n• 全周总训练容量：${result.totalVolumeKg.toLocaleString()} kg（共 ${result.totalSets} 组）\n肌群容量与地标对照：\n${breakdownLines}\n测算自 FitKit 科学力量工具箱：https://www.fitkit.top/zh/tools/volume`
      : `[FitKit Training Volume Results]\n• Total Weekly Volume Load: ${result.totalVolumeKg.toLocaleString()} kg (${result.totalSets} sets)\nMuscle Breakdown & Landmarks:\n${breakdownLines}\nCalculated on FitKit Strength Tools: https://www.fitkit.top/en/tools/volume`;

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
    const title = isZh
      ? 'FitKit 训练容量计算器 | MEV/MAV/MRV 肌肥大地标'
      : 'FitKit Training Volume Calculator | MEV/MAV/MRV Landmarks';

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
          // Cancelled
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
            {isZh ? '训练容量计算器' : 'Volume Calculator'}
          </span>
        </nav>

        {/* Main Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-block p-3 bg-indigo-50 text-indigo-600 rounded-2xl text-2xl mb-3 shadow-inner">
              📊
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isZh ? '训练容量计算器与容量地标' : 'Training Volume Calculator'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isZh
                ? '基于运动人体力学（组数 × 次数 × 重量），精准核算各肌群周总容量与全周总负荷，对照 MEV/MAV/MRV 容量地标科学调整周期化训练。'
                : 'Calculate total volume loads (Sets × Reps × Weight) per muscle group and benchmark against MEV, MAV, and MRV hypertrophy landmarks.'}
            </p>
          </div>

          {/* Formula & Validation Benchmark Card */}
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-gray-700 leading-relaxed max-w-lg mx-auto">
            <div className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <span>📐</span>
              <span>{isZh ? '核心容量公式与验算示例' : 'Volume Formulas & Benchmarks'}</span>
            </div>
            <div className="font-mono text-indigo-900 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 mb-2 space-y-0.5 text-[11px]">
              <div>• {isZh ? '单动作容量 = 组数 × 次数 × 重量 (kg)' : 'Volume Load = Sets × Reps × Weight (kg)'}</div>
              <div>• {isZh ? '肌群周容量 = 该肌群所有动作容量之和' : 'Muscle Volume = Sum of Volume Loads for that muscle'}</div>
              <div>• {isZh ? '全周总容量 = 所有肌群周容量之和' : 'Total Volume = Sum of all muscle group volume loads'}</div>
            </div>
            <div className="text-[11px] text-gray-600 bg-slate-100/80 p-2.5 rounded-lg mb-2 space-y-1">
              <div className="font-semibold text-gray-700">{isZh ? '验算示例：' : 'Validation Examples:'}</div>
              <div>• {isZh ? '深蹲 4 组 × 8 次 × 100kg = 3200kg (腿部)' : 'Squat 4 sets × 8 reps × 100kg = 3,200kg (Legs)'}</div>
              <div>• {isZh ? '卧推 4 组 × 10 次 × 80kg = 3200kg (胸部)' : 'Bench Press 4 sets × 10 reps × 80kg = 3,200kg (Chest)'}</div>
              <div className="font-bold text-indigo-800">
                • {isZh ? '两项合计全周总容量 = 3200 + 3200 = 6400kg' : 'Combined Total Volume = 3,200 + 3,200 = 6,400kg'}
              </div>
            </div>
            <div className="text-[11px] text-amber-900 bg-amber-50/90 p-2.5 rounded-lg border border-amber-200/60 leading-relaxed">
              ⚠️ {isZh
                ? '训练科学原则：容量只是训练负荷的一个物理维度，动作行程规范、负荷强度（RIR）、关节恢复与充足睡眠同样关键；容量地标为参考范围，个体恢复能力存在差异，结果仅供训练参考。'
                : 'Training Guideline: Volume load is one dimension. Biomechanical form, intensity (RIR), sleep, and nutrition are equally vital. Landmarks are guidelines, not diagnostic criteria.'}
            </div>
          </div>

          {/* Dynamic Exercises Form */}
          <form onSubmit={calculateVolume} className="space-y-4 max-w-xl mx-auto">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isZh ? '训练动作清单（可多选多组）' : 'Exercise Log'}
              </span>
              <button
                type="button"
                onClick={addExercise}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition flex items-center gap-1"
              >
                <span>+</span>
                <span>{isZh ? '添加动作' : 'Add Exercise'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {exercises.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-200/70 space-y-3 relative transition hover:border-indigo-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-indigo-800">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExercise(item.id)}
                      className="text-xs text-gray-400 hover:text-rose-500 transition px-2 py-0.5 rounded-lg hover:bg-rose-50"
                      title={isZh ? '删除动作' : 'Remove Exercise'}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Exercise Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        {isZh ? '动作名称' : 'Exercise Name'}
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateExercise(item.id, 'name', e.target.value)}
                        placeholder={isZh ? '如：深蹲 / 卧推' : 'e.g., Squat'}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>

                    {/* Muscle Group */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        {isZh ? '目标肌群' : 'Target Muscle'}
                      </label>
                      <select
                        value={item.muscle}
                        onChange={(e) => updateExercise(item.id, 'muscle', e.target.value as MuscleGroupKey)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      >
                        <option value="legs">{muscleConfigs.legs[lang]}</option>
                        <option value="chest">{muscleConfigs.chest[lang]}</option>
                        <option value="back">{muscleConfigs.back[lang]}</option>
                        <option value="shoulders">{muscleConfigs.shoulders[lang]}</option>
                        <option value="arms">{muscleConfigs.arms[lang]}</option>
                        <option value="glutes">{muscleConfigs.glutes[lang]}</option>
                      </select>
                    </div>
                  </div>

                  {/* Sets, Reps, Weight */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                        {isZh ? '组数' : 'Sets'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={item.sets}
                        onChange={(e) => updateExercise(item.id, 'sets', e.target.value)}
                        required
                        className="w-full px-2.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                        {isZh ? '每组次数' : 'Reps'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={item.reps}
                        onChange={(e) => updateExercise(item.id, 'reps', e.target.value)}
                        required
                        className="w-full px-2.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                        {isZh ? '重量 (kg)' : 'Weight (kg)'}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="600"
                        value={item.weight}
                        onChange={(e) => updateExercise(item.id, 'weight', e.target.value)}
                        required
                        className="w-full px-2.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>{isZh ? '立即计算周训练容量' : 'Calculate Training Volume'}</span>
              <span>→</span>
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-8 border-t border-gray-100 max-w-xl mx-auto animate-fade-in">
              <div className="p-6 sm:p-7 rounded-3xl bg-indigo-50/70 border border-indigo-200 text-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-900 block mb-1">
                  {isZh ? '全周总训练容量 (Total Volume Load)' : 'Total Weekly Volume Load'}
                </span>

                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-black text-indigo-700 tracking-tight">
                    {result.totalVolumeKg.toLocaleString()}
                  </span>
                  <span className="text-lg font-bold text-indigo-900/60">kg</span>
                </div>

                <div className="text-xs text-indigo-900/80 mb-2 font-medium">
                  {isZh
                    ? `全周累计完成 ${result.totalSets} 组有效抗阻训练，涵盖 ${result.muscleBreakdown.length} 个主要肌群。`
                    : `Completed ${result.totalSets} working sets across ${result.muscleBreakdown.length} target muscle groups.`}
                </div>
              </div>

              {/* Action Buttons: Copy & Share */}
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
              </div>

              {/* Muscle Breakdown & Landmark Benchmark Table */}
              <div className="mt-8">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>{isZh ? '各肌群周容量与 MEV / MAV / MRV 地标对照' : 'Muscle Volume & MEV/MAV/MRV Landmarks'}</span>
                </h3>

                <div className="space-y-3">
                  {result.muscleBreakdown.map((item) => (
                    <div
                      key={item.muscle}
                      className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-black text-gray-900">
                          {item.muscleLabel}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.landmarkBadgeColor}`}>
                          {item.landmarkBadge}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-100">
                        <div>
                          <span className="text-gray-400">{isZh ? '肌群周容量：' : 'Weekly Volume: '}</span>
                          <span className="font-extrabold text-indigo-700">{item.volumeKg.toLocaleString()} kg</span>
                        </div>
                        <div>
                          <span className="text-gray-400">{isZh ? '周有效组数：' : 'Weekly Sets: '}</span>
                          <span className="font-extrabold text-gray-800">{item.totalSets} {isZh ? '组' : 'sets'}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                        <span className="font-semibold text-gray-800">{isZh ? '地标解读：' : 'Insight: '}</span>
                        {item.interpretation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps Guidance */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                  {isZh ? '下一步：完善你的周期化力量与营养系统' : 'Next Steps: Comprehensive Strength Toolkit'}
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
                      {isZh ? '用 Epley 方程推算深蹲卧推极限，科学分配 70%~90% 组配重' : 'Estimate 1RM and generate 50%–95% percentage loads'}
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
                      {isZh ? '高容量抗阻刺激后，补充 1.6~2.2g/kg 蛋白质兑现超量恢复' : 'Match high volume with 1.6–2.2g/kg daily protein'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/bmr`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚡</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 BMR 与 TDEE' : 'BMR & TDEE'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '高训练容量需要充足热量支持，准确核算每日能量总消耗' : 'Determine daily calorie burn for volume recovery'}
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
                        {isZh ? '根据每周训练容量合理规划分化方案' : 'Structure your weekly training volume across splits'}
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
                        {isZh ? '强化单侧薄弱环节，安全提升下肢周容量' : 'Fix unilateral asymmetries and safely boost leg volume'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* E-E-A-T Scientific Reference Guide */}
        <ToolScientificGuide slug="volume" lang={lang} />
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
