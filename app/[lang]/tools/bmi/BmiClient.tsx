'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ToolScientificGuide from '@/components/ToolScientificGuide';

interface BmiClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

export default function BmiClient({ paramsPromise }: BmiClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{
    bmi: number;
    categoryKey: 'underweight' | 'normal' | 'overweight' | 'obese';
    minHealthyWeight: number;
    maxHealthyWeight: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedHeight = localStorage.getItem('fitkit_bmi_height');
    const savedWeight = localStorage.getItem('fitkit_bmi_weight');
    if (savedHeight) setHeight(savedHeight);
    if (savedWeight) setWeight(savedWeight);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (height) localStorage.setItem('fitkit_bmi_height', height);
      if (weight) localStorage.setItem('fitkit_bmi_weight', weight);
    }
  }, [height, weight, mounted]);

  const calculateBmi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    const hm = h / 100;
    const bmiRaw = w / (hm * hm);
    const bmi = parseFloat(bmiRaw.toFixed(1));

    let categoryKey: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal';
    if (bmi < 18.5) {
      categoryKey = 'underweight';
    } else if (bmi <= 24.9) {
      categoryKey = 'normal';
    } else if (bmi <= 29.9) {
      categoryKey = 'overweight';
    } else {
      categoryKey = 'obese';
    }

    const minHealthyWeight = parseFloat((18.5 * hm * hm).toFixed(1));
    const maxHealthyWeight = parseFloat((24.9 * hm * hm).toFixed(1));

    setResult({
      bmi,
      categoryKey,
      minHealthyWeight,
      maxHealthyWeight,
    });
  };

  const categories = {
    underweight: {
      label: isZh ? '偏轻 (体重过低)' : 'Underweight',
      range: '< 18.5',
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900',
      badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
      desc: isZh
        ? '您的体重低于 WHO 推荐的健康基准线。过轻通常伴随骨骼肌与微量元素储备不足，建议增加优质蛋白质与复合碳水化合物摄入，配合抗阻力量训练稳步增重。'
        : 'Your weight is below the WHO recommended baseline. Being underweight may reflect lean mass or nutritional deficits. Consider a nutrient-dense caloric surplus combined with resistance training.',
    },
    normal: {
      label: isZh ? '正常 (理想健康区间)' : 'Normal Weight',
      range: '18.5 – 24.9',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      desc: isZh
        ? '太棒了！您的 BMI 处于世界卫生组织公认的黄金健康区间，全因死亡率与慢性心血管代谢风险最低。请继续保持均衡膳食与规律运动习惯。'
        : 'Optimal! Your BMI falls within the WHO ideal healthy bracket, associated with the lowest epidemiological risks of cardiovascular and metabolic complications. Maintain your active routine and balanced diet.',
    },
    overweight: {
      label: isZh ? '超重' : 'Overweight',
      range: '25.0 – 29.9',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      desc: isZh
        ? '您的数值高于正常范围上限。经常进行抗阻训练的人士，偏高多为发达骨骼肌所致；久坐少动者则需警惕内脏脂肪，建议测量体脂率与腰围，制造适度热量缺口。'
        : 'Your reading is above the standard baseline. For resistance-trained athletes, this frequently reflects muscular hypertrophy. For sedentary individuals, monitor body fat percentage and waist circumference, and consider a modest caloric deficit.',
    },
    obese: {
      label: isZh ? '肥胖' : 'Obese',
      range: '≥ 30.0',
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      desc: isZh
        ? '您的 BMI 处于肥胖区间。流行病学研究证实，长期处于该区间显著增加 2 型糖尿病、高血压及脂肪肝风险。建议在专业医师或营养师指导下展开渐进式饮食控制与运动计划。'
        : 'Your BMI is in the obese range, which epidemiological data links with higher incidence of hypertension, insulin resistance, and metabolic stress. Consulting a healthcare provider for progressive nutritional planning is advised.',
    },
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleCopy = () => {
    if (!result) return;
    const cat = categories[result.categoryKey];
    const text = isZh
      ? `我的 BMI 计算结果：${result.bmi}（${cat.label}），标准体重范围：${result.minHealthyWeight}–${result.maxHealthyWeight}kg。测算自 FitKit 科学健身工具箱：https://www.fitkit.top/zh/tools/bmi`
      : `My BMI result: ${result.bmi} (${cat.label}), healthy weight range: ${result.minHealthyWeight}–${result.maxHealthyWeight}kg. Calculated on FitKit Health Tools: https://www.fitkit.top/en/tools/bmi`;

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
    const title = isZh ? 'FitKit BMI 身体质量指数计算器' : 'FitKit BMI Calculator';

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
          <span className="text-gray-800 font-medium">{isZh ? 'BMI 计算器' : 'BMI Calculator'}</span>
        </nav>

        {/* Calculator Main Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-block p-3 bg-blue-50 text-blue-600 rounded-2xl text-2xl mb-3 shadow-inner">
              ⚖️
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isZh ? 'BMI 身体质量指数计算器' : 'Body Mass Index (BMI) Calculator'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isZh
                ? '基于世界卫生组织（WHO）国际标准，输入身高与体重即时评估体质分级与理想体重范围。'
                : 'Calculate your BMI and evaluate body weight categories based on official WHO standards.'}
            </p>
          </div>

          <form onSubmit={calculateBmi} className="space-y-6 max-w-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '身高 (cm)' : 'Height (cm)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="50"
                    max="260"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    cm
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isZh ? '体重 (kg)' : 'Weight (kg)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="300"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    kg
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{isZh ? '立即计算 BMI' : 'Calculate BMI'}</span>
              <span>→</span>
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-8 border-t border-gray-100 max-w-xl mx-auto animate-fade-in">
              <div
                className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                  categories[result.categoryKey].bg
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gray-500">
                    {isZh ? '测算结果' : 'Assessment Result'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      categories[result.categoryKey].badgeBg
                    }`}
                  >
                    {categories[result.categoryKey].label}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`text-4xl sm:text-5xl font-black tracking-tight ${
                      categories[result.categoryKey].color
                    }`}
                  >
                    {result.bmi}
                  </span>
                  <span className="text-sm font-semibold text-gray-500">kg/m²</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                  {categories[result.categoryKey].desc}
                </p>

                {/* Healthy Weight Target */}
                <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs text-gray-600">
                  <span>{isZh ? '对应身高的正常体重范围：' : 'WHO healthy weight bracket:'}</span>
                  <span className="font-bold text-gray-900">
                    {result.minHealthyWeight} ~ {result.maxHealthyWeight} kg
                  </span>
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

              {/* WHO Classification Spectrum Reference */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {isZh ? 'WHO 世界卫生组织通用体成分参考标准：' : 'WHO Standard Adult Classifications:'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div
                    className={`p-2 rounded-xl ${
                      result.categoryKey === 'underweight'
                        ? 'bg-sky-200/80 font-bold text-sky-900 ring-2 ring-sky-400'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{isZh ? '偏轻' : 'Underweight'}</div>
                    <div className="text-[10px] text-gray-500">&lt; 18.5</div>
                  </div>
                  <div
                    className={`p-2 rounded-xl ${
                      result.categoryKey === 'normal'
                        ? 'bg-emerald-200/80 font-bold text-emerald-900 ring-2 ring-emerald-400'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{isZh ? '正常' : 'Normal'}</div>
                    <div className="text-[10px] text-gray-500">18.5 – 24.9</div>
                  </div>
                  <div
                    className={`p-2 rounded-xl ${
                      result.categoryKey === 'overweight'
                        ? 'bg-amber-200/80 font-bold text-amber-900 ring-2 ring-amber-400'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{isZh ? '超重' : 'Overweight'}</div>
                    <div className="text-[10px] text-gray-500">25.0 – 29.9</div>
                  </div>
                  <div
                    className={`p-2 rounded-xl ${
                      result.categoryKey === 'obese'
                        ? 'bg-rose-200/80 font-bold text-rose-900 ring-2 ring-rose-400'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{isZh ? '肥胖' : 'Obese'}</div>
                    <div className="text-[10px] text-gray-500">≥ 30.0</div>
                  </div>
                </div>
              </div>

              {/* Health Disclaimer */}
              <div className="mt-4 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-900/80 leading-relaxed">
                <span className="font-bold mr-1">ℹ️ {isZh ? '健康提示：' : 'Clinical Note:'}</span>
                {isZh
                  ? 'BMI 仅考虑身高与体重比例，无法区分肌肉与脂肪。肌肉量大的力量训练者 BMI 偏高属正常现象，结果仅供体质筛查参考，不构成医疗诊断。若有心血管慢性病、孕期或备孕，请咨询专业医生。'
                  : 'BMI does not differentiate between skeletal muscle and adipose tissue. Muscular athletes often register elevated readings. Results are for health screening reference only. Consult a physician for medical advice.'}
              </div>

              {/* Next Steps Guidance */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                  {isZh ? '下一步：解锁更全面的身体数据' : 'Next Steps: Deeper Biometric Insights'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href={`/${lang}/tools/bmr`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚡</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算 BMR 与 TDEE' : 'Calculate BMR & TDEE'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '算出维持生命所需最低热量与全天总消耗' : 'Determine daily baseline calories and energy burn'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/bfp`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">🔥</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '测算体脂率 (BFP)' : 'Body Fat Percentage'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '美军体围法区分骨骼肌与真实脂肪占比' : 'Differentiate muscle from fat using circumference tape'}
                    </div>
                  </Link>

                  <Link
                    href={`/${lang}/tools/ibw`}
                    className="p-4 bg-gray-50 hover:bg-blue-50/60 rounded-2xl border border-gray-100 hover:border-blue-200 transition group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform inline-block">⚖️</div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600">
                      {isZh ? '查看标准理想体重' : 'Ideal Body Weight'}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {isZh ? '临床 Devine 方程测算适合骨架的目标体重' : 'Clinical Devine baseline for your stature & frame'}
                    </div>
                  </Link>
                </div>
              </div>

              {/* Related Articles Guide */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
                  {isZh ? '推荐科学阅读' : 'Recommended Reading'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href={`/${lang}/blog/how-to-calculate-bmr`}
                    className="p-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition text-left flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">📖</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1">
                        {isZh ? 'BMR怎么算？基础代谢计算公式与实例' : 'How to Calculate BMR: Formulas and Practical Guide'}
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {isZh ? '掌握热量收支平衡的科学公式' : 'Master your energy expenditure balance'}
                      </p>
                    </div>
                  </Link>

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
                        {isZh ? '科学分配碳水、蛋白质与脂肪' : 'Optimize protein, carbohydrate, and fat intake'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* E-E-A-T Scientific Reference Guide */}
        <ToolScientificGuide slug="bmi" lang={lang} />
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
