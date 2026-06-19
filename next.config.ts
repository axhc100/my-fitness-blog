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
    ],
  },
};

export default nextConfig;