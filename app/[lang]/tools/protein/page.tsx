import ProteinClient from './ProteinClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function ProteinPage({ params }: any) {
  return <ProteinClient paramsPromise={params} />;
}
