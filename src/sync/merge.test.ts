import { describe, expect, it } from 'vitest';
import { createEmptyData } from '../storage/repository';
import type { ReviewState, SessionRecord } from '../domain/types';
import { mergeProgress, mergeReviews, mergeSessions } from './merge';

function review(itemId: string, overrides: Partial<ReviewState> = {}): ReviewState {
  return {
    itemId,
    dueAt: '2026-03-05T09:00:00.000Z',
    intervalDays: 1,
    ease: 2.5,
    repetitions: 1,
    lapses: 0,
    lastOutcome: 'correct',
    lastReviewedAt: '2026-03-02T09:00:00.000Z',
    ...overrides,
  };
}

function session(id: string, finishedAt: string, attempted = 4, correct = 3): SessionRecord {
  return { id, startedAt: finishedAt, finishedAt, exerciseIds: [], attempted, correct };
}

describe('mergeReviews', () => {
  it('keeps items that only one side has', () => {
    const merged = mergeReviews(
      { a: review('a') },
      { b: review('b', { lastReviewedAt: '2026-03-03T09:00:00.000Z' }) },
    );
    expect(Object.keys(merged).sort()).toEqual(['a', 'b']);
  });

  it('prefers the more recently reviewed state', () => {
    const merged = mergeReviews(
      { a: review('a', { repetitions: 1, lastReviewedAt: '2026-03-02T09:00:00.000Z' }) },
      { a: review('a', { repetitions: 4, lastReviewedAt: '2026-03-04T09:00:00.000Z' }) },
    );
    expect(merged.a?.repetitions).toBe(4);
  });

  it('breaks ties deterministically by repetitions, then lapses, then interval', () => {
    const sameTime = { lastReviewedAt: '2026-03-02T09:00:00.000Z' };
    expect(
      mergeReviews({ a: review('a', { ...sameTime, repetitions: 2 }) }, {
        a: review('a', { ...sameTime, repetitions: 3 }),
      }).a?.repetitions,
    ).toBe(3);

    expect(
      mergeReviews({ a: review('a', { ...sameTime, repetitions: 2, lapses: 1 }) }, {
        a: review('a', { ...sameTime, repetitions: 2, lapses: 5 }),
      }).a?.lapses,
    ).toBe(5);

    expect(
      mergeReviews({ a: review('a', { ...sameTime, repetitions: 2, intervalDays: 3 }) }, {
        a: review('a', { ...sameTime, repetitions: 2, intervalDays: 9 }),
      }).a?.intervalDays,
    ).toBe(9);
  });

  it('is idempotent: merging twice gives the same result', () => {
    const local = { a: review('a', { repetitions: 2 }) };
    const remote = { a: review('a', { repetitions: 3, lastReviewedAt: '2026-03-04T09:00:00.000Z' }) };
    const once = mergeReviews(local, remote);
    const twice = mergeReviews(once, remote);
    expect(twice).toEqual(once);
  });
});

describe('mergeSessions', () => {
  it('unions sessions by id, sorts them and drops duplicates', () => {
    const merged = mergeSessions(
      [session('s1', '2026-03-01T09:00:00.000Z'), session('s2', '2026-03-02T09:00:00.000Z')],
      [session('s2', '2026-03-02T09:00:00.000Z'), session('s3', '2026-03-03T09:00:00.000Z')],
    );
    expect(merged.map((entry) => entry.id)).toEqual(['s1', 's2', 's3']);
  });

  it('keeps the most complete copy when the same session differs', () => {
    const merged = mergeSessions(
      [session('s1', '2026-03-01T09:00:00.000Z', 2, 1)],
      [session('s1', '2026-03-01T09:00:00.000Z', 6, 5)],
    );
    expect(merged[0]?.attempted).toBe(6);
  });

  it('caps the stored history', () => {
    const many = Array.from({ length: 260 }, (_, index) =>
      session(`s${index}`, new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString()),
    );
    expect(mergeSessions(many, []).length).toBe(200);
  });
});

describe('mergeProgress', () => {
  const local = { ...createEmptyData(), reviews: { a: review('a') }, sessions: [session('s1', '2026-03-01T09:00:00.000Z')] };

  it('reports no change when there is no remote copy yet', () => {
    const result = mergeProgress(local, null);
    expect(result.changed).toBe(false);
    expect(result.reviews).toEqual(local.reviews);
  });

  it('reports a change when the remote copy has newer progress', () => {
    const result = mergeProgress(local, {
      schemaVersion: 3,
      reviews: { b: review('b') },
      sessions: [],
      updatedAt: '2026-03-04T09:00:00.000Z',
    });
    expect(result.changed).toBe(true);
    expect(Object.keys(result.reviews).sort()).toEqual(['a', 'b']);
  });

  it('reports no change when both sides already match', () => {
    const result = mergeProgress(local, {
      schemaVersion: 3,
      reviews: local.reviews,
      sessions: local.sessions,
      updatedAt: '2026-03-04T09:00:00.000Z',
    });
    expect(result.changed).toBe(false);
  });
});
