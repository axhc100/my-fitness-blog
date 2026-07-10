import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'zh'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 判断 URL 是否已经包含了 /en 或 /zh
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 如果没有包含语言前缀，自动重定向到默认的英文 (/en)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// 匹配所有不需要经过语言重定向的静态文件路径
export const config = {
  // 排除所有带扩展名的静态文件（图片、字体、图标等），让它们不自动加 /en/ 或 /zh/
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
