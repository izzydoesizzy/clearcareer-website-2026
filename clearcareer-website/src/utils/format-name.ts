/**
 * Converts a full name to "First L." format for privacy.
 * "Adam Kastor" → "Adam K."
 * "Alex" → "Alex"
 */
export function formatName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return name;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
