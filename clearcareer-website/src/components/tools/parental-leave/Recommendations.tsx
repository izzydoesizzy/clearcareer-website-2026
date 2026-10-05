/* ── Inline Tips (simplified from full recommendations) ── */

import type { Recommendation } from "./types.js";

const COLORS: Record<string, string> = {
  warning: "border-amber-400 bg-amber-50 text-amber-800",
  optimization: "border-blue bg-blue-bg text-navy",
  positive: "border-success bg-success/5 text-emerald-800",
  info: "border-navy bg-navy/5 text-navy",
};

interface Props {
  recommendations: Recommendation[];
  max?: number;
}

export default function Recommendations({ recommendations, max = 2 }: Props) {
  // Show the most actionable tips only
  const prioritized = recommendations
    .filter((r) => r.type === "warning" || r.type === "optimization" || r.type === "positive")
    .slice(0, max);

  if (prioritized.length === 0) return null;

  return (
    <div className="space-y-2">
      {prioritized.map((rec, i) => (
        <div key={i} className={`rounded-lg border-l-4 px-4 py-3 ${COLORS[rec.type] || COLORS.info}`}>
          <p className="text-sm font-semibold">{rec.title}</p>
          <p className="text-sm mt-0.5 opacity-80">{rec.body}</p>
        </div>
      ))}
    </div>
  );
}
