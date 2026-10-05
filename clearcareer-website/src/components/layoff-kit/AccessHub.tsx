"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { SeveranceCalculator } from "./SeveranceCalculator";
import { LawyerDirectory } from "./LawyerDirectory";
import { GuideRenderer } from "./GuideRenderer";

// ── Guide metadata ─────────────────────────────────────────────────────────

const GUIDES = [
  {
    id: "start",
    title: "Start Here",
    shortTitle: "Start",
    icon: "🏠",
    type: "welcome" as const,
    description: "",
  },
  {
    id: "calculator",
    title: "Severance Calculator",
    shortTitle: "Calculator",
    icon: "🧮",
    type: "tool" as const,
    description: "Estimate your severance range",
  },
  {
    id: "lawyers",
    title: "Lawyer Directory",
    shortTitle: "Lawyers",
    icon: "⚖️",
    type: "tool" as const,
    description: "Find an employment lawyer",
  },
  {
    id: "01-severance-negotiation",
    title: "Severance Negotiation Playbook",
    shortTitle: "Severance",
    icon: "📋",
    type: "guide" as const,
    description: "Counter-offer scripts and strategy",
  },
  {
    id: "02-tax-planning",
    title: "Tax Planning Strategies",
    shortTitle: "Tax",
    icon: "💰",
    type: "guide" as const,
    description: "Reduce the tax hit on your severance",
  },
  {
    id: "03-benefits-transition",
    title: "Benefits Transition Guide",
    shortTitle: "Benefits",
    icon: "🏥",
    type: "guide" as const,
    description: "Keep your coverage during the gap",
  },
  {
    id: "04-financial-runway",
    title: "Financial Runway Worksheet",
    shortTitle: "Runway",
    icon: "📊",
    type: "guide" as const,
    description: "Calculate how long your money lasts",
  },
  {
    id: "05-linkedin-optimization",
    title: "LinkedIn Optimization",
    shortTitle: "LinkedIn",
    icon: "💼",
    type: "guide" as const,
    description: "Update your profile before reaching out",
  },
  {
    id: "06-salary-negotiation",
    title: "Salary Negotiation Scripts",
    shortTitle: "Salary",
    icon: "🎯",
    type: "guide" as const,
    description: "Scripts for negotiating your next offer",
  },
  {
    id: "07-government-support",
    title: "Government Support Directory",
    shortTitle: "Gov't",
    icon: "🇨🇦",
    type: "guide" as const,
    description: "EI, training grants, and provincial programs",
  },
  {
    id: "08-reference-strategy",
    title: "Reference Strategy Guide",
    shortTitle: "References",
    icon: "📝",
    type: "guide" as const,
    description: "Secure references before you need them",
  },
  {
    id: "09-non-compete-audit",
    title: "Non-Compete Audit Checklist",
    shortTitle: "Non-Compete",
    icon: "🔍",
    type: "guide" as const,
    description: "Check if your restrictions are enforceable",
  },
  {
    id: "10-job-search-plan",
    title: "30/60/90 Day Job Search Plan",
    shortTitle: "Job Search",
    icon: "🗓️",
    type: "guide" as const,
    description: "A structured 90-day search framework",
  },
  {
    id: "11-mental-health",
    title: "Mental Health & Resilience",
    shortTitle: "Mental Health",
    icon: "🧠",
    type: "guide" as const,
    description: "Protect your wellbeing during the transition",
  },
];

interface GuideContent {
  [id: string]: string;
}

// ── Quick-start paths for the welcome screen ──

const QUICK_STARTS: {
  heading: string;
  description: string;
  links: { id: string; label: string }[];
  color: string;
  iconColor: string;
  svgIcon: ReactNode;
}[] = [
  {
    heading: "Haven't signed your severance?",
    description:
      "Start with the calculator to see what you may be owed, then read the negotiation playbook for scripts and strategy.",
    links: [
      { id: "calculator", label: "Severance Calculator" },
      { id: "01-severance-negotiation", label: "Negotiation Playbook" },
    ],
    color: "border-red-200 bg-red-50",
    iconColor: "text-red-600",
    svgIcon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    heading: "Worried about money?",
    description:
      "Figure out your runway, reduce your tax hit, and find government programs you qualify for.",
    links: [
      { id: "04-financial-runway", label: "Financial Runway" },
      { id: "02-tax-planning", label: "Tax Strategies" },
      { id: "07-government-support", label: "Government Support" },
    ],
    color: "border-emerald-200 bg-emerald-50",
    iconColor: "text-emerald-600",
    svgIcon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    heading: "Ready to start job searching?",
    description:
      "Optimize your LinkedIn, prepare for salary negotiation, and build a structured search plan.",
    links: [
      { id: "05-linkedin-optimization", label: "LinkedIn Guide" },
      { id: "06-salary-negotiation", label: "Salary Scripts" },
      { id: "10-job-search-plan", label: "30/60/90 Day Plan" },
    ],
    color: "border-blue-200 bg-blue-50",
    iconColor: "text-blue-600",
    svgIcon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    heading: "Feeling overwhelmed?",
    description:
      "A layoff hits harder than people expect. Get practical tools for managing stress, identity, and mental health during your transition.",
    links: [
      { id: "11-mental-health", label: "Mental Health Guide" },
      { id: "04-financial-runway", label: "Financial Runway" },
    ],
    color: "border-purple-200 bg-purple-50",
    iconColor: "text-purple-600",
    svgIcon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

// ── localStorage helpers for guide completion ──

function getCompletedGuides(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem("lsk-completed-guides");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function toggleGuideComplete(id: string): Set<string> {
  const completed = getCompletedGuides();
  if (completed.has(id)) {
    completed.delete(id);
  } else {
    completed.add(id);
  }
  localStorage.setItem(
    "lsk-completed-guides",
    JSON.stringify([...completed])
  );
  return new Set(completed);
}

export function AccessHub({
  buyerName,
  buyerEmail,
}: {
  buyerName: string;
  buyerEmail: string;
}) {
  const [activeTab, setActiveTab] = useState("start");
  const [guideContent, setGuideContent] = useState<GuideContent>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [completedGuides, setCompletedGuides] = useState<Set<string>>(
    new Set()
  );
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Load completed guides from localStorage on mount
  useEffect(() => {
    setCompletedGuides(getCompletedGuides());
  }, []);

  async function loadGuide(id: string) {
    if (guideContent[id]) return;
    setLoading(id);
    try {
      const res = await fetch(`/api/layoff-kit/guide/${id}`);
      if (res.ok) {
        const { markdown } = await res.json();
        setGuideContent((prev) => ({ ...prev, [id]: markdown }));
      }
    } catch {
      setGuideContent((prev) => ({
        ...prev,
        [id]: "__LOAD_ERROR__",
      }));
    }
    setLoading(null);
  }

  function handleTabClick(id: string) {
    setActiveTab(id);
    const guide = GUIDES.find((g) => g.id === id);
    if (guide?.type === "guide" && !guideContent[id]) {
      loadGuide(id);
    }
    // Scroll the tab into view on mobile
    if (tabBarRef.current) {
      const activeButton = tabBarRef.current.querySelector(
        `[data-tab-id="${id}"]`
      );
      activeButton?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    // Scroll content to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleToggleComplete(id: string) {
    setCompletedGuides(toggleGuideComplete(id));
  }

  const guideItems = GUIDES.filter((g) => g.type === "guide");
  const completedCount = guideItems.filter((g) =>
    completedGuides.has(g.id)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-navy text-sm">
              ClearCareer
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">
              {buyerName ? `Welcome, ${buyerName}` : "Layoff Survival Kit"}
            </span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            {buyerEmail}
          </span>
        </div>
      </header>

      {/* ── Mobile Tab Bar ── */}
      <div className="md:hidden sticky top-[49px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="relative">
          <div
            ref={tabBarRef}
            className="flex overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {GUIDES.map((g) => (
              <button
                key={g.id}
                data-tab-id={g.id}
                onClick={() => handleTabClick(g.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 text-center border-b-2 transition-colors ${
                  activeTab === g.id
                    ? "border-blue text-blue"
                    : "border-transparent text-gray-500"
                }`}
              >
                <span className="text-base leading-none">
                  {g.icon}
                </span>
                <span className="text-[10px] font-medium whitespace-nowrap">
                  {g.shortTitle}
                </span>
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── Disclaimer bar ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <p className="text-xs text-amber-800">
            <strong>Educational resource only.</strong> This kit is not legal,
            tax, or financial advice. Consult an employment lawyer and CPA
            before making decisions about your severance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:flex md:gap-6">
        {/* ── Desktop Sidebar ── */}
        <nav className="hidden md:block w-72 shrink-0">
          <div className="sticky top-20 space-y-1">
            {/* Progress indicator */}
            <div className="px-3 mb-3">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>
                  {completedCount} of {guideItems.length}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${guideItems.length > 0 ? (completedCount / guideItems.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Start Here */}
            <button
              onClick={() => handleTabClick("start")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                activeTab === "start"
                  ? "bg-blue text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>🏠</span>
              Start Here
            </button>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">
              Tools
            </p>
            {GUIDES.filter((g) => g.type === "tool").map((g) => (
              <button
                key={g.id}
                onClick={() => handleTabClick(g.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  activeTab === g.id
                    ? "bg-blue text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{g.icon}</span>
                {g.title}
              </button>
            ))}

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">
              Guides
            </p>
            {GUIDES.filter((g) => g.type === "guide").map((g) => (
              <button
                key={g.id}
                onClick={() => handleTabClick(g.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  activeTab === g.id
                    ? "bg-blue text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{g.icon}</span>
                {g.title}
                {completedGuides.has(g.id) && (
                  <svg
                    className={`w-4 h-4 ml-auto ${activeTab === g.id ? "text-white" : "text-emerald-500"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Content Area ── */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 md:p-8">
            {/* ── Welcome / Start Here ── */}
            {activeTab === "start" && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
                  You've taken the first step.
                </h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                  Getting laid off is overwhelming. This kit is here to help you take it one piece at a time. You don't have to read everything today.
                </p>

                <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 mb-8">
                  <p className="text-sm font-semibold text-blue uppercase tracking-wider mb-2">
                    Right now
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Take a breath. You're going to be okay. Three things to know:
                  </p>
                  <ol className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-blue font-bold">1.</span>
                      Don't sign anything yet. There is no legal deadline.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue font-bold">2.</span>
                      You have more options than you think. This kit covers all of them.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue font-bold">3.</span>
                      Start with what feels most urgent below.
                    </li>
                  </ol>
                </div>

                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Where do you want to start?
                </p>

                <div className="space-y-4 mb-10">
                  {QUICK_STARTS.map((qs) => (
                    <div
                      key={qs.heading}
                      className={`rounded-xl border p-5 ${qs.color}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`${qs.iconColor} flex-shrink-0 mt-0.5`}>
                          {qs.svgIcon}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-base">
                            {qs.heading}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {qs.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {qs.links.map((link) => (
                              <button
                                key={link.id}
                                onClick={() => handleTabClick(link.id)}
                                className="text-sm font-medium text-blue hover:text-blue-dark bg-white rounded-lg px-3 py-1.5 border border-gray-200 hover:border-blue/30 transition-colors"
                              >
                                {link.label} →
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Browse everything */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Or browse everything
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GUIDES.filter(
                      (g) => g.type === "tool" || g.type === "guide"
                    ).map((g) => (
                      <button
                        key={g.id}
                        onClick={() => handleTabClick(g.id)}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue/30 hover:bg-gray-50 transition-all text-left group"
                      >
                        <span className="text-xl">{g.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue transition-colors">
                            {g.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {g.description}
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-300 group-hover:text-blue transition-colors flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Calculator ── */}
            {activeTab === "calculator" && (
              <div>
                <h1 className="text-2xl font-bold text-navy mb-2">
                  Canadian Severance Calculator
                </h1>
                <p className="text-gray-600 text-sm mb-6">
                  Enter your details to see your statutory minimum and what
                  courts have typically awarded in similar situations.
                </p>
                <SeveranceCalculator />
              </div>
            )}

            {/* ── Lawyer Directory ── */}
            {activeTab === "lawyers" && (
              <div>
                <h1 className="text-2xl font-bold text-navy mb-2">
                  Employment Lawyer Directory
                </h1>
                <p className="text-gray-600 text-sm mb-6">
                  Curated employment lawyers across Canada. Filter by province
                  or specialty.
                </p>
                <LawyerDirectory />
              </div>
            )}

            {/* ── Guide content ── */}
            {activeTab !== "start" &&
              activeTab !== "calculator" &&
              activeTab !== "lawyers" && (
                <div>
                  {/* Guide header with completion toggle */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-navy">
                        {GUIDES.find((g) => g.id === activeTab)?.title}
                      </h1>
                    </div>
                    <button
                      onClick={() => handleToggleComplete(activeTab)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        completedGuides.has(activeTab)
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {completedGuides.has(activeTab) ? (
                        <>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Done
                        </>
                      ) : (
                        "Mark as done"
                      )}
                    </button>
                  </div>

                  {loading === activeTab ? (
                    <div>
                      <p className="text-sm text-gray-500 mb-4">
                        Loading {GUIDES.find((g) => g.id === activeTab)?.title}...
                      </p>
                      <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                        <div className="h-32 bg-gray-100 rounded-lg" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                      </div>
                    </div>
                  ) : guideContent[activeTab] === "__LOAD_ERROR__" ? (
                    <div className="text-center py-16 text-gray-500">
                      <p>Failed to load guide. Please refresh the page.</p>
                      <button
                        onClick={() => {
                          setGuideContent((prev) => {
                            const next = { ...prev };
                            delete next[activeTab];
                            return next;
                          });
                          loadGuide(activeTab);
                        }}
                        className="mt-3 text-sm text-blue underline underline-offset-2 hover:text-blue-dark"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : guideContent[activeTab] ? (
                    <GuideRenderer
                      guideId={activeTab}
                      markdown={guideContent[activeTab]}
                    />
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <p className="text-3xl mb-3">
                        {GUIDES.find((g) => g.id === activeTab)?.icon}
                      </p>
                      <p>Loading guide...</p>
                    </div>
                  )}
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}
