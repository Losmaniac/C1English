import type { ThemePreference } from '../domain/types';

export type ResolvedTheme = 'light' | 'dark';

/** Background colours must match --paper in global.css, for the browser chrome. */
export const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: '#f6f2ea',
  dark: '#141614',
};

export function resolveTheme(preference: ThemePreference, prefersDark: boolean): ResolvedTheme {
  if (preference === 'system') return prefersDark ? 'dark' : 'light';
  return preference;
}

export function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Writes the resolved theme onto <html> as data-theme, and keeps the
 * theme-color meta tag in step so the phone status bar matches.
 */
export function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolved = resolveTheme(preference, systemPrefersDark());
  if (typeof document === 'undefined') return resolved;

  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[resolved]);

  return resolved;
}
