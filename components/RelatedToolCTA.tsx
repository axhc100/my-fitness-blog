import Link from 'next/link';
import { Lang } from '@/app/lib/seo';

interface RelatedToolCTAProps {
  lang: Lang;
  category?: string;
  tags?: string[];
  content?: string;
  slug?: string;
}

interface ToolInfo {
  slug: string;
  icon: string;
  title: { en: string; zh: string };
  desc: { en: string; zh: string };
  badge: { en: string; zh: string };
}

const TOOLS: Record<string, ToolInfo> = {
  macro: {
    slug: 'macro',
    icon: '🍳',
    title: { en: 'Macro & Calorie Calculator', zh: '三大营养素与热量计算器' },
    desc: {
      en: 'Calculate your exact daily protein, carbohydrate, and fat targets to match your goals.',
      zh: '精准测算增肌或减脂所需的蛋白质、碳水与脂肪克数及热量分配。',
    },
    badge: { en: 'Recommended for Nutrition & Gains', zh: '增肌减脂营养推荐' },
  },
  splits: {
    slug: 'splits',
    icon: '🤸‍♂️',
    title: { en: 'Splits & Flexibility Tracker', zh: '一字马柔韧度进度打卡' },
    desc: {
      en: 'Track your daily stretching routines and quantify your flexibility transformation.',
      zh: '记录每日拉伸进度，量化你的全身柔韧性与活动度蜕变。',
    },
    badge: { en: 'Recommended for Yoga & Mobility', zh: '瑜伽与拉伸活动度推荐' },
  },
  bfp: {
    slug: 'bfp',
    icon: '🔥',
    title: { en: 'Body Fat Percentage Calculator', zh: '体脂率智能计算器' },
    desc: {
      en: 'Quickly estimate your body composition and track changes across cutting cycles.',
      zh: '快速估算身体脂肪百分比，科学监控体态塑形变化。',
    },
    badge: { en: 'Recommended for Body Sculpting', zh: '塑身体态监控推荐' },
  },
  hr: {
    slug: 'hr',
    icon: '❤️',
    title: { en: 'Fat-Burning Heart Rate Calculator', zh: '最佳燃脂心率区间计算器' },
    desc: {
      en: 'Find your optimal Zone 2 cardio heart rate to maximize fat oxidation efficiently.',
      zh: '锁定最高效的 Zone 2 有氧减脂心率区间，让跑步与有氧事半功倍。',
    },
    badge: { en: 'Recommended for Cardio & Endurance', zh: '有氧燃脂耐力推荐' },
  },
  bmr: {
    slug: 'bmr',
    icon: '⚡',
    title: { en: 'BMR & TDEE Calculator', zh: '基础代谢率与每日消耗计算' },
    desc: {
      en: 'Find your baseline metabolic rate using the science-backed Mifflin-St Jeor formula.',
      zh: '基于经典科学公式测算你的静息基础代谢，掌握每日热量收支。',
    },
    badge: { en: 'Recommended for Energy Balance', zh: '代谢与热量平衡推荐' },
  },
  water: {
    slug: 'water',
    icon: '💧',
    title: { en: 'Daily Hydration Target Tool', zh: '每日科学补水计算器' },
    desc: {
      en: 'Get a personalized hydration goal tailored to your body weight and workout intensity.',
      zh: '结合体重与运动出汗量，定制你的每日健康补水量。',
    },
    badge: { en: 'Recommended for Daily Health', zh: '健康生活必备推荐' },
  },
  ibw: {
    slug: 'ibw',
    icon: '⚖️',
    title: { en: 'Ideal Body Weight Calculator', zh: '标准理想体重计算器' },
    desc: {
      en: 'Estimate your healthiest target weight range based on proven physiological formulas.',
      zh: '使用国际医学标准公式，测算符合你身高的黄金健康体重区间。',
    },
    badge: { en: 'Recommended for Weight Goals', zh: '体态目标推荐' },
  },
};

// 针对文章主题进行精准映射
const SLUG_TOOL_MAP: Record<string, keyof typeof TOOLS> = {
  // 1. 肌肥大 -> 宏量 / BMR
  'hypertrophy-split-periodization': 'macro',
  'hypertrophy-fatigue-deload-guide': 'bmr',
  'daily-protein-intake-guide': 'macro',
  'how-to-calculate-bmr': 'bmr',
  '26-11-13-1': 'macro',
  '26-11-06-1': 'bmr',
  // 2. HYROX / 跑步 / 有氧耐力 -> 燃脂心率 / 补水
  'hyrox-training-guide': 'hr',
  'hyrox-race-prep-guide': 'hr',
  '26-11-12-1': 'hr',
  '26-10-21-1': 'hr',
  '26-10-29-1': 'hr',
  '26-11-05-1': 'hr',
  // 3. 单腿动力链 / 下肢灵活性 -> 一字马柔韧度 / BFP
  'single-leg-training-guide': 'splits',
  '26-11-11-1': 'splits',
  '26-11-04-1': 'splits',
  // 4. 肋骨外翻 / 沙漏细腰 / 体态塑造 -> 体脂率 / 理想体重 (体态相关)
  'rib-flare-correction': 'bfp',
  'anterior-pelvic-tilt-correction': 'bfp',
  '26-11-10-1': 'bfp',
  '26-11-03-1': 'bfp',
  // 5. 阴瑜伽 / 筋膜健康 -> 每日补水 (水合作用) / 柔韧拉伸
  'yin-yoga-fascia-guide': 'water',
  'pilates-vinyasa-core-alignment': 'splits',
  '26-11-09-1': 'water',
  '26-11-02-1': 'splits',
  '26-10-31-1': 'water',
  '26-11-07-1': 'water',
};

export default function RelatedToolCTA({
  lang,
  category,
  tags = [],
  content = '',
  slug = '',
}: RelatedToolCTAProps) {
  // 1. 优先采用明确的 slug 精准映射
  if (slug && SLUG_TOOL_MAP[slug]) {
    const matched = TOOLS[SLUG_TOOL_MAP[slug]];
    return renderCTA(matched, lang);
  }

  // 2. 启发式内容匹配（按优先级严密分支，防止通用词霸屏）
  const text = `${category || ''} ${tags.join(' ')}`.toLowerCase();

  let matchedTool = TOOLS.macro;
  if (/hyrox|cardio|running|endurance|heart rate|心率|跑步|有氧|耐力/.test(text)) {
    matchedTool = TOOLS.hr;
  } else if (/rib flare|hourglass|waist|vacuum|posture|sculpt|体态|肋骨|细腰|真空腹|塑形/.test(text)) {
    matchedTool = TOOLS.bfp;
  } else if (/yin yoga|fascia|hydration|water|recovery|sleep|阴瑜伽|筋膜|水合|补水|睡眠|恢复/.test(text)) {
    matchedTool = TOOLS.water;
  } else if (/split|yoga|flexibility|mobility|stretch|柔韧|拉伸|活动度|一字马|普拉提/.test(text)) {
    matchedTool = TOOLS.splits;
  } else if (/hypertrophy|muscle|protein|bulking|cutting|肌肥大|增肌|蛋白质|分化|热量/.test(text)) {
    matchedTool = TOOLS.macro;
  } else if (/metabolism|bmr|tdee|代谢|基础代谢/.test(text)) {
    matchedTool = TOOLS.bmr;
  }

  return renderCTA(matchedTool, lang);
}

function renderCTA(matchedTool: ToolInfo, lang: Lang) {
  return (
    <div className="my-10 p-6 md:p-8 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white rounded-3xl border border-blue-100/80 shadow-sm relative overflow-hidden group hover:shadow-md hover:border-blue-200 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-blue-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
            {matchedTool.icon}
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100/80 text-blue-700 mb-1.5">
              ⚡ {matchedTool.badge[lang]}
            </span>
            <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">
              {matchedTool.title[lang]}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed max-w-lg">
              {matchedTool.desc[lang]}
            </p>
          </div>
        </div>

        <Link
          href={`/${lang}/tools/${matchedTool.slug}`}
          className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-sm hover:shadow active:scale-95 transition-all text-center shrink-0 flex items-center justify-center gap-1.5"
        >
          <span>{lang === 'zh' ? '免费使用工具' : 'Try Free Tool'}</span>
          <span>→</span>
        </Link>
      </div>

      {/* Decorative background glow */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
