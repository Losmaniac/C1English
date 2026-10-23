import { formatPercent, formatShortDate, type ProgressSummary } from '../domain/progress';
import { CATEGORY_LABELS } from '../domain/types';

interface ProgressScreenProps {
  progress: ProgressSummary;
  onStart: () => void;
  onPractiseTroubleSpots: () => void;
  onOpenLibrary: () => void;
}

export function ProgressScreen({
  progress,
  onStart,
  onPractiseTroubleSpots,
  onOpenLibrary,
}: ProgressScreenProps) {
  const hasHistory = progress.attempts > 0;

  return (
    <div className="screen">
      <header className="screen__intro">
        <p className="eyebrow">Progress</p>
        <h1>Your practice so far</h1>
        <p className="lede">
          These figures describe your practice in this app. They are an informal indicator, not an
          official CEFR assessment.
        </p>
      </header>

      <section className="card card--primary" aria-labelledby="progress-accuracy">
        <h2 id="progress-accuracy">Accuracy</h2>
        <p className="big-number">{hasHistory ? formatPercent(progress.accuracy) : '—'}</p>
        <p className="lede">
          {hasHistory
            ? `${progress.correct} correct of ${progress.attempts} answers across ${progress.sessionsCompleted} session${
                progress.sessionsCompleted === 1 ? '' : 's'
              }.`
            : 'No answers recorded yet.'}
        </p>
        <p className="fine-print">
          Last 7 days: {progress.attemptsLast7Days} answer{progress.attemptsLast7Days === 1 ? '' : 's'}
          {progress.attemptsLast7Days > 0 ? ` · ${formatPercent(progress.accuracyLast7Days)} correct` : ''}
        </p>
      </section>

      <section className="card" aria-labelledby="progress-items">
        <h2 id="progress-items">Items in rotation</h2>
        <ul className="metric-list">
          <li>
            <span>Practised at least once</span>
            <strong>
              {progress.totalItems - progress.newCount} / {progress.totalItems}
            </strong>
          </li>
          <li>
            <span>Learned (recalled twice)</span>
            <strong>{progress.learned}</strong>
          </li>
          <li>
            <span>Mastered (three times, a week apart)</span>
            <strong>{progress.mastered}</strong>
          </li>
          <li>
            <span>Due for review now</span>
            <strong>{progress.dueCount}</strong>
          </li>
        </ul>
        <button type="button" className="button button--primary button--wide" onClick={onStart}>
          Start a session
        </button>
      </section>

      <section className="card" aria-labelledby="progress-trouble">
        <h2 id="progress-trouble">Trouble spots</h2>
        {progress.troubleSpots.length === 0 ? (
          <p>
            Nothing has been missed yet. Items you get wrong appear here, and you can drill them in one
            short session.
          </p>
        ) : (
          <>
            <p>
              These items were missed or struggled with. They are already scheduled sooner, and you can
              rehearse them now.
            </p>
            <ul className="missed-list">
              {progress.troubleSpots.map((spot) => (
                <li key={spot.item.id}>
                  <p className="missed-list__title">{spot.item.title}</p>
                  <p className="missed-list__meaning">{spot.item.meaning}</p>
                  <p className="fine-print">
                    Missed {spot.lapses} time{spot.lapses === 1 ? '' : 's'} &middot; next review{' '}
                    {formatShortDate(spot.dueAt)}
                  </p>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="button button--primary button--wide"
              onClick={onPractiseTroubleSpots}
            >
              Practise {progress.troubleSpots.length} trouble spot
              {progress.troubleSpots.length === 1 ? '' : 's'}
            </button>
          </>
        )}
      </section>

      <section className="card" aria-labelledby="progress-categories">
        <h2 id="progress-categories">By area</h2>
        <ul className="category-list">
          {progress.categories.map((category) => (
            <li key={category.category}>
              <span>{CATEGORY_LABELS[category.category]}</span>
              <span className="category-list__count">
                {category.practised}/{category.total} practised
              </span>
            </li>
          ))}
        </ul>
        <div className="inline-actions">
          <button type="button" className="link-button" onClick={onOpenLibrary}>
            Open the library
          </button>
        </div>
      </section>

      <section className="card" aria-labelledby="progress-sessions">
        <h2 id="progress-sessions">Recent sessions</h2>
        {progress.recentSessions.length === 0 ? (
          <p>No sessions yet. Finish one session and it will appear here.</p>
        ) : (
          <ul className="session-list">
            {progress.recentSessions.map((session) => (
              <li key={session.id}>
                <span>{formatShortDate(session.finishedAt)}</span>
                <span className="session-list__score">
                  {session.correct}/{session.attempted}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card card--muted" aria-labelledby="progress-method">
        <h2 id="progress-method">How review dates are chosen</h2>
        <p>
          A correct answer moves an item to tomorrow, then three days, then progressively further
          ahead. A wrong answer brings it back tomorrow. Using a hint halves the next interval. The
          easiest items therefore appear rarely, and weak items appear often.
        </p>
      </section>
    </div>
  );
}
