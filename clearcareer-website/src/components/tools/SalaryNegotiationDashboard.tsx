import { useState, useRef, useEffect } from "react";
import EarningsChart from "./EarningsChart";

/* ── Calculation Logic ── */

function cumulativeEarnings(base: number, raisePercent: number, years: number): number {
  let total = 0;
  let current = base;
  for (let i = 0; i < years; i++) {
    total += current;
    current *= 1 + raisePercent / 100;
  }
  return total;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* ── Count-Up Hook ── */

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

/* ── Stat Card ── */

function StatCard({
  label,
  value,
  hasData,
  color,
  suffix = "",
}: {
  label: string;
  value: number;
  hasData: boolean;
  color: "success" | "blue" | "navy";
  suffix?: string;
}) {
  const animated = useCountUp(hasData ? value : 0);
  const colorMap = {
    success: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
    blue: { bg: "bg-blue-bg", text: "text-blue", border: "border-blue/20" },
    navy: { bg: "bg-slate-50", text: "text-navy", border: "border-slate-200" },
  };
  const c = colorMap[color];

  return (
    <div className={`rounded-xl border ${hasData ? c.border : "border-border"} ${hasData ? c.bg : "bg-gray-50/50"} p-4 text-center transition-all duration-500`}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">{label}</p>
      <p className={`mt-1 font-display text-2xl sm:text-3xl transition-colors duration-300 ${hasData ? c.text : "text-gray-300"}`}>
        {hasData ? `+${fmt(animated)}${suffix}` : "---"}
      </p>
    </div>
  );
}


/* ── Tooltip Info Icon ── */

function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1.5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-text-muted text-[10px] font-bold hover:bg-blue hover:text-white transition-colors"
        aria-label="More info"
      >
        i
      </button>
      {open && (
        <span className="absolute z-10 left-6 top-0 w-52 rounded-lg bg-navy text-white text-xs leading-relaxed p-3 shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

/* ── Tabs ── */

function Tabs({ items }: { items: { label: string; color: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === i
                ? `border-b-2 text-navy`
                : "text-text-muted hover:text-navy"
            }`}
            style={active === i ? { borderColor: item.color } : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-5 sm:p-6 text-[0.9375rem] leading-[1.75] text-text">
        {items[active].content}
      </div>
    </div>
  );
}

/* ── Main Dashboard Component ── */

export default function SalaryNegotiationDashboard() {
  const [offer, setOffer] = useState("");
  const [negotiated, setNegotiated] = useState("");
  const [raise, setRaise] = useState("3");

  const offerNum = parseFloat(offer) || 0;
  const negotiatedNum = parseFloat(negotiated) || 0;
  const raiseNum = parseFloat(raise) || 0;
  const hasData = offerNum > 0 && negotiatedNum > 0 && negotiatedNum > offerNum;

  const milestones = [1, 3, 5, 10] as const;
  const results = milestones.map((years) => {
    const origTotal = cumulativeEarnings(offerNum, raiseNum, years);
    const negTotal = cumulativeEarnings(negotiatedNum, raiseNum, years);
    return { years, origTotal, negTotal, diff: negTotal - origTotal };
  });

  const diff5 = hasData ? results.find((r) => r.years === 5)!.diff : 0;
  const diff10 = hasData ? results.find((r) => r.years === 10)!.diff : 0;
  const monthlyRaise = hasData ? (negotiatedNum - offerNum) / 12 : 0;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
      {/* ── LEFT: Input Sidebar ── */}
      <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm">
        <div className="mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-navy">Salary Calculator</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">by Izzy Piyale-Sheard</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="d-offer" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Current Offer
              <InfoTip text="The base salary number on your written offer letter, before any negotiation." />
            </label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
              <input
                id="d-offer"
                type="number"
                inputMode="decimal"
                placeholder="110,000"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                className="w-full rounded-lg border border-border bg-gray-50 py-2.5 pl-7 pr-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="d-neg" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Negotiated Amount
              <InfoTip text="Your target counter-offer. Research market rates on Glassdoor, Levels.fyi, or Payscale." />
            </label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
              <input
                id="d-neg"
                type="number"
                inputMode="decimal"
                placeholder="120,000"
                value={negotiated}
                onChange={(e) => setNegotiated(e.target.value)}
                className="w-full rounded-lg border border-border bg-gray-50 py-2.5 pl-7 pr-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <label htmlFor="d-raise" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Annual Raise
              <InfoTip text="Most companies give 2-4% annually. This gets applied to whatever base you start with." />
            </label>
            <div className="relative mt-1.5">
              <input
                id="d-raise"
                type="number"
                inputMode="decimal"
                value={raise}
                onChange={(e) => setRaise(e.target.value)}
                min={0}
                max={20}
                step={0.5}
                className="w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 pr-8 text-sm text-text focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Inline CTA */}
        {hasData && (
          <div className="mt-5 pt-4 border-t border-border animate-fade-up">
            <p className="text-xs text-text-muted leading-relaxed">
              These numbers are the starting point. Want a complete negotiation strategy?
            </p>
            <a
              href="https://calendly.com/clearcareer/discovery-call"
              className="mt-2 block w-full rounded-lg bg-blue px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-dark transition-colors"
            >
              Get a Personalized Strategy
            </a>
          </div>
        )}
      </div>

      {/* ── RIGHT: Results Canvas ── */}
      <div className="space-y-5">
        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="5-Year Gain" value={diff5} hasData={hasData} color="success" />
          <StatCard label="Monthly Raise" value={monthlyRaise} hasData={hasData} color="blue" suffix="/mo" />
          <StatCard label="10-Year Gain" value={diff10} hasData={hasData} color="navy" />
        </div>

        {/* Area Chart (Wealthsimple-style) */}
        <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
          <EarningsChart offer={offerNum} negotiated={negotiatedNum} raise={raiseNum} hasData={hasData} height={320} />
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">Timeframe</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">Without</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">With</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-emerald-600">Gain</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.years} className={i < results.length - 1 ? "border-b border-border" : ""}>
                  <td className={`px-4 py-3 text-sm text-navy ${r.years >= 5 ? "font-bold" : "font-medium"}`}>Year {r.years}</td>
                  <td className="px-4 py-3 text-right text-sm text-text-muted">{hasData ? fmt(r.origTotal) : "---"}</td>
                  <td className="px-4 py-3 text-right text-sm text-text-muted">{hasData ? fmt(r.negTotal) : "---"}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-emerald-600">{hasData ? `+${fmt(r.diff)}` : "---"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabbed Educational Content */}
        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <Tabs items={[
            {
              label: "How It Works",
              color: "#0161EF",
              content: (
                <div className="space-y-3">
                  <p>The formula: <strong className="text-navy">Future Salary = Current Salary x (1 + annual raise rate)^years.</strong></p>
                  <p>Negotiate $110,000 vs. $100,000 with 3% raises, and after year 1 you're at $113,300 vs. $103,000. The gap widens every year because the 3% applies to a bigger number each time.</p>
                  <p>After 5 years: $56,000+ more in cumulative income. After 10 years: $131,000+. And this doesn't include bonuses, 401(k) matches, or future offers that anchor to your current salary.</p>
                </div>
              ),
            },
            {
              label: "Example",
              color: "#06b6d4",
              content: (
                <div className="space-y-3">
                  <p>Negotiate $110,000 up to $120,000 with 3% annual raises.</p>
                  <p><strong className="text-navy">Year 1:</strong> $10,000 ($833/month more). <strong className="text-navy">Year 5:</strong> $53,000 cumulative. <strong className="text-navy">Year 10:</strong> $131,000 from one 15-minute conversation.</p>
                  <p>Even a $5,000 bump is worth $65,000+ over 10 years.</p>
                </div>
              ),
            },
            {
              label: "Pro Tips",
              color: "#030620",
              content: (
                <div className="space-y-3">
                  <p><strong className="text-navy">Zero clients have had offers rescinded.</strong> Companies expect negotiation. They budget for it.</p>
                  <p><strong className="text-navy">Do your research first.</strong> Pull salary data from Glassdoor, Levels.fyi, and Payscale before you counter.</p>
                  <p><strong className="text-navy">Always negotiate in writing.</strong> Email gives you time to craft your words and creates a paper trail.</p>
                  <p><strong className="text-navy">If base salary is "final," negotiate everything else.</strong> Signing bonus, extra PTO, remote flexibility, equity, or an accelerated review.</p>
                </div>
              ),
            },
          ]} />
        </div>

        {/* Empty state message */}
        {!hasData && (
          <div className="rounded-xl border border-dashed border-border bg-gray-50/50 p-8 text-center">
            <p className="text-sm text-text-muted">Enter your offer numbers in the panel to see your results here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
