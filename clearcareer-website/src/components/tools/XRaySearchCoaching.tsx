import { useState } from "react";
import { CITIES, INDUSTRIES, JOB_TITLES } from "./presets";

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

/* ── Main Component ── */

export default function XRaySearchCoaching() {
  const [industry, setIndustry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [copied, setCopied] = useState(false);

  let query = `site:linkedin.com/in`;
  query += ` ("recruiter" OR "talent acquisition" OR "sourcer" OR "talent partner" OR "hiring manager")`;
  if (industry) query += ` "${industry}"`;
  if (jobTitle) query += ` "${jobTitle}"`;
  if (location) query += ` "${location}"`;
  if (company) query += ` "${company}"`;

  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const hasInput = industry.trim().length > 0 && location.trim().length > 0;

  function handleCopy() {
    navigator.clipboard.writeText(googleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Estimate result count hint
  const specificity = [industry, jobTitle, location, company].filter(Boolean).length;
  const resultHint = specificity >= 3 ? "50-200 profiles" : specificity >= 2 ? "200-500 profiles" : "500+ profiles";

  const resultHtml = `
    <div style="margin:20px 0;">
      <p style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin-bottom:8px;">Your Recruiter Search</p>
      <p style="font-size:13px;color:#6b7280;margin-bottom:12px;">
        ${industry ? `<strong>Industry:</strong> ${industry}` : ""}
        ${jobTitle ? ` &middot; <strong>Role:</strong> ${jobTitle}` : ""}
        ${location ? ` &middot; <strong>Location:</strong> ${location}` : ""}
        ${company ? ` &middot; <strong>Company:</strong> ${company}` : ""}
      </p>
      <div style="margin-top:16px;">
        <a href="${googleUrl}" style="display:inline-block;background:#0161EF;color:white;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">Open Search in Google &rarr;</a>
      </div>
      <p style="margin-top:12px;font-size:12px;color:#9ca3af;">This link searches Google for LinkedIn profiles matching your criteria.</p>
    </div>
  `;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
      {/* ── LEFT: Input Sidebar ── */}
      <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm">
        <div className="mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/images/izzy-coaching.jpg" alt="Izzy" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-navy">Recruiter Finder</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">by Izzy Piyale-Sheard</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="xr-industry" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Industry or Field
              <InfoTip text="What space do you work in? This finds recruiters who specialize in it." />
            </label>
            <ChipSelect options={INDUSTRIES} value={industry} onChange={setIndustry} />
            <input id="xr-industry" type="text" placeholder="or type your own" value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
          </div>

          <div>
            <label htmlFor="xr-title" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Job Title <span className="normal-case font-normal">(optional)</span>
              <InfoTip text="Finds recruiters who specifically hire for this role." />
            </label>
            <ChipSelect options={JOB_TITLES} value={jobTitle} onChange={setJobTitle} />
            <input id="xr-title" type="text" placeholder="or type your own" value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
          </div>

          <div>
            <label htmlFor="xr-location" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Location
              <InfoTip text="City, region, or country. Recruiters often work locally." />
            </label>
            <ChipSelect options={CITIES} value={location} onChange={setLocation} />
            <input id="xr-location" type="text" placeholder="or type your own" value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
          </div>

          <div className="pt-2 border-t border-border">
            <label htmlFor="xr-company" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Company <span className="normal-case font-normal">(optional)</span>
              <InfoTip text="Target a specific employer. Leave blank to search all." />
            </label>
            <input id="xr-company" type="text" placeholder="Google" value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-gray-50 py-2.5 px-3 text-sm text-text placeholder:text-text-muted/50 focus:bg-white focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/10 transition-all" />
          </div>
        </div>
      </div>

      {/* ── RIGHT: Results Canvas ── */}
      <div className="space-y-5">
        {hasInput ? (
          <>
            {/* Clickable result card */}
            <a href={googleUrl} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl border-2 border-blue/20 bg-white p-6 hover:border-blue/40 hover:shadow-lg hover:shadow-blue/10 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-blue mb-2">Your Recruiter Search</p>
                  <p className="text-lg font-semibold text-navy group-hover:text-blue transition-colors">
                    {industry} recruiters{jobTitle ? ` hiring ${jobTitle}s` : ""} in {location}
                    {company ? ` at ${company}` : ""}
                  </p>
                  <p className="text-sm text-text-muted mt-1">Estimated {resultHint} on LinkedIn</p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue/10 text-blue group-hover:bg-blue group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-blue/60 group-hover:text-blue/80 transition-colors">Click to open in Google →</p>
            </a>

            {/* Search parameters */}
            <div className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-navy">Search Details</h3>
                <button onClick={handleCopy}
                  className="text-xs font-medium text-blue hover:text-blue-dark transition-colors">
                  {copied ? "Copied!" : "Copy URL"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="rounded-full bg-blue-bg text-blue text-xs font-medium px-3 py-1">{industry}</span>
                {jobTitle && <span className="rounded-full bg-blue-bg text-blue text-xs font-medium px-3 py-1">{jobTitle}</span>}
                <span className="rounded-full bg-blue-bg text-blue text-xs font-medium px-3 py-1">{location}</span>
                {company && <span className="rounded-full bg-gray-100 text-text-muted text-xs font-medium px-3 py-1">{company}</span>}
              </div>
              <details className="group">
                <summary className="text-xs text-text-muted cursor-pointer hover:text-navy transition-colors">
                  Show raw search string
                </summary>
                <p className="mt-2 text-xs text-text-muted font-mono leading-relaxed break-all bg-gray-50 rounded-lg p-3">{query}</p>
              </details>
            </div>

            {/* Tips */}
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="text-sm font-semibold text-navy mb-3">What to do with these results</h3>
              <div className="space-y-2 text-sm text-text-muted">
                <p><strong className="text-navy">Connect with 3-5 per week.</strong> Not 50. Personalize every request.</p>
                <p><strong className="text-navy">Try different role variations.</strong> "Talent acquisition partner," "sourcer," "hiring manager," "people operations."</p>
                <p><strong className="text-navy">Mention something specific.</strong> Their industry, a recent post, a shared connection. Under 300 characters.</p>
                <p><strong className="text-navy">Most jobs aren't posted.</strong> Direct outreach gets you in front of roles that never hit boards.</p>
              </div>
            </div>

            {/* Email capture */}
            <EmailCapture
              tool="recruiter-finder"
              subject={`Your Recruiter Search: ${industry}${jobTitle ? ` / ${jobTitle}` : ""} in ${location}`}
              resultHtml={resultHtml}
            />
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-gray-50/50 p-8 text-center">
            <svg className="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p className="text-sm text-text-muted">Pick an industry and location to find recruiters on LinkedIn.</p>
            <p className="text-xs text-text-muted mt-1">Click the chips or type your own.</p>
          </div>
        )}
      </div>
    </div>
  );
}
