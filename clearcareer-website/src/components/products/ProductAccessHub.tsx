"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProductGuide } from "../../data/product-config";

interface ProductAccessHubProps {
  productName: string;
  productSlug: string;
  buyerName: string;
  buyerEmail: string;
  guides: ProductGuide[];
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-[#0161EF]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function ProductAccessHub({
  productName,
  productSlug,
  buyerName,
  buyerEmail,
  guides,
}: ProductAccessHubProps) {
  const [activeGuide, setActiveGuide] = useState(guides[0]?.id || "");
  const [guideContent, setGuideContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const cache = useRef<Record<string, string>>({});

  const loadGuide = useCallback(async (guideId: string) => {
    setActiveGuide(guideId);

    if (cache.current[guideId]) {
      setGuideContent({ ...cache.current });
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/products/${productSlug}/guide/${guideId}`
      );
      const data = await res.json();
      cache.current[guideId] = data.markdown;
      setGuideContent({ ...cache.current });
    } catch {
      cache.current[guideId] = "Failed to load guide. Please refresh and try again.";
      setGuideContent({ ...cache.current });
    }
    setLoading(false);
  }, [productSlug]);

  useEffect(() => {
    if (guides.length > 0) {
      loadGuide(guides[0].id);
    }
  }, [guides, loadGuide]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <a href="/" className="text-lg font-bold text-[#0161EF]">
              ClearCareer
            </a>
            <span className="ml-2 text-sm text-gray-500">{productName}</span>
          </div>
          <span className="text-sm text-gray-400">{buyerEmail}</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar (desktop) */}
        <nav className="hidden w-72 shrink-0 border-r border-gray-200 bg-white p-4 md:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Guides
          </p>
          <ul className="space-y-1">
            {guides.map((guide) => (
              <li key={guide.id}>
                <button
                  onClick={() => loadGuide(guide.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeGuide === guide.id
                      ? "bg-blue-50 font-medium text-[#0161EF]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{guide.icon}</span>
                  <span>{guide.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile dropdown */}
        <div className="w-full border-b border-gray-200 bg-white p-4 md:hidden">
          <select
            value={activeGuide}
            onChange={(e) => loadGuide(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {guides.map((guide) => (
              <option key={guide.id} value={guide.id}>
                {guide.icon} {guide.title}
              </option>
            ))}
          </select>
        </div>

        {/* Content area */}
        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0161EF]" />
              </div>
            ) : guideContent[activeGuide] ? (
              <MarkdownContent content={guideContent[activeGuide]} />
            ) : (
              <p className="py-20 text-center text-gray-400">
                Select a guide to get started.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
