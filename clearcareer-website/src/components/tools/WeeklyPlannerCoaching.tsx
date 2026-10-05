import { useState, useMemo } from "react";

/* ── Email Capture ── */

function EmailCapture({ tool, subject, resultHtml }: { tool: string; subject: string; resultHtml: string }) {
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const hasEmail = email.includes("@");

  async function handleSend() {
    if (!hasEmail || sending) return;
    setSending(true);
    try {
      await fetch("/api/send-tool-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subscribe, tool, subject, resultHtml, ...(honeypot && { website: honeypot }) }),
      });
      setSent(true);
    } catch { alert("Something went wrong. Please try again."); }
    finally { setSending(false); }
  }

  if (sent) return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
      <p className="text-sm font-semibold text-emerald-700">Plan sent to {email}</p>
      <p className="text-xs text-emerald-600 mt-1">Check your inbox. Print it, stick it on your wall.</p>
    </div>
  );

  return (
    <div className="rounded-xl border border-border bg-gray-50 p-4">
      <p className="text-sm font-semibold text-navy mb-2">Email your weekly plan</p>
      <div className="flex gap-2">
        <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-muted/50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
        <button onClick={handleSend} disabled={!hasEmail || sending}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${hasEmail && !sending ? "bg-blue text-white hover:bg-blue-dark cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
          {sending ? "..." : "Send"}
        </button>
      </div>
      <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off" tabIndex={-1}
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }} />
      <label className="flex items-start gap-2 mt-2 cursor-pointer">
        <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="mt-0.5 accent-blue" />
        <span className="text-[11px] text-text-muted leading-relaxed">Send me career tips from ClearCareer. Unsubscribe anytime.</span>
      </label>
    </div>
  );
}

/* ── Activity Definitions ── */

interface Activity {
  key: string;
  label: string;
  dotColor: string;
  bgColor: string;
  weight: number;
  desc: string;
  suggestions: string[];
}

const ACTIVITIES: Activity[] = [
  { key: "networking", label: "Networking", dotColor: "bg-blue", bgColor: "bg-blue/10", weight: 0.30, desc: "Coffee chats, LinkedIn outreach, events",
    suggestions: ["Send 3-5 personalized LinkedIn connection requests", "Schedule 2 coffee chats or informational interviews", "Follow up with 2-3 contacts from last week", "Comment thoughtfully on 5 posts from target industry", "Attend 1 virtual or in-person networking event"] },
  { key: "applications", label: "Applications", dotColor: "bg-emerald-500", bgColor: "bg-emerald-500/10", weight: 0.25, desc: "Targeting, customizing, applying",
    suggestions: ["Research 3-5 target companies before applying", "Customize resume for each application", "Write a tailored opening paragraph for each cover letter", "Submit 2-3 high-quality, targeted applications", "Track every application with follow-up dates"] },
  { key: "interview-prep", label: "Interview Prep", dotColor: "bg-amber-500", bgColor: "bg-amber-500/10", weight: 0.20, desc: "STAR stories, company research, mock practice",
    suggestions: ["Practice your 4 core STAR stories out loud", "Research the company, team, and interviewer", "Prepare 5 questions to ask the interviewer", "Do a mock interview with a friend or coach", "Review common behavioral questions for your target role"] },
  { key: "research", label: "Company Research", dotColor: "bg-purple-500", bgColor: "bg-purple-500/10", weight: 0.15, desc: "Target list building, Glassdoor, deep dives",
    suggestions: ["Update your target company list (30-50 companies)", "Research 3 companies: Glassdoor, LinkedIn, recent news", "Identify hiring managers at top companies", "Look up former employees for honest intel", "Check Crunchbase for funding and growth"] },
  { key: "linkedin", label: "LinkedIn Content", dotColor: "bg-cyan-500", bgColor: "bg-cyan-500/10", weight: 0.10, desc: "Posting, commenting, building visibility",
    suggestions: ["Write and publish 1 LinkedIn post", "Comment on 10 posts from your target space", "Update headline and About with target keywords", "Share an article with your perspective", "Engage with hiring managers' content"] },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/* ── Main Component ── */

export default function WeeklyPlannerCoaching() {
  const [hours, setHours] = useState("20");
  const [selected, setSelected] = useState<Record<string, boolean>>({
    networking: true, applications: true, "interview-prep": true, research: false, linkedin: false,
  });

  const hoursNum = parseFloat(hours) || 0;
  const selectedActivities = ACTIVITIES.filter((a) => selected[a.key]);
  const isReady = hoursNum >= 5 && selectedActivities.length >= 2;

  const allocations = useMemo(() => {
    if (!isReady) return {};
    const totalWeight = selectedActivities.reduce((sum, a) => sum + a.weight, 0);
    const result: Record<string, number> = {};
    selectedActivities.forEach((a) => { result[a.key] = Math.round((a.weight / totalWeight) * hoursNum * 10) / 10; });
    return result;
  }, [isReady, selectedActivities, hoursNum]);

  const dailySchedule = useMemo(() => {
    if (!isReady || selectedActivities.length < 2) return [];
    const dailyHours = Math.round((hoursNum / 5) * 10) / 10;
    return DAYS.map((day, i) => {
      const primary = selectedActivities[i % selectedActivities.length];
      const secondary = selectedActivities[(i + 1) % selectedActivities.length];
      return { day, total: dailyHours, primary, primaryHrs: Math.round(dailyHours * 0.6 * 10) / 10, secondary, secondaryHrs: Math.round(dailyHours * 0.4 * 10) / 10 };
    });
  }, [isReady, selectedActivities, hoursNum]);

  function toggleActivity(key: string) { setSelected((prev) => ({ ...prev, [key]: !prev[key] })); }

  // Build email HTML
  const resultHtml = useMemo(() => {
    if (!isReady) return "";
    const hoursRows = selectedActivities.map((a) => {
      const hrs = allocations[a.key] || 0;
      const pct = Math.round((hrs / hoursNum) * 100);
      return `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-weight:600;color:#030620;">${a.label}</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;color:#030620;">${hrs} hrs (${pct}%)</td></tr>`;
    }).join("");

    const scheduleRows = dailySchedule.map((d) =>
      `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-weight:600;color:#030620;">${d.day}</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">${d.primary.label} (${d.primaryHrs}h) + ${d.secondary.label} (${d.secondaryHrs}h)</td></tr>`
    ).join("");

    const suggestionsHtml = selectedActivities.map((a) =>
      `<div style="margin-bottom:16px;"><p style="font-weight:600;color:#030620;margin-bottom:4px;">${a.label} (${allocations[a.key]} hrs/wk)</p><ul style="margin:0;padding-left:20px;color:#6b7280;font-size:13px;line-height:1.8;">${a.suggestions.slice(0, 3).map(s => `<li>${s}</li>`).join("")}</ul></div>`
    ).join("");

    return `
      <div style="margin:20px 0;">
        <p style="font-size:14px;font-weight:600;color:#030620;margin-bottom:8px;">Your ${hoursNum}-Hour Weekly Breakdown</p>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">${hoursRows}</table>
      </div>
      <div style="margin:20px 0;">
        <p style="font-size:14px;font-weight:600;color:#030620;margin-bottom:8px;">Daily Focus Schedule</p>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">${scheduleRows}</table>
      </div>
      <div style="margin:20px 0;">
        <p style="font-size:14px;font-weight:600;color:#030620;margin-bottom:12px;">What to Actually Do Each Week</p>
        ${suggestionsHtml}
      </div>
    `;
  }, [isReady, selectedActivities, allocations, dailySchedule, hoursNum]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
      {/* ── LEFT: Input Sidebar ── */}
      <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm">
        <div className="mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-navy">Weekly Planner</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">by Izzy Piyale-Sheard</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Hours Per Week</label>
            <div className="flex gap-2 mt-1.5">
              {[
                { label: "Light", value: "10", desc: "Employed & looking" },
                { label: "Standard", value: "20", desc: "Dedicated search" },
                { label: "Full-time", value: "35", desc: "All-in" },
              ].map((preset) => (
                <button key={preset.value} type="button"
                  onClick={() => setHours(preset.value)}
                  className={`flex-1 rounded-lg border p-2.5 text-center transition-all ${
                    hours === preset.value ? "border-blue bg-blue-bg" : "border-border bg-gray-50 hover:border-gray-300"
                  }`}>
                  <span className={`block text-sm font-semibold ${hours === preset.value ? "text-blue" : "text-navy"}`}>{preset.label}</span>
                  <span className="block text-[10px] text-text-muted">{preset.value} hrs</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input id="wp-hours" type="number" min={5} max={40} value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-20 rounded-lg border border-border bg-gray-50 py-2 px-3 text-sm text-center text-text focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
              <span className="text-[11px] text-text-muted">or set custom</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Activities</p>
            <div className="space-y-2.5">
              {ACTIVITIES.map((a) => (
                <label key={a.key} className="flex items-start gap-2.5 cursor-pointer group">
                  <input type="checkbox" checked={selected[a.key]} onChange={() => toggleActivity(a.key)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-blue cursor-pointer" />
                  <div>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${a.dotColor}`} />
                      <span className="text-sm font-semibold text-navy group-hover:text-blue transition-colors">{a.label}</span>
                    </span>
                    <span className="text-[11px] text-text-muted">{a.desc}</span>
                  </div>
                </label>
              ))}
            </div>
            {selectedActivities.length < 2 && (
              <p className="mt-2 text-xs text-amber-600">Pick at least 2 activities.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Results Canvas ── */}
      <div className="space-y-5">
        {isReady ? (
          <>
            {/* Hours breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedActivities.map((a) => {
                const hrs = allocations[a.key] || 0;
                const pct = Math.round((hrs / hoursNum) * 100);
                return (
                  <div key={a.key} className="rounded-xl border border-border bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${a.dotColor}`} />
                      <span className="text-xs font-semibold text-text-muted">{a.label}</span>
                    </div>
                    <p className="font-display text-2xl text-navy">{hrs} hrs</p>
                    <p className="text-xs text-text-muted">{pct}% of your time</p>
                  </div>
                );
              })}
            </div>

            {/* Daily schedule */}
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-sm font-semibold text-navy mb-4">Daily Focus Schedule</h3>
              <div className="space-y-2">
                {dailySchedule.map((d) => (
                  <div key={d.day} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-navy">{d.day}</span>
                      <span className="text-xs text-text-muted">{d.total} hrs</span>
                    </div>
                    <div className="flex gap-2">
                      <div className={`flex-[6] rounded-lg ${d.primary.bgColor} p-2.5`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${d.primary.dotColor}`} />
                          <span className="text-xs font-semibold text-navy">{d.primary.label}</span>
                        </div>
                        <span className="text-xs text-text-muted">{d.primaryHrs} hrs</span>
                      </div>
                      <div className={`flex-[4] rounded-lg ${d.secondary.bgColor} p-2.5`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${d.secondary.dotColor}`} />
                          <span className="text-xs font-semibold text-navy">{d.secondary.label}</span>
                        </div>
                        <span className="text-xs text-text-muted">{d.secondaryHrs} hrs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity suggestions */}
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-sm font-semibold text-navy mb-4">What to Actually Do Each Week</h3>
              <div className="space-y-5">
                {selectedActivities.map((a) => (
                  <div key={a.key}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${a.dotColor}`} />
                      <span className="text-sm font-semibold text-navy">{a.label}</span>
                      <span className="text-xs text-text-muted">({allocations[a.key]} hrs/wk)</span>
                    </div>
                    <ul className="space-y-1.5 ml-5">
                      {a.suggestions.slice(0, 3).map((s, i) => (
                        <li key={i} className="text-sm text-text-muted list-disc">{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-sm font-semibold text-navy mb-3">How to make this stick</h3>
              <div className="space-y-2 text-sm text-text-muted">
                <p><strong className="text-navy">Block the time on your calendar.</strong> Treat it like meetings. Same time every day.</p>
                <p><strong className="text-navy">Networking always comes first.</strong> Highest-ROI activity in any job search.</p>
                <p><strong className="text-navy">Batch similar tasks.</strong> All applications in one block, all outreach in another.</p>
                <p><strong className="text-navy">Keep searching even with interviews.</strong> Pipelines dry up. Multiple rounds at multiple companies = leverage.</p>
              </div>
            </div>

            {/* Email capture */}
            <EmailCapture
              tool="weekly-planner"
              subject={`Your ${hoursNum}-Hour Weekly Job Search Plan`}
              resultHtml={resultHtml}
            />
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-gray-50/50 p-8 text-center">
            <p className="text-sm text-text-muted">
              {hoursNum < 5 ? "Enter at least 5 hours per week." : "Select at least 2 activities to generate your plan."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
