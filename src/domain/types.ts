/** Shared domain types. Content is static data; progress is personal data. */

export type Category = 'grammar' | 'vocabulary' | 'collocation' | 'idiom' | 'phrasal-verb';

export const CATEGORY_LABELS: Record<Category, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  collocation: 'Collocation',
  idiom: 'Idiom',
  'phrasal-verb': 'Phrasal verb',
};

export type Level = 'B2' | 'C1' | 'C2';
export type Register = 'formal' | 'neutral' | 'informal';
export type Variant = 'both' | 'british' | 'american';

export interface LearningItem {
  /** Stable slug. Never derived from an array index. */
  id: string;
  category: Category;
  topic: string;
  level: Level;
  /** The target form, word or expression. */
  title: string;
  meaning: string;
  examples: readonly string[];
  commonError?: string;
  collocations?: readonly string[];
  register: Register;
  variant: Variant;
  /** Czech-to-English transfer note or false friend, shown only when enabled. */
  czechNote?: string;
  tags: readonly string[];
}

export type ExerciseKind =
  | 'multiple-choice'
  | 'gap-fill'
  | 'error-correction'
  | 'collocation-match'
  | 'best-expression';

export const EXERCISE_KIND_LABELS: Record<ExerciseKind, string> = {
  'multiple-choice': 'Choose the answer',
  'gap-fill': 'Complete the sentence',
  'error-correction': 'Choose the correct version',
  'collocation-match': 'Complete the collocation',
  'best-expression': 'Choose the best expression',
};

export interface ExerciseOption {
  /** Stable id within the exercise. */
  id: string;
  text: string;
}

interface ExerciseBase {
  id: string;
  itemId: string;
  instructions: string;
  /** Shown after an attempt. Explains why the answer is right. */
  explanation: string;
  hint?: string;
}

export interface ChoiceExercise extends ExerciseBase {
  kind: 'multiple-choice' | 'error-correction' | 'best-expression';
  prompt: string;
  context?: string;
  options: readonly ExerciseOption[];
  correctOptionId: string;
}

export interface GapFillExercise extends ExerciseBase {
  kind: 'gap-fill' | 'collocation-match';
  sentenceBefore: string;
  sentenceAfter: string;
  /** Accepted answers. Compared after safe normalisation, never raw. */
  accepted: readonly string[];
}

export type Exercise = ChoiceExercise | GapFillExercise;

export const CHOICE_KINDS = ['multiple-choice', 'error-correction', 'best-expression'] as const;

export function isChoiceExercise(exercise: Exercise): exercise is ChoiceExercise {
  return (CHOICE_KINDS as readonly string[]).includes(exercise.kind);
}

export function isGapFillExercise(exercise: Exercise): exercise is GapFillExercise {
  return !isChoiceExercise(exercise);
}

export type ReviewOutcome = 'correct' | 'incorrect';

export interface ReviewState {
  itemId: string;
  /** ISO timestamp. The item is due when this is in the past. */
  dueAt: string;
  intervalDays: number;
  ease: number;
  repetitions: number;
  lapses: number;
  lastOutcome: ReviewOutcome;
  lastReviewedAt: string;
}

export interface SessionRecord {
  id: string;
  startedAt: string;
  finishedAt: string;
  exerciseIds: readonly string[];
  attempted: number;
  correct: number;
}

export interface Settings {
  /** Planned session length in minutes. */
  sessionMinutes: number;
  newItemsPerSession: number;
  showCzechNotes: boolean;
  /** Restricts new sessions to one area, or 'all'. */
  focus: Category | 'all';
}

export interface AppData {
  schemaVersion: number;
  settings: Settings;
  reviews: Record<string, ReviewState>;
  sessions: readonly SessionRecord[];
}

export interface AnswerAttempt {
  exerciseId: string;
  itemId: string;
  correct: boolean;
  usedHint: boolean;
}
