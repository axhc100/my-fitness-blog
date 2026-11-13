import FatLossClient from './FatLossClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function FatLossPage({ params }: any) {
  return <FatLossClient paramsPromise={params} />;
}
