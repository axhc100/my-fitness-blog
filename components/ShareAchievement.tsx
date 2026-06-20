'use client';

import { useState, use } from 'react';
import Link from 'next/link';

// 多语言文案字典（新增了裂变分享专属的国际化字段）
const uiDict = {
  en: {
    back: "← Back to Home",
    title: "Body Fat Calculator (BMI Method)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    height: "Height (cm)",
    weight: "Weight (kg)",
    age: "Age",
    btn: "Calculate",
    resultTitle: "Your Estimated Body Fat:",
    tips: "Note: The BMI method provides a general estimation. For athletes or bodybuilders, individual results may vary.",
    // 分享新增英文词条
    shareCardTitle: "Body Fat % Analysis",
    shareToday: "TODAY'S ACHIEVEMENT",
    tag1: "🏅 Striated Shape",
    desc1: "Beating 92% of fitness geeks globally!",
    tag2: "🔥 Great Condition",
    desc2: "Lean in clothes, muscular without. Abs ready!",
    tag3: "💪 Burning Fat",
    desc3: "Control cortisol, a better shape is coming!",
    shareBtn: "✨ Copy My Achievement",
    shareBtnSuccess: "✅ Copied! Go & Flaunt It!",
    copyText: (val: number, tag: string, desc: string) => `🔥 I just measured my body fat at ${val}% on FitKit! Status: [${tag}]. ${desc} No ads, login-free sci-fitness tool box, test yours here: https://fitkit.top`
  },
  zh: {
    back: "← 返回首页",
    title: "体脂率计算器 (BMI 法)",
    gender: "性别",
    male: "男",
    female: "女",
    height: "身高 (厘米)",
    weight: "体重 (公斤)",
    age: "年龄",
    btn: "开始计算",
    resultTitle: "您的预估体脂率为：",
    tips: "注：BMI 公式提供的是基础预估值。对于高肌肉量的健身爱好者，结果可能会有偏差。",
    // 分享新增中文词条
    shareCardTitle: "体脂百分比科学测算",
    shareToday: "今日健身成就",
    tag1: "🏅 刀刻般线条",
    desc1: "超越了全球 92% 的健身极客！",
    tag2: "🔥 极佳运动状态",
    desc2: "穿衣显瘦，脱衣有肉，马甲线随时待命！",
    tag3: "💪 持续燃脂中",
    desc3: "科学控好皮质醇，好身材正在加速出关！",
    shareBtn: "✨ 复制成就去小红书/朋友圈",
    shareBtnSuccess: "✅ 复制成功！快去群里炫耀",
    copyText: (val: number, tag: string, desc: string) => `🔥 我今天在 FitKit 测出了 ${val}% 的真实体脂！状态：[${tag}]。${desc} 免登录、无广告的科学健身计算工具箱，快来测测你的：https://fitkit.top`
  }
};

export default function BfpPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  // 解构多语言参数[cite: 3]
  const { lang } = use(params); //[cite: 3]
  const t = uiDict[lang] || uiDict.en; //[cite: 3]

  // 表单状态[cite: 3]
  const [height, setHeight] = useState(''); //[cite: 3]
  const [weight, setWeight] = useState(''); //[cite: 3]
  const [age, setAge] = useState(''); //[cite: 3]
  const [gender, setGender] = useState('1'); // 1 = 男, 0 = 女[cite: 3]
  const [result, setResult] = useState<number | null>(null); //[cite: 3]
  const [copied, setCopied] = useState(false);

  // 计算逻辑[cite: 3]
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault(); //[cite: 3]
    const hMeter = parseFloat(height) / 100; //[cite: 3]
    const wKg = parseFloat(weight); //[cite: 3]
    const ageNum = parseInt(age); //[cite: 3]

    if (hMeter && wKg && ageNum) { //[cite: 3]
      const bmi = wKg / (hMeter * hMeter); //[cite: 3]
      // 成年人体脂率公式：1.20 × BMI + 0.23 × 年龄 - 10.8 × 性别(男1女0) - 5.4[cite: 3]
      const bfp = 1.20 * bmi + 0.23 * ageNum - 10.8 * parseInt(gender) - 5.4; //[cite: 3]
      setResult(parseFloat(bfp.toFixed(1))); //[cite: 3]
      setCopied(false); // 每次重新计算时，重置复制按钮状态
    }
  };

  // 根据计算结果，动态获取分享卡片的标签与描述描述（支持双语）
  const getShareContent = (bfpVal: number) => {
    if (bfpVal < 15) {
      return { tag: t.tag1, desc: t.desc1 };
    } else if (bfpVal < 20) {
      return { tag: t.tag2, desc: t.desc2 };
    } else {
      return { tag: t.tag3, desc: t.desc3 };
    }
  };

  // 点击复制成就事件
  const handleShareCopy = async (bfpVal: number, tag: string, desc: string) => {
    const text = t.copyText(bfpVal, tag, desc);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col items-center justify-center"> {/*[cite: 3] */}
      <div className="w-full max-w-md"> {/*[cite: 3] */}
        {/* 返回按钮[cite: 3] */}
        <Link href={`/${lang}`} className="text-sm text-blue-600 hover:underline mb-6 inline-block"> {/*[cite: 3] */}
          {t.back} {/*[cite: 3] */}
        </Link> {/*[cite: 3] */}

        {/* 表单卡片[cite: 3] */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100"> {/*[cite: 3] */}
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">{t.title}</h1> {/*[cite: 3] */}
          
          <form onSubmit={handleCalculate} className="space-y-4"> {/*[cite: 3] */}
            <div> {/*[cite: 3] */}
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.gender}</label> {/*[cite: 3] */}
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} {/*[cite: 3] */}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50" {/*[cite: 3] */}
              > {/*[cite: 3] */}
                <option value="1">{t.male}</option> {/*[cite: 3] */}
                <option value="0">{t.female}</option> {/*[cite: 3] */}
              </select> {/*[cite: 3] */}
            </div> {/*[cite: 3] */}

            <div> {/*[cite: 3] */}
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.height}</label> {/*[cite: 3] */}
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} {/*[cite: 3] */}
                placeholder="e.g. 175" {/*[cite: 3] */}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50" {/*[cite: 3] */}
                required {/*[cite: 3] */}
              /> {/*[cite: 3] */}
            </div> {/*[cite: 3] */}

            <div> {/*[cite: 3] */}
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.weight}</label> {/*[cite: 3] */}
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} {/*[cite: 3] */}
                placeholder="e.g. 70" {/*[cite: 3] */}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50" {/*[cite: 3] */}
                required {/*[cite: 3] */}
              /> {/*[cite: 3] */}
            </div> {/*[cite: 3] */}

            <div> {/*[cite: 3] */}
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label> {/*[cite: 3] */}
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} {/*[cite: 3] */}
                placeholder="e.g. 25" {/*[cite: 3] */}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50" {/*[cite: 3] */}
                required {/*[cite: 3] */}
              /> {/*[cite: 3] */}
            </div> {/*[cite: 3] */}

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition" {/*[cite: 3] */}
            > {/*[cite: 3] */}
              {t.btn} {/*[cite: 3] */}
            </button> {/*[cite: 3] */}
          </form> {/*[cite: 3] */}

          {/* 计算结果展示（核弹已完美融合渲染） */}
          {result !== null && (
            <div className="mt-6 space-y-4 animate-fade-in">
              {/* 原有基础结果框[cite: 3] */}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
                <p className="text-sm text-gray-600 font-medium">{t.resultTitle}</p> {/*[cite: 3] */}
                <p className="text-3xl font-black text-blue-600 mt-1">{result}%</p> {/*[cite: 3] */}
              </div>

              {/* 💣 炫耀卡片区域：根据数据自适应生成文案 */}
              {(() => {
                const { tag, desc } = getShareContent(result);
                return (
                  <div className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100/60 rounded-xl border border-gray-200/50 text-center relative overflow-hidden">
                    {/* 左上角极简闪电水印 */}
                    <div className="absolute top-2 left-3 text-[9px] font-bold text-gray-400/80 tracking-widest flex items-center gap-0.5">
                      <span>⚡</span>FitKit
                    </div>

                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{t.shareToday}</p>
                    <h4 className="text-xs font-bold text-gray-700 mt-0.5">{t.shareCardTitle}</h4>
                    
                    <div className="text-4xl font-black text-gray-800 font-mono my-2">
                      {result}%
                    </div>
                    
                    <div className="inline-block text-xs text-blue-600 font-semibold px-2.5 py-0.5 bg-blue-100/60 rounded-full mb-1.5">
                      {tag}
                    </div>
                    <p className="text-[11px] text-gray-500 px-2">{desc}</p>
                    
                    <div className="mt-4 pt-2 border-t border-gray-200/80 flex justify-between items-center text-[9px] text-gray-400 font-mono">
                      <span>fitkit.top</span>
                      <span>Health & Fitness</span>
                    </div>

                    {/* 裂变触发核心按钮 */}
                    <button
                      onClick={() => handleShareCopy(result, tag, desc)}
                      className="mt-4 w-full py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                      <span>{copied ? t.shareBtnSuccess : t.shareBtn}</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed"> {/*[cite: 3] */}
            {t.tips} {/*[cite: 3] */}
          </p> {/*[cite: 3] */}
        </div> {/*[cite: 3] */}
      </div> {/*[cite: 3] */}
    </main> {/*[cite: 3] */}
  );
}