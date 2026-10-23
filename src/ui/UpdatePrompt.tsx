import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Updates are offered, never forced: reloading mid-session would discard the
 * current attempt. The banner only appears when a new service worker is ready.
 */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="update-banner" role="status">
      <p>A new version of the app is ready.</p>
      <div className="update-banner__actions">
        <button type="button" className="button button--small" onClick={() => void updateServiceWorker(true)}>
          Reload and update
        </button>
        <button type="button" className="button button--small button--ghost" onClick={() => setNeedRefresh(false)}>
          Later
        </button>
      </div>
    </div>
  );
}
