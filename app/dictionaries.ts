const dictionaries = {
  en: {
    title: "Fitness & Health Toolkit",
    description: "Welcome to my fitness blog. Use our smart, science-backed tools to track your health.",
    bfpTool: "Body Fat Calculator",
    bmrTool: "BMR Calculator",
    waterTool: "Daily Water Calculator",
    ibwTool: "Ideal Weight Calculator",
    hrTool: "Burn Fat Heart Rate",
    latestArticles: "Latest Health Articles",
    backToHome: "← Back to Home",
    articleNotFound: "Article not found.",
    readMore: "Read Article →",
  },
  zh: {
    title: "健身与健康智能工具箱",
    description: "欢迎来到我的健身博客。使用科学的数据工具精确追踪您的身体与健康指标。",
    bfpTool: "体脂率计算器",
    bmrTool: "BMR 基础代谢计算",
    waterTool: "每日饮水量计算",
    ibwTool: "标准体重计算",
    hrTool: "燃脂心率区间计算",
    latestArticles: "最新健康文章",
    backToHome: "← 返回首页",
    articleNotFound: "抱歉，文章未找到。",
    readMore: "阅读文章 →",
  },
};

export const getDictionary = async (lang: 'en' | 'zh') => {
  return dictionaries[lang] || dictionaries.en;
};