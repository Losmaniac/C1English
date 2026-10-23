import type { ThemePreference } from '../domain/types';

interface ThemeToggleProps {
  value: ThemePreference;
  onChange: (theme: ThemePreference) => void;
}

const OPTIONS: ReadonlyArray<{ id: ThemePreference; label: string; path: string }> = [
  {
    id: 'system',
    label: 'Match system',
    path: 'M4 5h16v11H4zM9 19h6M12 16v3',
  },
  {
    id: 'light',
    label: 'Light',
    path: 'M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  },
  {
    id: 'dark',
    label: 'Dark',
    path: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  },
];

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  return (
    <div className="theme-switch" role="group" aria-label="Appearance">
      {OPTIONS.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            className={`theme-switch__button${active ? ' theme-switch__button--active' : ''}`}
            aria-pressed={active}
            title={option.label}
            onClick={() => onChange(option.id)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="theme-switch__icon">
              <path
                d={option.path}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="visually-hidden">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
