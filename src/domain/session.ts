/** Session planning: due reviews first, then a bounded number of new items. */
import { isReviewDue } from './srs';
import type { Category, Exercise, LearningItem, ReviewState, Settings } from './types';

export const MIN_SESSION_EXERCISES = 5;
export const EXERCISES_PER_MINUTE = 1.1;
export const MAX_NEW_ITEMS_PER_SESSION = 10;

export interface SessionEntry {
  exercise: Exercise;
  item: LearningItem;
}

export interface SessionPlan {
  entries: SessionEntry[];
  /** Items whose review is due right now (regardless of session length). */
  dueAvailable: number;
  /** Items never practised yet. */
  newAvailable: number;
  /** How many exercises the chosen session length asks for. */
  plannedCount: number;
}

export function plannedExerciseCount(minutes: number): number {
  return Math.max(MIN_SESSION_EXERCISES, Math.round(minutes * EXERCISES_PER_MINUTE));
}

export interface BuildSessionArgs {
  items: readonly LearningItem[];
  exercises: readonly Exercise[];
  reviews: Record<string, ReviewState>;
  settings: Settings;
  now: Date;
  /** "Practise anyway": include reviews that are not due yet. */
  ignoreDue?: boolean;
  /** Restrict the session to one or more areas. */
  categories?: readonly Category[];
  /** Restrict the session to exactly these items (used for trouble spots). */
  onlyItemIds?: readonly string[];
  /** Past sessions: an item's least recently seen exercise is preferred, so reviews vary. */
  history?: readonly { exerciseIds: readonly string[] }[];
  random?: () => number;
}

function byDueDate(a: ReviewState | undefined, b: ReviewState | undefined): number {
  const left = a ? new Date(a.dueAt).getTime() : 0;
  const right = b ? new Date(b.dueAt).getTime() : 0;
  return left - right;
}

export function buildSession({
  items,
  exercises,
  reviews,
  settings,
  now,
  ignoreDue = false,
  categories,
  onlyItemIds,
  history = [],
  random = Math.random,
}: BuildSessionArgs): SessionPlan {
  const lastSeen = new Map<string, number>();
  history.forEach((session, index) => session.exerciseIds.forEach((id) => lastSeen.set(id, index)));

  const only = onlyItemIds ? new Set(onlyItemIds) : null;
  const allowedCategories = categories && categories.length > 0 ? new Set(categories) : null;

  const itemsInScope = items.filter((item) => {
    if (only && !only.has(item.id)) return false;
    if (allowedCategories && !allowedCategories.has(item.category)) return false;
    return true;
  });

  const itemIds = new Set(itemsInScope.map((item) => item.id));
  const exercisesByItem = new Map<string, Exercise[]>();

  for (const exercise of exercises) {
    if (!itemIds.has(exercise.itemId)) continue;
    const list = exercisesByItem.get(exercise.itemId);
    if (list) {
      list.push(exercise);
    } else {
      exercisesByItem.set(exercise.itemId, [exercise]);
    }
  }

  const dueItems = itemsInScope
    .filter((item) => {
      const state = reviews[item.id];
      return exercisesByItem.has(item.id) && state !== undefined && isReviewDue(state, now);
    })
    .sort((a, b) => byDueDate(reviews[a.id], reviews[b.id]));

  const newItems = itemsInScope.filter(
    (item) => exercisesByItem.has(item.id) && reviews[item.id] === undefined,
  );

  const upcomingItems = itemsInScope
    .filter((item) => {
      const state = reviews[item.id];
      return exercisesByItem.has(item.id) && state !== undefined && !isReviewDue(state, now);
    })
    .sort((a, b) => byDueDate(reviews[a.id], reviews[b.id]));

  const target = plannedExerciseCount(settings.sessionMinutes);
  const maxNew = Math.min(Math.max(settings.newItemsPerSession, 0), MAX_NEW_ITEMS_PER_SESSION);

  const chosen: LearningItem[] = [];
  const chosenIds = new Set<string>();

  const take = (item: LearningItem): void => {
    if (chosen.length >= target || chosenIds.has(item.id)) return;
    chosen.push(item);
    chosenIds.add(item.id);
  };

  // 1. Clear today's debt first.
  dueItems.forEach(take);

  // 2. Introduce a bounded number of new items.
  let addedNew = 0;
  for (const item of newItems) {
    if (chosen.length >= target || addedNew >= maxNew) break;
    take(item);
    addedNew += 1;
  }

  // 3. A session should be as long as it says: if due work and the new-item
  // limit leave it short, fill the remaining slots with further new items.
  for (const item of newItems) {
    if (chosen.length >= target || maxNew === 0) break;
    take(item);
  }

  // 4. "Practise anyway" tops up with the reviews that are closest to due.
  if (ignoreDue) {
    upcomingItems.forEach(take);
  }

  const entries: SessionEntry[] = [];
  for (const item of chosen) {
    const all = exercisesByItem.get(item.id);
    if (!all || all.length === 0) continue;
    const oldest = Math.min(...all.map((exercise) => lastSeen.get(exercise.id) ?? -1));
    const candidates = all.filter((exercise) => (lastSeen.get(exercise.id) ?? -1) === oldest);
    const index = Math.min(Math.floor(random() * candidates.length), candidates.length - 1);
    const exercise = candidates[index];
    if (exercise) entries.push({ exercise, item });
  }

  return {
    entries,
    dueAvailable: dueItems.length,
    newAvailable: newItems.length,
    plannedCount: target,
  };
}

export interface SessionTotals {
  attempted: number;
  correct: number;
  accuracy: number;
}

export function summarise(attempts: readonly { correct: boolean }[]): SessionTotals {
  const attempted = attempts.length;
  const correct = attempts.filter((attempt) => attempt.correct).length;
  return { attempted, correct, accuracy: attempted === 0 ? 0 : correct / attempted };
}
