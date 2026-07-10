'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface CalculateResults {
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroClientProps {
  paramsPromise: any;
}

export default function MacroClient({ paramsPromise }: MacroClientProps) {
  const unwrappedParams = use<{ lang?: string }>(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.375');
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk' | 'keto'>('cut');

  const [results, setResults] = useState<CalculateResults | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  


  const calculateMacros = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) return;

    let bmr = gender === 'male' ? (10 * w + 6.25 * h - 5 * a + 5) : (10 * w + 6.25 * h - 5 * a - 161);
    const tdee = Math.round(bmr * act);

    let targetCalories = tdee;
    if (goal === 'cut') targetCalories = Math.round(tdee * 0.8);
    else if (goal === 'bulk') targetCalories = Math.round(tdee * 1.1);
    else if (goal === 'keto') targetCalories = Math.round(tdee * 0.75);

    let protein = 0, carbs = 0, fat = 0;
    if (goal === 'keto') {
      protein = Math.round((targetCalories * 0.25) / 4);
      fat = Math.round((targetCalories * 0.70) / 9);
      carbs = Math.round((targetCalories * 0.05) / 4);
    } else if (goal === 'cut') {
      protein = Math.round((targetCalories * 0.40) / 4);
      carbs = Math.round((targetCalories * 0.35) / 4);
      fat = Math.round((targetCalories * 0.25) / 9);
    } else if (goal === 'bulk') {
      protein = Math.round((targetCalories * 0.30) / 4);
      carbs = Math.round((targetCalories * 0.50) / 4);
      fat = Math.round((targetCalories * 0.20) / 9);
    } else {
      protein = Math.round((targetCalories * 0.30) / 4);
      carbs = Math.round((targetCalories * 0.40) / 4);
      fat = Math.round((targetCalories * 0.30) / 9);
    }

    setResults({ tdee, targetCalories, protein, carbs, fat });
  };

  useEffect(() => {
    calculateMacros();
  }, [gender, weight, height, age, activity, goal]);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs">Loading Calculator...</div>;
  }

  // 完美对齐带链接的硬核社交复制文本
  const handleCopyShare = async () => {
    if (!results) return;
    const goalText = { cut: '刷脂减重 🥦', bulk: '干净增肌 🥩', maintain: '维持重塑 ⚖️', keto: '断糖生酮 🥑' }[goal];
    
    const text = isZh
      ? `🔥 我今天在 FitKit 测出了最新的三大营养素科学配比！\n🎯 核心目标：[${goalText}]\n⚡ 建议每日摄入：${results.targetCalories} kcal\n👉 黄金配比：蛋白质 ${results.protein}g | 碳水 ${results.carbs}g | 优质脂肪 ${results.fat}g\n三分练七分吃，好身材正在加速出关！免登录无广告计算器，快来定制你的膳食方案：https://fitkit.top`
      : `🔥 Calculated my custom daily nutrition split on FitKit today!\n🎯 Target Stage: [${goal.toUpperCase()}]\n⚡ Daily Budget: ${results.targetCalories} kcal\n👉 Macro Split: Protein ${results.protein}g | Carbs ${results.carbs}g | Fats ${results.fat}g\nPrecision eating unlocks the dream physique. Calculate yours for free (No Ads): https://fitkit.top`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Link href={`/${lang}`} className="text-xs font-black uppercase text-blue-600 hover:underline mb-6 inline-block tracking-wider">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <span className="text-2xl">🥑</span>
            <h1 className="text-xl font-black text-gray-900 mt-2 tracking-tight">
              {isZh ? '宏量营养素科学配比器' : 'Macro Nutrient Calculator'}
            </h1>
          </div>

          <form onSubmit={calculateMacros} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '性别' : 'Gender'}</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setGender('male')} className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === 'male' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{isZh ? '男' : 'Male'}</button>
                <button type="button" onClick={() => setGender('female')} className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === 'female' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{isZh ? '女' : 'Female'}</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '身高 (cm)' : 'Height (cm)'}</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '体重 (kg)' : 'Weight (kg)'}</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '年龄' : 'Age'}</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '日常活动活跃度' : 'Activity Level'}</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none">
                <option value="1.2">{isZh ? '久坐（办公、很少运动）' : 'Sedentary'}</option>
                <option value="1.375">{isZh ? '轻度活跃（每周 1-3 天运动）' : 'Light Active'}</option>
                <option value="1.55">{isZh ? '中度活跃（每周 3-5 天运动）' : 'Moderate Active'}</option>
                <option value="1.725">{isZh ? '高频运动（每周 6-7 天运动）' : 'Very Active'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '核心健身阶段目标' : 'Fitness Goal'}</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setGoal('cut')} className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'cut' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>🔥 {isZh ? '刷脂减重' : 'Fat Loss'}</button>
                <button type="button" onClick={() => setGoal('bulk')} className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'bulk' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>💪 {isZh ? '干净增肌' : 'Lean Bulk'}</button>
                <button type="button" onClick={() => setGoal('maintain')} className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'maintain' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>⚖️ {isZh ? '维持重塑' : 'Maintain'}</button>
                <button type="button" onClick={() => setGoal('keto')} className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'keto' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>🥑 {isZh ? '断糖生酮' : 'Keto Diet'}</button>
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-950 text-white p-3 rounded-xl font-black tracking-widest text-xs uppercase shadow-md hover:bg-black transition">
              {isZh ? '⚡ 生成每日生化配比' : '⚡ Calculate Macro Split'}
            </button>
          </form>

          {results !== null && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <div className="p-4 bg-gray-900 rounded-2xl text-center shadow-inner">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{isZh ? '建议每日摄入总热量目标' : 'Target Intake Calories'}</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-mono mt-1">
                  {results.targetCalories} <span className="text-xs font-bold text-orange-300">kcal</span>
                </p>
              </div>

              <div className="space-y-2">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-xs font-black text-blue-900 block">🥩 {isZh ? '蛋白质' : 'Protein'}</span>
                  <span className="text-xl font-black font-mono text-blue-600">{results.protein} <span className="text-xs font-bold">g</span></span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-xs font-black text-emerald-900 block">🍞 {isZh ? '碳水化合物' : 'Carbs'}</span>
                  <span className="text-xl font-black font-mono text-emerald-600">{results.carbs} <span className="text-xs font-bold">g</span></span>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex justify-between items-center">
                  <span className="text-xs font-black text-amber-900 block">🥑 {isZh ? '优质健康脂肪' : 'Fats'}</span>
                  <span className="text-xl font-black font-mono text-amber-600">{results.fat} <span className="text-xs font-bold">g</span></span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition border ${
                    copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {copied ? (isZh ? '✅ 复制配置成功！快去粘贴分享' : '✅ copied successfully!') : (isZh ? '📋 一键复制今日膳食配比卡片' : '📋 copy macro snapshot')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}