export type BlogCategory =
  | "job-search-strategy"
  | "resume-linkedin"
  | "interviews"
  | "salary-negotiation"
  | "ai-tools-mindset"
  | "financial-planning"
  | "announcement";

interface CategoryMeta {
  label: string;
  /** SVG path data for a 24x24 viewBox icon */
  iconPath: string;
}

export const categoryMeta: Record<BlogCategory, CategoryMeta> = {
  "job-search-strategy": {
    label: "Job Search",
    // Compass icon
    iconPath:
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1.5-5.5L14 11l-3.5-1.5L9 13l1.5-3.5zm1.5-.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  },
  "resume-linkedin": {
    label: "Resume & LinkedIn",
    // Document icon
    iconPath:
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-6h8v2H8v-2zm0-4h8v2H8v-2z",
  },
  interviews: {
    label: "Interviews",
    // Speech bubbles icon
    iconPath:
      "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10zM8 10h8v1.5H8V10zm0-3h8v1.5H8V7z",
  },
  "salary-negotiation": {
    label: "Salary",
    // Dollar sign icon
    iconPath:
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13v1.08c1.12.22 2 .94 2 2.17h-1.75c0-.6-.55-1.08-1.25-1.08-.7 0-1.25.47-1.25 1.08 0 .6.56 1.08 1.25 1.08 1.52 0 2.75 1.01 2.75 2.25 0 1.23-.88 1.95-2 2.17V17h-1v-1.25c-1.12-.22-2-.94-2-2.17h1.75c0 .6.55 1.08 1.25 1.08.7 0 1.25-.47 1.25-1.08 0-.6-.56-1.08-1.25-1.08C10.73 12.5 9.5 11.49 9.5 10.25c0-1.23.88-1.95 2-2.17V7h1z",
  },
  "ai-tools-mindset": {
    label: "AI & Mindset",
    // Sparkle icon
    iconPath:
      "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2zm0 5.2L10.8 11 7.2 12l3.6 1L12 16.8 13.2 13l3.6-1-3.6-1L12 7.2z",
  },
  "financial-planning": {
    label: "Financial Planning",
    // Wallet/money icon
    iconPath:
      "M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9zm-9-2h10V8H12v8zm4-2.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  },
  announcement: {
    label: "News",
    // Megaphone icon
    iconPath:
      "M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39l1.2-1.6c-.99-.74-2.24-1.68-3.2-2.4l-1.2 1.61zM20.4 5.6L19.2 4c-.99.74-2.24 1.68-3.2 2.4l1.2 1.6c.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1l5 5V4L5 9H4zm5.03 3.71L7 11.59V12.4l2.03 1.31zM15 3v2c2.76 0 5 2.24 5 5s-2.24 5-5 5v2c3.87 0 7-3.13 7-7s-3.13-7-7-7zm0 4v6c1.66 0 3-1.34 3-3s-1.34-3-3-3z",
  },
};

export function getCategoryMeta(category: string): CategoryMeta {
  return (
    categoryMeta[category as BlogCategory] ?? categoryMeta["announcement"]
  );
}
