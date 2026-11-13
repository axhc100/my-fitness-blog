export interface ToolFaqItem {
  question: { en: string; zh: string };
  answer: { en: string; zh: string };
}

export const TOOL_FAQS: Record<string, ToolFaqItem[]> = {
  bmr: [
    {
      question: {
        zh: "BMR 和 TDEE 有什么区别？",
        en: "What is the difference between BMR and TDEE?",
      },
      answer: {
        zh: "BMR（基础代谢率）指维持心脏跳动、呼吸和器官运作所需的最低热量；TDEE（每日总消耗）则在 BMR 基础上加上日常活动、工作走动及运动消耗。减脂与增肌的热量目标均应以 TDEE 为基准进行增减。",
        en: "BMR (Basal Metabolic Rate) is the minimum energy required to sustain vital functions like breathing and circulation at rest. TDEE (Total Daily Energy Expenditure) adds physical activity, occupational movement, and exercise on top of BMR.",
      },
    },
    {
      question: {
        zh: "日常运动活动系数怎么选最合理？",
        en: "How should I choose my physical activity factor?",
      },
      answer: {
        zh: "久坐办公且无运动选 1.2；每周轻度运动 1~3 次选 1.375；每周中度训练 3~5 次选 1.55；高强度训练 6~7 次选 1.725。新手通常容易高估运动消耗，建议先从保守档位算起，观察 2 周体重变化再微调。",
        en: "Select 1.2 for desk jobs with no workouts; 1.375 for light exercise 1–3 days/week; 1.55 for moderate training 3–5 days/week; and 1.725 for heavy training 6–7 days/week. Beginners often overestimate expenditure, so starting conservatively is recommended.",
      },
    },
    {
      question: {
        zh: "为什么我的 BMR 算出来比同龄人低？",
        en: "Why is my calculated BMR lower than others of the same age?",
      },
      answer: {
        zh: "BMR 的核心决定因素是去脂体重（瘦体重）。骨骼肌是代谢极其活跃的组织，肌肉量较少、体脂较高或长期节食低热量摄入的人，机体代谢会自适应下调。通过抗阻力量训练增加肌肉量可有效提升静息 BMR。",
        en: "BMR is primarily determined by lean body mass. Skeletal muscle is metabolically active tissue; lower muscle mass, higher body fat, or chronic crash dieting down-regulates basal energy burn. Resistance training to build lean tissue effectively elevates baseline BMR.",
      },
    },
    {
      question: {
        zh: "这个 BMR 计算结果准吗？",
        en: "How accurate is this BMR calculation?",
      },
      answer: {
        zh: "本工具采用国际公认的 Mifflin-St Jeor 临床方程，统计误差一般在 5%~10% 以内，适合日常饮食规划参考。甲状腺功能、体温及体成分差异会影响实际数值，计算结果仅供健身参考，不构成医疗诊断。",
        en: "This tool uses the clinically validated Mifflin-St Jeor equation with an estimated error margin within 5%–10%. Individual factors like thyroid activity, body composition, and genetics can influence actual rate. Results are for fitness reference, not medical diagnosis.",
      },
    },
    {
      question: {
        zh: "我的身体数据会被保存吗？",
        en: "Is my personal biometric data saved?",
      },
      answer: {
        zh: "你的身高、体重与年龄等参数仅保存在你的浏览器本地，不会上传到任何后端服务器。清除浏览器缓存或更换设备后，数据将自动重置，充分保障个人隐私安全。",
        en: "Your height, weight, and age data are stored strictly within your local browser storage and never transmitted to external servers. Clearing browser data or switching devices will reset the inputs, ensuring total privacy.",
      },
    },
  ],

  macro: [
    {
      question: {
        zh: "蛋白质吃多了会伤肾吗？",
        en: "Does a high-protein diet damage healthy kidneys?",
      },
      answer: {
        zh: "根据国际运动营养学会（ISSN）系统综述，对于肾功能正常的健康训练者，长期每公斤体重摄入 1.6~2.2g 蛋白质已被证实非常安全，并不会损害肾脏。但已有慢性肾脏疾病者需严格遵医嘱控制蛋白质摄入。",
        en: "According to the International Society of Sports Nutrition (ISSN), daily intakes of 1.6–2.2g of protein per kg of body weight are proven safe for individuals with healthy kidney function. Those with pre-existing renal conditions should consult their physician.",
      },
    },
    {
      question: {
        zh: "减脂和增肌的三大营养素比例有什么不同？",
        en: "How do macronutrient ratios differ between cutting and bulking?",
      },
      answer: {
        zh: "减脂期需要制造 300~500 大卡热量缺口，并提高蛋白质比例（1.8~2.2g/kg）以防止肌肉流失；增肌期则需 250~350 大卡洁净盈余，分配更多碳水化合物（4~7g/kg）以充盈肌糖原并驱动高强度训练做功。",
        en: "Cutting requires a 300–500 kcal deficit with higher protein (1.8–2.2g/kg) to preserve lean mass. Bulking involves a clean 250–350 kcal surplus with higher carbohydrates (4–7g/kg) to maximize muscle glycogen repletion and training intensity.",
      },
    },
    {
      question: {
        zh: "碳水化合物可以晚上吃吗？会不会更容易长胖？",
        en: "Can I eat carbohydrates at night, and does it cause fat gain?",
      },
      answer: {
        zh: "发胖的本质是全天总热量长期处于盈余状态，与摄入时间无必然联系。多项对照实验表明，只要全天总卡路里和宏量达标，晚餐摄入适量慢碳并不会额外增加体脂，反而能促进血清素合成、辅助夜间安睡。",
        en: "Fat accumulation is determined by 24-hour net caloric surplus rather than nutrient timing. As long as daily calorie and macro goals are met, evening carbohydrates do not cause excess fat gain and can support serotonin synthesis for better sleep.",
      },
    },
    {
      question: {
        zh: "三大营养素计算结果准吗？",
        en: "How accurate are these macronutrient calculations?",
      },
      answer: {
        zh: "本计算器基于 ISSN 循证运动营养标准与精确热量乘数模型设计，数值高度契合运动学规律。因消化吸收率与日常消耗动态波动，建议以测算值为基准执行 2~3 周，结合体围变化灵活微调。",
        en: "This calculator is modeled after ISSN sports nutrition guidelines and precise thermal coefficients. Because digestive absorption and metabolic rates fluctuate, treat values as a calibrated baseline and adjust after 2–3 weeks based on weekly progress.",
      },
    },
    {
      question: {
        zh: "我的营养素饮食数据会被保存吗？",
        en: "Is my diet and nutritional data stored?",
      },
      answer: {
        zh: "所有目标设定与热量拆分结果均在本地客户端实时计算并缓存，绝不上传云端。你可以安心进行不同增肌或减脂周期的参数试算。",
        en: "All calorie targets and macronutrient splits are processed locally inside your browser and never uploaded. You can safely experiment with various cutting and bulking parameters with complete confidentiality.",
      },
    },
  ],

  bfp: [
    {
      question: {
        zh: "体脂率多少算健康的正常区间？",
        en: "What is a healthy body fat percentage range?",
      },
      answer: {
        zh: "根据美国运动医学会（ACSM）标准，成年男性健康体脂率为 10%~20%（运动员约 6%~13%）；成年女性因必需脂肪需求，健康体脂率为 18%~28%（运动员约 14%~20%）。体脂过高或过低均可能干扰内分泌。",
        en: "According to ACSM benchmarks, healthy body fat for adult men is 10%–20% (6%–13% for athletes); for adult women, healthy levels range between 18%–28% (14%–20% for athletes) due to essential reproductive adipose tissue. Extremes in either direction disrupt hormones.",
      },
    },
    {
      question: {
        zh: "为什么家用生物电阻抗体脂秤每天测都不一样？",
        en: "Why do bioimpedance body fat scales fluctuate daily?",
      },
      answer: {
        zh: "家用体脂秤采用微弱生物电流测算电阻，其结果极易受体内水分、前一晚盐分摄入、排便、运动出汗及脚底湿度影响。相较而言，皮尺围度法（美国海军法）受体液干扰更小，追踪长期体型趋势更稳定。",
        en: "Consumer body fat scales pass a micro-current through limbs and are highly sensitive to hydration, sodium intake, bowel fullness, sweat rate, and skin moisture. The US Navy tape circumference method is far less prone to acute fluid shifts.",
      },
    },
    {
      question: {
        zh: "减脂过程中体脂率降得很慢该怎么应对？",
        en: "What should I do if body fat percentage drops slowly during a cut?",
      },
      answer: {
        zh: "减脂初期体重下降往往包含水分与糖原，随后脂肪消耗速度会进入平稳期。科学可持续的减脂速率为每周减轻体重的 0.5%~1%。若超过 3 周腰围体重均无变化，可将每日热量微削减 100~150 大卡或增加轻有氧。",
        en: "Early weight loss often reflects glycogen and water flushing, followed by steady fat oxidation. A sustainable rate is 0.5%–1% of total bodyweight per week. If tape measurements stall for over 3 weeks, reduce daily intake by 100–150 kcal or increase daily steps.",
      },
    },
    {
      question: {
        zh: "美国海军体围法测算体脂率准吗？",
        en: "How accurate is the US Navy body fat formula?",
      },
      answer: {
        zh: "美国海军法由霍奇登（Hodgdon）和贝克特（Beckett）通过数千名军人 DEXA 双能 X 射线扫描校准建立，平均误差约在 3%~4% 之间，是目前低成本测量中极具循证参考价值的人体测量学方法。",
        en: "The US Navy formula was calibrated by Hodgdon and Beckett against gold-standard DEXA scans across military cohorts. With an average error margin of only 3%–4%, it is one of the most reliable accessible anthropometric methods available.",
      },
    },
    {
      question: {
        zh: "我的腰围颈围测量数据会被保存吗？",
        en: "Are my waist, neck, and hip measurements saved?",
      },
      answer: {
        zh: "测算用到的颈围、腰围及臀围数值完全留存在本地浏览器会话中，FitKit 绝不收集任何用户身材隐私数据，适合放心定期复测打卡。",
        en: "Circumference measurements remain completely within your private browser cache. FitKit does not collect or transmit body measurement metrics, providing a secure space to log your transformation.",
      },
    },
  ],

  water: [
    {
      question: {
        zh: "运动出汗后一定要喝运动饮料吗？",
        en: "Do I always need an electrolyte sports drink during exercise?",
      },
      answer: {
        zh: "持续运动 60 分钟以内且强度适中，饮用常温白开水即可满足需求；若在高热环境下连续剧烈运动超 1 小时，或出汗量极大（衣服明显结盐霜），需适量补充含钠、钾的电解质水以防止低钠血症和肌肉痉挛。",
        en: "For moderate workouts under 60 minutes, plain water is completely sufficient. For sessions exceeding one hour in hot environments with profuse sweating, electrolyte beverages with sodium and potassium are recommended to prevent hyponatremia and cramping.",
      },
    },
    {
      question: {
        zh: "喝太多水会发生“水中毒”吗？",
        en: "Can drinking too much water cause water intoxication?",
      },
      answer: {
        zh: "短时间内（如 1 小时内）暴饮数升白开水可能导致血液稀释性低钠血症（俗称水中毒）。健康饮水原则是“少量多次、匀速补充”，单次饮水控制在 150~250ml，让肾脏有充足时间调节水盐渗透压。",
        en: "Gulping multiple liters of pure water in a very short window can dilute blood sodium, causing hyponatremia. The scientific protocol is 'sip frequently in modest amounts' (150–250ml per serving), allowing kidneys time to maintain osmotic equilibrium.",
      },
    },
    {
      question: {
        zh: "咖啡、茶水和汤汁可以计入每日饮水量吗？",
        en: "Do coffee, tea, and broths count toward daily fluid targets?",
      },
      answer: {
        zh: "可以计入。现代运动生理学研究已证实，中低浓度咖啡和清茶的轻微利尿作用远不足以抵消其带来的水分净补给，因此日常无糖茶与美式均可按大部分比例计入日均液体摄入总量。",
        en: "Yes. Clinical hydration studies demonstrate that moderate caffeine from black coffee and unsweetened tea does not induce net fluid loss. They contribute positively toward your 24-hour total fluid hydration target.",
      },
    },
    {
      question: {
        zh: "每日饮水量计算结果准吗？",
        en: "How accurate is this hydration intake target?",
      },
      answer: {
        zh: "计算器依据美国运动医学会（ACSM）及美国国家医学院（NAM）体重流体需求方程设计，结合了气温与训练强度增量。可结合每日晨起第一次排尿颜色（浅黄色为理想）动态验证水分充足度。",
        en: "The calculator integrates ACSM and National Academy of Medicine fluid balance equations adjusted for activity sweat rate. Check your morning urine color (pale straw yellow is optimal) as a reliable daily verification check.",
      },
    },
    {
      question: {
        zh: "我的补水打卡与体重记录会被保存吗？",
        en: "Is my daily hydration tracking data saved on a server?",
      },
      answer: {
        zh: "所有补水计划与参数均保存在本地客户端，FitKit 没有任何后端账户系统收集饮水记录，保障你的作息与健康数据隐私安全。",
        en: "All hydration goals and weight parameters reside purely on your device. FitKit operates with zero server tracking or user accounts, safeguarding your lifestyle habits.",
      },
    },
  ],

  hr: [
    {
      question: {
        zh: "Zone 2 黄金燃脂跑一定要跑 30 分钟以上才开始烧脂吗？",
        en: "Does Zone 2 cardio only start burning fat after 30 minutes?",
      },
      answer: {
        zh: "这是流传已久的谣言。运动的第一秒起脂肪与糖原就在协同供能，只是在低强度慢跑（Zone 2）达到稳态心率后，脂肪氧化供能占比会达到峰值。哪怕只慢跑 20 分钟，脂肪依然在高效参与做功。",
        en: "This is a widespread myth. Both fatty acids and glycogen are oxidized from the very first minute of motion. In steady-state Zone 2, the percentage of fat oxidation peaks. Even a 20-minute run provides meaningful fat oxidation.",
      },
    },
    {
      question: {
        zh: "日常运动手环和心率手表测得准吗？",
        en: "How accurate are optical wrist-based heart rate watches?",
      },
      answer: {
        zh: "现代主流光学心率手表在稳态慢跑、骑行等节奏平缓的有氧运动中准确率可达 90% 以上；但在高频甩臂、战绳或力量举等剧烈手腕晃动场景中可能存在延迟。追求极致精度的跑者建议搭配心率胸带。",
        en: "Contemporary optical wrist monitors achieve over 90% accuracy during steady-state jogging and cycling. However, explosive arm motions, HIIT, and heavy lifting can cause latency; pairing with a chest strap provides clinical precision.",
      },
    },
    {
      question: {
        zh: "心率总是很容易飙升超出 Zone 2 怎么办？",
        en: "What should I do if my heart rate easily spikes out of Zone 2?",
      },
      answer: {
        zh: "这是有氧心肺底盘尚未建立的常见现象。初学者可以果断采取“走跑结合”（Run-Walk-Run）策略：心率快超标时转为快走，待心率回落至区间中下沿再继续慢跑，经过 6~8 周训练有氧耐力会显著增强。",
        en: "This reflects an aerobic base that is still developing. Adopt a run-walk strategy: transition to brisk walking when heart rate hits the upper boundary, then resume jogging once it drops, steadily building mitochondrial density over 6–8 weeks.",
      },
    },
    {
      question: {
        zh: "靶心率计算区间的科学依据是什么？结果准吗？",
        en: "What is the scientific basis for the target heart rate zones?",
      },
      answer: {
        zh: "本工具采用现代田中公式（Tanaka HRmax = 208 - 0.7 × 年龄）及 Karvonen 储备心率法，修正了传统“220-年龄”对中老年及运动群体的偏差。因窦房结生理差异，测算区间供训练配速参考，非临床诊断。",
        en: "This tool utilizes the Tanaka equation (208 - 0.7 × Age) and Karvonen heart rate reserve model, correcting flaws in the outdated '220 - age' rule. Individual resting heart rate variations apply; use zones for pacing rather than medical diagnosis.",
      },
    },
    {
      question: {
        zh: "我的静息心率与测算数据会被保存吗？",
        en: "Are my resting heart rate and fitness metrics saved?",
      },
      answer: {
        zh: "所有心率数值完全留存在当前网页运行环境中，FitKit 不设后端数据库收集或同步任何个人生理健康指标，请放心使用。",
        en: "All resting and maximal heart rate data exist strictly in client-side memory. FitKit does not harvest or retain personal physiological data.",
      },
    },
  ],

  ibw: [
    {
      question: {
        zh: "经常做大重量抗阻力量训练的人，标准体重公式还适用吗？",
        en: "Does the Ideal Body Weight formula apply to muscular strength lifters?",
      },
      answer: {
        zh: "局限性较大。传统 Devine 理想体重公式基于统计学普通人群骨架身高构建，无法区分高密度骨骼肌与体脂。健美及力量举运动员体重常超标，但体脂极低，应以体脂率（BFP）和腰围作为核心体态指标。",
        en: "It has recognized limitations for athletes. The Devine formula was established for general physiological reference and cannot differentiate between muscle mass and adipose tissue. Muscular athletes should prioritize body fat percentage over scale weight.",
      },
    },
    {
      question: {
        zh: "BMI 处于超重区间，就一定意味着需要减肥吗？",
        en: "If my BMI is in the overweight range, does it automatically mean I am fat?",
      },
      answer: {
        zh: "不一定。BMI 仅粗略反映体重与身高的比例关系，无法反映内脏脂肪与肌肉分布。如果一个成年男性体脂率为 12% 且腹部无多余赘肉，即使 BMI 达到 26 也属于非常健康健硕的状态，无需盲目减重。",
        en: "Not necessarily. BMI is an epidemiological ratio that ignores visceral fat and muscularity. A lifter with 12% body fat and tight waistline may have a BMI of 26 while displaying optimal metabolic health.",
      },
    },
    {
      question: {
        zh: "为什么不同公式（Devine / Robinson / Miller）算出的标准体重不一样？",
        en: "Why do different formulas (Devine, Robinson, Miller) give different weights?",
      },
      answer: {
        zh: "各公式是在不同年代基于不同人群样本建立的经验回归模型。例如 Devine 公式最初用于测定临床药物排泄清除率，而 Robinson 对其进行了身高斜率微调。FitKit 汇总各权威模型给出健康区间，更具包容性。",
        en: "Each formula was calibrated on distinct historical population cohorts. Devine was originally constructed for clinical pharmacokinetics, while Robinson adjusted the height slope. FitKit displays the overlapping healthy bracket for greater practical utility.",
      },
    },
    {
      question: {
        zh: "标准理想体重测算准吗？",
        en: "How accurate is the Ideal Body Weight assessment?",
      },
      answer: {
        zh: "公式为世界卫生组织（WHO）及临床药理学长期采纳的估算基准，适于评估长期健康风险。骨架粗细（腕围）和肌肉量会产生正常偏离，数值适合作为体重管理的大致灯塔，不作为单一医疗判定标准。",
        en: "These equations are standard clinical baselines adopted by the WHO to estimate morbidity risks. Wrist frame size and lean tissue cause natural variations; treat results as a macro benchmark rather than rigid diagnostic criteria.",
      },
    },
    {
      question: {
        zh: "我的身高与体重数据会被保存吗？",
        en: "Are my height and target weight records saved on your server?",
      },
      answer: {
        zh: "你在标准体重计算器中输入的身高数据仅存在于本地浏览器会话中，FitKit 绝不上传或记录你的任何身材隐私，请安心测算。",
        en: "All biometric inputs remain entirely within your private browser tab session. FitKit has no backend telemetry logging your physical measurements.",
      },
    },
  ],

  splits: [
    {
      question: {
        zh: "零基础成年人多久能练成横叉或竖叉一字马？",
        en: "How long does it take an adult beginner to achieve the splits?",
      },
      answer: {
        zh: "取决于髋臼解剖形态（前倾/后倾角）、初始柔韧底子及训练一致性。成年人通常需要持续、规律进行 3~12 个月的循证 PNF 拉伸与活动度训练；竖叉相较横叉通常更快达成。切忌暴力下压造成内收肌撕裂。",
        en: "Progress depends on femoral-acetabular anatomy, starting fascial stiffness, and training consistency. Adults typically require 3–12 months of disciplined PNF stretching. Front splits are usually achieved faster than middle splits; avoid forceful pushing to prevent adductor tears.",
      },
    },
    {
      question: {
        zh: "每天拉伸多长时间最合适？是不是拉越久越好？",
        en: "How long should I stretch each day, and is longer always better?",
      },
      answer: {
        zh: "并非越久越好。过度被动拉伸会造成肌纤维微撕裂和神经牵张反射迟钝。科学方案是热身后进行 15~25 分钟专项拉伸，单群体位保持 30~60 秒，重复 3~4 组，每周安排 3~5 次并给结缔组织充分的修复间隙。",
        en: "More is not always better. Excessive passive stretching causes micro-trauma and blunts the stretch reflex. Spend 15–25 minutes per session post-warmup, holding end-range poses for 30–60 seconds across 3–4 sets, 3–5 days per week to allow connective tissue recovery.",
      },
    },
    {
      question: {
        zh: "为什么拉伸时总感觉大腿根部有骨头卡住的刺痛感？",
        en: "Why do I feel pinching bone-on-bone pain in the hip crease during splits?",
      },
      answer: {
        zh: "这通常是骨盆位置不对造成的股骨颈与髋臼边缘撞击（FAI）。练习横叉时，需主动骨盆前倾并外旋双腿，让股骨头转入髋臼窝最宽裕的滑行轨道，切勿在骨盆后倾扣死的僵硬角度硬撑。",
        en: "This frequently indicates Femoroacetabular Impingement (FAI) caused by suboptimal pelvic alignment. During middle splits, anteriorly tilt the pelvis and externally rotate femurs to seat femoral heads into clear acetabular clearance.",
      },
    },
    {
      question: {
        zh: "一字马柔韧度打卡测算准吗？",
        en: "How reliable are the splits angle and distance progression trackers?",
      },
      answer: {
        zh: "打卡工具基于几何投影力学计算离地距离与开胯夹角，只要每次在同一硬质瑜伽砖或标尺参照物下测量，就能以极高精度量化关节活动度与肌小节串联延长的微观蜕变，结果供柔韧训练打卡参考。",
        en: "The tracker calculates geometric angle and floor-to-groin clearance. When measured consistently with the same yoga block or floor benchmark, it provides highly reliable objective feedback on sarcomere lengthening and joint mobility.",
      },
    },
    {
      question: {
        zh: "我的拉伸打卡历史和开胯角度会被保存吗？",
        en: "Is my stretching progression history stored in the cloud?",
      },
      answer: {
        zh: "你记录的下落距离与角度数据完全保存在当前浏览器的 LocalStorage 中，不会上传到服务器，换设备或清理缓存后会重置，保障个人训练记录私密。",
        en: "Your flexibility progression records are saved exclusively in your browser LocalStorage. No workout records are uploaded to any server, keeping your personal milestones completely private.",
      },
    },
  ],
};
