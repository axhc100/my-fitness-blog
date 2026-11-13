import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com", // ⚡ 允许所有 githubusercontent 子域名
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com", // ⚡ 兜底：允许亚马逊生产环境图片存储桶
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // 5 篇最新文章 301 重定向映射表 (中英各 5 条，共 10 条，永久重定向保留查询参数)
      // 1. 肌肥大
      {
        source: "/zh/blog/26-11-13-1",
        destination: "/zh/blog/hypertrophy-split-periodization",
        permanent: true,
      },
      {
        source: "/en/blog/26-11-13-1",
        destination: "/en/blog/hypertrophy-split-periodization",
        permanent: true,
      },
      // 2. HYROX
      {
        source: "/zh/blog/26-11-12-1",
        destination: "/zh/blog/hyrox-training-guide",
        permanent: true,
      },
      {
        source: "/en/blog/26-11-12-1",
        destination: "/en/blog/hyrox-training-guide",
        permanent: true,
      },
      // 3. 单腿
      {
        source: "/zh/blog/26-11-11-1",
        destination: "/zh/blog/single-leg-training-guide",
        permanent: true,
      },
      {
        source: "/en/blog/26-11-11-1",
        destination: "/en/blog/single-leg-training-guide",
        permanent: true,
      },
      // 4. 肋骨外翻
      {
        source: "/zh/blog/26-11-10-1",
        destination: "/zh/blog/rib-flare-correction",
        permanent: true,
      },
      {
        source: "/en/blog/26-11-10-1",
        destination: "/en/blog/rib-flare-correction",
        permanent: true,
      },
      // 5. 阴瑜伽
      {
        source: "/zh/blog/26-11-09-1",
        destination: "/zh/blog/yin-yoga-fascia-guide",
        permanent: true,
      },
      {
        source: "/en/blog/26-11-09-1",
        destination: "/en/blog/yin-yoga-fascia-guide",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
