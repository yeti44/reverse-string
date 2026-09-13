/**
 * Reverse a string by user-perceived characters (grapheme clusters) so that
 * multi-code-unit characters such as emoji and combined accents are not broken
 * apart. Falls back to code-point reversal when Intl.Segmenter is unavailable.
 */
export function reverseString(input: string): string {
  const segments = splitGraphemes(input);
  return segments.reverse().join("");
}

function splitGraphemes(input: string): string[] {
  const SegmenterCtor = (
    Intl as unknown as { Segmenter?: typeof Intl.Segmenter }
  ).Segmenter;

  if (typeof SegmenterCtor === "function") {
    const segmenter = new SegmenterCtor(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(input), (s) => s.segment);
  }

  // Fallback: iterate by Unicode code points (handles surrogate pairs).
  return Array.from(input);
}
