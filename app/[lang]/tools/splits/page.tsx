import SplitsClient from './SplitsClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

// 统一配置宽松的 any 类型，强制穿透并掐断 Next.js 15 在打包期间的类型自锁
export default function SplitsTrackerPage({ params }: any) {
  return <SplitsClient paramsPromise={params} />;
}