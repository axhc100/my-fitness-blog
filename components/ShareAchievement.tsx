'use client';

import React, { useRef, useState } from 'react';

interface ShareAchievementProps {
  title: string;
  achievementValue: string;
  unit: string;
  tips: string;
  lang: 'zh' | 'en';
}

export default function ShareAchievement({
  title,
  achievementValue,
  unit,
  tips,
  lang
}: ShareAchievementProps) {
  const isZh = lang === 'zh';
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // 原生现代浏览器 Clipboard API 文本流分享复制
  const handleCopyText = async () => {
    const text = isZh 
      ? `【我的健身卡片】我在 ${title} 测试中取得了 ${achievementValue}${unit} 的好成绩！\n基准评估：${tips}\n快来一起测试吧！`
      : `[My Fitness Card] I achieved ${achievementValue}${unit} in "${title}" assessment!\nStatus: ${tips}\nJoin me now!`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <div className="text-center mb-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          {isZh ? '✨ 炫耀一下你的成果' : '✨ Share Your Achievement'}
        </h4>
      </div>

      {/* 实体预览卡片 */}
      <div 
        ref={shareRef}
        className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-950 p-6 rounded-2xl text-white shadow-xl border border-gray-800 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 text-7xl select-none pointer-events-none">
          🏋️‍♂️
        </div>
        
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">
          {title}
        </p>
        
        <p className="text-4xl font-black font-mono my-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
          {achievementValue} <span className="text-sm font-bold text-gray-400">{unit}</span>
        </p>

        <p className="text-[11px] text-gray-400 max-w-xs mx-auto leading-relaxed border-t border-gray-800/60 pt-2.5 mt-2">
          {tips}
        </p>

        <div className="mt-4 pt-1 flex items-center justify-center gap-1.5 opacity-40 select-none">
          <span className="text-xs">⚡</span>
          <span className="text-[9px] tracking-tight font-mono font-bold uppercase">
            {isZh ? '来自  FitKit' : 'POWERED BY FITNESS BOX'}
          </span>
        </div>
      </div>

      {/* 控制台交互动作按钮组 */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleCopyText}
          className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition border ${
            copied 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 active:scale-[0.99]'
          }`}
        >
          {copied 
            ? (isZh ? '✅ 复制成功！快去粘贴分享吧' : '✅ copied to clipboard!') 
            : (isZh ? '📋 复制成就纯文本卡片' : '📋 copy text snapshot')}
        </button>
      </div>
    </div>
  );
}