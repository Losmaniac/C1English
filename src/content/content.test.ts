import { describe, expect, it } from 'vitest';
import { isChoiceExercise } from '../domain/types';
import { describeAnswer, exercises, getExercise, getItem, learningItems } from './index';
import { validateContent } from './validate';

describe('learning content integrity', () => {
  it('contains no structural errors', () => {
    expect(validateContent(learningItems, exercises)).toEqual([]);
  });

  it('uses stable, unique, slug-like ids', () => {
    const itemIds = learningItems.map((item) => item.id);
    const exerciseIds = exercises.map((exercise) => exercise.id);
    expect(new Set(itemIds).size).toBe(itemIds.length);
    expect(new Set(exerciseIds).size).toBe(exerciseIds.length);

    for (const id of [...itemIds, ...exerciseIds]) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('references only items that exist', () => {
    for (const exercise of exercises) {
      expect(getItem(exercise.itemId), `${exercise.id} -> ${exercise.itemId}`).toBeDefined();
    }
  });

  it('has an unambiguous answer key for every exercise', () => {
    for (const exercise of exercises) {
      const answer = describeAnswer(exercise);
      expect(answer.trim(), exercise.id).not.toBe('');

      if (isChoiceExercise(exercise)) {
        const matching = exercise.options.filter((option) => option.id === exercise.correctOptionId);
        expect(matching, exercise.id).toHaveLength(1);
        expect(exercise.options.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(exercise.accepted.length, exercise.id).toBeGreaterThan(0);
      }
    }
  });

  it('covers every planned exercise format in the first release', () => {
    const kinds = new Set(exercises.map((exercise) => exercise.kind));
    expect([...kinds].sort()).toEqual(
      ['best-expression', 'collocation-match', 'error-correction', 'gap-fill', 'multiple-choice'].sort(),
    );
  });

  it('exposes stable content counts and keeps lookups working', () => {
    expect(learningItems).toHaveLength(104);
    expect(exercises).toHaveLength(106);
    expect(getExercise('ex-tenuous-choice')?.itemId).toBe('vocab-tenuous');
    expect(getExercise('missing-exercise')).toBeUndefined();
    expect(getItem('missing-item')).toBeUndefined();
  });

  it('covers every category and gives each item at least one exercise', () => {
    const categories = new Set(learningItems.map((item) => item.category));
    expect([...categories].sort()).toEqual([
      'collocation',
      'grammar',
      'idiom',
      'phrasal-verb',
      'vocabulary',
    ]);

    for (const item of learningItems) {
      const related = exercises.filter((exercise) => exercise.itemId === item.id);
      expect(related.length, `${item.category}: ${item.id}`).toBeGreaterThan(0);
    }
  });

  it('keeps the promise that every exercise has a unique id and a non-empty explanation', () => {
    const ids = exercises.map((exercise) => exercise.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const exercise of exercises) {
      expect(exercise.explanation.length, exercise.id).toBeGreaterThan(30);
      expect(exercise.instructions.length, exercise.id).toBeGreaterThan(10);
    }
  });

  it('reports a broken content set instead of accepting it', () => {
    const first = learningItems[0];
    const exercise = exercises[0];
    if (!first || !exercise) throw new Error('Expected seed content');

    const issues = validateContent(
      [{ ...first, examples: [] }],
      [
        {
          ...exercise,
          id: exercise.id,
          itemId: 'unknown-item',
        } as typeof exercise,
      ],
    );
    const messages = issues.map((issue) => issue.message).join('\n');
    expect(messages).toMatch(/at least one example/);
    expect(messages).toMatch(/unknown itemId/);
  });
});
