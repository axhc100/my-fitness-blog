import VolumeClient from './VolumeClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function VolumePage({ params }: any) {
  return <VolumeClient paramsPromise={params} />;
}
