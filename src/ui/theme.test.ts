import { describe, expect, it } from 'vitest';
import { applyTheme, resolveTheme, THEME_COLORS } from './theme';

describe('resolveTheme', () => {
  it('follows the system only when the preference is system', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
});

describe('applyTheme', () => {
  it('writes data-theme, color-scheme and the theme-color meta tag', () => {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.append(meta);

    const resolved = applyTheme('dark');
    expect(resolved).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(meta.getAttribute('content')).toBe(THEME_COLORS.dark);

    applyTheme('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(meta.getAttribute('content')).toBe(THEME_COLORS.light);

    meta.remove();
  });
});
