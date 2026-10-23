import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SyncPanel } from './SyncPanel';

const noop = () => undefined;

describe('SyncPanel', () => {
  it('explains that sync is unavailable instead of offering broken buttons', () => {
    render(
      <SyncPanel
        status="unconfigured"
        user={null}
        error={null}
        lastSyncedAt={null}
        onSignIn={noop}
        onSignOut={noop}
        onSyncNow={noop}
      />,
    );

    expect(screen.getByText(/no Firebase configuration/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign in with google/i })).not.toBeInTheDocument();
  });

  it('offers Google sign-in when configured and signed out', async () => {
    const user = userEvent.setup();
    const onSignIn = vi.fn();
    render(
      <SyncPanel
        status="signed-out"
        user={null}
        error={null}
        lastSyncedAt={null}
        onSignIn={onSignIn}
        onSignOut={noop}
        onSyncNow={noop}
      />,
    );

    await user.click(screen.getByRole('button', { name: /sign in with google/i }));
    expect(onSignIn).toHaveBeenCalledTimes(1);
  });

  it('shows the account, sync controls and errors when signed in', async () => {
    const user = userEvent.setup();
    const onSyncNow = vi.fn();
    const onSignOut = vi.fn();
    render(
      <SyncPanel
        status="error"
        user={{ uid: 'abc123', email: 'losmaniac@example.com', displayName: null }}
        error="Firestore refused the write."
        lastSyncedAt="2026-03-04T09:00:00.000Z"
        onSignIn={noop}
        onSignOut={onSignOut}
        onSyncNow={onSyncNow}
      />,
    );

    expect(screen.getByText('losmaniac@example.com')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(/refused the write/i);
    expect(screen.getByText(/keeps everything on this device/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /sync now/i }));
    await user.click(screen.getByRole('button', { name: /sign out/i }));
    expect(onSyncNow).toHaveBeenCalledTimes(1);
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});
