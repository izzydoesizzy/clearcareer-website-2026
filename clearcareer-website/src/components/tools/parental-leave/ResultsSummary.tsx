/* ── Results Summary: Plain-Language Overview ── */

import { useState, useRef, useEffect } from "react";
import { fmtCAD, weeksToMonths } from "./constants.js";
import type { CalcResult } from "./types.js";

function useCountUp(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    const to = target;
    prevRef.current = to;
    if (from === to) return;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

interface Props {
  result: CalcResult;
  bpSalary: number;
  opSalary: number;
}

export default function ResultsSummary({ result, bpSalary, opSalary }: Props) {
  const animated = useCountUp(result.familyTotal);
  const weeklyFullTime = Math.round((bpSalary + opSalary) / 52);
  const replacementPct = weeklyFullTime > 0 ? Math.round((result.avgWeekly / weeklyFullTime) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Hero number */}
      <div className="text-center">
        <p className="text-sm font-medium text-text-muted">Your family will receive</p>
        <p className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-[1] text-navy mt-1">
          {fmtCAD(animated)}
        </p>
        <p className="text-text-muted mt-2">
          in benefits over <strong className="text-navy">{result.totalWeeks} weeks</strong> ({weeksToMonths(result.totalWeeks)})
        </p>
      </div>

      {/* Income replacement bar */}
      <div className="rounded-xl border border-border bg-gray-50 p-5">
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-text-muted">Combined family income (both working)</span>
          <span className="font-semibold text-navy">{fmtCAD(weeklyFullTime)}/wk</span>
        </div>
        <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue transition-all duration-700"
            style={{ width: `${Math.min(replacementPct, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm mt-3">
          <span className="text-text-muted">Average family income during leave</span>
          <span className="font-semibold text-blue">{fmtCAD(Math.round(result.avgWeekly))}/wk</span>
        </div>
        <p className="text-center mt-4 text-sm">
          During leave, your household brings in <strong className="text-navy">{replacementPct}%</strong> of what it normally would.
          {result.incomeGap > 0 && (
            <span className="text-text-muted"> That's {fmtCAD(Math.round(result.incomeGap))} less over the full leave period.</span>
          )}
        </p>
      </div>

      {/* Per-parent split */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs font-medium text-text-muted">Birthing parent</p>
          <p className="font-display text-lg text-blue mt-1">{fmtCAD(result.birthingParent.grandTotal)}</p>
          <p className="text-xs text-text-muted">{result.birthingParent.totalWeeks} weeks off</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs font-medium text-text-muted">Other parent</p>
          <p className="font-display text-lg text-navy mt-1">{fmtCAD(result.otherParent.grandTotal)}</p>
          <p className="text-xs text-text-muted">{result.otherParent.totalWeeks} weeks off</p>
        </div>
      </div>
    </div>
  );
}
