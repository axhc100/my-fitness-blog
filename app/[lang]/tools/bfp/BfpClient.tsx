'use client';

import { useState, use } from 'react';
import Link from 'next/link';

// 多语言深度字典
const uiDict = {
  en: {
    back: "← Back to Home",
    title: "Body Fat Calculator (Dual Mode)",
    modeSelect: "Calculation Method",
    gender: "Gender",
    male: "Male",
    female: "Female",
    height: "Height (cm)",
    weight: "Weight (kg)",
    age: "Age",
    neck: "Neck Circumference (cm)",
    waist: "Waist Circumference (cm)",
    hip: "Hip Circumference (cm)",
    btn: "⚡ Calculate Body Fat %",
    resultTitle: "Your Estimated Body Fat:",
    interpretationTitle: "📊 Professional Bio-Analysis",
    tips: "Note: Mode 1 uses the standard BMI equation. Mode 2 (Navy Method) measures absolute abdominal fat distribution and is highly recommended for fitness enthusiasts.",
    shareCardTitle: "Body Fat % Analysis",
    shareToday: "TODAY'S ACHIEVEMENT",
    tag1: "🏅 Striated Shape",
    desc1: "Beating 92% of fitness geeks globally!",
    tag2: "🔥 Great Condition",
    desc2: "Lean in clothes, muscular without. Abs ready!",
    tag3: "💪 Burning Fat",
    desc3: "Control cortisol, a better shape is coming!",
    shareBtn: "✨ Copy Achievement to Share",
    shareBtnSuccess: "✅ Copied! Go & Flaunt It!",
    copyText: (val: number, tag: string, desc: string, mode: string) => 
      `🔥 Measured my body fat at ${val}% via [${mode}] on FitKit! Status: [${tag}]. ${desc} Ad-free tool box, test yours here: https://fitkit.top`,
    cat1: "Essential Fat",
    cat2: "Athletic",
    cat3: "Fit",
    cat4: "Normal",
    cat5: "Obese"
  },
  zh: {
    back: "← 返回首页",
    title: "体脂率科学计算器 (双模版)",
    modeSelect: "测算核心模式",
    gender: "性别",
    male: "男",
    female: "女",
    height: "身高 (厘米)",
    weight: "体重 (公斤)",
    age: "年龄",
    neck: "颈围 (厘米 - 喉结下方最细处)",
    waist: "腰围 (厘米 - 肚脐水平绕一周)",
    hip: "臀围 (厘米 - 翘臀最粗处绕一周)",
    btn: "⚡ 锁定真实体脂率",
    resultTitle: "您的预估体脂率为：",
    interpretationTitle: "📊 深度身体状态生化解读",
    tips: "注：模式一基于基础 BMI 公式，高肌肉量人群易偏高；模式二（美国海军公式）直接提取腰围与核心脂肪分布，是健身极客测算的核心标准。",
    shareCardTitle: "体脂百分比科学测算",
    shareToday: "今日健身成就",
    tag1: "🏅 刀刻般线条",
    desc1: "超越了全球 92% 的健身极客！",
    tag2: "🔥 极佳运动状态",
    desc2: "穿衣显瘦，脱衣有肉，马甲线随时待命！",
    tag3: "💪 持续燃脂中",
    desc3: "科学控好皮质醇，好身材正在加速出关！",
    shareBtn: "✨ 复制成就去社交平台/朋友圈炫耀",
    shareBtnSuccess: "✅ 复制成功！快去群里炫耀",
    copyText: (val: number, tag: string, desc: string, mode: string) => 
      `🔥 我今天在 FitKit 通过[${mode}]测出了 ${val}% 的真实体脂！状态：[${tag}]。${desc} 免登录无广告计算器，快来测测你的：https://fitkit.top`,
    cat1: "必需脂肪",
    cat2: "运动员",
    cat3: "健壮",
    cat4: "正常",
    cat5: "肥胖"
  }
};

interface BfpClientProps {
  paramsPromise: Promise<{ lang: 'en' | 'zh' }>;
}

export default function BfpClient({ paramsPromise }: BfpClientProps) {
  // 解构多语言参数
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const t = uiDict[lang];

  // 核心计算模式状态
  const [calcMode, setCalcMode] = useState<'bmi' | 'navy'>('bmi');

  // 表单输入字段状态
  const [gender, setGender] = useState('1'); // 1 = 男, 0 = 女
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // 计算逻辑
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (calcMode === 'bmi') {
      if (h && w && a) {
        const hMeter = h / 100;
        const bmi = w / (hMeter * hMeter);
        const bfp = 1.20 * bmi + 0.23 * a - 10.8 * parseInt(gender) - 5.4;
        setResult(Math.max(2, parseFloat(bfp.toFixed(1))));
      }
    } else {
      const n = parseFloat(neck);
      const strokeWaist = parseFloat(waist);
      
      if (!h || !n || !strokeWaist) return;

      let bfpNavy = 0;
      if (gender === '1') {
        const logDiff = Math.log10(strokeWaist - n);
        const logH = Math.log10(h);
        if (strokeWaist > n) {
          bfpNavy = 495 / (1.0324 - 0.19077 * logDiff + 0.15456 * logH) - 450;
        }
      } else {
        const strokeHip = parseFloat(hip);
        if (!strokeHip) return;
        const logDiff = Math.log10(strokeWaist + strokeHip - n);
        const logH = Math.log10(h);
        if ((strokeWaist + strokeHip) > n) {
          bfpNavy = 495 / (1.29579 - 0.35004 * logDiff + 0.22100 * logH) - 450;
        }
      }

      if (bfpNavy > 0) {
        setResult(parseFloat(bfpNavy.toFixed(1)));
      }
    }
    setCopied(false);
  };

  // 根据基准标准图表进行医学级解读
  const getDetailedInterpretation = (bfpVal: number) => {
    const isMale = gender === '1';
    const currentAge = parseInt(age) || 25;
    
    let idealText = "";
    if (isMale) {
      if (currentAge <= 22) idealText = "8.5%";
      else if (currentAge <= 27) idealText = "10.5%";
      else if (currentAge <= 32) idealText = "12.7%";
      else if (currentAge <= 37) idealText = "13.7%";
      else if (currentAge <= 42) idealText = "15.3%";
      else if (currentAge <= 47) idealText = "16.4%";
      else if (currentAge <= 52) idealText = "18.9%";
      else idealText = "20.9%";
    } else {
      if (currentAge <= 22) idealText = "17.7%";
      else if (currentAge <= 27) idealText = "18.4%";
      else if (currentAge <= 32) idealText = "19.3%";
      else if (currentAge <= 37) idealText = "21.5%";
      else if (currentAge <= 42) idealText = "22.2%";
      else if (currentAge <= 47) idealText = "22.9%";
      else if (currentAge <= 52) idealText = "25.2%";
      else idealText = "26.3%";
    }

    if (isMale) {
      if (bfpVal >= 2 && bfpVal <= 5) {
        return {
          category: t.cat1,
          color: "text-red-600 bg-red-50 border-red-200",
          desc: lang === 'zh' 
            ? `处于维持生命最基本的【必需脂肪】临界线（2%-5%）。对于当前 ${currentAge} 岁男性，虽具备赛级线条，但请务必注意免疫与荷尔蒙健康。`
            : `At essential fat levels (2%-5%). Extremely lean. Monitor your recovery carefully.`
        };
      }
      if (bfpVal > 5 && bfpVal <= 13) {
        return {
          category: t.cat2,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          desc: lang === 'zh' 
            ? `处于完美的【运动员】级别（6%-13%）。当前年龄理想参考值为 ${idealText}，您的体脂状态非常拔尖，皮下脂肪极薄！`
            : `Athletic range (6%-13%). Highly optimized. Your age reference benchmark is ${idealText}.`
        };
      }
      if (bfpVal > 13 && bfpVal <= 17) {
        return {
          category: t.cat3,
          color: "text-green-600 bg-green-50 border-green-200",
          desc: lang === 'zh' 
            ? `处于极其优秀的【健壮】级别（14%-17%）。腹肌轮廓可见，肌肉饱满。对比当前年龄参考值 ${idealText}，处于黄金健身区间。`
            : `Fit and strong condition (14%-17%). Excellent lean muscle mass layout.`
        };
      }
      if (bfpVal > 17 && bfpVal <= 24) {
        return {
          category: t.cat4,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          desc: lang === 'zh' 
            ? `处于健康的【正常】标准区间（18%-24%）。对比当前年龄理想参考值 ${idealText}，建议搭配适当的抗阻与热量调控。`
            : `Normal and stable health profile (18%-24%). Age standard target is ${idealText}.`
        };
      }
      return {
        category: t.cat5,
        color: "text-amber-700 bg-amber-50 border-amber-200",
        desc: lang === 'zh' 
          ? `数据提示已进入【肥胖】警戒区（≥25%）。超出了当前年龄理想基准 ${idealText}，建议积极控制内脏脂肪，开启规律作息。`
          : `Adiposity warning zone (≥25%). Higher than age benchmark ${idealText}.`
      };
    } else {
      if (bfpVal >= 10 && bfpVal <= 13) {
        return {
          category: t.cat1,
          color: "text-red-600 bg-red-50 border-red-200",
          desc: lang === 'zh' 
            ? `处于女性生理极限的【必需脂肪】安全底线（10%-13%）。可能存在内分泌或周期停滞风险，请及时补充优质能量。`
            : `Essential lipid bounds (10%-13%). Highly critical for standard feminine endocrine pathways.`
        };
      }
      if (bfpVal > 13 && bfpVal <= 20) {
        return {
          category: t.cat2,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          desc: lang === 'zh' 
            ? `处于优越的【运动员】级别（14%-20%）。皮下脂肪紧致。对比 ${currentAge} 岁女性理想参考值 ${idealText}，线条感极为利落。`
            : `Premium Athletic build (14%-20%). Your current age baseline target is ${idealText}.`
        };
      }
      if (bfpVal > 20 && bfpVal <= 24) {
        return {
          category: t.cat3,
          color: "text-green-600 bg-green-50 border-green-200",
          desc: lang === 'zh' 
            ? `处于完美的【健壮】级别（21%-24%）。身材比例饱满且富含肌肉活力。对比当前年龄参考值 ${idealText}，处于超常状态。`
            : `Feminine Fit standard (21%-24%). Active structural lean mass preservation.`
        };
      }
      if (bfpVal > 24 && bfpVal <= 31) {
        return {
          category: t.cat4,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          desc: lang === 'zh' 
            ? `处于非常健康的【正常】身材区间（25%-31%）。内分泌极度稳健。对比当前年龄理想参考值 ${idealText}，符合长寿代谢指标。`
            : `Normal regulatory interval (25%-31%). Your age benchmark target is ${idealText}.`
        };
      }
      return {
        category: t.cat5,
        color: "text-amber-700 bg-amber-50 border-amber-200",
        desc: lang === 'zh' 
          ? `数据提示已进入【肥胖】范畴（≥32%）。已超过当前年龄理想基准值 ${idealText}，容易伴随久坐和高皮质醇堆积，建议开启科学控糖。`
          : `Adiposity warning zone (≥32%). Higher than age benchmark ${idealText}.`
      };
    }
  };

  const getShareContent = (bfpVal: number) => {
    if (bfpVal < (gender === '1' ? 14 : 21)) return { tag: t.tag1, desc: t.desc1 };
    if (bfpVal < (gender === '1' ? 18 : 25)) return { tag: t.tag2, desc: t.desc2 };
    return { tag: t.tag3, desc: t.desc3 };
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        
        <Link href={`/${lang}`} className="text-xs font-black uppercase text-blue-600 hover:underline mb-6 inline-block tracking-wider">
          {t.back}
        </Link>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <span className="text-2xl">🧬</span>
            <h1 className="text-xl font-black text-gray-900 mt-2 tracking-tight">{t.title}</h1>
          </div>

          {/* 双模切换器 */}
          <div className="mb-6">
            <label className="block text-[11px] font-black uppercase text-gray-400 tracking-widest mb-2">{t.modeSelect}</label>
            <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/50">
              <button
                type="button"
                onClick={() => { setCalcMode('bmi'); setResult(null); }}
                className={`py-2 text-[11px] font-black rounded-lg transition-all ${calcMode === 'bmi' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {lang === 'zh' ? '模式一: BMI 法' : 'Mode 1: BMI'}
              </button>
              <button
                type="button"
                onClick={() => { setCalcMode('navy'); setResult(null); }}
                className={`py-2 text-[11px] font-black rounded-lg transition-all ${calcMode === 'navy' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {lang === 'zh' ? '模式二: 海军围度' : 'Mode 2: US Navy'}
              </button>
            </div>
          </div>

          {/* 表单 */}
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{t.gender}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('1')}
                  className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === '1' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  {t.male}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('0')}
                  className={`p-2.5 text-xs font-bold rounded-xl border transition ${gender === '0' ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  {t.female}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{t.height}</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{t.age}</label>
                <input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  required 
                />
              </div>
            </div>

            {calcMode === 'bmi' && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{t.weight}</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  required 
                />
              </div>
            )}

            {calcMode === 'navy' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t.neck}</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={neck} 
                      onChange={(e) => setNeck(e.target.value)}
                      placeholder="e.g. 37"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t.waist}</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={waist} 
                      onChange={(e) => setWaist(e.target.value)}
                      placeholder="e.g. 82"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                      required 
                    />
                  </div>
                </div>

                {gender === '0' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t.hip}</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={hip} 
                      onChange={(e) => setHip(e.target.value)}
                      placeholder="e.g. 94"
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
                      required 
                    />
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gray-950 text-white p-3 rounded-xl font-black tracking-widest text-xs uppercase shadow-md hover:bg-black transition active:scale-[0.99]"
            >
              {t.btn}
            </button>
          </form>

          {/* 结果展示 */}
          {result !== null && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-900 border border-black rounded-2xl text-center shadow-inner">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.resultTitle}</p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 font-mono mt-1">
                  {result}%
                </p>
              </div>

              {(() => {
                const interpretation = getDetailedInterpretation(result);
                return (
                  <div className={`p-4 border rounded-2xl transition-all duration-300 ${interpretation.color}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black text-gray-900 flex items-center gap-1">
                        {t.interpretationTitle}
                      </h3>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white shadow-sm border border-black/5">
                        {interpretation.category}
                      </span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed mt-2.5 text-gray-800">
                      {interpretation.desc}
                    </p>
                  </div>
                );
              })()}

              {/* 炫耀卡片 */}
              {(() => {
                const { tag, desc } = getShareContent(result);
                const currentModeName = calcMode === 'bmi' ? (lang === 'zh' ? 'BMI估算法' : 'BMI Est.') : (lang === 'zh' ? '美国海军公式' : 'US Navy Method');
                return (
                  <div className="w-full p-5 bg-gradient-to-br from-slate-900 to-black text-white rounded-2xl shadow-xl relative overflow-hidden text-center">
                    <div className="absolute top-2.5 right-3.5 text-[9px] font-black tracking-widest text-slate-700 flex items-center gap-0.5">
                      <span>⚡</span>FITKIT
                    </div>

                    <p className="text-[9px] text-yellow-500 font-black tracking-widest uppercase">{t.shareToday}</p>
                    <h4 className="text-xs font-bold tracking-tight mt-0.5">{t.shareCardTitle}</h4>
                    
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 font-mono my-2.5">
                      {result}%
                    </div>
                    
                    <div className="inline-block text-[10px] text-blue-400 font-bold px-3 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-2">
                      {tag}
                    </div>
                    <p className="text-[11px] text-gray-400 px-3 leading-relaxed">{desc}</p>
                    
                    <div className="mt-4 pt-2.5 border-t border-gray-800/60 flex justify-between items-center text-[9px] text-gray-500 font-mono">
                      <span>{currentModeName}</span>
                      <span>fitkit.top</span>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        const text = t.copyText(result, tag, desc, currentModeName);
                        try {
                          await navigator.clipboard.writeText(text);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="mt-4 w-full py-2.5 bg-white text-black font-black text-xs rounded-xl shadow-md transition-all active:scale-[0.98] hover:bg-gray-100 flex items-center justify-center gap-1"
                    >
                      <span>{copied ? t.shareBtnSuccess : t.shareBtn}</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          <p className="text-[11px] text-gray-400 mt-6 text-center leading-relaxed px-2">
            {t.tips}
          </p>
        </div>
      </div>
    </main>
  );
}