import { describe, expect, it } from 'vitest';
import { buildSession, plannedExerciseCount, summarise } from './session';
import type { Exercise, LearningItem, ReviewState, Settings } from './types';

const NOW = new Date('2026-03-02T09:00:00.000Z');
const DAY_MS = 24 * 60 * 60 * 1000;

const settings: Settings = {
  sessionMinutes: 10,
  newItemsPerSession: 2,
  showCzechNotes: true,
  focus: 'all',
  theme: 'system',
};

function makeItem(id: string): LearningItem {
  return {
    id,
    category: 'grammar',
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

function makeExercise(id: string, itemId: string): Exercise {
  return {
    id,
    itemId,
    kind: 'multiple-choice',
    instructions: 'Choose',
    prompt: 'Pick one',
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
    ],
    correctOptionId: 'a',
    explanation: 'because',
  };
}

function review(itemId: string, dueOffsetDays: number): ReviewState {
  return {
    itemId,
    dueAt: new Date(NOW.getTime() + dueOffsetDays * DAY_MS).toISOString(),
    intervalDays: 1,
    ease: 2.5,
    repetitions: 1,
    lapses: 0,
    lastOutcome: 'correct',
    lastReviewedAt: NOW.toISOString(),
  };
}

const items = [makeItem('a'), makeItem('b'), makeItem('c'), makeItem('d')];
const exercises = [
  makeExercise('ex-a-1', 'a'),
  makeExercise('ex-a-2', 'a'),
  makeExercise('ex-b-1', 'b'),
  makeExercise('ex-c-1', 'c'),
  makeExercise('ex-d-1', 'd'),
];
const reviews: Record<string, ReviewState> = {
  a: review('a', -1),
  b: review('b', 3),
};

describe('plannedExerciseCount', () => {
  it('scales with session length and never drops below the minimum', () => {
    expect(plannedExerciseCount(5)).toBe(6);
    expect(plannedExerciseCount(10)).toBe(11);
    expect(plannedExerciseCount(20)).toBe(22);
    expect(plannedExerciseCount(0)).toBe(5);
  });
});

describe('buildSession', () => {
  it('takes due reviews first, then a bounded number of new items', () => {
    const plan = buildSession({
      items,
      exercises,
      reviews,
      settings,
      now: NOW,
      random: () => 0,
    });

    expect(plan.dueAvailable).toBe(1);
    expect(plan.newAvailable).toBe(2);
    expect(plan.entries.map((entry) => entry.item.id)).toEqual(['a', 'c', 'd']);
    expect(plan.entries.map((entry) => entry.exercise.id)).toEqual(['ex-a-1', 'ex-c-1', 'ex-d-1']);
  });

  it('fills a short session with extra new items so it matches its planned length', () => {
    const many = Array.from({ length: 20 }, (_, i) => makeItem(`n${i}`));
    const plan = buildSession({
      items: many,
      exercises: many.map((item) => makeExercise(`ex-${item.id}`, item.id)),
      reviews: {},
      settings,
      now: NOW,
      random: () => 0,
    });
    expect(plan.entries).toHaveLength(plannedExerciseCount(settings.sessionMinutes));
  });

  it('never repeats an item within one session', () => {
    const plan = buildSession({ items, exercises, reviews, settings, now: NOW, random: () => 0 });
    const ids = plan.entries.map((entry) => entry.item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('respects "reviews only"', () => {
    const plan = buildSession({
      items,
      exercises,
      reviews,
      settings: { ...settings, newItemsPerSession: 0 },
      now: NOW,
      random: () => 0,
    });
    expect(plan.entries.map((entry) => entry.item.id)).toEqual(['a']);
  });

  it('includes scheduled items in practise-ahead mode', () => {
    const plan = buildSession({
      items,
      exercises,
      reviews,
      settings,
      now: NOW,
      ignoreDue: true,
      random: () => 0,
    });
    expect(plan.entries.map((entry) => entry.item.id)).toEqual(['a', 'c', 'd', 'b']);
  });

  it('skips items that have no exercise', () => {
    const plan = buildSession({
      items: [...items, makeItem('orphan')],
      exercises,
      reviews,
      settings,
      now: NOW,
      ignoreDue: true,
      random: () => 0,
    });
    expect(plan.entries.some((entry) => entry.item.id === 'orphan')).toBe(false);
  });

  it('restricts a session to the chosen categories', () => {
    const mixed = [
      { ...makeItem('a'), category: 'grammar' as const },
      { ...makeItem('c'), category: 'idiom' as const },
      { ...makeItem('d'), category: 'idiom' as const },
    ];
    const plan = buildSession({
      items: mixed,
      exercises,
      reviews,
      settings,
      now: NOW,
      categories: ['idiom'],
      random: () => 0,
    });
    expect(plan.entries.map((entry) => entry.item.id)).toEqual(['c', 'd']);
    expect(plan.dueAvailable).toBe(0);
  });

  it('restricts a session to exact item ids for trouble-spot practice', () => {
    const plan = buildSession({
      items,
      exercises,
      reviews,
      settings,
      now: NOW,
      ignoreDue: true,
      onlyItemIds: ['b'],
      random: () => 0,
    });
    expect(plan.entries.map((entry) => entry.item.id)).toEqual(['b']);
  });

  it('ignores an empty category filter instead of returning nothing', () => {
    const plan = buildSession({
      items,
      exercises,
      reviews,
      settings,
      now: NOW,
      categories: [],
      random: () => 0,
    });
    expect(plan.entries.length).toBeGreaterThan(0);
  });

  it('still returns a plan when content is empty', () => {
    const plan = buildSession({ items: [], exercises: [], reviews: {}, settings, now: NOW });
    expect(plan.entries).toEqual([]);
    expect(plan.dueAvailable).toBe(0);
    expect(plan.newAvailable).toBe(0);
  });
});

describe('summarise', () => {
  it('computes accuracy and handles an empty session', () => {
    expect(summarise([{ correct: true }, { correct: false }, { correct: true }])).toEqual({
      attempted: 3,
      correct: 2,
      accuracy: 2 / 3,
    });
    expect(summarise([])).toEqual({ attempted: 0, correct: 0, accuracy: 0 });
  });
});
