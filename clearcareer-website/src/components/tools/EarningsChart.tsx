import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function cumulativeEarnings(base: number, raisePercent: number, years: number): number {
  let total = 0;
  let current = base;
  for (let i = 0; i < years; i++) {
    total += current;
    current *= 1 + raisePercent / 100;
  }
  return total;
}

/* ── Tooltip ── */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const withNeg = payload.find((p: any) => p.dataKey === "negotiated");
  const without = payload.find((p: any) => p.dataKey === "original");
  const diff = (withNeg?.value || 0) - (without?.value || 0);

  return (
    <div className="rounded-lg border border-border bg-white p-3 shadow-lg text-xs">
      <p className="font-semibold text-navy mb-1.5">Year {label}</p>
      {withNeg && (
        <p className="text-blue">
          With negotiation: <span className="font-semibold">{fmt(withNeg.value)}</span>
        </p>
      )}
      {without && (
        <p className="text-text-muted">
          Without: <span className="font-semibold">{fmt(without.value)}</span>
        </p>
      )}
      {diff > 0 && (
        <p className="mt-1.5 pt-1.5 border-t border-border text-emerald-600 font-semibold">
          +{fmt(diff)} gained
        </p>
      )}
    </div>
  );
}

function DarkTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const withNeg = payload.find((p: any) => p.dataKey === "negotiated");
  const without = payload.find((p: any) => p.dataKey === "original");
  const diff = (withNeg?.value || 0) - (without?.value || 0);

  return (
    <div className="rounded-lg border border-white/10 bg-navy/95 backdrop-blur p-3 shadow-lg text-xs">
      <p className="font-semibold text-white mb-1.5">Year {label}</p>
      {withNeg && (
        <p className="text-blue-light">
          With negotiation: <span className="font-semibold">{fmt(withNeg.value)}</span>
        </p>
      )}
      {without && (
        <p className="text-white/50">
          Without: <span className="font-semibold">{fmt(without.value)}</span>
        </p>
      )}
      {diff > 0 && (
        <p className="mt-1.5 pt-1.5 border-t border-white/10 text-emerald-400 font-semibold">
          +{fmt(diff)} gained
        </p>
      )}
    </div>
  );
}

/* ── Main Chart ── */

interface EarningsChartProps {
  offer: number;
  negotiated: number;
  raise: number;
  hasData: boolean;
  variant?: "light" | "dark";
  height?: number;
  showBadge?: boolean;
}

export default function EarningsChart({
  offer,
  negotiated,
  raise,
  hasData,
  variant = "light",
  height = 320,
  showBadge = true,
}: EarningsChartProps) {
  const isDark = variant === "dark";

  // Year-by-year data (0-10) for smooth curves
  const chartData = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => ({
      year: i,
      original: hasData ? cumulativeEarnings(offer, raise, i) : 0,
      negotiated: hasData ? cumulativeEarnings(negotiated, raise, i) : 0,
    }));
  }, [offer, negotiated, raise, hasData]);

  const diff10 = hasData
    ? cumulativeEarnings(negotiated, raise, 10) - cumulativeEarnings(offer, raise, 10)
    : 0;

  // Y-axis domain: start near the minimum to exaggerate the gap (Wealthsimple style)
  const yDomain = useMemo(() => {
    if (!hasData) return [0, 100];
    const allValues = chartData.flatMap((d) => [d.original, d.negotiated]).filter((v) => v > 0);
    if (allValues.length === 0) return [0, 100];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    // Start at ~80% of the minimum value to make divergence dramatic
    const floor = Math.max(0, Math.floor((min * 0.7) / 10000) * 10000);
    const ceiling = Math.ceil((max * 1.05) / 10000) * 10000;
    return [floor, ceiling];
  }, [chartData, hasData]);

  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "#e5e7eb";
  const axisColor = isDark ? "rgba(255,255,255,0.3)" : "#6b7280";
  const axisLineColor = isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb";

  return (
    <div>
      {showBadge && (
        <div className="flex items-center justify-between mb-1">
          <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-navy"}`}>
            Cumulative Earnings Over Time
          </h3>
          {hasData && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isDark ? "text-emerald-400 bg-emerald-400/10" : "text-emerald-600 bg-emerald-50"
            }`}>
              +{fmt(diff10)} at year 10
            </span>
          )}
        </div>
      )}

      <div style={{ height }}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradNeg-${variant}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#3b82f6" : "#0161EF"} stopOpacity={isDark ? 0.35 : 0.25} />
                  <stop offset="100%" stopColor={isDark ? "#3b82f6" : "#0161EF"} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id={`gradOrig-${variant}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#ffffff" : "#030620"} stopOpacity={isDark ? 0.06 : 0.06} />
                  <stop offset="100%" stopColor={isDark ? "#ffffff" : "#030620"} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: axisColor }}
                tickLine={false}
                axisLine={{ stroke: axisLineColor }}
                tickFormatter={(v) => v === 0 ? "Now" : `Yr ${v}`}
              />
              <YAxis
                tick={{ fontSize: 11, fill: axisColor }}
                tickLine={false}
                axisLine={false}
                domain={yDomain}
                tickFormatter={(v) =>
                  v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}`
                }
                width={58}
              />
              <Tooltip content={isDark ? <DarkTooltip /> : <ChartTooltip />} />
              <Area
                type="natural"
                dataKey="original"
                stroke={isDark ? "rgba(255,255,255,0.25)" : "#030620"}
                strokeWidth={2}
                strokeOpacity={isDark ? 1 : 0.25}
                strokeDasharray="6 3"
                fill={`url(#gradOrig-${variant})`}
                animationDuration={900}
                name="Without negotiation"
              />
              <Area
                type="natural"
                dataKey="negotiated"
                stroke={isDark ? "#60a5fa" : "#0161EF"}
                strokeWidth={2.5}
                fill={`url(#gradNeg-${variant})`}
                animationDuration={900}
                animationBegin={200}
                name="With negotiation"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className={`h-full flex items-center justify-center rounded-lg border border-dashed ${
            isDark ? "border-white/10 bg-white/5" : "border-border bg-gray-50/50"
          }`}>
            <div className="text-center">
              <svg className={`w-10 h-10 mx-auto mb-2 ${isDark ? "text-white/20" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <p className={`text-sm ${isDark ? "text-white/40" : "text-text-muted"}`}>
                Enter your numbers to see the growth curves
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={`mt-3 flex items-center gap-5 text-[10px] ${isDark ? "text-white/40" : "text-text-muted"}`}>
        <span className="flex items-center gap-1.5">
          <span className={`w-5 h-0.5 rounded-full ${isDark ? "bg-white/25" : "bg-navy/25"}`} style={{ borderTop: "2px dashed" }} />
          Without negotiation
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-5 h-0.5 rounded-full ${isDark ? "bg-blue-light" : "bg-blue"}`} />
          With negotiation
        </span>
      </div>
    </div>
  );
}
