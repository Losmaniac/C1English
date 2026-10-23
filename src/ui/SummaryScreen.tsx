import { describeAnswer, getExercise, getItem } from '../content';
import { formatPercent } from '../domain/progress';
import { summarise } from '../domain/session';
import type { AnswerAttempt } from '../domain/types';

interface SummaryScreenProps {
  attempts: readonly AnswerAttempt[];
  startedAt: Date;
  finishedAt: Date;
  onPractiseAgain: () => void;
  onDone: () => void;
}

export function SummaryScreen({
  attempts,
  startedAt,
  finishedAt,
  onPractiseAgain,
  onDone,
}: SummaryScreenProps) {
  const totals = summarise(attempts);
  const durationMinutes = Math.max(1, Math.round((finishedAt.getTime() - startedAt.getTime()) / 60_000));

  const missed = attempts
    .filter((attempt) => !attempt.correct)
    .map((attempt) => {
      const item = getItem(attempt.itemId);
      const exercise = getExercise(attempt.exerciseId);
      if (!item) return null;
      return { item, answer: exercise ? describeAnswer(exercise) : '' };
    })
    .filter((entry): entry is { item: NonNullable<ReturnType<typeof getItem>>; answer: string } => entry !== null);

  return (
    <div className="screen">
      <header className="screen__intro">
        <p className="eyebrow">Session complete</p>
        <h1>
          {totals.correct} of {totals.attempted} correct
        </h1>
        <p className="lede">
          {formatPercent(totals.accuracy)} accuracy in about {durationMinutes} minute
          {durationMinutes === 1 ? '' : 's'}. Review dates have been updated on this device.
        </p>
      </header>

      <section className="card" aria-labelledby="summary-review">
        <h2 id="summary-review">What comes next</h2>
        {missed.length === 0 ? (
          <p>
            Everything was correct. These items will be spaced further apart, and you will see them
            again when they are due.
          </p>
        ) : (
          <>
            <p>These items return sooner because they were missed:</p>
            <ul className="missed-list">
              {missed.map(({ item, answer }) => (
                <li key={item.id}>
                  <p className="missed-list__title">{item.title}</p>
                  <p className="missed-list__meaning">{item.meaning}</p>
                  <p className="fine-print">Answer: {answer}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <div className="stack-actions">
        <button type="button" className="button button--primary button--wide" onClick={onPractiseAgain}>
          Practise again
        </button>
        <button type="button" className="button button--ghost button--wide" onClick={onDone}>
          Back to today
        </button>
      </div>
    </div>
  );
}
