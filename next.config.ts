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
      // 专项批次一：归档文章旧 Slug 规范化 301 重定向 (12 篇，共 24 条)
      // 1. 15分钟HIIT (06-06-20-01 -> hiit-15-minute-fat-burn)
      {
        source: "/zh/blog/06-06-20-01",
        destination: "/zh/blog/hiit-15-minute-fat-burn",
        statusCode: 301,
      },
      {
        source: "/en/blog/06-06-20-01",
        destination: "/en/blog/hiit-15-minute-fat-burn",
        statusCode: 301,
      },
      // 2. 皮质醇与腹部脂肪 (06-06-20-02 -> cortisol-stress-belly-fat)
      {
        source: "/zh/blog/06-06-20-02",
        destination: "/zh/blog/cortisol-stress-belly-fat",
        statusCode: 301,
      },
      {
        source: "/en/blog/06-06-20-02",
        destination: "/en/blog/cortisol-stress-belly-fat",
        statusCode: 301,
      },
      // 3. Zone 2 与线粒体 (06-06-20-03 -> zone-2-mitochondrial-biogenesis)
      {
        source: "/zh/blog/06-06-20-03",
        destination: "/zh/blog/zone-2-mitochondrial-biogenesis",
        statusCode: 301,
      },
      {
        source: "/en/blog/06-06-20-03",
        destination: "/en/blog/zone-2-mitochondrial-biogenesis",
        statusCode: 301,
      },
      // 4. 肌浆网肥大 (06-06-20-04 -> sarcoplasmic-hypertrophy-mechanisms)
      {
        source: "/zh/blog/06-06-20-04",
        destination: "/zh/blog/sarcoplasmic-hypertrophy-mechanisms",
        statusCode: 301,
      },
      {
        source: "/en/blog/06-06-20-04",
        destination: "/en/blog/sarcoplasmic-hypertrophy-mechanisms",
        statusCode: 301,
      },
      // 5. 为什么拼命做HIIT肚子更胖 (06-06-20-05 -> why-hiit-causes-belly-fat)
      {
        source: "/zh/blog/06-06-20-05",
        destination: "/zh/blog/why-hiit-causes-belly-fat",
        statusCode: 301,
      },
      {
        source: "/en/blog/06-06-20-05",
        destination: "/en/blog/why-hiit-causes-belly-fat",
        statusCode: 301,
      },
      // 6. 肌少型肥胖与抗阻 (26-06-22-2 -> sarcopenic-obesity-resistance-training)
      {
        source: "/zh/blog/26-06-22-2",
        destination: "/zh/blog/sarcopenic-obesity-resistance-training",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-22-2",
        destination: "/en/blog/sarcopenic-obesity-resistance-training",
        statusCode: 301,
      },
      // 7. 生酮流感与电解质 (26-06-22-3 -> keto-flu-electrolytes-remedy)
      {
        source: "/zh/blog/26-06-22-3",
        destination: "/zh/blog/keto-flu-electrolytes-remedy",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-22-3",
        destination: "/en/blog/keto-flu-electrolytes-remedy",
        statusCode: 301,
      },
      // 8. 增肌平台期突破 (26-06-22-1 -> break-muscle-growth-plateau)
      {
        source: "/zh/blog/26-06-22-1",
        destination: "/zh/blog/break-muscle-growth-plateau",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-22-1",
        destination: "/en/blog/break-muscle-growth-plateau",
        statusCode: 301,
      },
      // 9. 渐进超负荷 (26-06-23-1 -> progressive-overload-hypertrophy-guide)
      {
        source: "/zh/blog/26-06-23-1",
        destination: "/zh/blog/progressive-overload-hypertrophy-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-23-1",
        destination: "/en/blog/progressive-overload-hypertrophy-guide",
        statusCode: 301,
      },
      // 10. 自然睾酮提升 (26-06-23-2 -> natural-testosterone-optimization)
      {
        source: "/zh/blog/26-06-23-2",
        destination: "/zh/blog/natural-testosterone-optimization",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-23-2",
        destination: "/en/blog/natural-testosterone-optimization",
        statusCode: 301,
      },
      // 11. 增肌不长脂 Lean Bulk (26-06-24-1 -> lean-bulk-mastery-guide)
      {
        source: "/zh/blog/26-06-24-1",
        destination: "/zh/blog/lean-bulk-mastery-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-24-1",
        destination: "/en/blog/lean-bulk-mastery-guide",
        statusCode: 301,
      },
      // 12. 科学显现腹肌 (26-06-25-1 -> visible-abs-science-guide)
      {
        source: "/zh/blog/26-06-25-1",
        destination: "/zh/blog/visible-abs-science-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-25-1",
        destination: "/en/blog/visible-abs-science-guide",
        statusCode: 301,
      },
      // 专项批次二：归档文章旧 Slug 规范化 301 重定向 (12 篇，共 24 条)
      // 1. HIIT 燃脂进阶指南 (26-06-21-1 -> hiit-fat-loss-advanced-guide)
      {
        source: "/zh/blog/26-06-21-1",
        destination: "/zh/blog/hiit-fat-loss-advanced-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-21-1",
        destination: "/en/blog/hiit-fat-loss-advanced-guide",
        statusCode: 301,
      },
      // 2. 皮质醇腹部脂肪钝化协议 (26-06-21-2 -> cortisol-belly-fat-stress-reset)
      {
        source: "/zh/blog/26-06-21-2",
        destination: "/zh/blog/cortisol-belly-fat-stress-reset",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-21-2",
        destination: "/en/blog/cortisol-belly-fat-stress-reset",
        statusCode: 301,
      },
      // 3. 女性身体重组塑身全攻略 (26-06-24-2 -> female-body-recomposition-guide)
      {
        source: "/zh/blog/26-06-24-2",
        destination: "/zh/blog/female-body-recomposition-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-24-2",
        destination: "/en/blog/female-body-recomposition-guide",
        statusCode: 301,
      },
      // 4. 女性翘臀训练终极指南 (26-06-26-1 -> female-glute-training-guide)
      {
        source: "/zh/blog/26-06-26-1",
        destination: "/zh/blog/female-glute-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-26-1",
        destination: "/en/blog/female-glute-training-guide",
        statusCode: 301,
      },
      // 5. 女性肩背塑形指南 (26-06-27-1 -> womens-shoulder-back-sculpting)
      {
        source: "/zh/blog/26-06-27-1",
        destination: "/zh/blog/womens-shoulder-back-sculpting",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-27-1",
        destination: "/en/blog/womens-shoulder-back-sculpting",
        statusCode: 301,
      },
      // 6. 女性手臂塑形终极指南 (26-06-28-1 -> womens-arm-sculpting-guide)
      {
        source: "/zh/blog/26-06-28-1",
        destination: "/zh/blog/womens-arm-sculpting-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-28-1",
        destination: "/en/blog/womens-arm-sculpting-guide",
        statusCode: 301,
      },
      // 7. 女性核心训练指南 (26-06-29-1 -> womens-core-training-guide)
      {
        source: "/zh/blog/26-06-29-1",
        destination: "/zh/blog/womens-core-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-29-1",
        destination: "/en/blog/womens-core-training-guide",
        statusCode: 301,
      },
      // 8. 女性腿部塑形终极指南 (26-06-30-1 -> womens-leg-sculpting-guide)
      {
        source: "/zh/blog/26-06-30-1",
        destination: "/zh/blog/womens-leg-sculpting-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-06-30-1",
        destination: "/en/blog/womens-leg-sculpting-guide",
        statusCode: 301,
      },
      // 9. 女性燃脂训练终极指南 (26-07-01-1 -> womens-fat-loss-training-guide)
      {
        source: "/zh/blog/26-07-01-1",
        destination: "/zh/blog/womens-fat-loss-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-01-1",
        destination: "/en/blog/womens-fat-loss-training-guide",
        statusCode: 301,
      },
      // 10. 女性家庭健身终极指南 (26-07-03-1 -> womens-home-workout-guide)
      {
        source: "/zh/blog/26-07-03-1",
        destination: "/zh/blog/womens-home-workout-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-03-1",
        destination: "/en/blog/womens-home-workout-guide",
        statusCode: 301,
      },
      // 11. 女性恢复训练指南 (26-07-04-1 -> womens-recovery-training-guide)
      {
        source: "/zh/blog/26-07-04-1",
        destination: "/zh/blog/womens-recovery-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-04-1",
        destination: "/en/blog/womens-recovery-training-guide",
        statusCode: 301,
      },
      // 12. 女性柔韧性训练指南 (26-07-05-1 -> womens-flexibility-training-guide)
      {
        source: "/zh/blog/26-07-05-1",
        destination: "/zh/blog/womens-flexibility-training-guide",
        statusCode: 301,
      },
      {
        source: "/en/blog/26-07-05-1",
        destination: "/en/blog/womens-flexibility-training-guide",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
