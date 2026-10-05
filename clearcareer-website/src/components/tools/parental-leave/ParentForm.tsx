/* ── Per-Parent Input Form ── */

import { useState } from "react";
import { PROVINCES, TOPUP_PRESETS } from "./constants.js";
import type { ParentConfig, LeaveType, Tenure } from "./types.js";

interface Props {
  label: "Birthing Parent" | "Other Parent";
  config: ParentConfig;
  onChange: (config: ParentConfig) => void;
  leaveType: LeaveType;
  isQuebec: boolean;
}

// Tenure only matters for the "under 600 hours" warning -- simplify to a checkbox

export default function ParentForm({ label, config, onChange, leaveType, isQuebec }: Props) {
  const [customTopUp, setCustomTopUp] = useState("");
  const isBP = label === "Birthing Parent";
  const borderColor = isBP ? "border-blue" : "border-navy";

  function update(partial: Partial<ParentConfig>) {
    onChange({ ...config, ...partial });
  }

  function updateTopUp(partial: Partial<ParentConfig["topUp"]>) {
    onChange({ ...config, topUp: { ...config.topUp, ...partial } });
  }

  // Default top-up durations based on leave type
  const defaultMatWeeks = isQuebec ? 18 : 15;
  const defaultParWeeks = leaveType === "standard" ? 35 : 61;

  return (
    <div className={`rounded-xl border border-border border-l-4 ${borderColor} bg-white p-5 sm:p-6 space-y-5`}>
      <h4 className="font-display text-lg text-navy">{label}</h4>

      {/* Salary */}
      <div>
        <p className="font-display italic text-text-muted text-sm mb-2">Annual salary (CAD)</p>
        <div className="relative">
          <span className="absolute left-0 bottom-3 text-text-muted text-lg">$</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={1000}
            placeholder="75000"
            value={config.salary || ""}
            onChange={(e) => update({ salary: e.target.value ? Number(e.target.value) : 0 })}
            aria-label={`${label} annual salary`}
            className="w-full border-0 border-b-2 border-border bg-transparent py-3 pl-6 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
          />
        </div>
        {config.salary > 0 && config.salary < 1000 && (
          <p className="mt-1.5 text-xs text-amber-600">
            Did you mean <button type="button" className="font-semibold underline" onClick={() => update({ salary: config.salary * 1000 })}>${(config.salary * 1000).toLocaleString()}</button>? Enter your full annual salary (e.g. 75000).
          </p>
        )}
      </div>

      {/* Province */}
      <div>
        <p className="font-display italic text-text-muted text-sm mb-2">Province of work</p>
        <select
          value={config.provinceCode}
          onChange={(e) => update({ provinceCode: e.target.value })}
          aria-label={`${label} province of work`}
          className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors cursor-pointer"
        >
          {PROVINCES.map((p) => (
            <option key={p.code} value={p.code}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Advanced: Tenure + Self-employed + Top-Up */}
      <div className="border-t border-border pt-5 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.tenure === "under600"}
            onChange={(e) => update({ tenure: e.target.checked ? "under600" : "600plus" })}
            className="w-4 h-4 accent-blue rounded"
          />
          <span className="text-sm text-text">I've been at this job less than 4 months</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.selfEmployed}
            onChange={(e) => update({ selfEmployed: e.target.checked })}
            className="w-4 h-4 accent-blue rounded"
          />
          <span className="text-sm text-text">I'm self-employed</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.topUp.enabled}
            onChange={(e) => updateTopUp({ enabled: e.target.checked })}
            className="w-4 h-4 accent-blue rounded"
          />
          <span className="text-sm font-semibold text-navy">My employer offers a top-up</span>
        </label>

        {config.topUp.enabled && (
          <div className="mt-4 space-y-4 pl-7">
            {/* Percentage */}
            <div>
              <p className="text-sm text-text-muted mb-2">Top-up percentage</p>
              <div className="flex gap-2 flex-wrap">
                {TOPUP_PRESETS.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => { updateTopUp({ percentage: pct }); setCustomTopUp(""); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      config.topUp.percentage === pct && !customTopUp
                        ? "bg-blue text-white"
                        : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Custom"
                  value={customTopUp}
                  onChange={(e) => {
                    setCustomTopUp(e.target.value);
                    if (e.target.value) updateTopUp({ percentage: Number(e.target.value) });
                  }}
                  className="w-20 rounded-full border border-border bg-white px-3 py-1.5 text-xs text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10"
                />
              </div>
            </div>

            {/* Duration - Maternity (birthing parent only) */}
            {isBP && (
              <div>
                <p className="text-sm text-text-muted mb-2">Top-up during maternity (weeks)</p>
                <input
                  type="number"
                  min={0}
                  max={defaultMatWeeks}
                  value={config.topUp.matWeeks}
                  onChange={(e) => updateTopUp({ matWeeks: Math.min(Number(e.target.value) || 0, defaultMatWeeks) })}
                  className="w-24 border-0 border-b-2 border-border bg-transparent py-2 text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors"
                />
                <span className="text-xs text-text-muted ml-2">of {defaultMatWeeks}</span>
              </div>
            )}

            {/* Duration - Parental */}
            <div>
              <p className="text-sm text-text-muted mb-2">Top-up during parental leave (weeks)</p>
              <input
                type="number"
                min={0}
                max={defaultParWeeks}
                value={config.topUp.parWeeks}
                onChange={(e) => updateTopUp({ parWeeks: Math.min(Number(e.target.value) || 0, defaultParWeeks) })}
                className="w-24 border-0 border-b-2 border-border bg-transparent py-2 text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors"
              />
              <span className="text-xs text-text-muted ml-2">of {defaultParWeeks} max</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
