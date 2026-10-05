import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { WorthResult as WorthData } from "../../lib/wrapped/types";
import ShareToolbar from "./ShareToolbar";

interface Props {
  result: WorthData;
  resultId: string;
  isOwner: boolean;
}

function fmt(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}K`;
  return `$${n.toLocaleString()}`;
}

function fmtFull(n: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}

function SourcePill({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-current/20 px-2 py-0.5 text-[10px] font-medium opacity-60 hover:opacity-100 transition-opacity"
    >
      <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {name}
    </a>
  );
}

export default function WorthResult({ result, resultId, isOwner }: Props) {
  const shareUrl = `https://joinclearcareer.com/wrapped/worth/${resultId}`;

  const titleGapColor = result.titleGap.levelDifference > 0 ? "text-amber-500" : result.titleGap.levelDifference === 0 ? "text-emerald-500" : "text-blue-400";
  const titleGapBg = result.titleGap.levelDifference > 0 ? "bg-amber-500/10 border-amber-500/20" : result.titleGap.levelDifference === 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-blue-400/10 border-blue-400/20";

  // Chart data
  const localChartData = result.localSalary.map((t) => ({
    name: t.title.length > 20 ? t.title.slice(0, 18) + "..." : t.title,
    fullName: t.title,
    low: t.low,
    range: t.high - t.low,
    median: t.median,
    high: t.high,
    isCurrent: t.isCurrent,
    isRecommended: t.isRecommended,
  }));

  const locationChartData = result.salaryByLocation.map((loc) => ({
    name: loc.location,
    low: loc.low,
    range: loc.high - loc.low,
    median: loc.median,
    isHighest: loc.isHighest,
  }));

  const titleChartData = result.salaryByTitle.map((t) => ({
    name: t.title.length > 22 ? t.title.slice(0, 20) + "..." : t.title,
    fullName: t.title,
    median: t.median,
    isCurrent: t.isCurrent,
    isRecommended: t.isRecommended,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* ═══ SECTION 1: HERO (dark navy) ═══ */}
      <div id="wrapped-share-card" className="relative overflow-hidden rounded-t-2xl bg-[#030620] px-6 py-12 md:px-10 md:py-16 text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0161EF] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#06b6d4] rounded-full opacity-8 blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="relative z-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#06b6d4] mb-6">Your Market Value</p>
          <div className="text-6xl md:text-7xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {fmtFull(result.anchorValue, result.currency)}
          </div>
          <p className="text-sm text-gray-500 mb-8">
            estimated for <span className="text-white font-medium">{result.titleGap.recommendedTitle}</span> in {result.userLocation}
          </p>
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${titleGapBg}`}>
            <span className="text-sm text-gray-400">{result.titleGap.currentTitle}</span>
            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className={`text-sm font-medium ${titleGapColor}`}>{result.titleGap.recommendedTitle}</span>
          </div>
          <p className={`mt-3 text-sm ${titleGapColor}`}>{result.titleGap.summary}</p>

          {result.payGap && (
            <div className="mt-6 rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 max-w-sm mx-auto">
              <p className="text-sm text-amber-400 font-medium">You're leaving {result.payGap.gapAmount} on the table</p>
              <p className="text-xs text-gray-500 mt-1">Based on your current salary of {fmtFull(result.payGap.currentSalary, result.currency)}</p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ SECTION 2: LOCAL SALARY (white/blue - PRIMARY) ═══ */}
      <div className="bg-[#EFF5FF] px-6 py-10 md:px-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📍</span>
          <h3 className="text-sm font-semibold text-[#030620]">Salaries in {result.userLocation}</h3>
        </div>
        <p className="text-xs text-[#6b7280] mb-6">What each title pays in your local market</p>

        <div className="w-full" style={{ height: localChartData.length * 65 + 20 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={localChartData} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }} barCategoryGap="20%">
              <XAxis type="number" hide domain={[0, "dataMax"]} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11, fill: "#030620" }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  if (!d) return null;
                  return (
                    <div className="rounded-lg bg-white shadow-lg border border-gray-200 px-3 py-2 text-xs">
                      <p className="font-semibold text-[#030620]">{d.fullName}</p>
                      <p className="text-gray-500">Low: {fmt(d.low)}</p>
                      <p className="text-[#0161EF] font-medium">Median: {fmt(d.median)}</p>
                      <p className="text-gray-500">High: {fmt(d.low + d.range)}</p>
                      {d.isCurrent && <p className="text-gray-400 mt-1">Your current title</p>}
                      {d.isRecommended && <p className="text-[#059669] mt-1">Recommended title</p>}
                    </div>
                  );
                }}
              />
              <Bar dataKey="low" stackId="a" fill="transparent" />
              <Bar dataKey="range" stackId="a" radius={[0, 6, 6, 0]}>
                {localChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.isCurrent ? "#6b7280" : entry.isRecommended ? "#0161EF" : "#06b6d4"} opacity={entry.isRecommended ? 1 : 0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend + sources */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#6b7280]" /><span className="text-[10px] text-[#6b7280]">Current title</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#0161EF]" /><span className="text-[10px] text-[#6b7280]">Recommended</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#06b6d4]" /><span className="text-[10px] text-[#6b7280]">Alternative</span></div>
          <div className="flex-1" />
          <div className="flex flex-wrap gap-1.5 text-[#0161EF]">
            {result.localSalary.map((t, i) => <SourcePill key={i} name={t.source} url={t.sourceUrl} />)}
          </div>
        </div>
      </div>

      {/* ═══ SECTION 3: OTHER CITIES (dark) ═══ */}
      <div className="bg-[#030620] px-6 py-10 md:px-10">
        <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#06b6d4] mb-1">
          Same Role, Other Cities
        </h3>
        <p className="text-xs text-gray-600 mb-6">{result.titleGap.recommendedTitle} salary in other markets</p>

        <div className="w-full" style={{ height: locationChartData.length * 60 + 20 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationChartData} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }} barCategoryGap="25%">
              <XAxis type="number" hide domain={[0, "dataMax"]} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  if (!d) return null;
                  return (
                    <div className="rounded-lg bg-white shadow-lg border border-gray-200 px-3 py-2 text-xs">
                      <p className="font-semibold text-[#030620]">{d.name}</p>
                      <p className="text-gray-500">Low: {fmt(d.low)}</p>
                      <p className="text-[#06b6d4] font-medium">Median: {fmt(d.median)}</p>
                      <p className="text-gray-500">High: {fmt(d.low + d.range)}</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="low" stackId="a" fill="transparent" />
              <Bar dataKey="range" stackId="a" radius={[0, 6, 6, 0]}>
                {locationChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.isHighest ? "#0161EF" : "#06b6d4"} opacity={entry.isHighest ? 1 : 0.5} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 text-gray-500">
          {result.salaryByLocation.map((loc, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-600">{loc.location}:</span>
              <SourcePill name={loc.source} url={loc.sourceUrl} />
              {loc.isHighest && <span className="text-[10px] font-medium text-[#0161EF]">Highest</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 4: TITLE LADDER (light green tint) ═══ */}
      <div className="bg-[#f0fdf4] px-6 py-10 md:px-10">
        <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#059669] mb-1">
          How Your Title Stacks Up
        </h3>
        <p className="text-xs text-[#6b7280] mb-6">Salary comparison across title levels</p>

        <div className="w-full" style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={titleChartData} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} angle={-15} textAnchor="end" height={55} />
              <YAxis hide domain={[0, "dataMax + 20000"]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  if (!d) return null;
                  return (
                    <div className="rounded-lg bg-white shadow-lg border border-gray-200 px-3 py-2 text-xs">
                      <p className="font-semibold text-[#030620]">{d.fullName}</p>
                      <p className="text-[#059669] font-medium">{fmt(d.median)}</p>
                      {d.isCurrent && <p className="text-gray-400">Your current title</p>}
                      {d.isRecommended && <p className="text-[#0161EF]">Recommended</p>}
                    </div>
                  );
                }}
              />
              <Bar dataKey="median" radius={[6, 6, 0, 0]}>
                {titleChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.isCurrent ? "#6b7280" : entry.isRecommended ? "#0161EF" : "#059669"} opacity={entry.isRecommended ? 1 : 0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 justify-center text-[#059669]">
          {result.salaryByTitle.map((t, i) => <SourcePill key={i} name={t.source} url={t.sourceUrl} />)}
        </div>
      </div>

      {/* ═══ SECTION 5: TITLES TO SEARCH (teal tint) ═══ */}
      <div className="bg-[#ecfeff] px-6 py-10 md:px-10">
        <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#0d9488] mb-1">5 Titles to Search</h3>
        <p className="text-xs text-[#6b7280] mb-6">Job titles that match your skills. Click to search LinkedIn.</p>
        <div className="space-y-3">
          {result.alternativeTitles.map((alt, i) => (
            <div key={i} className="rounded-xl bg-white border border-[#06b6d4]/10 shadow-sm p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06b6d4]/10 text-[#0d9488] text-sm font-bold flex-shrink-0">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[#030620]">{alt.title}</p>
                  <span className="rounded-full bg-[#059669]/10 px-2 py-0.5 text-xs font-medium text-[#059669]">{fmt(alt.medianSalary)}</span>
                </div>
                <p className="text-xs text-[#6b7280] mt-0.5">{alt.fitReason}</p>
              </div>
              <a href={alt.linkedinSearchUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[#0A66C2] px-4 py-2 text-xs font-medium text-white hover:bg-[#004182] transition-colors">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Search
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 6: TOP COMPANIES (dark) ═══ */}
      <div className="bg-[#030620] px-6 py-10 md:px-10">
        <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#059669] mb-1">Companies That Pay Top Dollar</h3>
        <p className="text-xs text-gray-600 mb-6">Companies known to compensate well for your profile</p>
        <div className="grid gap-3 md:grid-cols-3">
          {result.topCompanies.map((c, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#059669]/20 text-[#059669] text-xs font-bold">{i + 1}</span>
                <p className="text-sm font-medium text-white">{c.name}</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{c.whyTheyPay}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 7: SOURCES (light gray) ═══ */}
      <div className="bg-[#f9fafb] rounded-b-2xl px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] text-[#6b7280] font-medium uppercase tracking-wider mr-1">Sources</span>
          {result.sources.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.note} className="inline-flex items-center gap-1 rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-[10px] text-[#6b7280] hover:text-[#0161EF] hover:border-[#0161EF]/20 transition-all">
              <svg className="h-2 w-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              {s.name}
            </a>
          ))}
        </div>
        <p className="text-[10px] text-[#9ca3af] italic mb-4">{result.methodology}</p>
        <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-4">
          <span className="text-[10px] text-[#9ca3af]">joinclearcareer.com/wrapped</span>
          <span className="text-[10px] font-medium text-[#0161EF]">ClearCareer</span>
        </div>
      </div>

      <ShareToolbar shareUrl={shareUrl} shareText={`My market value is ${fmtFull(result.anchorValue, result.currency)} as a ${result.titleGap.recommendedTitle}. Find out yours:`} captureTargetId="wrapped-share-card" downloadFileName={`worth-report-${resultId}.png`} />

      {!isOwner && (
        <div className="text-center mt-8 p-6 rounded-2xl bg-[#EFF5FF] border border-[#0161EF]/10">
          <h3 className="text-lg font-semibold text-[#030620]">What are you actually worth?</h3>
          <p className="text-sm text-[#6b7280] mt-1 mb-4">Upload your resume and get your salary report in seconds.</p>
          <a href="/wrapped/worth" className="inline-flex items-center justify-center rounded-lg bg-[#0161EF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0450c8]">Find Out My Worth</a>
        </div>
      )}
    </div>
  );
}
