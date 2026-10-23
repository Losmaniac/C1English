import { formatAnswerKey } from '../domain/normalise';
import { isChoiceExercise, type Exercise, type LearningItem } from '../domain/types';
import { collocationExercises, collocationItems } from './collocations';
import {
  collocationAdvancedExercises,
  collocationAdvancedExercisesPartFive,
  collocationAdvancedExercisesPartFour,
  collocationAdvancedExercisesPartThree,
  collocationAdvancedExercisesPartTwo,
  collocationAdvancedItems,
} from './collocationsAdvanced';
import { grammarExercises, grammarItems } from './grammar';
import { grammarClauseExercises, grammarClauseItems } from './grammarClauses';
import { grammarEmphasisExercises, grammarEmphasisItems } from './grammarEmphasis';
import {
  grammarModalExercises,
  grammarModalExercisesPartTwo,
  grammarModalItems,
} from './grammarModals';
import { grammarReferenceExercises, grammarReferenceItems } from './grammarReference';
import { idiomExercises, idiomItems } from './idioms';
import {
  idiomAdvancedExercises,
  idiomAdvancedExercisesPartFour,
  idiomAdvancedExercisesPartThree,
  idiomAdvancedExercisesPartTwo,
  idiomAdvancedItems,
} from './idiomsAdvanced';
import { vocabularyExercises, vocabularyItems } from './vocabulary';
import {
  vocabularyNuanceExercises,
  vocabularyNuanceExercisesPartFour,
  vocabularyNuanceExercisesPartThree,
  vocabularyNuanceExercisesPartTwo,
  vocabularyNuanceItems,
} from './vocabularyNuance';

/**
 * All learning content lives here, separate from UI and exercise logic.
 * Every item and exercise is static, reviewed data — nothing is generated at
 * runtime and nothing is fetched.
 */
export const learningItems: readonly LearningItem[] = [
  ...grammarItems,
  ...grammarReferenceItems,
  ...grammarModalItems,
  ...grammarClauseItems,
  ...grammarEmphasisItems,
  ...vocabularyItems,
  ...vocabularyNuanceItems,
  ...collocationItems,
  ...collocationAdvancedItems,
  ...idiomItems,
  ...idiomAdvancedItems,
];

export const exercises: readonly Exercise[] = [
  ...grammarExercises,
  ...grammarReferenceExercises,
  ...grammarModalExercises,
  ...grammarModalExercisesPartTwo,
  ...grammarClauseExercises,
  ...grammarEmphasisExercises,
  ...vocabularyExercises,
  ...vocabularyNuanceExercises,
  ...vocabularyNuanceExercisesPartTwo,
  ...vocabularyNuanceExercisesPartThree,
  ...vocabularyNuanceExercisesPartFour,
  ...collocationExercises,
  ...collocationAdvancedExercises,
  ...collocationAdvancedExercisesPartTwo,
  ...collocationAdvancedExercisesPartThree,
  ...collocationAdvancedExercisesPartFour,
  ...collocationAdvancedExercisesPartFive,
  ...idiomExercises,
  ...idiomAdvancedExercises,
  ...idiomAdvancedExercisesPartTwo,
  ...idiomAdvancedExercisesPartThree,
  ...idiomAdvancedExercisesPartFour,
];

const itemsById = new Map(learningItems.map((item) => [item.id, item]));
const exercisesById = new Map(exercises.map((exercise) => [exercise.id, exercise]));

export function getItem(itemId: string): LearningItem | undefined {
  return itemsById.get(itemId);
}

export function getExercise(exerciseId: string): Exercise | undefined {
  return exercisesById.get(exerciseId);
}

/** The text a learner should compare their answer with. */
export function describeAnswer(exercise: Exercise): string {
  if (!isChoiceExercise(exercise)) {
    return formatAnswerKey(exercise.accepted);
  }
  const option = exercise.options.find((candidate) => candidate.id === exercise.correctOptionId);
  return option?.text ?? '';
}
