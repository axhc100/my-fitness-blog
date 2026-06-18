'use client';
import { useState, use } from 'react';
import Link from 'next/link';

const uiDict = {
  en: { back: "← Back", title: "Fat Burning Heart Rate Calculator", age: "Your Age", btn: "Calculate Heart Rate", maxHr: "Estimated Max Heart Rate:", zone: "Fat Burning Zone (60% - 70%):", unit: "bpm" },
  zh: { back: "← 返回", title: "减脂黄金心率区间计算", age: "您的年龄", btn: "计算心率区间", maxHr: "预估最大心率：", zone: "黄金减脂心率区间 (60% - 70%)：", unit: "次/分" }
};

export default function HrPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  const { lang } = use(params);
  const t = uiDict[lang] || uiDict.en;

  const [age, setAge] = useState('');
  const [results, setResults] = useState<{ max: number; low: number; high: number } | null>(null);

  const calculateHR = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    if (ageNum) {
      const max = 220 - ageNum; // 基础最大心率公式
      const low = Math.round(max * 0.6);
      const high = Math.round(max * 0.7);
      setResults({ max, low, high });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-900">
      <div className="w-full max-w-md">
        <Link href={`/${lang}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">{t.back}</Link>
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h1 className="text-xl font-bold text-center mb-6">{t.title}</h1>
          <form onSubmit={calculateHR} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.age}</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 28" className="w-full p-2.5 border rounded-xl bg-gray-50" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700">{t.btn}</button>
          </form>
          {results !== null && (
            <div className="mt-6 space-y-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-center">
              <div>
                <p className="text-xs text-gray-500">{t.maxHr}</p>
                <p className="text-lg font-bold text-gray-700">{results.max} {t.unit}</p>
              </div>
              <div className="border-t border-rose-200/50 my-2"></div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">{t.zone}</p>
                <p className="text-3xl font-black text-rose-600 mt-0.5">{results.low} - {results.high} <span className="text-sm font-normal">{t.unit}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}