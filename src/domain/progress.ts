/** Everything shown on the progress screen is computed here, from stored data. */
import { isLearned, isMastered, isReviewDue } from './srs';
import type { Category, LearningItem, ReviewState, SessionRecord } from './types';

export interface CategoryProgress {
  category: Category;
  practised: number;
  total: number;
}

export interface TroubleSpot {
  item: LearningItem;
  lapses: number;
  lastOutcome: ReviewState['lastOutcome'];
  dueAt: string;
}

export interface ProgressSummary {
  totalItems: number;
  dueCount: number;
  newCount: number;
  learned: number;
  mastered: number;
  attempts: number;
  correct: number;
  accuracy: number;
  sessionsCompleted: number;
  attemptsLast7Days: number;
  accuracyLast7Days: number;
  categories: CategoryProgress[];
  recentSessions: readonly SessionRecord[];
  /** Items missed at least once, most troublesome first. */
  troubleSpots: readonly TroubleSpot[];
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function summariseProgress(
  items: readonly LearningItem[],
  reviews: Record<string, ReviewState>,
  sessions: readonly SessionRecord[],
  now: Date,
): ProgressSummary {
  const known = new Set(items.map((item) => item.id));
  const relevantReviews = Object.values(reviews).filter((review) => known.has(review.itemId));

  let dueCount = 0;
  let learned = 0;
  let mastered = 0;

  for (const review of relevantReviews) {
    if (isReviewDue(review, now)) dueCount += 1;
    if (isLearned(review)) learned += 1;
    if (isMastered(review)) mastered += 1;
  }

  const newCount = items.filter((item) => reviews[item.id] === undefined).length;

  const attempts = sessions.reduce((total, session) => total + session.attempted, 0);
  const correct = sessions.reduce((total, session) => total + session.correct, 0);

  const cutoff = now.getTime() - WEEK_MS;
  const recent = sessions.filter((session) => new Date(session.finishedAt).getTime() >= cutoff);
  const attemptsLast7Days = recent.reduce((total, session) => total + session.attempted, 0);
  const correctLast7Days = recent.reduce((total, session) => total + session.correct, 0);

  const categories = [...new Set(items.map((item) => item.category))].map((category) => {
    const inCategory = items.filter((item) => item.category === category);
    return {
      category,
      total: inCategory.length,
      practised: inCategory.filter((item) => reviews[item.id] !== undefined).length,
    };
  });

  const troubleSpots = items
    .map((item) => ({ item, review: reviews[item.id] }))
    .filter(
      (entry): entry is { item: LearningItem; review: ReviewState } =>
        entry.review !== undefined &&
        (entry.review.lapses > 0 || entry.review.lastOutcome === 'incorrect'),
    )
    .sort((a, b) => b.review.lapses - a.review.lapses || a.review.dueAt.localeCompare(b.review.dueAt))
    .slice(0, 10)
    .map(({ item, review }) => ({
      item,
      lapses: review.lapses,
      lastOutcome: review.lastOutcome,
      dueAt: review.dueAt,
    }));

  return {
    totalItems: items.length,
    dueCount,
    newCount,
    learned,
    mastered,
    attempts,
    correct,
    accuracy: attempts === 0 ? 0 : correct / attempts,
    sessionsCompleted: sessions.length,
    attemptsLast7Days,
    accuracyLast7Days: attemptsLast7Days === 0 ? 0 : correctLast7Days / attemptsLast7Days,
    categories,
    recentSessions: [...sessions].slice(-5).reverse(),
    troubleSpots,
  };
}

export type ItemStatus = 'new' | 'learning' | 'due' | 'mastered';

export const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
  new: 'Not started',
  learning: 'Learning',
  due: 'Due now',
  mastered: 'Mastered',
};

/** Status shown in the library: derived, never stored. */
export function itemStatus(review: ReviewState | undefined, now: Date): ItemStatus {
  if (!review) return 'new';
  if (isReviewDue(review, now)) return 'due';
  if (isMastered(review)) return 'mastered';
  return 'learning';
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'unknown date';
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}
