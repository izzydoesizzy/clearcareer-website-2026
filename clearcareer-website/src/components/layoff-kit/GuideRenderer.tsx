"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

// ── Helpers ──

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractH2s(markdown: string): { title: string; slug: string }[] {
  const matches = markdown.matchAll(/^## (.+)$/gm);
  return [...matches].map((m) => ({
    title: m[1],
    slug: slugify(m[1]),
  }));
}

// ── localStorage helpers for checkbox state ──

function getCheckboxState(guideId: string): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(`lsk-checks-${guideId}`);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCheckboxState(guideId: string, checked: Set<number>) {
  localStorage.setItem(`lsk-checks-${guideId}`, JSON.stringify([...checked]));
}

// ── Copy button ──

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium transition-all bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// ── Back to top button ──

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-navy text-white shadow-lg hover:bg-navy/80 transition-all flex items-center justify-center"
      aria-label="Back to top"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}

// ── SVG Icons ──

function InfoIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 text-blue flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}

// ── Table of Contents ──

function TableOfContents({
  headings,
}: {
  headings: { title: string; slug: string }[];
}) {
  if (headings.length === 0) return null;

  function scrollTo(slug: string) {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav className="mb-8 rounded-xl bg-gray-50 border border-gray-200 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Table of Contents
      </p>
      <ol className="space-y-1.5 list-decimal list-inside">
        {headings.map((h) => (
          <li key={h.slug} className="text-sm text-gray-500">
            <button
              onClick={() => scrollTo(h.slug)}
              className="text-sm text-gray-700 hover:text-blue transition-colors"
            >
              {h.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ── Main GuideRenderer ──

const PROSE_CLASSES =
  "prose prose-sm max-w-none prose-headings:font-semibold prose-h2:text-lg prose-h2:sm:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 prose-h3:text-base prose-a:text-blue prose-strong:text-gray-900 prose-li:text-gray-700 [&_li:has(>input[type=checkbox])]:list-none [&_li:has(>input[type=checkbox])]:ml-0 [&_li:has(>input[type=checkbox])]:pl-0";

export function GuideRenderer({
  guideId,
  markdown,
}: {
  guideId: string;
  markdown: string;
  onGuideComplete?: (guideId: string, isComplete: boolean) => void;
}) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const checkboxCounter = useRef(0);
  const headings = extractH2s(markdown);

  useEffect(() => {
    setCheckedItems(getCheckboxState(guideId));
  }, [guideId]);

  const toggleCheckbox = useCallback(
    (idx: number) => {
      setCheckedItems((prev) => {
        const next = new Set(prev);
        if (next.has(idx)) {
          next.delete(idx);
        } else {
          next.add(idx);
        }
        saveCheckboxState(guideId, next);
        return next;
      });
    },
    [guideId]
  );

  checkboxCounter.current = 0;

  return (
    <div>
      <TableOfContents headings={headings} />

      <div className={PROSE_CLASSES}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // ── H2 with anchor ID ──
            h2: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"h2">) => {
              const text =
                typeof children === "string"
                  ? children
                  : extractTextFromChildren(children);
              const slug = slugify(text);
              return (
                <h2 id={slug} className="scroll-mt-28" {...props}>
                  {children}
                </h2>
              );
            },

            // ── Action item callouts + blockquote styling ──
            p: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"p">) => {
              // Detect **Action:** paragraphs
              if (isActionItem(children)) {
                return (
                  <div className="not-prose my-4 flex gap-3 rounded-lg border-l-4 border-blue bg-blue-50 p-4">
                    <ArrowIcon />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {children}
                    </p>
                  </div>
                );
              }
              return <p {...props}>{children}</p>;
            },

            // ── Blockquotes with info icon ──
            blockquote: ({
              children,
            }: ComponentPropsWithoutRef<"blockquote">) => (
              <div className="not-prose my-4 flex gap-3 rounded-lg border-l-4 border-blue bg-blue-50 p-4">
                <InfoIcon />
                <div className="text-sm text-gray-700 leading-relaxed [&>p]:m-0">
                  {children}
                </div>
              </div>
            ),

            // ── Horizontal rules as spacers ──
            hr: () => <div className="my-6" aria-hidden="true" />,

            // ── Tables with better styling ──
            table: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"table">) => (
              <div className="not-prose my-6 overflow-x-auto rounded-lg border border-gray-200">
                <table
                  className="w-full text-sm text-left text-gray-700"
                  {...props}
                >
                  {children}
                </table>
              </div>
            ),
            thead: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"thead">) => (
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500" {...props}>
                {children}
              </thead>
            ),
            th: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"th">) => (
              <th className="px-4 py-3 font-semibold" {...props}>
                {children}
              </th>
            ),
            td: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"td">) => (
              <td className="px-4 py-3 border-t border-gray-100" {...props}>
                {children}
              </td>
            ),
            tr: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"tr">) => (
              <tr className="even:bg-gray-50/50" {...props}>
                {children}
              </tr>
            ),

            // ── Links ──
            a: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"a">) => (
              <a {...props} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),

            // ── Checkboxes ──
            input: ({
              type,
              ...props
            }: ComponentPropsWithoutRef<"input">) => {
              if (type === "checkbox") {
                const idx = checkboxCounter.current++;
                const isChecked = checkedItems.has(idx);
                return (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheckbox(idx)}
                    className="accent-blue w-4 h-4 cursor-pointer mr-1"
                  />
                );
              }
              return <input type={type} {...props} />;
            },

            // ── Code blocks with copy button ──
            code: ({
              children,
              className,
              ...props
            }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
              const isBlock =
                className || String(children).includes("\n");
              if (isBlock) {
                const text = String(children).replace(/\n$/, "");
                return (
                  <div className="relative group">
                    <CopyButton text={text} />
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </div>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({
              children,
              ...props
            }: ComponentPropsWithoutRef<"pre">) => (
              <pre className="relative" {...props}>
                {children}
              </pre>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>

      <BackToTop />
    </div>
  );
}

// ── Utilities ──

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractTextFromChildren(
      (children as { props: { children?: ReactNode } }).props.children || ""
    );
  }
  return String(children ?? "");
}

function isActionItem(children: ReactNode): boolean {
  if (!Array.isArray(children) && typeof children !== "object") return false;
  const arr = Array.isArray(children) ? children : [children];
  const first = arr[0];
  if (
    first &&
    typeof first === "object" &&
    "props" in first
  ) {
    const el = first as { type?: string; props?: { children?: ReactNode } };
    if (el.type === "strong" || (el.props && typeof el.props.children === "string" && el.props.children.startsWith("Action"))) {
      const text = extractTextFromChildren(first);
      return text.startsWith("Action:");
    }
  }
  return false;
}
