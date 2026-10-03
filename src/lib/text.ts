/**
 * Copy is authored as indented multi-line template literals for readability.
 * Collapse the line breaks: to a space for Latin text, and to nothing for
 * Chinese (browsers would otherwise render a stray space between CJK glyphs).
 */
export function collapseLines<T>(value: T, joiner: " " | ""): T {
  if (typeof value === "string") return value.replace(/\s*\n\s*/g, joiner).trim() as T;
  if (Array.isArray(value)) return value.map((item) => collapseLines(item, joiner)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, collapseLines(item, joiner)]),
    ) as T;
  }
  return value;
}
