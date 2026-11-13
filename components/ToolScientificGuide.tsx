import React from 'react';

export type ToolSlug = 'bmr' | 'bfp' | 'macro' | 'hr' | 'ibw' | 'water' | 'splits' | 'bmi' | '1rm' | 'protein' | 'fat-loss' | 'volume';

interface ToolScientificGuideProps {
  slug: ToolSlug;
  lang: 'en' | 'zh';
}

interface GuideContent {
  title: string;
  badge: string;
  formulaLabel: string;
  formula: string;
  formulaNote?: string;
  backgroundTitle: string;
  background: string[];
  audienceTitle: string;
  audience: string[];
  limitationsTitle: string;
  limitations: string[];
  referencesTitle: string;
  references: string[];
}

const contentData: Record<ToolSlug, { en: GuideContent; zh: GuideContent }> = {
  bmr: {
    en: {
      title: "Scientific Methodology: Mifflin-St Jeor Equation",
      badge: "Clinical Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulation",
      formula: "Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5\nWomen: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161",
      formulaNote: "Multiplied by Physical Activity Level (PAL, 1.2 to 1.9) to estimate Total Daily Energy Expenditure (TDEE).",
      backgroundTitle: "Historical Background & Validation",
      background: [
        "The Mifflin-St Jeor equation was formulated in 1990 by researchers M. D. Mifflin and S. T. St Jeor at the University of Nevada School of Medicine, analyzing indirect calorimetry data across hundreds of healthy male and female subjects.",
        "In 2005, the American Dietetic Association (ADA, now Academy of Nutrition and Dietetics) conducted an exhaustive systematic review evaluating 10 historical predictive equations. Mifflin-St Jeor was officially identified as the most reliable, predicting resting metabolic rate within 10% of measured values in over 82% of non-obese and obese individuals, substantially outperforming the 1919 Harris-Benedict equation."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "Weight Management: Establishes a scientifically sound caloric floor to prevent severe metabolic down-regulation during fat loss.",
        "Hypertrophy Planning: Used as the base baseline before calculating a 5-15% caloric surplus for muscle synthesis.",
        "Nutrition Professionals: Serves as the primary clinical baseline when indirect calorimetry carts are unavailable."
      ],
      limitationsTitle: "Limitations & Clinical Considerations",
      limitations: [
        "Lean Mass Invariance: The formula relies on total body weight rather than fat-free mass (FFM). For competitive bodybuilders or individuals with sub-10% body fat, formulas factoring in lean mass (such as Katch-McArdle) are more accurate.",
        "Metabolic Adaptation: Chronic prolonged caloric deprivation or extreme low-calorie diets cause adaptive thermogenesis, meaning actual expenditure may drop 5-15% below the static predicted figure."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.",
        "Frankenfield D, Roth-Yousey L, Compher C. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults. J Am Diet Assoc. 2005;105(5):775-789."
      ]
    },
    zh: {
      title: "科学依据与推导：Mifflin-St Jeor 公式",
      badge: "临床循证标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "男性: BMR = (10 × 体重kg) + (6.25 × 身高cm) - (5 × 年龄) + 5\n女性: BMR = (10 × 体重kg) + (6.25 × 身高cm) - (5 × 年龄) - 161",
      formulaNote: "日常总消耗 (TDEE) = 基础代谢率 (BMR) × 身体活动系数 (PAL, 1.2 ~ 1.9)。",
      backgroundTitle: "学术背景与临床验证",
      background: [
        "Mifflin-St Jeor 公式由内华达大学医学院学者 M. D. Mifflin 与 S. T. St Jeor 于 1990 年提出。该研究基于数百名不同年龄、体脂分布的成年人间接热量测定（Indirect Calorimetry）真实代谢实验数据。",
        "美国营养与饮食学会（Academy of Nutrition and Dietetics，前身为 ADA）在 2005 年针对历史上现存的 10 大热量预测方程进行了全景系统性循证综述。结果证实，Mifflin-St Jeor 公式在非肥胖及肥胖人群中测量误差均在 10% 以内，准确率达到 82% 以上，全面优于 1919 年制定的经典 Harris-Benedict 方程，被确认为现代临床营养学最可靠的基准。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "科学减脂人群：计算维持机体基本生命体征所需的最低能量底线，避免过度节食导致肌肉流失与甲状腺素分泌受抑制。",
        "增肌塑形人群：作为每日总能量消耗 (TDEE) 计算的基准点，合理上浮 5%~15% 的热量盈余以促进肌原纤维合成。",
        "健康管理与备赛：协助健身教练、临床营养师在缺乏大型气体代谢仪设备时快速制定个体化营养膳食方案。"
      ],
      limitationsTitle: "局限性与特殊人群考量",
      limitations: [
        "未纳入瘦体重（去脂体重）：该公式主要以总体重作为自变量。对于体脂率极低的专业健美运动员或健力选手，骨骼肌比例极高，建议参考结合去脂体重的 Katch-McArdle 公式。",
        "代谢适应（Metabolic Adaptation）：长期处于大幅热量缺口状态的个体，机体自发性非运动热量消耗 (NEAT) 和器官耗能会产生下调适应，实际消耗可能低于理论公式估算值。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Mifflin MD, St Jeor ST, Hill LA, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.",
        "Frankenfield D, Roth-Yousey L, Compher C. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults. J Am Diet Assoc. 2005;105(5):775-789."
      ]
    }
  },
  bfp: {
    en: {
      title: "Scientific Methodology: US Navy Circumference Method & BMI Integration",
      badge: "Anthropometric Standard (E-E-A-T)",
      formulaLabel: "Biometric Formulations",
      formula: "Men: %Fat = 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450\nWomen: %Fat = 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450",
      formulaNote: "All circumferences measured in centimeters (cm). Siri equation utilized for body density conversion.",
      backgroundTitle: "Historical Background & Validation",
      background: [
        "Developed by researchers J.A. Hodgdon and M.B. Beckett in 1984 at the Naval Health Research Center (San Diego), the US Navy Circumference Method was engineered to deliver a field-expedient, non-invasive alternative to hydrostatic underwater weighing and dual-energy X-ray absorptiometry (DEXA).",
        "By utilizing logarithmic relationships between abdominal circumferences (visceral/subcutaneous adipose tissue) and neck circumference (independent indicator of lean body mass and skeletal frame size), the model achieves a remarkably strong correlation (r > 0.88) with DEXA gold-standard scans."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "Fitness Enthusiasts & Body Recomposition: Evaluating true compositional changes when scale weight remains stagnant due to simultaneous fat loss and muscle hypertrophy.",
        "Athletes & Military Fitness: Assessing physical readiness standards without requiring clinical laboratory equipment or expensive scanning clinics.",
        "Cardiovascular Health Screening: Monitoring abdominal circumference ratios directly associated with visceral adiposity and metabolic syndrome risks."
      ],
      limitationsTitle: "Limitations & Measurement Accuracy",
      limitations: [
        "Measurement Technique Sensitivity: Inconsistent tape tension or misaligning the tape at the iliac crest vs narrowest waist point can introduce ±2-3% variance. Measure consistently in the morning fasted.",
        "Trapezius & Neck Hypertrophy: Heavy strength athletes with hypertrophied neck musculature may register slightly lower body fat percentages, while individuals with water retention or abdominal bloating will skew higher."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Report No. 84-29. Naval Health Research Center; 1984.",
        "Babcock CJ, Stewart AD, Phillips SM. Validity of multi-frequency bioelectrical impedance and anthropometry against DEXA in athletic populations. Eur J Clin Nutr. 2021;75:845-853."
      ]
    },
    zh: {
      title: "科学依据与推导：美国海军体围法 (US Navy Method)",
      badge: "人体测量学标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "男性: %体脂 = 495 / (1.0324 - 0.19077 × lg(腰围-颈围) + 0.15456 × lg(身高)) - 450\n女性: %体脂 = 495 / (1.29579 - 0.35004 × lg(腰围+臀围-颈围) + 0.22100 × lg(身高)) - 450",
      formulaNote: "所有围度单位为厘米 (cm)，采用 Siri 体密度转换公式标准化输出。",
      backgroundTitle: "学术背景与临床验证",
      background: [
        "美国海军体围法由圣地亚哥海军健康研究中心学者 J.A. Hodgdon 与 M.B. Beckett 于 1984 年研发，初衷是替代操作复杂、成本高昂的水下称重法（Hydrostatic Weighing）及双能X射线吸收仪（DEXA）。",
        "该算法利用对数几何关系，通过测量人体脂肪最易沉积的腰腹部与臀部围度，对比代表骨架与瘦体重的颈部围度，在万人级军警大样本验证中表现出与 DEXA 扫描高达 0.88 以上的相关系数，是目前全球应用最广的无创体脂测定标准。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "体型重塑（身体再成分化）：在体重秤数字没有显著变化时，准确监测“减脂”与“增肌”同时发生的体质改变。",
        "大众健康体检：通过腰围与体脂率监控内脏脂肪堆积，早期预警胰岛素抵抗与心血管代谢疾病隐患。",
        "居家日常监测：无需购买昂贵且易受饮水量影响的生物电阻抗（BIA）体脂秤，仅需一把皮尺即可获得高重复性指标。"
      ],
      limitationsTitle: "局限性与测量注意事项",
      limitations: [
        "皮尺拉力与位置偏差：皮尺勒入皮肤过紧或测量位置（如肚脐水平 vs 最窄腰窝）不一致会导致 2%~3% 的浮动。建议清晨空腹排便后、在呼气末放松状态下测量。",
        "斜方肌过度发达：经常进行硬拉或力量举训练的运动员，颈围可能因肌肉增大而偏粗，导致算法轻微低估体脂率；同样，餐后腹胀会轻度高估体脂。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center; 1984.",
        "Gallagher D, Heymsfield SB, et al. Healthy percentage body fat ranges: an approach for developing guidelines based on body mass index. Am J Clin Nutr. 2000;72(3):694-701."
      ]
    }
  },
  macro: {
    en: {
      title: "Scientific Methodology: Evidence-Based Macronutrient Allocation",
      badge: "Sports Nutrition Standard (E-E-A-T)",
      formulaLabel: "Macronutrient Distribution Principles",
      formula: "Protein: 1.6 - 2.2 g/kg body weight (4 kcal/g)\nFats: 20% - 35% of Total Daily Calories (9 kcal/g)\nCarbohydrates: Remaining Caloric Balance (4 kcal/g)",
      formulaNote: "Adjusted for energy status: hypocaloric deficit (cutting), eucaloric (maintenance), or hypercaloric (bulking).",
      backgroundTitle: "Nutritional Science & Clinical Consensus",
      background: [
        "Contemporary sports nutrition has progressed beyond arbitrary percentage ratios (e.g. 40/30/30) toward absolute gram-per-kilogram anchoring, as codified by the International Society of Sports Nutrition (ISSN) and the American College of Sports Medicine (ACSM).",
        "Protein requirements are determined by muscle protein synthesis (MPS) saturation and leucine thresholds. Dietary fat intake is governed by endocrine requirements (steroid hormone and testosterone synthesis), while carbohydrates are dynamically allocated to support high-intensity glycolytic demands and glycogen resynthesis."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "Resistance Trainees: Maximizing myofibrillar hypertrophy while maintaining optimal nitrogen balance during hypocaloric dieting phases.",
        "Endurance Athletes: Scaling carbohydrate availability to match glycogen depletion rates in training sessions exceeding 60 minutes.",
        "General Metabolic Optimization: Providing balanced satiety through dietary fiber and protein thermic effect (TEF) without micronutrient deficiencies."
      ],
      limitationsTitle: "Limitations & Physiological Variability",
      limitations: [
        "Obese Populations (BMI > 30): Allocating protein strictly by total scale weight may result in unnecessarily excessive intake. Utilizing goal weight or lean body mass (LBM) produces a more practical target.",
        "Individual Glycemic Tolerance: Trainees with impaired insulin sensitivity or sedentary occupations often thrive with higher fat ratios and lower carb percentages, whereas competitive athletes require rapid glycogen replenishment."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Jäger R, Kerksick CM, Campbell BI, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.",
        "Thomas DT, Erdman KA, Burke LM. American College of Sports Medicine Joint Position Statement: Nutrition and Athletic Performance. Med Sci Sports Exerc. 2016;48(3):543-568."
      ]
    },
    zh: {
      title: "科学依据与推导：循证运动营养宏量营养素分配法",
      badge: "运动营养学标准 (E-E-A-T)",
      formulaLabel: "核心分配原则",
      formula: "蛋白质: 1.6 ~ 2.2 克/公斤体重 (4 大卡/克)\n脂肪: 占每日总热量 20% ~ 35% (9 大卡/克)\n碳水化合物: 剩余热量缺口动态填补 (4 大卡/克)",
      formulaNote: "根据减脂（热量缺口）、维持期、增肌（热量盈余）不同生理周期自适应调整。",
      backgroundTitle: "学术背景与临床共识",
      background: [
        "现代运动营养学已经全面摒弃了传统固定的“一刀切”百分比法（如早期的 40:30:30），转而采用由国际运动营养学会（ISSN）与美国运动医学会（ACSM）权威推荐的“绝对克数/公斤体重锚定法”。",
        "在营养素分配中，蛋白质首先根据肌肉蛋白合成（MPS）与亮氨酸阈值进行克数固定；脂肪根据维持内分泌轴稳态（如睾酮、雌激素合成）设定热量占比下限；剩余热量则全部由碳水化合物补齐，用以充盈肌糖原储备与保障高强度神经系统功能。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "抗阻训练与健美增肌：确保骨骼肌处于正氮平衡，并在减脂期最大限度防止肌肉分解与基础代谢塌陷。",
        "耐力跑与耐力运动：根据训练时长动态调整碳水摄入，防止中枢神经疲劳与“撞墙”现象。",
        "灵活饮食者（IIFYM / Macro Tracking）：告别严苛盲目的单一食物节食法，在掌控三大营养素的前提下享受多样化美食。"
      ],
      limitationsTitle: "局限性与个体化调整",
      limitations: [
        "高体脂人群（BMI > 30）：若直接按照总体重计算蛋白质克数，可能导致摄入量偏高。建议以“目标体重”或“去脂体重（LBM）”作为计算乘数更为科学合理。",
        "胰岛素敏感度差异：久坐缺乏锻炼者对高碳水膳食的利用率较低，而规律高强度训练者的糖原利用率极高，需根据个人血糖反应与耐受性动态微调。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Jäger R, Kerksick CM, Campbell BI, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.",
        "Helms ER, Aragon AA, Fitschen PJ. Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. J Int Soc Sports Nutr. 2014;11:20."
      ]
    }
  },
  hr: {
    en: {
      title: "Scientific Methodology: Tanaka Equation & Karvonen Target Heart Rate",
      badge: "Cardiovascular Science (E-E-A-T)",
      formulaLabel: "Cardiorespiratory Formulations",
      formula: "Tanaka Max HR: HR_max = 208 - (0.7 × Age)\nKarvonen Target Zone: Target HR = HR_rest + ((HR_max - HR_rest) × Intensity%)\nTraditional Fox Formula: HR_max = 220 - Age",
      formulaNote: "Zone 2 (Fat Oxidation Peak): 60% to 70% of Max HR (or 50%-60% Heart Rate Reserve).",
      backgroundTitle: "Historical Background & Clinical Validation",
      background: [
        "For decades, the standard formula '220 - Age' (Fox & Haskell, 1970) was ubiquitously applied. However, meta-analyses published in the Journal of the American College of Cardiology demonstrated that the Fox formula significantly overestimates maximum heart rate in young adults and underestimates it in older populations (standard error ±11-12 bpm).",
        "The Tanaka equation (Tanaka, Monahan, & Seals, 2001), developed through rigorous laboratory testing of 18,712 subjects across 351 studies, is now recognized as the gold standard for age-predicted maximal heart rate. Combined with Dr. Martti Karvonen's Heart Rate Reserve (HRR) methodology, it provides exceptionally precise exercise intensity zones."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "Zone 2 Aerobic Training: Optimizing mitochondrial density and lipid clearance without triggering excessive sympathetic nervous system fatigue.",
        "Fat Loss Optimization: Identifying the FatMax intensity zone where respiratory exchange ratios (RER) indicate peak absolute fatty acid oxidation.",
        "Endurance & Running Athletes: Calibrating heart rate thresholds for polarized 80/20 aerobic base training."
      ],
      limitationsTitle: "Limitations & Physiological Confounders",
      limitations: [
        "Cardiovascular Medications: Beta-blockers, calcium channel blockers, and certain stimulants artificially suppress or elevate heart rate, rendering standard predictive formulas inaccurate. RPE (Rate of Perceived Exertion) should be used instead.",
        "Cardiac Drift: During prolonged workouts (>45 min) in hot environments, heart rate naturally drifts upward due to thermoregulatory cutaneous vasodilation even when energy expenditure remains constant."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol. 2001;37(1):153-156.",
        "Achten J, Jeukendrup AE. Optimizing fat oxidation through exercise and diet. Nutrition. 2004;20(7-8):716-727."
      ]
    },
    zh: {
      title: "科学依据与推导：Tanaka 公式与 Karvonen 目标心率法",
      badge: "心血管运动生理学标准 (E-E-A-T)",
      formulaLabel: "核心心率推导公式",
      formula: "Tanaka 修正最大心率: HR_max = 208 - (0.7 × 年龄)\n传统通用公式: HR_max = 220 - 年龄\nKarvonen 储备心率靶心率: 目标心率 = 静息心率 + (最大心率 - 静息心率) × 运动强度%",
      formulaNote: "黄金燃脂区间（Zone 2 有氧耐力区）：通常对应最大心率的 60% ~ 70%。",
      backgroundTitle: "学术背景与临床演进",
      background: [
        "半个世纪以来，大众普遍使用“220 - 年龄”简易公式（由 Fox 与 Haskell 于 1970 年提出）。然而发表在《美国心脏病学会杂志（JACC）》的大规模循证研究指出，经典公式在年轻人中容易高估最大心率，而在中老年人群中显著低估，标准差高达 ±11~12 bpm。",
        "科罗拉多大学心血管生理学家 Hirofumi Tanaka 教授团队在分析了 351 项独立研究、涵盖 18,712 名受试者的临床数据后，提出了更精确的 Tanaka 方程（208 - 0.7 × 年龄）。结合芬兰学者 Martti Karvonen 提出的“储备心率法（HRR）”，能有效排除静息心率个体差异，实现精确的靶心率监控。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "高效减脂人群：精准锚定最大脂肪氧化率区间（FatMax），在该心率强度下脂肪供能比最高，有效燃烧内脏与皮下脂肪。",
        "跑步与耐力选手：指导“二区训练法（Zone 2 Training）”，增强心肌收缩力、毛细血管密度与线粒体氧化酶活性。",
        "中老年与心肺康复者：设定安全的有氧运动上限，避免无氧乳酸堆积与交感神经系统过度负荷。"
      ],
      limitationsTitle: "局限性与生理干扰因素",
      limitations: [
        "降压与心脏药物影响：服用 β 受体阻滞剂（如美托洛尔）的患者心率反应被药物抑制，此时应参考 RPE 主观疲劳感觉量表（Borg Scale），而非纯公式计算值。",
        "心率漂移现象（Cardiac Drift）：在高温高湿环境下长时间运动（超过 45 分钟），即使配速不变，由于体温调节脱水与皮肤血流增加，心率也会逐渐爬升 5~15 次/分。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol. 2001;37(1):153-156.",
        "Achten J, Jeukendrup AE. Optimizing fat oxidation through exercise and diet. Nutrition. 2004;20(7-8):716-727."
      ]
    }
  },
  ibw: {
    en: {
      title: "Scientific Methodology: Devine Equation & Anthropometric Indexing",
      badge: "Clinical Pharmacokinetics Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulations",
      formula: "Devine (Men): IBW (kg) = 50.0 + 2.3 × (height in inches - 60)\nDevine (Women): IBW (kg) = 45.5 + 2.3 × (height in inches - 60)\nHealthy WHO Range: Weight (kg) = (18.5 to 24.9) × height(m)²",
      formulaNote: "Based on height above 5 feet (152.4 cm). Range displayed indicates a healthy ±10% clinical buffer.",
      backgroundTitle: "Historical Background & Pharmacological Origin",
      background: [
        "The Ideal Body Weight (IBW) formulation was originally published in 1974 by Dr. Ben J. Devine in Drug Intelligence & Clinical Pharmacy. Designed to adjust pharmacological drug dosages (e.g. aminoglycosides, digoxin, theophylline) based on expected lean tissue volume rather than total scale weight.",
        "Subsequent large-scale validation studies by Robinson (1983) and Miller (1983) verified Devine's formula as the benchmark standard for clinical nutrition, respiratory tidal volume calibration (ARDS ventilation protocols), and baseline anthropometric screening."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "General Health & Weight Assessment: Provides a standardized, objective benchmark for non-athletic adults evaluating overall body weight status.",
        "Clinical & Dietetic Baseline: Widely utilized in medical nutrition therapy to compute energy requirements for hospitalized or clinical patients.",
        "Healthy Range Anchor: Combined with WHO Body Mass Index (BMI 18.5-24.9) thresholds to define an evidence-based sustainable weight envelope."
      ],
      limitationsTitle: "Limitations & Muscular Bias",
      limitations: [
        "Musculoskeletal Blindness: The formula assumes an average ratio of bone density, organ weight, and skeletal muscle. Resistance-trained athletes and individuals with broad bone structures will frequently be classified as 'overweight' despite low body fat.",
        "Short Stature Invariance: In individuals shorter than 5 feet (152.4 cm), the linear extrapolation loses statistical power. Waist-to-height ratio (WHtR < 0.5) is a superior risk metric in this cohort."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650-655.",
        "Pai MP, Paloucek FP. The origin of the 'ideal' body weight equations. Ann Pharmacother. 2000;34(9):1066-1069."
      ]
    },
    zh: {
      title: "科学依据与推导：Devine 理想体重公式与人体指标学",
      badge: "临床药代动力学标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "男性: 理想体重 (kg) = 50.0 + 2.3 × (身高英寸 - 60)\n女性: 理想体重 (kg) = 45.5 + 2.3 × (身高英寸 - 60)\nWHO 健康范围基准: 体重 = (18.5 ~ 24.9) × 身高(m)²",
      formulaNote: "以 5 英尺（152.4 厘米）为基准高度。工具展示结果已结合临床推荐的 ±10% 健康缓冲区间。",
      backgroundTitle: "学术背景与临床起源",
      background: [
        "理想体重（IBW）经典公式由 Ben J. Devine 博士于 1974 年发表在《药物智能与临床药学》上。其最初设计初衷是为了在临床静脉给药（如氨基糖苷类抗生素、地高辛）时，按照患者的去脂体液分布容量而非脂肪总体重来精确测定给药剂量。",
        "此后，Robinson（1983年）与 Miller（1983年）的多项随访研究证实了 Devine 公式的优异稳定性。该公式现已被世界卫生组织（WHO）及全球临床医学、急重症呼吸机通气量设定（ARDSNet 标准）广泛采纳为衡量健康标准体重的金标准之一。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "大众健康体重评估：为普通成年人提供不偏激、符合健康寿命预期的基准体重参考值，避免盲目追求极度纤瘦。",
        "医学与临床营养管理：为营养师提供计算病患基础热量与重症监护营养支持的理论锚点。",
        "长周期减重规划：为超重人群提供科学的阶段性目标体重区间，避免设定脱离人体生理学的极端目标。"
      ],
      limitationsTitle: "局限性与特殊人群分析",
      limitations: [
        "无法区分肌肉与脂肪：公式假设受试者具有一般人群的平均肌肉与骨骼比例。对于经常从事抗阻力量训练、肌肉量充沛的健身人士，体重超出公式标准并不代表肥胖。",
        "矮身材算法偏差：身高在 152 厘米以下的群体线性推导误差有所增加，建议配合腰围身高比（WHtR < 0.5）进行综合健康评估。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650-655.",
        "Pai MP, Paloucek FP. The origin of the 'ideal' body weight equations. Ann Pharmacother. 2000;34(9):1066-1069."
      ]
    }
  },
  water: {
    en: {
      title: "Scientific Methodology: Hydration Physiology & Daily Fluid Needs",
      badge: "Clinical Hydration Standard (E-E-A-T)",
      formulaLabel: "Fluid Requirement Formula",
      formula: "Baseline Hydration: Daily Water (ml) = Body Weight (kg) × 35 ml\nExercise Adjustment: Add 500 - 1000 ml per 60 minutes of moderate-to-vigorous physical activity\nIOM Baseline: 3.7 L/day for adult men, 2.7 L/day for adult women (from all beverages and food)",
      formulaNote: "Total daily fluid requirement increases with ambient temperature, humidity, and elevation.",
      backgroundTitle: "Physiological Science & Guidelines",
      background: [
        "Water comprises approximately 60% of adult body mass and is the primary medium for cellular metabolism, nutrient transport, joint lubrication, and thermoregulation via perspiration.",
        "Guidelines established by the National Academy of Medicine (formerly Institute of Medicine, IOM) and the American College of Sports Medicine (ACSM) demonstrate that cognitive performance, physical endurance, and kidney filtration begin deteriorating when hypohydration exceeds 2% of body weight. The weight-based metric of 30-35 ml/kg provides an individualized baseline accounting for metabolic mass."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "Desk Workers & Sedentary Adults: Preventing chronic sub-clinical dehydration responsible for afternoon fatigue, tension headaches, and decreased focus.",
        "Active Athletes: Offsetting fluid losses incurred via sweat during conditioning sessions to protect cardiac stroke volume.",
        "Digestive & Renal Health: Supporting optimal glomerular filtration and dietary fiber transit through the digestive tract."
      ],
      limitationsTitle: "Limitations & Clinical Caveats",
      limitations: [
        "Renal & Cardiac Restrictions: Individuals with congestive heart failure (CHF), chronic kidney disease (CKD), or liver cirrhosis must strictly follow nephrologist-prescribed fluid restrictions to avoid dangerous fluid retention.",
        "Hyponatremia Risk: Consuming excessive plain water without electrolytes during ultra-endurance events can cause dangerous dilutional hyponatremia (water intoxication). Replenish sodium during prolonged sweating."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Sawka MN, Burke LM, Eichner ER, et al. American College of Sports Medicine position stand: Exercise and fluid replacement. Med Sci Sports Exerc. 2007;39(2):377-390.",
        "Institute of Medicine. Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate. The National Academies Press; 2005."
      ]
    },
    zh: {
      title: "科学依据与推导：机体水合生理学与每日水分摄入标准",
      badge: "临床水合平衡标准 (E-E-A-T)",
      formulaLabel: "水分动态摄入公式",
      formula: "基础饮水量: 每日饮水 (ml) = 体重 (kg) × 35 毫升\n运动补偿量: 每 60 分钟中高强度运动额外增加 500 ~ 1000 毫升\n国家医学院基准: 成年男性约 3.7 升/天，成年女性约 2.7 升/天 (含食物水分)",
      formulaNote: "在炎热干燥环境、高海拔或高蛋白饮食条件下，需额外上浮 10%~20%。",
      backgroundTitle: "学术背景与生理学共识",
      background: [
        "水分约占成年人体重的 60%，是细胞生化反应、营养物质循环运输、关节滑液润滑以及体温调节排汗的生命介质。",
        "美国国家医学院（IOM）与美国运动医学会（ACSM）权威指南指出，当机体脱水达到体重的 2% 时，人体的有氧耐力、认知注意力与短期工作记忆力将出现显著滑坡。相比于盲目的“每天八杯水”，按照人体代谢质量（30~35 ml/kg）进行个性化计算，是国际生理学界普遍认可的科学标准。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "办公室脑力工作者：预防慢性轻度缺水带来的午后头痛、乏力感及专注力涣散，维持高效率大脑运作。",
        "健身与规律运动者：维持血容量充盈与心搏出量，避免脱水引起的早发性肌肉痉挛与体温过热风险。",
        "肾脏与消化道保健：充足的水分能促进肾小球高效滤过、预防泌尿系统结石，并协同膳食纤维软化粪便、维护肠道通畅。"
      ],
      limitationsTitle: "局限性与特殊临床禁忌",
      limitations: [
        "心肾疾病患者严格限水：慢性肾衰竭（CKD）、充血性心力衰竭及肝硬化腹水患者，肾脏排水功能受损，必须严格遵从专科医生的限水医嘱，切勿自行过量饮水。",
        "低钠血症（水中毒）风险：在持续 2 小时以上的剧烈运动或马拉松赛事中，如果短时间内大量灌入纯净水且未补充电解质，可能引发稀释性低钠血症，需搭配运动饮料补充纳离子。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Sawka MN, Burke LM, Eichner ER, et al. American College of Sports Medicine position stand: Exercise and fluid replacement. Med Sci Sports Exerc. 2007;39(2):377-390.",
        "Popkin BM, D'Anci KE, Rosenberg IH. Water, hydration, and health. Nutr Rev. 2010;68(8):439-458."
      ]
    }
  },
  splits: {
    en: {
      title: "Scientific Methodology: Neuromuscular Flexibility & Splits Biomechanics",
      badge: "Sports Biomechanics Standard (E-E-A-T)",
      formulaLabel: "Flexibility Progression Principle",
      formula: "Hip Flexion ROM: ≥ 90° Active Straight Leg Raise (Hamstring Extensibility)\nHip Extension ROM: ≥ 15° Thomas Test Angle (Iliopsoas & Rectus Femoris Compliance)\nPelvic Alignment: Neutral Pelvic Tilt with Active Glute / Core Antagonist Co-contraction",
      formulaNote: "Progression requires both mechanical passive compliance and active end-range motor control.",
      backgroundTitle: "Biomechanics & Neurophysiology",
      background: [
        "Achieving full front splits (Hanumanasana) or middle splits (Samakonasana) relies not merely on mechanically stretching tendons, but on neuro-inhibition of the myotatic stretch reflex (muscle spindles) and Golgi tendon organ (GTO) autogenic inhibition.",
        "Sports medicine research shows that consistent Proprioceptive Neuromuscular Facilitation (PNF) and eccentric end-range loaded mobility alter stretch tolerance and induce sarcomerogenesis (addition of sarcomeres in series), significantly accelerating safe mobility progression without joint microtrauma."
      ],
      audienceTitle: "Target Population & Practical Application",
      audience: [
        "Yoga & Pilates Trainees: Developing deep, safe hip mobility and pelvic stability without lumbar hyperextension compensations.",
        "Martial Artists & Dancers: Building explosive high-kick flexibility with active end-range hip flexor and adductor strength.",
        "Sedentary Desk Workers: Counteracting reciprocal inhibition and chronic hip flexor shortening caused by prolonged seated posture."
      ],
      limitationsTitle: "Limitations & Anatomical Variations",
      limitations: [
        "Bony Architecture Variance: Bony acetabular morphology (depth and angle of the hip socket) varies widely. Individuals with deep acetabular coverage or femoral retroversion may experience bony impingement in middle splits. Never force movement past sharp groin pinch pain.",
        "Hypermobility & Ligamentous Laxity: Individuals with Ehlers-Danlos syndrome or benign joint hypermobility syndrome (BJHS) should focus on stability and strength rather than passive over-stretching to prevent labral tears."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Weppler CH, Magnusson SP. Increasing muscle extensibility: a matter of increasing length or modifying sensation? Phys Ther. 2010;90(3):438-449.",
        "Behm DG, Blazevich AJ, Kay AD, McHugh M. Acute effects of muscle stretching on physical performance, range of motion, and injury incidence in healthy active individuals: a systematic review. Appl Physiol Nutr Metab. 2016;41(1):1-11."
      ]
    },
    zh: {
      title: "科学依据与推导：神经肌肉适应机制与一字马劈叉生物力学",
      badge: "运动生物力学标准 (E-E-A-T)",
      formulaLabel: "活动度核心评估指标",
      formula: "髋屈曲活动度: 主动直腿抬高 ≥ 90° (腘绳肌/后链肌群延展性)\n髋伸展活动度: Thomas 测试角 ≥ 15° (髂腰肌与股直肌顺应性)\n骨盆排列控制: 维持骨盆中立位，避免腰椎代偿性过度前凸",
      formulaNote: "劈叉不仅是韧带拉长，更是深层神经系统对肌肉末端张力耐受（Stretch Tolerance）的重塑。",
      backgroundTitle: "运动生理学与神经力学原理",
      background: [
        "完成竖叉或横叉动作，其底层生理机制并非单纯依靠物理“拉长韧带”，而是通过反复刺激高尔基腱器官（GTO）的主动自生抑制，调低肌肉梭（Muscle Spindle）过度敏感的牵张反射（Stretch Reflex），使中枢神经系统允许关节进入极限范围。",
        "现代运动康复学证实，结合本体感觉神经肌肉易化术（PNF 牵拉）与末端离心负重抗阻训练，不仅能提高大脑对牵拉疼痛的阈值，还能诱导骨骼肌肌小节串联增生（Sarcomerogenesis），在避免关节唇损伤的前提下最大化柔韧性进展。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "瑜伽与普拉提练习者：建立安全科学的开髋序列与核心骨盆控制，避免用盲目顶腰代偿髋关节活动度不足。",
        "舞蹈、体操与武术格斗学员：发展极限开胯与高踢腿所需的主动末端力量，避免“被动能劈叉、主动踢不起”的脱节现象。",
        "久坐白领体态纠正：缓解因全天伏案导致的髂腰肌持续紧张短缩，改善骨盆前倾引起的下腰痛问题。"
      ],
      limitationsTitle: "骨骼解剖学局限性与安全警示",
      limitations: [
        "骨骼髋臼形态学差异：每个人的髋臼深度、前倾角及股骨颈角度存在天然解剖差异。若出现骨性撞击（如凸起骨刺或骨前唇挤压），切勿使用暴力压腿，谨防髋臼盂唇撕裂。",
        "关节过度活动综合征（超伸体质）：韧带天生松弛者切忌盲目进行被动过劳拉伸，而应将重心放在深层稳定肌群（如臀中肌、内收肌离心收缩）的强化控制上。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Weppler CH, Magnusson SP. Increasing muscle extensibility: a matter of increasing length or modifying sensation? Phys Ther. 2010;90(3):438-449.",
        "Behm DG, Blazevich AJ, Kay AD, McHugh M. Acute effects of muscle stretching on physical performance, range of motion, and injury incidence in healthy active individuals. Appl Physiol Nutr Metab. 2016;41(1):1-11."
      ]
    }
  },
  bmi: {
    en: {
      title: "Scientific Methodology: Quetelet Index (Body Mass Index)",
      badge: "WHO Global Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulation",
      formula: "BMI = Weight (kg) / [Height (m)]²\n\nValidation Example (175 cm, 70 kg):\nBMI = 70 / (1.75)² = 70 / 3.0625 = 22.9 kg/m² (Normal Weight)",
      formulaNote: "Standard World Health Organization (WHO) adult classification: Underweight (<18.5), Normal (18.5–24.9), Overweight (25.0–29.9), Obese (≥30.0).",
      backgroundTitle: "Historical Background & Epidemiological Validation",
      background: [
        "The Body Mass Index (originally the Quetelet Index) was developed in 1832 by Belgian mathematician and statistician Adolphe Quetelet to quantify average human body proportions across demographics.",
        "In 1972, physiologist Ancel Keys validated the index across 7,426 subjects, confirming it as the premier non-invasive statistical surrogate for relative body fatness in population studies. In 1995, the World Health Organization officially adopted BMI as the global clinical screening benchmark."
      ],
      audienceTitle: "Target Population & Clinical Utility",
      audience: [
        "Population-Level Health Screening: Cost-effective primary screening tool for public health surveys and epidemiological risk assessments.",
        "Metabolic Risk Stratification: Serves as a baseline metric associated with relative risks of type 2 diabetes, hypertension, and cardiovascular diseases across large demographics.",
        "General Fitness Tracking: Provides a quick macroscopic baseline for sedentary or recreational individuals beginning their health and wellness journey."
      ],
      limitationsTitle: "Biomechanical Limitations & Muscular Caveats",
      limitations: [
        "Inability to Differentiate Tissue Composition: BMI evaluates only total scale mass relative to stature. It cannot distinguish metabolically dense skeletal muscle from adipose tissue. Highly trained athletes, bodybuilders, and powerlifters often register 'overweight' despite single-digit body fat.",
        "Sarcopenic Obesity ('Skinny Fat') Blindspot: Older adults or sedentary individuals with low lean mass and elevated visceral adiposity may present a deceptively 'normal' BMI despite heightened cardiometabolic danger. Complementing BMI with body fat percentage (US Navy method) is strongly recommended."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Keys A, Fidanza F, Karvonen MJ, Kimura N, Taylor HL. Indices of relative weight and obesity. J Chronic Dis. 1972;25(6):329-343.",
        "World Health Organization. Physical status: the use and interpretation of anthropometry. Report of a WHO Expert Committee. WHO Technical Report Series 854. Geneva: WHO; 1995."
      ]
    },
    zh: {
      title: "科学依据与推导：凯特勒指数（身体质量指数 BMI）",
      badge: "WHO 国际公认标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "BMI = 体重 (kg) ÷ [身高 (m)]²\n\n验算示例 (175 cm, 70 kg):\nBMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 = 22.9 kg/m² (标准正常)",
      formulaNote: "世界卫生组织（WHO）成人分级标准：体重偏轻（<18.5）、正常范围（18.5～24.9）、超重区间（25.0～29.9）、肥胖区间（≥30.0）。",
      backgroundTitle: "历史渊源与循证流行病学验证",
      background: [
        "身体质量指数（最初称为“凯特勒指数”）由比利时著名统计学家兼天文学家阿道夫·凯特勒（Adolphe Quetelet）于 1832 年创立，用于定义群体统计学中的平均身体比例。",
        "1972 年，著名生理学家安塞尔·基斯（Ancel Keys）在对比水下称重法后，证实该指数与人体脂肪总量具备高度统计学相关性，并正式将其命名为“Body Mass Index (BMI)”。1995 年，世界卫生组织（WHO）正式确立 BMI 为全球通用肥胖筛查标准。"
      ],
      audienceTitle: "适用人群与日常应用",
      audience: [
        "宏观体质健康初筛：作为无需复杂仪器的无创快速指标，适合大众成年人进行长期宏观体重趋势评估。",
        "代谢性慢病风险分层：流行病学研究证实，BMI 异常与 2 型糖尿病、高血压及动脉粥样硬化风险呈显著相关性，为健康生活方式提供预警基线。",
        "减重与生活方式干预：为初入健身房或开展体重管理的人士建立基础基准线，辅助衡量生活方式调整效果。"
      ],
      limitationsTitle: "身体成分局限性与高肌肉量警示",
      limitations: [
        "无法区分肌肉与脂肪：BMI 仅度量身体总重量，不具备体成分解析能力。经常进行大重量抗阻力量训练、肌肉量显著高于常人的健美或力量举训练者，BMI 往往会虚高进入“超重”甚至“肥胖”区间，此时该数值不反映真实肥胖度。",
        "隐形肥胖（Skinny Fat）漏诊：缺乏力量训练的久坐人群，即便 BMI 处于 18.5~24.9 的完美区间，但若体脂率偏高、内脏脂肪堆积且骨骼肌严重匮乏，依然存在较高的心血管隐患。强烈建议结合体脂率（美军体围法）与腰围综合判断。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Keys A, Fidanza F, Karvonen MJ, Kimura N, Taylor HL. Indices of relative weight and obesity. J Chronic Dis. 1972;25(6):329-343.",
        "World Health Organization. Physical status: the use and interpretation of anthropometry. Report of a WHO Expert Committee. WHO Technical Report Series 854. Geneva: WHO; 1995."
      ]
    }
  },
  "1rm": {
    en: {
      title: "Scientific Methodology: Epley 1RM Predictive Equation",
      badge: "NSCA Gold Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulation",
      formula: "1RM = Weight × (1 + Reps / 30)\n\nValidation Example 1 (100 kg × 5 reps):\n1RM = 100 × (1 + 5/30) = 100 × 1.1667 = 117 kg\n\nValidation Example 2 (80 kg × 8 reps):\n1RM = 80 × (1 + 8/30) = 80 × 1.2667 = 101 kg\n\nValidation Example 3 (60 kg × 10 reps):\n1RM = 60 × (1 + 10/30) = 60 × 1.3333 = 80 kg",
      formulaNote: "Optimal repetition range is 1 to 10 repetitions. Beyond 10 reps, systemic and localized metabolic fatigue degrades accuracy.",
      backgroundTitle: "Historical Background & Biomechanical Validation",
      background: [
        "The Epley equation was developed in 1985 by Boyd Epley, founder of the National Strength and Conditioning Association (NSCA) and pioneering head strength coach at the University of Nebraska. It was created to provide collegiate athletes with an accurate, injury-free method to determine maximal strength baselines.",
        "A comprehensive meta-evaluation by LeSuer et al. (1997) in the Journal of Strength and Conditioning Research tested seven common predictive formulas against actual 1RM bench press, squat, and deadlift performances. The Epley formula demonstrated the highest correlation coefficient (r > 0.97) and smallest standard error among all submaximal prediction models within 10 repetitions."
      ],
      audienceTitle: "Target Population & Practical Programming",
      audience: [
        "Powerlifting & Strength Athletes: Accurately calculate percentage-based training blocks (e.g., 70% for volume, 85% for peaking) without taxing the central nervous system.",
        "Hypertrophy Training: Target precise relative loads (65%–80% 1RM) corresponding to the optimal 6–12 repetition range for mechanical tension and muscle fiber recruitment.",
        "Injury Prevention & Beginners: Safely estimate peak capacity without the orthopedic hazards of heavy maximal attempts."
      ],
      limitationsTitle: "Physiological Limitations & Repetition Decay",
      limitations: [
        "Repetition Range Boundary: Highly accurate between 1 and 10 repetitions. Sets exceeding 10 repetitions introduce anaerobic lactic fatigue, glycogen depletion, and cardiovascular strain that underestimate or distort pure neurological force output.",
        "Fast-Twitch vs Slow-Twitch Variation: Lifters with a high proportion of type II fast-twitch muscle fibers may achieve fewer repetitions at 80% 1RM than endurance-dominant lifters, causing modest individual variance."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Epley B. Poundage chart. Boyd Epley Workout. Lincoln, NE: Body Enterprises; 1985:14-17.",
        "LeSuer DA, McCormick JH, Mayhew JL, Wasserstein RL, Arnold MD. The accuracy of prediction equations for estimating 1-RM performance in the bench press, squat, and deadlift. J Strength Cond Res. 1997;11(4):211-213."
      ]
    },
    zh: {
      title: "科学依据与推导：Epley 最大力量估算公式",
      badge: "NSCA 权威循证标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "1RM = 负重 × (1 + 次数 ÷ 30)\n\n验算示例 1 (100 kg × 5 次):\n1RM = 100 × (1 + 5/30) = 100 × 1.1667 = 117 kg\n\n验算示例 2 (80 kg × 8 次):\n1RM = 80 × (1 + 8/30) = 80 × 1.2667 = 101 kg\n\n验算示例 3 (60 kg × 10 次):\n1RM = 60 × (1 + 10/30) = 60 × 1.3333 = 80 kg",
      formulaNote: "建议在 1～10 次重复区间内测算；当重复次数超过 10 次时，肌耐力与心肺负荷会使估算误差显著放大。",
      backgroundTitle: "历史渊源与运动生物力学验证",
      background: [
        "Epley 公式由美国体能协会（NSCA）创始人、内布拉斯加大学传奇体能总教练博伊德·埃普利（Boyd Epley）于 1985 年提出，旨在为竞技力量举与大学运动员提供一种免于极限受伤风险的次极限测力方案。",
        "1997 年，著名运动生理学家 LeSuer 等人在《体能与力量训练研究杂志》（JSCR）发表了对比 7 种主流 1RM 预测公式的严谨对照研究。结果证实，在 1~10 次区间内，Epley 公式在深蹲、卧推与硬拉三大项中的相关系数均超过 0.97，预测均方根误差最低，成为国际力量体能界应用最广泛的黄金基准。"
      ],
      audienceTitle: "适用人群与日常周期化训练",
      audience: [
        "力量举与抗阻训练者：精确推算深蹲、卧推、硬拉等复合动作的百分比配重（如 70% 增肌容量组、85% 力量强化组），无需频繁冲刺大重量消耗中枢神经。",
        "肌肥大健美爱好者：精准锁定 65%~80% 1RM 的最佳机械张力区间（对应 6~12 次），最大化刺激肌原纤维增生。",
        "新手与防伤进阶：初学者无需冒着肌腱拉伤或动作形变的危险实测极限，用稳定的次极大负荷安全指导长期训练。"
      ],
      limitationsTitle: "生理机制局限性与高次数疲劳衰减",
      limitations: [
        "高重复次数误差放大：公式在 1~10 次区间内高度精准；当重复次数超过 10 次（如 12~20 次）时，限制输出的主要是局部肌肉耐力与乳酸缓冲能力，而非神经系统极限募集能力，此时推算出的 1RM 会出现较大偏差。",
        "快慢肌纤维比例个体差异：快肌纤维（Type II）占比高的力量型训练者，在高百分比下输出强但重复次数可能偏少，实际测算建议结合自身 RPE（主观疲劳度）微调 2~3%。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Epley B. Poundage chart. Boyd Epley Workout. Lincoln, NE: Body Enterprises; 1985:14-17.",
        "LeSuer DA, McCormick JH, Mayhew JL, Wasserstein RL, Arnold MD. The accuracy of prediction equations for estimating 1-RM performance in the bench press, squat, and deadlift. J Strength Cond Res. 1997;11(4):211-213."
      ]
    }
  },
  protein: {
    en: {
      title: "Scientific Methodology: ISSN Protein Intake & Muscle Protein Synthesis",
      badge: "ISSN Evidence-Based Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulation",
      formula: "Maintenance: 0.8–1.0 g / kg body weight\nHypertrophy / Muscle Building: 1.6–2.2 g / kg body weight (Baseline: 2.0 g/kg)\nCutting / Fat Loss (Sparing Lean Mass): 1.8–2.4 g / kg body weight (Baseline: 2.0 g/kg)\n\nValidation Example (70 kg Muscle Building @ 2.0 g/kg):\nDaily Target = 70 × 2.0 = 140 g / day\nPer-Meal Target (4 meals) = 140 / 4 = 35 g / meal",
      formulaNote: "Based on International Society of Sports Nutrition (ISSN) Position Stand on protein and exercise.",
      backgroundTitle: "Biochemical Background & MPS Leucine Threshold",
      background: [
        "Muscle Protein Synthesis (MPS) is the primary physiological driver of muscular hypertrophy. In 2017, the International Society of Sports Nutrition (ISSN) published an exhaustive position stand reviewing hundreds of randomized metabolic ward studies.",
        "Meta-analyses by Morton et al. (2018) encompassing 49 studies and 1,863 participants demonstrated that protein intakes beyond 1.62 g/kg/day do not significantly enhance resistance training adaptations in caloric balance, with the 95% confidence interval capping at 2.2 g/kg/day. In hypocaloric conditions (cutting), higher intakes (up to 2.4 g/kg) protect against myofibrillar breakdown."
      ],
      audienceTitle: "Target Population & Meal Frequency Strategy",
      audience: [
        "Resistance Lifters & Bodybuilders: Optimal intake of 1.6–2.2 g/kg optimizes net protein balance and accelerated myofibrillar remodeling.",
        "Caloric Deficit Cutters: Elevated intake (1.8–2.4 g/kg) blunts gluconeogenic catabolism of skeletal muscle during dieting.",
        "Meal Spacing Protocol: Distribute protein into doses of 0.40–0.55 g/kg/meal (typically 25–45g) every 3–5 hours to consistently surpass the leucine threshold (~2.5–3g) and maximize MPS peaks."
      ],
      limitationsTitle: "Metabolic Ceilings & Clinical Considerations",
      limitations: [
        "Protein Ceiling Myth vs MPS Refractory Period: Consuming more than 50g in a single sitting remains digestible, but the fractional synthetic rate (FSR) peaks and enters a refractory 'muscle full' state, oxidizing excess amino acids.",
        "Clinical Renal Pre-existing Conditions: While healthy kidneys adapt with physiological hyperfiltration, patients with diagnosed chronic kidney disease (CKD) or reduced eGFR must restrict protein intake per medical prescription."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Jäger R, Kerksick CM, Campbell BI, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.",
        "Morton RW, Murphy KT, McKellar SR, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384."
      ]
    },
    zh: {
      title: "科学依据与推导：ISSN 蛋白质需求与肌蛋白合成（MPS）",
      badge: "ISSN 国际循证标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "维持基础健康：0.8～1.0 g ÷ kg 体重\n力量增肌期：1.6～2.2 g ÷ kg 体重 (基准常用 2.0 g/kg)\n减脂防掉肌：1.8～2.4 g ÷ kg 体重 (基准常用 2.0 g/kg)\n\n验算示例 (70 kg 增肌按 2.0 g/kg):\n每日总量 = 70 × 2.0 = 140 g / 天\n每餐建议 (分4餐) = 140 ÷ 4 = 35 g / 餐",
      formulaNote: "基于国际运动营养学会（ISSN）《蛋白质与运动专项科学立场声明》权威标准设计。",
      backgroundTitle: "生化生理机制与亮氨酸阈值",
      background: [
        "肌肉蛋白质合成速率（MPS）与分解速率（MPB）的代数和决定了净肌肉量的增减。2017 年，国际运动营养学会（ISSN）发布了基于数千篇临床对照实验的里程碑式共识声明。",
        "著名运动营养学家 Morton 等人（2018 年《英国运动医学杂志》BJSM）对 49 项高精度实验、1,863 名受试者进行了全面 Meta 分析，证实日常蛋白质摄入量达到 1.62 g/kg/天 时，抗阻增肌效益进入平原期，其 95% 置信区间上限为 2.2 g/kg/天。在热量赤字减脂期，摄入上限可拓展至 2.4 g/kg 以抵消皮质醇造成的肌肉糖异生分解。"
      ],
      audienceTitle: "适用人群与分餐吸收策略",
      audience: [
        "抗阻力力量训练与肌肥大：每日按 1.6～2.2 g/kg 配给，配合渐进超负荷训练实现最佳瘦体重增长。",
        "减脂期训练者：将摄入量提升至 1.8～2.4 g/kg，利用蛋白质最高的热效应（TEF 约 20–30%）提升饱腹感并强力锁定瘦体重。",
        "分餐节律优化：建议全天均分 3~4 餐，单餐摄入 0.40~0.55 g/kg（约 25~45g 优质蛋白），确保每次摄入含 2.5~3g 亮氨酸以触发肌蛋白合成最大化开关。"
      ],
      limitationsTitle: "代谢上限认知与特殊人群警示",
      limitations: [
        "单餐利用上限辨析：胃肠道能消化任意大剂量的蛋白质，但单次刺激 MPS 的边际递减效应通常在 40~50g 饱和（出现“肌肉饱足”现象），多余氨基酸主要氧化为能量，因此少吃多餐比单餐暴饮暴食更利于肌肥大。",
        "健康人群与肾病界限：对肾功能正常者，长期摄入 2.0~2.5 g/kg 被证实无肾小球损伤；但已有慢性肾病（CKD）或肾功能不全者必须严格遵循临床限蛋白医嘱。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Jäger R, Kerksick CM, Campbell BI, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.",
        "Morton RW, Murphy KT, McKellar SR, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384."
      ]
    }
  },
  'fat-loss': {
    en: {
      title: "Scientific Methodology: Wishnofsky 7,700 kcal Rule & Energy Deficit Science",
      badge: "Thermodynamics Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulation",
      formula: "Required Days = (Current Weight − Target Weight) × 7,700 ÷ Daily Calorie Deficit\nWeekly Rate (kg/wk) = Daily Deficit × 7 ÷ 7,700\n\nValidation Example (80kg to 75kg, 500 kcal Deficit):\nWeight Loss = 80 − 75 = 5 kg\nRequired Days = 5 × 7,700 ÷ 500 = 77 Days\nWeekly Loss Rate = 500 × 7 ÷ 7,700 ≈ 0.45 kg/week",
      formulaNote: "Derived from Wishnofsky's classical energy density model of human adipose tissue (~7,700 kcal per kilogram).",
      backgroundTitle: "Historical Background & Adipose Thermodynamics",
      background: [
        "In 1958, clinical researcher Max Wishnofsky analyzed extensive biochemical caloric data of human fat tissue, establishing that 1 pound of adipose tissue represents approximately 3,500 kcal (equivalent to 7,700 kcal per kilogram of adipose mass). Adipose tissue is composed of roughly 87% pure triglycerides with the remainder consisting of intracellular water, structural proteins, and connective matrix.",
        "Modern metabolic research published by Dr. Kevin Hall at the NIH (The Lancet, 2011) emphasizes that while dynamic physiological feedback occurs (adaptive thermogenesis), the cumulative energy deficit model remains the most dependable baseline tool for establishing multi-week caloric timelines."
      ],
      audienceTitle: "Target Population & Safe Deficit Guidelines",
      audience: [
        "Safe Weight Loss Pace: Evidence consistently recommends losing 0.5%–1.0% of total body weight per week (0.5–1.0 kg) to spare fat-free mass (skeletal muscle) and prevent endocrine disruption.",
        "Calorie Deficit Strategy: Moderate daily deficits between 300 and 500 kcal yield optimal long-term dietary adherence without stimulating excessive ghrelin surges or extreme fatigue.",
        "Resistance Training Synergy: Combining calorie deficits with progressive resistance training and adequate dietary protein (1.6–2.2 g/kg) ensures that lost weight stems almost exclusively from adipose stores."
      ],
      limitationsTitle: "Metabolic Adaptation & Real-World Fluctuations",
      limitations: [
        "Initial Glycogen & Water Shifts: During the first 1–2 weeks of a caloric deficit, rapid weight loss (1–2kg) often reflects glycogen depletion and bound water shedding rather than pure adipose loss.",
        "Adaptive Thermogenesis: Over prolonged periods of dieting, total energy expenditure (TDEE) naturally declines as body weight drops. Periodic reassessments every 4–6 weeks or incorporating 1-week diet breaks are recommended to sustain momentum."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Wishnofsky M. Caloric equivalents of gained or lost weight. Am J Clin Nutr. 1958;6(5):542-546.",
        "Hall KD, Sacks G, Chandramohan D, et al. Quantification of the effect of energy imbalance on bodyweight. Lancet. 2011;378(9793):826-837.",
        "Helms ER, Aragon AA, Fitschen PJ. Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. J Int Soc Sports Nutr. 2014;11:20."
      ]
    },
    zh: {
      title: "科学依据与推导：Wishnofsky 7700大卡模型与热量赤字规律",
      badge: "热力学循证标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "预计所需天数 = (当前体重 − 目标体重) × 7700 ÷ 每日热量缺口\n预计每周减重 = 每日热量缺口 × 7 ÷ 7700\n\n验算示例 (80kg 减至 75kg，每日缺口 500 大卡):\n需减重量 = 80 − 75 = 5 kg\n预计所需天数 = 5 × 7700 ÷ 500 = 77 天\n每周减重速度 = 500 × 7 ÷ 7700 ≈ 0.45 kg / 周",
      formulaNote: "基于经典 Wishnofsky 人体脂肪组织能量密度模型（每公斤体脂含约 7700 大卡净热量）。",
      backgroundTitle: "生化机制与脂肪组织热量等效性",
      background: [
        "1958 年，临床内分泌专家 Max Wishnofsky 发表了影响现代减重科学的经典论文，测算出人体 1 磅体脂含有约 3500 大卡能量，换算为公制即 1kg 体脂组织储备约 7700 大卡热量。人体脂肪组织并非 100% 纯脂肪，而是由约 87% 的纯甘油三酯以及约 13% 的水分与细胞基质蛋白构成（9 kcal/g × 870g ≈ 7700~7800 kcal）。",
        "美国国家卫生研究院（NIH）资深科学家 Kevin Hall 博士在顶级医学期刊《柳叶刀》（The Lancet 2011）上指出，尽管人体在长期热量受限下会发生一定程度的自适应性产热下调（Adaptive Thermogenesis），但 7700 大卡能量守恒模型依然是宏观规划减重进度和评估热量赤字的最坚实基石。"
      ],
      audienceTitle: "适用人群与健康减脂节奏建议",
      audience: [
        "健康速率标准：权威运动医学界一致推荐每周减重速率控制在自身体重的 0.5%~1.0%（约 0.5~1.0kg）。这一速率能最大化减脂、最小化肌肉流失并保护基础代谢。",
        "缺口阶梯选择：初学者或微胖人群推荐 300~500 大卡/天的温和缺口；大体重基数者可短期采用 750 大卡/天；切忌长期采取大于 1000 大卡的极端缺口。",
        "力量训练结合：减脂期必须配合规律抗阻力训练与充足蛋白质摄入（1.6~2.2g/kg），促使身体选择性分解脂肪供能，避免瘦体重流失。"
      ],
      limitationsTitle: "短期波动与代谢适应客观规律",
      limitations: [
        "初始糖原水分效应：刚开始制造缺口的第 1~2 周，由于肌糖原储备减少（1g 糖原绑定约 3~4g 水），体重秤上的降幅往往较快，其中包含较多水分，随后会逐渐趋于平稳脂肪消耗。",
        "平台期自然反馈：随着体重下降，维持身体运转所需的 BMR 和活动消耗会自然降低。当减重超过自身体重的 5%~10% 后，建议使用 BMR 计算器重新核定维持热量并适时安排 1 周等热量饮食调整期。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Wishnofsky M. Caloric equivalents of gained or lost weight. Am J Clin Nutr. 1958;6(5):542-546.",
        "Hall KD, Sacks G, Chandramohan D, et al. Quantification of the effect of energy imbalance on bodyweight. Lancet. 2011;378(9793):826-837.",
        "Helms ER, Aragon AA, Fitschen PJ. Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. J Int Soc Sports Nutr. 2014;11:20."
      ]
    }
  },
  volume: {
    en: {
      title: "Scientific Methodology: Volume Load Mechanics & Hypertrophy Landmarks (MEV/MAV/MRV)",
      badge: "Hypertrophy Science Standard (E-E-A-T)",
      formulaLabel: "Mathematical Formulation",
      formula: "Exercise Volume Load = Sets × Reps × Weight (kg)\nMuscle Group Weekly Volume = Sum of Volume Loads for that target muscle\nTotal Weekly Volume Load = Sum of all exercise volume loads\n\nValidation Benchmark:\n• Squat: 4 sets × 8 reps × 100 kg = 3,200 kg\n• Bench Press: 4 sets × 10 reps × 80 kg = 3,200 kg\n• Combined Weekly Volume = 3,200 + 3,200 = 6,400 kg",
      formulaNote: "Based on Dr. Brad Schoenfeld's dose-response meta-analyses and Dr. Mike Israetel's Renaissance Periodization volume landmarks.",
      backgroundTitle: "Biomechanical Mechanics & Dose-Response Curves",
      background: [
        "In modern exercise physiology, training volume is widely recognized as the single most robust predictor of muscle hypertrophy within appropriate intensity bands (typically 60%–85% 1RM, within 1–3 repetitions in reserve / RIR). Dr. Brad Schoenfeld's landmark 2017 meta-analysis in the Journal of Sports Sciences demonstrated a clear dose-response relationship: 10+ weekly sets per muscle group yielded nearly double the muscle growth of under 5 sets.",
        "To prevent chronic overtraining and tendon breakdown, Dr. Mike Israetel introduced the Volume Landmark framework: classifying volume into Maintenance Volume (MV), Minimum Effective Volume (MEV), Maximum Adaptive Volume (MAV), and Maximum Recoverable Volume (MRV)."
      ],
      audienceTitle: "Hypertrophy Landmarks & Programming Application",
      audience: [
        "MEV (Minimum Effective Volume, ~6–10 sets/week): The minimum stimulus threshold required to generate measurable muscle hypertrophy. Useful during deloads or maintenance phases.",
        "MAV (Maximum Adaptive Volume, ~12–20 sets/week): The golden hypertrophy sweet spot where progressive overload yields the fastest gains with sustainable neuromuscular recovery.",
        "MRV (Maximum Recoverable Volume, ~20–25+ sets/week): The absolute recovery ceiling. Exceeding MRV leads to non-functional overreaching, blunted MPS, and elevated risk of tendinopathy. Planned deload weeks are essential when approaching MRV."
      ],
      limitationsTitle: "Junk Volume & Quality Considerations",
      limitations: [
        "Junk Volume Pitfall: Volume accumulated far from failure (>4 RIR) or with degraded form generates disproportionate joint fatigue without stimulating high-threshold motor units.",
        "Individual Recovery Variance: Caloric intake, sleep quality, training age, and endocrine status substantially alter personal MRV thresholds. Volume must be periodized dynamically."
      ],
      referencesTitle: "Peer-Reviewed Academic Citations",
      references: [
        "Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: A systematic review and meta-analysis. J Sports Sci. 2017;35(11):1073-1082.",
        "Israetel M, Feather J, Faleiro TW, Helms ER. Scientific Principles of Hypertrophy Training. Renaissance Periodization; 2020.",
        "Baz-Valle E, Fontes-Villalba M, Santos-Concejero J. Total number of sets as a training volume quantification method for muscle hypertrophy: A systematic review. J Strength Cond Res. 2021;35(3):870-878."
      ]
    },
    zh: {
      title: "科学依据与推导：训练容量负荷与肌肥大地标理论（MEV/MAV/MRV）",
      badge: "运动力学与肌肥大循证标准 (E-E-A-T)",
      formulaLabel: "数学推导公式",
      formula: "单动作训练容量 = 组数 × 每组次数 × 重量 (kg)\n单肌群周容量 = 该目标肌群所有动作的容量总和\n全周总训练容量 = 所有肌群训练容量之和\n\n验算基准示例：\n• 深蹲：4 组 × 8 次 × 100 kg = 3,200 kg (腿部容量)\n• 卧推：4 组 × 10 次 × 80 kg = 3,200 kg (胸部容量)\n• 两项合计全周容量 = 3,200 + 3,200 = 6,400 kg",
      formulaNote: "基于 Brad Schoenfeld 博士肌肥大剂量反应关系 Meta 分析与 Mike Israetel 博士周期化容量地标模型。",
      backgroundTitle: "生化生理机制与容量剂量反应关系",
      background: [
        "在现代运动人体科学中，当训练强度处于 60%~85% 1RM（距离力竭 1~3 次 RIR）的有效区间内时，训练容量（Volume Load）是决定肌原纤维蛋白质合成与机械张力积累的核心驱动力。著名肌肥大学者 Brad Schoenfeld 博士在 2017 年发表于《体育科学杂志》（JSS）的 Meta 分析证实：单肌群每周达到 10 组以上有效训练组时，增肌效益近乎是 5 组以下的两倍。",
        "然而容量并非无限堆砌越好。为量化恢复与生长的动态边界，Mike Israetel 博士构建了著名的“容量地标（Volume Landmarks）”体系，将周训练量清晰划分为维持容量（MV）、最低有效容量（MEV）、最佳适应容量（MAV）与最大可恢复容量（MRV）。"
      ],
      audienceTitle: "容量地标解读与训练周期规划",
      audience: [
        "MEV（最低有效容量，约 6~10 组/周）：触发肌肉产生可观察生长的下限门槛。适合出差、生活忙碌或主动维持期的低负荷刺激。",
        "MAV（最大适应容量，约 12~20 组/周）：增肌效益最高、性价比最佳的黄金区间。绝大部分训练周期应围绕 MAV 渐进超负荷。",
        "MRV（最大可恢复容量，约 20~25+ 组/周）：身体和中枢神经能恢复的上限天花板。接近或达到 MRV 时疲劳极度累积，必须在下周安排减量周（Deload）以消除疲劳、兑现肌肉生长。"
      ],
      limitationsTitle: "无效垃圾容量警示与个体差异",
      limitations: [
        "垃圾容量（Junk Volume）陷阱：远离力竭（>4 RIR）或因力竭导致动作严重变形代偿的组数无法有效募集高阈值运动单位，只会徒增结缔组织磨损与中枢神经疲劳。",
        "多肌群复合重叠：如卧推在锻炼胸大肌的同时会分担肱三头肌和三角肌前束负荷，制定周容量时需综合考虑复合动作对副肌群的重叠累加。"
      ],
      referencesTitle: "权威学术文献引用",
      references: [
        "Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: A systematic review and meta-analysis. J Sports Sci. 2017;35(11):1073-1082.",
        "Israetel M, Feather J, Faleiro TW, Helms ER. Scientific Principles of Hypertrophy Training. Renaissance Periodization; 2020.",
        "Baz-Valle E, Fontes-Villalba M, Santos-Concejero J. Total number of sets as a training volume quantification method for muscle hypertrophy: A systematic review. J Strength Cond Res. 2021;35(3):870-878."
      ]
    }
  }
};

export default function ToolScientificGuide({ slug, lang }: ToolScientificGuideProps) {
  const data = contentData[slug]?.[lang] || contentData[slug]?.en;
  if (!data) return null;

  return (
    <article className="mt-10 border-t border-neutral-200 dark:border-neutral-800 pt-8 text-neutral-800 dark:text-neutral-200">
      {/* Header with E-E-A-T Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
          {data.title}
        </h2>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          🛡️ {data.badge}
        </span>
      </div>

      {/* Formula Card */}
      <div className="my-5 p-5 bg-neutral-900 text-neutral-100 rounded-2xl shadow-md border border-neutral-800">
        <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
          <span>📐</span> {data.formulaLabel}
        </div>
        <pre className="font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed text-emerald-200/95 overflow-x-auto">
          {data.formula}
        </pre>
        {data.formulaNote && (
          <p className="mt-3 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
            {data.formulaNote}
          </p>
        )}
      </div>

      {/* Section 1: Background & Scientific Validation */}
      <div className="my-6 space-y-3">
        <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span>🔬</span> {data.backgroundTitle}
        </h3>
        {data.background.map((p, idx) => (
          <p key={idx} className="text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {p}
          </p>
        ))}
      </div>

      {/* Section 2: Target Audience & Practical Application */}
      <div className="my-6 space-y-3">
        <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span>🎯</span> {data.audienceTitle}
        </h3>
        <ul className="space-y-2 text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 list-disc list-inside">
          {data.audience.map((item, idx) => (
            <li key={idx} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Section 3: Limitations & Clinical Caveats */}
      <div className="my-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200">
        <h3 className="text-sm md:text-base font-bold flex items-center gap-2 mb-2 text-amber-950 dark:text-amber-200">
          <span>⚠️</span> {data.limitationsTitle}
        </h3>
        <ul className="space-y-2 text-xs md:text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90 list-disc list-inside">
          {data.limitations.map((item, idx) => (
            <li key={idx} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Section 4: Academic Citations */}
      <div className="my-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
          <span>📚</span> {data.referencesTitle}
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          {data.references.map((ref, idx) => (
            <li key={idx} className="leading-normal">
              {ref}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
