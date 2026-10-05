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
} from "../layoff-kit/calculator-data";

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

/* ── Story Arc Severance Calculator ── */

export default function SeveranceStory() {
  const [province, setProvince] = useState("ON");
  const [years, setYears] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [jobLevel, setJobLevel] = useState<JobLevel>("mid");
  const [inducement, setInducement] = useState(false);
  const [hasTermClause, setHasTermClause] = useState<"no" | "yes" | "unknown">("unknown");
  const [result, setResult] = useState<{
    esa: EsaResult;
    commonLaw: CommonLawEstimate;
    comparableCases: ComparableCase[];
    weeklyPay: number;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);
  const hasEmail = email.includes("@");

  const isReady = years !== "" && age !== "" && salary !== "";

  function handleShowDisclaimer() {
    if (!isReady) return;
    setShowDisclaimer(true);
    setTimeout(() => {
      disclaimerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  function handleAgreeAndReveal() {
    if (!salary) return;
    setShowDisclaimer(false);
    const esa = calculateEsa(province, years as number, salary as number);
    const commonLaw = estimateCommonLaw(years as number, age as number, jobLevel, inducement);
    const comparableCases = findComparableCases(age as number, years as number, jobLevel, inducement);
    setResult({ esa, commonLaw, comparableCases, weeklyPay: (salary as number) / 52 });
    setTimeout(() => {
      revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

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
  const today = new Date();

  // Settlement calculation (realistic take-home)
  const SETTLEMENT_RATE = 0.75; // 75% of court estimate (middle of 70-85%)
  const CONTINGENCY_RATE = 0.30; // 30% of improvement over ESA

  const settlementGrossLow = result ? Math.round((result.commonLaw.lowMonths / 12) * (salary as number) * SETTLEMENT_RATE) : 0;
  const settlementGrossMid = result ? Math.round((result.commonLaw.midMonths / 12) * (salary as number) * SETTLEMENT_RATE) : 0;
  const settlementGrossHigh = result ? Math.round((result.commonLaw.highMonths / 12) * (salary as number) * SETTLEMENT_RATE) : 0;

  const feesLow = result ? Math.max(0, Math.round((settlementGrossLow - result.esa.totalDollars) * CONTINGENCY_RATE)) : 0;
  const feesMid = result ? Math.max(0, Math.round((settlementGrossMid - result.esa.totalDollars) * CONTINGENCY_RATE)) : 0;
  const feesHigh = result ? Math.max(0, Math.round((settlementGrossHigh - result.esa.totalDollars) * CONTINGENCY_RATE)) : 0;

  const netLow = settlementGrossLow - feesLow;
  const netMid = settlementGrossMid - feesMid;
  const netHigh = settlementGrossHigh - feesHigh;

  function handlePrint() {
    const printWindow = window.open("", "_blank", "width=800,height=1100");
    if (!printWindow) return;
    const reportEl = document.getElementById("branded-pdf-report-sev");
    if (!reportEl) return;
    printWindow.document.write(`<!DOCTYPE html><html><head>
      <title>Severance Estimate Report - ClearCareer</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; color: #0f0f0f; line-height: 1.6; padding: 40px; max-width: 700px; margin: 0 auto; }
        h1, .serif { font-family: 'DM Serif Display', Georgia, serif; }
        a { color: #0161EF; text-decoration: underline; }
        .section { page-break-inside: avoid; break-inside: avoid; margin-bottom: 24px; }
        @media print { body { padding: 0; } .no-print { display: none !important; } @page { margin: 1.5cm; size: letter; } }
      </style>
    </head><body>${reportEl.innerHTML}
      <script>window.onload=function(){setTimeout(function(){window.print();window.close();},300);};</script>
    </body></html>`);
    printWindow.document.close();
  }

  async function handleSendEmail() {
    if (!hasEmail || emailSending || !result) return;
    setEmailSending(true);
    try {
      await fetch("/api/send-severance-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subscribe,
          ...(honeypot && { website: honeypot }),
          reportData: {
            province: PROVINCES.find(p => p.code === province)?.name || province,
            esaTotalWeeks: result.esa.totalWeeks,
            esaTotalDollars: result.esa.totalDollars,
            commonLawLow: result.commonLaw.lowMonths,
            commonLawMid: result.commonLaw.midMonths,
            commonLawHigh: result.commonLaw.highMonths,
            lowDollars,
            midDollars,
            highDollars,
            gapAboveEsa,
            exceptionalCase: result.commonLaw.exceptionalCase,
            netLow,
            netHigh,
            comparableCases: result.comparableCases.map(c => ({ name: c.name, year: c.year, award: c.award, detail: c.detail })),
          },
        }),
      });
      setEmailSent(true);
    } catch {
      alert("Something went wrong. Try downloading the PDF instead.");
    } finally {
      setEmailSending(false);
    }
  }

  return (
    <div>
      {/* ── Section 1: The Context (dark) ── */}
      <section className="bg-navy py-16 sm:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/5 blur-[100px]" />
        </div>
        <div className="relative max-w-[560px] mx-auto">
          <p className="text-blue-light text-sm font-semibold uppercase tracking-widest mb-6">
            Canadian Severance Estimator
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-white">
            Most people accept the first number their employer offers.
            <span className="text-blue-light"> It's almost never enough.</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg">
            Find out what courts have actually awarded in cases like yours.
          </p>
          <div className="mt-8 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Section 2: Your Details (light) ── */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[520px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-display text-sm italic text-text-muted">Chapter One</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1">Your Situation</h3>
          </div>

          {/* Disclaimer */}
          <div className="mb-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>This is not legal advice.</strong> Educational estimates based on general Canadian employment law. Consult an employment lawyer before making decisions.
            </p>
          </div>

          <div className="space-y-6">
            {/* Province */}
            <div>
              <p className="font-display italic text-text-muted text-sm mb-2">Where do you work?</p>
              <select
                value={province}
                onChange={(e) => { setProvince(e.target.value); setResult(null); }}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors cursor-pointer"
              >
                {PROVINCES.map((p) => (
                  <option key={p.code} value={p.code}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Years + Age side by side */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-display italic text-text-muted text-sm mb-2">Years at this job...</p>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={50}
                  step={0.5}
                  placeholder="7"
                  value={years}
                  onChange={(e) => { setYears(e.target.value ? Number(e.target.value) : ""); setResult(null); }}
                  className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
              <div>
                <p className="font-display italic text-text-muted text-sm mb-2">Your age...</p>
                <input
                  type="number"
                  inputMode="numeric"
                  min={18}
                  max={80}
                  placeholder="45"
                  value={age}
                  onChange={(e) => { setAge(e.target.value ? Number(e.target.value) : ""); setResult(null); }}
                  className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <p className="font-display italic text-text-muted text-sm mb-2">Your annual salary (CAD)...</p>
              <div className="relative">
                <span className="absolute left-0 bottom-3 text-text-muted text-lg">$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  placeholder="120,000"
                  value={salary}
                  onChange={(e) => { setSalary(e.target.value ? Number(e.target.value) : ""); setResult(null); }}
                  className="w-full border-0 border-b-2 border-border bg-transparent py-3 pl-6 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
            </div>

            {/* Job Level */}
            <div>
              <p className="font-display italic text-text-muted text-sm mb-2">Your role level...</p>
              <select
                value={jobLevel}
                onChange={(e) => { setJobLevel(e.target.value as JobLevel); setResult(null); }}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors cursor-pointer"
              >
                {JOB_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            {/* Inducement */}
            <div>
              <p className="font-display italic text-text-muted text-sm mb-3">Were you recruited away from a stable job?</p>
              <div className="flex gap-4">
                {[false, true].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => { setInducement(v); setResult(null); }}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      inducement === v
                        ? "bg-navy text-white"
                        : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    }`}
                  >
                    {v ? "Yes" : "No"}
                  </button>
                ))}
              </div>
              {inducement && (
                <p className="mt-2 text-xs text-blue leading-relaxed">
                  Courts increase severance when you were recruited away from secure employment. In <em>Rodgers v CEVA</em>, 3 years of service resulted in 14 months.
                </p>
              )}
            </div>

            {/* Termination Clause */}
            <div>
              <p className="font-display italic text-text-muted text-sm mb-3">Does your contract have a termination clause?</p>
              <div className="flex gap-3">
                {(["unknown", "no", "yes"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => { setHasTermClause(v); setResult(null); }}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      hasTermClause === v
                        ? "bg-navy text-white"
                        : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    }`}
                  >
                    {v === "unknown" ? "Not sure" : v === "no" ? "No" : "Yes"}
                  </button>
                ))}
              </div>
              {hasTermClause === "yes" && (
                <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>A termination clause may limit your entitlement</strong> to the ESA minimum. However, many are poorly drafted and unenforceable. Have a lawyer review yours. The estimates below assume no enforceable clause.
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleShowDisclaimer}
            disabled={!isReady}
            className={`mt-10 w-full rounded-full py-4 text-lg font-semibold transition-all ${
              isReady
                ? "bg-navy text-white hover:bg-navy/90 hover:shadow-lg hover:shadow-navy/20 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Show Me My Estimate
          </button>
        </div>
      </section>

      {/* ── Disclaimer Gate ── */}
      {showDisclaimer && !result && (
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-white" ref={disclaimerRef}>
          <div className="max-w-[480px] mx-auto">
            <div className="rounded-xl border-2 border-navy/20 bg-white p-6 sm:p-8 shadow-lg">
              <h3 className="font-display text-xl text-navy text-center mb-4">Before We Show Your Estimate</h3>
              <div className="space-y-3 text-[0.9375rem] leading-[1.7] text-text-muted">
                <p>
                  The results provided by this calculator are <strong className="text-navy">educational estimates only</strong> and do not constitute legal advice.
                </p>
                <p>
                  It is <strong className="text-navy">strongly recommended</strong> that you consult an employment lawyer before making any decisions about your severance package.
                </p>
                <p>
                  There is no guarantee with respect to the ranges provided. Outcomes vary based on individual circumstances, including your employment contract, the specific facts of your termination, and the court or jurisdiction involved.
                </p>
              </div>
              <button
                onClick={handleAgreeAndReveal}
                className="mt-6 w-full rounded-full bg-navy py-4 text-base font-semibold text-white hover:bg-navy/90 hover:shadow-lg transition-all cursor-pointer"
              >
                I Understand — Show My Estimate
              </button>
              <p className="mt-3 text-[11px] text-text-muted text-center">
                By clicking above, you acknowledge these results are estimates based on general legal precedent, not advice for your specific situation.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 3: The Reveal (dark) ── */}
      <section
        ref={revealRef}
        className={`relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 transition-all duration-700 ${
          result ? "bg-navy" : "bg-gray-100"
        }`}
      >
        {result && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue/8 blur-[120px]" />
          </div>
        )}

        <div className="relative max-w-[640px] mx-auto">
          {result ? (
            <>
              {/* ── HERO: Months + Dollars ── */}
              <div className="text-center">
                <p className="text-blue-light text-sm font-semibold uppercase tracking-widest mb-4">
                  Courts Have Awarded in Similar Cases
                </p>
                <p className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-none text-white">
                  {result.commonLaw.lowMonths} – {result.commonLaw.highMonths} months
                </p>
                <p className="mt-2 text-lg text-white/50">of reasonable notice</p>

                <p className="mt-6 text-[1.0625rem] text-white/70 max-w-md mx-auto">
                  At your salary, that's{" "}
                  <span className="text-white font-semibold">{formatDollars(lowDollars)} – {formatDollars(highDollars)}</span>
                  {" "}in total compensation (gross, before tax and legal fees).
                </p>

                <div className="mt-6 rounded-lg bg-white/5 border border-white/10 py-3 px-5 inline-block">
                  <p className="text-sm text-white/50">
                    Your employer's statutory minimum:{" "}
                    <span className="text-white/70 font-semibold">{result.esa.totalWeeks} weeks ({formatDollars(result.esa.totalDollars)})</span>
                  </p>
                </div>

                <p className="mt-6 text-sm text-white/40 max-w-md mx-auto">
                  What you actually take home depends on your contract, your lawyer, and how the negotiation goes. Most cases settle without going to trial.
                </p>
              </div>

              {/* Exceptional case note */}
              {result.commonLaw.exceptionalCase && (
                <div className="mt-8 p-4 rounded-xl bg-purple-500/10 border border-purple-400/20">
                  <p className="text-sm text-purple-200">
                    <strong>Exceptional circumstances.</strong> Your combination of age, tenure, and seniority may justify exceeding the typical 24-month cap. Courts have awarded 26-27 months in cases like <em>Currie v Nylene</em> (2022) and <em>Hussain v Suzuki</em>.
                  </p>
                </div>
              )}

              {/* Scroll pointer */}
              <div className="mt-10 text-center">
                <p className="text-xs text-white/30 uppercase tracking-widest">Full breakdown below</p>
                <svg className="w-5 h-5 mx-auto mt-2 text-white/20 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Email + Download */}
              <div className="mt-12 rounded-xl bg-white/5 border border-white/10 p-5">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Get your report</h4>
                {!emailSent ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input type="email" placeholder="you@email.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue/30 transition-all" />
                      <button onClick={handleSendEmail}
                        disabled={!hasEmail || emailSending}
                        className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                          hasEmail && !emailSending ? "bg-blue text-white hover:bg-blue-dark cursor-pointer" : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}>
                        {emailSending ? "Sending..." : "Email Report"}
                      </button>
                    </div>
                    <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off" tabIndex={-1}
                      style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }} />
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="mt-0.5 accent-blue" />
                      <span className="text-[11px] text-white/40 leading-relaxed">Send me career tips and job search strategies from ClearCareer. Unsubscribe anytime.</span>
                    </label>
                    {hasEmail ? (
                      <button onClick={handlePrint}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Or download as PDF
                      </button>
                    ) : (
                      <p className="text-[11px] text-white/30 text-center">Enter your email to unlock the PDF download</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-emerald-400 font-semibold">Report sent to {email}</p>
                    <p className="text-[11px] text-white/40 mt-1">Check your inbox (and spam folder).</p>
                    <button onClick={handlePrint}
                      className="mt-3 text-xs text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors">
                      Also download as PDF
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-text-muted text-lg">Fill in your details above, then click "Show Me My Estimate" to see the reveal.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 4: Full Breakdown (light) ── */}
      {result && (
        <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-[560px] mx-auto">
            <p className="font-display text-sm italic text-text-muted">Chapter Three</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1 mb-8">
              The Full Breakdown
            </h3>

            {/* ── 3-Tier Summary ── */}
            <div className="space-y-4 mb-10">
              {/* Tier 1: ESA */}
              <div className="rounded-xl border border-border bg-gray-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">What Your Employer Must Pay</p>
                    <p className="text-sm text-text-muted mt-1">The statutory floor. Automatic, no lawyer needed.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-xl text-navy">{result.esa.totalWeeks} wks</p>
                    <p className="text-sm text-text-muted">{formatDollars(result.esa.totalDollars)}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-[10px] text-text-muted/60">
                  <span>Termination: {result.esa.terminationWeeks} wks ({formatDollars(result.esa.terminationDollars)})</span>
                  <span>Severance: {result.esa.severanceWeeks} wks ({formatDollars(result.esa.severanceDollars)})</span>
                </div>
                {result.esa.notes && <p className="mt-2 text-[10px] text-text-muted/50 italic">{result.esa.notes}</p>}
              </div>

              {/* Tier 2: Realistic Settlement (highlighted) */}
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Potential Settlement Range</p>
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full">With a Lawyer</span>
                    </div>
                    <p className="text-sm text-text-muted mt-1">With a lawyer's demand letter. No trial needed.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-xl text-navy">{formatDollars(netLow)}</p>
                    <p className="font-display text-xl text-navy">– {formatDollars(netHigh)}</p>
                    <p className="text-[10px] text-text-muted mt-1">after fees</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-200 text-xs text-text-muted space-y-1">
                  <p>Settlement gross: {formatDollars(settlementGrossLow)} – {formatDollars(settlementGrossHigh)} (settlements typically range 70-85% of court estimates)</p>
                  <p>Typical lawyer fee: ~{formatDollars(feesLow)} – {formatDollars(feesHigh)} (30% of improvement over employer's initial offer)</p>
                  {gapAboveEsa > 0 && (
                    <p className="text-emerald-700 font-medium">Gap over ESA minimum (after fees): {formatDollars(netLow - result.esa.totalDollars)} – {formatDollars(netHigh - result.esa.totalDollars)}</p>
                  )}
                </div>
              </div>

              {/* Tier 3: Court Range */}
              <div className="rounded-xl border border-border bg-gray-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">What Courts Have Awarded</p>
                    <p className="text-sm text-text-muted mt-1">Based on the Bardal factors. Trial takes 12-24 months.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-xl text-text-muted">{result.commonLaw.lowMonths} – {result.commonLaw.highMonths} mo</p>
                    <p className="text-sm text-text-muted">{formatDollars(lowDollars)} – {formatDollars(highDollars)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Important Caveats ── */}
            <h4 className="font-semibold text-navy text-base mb-4">What you need to know</h4>
            <div className="space-y-4 mb-10">
              <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
                <p className="text-[0.9375rem] text-amber-900">
                  <strong>Duty to mitigate.</strong> Courts expect you to actively job search during the notice period. If you find work, the amount gets reduced. This is normal and doesn't mean you shouldn't negotiate.
                </p>
              </div>
              <div className="text-[0.9375rem] text-text space-y-3">
                <p>
                  <strong className="text-navy">Your contract matters.</strong> A termination clause could limit you to the ESA minimum. Most are poorly drafted and unenforceable (especially post-<em>Waksdale</em> 2020), but you need a lawyer to confirm that for your specific contract.
                </p>
                <p>
                  <strong className="text-navy">Tax applies.</strong> Severance is taxable income. A lump sum gets hit harder than salary continuation. Ask your lawyer about structuring the payment.
                </p>
                <p>
                  <strong className="text-navy">Every case is different.</strong> These numbers are based on patterns in published case law, not a prediction for your specific situation.
                </p>
              </div>
            </div>

            {/* ── Comparable Cases ── */}
            {result.comparableCases.length > 0 && (
              <div className="mb-10">
                <h4 className="font-semibold text-navy text-base mb-4">Real cases with similar profiles</h4>
                <div className="space-y-3">
                  {result.comparableCases.map((c) => (
                    <div key={c.name} className="rounded-xl border border-border bg-gray-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-sm font-semibold text-navy">{c.name}</span>
                          <span className="text-xs text-text-muted ml-2">({c.year})</span>
                        </div>
                        <span className="text-sm font-bold text-blue whitespace-nowrap">{c.award} months</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {c.age > 0 ? `${c.age} years old, ` : ""}{c.tenure} years tenure, {c.role}
                      </p>
                      <p className="text-xs text-text-muted mt-1">{c.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-text-muted/50 italic">
                  These are court awards, not settlement amounts. Most cases settle before trial at 70-85% of these figures.
                </p>
              </div>
            )}

            {/* ── What to Negotiate ── */}
            <h4 className="font-semibold text-navy text-base mb-4">What to ask your lawyer about</h4>
            <p className="text-[0.9375rem] text-text-muted mb-4">
              Severance isn't just salary. If your lawyer confirms there's room to negotiate:
            </p>
            <div className="space-y-3 mb-10">
              {[
                { n: "1", title: "Salary continuation", desc: `${result.commonLaw.lowMonths}-${result.commonLaw.highMonths} months (${formatDollars(lowDollars)}-${formatDollars(highDollars)})` },
                { n: "2", title: "Benefits continuation", desc: "health, dental, vision, life insurance for the full period" },
                { n: "3", title: "Pro-rated bonus", desc: "for the current year" },
                { n: "4", title: "Equity acceleration", desc: "or extended exercise window for unvested RSUs/options" },
                { n: "5", title: "Written reference", desc: "and agreed-upon reference language" },
                { n: "6", title: "Outplacement support", desc: "career coaching, resume services" },
              ].map((item) => (
                <div key={item.n} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">{item.n}</span>
                  <p className="text-[0.9375rem] text-text">
                    <strong className="text-navy">{item.title}</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* ── The First Step ── */}
            <div className="rounded-xl border-2 border-blue/20 bg-blue-bg p-6 mb-8">
              <h4 className="font-semibold text-navy text-lg">The first step costs you nothing.</h4>
              <p className="mt-2 text-[0.9375rem] text-text-muted leading-relaxed">
                Most employment lawyers offer a free 15-30 minute consultation. They'll review your termination letter, your contract, and tell you honestly whether it's worth pursuing. If it is, most work on contingency (they only get paid if you do).
              </p>
            </div>

            {/* ── Layoff Kit Upsell ── */}
            <div className="rounded-xl border border-border bg-white p-6 mb-8">
              <h4 className="font-semibold text-navy text-base">Want the full playbook?</h4>
              <p className="mt-2 text-[0.9375rem] text-text-muted leading-relaxed">
                The Layoff Survival Kit includes everything you need to act on these numbers:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-text">
                <li className="flex gap-2"><span className="text-emerald-600">&#10003;</span> Severance negotiation playbook with email scripts</li>
                <li className="flex gap-2"><span className="text-emerald-600">&#10003;</span> Employment lawyer directory (30+ firms, free consult flags)</li>
                <li className="flex gap-2"><span className="text-emerald-600">&#10003;</span> Tax strategies to reduce withholding on severance</li>
                <li className="flex gap-2"><span className="text-emerald-600">&#10003;</span> 30/60/90 day job search plan + 7 more modules</li>
              </ul>
              <a href="/layoff-survival-kit"
                className="inline-flex items-center mt-4 rounded-lg bg-blue px-6 py-3 text-sm font-semibold text-white hover:bg-blue-dark transition-colors">
                See the Full Kit — $67 CAD
              </a>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg border border-border bg-gray-50 p-4">
              <p className="text-xs font-semibold text-text-muted mb-1">This is not legal advice</p>
              <p className="text-xs text-text-muted leading-relaxed">
                Educational estimates based on general legal precedent and statutory rules. Every situation is unique. A valid termination clause may limit your entitlement. <strong>Consult an employment lawyer in your province before making any decisions.</strong>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5: CTA (gradient) ── */}
      {result && (
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #0161EF 0%, #0450c8 50%, #030620 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px]" />
          </div>
          <div className="relative max-w-[560px] mx-auto text-center">
            <p className="font-display text-sm italic text-white/60">Your Next Step</p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.15] text-white">
              You've seen what you may be owed. Now make sure you get it.
            </h3>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/layoff-survival-kit"
                className="inline-flex items-center justify-center rounded-lg bg-white text-blue px-8 py-3.5 text-base font-semibold hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                Get the Layoff Survival Kit
              </a>
              <a
                href="https://calendly.com/clearcareer/discovery-call"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors"
              >
                Book a Free Audit
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Hidden Branded PDF Report ── */}
      {result && (
        <div id="branded-pdf-report-sev" style={{ position: "absolute", left: "-9999px", top: 0 }}>
          {/* Header */}
          <div className="section" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #0161EF", paddingBottom: "16px", marginBottom: "24px" }}>
            <div>
              <div className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "#030620" }}>Severance Estimate Report</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Prepared for you by ClearCareer</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>joinclearcareer.com</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>{today.toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>

          {/* Hero: Months + Dollars */}
          <div className="section" style={{ textAlign: "center", padding: "32px 0", background: "#f8fafc", borderRadius: "12px", marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0161EF", marginBottom: "8px" }}>Courts Have Awarded in Similar Cases</div>
            <div className="serif" style={{ fontSize: "48px", fontWeight: 700, color: "#030620", lineHeight: 1 }}>{result.commonLaw.lowMonths} – {result.commonLaw.highMonths} months</div>
            <div style={{ fontSize: "15px", color: "#6b7280", marginTop: "8px" }}>of reasonable notice</div>
            <div style={{ fontSize: "14px", color: "#030620", marginTop: "12px" }}>
              At your salary: {formatDollars(lowDollars)} – {formatDollars(highDollars)} (gross, before tax and legal fees)
            </div>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "8px" }}>
              Employer's statutory minimum: {result.esa.totalWeeks} weeks ({formatDollars(result.esa.totalDollars)})
            </div>
          </div>

          {/* 3-Tier Breakdown */}
          <div className="section" style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#030620", marginBottom: "12px" }}>Your Estimate Breakdown</div>

            {/* Tier 1 */}
            <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: "8px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af" }}>What Your Employer Must Pay (ESA)</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Legal floor. Automatic. No lawyer needed.</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#6b7280" }}>{result.esa.totalWeeks} wks</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{formatDollars(result.esa.totalDollars)}</div>
              </div>
            </div>

            {/* Tier 2 (highlighted) */}
            <div style={{ padding: "12px 16px", background: "#f0fdf4", borderRadius: "8px", marginBottom: "8px", border: "2px solid #bbf7d0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#059669" }}>Potential Settlement Range (With a Lawyer)</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>With a lawyer. Most common path. After ~30% fees.</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#030620" }}>{formatDollars(netLow)} – {formatDollars(netHigh)}</div>
              </div>
            </div>

            {/* Tier 3 */}
            <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af" }}>What Courts Have Awarded (Bardal Range)</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Theoretical ceiling. Trial takes 12-24 months.</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#6b7280" }}>{result.commonLaw.lowMonths} – {result.commonLaw.highMonths} mo</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{formatDollars(lowDollars)} – {formatDollars(highDollars)}</div>
              </div>
            </div>
          </div>

          {/* Important caveats */}
          <div className="section" style={{ padding: "16px", background: "#fffbeb", borderRadius: "8px", marginBottom: "24px", border: "1px solid #fde68a" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#92400e", marginBottom: "6px" }}>Important caveats</div>
            <div style={{ fontSize: "12px", color: "#92400e", lineHeight: 1.7 }}>
              <strong>Duty to mitigate:</strong> Courts expect you to job search actively. Income earned during the notice period reduces the amount.<br/>
              <strong>Your contract:</strong> A termination clause could limit you to the ESA minimum. Most are unenforceable, but a lawyer needs to review yours.<br/>
              <strong>Tax:</strong> Severance is taxable. Lump sums get hit harder than salary continuation.<br/>
              <strong>Every case is different.</strong> These estimates are based on patterns in case law, not a guarantee.
            </div>
          </div>

          {/* Comparable Cases */}
          {result.comparableCases.length > 0 && (
            <div className="section" style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#030620", marginBottom: "12px" }}>Comparable Court Decisions</div>
              {result.comparableCases.map((c) => (
                <div key={c.name} style={{ padding: "12px", background: "#f8fafc", borderRadius: "8px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div><strong>{c.name}</strong> <span style={{ color: "#9ca3af", fontSize: "12px" }}>({c.year})</span></div>
                    <div style={{ fontWeight: 700, color: "#0161EF", fontSize: "14px" }}>{c.award} months</div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    {c.age > 0 ? `${c.age} years old, ` : ""}{c.tenure} years tenure, {c.role}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{c.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* Negotiation Points */}
          <div className="section" style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#030620", marginBottom: "8px" }}>Points to Discuss With Your Lawyer</div>
            <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.8 }}>
              1. Salary continuation: {result.commonLaw.lowMonths}-{result.commonLaw.highMonths} months ({formatDollars(lowDollars)}-{formatDollars(highDollars)})<br/>
              2. Benefits continuation for the full severance period<br/>
              3. Pro-rated bonus for the current year<br/>
              4. Equity acceleration or extended exercise window<br/>
              5. Written reference and agreed-upon language<br/>
              6. Outplacement support
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "2px solid #0161EF", margin: "0 0 24px 0" }} />

          {/* CTA 1: Layoff Kit */}
          <div className="section" style={{ padding: "24px", background: "#EFF5FF", borderRadius: "12px", marginBottom: "20px", border: "1px solid rgba(1,97,239,0.15)" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#030620" }}>Get the full severance negotiation playbook.</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px", lineHeight: 1.6 }}>
              Email scripts, counter-offer templates, employment lawyer directory (30+ firms), tax strategies. 10 complete modules for $67 CAD.
            </div>
            <div style={{ marginTop: "12px" }}>
              <a href="https://joinclearcareer.com/layoff-survival-kit" style={{ display: "inline-block", background: "#0161EF", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                Get the Layoff Survival Kit &rarr;
              </a>
            </div>
          </div>

          {/* CTA 2: JSIS */}
          <div className="section" style={{ padding: "24px", background: "#f8fafc", borderRadius: "12px", marginBottom: "20px", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#030620" }}>Need help landing your next role?</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px", lineHeight: 1.6 }}>
              8-week group coaching. Done-for-you resume, LinkedIn, outreach templates. Three 1:1 sessions with Izzy. Cohorts capped at 10.
            </div>
            <div style={{ marginTop: "12px" }}>
              <a href="https://joinclearcareer.com/programs/jsis" style={{ display: "inline-block", background: "#030620", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                Explore the Program &rarr;
              </a>
            </div>
          </div>

          {/* CTA 3: Free Audit */}
          <div className="section" style={{ padding: "20px", textAlign: "center", background: "white", borderRadius: "12px", border: "2px solid #0161EF", marginBottom: "24px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#030620" }}>Not sure where to start? Book a free 20-minute career audit.</div>
            <div style={{ marginTop: "8px" }}>
              <a href="https://calendly.com/clearcareer/discovery-call" style={{ color: "#0161EF", fontSize: "13px", fontWeight: 600 }}>calendly.com/clearcareer/discovery-call</a>
            </div>
          </div>

          {/* Footer */}
          <div style={{ paddingTop: "16px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#9ca3af" }}>This is not legal advice. Educational estimates only. Consult an employment lawyer.</div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Generated by ClearCareer on {today.toLocaleDateString("en-CA")}</div>
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#0161EF" }}>joinclearcareer.com</div>
          </div>
        </div>
      )}
    </div>
  );
}
