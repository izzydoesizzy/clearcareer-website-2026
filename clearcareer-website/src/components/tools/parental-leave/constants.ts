/* ── Parental Leave Calculator Constants (2026 Rules) ── */

import type { Province } from "./types.js";

export const EI = {
  mie: 68900,
  stdRate: 0.55,
  extRate: 0.33,
  maxStd: 729,
  maxExt: 437,
  matRate: 0.55,
  matWk: 15,
  stdTotal: 35,
  stdMax1: 35,
  stdBonus: 5,
  extTotal: 61,
  extMax1: 61,
  extBonus: 8,
} as const;

export const QPIP = {
  mie: 103000,
  basic: {
    matWk: 18,
    matR: 0.70,
    patWk: 5,
    patR: 0.70,
    parWk: 28,
    parR1: 0.70,
    parN1: 7,
    parR2: 0.55,
    parN2: 21,
    bonusWk: 4,
    bonusR: 0.55,
    bonusThreshold: 8,
  },
  special: {
    matWk: 15,
    matR: 0.75,
    patWk: 3,
    patR: 0.75,
    parWk: 25,
    parR: 0.75,
    bonusWk: 3,
    bonusR: 0.75,
    bonusThreshold: 6,
  },
} as const;

export const PROVINCES: Province[] = [
  { code: "ON", name: "Ontario", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
  { code: "BC", name: "British Columbia", matJobProtection: 17, parJobProtection: 62, isQuebec: false },
  { code: "AB", name: "Alberta", matJobProtection: 16, parJobProtection: 62, isQuebec: false },
  { code: "QC", name: "Quebec", matJobProtection: 18, parJobProtection: 65, isQuebec: true },
  { code: "MB", name: "Manitoba", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
  { code: "SK", name: "Saskatchewan", matJobProtection: 18, parJobProtection: 63, isQuebec: false },
  { code: "NS", name: "Nova Scotia", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
  { code: "NB", name: "New Brunswick", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
  { code: "NL", name: "Newfoundland & Labrador", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
  { code: "PE", name: "Prince Edward Island", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
  { code: "FED", name: "Federal", matJobProtection: 17, parJobProtection: 63, isQuebec: false },
];

export const TOPUP_PRESETS = [75, 80, 93, 95, 100] as const;

export const PHASE_COLORS = {
  maternity: "#0161EF",
  paternity: "#030620",
  parentalHigh: "#3b82f6",
  parentalLow: "#93c5fd",
  bonus: "#D97706",
  topUp: "#059669",
} as const;

export function fmtCAD(n: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtWeeks(w: number): string {
  if (w === 1) return "1 week";
  return `${w} weeks`;
}

export function weeksToMonths(w: number): string {
  const months = Math.round((w / 4.33) * 10) / 10;
  return `~${months} mo`;
}
