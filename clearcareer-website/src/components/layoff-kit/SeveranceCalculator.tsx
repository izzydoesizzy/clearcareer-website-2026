// Severance Calculator for the Layoff Survival Kit Access Hub
// NOTE: This should stay in sync with SeveranceStory.tsx in clearcareer-website.
// Both use the same calculator-data.ts logic. If you change one, update the other.
"use client";

import { useState, useRef } from "react";
import {
  PROVINCES,
  calculateEsa,
  estimateCommonLaw,
  findComparableCases,
  type JobLevel,
  type EsaResult,
  type CommonLawEstimate,
  type ComparableCase,
} from "./calculator-data";

const JOB_LEVELS: { value: JobLevel; label: string }[] = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid-Level" },
  { value: "senior", label: "Senior / Specialist" },
  { value: "director", label: "Director / VP" },
  { value: "executive", label: "C-Suite / Executive" },
];

function formatDollars(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function SeveranceCalculator() {
  const [province, setProvince] = useState("ON");
  const [years, setYears] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [jobLevel, setJobLevel] = useState<JobLevel>("mid");
  const [inducement, setInducement] = useState(false);
  const [hasTermClause, setHasTermClause] = useState<"no" | "yes" | "unknown">(
    "unknown"
  );
  const [result, setResult] = useState<{
    esa: EsaResult;
    commonLaw: CommonLawEstimate;
    comparableCases: ComparableCase[];
    weeklyPay: number;
  } | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  const isReady = years !== "" && age !== "" && salary !== "";

  function handleShowDisclaimer() {
    if (!isReady) return;
    setShowDisclaimer(true);
    setTimeout(() => {
      disclaimerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  function handleAgreeAndReveal() {
    if (!salary) return;
    setShowDisclaimer(false);
    const esa = calculateEsa(province, years as number, salary as number);
    const commonLaw = estimateCommonLaw(
      years as number,
      age as number,
      jobLevel,
      inducement
    );
    const comparableCases = findComparableCases(
      age as number,
      years as number,
      jobLevel,
      inducement
    );
    setResult({
      esa,
      commonLaw,
      comparableCases,
      weeklyPay: (salary as number) / 52,
    });
    setTimeout(() => {
      revealRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  // Derived calculations
  const midDollars = result
    ? Math.round((result.commonLaw.midMonths / 12) * (salary as number))
    : 0;
  const lowDollars = result
    ? Math.round((result.commonLaw.lowMonths / 12) * (salary as number))
    : 0;
  const highDollars = result
    ? Math.round((result.commonLaw.highMonths / 12) * (salary as number))
    : 0;
  const gapAboveEsa = result ? midDollars - result.esa.totalDollars : 0;

  // Settlement calculation (realistic take-home with a lawyer)
  const SETTLEMENT_RATE = 0.75; // 75% of court estimate (middle of 70-85%)
  const CONTINGENCY_RATE = 0.3; // 30% of improvement over ESA

  const settlementGrossLow = result
    ? Math.round(
        (result.commonLaw.lowMonths / 12) * (salary as number) * SETTLEMENT_RATE
      )
    : 0;
  const settlementGrossHigh = result
    ? Math.round(
        (result.commonLaw.highMonths / 12) *
          (salary as number) *
          SETTLEMENT_RATE
      )
    : 0;

  const feesLow = result
    ? Math.max(
        0,
        Math.round(
          (settlementGrossLow - result.esa.totalDollars) * CONTINGENCY_RATE
        )
      )
    : 0;
  const feesHigh = result
    ? Math.max(
        0,
        Math.round(
          (settlementGrossHigh - result.esa.totalDollars) * CONTINGENCY_RATE
        )
      )
    : 0;

  const netLow = settlementGrossLow - feesLow;
  const netHigh = settlementGrossHigh - feesHigh;

  return (
    <div className="w-full max-w-[560px] mx-auto">
      {/* ── Disclaimer banner ── */}
      <div className="mb-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 leading-relaxed">
          <strong>This is not legal advice.</strong> Educational estimates based
          on general Canadian employment law. Consult an employment lawyer before
          making decisions.
        </p>
      </div>

      {/* ── Input Fields ── */}
      <div className="space-y-6">
        {/* Province */}
        <div>
          <p className="text-sm text-gray-500 mb-2 italic">
            Where do you work?
          </p>
          <select
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setResult(null);
              setShowDisclaimer(false);
            }}
            className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-lg text-gray-900 focus:border-blue focus:outline-none focus:ring-0 transition-colors cursor-pointer"
          >
            {PROVINCES.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Years + Age side by side */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2 italic">
              Years at this job...
            </p>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={50}
              step={0.5}
              placeholder="7"
              value={years}
              onChange={(e) => {
                setYears(e.target.value ? Number(e.target.value) : "");
                setResult(null);
                setShowDisclaimer(false);
              }}
              className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-xl text-gray-900 placeholder:text-gray-300 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2 italic">Your age...</p>
            <input
              type="number"
              inputMode="numeric"
              min={18}
              max={80}
              placeholder="45"
              value={age}
              onChange={(e) => {
                setAge(e.target.value ? Number(e.target.value) : "");
                setResult(null);
                setShowDisclaimer(false);
              }}
              className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-xl text-gray-900 placeholder:text-gray-300 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
        </div>

        {/* Salary */}
        <div>
          <p className="text-sm text-gray-500 mb-2 italic">
            Your annual salary (CAD)...
          </p>
          <div className="relative">
            <span className="absolute left-0 bottom-3 text-gray-400 text-lg">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              placeholder="120000"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value ? Number(e.target.value) : "");
                setResult(null);
                setShowDisclaimer(false);
              }}
              className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 pl-6 text-xl text-gray-900 placeholder:text-gray-300 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
        </div>

        {/* Job Level */}
        <div>
          <p className="text-sm text-gray-500 mb-2 italic">
            Your role level...
          </p>
          <select
            value={jobLevel}
            onChange={(e) => {
              setJobLevel(e.target.value as JobLevel);
              setResult(null);
              setShowDisclaimer(false);
            }}
            className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-3 text-lg text-gray-900 focus:border-blue focus:outline-none focus:ring-0 transition-colors cursor-pointer"
          >
            {JOB_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Inducement */}
        <div>
          <p className="text-sm text-gray-500 mb-3 italic">
            Were you recruited away from a stable job?
          </p>
          <div className="flex gap-4">
            {[false, true].map((v) => (
              <button
                key={String(v)}
                aria-pressed={inducement === v}
                onClick={() => {
                  setInducement(v);
                  setResult(null);
                  setShowDisclaimer(false);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  inducement === v
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {v ? "Yes" : "No"}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            This means a recruiter or the company actively persuaded you to leave a stable position to join them.
          </p>
          {inducement && (
            <p className="mt-2 text-xs text-blue leading-relaxed">
              Courts increase severance when you were recruited away from secure
              employment. In <em>Rodgers v CEVA</em>, 3 years of service
              resulted in 14 months.
            </p>
          )}
        </div>

        {/* Termination Clause */}
        <div>
          <p className="text-sm text-gray-500 mb-3 italic">
            Does your contract have a termination clause?
          </p>
          <div className="flex gap-3">
            {(["unknown", "no", "yes"] as const).map((v) => (
              <button
                key={v}
                aria-pressed={hasTermClause === v}
                onClick={() => {
                  setHasTermClause(v);
                  setResult(null);
                  setShowDisclaimer(false);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  hasTermClause === v
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {v === "unknown" ? "Not sure" : v === "no" ? "No" : "Yes"}
              </button>
            ))}
          </div>
          {hasTermClause === "yes" && (
            <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>
                  A termination clause may limit your entitlement
                </strong>{" "}
                to the ESA minimum. However, many are poorly drafted and
                unenforceable. Have a lawyer review yours. The estimates below
                assume no enforceable clause.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA Button ── */}
      <button
        onClick={handleShowDisclaimer}
        disabled={!isReady}
        className={`mt-10 w-full rounded-full py-4 text-lg font-semibold transition-all ${
          isReady
            ? "bg-navy text-white hover:bg-navy/90 hover:shadow-lg cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Show Me My Estimate
      </button>

      {/* ── Disclaimer Gate ── */}
      {showDisclaimer && !result && (
        <div ref={disclaimerRef} className="mt-8">
          <div className="rounded-xl border-2 border-navy/20 bg-white p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl font-bold text-navy text-center mb-4">
              Before We Show Your Estimate
            </h3>
            <div className="space-y-3 text-[0.9375rem] leading-[1.7] text-gray-600">
              <p>
                The results provided by this calculator are{" "}
                <strong className="text-navy">
                  educational estimates only
                </strong>{" "}
                and do not constitute legal advice.
              </p>
              <p>
                It is{" "}
                <strong className="text-navy">
                  strongly recommended
                </strong>{" "}
                that you consult an employment lawyer before making any decisions
                about your severance package.
              </p>
              <p>
                There is no guarantee with respect to the ranges provided.
                Outcomes vary based on individual circumstances, including your
                employment contract, the specific facts of your termination, and
                the court or jurisdiction involved.
              </p>
            </div>
            <button
              onClick={handleAgreeAndReveal}
              className="mt-6 w-full rounded-full bg-navy py-4 text-base font-semibold text-white hover:bg-navy/90 hover:shadow-lg transition-all cursor-pointer"
            >
              I Understand — Show My Estimate
            </button>
            <p className="mt-3 text-[11px] text-gray-400 text-center">
              By clicking above, you acknowledge these results are estimates
              based on general legal precedent, not advice for your specific
              situation.
            </p>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {result && (
        <div ref={revealRef} className="mt-10 space-y-6">
          {/* ── Hero: Months + Dollars ── */}
          <div className="rounded-2xl bg-navy p-6 sm:p-8 text-center">
            <p className="text-blue-light text-xs font-semibold uppercase tracking-widest mb-3">
              Courts Have Awarded in Similar Cases
            </p>
            <p className="text-[clamp(2.5rem,8vw,4rem)] leading-none text-white font-bold">
              {result.commonLaw.lowMonths} – {result.commonLaw.highMonths}{" "}
              months
            </p>
            <p className="mt-2 text-sm text-white/50">of reasonable notice</p>

            <p className="mt-4 text-sm text-white/70 max-w-md mx-auto">
              At your salary, that's{" "}
              <span className="text-white font-semibold">
                {formatDollars(lowDollars)} – {formatDollars(highDollars)}
              </span>{" "}
              in total compensation (gross, before tax and legal fees).
            </p>

            <div className="mt-4 rounded-lg bg-white/5 border border-white/10 py-2.5 px-4 inline-block">
              <p className="text-xs text-white/50">
                Your employer's statutory minimum:{" "}
                <span className="text-white/70 font-semibold">
                  {result.esa.totalWeeks} weeks (
                  {formatDollars(result.esa.totalDollars)})
                </span>
              </p>
            </div>

            <p className="mt-4 text-xs text-white/40 max-w-md mx-auto">
              What you actually take home depends on your contract, your lawyer,
              and how the negotiation goes. Most cases settle without going to
              trial.
            </p>

            {/* Exceptional case note */}
            {result.commonLaw.exceptionalCase && (
              <div className="mt-6 p-3 rounded-xl bg-purple-500/10 border border-purple-400/20 text-left">
                <p className="text-sm text-purple-200">
                  <strong>Exceptional circumstances.</strong> Your combination of
                  age, tenure, and seniority may justify exceeding the typical
                  24-month cap. Courts have awarded 26-27 months in cases like{" "}
                  <em>Currie v Nylene</em> (2022) and{" "}
                  <em>Hussain v Suzuki</em>.
                </p>
              </div>
            )}
          </div>

          {/* ── 3-Tier Breakdown ── */}
          <div className="space-y-4">
            {/* Tier 1: ESA */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    What Your Employer Must Pay
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    The statutory floor. Automatic, no lawyer needed.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-gray-900">
                    {result.esa.totalWeeks} wks
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDollars(result.esa.totalDollars)}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-4 text-[10px] text-gray-400">
                <span>
                  Termination: {result.esa.terminationWeeks} wks (
                  {formatDollars(result.esa.terminationDollars)})
                </span>
                <span>
                  Severance: {result.esa.severanceWeeks} wks (
                  {formatDollars(result.esa.severanceDollars)})
                </span>
              </div>
              {result.esa.notes && (
                <p className="mt-2 text-[10px] text-gray-400 italic">
                  {result.esa.notes}
                </p>
              )}
            </div>

            {/* Tier 2: Realistic Settlement (highlighted) */}
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Potential Settlement Range
                    </p>
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full">
                      With a Lawyer
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    With a lawyer's demand letter. No trial needed.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-gray-900">
                    {formatDollars(netLow)}
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    – {formatDollars(netHigh)}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">after fees</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-gray-500 space-y-1">
                <p>
                  Settlement gross: {formatDollars(settlementGrossLow)} –{" "}
                  {formatDollars(settlementGrossHigh)} (settlements typically
                  range 70-85% of court estimates)
                </p>
                <p>
                  Typical lawyer fee: ~{formatDollars(feesLow)} –{" "}
                  {formatDollars(feesHigh)} (30% of improvement over employer's
                  initial offer)
                </p>
                <p className="text-[10px] text-gray-400 italic">
                  Fee structures vary by firm. Some lawyers charge on the total
                  settlement, not just the improvement over ESA. Confirm the fee
                  arrangement before retaining.
                </p>
                {gapAboveEsa > 0 && (
                  <p className="text-emerald-700 font-medium">
                    Gap over ESA minimum (after fees):{" "}
                    {formatDollars(netLow - result.esa.totalDollars)} –{" "}
                    {formatDollars(netHigh - result.esa.totalDollars)}
                  </p>
                )}
              </div>
            </div>

            {/* Tier 3: Court Range */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    What Courts Have Awarded
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on the Bardal factors. Trial takes 12-24 months.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-gray-500">
                    {result.commonLaw.lowMonths} –{" "}
                    {result.commonLaw.highMonths} mo
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDollars(lowDollars)} – {formatDollars(highDollars)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Important Caveats ── */}
          <div>
            <h4 className="font-semibold text-gray-900 text-base mb-4">
              What you need to know
            </h4>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
                <p className="text-[0.9375rem] text-amber-900">
                  <strong>Duty to mitigate.</strong> Courts expect you to
                  actively job search during the notice period. If you find work,
                  the amount gets reduced. This is normal and doesn't mean you
                  shouldn't negotiate.
                </p>
              </div>
              <div className="text-[0.9375rem] text-gray-600 space-y-3">
                <p>
                  <strong className="text-gray-900">
                    Your contract matters.
                  </strong>{" "}
                  A termination clause could limit you to the ESA minimum. Most
                  are poorly drafted and unenforceable (especially post-
                  <em>Waksdale</em> 2020), but you need a lawyer to confirm that
                  for your specific contract.
                </p>
                <p>
                  <strong className="text-gray-900">Tax applies.</strong>{" "}
                  Severance is taxable income. A lump sum gets hit harder than
                  salary continuation. Ask your lawyer about structuring the
                  payment.
                </p>
                <p>
                  <strong className="text-gray-900">
                    Every case is different.
                  </strong>{" "}
                  These numbers are based on patterns in published case law, not
                  a prediction for your specific situation.
                </p>
              </div>
            </div>
          </div>

          {/* ── Comparable Cases ── */}
          {result.comparableCases.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 text-base mb-4">
                Real cases with similar profiles
              </h4>
              <div className="space-y-3">
                {result.comparableCases.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-sm font-semibold text-gray-900">
                          {c.name}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({c.year})
                        </span>
                      </div>
                      <span className="text-sm font-bold text-blue whitespace-nowrap">
                        {c.award} months
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {c.age > 0 ? `${c.age} years old, ` : ""}
                      {c.tenure} years tenure, {c.role}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-gray-400 italic">
                These are court awards, not settlement amounts. Most cases settle
                before trial at 70-85% of these figures.
              </p>
            </div>
          )}

          {/* ── What to Negotiate ── */}
          <div>
            <h4 className="font-semibold text-gray-900 text-base mb-4">
              What to ask your lawyer about
            </h4>
            <p className="text-[0.9375rem] text-gray-500 mb-4">
              Severance isn't just salary. If your lawyer confirms there's room
              to negotiate:
            </p>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  title: "Salary continuation",
                  desc: `${result.commonLaw.lowMonths}-${result.commonLaw.highMonths} months (${formatDollars(lowDollars)}-${formatDollars(highDollars)})`,
                },
                {
                  n: "2",
                  title: "Benefits continuation",
                  desc: "health, dental, vision, life insurance for the full period",
                },
                {
                  n: "3",
                  title: "Pro-rated bonus",
                  desc: "for the current year",
                },
                {
                  n: "4",
                  title: "Equity acceleration",
                  desc: "or extended exercise window for unvested RSUs/options",
                },
                {
                  n: "5",
                  title: "Written reference",
                  desc: "and agreed-upon reference language",
                },
                {
                  n: "6",
                  title: "Outplacement support",
                  desc: "career coaching, resume services",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    {item.n}
                  </span>
                  <p className="text-[0.9375rem] text-gray-600">
                    <strong className="text-gray-900">{item.title}</strong>{" "}
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── The First Step ── */}
          <div className="rounded-xl border-2 border-blue/20 bg-blue-bg p-6">
            <h4 className="font-semibold text-gray-900 text-lg">
              The first step costs you nothing.
            </h4>
            <p className="mt-2 text-[0.9375rem] text-gray-600 leading-relaxed">
              Most employment lawyers offer a free 15-30 minute consultation.
              They'll review your termination letter, your contract, and tell you
              honestly whether it's worth pursuing. If it is, most work on
              contingency (they only get paid if you do).
            </p>
          </div>

          {/* ── Final Disclaimer ── */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-600 mb-1">
              This is not legal advice
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Educational estimates based on general legal precedent and
              statutory rules. Every situation is unique. A valid termination
              clause may limit your entitlement.{" "}
              <strong>
                Consult an employment lawyer in your province before making any
                decisions.
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
