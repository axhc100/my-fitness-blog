import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getDictionary } from '../../../dictionaries';
import Image from 'next/image';
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';

export async function generateStaticParams() {
  const languages = ['en', 'zh'];
  const paths: { lang: string; slug: string }[] = [];

  languages.forEach((lang) => {
    const dirPath = path.join(process.cwd(), 'content', lang);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        if (file.endsWith('.md')) {
          paths.push({ lang, slug: file.replace('.md', '') });
        }
      });
    }
  });
  return paths;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh'; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  
  const filePath = path.join(process.cwd(), 'content', lang, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return (
      <div className="p-10 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">{dict.articleNotFound}</p>
        <Link href={`/${lang}`} className="text-blue-600 hover:underline">{dict.backToHome}</Link>
      </div>
    );
  }

  const fileRaw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileRaw);
  const htmlContent = await marked(content);

  // 🎛️ 终极自适应解析规则：支持任意比例图片，永不裁剪、永不报错
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // 1. 拦截单独成行的图片父级 <p> 标签
      if (domNode instanceof Element && domNode.name === 'p') {
        if (domNode.children.length === 1 && domNode.children[0] instanceof Element && domNode.children[0].name === 'img') {
          const imgNode = domNode.children[0];
          const { src, alt } = imgNode.attribs;

          return (
            <span className="block w-full rounded-2xl overflow-hidden shadow-md my-8 bg-gray-50/50">
              <Image
                src={src}
                alt={alt || 'Blog Image'}
                // ⚡ 以下是实现“万能自适应比例”的核心组合拳：
                width={0}   // 绕过 Next.js 强制要求固定宽度的限制
                height={0}  // 绕过 Next.js 强制要求固定高度的限制
                sizes="100vw"
                // 配合 Tailwind 实现：宽度 100% 撑满，高度根据原图比例全自动流式延伸（永不裁剪变形）
                className="w-full h-auto object-contain block"
                quality={75}
                priority
              />
            </span>
          );
        }
      }

      // 2. 拦截非单独成行的普通 <img> 标签
      if (domNode instanceof Element && domNode.name === 'img') {
        const { src, alt } = domNode.attribs;
        const isDescendantOfP = domNode.parent && domNode.parent instanceof Element && domNode.parent.name === 'p';
        
        if (!isDescendantOfP) {
          return (
            <span className="block w-full rounded-2xl overflow-hidden shadow-md my-8 bg-gray-50/50">
              <Image
                src={src}
                alt={alt || 'Blog Image'}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain block"
                quality={75}
              />
            </span>
          );
        }
      }
    },
  };

  const reactContent = parse(htmlContent, options);

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6 md:p-12 selection:bg-blue-100">
      <div className="max-w-2xl mx-auto">
        <Link href={`/${lang}`} className="text-sm font-semibold text-blue-600 hover:underline inline-block mb-10 transition">
          {dict.backToHome}
        </Link>
        
        <article>
          <header className="mb-10 border-b pb-6 border-gray-100">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight mb-3">
              {data.title}
            </h1>
            <div className="flex items-center text-sm text-gray-400 font-mono">
              <span>{data.date}</span>
              {data.description && (
                <>
                  <span className="mx-2">•</span>
                  <span className="italic max-w-md truncate">{data.description}</span>
                </>
              )}
            </div>
          </header>
          
          <div 
            className="prose prose-gray max-w-none leading-relaxed 
                       prose-headings:font-bold prose-headings:text-gray-800
                       prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                       prose-p:text-gray-600 prose-p:mb-4 prose-p:text-base md:prose-p:text-lg
                       prose-strong:text-blue-600 prose-strong:font-bold"
          >
            {reactContent}
          </div>
        </article>
      </div>
    </main>
  );
}