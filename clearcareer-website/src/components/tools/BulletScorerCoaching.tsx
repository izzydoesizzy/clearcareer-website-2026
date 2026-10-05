import { useState, useMemo } from "react";

/* ── Scoring Data ── */

const ACTION_VERBS = [
  "accelerated","achieved","administered","advanced","analyzed","architected","automated",
  "boosted","built","captured","championed","closed","coached","collaborated","completed",
  "consolidated","converted","coordinated","created","cut","decreased","delivered","deployed",
  "designed","developed","directed","drove","earned","eliminated","enabled","engineered",
  "established","exceeded","executed","expanded","facilitated","formalized","founded",
  "generated","grew","guided","headed","identified","implemented","improved","increased",
  "influenced","initiated","integrated","introduced","launched","led","leveraged","managed",
  "maximized","mentored","migrated","mobilized","modernized","negotiated","onboarded",
  "optimized","orchestrated","organized","outperformed","overhauled","partnered","piloted",
  "pioneered","planned","produced","programmed","propelled","published","raised","ranked",
  "rebuilt","reduced","redesigned","refactored","reformed","remodeled","reorganized",
  "replaced","rescued","resolved","restructured","revamped","reversed","scaled","secured",
  "simplified","slashed","sold","spearheaded","stabilized","standardized","steered",
  "streamlined","strengthened","surpassed","sustained","trained","transformed","tripled",
  "uncovered","unified","upgraded","utilized","won",
];

const WEAK_PHRASES = [
  "helped","assisted","was responsible for","participated in","involved in",
  "contributed to","worked on","supported","duties included","tasked with",
  "handled","dealt with","was in charge of","was part of","played a role",
];

const EXAMPLE_BULLETS = [
  "Led cross-functional team of 8 to redesign checkout flow, increasing conversion rate by 23% and generating $1.2M in additional annual revenue.",
  "Managed marketing campaigns for multiple clients across different industries and platforms.",
  "Built automated CI/CD pipeline that reduced deployment time from 4 hours to 12 minutes, enabling 3x more releases per week.",
  "Responsible for handling customer inquiries and providing support to various departments.",
  "Negotiated $340K annual contract renewal with 15% cost reduction while expanding service scope to 3 new regions.",
];

interface Check {
  name: string;
  pass: boolean;
  suggestion: string;
}

function scoreText(text: string): Check[] {
  const checks: Check[] = [];
  const trimmed = text.trim();
  if (!trimmed) return [];

  const firstWord = trimmed.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
  checks.push({
    name: "Starts with a strong action verb",
    pass: ACTION_VERBS.includes(firstWord),
    suggestion: "Start with a verb like 'Led', 'Built', 'Increased', or 'Delivered'. Not 'Responsible for' or 'Helped'.",
  });

  const hasNumbers = /\d/.test(text) || /\b(percent|percentage|million|billion|thousand|hundred|dozen|triple|double|half)\b/i.test(text);
  checks.push({
    name: "Contains numbers or metrics",
    pass: hasNumbers,
    suggestion: "Add specific numbers: revenue ($), users, percentage improvements, team size, or timeline.",
  });

  const hasImpact = /(result|impact|led to|which|saving|increasing|reducing|improving|generating|achieving|enabling|driving|delivering|producing|contributing|yielding|netting|securing|earning|growing|boosting|cutting|lowering|raising|adding|creating|preventing|eliminating)/i.test(text);
  checks.push({
    name: "Shows impact or result",
    pass: hasImpact,
    suggestion: "Show what happened because of your work. Add 'resulting in...', 'which led to...', or 'saving...'.",
  });

  const words = trimmed.split(/\s+/).length;
  checks.push({
    name: `Appropriate length (${words} words)`,
    pass: words >= 10 && words <= 30,
    suggestion: words < 10 ? "Too short. Add more detail about what you did and the result." : "Too long. Aim for 10-30 words. Cut filler.",
  });

  const lower = text.toLowerCase();
  const foundWeak = WEAK_PHRASES.filter((w) => lower.includes(w));
  checks.push({
    name: "No weak language",
    pass: foundWeak.length === 0,
    suggestion: foundWeak.length > 0
      ? `Replace "${foundWeak[0]}" with a specific action verb that shows what YOU did.`
      : "",
  });

  return checks;
}

/* ── Email Capture ── */

function EmailCapture({ resultHtml }: { resultHtml: string }) {
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const hasEmail = email.includes("@");

  async function handleSend() {
    if (!hasEmail || sending) return;
    setSending(true);
    try {
      await fetch("/api/send-tool-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subscribe, tool: "bullet-scorer", subject: "Your Resume Bullet Score", resultHtml }),
      });
      setSent(true);
    } catch { alert("Something went wrong."); }
    finally { setSending(false); }
  }

  if (sent) return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
      <p className="text-sm font-semibold text-emerald-700">Sent to {email}</p>
      <p className="text-xs text-emerald-600 mt-1">Check your inbox.</p>
    </div>
  );

  return (
    <div className="rounded-xl border border-border bg-gray-50 p-4">
      <p className="text-sm font-semibold text-navy mb-2">Email your score</p>
      <div className="flex gap-2">
        <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-muted/50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
        <button onClick={handleSend} disabled={!hasEmail || sending}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${hasEmail && !sending ? "bg-blue text-white hover:bg-blue-dark cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
          {sending ? "..." : "Send"}
        </button>
      </div>
      <label className="flex items-start gap-2 mt-2 cursor-pointer">
        <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="mt-0.5 accent-blue" />
        <span className="text-[11px] text-text-muted leading-relaxed">Send me career tips from ClearCareer. Unsubscribe anytime.</span>
      </label>
    </div>
  );
}

/* ── Main Component (Tool Dashboard) ── */

export default function BulletScorerCoaching() {
  const [bullet, setBullet] = useState("");

  const checks = useMemo(() => scoreText(bullet), [bullet]);
  const score = checks.filter((c) => c.pass).length;
  const hasInput = bullet.trim().length > 0;

  const scoreColor = !hasInput ? "text-gray-300" : score === 5 ? "text-emerald-600" : score >= 3 ? "text-blue" : "text-amber-600";
  const scoreMessage = !hasInput ? "" : score === 5 ? "This bullet is strong." : score >= 3 ? "Good start. A few tweaks will make it stronger." : "This needs work. Check the suggestions below.";
  const scoreBg = !hasInput ? "bg-gray-50" : score === 5 ? "bg-emerald-50 border-emerald-200" : score >= 3 ? "bg-blue-bg border-blue/20" : "bg-amber-50 border-amber-200";

  const resultHtml = hasInput ? `
    <div style="margin:20px 0;">
      <p style="font-size:24px;font-weight:700;color:${score === 5 ? '#059669' : score >= 3 ? '#0161EF' : '#D97706'};text-align:center;">${score}/5</p>
      <p style="font-size:13px;color:#6b7280;text-align:center;margin-top:4px;">${scoreMessage}</p>
      <div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;color:#030620;line-height:1.6;font-style:italic;">"${bullet}"</div>
      <table style="width:100%;margin-top:16px;font-size:13px;border-collapse:collapse;">
        ${checks.map(c => `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:${c.pass ? '#059669' : '#D97706'};font-weight:700;width:20px;">${c.pass ? '✓' : '✗'}</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#030620;font-weight:600;">${c.name}</td></tr>${!c.pass && c.suggestion ? `<tr><td></td><td style="padding:0 0 8px;color:#6b7280;font-size:12px;">${c.suggestion}</td></tr>` : ''}`).join('')}
      </table>
    </div>
  ` : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
      {/* ── LEFT: Input Sidebar ── */}
      <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm">
        <div className="mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-navy">Resume Bullet Scorer</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">by Izzy Piyale-Sheard</p>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label htmlFor="bullet-input" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Your Resume Bullet
          </label>
          <textarea
            id="bullet-input"
            rows={4}
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            placeholder="Paste one bullet from your resume..."
            className="mt-1.5 w-full rounded-lg border border-border bg-gray-50 py-3 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all resize-none"
          />
        </div>

        {/* Example bullets */}
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Try an example</p>
          <div className="space-y-1.5">
            {EXAMPLE_BULLETS.map((ex, i) => (
              <button key={i} type="button" onClick={() => setBullet(ex)}
                className={`w-full text-left rounded-lg px-3 py-2 text-[11px] leading-relaxed transition-all ${
                  bullet === ex ? "bg-blue-bg text-blue border border-blue/20" : "bg-gray-50 text-text-muted hover:bg-gray-100 border border-transparent"
                }`}>
                {ex.length > 80 ? ex.slice(0, 80) + "..." : ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Results Canvas ── */}
      <div className="space-y-5">
        {hasInput ? (
          <>
            {/* Score display */}
            <div className={`rounded-xl border-2 p-6 text-center transition-all duration-300 ${scoreBg}`}>
              <p className={`font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.1] transition-colors duration-300 ${scoreColor}`}>
                {score}/5
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    i < score ? (score === 5 ? "bg-emerald-500" : score >= 3 ? "bg-blue" : "bg-amber-500") : "bg-gray-200"
                  }`} />
                ))}
              </div>
              {scoreMessage && (
                <p className={`mt-2 text-sm font-medium transition-colors duration-300 ${scoreColor}`}>{scoreMessage}</p>
              )}
            </div>

            {/* Checks list */}
            <div className="rounded-xl border border-border bg-white divide-y divide-border">
              {checks.map((check) => (
                <div key={check.name} className="flex items-start gap-3 p-4">
                  <span className={`mt-0.5 text-sm font-bold flex-shrink-0 ${check.pass ? "text-emerald-600" : "text-amber-600"}`}>
                    {check.pass ? "✓" : "✗"}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{check.name}</p>
                    {!check.pass && check.suggestion && (
                      <p className="mt-1 text-sm text-text-muted">{check.suggestion}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Coach interpretation */}
            <div className="rounded-xl border border-border bg-white p-5">
              <div className="flex gap-3 items-start">
                <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                <div className="text-sm text-text-muted leading-relaxed">
                  {score === 5 ? (
                    <p><strong className="text-navy">Perfect score.</strong> This bullet is in the top 10% of what recruiters see. It tells them exactly what you did, how well, and what it meant for the business. Put this one near the top.</p>
                  ) : score >= 3 ? (
                    <p><strong className="text-navy">{score}/5 is a solid start.</strong> Focus on the items marked with ✗ above. Usually it's a missing number or a weak opening verb. One rewrite and you're there.</p>
                  ) : (
                    <p><strong className="text-navy">This bullet needs a rewrite.</strong> Flip it: start with the action, add a number, show the result. "Responsible for managing a team" becomes "Led 8-person team to deliver $2M product launch 3 weeks ahead of schedule."</p>
                  )}
                </div>
              </div>
            </div>

            {/* Before/After */}
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-sm font-semibold text-navy mb-3">Example: Before and After</h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">Before (1/5)</p>
                  <p className="text-sm text-text italic">"Responsible for managing the marketing team and overseeing various campaigns for multiple clients."</p>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">After (5/5)</p>
                  <p className="text-sm text-text italic">"Led 8-person marketing team to 23% conversion increase across 12 client campaigns, generating $1.2M in annual revenue."</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-sm font-semibold text-navy mb-3">Quick rules for your resume</h3>
              <div className="space-y-2 text-sm text-text-muted">
                <p><strong className="text-navy">3-5 bullets for recent roles, 2-3 for older ones.</strong> Total: 12-18. More dilutes your strongest points.</p>
                <p><strong className="text-navy">Strongest bullets first.</strong> Recruiters read the first 2 closely, skim the rest.</p>
                <p><strong className="text-navy">Fragments, not sentences.</strong> No "I" at the start. No period at the end.</p>
                <p><strong className="text-navy">Run every bullet through this scorer.</strong> Average below 3/5 means your resume needs a rewrite.</p>
              </div>
            </div>

            {/* Email capture */}
            <EmailCapture resultHtml={resultHtml} />
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-gray-50/50 p-8 text-center">
            <svg className="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            <p className="text-sm text-text-muted">Paste a resume bullet in the panel, or click an example to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
