/* ── Parental Leave Calculation Engine ── */

import { EI, QPIP, PHASE_COLORS } from "./constants.js";
import type {
  LeaveConfig,
  CalcResult,
  ParentResult,
  WeekPhase,
  Recommendation,
} from "./types.js";

/* ── Core benefit formulas ── */

export function weeklyEI(salary: number, rate: number, max: number): number {
  return Math.min((Math.min(salary, EI.mie) / 52) * rate, max);
}

export function weeklyQPIP(salary: number, rate: number): number {
  return (Math.min(salary, QPIP.mie) / 52) * rate;
}

export function topUpDiff(salary: number, pct: number, weeklyBenefit: number): number {
  return Math.max(0, (salary / 52) * (pct / 100) - weeklyBenefit);
}

/* ── Sharing bonus eligibility ── */

function getSharingBonus(config: LeaveConfig): { triggered: boolean; weeks: number } {
  const { leaveType, qpipPlan, isQuebec, bpParentalWeeks, opParentalWeeks } = config;

  if (isQuebec) {
    const plan = qpipPlan === "basic" ? QPIP.basic : QPIP.special;
    const triggered = bpParentalWeeks >= plan.bonusThreshold && opParentalWeeks >= plan.bonusThreshold;
    return { triggered, weeks: triggered ? plan.bonusWk : 0 };
  }

  const minWeeks = 5;
  if (leaveType === "standard") {
    const triggered = bpParentalWeeks >= minWeeks && opParentalWeeks >= minWeeks;
    return { triggered, weeks: triggered ? EI.stdBonus : 0 };
  }
  const triggered = bpParentalWeeks >= minWeeks && opParentalWeeks >= minWeeks;
  return { triggered, weeks: triggered ? EI.extBonus : 0 };
}

/* ── EI leave calculation (non-Quebec) ── */

function calcEI(config: LeaveConfig): CalcResult {
  const { leaveType, birthingParent: bp, otherParent: op, bpParentalWeeks, opParentalWeeks } = config;

  const isStandard = leaveType === "standard";
  const parRate = isStandard ? EI.stdRate : EI.extRate;
  const parMax = isStandard ? EI.maxStd : EI.maxExt;

  // Birthing parent phases
  const bpPhases: WeekPhase[] = [];

  // Maternity (always 55%, always 15 weeks) - split by top-up duration
  const bpMatBenefit = weeklyEI(bp.salary, EI.matRate, EI.maxStd);
  if (bp.topUp.enabled && bp.topUp.matWeeks > 0) {
    const toppedWeeks = Math.min(bp.topUp.matWeeks, EI.matWk);
    const untoppedWeeks = EI.matWk - toppedWeeks;
    bpPhases.push({
      label: toppedWeeks < EI.matWk ? "Maternity (topped up)" : "Maternity",
      weeks: toppedWeeks,
      weeklyBenefit: bpMatBenefit,
      weeklyTopUp: topUpDiff(bp.salary, bp.topUp.percentage, bpMatBenefit),
      color: PHASE_COLORS.maternity,
      parent: "bp",
    });
    if (untoppedWeeks > 0) {
      bpPhases.push({
        label: "Maternity",
        weeks: untoppedWeeks,
        weeklyBenefit: bpMatBenefit,
        weeklyTopUp: 0,
        color: PHASE_COLORS.maternity,
        parent: "bp",
      });
    }
  } else {
    bpPhases.push({
      label: "Maternity",
      weeks: EI.matWk,
      weeklyBenefit: bpMatBenefit,
      weeklyTopUp: 0,
      color: PHASE_COLORS.maternity,
      parent: "bp",
    });
  }

  // Birthing parent parental weeks - split by top-up duration
  if (bpParentalWeeks > 0) {
    const bpParBenefit = weeklyEI(bp.salary, parRate, parMax);
    if (bp.topUp.enabled && bp.topUp.parWeeks > 0) {
      const toppedWeeks = Math.min(bp.topUp.parWeeks, bpParentalWeeks);
      const untoppedWeeks = bpParentalWeeks - toppedWeeks;
      bpPhases.push({
        label: toppedWeeks < bpParentalWeeks ? "Parental (topped up)" : "Parental",
        weeks: toppedWeeks,
        weeklyBenefit: bpParBenefit,
        weeklyTopUp: topUpDiff(bp.salary, bp.topUp.percentage, bpParBenefit),
        color: PHASE_COLORS.parentalHigh,
        parent: "bp",
      });
      if (untoppedWeeks > 0) {
        bpPhases.push({
          label: "Parental",
          weeks: untoppedWeeks,
          weeklyBenefit: bpParBenefit,
          weeklyTopUp: 0,
          color: PHASE_COLORS.parentalHigh,
          parent: "bp",
        });
      }
    } else {
      bpPhases.push({
        label: "Parental",
        weeks: bpParentalWeeks,
        weeklyBenefit: bpParBenefit,
        weeklyTopUp: 0,
        color: PHASE_COLORS.parentalHigh,
        parent: "bp",
      });
    }
  }

  // Other parent parental weeks - split by top-up duration
  const opPhases: WeekPhase[] = [];
  if (opParentalWeeks > 0) {
    const opParBenefit = weeklyEI(op.salary, parRate, parMax);
    if (op.topUp.enabled && op.topUp.parWeeks > 0) {
      const toppedWeeks = Math.min(op.topUp.parWeeks, opParentalWeeks);
      const untoppedWeeks = opParentalWeeks - toppedWeeks;
      opPhases.push({
        label: toppedWeeks < opParentalWeeks ? "Parental (topped up)" : "Parental",
        weeks: toppedWeeks,
        weeklyBenefit: opParBenefit,
        weeklyTopUp: topUpDiff(op.salary, op.topUp.percentage, opParBenefit),
        color: PHASE_COLORS.parentalHigh,
        parent: "op",
      });
      if (untoppedWeeks > 0) {
        opPhases.push({
          label: "Parental",
          weeks: untoppedWeeks,
          weeklyBenefit: opParBenefit,
          weeklyTopUp: 0,
          color: PHASE_COLORS.parentalHigh,
          parent: "op",
        });
      }
    } else {
      opPhases.push({
        label: "Parental",
        weeks: opParentalWeeks,
        weeklyBenefit: opParBenefit,
        weeklyTopUp: 0,
        color: PHASE_COLORS.parentalHigh,
        parent: "op",
      });
    }
  }

  // Sharing bonus
  const bonus = getSharingBonus(config);
  if (bonus.triggered) {
    // Bonus weeks go to the lower earner for optimization
    const bonusBenefit = weeklyEI(
      bp.salary <= op.salary ? bp.salary : op.salary,
      parRate,
      parMax
    );
    const bonusParent = bp.salary <= op.salary ? "bp" : "op";
    const bonusPhase: WeekPhase = {
      label: "Sharing Bonus",
      weeks: bonus.weeks,
      weeklyBenefit: bonusBenefit,
      weeklyTopUp: 0,
      color: PHASE_COLORS.bonus,
      parent: bonusParent,
    };
    if (bonusParent === "bp") {
      bpPhases.push(bonusPhase);
    } else {
      opPhases.push(bonusPhase);
    }
  }

  return buildResult(bpPhases, opPhases, bp.salary, op.salary, bonus);
}

/* ── QPIP leave calculation (Quebec) ── */

function calcQPIP(config: LeaveConfig): CalcResult {
  const { qpipPlan, birthingParent: bp, otherParent: op, bpParentalWeeks, opParentalWeeks } = config;
  const basic = QPIP.basic;
  const special = QPIP.special;
  const isBasic = qpipPlan === "basic";

  const matR = isBasic ? basic.matR : special.matR;
  const matWk = isBasic ? basic.matWk : special.matWk;
  const patR = isBasic ? basic.patR : special.patR;
  const patWk = isBasic ? basic.patWk : special.patWk;

  const bpPhases: WeekPhase[] = [];
  const opPhases: WeekPhase[] = [];

  // Maternity (birthing parent only) - split by top-up duration
  const matBenefit = weeklyQPIP(bp.salary, matR);
  if (bp.topUp.enabled && bp.topUp.matWeeks > 0) {
    const toppedWeeks = Math.min(bp.topUp.matWeeks, matWk);
    const untoppedWeeks = matWk - toppedWeeks;
    bpPhases.push({
      label: toppedWeeks < matWk ? "Maternity (topped up)" : "Maternity",
      weeks: toppedWeeks,
      weeklyBenefit: matBenefit,
      weeklyTopUp: topUpDiff(bp.salary, bp.topUp.percentage, matBenefit),
      color: PHASE_COLORS.maternity,
      parent: "bp",
    });
    if (untoppedWeeks > 0) {
      bpPhases.push({
        label: "Maternity",
        weeks: untoppedWeeks,
        weeklyBenefit: matBenefit,
        weeklyTopUp: 0,
        color: PHASE_COLORS.maternity,
        parent: "bp",
      });
    }
  } else {
    bpPhases.push({
      label: "Maternity",
      weeks: matWk,
      weeklyBenefit: matBenefit,
      weeklyTopUp: 0,
      color: PHASE_COLORS.maternity,
      parent: "bp",
    });
  }

  // Paternity (other parent only) - split by top-up duration
  const patBenefit = weeklyQPIP(op.salary, patR);
  if (op.topUp.enabled && op.topUp.parWeeks > 0) {
    const toppedWeeks = Math.min(op.topUp.parWeeks, patWk);
    const untoppedWeeks = patWk - toppedWeeks;
    opPhases.push({
      label: toppedWeeks < patWk ? "Paternity (topped up)" : "Paternity",
      weeks: toppedWeeks,
      weeklyBenefit: patBenefit,
      weeklyTopUp: topUpDiff(op.salary, op.topUp.percentage, patBenefit),
      color: PHASE_COLORS.paternity,
      parent: "op",
    });
    if (untoppedWeeks > 0) {
      opPhases.push({
        label: "Paternity",
        weeks: untoppedWeeks,
        weeklyBenefit: patBenefit,
        weeklyTopUp: 0,
        color: PHASE_COLORS.paternity,
        parent: "op",
      });
    }
  } else {
    opPhases.push({
      label: "Paternity",
      weeks: patWk,
      weeklyBenefit: patBenefit,
      weeklyTopUp: 0,
      color: PHASE_COLORS.paternity,
      parent: "op",
    });
  }

  // Helper: push parental phase(s) with top-up duration splitting
  function pushParentalPhases(
    phases: WeekPhase[],
    salary: number,
    topUp: LeaveConfig["birthingParent"]["topUp"],
    totalWeeks: number,
    benefit: number,
    label: string,
    color: string,
    parent: "bp" | "op",
  ) {
    if (topUp.enabled && topUp.parWeeks > 0) {
      const toppedWeeks = Math.min(topUp.parWeeks, totalWeeks);
      const untoppedWeeks = totalWeeks - toppedWeeks;
      phases.push({
        label: toppedWeeks < totalWeeks ? `${label} (topped up)` : label,
        weeks: toppedWeeks,
        weeklyBenefit: benefit,
        weeklyTopUp: topUpDiff(salary, topUp.percentage, benefit),
        color,
        parent,
      });
      if (untoppedWeeks > 0) {
        phases.push({ label, weeks: untoppedWeeks, weeklyBenefit: benefit, weeklyTopUp: 0, color, parent });
      }
    } else {
      phases.push({ label, weeks: totalWeeks, weeklyBenefit: benefit, weeklyTopUp: 0, color, parent });
    }
  }

  // Shared parental weeks - birthing parent portion
  if (bpParentalWeeks > 0) {
    if (isBasic) {
      const highWeeks = Math.min(bpParentalWeeks, basic.parN1);
      const lowWeeks = Math.max(0, bpParentalWeeks - basic.parN1);
      if (highWeeks > 0) {
        const benefit = weeklyQPIP(bp.salary, basic.parR1);
        // Top-up applies to first N parental weeks across tiers
        const topUpRemaining = bp.topUp.enabled ? bp.topUp.parWeeks : 0;
        const toppedHigh = Math.min(topUpRemaining, highWeeks);
        const untoppedHigh = highWeeks - toppedHigh;
        if (toppedHigh > 0) {
          bpPhases.push({
            label: "Parental 70% (topped up)",
            weeks: toppedHigh,
            weeklyBenefit: benefit,
            weeklyTopUp: topUpDiff(bp.salary, bp.topUp.percentage, benefit),
            color: PHASE_COLORS.parentalHigh,
            parent: "bp",
          });
        }
        if (untoppedHigh > 0) {
          bpPhases.push({
            label: "Parental (70%)",
            weeks: untoppedHigh,
            weeklyBenefit: benefit,
            weeklyTopUp: 0,
            color: PHASE_COLORS.parentalHigh,
            parent: "bp",
          });
        }
        // Remaining top-up weeks carry into the lower tier
        if (lowWeeks > 0) {
          const lowBenefit = weeklyQPIP(bp.salary, basic.parR2);
          const topUpLeftForLow = Math.max(0, topUpRemaining - highWeeks);
          const toppedLow = Math.min(topUpLeftForLow, lowWeeks);
          const untoppedLow = lowWeeks - toppedLow;
          if (toppedLow > 0) {
            bpPhases.push({
              label: "Parental 55% (topped up)",
              weeks: toppedLow,
              weeklyBenefit: lowBenefit,
              weeklyTopUp: topUpDiff(bp.salary, bp.topUp.percentage, lowBenefit),
              color: PHASE_COLORS.parentalLow,
              parent: "bp",
            });
          }
          if (untoppedLow > 0) {
            bpPhases.push({
              label: "Parental (55%)",
              weeks: untoppedLow,
              weeklyBenefit: lowBenefit,
              weeklyTopUp: 0,
              color: PHASE_COLORS.parentalLow,
              parent: "bp",
            });
          }
        }
      }
    } else {
      const benefit = weeklyQPIP(bp.salary, special.parR);
      pushParentalPhases(bpPhases, bp.salary, bp.topUp, bpParentalWeeks, benefit, "Parental", PHASE_COLORS.parentalHigh, "bp");
    }
  }

  // Shared parental weeks - other parent portion
  if (opParentalWeeks > 0) {
    if (isBasic) {
      const bpHighUsed = Math.min(bpParentalWeeks, basic.parN1);
      const remainingHigh = Math.max(0, basic.parN1 - bpHighUsed);
      const opHighWeeks = Math.min(opParentalWeeks, remainingHigh);
      const opLowWeeks = opParentalWeeks - opHighWeeks;

      // Top-up budget for other parent's parental weeks (paternity top-up is separate)
      const opTopUpRemaining = op.topUp.enabled ? op.topUp.parWeeks : 0;

      if (opHighWeeks > 0) {
        const benefit = weeklyQPIP(op.salary, basic.parR1);
        const toppedHigh = Math.min(opTopUpRemaining, opHighWeeks);
        const untoppedHigh = opHighWeeks - toppedHigh;
        if (toppedHigh > 0) {
          opPhases.push({
            label: "Parental 70% (topped up)",
            weeks: toppedHigh,
            weeklyBenefit: benefit,
            weeklyTopUp: topUpDiff(op.salary, op.topUp.percentage, benefit),
            color: PHASE_COLORS.parentalHigh,
            parent: "op",
          });
        }
        if (untoppedHigh > 0) {
          opPhases.push({
            label: "Parental (70%)",
            weeks: untoppedHigh,
            weeklyBenefit: benefit,
            weeklyTopUp: 0,
            color: PHASE_COLORS.parentalHigh,
            parent: "op",
          });
        }
      }
      if (opLowWeeks > 0) {
        const benefit = weeklyQPIP(op.salary, basic.parR2);
        const topUpLeftForLow = Math.max(0, opTopUpRemaining - opHighWeeks);
        const toppedLow = Math.min(topUpLeftForLow, opLowWeeks);
        const untoppedLow = opLowWeeks - toppedLow;
        if (toppedLow > 0) {
          opPhases.push({
            label: "Parental 55% (topped up)",
            weeks: toppedLow,
            weeklyBenefit: benefit,
            weeklyTopUp: topUpDiff(op.salary, op.topUp.percentage, benefit),
            color: PHASE_COLORS.parentalLow,
            parent: "op",
          });
        }
        if (untoppedLow > 0) {
          opPhases.push({
            label: "Parental (55%)",
            weeks: untoppedLow,
            weeklyBenefit: benefit,
            weeklyTopUp: 0,
            color: PHASE_COLORS.parentalLow,
            parent: "op",
          });
        }
      }
    } else {
      const benefit = weeklyQPIP(op.salary, special.parR);
      pushParentalPhases(opPhases, op.salary, op.topUp, opParentalWeeks, benefit, "Parental", PHASE_COLORS.parentalHigh, "op");
    }
  }

  // Sharing bonus
  const bonus = getSharingBonus(config);
  if (bonus.triggered) {
    const bonusBenefit = weeklyQPIP(
      bp.salary <= op.salary ? bp.salary : op.salary,
      qpipPlan === "basic" ? QPIP.basic.bonusR : QPIP.special.bonusR
    );
    const bonusParent = bp.salary <= op.salary ? "bp" : "op";
    const bonusPhase: WeekPhase = {
      label: "Sharing Bonus",
      weeks: bonus.weeks,
      weeklyBenefit: bonusBenefit,
      weeklyTopUp: 0,
      color: PHASE_COLORS.bonus,
      parent: bonusParent,
    };
    if (bonusParent === "bp") {
      bpPhases.push(bonusPhase);
    } else {
      opPhases.push(bonusPhase);
    }
  }

  return buildResult(bpPhases, opPhases, bp.salary, op.salary, bonus);
}

/* ── Build final result from phases ── */

function buildResult(
  bpPhases: WeekPhase[],
  opPhases: WeekPhase[],
  bpSalary: number,
  opSalary: number,
  bonus: { triggered: boolean; weeks: number }
): CalcResult {
  const sumParent = (phases: WeekPhase[]): ParentResult => {
    const totalWeeks = phases.reduce((s, p) => s + p.weeks, 0);
    const totalBenefit = phases.reduce((s, p) => s + p.weeks * p.weeklyBenefit, 0);
    const totalTopUp = phases.reduce((s, p) => s + p.weeks * p.weeklyTopUp, 0);
    return { phases, totalWeeks, totalBenefit, totalTopUp, grandTotal: totalBenefit + totalTopUp };
  };

  const bpResult = sumParent(bpPhases);
  const opResult = sumParent(opPhases);
  const familyTotal = bpResult.grandTotal + opResult.grandTotal;
  const totalWeeks = bpResult.totalWeeks + opResult.totalWeeks;

  // The leave period is the calendar duration from start to when the last
  // parent returns to work (both parents start at week 0, matching the chart).
  const leavePeriodWeeks = Math.max(bpResult.totalWeeks, opResult.totalWeeks);

  // Build per-week benefit arrays to compute true family income during leave,
  // mirroring the approach used in IncomeChart.tsx.
  const bpWeekly: number[] = [];
  for (const phase of bpPhases) {
    for (let i = 0; i < phase.weeks; i++) {
      bpWeekly.push(phase.weeklyBenefit + phase.weeklyTopUp);
    }
  }
  const opWeekly: number[] = [];
  for (const phase of opPhases) {
    for (let i = 0; i < phase.weeks; i++) {
      opWeekly.push(phase.weeklyBenefit + phase.weeklyTopUp);
    }
  }

  // For each week in the leave period, a parent who is NOT on leave earns
  // their regular salary instead of benefits.
  let totalFamilyIncome = 0;
  for (let w = 0; w < leavePeriodWeeks; w++) {
    const bpIncome = w < bpWeekly.length ? bpWeekly[w] : bpSalary / 52;
    const opIncome = w < opWeekly.length ? opWeekly[w] : opSalary / 52;
    totalFamilyIncome += bpIncome + opIncome;
  }

  const weeklyFullIncome = (bpSalary + opSalary) / 52;
  const avgWeekly = leavePeriodWeeks > 0 ? totalFamilyIncome / leavePeriodWeeks : 0;
  const incomeGap = weeklyFullIncome * leavePeriodWeeks - totalFamilyIncome;

  return {
    birthingParent: bpResult,
    otherParent: opResult,
    familyTotal,
    incomeGap: Math.max(0, incomeGap),
    avgWeekly,
    totalWeeks,
    leavePeriodWeeks,
    sharingBonusTriggered: bonus.triggered,
    sharingBonusWeeks: bonus.weeks,
  };
}

/* ── Main entry point ── */

export function calculateLeave(config: LeaveConfig): CalcResult {
  return config.isQuebec ? calcQPIP(config) : calcEI(config);
}

/* ── Recommendations engine ── */

export function getRecommendations(config: LeaveConfig, result: CalcResult): Recommendation[] {
  const recs: Recommendation[] = [];
  const { birthingParent: bp, otherParent: op, bpParentalWeeks, opParentalWeeks, isQuebec, leaveType } = config;

  // Sharing bonus not triggered
  if (!result.sharingBonusTriggered && (bpParentalWeeks > 0 || opParentalWeeks > 0)) {
    const minNeeded = isQuebec
      ? (config.qpipPlan === "basic" ? QPIP.basic.bonusThreshold : QPIP.special.bonusThreshold)
      : 5;
    recs.push({
      type: "optimization",
      title: "Unlock your sharing bonus",
      body: `If both parents take at least ${minNeeded} weeks of parental leave, you unlock ${isQuebec ? (config.qpipPlan === "basic" ? 4 : 3) : (leaveType === "standard" ? 5 : 8)} extra weeks of benefits. That's free money most families leave on the table.`,
    });
  }

  // Sharing bonus triggered
  if (result.sharingBonusTriggered) {
    recs.push({
      type: "positive",
      title: "Sharing bonus unlocked",
      body: `Both parents are taking enough leave to trigger ${result.sharingBonusWeeks} bonus weeks. These are use-it-or-lose-it weeks that many families miss.`,
    });
  }

  // Salary differential
  const salaryDiff = Math.abs(bp.salary - op.salary);
  if (salaryDiff > 15000 && bpParentalWeeks > 0 && opParentalWeeks > 0) {
    const higherEarner = bp.salary > op.salary ? "birthing parent" : "other parent";
    const lowerEarner = bp.salary > op.salary ? "other parent" : "birthing parent";
    recs.push({
      type: "optimization",
      title: "Consider shifting weeks to the lower earner",
      body: `The ${higherEarner} earns more, so each week they're on leave costs more in lost income. Shifting more parental weeks to the ${lowerEarner} could reduce your family's income gap.`,
    });
  }

  // Top-up optimization
  if (bp.topUp.enabled && bp.topUp.percentage >= 80 && !op.topUp.enabled) {
    recs.push({
      type: "optimization",
      title: "Maximize the top-up coverage",
      body: `The birthing parent has an employer top-up at ${bp.topUp.percentage}%. Consider having them take more of the parental leave to maximize the higher income replacement.`,
    });
  }
  if (op.topUp.enabled && op.topUp.percentage >= 80 && !bp.topUp.enabled) {
    recs.push({
      type: "optimization",
      title: "Maximize the top-up coverage",
      body: `The other parent has an employer top-up at ${op.topUp.percentage}%. Consider having them take more of the parental leave to maximize the higher income replacement.`,
    });
  }

  // Self-employed warning (non-Quebec)
  if (!isQuebec && (bp.selfEmployed || op.selfEmployed)) {
    const who = bp.selfEmployed && op.selfEmployed ? "Both parents are" : bp.selfEmployed ? "The birthing parent is" : "The other parent is";
    recs.push({
      type: "warning",
      title: "Self-employed EI opt-in required",
      body: `${who} self-employed. To receive EI special benefits, you must register with Service Canada and have been paying premiums for at least 12 months before your claim.`,
    });
  }

  // Self-employed QPIP (automatic coverage)
  if (isQuebec && (bp.selfEmployed || op.selfEmployed)) {
    recs.push({
      type: "positive",
      title: "QPIP covers self-employed workers",
      body: `Unlike EI, Quebec's QPIP automatically covers self-employed workers. No opt-in required. You're already eligible.`,
    });
  }

  // Tenure concern
  if (bp.tenure === "under600" || op.tenure === "under600") {
    const who = bp.tenure === "under600" && op.tenure === "under600" ? "Both parents have" : bp.tenure === "under600" ? "The birthing parent has" : "The other parent has";
    recs.push({
      type: "warning",
      title: "Job protection may be limited",
      body: `${who} less than 600 insurable hours (roughly 4 months full-time). You need 600 hours to qualify for EI maternity/parental benefits. Check your Record of Employment or contact Service Canada.`,
    });
  }

  // Both parents above MIE
  if (!isQuebec && bp.salary >= EI.mie && op.salary >= EI.mie) {
    recs.push({
      type: "info",
      title: "Both salaries above the EI cap",
      body: `EI benefits are calculated on maximum insurable earnings of $${(EI.mie).toLocaleString()}. Since both parents earn above this, benefits are already at the maximum. The income gap is larger for higher earners.`,
    });
  }

  // QPIP advantage
  if (isQuebec) {
    recs.push({
      type: "positive",
      title: "Quebec's QPIP pays more than EI",
      body: `QPIP's higher replacement rates (70-75% vs. EI's 55%) and higher insurable earnings cap ($${QPIP.mie.toLocaleString()} vs. $${EI.mie.toLocaleString()}) mean significantly higher benefits for Quebec families.`,
    });
  }

  // Extended leave note
  if (leaveType === "extended" && !isQuebec) {
    recs.push({
      type: "info",
      title: "Extended leave means lower weekly payments",
      body: `Extended parental leave (18 months) pays 33% of earnings vs. 55% for standard (12 months). The total payout is similar, but spread over more weeks. Consider whether the lower weekly income works for your budget.`,
    });
  }

  return recs;
}
