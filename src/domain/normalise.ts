/**
 * Answer comparison for typed exercises.
 *
 * Rules (deliberately conservative):
 * - case-insensitive
 * - curly quotes / dashes folded to ASCII
 * - surrounding whitespace and trailing sentence punctuation ignored
 * - internal whitespace collapsed
 * - contractions are NOT stripped, so "we'll" never matches "well"
 *
 * Anything beyond that must be listed explicitly in `accepted`.
 */
export function normaliseAnswer(input: string): string {
  return input
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc\u00b4`]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .replace(/[.!?,;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isAcceptedAnswer(input: string, accepted: readonly string[]): boolean {
  const candidate = normaliseAnswer(input);
  if (candidate === '') return false;
  return accepted.some((answer) => normaliseAnswer(answer) === candidate);
}

/** Shows the answer key in a predictable, readable form. */
export function formatAnswerKey(accepted: readonly string[]): string {
  return accepted.join(' / ');
}
