'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface BfpClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

export default function BfpClient({ paramsPromise }: BfpClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  
  // 核心状态：模式选择 (Mode 1: BMI, Mode 2: US Navy)
  const [mode, setMode] = useState<'bmi' | 'navy'>('bmi');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // 输入表单状态
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');

  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs">Loading...</div>;
  }

  // 科学算法逻辑
  const calculateBfp = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (!h || !w) return;

    let bfpVal = 0;

    if (mode === 'bmi') {
      if (!a) return;
      const bmi = w / ((h / 100) * (h / 100));
      const genderFactor = gender === 'male' ? 1 : 0;
      bfpVal = 1.20 * bmi + 0.23 * a - 10.8 * genderFactor - 5.4;
    } else {
      // 模式 2: 纯正美军体围测量公式 (US Navy Method)
      const ws = parseFloat(waist);
      const nk = parseFloat(neck);
      if (!ws || !nk) return;

      if (gender === 'male') {
        bfpVal = 495 / (1.0324 - 0.19077 * Math.log10(ws - nk) + 0.15456 * Math.log10(h)) - 450;
      } else {
        const hp = parseFloat(hip);
        if (!hp) return;
        bfpVal = 495 / (1.29579 - 0.35004 * Math.log10(ws + hp - nk) + 0.22100 * Math.log10(h)) - 450;
      }
    }

    if (!isNaN(bfpVal) && bfpVal > 0) {
      setResult(parseFloat(bfpVal.toFixed(1)));
    }
  };

  // 身体成分双语深度诊断矩阵
  const getAnalysis = (val: number) => {
    const isNormal = gender === 'male' ? (val >= 14 && val <= 24) : (val >= 18 && val <= 24);
    
    if (gender === 'male') {
      if (val < 6) return { label: isZh ? '精干' : 'Essential', normalLabel: 'MINIMUM', color: 'text-amber-600', bg: 'bg-amber-50', desc: isZh ? '处于竞技运动员极低极限区间。' : 'At the minimum essential fat level for athletes.' };
      if (val <= 13) return { label: isZh ? '强悍' : 'Athletic', normalLabel: 'ATHLETIC', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: isZh ? '体格线条极佳，肌肉轮廓明显。' : 'Excellent muscle definition and low body fat.' };
      if (val <= 24) return { label: isZh ? '正常' : 'Normal', normalLabel: 'NORMAL', color: 'text-blue-600', bg: 'bg-blue-50', desc: isZh ? '处于健康的【正常】标准区间 (18%-24%)。对比当前年龄理想参考值 16.4%，建议搭配适当的抗阻与热量调控。' : 'Within the healthy standard range. Consider tracking macro targets.' };
      return { label: isZh ? '偏高' : 'Overweight', normalLabel: 'OVERWEIGHT', color: 'text-red-500', bg: 'bg-red-50', desc: isZh ? '建议适当控制热量，调整饮食结构并增加有氧。' : 'Above average. Consider tracking a mild calorie deficit.' };
    } else {
      if (val < 14) return { label: isZh ? '精干' : 'Essential', normalLabel: 'MINIMUM', color: 'text-amber-600', bg: 'bg-amber-50', desc: isZh ? '处于极低脂肪率，请密切关注身体常规内分泌。' : 'Essential fat level. Monitor hormonal balance closely.' };
      if (val <= 20) return { label: isZh ? '强悍' : 'Athletic', normalLabel: 'ATHLETIC', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: isZh ? '身体线条紧致，马甲线或肌肉轮廓清晰。' : 'Toned body structure with prominent lean mass.' };
      if (val <= 31) return { label: isZh ? '正常' : 'Normal', normalLabel: 'NORMAL', color: 'text-blue-600', bg: 'bg-blue-50', desc: isZh ? '处于非常健康的【正常】身材区间 (25%-31%)。内分泌极度稳健。对比当前年龄理想参考值 18.4%，符合长寿代谢指标。' : 'Excellent and highly recommended fitness structure.' };
      return { label: isZh ? '偏高' : 'Overweight', normalLabel: 'OVERWEIGHT', color: 'text-red-500', bg: 'bg-red-50', desc: isZh ? '建议适当减少高糖高油摄入，加强核心燃脂。' : 'Above normal range. Cardio and clean eating advised.' };
    }
  };

  const analysis = result ? getAnalysis(result) : null;

  const handleCopyShare = async () => {
    if (!result || !analysis) return;
    const text = isZh
      ? `🥑 我刚刚在 FitKit 完成了科学体脂率多维测算！\n📊 测算结果：[ ${result}% ]\n🎯 状态评估：${analysis.label} (${analysis.desc})\n💪 掌控身材，点此免费测算你的体脂成分：https://fitkit.top`
      : `🥑 Just mapped out my body composition on FitKit!\n📊 Body Fat Percentage: [ ${result}% ]\n🎯 Status: ${analysis.label} (${analysis.desc})\n💪 Track your metrics for free at: https://fitkit.top`;

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

        {/* 核心卡片容器 */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* 动态大标题 */}
          <div className="text-center mb-6">
            <span className="text-2xl block mb-1">🧬</span>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              {isZh ? '体脂率双模式计算器' : 'Body Fat Calculator (Dual Mode)'}
            </h1>
          </div>

          <form onSubmit={calculateBfp} className="space-y-4">
            {/* 布局模块一：计算模式切换 (CALCULATION METHOD) */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                {isZh ? '计算模式' : 'CALCULATION METHOD'}
              </label>
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl border border-gray-200/50">
                <button type="button" onClick={() => { setMode('bmi'); setResult(null); }} className={`py-2 text-xs font-black rounded-lg transition-all ${mode === 'bmi' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {isZh ? '模式 1: BMI 基础' : 'Mode 1: BMI'}
                </button>
                <button type="button" onClick={() => { setMode('navy'); setResult(null); }} className={`py-2 text-xs font-black rounded-lg transition-all ${mode === 'navy' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {isZh ? '模式 2: 美军体围' : 'Mode 2: US Navy'}
                </button>
              </div>
            </div>

            {/* 布局模块二：性别选择 (Gender) */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                {isZh ? '性别' : 'Gender'}
              </label>
              <div className="grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-xl">
                <button type="button" onClick={() => setGender('male')} className={`py-2 text-xs font-black rounded-lg transition-all ${gender === 'male' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
                  {isZh ? '男 / Male' : 'Male'}
                </button>
                <button type="button" onClick={() => setGender('female')} className={`py-2 text-xs font-black rounded-lg transition-all ${gender === 'female' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
                  {isZh ? '女 / Female' : 'Female'}
                </button>
              </div>
            </div>

            {/* 布局模块三：身高、年龄弹性输入网格 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  {isZh ? '身高 (cm)' : 'Height (cm)'}
                </label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 font-mono focus:outline-none" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  {isZh ? '年龄' : 'Age'}
                </label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 font-mono focus:outline-none" required={mode === 'bmi'} />
              </div>
            </div>

            {/* 体重项 */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                {isZh ? '体重 (kg)' : 'Weight (kg)'}
              </label>
              <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 font-mono focus:outline-none" required />
            </div>

            {/* 核心联动：如果切换到 Mode 2：美军体围模式，动态展现高精度体围输入框 */}
            {mode === 'navy' && (
              <div className="border-t border-dashed border-gray-200 pt-4 space-y-3 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {isZh ? '颈围 (cm)' : 'Neck Circumference (cm)'}
                    </label>
                    <input type="number" step="0.1" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="e.g. 38" className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 font-mono focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {isZh ? '腰围 (cm)' : 'Waist Circumference (cm)'}
                    </label>
                    <input type="number" step="0.1" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="e.g. 82" className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 font-mono focus:outline-none" required />
                  </div>
                </div>
                {gender === 'female' && (
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {isZh ? '臀围 (cm)' : 'Hip Circumference (cm)'}
                    </label>
                    <input type="number" step="0.1" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="e.g. 94" className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50/50 font-mono focus:outline-none" required />
                  </div>
                )}
              </div>
            )}

            {/* 计算提交大黑按钮 */}
            <button type="submit" className="w-full bg-gray-950 text-white p-3.5 rounded-xl font-black tracking-widest text-xs uppercase shadow-md hover:bg-black transition">
              ⚡ {isZh ? '开始计算体脂百分比' : 'CALCULATE BODY FAT %'}
            </button>
          </form>

          {/* 底部模式动态提示标注 */}
          <p className="text-[10px] text-gray-400 text-center leading-relaxed mt-4 px-2">
            {isZh 
              ? '注：模式 1 基于世界卫生组织标准 BMI 复合公式计算。模式 2 (美军测量法) 通过核心绝对腰腹围度比进行拟合估算，极力推荐给健身爱好者。' 
              : 'Note: Mode 1 uses the standard BMI equation. Mode 2 (Navy Method) measures absolute abdominal fat distribution and is highly recommended for fitness enthusiasts.'}
          </p>

          {/* 🎯 渲染精细结果看板 —— 100% 对应双语及排版 */}
          {result !== null && analysis && (
            <div className="mt-6 space-y-4 animate-fade-in">
              
              {/* 看板一：预估结果反馈区 */}
              <div className="bg-slate-900 text-white border border-gray-800 rounded-2xl p-4 text-center">
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  {isZh ? '预估体内脂肪率' : 'YOUR ESTIMATED BODY FAT'}
                </span>
                <div className="text-4xl font-black font-mono text-amber-400">{result}%</div>
              </div>

              {/* 看板二：专业体质分析 */}
              <div className="border border-blue-100 rounded-2xl p-4 bg-blue-50/30">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                    📊 {isZh ? '专业体质深度分析' : 'Professional Bio-Analysis'}
                  </span>
                  <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono">
                    {analysis.normalLabel}
                  </span>
                </div>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">{analysis.desc}</p>
              </div>

              {/* 看板三：炫耀打卡成就海报样式 */}
              <div className="bg-black text-white p-5 rounded-2xl relative overflow-hidden shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black tracking-widest text-amber-400 uppercase">
                    🏆 {isZh ? '今日打卡成就快照' : 'TODAY\'S ACHIEVEMENT'}
                  </span>
                  <span className="text-[10px] font-black text-gray-500 font-mono">⚡ FITKIT</span>
                </div>
                <div className="text-xs font-bold text-gray-300">{isZh ? '体脂率综合深度诊断' : 'Body Fat % Analysis'}</div>
                <div className="text-4xl font-black font-mono text-white my-1">{result}%</div>
                
                <div className="inline-flex items-center gap-1 bg-gray-800/80 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 mb-2">
                  💪 {isZh ? '正在高效燃脂' : 'Burning Fat'}
                </div>
                
                <p className="text-[10px] text-gray-400 leading-tight">
                  {isZh ? '卓越控制皮质醇，更好的身材正在路上！' : 'Control cortisol, a better shape is coming!'}
                </p>
                <span className="absolute bottom-3 right-4 text-[9px] text-gray-600 font-mono">
                  {mode === 'bmi' ? 'BMI Est.' : 'US Navy Method'}
                </span>
              </div>

              {/* 看板四：拷贝分享大按钮 */}
              <button
                type="button"
                onClick={handleCopyShare}
                className={`w-full py-3 rounded-xl text-xs font-black tracking-wider uppercase transition border ${
                  copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 shadow-sm'
                }`}
              >
                {copied ? (isZh ? '✅ 复制成功！快去分享吧' : '✅ Copied achievement text!') : (isZh ? '✨ 一键复制今日打卡炫耀快照' : '✨ Copy Achievement to Share')}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}