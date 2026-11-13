export type Sex = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export const ACTIVITY_LEVELS: Record<
  ActivityLevel,
  { factor: number; labelZh: string; labelEn: string; descZh: string; descEn: string }
> = {
  sedentary: {
    factor: 1.2,
    labelZh: "久坐",
    labelEn: "Sedentary",
    descZh: "办公室工作，几乎不运动",
    descEn: "Little or no exercise, desk job",
  },
  light: {
    factor: 1.375,
    labelZh: "轻度活动",
    labelEn: "Lightly active",
    descZh: "每周轻运动 1–3 天",
    descEn: "Light exercise 1–3 days/week",
  },
  moderate: {
    factor: 1.55,
    labelZh: "中度活动",
    labelEn: "Moderately active",
    descZh: "每周中度运动 3–5 天",
    descEn: "Moderate exercise 3–5 days/week",
  },
  active: {
    factor: 1.725,
    labelZh: "高度活动",
    labelEn: "Very active",
    descZh: "每周高强度运动 6–7 天",
    descEn: "Hard exercise 6–7 days/week",
  },
  very_active: {
    factor: 1.9,
    labelZh: "极高强度",
    labelEn: "Extremely active",
    descZh: "每天高强度运动 / 体力劳动",
    descEn: "Very hard exercise / physical job",
  },
};

export interface BmrInput {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: Sex;
}

/** Mifflin-St Jeor BMR, kcal/day. Returns unrounded value. */
export function calculateBMR({ weightKg, heightCm, age, sex }: BmrInput): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_LEVELS[activityLevel].factor;
}

export interface CalorieTargets {
  bmr: number;
  tdee: number;
  cutLow: number;
  cutHigh: number;
  maintain: number;
  bulkLow: number;
  bulkHigh: number;
}

/** All displayed values are Math.round() of the unrounded calculation. */
export function getCalorieTargets(
  input: BmrInput,
  activityLevel: ActivityLevel
): CalorieTargets {
  const bmr = calculateBMR(input);
  const tdee = calculateTDEE(bmr, activityLevel);
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    cutLow: Math.round(tdee - 500),
    cutHigh: Math.round(tdee - 300),
    maintain: Math.round(tdee),
    bulkLow: Math.round(tdee + 250),
    bulkHigh: Math.round(tdee + 500),
  };
}

export type MacroGoal = "cut" | "maintain" | "bulk";

export interface MacroResult {
  calories: number; // kcal/day
  proteinG: number;
  carbsG: number;
  fatG: number;
  proteinPerKg: number;
  fatPerKg: number;
}

/**
 * 蛋白质优先，脂肪次之，碳水补足剩余热量。
 * cut: protein 2.6 g/kg, fat 0.8 g/kg
 * maintain: protein 2.0 g/kg, fat 0.8 g/kg
 * bulk: protein 2.0 g/kg, fat 0.8 g/kg
 * 1 g protein/carbs = 4 kcal, 1 g fat = 9 kcal
 */
export function calculateMacros(
  calories: number,
  weightKg: number,
  goal: MacroGoal
): MacroResult {
  const proteinPerKg = goal === "cut" ? 2.6 : 2.0;
  const fatPerKg = 0.8;
  const proteinG = Math.round(weightKg * proteinPerKg);
  const fatG = Math.round(weightKg * fatPerKg);
  const carbsG = Math.max(
    0,
    Math.round((calories - proteinG * 4 - fatG * 9) / 4)
  );
  return {
    calories: Math.round(calories),
    proteinG,
    carbsG,
    fatG,
    proteinPerKg: Math.round(proteinPerKg * 100) / 100,
    fatPerKg: Math.round(fatPerKg * 100) / 100,
  };
}
