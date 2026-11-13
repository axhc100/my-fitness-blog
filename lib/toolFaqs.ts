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
        zh: "BMR 是静止维持生命所需的最低热量；TDEE 则在 BMR 基础上累加了日常活动与运动消耗。制定减脂或增肌饮食计划时，均应以 TDEE 为基准调整热量缺口或盈余。",
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
        zh: "国际运动营养学会（ISSN）研究证实，肾功能正常的健康人群长期按每公斤体重摄入 1.6~2.2g 蛋白质非常安全，不会伤肾。仅慢性肾病患者需遵医嘱限制摄入。",
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
        zh: "ACSM 标准指出：成年男性健康体脂率为 10%~20%（运动员 6%~13%）；成年女性为 18%~28%（运动员 14%~20%）。体脂过高或过低均会影响内分泌健康。",
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
        zh: "适用性有限。Devine 等标准体重公式基于普通人群统计，无法区分肌肉与体脂。肌肉量大的训练者体重常超标但体脂很低，建议以体脂率与腰围作为核心指标。",
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

  bmi: [
    {
      question: {
        zh: "BMI 超标就一定是胖吗？",
        en: "If my BMI is in the overweight range, does it definitely mean I am overweight?",
      },
      answer: {
        zh: "不一定。BMI（身体质量指数）仅基于身高与体重比例测算，无法区分脂肪组织与去脂骨骼肌。如果经常进行抗阻力量训练、肌肉量充沛且腰围紧致，即使 BMI 达到 25~28 处于超重区间，也属于代谢非常健康的肌肉型体格，无需盲目节食减重。",
        en: "Not necessarily. BMI evaluates only height-to-weight proportion and cannot distinguish adipose tissue from skeletal muscle. Resistance-trained athletes with high muscle mass and tight waistlines often register in the overweight category (25–28) while maintaining optimal metabolic and cardiovascular health.",
      },
    },
    {
      question: {
        zh: "肌肉多或经常力量训练的人，BMI 还适用吗？",
        en: "Is BMI accurate for bodybuilders and muscular individuals?",
      },
      answer: {
        zh: "适用性受限。对于健美运动员、重竞技力量举选手及高肌肉量人群，BMI 往往会产生“虚假超重或肥胖”的假象。对这部分人群，建议结合体脂率（美国海军体围法）、腰臀比（WHR）与去脂体重指数（FFMI）综合评估。",
        en: "It has notable limitations for muscular populations. Bodybuilders and strength lifters will frequently register false positive overweight readings. For athletes, body fat percentage (US Navy method), waist-to-hip ratio, and Fat-Free Mass Index (FFMI) provide vastly superior assessments.",
      },
    },
    {
      question: {
        zh: "BMI 和体脂率（BFP）有什么本质区别？",
        en: "What is the fundamental difference between BMI and Body Fat Percentage?",
      },
      answer: {
        zh: "BMI 是一项针对大众人口的宏观流行病学筛查工具，仅反映体重是否过重；而体脂率（BFP）直接量化脂肪组织占总体重的百分比。体脂率能敏锐识别“隐形肥胖”（Skinny Fat，即体重正常但内脏脂肪与体脂过高、肌肉匮乏）。",
        en: "BMI is an epidemiological population screening metric indicating relative heaviness, whereas Body Fat Percentage directly measures the proportion of adipose tissue. Body fat percentage accurately reveals 'skinny fat' (normal BMI with excess visceral fat and inadequate skeletal muscle).",
      },
    },
    {
      question: {
        zh: "多久测一次 BMI 最合适？",
        en: "How often should I measure my BMI?",
      },
      answer: {
        zh: "对于普通成年人，每 2~4 周固定在清晨空腹、排便后测量一次体重并计算 BMI 即可。BMI 是长期体型趋势指标，短期（日内或隔天）由水分、盐分与肠道充盈引起的 1~2 公斤体重波动不代表真实体质改变，无需频繁天天测算。",
        en: "Measuring once every 2–4 weeks first thing in the morning (fasted, post-elimination) is ideal for tracking long-term trends. Daily scale fluctuations of 1–2 kg from water retention, sodium, and glycogen do not reflect genuine body composition changes.",
      },
    },
    {
      question: {
        zh: "我的身体数据会被保存吗？",
        en: "Are my personal height and weight measurements saved?",
      },
      answer: {
        zh: "你在 BMI 计算器中输入的身高、体重等数值仅在你的浏览器本地进行即时计算或缓存，绝不上传到任何后端云端服务器，充分保护个人隐私。",
        en: "All height and weight measurements are processed purely within your client browser tab session and cached locally. No personal biometric data is ever transmitted to backend servers.",
      },
    },
  ],

  "1rm": [
    {
      question: {
        zh: "1RM 是什么？为什么要测算 1RM？",
        en: "What is 1RM and why should I calculate it?",
      },
      answer: {
        zh: "1RM（One Repetition Maximum，最大单次重复重量）是指在特定力量动作（如深蹲、卧推、硬拉）中，保持标准技术动作只能完成 1 次的极限重量。1RM 是力量训练的“黄金基准标尺”，所有科学周期化训练的负荷百分比（如 70% 增肌容量组、85% 力量强化组）都以 1RM 为基准进行精准配重。",
        en: "1RM (One Repetition Maximum) represents the maximum weight an individual can lift for a single repetition with proper biomechanical technique. It serves as the foundational benchmark for strength programming, allowing lifters to calculate precise training percentages (e.g., 70% for hypertrophy, 85% for pure strength).",
      },
    },
    {
      question: {
        zh: "Epley 公式算出来的 1RM 准吗？",
        en: "How accurate is the Epley 1RM formula?",
      },
      answer: {
        zh: "在 1~10 次中低重复区间内，Epley 公式（1RM = 重量 × (1 + 次数/30)）非常准确，经过数十项运动人体科学对照实验验证，与实测 1RM 的统计误差通常在 2%~5% 以内。公式通过次极大负荷（如 5 次或 8 次）安全推算极限，避免了直接冲极限受伤的风险。",
        en: "Within the 1–10 rep range, the Epley formula is exceptionally accurate, with peer-reviewed literature showing a 2%–5% margin of error compared to direct laboratory testing. It provides a safe surrogate by estimating maximal strength from submaximal sets, avoiding the high injury risk of true limit testing.",
      },
    },
    {
      question: {
        zh: "重复次数超过 10 次还能准确测算 1RM 吗？",
        en: "Can I accurately calculate 1RM if my reps exceed 10?",
      },
      answer: {
        zh: "误差会显著放大。当单组重复次数超过 10 次（例如 12~20 次）时，决定你能做多少次的核心生理因素从“最大神经肌纤维募集能力”转变为“肌耐力与乳酸耐受力”。因此，建议选择能够在 3~10 次内力竭的重量来代入计算，测算出的 1RM 最为准确。",
        en: "Accuracy diminishes significantly. Beyond 10 reps (e.g., 12–20 reps), performance is governed primarily by local muscular endurance, buffering capacity, and cardiovascular conditioning rather than maximum motor unit recruitment. For optimal accuracy, select a test weight you can lift between 3 and 10 repetitions.",
      },
    },
    {
      question: {
        zh: "力量训练新手可以直接测试真实的 1RM 极限吗？",
        en: "Can strength training beginners safely test true 1RM?",
      },
      answer: {
        zh: "强烈不建议新手直接冲刺真实 1RM。初学者中枢神经系统动作定型尚未成熟，大重量下极易发生代偿变形（如深蹲弓背夹膝、卧推弹胸翻手腕），极易引发肌腱撕裂或腰椎损伤。新手应使用本工具通过 5~8 次的稳定重量安全估算 1RM。",
        en: "Beginners should strictly avoid testing true 1RM limits. Novices lack the neuromuscular coordination, stabilizing integrity, and structural groove required for maximal single attempts, creating substantial risk of tendon strains or spinal injury. Novices should always estimate 1RM safely via 5–8 rep sets.",
      },
    },
    {
      question: {
        zh: "我的动作和重量数据会被保存吗？",
        en: "Are my exercise choices and weight records saved on your server?",
      },
      answer: {
        zh: "你在 1RM 计算器中选择的动作、输入的负重与次数仅保留在当前浏览器本地会话中，FitKit 没有任何后端数据库收集或存储你的个人训练数据，请放心使用。",
        en: "All exercise selections, weight inputs, and rep counts reside entirely within your private browser tab session and local storage. FitKit does not log, upload, or monetize personal workout telemetry.",
      },
    },
  ],

  protein: [
    {
      question: {
        zh: "一天到底吃多少蛋白质最合适？",
        en: "How much protein do I actually need per day?",
      },
      answer: {
        zh: "蛋白质需求取决于日常活动量与训练目标：久坐普通成年人建议 0.8–1.0g/kg 体重以维持基础氮平衡；耐力运动爱好者建议 1.2–1.6g/kg；抗阻增肌力量训练者建议 1.6–2.2g/kg；减脂期为最大限度防止肌肉分解，建议提高至 1.8–2.4g/kg。",
        en: "Requirements depend on activity and fitness goals: sedentary adults need 0.8–1.0g/kg to maintain nitrogen balance; endurance athletes need 1.2–1.6g/kg; resistance-trained lifters aiming for hypertrophy need 1.6–2.2g/kg; and those in a caloric deficit require 1.8–2.4g/kg to preserve lean tissue.",
      },
    },
    {
      question: {
        zh: "蛋白质一次吃太多吸收得了吗？",
        en: "Is there a limit to how much protein the body can absorb in one meal?",
      },
      answer: {
        zh: "胃肠道对蛋白质的消化吸收率极高，几乎所有摄入的氨基酸最终都会被完全吸收；但在单餐中，刺激“肌肉蛋白质合成（MPS）”的最大效应窗口通常在 25–45g（富含约 2.5–3g 亮氨酸）。多余部分将作为能量氧化或储存，因此将全天蛋白质分摊至 3–4 餐是最高效的策略。",
        en: "The digestive tract absorbs nearly 100% of consumed amino acids, but the trigger for maximal Muscle Protein Synthesis (MPS) caps at approximately 25–45g per meal (yielding ~2.5–3g leucine). Distributing daily intake evenly across 3–4 meals is physiologically optimal for muscle growth.",
      },
    },
    {
      question: {
        zh: "高蛋白饮食会伤肾或导致钙流失吗？",
        en: "Does a high-protein diet cause kidney damage or bone loss?",
      },
      answer: {
        zh: "国际运动营养学会（ISSN）与多项大型系统性综述证实：在肾功能健康的成年人中，长期摄入 1.6–2.4g/kg 甚至更高的高蛋白饮食非常安全，不会损害肾小球滤过率；同时高蛋白还能促进胰岛素样生长因子-1（IGF-1）分泌，增加骨密度而非导致骨质疏松。既往有慢性肾病者应遵医嘱。",
        en: "Extensive clinical trials by the ISSN confirm that high protein intakes (1.6–2.4+ g/kg) do not impair renal filtration or kidney health in individuals with normal kidney function, nor do they induce bone demineralization. Patients with pre-existing renal disease must consult a physician.",
      },
    },
    {
      question: {
        zh: "蛋白粉和天然食物（肉蛋奶豆）有什么区别？",
        en: "What is the difference between protein powder and whole foods?",
      },
      answer: {
        zh: "蛋白粉（乳清蛋白、大豆分离蛋白等）是经过提纯过滤的浓缩食品，核心优势在于便携、吸收快、热量纯净且性价比高；而全营养天然食物（如牛肉、三文鱼、鸡蛋）额外富含铁、锌、B族维生素与健康脂肪。建议日常饮食以天然食物为主，蛋白粉作为便捷加餐补充。",
        en: "Protein powders (whey, casein, soy isolate) are purified whole-food derivatives offering fast digestion, low non-protein calories, and convenience. Whole food sources (chicken, salmon, eggs, lentils) provide essential micronutrients like iron, zinc, and B-vitamins. A balanced combination works best.",
      },
    },
    {
      question: {
        zh: "我的数据会被保存吗？",
        en: "Are my biometric inputs and goals saved on a server?",
      },
      answer: {
        zh: "你在蛋白质需求计算器中输入的体重与目标选择仅保存在你当前浏览器本地，绝不上传到任何后端服务器，保证个人隐私安全。",
        en: "All weight parameters and fitness targets are processed purely inside your private browser session and local storage. No health telemetry is uploaded to external servers.",
      },
    },
  ],

  "fat-loss": [
    {
      question: {
        zh: "减脂速度多快才健康？",
        en: "How fast is a healthy rate of fat loss?",
      },
      answer: {
        zh: "国际运动医学与营养学会普遍建议：安全健康的减重速率为每周减轻自身体重的 0.5%~1%（通常约为 0.5~1.0kg）。这个节奏能在最大化燃烧脂肪的同时，最大限度保护瘦体重（骨骼肌）与基础代谢率，避免出现皮肤松弛、免疫力低下与报复性暴食反弹。",
        en: "Sports science and clinical guidelines consistently recommend a healthy fat loss rate of 0.5% to 1.0% of body weight per week (typically 0.5–1.0 kg/week). This pace maximizes adipose tissue oxidation while sparing skeletal muscle and metabolic rate, mitigating hormonal crashes and rebound binging.",
      },
    },
    {
      question: {
        zh: "7700 大卡等于 1kg 脂肪准吗？",
        en: "Is the 7,700 kcal per kg rule accurate?",
      },
      answer: {
        zh: "7700 大卡规则源自经典 Wishnofsky 模型。人体 1kg 纯体脂组织中含有约 87% 的纯甘油三酯与约 13% 的水分与细胞基质（9000 kcal × 87% ≈ 7700~7800 kcal）。虽然人体存在动态代谢适应（Adaptive Thermogenesis），但 7700 大卡作为宏观减脂周期的热量缺口基准预测，在临床实践中依然极具指导价值。",
        en: "The 7,700 kcal rule originates from the classic Wishnofsky model. Human adipose tissue contains approximately 87% pure triglycerides and 13% water/cellular proteins (9,000 kcal × 87% ≈ 7,700 kcal). While dynamic metabolic adaptation occurs over time, 7,700 kcal remains an exceptionally reliable clinical baseline for estimating deficit timelines.",
      },
    },
    {
      question: {
        zh: "减脂进入平台期怎么办？",
        en: "How to overcome a fat loss plateau?",
      },
      answer: {
        zh: "减重平台期往往由三方面原因引起：① 体重下降后自身 BMR 与维持热量自然降低，原有的热量缺口缩小；② 饮食记录产生无意识的漏记或酱料超标；③ 长期热量赤字引发皮质醇升高导致身体水分潴留。突破方法：重新测算当前体重下的最新 TDEE、安排 1~2 周的等热量“饮食中断（Diet Break）”降低皮质醇，并配合充足睡眠。",
        en: "Plateaus are typically driven by three mechanisms: reduced BMR and TDEE due to lower body mass, subconscious calorie tracking creep, or elevated cortisol inducing extracellular water retention. To break through: recalculate your TDEE for your new weight, ensure consistent NEAT activity, and consider a 1–2 week maintenance diet break to normalize hormonal balance.",
      },
    },
    {
      question: {
        zh: "热量缺口越大减得越快越好吗？",
        en: "Is a bigger calorie deficit always better?",
      },
      answer: {
        zh: "绝对不是。当每日热量缺口超过 750~1000 大卡时，身体会启动进化自保机制：下调甲状腺素分泌、分解肌肉糖异生供能、无意识减少日常非运动消耗（NEAT），并强烈分泌饥饿素（Ghrelin）。这种极端缺口不仅导致掉肌肉和代谢损伤，更几乎必然在停止节食后迅速报复性反弹。",
        en: "Definitely not. Aggressive deficits exceeding 750–1,000 kcal/day trigger severe metabolic downregulation: suppressed thyroid hormones, skeletal muscle catabolism for gluconeogenesis, plummeting spontaneous activity (NEAT), and intense hunger surges. Severe deficits almost always culminate in muscle loss and rapid rebound weight gain.",
      },
    },
    {
      question: {
        zh: "我的数据会被保存吗？",
        en: "Is my personal data saved or tracked?",
      },
      answer: {
        zh: "你在减脂速度预测计算器中输入的当前体重、目标体重与热量缺口数据仅保留在你当前浏览器的本地存储中，FitKit 绝不上传或追踪任何个人健康隐私数据。",
        en: "All starting weights, target weights, and calorie deficit values are processed and cached strictly inside your local browser. FitKit does not upload, log, or share your personal health metrics.",
      },
    },
  ],

  volume: [
    {
      question: {
        zh: "训练容量是什么？怎么计算？",
        en: "What is training volume and how is it calculated?",
      },
      answer: {
        zh: "训练容量（Volume Load）是衡量抗阻力训练机械刺激总量的金标准物理指标，计算公式为：容量 = 组数 × 每组次数 × 重量（kg）。例如深蹲完成 4 组 × 8 次 × 100kg，该动作的训练容量即为 3,200kg。现代运动科学研究（如 Brad Schoenfeld 博士等）证实，在适宜的训练强度与动作规范下，训练容量是刺激肌纤维肌原纤维肥大的核心驱动力。",
        en: "Training volume load is the gold-standard metric for quantifying mechanical work in resistance training, calculated as: Volume = Sets × Reps × Weight (kg). For example, squatting 4 sets × 8 reps × 100kg yields 3,200kg of volume load. Peer-reviewed sports science confirms that within appropriate intensity ranges, volume is the primary driver of muscular hypertrophy.",
      },
    },
    {
      question: {
        zh: "训练容量和训练强度哪个更重要？",
        en: "Which is more important: training volume or intensity?",
      },
      answer: {
        zh: "两者相辅相成，缺一不可。强度（负荷百分比与接近力竭程度 RIR）是触发肌纤维高阈值运动单位募集的“启动开关”，通常需要达到 60%~85% 1RM 或距离力竭 1~3 次；而容量（高质量有效组数与总吨位）则是积累机械张力与肌肉生长刺激的“驱动累加器”。离开强度的垃圾容量无法增肌，离开容量的过高极限单把也无法积累足够的肥大刺激。",
        en: "Both are inextricably linked. Intensity (% of 1RM and proximity to failure / RIR) acts as the prerequisite threshold to recruit high-threshold motor units (typically 60%–85% 1RM, 1–3 RIR). Volume represents the dosage of mechanical tension accumulated. Junk volume lacking intensity fails to stimulate growth, while single maximal attempts without volume provide insufficient stimulus.",
      },
    },
    {
      question: {
        zh: "每周练多少容量才够（MEV、MAV、MRV 是什么）？",
        en: "How much weekly volume is optimal (What are MEV, MAV, and MRV)?",
      },
      answer: {
        zh: "这是由 Mike Israetel 博士提出的肌肥大经典容量地标体系：① MV（维持容量）：保持现有肌肉量的底线，通常每周单肌群 4~6 组；② MEV（最小有效容量）：产生可观察肌肥大进展的最低组数，通常每周单肌群 8~12 组；③ MAV（最大适应容量）：产生最佳增肌效益的黄金区间，通常每周单肌群 12~20 组；④ MRV（最大可恢复容量）：身体能有效恢复的容量天花板，通常每周单肌群 22~26+ 组。超过 MRV 将导致过度训练且无法超量恢复。",
        en: "Formulated by Dr. Mike Israetel, these landmarks represent: 1) MV (Maintenance Volume): baseline to preserve muscle mass (~4–6 sets/muscle/week); 2) MEV (Minimum Effective Volume): threshold to elicit measurable hypertrophy (~8–12 sets/muscle/week); 3) MAV (Maximum Adaptive Volume): the sweet spot where gains are fastest and most efficient (~12–20 sets/muscle/week); 4) MRV (Maximum Recoverable Volume): the upper ceiling beyond which the body cannot recover (~22–26+ sets/muscle/week).",
      },
    },
    {
      question: {
        zh: "训练容量长期超过 MRV 会怎么样？",
        en: "What happens if training volume chronically exceeds MRV?",
      },
      answer: {
        zh: "当周训练容量持续超越身体的 MRV 恢复极限时，肌肉蛋白质分解速率（MPB）将持续压倒合成速率（MPS），导致训练者陷入“非功能性过度超负荷”甚至慢性过度训练综合征（Overtraining Syndrome）。典型表现包括力量停滞或倒退、慢性关节滑囊肌腱疼痛、睡眠障碍与食欲减退。此时必须安排为期 1 周的减量周（Deload），将容量减半以消除神经与肌腱疲劳。",
        en: "Chronically exceeding MRV causes muscle protein breakdown (MPB) to exceed synthesis (MPS), precipitating non-functional overreaching and overtraining syndrome. Symptoms include performance stagnation or regression, persistent joint and tendon inflammation, elevated resting heart rate, and insomnia. A planned deload week (reducing volume by ~50%) is mandatory to dissipate accumulated fatigue.",
      },
    },
    {
      question: {
        zh: "我的训练动作与容量数据会被保存吗？",
        en: "Is my workout and volume data saved on a server?",
      },
      answer: {
        zh: "你在训练容量计算器中添加的所有动作、肌群、组数、次数与负重数据仅保存在你当前设备的浏览器 LocalStorage 本地存储中，FitKit 绝不上传或记录你的个人训练日志，充分保证隐私安全。",
        en: "All exercise entries, muscle group selections, sets, reps, and poundages are processed and cached strictly inside your private browser session and local storage. FitKit does not transmit or monetize personal workout logs.",
      },
    },
  ],
};
