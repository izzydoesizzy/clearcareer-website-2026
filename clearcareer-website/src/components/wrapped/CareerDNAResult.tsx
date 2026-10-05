import { useState, useEffect } from "react";
import type { CareerDNAResult as CareerDNAData } from "../../lib/wrapped/types";
import ShareToolbar from "./ShareToolbar";

interface Props {
  result: CareerDNAData;
  resultId: string;
  isOwner: boolean; // true if this is the person who just generated it
}

export default function CareerDNAResult({ result, resultId, isOwner }: Props) {
  const [revealed, setRevealed] = useState(!isOwner); // Auto-reveal for viewers
  const [stage, setStage] = useState(isOwner ? 0 : 5); // Animation stages

  useEffect(() => {
    if (!isOwner) return;
    // Progressive reveal animation
    const timers = [
      setTimeout(() => setStage(1), 500),   // Archetype name
      setTimeout(() => setStage(2), 1500),  // Tagline + description
      setTimeout(() => setStage(3), 2500),  // Superpowers
      setTimeout(() => setStage(4), 3500),  // Hidden pattern
      setTimeout(() => { setStage(5); setRevealed(true); }, 4500), // Full reveal
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOwner]);

  const shareUrl = `https://joinclearcareer.com/wrapped/career-dna/${resultId}`;

  const directionEmoji = {
    ascending: "📈",
    pivoting: "🔄",
    deepening: "🎯",
    launching: "🚀",
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* ── Shareable Card (captured for image export) ── */}
      <div
        id="wrapped-share-card"
        className="relative overflow-hidden rounded-2xl bg-[#030620] p-8 md:p-10 text-white"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0161EF] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#06b6d4] rounded-full opacity-8 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-[#0161EF] mb-3">
              Your Career DNA
            </p>

            {/* Archetype */}
            <h2
              className={`font-display text-4xl md:text-5xl leading-tight transition-all duration-700 ${
                stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {result.archetype.name}
            </h2>

            <p
              className={`mt-3 text-lg text-[#93c5fd] transition-all duration-700 delay-200 ${
                stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {result.archetype.tagline}
            </p>

            <p
              className={`mt-4 text-sm text-gray-400 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-300 ${
                stage >= 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              {result.archetype.description}
            </p>
          </div>

          {/* Superpowers */}
          <div
            className={`transition-all duration-700 ${
              stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-xs font-medium uppercase tracking-widest text-[#06b6d4] mb-4 text-center">
              Your Superpowers
            </h3>
            <div className="space-y-3">
              {result.superpowers.map((power, i) => (
                <div
                  key={power.name}
                  className="flex items-center gap-4"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{power.name}</span>
                      <span className="text-xs text-gray-500">{power.strength}/10</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0161EF] to-[#06b6d4] transition-all duration-1000 ease-out"
                        style={{
                          width: revealed ? `${power.strength * 10}%` : "0%",
                          transitionDelay: `${i * 200 + 500}ms`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{power.evidence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Pattern */}
          <div
            className={`mt-8 rounded-xl bg-white/5 border border-white/10 p-5 transition-all duration-700 ${
              stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-xs font-medium uppercase tracking-widest text-[#D97706] mb-2">
              Hidden Pattern
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {result.hiddenPattern.insight}
            </p>
            <p className="text-xs text-gray-500 mt-2 italic">
              {result.hiddenPattern.evidence}
            </p>
          </div>

          {/* Career Arc + Rarity */}
          <div
            className={`mt-6 flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
              stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <span className="text-2xl">{directionEmoji[result.careerArc.direction]}</span>
              <p className="text-xs text-gray-400 mt-1 capitalize">{result.careerArc.direction}</p>
              <p className="text-sm text-gray-300 mt-2">{result.careerArc.summary}</p>
            </div>
            <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <span className="text-2xl">💎</span>
              <p className="text-xs text-gray-400 mt-1">Rarity</p>
              <p className="text-sm text-gray-300 mt-2">{result.rarityScore}</p>
            </div>
          </div>

          {/* Branding watermark */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-600">joinclearcareer.com/wrapped</span>
            <span className="text-xs font-medium text-[#0161EF]">ClearCareer</span>
          </div>
        </div>
      </div>

      {/* ── Share Toolbar ── */}
      <ShareToolbar
        shareUrl={shareUrl}
        shareText={`I'm "${result.archetype.name}" according to my Career DNA. Find out yours:`}
        captureTargetId="wrapped-share-card"
        downloadFileName={`career-dna-${resultId}.png`}
      />

      {/* ── CTA for viewers ── */}
      {!isOwner && (
        <div className="text-center mt-8 p-6 rounded-2xl bg-[#EFF5FF] border border-[#0161EF]/10">
          <h3 className="text-lg font-semibold text-[#030620]">
            What's your Career DNA?
          </h3>
          <p className="text-sm text-[#6b7280] mt-1 mb-4">
            Upload your resume and discover your archetype, superpowers, and hidden patterns.
          </p>
          <a
            href="/wrapped/career-dna"
            className="inline-flex items-center justify-center rounded-lg bg-[#0161EF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0450c8]"
          >
            Discover My Career DNA
          </a>
        </div>
      )}
    </div>
  );
}
