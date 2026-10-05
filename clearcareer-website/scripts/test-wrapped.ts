/**
 * Test script: Run all 4 Wrapped prompts against Izzy's resume.
 * Usage: npx tsx scripts/test-wrapped.ts
 */
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

const RESUME_PATH = "/Users/gallifrey/madscience/izzy-master-profile/job-search/master-resume.md";

const PROMPTS: Record<string, string> = {
  "career-dna": `You are a career analyst creating a "Career DNA" profile. Analyze this resume and produce a JSON object with exactly this structure:

{
  "archetype": {
    "name": "The [Name]",
    "tagline": "A short punchy tagline (under 10 words)",
    "description": "2-3 sentences explaining this archetype and why it fits"
  },
  "superpowers": [
    {
      "name": "Skill name (2-3 words)",
      "evidence": "One sentence citing specific resume evidence",
      "strength": 8
    }
  ],
  "hiddenPattern": {
    "insight": "Something surprising the person probably hasn't noticed about their career trajectory",
    "evidence": "The resume evidence that reveals this pattern"
  },
  "careerArc": {
    "summary": "One sentence describing their career trajectory",
    "direction": "ascending"
  },
  "rarityScore": "Your combination of X + Y + Z is found in roughly N% of professionals"
}

Rules:
- The archetype name must be creative and memorable (e.g., "The Bridge Builder", "The Quiet Disruptor", "The Scaling Engine", "The Culture Architect", "The Revenue Whisperer")
- Superpowers: exactly 3 items, each with a strength score from 1-10
- Hidden pattern: be genuinely insightful, not generic. Find something that connects dots across multiple roles
- Career arc direction: one of "ascending", "pivoting", "deepening", or "launching"
- Rarity score: make it feel specific and data-informed, even if estimated
- Be bold and specific, not vague or generic
- Write like a sharp career coach, not a corporate HR bot
- Return ONLY valid JSON, no markdown fences, no explanation`,

  "roast": `You are a brutally honest (but secretly caring) resume roaster. Think of a comedy roast: sharp, funny, specific, but ultimately affectionate. Analyze this resume and produce a JSON object with exactly this structure:

{
  "roasts": [
    {
      "text": "A specific, funny observation about something in the resume",
      "severity": "medium"
    }
  ],
  "grade": {
    "letter": "B-",
    "subtitle": "A funny 3-6 word subtitle for the grade"
  },
  "redemption": {
    "strength": "The person's genuine strongest quality, stated sincerely",
    "encouragement": "A warm, real sentence of encouragement that shows you actually read their resume"
  }
}

Rules:
- Exactly 5 roasts
- Severity: 2 mild, 2 medium, 1 savage
- Roasts must be SPECIFIC to this resume, not generic resume advice
- Reference actual content from the resume (job titles, companies, phrasing, gaps, buzzwords)
- Be genuinely funny, not mean-spirited. The person should laugh, not cry
- Grade subtitle examples: "Participation Trophy Energy", "LinkedIn Lurker Status", "Senior Vice President of Buzzwords", "Almost Hired Material"
- The redemption must be sincere and specific. Find something genuinely impressive in their background
- Return ONLY valid JSON, no markdown fences, no explanation`,

  "worth": `You are a compensation analyst. Analyze this resume and estimate the person's market value. Produce a JSON object with exactly this structure:

{
  "marketRange": {
    "low": 85000,
    "anchor": 105000,
    "stretch": 130000,
    "currency": "USD"
  },
  "titleVerdict": {
    "current": "Their current/most recent title from the resume",
    "actual": "What their title should be based on what they actually do",
    "inflationScore": 0
  },
  "gap": {
    "direction": "underpaid",
    "amount": "$15,000-25,000"
  },
  "topCompanies": [
    {
      "name": "Company Name",
      "whyTheyPay": "One sentence on why this company pays well for this skill set"
    }
  ],
  "methodology": "One sentence explaining the basis of your estimate"
}

Rules:
- Base salary estimates on the person's most recent role, seniority, industry, and skillset
- Assume a major US metro unless the resume indicates otherwise
- inflationScore: -2 (severely undertitled) to +2 (severely overtitled), 0 = accurate title
- gap.direction: "underpaid" if most people with this profile earn more, "fairly-paid" if typical, "well-paid" if above average
- gap.amount: express as a dollar range
- topCompanies: exactly 3 companies known to pay well for this person's skill profile
- Be specific and confident in your estimates. This is entertainment, not financial advice
- Return ONLY valid JSON, no markdown fences, no explanation`,

  "five-cards": `You are a career storyteller creating a "Year in Review" style card deck. Analyze this resume and produce 5 punchy insight cards. Return a JSON object with exactly this structure:

{
  "cards": [
    {
      "number": 1,
      "headline": "Punchy headline (under 8 words)",
      "body": "2-3 sentences of insight, specific to this person",
      "stat": "A specific number or percentage (optional but preferred)",
      "color": "#0161EF"
    }
  ]
}

The 5 cards should follow this sequence:
1. "Your career so far" - total years, industries, trajectory overview
2. "Your superpower" - the single most distinctive skill or trait
3. "Your hidden advantage" - something others might not notice
4. "Your biggest risk" - the main career vulnerability right now
5. "Your next move" - a bold, specific prediction or recommendation

Rules:
- Each headline must be punchy and memorable (think Spotify Wrapped energy)
- Stats should feel specific: "12 years", "4 industries", "top 8%", not round approximations
- Body text: conversational, direct, zero corporate speak
- Colors must be from this palette: "#0161EF" (blue), "#030620" (navy), "#059669" (green), "#D97706" (amber), "#06b6d4" (teal)
- Each card gets a different color
- Be bold and specific. Generic advice is boring
- Return ONLY valid JSON, no markdown fences, no explanation`,
};

async function main() {
  const resume = readFileSync(RESUME_PATH, "utf-8");
  const client = new Anthropic();

  mkdirSync("scripts/test-output", { recursive: true });

  const tools = Object.keys(PROMPTS);

  // Run all 4 in parallel
  const results = await Promise.all(
    tools.map(async (tool) => {
      console.log(`⏳ Running ${tool}...`);
      const start = Date.now();

      const message = await client.messages.create({
        model: "claude-sonnet-4-6-20250514",
        max_tokens: 2000,
        system: PROMPTS[tool],
        messages: [{ role: "user", content: `Here is my resume:\n\n${resume}` }],
      });

      const text = message.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("");

      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`✅ ${tool} done (${elapsed}s)`);

      // Parse and pretty-print
      const jsonStr = text.replace(/```json?\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(jsonStr);

      return { tool, result: parsed, raw: text, elapsed };
    })
  );

  // Save individual results
  for (const { tool, result } of results) {
    writeFileSync(
      `scripts/test-output/${tool}.json`,
      JSON.stringify(result, null, 2)
    );
  }

  // Save combined summary
  const summary = results.map(({ tool, result, elapsed }) => {
    return `\n${"=".repeat(60)}\n${tool.toUpperCase()} (${elapsed}s)\n${"=".repeat(60)}\n${JSON.stringify(result, null, 2)}`;
  }).join("\n");

  writeFileSync("scripts/test-output/all-results.txt", summary);

  console.log("\n📁 Results saved to scripts/test-output/");
  console.log("   - career-dna.json");
  console.log("   - roast.json");
  console.log("   - worth.json");
  console.log("   - five-cards.json");
  console.log("   - all-results.txt (combined)");
}

main().catch(console.error);
