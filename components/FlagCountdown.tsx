'use client';

import React, { useState, useEffect } from 'react';

interface FlagCountdownProps {
  lang: 'en' | 'zh';
}

export default function FlagCountdown({ lang }: FlagCountdownProps) {
  const isZh = lang === 'zh';
  
  const [goal, setGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  // 1. 初始化读取
  useEffect(() => {
    const savedGoal = localStorage.getItem('user_fitness_goal');
    const savedDate = localStorage.getItem('user_fitness_target_date');
    if (savedGoal && savedDate) {
      setGoal(savedGoal);
      setTargetDate(savedDate);
      setIsSaved(true);
    }
  }, []);

  // 2. 核心倒计时：增强了对各种日期格式的解析和对齐能力
  useEffect(() => {
    if (!isSaved || !targetDate) return;

    const calculateTime = () => {
      // ⚡ 增强兼容性解析：如果是 YYYY-MM-DD，强制补齐时间，防止时区导致提早一天过期
      let targetTimeParsed = Date.parse(targetDate);
      
      if (targetDate.includes('-') && !targetDate.includes('T')) {
        targetTimeParsed = +new Date(`${targetDate}T23:59:59`);
      } else {
        targetTimeParsed = +new Date(targetDate);
      }

      const difference = targetTimeParsed - +new Date();
      
      if (isNaN(difference) || difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [isSaved, targetDate]);

  // 3. 保存 Flag：确保存进去的是标准的 YYYY-MM-DD
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || !targetDate) return;
    
    localStorage.setItem('user_fitness_goal', goal);
    localStorage.setItem('user_fitness_target_date', targetDate);
    setIsSaved(true);
  };

  const handleClear = () => {
    if (confirm(isZh ? '确定要撤回这个 Flag 吗？' : 'Are you sure you want to reset your flag?')) {
      localStorage.removeItem('user_fitness_goal');
      localStorage.removeItem('user_fitness_target_date');
      setGoal('');
      setTargetDate('');
      setIsSaved(false);
    }
  };

  if (isSaved) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900 to-blue-950 text-white rounded-2xl border border-gray-800 shadow-md relative flex flex-col justify-between min-h-[220px]">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/60 px-2 py-1 rounded-md border border-blue-900/50">
              🔥 CURRENT FLAG
            </span>
            <button onClick={handleClear} className="text-xs text-gray-500 hover:text-red-400 transition">
              {isZh ? '撤回' : 'Reset'}
            </button>
          </div>
          <h3 className="text-base font-black text-white line-clamp-2 pr-4 mb-4">
            「 {goal} 」
          </h3>
        </div>

        {timeLeft.expired ? (
          <div className="text-center py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 font-bold text-xs">
            🎉 {isZh ? '目标时间到！你实现了吗？' : 'Time reached! Did you make it?'}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: timeLeft.days, label: isZh ? '天' : 'D' },
              { num: timeLeft.hours, label: isZh ? '时' : 'H' },
              { num: timeLeft.minutes, label: isZh ? '分' : 'M' },
              { num: timeLeft.seconds, label: isZh ? '秒' : 'S' }
            ].map((item, idx) => (
              <div key={idx} className="bg-black/30 backdrop-blur-sm p-2 rounded-xl border border-white/5">
                <div className="text-xl font-mono font-black text-blue-400 tabular-nums">{String(item.num).padStart(2, '0')}</div>
                <div className="text-[10px] text-gray-400 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col justify-between min-h-[220px]">
      <div>
        <span className="text-2xl mb-2 block">🎯</span>
        <h3 className="text-base font-bold text-gray-900 mb-1">{isZh ? '立个 Flag 倒计时' : 'Set a Goal Flag'}</h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">{isZh ? '给自己设一个终极目标日期。' : 'Set an ultimate target date.'}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-2">
        <input
          type="text"
          required
          placeholder={isZh ? "例：解锁一字马 / 减到60kg" : "e.g., Full splits / 150 lbs"}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
        />
        <div className="flex gap-2">
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 text-gray-600 font-mono"
          />
          <button
            type="submit"
            className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition shadow-sm"
          >
            {isZh ? '立下' : 'Set'}
          </button>
        </div>
      </form>
    </div>
  );
}