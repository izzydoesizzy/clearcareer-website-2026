import { useState, useRef, useCallback, useEffect } from "react";
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

/* ── Count-Up Animation Hook ── */

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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

/* ── Coach Block (inline) ── */

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

/* ── Stat Card ── */

function StatCard({
  label,
  value,
  hasData,
  color,
}: {
  label: string;
  value: number;
  hasData: boolean;
  color: "success" | "blue" | "navy";
}) {
  const animated = useCountUp(hasData ? value : 0);

  const colorClasses = {
    success: "bg-success/5 text-success",
    blue: "bg-blue-bg text-blue",
    navy: "bg-navy/5 text-navy",
  };

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 text-center shadow-sm transition-all duration-500 ${
        hasData ? colorClasses[color] : "bg-gray-50"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
      <p
        className={`mt-1 font-display text-xl sm:text-2xl md:text-3xl transition-colors duration-300 ${
          hasData ? colorClasses[color].split(" ")[1] : "text-border"
        }`}
      >
        {hasData ? `+${fmt(animated)}` : "---"}
      </p>
    </div>
  );
}

/* ── Input Field ── */

function CalcInput({
  id,
  label,
  helper,
  prefix,
  suffix,
  placeholder,
  value,
  onChange,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  helper?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-semibold text-navy">
        {label}
      </label>
      {helper && <p className="mt-1 text-sm text-text-muted">{helper}</p>}
      <div className="relative mt-2">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-xl border border-border bg-white py-4 text-text placeholder:text-text-muted/60 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10 transition-all ${
            prefix ? "pl-9 pr-4" : suffix ? "pl-4 pr-10" : "px-4"
          }`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Main Calculator Component ── */

export default function SalaryNegotiationCalculator() {
  const [offer, setOffer] = useState("");
  const [negotiated, setNegotiated] = useState("");
  const [raise, setRaise] = useState("3");

  const offerNum = parseFloat(offer) || 0;
  const negotiatedNum = parseFloat(negotiated) || 0;
  const raiseNum = parseFloat(raise) || 0;

  const hasData = offerNum > 0 && negotiatedNum > 0 && negotiatedNum > offerNum;

  // Calculate results
  const milestones = [1, 3, 5, 10] as const;
  const results = milestones.map((years) => {
    const origTotal = cumulativeEarnings(offerNum, raiseNum, years);
    const negTotal = cumulativeEarnings(negotiatedNum, raiseNum, years);
    return { years, origTotal, negTotal, diff: negTotal - origTotal };
  });

  const diff5 = hasData ? results.find((r) => r.years === 5)!.diff : 0;
  const diff10 = hasData ? results.find((r) => r.years === 10)!.diff : 0;
  const monthlyRaise = hasData ? (negotiatedNum - offerNum) / 12 : 0;

  // Coach interpretation
  const getInterpretation = useCallback(() => {
    if (!hasData) return null;
    const gap = negotiatedNum - offerNum;
    if (gap >= 20000) {
      return (
        <>
          <strong className="text-navy">That's a significant negotiation.</strong> A {fmt(gap)}{" "}
          increase compounds into {fmt(diff10)} over 10 years. This is life-changing money. One
          conversation, and you're looking at a down payment on a home.
        </>
      );
    }
    if (gap >= 10000) {
      return (
        <>
          <strong className="text-navy">This is why every negotiation is worth it.</strong> A{" "}
          {fmt(gap)} bump turns into {fmt(diff10)} over 10 years. That's not pocket change. That's
          a kid's education fund, a renovation, or years off your retirement timeline.
        </>
      );
    }
    if (gap >= 5000) {
      return (
        <>
          <strong className="text-navy">Even {fmt(gap)} adds up fast.</strong> Over 10 years,
          you're looking at {fmt(diff10)} in additional earnings. Most people leave this on the
          table because they think small gaps don't matter. They do.
        </>
      );
    }
    return (
      <>
        <strong className="text-navy">Every dollar counts when it compounds.</strong> A {fmt(gap)}{" "}
        increase becomes {fmt(diff10)} over 10 years. Now imagine stacking this across two or three
        job changes in a decade.
      </>
    );
  }, [hasData, negotiatedNum, offerNum, diff10]);

  return (
    <div className="space-y-8">
      {/* Input Group 1 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <CalcInput
          id="current-offer"
          label="Current offer"
          helper="The number on the offer letter, before you negotiate"
          prefix="$"
          placeholder="110000"
          value={offer}
          onChange={setOffer}
        />
        <CalcInput
          id="negotiated-amount"
          label="What you'd negotiate to"
          helper="Your target counter-offer, backed by market data"
          prefix="$"
          placeholder="120000"
          value={negotiated}
          onChange={setNegotiated}
        />
      </div>

      {/* Coach Block 2: Compound growth */}
      <CoachBlock>
        <p>
          <strong className="text-navy">Now here's why this number changes everything.</strong>{" "}
          Your salary doesn't just grow by the gap. It compounds. Every raise, bonus, and future
          offer builds on the higher base. A 3% raise on $120K is $3,600. On $110K, it's $3,300.
          That $300 difference grows every single year.
        </p>
      </CoachBlock>

      {/* Input Group 2 */}
      <div className="max-w-[280px]">
        <CalcInput
          id="annual-raise"
          label="Average annual raise"
          helper="Most companies give 2-4% annually"
          suffix="%"
          value={raise}
          onChange={setRaise}
          min={0}
          max={20}
          step={0.5}
        />
      </div>

      {/* Results Section */}
      <div className="space-y-5 pt-2" aria-live="polite">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="5-Year Gain" value={diff5} hasData={hasData} color="success" />
          <StatCard label="Monthly Raise" value={monthlyRaise} hasData={hasData} color="blue" />
          <StatCard label="10-Year Gain" value={diff10} hasData={hasData} color="navy" />
        </div>

        {/* Area Chart */}
        <div className="rounded-xl border border-border bg-white p-4 sm:p-5">
          <EarningsChart offer={offerNum} negotiated={negotiatedNum} raise={raiseNum} hasData={hasData} height={280} />
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-blue-bg">
                <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-navy">
                  Timeframe
                </th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-navy">
                  Without
                </th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-navy">
                  With
                </th>
                <th className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-success">
                  You Gain
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr
                  key={r.years}
                  className={i < results.length - 1 ? "border-b border-border" : ""}
                >
                  <td
                    className={`px-3 sm:px-4 py-3 text-xs sm:text-sm text-navy ${
                      r.years >= 5 ? "font-bold" : "font-medium"
                    }`}
                  >
                    Year {r.years}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm text-text-muted">
                    {hasData ? fmt(r.origTotal) : "---"}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-right text-xs sm:text-sm text-text-muted">
                    {hasData ? fmt(r.negTotal) : "---"}
                  </td>
                  <td
                    className={`px-3 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-success`}
                  >
                    {hasData ? `+${fmt(r.diff)}` : "---"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Coach Interpretation */}
        {hasData && (
          <div className="animate-fade-up">
            <CoachBlock>
              <p>{getInterpretation()}</p>
            </CoachBlock>
          </div>
        )}
      </div>
    </div>
  );
}
