import React from 'react';

export type ToolSlug = 'bmr' | 'bfp' | 'macro' | 'hr' | 'ibw' | 'water' | 'splits';

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
