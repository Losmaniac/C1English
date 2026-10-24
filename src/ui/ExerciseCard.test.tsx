import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { getExercise, getItem } from '../content';
import type { SessionEntry } from '../domain/session';
import type { AnswerAttempt } from '../domain/types';
import { ExerciseCard, shuffled } from './ExerciseCard';

function entry(exerciseId: string): SessionEntry {
  const exercise = getExercise(exerciseId);
  if (!exercise) throw new Error(`Missing exercise ${exerciseId}`);
  const item = getItem(exercise.itemId);
  if (!item) throw new Error(`Missing item for ${exerciseId}`);
  return { exercise, item };
}

function renderCard(exerciseId: string, isLast = false) {
  const onAnswered = vi.fn<(attempt: AnswerAttempt) => void>();
  const onNext = vi.fn();
  render(
    <ExerciseCard
      entry={entry(exerciseId)}
      showCzechNotes
      isLast={isLast}
      onAnswered={onAnswered}
      onNext={onNext}
    />,
  );
  return { onAnswered, onNext };
}

describe('ExerciseCard — multiple choice', () => {
  it('accepts the correct option and explains why', async () => {
    const user = userEvent.setup();
    const { onAnswered, onNext } = renderCard('ex-tenuous-choice');

    await user.click(screen.getByRole('radio', { name: /tenuous/i }));
    await user.click(screen.getByRole('button', { name: /check answer/i }));

    expect(screen.getByText('Correct.')).toBeInTheDocument();
    expect(screen.getByText(/weak and unconvincing/i)).toBeInTheDocument();
    expect(screen.getByText('Answer')).toBeInTheDocument();
    expect(screen.getByText('Watch out')).toBeInTheDocument();
    expect(screen.getAllByText(/a tenuous link/i).length).toBeGreaterThan(0);
    expect(onAnswered).toHaveBeenCalledWith({
      exerciseId: 'ex-tenuous-choice',
      itemId: 'vocab-tenuous',
      correct: true,
      usedHint: false,
    });

    await user.click(screen.getByRole('button', { name: /next question/i }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('marks a wrong option and shows the right answer', async () => {
    const user = userEvent.setup();
    const { onAnswered } = renderCard('ex-tenuous-choice');

    await user.click(screen.getByRole('radio', { name: /tedious/i }));
    await user.click(screen.getByRole('button', { name: /check answer/i }));

    expect(screen.getByText('Not quite.')).toBeInTheDocument();
    const feedback = screen.getByRole('group', { name: 'Not quite.' });
    expect(within(feedback).getByText('tenuous')).toBeInTheDocument();
    expect(screen.getByText('Your choice')).toBeInTheDocument();
    expect(screen.getByText('Correct answer')).toBeInTheDocument();
    expect(onAnswered).toHaveBeenCalledWith(
      expect.objectContaining({ correct: false, itemId: 'vocab-tenuous' }),
    );
  });

  it('supports keyboard selection and advancing', async () => {
    const user = userEvent.setup();
    const { onAnswered, onNext } = renderCard('ex-tenuous-choice');
    // Options are shuffled, so press the number of wherever the right one landed.
    const position = screen.getAllByRole('radio').findIndex((radio) => /tenuous/i.test(radio.closest('label')?.textContent ?? ''));

    await user.keyboard(String(position + 1));
    await user.keyboard('{Enter}');
    expect(screen.getByText('Correct.')).toBeInTheDocument();
    expect(onAnswered).toHaveBeenCalledWith(expect.objectContaining({ correct: true }));

    await user.keyboard('n');
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('requires a selection before checking', async () => {
    const user = userEvent.setup();
    const { onAnswered } = renderCard('ex-tenuous-choice');

    await user.click(screen.getByRole('button', { name: /check answer/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/choose an option first/i);
    expect(onAnswered).not.toHaveBeenCalled();
  });
});

describe('ExerciseCard — typed answers', () => {
  it('accepts a normalised answer and counts a hint', async () => {
    const user = userEvent.setup();
    const { onAnswered } = renderCard('ex-mitigate-militate-gap');

    await user.click(screen.getByRole('button', { name: /show a hint/i }));
    expect(screen.getByText(/followed by against/i)).toBeInTheDocument();

    await user.type(screen.getByRole('textbox'), '  MILITATE. ');
    await user.click(screen.getByRole('button', { name: /check answer/i }));

    expect(screen.getByText('Correct.')).toBeInTheDocument();
    expect(screen.getByText(/this item will come back sooner/i)).toBeInTheDocument();
    expect(onAnswered).toHaveBeenCalledWith(
      expect.objectContaining({ correct: true, usedHint: true, itemId: 'vocab-mitigate-militate' }),
    );
  });

  it('rejects the wrong verb', async () => {
    const user = userEvent.setup();
    const { onAnswered } = renderCard('ex-mitigate-militate-gap');

    await user.type(screen.getByRole('textbox'), 'mitigate');
    await user.click(screen.getByRole('button', { name: /check answer/i }));

    expect(screen.getByText('Not quite.')).toBeInTheDocument();
    expect(onAnswered).toHaveBeenCalledWith(
      expect.objectContaining({ correct: false, usedHint: false }),
    );
  });

  it('will not submit an empty typed answer', async () => {
    const user = userEvent.setup();
    const { onAnswered } = renderCard('ex-mitigate-militate-gap');

    await user.click(screen.getByRole('button', { name: /check answer/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/type your answer first/i);
    expect(onAnswered).not.toHaveBeenCalled();
  });

  it('labels the last question with the summary action', async () => {
    const user = userEvent.setup();
    const { onNext } = renderCard('ex-mitigate-militate-gap', true);

    await user.type(screen.getByRole('textbox'), 'militate');
    await user.click(screen.getByRole('button', { name: /check answer/i }));
    await user.click(screen.getByRole('button', { name: /see session summary/i }));

    expect(onNext).toHaveBeenCalledTimes(1);
  });
});

describe('shuffled', () => {
  it('keeps every element and does not mutate the input', () => {
    const input = ['a', 'b', 'c', 'd'] as const;
    const output = shuffled(input, () => 0);
    expect([...output].sort()).toEqual([...input]);
    expect(output).not.toEqual([...input]);
    expect(input).toEqual(['a', 'b', 'c', 'd']);
  });
});
