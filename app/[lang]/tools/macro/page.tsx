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

  // ✨ 已经彻底移除这里引起 Expected unicode escape 报错的末尾反斜杠
  const [results, setResults] = useState<{
    tdee: number;
    targetCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono">Loading Calculator...</div>;

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || !h || !a) return;

    // 1. 使用 Mifflin-St Jeor 公式计算 BMR
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // 2. 计算 TDEE
    const tdeeValue = bmr * parseFloat(activity);

    // 3. 根据目标设定热量摄入缺口/盈余
    let targetCal = tdeeValue;
    if (goal === 'cut') targetCal = tdeeValue - 500; // 减脂控热量
    else if (goal === 'bulk') targetCal = tdeeValue + 350; // 增肌热量盈余
    else if (goal === 'keto') targetCal = tdeeValue - 400; // 生酮控热量

    // 4. 精准宏量营养素分配算法
    let pG = 0, cG = 0, fG = 0;

    if (goal === 'keto') {
      // 生酮饮食比例: 70% 脂肪, 25% 蛋白质, 5% 碳水
      pG = (targetCal * 0.25) / 4;
      fG = (targetCal * 0.70) / 9;
      cG = (targetCal * 0.05) / 4;
    } else if (goal === 'cut') {
      // 高蛋白减脂比例: 40% 蛋白质, 35% 碳水, 25% 脂肪
      pG = (targetCal * 0.40) / 4;
      cG = (targetCal * 0.35) / 4;
      fG = (targetCal * 0.25) / 9;
    } else if (goal === 'bulk') {
      // 高碳水增肌比例: 30% 蛋白质, 50% 碳水, 20% 脂肪
      pG = (targetCal * 0.30) / 4;
      cG = (targetCal * 0.50) / 4;
      fG = (targetCal * 0.20) / 9;
    } else {
      // 均衡维持比例: 30% 蛋白质, 40% 碳水, 30% 脂肪
      pG = (targetCal * 0.30) / 4;
      cG = (targetCal * 0.40) / 4;
      fG = (targetCal * 0.30) / 9;
    }

    setResults({
      tdee: Math.round(tdeeValue),
      targetCalories: Math.round(targetCal),
      protein: Math.round(pG),
      carbs: Math.round(cG),
      fat: Math.round(fG),
    });
    setCopied(false);
  };

  // 动态生成不同运动目标的双语励志卡片状态
  const getGoalInfo = () => {
    if (goal === 'cut') return { tag: isZh ? '📉 科学刷脂减脂' : '📉 Precision Shred', desc: isZh ? '高蛋白热量缺口已锁定，狙击顽固腹部脂肪！' : 'High protein deficit locked, target stubborn fat!' };
    if (goal === 'bulk') return { tag: isZh ? '💪 干净增肌备赛' : '💪 Lean Bulking', desc: isZh ? '热量盈余精准分配，开启干劲十足的异化合成！' : 'Caloric surplus assigned for maximum muscle anabolism!' };
    if (goal === 'keto') return { tag: isZh ? '🥑 深度生酮燃脂' : '🥑 Keto Adaptation', desc: isZh ? '极低碳水摄入，促使身体全速切换至高效酮体供能！' : 'Ultra-low carbs, shifting metabolism to ketones!' };
    return { tag: isZh ? '⚖️ 基础状态维持' : '⚖️ Weight Maintenance', desc: isZh ? '完美维持当下体格，代谢功率平稳长寿输出。' : 'Perfect metabolic balance for current physique.' };
  };

  // 触发复制分享文案逻辑
  const handleShareCopy = async () => {
    if (!results) return;
    const { tag } = getGoalInfo();
    const text = isZh
      ? `🔥 我今天在 FitKit 锁定了每日备赛宏量膳食计划！\n🎯 运动目标：[${tag}]\n📊 目标热量：${results.targetCalories} kcal\n🍗 蛋白质：${results.protein}g | 🍞 碳水：${results.carbs}g | 🥑 优质脂肪：${results.fat}g\n免登录无广告的科学健身营养计算器，快来定制你的：https://fitkit.top`
      : `🔥 Calculated my daily macro goals on FitKit!\n🎯 Goal: [${tag}]\n📊 Target Calories: ${results.targetCalories} kcal\n🍗 Protein: ${results.protein}g | 🍞 Carbs: ${results.carbs}g | 🥑 Fats: ${results.fat}g\nNo ads, sci-fitness tool box, customize yours here: https://fitkit.top`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-lg">
        {/* 返回按钮 */}
        <Link href={`/${lang}`} className="text-xs text-blue-600 font-bold tracking-wide hover:underline mb-6 inline-block uppercase">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>

        {/* 表单卡片 */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <span className="text-2xl">⚡</span>
            <h1 className="text-xl font-black mt-2 tracking-tight text-gray-900">
              {isZh ? '三大宏量营养素科学计算器' : 'Macro Nutrient Calculator'}
            </h1>
            <p className="text-[11px] text-gray-400 mt-1 font-mono uppercase tracking-widest">
              {isZh ? '基于 Mifflin-St Jeor 标准算法' : 'Based on Mifflin-St Jeor Formula'}
            </p>
          </div>

          <form onSubmit={calculateMacros} className="space-y-4">
            {/* 性别选择 */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                {isZh ? '生理性别' : 'Biological Gender'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === 'male' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  {isZh ? '🙋‍♂️ 男' : 'Male'}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === 'female' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  {isZh ? '🙋‍♀️ 女' : 'Female'}
                </button>
              </div>
            </div>

            {/* 体重、身高、年龄 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">{isZh ? '体重 (kg)' : 'Weight (kg)'}</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full p-2.5 text-xs font-mono border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">{isZh ? '身高 (cm)' : 'Height (cm)'}</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full p-2.5 text-xs font-mono border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">{isZh ? '年龄' : 'Age'}</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full p-2.5 text-xs font-mono border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  required
                />
              </div>
            </div>

            {/* 活动量 */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                {isZh ? '日常活动强度' : 'Activity Level'}
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-2.5 text-xs font-medium border border-gray-200 rounded-xl bg-gray-50 focus:outline-none"
              >
                <option value="1.2">{isZh ? '🛌 久坐不动（几乎不运动/办公室久坐）' : 'Sedentary (Little or no exercise)'}</option>
                <option value="1.375">{isZh ? '🏃‍♂️ 轻度活跃（每周 1-3 天轻度运动）' : 'Lightly Active (Exercise 1-3 days/week)'}</option>
                <option value="1.55">{isZh ? '🏋️‍♂️ 中度活跃（每周 3-5 天中强度运动）' : 'Moderately Active (Exercise 3-5 days/week)'}</option>
                <option value="1.725">{isZh ? '🔥 高度活跃（每周 6-7 天高强度运动）' : 'Very Active (Hard exercise 6-7 days/week)'}</option>
              </select>
            </div>

            {/* 减脂增肌目标 */}
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                {isZh ? '当前核心身材目标' : 'Physique Goal'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['cut', 'maintain', 'bulk', 'keto'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`p-2 text-xs font-semibold rounded-xl border transition ${goal === g ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                  >
                    {g === 'cut' && (isZh ? '📉 科学减脂' : 'Lose Weight')}
                    {g === 'maintain' && (isZh ? '⚖️ 维持体格' : 'Maintain')}
                    {g === 'bulk' && (isZh ? '💪 干净增肌' : 'Lean Bulk')}
                    {g === 'keto' && (isZh ? '🥑 生酮燃脂' : 'Keto Diet')}
                  </button>
                ))}
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white p-3 text-xs font-black tracking-widest uppercase rounded-xl shadow-md transition active:scale-[0.99] mt-2"
            >
              {isZh ? '⚡ 锁 定 宏 量 膳 食 计 划' : '⚡ Lock In My Macros'}
            </button>
          </form>

          {/* 计算结果与分享卡片面板 */}
          {results !== null && (
            <div className="mt-6 space-y-4 border-t border-gray-100 pt-6 animate-fade-in">
              
              {/* 热量指标 */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">{isZh ? '总每日能量消耗' : 'Your Est. TDEE'}</span>
                  <span className="text-xl font-black font-mono text-gray-800">{results.tdee} <span className="text-xs font-normal text-gray-400">kcal</span></span>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 block">{isZh ? '每日目标总摄入' : 'Target Intake'}</span>
                  <span className="text-xl font-black font-mono text-blue-600">{results.targetCalories} <span className="text-xs font-normal text-blue-400">kcal</span></span>
                </div>
              </div>

              {/* 三大宏量营养素细节 */}
              <div className="space-y-2">
                <div className="bg-blue-50/30 border border-blue-100/70 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-blue-900 block">🍗 {isZh ? '蛋白质目标' : 'Protein Target'}</span>
                    <span className="text-[10px] text-gray-400">{isZh ? '肌肉合成与抗分解基石' : 'Muscle building & tissue repair'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-blue-600">{results.protein} <span className="text-xs font-bold">g</span></span>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-emerald-900 block">🍞 {isZh ? '碳水化合物' : 'Carbohydrates'}</span>
                    <span className="text-[10px] text-gray-400">{isZh ? '全天训练核心糖原储备' : 'Daily main energy source'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-emerald-600">{results.carbs} <span className="text-xs font-bold">g</span></span>
                </div>

                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-black text-amber-900 block">🥑 {isZh ? '优质膳食脂肪' : 'Dietary Fats'}</span>
                    <span className="text-[10px] text-gray-400">{isZh ? '内分泌与关节核心保障' : 'Hormone health & joints'}</span>
                  </div>
                  <span className="text-xl font-black font-mono text-amber-600">{results.fat} <span className="text-xs font-bold">g</span></span>
                </div>
              </div>

              {/* 黑金炫耀裂变卡片区域 */}
              {(() => {
                const { tag, desc } = getGoalInfo();
                return (
                  <div className="mt-6 w-full p-5 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-xl relative overflow-hidden text-center">
                    <div className="absolute top-2.5 right-3.5 text-[9px] font-black tracking-widest text-gray-500/80 flex items-center gap-0.5">
                      <span>⚡</span>FITKIT
                    </div>

                    <p className="text-[9px] text-yellow-500 uppercase font-black tracking-widest">{isZh ? '🔥 备赛膳食数据已生成 🔥' : '🔥 TARGET MACROS GENERATED 🔥'}</p>
                    <h3 className="text-sm font-bold mt-0.5 tracking-tight">{isZh ? '科学营养素缺口看板' : 'Scientific Macro Planning'}</h3>

                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 font-mono my-2.5">
                      {results.targetCalories} <span className="text-xs font-normal text-gray-400">kcal/day</span>
                    </div>

                    <div className="inline-block text-[11px] text-blue-400 font-bold px-3 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-2">
                      {tag}
                    </div>
                    <p className="text-[11px] text-gray-400 px-4 leading-relaxed">{desc}</p>

                    <div className="mt-5 pt-3 border-t border-gray-800/80 grid grid-cols-3 text-left font-mono text-[10px] text-gray-500">
                      <div>🍗 P: <span className="text-white font-bold">{results.protein}g</span></div>
                      <div>🍞 C: <span className="text-white font-bold">{results.carbs}g</span></div>
                      <div>🥑 F: <span className="text-white font-bold">{results.fat}g</span></div>
                    </div>

                    <button
                      onClick={handleShareCopy}
                      className="mt-4 w-full py-2.5 bg-white text-black font-black text-xs rounded-xl shadow-md transition-all active:scale-[0.98] hover:bg-gray-100 flex items-center justify-center gap-1"
                    >
                      <span>{copied ? (isZh ? '✅ 复制成功！快去朋友圈炫肉' : '✅ Copied! Share with friends') : (isZh ? '✨ 复制膳食计划去社交平台炫耀' : '✨ Copy My Plan to Flaunt')}</span>
                    </button>
                  </div>
                );
              })()}

            </div>
          )}
        </div>
      </div>
    </main>
  );
}