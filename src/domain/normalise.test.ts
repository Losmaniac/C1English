import { describe, expect, it } from 'vitest';
import { formatAnswerKey, isAcceptedAnswer, normaliseAnswer } from './normalise';

describe('normaliseAnswer', () => {
  it('ignores case, surrounding whitespace and trailing punctuation', () => {
    expect(normaliseAnswer('  Hadn\u2019t   Spotted. ')).toBe("hadn't spotted");
  });

  it('folds curly apostrophes and dashes', () => {
    expect(normaliseAnswer('\u201cisn\u2019t\u201d')).toBe("isn't");
    expect(normaliseAnswer('a\u2014b')).toBe('a-b');
  });

  it('keeps contractions distinct', () => {
    expect(normaliseAnswer("we'll")).not.toBe(normaliseAnswer('well'));
  });

  it('removes wrapping quotes only', () => {
    expect(normaliseAnswer('"mitigate"')).toBe('mitigate');
  });
});

describe('isAcceptedAnswer', () => {
  it('accepts any listed alternative regardless of case and punctuation', () => {
    expect(isAcceptedAnswer('  Is Reported. ', ['is reported'])).toBe(true);
    expect(isAcceptedAnswer('had not spotted', ["hadn't spotted", 'had not spotted'])).toBe(true);
  });

  it('rejects wrong answers and empty input', () => {
    expect(isAcceptedAnswer('mitigate', ['militate'])).toBe(false);
    expect(isAcceptedAnswer('   ', ['militate'])).toBe(false);
    expect(isAcceptedAnswer('', [])).toBe(false);
  });
});

describe('formatAnswerKey', () => {
  it('shows every accepted answer', () => {
    expect(formatAnswerKey(['raised', 'voiced'])).toBe('raised / voiced');
  });
});
