import { useEffect, useRef, useState, type FormEvent } from 'react';
import { describeAnswer } from '../content';
import { isAcceptedAnswer } from '../domain/normalise';
import type { SessionEntry } from '../domain/session';
import {
  CATEGORY_LABELS,
  EXERCISE_KIND_LABELS,
  type AnswerAttempt,
  type ChoiceExercise,
  type GapFillExercise,
} from '../domain/types';

interface ExerciseCardProps {
  entry: SessionEntry;
  showCzechNotes: boolean;
  isLast: boolean;
  onAnswered: (attempt: AnswerAttempt) => void;
  onNext: () => void;
}

const REGISTER_LABELS = {
  formal: 'Formal',
  neutral: 'Neutral',
  informal: 'Informal',
} as const;

function optionLabel(index: number): string {
  return String.fromCharCode(65 + index);
}

export function ExerciseCard({ entry, showCzechNotes, isLast, onAnswered, onNext }: ExerciseCardProps) {
  const { exercise, item } = entry;
  const isChoice = exercise.kind !== 'gap-fill' && exercise.kind !== 'collocation-match';
  const choice = isChoice ? (exercise as ChoiceExercise) : null;
  const gap = isChoice ? null : (exercise as GapFillExercise);

  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'answering' | 'feedback'>('answering');
  const [correct, setCorrect] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (phase === 'feedback') feedbackRef.current?.focus();
  }, [phase]);

  // Keyboard support: 1-9 selects an option, Enter checks the answer, then
  // Enter or N moves on. Typing inside the gap-fill input is left untouched.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

      if (phase === 'feedback') {
        if (event.key === 'Enter' || event.key.toLowerCase() === 'n') {
          event.preventDefault();
          onNext();
        }
        return;
      }

      if (choice && !isTyping && /^[1-9]$/.test(event.key)) {
        const option = choice.options[Number(event.key) - 1];
        if (option) {
          event.preventDefault();
          setSelected(option.id);
        }
        return;
      }

      // Enter checks a selected option; inside the typed input the browser
      // submits the form natively, so this only fires for choice questions.
      if (event.key === 'Enter' && choice && !isTyping) {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [choice, onNext, phase]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase === 'feedback') return;

    if (choice) {
      if (!selected) {
        setFormError('Choose an option first.');
        return;
      }
    } else if (typed.trim() === '') {
      setFormError('Type your answer first.');
      return;
    }

    const isCorrect = choice
      ? selected === choice.correctOptionId
      : gap !== null && isAcceptedAnswer(typed, gap.accepted);

    setFormError(null);
    setCorrect(isCorrect);
    setPhase('feedback');
    onAnswered({ exerciseId: exercise.id, itemId: item.id, correct: isCorrect, usedHint });
  };

  return (
    <article className="card exercise">
      <p className="eyebrow">
        {CATEGORY_LABELS[item.category]} &middot; {item.topic} &middot; {item.level}
      </p>
      <p className="exercise__kind">{EXERCISE_KIND_LABELS[exercise.kind]}</p>
      <h1 className="exercise__instructions">{exercise.instructions}</h1>

      <form onSubmit={handleSubmit} noValidate ref={formRef}>
        {choice ? (
          <>
            {choice.context ? <p className="exercise__context">{choice.context}</p> : null}
            <fieldset className="options" disabled={phase === 'feedback'}>
              <legend className="exercise__prompt">{choice.prompt}</legend>
              {choice.options.map((option, index) => {
                const isChosen = selected === option.id;
                const isRight = choice.correctOptionId === option.id;
                const showRight = phase === 'feedback' && isRight;
                const showWrong = phase === 'feedback' && isChosen && !isRight;
                return (
                  <label
                    key={option.id}
                    className={`option${isChosen ? ' option--chosen' : ''}${
                      showRight ? ' option--correct' : ''
                    }${showWrong ? ' option--incorrect' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`answer-${exercise.id}`}
                      value={option.id}
                      checked={isChosen}
                      onChange={() => setSelected(option.id)}
                      className="option__input"
                    />
                    <span className="option__marker" aria-hidden="true">
                      {optionLabel(index)}
                    </span>
                    <span className="option__text">{option.text}</span>
                    {showRight ? <span className="option__tag">Correct answer</span> : null}
                    {showWrong ? <span className="option__tag">Your choice</span> : null}
                  </label>
                );
              })}
            </fieldset>
          </>
        ) : null}

        {!choice && gap ? (
          <div className="gapfill">
            <p className="exercise__prompt" id={`gap-prompt-${exercise.id}`}>
              {gap.sentenceBefore}{' '}
              <input
                type="text"
                className="gapfill__input"
                value={typed}
                onChange={(event) => setTyped(event.target.value)}
                disabled={phase === 'feedback'}
                aria-labelledby={`gap-prompt-${exercise.id}`}
                aria-describedby={`gap-help-${exercise.id}`}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                size={Math.max(10, Math.min(28, gap.accepted[0]?.length ?? 10))}
              />{' '}
              {gap.sentenceAfter}
            </p>
            <p className="fine-print" id={`gap-help-${exercise.id}`}>
              Type the missing words exactly as they should appear.
            </p>
          </div>
        ) : null}

        {exercise.hint && phase === 'answering' ? (
          <div className="hint-row">
            {hintOpen ? (
              <p className="hint">{exercise.hint}</p>
            ) : (
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setHintOpen(true);
                  setUsedHint(true);
                }}
              >
                Show a hint
              </button>
            )}
          </div>
        ) : null}

        {formError ? (
          <p className="form-error" role="alert">
            {formError}
          </p>
        ) : null}

        {phase === 'answering' ? (
          <button type="submit" className="button button--primary button--wide">
            Check answer
          </button>
        ) : null}
      </form>

      {phase === 'feedback' ? (
        <div
          className={`feedback ${correct ? 'feedback--correct' : 'feedback--incorrect'}`}
          ref={feedbackRef}
          tabIndex={-1}
          role="group"
          aria-labelledby={`verdict-${exercise.id}`}
        >
          <p className="feedback__verdict" id={`verdict-${exercise.id}`}>
            {correct ? 'Correct.' : 'Not quite.'}
          </p>
          <p className="feedback__answer">
            <span className="feedback__label">Answer</span> <strong>{describeAnswer(exercise)}</strong>
            {!correct && typed.trim() !== '' ? (
              <span className="feedback__yours"> You wrote: {typed.trim()}</span>
            ) : null}
          </p>
          <p>{exercise.explanation}</p>
          {usedHint ? (
            <p className="fine-print">You used a hint, so this item will come back sooner.</p>
          ) : null}

          <dl className="notes">
            <div>
              <dt>Meaning</dt>
              <dd>{item.meaning}</dd>
            </div>
            {item.examples.map((example) => (
              <div key={example}>
                <dt>Example</dt>
                <dd>{example}</dd>
              </div>
            ))}
            {item.commonError ? (
              <div>
                <dt>Watch out</dt>
                <dd>{item.commonError}</dd>
              </div>
            ) : null}
            {item.collocations && item.collocations.length > 0 ? (
              <div>
                <dt>Collocations</dt>
                <dd>{item.collocations.join(' · ')}</dd>
              </div>
            ) : null}
            <div>
              <dt>Register</dt>
              <dd>
                {REGISTER_LABELS[item.register]}
                {item.variant === 'both' ? ' · British and American' : null}
                {item.variant === 'british' ? ' · British English' : null}
                {item.variant === 'american' ? ' · American English' : null}
              </dd>
            </div>
            {showCzechNotes && item.czechNote ? (
              <div>
                <dt>Czech note</dt>
                <dd>{item.czechNote}</dd>
              </div>
            ) : null}
          </dl>

          <button type="button" className="button button--primary button--wide" onClick={onNext}>
            {isLast ? 'See session summary' : 'Next question'}
          </button>
        </div>
      ) : null}
    </article>
  );
}
