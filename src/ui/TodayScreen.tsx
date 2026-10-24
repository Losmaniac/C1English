import { CATEGORY_LABELS } from '../domain/types';
import { formatPercent, type ProgressSummary } from '../domain/progress';
import type { Settings } from '../domain/types';

interface TodayScreenProps {
  settings: Settings;
  progress: ProgressSummary;
  now: Date;
  onStart: () => void;
  onStartAnyway: () => void;
  onNavigate: (view: 'library' | 'progress' | 'settings') => void;
}

function greeting(now: Date): string {
  const hour = now.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function TodayScreen({
  settings,
  progress,
  now,
  onStart,
  onStartAnyway,
  onNavigate,
}: TodayScreenProps) {
  const focused = settings.focus !== 'all';
  const focusLabel = settings.focus === 'all' ? 'all areas' : CATEGORY_LABELS[settings.focus];
  const canStart = progress.dueCount > 0 || progress.newCount > 0;
  const hasScheduledWork = progress.learned > 0 || progress.mastered > 0;

  return (
    <div className="screen">
      <header className="screen__intro">
        <p className="eyebrow">
          {progress.streakDays > 0
            ? `${progress.streakDays}-day streak · ${progress.practisedToday ? 'done for today' : 'practise today to keep it'}`
            : 'C1 practice'}
        </p>
        <h1>{greeting(now)}</h1>
        <p className="lede">
          A short session of about {settings.sessionMinutes} minutes: due review first, then a few new
          items.
          {focused ? ` Focused on ${focusLabel.toLowerCase()}.` : ''}
        </p>
      </header>

      <section className="card card--primary" aria-labelledby="today-plan">
        <h2 id="today-plan">Today&rsquo;s plan</h2>
        <div className="stat-row">
          <div className="stat">
            <p className="stat__value">{progress.dueCount}</p>
            <p className="stat__label">due for review</p>
          </div>
          <div className="stat">
            <p className="stat__value">{progress.newCount}</p>
            <p className="stat__label">not started yet</p>
          </div>
          <div className="stat">
            <p className="stat__value">{progress.learned}</p>
            <p className="stat__label">learned of {progress.totalItems}</p>
          </div>
        </div>

        {canStart ? (
          <button type="button" className="button button--primary button--wide" onClick={onStart}>
            Start a {settings.sessionMinutes}-minute session
          </button>
        ) : (
          <div className="empty-state">
            <p>
              Nothing is due right now and you have seen every item in this selection. You can still
              practise ahead, or widen the focus in Settings.
            </p>
            {hasScheduledWork ? (
              <button type="button" className="button button--primary button--wide" onClick={onStartAnyway}>
                Practise anyway
              </button>
            ) : null}
          </div>
        )}
        <p className="fine-print">
          Progress is saved on this device. Sign in under Settings to sync it across devices.
        </p>
      </section>

      <section className="card" aria-labelledby="today-mix">
        <h2 id="today-mix">What you have covered</h2>
        <ul className="category-list">
          {progress.categories.map((category) => (
            <li key={category.category}>
              <span>{CATEGORY_LABELS[category.category]}</span>
              <span className="category-list__count">
                {category.practised}/{category.total}
              </span>
            </li>
          ))}
        </ul>
        <p className="fine-print">
          Counts follow the current focus ({focusLabel.toLowerCase()}). Open the library to browse every
          item.
        </p>
        <div className="inline-actions inline-actions--wrap">
          <button type="button" className="link-button" onClick={() => onNavigate('library')}>
            Browse the library
          </button>
          <button type="button" className="link-button" onClick={() => onNavigate('progress')}>
            See progress
          </button>
          <button type="button" className="link-button" onClick={() => onNavigate('settings')}>
            Settings
          </button>
        </div>
      </section>

      <section className="card card--muted" aria-labelledby="today-accuracy">
        <h2 id="today-accuracy">Accuracy so far</h2>
        <p className="big-number">{formatPercent(progress.accuracy)}</p>
        <p className="lede">
          {progress.attempts === 0
            ? 'No answers yet. Accuracy will appear after your first session.'
            : `${progress.correct} correct out of ${progress.attempts} answers. This is a practice indicator, not a CEFR exam result.`}
        </p>
      </section>
    </div>
  );
}
