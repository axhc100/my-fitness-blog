import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getDictionary } from '../../../dictionaries';
import Image from 'next/image';
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';

// ⚡ 递归工具函数一：获取目录下所有（包括子文件夹内） .md 文件的路径列表
function getMdFilesRecursive(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dirPath);
  
  list.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getMdFilesRecursive(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  
  return results;
}

// ⚡ 递归工具函数二：深度查找文件名匹配目标 slug 的 .md 文件路径
function findMdFileRecursive(dirPath: string, targetSlug: string): string | null {
  if (!fs.existsSync(dirPath)) return null;

  const list = fs.readdirSync(dirPath);
  for (const file of list) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      const found = findMdFileRecursive(fullPath, targetSlug);
      if (found) return found;
    } else if (file.endsWith('.md')) {
      const slug = path.basename(file, '.md');
      if (slug === targetSlug) {
        return fullPath;
      }
    }
  }
  return null;
}

// 🔥 核心修正：让 Next.js 构建和运行时能够识别所有子夹子里文章的路由
export async function generateStaticParams() {
  const languages = ['en', 'zh'];
  const paths: { lang: string; slug: string }[] = [];

  languages.forEach((lang) => {
    const dirPath = path.join(process.cwd(), 'content', lang);
    if (fs.existsSync(dirPath)) {
      // 深度递归扫描子夹子里面的所有 .md 文件
      const allFilePaths = getMdFilesRecursive(dirPath);
      allFilePaths.forEach((filePath) => {
        const slug = path.basename(filePath, '.md');
        paths.push({ lang, slug });
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
  
  // 🔥 核心重构：不再死绑根目录，深度去所有子文件夹探险查找该文章
  const baseContentDir = path.join(process.cwd(), 'content', lang);
  const filePath = findMdFileRecursive(baseContentDir, slug);
  
  if (!filePath || !fs.existsSync(filePath)) {
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

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      // 1. 拦截标准的 Markdown 图片语法 ![alt](src)
      if (domNode instanceof Element && domNode.name === 'p') {
        if (domNode.children.length === 1 && domNode.children[0] instanceof Element && domNode.children[0].name === 'img') {
          const imgNode = domNode.children[0];
          const { src, alt } = imgNode.attribs;

          return (
            <span className="block w-full rounded-2xl overflow-hidden shadow-md my-8 bg-gray-50/50">
              <Image
                src={src}
                alt={alt || "Blog Image"}
                width={800}
                height={450}
                sizes="100vw"
                className="w-full h-auto object-contain block"
                priority
                unoptimized
              />
            </span>
          );
        }

        // 2. 兜底拦截：如果用户直接在 md 里单行贴了 github 纯网址
        if (domNode.children.length === 1 && domNode.children[0].type === 'text') {
          const textContent = domNode.children[0].data.trim();
          if (textContent.startsWith('https://github.com/')) {
            return (
              <span className="block w-full rounded-2xl overflow-hidden shadow-md my-8 bg-gray-50/50">
                <Image
                  src={textContent}
                  alt="Blog Image"
                  width={800}
                  height={450}
                  sizes="100vw"
                  className="w-full h-auto object-contain block"
                  unoptimized
                />
              </span>
            );
          }
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