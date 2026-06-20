'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

// 1. 将复杂的类型定义抽离到外部，避免行内声明触发 Turbopack 编译泛型死锁
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
  // 解构语言参数
  const unwrappedParams = use<{ lang?: string }>(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.375'); // 默认轻度活动
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk' | 'keto'>('cut'); // 减脂/维持/增肌/生酮

  // 使用抽离后的类型，干净利落
  const [results, setResults] = useState<CalculateResults | null>(null);

  useEffect(() => { setMounted(true); }, []);
  
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs">Loading Calculator...</div>;
  }

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) return;

    // 1. 使用 Mifflin-St Jeor 公式计算基础代谢率 BMR
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // 2. 计算总每日能量消耗 TDEE
    const tdee = Math.round(bmr * act);

    // 3. 根据健身目标设定目标热量
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories = Math.round(tdee * 0.8); // 能量缺口 20%
    else if (goal === 'bulk') targetCalories = Math.round(tdee * 1.1); // 盈余 10%
    else if (goal === 'keto') targetCalories = Math.round(tdee * 0.75); // 生酮通常伴随热量限制

    // 4. 科学精细化分配三大营养素比例
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    if (goal === 'keto') {
      // 生酮严格控碳水：5% 碳水, 25% 蛋白质, 70% 脂肪
      protein = Math.round((targetCalories * 0.25) / 4);
      fat = Math.round((targetCalories * 0.70) / 9);
      carbs = Math.round((targetCalories * 0.05) / 4);
    } else if (goal === 'cut') {
      // 高蛋白减脂比例：40% 蛋白质, 35% 碳水, 25% 脂肪 (保留瘦体重)
      protein = Math.round((targetCalories * 0.40) / 4);
      carbs = Math.round((targetCalories * 0.35) / 4);
      fat = Math.round((targetCalories * 0.25) / 9);
    } else if (goal === 'bulk') {
      // 传统高碳水干净增肌比例：30% 蛋白质, 50% 碳水, 20% 脂肪
      protein = Math.round((targetCalories * 0.30) / 4);
      carbs = Math.round((targetCalories * 0.50) / 4);
      fat = Math.round((targetCalories * 0.20) / 9);
    } else {
      // 均衡维持比例：30% 蛋白质, 40% 碳水, 30% 脂肪
      protein = Math.round((targetCalories * 0.30) / 4);
      carbs = Math.round((targetCalories * 0.40) / 4);
      fat = Math.round((targetCalories * 0.30) / 9);
    }

    setResults({ tdee, targetCalories, protein, carbs, fat });
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
            {/* 性别选择 */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '性别' : 'Gender'}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === 'male' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  {isZh ? '男' : 'Male'}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === 'female' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  {isZh ? '女' : 'Female'}
                </button>
              </div>
            </div>

            {/* 身高、体重与年龄 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '身高 (cm)' : 'Height (cm)'}</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '体重 (kg)' : 'Weight (kg)'}</label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '年龄' : 'Age'}</label>
                <input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  required 
                />
              </div>
            </div>

            {/* 活动量选择 */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '日常活动活跃度' : 'Activity Level'}</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              >
                <option value="1.2">{isZh ? '久坐（很少运动、办公室人群）' : 'Sedentary (Little or no exercise)'}</option>
                <option value="1.375">{isZh ? '轻度活跃（每周 1-3 天轻度训练）' : 'Light (Light exercise 1-3 days/week)'}</option>
                <option value="1.55">{isZh ? '中度活跃（每周 3-5 天中度运动）' : 'Moderate (Moderate exercise 3-5 days/week)'}</option>
                <option value="1.725">{isZh ? '高频运动（每周 6-7 天高强度训练）' : 'Active (Hard exercise 6-7 days/week)'}</option>
              </select>
            </div>

            {/* 健身目标切换 */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{isZh ? '核心健身阶段目标' : 'Fitness Goal'}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGoal('cut')}
                  className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'cut' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  🔥 {isZh ? '刷脂减重 (Cut)' : 'Fat Loss'}
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('bulk')}
                  className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'bulk' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  💪 {isZh ? '干净增肌 (Bulk)' : 'Lean Bulk'}
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('maintain')}
                  className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'maintain' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  ⚖️ {isZh ? '维持重塑 (Maintain)' : 'Maintain'}
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('keto')}
                  className={`p-2 text-xs font-bold rounded-xl border transition ${goal === 'keto' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  🥑 {isZh ? '断糖生酮 (Keto)' : 'Keto Diet'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gray-950 text-white p-3 rounded-xl font-black tracking-widest text-xs uppercase shadow-md hover:bg-black transition active:scale-[0.99]"
            >
              {isZh ? '⚡ 生成每日生化配比' : '⚡ Calculate Macro Split'}
            </button>
          </form>

          {/* 结果数据板块 */}
          {results !== null && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-900 rounded-2xl text-center shadow-inner">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {isZh ? '建议每日摄入总热量目标' : 'Target Intake Calories'}
                </p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 font-mono mt-1">
                  {results.targetCalories} <span className="text-xs font-bold text-orange-300">kcal</span>
                </p>
                <p className="text-[9px] text-gray-500 font-mono mt-1">
                  {isZh ? `你的静态 TDEE 约为 ${results.tdee} kcal` : `Your calculated TDEE is ${results.tdee} kcal`}
                </p>
              </div>

              {/* 三大元素深度解析卡片 */}
              <div className="space-y-2">
                {/* 蛋白质 */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-blue-900 block">🥩 {isZh ? '蛋白质' : 'Protein'}</span>
                    <span className="text-[10px] text-gray-400">{isZh ? '肌肉合成与组织修复核心支撑' : 'Muscle synthesis & repair support'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-blue-600">{results.protein} <span className="text-xs font-bold">g</span></span>
                </div>

                {/* 碳水化合物 */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-emerald-900 block">🍞 {isZh ? '碳水化合物' : 'Carbohydrates'}</span>
                    <span className="text-[10px] text-gray-400">{isZh ? '训练爆发力与每日糖原主燃料' : 'Daily main kinetic energy source'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-emerald-600">{results.carbs} <span className="text-xs font-bold">g</span></span>
                </div>

                {/* 脂肪 */}
                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-amber-900 block">🥑 {isZh ? '优质健康脂肪' : 'Dietary Fats'}</span>
                    <span className="text-[10px] text-gray-400">{isZh ? '内分泌荷尔蒙健康与关节保护' : 'Hormone regulation & joints health'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-amber-600">{results.fat} <span className="text-xs font-bold">g</span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}