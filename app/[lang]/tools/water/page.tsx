'use client';
import { useState, use } from 'react';
import Link from 'next/link';

const uiDict = {
  en: { back: "← Back", title: "Daily Water Intake Calculator", weight: "Your Weight (kg)", exercise: "Daily Exercise Time", min30: "30 mins or less", plus30: "More than 30 mins", btn: "Calculate Water", result: "Recommended Daily Water Intake:", unit: "ml / day" },
  zh: { back: "← 返回", title: "每日饮水量动态计算", weight: "您的体重 (公斤)", exercise: "每日运动时间", min30: "30分钟及以下", plus30: "30分钟以上", btn: "计算饮水量", result: "建议每日饮水量为：", unit: "毫升 / 天" }
};

export default function WaterPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  const { lang } = use(params);
  const t = uiDict[lang] || uiDict.en;

  const [weight, setWeight] = useState('');
  const [exercise, setExercise] = useState('0'); // 0=少, 1=多
  const [result, setResult] = useState<number | null>(null);

  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);

    if (w) {
      // 基础饮水：体重 * 35ml。若高强度运动，额外加 500ml
      let water = w * 35;
      if (exercise === '1') water += 500;
      setResult(Math.round(water));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-900">
      <div className="w-full max-w-md">
        <Link href={`/${lang}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">{t.back}</Link>
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h1 className="text-xl font-bold text-center mb-6">{t.title}</h1>
          <form onSubmit={calculateWater} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.weight}</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 65" className="w-full p-2.5 border rounded-xl bg-gray-50" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.exercise}</label>
              <select value={exercise} onChange={(e) => setExercise(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50">
                <option value="0">{t.min30}</option>
                <option value="1">{t.plus30}</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700">{t.btn}</button>
          </form>
          {/* ✨ 已经完美修正：只判断单数真实存在的 result 状态 */}
          {result !== null && (
            <div className="mt-6 p-4 bg-sky-50 border border-sky-100 rounded-xl text-center">
              <p className="text-sm text-gray-600">{t.result}</p>
              <p className="text-2xl font-black text-sky-600 mt-1">{result} {t.unit} <span className="text-sm font-normal text-gray-400">({(result/1000).toFixed(1)} L)</span></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}