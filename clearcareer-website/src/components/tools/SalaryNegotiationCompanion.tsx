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

/* ── Result Row ── */

function ResultRow({ label, value, hasData, bold = false, color = "text-navy" }: {
  label: string;
  value: number;
  hasData: boolean;
  bold?: boolean;
  color?: string;
}) {
  const animated = useCountUp(hasData ? value : 0);
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <span className={`text-sm ${bold ? "font-semibold text-navy" : "text-text-muted"}`}>{label}</span>
      <span className={`text-sm font-semibold transition-colors duration-300 ${hasData ? color : "text-gray-300"}`}>
        {hasData ? `+${fmt(animated)}` : "---"}
      </span>
    </div>
  );
}

/* ── Calculator Panel ── */

function CalculatorPanel() {
  const [offer, setOffer] = useState("");
  const [negotiated, setNegotiated] = useState("");
  const [raise, setRaise] = useState("3");
  const [expanded, setExpanded] = useState(false);

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

  const animatedHero = useCountUp(hasData ? diff10 : 0);

  return (
    <div className="space-y-4">
      {/* Verdict bar */}
      <div className={`h-1.5 rounded-full transition-all duration-700 ${
        hasData ? "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" : "bg-gray-200"
      }`} />

      {/* Hero stat */}
      <div className="text-center py-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">10-Year Impact</p>
        <p className={`font-display text-3xl mt-0.5 transition-colors duration-300 ${hasData ? "text-navy" : "text-gray-300"}`}>
          {hasData ? `+${fmt(animatedHero)}` : "---"}
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div>
          <label htmlFor="c-offer" className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            Current Offer
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">$</span>
            <input
              id="c-offer"
              type="number"
              inputMode="decimal"
              placeholder="110,000"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2 pl-7 pr-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="c-neg" className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            Negotiated Amount
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">$</span>
            <input
              id="c-neg"
              type="number"
              inputMode="decimal"
              placeholder="120,000"
              value={negotiated}
              onChange={(e) => setNegotiated(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2 pl-7 pr-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="c-raise" className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            Annual Raise
          </label>
          <div className="relative mt-1">
            <input
              id="c-raise"
              type="number"
              inputMode="decimal"
              value={raise}
              onChange={(e) => setRaise(e.target.value)}
              min={0}
              max={20}
              step={0.5}
              className="w-full rounded-lg border border-border bg-gray-50 py-2 px-3 pr-7 text-sm text-text focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">%</span>
          </div>
        </div>
      </div>

      {/* Quick results */}
      <div className="pt-2 border-t border-border">
        <ResultRow label="Monthly raise" value={monthlyRaise} hasData={hasData} color="text-blue" />
        <ResultRow label="5-year gain" value={diff5} hasData={hasData} bold color="text-emerald-600" />
        <ResultRow label="10-year gain" value={diff10} hasData={hasData} bold color="text-navy" />
      </div>

      {/* Compact Area Chart */}
      <div className="pt-2">
        <EarningsChart offer={offerNum} negotiated={negotiatedNum} raise={raiseNum} hasData={hasData} height={200} showBadge={false} />
      </div>

      {/* Expandable detail */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-center text-xs font-medium text-blue hover:text-blue-dark transition-colors py-1"
      >
        {expanded ? "Hide full breakdown" : "See full breakdown"}
      </button>

      {expanded && (
        <div className="animate-fade-up overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Year</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Without</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">With</th>
                <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Gain</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.years} className={i < results.length - 1 ? "border-b border-border" : ""}>
                  <td className="px-3 py-2 text-xs font-medium text-navy">Yr {r.years}</td>
                  <td className="px-3 py-2 text-right text-xs text-text-muted">{hasData ? fmt(r.origTotal) : "---"}</td>
                  <td className="px-3 py-2 text-right text-xs text-text-muted">{hasData ? fmt(r.negTotal) : "---"}</td>
                  <td className="px-3 py-2 text-right text-xs font-semibold text-emerald-600">{hasData ? `+${fmt(r.diff)}` : "---"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CTA */}
      {hasData && (
        <a
          href="https://calendly.com/clearcareer/discovery-call"
          className="block w-full rounded-lg bg-blue px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-dark transition-colors"
        >
          Get a Personalized Strategy
        </a>
      )}
    </div>
  );
}

/* ── Main Export (full page content) ── */

export default function SalaryNegotiationCompanion() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
      {/* ── LEFT: Educational Content ── */}
      <div className="order-2 lg:order-1">
        <article className="text-[1rem] leading-[1.8] text-text">
          {/* Why This Matters */}
          <section>
            <h2 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mb-4">Why This Matters</h2>
            <p>
              200+ coached negotiations. Zero rescinded offers. Average increase: $5,000 to $15,000.
            </p>
            <p className="mt-3">
              A $10,000 bump isn't a $10,000 win. It compounds through every raise, bonus, and future offer. One conversation, six figures over a career. Plug in your numbers in the calculator and watch the gap widen year after year.
            </p>
          </section>

          {/* How the Math Works */}
          <section className="mt-10">
            <h2 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mb-4">How the Math Works</h2>
            <div className="rounded-r-xl border-l-4 border-blue bg-blue-bg p-4 my-4">
              <p className="font-mono text-sm text-navy">
                Future Salary = Current Salary x (1 + annual raise)^years
              </p>
            </div>
            <p>
              Negotiate $110,000 vs. $100,000 with 3% raises, and after year 1 you're at $113,300 vs. $103,000. The gap widens every year because the 3% applies to a bigger number each time.
            </p>
            <p className="mt-3">
              After 5 years: $56,000+ more in cumulative income. After 10 years: $131,000+. And this doesn't include bonuses, 401(k) matches, or future offers that anchor to your current salary. The real lifetime value is even higher.
            </p>
          </section>

          {/* Worked Example */}
          <section className="mt-10">
            <h2 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mb-4">Example: $10K Negotiation</h2>
            <p>
              Negotiate $110,000 up to $120,000 with 3% annual raises.
            </p>
            <div className="mt-4 rounded-xl border border-border bg-white p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Year 1</p>
                  <p className="font-display text-lg text-navy mt-0.5">+$10,000</p>
                  <p className="text-xs text-text-muted">$833/mo more</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Year 5</p>
                  <p className="font-display text-lg text-emerald-600 mt-0.5">+$53,000</p>
                  <p className="text-xs text-text-muted">cumulative</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Year 10</p>
                  <p className="font-display text-lg text-navy mt-0.5">+$131,000</p>
                  <p className="text-xs text-text-muted">one conversation</p>
                </div>
              </div>
            </div>
            <p className="mt-4">
              Even a $5,000 bump is worth $65,000+ over 10 years. The math makes every negotiation worth having.
            </p>
          </section>

          {/* Tips */}
          <section className="mt-10">
            <h2 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mb-4">The Negotiation Playbook</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <div>
                  <p className="font-semibold text-navy">Never negotiate verbally.</p>
                  <p className="text-text-muted text-[0.9375rem]">Always in writing, via email. It gives you time to craft your words and creates a paper trail.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <div>
                  <p className="font-semibold text-navy">Do your research first.</p>
                  <p className="text-text-muted text-[0.9375rem]">Pull salary data from Glassdoor, Levels.fyi, and Payscale. Know the range for your role, level, and location.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <div>
                  <p className="font-semibold text-navy">Counter 10-20% above their offer.</p>
                  <p className="text-text-muted text-[0.9375rem]">Standard for most professional roles. The number should be ambitious but defensible.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                <div>
                  <p className="font-semibold text-navy">If base is "final," negotiate everything else.</p>
                  <p className="text-text-muted text-[0.9375rem]">Signing bonus, extra PTO, remote flexibility, equity, or an accelerated review at 3 months instead of 12.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Inline CTA */}
          <section className="mt-12 rounded-xl border border-blue/20 bg-blue-bg p-6">
            <div className="flex gap-4 items-start">
              <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy">This calculator gives you the numbers.</p>
                <p className="text-text-muted mt-1 text-[0.9375rem]">
                  Our program gives you the strategy, the scripts, and the confidence to use them. 200+ coached negotiations, zero rescinded offers.
                </p>
                <a
                  href="https://calendly.com/clearcareer/discovery-call"
                  className="inline-flex items-center mt-3 rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-dark transition-colors"
                >
                  Book a Free Audit
                </a>
              </div>
            </div>
          </section>

          {/* Related Reading */}
          <section className="mt-10">
            <div className="rounded-lg border border-border bg-white p-5">
              <h3 className="text-base font-semibold text-navy">Related Reading</h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.7] text-text-muted">
                Learn the full framework:
                <a href="/blog/always-negotiate-the-first-offer-is-never-the-final-offer" className="font-medium text-blue underline underline-offset-2 hover:text-blue-dark transition-colors ml-1">
                  Always Negotiate: The First Offer Is Never the Final Offer
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>

      {/* ── RIGHT: Sticky Calculator Panel ── */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm" style={{ borderTop: "3px solid #0161EF" }}>
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
            <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-7 h-7 rounded-full object-cover" />
            <p className="text-sm font-semibold text-navy">Salary Negotiation Calculator</p>
          </div>
          <CalculatorPanel />
        </div>
      </div>
    </div>
  );
}
