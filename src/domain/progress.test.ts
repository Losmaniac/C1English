import { describe, expect, it } from 'vitest';
import { itemStatus, summariseProgress } from './progress';
import type { LearningItem, ReviewState, SessionRecord } from './types';

const NOW = new Date('2026-03-02T09:00:00.000Z');
const DAY_MS = 24 * 60 * 60 * 1000;

function item(id: string, category: LearningItem['category'] = 'grammar'): LearningItem {
  return {
    id,
    category,
    topic: 'test',
    level: 'C1',
    title: id,
    meaning: 'meaning',
    examples: ['example'],
    register: 'neutral',
    variant: 'both',
    tags: ['test'],
  };
}

function review(overrides: Partial<ReviewState> = {}): ReviewState {
  return {
    itemId: 'a',
    dueAt: NOW.toISOString(),
    intervalDays: 1,
    ease: 2.5,
    repetitions: 1,
    lapses: 0,
    lastOutcome: 'correct',
    lastReviewedAt: NOW.toISOString(),
    ...overrides,
  };
}

const session = (finishedAt: string, attempted: number, correct: number): SessionRecord => ({
  id: `session-${finishedAt}`,
  startedAt: finishedAt,
  finishedAt,
  exerciseIds: [],
  attempted,
  correct,
});

describe('itemStatus', () => {
  it('derives the library status from stored review data', () => {
    expect(itemStatus(undefined, NOW)).toBe('new');
    expect(itemStatus(review({ dueAt: new Date(NOW.getTime() + DAY_MS).toISOString() }), NOW)).toBe('learning');
    expect(itemStatus(review({ dueAt: NOW.toISOString() }), NOW)).toBe('due');
    expect(
      itemStatus(
        review({
          dueAt: new Date(NOW.getTime() + 10 * DAY_MS).toISOString(),
          repetitions: 4,
          intervalDays: 12,
        }),
        NOW,
      ),
    ).toBe('mastered');
  });
});

describe('summariseProgress', () => {
  const items = [item('a'), item('b'), item('c', 'idiom')];
  const reviews: Record<string, ReviewState> = {
    a: review({ itemId: 'a', repetitions: 2, dueAt: new Date(NOW.getTime() + DAY_MS).toISOString() }),
    b: review({
      itemId: 'b',
      lapses: 3,
      lastOutcome: 'incorrect',
      dueAt: new Date(NOW.getTime() - DAY_MS).toISOString(),
    }),
  };

  it('counts due, new, learned and mastered items', () => {
    const summary = summariseProgress(items, reviews, [], NOW);
    expect(summary.totalItems).toBe(3);
    expect(summary.dueCount).toBe(1);
    expect(summary.newCount).toBe(1);
    expect(summary.learned).toBe(1);
    expect(summary.mastered).toBe(0);
  });

  it('reports accuracy overall and for the last seven days only', () => {
    const sessions = [
      session(new Date(NOW.getTime() - 20 * DAY_MS).toISOString(), 2, 1),
      session(new Date(NOW.getTime() - 2 * DAY_MS).toISOString(), 4, 3),
      session(new Date(NOW.getTime() - 1 * DAY_MS).toISOString(), 4, 1),
    ];
    const summary = summariseProgress(items, reviews, sessions, NOW);
    expect(summary.attempts).toBe(10);
    expect(summary.correct).toBe(5);
    expect(summary.accuracy).toBeCloseTo(0.5);
    expect(summary.attemptsLast7Days).toBe(8);
    expect(summary.accuracyLast7Days).toBeCloseTo(0.5);
    expect(summary.recentSessions).toHaveLength(3);
  });

  it('lists trouble spots worst first and ignores healthy items', () => {
    const summary = summariseProgress(items, reviews, [], NOW);
    expect(summary.troubleSpots.map((spot) => spot.item.id)).toEqual(['b']);
    expect(summary.troubleSpots[0]?.lapses).toBe(3);
  });

  it('groups practice counts by category', () => {
    const summary = summariseProgress(items, reviews, [], NOW);
    const grammar = summary.categories.find((entry) => entry.category === 'grammar');
    const idiom = summary.categories.find((entry) => entry.category === 'idiom');
    expect(grammar).toEqual({ category: 'grammar', practised: 2, total: 2 });
    expect(idiom).toEqual({ category: 'idiom', practised: 0, total: 1 });
  });

  it('handles a learner with no history at all', () => {
    const summary = summariseProgress(items, {}, [], NOW);
    expect(summary.accuracy).toBe(0);
    expect(summary.attempts).toBe(0);
    expect(summary.troubleSpots).toEqual([]);
    expect(summary.recentSessions).toEqual([]);
  });
});
