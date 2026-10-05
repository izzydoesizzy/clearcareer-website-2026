/* ── Parental Leave Calculator Types ── */

export type LeaveType = "standard" | "extended";
export type QPIPPlan = "basic" | "special";
export type Tenure = "under600" | "600plus" | "2plus";

export interface Province {
  code: string;
  name: string;
  matJobProtection: number;
  parJobProtection: number;
  isQuebec: boolean;
}

export interface TopUpConfig {
  enabled: boolean;
  percentage: number;
  matWeeks: number;
  parWeeks: number;
}

export interface ParentConfig {
  salary: number;
  provinceCode: string;
  tenure: Tenure;
  selfEmployed: boolean;
  topUp: TopUpConfig;
}

export interface WeekPhase {
  label: string;
  weeks: number;
  weeklyBenefit: number;
  weeklyTopUp: number;
  color: string;
  parent: "bp" | "op";
}

export interface ParentResult {
  phases: WeekPhase[];
  totalWeeks: number;
  totalBenefit: number;
  totalTopUp: number;
  grandTotal: number;
}

export interface CalcResult {
  birthingParent: ParentResult;
  otherParent: ParentResult;
  familyTotal: number;
  incomeGap: number;
  avgWeekly: number;
  totalWeeks: number;
  leavePeriodWeeks: number;
  sharingBonusTriggered: boolean;
  sharingBonusWeeks: number;
}

export type RecType = "warning" | "optimization" | "positive" | "info";

export interface Recommendation {
  type: RecType;
  title: string;
  body: string;
}

export interface LeaveConfig {
  leaveType: LeaveType;
  qpipPlan: QPIPPlan;
  isQuebec: boolean;
  birthingParent: ParentConfig;
  otherParent: ParentConfig;
  bpParentalWeeks: number;
  opParentalWeeks: number;
}
