import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getDictionary } from '../../../dictionaries';

// 告知 Next.js 静态预编译哪些文章路径
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
  
  // 拼接得到本地 markdown 文件的绝对路径
  const filePath = path.join(process.cwd(), 'content', lang, `${slug}.md`);
  
  // 安全判定：如果用户乱敲 URL 或者文件不存在
  if (!fs.existsSync(filePath)) {
    return (
      <div className="p-10 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">{dict.articleNotFound}</p>
        <Link href={`/${lang}`} className="text-blue-600 hover:underline">{dict.backToHome}</Link>
      </div>
    );
  }

  // 读取并解析
  const fileRaw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileRaw);
  const htmlContent = await marked(content); // 将 Markdown 编译为 HTML

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6 md:p-12 selection:bg-blue-100">
      <div className="max-w-2xl mx-auto">
        {/* 返回首页 */}
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
          
          {/* 渲染正文：引入自定义微调样式与 Tailwind Typography，使其长文章、图片排版极其舒适 */}
          <div 
            className="prose prose-gray max-w-none leading-relaxed 
                       prose-headings:font-bold prose-headings:text-gray-800
                       prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                       prose-p:text-gray-600 prose-p:mb-4 prose-p:text-base md:prose-p:text-lg
                       prose-strong:text-blue-600 prose-strong:font-bold
                       prose-img:max-w-full prose-img:h-auto prose-img:rounded-2xl prose-img:shadow-md prose-img:mx-auto prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </article>
      </div>
    </main>
  );
}