'use client';

import { useState, use } from 'react';
import Link from 'next/link';

// 多语言文案字典
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
  }
};

export default function BfpPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  // 解构多语言参数
  const { lang } = use(params);
  const t = uiDict[lang] || uiDict.en;

  // 表单状态
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('1'); // 1 = 男, 0 = 女
  const [result, setResult] = useState<number | null>(null);

  // 计算逻辑
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const hMeter = parseFloat(height) / 100;
    const wKg = parseFloat(weight);
    const ageNum = parseInt(age);

    if (hMeter && wKg && ageNum) {
      const bmi = wKg / (hMeter * hMeter);
      // 成年人体脂率公式：1.20 × BMI + 0.23 × 年龄 - 10.8 × 性别(男1女0) - 5.4
      const bfp = 1.20 * bmi + 0.23 * ageNum - 10.8 * parseInt(gender) - 5.4;
      setResult(parseFloat(bfp.toFixed(1)));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {/* 返回按钮 */}
        <Link href={`/${lang}`} className="text-sm text-blue-600 hover:underline mb-6 inline-block">
          {t.back}
        </Link>

        {/* 表单卡片 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">{t.title}</h1>
          
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.gender}</label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
              >
                <option value="1">{t.male}</option>
                <option value="0">{t.female}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.height}</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                placeholder="e.g. 175"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.weight}</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="e.g. 70"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                placeholder="e.g. 25"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
            >
              {t.btn}
            </button>
          </form>

          {/* 计算结果展示 */}
          {result !== null && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-center animate-fade-in">
              <p className="text-sm text-gray-600 font-medium">{t.resultTitle}</p>
              <p className="text-3xl font-black text-blue-600 mt-1">{result}%</p>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
            {t.tips}
          </p>
        </div>
      </div>
    </main>
  );
}