import BfpClient from './BfpClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

// 统一采用标准的 Any/PageProps 宽松签名，彻底解决 Next.js 15 的组件签名校验错误
export default function BfpPage({ params }: any) {
  return <BfpClient paramsPromise={params} />;
}