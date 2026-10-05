import { useState } from "react";
import { CITIES, JOB_TITLES } from "./presets";

/* ── Chip Selector ── */

function ChipSelect({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-1.5">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(value === o ? "" : o)}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
            value === o ? "bg-blue text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200"
          }`}>
          {o}
        </button>
      ))}
    </div>
  );
}

/* ── Email Capture Block ── */

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
      <p className="text-sm font-semibold text-emerald-700">Sent to {email}</p>
      <p className="text-xs text-emerald-600 mt-1">Check your inbox (and spam folder).</p>
    </div>
  );

  return (
    <div className="rounded-xl border border-border bg-gray-50 p-4">
      <p className="text-sm font-semibold text-navy mb-2">Email your results</p>
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

/* ── Info Tip ── */

function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1.5">
      <button type="button" onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-text-muted text-[10px] font-bold hover:bg-blue hover:text-white transition-colors" aria-label="More info">i</button>
      {open && <span className="absolute z-10 left-6 top-0 w-52 rounded-lg bg-navy text-white text-xs leading-relaxed p-3 shadow-lg">{text}</span>}
    </span>
  );
}

/* ── Constants ── */

const EXPERIENCE_LEVELS = [
  { value: "", label: "Any Experience Level" },
  { value: "1", label: "Internship" },
  { value: "2", label: "Entry Level" },
  { value: "3", label: "Associate" },
  { value: "4", label: "Mid-Senior Level" },
  { value: "5", label: "Director" },
  { value: "6", label: "Executive" },
];

const DATE_OPTIONS = [
  { value: "", label: "Any Time" },
  { value: "r86400", label: "Past 24 Hours" },
  { value: "r604800", label: "Past Week" },
  { value: "r2592000", label: "Past Month" },
];

const WORK_TYPES = [
  { value: "", label: "Any" },
  { value: "1", label: "On-site" },
  { value: "2", label: "Remote" },
  { value: "3", label: "Hybrid" },
];

/* ── Main Component ── */

export default function JobSearchBuilderCoaching() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [workType, setWorkType] = useState("");
  const [copied, setCopied] = useState(false);

  const hasInput = keywords.trim().length > 0 && location.trim().length > 0;

  const params = new URLSearchParams();
  if (keywords) params.set("keywords", keywords);
  if (location) params.set("location", location);
  if (experience) params.set("f_E", experience);
  if (datePosted) params.set("f_TPR", datePosted);
  if (workType) params.set("f_WT", workType);
  const url = `https://www.linkedin.com/jobs/search/?${params.toString()}`;

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const expLabel = EXPERIENCE_LEVELS.find(e => e.value === experience)?.label || "";
  const dateLabel = DATE_OPTIONS.find(d => d.value === datePosted)?.label || "";
  const workLabel = WORK_TYPES.find(w => w.value === workType)?.label || "";

  const resultHtml = `
    <div style="margin:20px 0;">
      <p style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin-bottom:8px;">Your LinkedIn Search URL</p>
      <div style="background:#EFF5FF;border-radius:8px;padding:16px;font-family:monospace;font-size:12px;color:#0161EF;line-height:1.6;word-break:break-all;">${url}</div>
      <table style="width:100%;margin-top:12px;font-size:13px;color:#6b7280;">
        ${keywords ? `<tr><td style="padding:4px 0;">Keywords:</td><td style="padding:4px 0;font-weight:600;color:#030620;">${keywords}</td></tr>` : ""}
        ${location ? `<tr><td style="padding:4px 0;">Location:</td><td style="padding:4px 0;font-weight:600;color:#030620;">${location}</td></tr>` : ""}
        ${expLabel && experience ? `<tr><td style="padding:4px 0;">Level:</td><td style="padding:4px 0;font-weight:600;color:#030620;">${expLabel}</td></tr>` : ""}
        ${dateLabel && datePosted ? `<tr><td style="padding:4px 0;">Date posted:</td><td style="padding:4px 0;font-weight:600;color:#030620;">${dateLabel}</td></tr>` : ""}
        ${workLabel && workType ? `<tr><td style="padding:4px 0;">Work type:</td><td style="padding:4px 0;font-weight:600;color:#030620;">${workLabel}</td></tr>` : ""}
      </table>
      <div style="margin-top:16px;">
        <a href="${url}" style="display:inline-block;background:#0161EF;color:white;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">Open in LinkedIn &rarr;</a>
      </div>
      <p style="margin-top:12px;font-size:12px;color:#9ca3af;">Bookmark this URL for one-click access to your filtered results every morning.</p>
    </div>
  `;

  const selectClass = "mt-1.5 w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all cursor-pointer";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
      {/* ── LEFT: Input Sidebar ── */}
      <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm">
        <div className="mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-navy">Job Search URL Builder</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">by Izzy Piyale-Sheard</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="js-kw" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Job Title / Keywords
              <InfoTip text="Use OR for multiple: 'Product Manager OR Program Manager'" />
            </label>
            <ChipSelect options={JOB_TITLES} value={keywords} onChange={setKeywords} />
            <input id="js-kw" type="text" placeholder="or type your own" value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
          </div>

          <div>
            <label htmlFor="js-loc" className="text-xs font-semibold uppercase tracking-wider text-text-muted">Location</label>
            <ChipSelect options={CITIES} value={location} onChange={setLocation} />
            <input id="js-loc" type="text" placeholder="or type your own" value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
          </div>

          <div className="pt-2 border-t border-border">
            <label htmlFor="js-exp" className="text-xs font-semibold uppercase tracking-wider text-text-muted">Experience Level</label>
            <select id="js-exp" value={experience} onChange={(e) => setExperience(e.target.value)} className={selectClass}>
              {EXPERIENCE_LEVELS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="js-date" className="text-xs font-semibold uppercase tracking-wider text-text-muted">Date Posted</label>
            <select id="js-date" value={datePosted} onChange={(e) => setDatePosted(e.target.value)} className={selectClass}>
              {DATE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="js-work" className="text-xs font-semibold uppercase tracking-wider text-text-muted">Work Type</label>
            <select id="js-work" value={workType} onChange={(e) => setWorkType(e.target.value)} className={selectClass}>
              {WORK_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Results Canvas ── */}
      <div className="space-y-5">
        {/* URL display */}
        <div className={`rounded-xl border border-border bg-blue-bg p-5 transition-all duration-300 ${hasInput ? "opacity-100" : "opacity-50"}`}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-blue mb-2">Your LinkedIn Search URL</p>
          <p className="text-sm text-blue font-mono leading-relaxed break-all">{hasInput ? url : "Enter a job title and location..."}</p>
          <div className="mt-4 flex gap-3">
            <button onClick={handleCopy} disabled={!hasInput}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${hasInput ? "bg-navy text-white hover:bg-navy/90 cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
              {copied ? "Copied!" : "Copy URL"}
            </button>
            {hasInput && (
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-dark transition-colors inline-flex items-center gap-1.5">
                Open in LinkedIn
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Filters summary */}
        {hasInput && (
          <div className="rounded-xl border border-border bg-white p-5">
            <h3 className="text-sm font-semibold text-navy mb-3">Your Filters</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-bg text-blue text-xs font-medium px-3 py-1">{keywords}</span>
              <span className="rounded-full bg-blue-bg text-blue text-xs font-medium px-3 py-1">{location}</span>
              {experience && <span className="rounded-full bg-gray-100 text-text-muted text-xs font-medium px-3 py-1">{expLabel}</span>}
              {datePosted && <span className="rounded-full bg-gray-100 text-text-muted text-xs font-medium px-3 py-1">{dateLabel}</span>}
              {workType && <span className="rounded-full bg-gray-100 text-text-muted text-xs font-medium px-3 py-1">{workLabel}</span>}
            </div>
            <p className="mt-3 text-xs text-text-muted">Bookmark this URL for one-click access every morning.</p>
          </div>
        )}

        {/* Tips */}
        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="text-sm font-semibold text-navy mb-3">How to use this</h3>
          <div className="space-y-2 text-sm text-text-muted">
            <p><strong className="text-navy">Apply within 24 hours.</strong> Early applicants get 8x more responses.</p>
            <p><strong className="text-navy">Run this 3-4 times</strong> with different title variations. Bookmark each URL.</p>
            <p><strong className="text-navy">Click "Set alert"</strong> on LinkedIn after opening results.</p>
            <p><strong className="text-navy">Quality over quantity.</strong> 5 tailored applications beat 50 identical ones.</p>
          </div>
        </div>

        {/* Email capture */}
        {hasInput && (
          <EmailCapture
            tool="job-search-builder"
            subject={`Your LinkedIn Search: ${keywords} in ${location}`}
            resultHtml={resultHtml}
          />
        )}

        {/* Empty state */}
        {!hasInput && (
          <div className="rounded-xl border border-dashed border-border bg-gray-50/50 p-8 text-center">
            <p className="text-sm text-text-muted">Enter a job title and location to build your URL.</p>
          </div>
        )}
      </div>
    </div>
  );
}
