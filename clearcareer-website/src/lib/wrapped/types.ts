// ── Tool Types ──

export type WrappedTool = "career-dna" | "roast" | "worth" | "five-cards";

// ── Career DNA ──

export interface CareerDNAResult {
  archetype: {
    name: string;
    tagline: string;
    description: string;
  };
  superpowers: Array<{
    name: string;
    evidence: string;
    strength: number; // 1-10
  }>;
  hiddenPattern: {
    insight: string;
    evidence: string;
  };
  careerArc: {
    summary: string;
    direction: "ascending" | "pivoting" | "deepening" | "launching";
  };
  rarityScore: string;
}

// ── Roast My Resume ──

export interface RoastResult {
  roasts: Array<{
    text: string;
    severity: "mild" | "medium" | "savage";
  }>;
  grade: {
    letter: string;
    subtitle: string;
  };
  redemption: {
    strength: string;
    encouragement: string;
  };
}

// ── What You're Actually Worth ──

export interface WorthResult {
  anchorValue: number;
  currency: string;
  userLocation: string; // the location they entered, e.g. "Toronto, Canada"
  titleGap: {
    currentTitle: string;
    recommendedTitle: string;
    levelDifference: number; // 0 = match, 1+ = undertitled, negative = overtitled
    summary: string;
  };
  payGap?: {
    currentSalary: number;
    gapAmount: string;
    verdict: "underpaid" | "fairly-paid" | "well-paid";
  };
  localSalary: Array<{
    title: string;
    low: number;
    median: number;
    high: number;
    isCurrent?: boolean;
    isRecommended?: boolean;
    source: string;
    sourceUrl: string;
  }>;
  salaryByLocation: Array<{
    location: string;
    low: number;
    median: number;
    high: number;
    source: string;
    sourceUrl: string;
    isHighest?: boolean;
  }>;
  salaryByTitle: Array<{
    title: string;
    median: number;
    range: string;
    isCurrent?: boolean;
    isRecommended?: boolean;
    source: string;
    sourceUrl: string;
  }>;
  alternativeTitles: Array<{
    title: string;
    fitReason: string;
    medianSalary: number;
    linkedinSearchUrl: string;
    booleanQuery: string;
  }>;
  topCompanies: Array<{
    name: string;
    whyTheyPay: string;
  }>;
  sources: Array<{
    name: string;
    url: string;
    note: string;
  }>;
  methodology: string;
}

// ── Career in 5 Cards ──

export interface FiveCardsResult {
  cards: Array<{
    number: number;
    headline: string;
    body: string;
    stat?: string;
    color: string;
  }>;
}

// ── Shared ──

export type ToolResult = CareerDNAResult | RoastResult | WorthResult | FiveCardsResult;

export interface WrappedAnalysis {
  id: string;
  tool: WrappedTool;
  result: ToolResult;
  email: string;
  createdAt: string;
}

export interface AnalyzeRequest {
  tool: WrappedTool;
  resumeText: string;
  email: string;
}

export interface AnalyzeResponse {
  id: string;
  tool: WrappedTool;
  result: ToolResult;
}
