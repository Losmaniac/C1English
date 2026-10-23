export type Tab = 'today' | 'library' | 'progress' | 'settings';

interface NavBarProps {
  current: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: ReadonlyArray<{ id: Tab; label: string; path: string }> = [
  {
    id: 'today',
    label: 'Today',
    path: 'M4 11.5 12 4l8 7.5M6.5 10v9h4v-5h3v5h4v-9',
  },
  {
    id: 'library',
    label: 'Library',
    path: 'M4 5h6v14H4zM13 5h7v14h-7zM4 9h6M13 9h7',
  },
  {
    id: 'progress',
    label: 'Progress',
    path: 'M4 19V9M10 19V5M16 19v-7M3 19h18',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8-3.5a8 8 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a8 8 0 0 0-2-1.2L15.2 3h-4l-.4 2.6a8 8 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5a8 8 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 2 1.2l.4 2.6h4l.4-2.6a8 8 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z',
  },
];

export function NavBar({ current, onChange }: NavBarProps) {
  return (
    <nav className="tabbar" aria-label="Main">
      <ul className="tabbar__list">
        {TABS.map((tab) => {
          const active = tab.id === current;
          return (
            <li key={tab.id}>
              <button
                type="button"
                className={`tabbar__button${active ? ' tabbar__button--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => onChange(tab.id)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="tabbar__icon">
                  <path
                    d={tab.path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
