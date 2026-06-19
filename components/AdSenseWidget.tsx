'use client'; // ⚡ 声明为客户端组件，防止 Next.js 服务端渲染时因为 window 找不到而报错

import { useEffect } from 'react';

interface AdSenseWidgetProps {
  slot: string; // 动态传入谷歌广告位 ID
}

export default function AdSenseWidget({ slot }: AdSenseWidgetProps) {
  useEffect(() => {
    try {
      // 触发谷歌广告初始化渲染
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="w-full text-center my-8 overflow-hidden min-h-[100px] flex flex-col items-center justify-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
      {/* 开发环境和线上环境的占位标示 */}
      <span className="text-[10px] text-gray-300 font-mono tracking-widest block mb-2">- SPONSORED ADVERTISEMENT -</span>
      
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ⚠️ 等你拿到审核通过的 ID 时，把这一行换掉
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}