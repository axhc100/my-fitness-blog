import { Suspense } from 'react';
import MacroClient from './MacroClient';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default function MacroCalculatorPage({ params }: any) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-xs font-mono text-gray-400">Loading Macro Calculator...</div>}>
      <MacroClient paramsPromise={params} />
    </Suspense>
  );
}
