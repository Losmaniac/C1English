import { useCallback, useMemo, useState } from 'react';
import { exercises, learningItems } from './content';
import { validateContent } from './content/validate';
import { summariseProgress } from './domain/progress';
import { buildSession, type SessionPlan } from './domain/session';
import { scheduleReview } from './domain/srs';
import type { AnswerAttempt, AppData, SessionRecord, Settings } from './domain/types';
import { createEmptyData, loadData, saveData } from './storage/repository';
import { LibraryScreen } from './ui/LibraryScreen';
import { NavBar, type Tab } from './ui/NavBar';
import { ProgressScreen } from './ui/ProgressScreen';
import { SessionScreen } from './ui/SessionScreen';
import { SettingsScreen } from './ui/SettingsScreen';
import { SummaryScreen } from './ui/SummaryScreen';
import { TodayScreen } from './ui/TodayScreen';
import { UpdatePrompt } from './ui/UpdatePrompt';

type View = 'today' | 'session' | 'summary' | 'library' | 'progress' | 'settings';

interface StartSessionOptions {
  ignoreDue?: boolean;
  /** Practise exactly these items, whatever their review state. */
  onlyItemIds?: readonly string[];
}

interface SummaryState {
  attempts: readonly AnswerAttempt[];
  startedAt: Date;
  finishedAt: Date;
}

export default function App() {
  const [initialLoad] = useState(() => loadData());
  const [data, setData] = useState<AppData>(initialLoad.data);
  const [now, setNow] = useState(() => new Date());
  const [view, setView] = useState<View>('today');
  const [plan, setPlan] = useState<SessionPlan | null>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<Date | null>(null);
  const [summary, setSummary] = useState<SummaryState | null>(null);
  const [notice, setNotice] = useState<string | null>(initialLoad.message ?? null);
  const [storageError, setStorageError] = useState<string | null>(
    initialLoad.status === 'unavailable'
      ? (initialLoad.message ?? 'Progress cannot be saved on this device.')
      : null,
  );

  const contentIssues = useMemo(() => validateContent(learningItems, exercises), []);
  const progress = useMemo(
    () => summariseProgress(learningItems, data.reviews, data.sessions, now),
    [data.reviews, data.sessions, now],
  );

  // "Today" counts only what the current focus will actually queue, so the
  // start button can never open an empty session.
  const todayProgress = useMemo(() => {
    const focus = data.settings.focus;
    if (focus === 'all') return progress;
    return summariseProgress(
      learningItems.filter((item) => item.category === focus),
      data.reviews,
      data.sessions,
      now,
    );
  }, [data.reviews, data.sessions, data.settings.focus, now, progress]);

  const commit = useCallback((next: AppData) => {
    setData(next);
    const result = saveData(next);
    setStorageError(result.ok ? null : (result.message ?? 'Progress could not be saved.'));
  }, []);

  const navigate = useCallback((next: View) => {
    setNow(new Date());
    setNotice(null);
    setView(next);
  }, []);

  const startSession = useCallback(
    (options: StartSessionOptions = {}) => {
      const startedAt = new Date();
      const focus = data.settings.focus;
      const nextPlan = buildSession({
        items: learningItems,
        exercises,
        reviews: data.reviews,
        settings: data.settings,
        now: startedAt,
        ignoreDue: options.ignoreDue ?? false,
        categories: focus === 'all' ? undefined : [focus],
        onlyItemIds: options.onlyItemIds,
      });

      if (nextPlan.entries.length === 0) {
        setNotice('There is nothing to practise yet. Import a backup or add content, then try again.');
        setNow(startedAt);
        return;
      }

      setNotice(null);
      setPlan(nextPlan);
      setSessionStartedAt(startedAt);
      setNow(startedAt);
      setView('session');
    },
    [data.reviews, data.settings],
  );

  const completeSession = useCallback(
    (attempts: readonly AnswerAttempt[], startedAt: Date) => {
      const finishedAt = new Date();
      const reviews = { ...data.reviews };

      for (const attempt of attempts) {
        reviews[attempt.itemId] = scheduleReview(
          attempt.itemId,
          reviews[attempt.itemId],
          { correct: attempt.correct, usedHint: attempt.usedHint },
          finishedAt,
        );
      }

      const record: SessionRecord = {
        id: `session-${finishedAt.getTime()}`,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        exerciseIds: attempts.map((attempt) => attempt.exerciseId),
        attempted: attempts.length,
        correct: attempts.filter((attempt) => attempt.correct).length,
      };

      commit({ ...data, reviews, sessions: [...data.sessions, record].slice(-200) });

      setSummary({ attempts, startedAt, finishedAt });
      setPlan(null);
      setSessionStartedAt(null);
      setNow(finishedAt);
      setView('summary');
    },
    [commit, data],
  );

  const updateSettings = useCallback(
    (settings: Settings) => {
      commit({ ...data, settings });
    },
    [commit, data],
  );

  const replaceData = useCallback(
    (incoming: AppData) => {
      commit(incoming);
      setNotice('Backup imported. The progress stored on this device has been replaced.');
      setNow(new Date());
      setView('today');
    },
    [commit],
  );

  const resetProgress = useCallback(() => {
    commit({ ...createEmptyData(), settings: data.settings });
    setNotice('Progress reset. Your settings were kept.');
    setNow(new Date());
    setView('today');
  }, [commit, data.settings]);

  if (contentIssues.length > 0) {
    return (
      <div className="app-shell">
        <main id="main" className="app-main">
          <div className="card">
            <h1>Content check failed</h1>
            <p>The learning content contains errors, so practice is disabled until they are fixed.</p>
            <ul>
              {contentIssues.map((issue) => (
                <li key={issue.message}>{issue.message}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }

  const tab: Tab = view === 'session' || view === 'summary' ? 'today' : view;

  const startTroubleSpots = () => {
    const ids = progress.troubleSpots.map((spot) => spot.item.id);
    if (ids.length === 0) {
      setNotice('No trouble spots recorded yet. They appear here after an item is missed.');
      return;
    }
    startSession({ ignoreDue: true, onlyItemIds: ids });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="app-header">
        <div className="app-header__inner">
          <p className="brand">
            <span className="brand__mark" aria-hidden="true">
              C1
            </span>
            <span className="brand__name">English Practice</span>
          </p>
          <p className="header-stat" aria-label={`${progress.dueCount} items due for review`}>
            <strong>{progress.dueCount}</strong> due
          </p>
        </div>
      </header>

      <main id="main" className="app-main">
        {storageError ? (
          <p className="banner banner--warning" role="status">
            {storageError}
          </p>
        ) : null}

        {notice ? (
          <div className="banner" role="status">
            <span>{notice}</span>
            <button type="button" className="link-button" onClick={() => setNotice(null)}>
              Dismiss
            </button>
          </div>
        ) : null}

        {view === 'today' ? (
          <TodayScreen
            settings={data.settings}
            progress={todayProgress}
            now={now}
            onStart={() => startSession()}
            onStartAnyway={() => startSession({ ignoreDue: true })}
            onNavigate={navigate}
          />
        ) : null}

        {view === 'library' ? (
          <LibraryScreen
            reviews={data.reviews}
            now={now}
            showCzechNotes={data.settings.showCzechNotes}
            onPractiseItem={(itemId) => startSession({ ignoreDue: true, onlyItemIds: [itemId] })}
          />
        ) : null}

        {view === 'session' && plan && sessionStartedAt ? (
          <SessionScreen
            plan={plan}
            startedAt={sessionStartedAt}
            showCzechNotes={data.settings.showCzechNotes}
            onComplete={completeSession}
            onExit={() => navigate('today')}
          />
        ) : null}

        {view === 'summary' && summary ? (
          <SummaryScreen
            attempts={summary.attempts}
            startedAt={summary.startedAt}
            finishedAt={summary.finishedAt}
            onPractiseAgain={() => startSession()}
            onDone={() => navigate('today')}
          />
        ) : null}

        {view === 'progress' ? (
          <ProgressScreen
            progress={progress}
            onStart={() => startSession()}
            onPractiseTroubleSpots={startTroubleSpots}
            onOpenLibrary={() => navigate('library')}
          />
        ) : null}

        {view === 'settings' ? (
          <SettingsScreen
            data={data}
            onSettingsChange={updateSettings}
            onImport={replaceData}
            onReset={resetProgress}
          />
        ) : null}
      </main>

      <NavBar current={tab} onChange={navigate} />
      <UpdatePrompt />
    </div>
  );
}
