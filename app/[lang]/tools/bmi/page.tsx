import BmiClient from './BmiClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function BmiPage({ params }: any) {
  return <BmiClient paramsPromise={params} />;
}
