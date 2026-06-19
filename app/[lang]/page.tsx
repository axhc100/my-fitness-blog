import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { getDictionary } from '../dictionaries';
import FlagCountdown from '@/components/FlagCountdown'; 

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const lang = resolvedParams.lang;
  const page = resolvedSearchParams.page;
  const dict = await getDictionary(lang);

  const POSTS_PER_PAGE = 5; 
  const currentPage = parseInt(page || '1', 10);

  const contentDir = path.join(process.cwd(), 'content', lang);
  let allArticles: { slug: string; title: string; description: string; date: string }[] = [];

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    allArticles = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        return {
          slug: file.replace('.md', ''),
          title: data.title || file,
          description: data.description || '',
          date: data.date || '',
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  const totalPosts = allArticles.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const articles = allArticles.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-slate-50/50 text-gray-900 pb-24 relative">
      
      {/* 🌐 悬浮毛玻璃导航条 */}
      <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <span className="text-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black shadow-sm shadow-blue-500/20 group-hover:scale-105 transition">
              ⚡
            </span>
            <span className="font-black text-sm tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {lang === 'zh' ? '健康数据箱' : 'FitKit'}
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <div className="bg-gray-100 p-0.5 rounded-xl border border-gray-200/50 flex gap-0.5 text-xs font-bold shadow-inner">
              <Link 
                href={`/en${currentPage > 1 ? `?page=${currentPage}` : ''}`} 
                className={`px-3 py-1 rounded-lg transition-all duration-200 ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                EN
              </Link>
              <Link 
                href={`/zh${currentPage > 1 ? `?page=${currentPage}` : ''}`} 
                className={`px-3 py-1 rounded-lg transition-all duration-200 ${lang === 'zh' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                中文
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* 🛠️ 工具箱头部标题 */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-16 mt-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900 bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {dict.title || "Fitness & Health Toolkit"}
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          {dict.description || "Welcome to my fitness blog. Use our smart, science-backed tools to track your health."}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* 🎛️ 统一网格：全卡片字典动态国际化（中英文丝滑切换） */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
  
  {/* 1. 🤸‍♂️ 一字马进度打卡 */}
  <Link href={`/${lang}/tools/splits`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🤸‍♂️</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.splitsTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.splitsDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

  {/* 2. 🍳 三大宏量营养素计算器 */}
  <Link href={`/${lang}/tools/macro`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🍳</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.macroTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.macroDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

  {/* 3. 🎯 “立个 Flag” 目标倒计时（组件内部已自适应 lang 属性） */}
  <FlagCountdown lang={lang} />

  {/* 4. 🔥 体脂率计算器 */}
  <Link href={`/${lang}/tools/bfp`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🔥</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.bfpTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.bfpDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

  {/* 5. ⚡ 基础代谢计算 */}
  <Link href={`/${lang}/tools/bmr`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">⚡</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.bmrTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.bmrDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

  {/* 6. 💧 每日饮水量计算 */}
  <Link href={`/${lang}/tools/water`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">💧</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.waterTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.waterDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

  {/* 7. ⚖️ 标准体重计算 */}
  <Link href={`/${lang}/tools/ibw`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">⚖️</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.ibwTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.ibwDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

  {/* 8. ❤️ 燃脂心率区间 */}
  <Link href={`/${lang}/tools/hr`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
    <div>
      <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">❤️</span>
      <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.hrTool}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{dict.hrDesc}</p>
    </div>
    <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
  </Link>

        </div>

        {/* 📚 动态文章展示区 */}
        <div className="max-w-3xl mx-auto text-left border-t border-gray-200/60 pt-16 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {dict.latestArticles || "Latest Articles"}
            </h2>
            <span className="h-px bg-gray-200 flex-1 ml-4 hidden sm:block"></span>
          </div>
          
          {articles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed text-sm text-gray-400">
              💡 更多硬核健身拉伸干货文章正在火速撰写中...
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((art) => (
                <Link key={art.slug} href={`/${lang}/blog/${art.slug}`} className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition duration-200">{art.title}</h3>
                    <span className="text-xs text-gray-400 font-mono whitespace-nowrap ml-4 bg-gray-50 px-2 py-0.5 rounded-md border">{art.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{art.description}</p>
                  <span className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                    {lang === 'zh' ? '阅读文章' : 'Read Article'} <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* 翻页组件 */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
              {currentPage > 1 ? (
                <Link href={`/${lang}?page=${currentPage - 1}`} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-600 transition shadow-sm">
                  ← {lang === 'zh' ? '上一页' : 'Prev'}
                </Link>
              ) : (
                <span className="px-4 py-2 text-gray-300 text-xs font-bold bg-gray-50 border border-gray-100 rounded-xl cursor-not-allowed">← {lang === 'zh' ? '上一页' : 'Prev'}</span>
              )}

              <span className="text-xs text-gray-400 font-mono bg-white px-3 py-1 rounded-full border shadow-sm">
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link href={`/${lang}?page=${currentPage + 1}`} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-600 transition shadow-sm">
                  {lang === 'zh' ? '下一页' : 'Next'} →
                </Link>
              ) : (
                <span className="px-4 py-2 text-gray-300 text-xs font-bold bg-gray-50 border border-gray-100 rounded-xl cursor-not-allowed">{lang === 'zh' ? '下一页' : 'Next'} →</span>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}