import type { APIRoute } from "astro";
import { getResult } from "../../../lib/wrapped/storage";
import type { CareerDNAResult, RoastResult, WorthResult, FiveCardsResult } from "../../../lib/wrapped/types";

export const prerender = false;

/**
 * Dynamic OG image generation for wrapped results.
 * URL pattern: /wrapped/og/{tool}/{id}
 *
 * For now, generates a simple SVG-based OG image.
 * Can be upgraded to @vercel/og (satori) for richer rendering.
 */
export const GET: APIRoute = async ({ params }) => {
  const parts = (params.params || "").split("/");
  const tool = parts[0];
  const id = parts[1];

  if (!tool || !id) {
    return new Response("Not found", { status: 404 });
  }

  const analysis = await getResult(id);
  if (!analysis) {
    return new Response("Not found", { status: 404 });
  }

  let title = "Career Wrapped";
  let subtitle = "Discover your career insights";
  let accent = "#0161EF";

  switch (analysis.tool) {
    case "career-dna": {
      const r = analysis.result as CareerDNAResult;
      title = r.archetype.name;
      subtitle = r.archetype.tagline;
      accent = "#0161EF";
      break;
    }
    case "roast": {
      const r = analysis.result as RoastResult;
      title = `Grade: ${r.grade.letter}`;
      subtitle = r.grade.subtitle;
      accent = "#D97706";
      break;
    }
    case "worth": {
      const r = analysis.result as WorthResult;
      title = new Intl.NumberFormat("en-US", { style: "currency", currency: r.currency, maximumFractionDigits: 0 }).format(r.anchorValue);
      subtitle = r.titleGap.summary;
      accent = "#059669";
      break;
    }
    case "five-cards": {
      const r = analysis.result as FiveCardsResult;
      title = r.cards[0]?.headline || "Your Career in 5 Cards";
      subtitle = r.cards[0]?.body?.slice(0, 80) || "";
      accent = "#06b6d4";
      break;
    }
  }

  // Generate SVG-based OG image (1200x630)
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#030620" />
          <stop offset="100%" style="stop-color:#0a0e30" />
        </linearGradient>
        <clipPath id="rounded">
          <rect width="1200" height="630" rx="0" ry="0"/>
        </clipPath>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)" clip-path="url(#rounded)" />

      <!-- Accent circle (decorative) -->
      <circle cx="1000" cy="100" r="200" fill="${accent}" opacity="0.15" />
      <circle cx="200" cy="530" r="150" fill="${accent}" opacity="0.1" />

      <!-- Left accent bar -->
      <rect x="60" y="200" width="4" height="120" rx="2" fill="${accent}" />

      <!-- Top label -->
      <text x="80" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="${accent}" font-weight="600" letter-spacing="3">
        CAREER WRAPPED
      </text>

      <!-- Title -->
      <text x="80" y="260" font-family="Georgia, serif" font-size="56" fill="white" font-weight="700">
        ${escapeXml(title.length > 30 ? title.slice(0, 30) + "..." : title)}
      </text>

      <!-- Subtitle -->
      <text x="80" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#94a3b8">
        ${escapeXml(subtitle.length > 60 ? subtitle.slice(0, 60) + "..." : subtitle)}
      </text>

      <!-- CTA -->
      <text x="80" y="520" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#64748b">
        Get yours at joinclearcareer.com/wrapped
      </text>

      <!-- Brand -->
      <text x="80" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${accent}" font-weight="600">
        ClearCareer
      </text>
    </svg>
  `;

  // Convert SVG to PNG would require a canvas library.
  // For now, serve as SVG which works for OG on most platforms.
  // Upgrade to @vercel/og for PNG output in production.
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
