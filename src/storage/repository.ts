/**
 * Local persistence. Everything stays on the device: there is no remote store,
 * account or sync. Reads are defensive so corrupt or outdated data can never
 * crash the app or silently invent study history.
 */
import { MAX_EASE, MAX_INTERVAL_DAYS, MIN_EASE } from '../domain/srs';
import type { AppData, Category, ReviewState, SessionRecord, Settings } from '../domain/types';

export const STORAGE_KEY = 'english-c1:data';
/**
 * 1 -> 2 added settings.focus, 2 -> 3 added settings.theme. Each step has a
 * migration, so older data still loads and nothing is discarded.
 */
export const SCHEMA_VERSION = 3;

export const SESSION_MINUTE_OPTIONS = [5, 10, 15, 20] as const;
export const NEW_ITEM_OPTIONS = [0, 2, 4, 6, 8] as const;
export const FOCUS_OPTIONS = [
  'all',
  'grammar',
  'vocabulary',
  'collocation',
  'idiom',
  'phrasal-verb',
] as const;

export const THEME_OPTIONS = ['system', 'light', 'dark'] as const;

export const DEFAULT_SETTINGS: Settings = {
  sessionMinutes: 10,
  newItemsPerSession: 4,
  showCzechNotes: true,
  focus: 'all',
  theme: 'system',
};

export type LoadStatus = 'fresh' | 'loaded' | 'recovered' | 'unavailable';

export interface LoadResult {
  data: AppData;
  status: LoadStatus;
  message?: string;
}

export interface SaveResult {
  ok: boolean;
  message?: string;
}

export function createEmptyData(): AppData {
  return {
    schemaVersion: SCHEMA_VERSION,
    settings: { ...DEFAULT_SETTINGS },
    reviews: {},
    sessions: [],
  };
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    const storage = window.localStorage;
    const probe = `${STORAGE_KEY}:probe`;
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return storage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asFiniteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asIsoDate(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function sanitiseSettings(value: unknown): Settings {
  if (!isRecord(value)) return { ...DEFAULT_SETTINGS };
  const minutes = SESSION_MINUTE_OPTIONS.find((option) => option === value.sessionMinutes);
  const focus = FOCUS_OPTIONS.find((option) => option === value.focus);
  const theme = THEME_OPTIONS.find((option) => option === value.theme);
  const newItems = asFiniteNumber(value.newItemsPerSession, DEFAULT_SETTINGS.newItemsPerSession);
  return {
    sessionMinutes: minutes ?? DEFAULT_SETTINGS.sessionMinutes,
    newItemsPerSession: clamp(Math.round(newItems), 0, 10),
    showCzechNotes:
      typeof value.showCzechNotes === 'boolean' ? value.showCzechNotes : DEFAULT_SETTINGS.showCzechNotes,
    focus: (focus ?? DEFAULT_SETTINGS.focus) as Category | 'all',
    theme: theme ?? DEFAULT_SETTINGS.theme,
  };
}

export function sanitiseReview(itemId: string, value: unknown): ReviewState | null {
  if (!isRecord(value)) return null;
  const dueAt = asIsoDate(value.dueAt);
  const lastReviewedAt = asIsoDate(value.lastReviewedAt);
  const outcome = value.lastOutcome;
  const lastOutcome = outcome === 'correct' || outcome === 'incorrect' ? outcome : null;
  if (!dueAt || !lastReviewedAt || !lastOutcome) return null;

  return {
    itemId,
    dueAt,
    intervalDays: clamp(Math.round(asFiniteNumber(value.intervalDays, 1)), 1, MAX_INTERVAL_DAYS),
    ease: clamp(asFiniteNumber(value.ease, 2.5), MIN_EASE, MAX_EASE),
    repetitions: Math.max(0, Math.round(asFiniteNumber(value.repetitions, 0))),
    lapses: Math.max(0, Math.round(asFiniteNumber(value.lapses, 0))),
    lastOutcome,
    lastReviewedAt,
  };
}

function sanitiseSession(value: unknown): SessionRecord | null {
  if (!isRecord(value)) return null;
  const startedAt = asIsoDate(value.startedAt);
  const finishedAt = asIsoDate(value.finishedAt);
  if (!startedAt || !finishedAt) return null;
  if (!Array.isArray(value.exerciseIds)) return null;

  const exerciseIds = value.exerciseIds.filter((id): id is string => typeof id === 'string');
  const attempted = Math.max(0, Math.round(asFiniteNumber(value.attempted, exerciseIds.length)));
  const correct = clamp(Math.round(asFiniteNumber(value.correct, 0)), 0, attempted);

  return {
    id: typeof value.id === 'string' && value.id.trim() !== '' ? value.id : `session-${startedAt}`,
    startedAt,
    finishedAt,
    exerciseIds,
    attempted,
    correct,
  };
}

export function migrate(raw: Record<string, unknown>): Record<string, unknown> | null {
  const version = asFiniteNumber(raw.schemaVersion, Number.NaN);
  if (!Number.isInteger(version) || version < 1 || version > SCHEMA_VERSION) return null;

  let migrated = raw;

  if (version < 2) {
    // Version 1 had no focus setting; default it rather than inventing data.
    migrated = {
      ...migrated,
      schemaVersion: 2,
      settings: { ...(isRecord(migrated.settings) ? migrated.settings : {}), focus: 'all' },
    };
  }

  if (version < 3) {
    // Version 2 had no theme setting; follow the system until the learner chooses.
    migrated = {
      ...migrated,
      schemaVersion: 3,
      settings: { ...(isRecord(migrated.settings) ? migrated.settings : {}), theme: 'system' },
    };
  }

  return migrated;
}

export function parseAppData(text: string): AppData | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;

  const migrated = migrate(parsed);
  if (!migrated) return null;

  const reviews: Record<string, ReviewState> = {};
  if (isRecord(migrated.reviews)) {
    for (const [itemId, value] of Object.entries(migrated.reviews)) {
      if (itemId.trim() === '') continue;
      const review = sanitiseReview(itemId, value);
      if (review) reviews[itemId] = review;
    }
  }

  const sessions: SessionRecord[] = [];
  if (Array.isArray(migrated.sessions)) {
    for (const value of migrated.sessions) {
      const session = sanitiseSession(value);
      if (session) sessions.push(session);
    }
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    settings: sanitiseSettings(migrated.settings),
    reviews,
    // Keep the most recent 200 sessions; nothing else in the app needs more.
    sessions: sessions.slice(-200),
  };
}

export function loadData(storage: Storage | null = getStorage()): LoadResult {
  if (!storage) {
    return {
      data: createEmptyData(),
      status: 'unavailable',
      message: 'Browser storage is unavailable, so progress cannot be saved on this device.',
    };
  }

  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return {
      data: createEmptyData(),
      status: 'unavailable',
      message: 'Saved progress could not be read. Starting with a fresh session.',
    };
  }

  if (raw === null) {
    return { data: createEmptyData(), status: 'fresh' };
  }

  const parsed = parseAppData(raw);
  if (parsed) {
    return { data: parsed, status: 'loaded' };
  }

  // Keep the unreadable payload once, so nothing is destroyed without trace.
  try {
    storage.setItem(`${STORAGE_KEY}:corrupt`, raw);
    storage.removeItem(STORAGE_KEY);
  } catch {
    // A failed backup must not block starting the app.
  }

  return {
    data: createEmptyData(),
    status: 'recovered',
    message:
      'Saved progress could not be read and was set aside, so the app has started fresh. The unreadable copy is kept on this device.',
  };
}

export function saveData(data: AppData, storage: Storage | null = getStorage()): SaveResult {
  if (!storage) {
    return { ok: false, message: 'Browser storage is unavailable, so this change will not be saved.' };
  }
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { ok: true };
  } catch {
    return { ok: false, message: 'Progress could not be saved. Device storage may be full or blocked.' };
  }
}

export function exportData(data: AppData): string {
  return JSON.stringify(data, null, 2);
}

export interface ImportResult {
  data?: AppData;
  error?: string;
}

export function parseImport(text: string): ImportResult {
  const data = parseAppData(text);
  if (!data) {
    return {
      error:
        'This file is not a valid English C1 backup. No progress was changed. Expected a JSON export from this app.',
    };
  }
  return { data };
}
