import OneRmClient from './OneRmClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function OneRmPage({ params }: any) {
  return <OneRmClient paramsPromise={params} />;
}
