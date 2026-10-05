import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Extract plain text from a resume file (PDF, DOCX, or plain text).
 */
export async function parseResume(
  file: File
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const data = await pdf(buffer);
    return data.text.trim();
  }

  if (name.endsWith(".docx") || name.endsWith(".doc")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  // Plain text (.txt, .md, or anything else)
  return new TextDecoder().decode(buffer).trim();
}

/**
 * Basic validation: ensure we got enough text to analyze.
 */
export function validateResumeText(text: string): { valid: boolean; error?: string } {
  if (!text || text.length < 100) {
    return { valid: false, error: "Resume text is too short. Please upload a complete resume." };
  }
  if (text.length > 50_000) {
    return { valid: false, error: "Resume text is too long. Please upload a standard resume (under 10 pages)." };
  }
  return { valid: true };
}
