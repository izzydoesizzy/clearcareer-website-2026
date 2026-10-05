import { useState, useEffect } from "react";
import type { FiveCardsResult as FiveCardsData } from "../../lib/wrapped/types";
import ShareToolbar from "./ShareToolbar";

interface Props {
  result: FiveCardsData;
  resultId: string;
  isOwner: boolean;
}

export default function FiveCardsResult({ result, resultId, isOwner }: Props) {
  const [activeCard, setActiveCard] = useState(0);
  const [revealed, setRevealed] = useState(!isOwner);

  useEffect(() => {
    if (!isOwner) return;
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, [isOwner]);

  const shareUrl = `https://joinclearcareer.com/wrapped/five-cards/${resultId}`;
  const card = result.cards[activeCard];

  // Contrast text color based on background
  const textColor = (color: string) => {
    return color === "#030620" || color === "#0161EF" ? "text-white" : "text-white";
  };

  const subtleTextColor = (color: string) => {
    return color === "#030620" ? "text-gray-400" : "text-white/70";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Card Display */}
      <div className={`transition-all duration-500 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {result.cards.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeCard ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Active Card */}
        <div
          id="wrapped-share-card"
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 min-h-[420px] flex flex-col justify-between transition-colors duration-500"
          style={{ backgroundColor: card.color }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-black rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Card number */}
            <div>
              <span className={`text-xs font-medium uppercase tracking-widest ${subtleTextColor(card.color)}`}>
                Card {card.number} of 5
              </span>
            </div>

            {/* Content */}
            <div className="my-auto py-8">
              <h2
                className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${textColor(card.color)}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.headline}
              </h2>
              <p className={`text-base md:text-lg leading-relaxed ${subtleTextColor(card.color)}`}>
                {card.body}
              </p>
              {card.stat && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2">
                  <span className={`text-sm font-semibold ${textColor(card.color)}`}>
                    {card.stat}
                  </span>
                </div>
              )}
            </div>

            {/* Branding */}
            <div className="flex items-center justify-between">
              <span className={`text-xs ${subtleTextColor(card.color)} opacity-50`}>
                joinclearcareer.com/wrapped
              </span>
              <span className={`text-xs font-medium ${subtleTextColor(card.color)}`}>
                ClearCareer
              </span>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
            disabled={activeCard === 0}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-default cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            onClick={() => setActiveCard(Math.min(result.cards.length - 1, activeCard + 1))}
            disabled={activeCard === result.cards.length - 1}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-default cursor-pointer"
          >
            Next
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Share */}
      <ShareToolbar
        shareUrl={shareUrl}
        shareText={`"${result.cards[0].headline}" - my career in 5 cards. Get yours:`}
        captureTargetId="wrapped-share-card"
        downloadFileName={`career-card-${activeCard + 1}-${resultId}.png`}
      />

      {/* CTA */}
      {!isOwner && (
        <div className="text-center mt-8 p-6 rounded-2xl bg-[#EFF5FF] border border-[#0161EF]/10">
          <h3 className="text-lg font-semibold text-[#030620]">What's your career story?</h3>
          <p className="text-sm text-[#6b7280] mt-1 mb-4">Upload your resume and get 5 shareable career insight cards.</p>
          <a href="/wrapped/five-cards" className="inline-flex items-center justify-center rounded-lg bg-[#0161EF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0450c8]">
            Get My 5 Cards
          </a>
        </div>
      )}
    </div>
  );
}
