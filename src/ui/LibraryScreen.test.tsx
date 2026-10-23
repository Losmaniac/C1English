import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { learningItems } from '../content';
import type { ReviewState } from '../domain/types';
import { LibraryScreen } from './LibraryScreen';

const NOW = new Date('2026-03-02T09:00:00.000Z');

function review(itemId: string, overrides: Partial<ReviewState> = {}): ReviewState {
  return {
    itemId,
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

function renderLibrary(reviews: Record<string, ReviewState> = {}, showCzechNotes = true) {
  const onPractiseItem = vi.fn();
  render(
    <LibraryScreen
      reviews={reviews}
      now={NOW}
      showCzechNotes={showCzechNotes}
      onPractiseItem={onPractiseItem}
    />,
  );
  return { onPractiseItem };
}

describe('LibraryScreen', () => {
  it('lists every item and reports how many are shown', () => {
    renderLibrary();
    expect(screen.getByText(new RegExp(`${learningItems.length} items shown`, 'i'))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tenuous/i })).toBeInTheDocument();
  });

  it('filters by search text', async () => {
    const user = userEvent.setup();
    renderLibrary();

    await user.type(screen.getByLabelText(/^search$/i), 'ubiquitous');
    expect(screen.getByText(/^1 item shown\.$/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ubiquitous/i })).toBeInTheDocument();
  });

  it('filters by area and by derived status', async () => {
    const user = userEvent.setup();
    renderLibrary({ 'vocab-tenuous': review('vocab-tenuous') });

    await user.click(screen.getByRole('button', { name: /^Vocabulary$/i }));
    await user.click(screen.getByRole('button', { name: /^Due now$/i }));
    expect(screen.getByText(/^1 item shown\.$/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tenuous/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Mastered$/i }));
    expect(screen.getByRole('heading', { name: /no items match/i })).toBeInTheDocument();
  });

  it('expands an item to show its notes and starts single-item practice', async () => {
    const user = userEvent.setup();
    const { onPractiseItem } = renderLibrary();

    const row = screen.getByRole('button', { name: /tenuous/i });
    expect(row).toHaveAttribute('aria-expanded', 'false');
    await user.click(row);
    expect(row).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByText(/weak, slight and not convincing/i)).toBeInTheDocument();
    expect(screen.getAllByText(/a tenuous link/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Not a translation of Czech/i)).toBeInTheDocument();
    expect(screen.getByText(/not practised yet/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /practise this item/i }));
    expect(onPractiseItem).toHaveBeenCalledWith('vocab-tenuous');
  });

  it('hides Czech notes when the setting is off and shows review dates when practised', async () => {
    const user = userEvent.setup();
    renderLibrary(
      { 'vocab-tenuous': review('vocab-tenuous', { repetitions: 2, intervalDays: 3 }) },
      false,
    );

    await user.click(screen.getByRole('button', { name: /tenuous/i }));
    expect(screen.queryByText(/Not a translation of Czech/i)).not.toBeInTheDocument();
    expect(screen.getByText(/reviews: 2 in a row/i)).toBeInTheDocument();
  });
});
