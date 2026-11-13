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
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-13-1",
        destination: "/en/blog/hypertrophy-split-periodization",
        statusCode: 301,
      },
      // 2. HYROX
      {
        source: "/zh/blog/26-11-12-1",
        destination: "/zh/blog/hyrox-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-12-1",
        destination: "/en/blog/hyrox-training-guide",
        statusCode: 301,
      },
      // 3. 单腿
      {
        source: "/zh/blog/26-11-11-1",
        destination: "/zh/blog/single-leg-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-11-1",
        destination: "/en/blog/single-leg-training-guide",
        statusCode: 301,
      },
      // 4. 肋骨外翻
      {
        source: "/zh/blog/26-11-10-1",
        destination: "/zh/blog/rib-flare-correction",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-10-1",
        destination: "/en/blog/rib-flare-correction",
        statusCode: 301,
      },
      // 5. 阴瑜伽
      {
        source: "/zh/blog/26-11-09-1",
        destination: "/zh/blog/yin-yoga-fascia-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-09-1",
        destination: "/en/blog/yin-yoga-fascia-guide",
        statusCode: 301,
      },
      // 6. 肌肥大疲劳与减量 (26-11-06-1)
      {
        source: "/zh/blog/26-11-06-1",
        destination: "/zh/blog/hypertrophy-fatigue-deload-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-06-1",
        destination: "/en/blog/hypertrophy-fatigue-deload-guide",
        statusCode: 301,
      },
      // 7. HYROX 备赛指南 (26-10-29-1)
      {
        source: "/zh/blog/26-10-29-1",
        destination: "/zh/blog/hyrox-race-prep-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-10-29-1",
        destination: "/en/blog/hyrox-race-prep-guide",
        statusCode: 301,
      },
      // 8. 骨盆前倾矫正 (26-11-03-1)
      {
        source: "/zh/blog/26-11-03-1",
        destination: "/zh/blog/anterior-pelvic-tilt-correction",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-03-1",
        destination: "/en/blog/anterior-pelvic-tilt-correction",
        statusCode: 301,
      },
      // 9. 普拉提与流瑜伽核心对位 (26-11-02-1)
      {
        source: "/zh/blog/26-11-02-1",
        destination: "/zh/blog/pilates-vinyasa-core-alignment",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-11-02-1",
        destination: "/en/blog/pilates-vinyasa-core-alignment",
        statusCode: 301,
      },
      // 10. 空腹有氧 (规范小写连字符 slug)
      {
        source: "/zh/blog/FastedCardio",
        destination: "/zh/blog/fasted-cardio",
        statusCode: 301,
      },
      {
        source: "/en/blog/FastedCardio",
        destination: "/en/blog/fasted-cardio",
        statusCode: 301,
      },
      // 11. 女性全身塑形训练指南 (26-07-02-1)
      {
        source: "/zh/blog/26-07-02-1",
        destination: "/zh/blog/womens-full-body-sculpting-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-02-1",
        destination: "/en/blog/womens-full-body-sculpting-guide",
        statusCode: 301,
      },
      // 12. 瑜伽的科学力量 (26-07-17-1)
      {
        source: "/zh/blog/26-07-17-1",
        destination: "/zh/blog/science-of-yoga",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-17-1",
        destination: "/en/blog/science-of-yoga",
        statusCode: 301,
      },
      // 13. Mobility Training 终极指南 (26-07-18-1)
      {
        source: "/zh/blog/26-07-18-1",
        destination: "/zh/blog/mobility-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-18-1",
        destination: "/en/blog/mobility-training-guide",
        statusCode: 301,
      },
      // 14. Zone 2 低心率有氧全指南 (26-10-21-1)
      {
        source: "/zh/blog/26-10-21-1",
        destination: "/zh/blog/zone-2-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-10-21-1",
        destination: "/en/blog/zone-2-training-guide",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
