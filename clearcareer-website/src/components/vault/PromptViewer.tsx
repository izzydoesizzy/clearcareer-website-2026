import { useState } from "react";

interface Prompt {
  title: string;
  description: string;
  bestWith?: string;
  howToUse?: string;
  steps: { label?: string; instruction?: string; code: string; variables?: string }[];
}

interface Category {
  title: string;
  description: string;
  prompts: Prompt[];
}

function parseMarkdown(md: string): Category {
  const lines = md.split("\n");
  let catTitle = "";
  let catDesc = "";
  const prompts: Prompt[] = [];
  let current: Prompt | null = null;
  let inCode = false;
  let codeBuffer = "";
  let currentStepLabel = "";
  let currentStepInstruction = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (inCode) {
      if (line === "```") {
        inCode = false;
        if (current) {
          current.steps.push({
            label: currentStepLabel || undefined,
            instruction: currentStepInstruction || undefined,
            code: codeBuffer.trim(),
          });
        }
        codeBuffer = "";
        currentStepLabel = "";
        currentStepInstruction = "";
      } else {
        codeBuffer += line + "\n";
      }
      continue;
    }

    if (line.startsWith("```")) {
      inCode = true;
      codeBuffer = "";
      continue;
    }

    // Category title
    if (line.startsWith("# ") && !catTitle) {
      catTitle = line.slice(2).trim();
      continue;
    }

    // Category description (first non-empty line after title)
    if (catTitle && !catDesc && line.trim() && !line.startsWith("#") && !line.startsWith("---")) {
      catDesc = line.trim();
      continue;
    }

    // Prompt title
    if (line.startsWith("## ")) {
      if (current) prompts.push(current);
      current = { title: line.slice(3).trim(), description: "", steps: [] };
      continue;
    }

    // Step header
    if (line.startsWith("### ")) {
      currentStepLabel = line.slice(4).trim();
      continue;
    }

    if (!current) continue;

    // Metadata
    if (line.startsWith("**What it does:**")) {
      current.description = line.replace("**What it does:**", "").trim();
    } else if (line.startsWith("**Best with:**")) {
      current.bestWith = line.replace("**Best with:**", "").trim();
    } else if (line.startsWith("**How to use:**")) {
      // Gather multi-line how to use
      let howTo = "";
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith("**") || lines[j].startsWith("##") || lines[j].startsWith("```") || lines[j] === "---") break;
        if (lines[j].trim()) howTo += lines[j].trim() + "\n";
      }
      current.howToUse = howTo.trim();
    } else if (line.startsWith("**Variables to replace:**") && current.steps.length > 0) {
      current.steps[current.steps.length - 1].variables = line.replace("**Variables to replace:**", "").trim();
    } else if (!line.startsWith("**") && !line.startsWith("---") && line.trim() && currentStepLabel && !current.steps.some(s => s.label === currentStepLabel)) {
      // Step instruction text
      if (!currentStepInstruction && line.trim()) {
        currentStepInstruction = line.trim();
      }
    }
  }

  if (current) prompts.push(current);

  return { title: catTitle, description: catDesc, prompts };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
        copied
          ? "bg-green-100 text-green-700"
          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
      }`}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <h3 className="font-semibold text-navy">{prompt.title}</h3>
          {prompt.description && (
            <p className="mt-0.5 text-sm text-gray-500">{prompt.description}</p>
          )}
        </div>
        <div className="ml-4 flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            {prompt.steps.length} {prompt.steps.length === 1 ? "prompt" : "prompts"}
          </span>
          <svg
            className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4">
          {prompt.bestWith && (
            <p className="mb-3 text-xs text-gray-500">
              <span className="font-semibold">Best with:</span> {prompt.bestWith}
            </p>
          )}
          {prompt.howToUse && (
            <p className="mb-4 text-xs text-gray-500 whitespace-pre-line">
              <span className="font-semibold">How to use:</span>{"\n"}{prompt.howToUse}
            </p>
          )}

          {prompt.steps.map((step, i) => (
            <div key={i} className="mt-4 first:mt-0">
              {step.label && (
                <p className="mb-2 text-sm font-semibold text-navy">{step.label}</p>
              )}
              {step.instruction && (
                <p className="mb-2 text-xs text-gray-500">{step.instruction}</p>
              )}
              <div className="relative rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                  <span className="text-xs font-medium text-gray-400">Prompt</span>
                  <CopyButton text={step.code} />
                </div>
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap font-mono">
                  {step.code}
                </pre>
              </div>
              {step.variables && (
                <p className="mt-2 text-xs text-gray-500">
                  <span className="font-semibold">Replace:</span> {step.variables}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PromptViewer({ files }: { files: { filename: string; content: string }[] }) {
  const categories = files.map((f) => ({
    ...parseMarkdown(f.content),
    filename: f.filename,
  }));

  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat, i) => (
          <button
            key={cat.filename}
            onClick={() => setActiveTab(i)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              i === activeTab
                ? "bg-blue text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.title} ({cat.prompts.length})
          </button>
        ))}
      </div>

      {/* Active category */}
      <div>
        <p className="mb-6 text-sm text-gray-500">{active.description}</p>
        <div className="space-y-3">
          {active.prompts.map((prompt) => (
            <PromptCard key={prompt.title} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
