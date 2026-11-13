'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FlagCountdownProps {
  lang: 'en' | 'zh';
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTHS_SHORT_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEKDAYS_ZH = ['日', '一', '二', '三', '四', '五', '六'];

function formatDateToLocale(dateStr: string, isZh: boolean): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isZh) {
    return `${year}年${month}月${day}日`;
  }
  return `${MONTHS_SHORT_EN[month - 1] || month} ${day}, ${year}`;
}

function getTodayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function FlagCountdown({ lang }: FlagCountdownProps) {
  const isZh = lang === 'zh';
  
  const [goal, setGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  // Custom calendar state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const todayStr = getTodayString();
  const initialDate = targetDate || todayStr;
  const [viewYear, setViewYear] = useState(() => parseInt(initialDate.split('-')[0], 10) || 2026);
  const [viewMonth, setViewMonth] = useState(() => (parseInt(initialDate.split('-')[1], 10) || 1) - 1);

  // 1. 初始化读取 LocalStorage
  useEffect(() => {
    const savedGoal = localStorage.getItem('user_fitness_goal');
    const savedDate = localStorage.getItem('user_fitness_target_date');
    if (savedGoal && savedDate) {
      setGoal(savedGoal);
      setTargetDate(savedDate);
      setIsSaved(true);
    }
  }, []);

  // 2. 点击外部自动收起日历
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  // 3. 倒计时定时器
  useEffect(() => {
    if (!isSaved || !targetDate) return;

    const calculateTime = () => {
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

  // 4. 保存 Flag
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !targetDate) {
      setIsCalendarOpen(true);
      return;
    }
    
    localStorage.setItem('user_fitness_goal', goal.trim());
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

  // 日历计算逻辑
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const selectDate = (day: number) => {
    const formatted = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setTargetDate(formatted);
    setIsCalendarOpen(false);
  };

  const setRelativeDays = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const formatted = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setTargetDate(formatted);
    setViewYear(y);
    setViewMonth(m - 1);
    setIsCalendarOpen(false);
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
          <h3 className="text-base font-black text-white line-clamp-2 pr-4 mb-1">
            「 {goal} 」
          </h3>
          <p className="text-xs text-blue-300 font-mono">
            🎯 {formatDateToLocale(targetDate, isZh)}
          </p>
        </div>

        {timeLeft.expired ? (
          <div className="text-center py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 font-bold text-xs">
            🎉 {isZh ? '目标时间到！你实现了吗？' : 'Time reached! Did you make it?'}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center mt-3">
            {[
              { num: timeLeft.days, label: isZh ? '天' : 'Days' },
              { num: timeLeft.hours, label: isZh ? '时' : 'Hours' },
              { num: timeLeft.minutes, label: isZh ? '分' : 'Mins' },
              { num: timeLeft.seconds, label: isZh ? '秒' : 'Secs' }
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
        <h3 className="text-base font-bold text-gray-900 mb-1">
          {isZh ? '立个 Flag 倒计时' : 'Set a Goal Flag'}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          {isZh ? '给自己设一个终极目标日期。' : 'Set an ultimate target date.'}
        </p>
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

        <div className="relative" ref={calendarRef}>
          <div className="flex gap-2">
            {/* 自定义跟随当前语言的日期选择器触发按钮，完全脱离浏览器原生 shadow-DOM spinbutton */}
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className={`flex-1 px-3 py-2 text-xs border rounded-xl flex items-center justify-between text-left transition select-none ${
                targetDate
                  ? 'border-blue-300 bg-blue-50/40 text-blue-900 font-semibold'
                  : 'border-gray-200 bg-gray-50/50 text-gray-500 hover:bg-gray-100/70'
              }`}
            >
              <span className="truncate">
                {targetDate ? formatDateToLocale(targetDate, isZh) : (isZh ? '选择目标日期' : 'Target Date (MM/DD/YYYY)')}
              </span>
              <span className="text-xs text-gray-400 ml-1 shrink-0">📅</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition shadow-sm shrink-0"
            >
              {isZh ? '立下' : 'Set'}
            </button>
          </div>

          {/* 浮动式纯 React DOM 日历面板：中英文即切即换，在 360px 下完美适配 */}
          {isCalendarOpen && (
            <div className="absolute left-0 right-0 bottom-full mb-2 bg-white rounded-2xl border border-gray-200 shadow-2xl p-3.5 z-40 animate-fadeIn">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 text-sm font-bold w-7 h-7 flex items-center justify-center transition"
                >
                  ‹
                </button>
                <div className="text-xs font-bold text-gray-900">
                  {isZh ? `${viewYear}年 ${viewMonth + 1}月` : `${MONTHS_EN[viewMonth]} ${viewYear}`}
                </div>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 text-sm font-bold w-7 h-7 flex items-center justify-center transition"
                >
                  ›
                </button>
              </div>

              {/* 星期表头 */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-400 mb-1">
                {(isZh ? WEEKDAYS_ZH : WEEKDAYS_EN).map((w, idx) => (
                  <div key={idx} className="py-0.5">{w}</div>
                ))}
              </div>

              {/* 日期网格 */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="p-1.5" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = targetDate === dateKey;
                  const isPast = dateKey < todayStr;
                  const isToday = dateKey === todayStr;

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      disabled={isPast}
                      onClick={() => selectDate(day)}
                      className={`p-1.5 rounded-lg text-xs font-medium transition ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : isPast
                          ? 'text-gray-300 cursor-not-allowed'
                          : isToday
                          ? 'text-blue-600 font-bold bg-blue-50 hover:bg-blue-100'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* 快捷目标选项 */}
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-1 text-[10px]">
                <span className="text-gray-400 font-medium">{isZh ? '快捷:' : 'Quick:'}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setRelativeDays(30)}
                    className="px-2 py-0.5 rounded bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 transition"
                  >
                    {isZh ? '+30天' : '+30d'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRelativeDays(90)}
                    className="px-2 py-0.5 rounded bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 transition"
                  >
                    {isZh ? '+90天' : '+90d'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRelativeDays(180)}
                    className="px-2 py-0.5 rounded bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 transition"
                  >
                    {isZh ? '+半年' : '+6mo'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
