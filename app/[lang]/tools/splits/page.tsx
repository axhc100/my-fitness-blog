// app/[lang]/splits/page.tsx
import React from 'react';
import SplitsClient from './SplitsClient';

// 1. 在纯服务端路由组件中声明多语言静态参数，完美避开编译冲突
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function SplitsTrackerPage({ params }: PageProps) {
  // 将 params 异步包直接传给客户端组件，完全符合 Next.js 最新规范
  return <SplitsClient paramsPromise={params} />;
}