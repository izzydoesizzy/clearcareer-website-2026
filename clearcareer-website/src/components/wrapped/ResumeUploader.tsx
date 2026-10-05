import { useState, useRef, useCallback } from "react";
import type { WrappedTool } from "../../lib/wrapped/types";

interface Props {
  tool: WrappedTool;
  toolLabel: string;
}

type Step = "input" | "details" | "loading" | "error";

export default function ResumeUploader({ tool, toolLabel }: Props) {
  const [step, setStep] = useState<Step>("input");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isWorth = tool === "worth";

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const text = await file.text();
      setResumeText(text);
    } else {
      const buffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setResumeText(`__FILE__:${file.name}:${base64}`);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  const handleContinueToDetails = () => {
    if (!resumeText.trim()) {
      setError("Please upload a resume or paste your resume text.");
      return;
    }
    setError("");
    setStep("details");
  };

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (isWorth && !location.trim()) {
      setError("Please enter your city and country.");
      return;
    }

    setError("");
    setStep("loading");

    try {
      const body: Record<string, string> = { tool, resumeText, email };
      if (location) body.location = location;
      if (currentSalary) body.currentSalary = currentSalary;
      if (honeypot) body.website = honeypot;

      const res = await fetch("/wrapped/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed. Please try again.");
      }

      const data = await res.json();
      window.location.href = `/wrapped/${tool}/${data.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("details");
    }
  };

  // ── Loading State ──
  if (step === "loading") {
    return <AnalysisLoader toolLabel={toolLabel} />;
  }

  // ── Details Step (email + location + optional salary) ──
  if (step === "details") {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF5FF] px-4 py-1.5 text-sm font-medium text-[#0161EF] mb-4">
              Resume received
            </div>
            <h3 className="text-xl font-semibold text-[#030620]">
              {isWorth ? "A few details for your report" : "Where should we send your results?"}
            </h3>
            <p className="text-[#6b7280] mt-2 text-sm">
              {isWorth
                ? "We need your location for accurate salary data."
                : `We'll email you a link so you can revisit your ${toolLabel} anytime.`}
            </p>
          </div>

          <div className="space-y-4">
            {/* Location (Worth only, required) */}
            {isWorth && (
              <div>
                <label className="block text-sm font-medium text-[#030620] mb-1.5">
                  Your location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Toronto, Canada"
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base focus:border-[#0161EF] focus:ring-2 focus:ring-[#0161EF]/20 outline-none transition-all"
                  autoFocus={isWorth}
                />
                <p className="text-xs text-[#9ca3af] mt-1">City, state/province, and country</p>
              </div>
            )}

            {/* Current salary (Worth only, optional) */}
            {isWorth && (
              <div>
                <label className="block text-sm font-medium text-[#030620] mb-1.5">
                  Current salary <span className="text-[#9ca3af]">(optional)</span>
                </label>
                <input
                  type="text"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                  placeholder="e.g. $95,000"
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base focus:border-[#0161EF] focus:ring-2 focus:ring-[#0161EF]/20 outline-none transition-all"
                />
                <p className="text-xs text-[#9ca3af] mt-1">If provided, we'll show how your pay compares to market rates</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#030620] mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="you@email.com"
                className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base focus:border-[#0161EF] focus:ring-2 focus:ring-[#0161EF]/20 outline-none transition-all"
                autoFocus={!isWorth}
              />
              <p className="text-xs text-[#9ca3af] mt-1">We'll send you a link to revisit your results</p>
            </div>

            {/* Honeypot */}
            <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off" tabIndex={-1}
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }} />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <p className="text-xs text-[#9ca3af]">Plus weekly career tips from ClearCareer. Unsubscribe anytime.</p>

            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-[#0161EF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0450c8] cursor-pointer"
            >
              Reveal My {toolLabel}
            </button>

            <button
              onClick={() => setStep("input")}
              className="w-full text-sm text-[#6b7280] hover:text-[#0161EF] transition-colors cursor-pointer"
            >
              Back to resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Input Step ──
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-8">
        {/* Toggle */}
        <div className="flex rounded-lg bg-[#f3f4f6] p-1 mb-6">
          <button
            onClick={() => setInputMode("upload")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all cursor-pointer ${
              inputMode === "upload"
                ? "bg-white text-[#030620] shadow-sm"
                : "text-[#6b7280] hover:text-[#030620]"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setInputMode("paste")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all cursor-pointer ${
              inputMode === "paste"
                ? "bg-white text-[#030620] shadow-sm"
                : "text-[#6b7280] hover:text-[#030620]"
            }`}
          >
            Paste Text
          </button>
        </div>

        {inputMode === "upload" ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#e5e7eb] rounded-xl p-10 text-center cursor-pointer transition-all hover:border-[#0161EF] hover:bg-[#EFF5FF]/30"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md"
              onChange={handleFileChange}
              className="hidden"
            />
            {fileName ? (
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF5FF] px-4 py-2 text-sm font-medium text-[#0161EF] mb-2">
                  {fileName}
                </div>
                <p className="text-sm text-[#6b7280]">Click or drop to replace</p>
              </div>
            ) : (
              <div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF5FF]">
                  <svg className="h-6 w-6 text-[#0161EF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-[#030620] font-medium">Drop your resume here</p>
                <p className="text-sm text-[#6b7280] mt-1">PDF, DOCX, or TXT</p>
              </div>
            )}
          </div>
        ) : (
          <textarea
            value={resumeText.startsWith("__FILE__") ? "" : resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            rows={10}
            className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm leading-relaxed resize-none focus:border-[#0161EF] focus:ring-2 focus:ring-[#0161EF]/20 outline-none transition-all"
          />
        )}

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={handleContinueToDetails}
          disabled={!resumeText.trim()}
          className="mt-6 w-full rounded-lg bg-[#0161EF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0450c8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Continue
        </button>

        <p className="mt-4 text-center text-xs text-[#6b7280]">
          Your resume is analyzed by AI and never stored or shared. We only save your results.
        </p>
      </div>
    </div>
  );
}

// ── Inline Loading Component ──

function AnalysisLoader({ toolLabel }: { toolLabel: string }) {
  const messages = [
    "Reading your resume...",
    "Analyzing your career trajectory...",
    "Finding hidden patterns...",
    "Generating your results...",
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-12 text-center">
        <div className="mx-auto mb-6 h-16 w-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-[#EFF5FF]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0161EF] animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-[#030620] mb-2">
          Building your {toolLabel}...
        </h3>
        <div className="space-y-1">
          {messages.map((msg, i) => (
            <p
              key={msg}
              className="text-sm text-[#6b7280] animate-pulse"
              style={{ animationDelay: `${i * 1.5}s`, animationDuration: "3s" }}
            >
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
