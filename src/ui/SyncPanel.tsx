import type { SyncStatus, SyncUser } from '../sync/types';

interface SyncPanelProps {
  status: SyncStatus;
  user: SyncUser | null;
  error: string | null;
  lastSyncedAt: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onSyncNow: () => void;
}

function statusText(status: SyncStatus, user: SyncUser | null, lastSyncedAt: string | null): string {
  switch (status) {
    case 'unconfigured':
      return 'Sync is not configured in this build, so everything stays on this device.';
    case 'signed-out':
      return 'Signed out. Progress is stored on this device only.';
    case 'signing-in':
      return 'Waiting for Google…';
    case 'syncing':
      return user ? `Syncing progress for ${user.email ?? user.uid}…` : 'Syncing…';
    case 'synced':
      return lastSyncedAt
        ? `Signed in as ${user?.email ?? user?.uid}. Last sync ${new Date(lastSyncedAt).toLocaleTimeString()}.`
        : `Signed in as ${user?.email ?? user?.uid}.`;
    case 'error':
      return 'Sync needs attention.';
    default:
      return '';
  }
}

export function SyncPanel({
  status,
  user,
  error,
  lastSyncedAt,
  onSignIn,
  onSignOut,
  onSyncNow,
}: SyncPanelProps) {
  const busy = status === 'signing-in' || status === 'syncing';

  return (
    <section className="card" aria-labelledby="settings-sync">
      <h2 id="settings-sync">Sync across devices</h2>

      {status === 'unconfigured' ? (
        <>
          <p>
            This build has no Firebase configuration, so there is no sign-in and no cloud copy. Every
            answer stays in this browser, and export/import below is the way to move progress.
          </p>
          <p className="fine-print">
            To enable Google sign-in and cross-device sync, add the six Firebase web-app values as build
            variables (VITE_FIREBASE_*) and rebuild. See the README for the exact steps.
          </p>
        </>
      ) : (
        <>
          <p>
            Signing in stores your <strong>review dates and session history</strong> in your own Firebase
            document, so the same progress appears on every device you sign in from. Settings such as
            theme, session length and focus stay on each device.
          </p>

          {user ? (
            <>
              <ul className="metric-list">
                <li>
                  <span>Account</span>
                  <strong>{user.email ?? user.uid}</strong>
                </li>
                <li>
                  <span>Status</span>
                  <strong>{status === 'error' ? 'Needs attention' : busy ? 'Working…' : 'Signed in'}</strong>
                </li>
              </ul>
              <div className="inline-actions inline-actions--wrap">
                <button
                  type="button"
                  className="button"
                  onClick={onSyncNow}
                  disabled={busy}
                >
                  Sync now
                </button>
                <button type="button" className="button button--ghost" onClick={onSignOut} disabled={busy}>
                  Sign out
                </button>
              </div>
              <p className="fine-print">
                Signing out keeps everything on this device; it only stops the cloud copy from updating.
              </p>
            </>
          ) : (
            <button
              type="button"
              className="button button--primary button--wide"
              onClick={onSignIn}
              disabled={busy}
            >
              {busy ? 'Waiting for Google…' : 'Sign in with Google'}
            </button>
          )}

          <p className="fine-print" role="status">
            {statusText(status, user, lastSyncedAt)}
          </p>
          {error ? (
            <p className="banner banner--warning" role="alert">
              {error}
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
