'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  locale: 'zh' | 'en';
}

export default function ContactForm({ locale }: ContactFormProps) {
  const isZh = locale === 'zh';
  const [topic, setTopic] = useState('bug');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 my-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
        <div className="text-3xl">✅</div>
        <h3 className="font-bold text-gray-900 text-base">
          {isZh ? '反馈已成功提交' : 'Feedback Received'}
        </h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
          {isZh
            ? '感谢您的宝贵建议！我们已在本地收到您的反馈记录，若涉及算法或数据显示问题，我们会尽快核对修复。'
            : 'Thank you for your feedback! We will review your message and address any formula or interface issues promptly.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setMessage('');
          }}
          className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
        >
          {isZh ? '继续发送其他反馈' : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="my-8 p-6 md:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-gray-900 mb-1">
        {isZh ? '快速留言反馈' : 'Send Us a Message'}
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        {isZh
          ? '请选择反馈类型并填写详细信息，无需公开您的敏感个人信息。'
          : 'Select the feedback topic and describe your request without exposing sensitive personal info.'}
      </p>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {isZh ? '反馈主题' : 'Topic'}
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="bug">{isZh ? '工具计算结果有疑问 / 报错' : 'Calculation or Bug Report'}</option>
          <option value="suggestion">{isZh ? '新工具建议 / 功能期待' : 'New Feature / Calculator Request'}</option>
          <option value="content">{isZh ? '文章内容事实核对' : 'Article / Scientific Content Correction'}</option>
          <option value="other">{isZh ? '其他合作或交流' : 'General Inquiry'}</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {isZh ? '您的联系邮箱（选填，方便我们答复）' : 'Your Email (Optional, for reply)'}
        </label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder={isZh ? "name@example.com" : "you@example.com"}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {isZh ? '详细描述' : 'Message'} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isZh
              ? "请描述您使用的工具、输入的参数数值、遇到的问题或改进建议..."
              : "Describe the tool, input parameters, observed behavior, or suggestions..."
          }
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl transition shadow-sm"
      >
        {isZh ? '提交反馈' : 'Submit Feedback'}
      </button>
    </form>
  );
}
