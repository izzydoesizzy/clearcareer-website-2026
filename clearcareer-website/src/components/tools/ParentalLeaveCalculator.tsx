/* ── Parental Leave Calculator: Story-Arc Layout ── */

import { useState, useRef } from "react";
import { PROVINCES, fmtCAD, fmtWeeks, weeksToMonths } from "./parental-leave/constants.js";
import { calculateLeave, getRecommendations } from "./parental-leave/calculations.js";
import type { LeaveType, QPIPPlan, ParentConfig, CalcResult, Recommendation, LeaveConfig } from "./parental-leave/types.js";
import ParentForm from "./parental-leave/ParentForm.js";
import WeekAllocator from "./parental-leave/WeekAllocator.js";
import ResultsSummary from "./parental-leave/ResultsSummary.js";
import LeaveTimeline from "./parental-leave/LeaveTimeline.js";
import RecommendationsPanel from "./parental-leave/Recommendations.js";
import IncomeChart from "./parental-leave/IncomeChart.js";

/* ── Coach Block (inline, matching site pattern) ── */

function CoachBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-blue bg-blue-bg p-5 sm:p-6">
      <div className="flex gap-3 sm:gap-4 items-start">
        <img
          src="/images/izzy-coaching.jpg"
          alt="Izzy, Career Coach"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
          loading="lazy"
        />
        <div className="text-[0.9375rem] sm:text-[1rem] leading-[1.7] text-text space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Default configs ── */

const defaultParent = (): ParentConfig => ({
  salary: 0,
  provinceCode: "ON",
  tenure: "600plus",
  selfEmployed: false,
  topUp: { enabled: false, percentage: 93, matWeeks: 15, parWeeks: 12 },
});

/* ── Main Component ── */

export default function ParentalLeaveCalculator() {
  // Form state
  const [leaveType, setLeaveType] = useState<LeaveType>("standard");
  const [qpipPlan, setQpipPlan] = useState<QPIPPlan>("basic");
  const [bp, setBp] = useState<ParentConfig>(defaultParent());
  const [op, setOp] = useState<ParentConfig>(defaultParent());
  const [bpWeeks, setBpWeeks] = useState(20);
  const [opWeeks, setOpWeeks] = useState(15);

  // Result state
  const [result, setResult] = useState<CalcResult | null>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);

  // Email state
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const hasEmail = email.includes("@");

  // Derived
  const bpProvince = PROVINCES.find((p) => p.code === bp.provinceCode);
  const opProvince = PROVINCES.find((p) => p.code === op.provinceCode);
  const isQuebec = bpProvince?.isQuebec || opProvince?.isQuebec || false;
  const isReady = bp.salary > 0;
  const today = new Date();

  function handleReveal() {
    if (!isReady) return;
    const config: LeaveConfig = {
      leaveType,
      qpipPlan,
      isQuebec,
      birthingParent: bp,
      otherParent: op,
      bpParentalWeeks: bpWeeks,
      opParentalWeeks: opWeeks,
    };
    const res = calculateLeave(config);
    const recommendations = getRecommendations(config, res);
    setResult(res);
    setRecs(recommendations);
    setTimeout(() => {
      revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handlePrint() {
    const printWindow = window.open("", "_blank", "width=800,height=1100");
    if (!printWindow) return;
    const reportEl = document.getElementById("branded-pdf-report-pl");
    if (!reportEl) return;
    printWindow.document.write(`<!DOCTYPE html><html><head>
      <title>Parental Leave Benefit Report - ClearCareer</title>
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
      await fetch("/api/send-parental-leave-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subscribe,
          ...(honeypot && { website: honeypot }),
          reportData: {
            leaveType,
            isQuebec,
            qpipPlan,
            bpProvince: bpProvince?.name || bp.provinceCode,
            opProvince: opProvince?.name || op.provinceCode,
            bpSalary: bp.salary,
            opSalary: op.salary,
            bpTopUp: bp.topUp.enabled ? bp.topUp.percentage : 0,
            opTopUp: op.topUp.enabled ? op.topUp.percentage : 0,
            bpResult: {
              totalWeeks: result.birthingParent.totalWeeks,
              totalBenefit: Math.round(result.birthingParent.totalBenefit),
              totalTopUp: Math.round(result.birthingParent.totalTopUp),
              grandTotal: Math.round(result.birthingParent.grandTotal),
              phases: result.birthingParent.phases.map((p) => ({
                label: p.label,
                weeks: p.weeks,
                weeklyBenefit: Math.round(p.weeklyBenefit),
                weeklyTopUp: Math.round(p.weeklyTopUp),
              })),
            },
            opResult: {
              totalWeeks: result.otherParent.totalWeeks,
              totalBenefit: Math.round(result.otherParent.totalBenefit),
              totalTopUp: Math.round(result.otherParent.totalTopUp),
              grandTotal: Math.round(result.otherParent.grandTotal),
              phases: result.otherParent.phases.map((p) => ({
                label: p.label,
                weeks: p.weeks,
                weeklyBenefit: Math.round(p.weeklyBenefit),
                weeklyTopUp: Math.round(p.weeklyTopUp),
              })),
            },
            familyTotal: Math.round(result.familyTotal),
            incomeGap: Math.round(result.incomeGap),
            avgWeekly: Math.round(result.avgWeekly),
            totalWeeks: result.totalWeeks,
            leavePeriodWeeks: result.leavePeriodWeeks,
            sharingBonusTriggered: result.sharingBonusTriggered,
            sharingBonusWeeks: result.sharingBonusWeeks,
            recommendations: recs.map((r) => ({ type: r.type, title: r.title, body: r.body })),
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
      {/* ── Section 1: Hero (dark) ── */}
      <section className="bg-navy py-16 sm:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/5 blur-[100px]" />
        </div>
        <div className="relative max-w-[560px] mx-auto">
          <p className="text-blue-light text-sm font-semibold uppercase tracking-widest mb-6">
            Canadian Parental Leave Calculator
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-white">
            Planning parental leave shouldn't require a spreadsheet.
            <span className="text-blue-light"> See what your family will actually earn.</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg">
            EI and QPIP benefits, employer top-ups, sharing bonus, and week allocation for all provinces.
          </p>
          <div className="mt-8 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Section 2: Your Family (light) ── */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-display text-sm italic text-text-muted">Chapter One</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1">Your Family</h3>
          </div>

          {/* Leave type toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              {(["standard", "extended"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => { setLeaveType(type); setResult(null); }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    leaveType === type
                      ? "bg-navy text-white shadow-sm"
                      : "text-text-muted hover:text-navy"
                  }`}
                >
                  {type === "standard" ? "Standard (12 mo)" : "Extended (18 mo)"}
                </button>
              ))}
            </div>
          </div>

          {/* QPIP plan toggle (Quebec only) */}
          {isQuebec && (
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full bg-blue-bg p-1">
                {(["basic", "special"] as const).map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => { setQpipPlan(plan); setResult(null); }}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      qpipPlan === plan
                        ? "bg-blue text-white shadow-sm"
                        : "text-blue/60 hover:text-blue"
                    }`}
                  >
                    QPIP {plan === "basic" ? "Basic" : "Special"}
                  </button>
                ))}
              </div>
              <div className="ml-3 flex items-center">
                <span className="text-xs text-text-muted bg-blue-bg rounded-full px-2 py-1">Quebec plan</span>
              </div>
            </div>
          )}

          {/* Parent forms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ParentForm
              label="Birthing Parent"
              config={bp}
              onChange={(c) => { setBp(c); setResult(null); }}
              leaveType={leaveType}
              isQuebec={isQuebec}
            />
            <ParentForm
              label="Other Parent"
              config={op}
              onChange={(c) => { setOp(c); setResult(null); }}
              leaveType={leaveType}
              isQuebec={isQuebec}
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: Split Your Leave (light) ── */}
      <section className="bg-gray-50 py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-display text-sm italic text-text-muted">Chapter Two</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1">Split Your Leave</h3>
          </div>

          <WeekAllocator
            leaveType={leaveType}
            qpipPlan={qpipPlan}
            isQuebec={isQuebec}
            bpWeeks={bpWeeks}
            opWeeks={opWeeks}
            onChange={(b, o) => { setBpWeeks(b); setOpWeeks(o); setResult(null); }}
          />

          <div className="mt-8">
            <CoachBlock>
              <p>
                <strong className="text-navy">Here's what most families don't know.</strong>{" "}
                If both parents take at least 5 weeks of parental leave, you unlock bonus weeks that are completely use-it-or-lose-it.
                {isQuebec
                  ? " In Quebec, the threshold is different, but the principle is the same: share the leave, get extra weeks."
                  : " Most families leave these weeks on the table because nobody tells them they exist."}
              </p>
            </CoachBlock>
          </div>
        </div>
      </section>

      {/* ── Reveal Button ── */}
      <section className="bg-white py-10 px-4 sm:px-6 text-center">
        <div className="max-w-[400px] mx-auto">
          <button
            type="button"
            onClick={handleReveal}
            disabled={!isReady}
            className={`w-full rounded-xl py-4 px-8 text-lg font-bold transition-all ${
              isReady
                ? "bg-navy text-white hover:bg-navy/90 cursor-pointer shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Show My Benefits
          </button>
          {!isReady && (
            <p className="mt-3 text-sm text-text-muted">Enter at least the birthing parent's salary to continue.</p>
          )}
        </div>
      </section>

      {/* ── Section 4: Results (light) ── */}
      <section ref={revealRef} className="bg-white py-14 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-[680px] mx-auto">
          {result ? (
            <>
              <div className="text-center mb-10">
                <p className="font-display text-sm italic text-text-muted">Chapter Three</p>
                <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1">Your Family's Leave</h3>
              </div>

              <ResultsSummary result={result} bpSalary={bp.salary} opSalary={op.salary} />

              {/* Income comparison chart */}
              <div className="mt-8 rounded-xl border border-border bg-white p-5 sm:p-6">
                <IncomeChart result={result} bpSalary={bp.salary} opSalary={op.salary} />
              </div>

              {/* Timeline breakdown */}
              <div className="mt-6 rounded-xl border border-border bg-white p-5 sm:p-6">
                <LeaveTimeline result={result} />
              </div>

              {/* Inline tips (top 2 most important) */}
              {recs.length > 0 && (
                <div className="mt-6">
                  <RecommendationsPanel recommendations={recs} max={2} />
                </div>
              )}

              {/* Disclaimer - one line */}
              <p className="mt-6 text-xs text-text-muted text-center">
                Estimates based on 2026 EI/QPIP rates. Not financial advice.{" "}
                <a href="https://www.canada.ca/en/services/benefits/ei/ei-maternity-parental.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue">
                  Official EI calculator
                </a>
              </p>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-text-muted text-lg">Fill in your details above, then click "Show My Benefits" to see the reveal.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Email + Download (dark) ── */}
      {result && (
        <section className="bg-navy py-10 px-4 sm:px-6">
          <div className="max-w-[480px] mx-auto">
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <h4 className="text-sm font-semibold text-white/80 mb-3">Get your report</h4>
              {!emailSent ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      disabled={!hasEmail || emailSending}
                      className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                        hasEmail && !emailSending
                          ? "bg-blue text-white hover:bg-blue-dark cursor-pointer"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      {emailSending ? "Sending..." : "Email Report"}
                    </button>
                  </div>
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off" tabIndex={-1}
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }} />
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscribe}
                      onChange={(e) => setSubscribe(e.target.checked)}
                      className="mt-0.5 accent-blue"
                    />
                    <span className="text-[11px] text-white/40 leading-relaxed">
                      Send me career tips and job search strategies from ClearCareer. Unsubscribe anytime.
                    </span>
                  </label>
                  {hasEmail ? (
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
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
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="mt-3 text-xs text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors"
                  >
                    Also download as PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Chapter Four and verbose disclaimer removed -- tips are inline in results, disclaimer is one line */}

      {/* ── Hidden Branded PDF Report ── */}
      {result && (
        <div id="branded-pdf-report-pl" style={{ position: "absolute", left: "-9999px", top: 0 }}>
          {/* Header */}
          <div className="section" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #0161EF", paddingBottom: "16px", marginBottom: "24px" }}>
            <div>
              <div className="serif" style={{ fontSize: "24px", fontWeight: 700, color: "#030620" }}>Parental Leave Benefit Report</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Prepared for you by ClearCareer</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>joinclearcareer.com</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>{today.toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>

          {/* Hero */}
          <div className="section" style={{ textAlign: "center", padding: "32px 0", background: "#f8fafc", borderRadius: "12px", marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0161EF", marginBottom: "8px" }}>
              Total Family Benefits
            </div>
            <div className="serif" style={{ fontSize: "48px", fontWeight: 700, color: "#030620", lineHeight: 1 }}>
              {fmtCAD(result.familyTotal)}
            </div>
            <div style={{ fontSize: "16px", color: "#6b7280", marginTop: "8px" }}>
              {result.totalWeeks} weeks ({weeksToMonths(result.totalWeeks)}) &middot; {fmtCAD(result.avgWeekly)}/week average
            </div>
          </div>

          {/* Leave type badge */}
          <div className="section" style={{ padding: "12px 16px", background: "#EFF5FF", borderRadius: "8px", marginBottom: "24px", fontSize: "13px", color: "#0161EF" }}>
            <strong>{isQuebec ? `QPIP ${qpipPlan === "basic" ? "Basic" : "Special"} Plan` : `EI ${leaveType === "standard" ? "Standard (12 mo)" : "Extended (18 mo)"}`}</strong>
            {" "}&middot; {bpProvince?.name || bp.provinceCode}
            {op.salary > 0 && opProvince?.code !== bpProvince?.code && ` / ${opProvince?.name || op.provinceCode}`}
          </div>

          {/* Per-parent breakdown */}
          <div className="section" style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Birthing Parent", res: result.birthingParent, color: "#0161EF" },
              { label: "Other Parent", res: result.otherParent, color: "#030620" },
            ].map((parent) => (
              <div key={parent.label} style={{ flex: 1, padding: "16px", background: "#f8fafc", borderRadius: "8px", borderLeft: `3px solid ${parent.color}` }}>
                <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "8px" }}>{parent.label}</div>
                <div className="serif" style={{ fontSize: "22px", fontWeight: 700, color: "#030620" }}>{fmtCAD(parent.res.grandTotal)}</div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{parent.res.totalWeeks} weeks</div>
                {parent.res.phases.map((phase, i) => (
                  <div key={i} style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", paddingLeft: "8px", borderLeft: `2px solid ${phase.color}` }}>
                    {phase.label}: {fmtWeeks(phase.weeks)} @ {fmtCAD(phase.weeklyBenefit)}/wk
                    {phase.weeklyTopUp > 0 && <span style={{ color: "#059669" }}> (+{fmtCAD(phase.weeklyTopUp)} top-up)</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Income gap */}
          {result.incomeGap > 0 && (
            <div className="section" style={{ padding: "16px", background: "#fffbeb", borderRadius: "8px", border: "1px solid #fde68a", marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#92400e" }}>Income Gap During Leave</div>
              <div style={{ fontSize: "13px", color: "#92400e", marginTop: "4px" }}>
                Your family would earn {fmtCAD(result.incomeGap)} less during leave compared to working full-time. Average weekly family income: {fmtCAD(result.avgWeekly)}.
              </div>
            </div>
          )}

          {/* Sharing bonus */}
          {result.sharingBonusTriggered && (
            <div className="section" style={{ padding: "16px", background: "#ecfdf5", borderRadius: "8px", border: "1px solid #a7f3d0", marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#065f46" }}>Sharing Bonus Unlocked</div>
              <div style={{ fontSize: "13px", color: "#065f46", marginTop: "4px" }}>
                Both parents are taking enough leave to trigger {result.sharingBonusWeeks} bonus weeks of benefits.
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recs.length > 0 && (
            <div className="section" style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#030620", marginBottom: "12px" }}>Recommendations</div>
              {recs.map((rec, i) => (
                <div key={i} style={{ padding: "10px 12px", background: "#f8fafc", borderRadius: "8px", marginBottom: "6px", borderLeft: `3px solid ${rec.type === "warning" ? "#f59e0b" : rec.type === "optimization" ? "#0161EF" : rec.type === "positive" ? "#059669" : "#030620"}` }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#030620" }}>{rec.title}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{rec.body}</div>
                </div>
              ))}
            </div>
          )}

          <hr style={{ border: "none", borderTop: "2px solid #0161EF", margin: "0 0 24px 0" }} />

          {/* CTA: JSIS */}
          <div className="section" style={{ padding: "24px", background: "#EFF5FF", borderRadius: "12px", marginBottom: "20px", border: "1px solid rgba(1,97,239,0.15)" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#030620" }}>Navigating a career transition?</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px", lineHeight: 1.6 }}>
              8-week group coaching. Done-for-you resume, LinkedIn, outreach templates. Three 1:1 sessions with Izzy. Cohorts capped at 10.
            </div>
            <div style={{ marginTop: "12px" }}>
              <a href="https://joinclearcareer.com/programs/jsis" style={{ display: "inline-block", background: "#0161EF", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                Explore the Program &rarr;
              </a>
            </div>
          </div>

          {/* CTA: Free Audit */}
          <div className="section" style={{ padding: "20px", textAlign: "center", background: "white", borderRadius: "12px", border: "2px solid #0161EF", marginBottom: "24px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#030620" }}>Not sure where to start? Book a free 20-minute career audit.</div>
            <div style={{ marginTop: "8px" }}>
              <a href="https://calendly.com/clearcareer/discovery-call" style={{ color: "#0161EF", fontSize: "13px", fontWeight: 600 }}>calendly.com/clearcareer/discovery-call</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
