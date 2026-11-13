import React from 'react';
import { Lang } from '@/app/lib/seo';
import { TOOL_FAQS } from '@/lib/toolFaqs';

interface ToolFaqSectionProps {
  slug: string;
  lang: Lang;
}

export default function ToolFaqSection({ slug, lang }: ToolFaqSectionProps) {
  const isZh = lang === 'zh';
  const faqs = TOOL_FAQS[slug] || [];

  if (faqs.length === 0) return null;

  // 生成 FAQPage JSON-LD 结构化数据
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang],
      },
    })),
  };

  return (
    <section className="mt-12 pt-10 border-t border-gray-100/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">💬</span>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
          {isZh ? '常见问题与专家答疑（FAQ）' : 'Frequently Asked Questions (FAQ)'}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="p-5 md:p-6 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/60 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-blue-600 font-extrabold shrink-0">Q:</span>
              <span>{item.question[lang]}</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-6">
              {item.answer[lang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
