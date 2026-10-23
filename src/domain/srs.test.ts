import { describe, expect, it } from 'vitest';
import { DAY_MS, isLearned, isMastered, isReviewDue, scheduleReview } from './srs';
import type { ReviewState } from './types';

const NOW = new Date('2026-03-02T09:00:00.000Z');

function daysUntilDue(state: ReviewState): number {
  return Math.round((new Date(state.dueAt).getTime() - NOW.getTime()) / DAY_MS);
}

describe('scheduleReview', () => {
  it('schedules the first correct answer for tomorrow', () => {
    const state = scheduleReview('item-1', undefined, { correct: true }, NOW);
    expect(state.repetitions).toBe(1);
    expect(state.intervalDays).toBe(1);
    expect(daysUntilDue(state)).toBe(1);
    expect(state.ease).toBeCloseTo(2.6);
    expect(state.lapses).toBe(0);
    expect(state.lastOutcome).toBe('correct');
  });

  it('moves a second correct answer to three days', () => {
    const first = scheduleReview('item-1', undefined, { correct: true }, NOW);
    const second = scheduleReview('item-1', first, { correct: true }, NOW);
    expect(second.repetitions).toBe(2);
    expect(second.intervalDays).toBe(3);
    expect(daysUntilDue(second)).toBe(3);
  });

  it('multiplies the interval by ease from the third success', () => {
    const first = scheduleReview('item-1', undefined, { correct: true }, NOW);
    const second = scheduleReview('item-1', first, { correct: true }, NOW);
    const third = scheduleReview('item-1', second, { correct: true }, NOW);
    expect(third.repetitions).toBe(3);
    expect(third.intervalDays).toBe(8); // 3 days * 2.7 ease
    expect(third.ease).toBeCloseTo(2.8);
  });

  it('resets repetitions and records a lapse after a wrong answer', () => {
    const first = scheduleReview('item-1', undefined, { correct: true }, NOW);
    const second = scheduleReview('item-1', first, { correct: true }, NOW);
    const failed = scheduleReview('item-1', second, { correct: false }, NOW);
    expect(failed.repetitions).toBe(0);
    expect(failed.lapses).toBe(1);
    expect(failed.intervalDays).toBe(1);
    expect(failed.ease).toBeCloseTo(2.5);
    expect(failed.lastOutcome).toBe('incorrect');
  });

  it('halves the next interval when a hint was used', () => {
    const first = scheduleReview('item-1', undefined, { correct: true }, NOW);
    const second = scheduleReview('item-1', first, { correct: true }, NOW);
    const hinted = scheduleReview('item-1', second, { correct: true, usedHint: true }, NOW);
    expect(hinted.intervalDays).toBe(4); // 8 rounded down in half
    expect(hinted.ease).toBeCloseTo(2.7);
  });

  it('clamps corrupt prior values instead of producing wild intervals', () => {
    const corrupt = {
      itemId: 'item-1',
      dueAt: NOW.toISOString(),
      intervalDays: 99999,
      ease: 99,
      repetitions: 4,
      lapses: 0,
      lastOutcome: 'correct',
      lastReviewedAt: NOW.toISOString(),
    } satisfies ReviewState;
    const state = scheduleReview('item-1', corrupt, { correct: true }, NOW);
    expect(state.intervalDays).toBeLessThanOrEqual(365);
    expect(state.ease).toBeLessThanOrEqual(2.8);
  });
});

describe('review helpers', () => {
  const base: ReviewState = {
    itemId: 'item-1',
    dueAt: NOW.toISOString(),
    intervalDays: 1,
    ease: 2.5,
    repetitions: 1,
    lapses: 0,
    lastOutcome: 'correct',
    lastReviewedAt: NOW.toISOString(),
  };

  it('treats missing and past-due state as due', () => {
    expect(isReviewDue(undefined, NOW)).toBe(true);
    expect(isReviewDue(base, NOW)).toBe(true);
    expect(isReviewDue({ ...base, dueAt: new Date(NOW.getTime() + DAY_MS).toISOString() }, NOW)).toBe(false);
  });

  it('marks learned and mastered at the documented thresholds', () => {
    expect(isLearned(base)).toBe(false);
    expect(isLearned({ ...base, repetitions: 2 })).toBe(true);
    expect(isMastered({ ...base, repetitions: 3, intervalDays: 7 })).toBe(true);
    expect(isMastered({ ...base, repetitions: 3, intervalDays: 6 })).toBe(false);
  });
});
