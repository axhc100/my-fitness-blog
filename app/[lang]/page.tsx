import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { getDictionary } from '../dictionaries';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // 📂 自动化扫描：读取对应语言文件夹下的所有 Markdown 文章
  const contentDir = path.join(process.cwd(), 'content', lang);
  let articles: { slug: string; title: string; description: string; date: string }[] = [];

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    articles = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent); // 提取 MD 顶部的 yaml 元数据
        return {
          slug: file.replace('.md', ''),
          title: data.title || file,
          description: data.description || '',
          date: data.date || '',
        };
      })
      // 按照日期从新到旧排序
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 text-gray-900">
      {/* 语言切换 */}
      <div className="absolute top-6 right-6 flex gap-2 bg-white p-1 rounded-xl shadow-sm border">
        <Link href="/en" className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition ${lang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>EN</Link>
        <Link href="/zh" className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition ${lang === 'zh' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>中文</Link>
      </div>

      <div className="text-center max-w-4xl mt-16 mb-8">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl mb-4 text-gray-800">
          {dict.title}
        </h1>
        <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
          {dict.description}
        </p>

        {/* 5大黄金健康工具箱网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          <Link href={`/${lang}/tools/bfp`} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-left group">
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">{dict.bfpTool}</h3>
            <p className="text-xs text-gray-400">Calculate body fat percentage based on BMI formula.</p>
          </Link>

          <Link href={`/${lang}/tools/bmr`} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-left group">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">{dict.bmrTool}</h3>
            <p className="text-xs text-gray-400">Find your Basal Metabolic Rate using Mifflin-St Jeor equation.</p>
          </Link>

          <Link href={`/${lang}/tools/water`} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-left group">
            <div className="text-3xl mb-3">💧</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">{dict.waterTool}</h3>
            <p className="text-xs text-gray-400">Get your personalized daily water hydration targets.</p>
          </Link>

          <Link href={`/${lang}/tools/ibw`} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-left group">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">{dict.ibwTool}</h3>
            <p className="text-xs text-gray-400">Find your healthy ideal body weight based on Devine formula.</p>
          </Link>

          <Link href={`/${lang}/tools/hr`} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-left group">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition">{dict.hrTool}</h3>
            <p className="text-xs text-gray-400">Calculate your peak fat-burning zones for cardio exercises.</p>
          </Link>
        </div>

        {/* 📚 博客文章动态展示区 */}
        <div className="max-w-2xl mx-auto text-left border-t pt-12 w-full">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
            {dict.latestArticles}
          </h2>
          
          {articles.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No articles found yet.</p>
          ) : (
            <div className="space-y-6">
              {articles.map((art) => (
                <Link key={art.slug} href={`/${lang}/blog/${art.slug}`} className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition">{art.title}</h3>
                    <span className="text-xs text-gray-400 font-mono whitespace-nowrap ml-4">{art.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{art.description}</p>
                  <span className="text-xs font-semibold text-blue-600 hover:text-blue-700">{dict.readMore}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}