import { useState, useRef } from "react";

/* ── Formatting ── */

const fmtCAD = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const whole = Math.floor(months);
  const frac = months - whole;
  d.setMonth(d.getMonth() + whole);
  d.setDate(d.getDate() + Math.round(frac * 30));
  return d;
}

function fmtDate(date: Date): string {
  return date.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}

/* ── Province-based ESA Severance Estimation ── */

const PROVINCES = [
  { code: "ON", name: "Ontario" },
  { code: "BC", name: "British Columbia" },
  { code: "AB", name: "Alberta" },
  { code: "QC", name: "Quebec" },
  { code: "MB", name: "Manitoba" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland & Labrador" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "FED", name: "Federal (Canada Labour Code)" },
];

function estimateEsaWeeks(province: string, years: number): { termWeeks: number; sevWeeks: number; note: string } {
  // Ontario
  if (province === "ON") {
    let term = 0;
    if (years >= 8) term = 8;
    else if (years >= 7) term = 7;
    else if (years >= 6) term = 6;
    else if (years >= 5) term = 5;
    else if (years >= 4) term = 4;
    else if (years >= 3) term = 3;
    else if (years >= 1) term = 2;
    else if (years >= 0.25) term = 1;
    const sev = years >= 5 ? Math.min(Math.floor(years), 26) : 0;
    return { termWeeks: term, sevWeeks: sev, note: sev > 0 ? "Ontario ESA: termination + severance pay (5+ yrs, qualifying employer)" : "Ontario ESA: termination pay. Severance pay requires 5+ years at a qualifying employer." };
  }
  // BC
  if (province === "BC") {
    let term = 0;
    if (years >= 8) term = 8;
    else if (years >= 7) term = 7;
    else if (years >= 6) term = 6;
    else if (years >= 5) term = 5;
    else if (years >= 4) term = 4;
    else if (years >= 3) term = 3;
    else if (years >= 1) term = 2;
    else if (years >= 0.25) term = 1;
    return { termWeeks: term, sevWeeks: 0, note: "BC ESA: termination pay only. No statutory severance pay in BC." };
  }
  // Alberta
  if (province === "AB") {
    let term = 0;
    if (years >= 10) term = 8;
    else if (years >= 8) term = 6;
    else if (years >= 6) term = 5;
    else if (years >= 4) term = 4;
    else if (years >= 2) term = 2;
    else if (years >= 0.25) term = 1;
    return { termWeeks: term, sevWeeks: 0, note: "Alberta ESA: termination pay only. No statutory severance pay in Alberta." };
  }
  // Quebec
  if (province === "QC") {
    let term = 0;
    if (years >= 10) term = 8;
    else if (years >= 5) term = 4;
    else if (years >= 1) term = 2;
    else if (years >= 0.25) term = 1;
    return { termWeeks: term, sevWeeks: 0, note: "Quebec: termination pay only. After 2+ years, you may file an unjust dismissal complaint." };
  }
  // Federal
  if (province === "FED") {
    const term = years >= 0.25 ? 2 : 0;
    const sev = years >= 1 ? Math.round(years * 0.4 * 10) / 10 : 0;
    return { termWeeks: term, sevWeeks: Math.round(sev), note: "Federal (Canada Labour Code): 2 weeks notice + 2 days per year of service as severance." };
  }
  // Default for other provinces: conservative estimate
  let term = 0;
  if (years >= 8) term = 8;
  else if (years >= 5) term = 5;
  else if (years >= 3) term = 3;
  else if (years >= 1) term = 2;
  else if (years >= 0.25) term = 1;
  return { termWeeks: term, sevWeeks: 0, note: `${province} ESA estimate. Check your province's employment standards for exact rules.` };
}

/* ── EI (Employment Insurance) Estimation ── */

const EI_RATE = 0.55; // 55% of insurable earnings
const EI_MAX_WEEKLY_2026 = 729; // Max weekly benefit for 2026
const EI_MAX_INSURABLE_2026 = 68900; // Max insurable earnings 2026
const EI_TYPICAL_WEEKS = 26; // Conservative middle estimate (range is 14-45)

function estimateEI(annualSalary: number): { weeklyBenefit: number; monthlyBenefit: number; durationWeeks: number; note: string } {
  if (annualSalary <= 0) return { weeklyBenefit: 0, monthlyBenefit: 0, durationWeeks: 0, note: "" };

  const insurable = Math.min(annualSalary, EI_MAX_INSURABLE_2026);
  const weeklyEarnings = insurable / 52;
  const weeklyBenefit = Math.min(Math.round(weeklyEarnings * EI_RATE), EI_MAX_WEEKLY_2026);
  const monthlyBenefit = Math.round(weeklyBenefit * 4.33);

  return {
    weeklyBenefit,
    monthlyBenefit,
    durationWeeks: EI_TYPICAL_WEEKS,
    note: `EI estimate: 55% of weekly insurable earnings, max $${EI_MAX_WEEKLY_2026}/wk (2026). Duration varies by region (14-45 weeks). Using ${EI_TYPICAL_WEEKS}-week estimate.`,
  };
}

/* ── PDF / Print ── */

function handlePrint() {
  const printWindow = window.open("", "_blank", "width=800,height=1100");
  if (!printWindow) return;
  const reportEl = document.getElementById("branded-pdf-report");
  if (!reportEl) return;

  printWindow.document.write(`<!DOCTYPE html><html><head>
    <title>Financial Runway Report - ClearCareer</title>
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

/* ── Main Component ── */

export default function RunwayStory() {
  const [savings, setSavings] = useState("");
  const [expenses, setExpenses] = useState("");
  const [province, setProvince] = useState("ON");
  const [yearsWorked, setYearsWorked] = useState("");
  const [salary, setSalary] = useState("");
  const [sevWeeksManual, setSevWeeksManual] = useState("");
  const [sevPayManual, setSevPayManual] = useState("");
  const [useEstimate, setUseEstimate] = useState(true);
  const [useEiEstimate, setUseEiEstimate] = useState(true);
  const [unemploymentManual, setUnemploymentManual] = useState("0");
  const [sideIncome, setSideIncome] = useState("0");
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const revealRef = useRef<HTMLDivElement>(null);

  const savingsNum = parseFloat(savings) || 0;
  const expensesNum = parseFloat(expenses) || 0;
  const yearsNum = parseFloat(yearsWorked) || 0;
  const salaryNum = parseFloat(salary) || 0;
  const sideIncomeNum = parseFloat(sideIncome) || 0;

  // Severance: auto-estimate or manual
  const esaEstimate = estimateEsaWeeks(province, yearsNum);
  const estimatedSevWeeks = esaEstimate.termWeeks + esaEstimate.sevWeeks;
  const estimatedWeeklyPay = salaryNum > 0 ? Math.round(salaryNum / 52) : 0;

  const sevWeeks = useEstimate ? estimatedSevWeeks : (parseFloat(sevWeeksManual) || 0);
  const sevPay = useEstimate ? estimatedWeeklyPay : (parseFloat(sevPayManual) || 0);

  // EI: auto-estimate or manual
  const eiEstimate = estimateEI(salaryNum);
  const unemploymentNum = useEiEstimate ? eiEstimate.monthlyBenefit : (parseFloat(unemploymentManual) || 0);
  const eiNote = useEiEstimate && salaryNum > 0 ? eiEstimate.note : "";

  const totalSeverance = sevWeeks * sevPay;
  const totalFunds = savingsNum + totalSeverance;
  const monthlyIncome = unemploymentNum + sideIncomeNum;
  const monthlyBurn = expensesNum - monthlyIncome;
  const isInfinite = monthlyBurn <= 0;
  const runwayMonths = isInfinite ? Infinity : totalFunds / monthlyBurn;

  const today = new Date();
  const depletionDate = isInfinite ? null : addMonths(today, runwayMonths);
  const worryDate = isInfinite ? null : addMonths(today, runwayMonths * 0.7);

  const isReady = savingsNum > 0 && expensesNum > 0;

  const tier: "green" | "amber" | "red" = isInfinite ? "green" : runwayMonths > 6 ? "green" : runwayMonths >= 3 ? "amber" : "red";
  const tierColors = {
    green: { text: "text-emerald-400", bar: "bg-emerald-500", light: "text-emerald-300" },
    amber: { text: "text-amber-400", bar: "bg-amber-500", light: "text-amber-300" },
    red: { text: "text-red-400", bar: "bg-red-500", light: "text-red-300" },
  };
  const tc = tierColors[tier];
  const progressPct = isInfinite ? 100 : Math.min((runwayMonths / 12) * 100, 100);

  function handleReveal() {
    if (!isReady) return;
    setRevealed(true);
    setEmailSent(false);
    setTimeout(() => revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  const getInterpretation = () => {
    if (isInfinite) return "Your income covers your expenses. You have unlimited runway. Use this time to be highly selective about your next role.";
    if (runwayMonths > 12) return "You have over a year. Be extremely selective. Target dream roles. Don't settle out of impatience.";
    if (runwayMonths > 6) return "Breathing room. You can afford to be selective, not passive. Target roles that actually fit.";
    if (runwayMonths >= 3) return "Solid, but the clock is ticking. Treat your search like a part-time job. 15-20 hours a week, structured and intentional.";
    return "Full sprint. Focus on highest-probability leads. Consider contract or freelance work to extend your timeline.";
  };

  const severanceNote = useEstimate && totalSeverance > 0
    ? `Severance estimated at ${estimatedSevWeeks} weeks x ${fmtCAD(estimatedWeeklyPay)}/wk = ${fmtCAD(totalSeverance)} (${esaEstimate.note})`
    : useEstimate && yearsNum > 0 && salaryNum > 0
      ? esaEstimate.note
      : "";

  const incomeNote = [
    severanceNote,
    eiNote,
  ].filter(Boolean).join(" | ");

  async function handleSendEmail() {
    if (!email.includes("@") || emailSending) return;
    setEmailSending(true);
    try {
      await fetch("/api/send-runway-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subscribe,
          ...(honeypot && { website: honeypot }),
          reportData: {
            runwayMonths: isInfinite ? 999 : Math.round(runwayMonths * 10) / 10,
            isInfinite,
            tier,
            totalFunds,
            monthlyExpenses: expensesNum,
            monthlyIncome,
            monthlyBurn: monthlyBurn > 0 ? monthlyBurn : 0,
            depletionDate: depletionDate ? fmtDate(depletionDate) : "N/A",
            worryDate: worryDate ? fmtDate(worryDate) : "N/A",
            interpretation: getInterpretation(),
            province,
            severanceNote,
          },
        }),
      });
      setEmailSent(true);
    } catch {
      alert("Something went wrong sending the email. Try downloading the PDF instead.");
    } finally {
      setEmailSending(false);
    }
  }

  return (
    <div>
      {/* ── Section 1: Context (dark) ── */}
      <section className="bg-navy py-16 sm:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/5 blur-[100px]" />
        </div>
        <div className="relative max-w-[560px] mx-auto">
          <p className="text-blue-light text-sm font-semibold uppercase tracking-widest mb-6">Financial Runway Calculator</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-white">
            The average job search takes <span className="text-blue-light">3-6 months.</span> Senior roles take longer.
          </h2>
          <p className="mt-6 text-white/50 text-lg">Do you have enough time?</p>
          <div className="mt-8 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Section 2: Your Numbers (light) ── */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[520px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-display text-sm italic text-text-muted">Chapter One</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1">Your Numbers</h3>
          </div>

          <div className="space-y-6">
            {/* Savings + Expenses */}
            <div>
              <p className="font-display italic text-text-muted text-sm mb-2">How much do you have saved?</p>
              <div className="relative">
                <span className="absolute left-0 bottom-3 text-text-muted text-lg">$</span>
                <input type="number" inputMode="numeric" placeholder="50,000" value={savings}
                  onChange={(e) => { setSavings(e.target.value); setRevealed(false); }}
                  className="w-full border-0 border-b-2 border-border bg-transparent py-3 pl-6 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
              </div>
            </div>

            <div>
              <p className="font-display italic text-text-muted text-sm mb-2">What are your monthly expenses?</p>
              <div className="relative">
                <span className="absolute left-0 bottom-3 text-text-muted text-lg">$</span>
                <input type="number" inputMode="numeric" placeholder="4,000" value={expenses}
                  onChange={(e) => { setExpenses(e.target.value); setRevealed(false); }}
                  className="w-full border-0 border-b-2 border-border bg-transparent py-3 pl-6 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
              </div>
            </div>

            {/* Severance with province estimate */}
            <div className="pt-4 border-t border-border">
              <p className="font-display italic text-text-muted text-sm mb-4">Any severance?</p>

              <div className="flex gap-3 mb-4">
                <button onClick={() => { setUseEstimate(true); setRevealed(false); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${useEstimate ? "bg-navy text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200"}`}>
                  Estimate for me
                </button>
                <button onClick={() => { setUseEstimate(false); setRevealed(false); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${!useEstimate ? "bg-navy text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200"}`}>
                  I know my severance
                </button>
              </div>

              {useEstimate ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Province</label>
                    <select value={province}
                      onChange={(e) => { setProvince(e.target.value); setRevealed(false); }}
                      className="mt-1 w-full border-0 border-b-2 border-border bg-transparent py-2 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors cursor-pointer">
                      {PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Years at this job</label>
                      <input type="number" inputMode="decimal" min={0} max={50} step={0.5} placeholder="7"
                        value={yearsWorked}
                        onChange={(e) => { setYearsWorked(e.target.value); setRevealed(false); }}
                        className="mt-1 w-full border-0 border-b-2 border-border bg-transparent py-2 text-lg text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Annual salary</label>
                      <div className="relative mt-1">
                        <span className="absolute left-0 bottom-2 text-text-muted">$</span>
                        <input type="number" inputMode="numeric" placeholder="120,000"
                          value={salary}
                          onChange={(e) => { setSalary(e.target.value); setRevealed(false); }}
                          className="w-full border-0 border-b-2 border-border bg-transparent py-2 pl-5 text-lg text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
                      </div>
                    </div>
                  </div>
                  {yearsNum > 0 && salaryNum > 0 && (
                    <div className="rounded-lg bg-blue-bg border border-blue/10 p-3">
                      <p className="text-xs text-blue font-semibold">Estimated ESA severance: {estimatedSevWeeks} weeks x {fmtCAD(estimatedWeeklyPay)}/wk = {fmtCAD(totalSeverance)}</p>
                      <p className="text-[10px] text-text-muted mt-1">{esaEstimate.note} Common-law entitlement is often higher.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Weeks</label>
                    <input type="number" inputMode="numeric" min={0} value={sevWeeksManual}
                      onChange={(e) => { setSevWeeksManual(e.target.value); setRevealed(false); }}
                      className="mt-1 w-full border-0 border-b-2 border-border bg-transparent py-2 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Weekly pay</label>
                    <div className="relative mt-1">
                      <span className="absolute left-0 bottom-2 text-text-muted">$</span>
                      <input type="number" inputMode="numeric" min={0} value={sevPayManual}
                        onChange={(e) => { setSevPayManual(e.target.value); setRevealed(false); }}
                        className="w-full border-0 border-b-2 border-border bg-transparent py-2 pl-5 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Income offsets */}
            <div className="pt-4 border-t border-border">
              <p className="font-display italic text-text-muted text-sm mb-4">Any income while you search?</p>

              {/* EI Benefits */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">EI Benefits/mo</label>
                  <div className="flex gap-2">
                    <button onClick={() => { setUseEiEstimate(true); setRevealed(false); }}
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${useEiEstimate ? "bg-navy text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200"}`}>
                      Estimate
                    </button>
                    <button onClick={() => { setUseEiEstimate(false); setRevealed(false); }}
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${!useEiEstimate ? "bg-navy text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200"}`}>
                      I know
                    </button>
                  </div>
                </div>

                {useEiEstimate ? (
                  <>
                    {salaryNum > 0 ? (
                      <div className="rounded-lg bg-blue-bg border border-blue/10 p-3">
                        <p className="text-xs text-blue font-semibold">
                          Estimated EI: {fmtCAD(eiEstimate.weeklyBenefit)}/wk = {fmtCAD(eiEstimate.monthlyBenefit)}/mo
                        </p>
                        <p className="text-[10px] text-text-muted mt-1">
                          55% of insurable earnings, max ${EI_MAX_WEEKLY_2026}/wk. Duration varies by region (14-45 weeks). Enter your salary above to estimate.
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-text-muted italic">Enter your salary in the severance section above to auto-estimate EI benefits.</p>
                    )}
                  </>
                ) : (
                  <div className="relative mt-1">
                    <span className="absolute left-0 bottom-2 text-text-muted">$</span>
                    <input type="number" inputMode="numeric" min={0} value={unemploymentManual}
                      onChange={(e) => { setUnemploymentManual(e.target.value); setRevealed(false); }}
                      className="w-full border-0 border-b-2 border-border bg-transparent py-2 pl-5 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
                  </div>
                )}
              </div>

              {/* Side income */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Side income/mo</label>
                <div className="relative mt-1">
                  <span className="absolute left-0 bottom-2 text-text-muted">$</span>
                  <input type="number" inputMode="numeric" min={0} value={sideIncome}
                    onChange={(e) => { setSideIncome(e.target.value); setRevealed(false); }}
                    className="w-full border-0 border-b-2 border-border bg-transparent py-2 pl-5 text-lg text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleReveal} disabled={!isReady}
            className={`mt-10 w-full rounded-full py-4 text-lg font-semibold transition-all ${
              isReady ? "bg-navy text-white hover:bg-navy/90 hover:shadow-lg cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}>
            Calculate My Runway
          </button>
        </div>
      </section>

      {/* ── Section 3: The Reveal (dark) ── */}
      <section ref={revealRef}
        className={`relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 transition-all duration-700 ${revealed ? "bg-navy" : "bg-gray-100"}`}
        id="runway-results">
        {revealed && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue/8 blur-[120px]" />
          </div>
        )}

        <div className="relative max-w-[600px] mx-auto">
          {revealed ? (
            <>
              {/* Hero stat */}
              <div className="text-center">
                <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${tc.light}`}>
                  {isInfinite ? "Unlimited Runway" : "Your Financial Runway"}
                </p>
                <p className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-none text-white">
                  {isInfinite ? "∞" : `${runwayMonths.toFixed(1)}`}
                </p>
                {!isInfinite && (
                  <p className="text-2xl text-white/60 font-display mt-1">months</p>
                )}
                <p className="mt-4 text-lg text-white/50 max-w-md mx-auto">
                  {getInterpretation()}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-10">
                <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest mb-2">
                  <span>0 months</span><span>12+ months</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ease-out ${tc.bar}`}
                    style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              {/* Date cards */}
              {!isInfinite && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Savings Run Out</p>
                    <p className="mt-1 font-display text-lg text-white">{depletionDate ? fmtDate(depletionDate) : "---"}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Start Search Sprint By</p>
                    <p className="mt-1 font-display text-lg text-white">{worryDate ? fmtDate(worryDate) : "---"}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">70% mark, 30% buffer</p>
                  </div>
                </div>
              )}

              {/* Monthly breakdown */}
              <div className="mt-8 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10">
                  <h4 className="text-sm font-semibold text-white/60">Monthly Breakdown</h4>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { label: "Total funds (savings + severance)", value: fmtCAD(totalFunds), color: "text-white" },
                    { label: "Monthly expenses", value: fmtCAD(expensesNum), color: "text-white/70" },
                    { label: "Monthly income (unemployment + side)", value: `+${fmtCAD(monthlyIncome)}`, color: "text-emerald-400" },
                    { label: "Net monthly burn", value: fmtCAD(monthlyBurn > 0 ? monthlyBurn : 0), color: `${tier === "red" ? "text-red-400" : "text-white"} font-semibold` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-white/50">{row.label}</span>
                      <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                {incomeNote && (
                  <div className="px-5 py-2 border-t border-white/10">
                    <p className="text-[10px] text-white/30 italic">{incomeNote}</p>
                  </div>
                )}
              </div>

              {/* Email + Download buttons */}
              <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-5">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Get your report</h4>
                {!emailSent ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input type="email" placeholder="you@email.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue/30 transition-all" />
                      <button onClick={handleSendEmail}
                        disabled={!email.includes("@") || emailSending}
                        className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                          email.includes("@") && !emailSending
                            ? "bg-blue text-white hover:bg-blue-dark cursor-pointer"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}>
                        {emailSending ? "Sending..." : "Email Report"}
                      </button>
                    </div>
                    <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off" tabIndex={-1}
                      style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }} />
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)}
                        className="mt-0.5 accent-blue" />
                      <span className="text-[11px] text-white/40 leading-relaxed">
                        Send me career tips and job search strategies from ClearCareer. Unsubscribe anytime.
                      </span>
                    </label>
                    {email.includes("@") ? (
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
              <p className="text-text-muted text-lg">Fill in your numbers above, then click "Calculate My Runway."</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 4: What This Means (light) ── */}
      {revealed && (
        <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-[560px] mx-auto">
            <p className="font-display text-sm italic text-text-muted">Chapter Three</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1 mb-6">What This Means</h3>

            <div className="text-[1rem] leading-[1.8] text-text space-y-4">
              <p>
                The formula: <strong className="text-navy">(Savings + Severance) / (Monthly Expenses - Income) = Months of Runway.</strong> Severance is treated as a lump sum added to savings, not monthly income, because that's how you'll actually spend it.
              </p>

              {!isInfinite && worryDate && (
                <blockquote className="border-l-4 border-blue bg-blue-bg rounded-r-xl p-4 my-6 text-[0.9375rem]">
                  Your "start searching seriously" date is <strong>{fmtDate(worryDate)}</strong>. That's the 70% mark, giving you a 30% buffer for slow hiring, holidays, and ghosting.
                </blockquote>
              )}

              <h4 className="font-semibold text-navy pt-4">Quick Ways to Reduce Your Burn Rate</h4>
              <div className="space-y-3">
                {[
                  { title: "Audit subscriptions.", desc: "Most people find $100-$300/month they forgot about." },
                  { title: "Switch health plans.", desc: "Marketplace plans or COBRA alternatives can save hundreds between jobs." },
                  { title: "Pick up freelance work.", desc: "Even 10-15 hours a week adds months to your timeline and fills a resume gap." },
                  { title: "Talk to your partner early.", desc: "Make decisions together on day one, not under stress at month 4." },
                ].map((tip) => (
                  <div key={tip.title} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">&#10003;</span>
                    <p className="text-[0.9375rem] text-text">
                      <strong className="text-navy">{tip.title}</strong> {tip.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-border bg-white p-5">
                <h4 className="text-base font-semibold text-navy">Related Reading</h4>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-text-muted">
                  Just got laid off? Here's your step-by-step plan:
                  <a href="/blog/what-to-do-after-getting-laid-off" className="font-medium text-blue underline underline-offset-2 hover:text-blue-dark transition-colors ml-1">
                    What to Do After Getting Laid Off
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5: CTA (gradient) ── */}
      {revealed && (
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6"
          style={{ background: "linear-gradient(135deg, #0161EF 0%, #0450c8 50%, #030620 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px]" />
          </div>
          <div className="relative max-w-[560px] mx-auto text-center">
            <p className="font-display text-sm italic text-white/60">Your Next Step</p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.15] text-white">
              You know your number. Now make every month count.
            </h3>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://calendly.com/clearcareer/discovery-call"
                className="inline-flex items-center justify-center rounded-lg bg-white text-blue px-8 py-3.5 text-base font-semibold hover:bg-gray-100 hover:shadow-lg transition-all">
                Book a Free Audit
              </a>
              <a href="/programs/jsis"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors">
                Explore the Program
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Hidden Branded PDF Report ── */}
      {revealed && (
        <div id="branded-pdf-report" style={{ position: "absolute", left: "-9999px", top: 0 }}>
          {/* Header */}
          <div className="section" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #0161EF", paddingBottom: "16px", marginBottom: "24px" }}>
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#030620", fontFamily: "'DM Serif Display', Georgia, serif" }}>Financial Runway Report</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Prepared for you by ClearCareer</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>joinclearcareer.com</div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>{today.toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>

          {/* Hero Result */}
          <div className="section" style={{ textAlign: "center", padding: "32px 0", background: "#f8fafc", borderRadius: "12px", marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: tier === "green" ? "#059669" : tier === "amber" ? "#D97706" : "#dc2626", marginBottom: "8px" }}>
              {isInfinite ? "Unlimited Runway" : "Your Financial Runway"}
            </div>
            <div className="serif" style={{ fontSize: "56px", fontWeight: 700, color: "#030620", lineHeight: 1 }}>
              {isInfinite ? "∞" : runwayMonths.toFixed(1)}
            </div>
            {!isInfinite && <div className="serif" style={{ fontSize: "20px", color: "#6b7280" }}>months</div>}
            <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "12px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
              {getInterpretation()}
            </div>
          </div>

          {/* Key Dates */}
          {!isInfinite && (
            <div className="section" style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <div style={{ flex: 1, padding: "16px", background: "#f8fafc", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280" }}>Savings Run Out</div>
                <div className="serif" style={{ fontSize: "18px", fontWeight: 700, color: "#030620", marginTop: "4px" }}>{depletionDate ? fmtDate(depletionDate) : ""}</div>
              </div>
              <div style={{ flex: 1, padding: "16px", background: "#f8fafc", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280" }}>Start Search Sprint By</div>
                <div className="serif" style={{ fontSize: "18px", fontWeight: 700, color: "#030620", marginTop: "4px" }}>{worryDate ? fmtDate(worryDate) : ""}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af" }}>70% mark, 30% buffer</div>
              </div>
            </div>
          )}

          {/* Monthly Breakdown */}
          <div className="section" style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#030620", marginBottom: "8px" }}>Monthly Breakdown</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <tbody>
                {[
                  { label: "Total funds (savings + severance)", value: fmtCAD(totalFunds), color: "#030620" },
                  { label: "Monthly expenses", value: fmtCAD(expensesNum), color: "#0f0f0f" },
                  { label: "Monthly income (unemployment + side)", value: `+${fmtCAD(monthlyIncome)}`, color: "#059669" },
                  { label: "Net monthly burn", value: fmtCAD(monthlyBurn > 0 ? monthlyBurn : 0), color: tier === "red" ? "#dc2626" : "#030620" },
                ].map((row) => (
                  <tr key={row.label}>
                    <td style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>{row.label}</td>
                    <td style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb", textAlign: "right", fontWeight: 600, color: row.color }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {incomeNote && <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "8px", fontStyle: "italic" }}>{incomeNote}</div>}
          </div>

          {/* Input Summary */}
          <div className="section" style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", marginBottom: "32px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "8px" }}>Your Inputs</div>
            <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.8 }}>
              Savings: {fmtCAD(savingsNum)} | Monthly expenses: {fmtCAD(expensesNum)}
              {totalSeverance > 0 && <> | Severance: {sevWeeks} wks x {fmtCAD(sevPay)}/wk = {fmtCAD(totalSeverance)}</>}
              {unemploymentNum > 0 && <> | Unemployment: {fmtCAD(unemploymentNum)}/mo</>}
              {sideIncomeNum > 0 && <> | Side income: {fmtCAD(sideIncomeNum)}/mo</>}
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "2px solid #0161EF", margin: "0 0 24px 0" }} />

          {/* CTA 1: Layoff Survival Kit */}
          <div className="section" style={{ padding: "24px", background: "#EFF5FF", borderRadius: "12px", marginBottom: "20px", border: "1px solid rgba(1,97,239,0.15)" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#030620" }}>Just got laid off? Get the Layoff Survival Kit.</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px", lineHeight: 1.6 }}>
              Severance negotiation playbook with email scripts. Employment lawyer directory (30+ firms). Tax strategies for your severance payout. 30/60/90 day job search plan. 10 complete modules for $67 CAD.
            </div>
            <div style={{ marginTop: "12px" }}>
              <a href="https://joinclearcareer.com/layoff-survival-kit" style={{ display: "inline-block", background: "#0161EF", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                Get the Kit &rarr; joinclearcareer.com/layoff-survival-kit
              </a>
            </div>
          </div>

          {/* CTA 2: JSIS */}
          <div className="section" style={{ padding: "24px", background: "#f8fafc", borderRadius: "12px", marginBottom: "20px", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#030620" }}>Want a structured job search? Join the next cohort.</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px", lineHeight: 1.6 }}>
              The Job Search Ignition System: 8 weeks of group coaching for senior professionals. Done-for-you resume, LinkedIn profile, outreach templates, and three 1:1 sessions with Izzy. Cohorts capped at 10.
            </div>
            <div style={{ marginTop: "12px" }}>
              <a href="https://joinclearcareer.com/programs/jsis" style={{ display: "inline-block", background: "#030620", color: "white", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                Explore the Program &rarr; joinclearcareer.com/programs/jsis
              </a>
            </div>
          </div>

          {/* CTA 3: Free Audit */}
          <div className="section" style={{ padding: "20px", textAlign: "center", background: "white", borderRadius: "12px", border: "2px solid #0161EF", marginBottom: "24px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#030620" }}>Not sure where to start? Book a free 20-minute career audit.</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>No pitch. Just an honest assessment of where you stand and what to do next.</div>
            <div style={{ marginTop: "12px" }}>
              <a href="https://calendly.com/clearcareer/discovery-call" style={{ color: "#0161EF", fontSize: "13px", fontWeight: 600 }}>
                calendly.com/clearcareer/discovery-call
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{ paddingTop: "16px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#9ca3af" }}>This is an estimate, not financial advice. Consult a financial advisor for personalized guidance.</div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Generated by ClearCareer on {today.toLocaleDateString("en-CA")}</div>
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#0161EF" }}>joinclearcareer.com</div>
          </div>
        </div>
      )}
    </div>
  );
}
