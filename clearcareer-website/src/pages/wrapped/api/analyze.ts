import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { nanoid } from "nanoid";
import { parseResume, validateResumeText } from "../../../lib/wrapped/resume-parser";
import { getPrompt, getModelForTool } from "../../../lib/wrapped/prompts";
import { saveResult } from "../../../lib/wrapped/storage";
import type { WrappedTool, ToolResult } from "../../../lib/wrapped/types";

export const prerender = false;

const VALID_TOOLS: WrappedTool[] = ["career-dna", "roast", "worth", "five-cards"];
const MAX_TEXT_LENGTH = 8_000;

// Simple in-memory rate limiter: email:tool → timestamp
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 24 * 60 * 60 * 1000; // 24 hours

function checkRateLimit(email: string, tool: string): boolean {
  const key = `${email.toLowerCase()}:${tool}`;
  const lastUsed = rateLimitMap.get(key);
  if (lastUsed && Date.now() - lastUsed < RATE_LIMIT_MS) return false;
  rateLimitMap.set(key, Date.now());
  return true;
}

function truncateText(text: string): string {
  // Strip excessive whitespace
  let cleaned = text.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+/g, " ").trim();
  if (cleaned.length > MAX_TEXT_LENGTH) {
    cleaned = cleaned.slice(0, MAX_TEXT_LENGTH);
  }
  return cleaned;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { tool, resumeText, email, location, currentSalary, website: honeypot } = body;

    // Honeypot: bots fill this hidden field, real users don't
    if (honeypot) {
      return Response.json({ id: "ok", tool, result: {} }, { status: 200 });
    }

    if (!VALID_TOOLS.includes(tool)) {
      return Response.json({ error: "Invalid tool type." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Valid email required." }, { status: 400 });
    }

    // Rate limit
    if (!checkRateLimit(email, tool)) {
      return Response.json(
        { error: `You've already generated your ${tool.replace("-", " ")} today. Come back tomorrow or try a different tool.` },
        { status: 429 }
      );
    }

    // Handle file-encoded resumes (base64 from upload)
    let text = resumeText;
    if (typeof text === "string" && text.startsWith("__FILE__:")) {
      const parts = text.split(":");
      const fileName = parts[1];
      const base64 = parts.slice(2).join(":");
      const buffer = Buffer.from(base64, "base64");

      const blob = new Blob([buffer]);
      const file = new File([blob], fileName);
      text = await parseResume(file);
    }

    // Truncate to reduce token usage
    text = truncateText(text);

    // Validate resume text
    const validation = validateResumeText(text);
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const systemPrompt = getPrompt(tool as WrappedTool);
    const model = getModelForTool(tool as WrappedTool);

    const apiKey = import.meta.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "AI service not configured." }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    // Build user message with optional context
    let userMessage = `Here is my resume:\n\n${text}`;
    if (location) userMessage += `\n\nMy location: ${location}`;
    if (currentSalary) userMessage += `\nMy current salary: ${currentSalary}`;

    const message = await client.messages.create({
      model,
      max_tokens: tool === "worth" ? 3500 : 1500,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      system: systemPrompt,
    });

    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    let result: ToolResult;
    try {
      const jsonStr = responseText.replace(/```json?\n?/g, "").replace(/```\n?/g, "").trim();
      result = JSON.parse(jsonStr);
    } catch {
      return Response.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    const id = nanoid(16);
    await saveResult(id, tool as WrappedTool, result, email);

    return Response.json({ id, tool, result });
  } catch (err) {
    console.error("Wrapped analysis error:", err);
    return Response.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
};
