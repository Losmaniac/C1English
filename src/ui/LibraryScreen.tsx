import { useMemo, useState } from 'react';
import { learningItems } from '../content';
import { ITEM_STATUS_LABELS, itemStatus, type ItemStatus } from '../domain/progress';
import { CATEGORY_LABELS, type Category, type LearningItem, type ReviewState } from '../domain/types';

interface LibraryScreenProps {
  reviews: Record<string, ReviewState>;
  now: Date;
  showCzechNotes: boolean;
  onPractiseItem: (itemId: string) => void;
}

type StatusFilter = 'all' | ItemStatus;

const STATUS_FILTERS: readonly StatusFilter[] = ['all', 'due', 'new', 'learning', 'mastered'];
const STATUS_FILTER_LABELS: Record<StatusFilter, string> = {
  all: 'All',
  ...ITEM_STATUS_LABELS,
};
const CATEGORY_FILTERS: readonly (Category | 'all')[] = [
  'all',
  'grammar',
  'vocabulary',
  'collocation',
  'idiom',
  'phrasal-verb',
];
const CATEGORY_FILTER_LABELS: Record<Category | 'all', string> = {
  all: 'All areas',
  ...CATEGORY_LABELS,
};

function matches(item: LearningItem, query: string): boolean {
  if (query.trim() === '') return true;
  const needle = query.trim().toLowerCase();
  return [item.title, item.meaning, item.topic, item.tags.join(' ')]
    .join(' ')
    .toLowerCase()
    .includes(needle);
}

export function LibraryScreen({ reviews, now, showCzechNotes, onPractiseItem }: LibraryScreenProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      learningItems
        .map((item) => ({ item, status: itemStatus(reviews[item.id], now) }))
        .filter((row) => (category === 'all' ? true : row.item.category === category))
        .filter((row) => (status === 'all' ? true : row.status === status))
        .filter((row) => matches(row.item, query)),
    [category, now, query, reviews, status],
  );

  return (
    <div className="screen">
      <header className="screen__intro">
        <p className="eyebrow">Library</p>
        <h1>Everything you are learning</h1>
        <p className="lede">
          {learningItems.length} reviewed items. Search them, reread the notes, or practise a single
          item straight away.
        </p>
      </header>

      <section className="card" aria-labelledby="library-filters">
        <h2 id="library-filters" className="visually-hidden">
          Search and filters
        </h2>

        <div className="field">
          <label htmlFor="library-search">Search</label>
          <input
            id="library-search"
            type="search"
            value={query}
            placeholder="Word, phrase or topic"
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="field">
          <span className="field__label" id="library-area-label">
            Area
          </span>
          <div className="chip-row" role="group" aria-labelledby="library-area-label">
            {CATEGORY_FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                className={`chip${category === option ? ' chip--active' : ''}`}
                aria-pressed={category === option}
                onClick={() => setCategory(option)}
              >
                {CATEGORY_FILTER_LABELS[option]}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="field__label" id="library-status-label">
            Status
          </span>
          <div className="chip-row" role="group" aria-labelledby="library-status-label">
            {STATUS_FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                className={`chip${status === option ? ' chip--active' : ''}`}
                aria-pressed={status === option}
                onClick={() => setStatus(option)}
              >
                {STATUS_FILTER_LABELS[option]}
              </button>
            ))}
          </div>
        </div>

        <p className="fine-print" role="status">
          {`${rows.length} item${rows.length === 1 ? '' : 's'} shown.`}
        </p>
      </section>

      <ul className="library-list">
        {rows.map(({ item, status: rowStatus }) => (
          <LibraryRow
            key={item.id}
            item={item}
            status={rowStatus}
            review={reviews[item.id]}
            open={openItemId === item.id}
            showCzechNotes={showCzechNotes}
            onToggle={() => setOpenItemId(openItemId === item.id ? null : item.id)}
            onPractise={() => onPractiseItem(item.id)}
          />
        ))}
      </ul>

      {rows.length === 0 ? (
        <div className="card">
          <h2>No items match</h2>
          <p>Try a different search term, or clear the filters.</p>
        </div>
      ) : null}
    </div>
  );
}

interface LibraryRowProps {
  item: LearningItem;
  status: ItemStatus;
  review: ReviewState | undefined;
  open: boolean;
  showCzechNotes: boolean;
  onToggle: () => void;
  onPractise: () => void;
}

function LibraryRow({
  item,
  status,
  review,
  open,
  showCzechNotes,
  onToggle,
  onPractise,
}: LibraryRowProps) {
  return (
    <li className="card library-item">
      <button type="button" className="library-item__summary" aria-expanded={open} onClick={onToggle}>
        <span className="library-item__title">{item.title}</span>
        <span className="library-item__meta">
          {CATEGORY_LABELS[item.category]} &middot; {item.topic}
        </span>
        <span className={`badge badge--${status}`}>{ITEM_STATUS_LABELS[status]}</span>
      </button>

      {open ? (
        <div className="library-item__detail">
          <p>{item.meaning}</p>
          {item.examples.map((example) => (
            <p key={example} className="library-item__example">
              {example}
            </p>
          ))}
          {item.commonError ? (
            <p className="library-item__error">
              <strong>Watch out:</strong> {item.commonError}
            </p>
          ) : null}
          {item.collocations && item.collocations.length > 0 ? (
            <p className="fine-print">Collocations: {item.collocations.join(' · ')}</p>
          ) : null}
          <p className="fine-print">
            {review
              ? `Reviews: ${review.repetitions} in a row · next due ${new Date(review.dueAt).toLocaleDateString()}`
              : 'Not practised yet.'}
          </p>
          {showCzechNotes && item.czechNote ? (
            <p className="fine-print">Czech note: {item.czechNote}</p>
          ) : null}
          <button type="button" className="button button--primary button--wide" onClick={onPractise}>
            Practise this item
          </button>
        </div>
      ) : null}
    </li>
  );
}

