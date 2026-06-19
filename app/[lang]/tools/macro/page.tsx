'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MacroCalculatorPage() {
  const { lang } = useParams() as { lang: 'en' | 'zh' };
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.375'); // 默认轻度活动
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk' | 'keto'>('cut'); // 减脂/维持/增肌/生酮

  const [results, setResults] = useState<{
    tdee: number;
    targetCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono">Loading Calculator...</div>;

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) return;

    // 1. 采用 Mifflin-St Jeor 公式计算基础代谢率 (BMR)
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // 2. 计算每日总热量总消耗 (TDEE)
    const tdee = Math.round(bmr * act);

    // 3. 根据健身目标精算热量摄入锚点
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories = Math.round(tdee - 450);      // 减脂热量缺口
    if (goal === 'bulk') targetCalories = Math.round(tdee + 350);     // 增肌热量冗余
    if (goal === 'keto') targetCalories = Math.round(tdee - 400);     // 极速减碳生酮

    // 4. 三大宏量比率策略分配（蛋白质: 4卡/g, 碳水: 4卡/g, 脂肪: 9卡/g）
    let pPct = 0.3, cPct = 0.4, fPct = 0.3; // 默认均衡配置
    
    if (goal === 'cut') { pPct = 0.4; cPct = 0.3; fPct = 0.3; }      // 高打高标蛋白质保肌
    if (goal === 'bulk') { pPct = 0.3; cPct = 0.5; fPct = 0.2; }     // 高碳水充糖充能
    if (goal === 'keto') { pPct = 0.25; cPct = 0.05; fPct = 0.7; }   // 极低碳水断糖生酮

    setResults({
      tdee,
      targetCalories,
      protein: Math.round((targetCalories * pPct) / 4),
      carbs: Math.round((targetCalories * cPct) / 4),
      fat: Math.round((targetCalories * fPct) / 9),
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <Link href={`/${lang}`} className="text-sm font-semibold text-blue-600 hover:underline mb-6 inline-block">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🍳</span>
          <h1 className="text-2xl font-black tracking-tight">{isZh ? '三大宏量营养素计算器' : 'Macro Nutrient Calculator'}</h1>
        </div>
        <p className="text-gray-400 text-xs mb-8 leading-relaxed">
          {isZh ? '合理的宏量营养素分配，比单纯节食更能保留肌肉。精准定制你每天的餐盘吧！' : 'Macros tracking ensures you lose fat, not muscle. Tailor your daily intake ratio based on science.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 输入表单 */}
          <form onSubmit={calculateMacros} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-xl border">
              <button type="button" onClick={() => setGender('male')} className={`py-1.5 text-xs font-bold rounded-lg transition ${gender === 'male' ? 'bg-white text-gray-900 shadow' : 'text-gray-400'}`}>👨 {isZh ? '男士' : 'Male'}</button>
              <button type="button" onClick={() => setGender('female')} className={`py-1.5 text-xs font-bold rounded-lg transition ${gender === 'female' ? 'bg-white text-gray-900 shadow' : 'text-gray-400'}`}>👩 {isZh ? '女士' : 'Female'}</button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{isZh ? '体重 (kg)' : 'Weight (kg)'}</label>
                <input type="number" required value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm outline-none text-gray-900 focus:ring-1 focus:ring-blue-500 font-mono" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{isZh ? '身高 (cm)' : 'Height (cm)'}</label>
                <input type="number" required value={height} onChange={e => setHeight(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm outline-none text-gray-900 focus:ring-1 focus:ring-blue-500 font-mono" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{isZh ? '年龄' : 'Age'}</label>
                <input type="number" required value={age} onChange={e => setAge(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm outline-none text-gray-900 focus:ring-1 focus:ring-blue-500 font-mono" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{isZh ? '日常活动强度' : 'Activity Level'}</label>
              <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm outline-none bg-white text-gray-900 focus:ring-1 focus:ring-blue-500">
                <option value="1.2">{isZh ? '久坐不动（几乎不运动）' : 'Sedentary (Little or no exercise)'}</option>
                <option value="1.375">{isZh ? '轻度活跃（每周运动 1-3 天）' : 'Light (Exercise 1-3 days/wk)'}</option>
                <option value="1.55">{isZh ? '中度活跃（每周运动 3-5 天）' : 'Moderate (Exercise 3-5 days/wk)'}</option>
                <option value="1.725">{isZh ? '高度活跃（每周高质量运动 6-7 天）' : 'Heavy (Exercise 6-7 days/wk)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{isZh ? '当下的核心健身目标' : 'Fitness Goal Strategy'}</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button type="button" onClick={() => setGoal('cut')} className={`p-2 border rounded-xl text-left transition ${goal === 'cut' ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'bg-white'}`}>🔥 {isZh ? '高效减脂' : 'Fat Loss (Cut)'}</button>
                <button type="button" onClick={() => setGoal('bulk')} className={`p-2 border rounded-xl text-left transition ${goal === 'bulk' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'bg-white'}`}>💪 {isZh ? '高能增肌' : 'Lean Muscle (Bulk)'}</button>
                <button type="button" onClick={() => setGoal('maintain')} className={`p-2 border rounded-xl text-left transition ${goal === 'maintain' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold' : 'bg-white'}`}>⚖️ {isZh ? '干净维持' : 'Maintenance'}</button>
                <button type="button" onClick={() => setGoal('keto')} className={`p-2 border rounded-xl text-left transition ${goal === 'keto' ? 'border-amber-600 bg-amber-50 text-amber-700 font-bold' : 'bg-white'}`}>🥑 {isZh ? '低碳生酮' : 'Keto Diet'}</button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow transition text-sm">
              🧮 {isZh ? '计算每日餐盘克数' : 'Calculate My Macros'}
            </button>
          </form>

          {/* 结果可视化展示区 */}
          <div className="flex flex-col justify-center">
            {!results ? (
              <div className="h-full border border-dashed rounded-2xl flex items-center justify-center text-center p-6 text-xs text-gray-400 bg-gray-50">
                {isZh ? '👈 输入你的身材数据，右侧将立即揭晓科学定制的高颜值三大营养素餐盘。' : '👈 Enter your physical metrics on the left to unlock your tailored scientific macro breakdown.'}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="bg-slate-900 text-white rounded-2xl p-4 text-center shadow">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">{isZh ? '目标每日摄入热量' : 'Target Daily Budget'}</span>
                  <span className="text-3xl font-black font-mono text-blue-400 block mt-1">{results.targetCalories} <span className="text-xs font-normal text-white">kcal</span></span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">TDEE Total Burn: {results.tdee} kcal</span>
                </div>

                <div className="space-y-3">
                  {/* 蛋白质 */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-black text-blue-900 block">🥩 {isZh ? '蛋白质' : 'Protein'}</span>
                      <span className="text-[10px] text-gray-400">Muscle recovery & building</span>
                    </div>
                    <span className="text-xl font-black font-mono text-blue-600">{results.protein} <span className="text-xs font-bold">g</span></span>
                  </div>

                  {/* 碳水化合物 */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-black text-emerald-900 block">🍞 {isZh ? '碳水化合物' : 'Carbohydrates'}</span>
                      <span className="text-[10px] text-gray-400">Daily main energy source</span>
                    </div>
                    <span className="text-xl font-black font-mono text-emerald-600">{results.carbs} <span className="text-xs font-bold">g</span></span>
                  </div>

                  {/* 脂肪 */}
                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-black text-amber-900 block">🥑 {isZh ? '优质脂肪' : 'Dietary Fats'}</span>
                      <span className="text-[10px] text-gray-400">Hormone health & joints</span>
                    </div>
                    <span className="text-xl font-black font-mono text-amber-600">{results.fat} <span className="text-xs font-bold">g</span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}