'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface HistoryItem {
  date: string;        // 专门给图表底部显示的本地化标签（支持同天多打卡区分）
  value: number;
  type: 'height' | 'angle';
  rawDateStr: string;  // 绝对去重骨架，用于死死卡住“一天只加一次天数”，形如 "2026-06-20"
}

interface SplitsClientProps {
  paramsPromise: Promise<{ lang?: string }>;
}

export default function SplitsClient({ paramsPromise }: SplitsClientProps) {
  const unwrappedParams = use(paramsPromise);
  const lang = unwrappedParams?.lang === 'zh' ? 'zh' : 'en';
  const isZh = lang === 'zh';

  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [trackType, setTrackType] = useState<'height' | 'angle'>('height');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [streak, setStreak] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const [copied, setCopied] = useState(false);

  // 科学去重判定绝对连续自然天数算法
  const calculateRealStreak = (historyList: HistoryItem[]): number => {
    if (!historyList || historyList.length === 0) return 0;
    
    // 提取所有不重复的绝对日期并排序
    const uniqueDates = Array.from(new Set(historyList.map(item => item.rawDateStr))).sort();
    
    let currentStreak = 0;
    const now = new Date();
    
    // 标准格式化：YYYY-MM-DD
    const todayStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    
    const hasToday = uniqueDates.includes(todayStr);
    const hasYesterday = uniqueDates.includes(yesterdayStr);
    
    // 如果今天和昨天连续两天都没记录，则说明连击中断
    if (!hasToday && !hasYesterday) return 0;

    let checkDate = hasToday ? now : yesterday;
    
    while (true) {
      const checkStr = checkDate.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
      if (uniqueDates.includes(checkStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1); // 逆向向前追溯
      } else {
        break;
      }
    }
    
    return currentStreak;
  };

  useEffect(() => {
    setMounted(true);
    const savedHistory = localStorage.getItem('splits_history');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistory(parsedHistory);
      setStreak(calculateRealStreak(parsedHistory));
    }
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 font-mono text-xs">Loading Tracker...</div>;
  }

  // 筛选出当前激活类型的最近 7 条记录
  const activeHistory = history.filter(item => item.type === trackType).slice(-7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;

    const now = new Date();
    // 纯日期去重骨架
    const rawDateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

    // 核心改进：计算当前类型在今天已经打卡了第几次
    const todaysExistingCount = history.filter(item => item.rawDateStr === rawDateStr && item.type === trackType).length;
    
    const baseDateStr = now.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
      month: isZh ? 'numeric' : 'short',
      day: 'numeric'
    }) + (isZh ? '日' : '');

    // 如果当天有多次打卡，后缀补上精确数字标记，防止走势图底端标签全部撞名
    const displayDate = todaysExistingCount > 0 
      ? `${baseDateStr} #${todaysExistingCount + 1}`
      : baseDateStr;

    const newItem: HistoryItem = { date: displayDate, value: val, type: trackType, rawDateStr };
    const updatedHistory = [...history, newItem].slice(-50); 
    
    setHistory(updatedHistory);
    localStorage.setItem('splits_history', JSON.stringify(updatedHistory));

    // 重新校准连击天数
    setStreak(calculateRealStreak(updatedHistory));

    setInputValue('');
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 800);
  };

  const handleClear = () => {
    if (confirm(isZh ? '确定要重置所有打卡数据吗？' : 'Are you sure to reset all tracking data?')) {
      setHistory([]);
      setStreak(0);
      localStorage.removeItem('splits_history');
    }
  };

  const handleCopyShare = async () => {
    if (activeHistory.length === 0) return;
    const latest = activeHistory[activeHistory.length - 1];
    const unit = latest.type === 'height' ? 'cm' : '°';
    
    const typeLabel = isZh
      ? (latest.type === 'height' ? '一字马离地差距' : '横竖叉开胯角度')
      : (latest.type === 'height' ? 'Floor Gap' : 'Splits Angle');
    
    const text = isZh
      ? `🤸‍♂️ 我今天在 FitKit 锁定了最新一轮的柔韧性极客进度！\n🔥 连续打卡：[ ${streak} 天 ]\n📈 柔韧突破：${typeLabel} 成功刷新至 ${latest.value} ${unit}！\n💪 状态：[ 韧带在变长 ]。快来冲击你的一字马：https://fitkit.top`
      : `🤸‍♂️ Just logged my flexibility milestones on FitKit!\n🔥 Consistency: [ ${streak}-Day Streak ]\n📈 Latest Breakthrough: ${typeLabel} reached ${latest.value}${unit}!\n💪 Status: [ Ligaments Stretching ]. Track for free: https://fitkit.top`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const generateSvgPoints = () => {
    if (!activeHistory || activeHistory.length === 0) return '';
    const maxVal = Math.max(...activeHistory.map(h => h.value), 10);
    const minVal = Math.min(...activeHistory.map(h => h.value), 0);
    const range = maxVal - minVal || 1;

    return activeHistory.map((item, idx) => {
      const divisor = activeHistory.length - 1 || 1;
      const x = activeHistory.length === 1 ? 250 : 40 + (idx * (420 / divisor));
      const y = 160 - ((item.value - minVal) / range) * 120;
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
          {showEffect && (
            <div className="absolute inset-0 bg-blue-600/90 z-50 flex flex-col items-center justify-center text-white animate-fade-in">
              <span className="text-4xl animate-bounce">🔥</span>
              <p className="text-sm font-black uppercase tracking-widest mt-2">{isZh ? '记录成功！韧带在变长！' : 'RECORDED!'}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🩰</span>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">{isZh ? '一字马/横竖叉打卡' : 'Splits Tracker'}</h1>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-black font-mono text-amber-700">{streak} {isZh ? '天' : 'DAYS'}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/50">
              <button type="button" onClick={() => setTrackType('height')} className={`py-2 text-[11px] font-black rounded-lg transition-all ${trackType === 'height' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>📏 {isZh ? '离地高度 (cm)' : 'Gap Height (cm)'}</button>
              <button type="button" onClick={() => setTrackType('angle')} className={`py-2 text-[11px] font-black rounded-lg transition-all ${trackType === 'angle' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>📐 {isZh ? '开胯角度 (°)' : 'Splits Angle (°)'}</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                {trackType === 'height' ? (isZh ? '当前会阴部离地距离' : 'Distance from Floor') : (isZh ? '双腿两端测量夹角' : 'Angle between Legs')}
              </label>
              <div className="relative">
                <input type="number" step="0.1" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={trackType === 'height' ? 'e.g. 12.5' : 'e.g. 165'} className="w-full p-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none font-mono" required />
                <span className="absolute right-4 top-3.5 text-xs font-black text-gray-400 font-mono">{trackType === 'height' ? 'CM' : '°'}</span>
              </div>
            </div>
            <button type="submit" className="w-full bg-gray-950 text-white p-3 rounded-xl font-black tracking-widest text-xs uppercase shadow-md hover:bg-black transition">
              🚀 {isZh ? '锁定今日柔韧度进度' : 'Lock Today’s Progress'}
            </button>
          </form>

          <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 mb-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">📈 {isZh ? '最近 7 次极客进度走势' : 'Recent Trend'}</h3>
            {activeHistory.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-[11px] text-gray-400 font-medium italic">
                {isZh ? `暂无该项目的打卡数据` : `No records for ${trackType === 'height' ? 'Gap Height' : 'Splits Angle'} yet.`}
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 500 200" className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={trackType === 'height' ? '#3b82f6' : '#a855f7'} stopOpacity="0.15" />
                      <stop offset="100%" stopColor={trackType === 'height' ? '#3b82f6' : '#a855f7'} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="40" x2="460" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="100" x2="460" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="160" x2="460" y2="160" stroke="#e2e8f0" strokeWidth="1.5" />

                  {activeHistory.length > 1 && generateSvgPoints() && (
                    <>
                      <path d={`M ${generateSvgPoints().split(' ')[0]} ${generateSvgPoints()} L ${generateSvgPoints().split(' ').pop()?.split(',')[0]},160 L ${generateSvgPoints().split(' ')[0]?.split(',')[0]},160 Z`} fill="url(#chartGrad)" />
                      <polyline fill="none" stroke={trackType === 'height' ? '#2563eb' : '#9333ea'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={generateSvgPoints()} />
                    </>
                  )}

                  {activeHistory.map((item, idx) => {
                    const maxVal = Math.max(...activeHistory.map(h => h.value), 10);
                    const minVal = Math.min(...activeHistory.map(h => h.value), 0);
                    const range = maxVal - minVal || 1;
                    const divisor = activeHistory.length - 1 || 1;
                    const x = activeHistory.length === 1 ? 250 : 40 + (idx * (420 / divisor));
                    const y = 160 - ((item.value - minVal) / range) * 120;

                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="5" fill="#ffffff" stroke={trackType === 'height' ? '#2563eb' : '#9333ea'} strokeWidth="2.5" />
                        <text x={x} y={y - 12} textAnchor="middle" className={`text-[10px] font-black font-mono ${trackType === 'height' ? 'fill-blue-600' : 'fill-purple-600'}`}>{item.value}{item.type === 'height' ? 'cm' : '°'}</text>
                        <text x={x} y="182" textAnchor="middle" className="text-[9px] font-bold fill-gray-400 font-mono">{item.date}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          {activeHistory.length > 0 && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCopyShare}
                className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition border ${
                  copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {copied ? (isZh ? '✅ 复制打卡纯文本成功！' : '✅ Copied milestone!') : (isZh ? '📋 一键复制今日打卡炫耀快照' : '📋 Copy stretching milestone')}
              </button>

              <div className="text-center">
                <button type="button" onClick={handleClear} className="text-[10px] font-bold text-red-400 hover:text-red-600 hover:underline transition">
                  🗑️ {isZh ? '清空打卡记录' : 'Clear History Log'}
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </main>
  );
}