'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SearchBox from "./SearchBox";

type Props = { locale: "zh" | "en" };

export default function Header({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";

  const p = (href: string) => `/${locale}${href}`;
  const other = locale === "zh" ? "en" : "zh";

  // 计算语言切换目标 URL：保持当前子路径，仅替换语言前缀
  const switchTarget = pathname.replace(/^\/(zh|en)/, `/${other}`) || `/${other}`;

  const nav = [
    { href: "/tools", zh: "工具箱", en: "Tools" },
    { href: "/#articles", zh: "博客文章", en: "Blog" },
    { href: "/about", zh: "关于", en: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* 左侧 Logo */}
        <Link href={p("")} className="flex items-center gap-2 group shrink-0">
          <Image
            src="/logo.png"
            alt="FitKit Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg shadow-sm shadow-blue-500/20 group-hover:scale-105 transition object-cover"
          />
          <span className="font-black text-lg tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            FitKit
          </span>
        </Link>

        {/* 桌面端居中主导航 */}
        <nav
          aria-label={locale === "zh" ? "主导航" : "Main navigation"}
          className="hidden md:flex items-center gap-8"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={p(item.href)}
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
            >
              {locale === "zh" ? item.zh : item.en}
            </Link>
          ))}
        </nav>

        {/* 桌面端右侧：搜索入口 + 语言切换 */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <SearchBox locale={locale} />

          <div className="bg-gray-100 p-0.5 rounded-xl border border-gray-200/50 flex gap-0.5 text-xs font-bold shadow-inner">
            <Link
              href={locale === "en" ? pathname : switchTarget}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                locale === "en"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              EN
            </Link>
            <Link
              href={locale === "zh" ? pathname : switchTarget}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                locale === "zh"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              中文
            </Link>
          </div>
        </div>

        {/* 移动端控件区 */}
        <div className="flex md:hidden items-center gap-2">
          <SearchBox locale={locale} />

          <Link
            href={switchTarget}
            className="px-2.5 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg border border-gray-200/60"
          >
            {locale === "zh" ? "EN" : "中文"}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={locale === "zh" ? "打开菜单" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端展开抽屉导航 */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg px-6 py-4 shadow-lg animate-fadeIn">
          <nav
            aria-label={locale === "zh" ? "移动端导航" : "Mobile navigation"}
            className="flex flex-col space-y-3"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={p(item.href)}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-blue-600 py-1 transition"
              >
                {locale === "zh" ? item.zh : item.en}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
