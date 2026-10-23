/**
 * Simple SM-2-inspired scheduler. Intentionally small and documented rather
 * than clever: one item is scheduled per successful review of any of its
 * exercises.
 *
 * Outcome rules:
 * - incorrect          -> repetitions reset, interval 1 day, ease -0.2, lapse +1
 * - correct, 1st time  -> interval 1 day, ease +0.1
 * - correct, 2nd time  -> interval 3 days, ease +0.1
 * - correct, 3rd+      -> interval = previous interval * ease, ease +0.1
 * - hint used          -> interval halved, no ease bonus
 *
 * Bounds: ease 1.3–2.8. All values are clamped so a corrupt import cannot
 * produce absurd intervals.
 */
import type { ReviewState } from './types';

export const START_EASE = 2.5;
export const MIN_EASE = 1.3;
export const MAX_EASE = 2.8;
export const DAY_MS = 24 * 60 * 60 * 1000;
export const MAX_INTERVAL_DAYS = 365;

export interface ReviewInput {
  correct: boolean;
  usedHint?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

export function scheduleReview(
  itemId: string,
  previous: ReviewState | undefined,
  input: ReviewInput,
  now: Date,
): ReviewState {
  const usedHint = input.usedHint ?? false;
  const previousEase = previous ? clamp(previous.ease, MIN_EASE, MAX_EASE) : START_EASE;
  const base = {
    itemId,
    lastReviewedAt: now.toISOString(),
    lapses: previous?.lapses ?? 0,
  };

  if (!input.correct) {
    return {
      ...base,
      dueAt: addDays(now, 1).toISOString(),
      intervalDays: 1,
      ease: clamp(previousEase - 0.2, MIN_EASE, MAX_EASE),
      repetitions: 0,
      lapses: base.lapses + 1,
      lastOutcome: 'incorrect',
    };
  }

  const repetitions = (previous?.repetitions ?? 0) + 1;
  let intervalDays: number;

  if (repetitions === 1) {
    intervalDays = 1;
  } else if (repetitions === 2) {
    intervalDays = 3;
  } else {
    const previousInterval = clamp(previous?.intervalDays ?? 1, 1, MAX_INTERVAL_DAYS);
    intervalDays = Math.round(previousInterval * previousEase);
  }

  if (usedHint) {
    intervalDays = Math.max(1, Math.round(intervalDays / 2));
  }

  return {
    ...base,
    dueAt: addDays(now, clamp(intervalDays, 1, MAX_INTERVAL_DAYS)).toISOString(),
    intervalDays: clamp(intervalDays, 1, MAX_INTERVAL_DAYS),
    ease: clamp(usedHint ? previousEase : previousEase + 0.1, MIN_EASE, MAX_EASE),
    repetitions,
    lastOutcome: 'correct',
  };
}

export function isReviewDue(state: ReviewState | undefined, now: Date): boolean {
  if (!state) return true;
  return new Date(state.dueAt).getTime() <= now.getTime();
}

/** "Learned" = recalled correctly at least twice. */
export function isLearned(state: ReviewState | undefined): boolean {
  return (state?.repetitions ?? 0) >= 2;
}

/** "Mastered" = recalled correctly at least three times with a week-plus gap. */
export function isMastered(state: ReviewState | undefined): boolean {
  return (state?.repetitions ?? 0) >= 3 && (state?.intervalDays ?? 0) >= 7;
}
