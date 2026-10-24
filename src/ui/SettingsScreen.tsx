import { useRef, useState, type ChangeEvent } from 'react';
import { exercises, learningItems } from '../content';
import { CATEGORY_LABELS, type AppData, type Settings } from '../domain/types';
import {
  FOCUS_OPTIONS,
  NEW_ITEM_OPTIONS,
  SESSION_MINUTE_OPTIONS,
  exportData,
  parseImport,
} from '../storage/repository';

interface SettingsScreenProps {
  data: AppData;
  onSettingsChange: (settings: Settings) => void;
  onImport: (data: AppData) => void;
  onReset: () => void;
}

export function SettingsScreen({ data, onSettingsChange, onImport, onReset }: SettingsScreenProps) {
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { settings } = data;

  const update = (patch: Partial<Settings>) => {
    onSettingsChange({ ...settings, ...patch });
  };

  const handleExport = () => {
    const blob = new Blob([exportData(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `english-c1-backup-${stamp}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setImportError(null);
    setImportMessage('Backup downloaded. Keep the file somewhere safe.');
  };

  const handleFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportMessage(null);
    setImportError(null);

    try {
      const text = await file.text();
      const result = parseImport(text);
      if (!result.data) {
        setImportError(result.error ?? 'This file could not be imported.');
        return;
      }
      const confirmed = window.confirm(
        'Import this backup? It will replace all progress currently stored on this device.',
      );
      if (!confirmed) {
        setImportMessage('Import cancelled. Nothing was changed.');
        return;
      }
      onImport(result.data);
      setImportMessage('Backup imported.');
    } catch {
      setImportError('The file could not be read. Nothing was changed.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Reset all progress on this device? Study history and review dates will be deleted. Your settings are kept. This cannot be undone unless you have a backup.',
    );
    if (confirmed) onReset();
  };

  return (
    <div className="screen">
      <header className="screen__intro">
        <p className="eyebrow">Settings</p>
        <h1>How you practise</h1>
        <p className="lede">Changes take effect immediately and are saved on this device.</p>
      </header>

      <section className="card" aria-labelledby="settings-session">
        <h2 id="settings-session">Session</h2>

        <div className="field">
          <label htmlFor="session-minutes">Session length</label>
          <select
            id="session-minutes"
            value={settings.sessionMinutes}
            onChange={(event) => update({ sessionMinutes: Number(event.target.value) })}
          >
            {SESSION_MINUTE_OPTIONS.map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
          <p className="fine-print">A longer session simply plans more questions; nothing is timed.</p>
        </div>

        <div className="field">
          <label htmlFor="new-items">New items per session</label>
          <select
            id="new-items"
            value={settings.newItemsPerSession}
            onChange={(event) => update({ newItemsPerSession: Number(event.target.value) })}
          >
            {NEW_ITEM_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count === 0 ? 'Reviews only' : `${count} new items`}
              </option>
            ))}
          </select>
          <p className="fine-print">Due reviews are always scheduled first, then new items up to this limit. If that leaves the session short, more new items fill it.</p>
        </div>

        <div className="field">
          <label htmlFor="session-focus">Focus</label>
          <select
            id="session-focus"
            value={settings.focus}
            onChange={(event) =>
              update({ focus: event.target.value as Settings['focus'] })
            }
          >
            {FOCUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All areas' : CATEGORY_LABELS[option]}
              </option>
            ))}
          </select>
          <p className="fine-print">
            Limits the queue to one area. Due reviews outside the focus area wait until you widen it
            again.
          </p>
        </div>

        <div className="field">
          <label htmlFor="theme-preference">Appearance</label>
          <select
            id="theme-preference"
            value={settings.theme}
            onChange={(event) => update({ theme: event.target.value as Settings['theme'] })}
          >
            <option value="system">Match system</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <p className="fine-print">
            The same switch is available in the header on every screen.
          </p>
        </div>

        <div className="field field--checkbox">
          <input
            id="czech-notes"
            type="checkbox"
            checked={settings.showCzechNotes}
            onChange={(event) => update({ showCzechNotes: event.target.checked })}
          />
          <label htmlFor="czech-notes">Show notes on Czech-to-English interference</label>
        </div>
      </section>

      <section className="card" aria-labelledby="settings-backup">
        <h2 id="settings-backup">Backup and restore</h2>
        <p>
          Progress lives only in this browser. Export a backup before clearing browser data or moving
          to another device.
        </p>
        <div className="inline-actions inline-actions--wrap">
          <button type="button" className="button" onClick={handleExport}>
            Export backup
          </button>
          <button type="button" className="button" onClick={() => fileInputRef.current?.click()}>
            Import backup
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="visually-hidden"
          onChange={(event) => void handleFileSelected(event)}
        />
        {importMessage ? (
          <p className="banner banner--success" role="status">
            {importMessage}
          </p>
        ) : null}
        {importError ? (
          <p className="banner banner--warning" role="alert">
            {importError}
          </p>
        ) : null}
      </section>

      <section className="card" aria-labelledby="settings-privacy">
        <h2 id="settings-privacy">Privacy and storage</h2>
        <p>
          No account, no server and no analytics. Everything you answer stays in this browser&rsquo;s
          local storage. The app works offline once loaded.
        </p>
        <button type="button" className="button button--danger" onClick={handleReset}>
          Reset progress
        </button>
      </section>

      <section className="card card--muted" aria-labelledby="settings-about">
        <h2 id="settings-about">About the content</h2>
        <p>
          {learningItems.length} reviewed learning items and {exercises.length} exercises. Explanations
          are original and stored in the app; no AI or online source is used at runtime.
        </p>
        <p className="fine-print">
          The app&rsquo;s accuracy figure is a practice indicator, not a CEFR certificate or exam score.
        </p>
      </section>
    </div>
  );
}
