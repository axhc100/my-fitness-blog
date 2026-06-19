'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface HistoryItem {
  date: string;
  value: number;
  type: 'height' | 'angle';
}

export default function SplitsTrackerPage() {
  const { lang } = useParams() as { lang: 'en' | 'zh' };
  const isZh = lang === 'zh';

  // 状态管理
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [trackType, setTrackType] = useState<'height' | 'angle'>('height');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streak, setStreak] = useState(0);
  const [showEffect, setShowEffect] = useState(false);

  // 解决 Next.js 15 的客户端水合问题
  useEffect(() => {
    setMounted(true);
    const savedHistory = localStorage.getItem('splits_history');
    const savedStreak = localStorage.getItem('splits_streak');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
  }, []);

  if (!mounted) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono">Loading Tracker...</div>;

  // 处理打卡提交
  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;

    const todayStr = new Date().toLocaleDateString(isZh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' });
    
    // 更新历史记录（如果今天存在则覆盖，否则追加）
    let newHistory = [...history];
    const existingIndex = newHistory.findIndex(item => item.date === todayStr);
    if (existingIndex > -1) {
      newHistory[existingIndex] = { date: todayStr, value: val, type: trackType };
    } else {
      newHistory.push({ date: todayStr, value: val, type: trackType });
    }
    // 仅保留最近 7 次记录用于图表展示
    if (newHistory.length > 7) newHistory.shift();

    // 更新连击打卡天数
    const newStreak = existingIndex > -1 ? streak : streak + 1;

    setHistory(newHistory);
    setStreak(newStreak);
    localStorage.setItem('splits_history', JSON.stringify(newHistory));
    localStorage.setItem('splits_streak', newStreak.toString());
    
    // 激活成功小动效
    setInputValue('');
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 2000);
  };

  // 清空本地数据
  const handleClear = () => {
    if (confirm(isZh ? '确定要清空所有打卡记录吗？' : 'Are you sure you want to clear all data?')) {
      localStorage.removeItem('splits_history');
      localStorage.removeItem('splits_streak');
      setHistory([]);
      setStreak(0);
    }
  };

  // 🧮 动态计算原生 SVG 折线图的坐标点
  const generateSvgPoints = () => {
    if (history.length < 2) return '';
    const maxVal = Math.max(...history.map(h => h.value), 10);
    const minVal = Math.min(...history.map(h => h.value), 0);
    const range = maxVal - minVal || 1;

    return history.map((item, index) => {
      const x = 40 + (index * (420 / (history.length - 1)));
      const y = 160 - ((item.value - minVal) / range) * 120;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 飘落的打卡小特效 */}
      {showEffect && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 animate-ping text-6xl">
          🤸‍♂️🎉✨🌟🔥
        </div>
      )}

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <Link href={`/${lang}`} className="text-sm font-semibold text-blue-600 hover:underline mb-6 inline-block">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🤸‍♂️</span>
          <h1 className="text-2xl font-black tracking-tight">{isZh ? '一字马进度打卡' : 'Splits Progress Tracker'}</h1>
        </div>
        <p className="text-gray-400 text-xs mb-8 leading-relaxed">
          {isZh ? '柔韧性不是一天练成的。记录你的每一次下叉距离，看着折线不断进步吧！' : 'Flexibility takes consistency. Lock in your daily range and crush your split goals.'}
        </p>

        {/* 连续打卡成就栏 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 flex justify-between items-center border border-blue-100/50">
          <div>
            <p className="text-xs text-blue-500 font-bold tracking-wider uppercase">{isZh ? '坚韧不拔' : 'Consistency Streak'}</p>
            <h3 className="text-lg font-bold text-slate-800 mt-0.5">{isZh ? '拉伸蜕变之旅' : 'Stretching Journey'}</h3>
          </div>
          <div className="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-100">
            <span className="block text-xl font-black text-blue-600 font-mono">{streak}</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{isZh ? '天打卡' : 'Days'}</span>
          </div>
        </div>

        {/* 表单输入区 */}
        <form onSubmit={handleCheckIn} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{isZh ? '记录维度' : 'Tracking Metric'}</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-xl border">
              <button 
                type="button" 
                onClick={() => setTrackType('height')}
                className={`py-2 text-xs font-bold rounded-lg transition ${trackType === 'height' ? 'bg-white text-gray-900 shadow' : 'text-gray-400 hover:text-gray-600'}`}
              >
                📏 {isZh ? '会阴离地高度 (cm)' : 'Distance to Floor (cm)'}
              </button>
              <button 
                type="button" 
                onClick={() => setTrackType('angle')}
                className={`py-2 text-xs font-bold rounded-lg transition ${trackType === 'angle' ? 'bg-white text-gray-900 shadow' : 'text-gray-400 hover:text-gray-600'}`}
              >
                📐 {isZh ? '双腿叉开角度 (°)' : 'Legs Angle (°)'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{isZh ? '今日实测数值' : 'Today\'s Metric Value'}</label>
            <div className="relative rounded-2xl shadow-sm">
              <input
                type="number"
                step="0.1"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={trackType === 'height' ? 'e.g. 12.5' : 'e.g. 145'}
                className="w-full pl-5 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-gray-900 outline-none"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold text-gray-400">
                {trackType === 'height' ? 'cm' : '°'}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md transition transform active:scale-[0.99]">
            🎯 {isZh ? '记录今日数据并打卡' : 'Log Entry & Check In'}
          </button>
        </form>

        {/* 📈 核心区：纯原生响应式 SVG 趋势图表 */}
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800">{isZh ? '最近 7 次柔韧性趋势' : 'Recent 7 Entries Trend'}</h3>
            {history.length > 0 && (
              <button onClick={handleClear} className="text-xs font-semibold text-red-500 hover:underline">
                {isZh ? '清除记录' : 'Clear Data'}
              </button>
            )}
          </div>

          {history.length < 2 ? (
            <div className="bg-gray-50 border border-dashed rounded-2xl h-40 flex items-center justify-center text-xs text-gray-400 text-center p-4">
              {isZh ? '💡 至少打卡 2 天以上，系统会自动生成绝美的发展进度曲线图。' : '💡 Log your data for at least 2 days to unlock your flexibility trend chart.'}
            </div>
          ) : (
            <div className="bg-slate-900 rounded-2xl p-2 shadow-inner border border-slate-800">
              <svg viewBox="0 0 500 190" className="w-full overflow-visible">
                {/* 渐变滤镜 */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {/* SVG 趋势网格与线网 */}
                <path d={generateSvgPoints() ? `M ${generateSvgPoints().split(' ')[0]} ${generateSvgPoints()} L ${generateSvgPoints().split(' ').pop()?.split(',')[0]},160 L ${generateSvgPoints().split(' ')[0]?.split(',')[0]},160 Z` : ''} fill="url(#chartGrad)" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={generateSvgPoints()} />

                {/* 数据锚点与数值标注 */}
                {history.map((item, idx) => {
                  const maxVal = Math.max(...history.map(h => h.value), 10);
                  const minVal = Math.min(...history.map(h => h.value), 0);
                  const range = maxVal - minVal || 1;
                  const x = 40 + (idx * (420 / (history.length - 1)));
                  const y = 160 - ((item.value - minVal) / range) * 120;

                  return (
                    <g key={idx} className="group cursor-pointer">
                      <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                      <text x={x} y={y - 12} textAnchor="middle" className="text-[10px] font-mono fill-blue-400 font-bold">{item.value}{item.type === 'height' ? 'cm' : '°'}</text>
                      <text x={x} y="180" textAnchor="middle" className="text-[9px] font-medium fill-slate-500">{item.date}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}