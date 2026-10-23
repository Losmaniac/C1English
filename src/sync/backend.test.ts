import { describe, expect, it } from 'vitest';
import { isSyncConfigured } from './config';
import { getSyncBackend, toRemoteProgress } from './firebaseBackend';

describe('sync configuration', () => {
  it('is disabled when no Firebase build variables are present', () => {
    // The test environment has no VITE_FIREBASE_* values, which is exactly the
    // local-only configuration the app must keep working in.
    expect(isSyncConfigured).toBe(false);
  });

  it('returns no backend at all when unconfigured, so the SDK is never loaded', async () => {
    await expect(getSyncBackend()).resolves.toBeNull();
  });
});

describe('toRemoteProgress', () => {
  it('sanitises a remote document, dropping malformed records', () => {
    const remote = toRemoteProgress({
      updatedAt: '2026-03-04T09:00:00.000Z',
      reviews: {
        good: {
          dueAt: '2026-03-05T09:00:00.000Z',
          lastReviewedAt: '2026-03-04T09:00:00.000Z',
          lastOutcome: 'correct',
          intervalDays: 3,
          ease: 2.6,
          repetitions: 2,
          lapses: 0,
        },
        broken: { dueAt: 'not-a-date' },
      },
      sessions: [{ id: 's1', startedAt: '2026-03-01T09:00:00.000Z', finishedAt: '2026-03-01T09:05:00.000Z', exerciseIds: [], attempted: 3, correct: 2 }],
    });

    expect(remote).not.toBeNull();
    expect(Object.keys(remote?.reviews ?? {})).toEqual(['good']);
    expect(remote?.sessions).toHaveLength(1);
    expect(remote?.updatedAt).toBe('2026-03-04T09:00:00.000Z');
  });

  it('rejects nonsense instead of throwing', () => {
    expect(toRemoteProgress(null)).toBeNull();
    expect(toRemoteProgress('text')).toBeNull();
    expect(toRemoteProgress({ reviews: 'nope', sessions: 5 })).not.toBeNull();
  });
});
