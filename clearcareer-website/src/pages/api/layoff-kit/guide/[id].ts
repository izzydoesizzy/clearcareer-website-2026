import type { APIRoute } from "astro";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const prerender = false;

// Valid guide IDs (prevent directory traversal)
const ID_TO_FILE: Record<string, string> = {
  "01-severance-negotiation": "01-severance-negotiation-playbook.md",
  "02-tax-planning": "02-tax-planning-strategies.md",
  "03-benefits-transition": "03-benefits-transition-guide.md",
  "04-financial-runway": "04-financial-runway-worksheet.md",
  "05-linkedin-optimization": "05-linkedin-optimization-masterclass.md",
  "06-salary-negotiation": "06-salary-negotiation-scripts.md",
  "07-government-support": "07-government-support-directory.md",
  "08-reference-strategy": "08-reference-strategy-guide.md",
  "09-non-compete-audit": "09-non-compete-audit-checklist.md",
  "10-job-search-plan": "10-job-search-launch-plan.md",
  "11-mental-health": "11-mental-health-resilience-guide.md",
};

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id || !ID_TO_FILE[id]) {
    return new Response(JSON.stringify({ error: "Invalid guide ID" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Resolve guide directory relative to project root
  const guideDir = join(process.cwd(), "src", "data", "layoff-kit-guides");
  const filePath = join(guideDir, ID_TO_FILE[id]);

  if (!existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "Guide not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const markdown = readFileSync(filePath, "utf-8");
  return new Response(JSON.stringify({ markdown }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
