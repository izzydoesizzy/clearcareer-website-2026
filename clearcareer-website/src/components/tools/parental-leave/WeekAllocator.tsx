/* ── Week Allocation Slider ── */

import { EI, QPIP } from "./constants.js";
import type { LeaveType, QPIPPlan } from "./types.js";

interface Props {
  leaveType: LeaveType;
  qpipPlan: QPIPPlan;
  isQuebec: boolean;
  bpWeeks: number;
  opWeeks: number;
  onChange: (bpWeeks: number, opWeeks: number) => void;
}

export default function WeekAllocator({ leaveType, qpipPlan, isQuebec, bpWeeks, opWeeks, onChange }: Props) {
  // Determine total pool and per-parent max
  let totalPool: number;
  let perParentMax: number;
  let bonusThreshold: number;
  let bonusWeeks: number;

  if (isQuebec) {
    const plan = qpipPlan === "basic" ? QPIP.basic : QPIP.special;
    totalPool = plan.parWk;
    perParentMax = plan.parWk;
    bonusThreshold = plan.bonusThreshold;
    bonusWeeks = plan.bonusWk;
  } else if (leaveType === "standard") {
    totalPool = EI.stdTotal;
    perParentMax = EI.stdMax1;
    bonusThreshold = 5;
    bonusWeeks = EI.stdBonus;
  } else {
    totalPool = EI.extTotal;
    perParentMax = EI.extMax1;
    bonusThreshold = 5;
    bonusWeeks = EI.extBonus;
  }

  const bpMax = Math.min(perParentMax, totalPool);
  const opMax = Math.min(perParentMax, totalPool - bpWeeks);
  const bonusTriggered = bpWeeks >= bonusThreshold && opWeeks >= bonusThreshold;

  function handleBpChange(val: number) {
    const newBp = Math.min(val, bpMax);
    const newOp = Math.min(opWeeks, totalPool - newBp, perParentMax);
    onChange(newBp, Math.max(0, newOp));
  }

  function handleOpChange(val: number) {
    const newOp = Math.min(val, opMax);
    onChange(bpWeeks, newOp);
  }

  const bpPct = totalPool > 0 ? (bpWeeks / totalPool) * 100 : 0;
  const opPct = totalPool > 0 ? (opWeeks / totalPool) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Visual bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-text-muted mb-2">
          <span>Birthing Parent: {bpWeeks} wks</span>
          <span>{totalPool - bpWeeks - opWeeks} unallocated</span>
          <span>Other Parent: {opWeeks} wks</span>
        </div>
        <div className="h-4 rounded-full bg-gray-100 overflow-hidden flex">
          <div
            className="h-full bg-blue transition-all duration-300"
            style={{ width: `${bpPct}%` }}
          />
          <div
            className="h-full bg-navy transition-all duration-300"
            style={{ width: `${opPct}%` }}
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Birthing parent parental weeks
          </label>
          <input
            type="range"
            min={0}
            max={bpMax}
            value={bpWeeks}
            onChange={(e) => handleBpChange(Number(e.target.value))}
            aria-label="Birthing parent parental weeks"
            className="w-full accent-blue"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>0</span>
            <span className="font-semibold text-blue">{bpWeeks}</span>
            <span>{bpMax}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Other parent parental weeks
          </label>
          <input
            type="range"
            min={0}
            max={opMax}
            value={opWeeks}
            onChange={(e) => handleOpChange(Number(e.target.value))}
            aria-label="Other parent parental weeks"
            className="w-full accent-navy"
          />
          <div className="flex justify-between text-xs text-text-muted mt-1">
            <span>0</span>
            <span className="font-semibold text-navy">{opWeeks}</span>
            <span>{opMax}</span>
          </div>
        </div>
      </div>

      {/* Sharing bonus indicator */}
      <div className={`rounded-lg p-3 text-sm transition-all ${
        bonusTriggered
          ? "bg-success/10 border border-success/20 text-success"
          : "bg-gray-50 border border-border text-text-muted"
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{bonusTriggered ? "✓" : "○"}</span>
          <div>
            <span className="font-semibold">
              {bonusTriggered ? `Sharing bonus unlocked: +${bonusWeeks} weeks!` : `Sharing bonus: ${bonusWeeks} extra weeks available`}
            </span>
            {!bonusTriggered && (
              <p className="text-xs mt-0.5">
                Both parents need at least {bonusThreshold} parental weeks each to unlock.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
