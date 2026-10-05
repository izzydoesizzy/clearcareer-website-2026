import type { WrappedAnalysis, WrappedTool, ToolResult } from "./types";

/**
 * Simple in-memory storage for development.
 * TODO: Replace with Vercel KV or a database for production persistence.
 *
 * In a serverless environment (Vercel), this Map resets on cold starts.
 * For production, install @vercel/kv and swap the implementation.
 */

const store = new Map<string, WrappedAnalysis>();

export async function saveResult(
  id: string,
  tool: WrappedTool,
  result: ToolResult,
  email: string
): Promise<void> {
  const analysis: WrappedAnalysis = {
    id,
    tool,
    result,
    email,
    createdAt: new Date().toISOString(),
  };
  store.set(id, analysis);
}

export async function getResult(id: string): Promise<WrappedAnalysis | null> {
  return store.get(id) ?? null;
}
