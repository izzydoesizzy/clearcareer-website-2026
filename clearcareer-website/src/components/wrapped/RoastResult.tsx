import { useState, useEffect } from "react";
import type { RoastResult as RoastData } from "../../lib/wrapped/types";
import ShareToolbar from "./ShareToolbar";

interface Props {
  result: RoastData;
  resultId: string;
  isOwner: boolean;
}

const severityColor = {
  mild: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Mild" },
  medium: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", label: "Medium" },
  savage: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Savage" },
};

export default function RoastResult({ result, resultId, isOwner }: Props) {
  const [visibleRoasts, setVisibleRoasts] = useState(isOwner ? 0 : result.roasts.length);
  const [showGrade, setShowGrade] = useState(!isOwner);
  const [showRedemption, setShowRedemption] = useState(!isOwner);

  useEffect(() => {
    if (!isOwner) return;
    // Reveal roasts one by one
    const timers = result.roasts.map((_, i) =>
      setTimeout(() => setVisibleRoasts(i + 1), 800 + i * 1200)
    );
    // Then grade
    timers.push(setTimeout(() => setShowGrade(true), 800 + result.roasts.length * 1200 + 800));
    // Then redemption
    timers.push(setTimeout(() => setShowRedemption(true), 800 + result.roasts.length * 1200 + 2000));
    return () => timers.forEach(clearTimeout);
  }, [isOwner, result.roasts]);

  const shareUrl = `https://joinclearcareer.com/wrapped/roast/${resultId}`;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Shareable Card */}
      <div id="wrapped-share-card" className="relative overflow-hidden rounded-2xl bg-[#030620] p-8 md:p-10">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97706] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ef4444] rounded-full opacity-8 blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-[#D97706] mb-3">
              Resume Roast
            </p>
            <h2 className="text-2xl font-semibold text-white">The Verdict Is In</h2>
          </div>

          {/* Roasts */}
          <div className="space-y-4 mb-8">
            {result.roasts.map((roast, i) => {
              const style = severityColor[roast.severity];
              const visible = i < visibleRoasts;
              return (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">
                        {roast.severity === "savage" ? "💀" : roast.severity === "medium" ? "😬" : "😏"}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 leading-relaxed">{roast.text}</p>
                        <span className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                          roast.severity === "savage"
                            ? "bg-red-500/20 text-red-400"
                            : roast.severity === "medium"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {style.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grade */}
          <div className={`transition-all duration-700 ${showGrade ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="text-center py-8 border-y border-white/10">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">
                Overall Grade
              </p>
              <div className="text-7xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {result.grade.letter}
              </div>
              <p className="text-lg text-[#D97706] font-medium">{result.grade.subtitle}</p>
            </div>
          </div>

          {/* Redemption */}
          <div className={`mt-8 transition-all duration-700 ${showRedemption ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="rounded-xl bg-gradient-to-br from-[#D97706]/10 to-[#059669]/10 border border-[#D97706]/20 p-6">
              <p className="text-xs font-medium uppercase tracking-widest text-[#059669] mb-3">
                But Seriously
              </p>
              <p className="text-white font-medium mb-3">{result.redemption.strength}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{result.redemption.encouragement}</p>
            </div>
          </div>

          {/* Branding */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-600">joinclearcareer.com/wrapped</span>
            <span className="text-xs font-medium text-[#D97706]">ClearCareer</span>
          </div>
        </div>
      </div>

      {/* Share */}
      <ShareToolbar
        shareUrl={shareUrl}
        shareText={`My resume got an ${result.grade.letter} ("${result.grade.subtitle}"). Get yours roasted:`}
        captureTargetId="wrapped-share-card"
        downloadFileName={`resume-roast-${resultId}.png`}
      />

      {/* CTA */}
      {!isOwner && (
        <div className="text-center mt-8 p-6 rounded-2xl bg-[#EFF5FF] border border-[#0161EF]/10">
          <h3 className="text-lg font-semibold text-[#030620]">Think you can handle it?</h3>
          <p className="text-sm text-[#6b7280] mt-1 mb-4">Upload your resume and get roasted by AI.</p>
          <a href="/wrapped/roast" className="inline-flex items-center justify-center rounded-lg bg-[#0161EF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0450c8]">
            Roast My Resume
          </a>
        </div>
      )}
    </div>
  );
}
