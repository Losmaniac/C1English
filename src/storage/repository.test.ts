import { beforeEach, describe, expect, it } from 'vitest';
import type { AppData, ReviewState } from '../domain/types';
import {
  DEFAULT_SETTINGS,
  SCHEMA_VERSION,
  STORAGE_KEY,
  createEmptyData,
  exportData,
  loadData,
  parseAppData,
  parseImport,
  sanitiseReview,
  sanitiseSettings,
  saveData,
} from './repository';

const NOW = '2026-03-02T09:00:00.000Z';

function review(overrides: Partial<ReviewState> = {}): ReviewState {
  return {
    itemId: 'vocab-tenuous',
    dueAt: NOW,
    intervalDays: 1,
    ease: 2.5,
    repetitions: 1,
    lapses: 0,
    lastOutcome: 'correct',
    lastReviewedAt: NOW,
    ...overrides,
  };
}

beforeEach(() => {
  localStorage.clear();
});

describe('loadData and saveData', () => {
  it('returns a fresh, valid data set on first launch', () => {
    const result = loadData(localStorage);
    expect(result.status).toBe('fresh');
    expect(result.data.schemaVersion).toBe(SCHEMA_VERSION);
    expect(result.data.settings).toEqual(DEFAULT_SETTINGS);
    expect(result.data.reviews).toEqual({});
    expect(result.data.sessions).toEqual([]);
  });

  it('round-trips saved progress', () => {
    const data: AppData = {
      ...createEmptyData(),
      reviews: { 'vocab-tenuous': review() },
      sessions: [
        {
          id: 'session-1',
          startedAt: NOW,
          finishedAt: NOW,
          exerciseIds: ['ex-tenuous-choice'],
          attempted: 1,
          correct: 1,
        },
      ],
    };

    expect(saveData(data, localStorage)).toEqual({ ok: true });
    const loaded = loadData(localStorage);
    expect(loaded.status).toBe('loaded');
    expect(loaded.data.reviews['vocab-tenuous']?.repetitions).toBe(1);
    expect(loaded.data.sessions).toHaveLength(1);
  });

  it('recovers from corrupt JSON and keeps a copy', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    const result = loadData(localStorage);
    expect(result.status).toBe('recovered');
    expect(result.data.reviews).toEqual({});
    expect(localStorage.getItem(`${STORAGE_KEY}:corrupt`)).toBe('{not json');
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('refuses a schema version it cannot understand', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ schemaVersion: SCHEMA_VERSION + 1, settings: {}, reviews: {}, sessions: [] }),
    );
    expect(loadData(localStorage).status).toBe('recovered');
  });

  it('reports unavailable storage instead of throwing', () => {
    const result = loadData(null);
    expect(result.status).toBe('unavailable');
    expect(result.message).toMatch(/storage is unavailable/i);
    expect(saveData(createEmptyData(), null).ok).toBe(false);
  });
});

describe('sanitising stored data', () => {
  it('drops malformed reviews but keeps valid ones', () => {
    const parsed = parseAppData(
      JSON.stringify({
        schemaVersion: SCHEMA_VERSION,
        settings: { sessionMinutes: 15, newItemsPerSession: 4, showCzechNotes: false },
        reviews: {
          good: review(),
          bad: { dueAt: 'not-a-date' },
          nonsense: 42,
        },
        sessions: [{ id: 'x' }],
      }),
    );

    expect(parsed).not.toBeNull();
    expect(Object.keys(parsed?.reviews ?? {})).toEqual(['good']);
    expect(parsed?.sessions).toEqual([]);
    expect(parsed?.settings.sessionMinutes).toBe(15);
  });

  it('clamps review values into safe bounds', () => {
    const sanitised = sanitiseReview('item', {
      dueAt: NOW,
      lastReviewedAt: NOW,
      lastOutcome: 'incorrect',
      intervalDays: 5000,
      ease: 12,
      repetitions: -4,
      lapses: -1,
    });
    expect(sanitised?.intervalDays).toBe(365);
    expect(sanitised?.ease).toBe(2.8);
    expect(sanitised?.repetitions).toBe(0);
    expect(sanitised?.lapses).toBe(0);
  });

  it('falls back to defaults for invalid settings', () => {
    expect(sanitiseSettings({ sessionMinutes: 7, newItemsPerSession: 99, showCzechNotes: 'yes' })).toEqual({
      sessionMinutes: DEFAULT_SETTINGS.sessionMinutes,
      newItemsPerSession: 10,
      showCzechNotes: DEFAULT_SETTINGS.showCzechNotes,
      focus: DEFAULT_SETTINGS.focus,
      theme: DEFAULT_SETTINGS.theme,
    });
    expect(sanitiseSettings(null)).toEqual(DEFAULT_SETTINGS);
  });

  it('accepts a valid focus and rejects an unknown one', () => {
    expect(sanitiseSettings({ focus: 'grammar' }).focus).toBe('grammar');
    expect(sanitiseSettings({ focus: 'poetry' }).focus).toBe('all');
  });

  it('accepts a valid theme and rejects an unknown one', () => {
    expect(sanitiseSettings({ theme: 'dark' }).theme).toBe('dark');
    expect(sanitiseSettings({ theme: 'sepia' }).theme).toBe('system');
  });

  it('migrates version 2 data by adding the theme setting', () => {
    const version2 = JSON.stringify({
      schemaVersion: 2,
      settings: { sessionMinutes: 20, newItemsPerSession: 8, showCzechNotes: true, focus: 'idiom' },
      reviews: { 'vocab-tenuous': review() },
      sessions: [],
    });

    const migrated = parseAppData(version2);
    expect(migrated?.schemaVersion).toBe(SCHEMA_VERSION);
    expect(migrated?.settings.theme).toBe('system');
    expect(migrated?.settings.focus).toBe('idiom');
    expect(migrated?.settings.sessionMinutes).toBe(20);
    expect(migrated?.reviews['vocab-tenuous']?.repetitions).toBe(1);
  });

  it('migrates version 1 data by adding the focus setting', () => {
    const version1 = JSON.stringify({
      schemaVersion: 1,
      settings: { sessionMinutes: 15, newItemsPerSession: 6, showCzechNotes: false },
      reviews: { 'vocab-tenuous': review() },
      sessions: [],
    });

    const migrated = parseAppData(version1);
    expect(migrated).not.toBeNull();
    expect(migrated?.schemaVersion).toBe(SCHEMA_VERSION);
    expect(migrated?.settings.focus).toBe('all');
    expect(migrated?.settings.sessionMinutes).toBe(15);
    expect(migrated?.settings.showCzechNotes).toBe(false);
    expect(migrated?.reviews['vocab-tenuous']?.repetitions).toBe(1);
  });
});

describe('import and export', () => {
  it('exports JSON that can be imported again', () => {
    const data: AppData = {
      ...createEmptyData(),
      reviews: { 'vocab-tenuous': review() },
    };
    const imported = parseImport(exportData(data));
    expect(imported.error).toBeUndefined();
    expect(imported.data?.reviews['vocab-tenuous']?.itemId).toBe('vocab-tenuous');
  });

  it('rejects unrelated or broken files without producing data', () => {
    expect(parseImport('hello').data).toBeUndefined();
    expect(parseImport('[]').error).toMatch(/not a valid/i);
    expect(parseImport('{"schemaVersion":1}').data?.reviews).toEqual({});
  });
});
