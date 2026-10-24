import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { STORAGE_KEY } from './storage/repository';

// The PWA update banner needs the service-worker virtual module, which only
// exists during a Vite build. It is irrelevant to the study flow under test.
vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: () => ({
    needRefresh: [false, vi.fn()],
    offlineReady: [false, vi.fn()],
    updateServiceWorker: vi.fn(),
  }),
}));

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
});

function nav() {
  return within(screen.getByRole('navigation', { name: /main/i }));
}

describe('App', () => {
  it('runs a full session, saves it, and shows it again after reopening', async () => {
    const user = userEvent.setup();
    const first = render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /start a 10-minute session/i }));

    let answered = 0;
    for (let guard = 0; guard < 30; guard += 1) {
      if (!screen.queryByRole('button', { name: /check answer/i })) break;

      const textbox = screen.queryByRole('textbox');
      if (textbox) {
        await user.type(textbox, 'militate');
      } else {
        const radios = screen.getAllByRole('radio');
        expect(radios.length).toBeGreaterThan(0);
        await user.click(radios[0] as HTMLElement);
      }

      await user.click(screen.getByRole('button', { name: /check answer/i }));
      expect(screen.getByText(/^(Correct|Not quite)\.$/)).toBeInTheDocument();
      answered += 1;

      await user.click(screen.getByRole('button', { name: /next question|see session summary/i }));
    }

    // 11 questions for 10 minutes, plus a second try for each one missed.
    expect(answered).toBeGreaterThanOrEqual(11);
    expect(screen.getByText(/session complete/i)).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {
      reviews: Record<string, unknown>;
      sessions: Array<{ attempted: number }>;
    };
    expect(stored.sessions).toHaveLength(1);
    expect(stored.sessions[0]?.attempted).toBe(11);
    expect(Object.keys(stored.reviews)).toHaveLength(11);

    // Reopening the app must read the same data back from local storage.
    first.unmount();
    render(<App />);
    expect(screen.getByText(/out of 11 answers/i)).toBeInTheDocument();
    expect(screen.getByText(/learned of 104/i)).toBeInTheDocument();
  });

  it('changes the session length and keeps it after reopening', async () => {
    const user = userEvent.setup();
    const first = render(<App />);

    await user.click(nav().getByRole('button', { name: /settings/i }));
    await user.selectOptions(screen.getByLabelText(/session length/i), '20');
    await user.click(screen.getByRole('checkbox', { name: /czech-to-english/i }));

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {
      settings: { sessionMinutes: number; showCzechNotes: boolean };
    };
    expect(stored.settings.sessionMinutes).toBe(20);
    expect(stored.settings.showCzechNotes).toBe(false);

    first.unmount();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /start a 20-minute session/i }));
    expect(screen.getByText(/question 1 of/i)).toBeInTheDocument();
  });

  it('browses the library, filters it, and starts a single-item session', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(nav().getByRole('button', { name: /library/i }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/everything you are learning/i);
    expect(screen.getByText(/104 items shown/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^search$/i), 'tenuous');
    expect(screen.getByText(/1 item shown/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^search$/i), 'zzz');
    expect(screen.getByRole('heading', { name: /no items match/i })).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/^search$/i));
    await user.click(screen.getByRole('button', { name: /^Grammar$/i }));
    await user.click(screen.getByRole('button', { name: /^Due now$/i }));
    expect(screen.getByText(/0 items shown|items shown/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^All$/i }));
    await user.click(screen.getByRole('button', { name: /^All areas$/i }));
    const firstItem = screen.getAllByRole('button', { expanded: false })[0] as HTMLElement;
    await user.click(firstItem);
    await user.click(screen.getByRole('button', { name: /practise this item/i }));
    expect(screen.getByText(/question 1 of 1/i)).toBeInTheDocument();
  });

  it('limits sessions to the chosen focus area', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(nav().getByRole('button', { name: /settings/i }));
    await user.selectOptions(screen.getByLabelText(/^focus$/i), 'phrasal-verb');
    await user.click(nav().getByRole('button', { name: /today/i }));

    expect(screen.getByText(/focused on phrasal verb/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /start a 10-minute session/i }));

    for (let guard = 0; guard < 6; guard += 1) {
      if (!screen.queryByRole('button', { name: /check answer/i })) break;
      expect(screen.getAllByText(/phrasal verb/i).length).toBeGreaterThan(0);
      const textbox = screen.queryByRole('textbox');
      if (textbox) {
        await user.type(textbox, 'came up against');
      } else {
        await user.click(screen.getAllByRole('radio')[0] as HTMLElement);
      }
      await user.click(screen.getByRole('button', { name: /check answer/i }));
      await user.click(screen.getByRole('button', { name: /next question|see session summary/i }));
    }
  });

  it('offers a working backup export', async () => {
    const user = userEvent.setup();
    const downloadClick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(<App />);

    await user.click(nav().getByRole('button', { name: /settings/i }));
    await user.click(screen.getByRole('button', { name: /export backup/i }));
    expect(downloadClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent(/backup downloaded/i);
    downloadClick.mockRestore();
  });
});
