'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Lang } from '@/app/lib/seo';

interface ArticleShareProps {
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  mode?: 'inline' | 'floating';
}

export default function ArticleShare({
  lang,
  slug,
  title,
  description,
  mode = 'inline',
}: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const [showWechatModal, setShowWechatModal] = useState(false);

  const isZh = lang === 'zh';
  const baseUrl = `https://www.fitkit.top/${lang}/blog/${slug}`;
  const shareUrl = `${baseUrl}?utm_source=share&utm_medium=article&utm_campaign=${slug}`;
  const coverImageUrl = `https://www.fitkit.top/images/${slug}.jpg`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWeiboShare = () => {
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent(title)}&pic=${encodeURIComponent(coverImageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=500');
  };

  const handleTwitterShare = () => {
    const text = `${title}\n\n${description ? description.slice(0, 100) + '... ' : ''}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=450');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  // 微信二维码弹窗 (使用稳健的 QRCode API，不依赖第三方大型 npm 包)
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    shareUrl
  )}`;

  // 移动端浮动按钮模式
  if (mode === 'floating') {
    return (
      <>
        <div className="fixed bottom-6 right-5 z-40 md:hidden flex flex-col items-end gap-2">
          {copied && (
            <div className="bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg animate-fade-in">
              {isZh ? '✓ 链接已复制' : '✓ Link Copied'}
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-gray-200">
            {isZh ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowWechatModal(true)}
                  aria-label="微信分享"
                  className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition"
                >
                  <span className="text-base">💬</span>
                </button>
                <button
                  type="button"
                  onClick={handleWeiboShare}
                  aria-label="微博分享"
                  className="w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition"
                >
                  <span className="text-base">🔴</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleTwitterShare}
                  aria-label="Share on X"
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 flex items-center justify-center transition font-black text-sm"
                >
                  𝕏
                </button>
                <button
                  type="button"
                  onClick={handleFacebookShare}
                  aria-label="Share on Facebook"
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition font-black text-base"
                >
                  f
                </button>
              </>
            )}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="复制链接"
              className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition shadow-sm"
            >
              <span className="text-sm">🔗</span>
            </button>
          </div>
        </div>

        {/* 微信二维码弹窗 */}
        {showWechatModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setShowWechatModal(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <span className="text-emerald-500">💬</span>
                  <span>微信扫一扫分享</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWechatModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl inline-block border border-gray-100 mb-3">
                <Image
                  src={qrCodeApiUrl}
                  alt="WeChat QR Code"
                  width={220}
                  height={220}
                  className="rounded-xl w-48 h-48 block mx-auto"
                  unoptimized
                />
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                微信扫描上方二维码，点击右上角【...】即可分享给好友或朋友圈
              </p>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>🔗</span>
                <span>{copied ? '已复制链接！' : '或者直接复制文章链接'}</span>
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // 行内普通模式（标题下方一排 / 文末一排）
  return (
    <div className="relative flex flex-wrap items-center gap-2 py-3">
      <span className="text-xs font-bold text-gray-400 mr-1 flex items-center gap-1">
        <span>📤</span>
        <span>{isZh ? '分享：' : 'Share:'}</span>
      </span>

      {isZh ? (
        <>
          <button
            type="button"
            onClick={() => setShowWechatModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200/60 transition"
          >
            <span>💬</span>
            <span>微信</span>
          </button>
          <button
            type="button"
            onClick={handleWeiboShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200/60 transition"
          >
            <span>🔴</span>
            <span>微博</span>
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={handleTwitterShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs font-semibold border border-gray-200/80 transition"
          >
            <span className="font-black">𝕏</span>
            <span>Post</span>
          </button>
          <button
            type="button"
            onClick={handleFacebookShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200/60 transition"
          >
            <span className="font-black">f</span>
            <span>Share</span>
          </button>
        </>
      )}

      {/* 复制链接按钮 */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-xs font-semibold border border-gray-200/80 hover:border-blue-200 transition"
      >
        <span>🔗</span>
        <span>{copied ? (isZh ? '已复制！' : 'Copied!') : isZh ? '复制链接' : 'Copy Link'}</span>
      </button>

      {/* 复制成功轻量气泡提示 */}
      {copied && (
        <span className="text-xs text-emerald-600 font-bold animate-fade-in flex items-center gap-1 ml-1">
          ✓ {isZh ? '链接已带跟踪参数复制到剪贴板' : 'Link with UTM tags copied to clipboard'}
        </span>
      )}

      {/* 微信二维码弹窗 */}
      {showWechatModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowWechatModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                <span className="text-emerald-500">💬</span>
                <span>微信扫一扫分享</span>
              </div>
              <button
                type="button"
                onClick={() => setShowWechatModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl inline-block border border-gray-100 mb-3">
              <Image
                src={qrCodeApiUrl}
                alt="WeChat QR Code"
                width={220}
                height={220}
                className="rounded-xl w-48 h-48 block mx-auto"
                unoptimized
              />
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              微信扫描上方二维码，点击右上角【...】即可分享给好友或朋友圈
            </p>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>🔗</span>
              <span>{copied ? '已复制链接！' : '或者直接复制文章链接'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
