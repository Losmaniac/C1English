/**
 * Integrity checks for the static content set. Run in tests and (in development)
 * at startup, so a broken item or an impossible answer key is caught before the
 * learner ever sees it.
 */
import { isChoiceExercise, type Exercise, type LearningItem } from '../domain/types';

export interface ContentIssue {
  severity: 'error';
  message: string;
}

export function validateContent(
  items: readonly LearningItem[],
  exercises: readonly Exercise[],
): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const add = (message: string): void => {
    issues.push({ severity: 'error', message });
  };

  const itemIds = new Set<string>();
  for (const item of items) {
    if (itemIds.has(item.id)) add(`Duplicate learning item id: ${item.id}`);
    itemIds.add(item.id);

    if (!item.id.trim()) add('Learning item with an empty id.');
    if (!item.title.trim()) add(`Item ${item.id}: empty title.`);
    if (!item.meaning.trim()) add(`Item ${item.id}: empty meaning.`);
    if (!item.topic.trim()) add(`Item ${item.id}: empty topic.`);
    if (item.examples.length === 0) add(`Item ${item.id}: at least one example is required.`);
    if (item.examples.some((example) => !example.trim())) {
      add(`Item ${item.id}: empty example.`);
    }
    if (item.tags.length === 0) add(`Item ${item.id}: at least one tag is required.`);
  }

  const exerciseIds = new Set<string>();

  for (const exercise of exercises) {
    if (exerciseIds.has(exercise.id)) add(`Duplicate exercise id: ${exercise.id}`);
    exerciseIds.add(exercise.id);

    if (!itemIds.has(exercise.itemId)) {
      add(`Exercise ${exercise.id}: unknown itemId ${exercise.itemId}.`);
    }
    if (!exercise.instructions.trim()) add(`Exercise ${exercise.id}: empty instructions.`);
    if (!exercise.explanation.trim()) add(`Exercise ${exercise.id}: empty explanation.`);

    if (!isChoiceExercise(exercise)) {
      if (exercise.accepted.length === 0) add(`Exercise ${exercise.id}: no accepted answers.`);
      if (exercise.accepted.some((answer) => !answer.trim())) {
        add(`Exercise ${exercise.id}: empty accepted answer.`);
      }
      if (!exercise.sentenceBefore.trim() && !exercise.sentenceAfter.trim()) {
        add(`Exercise ${exercise.id}: sentence context is empty.`);
      }
      continue;
    }

    if (exercise.options.length < 2) add(`Exercise ${exercise.id}: needs at least two options.`);
    const optionIds = new Set<string>();
    const optionTexts = new Set<string>();
    for (const option of exercise.options) {
      if (optionIds.has(option.id)) add(`Exercise ${exercise.id}: duplicate option id ${option.id}.`);
      optionIds.add(option.id);
      const normalised = option.text.trim().toLowerCase();
      if (!normalised) add(`Exercise ${exercise.id}: empty option text.`);
      if (optionTexts.has(normalised)) add(`Exercise ${exercise.id}: duplicate option text.`);
      optionTexts.add(normalised);
    }
    if (!optionIds.has(exercise.correctOptionId)) {
      add(`Exercise ${exercise.id}: correctOptionId does not match any option.`);
    }
  }

  // One exercise per item is required for the item to enter a session.
  for (const item of items) {
    if (!exercises.some((exercise) => exercise.itemId === item.id)) {
      add(`Item ${item.id}: no exercises reference it, so it can never be practised.`);
    }
  }

  return issues;
}
