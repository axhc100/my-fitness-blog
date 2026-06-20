import MacroClient from './MacroClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

// 统一采用宽松的 any 参数签名，坚决规避 Next.js 15 页面类型校验死锁
export default function MacroCalculatorPage({ params }: any) {
  return <MacroClient paramsPromise={params} />;
}