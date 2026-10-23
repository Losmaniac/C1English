import { useCallback, useEffect, useRef, useState } from 'react';
import type { SessionPlan } from '../domain/session';
import type { AnswerAttempt } from '../domain/types';
import { ExerciseCard } from './ExerciseCard';

interface SessionScreenProps {
  plan: SessionPlan;
  startedAt: Date;
  showCzechNotes: boolean;
  onComplete: (attempts: readonly AnswerAttempt[], startedAt: Date) => void;
  onExit: () => void;
}

export function SessionScreen({
  plan,
  startedAt,
  showCzechNotes,
  onComplete,
  onExit,
}: SessionScreenProps) {
  const [index, setIndex] = useState(0);
  const attemptsRef = useRef<AnswerAttempt[]>([]);

  const total = plan.entries.length;
  const entry = plan.entries[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [index]);

  const handleAnswered = useCallback((attempt: AnswerAttempt) => {
    attemptsRef.current = [...attemptsRef.current, attempt];
  }, []);

  const handleNext = useCallback(() => {
    if (index >= total - 1) {
      onComplete(attemptsRef.current, startedAt);
      return;
    }
    setIndex((current) => current + 1);
  }, [index, onComplete, startedAt, total]);

  const handleExit = useCallback(() => {
    const answered = attemptsRef.current.length;
    const message =
      answered === 0
        ? 'Leave this session? Nothing has been answered yet.'
        : `End this session? ${answered} answered question(s) will be discarded and will not affect your review schedule.`;
    if (window.confirm(message)) onExit();
  }, [onExit]);

  if (!entry) {
    return (
      <div className="screen">
        <div className="card">
          <h1>Session finished</h1>
          <p>There are no more questions in this session.</p>
          <button type="button" className="button button--primary" onClick={onExit}>
            Back to today
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen screen--session">
      <header className="session-header">
        <div className="session-header__row">
          <p className="eyebrow">
            Question {index + 1} of {total}
          </p>
          <button type="button" className="link-button" onClick={handleExit}>
            End session
          </button>
        </div>
        <progress
          className="session-progress"
          value={index + 1}
          max={total}
          aria-label={`Session progress: question ${index + 1} of ${total}`}
        />
      </header>

      <ExerciseCard
        key={`${entry.exercise.id}-${index}`}
        entry={entry}
        showCzechNotes={showCzechNotes}
        isLast={index === total - 1}
        onAnswered={handleAnswered}
        onNext={handleNext}
      />
    </div>
  );
}
