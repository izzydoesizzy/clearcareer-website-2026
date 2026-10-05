/* ── Leave Timeline: CSS Horizontal Bars ── */

import { useState } from "react";
import { fmtCAD, fmtWeeks } from "./constants.js";
import type { CalcResult, WeekPhase } from "./types.js";

function PhaseTooltip({ phase, show }: { phase: WeekPhase; show: boolean }) {
  if (!show) return null;
  const weekly = phase.weeklyBenefit + phase.weeklyTopUp;
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 rounded-lg bg-navy text-white text-xs p-3 shadow-lg whitespace-nowrap pointer-events-none">
      <p className="font-semibold">{phase.label}</p>
      <p>{fmtWeeks(phase.weeks)}</p>
      <p>Benefit: {fmtCAD(phase.weeklyBenefit)}/wk</p>
      {phase.weeklyTopUp > 0 && <p>Top-up: +{fmtCAD(phase.weeklyTopUp)}/wk</p>}
      <p className="font-semibold mt-1">Total: {fmtCAD(weekly)}/wk</p>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-navy" />
    </div>
  );
}

function PhaseBar({ phase, totalWeeks }: { phase: WeekPhase; totalWeeks: number }) {
  const [hovered, setHovered] = useState(false);
  const widthPct = totalWeeks > 0 ? (phase.weeks / totalWeeks) * 100 : 0;
  if (widthPct === 0) return null;

  return (
    <div
      className="relative h-10 sm:h-12 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
      style={{ width: `${widthPct}%`, backgroundColor: phase.color, minWidth: "28px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {widthPct > 8 && (
        <span className="text-white text-[10px] sm:text-xs font-semibold truncate px-1">
          {phase.weeks}w
        </span>
      )}
      {phase.weeklyTopUp > 0 && (
        <div className="absolute inset-0 border-2 border-emerald-400 rounded-[1px] pointer-events-none" />
      )}
      <PhaseTooltip phase={phase} show={hovered} />
    </div>
  );
}

interface Props {
  result: CalcResult;
}

export default function LeaveTimeline({ result }: Props) {
  const bpPhases = result.birthingParent.phases;
  const opPhases = result.otherParent.phases;

  return (
    <div className="space-y-4">
      {/* Birthing Parent */}
      {bpPhases.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-blue uppercase tracking-wide">Birthing Parent</p>
            <p className="text-xs text-text-muted">{result.birthingParent.totalWeeks} weeks</p>
          </div>
          <div className="flex rounded-lg overflow-hidden">
            {bpPhases.map((phase, i) => (
              <PhaseBar key={`bp-${i}`} phase={phase} totalWeeks={result.totalWeeks} />
            ))}
          </div>
        </div>
      )}

      {/* Other Parent */}
      {opPhases.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-navy uppercase tracking-wide">Other Parent</p>
            <p className="text-xs text-text-muted">{result.otherParent.totalWeeks} weeks</p>
          </div>
          <div className="flex rounded-lg overflow-hidden">
            {opPhases.map((phase, i) => (
              <PhaseBar key={`op-${i}`} phase={phase} totalWeeks={result.totalWeeks} />
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
        {[
          { color: "#0161EF", label: "Maternity" },
          { color: "#030620", label: "Paternity" },
          { color: "#3b82f6", label: "Parental" },
          { color: "#93c5fd", label: "Parental (lower rate)" },
          { color: "#D97706", label: "Sharing Bonus" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-text-muted">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border-2 border-emerald-400 bg-transparent" />
          <span className="text-[10px] text-text-muted">Top-up</span>
        </div>
      </div>

      {/* Phase breakdown table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white mt-2">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-blue-bg">
              <th className="px-3 py-2.5 text-left font-semibold text-navy">Phase</th>
              <th className="px-3 py-2.5 text-left font-semibold text-navy">Parent</th>
              <th className="px-3 py-2.5 text-right font-semibold text-navy">Weeks</th>
              <th className="px-3 py-2.5 text-right font-semibold text-navy">Weekly</th>
              <th className="px-3 py-2.5 text-right font-semibold text-navy">Total</th>
            </tr>
          </thead>
          <tbody>
            {[...bpPhases.map((p) => ({ ...p, parentLabel: "Birthing" })), ...opPhases.map((p) => ({ ...p, parentLabel: "Other" }))].map((phase, i, arr) => (
              <tr key={i} className={i < arr.length - 1 ? "border-b border-border" : ""}>
                <td className="px-3 py-2.5 text-text">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: phase.color }} />
                    {phase.label}
                  </div>
                </td>
                <td className="px-3 py-2.5 text-text-muted">{phase.parentLabel}</td>
                <td className="px-3 py-2.5 text-right text-text">{phase.weeks}</td>
                <td className="px-3 py-2.5 text-right text-text">
                  {fmtCAD(phase.weeklyBenefit + phase.weeklyTopUp)}
                  {phase.weeklyTopUp > 0 && (
                    <span className="text-emerald-600 text-[10px] ml-1">(+{fmtCAD(phase.weeklyTopUp)})</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-right font-semibold text-navy">
                  {fmtCAD(phase.weeks * (phase.weeklyBenefit + phase.weeklyTopUp))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
