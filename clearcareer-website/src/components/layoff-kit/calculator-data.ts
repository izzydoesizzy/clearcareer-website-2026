// ── Province-specific ESA termination & severance rules ──────────────────────
// Sources: Ontario ESA, BC ESA, Alberta ESA, Quebec LSA, Federal Canada Labour Code
// Last verified: April 2026

export interface ProvinceRules {
  code: string;
  name: string;
  /** Termination pay: weeks of notice/pay in lieu by years of service */
  terminationPay: { minYears: number; weeks: number }[];
  /** Severance pay (separate from termination). null = province doesn't have statutory severance */
  severancePay: {
    eligible: boolean;
    minYears?: number;
    employerThreshold?: string; // e.g., "$2.5M payroll"
    weeksPer: number; // weeks per year of service
    maxWeeks: number;
  } | null;
  notes: string;
}

export const PROVINCES: ProvinceRules[] = [
  {
    code: "ON",
    name: "Ontario",
    terminationPay: [
      { minYears: 0, weeks: 0 }, // < 3 months: no entitlement
      { minYears: 0.25, weeks: 1 },
      { minYears: 1, weeks: 2 },
      { minYears: 3, weeks: 3 },
      { minYears: 4, weeks: 4 },
      { minYears: 5, weeks: 5 },
      { minYears: 6, weeks: 6 },
      { minYears: 7, weeks: 7 },
      { minYears: 8, weeks: 8 },
    ],
    severancePay: {
      eligible: true,
      minYears: 5,
      employerThreshold: "$2.5M+ payroll or 50+ employees being severed",
      weeksPer: 1,
      maxWeeks: 26,
    },
    notes:
      "Ontario is the only province with statutory severance pay in addition to termination pay. Combined max: 34 weeks.",
  },
  {
    code: "BC",
    name: "British Columbia",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 1, weeks: 2 },
      { minYears: 3, weeks: 3 },
      { minYears: 4, weeks: 4 },
      { minYears: 5, weeks: 5 },
      { minYears: 6, weeks: 6 },
      { minYears: 7, weeks: 7 },
      { minYears: 8, weeks: 8 },
    ],
    severancePay: null,
    notes: "BC has no statutory severance pay. Only termination pay (notice/pay in lieu). Max 8 weeks.",
  },
  {
    code: "AB",
    name: "Alberta",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 2, weeks: 2 },
      { minYears: 3, weeks: 3 },
      { minYears: 4, weeks: 4 },
      { minYears: 6, weeks: 5 },
      { minYears: 8, weeks: 6 },
      { minYears: 10, weeks: 8 },
    ],
    severancePay: null,
    notes: "Alberta has no statutory severance pay. Only termination pay. Max 8 weeks.",
  },
  {
    code: "QC",
    name: "Quebec",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 1, weeks: 2 },
      { minYears: 5, weeks: 4 },
      { minYears: 10, weeks: 8 },
    ],
    severancePay: null,
    notes:
      "Quebec has no statutory severance. Termination pay (notice) is capped at 8 weeks. However, Quebec labour standards allow employees to file a complaint for unjust dismissal after 2+ years of continuous service.",
  },
  {
    code: "MB",
    name: "Manitoba",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 1, weeks: 2 },
      { minYears: 3, weeks: 4 },
      { minYears: 5, weeks: 6 },
      { minYears: 10, weeks: 8 },
    ],
    severancePay: null,
    notes: "Manitoba has no statutory severance. Max termination pay: 8 weeks.",
  },
  {
    code: "SK",
    name: "Saskatchewan",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 1, weeks: 2 },
      { minYears: 3, weeks: 4 },
      { minYears: 5, weeks: 6 },
      { minYears: 10, weeks: 8 },
    ],
    severancePay: null,
    notes: "Saskatchewan has no statutory severance. Max termination pay: 8 weeks.",
  },
  {
    code: "NS",
    name: "Nova Scotia",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 2, weeks: 2 },
      { minYears: 5, weeks: 4 },
      { minYears: 10, weeks: 8 },
    ],
    severancePay: null,
    notes: "Nova Scotia has no statutory severance. Max termination pay: 8 weeks.",
  },
  {
    code: "NB",
    name: "New Brunswick",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.5, weeks: 2 },
      { minYears: 5, weeks: 4 },
    ],
    severancePay: null,
    notes:
      "New Brunswick has relatively low statutory minimums. Max termination pay: 4 weeks. Common-law entitlements are typically much higher.",
  },
  {
    code: "NL",
    name: "Newfoundland & Labrador",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 1 },
      { minYears: 5, weeks: 2 },
      { minYears: 15, weeks: 3 },
    ],
    severancePay: null,
    notes: "Newfoundland has low statutory minimums. Max termination pay: 3 weeks.",
  },
  {
    code: "PE",
    name: "Prince Edward Island",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.5, weeks: 2 },
      { minYears: 5, weeks: 4 },
      { minYears: 15, weeks: 6 },
    ],
    severancePay: null,
    notes: "PEI has modest statutory minimums. Max termination pay: 6 weeks.",
  },
  {
    code: "FED",
    name: "Federal (Canada Labour Code)",
    terminationPay: [
      { minYears: 0, weeks: 0 },
      { minYears: 0.25, weeks: 2 },
    ],
    severancePay: {
      eligible: true,
      minYears: 1,
      weeksPer: 1.0, // 5 days per year = 1 week per year of service
      maxWeeks: 52, // no explicit cap, but practically limited
    },
    notes:
      "Federal employees (banks, telecoms, airlines, railways, etc.) get 2 weeks notice + 5 days/year severance (1 week/year). Different rules than provincial.",
  },
];

// ── Common-law Bardal factor estimator ─────────────────────────────────────
// Calibrated against published case outcomes and lawyer-published guides.
// Sources: Bardal v Globe & Mail (1960), Currie v Nylene (2022, 26 mo),
// Hussain v Suzuki (26 mo), Timmins v Artisan (2025, 9 mo), Honda v Keays
// (2008 SCC, 15 mo), Rodgers v CEVA (inducement, 14 mo on 3yr tenure).
//
// Courts apply the Bardal factors holistically. No formula is perfect.
// This model produces ranges consistent with what employment lawyers cite.

export type JobLevel = "entry" | "mid" | "senior" | "director" | "executive";

export interface CommonLawEstimate {
  lowMonths: number;
  midMonths: number;
  highMonths: number;
  exceptionalCase: boolean; // true if profile qualifies for 24+ months
}

export function estimateCommonLaw(
  yearsOfService: number,
  age: number,
  jobLevel: JobLevel,
  inducement: boolean = false
): CommonLawEstimate {
  // ── Step 1: Tenure baseline (non-linear) ────────────────────────────
  // Courts give proportionally more per year for short tenures and
  // diminishing returns for very long tenures. A 3.5-year senior can
  // get 9 months (Timmins 2025), but a 40-year worker doesn't get 40.
  let baseMonths: number;
  if (yearsOfService <= 2) {
    baseMonths = 3; // Courts rarely award under 3 months for professional roles
  } else if (yearsOfService <= 5) {
    // 2-5 years: ~1.5 months/year from the 3-month floor
    baseMonths = 3 + (yearsOfService - 2) * 1.5;
  } else if (yearsOfService <= 10) {
    // 5-10 years: ~1.0 months/year
    baseMonths = 3 + 3 * 1.5 + (yearsOfService - 5) * 1.0;
  } else if (yearsOfService <= 20) {
    // 10-20 years: ~0.8 months/year
    baseMonths = 3 + 3 * 1.5 + 5 * 1.0 + (yearsOfService - 10) * 0.8;
  } else {
    // 20+ years: ~0.6 months/year (diminishing)
    baseMonths = 3 + 3 * 1.5 + 5 * 1.0 + 10 * 0.8 + (yearsOfService - 20) * 0.6;
  }

  // ── Step 2: Age adjustment (steep above 50) ─────────────────────────
  // Courts recognize that older workers face substantially harder
  // reemployment. The curve is gentle under 45 and steep above 55.
  // Applied as additive months (not multiplicative) to prevent
  // compounding issues with long tenure + senior role.
  let ageBonus: number;
  if (age < 30) ageBonus = -1;
  else if (age < 40) ageBonus = 0;
  else if (age < 45) ageBonus = 1;
  else if (age < 50) ageBonus = 2;
  else if (age < 55) ageBonus = 3;
  else if (age < 60) ageBonus = 5;
  else if (age < 65) ageBonus = 7;
  else ageBonus = 9;

  // ── Step 3: Seniority / role adjustment ─────────────────────────────
  // Senior and executive roles have fewer comparable opportunities,
  // justifying longer notice periods. Applied to tenure baseline only
  // (before age bonus) so age and seniority don't compound excessively.
  const levelMultiplier: Record<JobLevel, number> = {
    entry: 0.80,
    mid: 1.0,
    senior: 1.15,
    director: 1.25,
    executive: 1.40,
  };
  baseMonths *= levelMultiplier[jobLevel];

  // Age bonus applied after seniority (additive, not multiplicative)
  baseMonths += ageBonus;

  // ── Step 4: Inducement bonus ────────────────────────────────────────
  // If recruited away from stable employment, courts add months.
  // Rodgers v CEVA: 3 years service, 14 months (inducement from 11-year job).
  if (inducement) {
    // Add 3-5 months, scaled slightly by tenure (less impact after 10+ years)
    const inducementBonus = yearsOfService <= 5 ? 5 : yearsOfService <= 10 ? 4 : 3;
    baseMonths += inducementBonus;
  }

  // ── Step 5: Floor ───────────────────────────────────────────────────
  // Courts rarely award under 3 months for any professional with 1+ year
  if (yearsOfService >= 1) {
    baseMonths = Math.max(baseMonths, 3);
  } else if (yearsOfService >= 0.25) {
    baseMonths = Math.max(baseMonths, 1);
  }

  // ── Step 6: Cap ─────────────────────────────────────────────────────
  // Lowndes presumptive cap at 24 months. Courts exceed it in
  // "exceptional circumstances": typically age 55+, tenure 25+, senior+.
  // Currie v Nylene (2022): 58yo, 40yr = 26 months.
  // Hussain v Suzuki: 65yo, 36yr = 26 months.
  const exceptional = age >= 55 && yearsOfService >= 25 && (jobLevel === "senior" || jobLevel === "director" || jobLevel === "executive");
  const cap = exceptional ? 26 : 24;
  baseMonths = Math.min(baseMonths, cap);

  // ── Step 7: Confidence range ────────────────────────────────────────
  // Real outcomes vary more than +/- 25%. Use 65%-135% for the range.
  const midMonths = Math.max(1, Math.round(baseMonths));
  const lowMonths = Math.max(1, Math.round(baseMonths * 0.65));
  const highMonths = Math.min(cap, Math.round(baseMonths * 1.35));

  return { lowMonths, midMonths, highMonths, exceptionalCase: exceptional };
}

// ── Comparable case lookup ─────────────────────────────────────────────────
// Real court decisions that help users validate their estimate.

export interface ComparableCase {
  name: string;
  year: string;
  age: number;
  tenure: number;
  role: string;
  award: number; // months
  detail: string;
}

const CASE_DATABASE: ComparableCase[] = [
  { name: "Currie v Nylene Canada", year: "2022", age: 58, tenure: 40, role: "Chief Operator (specialized)", award: 26, detail: "2022 ONCA 209. Entire career with one employer. Court found exceptional circumstances justified exceeding 24-month cap." },
  { name: "Hussain v Suzuki Canada", year: "2020", age: 65, tenure: 36, role: "Supervisor", award: 26, detail: "Near-retirement age combined with career-long service in supervisory role." },
  { name: "Keenan v Canac Kitchens", year: "2016", age: 63, tenure: 32, role: "Business principal", award: 26, detail: "Long service, advanced age, and senior leadership position." },
  { name: "Honda Canada v Keays (SCC)", year: "2008", age: 0, tenure: 14, role: "Quality engineering associate", award: 15, detail: "2008 SCC 39. Supreme Court upheld 15-month notice period. Case primarily addressed manner-of-dismissal damages, but the notice period is widely cited for mid-tenure technical roles." },
  { name: "Timmins v Artisan Cells", year: "2025", age: 44, tenure: 3.5, role: "Senior specialized", award: 9, detail: "Short tenure but senior specialized role. Courts give proportionally more for skilled professionals." },
  { name: "Rodgers v CEVA Freight", year: "2019", age: 0, tenure: 3, role: "Induced from 11-year job", award: 14, detail: "Only 3 years service but recruited away from stable employment. Inducement dramatically increased notice." },
  { name: "Milwid v IBM Canada", year: "2020", age: 62, tenure: 38, role: "Specialized technical", award: 27, detail: "Career-long service at one employer, specialized skills, advanced age." },
  { name: "Paquette v TeraGo", year: "2016", age: 0, tenure: 6.5, role: "VP (executive)", award: 17, detail: "Short tenure but C-suite role. Executive positions receive significantly longer notice." },
  { name: "Dawe v The Equitable Life", year: "2019", age: 62, tenure: 37, role: "Regional sales manager", award: 26, detail: "Long tenure, advanced age, management role. Another case exceeding 24-month threshold." },
  { name: "Di Tomaso v Crown Metal", year: "2011", age: 0, tenure: 33, role: "General labourer", award: 22, detail: "Very long tenure. Even lower-level roles receive significant notice with decades of service." },
];

export function findComparableCases(
  age: number,
  yearsOfService: number,
  jobLevel: JobLevel,
  inducement: boolean
): ComparableCase[] {
  // Score each case by similarity to the user's profile
  const scored = CASE_DATABASE.map((c) => {
    let score = 0;
    // Tenure similarity (most important)
    const tenureDiff = Math.abs(c.tenure - yearsOfService);
    score += Math.max(0, 20 - tenureDiff * 2);
    // Age similarity (if case has age data)
    if (c.age > 0 && age > 0) {
      const ageDiff = Math.abs(c.age - age);
      score += Math.max(0, 15 - ageDiff);
    }
    // Role level similarity
    const isExecutiveCase = c.role.toLowerCase().includes("vp") || c.role.toLowerCase().includes("executive") || c.role.toLowerCase().includes("principal");
    const isSeniorCase = c.role.toLowerCase().includes("senior") || c.role.toLowerCase().includes("manager") || c.role.toLowerCase().includes("director");
    if (jobLevel === "executive" && isExecutiveCase) score += 10;
    if ((jobLevel === "senior" || jobLevel === "director") && isSeniorCase) score += 8;
    // Inducement match
    if (inducement && c.name.includes("Rodgers")) score += 15;
    return { case: c, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 2).map((s) => s.case);
}

// ── ESA statutory calculator ───────────────────────────────────────────────

export interface EsaResult {
  terminationWeeks: number;
  severanceWeeks: number;
  totalWeeks: number;
  terminationDollars: number;
  severanceDollars: number;
  totalDollars: number;
  notes: string;
}

export function calculateEsa(
  provinceCode: string,
  yearsOfService: number,
  annualSalary: number
): EsaResult {
  const province = PROVINCES.find((p) => p.code === provinceCode);
  if (!province) throw new Error(`Unknown province: ${provinceCode}`);

  const weeklyPay = annualSalary / 52;

  // Termination pay: find the matching tier
  let terminationWeeks = 0;
  for (const tier of province.terminationPay) {
    if (yearsOfService >= tier.minYears) {
      terminationWeeks = tier.weeks;
    }
  }

  // Severance pay (Ontario and Federal only)
  let severanceWeeks = 0;
  if (province.severancePay?.eligible) {
    const sp = province.severancePay;
    if (yearsOfService >= (sp.minYears || 0)) {
      severanceWeeks = Math.min(
        Math.round(yearsOfService * sp.weeksPer * 10) / 10,
        sp.maxWeeks
      );
    }
  }

  // Build context-sensitive notes
  let notes = province.notes;
  if (provinceCode === "ON") {
    if (yearsOfService < 5) {
      notes = "With less than 5 years of service, you don't qualify for Ontario's statutory severance pay (separate from termination pay). This does not affect your common-law entitlement, which is typically much higher.";
    } else {
      notes = "Ontario severance pay requires your employer to have a global payroll of $2.5M+ or be laying off 50+ employees. Most medium-to-large employers meet this threshold. If your employer is small, this amount may not apply. Combined ESA max: 34 weeks.";
    }
  }

  return {
    terminationWeeks,
    severanceWeeks,
    totalWeeks: terminationWeeks + severanceWeeks,
    terminationDollars: Math.round(terminationWeeks * weeklyPay),
    severanceDollars: Math.round(severanceWeeks * weeklyPay),
    totalDollars: Math.round((terminationWeeks + severanceWeeks) * weeklyPay),
    notes,
  };
}
