'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface HistoryItem {
  date: string;
  value: number;
  type: 'height' | 'angle';
}

interface SplitsClientProps {
  paramsPromise: any;
}

export default function SplitsClient({ paramsPromise }: SplitsClientProps) {
  // 顺应 Next.js 15 规范，使用 use 钩子安全解构
  const unwrappedParams = use<{ lang?: string }>(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  // 状态管理
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [trackType, setTrackType] = useState<'height' | 'angle'>('height');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streak, setStreak] = useState(0);
  const [showEffect, setShowEffect] = useState(false);

  // 解决 Next.js 15 的客户端水合与持久化恢复
  useEffect(() => {
    setMounted(true);
    const savedHistory = localStorage.getItem('splits_history');
    const savedStreak = localStorage.getItem('splits_streak');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs">Loading Tracker...</div>;
  }

  // 提交新纪录逻辑
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;

    const today = new Date().toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });

    const newItem: HistoryItem = {
      date: today,
      value: val,
      type: trackType
    };

    // 限制图表最大承载 7 条记录
    const updatedHistory = [...history, newItem].slice(-7);
    setHistory(updatedHistory);
    localStorage.setItem('splits_history', JSON.stringify(updatedHistory));

    // 连续打卡天数迭代逻辑
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('splits_streak', newStreak.toString());

    setInputValue('');
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 800);
  };

  // 清除历史
  const handleClear = () => {
    if (confirm(isZh ? '确定要重置所有打卡数据吗？' : 'Are you sure to reset all tracking data?')) {
      setHistory([]);
      setStreak(0);
      localStorage.removeItem('splits_history');
      localStorage.removeItem('splits_streak');
    }
  };

  // 动态构建 SVG 数据趋势曲线
  const generateSvgPoints = () => {
    if (history.length === 0) return '';
    if (history.length === 1) return `40,100 460,100`;

    const maxVal = Math.max(...history.map(h => h.value), 10);
    const minVal = Math.min(...history.map(h => h.value), 0);
    const range = maxVal - minVal || 1;

    return history.map((item, idx) => {
      const x = 40 + (idx * (420 / (history.length - 1)));
      const y = 160 - ((item.value - minVal) / range) * 120; // 映射在 40px 到 160px 的纵向安全视口内
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        
        <Link href={`/${lang}`} className="text-xs font-black uppercase text-blue-600 hover:underline mb-6 inline-block tracking-wider">
          {isZh ? '← 返回首页' : '← Back to Home'}
        </Link>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          
          {/* 打卡成功动效层 */}
          {showEffect && (
            <div className="absolute inset-0 bg-blue-600/90 z-50 flex flex-col items-center justify-center text-white animate-fade-in">
              <span className="text-4xl animate-bounce">🔥</span>
              <p className="text-sm font-black uppercase tracking-widest mt-2">
                {isZh ? '记录成功！韧带在变长！' : 'RECORDED! FLEXIBILITY UP!'}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🩰</span>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">
                {isZh ? '一字马/横竖叉打卡' : 'Splits Tracker'}
              </h1>
            </div>
            {/* 连续打卡火苗 */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-black font-mono text-amber-700">{streak} {isZh ? '天' : 'DAYS'}</span>
            </div>
          </div>

          {/* 指标维度切换 */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/50">
              <button
                type="button"
                onClick={() => setTrackType('height')}
                className={`py-2 text-[11px] font-black rounded-lg transition-all ${trackType === 'height' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                📏 {isZh ? '离地高度 (cm)' : 'Gap Height (cm)'}
              </button>
              <button
                type="button"
                onClick={() => setTrackType('angle')}
                className={`py-2 text-[11px] font-black rounded-lg transition-all ${trackType === 'angle' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                📐 {isZh ? '开胯角度 (°)' : 'Splits Angle (°)'}
              </button>
            </div>
          </div>

          {/* 数据录入表单 */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                {trackType === 'height' 
                  ? (isZh ? '当前会阴部离地距离' : 'Current Distance from Floor') 
                  : (isZh ? '双腿两端测量夹角' : 'Measured Angle between Legs')}
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={trackType === 'height' ? 'e.g. 12.5' : 'e.g. 165'}
                  className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none font-mono"
                  required
                />
                <span className="absolute right-4 top-3.5 text-xs font-black text-gray-400 font-mono">
                  {trackType === 'height' ? 'CM' : '°'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-950 text-white p-3 rounded-xl font-black tracking-widest text-xs uppercase shadow-md hover:bg-black transition active:scale-[0.99]"
            >
              🚀 {isZh ? '锁定今日柔韧度进度' : 'Lock Today’s Progress'}
            </button>
          </form>

          {/* 数据趋势图表 (轻量级纯内联原生态 SVG 图表) */}
          <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              📈 {isZh ? '最近 7 次极客进度走势' : 'Recent 7-Session Trend'}
            </h3>
            
            {history.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-[11px] text-gray-400 font-medium italic">
                {isZh ? '暂无数据，赶紧完成第一次柔韧打卡吧！' : 'No entries yet. Start stretching now!'}
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 500 200" className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* 横向网格参考线 */}
                  <line x1="40" y1="40" x2="460" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="100" x2="460" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="160" x2="460" y2="160" stroke="#e2e8f0" strokeWidth="1.5" />

                  {/* 渐变填充与趋势线折线 */}
                  <path d={generateSvgPoints() ? `M ${generateSvgPoints().split(' ')[0]} ${generateSvgPoints()} L ${generateSvgPoints().split(' ').pop()?.split(',')[0]},160 L ${generateSvgPoints().split(' ')[0]?.split(',')[0]},160 Z` : ''} fill="url(#chartGrad)" />
                  <polyline fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={generateSvgPoints()} />

                  {/* 核心数据点 */}
                  {history.map((item, idx) => {
                    const maxVal = Math.max(...history.map(h => h.value), 10);
                    const minVal = Math.min(...history.map(h => h.value), 0);
                    const range = maxVal - minVal || 1;
                    const x = 40 + (idx * (420 / (history.length - 1)));
                    const y = 160 - ((item.value - minVal) / range) * 120;

                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                        <text x={x} y={y - 12} textAnchor="middle" className="text-[10px] font-black font-mono fill-blue-600">
                          {item.value}{item.type === 'height' ? 'cm' : '°'}
                        </text>
                        {/* 底部日期轴 */}
                        <text x={x} y="182" textAnchor="middle" className="text-[9px] font-bold fill-gray-400 font-mono">
                          {item.date}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          {/* 清理数据项 */}
          {history.length > 0 && (
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={handleClear} 
                className="text-[10px] font-bold text-red-400 hover:text-red-600 hover:underline transition"
              >
                🗑️ {isZh ? '清空打卡记录' : 'Clear History Log'}
              </button>
            </div>
          )}
          
        </div>
      </div>
    </main>
  );
}