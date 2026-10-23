import type { AppData, ReviewState, SessionRecord } from '../domain/types';
import type { RemoteProgress } from './types';

const MAX_SESSIONS = 200;

/**
 * Per-item merge. Progress is per item, so the two devices are merged item by
 * item instead of choosing one side: the more recently reviewed state wins,
 * with repetitions and then lapses as tie-breakers. The result is
 * deterministic, so merging twice gives the same answer.
 */
export function mergeReviews(
  local: Record<string, ReviewState>,
  remote: Record<string, ReviewState>,
): Record<string, ReviewState> {
  const merged: Record<string, ReviewState> = {};
  const itemIds = new Set([...Object.keys(local), ...Object.keys(remote)]);

  for (const itemId of itemIds) {
    const left = local[itemId];
    const right = remote[itemId];
    if (left && !right) {
      merged[itemId] = left;
      continue;
    }
    if (right && !left) {
      merged[itemId] = right;
      continue;
    }
    if (!left || !right) continue;

    merged[itemId] = pickMoreAdvanced(left, right);
  }

  return merged;
}

function pickMoreAdvanced(left: ReviewState, right: ReviewState): ReviewState {
  const leftTime = new Date(left.lastReviewedAt).getTime();
  const rightTime = new Date(right.lastReviewedAt).getTime();
  if (leftTime !== rightTime) return leftTime > rightTime ? left : right;
  if (left.repetitions !== right.repetitions) {
    return left.repetitions > right.repetitions ? left : right;
  }
  if (left.lapses !== right.lapses) return left.lapses > right.lapses ? left : right;
  return left.intervalDays >= right.intervalDays ? left : right;
}

/** Sessions are append-only records, so the union by id is safe. */
export function mergeSessions(
  local: readonly SessionRecord[],
  remote: readonly SessionRecord[],
): SessionRecord[] {
  const byId = new Map<string, SessionRecord>();
  for (const session of [...local, ...remote]) {
    const existing = byId.get(session.id);
    if (!existing || session.attempted > existing.attempted) byId.set(session.id, session);
  }
  return [...byId.values()]
    .sort((a, b) => a.finishedAt.localeCompare(b.finishedAt))
    .slice(-MAX_SESSIONS);
}

export interface MergeResult {
  reviews: Record<string, ReviewState>;
  sessions: SessionRecord[];
  /** True when the merge brought in something the local copy did not have. */
  changed: boolean;
}

export function mergeProgress(local: AppData, remote: RemoteProgress | null): MergeResult {
  if (!remote) {
    return { reviews: local.reviews, sessions: [...local.sessions], changed: false };
  }

  const reviews = mergeReviews(local.reviews, remote.reviews);
  const sessions = mergeSessions(local.sessions, remote.sessions);
  const changed =
    Object.keys(reviews).length !== Object.keys(local.reviews).length ||
    sessions.length !== local.sessions.length ||
    Object.keys(reviews).some((itemId) => {
      const before = local.reviews[itemId];
      const after = reviews[itemId];
      return !before || !after || before.lastReviewedAt !== after.lastReviewedAt;
    });

  return { reviews, sessions, changed };
}
