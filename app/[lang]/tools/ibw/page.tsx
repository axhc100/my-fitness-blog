'use client';
import { useState, use } from 'react';
import Link from 'next/link';

const uiDict = {
  en: { back: "← Back", title: "Ideal Body Weight Calculator", gender: "Gender", male: "Male", female: "Female", height: "Height (cm)", btn: "Calculate Ideal Weight", result: "Your Estimated Ideal Weight Range:", unit: "kg" },
  zh: { back: "← 返回", title: "标准理想体重计算器", gender: "性别", male: "男", female: "女", height: "身高 (厘米)", btn: "计算标准体重", result: "您的理想体重范围预估为：", unit: "公斤" }
};

export default function IbwPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  const { lang } = use(params);
  const t = uiDict[lang] || uiDict.en;

  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('1'); 
  const [result, setResult] = useState<string | null>(null);

  const calculateIBW = (e: React.FormEvent) => {
    e.preventDefault();
    const hCm = parseFloat(height);
    if (hCm && hCm > 152.4) {
      const inchesOver5Foot = (hCm - 152.4) / 2.54;
      let ibw = parseInt(gender) === 1 ? 50.0 + 2.3 * inchesOver5Foot : 45.5 + 2.3 * inchesOver5Foot;
      
      const minWeight = (ibw * 0.9).toFixed(1);
      const maxWeight = (ibw * 1.1).toFixed(1);
      setResult(`${minWeight} - ${maxWeight}`);
    } else if (hCm) {
      setResult(parseInt(gender) === 1 ? "45 - 52" : "40 - 47");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-900">
      <div className="w-full max-w-md">
        <Link href={`/${lang}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">{t.back}</Link>
        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h1 className="text-xl font-bold text-center mb-6">{t.title}</h1>
          <form onSubmit={calculateIBW} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.gender}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2.5 border rounded-xl bg-gray-50">
                <option value="1">{t.male}</option>
                <option value="0">{t.female}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.height}</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170" className="w-full p-2.5 border rounded-xl bg-gray-50" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700">{t.btn}</button>
          </form>
          {result !== null && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-center">
              <p className="text-sm text-gray-600">{t.result}</p>
              <p className="text-2xl font-black text-amber-600 mt-1">{result} {t.unit}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}