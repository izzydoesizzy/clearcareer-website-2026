/* ── Income Over Time: Monthly Bar Chart ── */

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { fmtCAD } from "./constants.js";
import type { CalcResult } from "./types.js";

interface MonthPoint {
  label: string;
  income: number;
  fullTime: number;
  isBelowHalf: boolean;
}

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as MonthPoint;
  if (!d) return null;
  const gap = d.fullTime - d.income;

  return (
    <div className="rounded-lg border border-border bg-white p-3 shadow-lg text-xs">
      <p className="font-semibold text-navy mb-1.5">{d.label}</p>
      <p className="text-blue">Leave income: <span className="font-semibold">{fmtCAD(d.income)}</span></p>
      <p className="text-text-muted">Normal income: <span className="font-semibold">{fmtCAD(d.fullTime)}</span></p>
      {gap > 0 && (
        <p className="mt-1.5 pt-1.5 border-t border-border text-amber-600 font-semibold">
          {fmtCAD(gap)} less this month
        </p>
      )}
    </div>
  );
}

interface Props {
  result: CalcResult;
  bpSalary: number;
  opSalary: number;
  height?: number;
}

export default function IncomeChart({ result, bpSalary, opSalary, height = 260 }: Props) {
  const monthlyFullTime = Math.round(((bpSalary + opSalary) / 12));

  const data = useMemo(() => {
    // Build per-week income for each parent
    const bpWeekly: number[] = [];
    const opWeekly: number[] = [];

    for (const phase of result.birthingParent.phases) {
      for (let i = 0; i < phase.weeks; i++) {
        bpWeekly.push(phase.weeklyBenefit + phase.weeklyTopUp);
      }
    }
    for (const phase of result.otherParent.phases) {
      for (let i = 0; i < phase.weeks; i++) {
        opWeekly.push(phase.weeklyBenefit + phase.weeklyTopUp);
      }
    }

    const maxWeeks = Math.max(bpWeekly.length, opWeekly.length);
    if (maxWeeks === 0) return [];

    // Group into months (~4.33 weeks each)
    const months: MonthPoint[] = [];
    const weeksPerMonth = 4.33;
    const totalMonths = Math.ceil(maxWeeks / weeksPerMonth);

    for (let m = 0; m < totalMonths; m++) {
      const startWeek = Math.round(m * weeksPerMonth);
      const endWeek = Math.min(Math.round((m + 1) * weeksPerMonth), maxWeeks);
      let monthIncome = 0;

      for (let w = startWeek; w < endWeek; w++) {
        const bpOnLeave = w < bpWeekly.length;
        const opOnLeave = w < opWeekly.length;
        const bpIncome = bpOnLeave ? bpWeekly[w] : bpSalary / 52;
        const opIncome = opOnLeave ? opWeekly[w] : opSalary / 52;
        monthIncome += bpIncome + opIncome;
      }

      // Scale to full month
      const weeksInMonth = endWeek - startWeek;
      const scaledIncome = Math.round(monthIncome * (weeksPerMonth / weeksInMonth));

      months.push({
        label: `Month ${m + 1}`,
        income: scaledIncome,
        fullTime: monthlyFullTime,
        isBelowHalf: scaledIncome < monthlyFullTime * 0.5,
      });
    }

    return months;
  }, [result, bpSalary, opSalary, monthlyFullTime]);

  if (data.length === 0) return null;

  const yMax = Math.ceil(monthlyFullTime * 1.1 / 1000) * 1000;

  return (
    <div className="space-y-3">
      <p className="text-sm text-text-muted">
        Here's what your family's monthly income looks like during leave compared to if you were both working full-time.
      </p>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barCategoryGap="20%">
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              domain={[0, yMax]}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              width={44}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <ReferenceLine
              y={monthlyFullTime}
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="6 3"
              label={{ value: "Normal income", position: "right", fontSize: 11, fill: "#9ca3af" }}
            />
            <Bar dataKey="income" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.isBelowHalf ? "#0450c8" : "#0161EF"}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-blue" />
          <span>Leave income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0 border-t-2 border-dashed border-gray-400" />
          <span>Normal income</span>
        </div>
      </div>
    </div>
  );
}
