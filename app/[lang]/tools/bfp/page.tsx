// 这是一个纯服务端页面，专门用来导出静态生成参数，完美规避 Next.js 混用冲突报错！
import BfpClient from './BfpClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function BfpPage({ params }: { params: Promise<{ lang: 'en' | 'zh' }> }) {
  // 把 params 作为 Promise 传给客户端组件进行解构
  return <BfpClient paramsPromise={params} />;
}