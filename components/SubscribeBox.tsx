'use client';

import React, { useState } from 'react';

interface SubscribeBoxProps {
  locale: 'zh' | 'en';
  variant?: 'footer' | 'article';
}

export default function SubscribeBox({ locale, variant = 'footer' }: SubscribeBoxProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'invalid' | 'coming_soon'>('idle');

  const isZh = locale === 'zh';

  const t = {
    title: isZh ? '每周一篇训练与营养干货' : 'One practical training & nutrition email a week',
    desc: isZh ? '不发广告，随时可以取消订阅。' : 'No ads. Unsubscribe anytime.',
    placeholder: isZh ? '输入你的邮箱' : 'Your email address',
    button: isZh ? '订阅' : 'Subscribe',
    invalid: isZh ? '这个邮箱好像不对，请检查后重试。' : "That email doesn't look right. Please check and try again.",
    comingSoon: isZh ? '订阅功能即将上线，敬请期待！' : 'Subscription feature launching soon, stay tuned!',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('invalid');
      return;
    }
    // 依据方案规范：在接入第三方邮件系统（如 Buttondown/ConvertKit）前，展示占位提醒，不假装提交成功
    setStatus('coming_soon');
  };

  if (variant === 'article') {
    return (
      <div className="my-10 p-6 md:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950 text-white rounded-2xl border border-gray-800 shadow-xl">
        <h3 className="text-lg md:text-xl font-bold mb-2">
          {isZh ? '喜欢这篇文章？' : 'Liked this article?'}
        </h3>
        <p className="text-sm text-gray-300 mb-5 leading-relaxed">
          {isZh
            ? '每周我们会发一篇训练与营养干货，帮你把工具和课表真正用起来。不发广告，随时可以取消订阅。'
            : 'Get one practical training & nutrition email a week to help you actually use the tools and programs. No ads. Unsubscribe anytime.'}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder={t.placeholder}
            required
            className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition"
          />
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition active:scale-95 shadow-md shadow-blue-600/30 whitespace-nowrap"
          >
            {t.button}
          </button>
        </form>
        {status === 'invalid' && (
          <p className="mt-3 text-xs text-rose-400 font-medium">{t.invalid}</p>
        )}
        {status === 'coming_soon' && (
          <p className="mt-3 text-xs text-emerald-400 font-medium">✨ {t.comingSoon}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-bold text-gray-900 mb-1">{t.title}</h3>
      <p className="text-xs text-gray-500 mb-3">{t.desc}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder={t.placeholder}
          required
          className="flex-1 px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-900 hover:bg-gray-800 text-white transition active:scale-95 whitespace-nowrap shadow-sm"
        >
          {t.button}
        </button>
      </form>
      {status === 'invalid' && (
        <p className="mt-2 text-[11px] text-rose-600 font-medium">{t.invalid}</p>
      )}
      {status === 'coming_soon' && (
        <p className="mt-2 text-[11px] text-emerald-600 font-medium">✨ {t.comingSoon}</p>
      )}
    </div>
  );
}
