import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import FlagCountdown from '@/components/FlagCountdown';
import ArticleList from '@/components/ArticleList';
import { getArticles } from '../lib/seo'; 
import { buildPageMetadata, getHomeSeo, type Lang } from '../lib/seo';

// 🚀 注入增量再生，防止日期与文章死锁
export const revalidate = 3600; 

// ⚡ 工业级终极递归武器：扫描当前语言目录下（包括所有子夹子）的全部 .md 文件
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

// 🌐 完美的异步 Metadata 拦截处理
export async function generateMetadata(props: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;

  const lang = resolvedParams.lang;
  const page = resolvedSearchParams.page;

  const seo = getHomeSeo(lang);
  const pageNumber = Number(page || "1");
  const pathname = pageNumber > 1 ? `?page=${pageNumber}` : "";

  return buildPageMetadata({
    lang,
    pathname,
    title: pageNumber > 1 ? `${seo.title} - Page ${pageNumber}` : seo.title,
    description: seo.description,
  });
}

// ⚙️ 规范声明 Next.js 约定的 PageProps 类型接口
interface PageProps {
  params: Promise<{ lang: 'en' | 'zh' }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage(props: PageProps) {
  // 🔥 核心修正：100% 在服务端组件第一步解开 Promise，断绝编译期类型死结
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;
  
  const lang = resolvedParams.lang;
  const page = resolvedSearchParams.page;
  
  const dict = await getDictionary(lang);

  const POSTS_PER_PAGE = 5; 
  const currentPage = parseInt(page || '1', 10);

  const contentDir = path.join(process.cwd(), 'content', lang);
  let allArticles: { slug: string; title: string; description: string; date: string }[] = [];

  if (fs.existsSync(contentDir)) {
    const allFilePaths = getMdFilesRecursive(contentDir);
    
    allArticles = allFilePaths.map((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      const slug = path.basename(filePath, '.md');
      
      // 容错处理：确保日期在解析阶段不崩塌
      let finalDate = '';
      if (data.date instanceof Date) {
        finalDate = data.date.toISOString().split('T')[0];
      } else if (typeof data.date === 'string') {
        finalDate = data.date.split('T')[0];
      } else {
        finalDate = String(data.date || '');
      }
      
      return {
        slug: slug,
        title: data.title || path.basename(filePath),
        description: data.description || '',
        date: finalDate,
      };
    });

    // 维持文章按最新日期倒序排列
    allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  const totalPosts = allArticles.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const articles = allArticles.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="bg-slate-50/50 text-gray-900 pb-24 relative">
      {/* 🛠️ 头部大标题 */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-16 mt-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900 bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {dict.title || "Fitness & Health Toolkit"}
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          {dict.description || "Welcome to my fitness blog. Use our smart, science-backed tools to track your health."}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* 🎛️ 完美的 8 张核心计算器卡片 UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          
          {/* 0. BMI 身体质量指数计算器 */}
          <Link href={`/${lang}/tools/bmi`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">⚖️</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.bmiTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.bmiDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 1RM 最大力量计算器 */}
          <Link href={`/${lang}/tools/1rm`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🏋️</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.oneRmTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.oneRmDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 每日蛋白质需求计算器 */}
          <Link href={`/${lang}/tools/protein`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🥩</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.proteinTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.proteinDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 减脂速度预测与目标日期计算器 */}
          <Link href={`/${lang}/tools/fat-loss`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🎯</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.fatLossTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.fatLossDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 训练容量计算器 */}
          <Link href={`/${lang}/tools/volume`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">📊</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.volumeTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.volumeDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 1. 一字马进度打卡 */}
          <Link href={`/${lang}/tools/splits`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🤸‍♂️</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.splitsTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.splitsDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 2. 三大宏量营养素计算器 */}
          <Link href={`/${lang}/tools/macro`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🍳</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.macroTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.macroDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 3. “立个 Flag” 目标倒计时 */}
          <FlagCountdown lang={lang} />

          {/* 4. 体脂率计算器 */}
          <Link href={`/${lang}/tools/bfp`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">🔥</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.bfpTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.bfpDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 5. 基础代谢计算 */}
          <Link href={`/${lang}/tools/bmr`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">⚡</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.bmrTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.bmrDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 6. 每日饮水量计算 */}
          <Link href={`/${lang}/tools/water`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">💧</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.waterTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.waterDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 7. 标准体重计算 */}
          <Link href={`/${lang}/tools/ibw`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">⚖️</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.ibwTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.ibwDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

          {/* 8. 燃脂心率区间 */}
          <Link href={`/${lang}/tools/hr`} className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left group min-h-[220px]">
            <div>
              <span className="text-2xl mb-3 block group-hover:scale-110 transition duration-300 transform origin-left">❤️</span>
              <h3 className="text-base font-bold text-gray-900 mb-1 transition group-hover:text-blue-600">{dict.hrTool}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{dict.hrDesc}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 mt-4 block">OPEN TOOL →</span>
          </Link>

        </div>

        {/* 📚 动态文章展示区（带分类筛选与无刷新分页） */}
        <div className="max-w-3xl mx-auto text-left border-t border-gray-200/60 pt-16 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {dict.latestArticles || "Latest Articles"}
            </h2>
            <span className="h-px bg-gray-200 flex-1 ml-4 hidden sm:block"></span>
          </div>
          
          <ArticleList 
            articles={getArticles(lang)} 
            lang={lang} 
            readMoreText={lang === 'zh' ? '阅读文章' : 'Read Article'} 
          />
        </div>
      </div>
    </div>
  );
}
