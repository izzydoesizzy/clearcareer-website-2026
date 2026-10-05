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

function useCountUp(target: number, duration = 800) {
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

/* ── Main Story Arc Component ── */

export default function SalaryNegotiationStory() {
  const [offer, setOffer] = useState("");
  const [negotiated, setNegotiated] = useState("");
  const [raise, setRaise] = useState("3");
  const [revealed, setRevealed] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

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

  const diff10 = hasData ? results.find((r) => r.years === 10)!.diff : 0;
  const diff5 = hasData ? results.find((r) => r.years === 5)!.diff : 0;
  const monthlyRaise = hasData ? (negotiatedNum - offerNum) / 12 : 0;

  const animatedHero = useCountUp(revealed ? diff10 : 0, 1000);
  const animated5 = useCountUp(revealed ? diff5 : 0);
  const animatedMonthly = useCountUp(revealed ? monthlyRaise : 0);

  const handleReveal = () => {
    if (!hasData) return;
    setRevealed(true);
    setTimeout(() => {
      revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Reset reveal when inputs change
  useEffect(() => {
    setRevealed(false);
  }, [offer, negotiated, raise]);

  // Contextual interpretation
  const getInterpretation = () => {
    if (!hasData) return "";
    const gap = negotiatedNum - offerNum;
    if (gap >= 20000) return "That's a down payment on a home. From one conversation.";
    if (gap >= 10000) return "That's a kid's education fund. From 15 minutes of courage.";
    if (gap >= 5000) return "That's a year of vacations. From asking one question.";
    return "That adds up faster than you think. Every dollar compounds.";
  };

  return (
    <div>
      {/* ── Section 1: The Context (dark) ── */}
      <section className="bg-navy py-16 sm:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/5 blur-[100px]" />
        </div>
        <div className="relative max-w-[560px] mx-auto">
          <p className="text-blue-light text-sm font-semibold uppercase tracking-widest mb-6">The Math Nobody Talks About</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-white">
            The average job seeker leaves <span className="text-blue-light">$53,000</span> on the table by not negotiating.
          </h2>
          <p className="mt-6 text-white/50 text-lg">Let's see what you're leaving behind.</p>
          <div className="mt-8 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Section 2: Your Numbers (light) ── */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[480px] mx-auto space-y-8">
          <div className="text-center mb-10">
            <p className="font-display text-sm italic text-text-muted">Chapter One</p>
            <h3 className="font-display text-[clamp(1.25rem,3vw,1.75rem)] text-navy mt-1">Your Numbers</h3>
          </div>

          <div>
            <p className="font-display italic text-text-muted text-sm mb-2">Start with what they offered you...</p>
            <div className="relative">
              <span className="absolute left-0 bottom-3 text-text-muted text-lg">$</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="110,000"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 pl-6 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
          </div>

          <div>
            <p className="font-display italic text-text-muted text-sm mb-2">Now, what would you negotiate to?</p>
            <div className="relative">
              <span className="absolute left-0 bottom-3 text-text-muted text-lg">$</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="120,000"
                value={negotiated}
                onChange={(e) => setNegotiated(e.target.value)}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 pl-6 text-xl text-navy placeholder:text-text-muted/40 focus:border-blue focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
          </div>

          <div>
            <p className="font-display italic text-text-muted text-sm mb-2">And your expected annual raise...</p>
            <div className="relative max-w-[200px]">
              <input
                type="number"
                inputMode="decimal"
                value={raise}
                onChange={(e) => setRaise(e.target.value)}
                min={0}
                max={20}
                step={0.5}
                className="w-full border-0 border-b-2 border-border bg-transparent py-3 pr-6 text-xl text-navy focus:border-blue focus:outline-none focus:ring-0 transition-colors"
              />
              <span className="absolute right-0 bottom-3 text-text-muted text-lg">%</span>
            </div>
          </div>

          <button
            onClick={handleReveal}
            disabled={!hasData}
            className={`w-full rounded-full py-4 text-lg font-semibold transition-all ${
              hasData
                ? "bg-navy text-white hover:bg-navy/90 hover:shadow-lg hover:shadow-navy/20 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Show Me the Impact
          </button>
        </div>
      </section>

      {/* ── Section 3: The Reveal (dark) ── */}
      <section
        ref={revealRef}
        className={`relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 transition-all duration-700 ${
          revealed ? "bg-navy" : "bg-gray-100"
        }`}
      >
        {revealed && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue/8 blur-[120px]" />
          </div>
        )}

        <div className="relative max-w-[560px] mx-auto text-center">
          {revealed ? (
            <>
              <p className="text-blue-light text-sm font-semibold uppercase tracking-widest mb-4">Over 10 Years, You Gain</p>
              <p className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-none text-white">
                +{fmt(animatedHero)}
              </p>
              <p className="mt-6 text-xl text-white/60 max-w-md mx-auto">
                {getInterpretation()}
              </p>

              {/* Supporting stats */}
              <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">5-Year Gain</p>
                  <p className="mt-1 font-display text-2xl text-white">+{fmt(animated5)}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Monthly</p>
                  <p className="mt-1 font-display text-2xl text-white">+{fmt(animatedMonthly)}/mo</p>
                </div>
              </div>

              {/* Area Chart on dark bg */}
              <div className="mt-12">
                <EarningsChart offer={offerNum} negotiated={negotiatedNum} raise={raiseNum} hasData={true} variant="dark" height={300} />
              </div>

              {/* Table on dark bg */}
              <div className="mt-8 text-left">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Year</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-white/40">Without</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-white/40">With</th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-blue-light">Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.years} className={i < results.length - 1 ? "border-b border-white/5" : ""}>
                        <td className={`py-3 text-sm text-white ${r.years >= 5 ? "font-bold" : "font-medium"}`}>Year {r.years}</td>
                        <td className="py-3 text-right text-sm text-white/50">{fmt(r.origTotal)}</td>
                        <td className="py-3 text-right text-sm text-white/50">{fmt(r.negTotal)}</td>
                        <td className="py-3 text-right text-sm font-semibold text-blue-light">+{fmt(r.diff)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="py-12">
              <p className="text-text-muted text-lg">Enter your numbers above, then click "Show Me the Impact" to see the reveal.</p>
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
                The formula is simple: <strong className="text-navy">Future Salary = Current Salary x (1 + raise rate)^years.</strong> But the implications aren't obvious until you see the numbers stacked up.
              </p>
              <p>
                A 3% raise on $120K is $3,600. On $110K, it's $3,300. That $300 difference doesn't sound like much. But it compounds. Next year, the gap is bigger. The year after, bigger still. After a decade, one 15-minute conversation has generated six figures.
              </p>

              <blockquote className="border-l-4 border-blue bg-blue-bg rounded-r-xl p-4 my-6 text-[0.9375rem]">
                And this doesn't include bonuses (often a percentage of base), 401(k) matches, or future job offers that anchor to your current salary. The real number is even higher.
              </blockquote>

              <p>
                <strong className="text-navy">Zero clients have had offers rescinded.</strong> Not one. Companies expect negotiation. They budget for it. The only risk is leaving money on the table by not asking.
              </p>
              <p>
                <strong className="text-navy">Always negotiate in writing.</strong> Email gives you time to craft your words. Pull salary data from Glassdoor, Levels.fyi, and Payscale. Make your number ambitious but defensible.
              </p>
              <p>
                If base salary is "final," negotiate everything else: signing bonus, extra PTO, remote flexibility, equity, or an accelerated review at 3 months instead of 12.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5: Your Next Chapter (gradient CTA) ── */}
      {revealed && (
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #0161EF 0%, #0450c8 50%, #030620 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px]" />
          </div>
          <div className="relative max-w-[560px] mx-auto text-center">
            <p className="font-display text-sm italic text-white/60">Your Next Chapter</p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.15] text-white">
              You've seen what one conversation is worth. Imagine what a complete strategy could do.
            </h3>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/clearcareer/discovery-call"
                className="inline-flex items-center justify-center rounded-lg bg-white text-blue px-8 py-3.5 text-base font-semibold hover:bg-gray-100 hover:shadow-lg transition-all"
              >
                Book a Free Audit
              </a>
              <a
                href="/jsis"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors"
              >
                Explore the Program
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
