'use client';
import { useState, use } from 'react';
import Link from 'next/link';

const uiDict = {
  en: { back: "← Back", title: "BMR Calculator", gender: "Gender", male: "Male", female: "Female", height: "Height (cm)", weight: "Weight (kg)", age: "Age", btn: "Calculate BMR", result: "Your Basal Metabolic Rate (BMR):", unit: "kcal/day" },
  zh: { back: "← 返回", title: "BMR 基础代谢率计算", gender: "性别", male: "男", female: "女", height: "身高 (厘米)", weight: "体重 (公斤)", age: "年龄", btn: "计算基础代谢", result: "您的基础代谢率 (BMR) 为：", unit: "大卡/天" }
};

export default function BmrPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  const { lang } = use(params);
  const t = uiDict[lang] || uiDict.en;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('1'); // 1=男, 0=女
  const [result, setResult] = useState<number | null>(null);

  const calculateBMR = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (h && w && a) {
      // Mifflin-St Jeor 公式
      let bmr = 10 * w + 6.25 * h - 5 * a;
      bmr = parseInt(gender) === 1 ? bmr + 5 : bmr - 161;
      setResult(Math.round(bmr));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-900">
      <div className="w-full max-w-md">
        <Link href={`/${lang}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">{t.back}</Link>
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h1 className="text-xl font-bold text-center mb-6">{t.title}</h1>
          <form onSubmit={calculateBMR} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.gender}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50">
                <option value="1">{t.male}</option>
                <option value="0">{t.female}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t.height}</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.weight}</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.age}</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700">{t.btn}</button>
          </form>
          {result !== null && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
              <p className="text-sm text-gray-600">{t.result}</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{result} {t.unit}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}